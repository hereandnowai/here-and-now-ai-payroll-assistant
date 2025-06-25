import { BrandingConstants, FAQItem, FAQKnowledgeItem } from './types';

export const BRAND_CONSTANTS: BrandingConstants = {
  brand: {
    shortName: "HERE AND NOW AI",
    longName: "HERE AND NOW AI - Artificial Intelligence Research Institute",
    website: "https://hereandnowai.com",
    email: "info@hereandnowai.com",
    mobile: "+91 996 296 1000",
    slogan: "designed with passion for innovation",
    colors: {
      primary: "#FFDF00",
      secondary: "#004040"
    },
    logo: {
      title: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png",
      favicon: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/favicon-logo-with-name.png"
    },
    chatbot: {
      avatar: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg",
      face: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel-face.jpeg"
    },
    socialMedia: {
      blog: "https://hereandnowai.com/blog",
      linkedin: "https://www.linkedin.com/company/hereandnowai/",
      instagram: "https://instagram.com/hereandnow_ai",
      github: "https://github.com/hereandnowai",
      x: "https://x.com/hereandnow_ai",
      youtube: "https://youtube.com/@hereandnow_ai"
    }
  }
};

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-CA', name: 'English (Canada)' },
  { code: 'fr-FR', name: 'Français (FR)' },
  { code: 'fr-CA', name: 'Français (CA)' },
  { code: 'nl-NL', name: 'Nederlands (NL)' },
  // Add other languages here as needed
  // { code: 'es-ES', name: 'Español (ES)' },
  // { code: 'de-DE', name: 'Deutsch (DE)' },
];

export const DEFAULT_FAQS: FAQItem[] = [
  { id: 'faq1', question: 'How is my net pay calculated?' },
  { id: 'faq2', question: 'Can you explain my health insurance options?' },
  { id: 'faq3', question: 'How do I check my leave balance?' },
  { id: 'faq4', question: 'Where can I find my W-2 form?' },
  { id: 'faq5', question: 'What is direct deposit?' },
  { id: 'faq6', question: 'Can I change my tax withholding?' },
  { id: 'faq7', question: 'How do I request time off?' },
  { id: 'faq8', question: 'What is a 401(k)?' },
  { id: 'faq9', question: 'What should I do if I find an error in my paycheck?' },
  { id: 'faq10', question: 'What is a pay stub?' },
  { id: 'faq11', question: 'What is FICA?' },
  { id: 'faq12', question: 'What is overtime pay?' },
  { id: 'faq13', question: 'What is an FSA?' },
  { id: 'faq14', question: 'How are payroll taxes calculated?' },
];

