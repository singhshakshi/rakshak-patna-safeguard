import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Phone,
  Calendar,
  Trophy,
  Shield,
  Star,
  Award,
  Target,
  Zap,
  ChevronRight,
  Edit,
  ArrowLeft
} from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const levelProgress = ((user?.points || 0) % 100);
  const nextLevelPoints = 100 - levelProgress;

  const achievements = [
    { icon: Shield, name: 'Security Expert', progress: 75, total: 100 },
    { icon: Trophy, name: 'Mission Master', progress: 8, total: 10 },
    { icon: Star, name: 'Quick Learner', progress: 45, total: 50 },
    { icon: Award, name: 'Community Helper', progress: 12, total: 20 },
  ];

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
              {t('User Profile', 'उपयोगकर्ता प्रोफ़ाइल')}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {user?.phoneNumber}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {t('Joined', 'शामिल हुए')}: {new Date(user?.joinedAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            {/* Level Progress */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {t('Level', 'स्तर')} {user?.level || 1}
                </span>
                <span className="text-sm text-muted-foreground">
                  {nextLevelPoints} {t('points to next level', 'अगले स्तर तक अंक')}
                </span>
              </div>
              <Progress value={levelProgress} className="h-3" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{user?.points || 0}</div>
                <div className="text-xs text-muted-foreground">{t('Total Points', 'कुल अंक')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{user?.badges?.length || 0}</div>
                <div className="text-xs text-muted-foreground">{t('Badges', 'बैज')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{user?.completedMissions?.length || 0}</div>
                <div className="text-xs text-muted-foreground">{t('Missions', 'मिशन')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              {t('Your Badges', 'आपके बैज')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {user?.badges?.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="text-3xl mb-1">{badge.icon}</span>
                  <span className="text-xs font-medium text-center">{badge.name}</span>
                </div>
              ))}
              {/* Locked badges */}
              {[...Array(6 - (user?.badges?.length || 0))].map((_, i) => (
                <div
                  key={`locked-${i}`}
                  className="flex flex-col items-center p-3 rounded-lg bg-muted/20 opacity-50"
                >
                  <div className="text-3xl mb-1 grayscale">🔒</div>
                  <span className="text-xs text-muted-foreground">{t('Locked', 'लॉक')}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {t('Achievements', 'उपलब्धियां')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <achievement.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{achievement.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {achievement.progress}/{achievement.total}
                  </span>
                </div>
                <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2"
            onClick={() => navigate('/progress')}
          >
            <Zap className="h-6 w-6" />
            <span>{t('View Progress', 'प्रगति देखें')}</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2"
            onClick={() => navigate('/missions')}
          >
            <Trophy className="h-6 w-6" />
            <span>{t('Continue Learning', 'सीखना जारी रखें')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}