
import { useState, useEffect } from 'react';
import { activeApiService } from '../services/apiConfig';
import { ApiResponse, ApiError } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await apiCall();
        
        if (mounted) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: error as ApiError,
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiCall();
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as ApiError,
      });
    }
  };

  return { ...state, refetch };
}

export function useMutation<T, P = any>() {
  const [state, setState] = useState<UseApiState<T> & { mutate: ((params: P) => Promise<void>) | null }>({
    data: null,
    loading: false,
    error: null,
    mutate: null,
  });

  const createMutate = (apiCall: (params: P) => Promise<ApiResponse<T>>) => {
    const mutate = async (params: P) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await apiCall(params);
        setState(prev => ({
          ...prev,
          data: response.data,
          loading: false,
          error: null,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          data: null,
          loading: false,
          error: error as ApiError,
        }));
        throw error;
      }
    };

    setState(prev => ({ ...prev, mutate }));
    return mutate;
  };

  return { ...state, createMutate };
}
