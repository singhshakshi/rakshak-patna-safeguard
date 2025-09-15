import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Zap,
  Shield,
  BookOpen,
  Star
} from 'lucide-react';

export default function ProgressTracking() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const weeklyProgress = [
    { day: 'Mon', points: 20 },
    { day: 'Tue', points: 35 },
    { day: 'Wed', points: 45 },
    { day: 'Thu', points: 30 },
    { day: 'Fri', points: 55 },
    { day: 'Sat', points: 40 },
    { day: 'Sun', points: 25 },
  ];

  const skills = [
    { name: 'Password Security', level: 85, icon: Shield },
    { name: 'Phishing Detection', level: 70, icon: Target },
    { name: 'Safe Browsing', level: 90, icon: BookOpen },
    { name: 'Social Media Safety', level: 60, icon: Star },
  ];

  const recentActivities = [
    { type: 'mission', name: 'Completed OTP Security Mission', points: 50, time: '2 hours ago' },
    { type: 'quiz', name: 'Perfect Score on Phishing Quiz', points: 20, time: '5 hours ago' },
    { type: 'badge', name: 'Earned Password Pro Badge', points: 100, time: '1 day ago' },
    { type: 'mission', name: 'Started Social Media Safety', points: 10, time: '2 days ago' },
  ];

  const maxPoints = Math.max(...weeklyProgress.map(d => d.points));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">
              {t('Progress Tracking', 'प्रगति ट्रैकिंग')}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{t('Total Points', 'कुल अंक')}</p>
                  <p className="text-2xl font-bold">{user?.points || 0}</p>
                </div>
                <Trophy className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-success text-secondary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{t('Current Streak', 'वर्तमान स्ट्रीक')}</p>
                  <p className="text-2xl font-bold">7 {t('days', 'दिन')}</p>
                </div>
                <Zap className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t('Weekly Activity', 'साप्ताहिक गतिविधि')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted rounded-t-md relative flex items-end justify-center">
                    <div
                      className="w-full bg-gradient-primary rounded-t-md transition-all duration-300"
                      style={{ height: `${(day.points / maxPoints) * 100}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t('This week', 'इस सप्ताह')}: 250 {t('points', 'अंक')}
              </span>
              <Badge variant="secondary" className="bg-gradient-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Skills Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {t('Skills Progress', 'कौशल प्रगति')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <skill.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {t('Recent Activity', 'हाल की गतिविधि')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    {activity.type === 'mission' && <BookOpen className="h-5 w-5 text-primary-foreground" />}
                    {activity.type === 'quiz' && <Target className="h-5 w-5 text-primary-foreground" />}
                    {activity.type === 'badge' && <Award className="h-5 w-5 text-primary-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="secondary">+{activity.points}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Motivational Card */}
        <Card className="bg-gradient-card border-primary/20">
          <CardContent className="p-6 text-center">
            <Award className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">{t('Keep Going!', 'जारी रखें!')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("You're on a 7-day streak! Complete today's mission to keep it going.", 
                 "आप 7-दिन की स्ट्रीक पर हैं! इसे जारी रखने के लिए आज का मिशन पूरा करें।")}
            </p>
            <Button onClick={() => navigate('/missions')}>
              {t('Continue Learning', 'सीखना जारी रखें')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}