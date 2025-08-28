import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import { serviceCategories, mockWorkers, mockReviews, getUserById } from '@/data/mockData';
import heroImage from '@/assets/hero-image.jpg';
import { ArrowDown, User, Search } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const featuredWorkers = mockWorkers.slice(0, 3);
  const recentReviews = mockReviews.slice(0, 3);

  const handleViewProfile = (workerId: string) => {
    navigate(`/worker/${workerId}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Find Workers
                <span className="block text-secondary">Get Work Done Today</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 animate-fade-in">
                Browse skilled workers near you. No signup required to start looking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/find-workers">
                    Browse Workers Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/80 text-white hover:bg-white hover:text-primary bg-transparent" asChild>
                  <Link to="/register?type=worker">
                    I Want to Work
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white" />
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Do You Need Help With?
            </h2>
            <p className="text-xl text-muted-foreground">
              Click on what you need done
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {serviceCategories.map((category) => (
              <Link key={category.id} to={`/find-workers?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-hover transition-all duration-300 cursor-pointer group h-full">
                  <CardHeader className="text-center pb-2">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription>{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              Meet some of our top-rated skilled workers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorkers.map((worker) => (
              <Card key={worker.id} className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={worker.avatar} alt={worker.name} />
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{worker.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {worker.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
                    <span>⭐ {worker.rating}</span>
                    <span>•</span>
                    <span>{worker.totalJobs} jobs</span>
                    <span>•</span>
                    <span>${worker.hourlyRate}/hr</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {worker.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{worker.location}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => handleViewProfile(worker.id)}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real reviews from satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentReviews.map((review) => {
              const reviewer = getUserById(review.reviewerId);
              const reviewee = getUserById(review.revieweeId);
              return (
                <Card key={review.id} className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={reviewer?.avatar} alt={reviewer?.name} />
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{reviewer?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          About {reviewee?.name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of professionals and clients on SkillLink today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register?type=worker">
                <User className="w-5 h-5 mr-2" />
                I Want to Work
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/80 text-white hover:bg-white hover:text-primary bg-transparent" asChild>
              <Link to="/register?type=client">
                <Search className="w-5 h-5 mr-2" />
                I Need Work Done
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