export const SYSTEM_INSTRUCTION = `You are '${BRAND_CONSTANTS.brand.shortName} - Payroll & Benefits Assistant', an expert AI assistant specializing in payroll and benefits management for employees of '${BRAND_CONSTANTS.brand.longName}'. Your branding colors are primary ${BRAND_CONSTANTS.brand.colors.primary} and secondary ${BRAND_CONSTANTS.brand.colors.secondary}. Your chatbot avatar represents '${BRAND_CONSTANTS.brand.chatbot.face}' (persona name Caramel). The company slogan is "${BRAND_CONSTANTS.brand.slogan}".

Your role is to provide accurate, helpful, and comprehensive responses to employee questions about payroll, benefits, compensation, taxes, leave policies, and HR-related topics.

Tone: Friendly, professional, empathetic, and solution-oriented.
Communication Style: Clear, concise, and jargon-free explanations.
Expertise Level: Expert knowledge in payroll processing, benefits administration, tax regulations, and employment law.

Primary Functionalities (respond as if you can perform these):
- Payroll Support: Calculate pay, explain stubs, direct deposit, error reporting, history, advances, overtime.
- Benefits Administration: Health options, enrollment, FSA/HSA, retirement, dependents, COBRA, summaries.
- Tax and Compliance: Withholdings, W-4/TD1, tax docs (W-2, T4), deductions, garnishments, compliance training info.
- Leave Management: Balances (PTO, sick, vacation), requests, policies, parental leave, holiday pay, FMLA.
- Employee Self-Service: 24/7 info access, pay stubs, personal info updates (guide, don't do), password resets (guide), verification letters, HR policy questions.

Response Structure:
1. Immediate Answer: Direct response.
2. Detailed Explanation: Comprehensive info with context.
3. Next Steps: Clear action items or follow-up instructions.
4. Additional Resources: Suggest links to forms, policies, or contact info (use placeholders like "[Link to Policy Document]" or "[HR Contact Information]").

Information Gathering (Simulated):
- Acknowledge the question.
- If necessary, ask clarifying questions (e.g., "To help you with that, could you please provide a hypothetical employee ID or the specific pay period you're referring to?").
- State that in a real system, you would verify identity securely. For this conversation, proceed with generalized information or based on hypothetical details provided by the user.

Security and Privacy:
- Remind users not to share actual sensitive Personal Identifiable Information (PII) in this chat.
- If a question implies sharing sensitive PII, gently remind them and offer to answer based on a hypothetical scenario or provide general information.
- State that for confidential matters requiring human intervention, you would normally redirect to HR.

Escalation (Simulated):
- If a query is too complex, involves a legal compliance question beyond standard policies, sensitive employee relations, or requires manager/HR approval, acknowledge your limitations as an AI.
- Explain that in a real scenario, this would be escalated to the appropriate HR department or manager.
- Suggest what the user's next steps would be in a real situation (e.g., "For this specific type of complex issue, you would typically contact the HR department directly at [HR email/phone placeholder] or submit a ticket through the internal HR portal.").

Multilingual Support: You are capable of understanding and responding in multiple languages. If the user's query is accompanied by an instruction to respond in a specific language (e.g., due to a language selection in the interface), please provide your full response in that language. Ensure your tone, professionalism, and the requested response structure are maintained across all languages.

Do not make up specific employee data. Provide general explanations or ask the user for hypothetical scenarios if needed.
Your goal is to resolve employee inquiries efficiently while providing an excellent user experience that simulates a helpful HR assistant.
Remember to always maintain a helpful, professional demeanor.`;

