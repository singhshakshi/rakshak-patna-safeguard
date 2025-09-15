import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  MapPin,
  Calendar,
  Phone,
  Globe,
  IndianRupee,
  User,
  MessageSquare,
  Camera,
  FileText,
  Info,
  CheckCircle
} from 'lucide-react';

export default function ReportCrime() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
    dateTime: '',
    victimPhone: '',
    victimName: '',
    amountLost: '',
    suspectInfo: '',
    websiteUrl: '',
    evidence: '',
    anonymous: false,
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const crimeTypes = [
    { id: 'financial', label: t('Financial Fraud', 'वित्तीय धोखाधड़ी'), icon: IndianRupee },
    { id: 'identity', label: t('Identity Theft', 'पहचान चोरी'), icon: User },
    { id: 'social', label: t('Social Media Scam', 'सोशल मीडिया घोटाला'), icon: MessageSquare },
    { id: 'job', label: t('Job Fraud', 'नौकरी धोखाधड़ी'), icon: FileText },
    { id: 'other', label: t('Other', 'अन्य'), icon: AlertTriangle },
  ];

  const handleSubmit = () => {
    toast({
      title: t('Report Submitted', 'रिपोर्ट जमा की गई'),
      description: t('Thank you for helping keep our community safe!', 'हमारे समुदाय को सुरक्षित रखने में मदद के लिए धन्यवाद!'),
    });
    
    // Add points for reporting
    if (user) {
      // In real app, this would update via API
      console.log('Adding points for report');
    }
    
    navigate('/recent-frauds');
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
                {t('Report Crime', 'अपराध की रिपोर्ट करें')}
              </h1>
            </div>
            <Badge variant="secondary">
              {t(`Step ${step} of ${totalSteps}`, `चरण ${step} / ${totalSteps}`)}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  {t('Why Report?', 'रिपोर्ट क्यों करें?')}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t(
                    'Your report helps protect others in the community. Even if it happened to someone else, reporting it can prevent future crimes.',
                    'आपकी रिपोर्ट समुदाय में दूसरों की सुरक्षा में मदद करती है। भले ही यह किसी और के साथ हुआ हो, इसकी रिपोर्ट करने से भविष्य के अपराधों को रोका जा सकता है।'
                  )}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    {t('100% Confidential', '100% गोपनीय')}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {t('+20 Points', '+20 अंक')}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Steps */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Basic Information', 'बुनियादी जानकारी')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t('Crime Type', 'अपराध का प्रकार')}</Label>
                <RadioGroup 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({...formData, type: value})}
                  className="grid grid-cols-2 gap-3 mt-2"
                >
                  {crimeTypes.map((type) => (
                    <div key={type.id}>
                      <RadioGroupItem
                        value={type.id}
                        id={type.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={type.id}
                        className="flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/10"
                      >
                        <type.icon className="h-5 w-5" />
                        <span className="text-sm">{type.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="title">{t('Title', 'शीर्षक')}</Label>
                <Input
                  id="title"
                  placeholder={t('Brief title of the incident', 'घटना का संक्षिप्त शीर्षक')}
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  {t('Location', 'स्थान')}
                </Label>
                <Input
                  id="location"
                  placeholder={t('Where did this happen?', 'यह कहाँ हुआ?')}
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dateTime">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {t('Date & Time', 'दिनांक और समय')}
                </Label>
                <Input
                  id="dateTime"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Incident Details', 'घटना का विवरण')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">{t('Description', 'विवरण')}</Label>
                <Textarea
                  id="description"
                  placeholder={t('Describe what happened...', 'बताएं क्या हुआ...')}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="mt-1 min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="victimName">
                  <User className="inline h-4 w-4 mr-1" />
                  {t('Victim Name (Optional)', 'पीड़ित का नाम (वैकल्पिक)')}
                </Label>
                <Input
                  id="victimName"
                  placeholder={t('Name of the person affected', 'प्रभावित व्यक्ति का नाम')}
                  value={formData.victimName}
                  onChange={(e) => setFormData({...formData, victimName: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="victimPhone">
                  <Phone className="inline h-4 w-4 mr-1" />
                  {t('Contact Number (Optional)', 'संपर्क नंबर (वैकल्पिक)')}
                </Label>
                <Input
                  id="victimPhone"
                  type="tel"
                  placeholder={t('Phone number', 'फोन नंबर')}
                  value={formData.victimPhone}
                  onChange={(e) => setFormData({...formData, victimPhone: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="amountLost">
                  <IndianRupee className="inline h-4 w-4 mr-1" />
                  {t('Amount Lost (if any)', 'खोई गई राशि (यदि कोई हो)')}
                </Label>
                <Input
                  id="amountLost"
                  type="number"
                  placeholder="0"
                  value={formData.amountLost}
                  onChange={(e) => setFormData({...formData, amountLost: e.target.value})}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Additional Information', 'अतिरिक्त जानकारी')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="suspectInfo">{t('Suspect Information', 'संदिग्ध की जानकारी')}</Label>
                <Textarea
                  id="suspectInfo"
                  placeholder={t('Any details about the suspect...', 'संदिग्ध के बारे में कोई विवरण...')}
                  value={formData.suspectInfo}
                  onChange={(e) => setFormData({...formData, suspectInfo: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="websiteUrl">
                  <Globe className="inline h-4 w-4 mr-1" />
                  {t('Website/App (if applicable)', 'वेबसाइट/ऐप (यदि लागू हो)')}
                </Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>{t('Evidence', 'सबूत')}</Label>
                <div className="mt-2 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="h-4 w-4 mr-2" />
                    {t('Upload Screenshots', 'स्क्रीनशॉट अपलोड करें')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    {t('Upload Documents', 'दस्तावेज़ अपलोड करें')}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="anonymous" className="text-sm">
                  {t('Report anonymously', 'गुमनाम रूप से रिपोर्ट करें')}
                </Label>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep} className="flex-1">
              {t('Previous', 'पिछला')}
            </Button>
          )}
          {step < totalSteps ? (
            <Button onClick={nextStep} className="flex-1">
              {t('Next', 'अगला')}
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              {t('Submit Report', 'रिपोर्ट जमा करें')}
            </Button>
          )}
        </div>

        {/* Safety Tips */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              {t('Safety Tips', 'सुरक्षा सुझाव')}
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• {t('Never delete evidence messages or emails', 'सबूत संदेश या ईमेल कभी न हटाएं')}</li>
              <li>• {t('Take screenshots immediately', 'तुरंत स्क्रीनशॉट लें')}</li>
              <li>• {t('Note down all details while fresh in memory', 'याददाश्त में ताज़ा रहते हुए सभी विवरण नोट करें')}</li>
              <li>• {t('Contact your bank if money was involved', 'यदि पैसा शामिल था तो अपने बैंक से संपर्क करें')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}