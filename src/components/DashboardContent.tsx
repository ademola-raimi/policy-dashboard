import React from 'react';
import Layout from './Layout';
import SearchFilterBar from './SearchFilterBar';
import RecommendationList from './RecommendationList';
import { ArchiveBoxIcon, StarIcon } from '@heroicons/react/24/outline';
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

  if (query.isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      </Layout>
    );
  }

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
      <div className="flex flex-col flex-1 bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {isArchive ? 'Archive' : 'Recommendations'}
                </h1>
                <StarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <ArchiveBoxIcon className="h-4 w-4 mr-2" />
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
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {recommendations.length} of {totalItems} results
              </div>
            </div>
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