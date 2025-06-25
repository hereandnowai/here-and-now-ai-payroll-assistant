
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { FAQSuggestions } from './components/FAQSuggestions';
import { FAQBar } from './components/FAQBar';
import { HomePage } from './components/HomePage'; // Import HomePage
import { ChatMessage as ChatMessageType } from './types';
import { geminiService } from './services/geminiService';
import { BRAND_CONSTANTS, KNOWLEDGE_BASE, SUPPORTED_LANGUAGES } from './constants';
import { Chat } from '@google/genai';

// Helper function to normalize question text for matching
const normalizeQuestionText = (text: string): string => {
  if (typeof text !== 'string') return '';
  return text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();
};

type PageView = 'home' | 'chat';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFAQListVisible, setIsFAQListVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<PageView>('home'); // Initial page is home
  const [selectedLang, setSelectedLang] = useState<string>(SUPPORTED_LANGUAGES[0].code); // Lifted state
  const chatRef = useRef<Chat | null>(null);
  const apiKey = process.env.API_KEY;

  const initializeChat = useCallback(async () => {
    if (currentPage !== 'chat' || chatRef.current) return; 

    if (!apiKey) {
      setError("API Key is missing. Please ensure it is configured in the environment.");
      setIsLoading(false); 
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I'm currently unable to connect. Please check the API key configuration.",
        sender: 'bot',
        timestamp: new Date(),
        avatar: BRAND_CONSTANTS.brand.chatbot.avatar
      }]);
      return;
    }

    setIsLoading(true); 
    try {
      chatRef.current = await geminiService.startChatSession(apiKey);
      const initialWelcomeMessage = selectedLang.startsWith('fr') 
        ? `Bonjour ! Je suis l'assistant de paie et avantages sociaux de ${BRAND_CONSTANTS.brand.shortName}. Comment puis-je vous aider aujourd'hui ?`
        : selectedLang.startsWith('nl')
        ? `Hallo! Ik ben de Payroll & Benefits Assistent van ${BRAND_CONSTANTS.brand.shortName}. Hoe kan ik u vandaag helpen?`
        : `Hello! I am ${BRAND_CONSTANTS.brand.shortName}'s Payroll & Benefits Assistant. How can I help you today?`;
      
      setMessages([{ 
        id: Date.now().toString(),
        text: initialWelcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        avatar: BRAND_CONSTANTS.brand.chatbot.avatar
      }]);
    } catch (e) {
      console.error("Failed to initialize chat:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during initialization.";
      setError(`Failed to initialize chat: ${errorMessage}`);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: `Sorry, I encountered an issue during startup: ${errorMessage}`,
        sender: 'bot',
        timestamp: new Date(),
        avatar: BRAND_CONSTANTS.brand.chatbot.avatar
      }]);
    } finally {
      setIsLoading(false); 
    }
  }, [apiKey, currentPage, selectedLang]);


  useEffect(() => {
    if (currentPage === 'chat' && !chatRef.current && messages.length === 0) {
      initializeChat();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, initializeChat]);


  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessageType = {
      id: `${Date.now()}-user`,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsFAQListVisible(false);
    setIsLoading(true); 
    setError(null);

    // Check against KNOWLEDGE_BASE first (simple string match for now)
    const normalizedInput = normalizeQuestionText(inputText);
    const knownFAQ = KNOWLEDGE_BASE.find(
      faq => normalizeQuestionText(faq.question) === normalizedInput
    );

    if (knownFAQ) {
      // For known FAQs, we assume the answer is pre-translated or general enough.
      // Or, ideally, KNOWLEDGE_BASE would have language-specific answers.
      // For now, returning the English answer.
      // A more advanced solution would involve looking up a translated answer.
      const botAnswerMessage: ChatMessageType = {
        id: `${Date.now()}-bot-known`,
        text: knownFAQ.answer, // This answer is currently only in English
        sender: 'bot',
        timestamp: new Date(),
        avatar: BRAND_CONSTANTS.brand.chatbot.avatar,
      };
      setMessages(prev => [...prev, botAnswerMessage]);
      setIsLoading(false);
      return;
    }

    if (!chatRef.current) {
      setError("Chat session is not initialized. Please navigate to chat or try again later.");
       setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        avatar: BRAND_CONSTANTS.brand.chatbot.avatar
      }]);
      setIsLoading(false);
      return;
    }

    const languageName = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLang)?.name || 'English';
    const augmentedInput = `${inputText}\n\n(System: Please respond in ${languageName}.)`;

    let botStreamingMessageId = `${Date.now()}-bot-stream`;
    setMessages(prevMessages => [...prevMessages, {
      id: botStreamingMessageId,
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      avatar: BRAND_CONSTANTS.brand.chatbot.avatar,
      isLoading: true,
    }]);

    try {
      const stream = await geminiService.sendMessageStream(chatRef.current, augmentedInput);
      let accumulatedText = "";
      for await (const chunk of stream) {
        accumulatedText += chunk;
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === botStreamingMessageId
              ? { ...msg, text: accumulatedText, isLoading: true }
              : msg
          )
        );
      }
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === botStreamingMessageId
            ? { ...msg, text: accumulatedText, isLoading: false }
            : msg
        )
      );
    } catch (e) {
      console.error("Error sending message to Gemini:", e);
      const errText = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(`Failed to get response: ${errText}`);
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === botStreamingMessageId
            ? { ...msg, text: `Sorry, I encountered an error: ${errText}`, isLoading: false }
            : msg
        ).filter(msg => !(msg.id === botStreamingMessageId && msg.text === '' && errText))
      );
      if (!messages.some(msg => msg.id === botStreamingMessageId && msg.text !== '')) {
         setMessages(prev => [...prev, {
            id: `${Date.now()}-bot-error`,
            text: `Sorry, I encountered an error processing your request: ${errText}`,
            sender: 'bot',
            timestamp: new Date(),
            avatar: BRAND_CONSTANTS.brand.chatbot.avatar,
          }]);
      }
    } finally {
      setIsLoading(false); 
    }
  }, [chatRef, apiKey, selectedLang]); 

  const toggleFAQVisibility = useCallback(() => {
    setIsFAQListVisible(prev => !prev);
  }, []);

  const handleFAQSelect = useCallback((question: string) => {
    handleSendMessage(question);
    setIsFAQListVisible(false);
  }, [handleSendMessage]);

  const navigateToChat = () => {
    setCurrentPage('chat');
    // If messages are empty when navigating to chat, initializeChat will be called by useEffect
    if (messages.length === 0 && !chatRef.current) {
        initializeChat();
    }
  };
  
  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);
    // Optionally, re-initialize chat or send a system message if language changes mid-conversation
    // For now, the next user message will carry the new language preference.
    // If chat is active, update welcome message if no user messages yet.
    if (currentPage === 'chat' && messages.length === 1 && messages[0].sender === 'bot') {
        const newWelcomeMessageText = langCode.startsWith('fr')
        ? `Bonjour ! Je suis l'assistant de paie et avantages sociaux de ${BRAND_CONSTANTS.brand.shortName}. Comment puis-je vous aider aujourd'hui ?`
        : langCode.startsWith('nl')
        ? `Hallo! Ik ben de Payroll & Benefits Assistent van ${BRAND_CONSTANTS.brand.shortName}. Hoe kan ik u vandaag helpen?`
        : `Hello! I am ${BRAND_CONSTANTS.brand.shortName}'s Payroll & Benefits Assistant. How can I help you today?`;
        
        setMessages([{
            ...messages[0],
            text: newWelcomeMessageText,
        }]);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-yellow-50 font-sans antialiased">
      <Header />
      {currentPage === 'home' ? (
        <HomePage onStartChat={navigateToChat} />
      ) : (
        <main className="flex-grow flex flex-col p-3 md:p-4 overflow-hidden max-w-4xl w-full mx-auto">
          {error && (
            <div 
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-3 rounded-md shadow-md" 
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11 14v-4h-2V7h2v3h1v4h-1zM10 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
                </div>
                <div>
                  <p className="font-bold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <ChatWindow messages={messages} />

          <div className="mt-auto pt-2">
            <FAQBar isFAQListVisible={isFAQListVisible} toggleFAQListVisibility={toggleFAQVisibility} />
            {isFAQListVisible && <FAQSuggestions onSelectQuestion={handleFAQSelect} />}
            <MessageInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading}
              selectedLang={selectedLang}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default App;
