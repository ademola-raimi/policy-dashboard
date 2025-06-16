import React from 'react';
import type { Recommendation } from '../types';

const RecommendationCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  return (
    <div className="flex bg-white dark:bg-gray-800 rounded shadow p-4 items-center gap-4">
      {/* Icon */}
      <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center text-2xl">
        {/* Placeholder icon */}
        <span>🛡️</span>
      </div>
      {/* Content */}
      <div className="flex-1">
        <div className="font-bold">{recommendation.title}</div>
        <div className="text-sm text-gray-500">{recommendation.description}</div>
        {/* TODO: Add badges, icons, etc */}
      </div>
      {/* Actions */}
      <div>
        <button className="text-xs text-blue-600">Archive</button>
      </div>
    </div>
  );
};

export default RecommendationCard;