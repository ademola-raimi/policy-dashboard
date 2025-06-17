import React from 'react';
import awsIcon from '../assets/aws-icon.png';
import azureIcon from '../assets/azure-icon.svg';
import gcpIcon from '../assets/gcp-icon.png';

type CloudProvider = 'AWS' | 'AZURE' | 'GCP';

interface Props {
  provider: CloudProvider;
  className?: string;
}

const CloudProviderIcon: React.FC<Props> = ({ provider, className = 'h-5 w-5' }) => {
  const icons: Record<CloudProvider, string> = {
    AWS: awsIcon,
    AZURE: azureIcon,
    GCP: gcpIcon,
  };

  return (
    <img 
      src={icons[provider]}
      alt={`${provider} icon`}
      className={className}
    />
  );
};

export default CloudProviderIcon;