import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (phoneNumber: string, otp: string) => Promise<void>;
  logout: () => void;
  sendOTP: (phoneNumber: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUser: User = {
  id: '1',
  phoneNumber: '+919876543210',
  name: 'राज कुमार',
  points: 250,
  level: 3,
  badges: [
    {
      id: '1',
      name: 'OTP Guardian',
      icon: '🛡️',
      description: 'Completed OTP security mission',
      earnedAt: new Date(),
    },
  ],
  completedMissions: ['mission1', 'mission2'],
  joinedAt: new Date('2024-01-01'),
  lastActive: new Date(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('cyberSafeUser');
    if (storedUser) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        loading: false,
      });
    }
  }, []);

  const sendOTP = async (phoneNumber: string) => {
    // Simulate OTP sending
    console.log('Sending OTP to:', phoneNumber);
    toast({
      title: "OTP Sent",
      description: `OTP has been sent to ${phoneNumber}`,
    });
  };

  const login = async (phoneNumber: string, otp: string) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept any 6-digit OTP
    if (otp.length === 6) {
      const user = { ...mockUser, phoneNumber };
      localStorage.setItem('cyberSafeUser', JSON.stringify(user));
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });
      toast({
        title: "Welcome Back!",
        description: "You have successfully logged in",
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      throw new Error('Invalid OTP');
    }
  };

  const logout = () => {
    localStorage.removeItem('cyberSafeUser');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    toast({
      title: "Logged Out",
      description: "You have been safely logged out",
    });
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...data };
      localStorage.setItem('cyberSafeUser', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      sendOTP,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};