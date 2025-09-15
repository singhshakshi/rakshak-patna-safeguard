import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import NavMenu from '@/components/NavMenu';
import ThreatCard from '@/components/ThreatCard';
import QuizCard from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, TrendingUp, Zap, BookOpen } from 'lucide-react';
import { Threat, Quiz } from '@/types/threat';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockThreats: Threat[] = [
  {
    id: '1',
    title: 'Fake Government Scheme Alert',
    titleHi: 'नकली सरकारी योजना चेतावनी',
    description: 'Scammers claiming to offer PM Awas Yojana benefits via WhatsApp',
    descriptionHi: 'व्हाट्सएप के माध्यम से पीएम आवास योजना के लाभ देने का दावा करने वाले धोखेबाज',
    severity: 'critical',
    category: 'Financial Fraud',
    reportedCount: 145,
    timestamp: new Date(),
    location: 'Patna City',
    preventionTips: [
      'Never share OTP with anyone',
      'Verify schemes on official government websites',
      'Report suspicious messages immediately',
    ],
  },
  {
    id: '2',
    title: 'Fake Job Offer Scam',
    titleHi: 'नकली नौकरी ऑफर घोटाला',
    description: 'Fraudulent job postings asking for registration fees',
    descriptionHi: 'पंजीकरण शुल्क मांगने वाली धोखाधड़ी वाली नौकरी पोस्टिंग',
    severity: 'high',
    category: 'Employment Fraud',
    reportedCount: 89,
    timestamp: new Date(),
    location: 'Boring Road',
    preventionTips: [
      'Legitimate companies never ask for upfront payment',
      'Research the company thoroughly',
      'Meet only at official company locations',
    ],
  },
];

const mockQuiz: Quiz = {
  id: '1',
  question: 'What should you do if someone asks for your OTP?',
  questionHi: 'अगर कोई आपका OTP मांगे तो आपको क्या करना चाहिए?',
  options: [
    { id: '1', text: 'Share it if they claim to be from bank', textHi: 'अगर वे बैंक से होने का दावा करें तो शेयर करें' },
    { id: '2', text: 'Never share OTP with anyone', textHi: 'कभी किसी के साथ OTP शेयर न करें' },
    { id: '3', text: 'Share only if they know your name', textHi: 'केवल तभी शेयर करें जब वे आपका नाम जानते हों' },
    { id: '4', text: 'Share if they threaten you', textHi: 'अगर वे आपको धमकी दें तो शेयर करें' },
  ],
  correctAnswerId: '2',
  explanation: 'OTP is confidential and should never be shared with anyone, not even bank officials. Banks never ask for OTP.',
  points: 10,
};

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sosActive, setSosActive] = useState(false);

  const handleSOS = () => {
    setSosActive(true);
    toast({
      title: "SOS Activated!",
      description: "Emergency help request sent to Cyber Police",
      variant: "destructive",
    });
    
    // Navigate to SOS screen after a short delay
    setTimeout(() => {
      navigate('/sos');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Cyber-Safe Patna</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-primary text-primary-foreground">
                <Zap className="h-3 w-3 mr-1" />
                {user?.points || 0} pts
              </Badge>
              <NavMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Trending Alert */}
      <div className="container mx-auto px-4 py-4">
        <Card className="bg-gradient-danger text-destructive-foreground mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 animate-pulse" />
              <div className="flex-1">
                <p className="font-semibold">⚠️ TRENDING ALERT</p>
                <p className="text-sm opacity-90">
                  New WhatsApp scam targeting Patna residents - Click to learn more
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={() => navigate('/threats')}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="hero"
            className="h-auto py-4 flex flex-col gap-2"
            onClick={() => navigate('/missions')}
          >
            <BookOpen className="h-6 w-6" />
            <span>Start Learning</span>
          </Button>
          <Button
            variant="secondary"
            className="h-auto py-4 flex flex-col gap-2"
            onClick={() => navigate('/recent-frauds')}
          >
            <TrendingUp className="h-6 w-6" />
            <span>Recent Frauds</span>
          </Button>
        </div>

        {/* Main Feed */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            For You - Latest Threats
          </h2>

          {/* Threat Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {mockThreats.map((threat) => (
              <ThreatCard
                key={threat.id}
                threat={threat}
                onLearnMore={() => navigate(`/threat/${threat.id}`)}
              />
            ))}
          </div>

          {/* Interactive Quiz */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Test Your Knowledge</h3>
            <QuizCard
              quiz={mockQuiz}
              onComplete={(correct) => {
                if (correct) {
                  // Update user points
                  console.log('Quiz completed correctly!');
                }
              }}
            />
          </div>

          {/* Recommended Mission */}
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Recommended Mission</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Password Security Basics</p>
                  <p className="text-xs text-muted-foreground">
                    Learn to create unbreakable passwords
                  </p>
                </div>
                <Button size="sm" onClick={() => navigate('/missions')}>
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating SOS Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="sos"
          size="xl"
          className={`rounded-full shadow-2xl ${sosActive ? 'scale-110' : ''}`}
          onClick={handleSOS}
        >
          <AlertTriangle className="h-6 w-6 mr-2" />
          CYBER SOS
        </Button>
      </div>
    </div>
  );
}