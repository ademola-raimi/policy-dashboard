import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { RecommendationsApiResponse } from '../types';

interface UseRecommendationsDataProps {
  isArchive: boolean;
  search: string;
  filters: string[];
}

export function useRecommendationsData({ isArchive, search, filters }: UseRecommendationsDataProps) {
  return useInfiniteQuery<RecommendationsApiResponse>({
    queryKey: ['recommendations', { isArchive, search, filters }],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (typeof pageParam === 'string') params.set('cursor', pageParam);
      if (search) params.set('search', search);
      if (filters.length) params.set('tags', filters.join(','));
      params.set('limit', '10');

      const endpoint = isArchive ? '/recommendations/archive' : '/recommendations';
      
      const res = await axios.get(`${endpoint}?${params}`, { 
        withCredentials: true,
        baseURL: 'http://localhost:3001',
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      console.log('lastPage: ', lastPage)
      const next = lastPage?.pagination?.cursor?.next;
      console.log('getNextPageParam:', next);
      // Return undefined if next is null, undefined, or empty string
      return next || undefined;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    initialPageParam: null,
    retry: 1,
  });
}