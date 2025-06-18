import React, { useRef, useCallback } from 'react';
import RecommendationCard from './RecommendationCard';
import RecommendationListSkeleton from './RecommendationListSkeleton';
import { useRecommendationsContext } from '../hooks/useRecommendationsContext';
import type { Recommendation } from '../types';

interface RecommendationListProps {
  onRecommendationClick: (rec: Recommendation) => void;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ onRecommendationClick }) => {
  const { 
    query: { 
      data,
      isLoading,
      isError,
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
      }, { rootMargin: '200px' });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (isLoading) return <RecommendationListSkeleton />;
  if (isError) return <div className="py-8 text-center text-red-500">Sorry, we are unable to load recommendation</div>;
  if (recommendations.length === 0) return <div className="py-8 text-center text-gray-400">No recommendations found.</div>;

  return (
    <div className="flex flex-col gap-4 overflow-auto max-h-[70vh]">
      {recommendations.map((recommendation, idx) => {
        const isLast = idx === recommendations.length - 1;
        return (
          <div ref={isLast ? lastRef : undefined} key={recommendation.recommendationId}>
            <RecommendationCard 
              recommendation={recommendation}
              onClick={() => onRecommendationClick(recommendation)}
            />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="py-4 text-center flex flex-col items-center">
          <svg className="animate-spin h-6 w-6 text-cyan-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mb-2" />
          <span className="text-cyan-600 font-medium">Loading more...</span>
        </div>
      )}
      {!hasNextPage && recommendations.length > 0 && (
        <div className="py-4 text-center text-gray-400">No more recommendations.</div>
      )}
    </div>
  );
};

export default RecommendationList;