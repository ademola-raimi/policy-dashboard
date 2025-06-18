import React from 'react';

const DashboardSkeleton: React.FC = () => (
  <div className="flex justify-center items-center h-full w-full" data-testid="skeleton-loader">
    <div className="w-full max-w-4xl">
      <div className="h-10 w-1/3 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="h-10 w-full bg-gray-100 rounded mb-8 animate-pulse" />
      <div className="flex flex-col gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex bg-white rounded-xl border border-gray-200 items-stretch gap-0 animate-pulse overflow-hidden">
            <div className="flex flex-col items-center justify-center bg-cyan-100 w-28 min-w-28 h-auto rounded-l-xl self-stretch">
              <div className="w-12 h-12 bg-cyan-200 rounded-full" />
            </div>
            <div className="flex-1 min-w-0 p-6 flex flex-col gap-3">
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-1/3 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-2/3 bg-gray-100 rounded mb-2" />
              <div className="flex gap-2">
                <div className="h-4 w-16 bg-gray-100 rounded" />
                <div className="h-4 w-12 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 min-w-[160px] p-6">
              <div className="h-4 w-20 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-10 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardSkeleton;
