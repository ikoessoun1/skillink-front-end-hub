
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType: 'client' | 'worker';
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'client' | 'worker';
  location: string;
  phone?: string;
  company?: string;
  skills?: string[];
  category?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: 'client' | 'worker';
  phone?: string;
  location: string;
  createdAt: string;
  updatedAt?: string;
  
  // Client specific fields
  company?: string;
  jobsPosted?: number;
  totalSpent?: number;
  
  // Worker specific fields
  skills?: string[];
  category?: string;
  experience?: number;
  rating?: number;
  totalJobs?: number;
  availability?: 'available' | 'busy' | 'offline';
  bio?: string;
  certifications?: string[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  duration: string;
  clientId: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  skills: string[];
  createdAt: string;
  updatedAt: string;
  deadline?: string;
}

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  message: string;
  proposedRate: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  createdAt: string;
  isRead: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
