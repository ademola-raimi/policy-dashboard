import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RecommendationList from '../RecommendationList';
import { RecommendationsProvider } from '../../provider/RecommendationsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('RecommendationList', () => {
  it('shows skeleton loader when loading', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <RecommendationsProvider>
          <RecommendationList onRecommendationClick={() => {}} />
        </RecommendationsProvider>
      </QueryClientProvider>
    );
    expect(screen.getAllByTestId('skeleton-loader').length).toBeGreaterThan(0);
  });
});
