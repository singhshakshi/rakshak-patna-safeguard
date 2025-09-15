export interface Threat {
  id: string;
  title: string;
  titleHi?: string; // Hindi title
  description: string;
  descriptionHi?: string; // Hindi description
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  reportedCount: number;
  timestamp: Date;
  location?: string;
  preventionTips: string[];
}

export interface Quiz {
  id: string;
  question: string;
  questionHi?: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation: string;
  points: number;
}

export interface QuizOption {
  id: string;
  text: string;
  textHi?: string;
}