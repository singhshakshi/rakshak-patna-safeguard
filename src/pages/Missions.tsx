import React from 'react';
import { useNavigate } from 'react-router-dom';
import MissionCard from '@/components/MissionCard';
import NavMenu from '@/components/NavMenu';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';
import { Mission } from '@/types/mission';

const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Password Security Basics',
    titleHi: 'पासवर्ड सुरक्षा की मूल बातें',
    description: 'Learn to create and manage strong passwords',
    category: 'password',
    difficulty: 'beginner',
    points: 50,
    estimatedTime: 10,
    challenges: [],
    completed: true,
    progress: 100,
  },
  {
    id: '2',
    title: 'Spotting Phishing Attacks',
    titleHi: 'फिशिंग हमलों की पहचान',
    description: 'Identify fake emails and messages',
    category: 'phishing',
    difficulty: 'intermediate',
    points: 75,
    estimatedTime: 15,
    challenges: [],
    progress: 60,
  },
  {
    id: '3',
    title: 'Safe Online Banking',
    titleHi: 'सुरक्षित ऑनलाइन बैंकिंग',
    description: 'Secure your financial transactions',
    category: 'financial',
    difficulty: 'advanced',
    points: 100,
    estimatedTime: 20,
    challenges: [],
  },
];

export default function Missions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Cyber-Quest Missions</h1>
            </div>
            <NavMenu />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onStart={() => console.log('Start mission:', mission.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}