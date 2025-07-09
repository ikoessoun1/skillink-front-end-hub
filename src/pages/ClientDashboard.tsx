import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ChatWindow from '@/components/chat/ChatWindow';
import WorkerCard from '@/components/WorkerCard';
import WorkerFeed from '@/components/WorkerFeed';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getJobsByClientId, mockApplications, getUserById, getApplicationsByJobId, Client, mockWorkers } from '@/data/mockData';
import { MessageSquare, Trash2, Edit, Eye, Star } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);

  if (!user || user.type !== 'client') {
    return <div>Access denied</div>;
  }

  const client = user as Client;
  const myJobs = getJobsByClientId(client.id);
  const applications = mockApplications;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {client.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your projects and connect with skilled workers
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab - Worker Feed */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Worker Portfolio Feed</h2>
              <Button asChild>
                <Link to="/find-workers">Browse All Workers</Link>
              </Button>
            </div>
            
            <WorkerFeed workers={mockWorkers} />
          </TabsContent>


          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Job Applications</h2>
              <Button>
                Post New Job
              </Button>
            </div>
            
            <div className="space-y-6">
              {myJobs.map((job) => {
                const jobApplications = getApplicationsByJobId(job.id);
                
                return (
                  <Card key={job.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <CardDescription>{job.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {jobApplications.length} applications received
                        </p>
                        
                        {jobApplications.map((application) => {
                          const worker = getUserById(application.workerId);
                          if (!worker) return null;
                          
                          return (
                            <div key={application.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={worker.avatar} alt={worker.name} />
                                  <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{worker.name}</h4>
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
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
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
            <h2 className="text-2xl font-bold text-foreground">Messages</h2>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5" />
                      <span>Chat with Workers</span>
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
                          Select a worker from "All Workers" tab to start messaging
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