import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import {
  Recommendation,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  ErrorResponse,
  SuccessResponse,
  CloudProvider,
  RecommendationClass,
} from './types';
import { initialRecommendations } from './data';

// Database structure
interface DB {
  recommendations: Recommendation[];
  archivedRecommendations: Recommendation[];
}

// Create server
export const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Initialize database
let db: DB = {
  recommendations: [],
  archivedRecommendations: [],
};

// Reset database helper for testing
export const resetDatabase = () => {
  console.log('Resetting database...');
  db = {
    recommendations: JSON.parse(JSON.stringify(initialRecommendations)),
    archivedRecommendations: [],
  };
  console.log('Database reset complete. Active recommendations:', db.recommendations.length);
};

// Initialize database with default data
resetDatabase();

// Middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(cookieParser());

// Constants
const SECRET_KEY = 'your-secret-key';
const DEFAULT_LIMIT = 100; // Increased to ensure we get all recommendations in tests

// Utility to filter recommendations
const filterRecommendations = (
  recommendations: Recommendation[],
  search?: string,
  tags?: string[]
): Recommendation[] => {
  let filtered = [...recommendations];

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (rec) =>
        rec.title.toLowerCase().includes(searchLower) ||
        rec.description.toLowerCase().includes(searchLower) ||
        rec.reasons.some((reason) => reason.toLowerCase().includes(searchLower)) ||
        rec.frameworks.some((framework) => framework.name.toLowerCase().includes(searchLower))
    );
  }

  // Apply tag filters
  if (tags && tags.length > 0) {
    filtered = filtered.filter((rec) => {
      // Check if any provider name matches the tag
      const providerNames = rec.provider.map(idx => Object.keys(CloudProvider).filter(key => isNaN(Number(key)))[idx]);
      const hasProvider = tags.some(tag => providerNames.includes(tag));
      // Check frameworks
      const hasFramework = tags.some(tag => rec.frameworks.some(fw => fw.name === tag));
      // Check reasons
      const hasReason = tags.some(tag => rec.reasons.includes(tag));
      // Check class
      const classNames = Object.keys(RecommendationClass).filter(key => isNaN(Number(key)));
      const hasClass = tags.some(tag => classNames[rec.class] === tag);
      return hasProvider || hasFramework || hasReason || hasClass;
    });
  }

  return filtered;
};

// Utility to handle cursor-based pagination
const paginateResults = (
  array: Recommendation[],
  cursor?: string,
  limit: number = DEFAULT_LIMIT
): PaginatedResponse<Recommendation> => {
  if (array.length === 0) {
    return {
      data: [],
      pagination: {
        cursor: {
          next: null,
        },
        totalItems: 0,
      },
    };
  }

  const startIndex = cursor ? array.findIndex((item) => item.recommendationId === cursor) : 0;

  // If cursor is not found, start from beginning
  const effectiveStartIndex = startIndex === -1 ? 0 : startIndex;
  const results = array.slice(effectiveStartIndex, effectiveStartIndex + limit);
  const nextCursor = results.length === limit ? results[results.length - 1].recommendationId : null;

  return {
    data: results,
    pagination: {
      cursor: {
        next: nextCursor,
      },
      totalItems: array.length,
    },
  };
};

