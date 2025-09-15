export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  avatar?: string;
  points: number;
  level: number;
  badges: Badge[];
  completedMissions: string[];
  joinedAt: Date;
  lastActive: Date;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}