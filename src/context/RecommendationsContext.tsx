import { createContext } from 'react';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { RecommendationsApiResponse, AvailableTags } from '../types';

interface RecommendationsContextValue {
  search: string;
  setSearch: (search: string) => void;
  filters: string[];
  setFilters: (filters: string[]) => void;
  availableTags?: AvailableTags;
  query: UseInfiniteQueryResult<InfiniteData<RecommendationsApiResponse, unknown>, Error>;
  isArchive: boolean;
}

const RecommendationsContext = createContext<RecommendationsContextValue | null>(null);

export default RecommendationsContext;
