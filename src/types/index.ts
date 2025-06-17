//types
export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export interface User {
  username: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

export type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; username: string } }
  | { type: 'LOGOUT' };

export interface Recommendation {
  tenantId: string;
  recommendationId: string;
  title: string;
  description: string;
  score: number;
  provider: number[];
  frameworks: FrameWork[];
  totalHistoricalViolations: number;
  reasons: string[];
  class: number;
  impactAssessment: ImpactAssessment;
}

export interface ImpactAssessment {
    totalViolations: number;
    mostImpactedScope: {name: string; type: string; t: number};
}

export interface FrameWork {
    name: string;
    section: string;
    subtion: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    cursor: { next: string | null };
    totalItems: number;
  };
}

export type RecommendationsParams = {
  limit: number;
  cursor?: string;
  search?: string;
  tags?: string;
};

export interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: string[];
  onFiltersChange: (filters: string[]) => void;
  availableTags: AvailableTags;
}

export interface AvailableTags {
  frameworks: string[];
  reasons: string[];
  providers: string[];
  classes: string[];
}

export interface RecommendationsApiResponse {
  data: Recommendation[];
  pagination: {
    cursor: { 
      next: string | null 
    };
    totalItems: number;
  };
  availableTags: AvailableTags;
}


export interface RecommendationsState {
  recommendations: Recommendation[];
  totalItems: number;
  availableTags?: AvailableTags;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export type RecommendationsAction =
  | { type: 'SET_DATA'; payload: { recommendations: Recommendation[]; totalItems: number; availableTags?: AvailableTags } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error }
  | { type: 'SET_NEXT_PAGE_STATUS'; payload: { hasNextPage: boolean; isFetchingNextPage: boolean } };
