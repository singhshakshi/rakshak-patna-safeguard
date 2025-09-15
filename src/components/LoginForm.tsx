import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Phone, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, sendOTP } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await sendOTP(phoneNumber);
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await login(phoneNumber, otp);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-xl bg-card/95 backdrop-blur">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Cyber-Safe Patna
          </CardTitle>
          <CardDescription className="text-center text-base">
            सुरक्षित पटना, सुरक्षित आप
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Mobile Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
                disabled={otpSent}
                maxLength={10}
              />
            </div>
          </div>

          {otpSent && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Enter OTP
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="otp"
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="pl-10"
                  maxLength={6}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                OTP sent to {phoneNumber}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          {!otpSent ? (
            <Button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </Button>
              <Button
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                }}
                variant="ghost"
                className="w-full"
              >
                Resend OTP
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}