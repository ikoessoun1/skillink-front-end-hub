// Mock data for SkillLink platform

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: 'client' | 'worker';
  phone?: string;
  location: string;
  createdAt: string;
}

export interface Worker extends User {
  type: 'worker';
  skills: string[];
  category: string;
  experience: number;
  hourlyRate: number;
  rating: number;
  totalJobs: number;
  availability: 'available' | 'busy' | 'offline';
  bio: string;
  certifications: string[];
  portfolioImages?: string[];
  workshopImages?: string[];
}

export interface Client extends User {
  type: 'client';
  company?: string;
  jobsPosted: number;
  totalSpent: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  clientId: string;
  workerId?: string;
  createdAt: string;
  completedAt?: string;
  requirements: string[];
}

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  message: string;
  proposedRate: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Review {
  id: string;
  jobId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  jobId?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Mock Workers
export const mockWorkers: Worker[] = [
  {
    id: 'w1',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    type: 'worker',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    createdAt: '2024-01-15',
    skills: ['Framing', 'Drywall', 'Finishing', 'Cabinet Installation'],
    category: 'Carpenter',
    experience: 12,
    hourlyRate: 45,
    rating: 4.8,
    totalJobs: 127,
    availability: 'available',
    bio: 'Experienced carpenter specializing in residential and commercial projects. Quality craftsmanship guaranteed.',
    certifications: ['OSHA 10', 'Lead-Safe Certified'],
    portfolioImages: [
      'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=400'
    ],
    workshopImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 'w2',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5d90d27?w=150&h=150&fit=crop&crop=face',
    type: 'worker',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    createdAt: '2024-02-01',
    skills: ['Wiring', 'Panel Installation', 'Troubleshooting', 'Smart Home Setup'],
    category: 'Electrician',
    experience: 8,
    hourlyRate: 55,
    rating: 4.9,
    totalJobs: 89,
    availability: 'available',
    bio: 'Licensed electrician with expertise in residential and commercial electrical systems.',
    certifications: ['Master Electrician License', 'Solar Installation Certified'],
    portfolioImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400',
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400'
    ],
    workshopImages: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 'w3',
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    type: 'worker',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    createdAt: '2024-01-20',
    skills: ['Pipe Installation', 'Drain Cleaning', 'Water Heater Repair', 'Emergency Service'],
    category: 'Plumber',
    experience: 15,
    hourlyRate: 50,
    rating: 4.7,
    totalJobs: 156,
    availability: 'busy',
    bio: 'Reliable plumber offering 24/7 emergency services and quality repairs.',
    certifications: ['Journeyman Plumber', 'Backflow Prevention Certified'],
    portfolioImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400'
    ],
    workshopImages: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 'w4',
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    type: 'worker',
    phone: '+1 (555) 456-7890',
    location: 'Miami, FL',
    createdAt: '2024-03-01',
    skills: ['Bricklaying', 'Stone Work', 'Concrete', 'Restoration'],
    category: 'Mason',
    experience: 10,
    hourlyRate: 40,
    rating: 4.6,
    totalJobs: 78,
    availability: 'available',
    bio: 'Skilled mason specializing in both traditional and modern masonry techniques.',
    certifications: ['NCCER Certified', 'Historic Preservation Specialist'],
    portfolioImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=400',
      'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400'
    ],
    workshopImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 'w5',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    type: 'worker',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    createdAt: '2024-02-15',
    skills: ['Interior Painting', 'Exterior Painting', 'Wallpaper', 'Color Consultation'],
    category: 'Painter',
    experience: 6,
    hourlyRate: 35,
    rating: 4.5,
    totalJobs: 45,
    availability: 'available',
    bio: 'Professional painter with an eye for detail and color matching expertise.',
    certifications: ['EPA RRP Certified', 'Sherwin Williams Certified'],
    portfolioImages: [
      'https://images.unsplash.com/photo-1520637736862-4d197d17c89a?w=400',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'
    ],
    workshopImages: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1520637736862-4d197d17c89a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop'
    ]
  }
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    type: 'client',
    phone: '+1 (555) 111-2222',
    location: 'Austin, TX',
    createdAt: '2024-01-10',
    company: 'Rodriguez Properties',
    jobsPosted: 12,
    totalSpent: 15000
  },
  {
    id: 'c2',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    type: 'client',
    phone: '+1 (555) 222-3333',
    location: 'Denver, CO',
    createdAt: '2024-02-01',
    jobsPosted: 8,
    totalSpent: 8500
  },
  {
    id: 'c3',
    name: 'Jennifer Davis',
    email: 'jennifer.davis@email.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    type: 'client',
    phone: '+1 (555) 333-4444',
    location: 'Boston, MA',
    createdAt: '2024-01-25',
    company: 'Davis Construction Group',
    jobsPosted: 25,
    totalSpent: 45000
  },
  {
    id: 'c4',
    name: 'Robert Kim',
    email: 'robert.kim@email.com',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    type: 'client',
    phone: '+1 (555) 444-5555',
    location: 'San Francisco, CA',
    createdAt: '2024-03-01',
    jobsPosted: 5,
    totalSpent: 3200
  },
  {
    id: 'c5',
    name: 'Amanda Foster',
    email: 'amanda.foster@email.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    type: 'client',
    phone: '+1 (555) 555-6666',
    location: 'Phoenix, AZ',
    createdAt: '2024-02-10',
    jobsPosted: 3,
    totalSpent: 2100
  }
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'Kitchen Cabinet Installation',
    description: 'Need experienced carpenter to install custom kitchen cabinets in a 200 sq ft kitchen. All materials provided.',
    category: 'Carpenter',
    budget: 2500,
    location: 'Austin, TX',
    urgency: 'medium',
    status: 'open',
    clientId: 'c1',
    createdAt: '2024-07-01',
    requirements: ['Experience with cabinet installation', 'Own tools', 'Available weekdays']
  },
  {
    id: 'j2',
    title: 'Electrical Panel Upgrade',
    description: 'Upgrade old electrical panel to 200 amp service. Must be licensed electrician.',
    category: 'Electrician',
    budget: 1800,
    location: 'Denver, CO',
    urgency: 'high',
    status: 'in-progress',
    clientId: 'c2',
    workerId: 'w2',
    createdAt: '2024-06-28',
    requirements: ['Licensed electrician', 'Insurance required', 'Permit experience']
  },
  {
    id: 'j3',
    title: 'Bathroom Plumbing Repair',
    description: 'Fix leaking pipes under bathroom sink and install new faucet.',
    category: 'Plumber',
    budget: 450,
    location: 'Boston, MA',
    urgency: 'high',
    status: 'completed',
    clientId: 'c3',
    workerId: 'w3',
    createdAt: '2024-06-25',
    completedAt: '2024-06-26',
    requirements: ['Emergency service available', 'Licensed plumber']
  },
  {
    id: 'j4',
    title: 'Brick Patio Construction',
    description: 'Build 12x16 brick patio in backyard. Materials to be provided by contractor.',
    category: 'Mason',
    budget: 3200,
    location: 'San Francisco, CA',
    urgency: 'low',
    status: 'open',
    clientId: 'c4',
    createdAt: '2024-07-02',
    requirements: ['Masonry experience', 'Own equipment', 'Material sourcing']
  },
  {
    id: 'j5',
    title: 'Interior House Painting',
    description: 'Paint 3 bedrooms and living room. Approximately 1200 sq ft. Paint provided.',
    category: 'Painter',
    budget: 1200,
    location: 'Phoenix, AZ',
    urgency: 'medium',
    status: 'open',
    clientId: 'c5',
    createdAt: '2024-07-03',
    requirements: ['Interior painting experience', 'Clean work area', 'Own brushes and equipment']
  }
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: 'a1',
    jobId: 'j1',
    workerId: 'w1',
    message: 'I have 12 years of carpentry experience and have installed numerous kitchen cabinets. I can start immediately.',
    proposedRate: 45,
    status: 'pending',
    createdAt: '2024-07-01'
  },
  {
    id: 'a2',
    jobId: 'j4',
    workerId: 'w4',
    message: 'I specialize in brick and stone work. I can source high-quality materials and complete this project within budget.',
    proposedRate: 40,
    status: 'pending',
    createdAt: '2024-07-02'
  },
  {
    id: 'a3',
    jobId: 'j5',
    workerId: 'w5',
    message: 'Professional painter with experience in residential projects. I guarantee clean, quality work.',
    proposedRate: 35,
    status: 'pending',
    createdAt: '2024-07-03'
  }
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'r1',
    jobId: 'j3',
    reviewerId: 'c3',
    revieweeId: 'w3',
    rating: 5,
    comment: 'David was professional and fixed the issue quickly. Great communication throughout the process.',
    createdAt: '2024-06-27'
  },
  {
    id: 'r2',
    jobId: 'j2',
    reviewerId: 'c2',
    revieweeId: 'w2',
    rating: 5,
    comment: 'Sarah did excellent work on the electrical panel upgrade. Very knowledgeable and professional.',
    createdAt: '2024-06-30'
  }
];

