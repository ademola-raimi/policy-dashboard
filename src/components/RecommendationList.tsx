import React, { useRef, useCallback } from 'react';
import RecommendationCard from './RecommendationCard';
import { useRecommendationsContext } from '../hooks/useRecommendationsContext';

const RecommendationList: React.FC = () => {
  const { 
    query: { 
      data,
      isLoading,
      isError,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage 
    }
  } = useRecommendationsContext();

  const recommendations = data?.pages.flatMap(page => page.data) ?? [];
  
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

  if (isLoading) return <div className="py-8 text-center">Loading...</div>;
  if (isError) return <div className="py-8 text-center text-red-500">{(error as Error).message}</div>;

  return (
    <div className="flex flex-col gap-4">
      {recommendations.map((recommendation, idx) => {
        const isLast = idx === recommendations.length - 1;
        return (
          <div ref={isLast ? lastRef : undefined} key={recommendation.recommendationId}>
            <RecommendationCard 
              recommendation={recommendation}
              onClick={() => {/* handle click */}}
            />
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