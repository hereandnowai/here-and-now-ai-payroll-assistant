import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons/ChevronIcons';
import { BRAND_CONSTANTS } from '../constants';

interface FAQBarProps {
  isFAQListVisible: boolean;
  toggleFAQListVisibility: () => void;
}

export const FAQBar: React.FC<FAQBarProps> = ({ isFAQListVisible, toggleFAQListVisibility }) => {
  return (
    <button
      onClick={toggleFAQListVisibility}
      className="flex items-center justify-between w-full px-3 py-2 mb-2 text-sm font-medium text-left rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1"
      style={{ 
        backgroundColor: BRAND_CONSTANTS.brand.colors.secondary, 
        color: BRAND_CONSTANTS.brand.colors.primary,
        borderColor: BRAND_CONSTANTS.brand.colors.primary
      }}
      aria-expanded={isFAQListVisible}
      aria-controls="faq-suggestions-list"
    >
      <span>Quick Questions</span>
      {isFAQListVisible ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
    </button>
  );
};