import React from 'react';
import type { Recommendation } from '../types';
import { CubeIcon } from '@heroicons/react/24/outline';
import CloudProviderIcon from './CloudProviderIcon';
import { useRecommendationsContext } from '../hooks/useRecommendationsContext';

interface Props {
  recommendation: Recommendation;
  onClick: () => void;
}

const RecommendationCard: React.FC<Props> = ({ recommendation, onClick }) => {
  const { availableTags } = useRecommendationsContext();

  return (
    <div 
      onClick={onClick}
      className="flex bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 items-start gap-6 hover:bg-gray-50 cursor-pointer"
    >
      {/* Left Icon */}
      <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white">
        <CubeIcon className="h-6 w-6" />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Title Row */}
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="font-medium text-gray-900 truncate">{recommendation.title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            {recommendation.provider.map((providerIndex) => {
              const providerName = availableTags?.providers?.[providerIndex];
              if (providerName === 'UNSPECIFIED') return null;
              return (
                <CloudProviderIcon 
                  key={providerName}
                  provider={providerName as 'AWS' | 'AZURE' | 'GCP'} 
                />
              );
            })}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{recommendation.description}</p>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2">
          {/* Framework Badges */}
          {recommendation.frameworks.map(framework => (
            <span 
              key={framework.name}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              {framework.name}
            </span>
          ))}
          
          {/* Based on Repeating Alerts Badge */}
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
            Based on Repeating Alerts
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end gap-2">
        {/* Impact Assessment */}
        <div className="text-right">
          <div className="text-xs font-medium text-gray-900">Impact assessment</div>
          <div className="text-xs text-gray-500">-{recommendation.impactAssessment.totalViolations} Violations / month</div>
        </div>

        {/* Value Score */}
        <div className="text-right">
          <div className="text-xs font-medium text-gray-900">Value score</div>
          <div className="flex gap-0.5">
            {Array.from({ length: Math.min(recommendation.score, 5) }).map((_, i) => (
              <div key={i} className="w-4 h-1 bg-cyan-500 rounded-full" />
            ))}
            {Array.from({ length: Math.max(5 - recommendation.score, 0) }).map((_, i) => (
              <div key={i} className="w-4 h-1 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;