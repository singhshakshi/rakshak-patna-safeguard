import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import NavMenu from '@/components/NavMenu';
import LanguageToggle from '@/components/LanguageToggle';
import ThreatCard from '@/components/ThreatCard';
import QuizCard from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, TrendingUp, Zap, BookOpen } from 'lucide-react';
import { Threat, Quiz } from '@/types/threat';
import { useNavigate } from 'react-router-dom';

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
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">{t('Cyber-Safe Patna', 'साइबर-सेफ पटना')}</h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <Badge className="bg-gradient-primary text-primary-foreground">
                <Zap className="h-3 w-3 mr-1" />
                {user?.points || 0} {t('pts', 'अंक')}
              </Badge>
              <NavMenu />
            </div>
          </div>
        </div>
      </header>

      {/* SOS Button - Fixed Position Top Right */}
      <div className="fixed top-20 right-4 z-40">
        <Button
          variant="destructive"
          size="sm"
          className="shadow-lg"
          onClick={() => navigate('/sos')}
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          {t('SOS', 'SOS')}
        </Button>
      </div>

      {/* Hero Section with Trending Alert */}
      <div className="container mx-auto px-4 py-4">
        <Card className="bg-gradient-danger text-destructive-foreground mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 animate-pulse" />
              <div className="flex-1">
                <p className="font-semibold">⚠️ {t('TRENDING ALERT', 'ट्रेंडिंग अलर्ट')}</p>
                <p className="text-sm opacity-90">
                  {t('New WhatsApp scam targeting Patna residents', 'पटना निवासियों को लक्षित करने वाला नया व्हाट्सएप घोटाला')}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={() => navigate('/recent-frauds')}
              >
                {t('View Details', 'विवरण देखें')}
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
            <span>{t('Start Learning', 'सीखना शुरू करें')}</span>
          </Button>
          <Button
            variant="secondary"
            className="h-auto py-4 flex flex-col gap-2"
            onClick={() => navigate('/recent-frauds')}
          >
            <TrendingUp className="h-6 w-6" />
            <span>{t('Recent Frauds', 'हाल की धोखाधड़ी')}</span>
          </Button>
        </div>

        {/* Main Feed */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t('For You - Latest Threats', 'आपके लिए - नवीनतम खतरे')}
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
            <h3 className="text-lg font-semibold mb-3">{t('Test Your Knowledge', 'अपना ज्ञान परखें')}</h3>
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
              <h3 className="font-semibold mb-2">{t('Recommended Mission', 'अनुशंसित मिशन')}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t('Password Security Basics', 'पासवर्ड सुरक्षा मूल बातें')}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('Learn to create unbreakable passwords', 'अटूट पासवर्ड बनाना सीखें')}
                  </p>
                </div>
                <Button size="sm" onClick={() => navigate('/missions')}>
                  {t('Start', 'शुरू करें')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}