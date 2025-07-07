import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatWindow from '@/components/chat/ChatWindow';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getJobsByClientId, mockJobs, mockApplications, getUserById, getApplicationsByJobId, Client } from '@/data/mockData';
import { Calendar, DollarSign, MapPin, Clock, User, Plus, MessageSquare } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);

  if (!user || user.type !== 'client') {
    return <div>Access denied</div>;
  }

  const client = user as Client;
  const myJobs = getJobsByClientId(client.id);
  const openJobs = myJobs.filter(job => job.status === 'open');
  const inProgressJobs = myJobs.filter(job => job.status === 'in-progress');
  const completedJobs = myJobs.filter(job => job.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
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
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hello, {client.name}!
          </h1>
          <p className="text-muted-foreground">
            Find workers, send messages, and get your projects done
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active Jobs</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Jobs Posted</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{client.jobsPosted}</div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{openJobs.length + inProgressJobs.length}</div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedJobs.length}</div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${client.totalSpent.toLocaleString()}</div>
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
                  <Link to="/post-job">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/find-workers">
                    <User className="w-4 h-4 mr-2" />
                    Browse Workers
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

            {/* Recent Jobs */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>Your latest job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            ${job.budget}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {job.createdAt}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        <Badge className={getUrgencyColor(job.urgency)}>
                          {job.urgency}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Jobs Tab */}
          <TabsContent value="active" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Active Jobs</h2>
              <Button asChild>
                <Link to="/post-job">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {[...openJobs, ...inProgressJobs].map((job) => {
                const applications = getApplicationsByJobId(job.id);
                const worker = job.workerId ? getUserById(job.workerId) : null;
                
                return (
                  <Card key={job.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="mt-1">{job.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <Badge className={getUrgencyColor(job.urgency)}>
                            {job.urgency}
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

                      {worker && (
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={worker.avatar} alt={worker.name} />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">Assigned to {worker.name}</p>
                            <p className="text-sm text-muted-foreground">{worker.type === 'worker' ? (worker as any).category : ''}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {applications.length} applications received
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {job.status === 'open' && (
                            <Button size="sm">
                              Review Applications
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Completed Jobs Tab */}
          <TabsContent value="completed" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Completed Jobs</h2>
            
            <div className="grid gap-6">
              {completedJobs.map((job) => {
                const worker = job.workerId ? getUserById(job.workerId) : null;
                
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

                      {worker && (
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={worker.avatar} alt={worker.name} />
                              <AvatarFallback>
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">Completed by {worker.name}</p>
                              <p className="text-sm text-muted-foreground">{worker.type === 'worker' ? (worker as any).category : ''}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Leave Review
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Applications</h2>
            
            <div className="space-y-6">
              {myJobs.filter(job => job.status === 'open').map((job) => {
                const applications = getApplicationsByJobId(job.id);
                
                if (applications.length === 0) return null;
                
                return (
                  <Card key={job.id} className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription>{applications.length} applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {applications.map((application) => {
                          const worker = getUserById(application.workerId);
                          if (!worker) return null;
                          
                          return (
                            <div key={application.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={worker.avatar} alt={worker.name} />
                                  <AvatarFallback>
                                    <User className="w-5 h-5" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium text-foreground">{worker.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {worker.type === 'worker' ? (worker as any).category : ''} • ${application.proposedRate}/hr
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    "{application.message}"
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View Profile
                                </Button>
                                <Button size="sm">
                                  Accept
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5" />
                      <span>Messages</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeChatUserId ? (
                      <ChatWindow 
                        recipientId={activeChatUserId}
                        onClose={() => setActiveChatUserId(null)}
                      />
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No active conversation</h3>
                        <p className="text-muted-foreground">
                          Click "Chat" on any worker profile to start messaging
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ClientDashboard;