import React from 'react';
import { Mission } from '@/types/mission';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Trophy, Lock, CheckCircle, PlayCircle } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  onStart?: () => void;
  isLocked?: boolean;
}

export default function MissionCard({ mission, onStart, isLocked = false }: MissionCardProps) {
  const getDifficultyColor = () => {
    switch (mission.difficulty) {
      case 'advanced':
        return 'bg-danger text-danger-foreground';
      case 'intermediate':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-success text-success-foreground';
    }
  };

  const getCategoryIcon = () => {
    const icons: Record<string, string> = {
      phishing: '🎣',
      malware: '🦠',
      social: '👥',
      password: '🔐',
      privacy: '🔒',
      financial: '💰',
    };
    return icons[mission.category] || '📚';
  };

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${isLocked ? 'opacity-60' : ''} bg-gradient-card`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon()}</span>
            <div>
              <CardTitle className="text-lg">
                {mission.title}
              </CardTitle>
              {mission.titleHi && (
                <p className="text-sm text-muted-foreground">{mission.titleHi}</p>
              )}
            </div>
          </div>
          <Badge className={getDifficultyColor()}>
            {mission.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {mission.description}
        </CardDescription>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-warning" />
            <span>{mission.points} points</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{mission.estimatedTime} min</span>
          </div>
        </div>

        {mission.completed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Completed!</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        ) : mission.progress ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Progress</span>
              <span>{mission.progress}%</span>
            </div>
            <Progress value={mission.progress} className="h-2" />
          </div>
        ) : null}

        <Button 
          onClick={onStart}
          disabled={isLocked}
          variant={mission.completed ? "success" : "default"}
          size="sm"
          className="w-full"
        >
          {isLocked ? (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Locked
            </>
          ) : mission.completed ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Review Mission
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4 mr-2" />
              Start Mission
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}