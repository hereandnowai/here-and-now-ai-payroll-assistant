import React from 'react';
import { FAQItem } from '../types';
import { DEFAULT_FAQS } from '../constants';

interface FAQSuggestionsProps {
  onSelectQuestion: (question: string) => void;
}

export const FAQSuggestions: React.FC<FAQSuggestionsProps> = ({ onSelectQuestion }) => {
  if (!DEFAULT_FAQS || DEFAULT_FAQS.length === 0) {
    return null;
  }

  return (
    <div 
      id="faq-suggestions-list"
      className="mb-3 px-1"
      role="region"
      aria-label="FAQ Suggestions"
    >
      <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {DEFAULT_FAQS.map((faq) => (
          <button
            key={faq.id}
            onClick={() => onSelectQuestion(faq.question)}
            className="inline-flex items-center bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-medium px-3 py-1.5 rounded-full border border-teal-200 transition-colors duration-150 shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
            aria-label={`Ask: ${faq.question}`}
          >
            {faq.question}
          </button>
        ))}
      </div>
    </div>
  );
};