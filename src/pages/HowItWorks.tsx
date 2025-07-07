import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, MessageSquare, CheckCircle, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-primary" />,
      title: "1. Sign Up",
      description: "Create your account as either a client looking for services or a skilled worker offering services."
    },
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "2. Find & Connect",
      description: "Clients can browse and find workers, or post jobs. Workers can search for opportunities and apply."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "3. Communicate",
      description: "Use our built-in messaging system to discuss project details, timelines, and pricing."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "4. Complete Work",
      description: "Work together to complete the project successfully with clear milestones and communication."
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "5. Rate & Review",
      description: "Leave feedback to help build trust in the SkillLink community for future collaborations."
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Verified Professionals",
      description: "All workers are verified with proper certifications and background checks."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Secure Messaging",
      description: "Communicate safely through our platform with built-in conversation history."
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      title: "Rating System",
      description: "Transparent reviews and ratings help you make informed decisions."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How SkillLink Works
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connecting skilled professionals with clients is simple and secure. 
              Here's how our platform brings projects to life.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Get Started in 5 Simple Steps</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="flex justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* For Clients Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">For Clients</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Post Your Project</h3>
                      <p className="text-muted-foreground">Describe your project, set your budget, and specify requirements.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Browse Professionals</h3>
                      <p className="text-muted-foreground">Search through verified workers by skill, location, and rating.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Secure Communication</h3>
                      <p className="text-muted-foreground">Chat directly with professionals to discuss your project details.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/register">
                    <Button size="lg">Start Hiring Today</Button>
                  </Link>
                </div>
              </div>
              
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-4">What Clients Love</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>Quality verified professionals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>Transparent pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>Fast project completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* For Workers Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="p-8 order-2 lg:order-1">
                <h3 className="text-xl font-semibold mb-4">Why Workers Choose Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>Flexible work opportunities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>Fair and competitive pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>Build your reputation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>Connect with quality clients</span>
                  </div>
                </div>
              </Card>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">For Workers</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Create Your Profile</h3>
                      <p className="text-muted-foreground">Showcase your skills, experience, and previous work portfolio.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Find Great Projects</h3>
                      <p className="text-muted-foreground">Browse available jobs or get contacted directly by interested clients.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Grow Your Business</h3>
                      <p className="text-muted-foreground">Build lasting relationships and grow your client base through excellent work.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/register">
                    <Button size="lg">Join as a Professional</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals and clients who trust SkillLink for their projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Sign Up as Client
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join as Worker
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HowItWorks;