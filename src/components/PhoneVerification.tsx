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
  const [isNotSubscribed, setIsNotSubscribed] = useState(false);

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
    setIsNotSubscribed(false);

    try {
      const response = await fetch(
        `http://localhost:8000/api/numbers/check/?number=${encodeURIComponent(phoneNumber.trim())}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setIsNotSubscribed(true);
          toast({
            title: "Not Subscribed",
            description: "Sorry, your number is not subscribed to SkillLink service.",
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

  const handleSubscribe = async () => {
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
      // Register the new number
      const registerResponse = await fetch(`http://localhost:8000/api/numbers/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: phoneNumber.trim()
        }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        toast({
          title: "Subscription Failed",
          description: errorData.detail || "Unable to subscribe this number.",
          variant: "destructive",
        });
        return;
      }

      const registeredNumber = await registerResponse.json();

      // Check if number needs activation (only activate if not already active)
      if (!registeredNumber.is_active) {
        const activateResponse = await fetch(
          `http://localhost:8000/api/numbers/${registeredNumber.id}/activate/`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!activateResponse.ok) {
          toast({
            title: "Activation Failed",
            description: "Number registered but activation failed. Please contact support.",
            variant: "destructive",
          });
          return;
        }
      }

      setIsVerified(true);
      setIsNotSubscribed(false);
      toast({
        title: "Welcome to SkillLink!",
        description: "Successfully subscribed and activated your number.",
      });
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Network Error",
        description: "Unable to reach the server. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (isNotSubscribed) {
      handleSubscribe();
    } else {
      handleVerifyPhone();
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleButtonClick();
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
            onClick={handleButtonClick} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading 
              ? (isNotSubscribed ? 'Subscribing...' : 'Verifying...') 
              : (isNotSubscribed ? 'Subscribe at 30 pesewas daily' : 'Verify')
            }
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneVerification;