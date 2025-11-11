import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { ApiResponse } from '@/lib/api/types';

// Types
interface Example {
  _id: string;
  name: string;
  description?: string;
}

interface CreateExampleData {
  name: string;
  description?: string;
}

// Query keys
const exampleKeys = {
  all: ['examples'] as const,
  lists: () => [...exampleKeys.all, 'list'] as const,
  list: (filters: string) => [...exampleKeys.lists(), { filters }] as const,
  details: () => [...exampleKeys.all, 'detail'] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};

// Get all examples
export const useExamples = () => {
  return useQuery({
    queryKey: exampleKeys.lists(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Example[]>>(API_ENDPOINTS.examples.list);
      return response.data.data || [];
    },
  });
};

// Get single example
export const useExample = (id: string) => {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Example>>(API_ENDPOINTS.examples.detail(id));
      return response.data.data;
    },
    enabled: !!id,
  });
};

// Create example mutation
export const useCreateExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateExampleData) => {
      const response = await apiClient.post<ApiResponse<Example>>(
        API_ENDPOINTS.examples.create,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
};

// Update example mutation
export const useUpdateExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateExampleData> }) => {
      const response = await apiClient.put<ApiResponse<Example>>(
        API_ENDPOINTS.examples.update(id),
        data
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: exampleKeys.detail(variables.id) });
    },
  });
};

// Delete example mutation
export const useDeleteExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(API_ENDPOINTS.examples.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
};

