import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Clock, MessageCircle } from 'lucide-react';
import { Worker } from '@/data/mockData';

interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'default';
      case 'busy': return 'secondary';
      case 'offline': return 'destructive';
      default: return 'secondary';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={worker.avatar} />
            <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{worker.name}</h3>
            <p className="text-muted-foreground text-sm">{worker.category}</p>
            
            <div className="flex items-center space-x-3 mt-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{worker.rating}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {worker.experience}y exp
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {worker.location}
          </div>
          <Badge variant={getAvailabilityColor(worker.availability)}>
            {getAvailabilityText(worker.availability)}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {worker.bio}
        </p>

        <div>
          <h4 className="text-sm font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {worker.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {worker.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{worker.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Rate:</span>
          <span className="font-semibold">${worker.hourlyRate}/hr</span>
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1">
            View Profile
          </Button>
          <Button variant="outline" size="icon">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;