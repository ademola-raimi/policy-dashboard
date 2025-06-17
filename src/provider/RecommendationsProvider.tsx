import React, { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useRecommendationsData } from '../hooks/useRecommendationsData';
import RecommendationsContext from '../context/RecommendationsContext';

interface Props {
  children: React.ReactNode;
  isArchive?: boolean;
}

export function RecommendationsProvider({ children, isArchive = false }: Props) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const debouncedSearch = useDebounce(search, 400);

  const query = useRecommendationsData({
    isArchive,
    search: debouncedSearch,
    filters,
  });

  // Extract availableTags from the first page
  const availableTags = query.data?.pages[0]?.availableTags;

  return (
    <RecommendationsContext.Provider 
      value={{
        search,
        setSearch,
        filters,
        setFilters,
        availableTags,
        query,
        isArchive,
      }}
    >
      {children}
    </RecommendationsContext.Provider>
  );
}