
import { toast } from '../hooks/use-toast';
import { ApiError } from '../types/api';

export const handleApiError = (error: ApiError | Error | unknown) => {
  console.error('API Error:', error);

  let message = 'An unexpected error occurred';
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    message = (error as ApiError).message;
  }

  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
};

export const handleNetworkError = () => {
  toast({
    title: 'Network Error',
    description: 'Please check your internet connection and try again.',
    variant: 'destructive',
  });
};

export const handleAuthError = () => {
  toast({
    title: 'Authentication Error',
    description: 'Please log in again to continue.',
    variant: 'destructive',
  });
};
