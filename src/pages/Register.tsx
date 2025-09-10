import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { SkillSelector } from '@/components/ui/skill-selector';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { serviceCategories, ghanaLocations, skillsByCategory } from '@/data/mockData';
import { getLocations, getCategories, getSkillsByCategory } from '@/services/apiConfig';
import { useToast } from '@/hooks/use-toast';
import { RegisterData } from '@/types/api';

const Register: React.FC = () => {
  const location = useLocation();
  const [userType, setUserType] = useState<'client' | 'worker'>(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    return (typeParam === 'worker' || typeParam === 'client') ? typeParam : 'client';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [userLocation, setUserLocation] = useState('');

  // Client fields
  const [company, setCompany] = useState('');

  // Worker fields
  const [category, setCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [ghanaCard, setGhanaCard] = useState<File | null>(null);
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [workshopImages, setWorkshopImages] = useState<File[]>([]);

  // Data states
  const [locations, setLocations] = useState(ghanaLocations);
  const [categories, setCategories] = useState<{ id: string; name: string; icon: string; description?: string; }[]>(serviceCategories);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  // Client fields  
  const [validId, setValidId] = useState<File | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load locations from API
        const locationsResponse = await getLocations();
        setLocations(locationsResponse.data);
      } catch (error) {
        console.warn('Failed to load locations from API, using demo data');
      }

      try {
        // Try to load categories from API
        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.warn('Failed to load categories from API, using demo data');
      }
    };

    loadData();
  }, []);

  // Load skills when category changes
  useEffect(() => {
    const loadSkills = async () => {
      if (category) {
        try {
          // Try to load skills from API
          const skillsResponse = await getSkillsByCategory(category);
          setAvailableSkills(skillsResponse.data);
        } catch (error) {
          console.warn('Failed to load skills from API, using demo data');
          setAvailableSkills(skillsByCategory[category] || []);
        }
      } else {
        setAvailableSkills([]);
      }
      // Reset selected skills when category changes
      setSelectedSkills([]);
    };

    loadSkills();
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userData: RegisterData = {
        name,
        email,
        password,
        userType,
        phone,
        location: userLocation,
        ...(userType === 'client' 
          ? { company }
          : { 
              category,
              skills: selectedSkills
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
            <h2 className="text-3xl font-bold text-foreground">Get Started</h2>
            <p className="mt-2 text-muted-foreground">
              {userType === 'client' ? 'Find workers for your projects' : 'Start earning money with your skills'}
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{userType === 'client' ? 'I Need Work Done' : 'I Want to Work'}</CardTitle>
              <CardDescription>
                {userType === 'client' 
                  ? 'Tell us about yourself so workers can contact you' 
                  : 'Create your worker profile to start getting jobs'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={userType} onValueChange={(value) => setUserType(value as 'client' | 'worker')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="client">I Need Work Done</TabsTrigger>
                  <TabsTrigger value="worker">I Want to Work</TabsTrigger>
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
                      <SearchableSelect
                        options={locations}
                        value={userLocation}
                        onValueChange={setUserLocation}
                        placeholder="Select your location"
                        searchPlaceholder="Search locations..."
                        emptyText="No locations found."
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

                    <div className="space-y-2">
                      <Label htmlFor="validId">Valid ID Image</Label>
                      <Input
                        id="validId"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setValidId(e.target.files?.[0] || null)}
                        required
                      />
                    </div>
                  </TabsContent>

                  {/* Worker-specific fields */}
                  <TabsContent value="worker" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Primary Category</Label>
                      <SearchableSelect
                        options={categories.map(cat => ({ 
                          value: cat.id, 
                          label: `${cat.icon} ${cat.name}` 
                        }))}
                        value={category}
                        onValueChange={setCategory}
                        placeholder="Select your primary trade"
                        searchPlaceholder="Search categories..."
                        emptyText="No categories found."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Skills (Select up to 8 skills)</Label>
                      {category && availableSkills.length > 0 ? (
                        <SkillSelector
                          availableSkills={availableSkills}
                          selectedSkills={selectedSkills}
                          onSkillToggle={(skill) => {
                            if (selectedSkills.includes(skill)) {
                              setSelectedSkills(selectedSkills.filter(s => s !== skill));
                            } else {
                              setSelectedSkills([...selectedSkills, skill]);
                            }
                          }}
                          maxSkills={8}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Please select a category first to choose your skills.
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ghanaCard">Ghana Card Image</Label>
                      <Input
                        id="ghanaCard"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setGhanaCard(e.target.files?.[0] || null)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personImage">Your Photo</Label>
                      <Input
                        id="personImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPersonImage(e.target.files?.[0] || null)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workshopImages">Workshop Images (3 photos)</Label>
                      <Input
                        id="workshopImages"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setWorkshopImages(Array.from(e.target.files || []).slice(0, 3))}
                        required
                      />
                      <p className="text-xs text-muted-foreground">Upload up to 3 images of your work</p>
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
