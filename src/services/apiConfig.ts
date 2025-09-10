import { apiService } from './api';
import { demoApiService } from './demoApi';

// Toggle between demo and real API
const USE_DEMO_API = import.meta.env.VITE_USE_DEMO_API === 'false' || false; // Default to demo for now

// Export the appropriate service
export const activeApiService = USE_DEMO_API ? demoApiService : apiService;

// Re-export all service methods for easy access
export const {
  login,
  register,
  logout,
  refreshTokens,
  getCurrentUser,
  updateProfile,
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getApplications,
  getApplicationsByJobId,
  createApplication,
  updateApplication,
  getWorkers,
  getWorkerById,
  getMessages,
  sendMessage,
  uploadFile
} = activeApiService;