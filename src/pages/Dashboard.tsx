import React from 'react';
import { RecommendationsProvider } from '../provider/RecommendationsProvider';
import DashboardContent from '../components/DashboardContent';

const DashboardPage: React.FC = () => {
  return (
    <RecommendationsProvider>
      <DashboardContent />
    </RecommendationsProvider>
  );
};

export default DashboardPage;