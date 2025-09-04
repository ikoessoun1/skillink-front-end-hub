
import { activeApiService } from './apiConfig';
import { setTokens, clearTokens } from '../utils/auth';
import { LoginCredentials, RegisterData, User } from '../types/api';

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await activeApiService.login(credentials);
      
      if (response.success && response.data) {
        const { user, access, refresh } = response.data;
        setTokens(access, refresh);
        localStorage.setItem('skilllink_user', JSON.stringify(user));
        return user;
      }
      
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<User> {
    try {
      const response = await activeApiService.register(userData);
      
      if (response.success && response.data) {
        const { user, access, refresh } = response.data;
        setTokens(access, refresh);
        localStorage.setItem('skilllink_user', JSON.stringify(user));
        return user;
      }
      
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await activeApiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await activeApiService.getCurrentUser();
      
      if (response.success && response.data) {
        localStorage.setItem('skilllink_user', JSON.stringify(response.data));
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      clearTokens();
      return null;
    }
  }

  getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('skilllink_user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
