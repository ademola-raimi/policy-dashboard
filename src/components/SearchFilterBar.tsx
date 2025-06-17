import React, { useState } from 'react';
import type { SearchFilterBarProps } from '../types';
import { FunnelIcon } from '@heroicons/react/24/outline';

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  availableTags,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex items-center gap-4 mb-6 relative max-w-xl w-full">
      <div className="flex-1 min-w-0 relative">
        <input
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
          placeholder="Search"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx={11} cy={11} r={8} />
          <line x1={21} y1={21} x2={16.65} y2={16.65} />
        </svg>
      </div>
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FunnelIcon className="w-4 h-4" />
          Filter
        </button>
        {showFilters && availableTags && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <div className="mb-4">
                <div className="font-medium text-xs text-gray-500 mb-2">
                  Cloud Provider
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags.providers.map(provider => (
                    <button
                      key={provider}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        filters.includes(provider)
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                      onClick={() =>
                        onFiltersChange(
                          filters.includes(provider)
                            ? filters.filter(f => f !== provider)
                            : [...filters, provider]
                        )
                      }
                      type="button"
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <button
                  onClick={() => onFiltersChange([])}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                  type="button"
                >
                  Clear filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;