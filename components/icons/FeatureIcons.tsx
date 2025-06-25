
import React from 'react';

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

export const PayrollIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.219 12.768 11 12 11c-.768 0-1.536.219-2.121.782A2.25 2.25 0 0 0 9 13.5c0 .85.223 1.554.66 2.118l.879-.659zM15.75 10.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5h.008v.008h-.008V7.5Zm-.75-.75h.008v.008h-.008v-.008Zm.75-.75h.008v.008h-.008V6Zm-.75-.75h.008v.008H15V5.25Z" />
  </svg>
);

export const BenefitsIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

export const TaxIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12A2.25 2.25 0 0 0 20.25 14.25V3M3.75 20.25h16.5M16.5 3.75h.008v.008H16.5V3.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h6m-6 3h3m2.25 6H9.75A.75.75 0 0 1 9 18.75V17.25m3 .75H15A.75.75 0 0 0 15.75 18v.75m.75-1.5V15a1.5 1.5 0 0 0-1.5-1.5H9.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h3.375c.621 0 1.125-.504 1.125-1.125Z" />
  </svg>
);

export const LeaveIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
  </svg>
);

export const SelfServiceIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25H12.75M12 9.75V12.75M12 21.75c2.676 0 5.216-.584 7.499-1.632M12 21.75c-2.676 0-5.216-.584-7.499-1.632M9.75 14.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V12a2.25 2.25 0 0 0-4.5 0v2.25Z" />
  </svg>
);
