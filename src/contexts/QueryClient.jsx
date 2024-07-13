import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 4 * 60 * 60 * 1000,
      cacheTime: 6 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
