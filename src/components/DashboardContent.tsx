import React, { useState } from 'react';
import Layout from './Layout';
import SearchFilterBar from './SearchFilterBar';
import RecommendationList from './RecommendationList';
import { FaStar } from 'react-icons/fa';
import { useRecommendationsContext } from '../hooks/useRecommendationsContext';
import Breadcrumb from './Breadcrumb';
import { useNavigate } from 'react-router-dom';
import SidePanel from './SidePanel';
import type { Recommendation } from '../types';
import SidePanelContent from './SidePanelContent';
import Btn from './Btn';
import { BsArchive } from 'react-icons/bs';
import DashboardSkeleton from './DashboardSkeleton';

const DashboardContent: React.FC = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const {
    search,
    setSearch,
    filters,
    setFilters,
    query,
    isArchive
  } = useRecommendationsContext();
  const navigate = useNavigate();

  const recommendations = query.data?.pages.flatMap(page => page.data) ?? [];
  const totalItems = query.data?.pages[0]?.pagination.totalItems ?? 0;

  const availableTags = query.data?.pages[0].availableTags ?? {
    frameworks: [],
    reasons: [],
    providers: [],
    classes: []
  };

  if (query.isLoading) {
    return (
      <Layout>
        <DashboardSkeleton />
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
      <div className="flex flex-col flex-1 bg-gray-50 w-full relative">
        {/* Main content with blur when SidePanel is open */}
        <div className={sidePanelOpen ? 'transition-all duration-300 filter blur-sm pointer-events-none' : 'transition-all duration-300'}>
          <div className="bg-white border-b border-gray-200 w-full">
            <div className="px-8 py-6 w-full">
              {isArchive && (
                <Breadcrumb items={[
                  { label: 'Recommendations', to: '/recommendations' },
                  { label: 'Archive' }
                ]} />
              )}
              <div className="flex items-center justify-between mb-6 w-full">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {isArchive ? 'Recommendations Archive' : 'Recommendations'}
                  </h1>
                  {isArchive ? (
                    <BsArchive/>
                  ) : (
                    <FaStar className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <Btn
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => {
                    if (isArchive) {
                      navigate('/recommendations');
                    } else {
                      navigate('/recommendations/archive');
                    }
                  }}
                >
                  <BsArchive/>
                  {isArchive ? 'Back to Recommendations' : 'Archive'}
                </Btn>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <SearchFilterBar
                    search={search}
                    onSearchChange={setSearch}
                    filters={filters}
                    onFiltersChange={setFilters}
                    availableTags={availableTags}
                  />
                </div>
                <div className="text-sm text-gray-600 whitespace-nowrap">
                  Showing {recommendations.length} of {totalItems} results
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-8 py-6 w-full">
            <RecommendationList
              onRecommendationClick={(rec: Recommendation) => {
                setSelectedRecommendation(rec);
                setSidePanelOpen(true);
              }}
            />
          </div>
        </div>
        {/* SidePanel modal, overlay only over main content */}
        {sidePanelOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay over the whole page, lighter */}
            <div className="absolute inset-0 bg-black/10 transition-opacity" onClick={() => setSidePanelOpen(false)} />
            <SidePanel open={sidePanelOpen} onClose={() => setSidePanelOpen(false)}>
              {selectedRecommendation && (
                <SidePanelContent recommendation={selectedRecommendation} />
              )}
            </SidePanel>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardContent;