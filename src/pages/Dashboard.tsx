import React, { useState } from 'react';
import Layout from '../components/Layout';
import SearchFilterBar from '../components/SearchFilterBar';
import RecommendationList from '../components/RecommendationList';
import type { AvailableTags } from '../types';

const DashboardPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<AvailableTags | undefined>(undefined);

  return (
    <Layout>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Recommendations</h1>
        </div>
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={
            availableTags ?? { frameworks: [], reasons: [], providers: [], classes: [] }
          }
        />
        <RecommendationList
          search={search}
          filters={filters}
          onAvailableTags={setAvailableTags}
        />
      </div>
    </Layout>
  );
};

export default DashboardPage;