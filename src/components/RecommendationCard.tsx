import React from 'react';
import type { Recommendation } from '../types';
import boxicon from '../assets/sensor-box.svg';
import ValueScore from './ValueScore';
import ProviderIcons from './ProviderIcons';

interface Props {
  recommendation: Recommendation;
  onClick: () => void;
}

const RecommendationCard: React.FC<Props> = ({ recommendation, onClick }) => {

  return (
    <div
      data-cy="recommendation-card"
      data-testid="recommendation-card"
      onClick={onClick}
      className="flex bg-white rounded-xl border border-gray-200 items-stretch gap-0 hover:bg-gray-50 cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center bg-cyan-600 w-28 min-w-28 h-auto rounded-l-xl self-stretch">
        <img className="w-12 h-12" src={boxicon} alt="box" />
      </div>

      <div className="flex-1 min-w-0 p-6">
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="font-semibold text-base text-gray-900 truncate">{recommendation.title}</h3>
          <ProviderIcons providerIndexes={recommendation.provider} />
        </div>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{recommendation.description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
            Based on Repeating Alerts
          </span>
          {recommendation.frameworks.map(framework => (
            <span
              key={framework.name}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
            >
              {framework.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 min-w-[160px] p-6">
        <div>
          <div className="text-xs font-medium text-gray-900">Impact assessment</div>
          <div className="text-xs text-gray-500">
            ~{recommendation.impactAssessment.totalViolations} Violations / month
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-900">Value score</div>
          <ValueScore score={recommendation.score} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;