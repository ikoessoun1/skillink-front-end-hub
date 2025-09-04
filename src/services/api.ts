
import { ApiResponse, LoginCredentials, RegisterData, User, Job, Application, Message } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Try to refresh token
          const refreshed = await this.refreshToken();
          if (refreshed) {
            // Retry the original request with new token
            const retryConfig = {
              ...config,
              headers: this.getAuthHeaders(),
            };
            const retryResponse = await fetch(url, retryConfig);
            const retryData = await retryResponse.json();
            
            if (!retryResponse.ok) {
              throw new Error(retryData.message || 'Request failed');
            }
            
            return retryData;
          } else {
            // Refresh failed, redirect to login
            this.handleAuthError();
            throw new Error('Authentication failed');
          }
        }
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return true;
      }
      
      return false;
    } catch {
      return false;
    }
  }

  private handleAuthError(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('skilllink_user');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  // Authentication endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; access: string; refresh: string }>> {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ user: User; access: string; refresh: string }>> {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.request('/auth/logout/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  async refreshTokens(): Promise<ApiResponse<{ access: string }>> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.request('/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  // User endpoints
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/auth/user/');
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/auth/user/', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  // Jobs endpoints
  async getJobs(): Promise<ApiResponse<Job[]>> {
    return this.request('/jobs/');
  }

  async getJobById(id: string): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}/`);
  }

  async createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Job>> {
    return this.request('/jobs/', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return this.request(`/jobs/${id}/`, {
      method: 'DELETE',
    });
  }

  // Applications endpoints
  async getApplications(): Promise<ApiResponse<Application[]>> {
    return this.request('/applications/');
  }

  async getApplicationsByJobId(jobId: string): Promise<ApiResponse<Application[]>> {
    return this.request(`/applications/?job=${jobId}`);
  }

  async createApplication(applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Application>> {
    return this.request('/applications/', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async updateApplication(id: string, data: Partial<Application>): Promise<ApiResponse<Application>> {
    return this.request(`/applications/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Workers endpoints
  async getWorkers(): Promise<ApiResponse<User[]>> {
    return this.request('/workers/');
  }

  async getWorkerById(id: string): Promise<ApiResponse<User>> {
    return this.request(`/workers/${id}/`);
  }

  // Messages endpoints
  async getMessages(recipientId: string): Promise<ApiResponse<Message[]>> {
    return this.request(`/messages/?recipient=${recipientId}`);
  }

  async sendMessage(messageData: Omit<Message, 'id' | 'createdAt'>): Promise<ApiResponse<Message>> {
    return this.request('/messages/', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  // File upload endpoint
  async uploadFile(file: File, type: 'profile' | 'job' | 'document'): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/upload/`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    return response.json();
  }
}

export const apiService = new ApiService();
