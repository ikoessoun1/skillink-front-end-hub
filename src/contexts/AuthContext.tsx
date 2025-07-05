import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, mockWorkers, mockClients } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'client' | 'worker') => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'client' | 'worker';
  location: string;
  phone?: string;
  company?: string;
  skills?: string[];
  category?: string;
  hourlyRate?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('skilllink_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, userType: 'client' | 'worker'): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allUsers = userType === 'worker' ? mockWorkers : mockClients;
    const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('skilllink_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `${userData.userType === 'worker' ? 'w' : 'c'}${Date.now()}`,
      name: userData.name,
      email: userData.email,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      type: userData.userType,
      phone: userData.phone,
      location: userData.location,
      createdAt: new Date().toISOString().split('T')[0],
      ...(userData.userType === 'client' 
        ? { 
            company: userData.company,
            jobsPosted: 0,
            totalSpent: 0
          }
        : {
            skills: userData.skills || [],
            category: userData.category || '',
            experience: 0,
            hourlyRate: userData.hourlyRate || 0,
            rating: 0,
            totalJobs: 0,
            availability: 'available' as const,
            bio: '',
            certifications: []
          }
      )
    };
    
    setUser(newUser);
    localStorage.setItem('skilllink_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skilllink_user');
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};