export interface Mission {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  category: 'phishing' | 'malware' | 'social' | 'password' | 'privacy' | 'financial';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  estimatedTime: number; // in minutes
  videoUrl?: string;
  challenges: Challenge[];
  badge?: string;
  prerequisites?: string[];
  completed?: boolean;
  progress?: number;
}

export interface Challenge {
  id: string;
  type: 'quiz' | 'interactive' | 'video';
  content: any;
  points: number;
}