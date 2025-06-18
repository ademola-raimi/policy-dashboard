import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RecommendationList from '../RecommendationList';
import { RecommendationsProvider } from '../../provider/RecommendationsProvider';

describe('RecommendationList', () => {
  it('shows skeleton loader when loading', () => {
    render(
      <RecommendationsProvider>
        <RecommendationList onRecommendationClick={() => {}} />
      </RecommendationsProvider>
    );
    // Check for skeleton loader by data-cy attribute
    expect(screen.getAllByTestId('skeleton-loader').length).toBeGreaterThan(0);
  });
});
