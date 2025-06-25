
import React from 'react';
import { BRAND_CONSTANTS } from '../constants';
import { PayrollIcon, BenefitsIcon, TaxIcon, LeaveIcon, SelfServiceIcon } from './icons/FeatureIcons';

interface HomePageProps {
  onStartChat: () => void;
}

const features = [
  {
    title: "Payroll Support",
    description: "Get help with pay calculations, understanding your pay stub, direct deposit issues, and overtime queries.",
    icon: <PayrollIcon className="w-12 h-12 mb-4 text-teal-600" />,
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200"
  },
  {
    title: "Benefits Administration",
    description: "Explore health insurance options, FSA/HSA details, retirement plans, and learn about dependent coverage.",
    icon: <BenefitsIcon className="w-12 h-12 mb-4 text-sky-600" />,
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200"
  },
  {
    title: "Tax & Compliance",
    description: "Understand tax withholdings (W-4/TD1), access tax documents (W-2/T4), and learn about deductions.",
    icon: <TaxIcon className="w-12 h-12 mb-4 text-indigo-600" />,
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  {
    title: "Leave Management",
    description: "Check your PTO, sick leave, vacation balances, request time off, and understand leave policies.",
    icon: <LeaveIcon className="w-12 h-12 mb-4 text-amber-600" />,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  },
  {
    title: "Employee Self-Service",
    description: "Access information 24/7, get guidance on updating personal details, and ask HR policy questions.",
    icon: <SelfServiceIcon className="w-12 h-12 mb-4 text-rose-600" />,
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onStartChat }) => {
  return (
    <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-6 overflow-y-auto bg-slate-50">
      <div className="max-w-4xl w-full text-center">
        <img 
          src={BRAND_CONSTANTS.brand.chatbot.face || BRAND_CONSTANTS.brand.chatbot.avatar} 
          alt="Chatbot Face" 
          className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mt-4 mb-6 shadow-lg border-4 border-yellow-300" // Added mt-4 for a bit of top margin
        />
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{color: BRAND_CONSTANTS.brand.colors.secondary}}>
          Welcome to {BRAND_CONSTANTS.brand.shortName}'s Payroll Assistant
        </h2>
        <p className="text-md md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Your AI-powered companion for quick answers to payroll, benefits, and HR-related questions. 
          Let's make managing your employment details easier!
        </p>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className={`p-6 rounded-xl shadow-lg border transform transition-all hover:scale-105 hover:shadow-xl ${feature.bgColor} ${feature.borderColor}`}
              >
                <div className="flex justify-center">
                 {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2" style={{color: BRAND_CONSTANTS.brand.colors.secondary}}>{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onStartChat}
          className="px-8 py-3 text-lg font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-105 mb-6" // Added mb-6 for bottom margin
          style={{ 
            backgroundColor: BRAND_CONSTANTS.brand.colors.primary, 
            color: BRAND_CONSTANTS.brand.colors.secondary,
            borderColor: BRAND_CONSTANTS.brand.colors.secondary,
          }}
          aria-label="Start chat with the assistant"
        >
          Chat with Assistant
        </button>
      </div>
    </main>
  );
};