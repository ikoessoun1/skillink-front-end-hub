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
    '0264963137',

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

    try {
      const response = await fetch(
        `http://localhost:8000/api/numbers/check/?number=${encodeURIComponent(phoneNumber.trim())}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: "Access Denied",
            description: "This phone number is not subscribed to SkillLink service.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Server Error",
            description: "Something went wrong, please try again later.",
            variant: "destructive",
          });
        }
        return;
      }

      const data = await response.json();

      if (data.is_active) {
        setIsVerified(true);
        toast({
          title: "Welcome to SkillLink!",
          description: "Phone number verified successfully.",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "This phone number is deactivated.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Network Error",
        description: "Unable to reach the server. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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