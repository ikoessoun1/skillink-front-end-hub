import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getJobsByWorkerId, mockJobs, getApplicationsByWorkerId, getUserById, Worker } from '@/data/mockData';
import { Calendar, DollarSign, MapPin, Star, User, Search, MessageSquare, Clock } from 'lucide-react';

const WorkerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAvailable, setIsAvailable] = useState(true);

  if (!user || user.type !== 'worker') {
    return <div>Access denied</div>;
  }

  // Use user directly instead of casting
  const myJobs = getJobsByWorkerId(user.id);
  const myApplications = getApplicationsByWorkerId(user.id);
  const availableJobs = mockJobs.filter(job => 
    job.status === 'open' && 
    job.category === user.category &&
    !myApplications.some(app => app.jobId === job.id)
  );

  const activeJobs = myJobs.filter(job => job.status === 'in-progress');
  const completedJobs = myJobs.filter(job => job.status === 'completed');
  const pendingApplications = myApplications.filter(app => app.status === 'pending');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Hello, {user.name}!
              </h1>
              <p className="text-muted-foreground">
                Check for new job requests and manage your work
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="availability">Available for work</Label>
                <Switch
                  id="availability"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
              </div>
              <Badge variant={isAvailable ? "default" : "secondary"}>
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview & Available Jobs</TabsTrigger>
            <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.total_jobs || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Lifetime completed
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {user.rating || 0}
                    <Star className="h-5 w-5 text-yellow-400 ml-1 fill-current" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average rating
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeJobs.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently working
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingApplications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting response
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with these common tasks</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/browse-jobs">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Jobs
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/profile">
                    <User className="w-4 h-4 mr-2" />
                    Update Profile
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/messages">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest job activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...activeJobs, ...completedJobs.slice(0, 2)].map((job) => {
                    const client = getUserById(job.clientId);
                    return (
                      <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>Client: {client?.name}</span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-3 h-3 mr-1" />
                              ${job.budget}
                            </span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Available Jobs Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Available Jobs</h2>
                <Badge variant="outline">{availableJobs.length} jobs available</Badge>
              </div>

              <div className="grid gap-6">
                {availableJobs.map((job) => {
                  const client = getUserById(job.clientId);
                  
                  return (
                    <Card key={job.id} className="shadow-card hover:shadow-hover transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <CardDescription className="mt-2">{job.description}</CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Badge className={getUrgencyColor(job.urgency)}>
                              {job.urgency} priority
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ${job.budget}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Posted {job.createdAt}
                          </span>
                        </div>

                        {client && (
                          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={client.avatar} alt={client.name} />
                              <AvatarFallback>
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{client.name}</p>
                              <p className="text-sm text-muted-foreground">{client.location}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.slice(0, 2).map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Completed Jobs Tab */}
          <TabsContent value="completed" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Completed Jobs</h2>
            
            <div className="grid gap-6">
              {completedJobs.map((job) => {
                const client = getUserById(job.clientId);
                
                return (
                  <Card key={job.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="mt-1">{job.description}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${job.budget}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Completed {job.completedAt}
                        </span>
                      </div>

                      {client && (
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={client.avatar} alt={client.name} />
                              <AvatarFallback>
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{client.name}</p>
                              <p className="text-sm text-muted-foreground">{client.location}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Review
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Messages</h2>
            <Card className="shadow-card">
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">
                  Message functionality will be implemented here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WorkerDashboard;