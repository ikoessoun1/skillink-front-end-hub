
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: 'client' | 'worker';
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  role: 'client' | 'worker';
  location?: string;
  company?: string;
  
  // Worker-specific fields
  primary_category?: string;
  skills?: string[];
  id_image?: File;
  profile_photo?: File;
  workshop_image1?: File;
  workshop_image2?: File;
  experience?: number;
  bio?: string;
  certifications?: string[];
  availability?: 'available' | 'busy' | 'offline';
}

export interface User {
  id: string;
  name: string; // maps to full_name
  email: string;
  avatar: string; // maps to profile_photo
  type: 'client' | 'worker'; // maps to role
  phone?: string;
  location: string;
  createdAt: string; // maps to date_joined
  updatedAt?: string; // maps to updated_at
  
  // Common fields
  company?: string;
  
  // Client specific fields
  jobs_posted?: number; // maps to jobsPosted
  total_spent?: number; // maps to totalSpent
  
  // Worker specific fields
  skills?: string[];
  category?: string; // maps to primary_category
  experience?: number;
  rating?: number;
  total_jobs?: number; // maps to totalJobs
  availability?: 'available' | 'busy' | 'offline';
  bio?: string;
  certifications?: string[];
  
  // Additional worker images
  id_image?: string;
  workshop_image1?: string;
  workshop_image2?: string;
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

export interface Location {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  category: Category;
  category_id?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
