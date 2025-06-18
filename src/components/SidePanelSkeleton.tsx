import React from "react";

const SidePanelSkeleton: React.FC = () => (
  <div className="p-8 w-full mx-0 bg-white dark:bg-gray-900 h-full flex flex-col animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-cyan-200 dark:bg-cyan-700 rounded-xl p-4 w-16 h-16" />
      <div className="flex-1 space-y-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      </div>
    </div>
    <div className="mb-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    <hr className="my-4 border-t-2 border-gray-200 dark:border-gray-700" />
    <div className="mb-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
    <div className="mb-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
    <div className="mb-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    <div className="mt-auto flex gap-4 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
      <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

export default SidePanelSkeleton;