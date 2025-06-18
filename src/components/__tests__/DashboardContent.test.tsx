import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { RecommendationsProvider } from '../../provider/RecommendationsProvider';
import DashboardContent from '../DashboardContent';
import * as useRecommendationsDataModule from '../../hooks/useRecommendationsData';
import { vi } from 'vitest';

beforeAll(() => {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: class {
      constructor() {}
      observe() {}
      disconnect() {}
      unobserve() {}
    }
  });
});

describe('DashboardContent', () => {
  beforeEach(() => {
    // Mock useRecommendationsData to return a static recommendation
    vi.spyOn(useRecommendationsDataModule, 'useRecommendationsData').mockReturnValue({
      data: {
        pages: [
          {
            data: [
              {
                tenantId: 'tenant-001',
                recommendationId: 'rec-001',
                title: 'Test Recommendation',
                description: 'Test description',
                score: 90,
                provider: [1],
                frameworks: [
                  { name: 'CIS AWS Foundations', section: '1', subtion: '1.1' }
                ],
                totalHistoricalViolations: 100,
                reasons: ['Test reason'],
                class: 1,
                impactAssessment: {
                  totalViolations: 10,
                  mostImpactedScope: { name: 'prod', type: 'EC2', t: 5 }
                },
                affectedResources: [{ name: 'prod-ec2' }],
                furtherReading: [{ name: 'AWS Docs', href: 'https://aws.amazon.com' }]
              }
            ],
            pagination: { cursor: { next: null }, totalItems: 1 },
            availableTags: {
              frameworks: ['CIS AWS Foundations'],
              reasons: ['Test reason'],
              providers: ['AWS'],
              classes: ['COMPUTE_RECOMMENDATION']
            }
          }
        ]
      },
      isLoading: false,
      isError: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders skeleton loader on initial load', async () => {
    // Remove the mock for this test to allow loading state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useRecommendationsDataModule.useRecommendationsData as any).mockReturnValueOnce({
      isLoading: true,
      isError: false,
      data: undefined,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    });
    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <RecommendationsProvider>
            <DashboardContent />
          </RecommendationsProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  });

  it('opens and closes side panel', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <RecommendationsProvider>
            <DashboardContent />
          </RecommendationsProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    await waitFor(() => screen.getAllByTestId('recommendation-card'));
    fireEvent.click(screen.getAllByTestId('recommendation-card')[0]);
    expect(screen.getByTestId('side-panel')).toBeVisible();
    fireEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => expect(screen.queryByTestId('side-panel')).toBeNull());
  });
});

