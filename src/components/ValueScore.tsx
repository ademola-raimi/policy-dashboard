import React from 'react';

interface ValueScoreProps {
  score: number; // 0-100
  className?: string;
}

/**
 * Renders a 5-dot value score bar, where score is 0-100.
 * Each dot represents 20 points. E.g. 90 = 4.5 dots filled.
 */
const ValueScore: React.FC<ValueScoreProps> = ({ score, className = '' }) => {
  const clamped = Math.max(0, Math.min(100, score));
  const filled = clamped / 20;

  return (
    <div className={`flex gap-0.5 mt-1 ${className}`} aria-label={`Value score: ${score}/100`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fillLevel = Math.min(1, Math.max(0, filled - i));
        return (
          <div
            key={i}
            className={`w-4 h-1 rounded-full bg-gray-200 relative overflow-hidden`}
            style={{ backgroundColor: fillLevel > 0 ? '#06b6d4' : '#e5e7eb' }}
          >
            {fillLevel > 0 && fillLevel < 1 && (
              <div
                className="absolute left-0 top-0 h-full"
                style={{ width: `${fillLevel * 100}%`, background: '#06b6d4' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ValueScore;
