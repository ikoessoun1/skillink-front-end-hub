import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { serviceCategories } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const [userType, setUserType] = useState<'client' | 'worker'>('client');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  // Client fields
  const [company, setCompany] = useState('');

  // Worker fields
  const [category, setCategory] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [skills, setSkills] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userData = {
        name,
        email,
        password,
        userType,
        phone,
        location,
        ...(userType === 'client' 
          ? { company }
          : { 
              category,
              hourlyRate: hourlyRate ? parseInt(hourlyRate) : 0,
              skills: skills.split(',').map(s => s.trim()).filter(s => s)
            }
        )
      };

      const success = await register(userData);
      if (success) {
        toast({
          title: 'Welcome to SkillLink!',
          description: 'Your account has been created successfully.',
        });
        const dashboardPath = userType === 'worker' ? '/worker-dashboard' : '/client-dashboard';
        navigate(dashboardPath);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Join SkillLink</h2>
            <p className="mt-2 text-muted-foreground">
              Create your account to get started
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Choose your account type and fill in your details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={userType} onValueChange={(value) => setUserType(value as 'client' | 'worker')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="client">I need work done</TabsTrigger>
                  <TabsTrigger value="worker">I do the work</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Common Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Create a password"
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      placeholder="Enter your city, state"
                    />
                  </div>

                  {/* Client-specific fields */}
                  <TabsContent value="client" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter your company name"
                      />
                    </div>
                  </TabsContent>

                  {/* Worker-specific fields */}
                  <TabsContent value="worker" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Primary Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary trade" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceCategories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.icon} {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="Enter your hourly rate"
                        min="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Textarea
                        id="skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g., Framing, Drywall, Finishing"
                        className="min-h-[80px]"
                      />
                    </div>
                  </TabsContent>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;