// Service Categories
export const serviceCategories = [
  { id: 'carpenter', name: 'Carpenter', icon: '🔨', description: 'Framing, cabinets, trim work' },
  { id: 'electrician', name: 'Electrician', icon: '⚡', description: 'Wiring, panels, lighting' },
  { id: 'plumber', name: 'Plumber', icon: '🔧', description: 'Pipes, fixtures, repairs' },
  { id: 'mason', name: 'Mason', icon: '🧱', description: 'Brick, stone, concrete work' },
  { id: 'painter', name: 'Painter', icon: '🎨', description: 'Interior and exterior painting' },
  { id: 'roofer', name: 'Roofer', icon: '🏠', description: 'Roof repair and installation' },
  { id: 'hvac', name: 'HVAC Tech', icon: '❄️', description: 'Heating and cooling systems' },
  { id: 'landscaper', name: 'Landscaper', icon: '🌿', description: 'Lawn care and garden design' }
];

// Helper functions
export const getAllUsers = (): User[] => [...mockWorkers, ...mockClients];

export const getUserById = (id: string): User | undefined => 
  getAllUsers().find(user => user.id === id);

export const getJobsByClientId = (clientId: string): Job[] =>
  mockJobs.filter(job => job.clientId === clientId);

export const getJobsByWorkerId = (workerId: string): Job[] =>
  mockJobs.filter(job => job.workerId === workerId);

export const getApplicationsByWorkerId = (workerId: string): Application[] =>
  mockApplications.filter(app => app.workerId === workerId);

export const getApplicationsByJobId = (jobId: string): Application[] =>
  mockApplications.filter(app => app.jobId === jobId);

export const getReviewsByUserId = (userId: string): Review[] =>
  mockReviews.filter(review => review.revieweeId === userId);