import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { RecommendationsApiResponse, Recommendation, RecommendationsParams } from '../types';

export function useRecommendations(search = '', tags: string[] = []) {
  return useInfiniteQuery<RecommendationsApiResponse<Recommendation>, Error>({
    queryKey: ['recommendations', { search, tags }],
    queryFn: async ({ pageParam = undefined, queryKey }) => {
      const [, { search, tags }] = queryKey as [string, { search: string; tags: string[] }];
      const params: RecommendationsParams = { limit: 10 };
      if (typeof pageParam === 'string') params.cursor = pageParam;
      if (search) params.search = search;
      if (tags) params.tags = tags.join(',');
      const res = await axios.get('http://localhost:3001/recommendations', { params, withCredentials: true });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.pagination.cursor.next,
    initialPageParam: undefined,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}