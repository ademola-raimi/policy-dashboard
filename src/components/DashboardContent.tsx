import React from 'react';
import Layout from './Layout';
import SearchFilterBar from './SearchFilterBar';
import RecommendationList from './RecommendationList';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRecommendationsContext } from '../hooks/useRecommendationsContext';

const DashboardContent: React.FC = () => {
  const {
    search,
    setSearch,
    filters,
    setFilters,
    query,
    isArchive
  } = useRecommendationsContext();

  const recommendations = query.data?.pages.flatMap(page => page.data) ?? [];
  const totalItems = query.data?.pages[0]?.pagination.totalItems ?? 0;

  const availableTags = query.data?.pages[0].availableTags ?? {
    frameworks: [],
    reasons: [],
    providers: [],
    classes: []
  };

  console.log(availableTags)

  // Add loading state check
  if (query.isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      </Layout>
    );
  }

  // Add error state check
  if (query.isError) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full text-red-500">
          Error loading recommendations
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <div className="border-b border-gray-200 bg-white dark:bg-gray-800">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {isArchive ? 'Archive' : 'Recommendations'}
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  {!query.isLoading && `Showing ${recommendations.length} of ${totalItems} results`}
                </span>
              </h1>
              <button className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <PlusIcon className="h-5 w-5 mr-2" />
                {isArchive ? 'Back to Recommendations' : 'Archive'}
              </button>
            </div>
            <SearchFilterBar
              search={search}
              onSearchChange={setSearch}
              filters={filters}
              onFiltersChange={setFilters}
              availableTags={availableTags}
            />
          </div>
        </div>

        <div className="flex-1 px-8 py-6">
          <RecommendationList />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardContent;