import React from 'react';
import { Threat } from '@/types/threat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info, ShieldAlert, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThreatCardProps {
  threat: Threat;
  onLearnMore?: () => void;
}

export default function ThreatCard({ threat, onLearnMore }: ThreatCardProps) {
  const getSeverityIcon = () => {
    switch (threat.severity) {
      case 'critical':
        return <ShieldAlert className="h-5 w-5 text-danger" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };

  const getSeverityBadge = () => {
    const severityColors = {
      critical: 'bg-danger text-danger-foreground',
      high: 'bg-destructive text-destructive-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-info text-info-foreground',
    };

    return (
      <Badge className={severityColors[threat.severity]}>
        {threat.severity.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getSeverityIcon()}
            <CardTitle className="text-lg line-clamp-1">
              {threat.title}
            </CardTitle>
          </div>
          {getSeverityBadge()}
        </div>
        {threat.titleHi && (
          <p className="text-sm text-muted-foreground mt-1">{threat.titleHi}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        <CardDescription className="line-clamp-2">
          {threat.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{new Date(threat.timestamp).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{threat.reportedCount} reports</span>
          </div>
          
          {threat.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{threat.location}</span>
            </div>
          )}
        </div>

        <div className="pt-2">
          <p className="text-xs font-semibold mb-1">Prevention Tips:</p>
          <ul className="text-xs space-y-0.5">
            {threat.preventionTips.slice(0, 2).map((tip, index) => (
              <li key={index} className="text-muted-foreground">
                • {tip}
              </li>
            ))}
          </ul>
        </div>

        {onLearnMore && (
          <Button 
            onClick={onLearnMore} 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
          >
            Learn More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}