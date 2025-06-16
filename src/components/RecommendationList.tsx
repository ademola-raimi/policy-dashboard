import React, { useRef, useCallback, useEffect } from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import RecommendationCard from './RecommendationCard';
import type { PaginatedResponse, Recommendation, AvailableTags } from '../types';
import type { InfiniteData } from '@tanstack/react-query';

interface Props {
  search: string;
  filters: string[];
  onAvailableTags?: (tags: AvailableTags) => void;
}

const RecommendationList: React.FC<Props> = ({ search, filters, onAvailableTags }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useRecommendations(search, filters);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  // Extract availableTags from the first page
  const availableTags = data?.pages?.[0]?.availableTags;

  // Notify parent (Dashboard) about availableTags
  useEffect(() => {
    if (availableTags && onAvailableTags) onAvailableTags(availableTags);
  }, [availableTags, onAvailableTags]);

  if (isLoading) return <div className="py-8 text-center">Loading...</div>;
  if (isError) return <div className="py-8 text-center text-red-500">{(error as Error).message}</div>;

  const recommendations =
    (data as InfiniteData<PaginatedResponse<Recommendation>> | undefined)?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="flex flex-col gap-4">
      {recommendations.map((rec, idx) => {
        const isLast = idx === recommendations.length - 1;
        return (
          <div ref={isLast ? lastRef : undefined} key={rec.recommendationId}>
            <RecommendationCard recommendation={rec} />
          </div>
        );
      })}
      {isFetchingNextPage && <div className="py-4 text-center">Loading more...</div>}
      {!hasNextPage && recommendations.length > 0 && (
        <div className="py-4 text-center text-gray-400">No more recommendations.</div>
      )}
    </div>
  );
};

export default RecommendationList;