import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from './ui/use-toast';

interface PhoneVerificationProps {
  children: React.ReactNode;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo phone numbers for testing
  const subscribedPhones = [
    '+1234567890',
    '+1987654321',
    '+1555123456',
    '+1666777888',
    '+1999888777'
  ];

  useEffect(() => {
    // Log demo phone numbers to console on page load
    console.log('=== SKILLLINK DEMO PHONE NUMBERS ===');
    console.log('Subscribed phone numbers:');
    subscribedPhones.forEach((phone, index) => {
      console.log(`${index + 1}. ${phone}`);
    });
    console.log('=====================================');
  }, []);

  const handleVerifyPhone = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (subscribedPhones.includes(phoneNumber.trim())) {
      setIsVerified(true);
      toast({
        title: "Welcome to SkillLink!",
        description: "Phone number verified successfully.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "This phone number is not subscribed to SkillLink service.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerifyPhone();
    }
  };

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Welcome to SkillLink
          </CardTitle>
          <CardDescription className="text-lg">
            Connect with skilled professionals and find opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Enter your subscribed phone number to access SkillLink
            </p>
          </div>
          <Button 
            onClick={handleVerifyPhone} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify & Enter'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneVerification;