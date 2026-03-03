import 'express';

declare global {
  namespace Express {
    interface Request {
      /** Unique correlation ID for tracing requests across logs */
      correlationId: string;

      /** Authenticated user info (populated by auth guard) */
      user?: { id: string; [key: string]: unknown };

      /** Rate limit info (populated by rate limit guard) */
      rateLimit?: {
        limit: number;
        current: number;
        remaining: number;
        resetTime: number;
      };
    }
  }
}

export {};
