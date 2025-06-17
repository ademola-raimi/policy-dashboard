import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { AvailableTags } from '../types';

export function useAvailableTags() {
  return useQuery<AvailableTags>({
    queryKey: ['availableTags'],
    queryFn: async () => {
      const res = await axios.get('/recommendations', {
        baseURL: 'http://localhost:3001',
        withCredentials: true
      });
      
      if (!res.data.availableTags) {
        throw new Error('No available tags found in response');
      }
      
      return res.data.availableTags;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}