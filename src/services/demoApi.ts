import { ApiResponse, LoginCredentials, RegisterData, User, Job, Application, Message } from '../types/api';
import { 
  mockWorkers, 
  mockClients, 
  mockJobs, 
  mockApplications,
  getUserById 
} from '../data/mockData';

// Demo users for login
const DEMO_USERS = [
  {
    email: 'emily.rodriguez@email.com',
    password: 'demo123',
    userType: 'client' as const,
    user: mockClients.find(c => c.email === 'emily.rodriguez@email.com')!
  },
  {
    email: 'marcus.johnson@email.com', 
    password: 'demo123',
    userType: 'worker' as const,
    user: mockWorkers.find(w => w.email === 'marcus.johnson@email.com')!
  }
];

class DemoApiService {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async mockRequest<T>(data: T, delay: number = 500): Promise<ApiResponse<T>> {
    await this.delay(delay);
    return {
      data,
      success: true,
      message: 'Success'
    };
  }

  // Authentication endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; access: string; refresh: string }>> {
    await this.delay(800);
    
    const demoUser = DEMO_USERS.find(
      u => u.email === credentials.email && 
           u.password === credentials.password &&
           u.userType === credentials.userType
    );

    if (!demoUser) {
      throw new Error('Invalid credentials');
    }

    // Convert mock user to API user format
    const user: User = {
      id: demoUser.user.id,
      name: demoUser.user.name,
      email: demoUser.user.email,
      avatar: demoUser.user.avatar,
      type: demoUser.user.type,
      phone: demoUser.user.phone,
      location: demoUser.user.location,
      createdAt: demoUser.user.createdAt,
      // Add worker-specific fields if applicable
      ...(demoUser.user.type === 'worker' && {
        skills: (demoUser.user as any).skills,
        category: (demoUser.user as any).category,
        experience: (demoUser.user as any).experience,
        rating: (demoUser.user as any).rating,
        totalJobs: (demoUser.user as any).totalJobs,
        availability: (demoUser.user as any).availability,
        bio: (demoUser.user as any).bio,
        certifications: (demoUser.user as any).certifications
      }),
      // Add client-specific fields if applicable
      ...(demoUser.user.type === 'client' && {
        company: (demoUser.user as any).company,
        jobsPosted: (demoUser.user as any).jobsPosted,
        totalSpent: (demoUser.user as any).totalSpent
      })
    };

