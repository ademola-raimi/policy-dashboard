import React, { useState, useRef, useEffect } from 'react';
import type { SearchFilterBarProps } from '../types';
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";


const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  availableTags,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (provider: string) => {
    onFiltersChange(
      filters.includes(provider)
        ? filters.filter(f => f !== provider)
        : [...filters, provider]
    );
  };

  useEffect(() => {
    if (!showFilters) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  return (
    <div className="flex items-center gap-4 mb-6 relative max-w-xl w-full">
      <div className="flex-1 min-w-0 relative">
        <input
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
          placeholder="Search"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter className="w-4 h-4" />
          Filter
        </button>
        {showFilters && availableTags && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div className="p-4">
              <div className="mb-4">
                <div className="font-medium text-xs text-gray-500 mb-2">
                  Cloud Provider
                </div>
                <div className="flex flex-col gap-2">
                  {availableTags.providers.map((provider) => (
                    <label key={provider} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded border border-gray-200 cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.includes(provider)}
                          onChange={() => handleCheckboxChange(provider)}
                          className="form-checkbox h-4 w-4 text-cyan-600 border-gray-400 focus:ring-cyan-500 bg-white"
                        />
                        <span className="text-sm text-gray-800">{provider}</span>
                      </div>
                      {availableTags.counts && availableTags.counts[provider] !== undefined && (
                        <span className="text-xs text-gray-500 ml-2">{availableTags.counts[provider]}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-center pt-1 border-t-2 border-gray-200">
                <button
                  onClick={() => onFiltersChange([])}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                  type="button"
                >
                  Clear filters
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