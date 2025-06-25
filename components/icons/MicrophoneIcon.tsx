import React from 'react';

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

export const MicrophoneIcon: React.FC<SVGProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3S9 4.343 9 6v6c0 1.657 1.343 3 3 3Z" 
    />
  </svg>
);