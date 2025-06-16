import React from 'react';
import type { SearchFilterBarProps } from '../types';

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  availableTags,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4 relative">
      {/* Search input */}
      <input
        className="flex-1 p-2 border rounded"
        placeholder="Search"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      {/* Filter button (dropdown placeholder) */}
      <div>
        <button
          className="p-2 border rounded bg-gray-100 text-gray-700"
          type="button"
          // ...dropdown toggle logic
        >
          Filter
        </button>
        {availableTags && (
          <div className="absolute mt-2 bg-white border rounded shadow p-2 z-10 w-64">
            <div className="font-bold text-xs mb-2">Cloud Provider</div>
            {availableTags.providers.map(option => (
              <label key={option} className="block text-sm">
                <input
                  type="checkbox"
                  checked={filters.includes(option)}
                  onChange={e => {
                    if (e.target.checked) {
                      onFiltersChange([...filters, option]);
                    } else {
                      onFiltersChange(filters.filter(f => f !== option));
                    }
                  }}
                />{' '}
                {option}
              </label>
            ))}
            <button
              className="mt-2 text-xs text-blue-600"
              onClick={() => onFiltersChange([])}
              type="button"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;