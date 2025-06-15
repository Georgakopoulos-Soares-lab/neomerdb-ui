import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      placeholderData: (previous: unknown) => previous || [],
      refetchOnReconnect: false,
      retryDelay: 1000,
    },
    mutations: {
      retry: false,
    },
  },
});