// NOTE: The following KNOWLEDGE_BASE is a sample.
// Please continue to populate it with the full list of FAQs provided.
export const KNOWLEDGE_BASE: FAQKnowledgeItem[] = [
  // Payroll Basics
  {
    category: "Payroll Basics",
    question: "What is payroll?",
    answer: "Payroll is the process of calculating and distributing employee wages, including deductions for taxes and benefits, on a regular schedule. (Sources: 1, 2)"
  },
  {
    category: "Payroll Basics",
    question: "What is gross pay?",
    answer: "Gross pay is the total amount earned by an employee before any deductions are made. (Sources: 3, 4)"
  },
  {
    category: "Payroll Basics",
    question: "What is net pay?",
    answer: "Net pay is the amount an employee receives after all deductions, such as taxes and benefits, have been subtracted from gross pay. (Sources: 3, 4)"
  },
  {
    category: "Payroll Basics",
    question: "What is a pay period?",
    answer: "A pay period is the recurring schedule (weekly, bi-weekly, semi-monthly, monthly) over which employees are paid. (Sources: 4, 2)"
  },
  {
    category: "Payroll Basics",
    question: "How often are employees paid?",
    answer: "Employees may be paid weekly, bi-weekly, semi-monthly, or monthly, depending on company policy and local laws. (Source: 2)"
  },
  {
    category: "Payroll Basics",
    question: "What is a pay stub?",
    answer: "A pay stub is a document provided to employees each pay period, detailing gross pay, deductions, and net pay. (Sources: 4, 5)"
  },
  {
    category: "Payroll Basics",
    question: "How do I access my pay stub?",
    answer: "You can typically access your pay stub through the HR portal or by requesting it from the payroll chatbot. (Source: 5)"
  },
  {
    category: "Payroll Basics",
    question: "What is direct deposit?",
    answer: "Direct deposit is an electronic transfer of net pay directly into an employee’s bank account. (Source: 4)"
  },
  {
    category: "Payroll Basics",
    question: "Can I change my bank account for direct deposit?",
    answer: "Yes, you can usually update your bank account details through the HR portal or by contacting payroll."
  },
  {
    category: "Payroll Basics",
    question: "What if my direct deposit didn’t go through?",
    answer: "Contact payroll immediately to verify your bank details and resolve the issue."
  },
  // Payroll Deductions and Taxes
  {
    category: "Payroll Deductions and Taxes",
    question: "What are statutory payroll deductions?",
    answer: "Statutory deductions are mandatory amounts withheld from pay, such as income tax, social security, and unemployment insurance. (Source: 4)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What is income tax withholding?",
    answer: "Income tax withholding is the amount of federal, state, and sometimes local tax deducted from your paycheck. (Sources: 6, 4)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What is FICA?",
    answer: "FICA refers to Federal Insurance Contributions Act taxes, which fund Social Security and Medicare in the U.S. (Source: 6)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What is CPP?",
    answer: "CPP stands for Canada Pension Plan, a mandatory retirement savings plan for Canadian employees. (Source: 4)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What is EI?",
    answer: "EI stands for Employment Insurance, which provides temporary income support to unemployed workers in Canada. (Source: 4)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "How are payroll taxes calculated?",
    answer: "Payroll taxes are calculated based on your earnings, tax forms (like W-4 or TD1), and current government rates. (Sources: 1, 4, 7)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What is a W-4 form?",
    answer: "A W-4 is a U.S. tax form employees complete to determine the amount of federal income tax to withhold from their pay. (Source: 6)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What is a TD1 form?",
    answer: "A TD1 is a Canadian tax form used to determine the amount of tax to deduct from an employee’s income. (Source: 1)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "Can I change my tax withholding?",
    answer: "Yes, you can update your tax forms (W-4 or TD1) at any time by submitting a new form to payroll, usually through the HR portal."
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What are voluntary deductions?",
    answer: "Voluntary deductions are amounts you choose to have withheld from your pay, such as retirement plan contributions or health insurance premiums. (Sources: 6, 4)"
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What is garnishment?",
    answer: "Garnishment is a court-ordered deduction from your wages to pay debts, such as child support or unpaid taxes."
  },
  {
    category: "Payroll Deductions and Taxes",
    question: "What is an EIN?",
    answer: "An Employer Identification Number (EIN) is a unique nine-digit number assigned to businesses by the IRS for tax purposes. (Sources: 6, 2)"
  },
  // Salary and Compensation
  {
    category: "Salary and Compensation",
    question: "What is the difference between salary and hourly pay?",
    answer: "Salaried employees receive a fixed amount of pay per period (e.g., weekly, bi-weekly), regardless of the exact hours worked. Hourly employees are paid based on the number of hours they work, multiplied by an hourly rate. (Source: 3)"
  },
  {
    category: "Salary and Compensation",
    question: "What is overtime pay?",
    answer: "Overtime pay is additional compensation, typically 1.5 times the regular hourly rate, for hours worked beyond the standard workweek (e.g., over 40 hours in the U.S.), as defined by labor laws. (Source: 3)"
  },
  {
    category: "Salary and Compensation",
    question: "Who is eligible for overtime pay?",
    answer: "Eligibility for overtime pay depends on whether an employee is classified as 'non-exempt' under labor laws like the FLSA in the U.S. Exempt employees, typically those in managerial or professional roles with a salary above a certain threshold, are generally not eligible. (Source: 3)"
  },
   // Benefits: Health, Retirement, and More
  {
    category: "Benefits: Health, Retirement, and More",
    question: "What is an FSA?",
    answer: "A Flexible Spending Account (FSA) lets you set aside pre-tax money from your paycheck to pay for eligible out-of-pocket healthcare or dependent care expenses. FSAs are typically subject to a 'use it or lose it' rule at the end of the plan year."
  },
  {
    category: "Benefits: Health, Retirement, and More",
    question: "What is a 401(k)?",
    answer: "A 401(k) is a retirement savings plan sponsored by an employer in the United States. It lets workers save and invest a piece of their paycheck before taxes are taken out. Employers may also match a portion of employee contributions."
  },
  // Leave, Absence, and Time Off
  {
    category: "Leave, Absence, and Time Off",
    question: "How do I request time off?",
    answer: "You can usually request time off by submitting a leave request through the HR portal or by discussing it with your manager. The chatbot can guide you to the portal."
  },
  // Payroll Errors and Corrections
  {
    category: "Payroll Errors and Corrections",
    question: "What should I do if I find an error in my paycheck?",
    answer: "If you find an error in your paycheck, you should report it to your HR department or payroll administrator as soon as possible. Provide them with the details of the error so they can investigate and make any necessary corrections. (Source: 8)"
  },
  // ... Add more FAQs here following the same structure.
  // The user should continue populating this list with all provided data.
];
