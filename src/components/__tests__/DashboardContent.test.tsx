import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecommendationsProvider } from '../../provider/RecommendationsProvider';
import DashboardContent from '../DashboardContent';

describe('DashboardContent', () => {
  it('renders skeleton loader on initial load', async () => {
    render(
      <RecommendationsProvider>
        <DashboardContent />
      </RecommendationsProvider>
    );
    expect(screen.getAllByText(/Loading/i).length).toBeGreaterThan(0);
  });

  it('opens and closes side panel', async () => {
    render(
      <RecommendationsProvider>
        <DashboardContent />
      </RecommendationsProvider>
    );
    await waitFor(() => screen.getAllByTestId('recommendation-card'));
    fireEvent.click(screen.getAllByTestId('recommendation-card')[0]);
    expect(screen.getByTestId('side-panel')).toBeVisible();
    fireEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => expect(screen.queryByTestId('side-panel')).toBeNull());
  });
});

