import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  mockWorkers, 
  mockClients, 
  mockJobs, 
  mockApplications, 
  mockReviews,
  serviceCategories 
} from '@/data/mockData';
import { Database, Users, Briefcase, FileText, Star, Settings, Home, LogIn, UserPlus, Monitor, Wrench } from 'lucide-react';

const DebugInfo: React.FC = () => {
  const routes = [
    { path: '/', name: 'Landing Page', icon: <Home className="w-4 h-4" />, description: 'Homepage with hero section and features' },
    { path: '/login', name: 'Login', icon: <LogIn className="w-4 h-4" />, description: 'User authentication page' },
    { path: '/register', name: 'Register', icon: <UserPlus className="w-4 h-4" />, description: 'User registration page' },
    { path: '/client-dashboard', name: 'Client Dashboard', icon: <Monitor className="w-4 h-4" />, description: 'Dashboard for clients to manage jobs' },
    { path: '/worker-dashboard', name: 'Worker Dashboard', icon: <Wrench className="w-4 h-4" />, description: 'Dashboard for workers to find jobs' },
    { path: '/messages', name: 'Messages', icon: <FileText className="w-4 h-4" />, description: 'Chat system for communication' },
    { path: '/debug', name: 'Debug Info', icon: <Database className="w-4 h-4" />, description: 'This page - development info' }
  ];

  const demoAccounts = [
    {
      type: 'Client',
      email: 'emily.rodriguez@email.com',
      password: 'demo123',
      name: 'Emily Rodriguez',
      description: 'Property manager with multiple jobs posted'
    },
    {
      type: 'Client', 
      email: 'michael.brown@email.com',
      password: 'demo123',
      name: 'Michael Brown',
      description: 'Homeowner looking for various services'
    },
    {
      type: 'Worker',
      email: 'marcus.johnson@email.com', 
      password: 'demo123',
      name: 'Marcus Johnson',
      description: 'Experienced carpenter with high ratings'
    },
    {
      type: 'Worker',
      email: 'sarah.martinez@email.com',
      password: 'demo123', 
      name: 'Sarah Martinez',
      description: 'Licensed electrician specializing in smart homes'
    },
    {
      type: 'Worker',
      email: 'david.thompson@email.com',
      password: 'demo123',
      name: 'David Thompson', 
      description: '24/7 emergency plumber with great reviews'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">SkillLink Debug Info</h1>
            </div>
            <p className="text-muted-foreground">
              Development information, mock data overview, and navigation links
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Available Routes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Available Routes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {routes.map((route) => (
                  <div key={route.path} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      {route.icon}
                      <div>
                        <Link to={route.path} className="font-medium text-primary hover:underline">
                          {route.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{route.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{route.path}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Demo Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Demo Login Credentials</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {demoAccounts.map((account, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={account.type === 'Client' ? 'default' : 'secondary'}>
                        {account.type}
                      </Badge>
                      <span className="text-sm font-mono text-muted-foreground">demo123</span>
                    </div>
                    <h4 className="font-medium">{account.name}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{account.email}</p>
                    <p className="text-xs text-muted-foreground">{account.description}</p>
                  </div>
                ))}
                <div className="text-center pt-3">
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Go to Login Page
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mock Data Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{mockWorkers.length}</h3>
                <p className="text-sm text-muted-foreground">Workers</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Monitor className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{mockClients.length}</h3>
                <p className="text-sm text-muted-foreground">Clients</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Briefcase className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{mockJobs.length}</h3>
                <p className="text-sm text-muted-foreground">Jobs</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-warning mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{mockReviews.length}</h3>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Service Categories */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Service Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {serviceCategories.map((category) => (
                  <div key={category.id} className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h4 className="font-medium">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features Status */}
          <Card>
            <CardHeader>
              <CardTitle>Features Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">✅ Completed Features</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Authentication system (login/register)</li>
                    <li>• Client and Worker dashboards</li>
                    <li>• Job posting and browsing</li>
                    <li>• Application system</li>
                    <li>• User profiles and ratings</li>
                    <li>• Responsive design</li>
                    <li>• Mock data integration</li>
                    <li>• Real-time chat system</li>
                    <li>• Local storage persistence</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">🔧 Technical Stack</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• React 18 with TypeScript</li>
                    <li>• Tailwind CSS design system</li>
                    <li>• Shadcn/ui components</li>
                    <li>• React Router for navigation</li>
                    <li>• Local storage for data persistence</li>
                    <li>• Responsive mobile-first design</li>
                    <li>• Component-based architecture</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DebugInfo;