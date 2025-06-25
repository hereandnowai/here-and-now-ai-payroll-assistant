
import React from 'react';
import { BRAND_CONSTANTS } from '../constants';

export const Header: React.FC = () => {
  return (
    <header 
      className="p-4 shadow-md flex items-center" 
      style={{ backgroundColor: BRAND_CONSTANTS.brand.colors.secondary }}
    >
      <img 
        src={BRAND_CONSTANTS.brand.logo.title} 
        alt={`${BRAND_CONSTANTS.brand.shortName} Logo`} 
        className="h-10 md:h-12 mr-3 object-contain"
      />
      <h1 className="text-xl md:text-2xl font-bold" style={{ color: BRAND_CONSTANTS.brand.colors.primary }}>
        {BRAND_CONSTANTS.brand.shortName} - Payroll Assistant
      </h1>
    </header>
  );
};
