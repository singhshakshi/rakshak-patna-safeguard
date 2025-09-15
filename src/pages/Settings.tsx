import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Bell,
  Shield,
  Moon,
  Globe,
  Volume2,
  Smartphone,
  Lock,
  HelpCircle,
  FileText,
  Mail,
  ChevronRight
} from 'lucide-react';

export default function Settings() {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);

  const settingsGroups = [
    {
      title: t('Preferences', 'प्राथमिकताएं'),
      items: [
        {
          icon: Globe,
          label: t('Language', 'भाषा'),
          value: language === 'en' ? 'English' : 'हिन्दी',
          action: () => setLanguage(language === 'en' ? 'hi' : 'en'),
          type: 'button'
        },
        {
          icon: Bell,
          label: t('Push Notifications', 'पुश सूचनाएं'),
          value: notifications,
          action: setNotifications,
          type: 'switch'
        },
        {
          icon: Moon,
          label: t('Dark Mode', 'डार्क मोड'),
          value: darkMode,
          action: setDarkMode,
          type: 'switch'
        },
        {
          icon: Volume2,
          label: t('Sound Effects', 'ध्वनि प्रभाव'),
          value: soundEffects,
          action: setSoundEffects,
          type: 'switch'
        }
      ]
    },
    {
      title: t('Security', 'सुरक्षा'),
      items: [
        {
          icon: Lock,
          label: t('Change PIN', 'पिन बदलें'),
          action: () => {},
          type: 'button'
        },
        {
          icon: Smartphone,
          label: t('Biometric Authentication', 'बायोमेट्रिक प्रमाणीकरण'),
          value: biometricAuth,
          action: setBiometricAuth,
          type: 'switch'
        },
        {
          icon: Shield,
          label: t('Privacy Settings', 'गोपनीयता सेटिंग्स'),
          action: () => {},
          type: 'button'
        }
      ]
    },
    {
      title: t('Support', 'सहायता'),
      items: [
        {
          icon: HelpCircle,
          label: t('Help Center', 'सहायता केंद्र'),
          action: () => {},
          type: 'button'
        },
        {
          icon: FileText,
          label: t('Terms & Conditions', 'नियम और शर्तें'),
          action: () => {},
          type: 'button'
        },
        {
          icon: Mail,
          label: t('Contact Us', 'संपर्क करें'),
          action: () => {},
          type: 'button'
        }
      ]
    }
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
              {t('Settings', 'सेटिंग्स')}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <Card key={groupIndex}>
            <CardHeader>
              <CardTitle className="text-base">{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {group.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  {itemIndex > 0 && <Separator />}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <Label className="font-normal">{item.label}</Label>
                    </div>
                    {item.type === 'switch' ? (
                      <Switch
                        checked={item.value as boolean}
                        onCheckedChange={item.action as (checked: boolean) => void}
                      />
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={item.action as () => void}
                        className="text-muted-foreground"
                      >
                        {item.value || <ChevronRight className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* App Info */}
        <Card>
          <CardContent className="py-6 text-center space-y-2">
            <h3 className="font-semibold">{t('Cyber-Safe Patna', 'साइबर-सेफ पटना')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('Version', 'संस्करण')} 1.0.0
            </p>
            <p className="text-xs text-muted-foreground">
              {t('Your Digital Rakshak', 'आपका डिजिटल रक्षक')}
            </p>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          {t('Logout', 'लॉग आउट')}
        </Button>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            {t('Made with ❤️ for Patna', 'पटना के लिए ❤️ से बनाया गया')}
          </p>
        </div>
      </div>
    </div>
  );
}