import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Star, MapPin, Phone, Mail, Calendar, Award, Briefcase } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  const isWorker = user.type === 'worker';

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    {isWorker && (
                      <Badge variant="outline">{(user as any).category}</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </div>
                    {user.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {user.phone}
                      </div>
                    )}
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {user.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {isWorker && (
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{(user as any).rating}</span>
                        <span className="text-muted-foreground ml-1">rating</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        <span className="font-medium">{(user as any).totalJobs}</span>
                        <span className="text-muted-foreground ml-1">jobs completed</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button>Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Bio/About */}
                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {isWorker 
                          ? (user as any).bio 
                          : `${user.name} is a client on SkillLink looking for skilled professionals for various projects.`
                        }
                      </p>
                    </CardContent>
                  </Card>

                  {/* Skills (for workers) */}
                  {isWorker && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Skills & Expertise</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {(user as any).skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Certifications (for workers) */}
                  {isWorker && (user as any).certifications && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          Certifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {(user as any).certifications.map((cert: string, index: number) => (
                            <div key={index} className="flex items-center">
                              <Award className="w-4 h-4 mr-2 text-primary" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isWorker ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Experience</span>
                            <span className="font-medium">{(user as any).experience} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Hourly Rate</span>
                            <span className="font-medium">${(user as any).hourlyRate}/hr</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Jobs Completed</span>
                            <span className="font-medium">{(user as any).totalJobs}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rating</span>
                            <span className="font-medium">{(user as any).rating}/5.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <Badge variant={(user as any).availability === 'available' ? 'default' : 'secondary'}>
                              {(user as any).availability}
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Jobs Posted</span>
                            <span className="font-medium">{(user as any).jobsPosted || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Spent</span>
                            <span className="font-medium">${(user as any).totalSpent || 0}</span>
                          </div>
                          {(user as any).company && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Company</span>
                              <span className="font-medium">{(user as any).company}</span>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio">
              <Card>
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-medium text-muted-foreground">Portfolio Coming Soon</h3>
                  <p className="text-muted-foreground">Showcase your best work here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-medium text-muted-foreground">Reviews Coming Soon</h3>
                  <p className="text-muted-foreground">Client and worker reviews will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;