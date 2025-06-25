
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  avatar?: string; // For bot messages
  isLoading?: boolean; // For streaming bot messages
}

export type ChatMessage = Message; // Alias for clarity in chat context

export interface BrandingConstants {
  brand: {
    shortName: string;
    longName: string;
    website: string;
    email: string;
    mobile: string;
    slogan: string;
    colors: {
      primary: string;
      secondary: string;
    };
    logo: {
      title: string;
      favicon: string;
    };
    chatbot: {
      avatar: string;
      face: string;
    };
    socialMedia: {
      blog: string;
      linkedin: string;
      instagram: string;
      github: string;
      x: string;
      youtube: string;
    };
  };
}

export interface FAQItem {
  id: string;
  question: string;
}

export interface FAQKnowledgeItem {
  question: string;
  answer: string;
  category?: string; // Optional: for organization
}
