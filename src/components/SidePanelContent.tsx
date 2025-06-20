import React from 'react';
import type { Recommendation } from '../types';
import ValueScore from './ValueScore';
import boxicon from '../assets/sensor-box.svg';
import ProviderIcons from './ProviderIcons';
import { CgReadme } from "react-icons/cg";
import { BsArchive } from "react-icons/bs";
import { PiCubeBold, PiWarningOctagonLight } from "react-icons/pi";
import { VscGraph, VscWarning } from "react-icons/vsc";
import { useQueryClient } from '@tanstack/react-query';

import Btn from './Btn';
import ImpactAssessmentCard from './ImpactAssessmentCard';
import { useRecommendationsContext } from '../hooks/useRecommendationsContext';

interface Props {
  recommendation: Recommendation;
}

const SidePanelContent: React.FC<Props> = ({ recommendation }) => {
  const { query, isArchive } = useRecommendationsContext();
  const queryClient = useQueryClient();

  const handleArchive = async () => {
    try {
      await fetch(`http://localhost:3001/recommendations/${recommendation.recommendationId}/archive`, {
        method: 'POST',
      });
      await Promise.all([
        query.refetch(),
        queryClient.refetchQueries({ queryKey: ['recommendations', { isArchive: true }], exact: false }),
      ]);
      if (typeof window !== 'undefined') {
        const closeBtn = document.querySelector('[aria-label="Close"]');
        if (closeBtn) (closeBtn as HTMLElement).click();
      }
    } catch {
      alert('Failed to archive.');
    }
  };

  const handleUnarchive = async () => {
    try {
      await fetch(`http://localhost:3001/recommendations/${recommendation.recommendationId}/unarchive`, {
        method: 'POST',
      });
      await Promise.all([
        query.refetch(),
        queryClient.refetchQueries({ queryKey: ['recommendations', { isArchive: false }], exact: false }),
      ]);
      if (typeof window !== 'undefined') {
        const closeBtn = document.querySelector('[aria-label="Close"]');
        if (closeBtn) (closeBtn as HTMLElement).click();
      }
    } catch {
      alert('Failed to unarchive.');
    }
  };

  return (
    <div className="p-8 w-full mx-0 bg-white dark:bg-gray-900 h-full flex flex-col" data-cy="side-panel" data-testid="side-panel">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-cyan-600 rounded-xl p-4 flex items-center justify-center">
          <img src={boxicon} alt="icon" className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1 dark:text-gray-100">{recommendation.title}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Value score</span>
            <ValueScore score={recommendation.score} />
            <ProviderIcons providerIndexes={recommendation.provider} showLabels />
          </div>
        </div>
      </div>
      {recommendation.frameworks && recommendation.frameworks.length > 0 && (
        <div className="mb-4">
          {recommendation.frameworks.map(fw => (
            <span key={fw.name} className="inline-block bg-gray-200 text-xs text-gray-800 rounded px-2 py-1 mr-2 mb-1 font-medium">{fw.name}</span>
          ))}
        </div>
      )}
      <hr className="my-4 border-t-2 border-gray-200 dark:border-gray-700" />
      <div className="mb-4 text-gray-700 dark:text-gray-200 text-sm">{recommendation.description}</div>
      <div className="mb-4">
        <div className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-gray-100">
          <span className="inline-block"><PiCubeBold/></span>
          <span>Resources enforced by policy</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(recommendation.affectedResources && recommendation.affectedResources.length > 0)
            ? recommendation.affectedResources.map((res, i) => (
                <span key={i} className="bg-gray-200 text-xs text-gray-800 rounded px-2 py-1 font-medium">{typeof res === 'string' ? res : res.name}</span>
              ))
            : <span className="text-xs text-gray-400">None</span>}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-gray-100">
          <span className="inline-block"><PiCubeBold/></span>
          <span>Reasons</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(recommendation.reasons && recommendation.reasons.length > 0)
            ? recommendation.reasons.map((reason, i) => (
                <span key={i} className="bg-gray-200 text-xs text-gray-800 rounded px-2 py-1 font-medium">{reason}</span>
              ))
            : <span className="text-xs text-gray-400">None</span>}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-gray-100">
          <span className="inline-block"><VscGraph/></span>
          <span>Impact Assessment</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <ImpactAssessmentCard
            title="Overall"
            subtitle="Violations"
            value={recommendation.impactAssessment.totalViolations}
            icon={<PiWarningOctagonLight/>}
          />
          <ImpactAssessmentCard
            title="Most impacted scope"
            subtitle={recommendation.impactAssessment.mostImpactedScope.name}
            value={recommendation.impactAssessment.mostImpactedScope.t}
            icon={<VscWarning/>}
            valueClassName="text-2xl font-bold text-gray-900"
          >
            <div className="text-xs text-gray-500">({recommendation.impactAssessment.mostImpactedScope.type})</div>
          </ImpactAssessmentCard>
        </div>
      </div>
      {recommendation.furtherReading && recommendation.furtherReading.length > 0 && (
        <div className="mb-4">
          <div className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-gray-100">
            <span className="inline-block"><CgReadme/></span>
            <span>Further Reading</span>
          </div>
          <div className="flex flex-col gap-1">
            {recommendation.furtherReading.map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm flex items-center gap-1">
                {item.name}
                <svg className="w-3 h-3 inline-block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M14 3h7v7m0-7L10 14m-7 7h7v-7" /></svg>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="mt-auto flex gap-4 pt-6 border-t-2 border-gray-200">
        {isArchive ? (
          <Btn
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-gray-800 bg-white hover:bg-gray-100 shadow-none border-0 font-medium"
            onClick={handleUnarchive}
            data-cy="unarchive-btn"
          >
            <BsArchive />
            Unarchive
          </Btn>
        ) : (
          <Btn
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-gray-800 bg-white hover:bg-gray-100 shadow-none border-0 font-medium"
            onClick={handleArchive}
            data-cy="archive-btn"
          >
            <BsArchive />
            Archive
          </Btn>
        )}
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-cyan-600 hover:bg-cyan-700 font-semibold">
          Configure Policy
        </button>
      </div>
    </div>
  );
};

export default SidePanelContent;
