import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  AlertTriangle,
  TrendingUp,
  Shield,
  Users,
  IndianRupee,
  Calendar,
  MapPin,
  Phone,
  Globe,
  MessageSquare,
  Trophy,
  Flame,
  Clock,
  ChevronRight,
  Target,
  Zap
} from 'lucide-react';
import { Threat } from '@/types/threat';

export default function RecentFrauds() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fraudCategories = [
    { id: 'all', name: t('All', 'सभी'), count: 42 },
    { id: 'financial', name: t('Financial', 'वित्तीय'), count: 18 },
    { id: 'identity', name: t('Identity', 'पहचान'), count: 12 },
    { id: 'social', name: t('Social Media', 'सोशल मीडिया'), count: 8 },
    { id: 'job', name: t('Job Scams', 'नौकरी घोटाले'), count: 4 },
  ];

  const recentFrauds: Threat[] = [
    {
      id: '1',
      title: 'Fake Loan App Scam',
      titleHi: 'नकली लोन ऐप घोटाला',
      description: 'Multiple victims reported losing money to fake instant loan apps',
      descriptionHi: 'कई पीड़ितों ने नकली इंस्टेंट लोन ऐप से पैसे खोने की सूचना दी',
      severity: 'critical',
      category: 'Financial Fraud',
      reportedCount: 234,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      location: 'Gandhi Maidan',
      preventionTips: [
        'Only use RBI-registered loan apps',
        'Never share personal documents on WhatsApp',
        'Check app reviews before downloading'
      ],
    },
    {
      id: '2',
      title: 'WhatsApp Investment Scam',
      titleHi: 'व्हाट्सएप निवेश घोटाला',
      description: 'Scammers promising 200% returns on cryptocurrency investments',
      descriptionHi: 'क्रिप्टोकरेंसी निवेश पर 200% रिटर्न का वादा करने वाले धोखेबाज',
      severity: 'high',
      category: 'Financial Fraud',
      reportedCount: 156,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      location: 'Boring Road',
      preventionTips: [
        'No legitimate investment offers guaranteed high returns',
        'Always verify investment opportunities with SEBI',
        'Be wary of unsolicited investment advice'
      ],
    },
    {
      id: '3',
      title: 'Fake Railway Recruitment',
      titleHi: 'नकली रेलवे भर्ती',
      description: 'Fraudsters charging fees for non-existent railway jobs',
      descriptionHi: 'गैर-मौजूद रेलवे नौकरियों के लिए शुल्क वसूलने वाले धोखेबाज',
      severity: 'high',
      category: 'Employment Fraud',
      reportedCount: 89,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      location: 'Patna Junction',
      preventionTips: [
        'Check official railway website for recruitments',
        'Government jobs never ask for upfront payment',
        'Verify all job postings with official sources'
      ],
    },
  ];

  // Gamification elements
  const fraudDetectionChallenge = {
    title: t('Fraud Detection Challenge', 'धोखाधड़ी पहचान चुनौती'),
    description: t('Test your skills and earn points!', 'अपने कौशल का परीक्षण करें और अंक अर्जित करें!'),
    reward: 50,
    timeLimit: '5 min',
  };

  const communityStats = {
    fraudsReported: 1247,
    fraudsPrevented: 892,
    moneySaved: 45000000,
    activeGuardians: 3456,
  };

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return t('Just now', 'अभी');
    if (hours < 24) return `${hours} ${t('hours ago', 'घंटे पहले')}`;
    const days = Math.floor(hours / 24);
    return `${days} ${t('days ago', 'दिन पहले')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">
                {t('Recent Frauds', 'हाल की धोखाधड़ी')}
              </h1>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              <Flame className="h-3 w-3 mr-1" />
              {t('42 Active', '42 सक्रिय')}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* Community Impact Card */}
        <Card className="bg-gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t('Community Impact', 'समुदाय प्रभाव')}
              </h3>
              <Badge variant="secondary">
                <Trophy className="h-3 w-3 mr-1" />
                {t('Level 3', 'स्तर 3')}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">₹{(communityStats.moneySaved / 10000000).toFixed(1)}Cr</div>
                <div className="text-xs text-muted-foreground">{t('Money Saved', 'बचाया गया धन')}</div>
              </div>
              <div className="text-center p-2 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{communityStats.activeGuardians}</div>
                <div className="text-xs text-muted-foreground">{t('Active Guardians', 'सक्रिय रक्षक')}</div>
              </div>
            </div>
            <Progress value={75} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {t('75% to next community level', 'अगले समुदाय स्तर तक 75%')}
            </p>
          </CardContent>
        </Card>

        {/* Gamified Challenge */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {fraudDetectionChallenge.title}
                </h3>
                <p className="text-sm opacity-90 mt-1">{fraudDetectionChallenge.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className="bg-white/20 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    +{fraudDetectionChallenge.reward} {t('points', 'अंक')}
                  </Badge>
                  <Badge className="bg-white/20 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {fraudDetectionChallenge.timeLimit}
                  </Badge>
                </div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate('/quiz')}
              >
                {t('Start', 'शुरू करें')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full">
            {fraudCategories.slice(0, 4).map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex-1">
                <span className="text-xs">{category.name}</span>
                {category.count > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1 h-4">
                    {category.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4 mt-4">
            {/* Fraud Cards */}
            {recentFrauds.map((fraud) => (
              <Card key={fraud.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant={fraud.severity === 'critical' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {fraud.severity === 'critical' ? 
                            t('Critical', 'गंभीर') : 
                            t('High Risk', 'उच्च जोखिम')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {getTimeAgo(fraud.timestamp)}
                        </span>
                      </div>
                      <CardTitle className="text-base">
                        {t(fraud.title, fraud.titleHi)}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {t(fraud.description, fraud.descriptionHi)}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {fraud.location}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      {fraud.reportedCount} {t('reports', 'रिपोर्ट')}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {fraud.category}
                    </Badge>
                  </div>

                  {/* Interactive Elements */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/fraud/${fraud.id}`)}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      {t('Learn Defense', 'सुरक्षा सीखें')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {}}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Gamification Progress */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">
                        {t('Community Defense Level', 'समुदाय रक्षा स्तर')}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        <Trophy className="h-3 w-3 mr-1" />
                        {Math.floor(fraud.reportedCount / 50)} XP
                      </Badge>
                    </div>
                    <Progress value={Math.min((fraud.reportedCount / 300) * 100, 100)} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Report Fraud Button */}
        <Button
          variant="hero"
          className="w-full"
          onClick={() => navigate('/report')}
        >
          <AlertTriangle className="h-5 w-5 mr-2" />
          {t('Report New Fraud', 'नई धोखाधड़ी की रिपोर्ट करें')}
        </Button>

        {/* Stats Card */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t('Fraud Trends This Week', 'इस सप्ताह धोखाधड़ी के रुझान')}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('Loan App Scams', 'लोन ऐप घोटाले')}</span>
                <div className="flex items-center gap-2">
                  <Progress value={65} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('Job Frauds', 'नौकरी धोखाधड़ी')}</span>
                <div className="flex items-center gap-2">
                  <Progress value={30} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('Investment Scams', 'निवेश घोटाले')}</span>
                <div className="flex items-center gap-2">
                  <Progress value={45} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">45%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}