// Get recommendations with cursor-based pagination, search, and filtering
server.get('/recommendations', (req: Request, res: Response) => {
  try {
    console.log('GET /recommendations - Current active recommendations:', db.recommendations.length);
    const cursor = req.query.cursor as string | undefined;
    const limit = parseInt(req.query.limit as string) || DEFAULT_LIMIT;
    const search = req.query.search as string | undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(',') : undefined;

    // Filter recommendations
    const filtered = filterRecommendations(db.recommendations, search, tags);
    console.log('Filtered recommendations:', filtered.length);

    // Paginate filtered results
    const result = paginateResults(filtered, cursor, limit);
    console.log('Paginated results:', result.data.length);

    // Add available tags to the response
    // Calculate counts for each provider tag only
    const providerTags = Object.keys(CloudProvider).filter((key) => isNaN(Number(key)));
    const counts: Record<string, number> = {};
    providerTags.forEach(tag => {
      counts[tag] = filtered.filter(rec => {
        // Provider match
        const providerNames = rec.provider.map(idx => providerTags[idx]);
        return providerNames.includes(tag);
      }).length;
    });
    const availableTags = {
      frameworks: Array.from(new Set(db.recommendations.flatMap((r) => r.frameworks.map((f) => f.name)))),
      reasons: Array.from(new Set(db.recommendations.flatMap((r) => r.reasons))),
      providers: providerTags,
      classes: Object.keys(RecommendationClass).filter((key) => isNaN(Number(key))),
      counts,
    };

    res.json({
      ...result,
      availableTags,
    });
  } catch (error) {
    console.error('Error in GET /recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// Get archived recommendations with cursor-based pagination, search, and filtering
server.get('/recommendations/archive', (req: Request, res: Response) => {
  try {
    console.log('GET /recommendations/archive - Current archived recommendations:', db.archivedRecommendations.length);
    const cursor = req.query.cursor as string | undefined;
    const limit = parseInt(req.query.limit as string) || DEFAULT_LIMIT;
    const search = req.query.search as string | undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(',') : undefined;

    // Filter recommendations
    const filtered = filterRecommendations(db.archivedRecommendations, search, tags);
    console.log('Filtered archived recommendations:', filtered.length);

    // Paginate filtered results
    const result = paginateResults(filtered, cursor, limit);
    console.log('Paginated archived results:', result.data.length);

    res.json(result);
  } catch (error) {
    console.error('Error in GET /recommendations/archive:', error);
    res.status(500).json({ error: 'Failed to fetch archived recommendations' });
  }
});

// Archive a recommendation
server.post('/recommendations/:id/archive', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('POST /recommendations/:id/archive - Archiving recommendation:', id);
    console.log('Before archive - Active:', db.recommendations.length, 'Archived:', db.archivedRecommendations.length);

    const index = db.recommendations.findIndex((r) => r.recommendationId === id);

    if (index === -1) {
      console.log('Recommendation not found for archiving:', id);
      return res.status(404).json({ error: 'Recommendation not found' });
    }

    const recommendation = JSON.parse(JSON.stringify(db.recommendations[index]));
    db.recommendations = db.recommendations.filter((r) => r.recommendationId !== id);
    db.archivedRecommendations = [...db.archivedRecommendations, recommendation];

    console.log('After archive - Active:', db.recommendations.length, 'Archived:', db.archivedRecommendations.length);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in POST /recommendations/:id/archive:', error);
    res.status(500).json({ error: 'Failed to archive recommendation' });
  }
});

// Unarchive a recommendation
server.post('/recommendations/:id/unarchive', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('POST /recommendations/:id/unarchive - Unarchiving recommendation:', id);
    console.log(
      'Before unarchive - Active:',
      db.recommendations.length,
      'Archived:',
      db.archivedRecommendations.length
    );

    const index = db.archivedRecommendations.findIndex((r) => r.recommendationId === id);

    if (index === -1) {
      console.log('Archived recommendation not found for unarchiving:', id);
      return res.status(404).json({ error: 'Archived recommendation not found' });
    }

    const recommendation = JSON.parse(JSON.stringify(db.archivedRecommendations[index]));
    db.archivedRecommendations = db.archivedRecommendations.filter((r) => r.recommendationId !== id);
    db.recommendations = [...db.recommendations, recommendation];

    console.log('After unarchive - Active:', db.recommendations.length, 'Archived:', db.archivedRecommendations.length);
    console.log('Unarchived recommendation:', recommendation);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in POST /recommendations/:id/unarchive:', error);
    res.status(500).json({ error: 'Failed to unarchive recommendation' });
  }
});

// Authentication middleware
interface AuthRequest extends express.Request {
  user?: { username: string };
}

interface JWTPayload {
  username: string;
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Read token from cookie
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JWTPayload;
      req.user = { username: decoded.username };
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Login endpoint
server.post('/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  try {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });
      // Set token as HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'strict',
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      });
      res.json({ success: true, username });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Add logout endpoint
server.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// Authenticated user info endpoint
server.get('/auth/me', (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JWTPayload;
      res.json({ username: decoded.username });
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user info' });
  }
});

// Apply authentication to protected routes when enabled
if (process.env.USE_AUTH === 'true') {
  server.use('/recommendations', authenticateToken);
}

// Start server if not being used for testing
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
