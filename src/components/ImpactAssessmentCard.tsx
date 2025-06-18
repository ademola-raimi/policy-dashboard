import React from 'react';

interface ImpactAssessmentCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  icon?: React.ReactNode;
  valueClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: React.ReactNode;
}

const ImpactAssessmentCard: React.FC<ImpactAssessmentCardProps> = ({
  title,
  subtitle,
  value,
  icon,
  valueClassName = '',
  subtitleClassName = '',
  titleClassName = '',
  children,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-between min-w-[220px] max-w-[340px] border border-gray-200 shadow-sm h-full min-h-[140px]">
      <div className="flex items-start justify-between w-full mb-2">
        <div className={`text-xs text-gray-500 ${titleClassName}`}>{title}</div>
        {icon && <div className="ml-2 text-gray-400">{icon}</div>}
      </div>
      <div className="flex items-end justify-between w-full flex-1">
        <div className="flex flex-col">
          <div className={`text-lg font-bold text-gray-900 ${subtitleClassName}`}>{subtitle}</div>
        </div>
        <div className={`text-2xl font-bold text-gray-900 ml-4 ${valueClassName}`}>{value}</div>
      </div>
      {children}
    </div>
  );
};

export default ImpactAssessmentCard;
