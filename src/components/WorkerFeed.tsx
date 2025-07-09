import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, MessageCircle, Share, Star, MapPin, Play } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { Worker } from '@/data/mockData';

interface WorkerFeedProps {
  workers: Worker[];
}

// Mock portfolio posts data
const mockPortfolioPosts = [
  {
    id: '1',
    workerId: 'w1',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    caption: 'Just finished installing custom kitchen cabinets for a beautiful home renovation. The craftsmanship really shines through! 🔨✨',
    likes: 24,
    comments: 6,
    timestamp: '2024-07-06T10:30:00Z',
    project: 'Kitchen Cabinet Installation'
  },
  {
    id: '2',
    workerId: 'w2',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop',
    caption: 'Electrical panel upgrade completed! Safety and efficiency are my top priorities. This 200-amp service will handle all modern electrical needs.',
    likes: 18,
    comments: 4,
    timestamp: '2024-07-05T14:15:00Z',
    project: 'Electrical Panel Upgrade'
  },
  {
    id: '3',
    workerId: 'w3',
    type: 'video',
    content: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
    caption: 'Quick plumbing repair demo! Fixed this leaky pipe in under 30 minutes. Sometimes the simplest solutions are the best. 💧🔧',
    likes: 32,
    comments: 8,
    timestamp: '2024-07-04T16:45:00Z',
    project: 'Emergency Plumbing Repair'
  },
  {
    id: '4',
    workerId: 'w4',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    caption: 'Completed this stunning brick patio project! The precision in laying each brick creates a timeless design that will last for decades.',
    likes: 41,
    comments: 12,
    timestamp: '2024-07-03T09:20:00Z',
    project: 'Brick Patio Construction'
  },
  {
    id: '5',
    workerId: 'w5',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop',
    caption: 'Before and after shots of this interior painting project. Fresh paint can completely transform a space! 🎨',
    likes: 27,
    comments: 9,
    timestamp: '2024-07-02T11:00:00Z',
    project: 'Interior House Painting'
  },
  {
    id: '6',
    workerId: 'w1',
    type: 'video',
    content: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    caption: 'Time-lapse of custom shelving installation. Precision measuring and cutting are key to professional results!',
    likes: 35,
    comments: 7,
    timestamp: '2024-07-01T13:30:00Z',
    project: 'Custom Shelving'
  }
];

const WorkerFeed: React.FC<WorkerFeedProps> = ({ workers }) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const getWorkerById = (workerId: string) => {
    return workers.find(w => w.id === workerId);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Filter posts to only show workers that match current filters
  const filteredPosts = mockPortfolioPosts.filter(post => 
    workers.some(worker => worker.id === post.workerId)
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {filteredPosts.map(post => {
        const worker = getWorkerById(post.workerId);
        if (!worker) return null;

        const isLiked = likedPosts.has(post.id);

        return (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={worker.avatar} />
                  <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-sm">{worker.name}</h3>
                    <Badge variant="outline" className="text-xs">{worker.category}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {worker.rating}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {worker.location}
                    </div>
                    <span>{formatTimeAgo(post.timestamp)}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            </CardHeader>

            <CardContent className="px-0 pb-3">
              {/* Media Content - Carousel for workshop images */}
              <div className="relative mb-4">
                {worker.workshopImages && worker.workshopImages.length > 0 ? (
                  <Carousel 
                    className="w-full"
                    plugins={[
                      Autoplay({
                        delay: 3000,
                        stopOnInteraction: true,
                        stopOnMouseEnter: true,
                      }),
                    ]}
                  >
                    <CarouselContent>
                      {worker.workshopImages.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative">
                            <img 
                              src={image} 
                              alt={`${worker.name} workshop ${index + 1}`}
                              className="w-full h-80 object-cover"
                            />
                            {post.type === 'video' && index === 0 && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 rounded-full p-3">
                                  <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                    
                    {/* Project Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-black/70 text-white border-none">
                        {post.project}
                      </Badge>
                    </div>
                  </Carousel>
                ) : (
                  <div className="relative">
                    <img 
                      src={post.content} 
                      alt={post.project}
                      className="w-full h-80 object-cover"
                    />
                    {post.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    )}
                    
                    {/* Project Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/70 text-white border-none">
                        {post.project}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-6 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className="p-0 h-auto hover:bg-transparent"
                    >
                      <Heart 
                        className={`w-6 h-6 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                      />
                      <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                      <MessageCircle className="w-6 h-6 mr-1 text-muted-foreground" />
                      <span className="text-sm">{post.comments}</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                      <Share className="w-6 h-6 text-muted-foreground" />
                    </Button>
                  </div>

                  <div className="text-sm font-semibold">
                    ${worker.hourlyRate}/hr
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="px-6">
                <p className="text-sm">
                  <span className="font-semibold mr-2">{worker.name}</span>
                  {post.caption}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">No portfolio posts found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more workers</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkerFeed;