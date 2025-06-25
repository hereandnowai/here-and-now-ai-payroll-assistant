/// <reference path="../types/speech.d.ts" />
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SendIcon } from './icons/SendIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { LanguagesIcon } from './icons/LanguagesIcon';
import { ChevronDownIcon } from './icons/ChevronIcons';
import { BRAND_CONSTANTS, SUPPORTED_LANGUAGES } from '../constants';


interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  selectedLang: string;
  onLanguageChange: (langCode: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isLoading,
  selectedLang,
  onLanguageChange 
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setSpeechError("Speech recognition is not supported in this browser.");
      console.warn("SpeechRecognition API not found.");
      return;
    }

    try {
      const recognitionInstance: SpeechRecognition = new SpeechRecognitionAPI();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = selectedLang;

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setSpeechError(null);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'no-speech') {
          setSpeechError("No speech detected. Please try again.");
        } else if (event.error === 'audio-capture') {
          setSpeechError("Audio capture failed. Ensure microphone is enabled.");
        } else if (event.error === 'not-allowed') {
          setSpeechError("Microphone access denied. Please allow microphone permission in your browser settings.");
        } else {
          setSpeechError(`Speech recognition error: ${event.error} - ${event.message}`);
        }
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognitionInstance;
    } catch (e) {
      console.error("Error initializing SpeechRecognition:", e);
      setSpeechError("Failed to initialize speech recognition.");
    }

    return () => {
      if (recognitionRef.current) {
        try {
            recognitionRef.current.stop();
        } catch(e) {
            // Can ignore if already stopped or in an invalid state
        }
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current = null; // Clean up ref
      }
    };
  }, []); // Initialize only once

  // Update language for existing instance if it exists and language prop changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLang;
    }
  }, [selectedLang]);
  
  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
        setSpeechError("Speech recognition not initialized or not supported.");
        return;
    }
    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("Error stopping recognition (already stopped?):", e)
      }
      setIsRecording(false);
    } else {
      try {
        setInputText(''); 
        setSpeechError(null);
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e: any) {
        console.error("Could not start recording:", e);
        if (e.name === 'InvalidStateError') {
             // This can happen if start() is called too soon after initialization or after a previous stop()
             // Attempt to re-initialize or advise user to wait
             setSpeechError("Cannot start recording yet. Please wait a moment and try again.");
        } else if (e.name === 'NotAllowedError' || e.message?.includes('permission')) {
            setSpeechError("Microphone access denied. Please allow microphone permission.");
        }
        else {
            setSpeechError("Could not start recording. Ensure microphone is connected and permission is granted.");
        }
        setIsRecording(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading && !isRecording) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode); // Call prop function from App.tsx
    setIsLangDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLangDropdownOpen &&
        langButtonRef.current && !langButtonRef.current.contains(event.target as Node) &&
        langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangDropdownOpen]);

  const currentLangName = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.name.split(' (')[0] || 'Lang';


  return (
    <div className="flex flex-col">
      {speechError && <p className="text-xs text-red-600 mb-1 ml-1 self-start" role="alert">{speechError}</p>}
      <form 
        onSubmit={handleSubmit} 
        className="flex items-stretch p-0.5 bg-white rounded-lg shadow focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-[#004040] transition-all duration-150"
        aria-label="Message composition area"
      >
        <div className="relative flex-shrink-0">
          <button
            ref={langButtonRef}
            type="button"
            onClick={() => setIsLangDropdownOpen(prev => !prev)}
            className="flex items-center h-full px-2 py-2.5 rounded-l-md border-r border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#004040] transition-colors"
            style={{ backgroundColor: '#E0F7FA', color: BRAND_CONSTANTS.brand.colors.secondary }}
            aria-haspopup="true"
            aria-expanded={isLangDropdownOpen}
            aria-label={`Select language, current language is ${currentLangName}`}
          >
            <LanguagesIcon className="w-5 h-5 mr-1" />
            <span className="text-xs font-medium">{currentLangName.substring(0,2).toUpperCase()}</span>
            <ChevronDownIcon className={`w-4 h-4 ml-0.5 transform transition-transform duration-150 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isLangDropdownOpen && (
            <div
              ref={langDropdownRef}
              className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 py-1"
              role="listbox"
              aria-orientation="vertical"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${selectedLang === lang.code ? 'font-semibold text-teal-600' : 'text-gray-700'}`}
                  role="option"
                  aria-selected={selectedLang === lang.code}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isRecording ? "Listening..." : "Type your message..."}
          className="flex-grow py-2.5 px-3 border-0 focus:outline-none placeholder-neutral-500 text-sm"
          style={{ 
            backgroundColor: '#E0F7FA', 
            color: '#000000',
            caretColor: BRAND_CONSTANTS.brand.colors.secondary
          }}
          disabled={isLoading || isRecording}
          aria-label="Message input"
        />
        
        <button
            type="button"
            onClick={handleToggleRecording}
            disabled={isLoading || !(window.SpeechRecognition || window.webkitSpeechRecognition)}
            className={`flex-shrink-0 p-2.5 h-full hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#004040] transition-colors ${isRecording ? 'text-red-500' : ''}`}
            style={{ backgroundColor: '#E0F7FA', color: isRecording ? 'red' : BRAND_CONSTANTS.brand.colors.secondary }}
            aria-label={isRecording ? "Stop recording" : "Start voice input"}
            title={!(window.SpeechRecognition || window.webkitSpeechRecognition) ? "Speech input not supported by your browser" : (isRecording ? "Stop recording" : "Start voice input")}
        >
            <MicrophoneIcon className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
        </button>

        <button
          type="submit"
          disabled={isLoading || isRecording || !inputText.trim()}
          className="flex-shrink-0 py-2.5 px-4 rounded-r-lg border-0 flex items-center justify-center transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-[#002b2b]"
          style={{ 
            backgroundColor: isLoading || isRecording || !inputText.trim() ? '#cccccc' : BRAND_CONSTANTS.brand.colors.primary, 
            color: isLoading || isRecording || !inputText.trim() ? '#666666' : BRAND_CONSTANTS.brand.colors.secondary
          }}
          aria-label={isLoading ? "Sending message" : "Send message"}
        >
          {isLoading && !isRecording ? (
            <svg className="animate-spin h-5 w-5" style={{color: BRAND_CONSTANTS.brand.colors.secondary }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <SendIcon className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};
