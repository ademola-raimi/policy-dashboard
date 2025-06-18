import React from 'react';
import CloudProviderIcon from './CloudProviderIcon';
import { useRecommendationsContext } from '../hooks/useRecommendationsContext';

interface ProviderIconsProps {
  providerIndexes: number[];
  availableProviders?: string[];
  iconClassName?: string;
  showLabels?: boolean;
}

const PROVIDER_LABELS = ['AWS', 'Azure Environment', 'GCP'];
const PROVIDER_ICONS = ['AWS', 'AZURE', 'GCP'] as const;

type ProviderType = 'AWS' | 'AZURE' | 'GCP';

const ProviderIcons: React.FC<ProviderIconsProps> = React.memo(({ providerIndexes, iconClassName = 'h-4 w-4', showLabels = false }) => {
  const { availableTags } = useRecommendationsContext();
  const availableProviders = availableTags?.providers;

  return (
    <div className="flex items-center gap-1 shrink-0">
      {providerIndexes.map((providerIndex) => {
        let providerName: string | undefined;
        if (availableProviders && availableProviders[providerIndex]) {
          providerName = availableProviders[providerIndex];
        } else {
          providerName = PROVIDER_LABELS[providerIndex];
        }
        if (providerName === 'UNSPECIFIED' || providerIndex == null) return null;
        return (
          <span key={providerName} className="flex items-center gap-1">
            <CloudProviderIcon
              provider={PROVIDER_ICONS[providerIndex] as ProviderType}
              className={iconClassName}
            />
            {showLabels && <span className="text-xs">{providerName}</span>}
          </span>
        );
      })}
    </div>
  );
});

export default ProviderIcons;