    return {
      data: {
        user,
        access: 'demo-access-token-' + Date.now(),
        refresh: 'demo-refresh-token-' + Date.now()
      },
      success: true,
      message: 'Login successful'
    };
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ user: User; access: string; refresh: string }>> {
    await this.delay(1000);
    
    // Create new user from registration data
    const user: User = {
      id: 'demo-' + Date.now(),
      name: userData.name,
      email: userData.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: userData.userType,
      phone: userData.phone,
      location: userData.location,
      createdAt: new Date().toISOString(),
      // Add type-specific fields
      ...(userData.userType === 'worker' && {
        skills: userData.skills || [],
        category: userData.category || 'General',
        experience: 0,
        rating: 0,
        totalJobs: 0,
        availability: 'available' as const,
        bio: '',
        certifications: []
      }),
      ...(userData.userType === 'client' && {
        company: userData.company,
        jobsPosted: 0,
        totalSpent: 0
      })
    };

    return {
      data: {
        user,
        access: 'demo-access-token-' + Date.now(),
        refresh: 'demo-refresh-token-' + Date.now()
      },
      success: true,
      message: 'Registration successful'
    };
  }

  async logout(): Promise<ApiResponse<void>> {
    await this.delay(300);
    return {
      data: undefined as any,
      success: true,
      message: 'Logout successful'
    };
  }

  async refreshTokens(): Promise<ApiResponse<{ access: string }>> {
    return this.mockRequest({ access: 'demo-refreshed-token-' + Date.now() });
  }

  // User endpoints
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const userData = localStorage.getItem('skilllink_user');
    if (!userData) {
      throw new Error('No user data found');
    }
    return this.mockRequest(JSON.parse(userData));
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const currentUser = JSON.parse(localStorage.getItem('skilllink_user') || '{}');
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('skilllink_user', JSON.stringify(updatedUser));
    return this.mockRequest(updatedUser);
  }

  // Jobs endpoints
  async getJobs(): Promise<ApiResponse<Job[]>> {
    const jobs: Job[] = mockJobs.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      category: job.category,
      location: job.location,
      budget: job.budget,
      duration: job.urgency === 'high' ? '1-2 days' : job.urgency === 'medium' ? '1 week' : '2-4 weeks',
      clientId: job.clientId,
      status: job.status === 'in-progress' ? 'in_progress' : job.status,
      skills: job.requirements,
      createdAt: job.createdAt,
      updatedAt: job.createdAt,
      deadline: job.completedAt
    }));
    return this.mockRequest(jobs);
  }

  async getJobById(id: string): Promise<ApiResponse<Job>> {
    const job = mockJobs.find(j => j.id === id);
    if (!job) {
      throw new Error('Job not found');
    }
    const formattedJob: Job = {
      id: job.id,
      title: job.title,
      description: job.description,
      category: job.category,
      location: job.location,
      budget: job.budget,
      duration: job.urgency === 'high' ? '1-2 days' : job.urgency === 'medium' ? '1 week' : '2-4 weeks',
      clientId: job.clientId,
      status: job.status === 'in-progress' ? 'in_progress' : job.status,
      skills: job.requirements,
      createdAt: job.createdAt,
      updatedAt: job.createdAt,
      deadline: job.completedAt
    };
    return this.mockRequest(formattedJob);
  }

  async createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Job>> {
    const newJob: Job = {
      ...jobData,
      id: 'demo-job-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return this.mockRequest(newJob);
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    const job = mockJobs.find(j => j.id === id);
    if (!job) {
      throw new Error('Job not found');
    }
    const updatedJob: Job = { 
      id: job.id,
      title: jobData.title || job.title,
      description: jobData.description || job.description,
      category: jobData.category || job.category,
      location: jobData.location || job.location,
      budget: jobData.budget || job.budget,
      duration: jobData.duration || (job.urgency === 'high' ? '1-2 days' : job.urgency === 'medium' ? '1 week' : '2-4 weeks'),
      clientId: jobData.clientId || job.clientId,
      status: jobData.status || (job.status === 'in-progress' ? 'in_progress' : job.status),
      skills: jobData.skills || job.requirements,
      createdAt: job.createdAt,
      updatedAt: new Date().toISOString(),
      deadline: jobData.deadline || job.completedAt
    };
    return this.mockRequest(updatedJob);
  }

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return this.mockRequest(undefined as any);
  }

  // Applications endpoints
  async getApplications(): Promise<ApiResponse<Application[]>> {
    const applications: Application[] = mockApplications.map(app => ({
      ...app,
      updatedAt: app.createdAt
    }));
    return this.mockRequest(applications);
  }

  async getApplicationsByJobId(jobId: string): Promise<ApiResponse<Application[]>> {
    const applications: Application[] = mockApplications
      .filter(app => app.jobId === jobId)
      .map(app => ({
        ...app,
        updatedAt: app.createdAt
      }));
    return this.mockRequest(applications);
  }

  async createApplication(applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Application>> {
    const newApplication: Application = {
      ...applicationData,
      id: 'demo-app-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return this.mockRequest(newApplication);
  }

  async updateApplication(id: string, data: Partial<Application>): Promise<ApiResponse<Application>> {
    const application = mockApplications.find(app => app.id === id);
    if (!application) {
      throw new Error('Application not found');
    }
    const updatedApplication = { 
      ...application, 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
    return this.mockRequest(updatedApplication);
  }

  // Workers endpoints
  async getWorkers(): Promise<ApiResponse<User[]>> {
    const workers = mockWorkers.map(worker => ({
      id: worker.id,
      name: worker.name,
      email: worker.email,
      avatar: worker.avatar,
      type: worker.type,
      phone: worker.phone,
      location: worker.location,
      createdAt: worker.createdAt,
      skills: worker.skills,
      category: worker.category,
      experience: worker.experience,
      rating: worker.rating,
      totalJobs: worker.totalJobs,
      availability: worker.availability,
      bio: worker.bio,
      certifications: worker.certifications
    }));
    return this.mockRequest(workers);
  }

  async getWorkerById(id: string): Promise<ApiResponse<User>> {
    const worker = mockWorkers.find(w => w.id === id);
    if (!worker) {
      throw new Error('Worker not found');
    }
    const user: User = {
      id: worker.id,
      name: worker.name,
      email: worker.email,
      avatar: worker.avatar,
      type: worker.type,
      phone: worker.phone,
      location: worker.location,
      createdAt: worker.createdAt,
      skills: worker.skills,
      category: worker.category,
      experience: worker.experience,
      rating: worker.rating,
      totalJobs: worker.totalJobs,
      availability: worker.availability,
      bio: worker.bio,
      certifications: worker.certifications
    };
    return this.mockRequest(user);
  }

  // Messages endpoints
  async getMessages(recipientId: string): Promise<ApiResponse<Message[]>> {
    // Mock messages between current user and recipient
    const mockMessages: Message[] = [
      {
        id: 'msg1',
        senderId: 'current-user',
        recipientId,
        content: 'Hi, I saw your job posting and I\'m interested.',
        type: 'text',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isRead: true
      },
      {
        id: 'msg2',
        senderId: recipientId,
        recipientId: 'current-user',
        content: 'Great! When are you available to start?',
        type: 'text',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        isRead: false
      }
    ];
    return this.mockRequest(mockMessages);
  }

  async sendMessage(messageData: Omit<Message, 'id' | 'createdAt'>): Promise<ApiResponse<Message>> {
    const newMessage: Message = {
      ...messageData,
      id: 'demo-msg-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    return this.mockRequest(newMessage);
  }

  // File upload endpoint
  async uploadFile(file: File, type: 'profile' | 'job' | 'document'): Promise<ApiResponse<{ url: string }>> {
    await this.delay(2000);
    // Mock file URL based on type
    const mockUrls = {
      profile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      job: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
      document: 'https://example.com/documents/demo-file.pdf'
    };
    return this.mockRequest({ url: mockUrls[type] });
  }

  // Locations endpoint
  async getLocations(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    const { ghanaLocations } = await import('../data/mockData');
    return this.mockRequest(ghanaLocations);
  }

  // Categories endpoint  
  async getCategories(): Promise<ApiResponse<{ id: string; name: string; icon: string }[]>> {
    const { serviceCategories } = await import('../data/mockData');
    return this.mockRequest(serviceCategories);
  }

  // Skills endpoint
  async getSkillsByCategory(categoryId: string): Promise<ApiResponse<string[]>> {
    const { skillsByCategory } = await import('../data/mockData');
    return this.mockRequest(skillsByCategory[categoryId] || []);
  }
}

export const demoApiService = new DemoApiService();