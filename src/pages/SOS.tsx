import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SOS() {
  const navigate = useNavigate();

  const emergencySteps = [
    "Do not delete any messages or evidence",
    "Take screenshots of all communications",
    "Contact your bank immediately if financial",
    "File a complaint at cybercrime.gov.in",
    "Call 1930 - National Cyber Crime Helpline",
  ];

  return (
    <div className="min-h-screen bg-gradient-danger/10 p-4">
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader className="bg-gradient-danger text-destructive-foreground">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Emergency Response Activated
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-success/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-success mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Alert Sent Successfully</span>
            </div>
            <p className="text-sm">Patna Cyber Police has been notified</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Immediate Steps to Take:
            </h3>
            <ol className="space-y-2">
              {emergencySteps.map((step, index) => (
                <li key={index} className="flex gap-2">
                  <span className="font-bold text-primary">{index + 1}.</span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Emergency Contacts:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Cyber Crime Helpline: 1930</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Patna Police: 100</span>
              </div>
            </div>
          </div>

          <Button onClick={() => navigate('/')} className="w-full" variant="hero">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}