
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { ChatMessage as ChatMessageType } from '../types';
import { BRAND_CONSTANTS } from '../constants';

interface ChatMessageProps {
  message: ChatMessageType;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1 p-2">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
  </div>
);


export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const alignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleAlignment = isUser ? 'ml-auto' : 'mr-auto';
  const avatarUrl = !isUser ? message.avatar || BRAND_CONSTANTS.brand.chatbot.avatar : null;

  const markdownComponents = {
    p: ({node, ...props}) => <p className="text-sm my-1 break-words" {...props} />,
    strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
    em: ({node, ...props}) => <em className="italic" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc list-inside pl-2 my-1 space-y-0.5 text-sm" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal list-inside pl-2 my-1 space-y-0.5 text-sm" {...props} />,
    li: ({node, ...props}) => <li className="text-sm" {...props} />,
    a: ({node, ...props}) => <a className="text-blue-500 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer" {...props} />,
    h1: ({node, ...props}) => <h1 className="text-lg font-semibold my-1.5" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-base font-semibold my-1.5" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-sm font-semibold my-1" {...props} />,
    code: ({node, inline, className, children, ...props}) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <pre className="bg-gray-700 text-white p-2 rounded-md my-1 text-xs overflow-x-auto w-full">
          <code {...props} className={className}>{children}</code>
        </pre>
      ) : (
        <code {...props} className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-xs mx-0.5">{children}</code>
      );
    },
    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-3 italic my-1 text-sm text-gray-600" {...props} />,
  };

  return (
    <div className={`flex ${alignment} items-end space-x-2`}>
      {!isUser && avatarUrl && (
        <img src={avatarUrl} alt="Bot Avatar" className="w-8 h-8 rounded-full object-cover self-start flex-shrink-0" />
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow ${bubbleAlignment}`}
        style={{ 
          backgroundColor: isUser ? '#CFFAFE' : '#F9FAFB', // User: Very Light Cyan/Teal, Bot: Very Light Gray (gray-50)
          color: isUser ? '#000000' : '#1F2937' // User: Black, Bot: Tailwind gray-800
        }}
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions text"
      >
        {message.isLoading && message.text === '' ? (
          <TypingIndicator />
        ) : isUser ? (
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={markdownComponents}
          >
            {message.text}
          </ReactMarkdown>
        )}
        <p className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'} ${isUser ? 'text-gray-600' : 'text-gray-500'}`}>
          <time dateTime={message.timestamp.toISOString()}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </time>
        </p>
      </div>
      {isUser && (
         <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 self-start flex-shrink-0" aria-hidden="true">
           U
         </div>
      )}
    </div>
  );
};