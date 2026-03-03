import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_METADATA = 'rate-limit-options';

/**
 * Decorator to apply rate limiting to a route handler
 *
 * The usage is as follows:
 *
 * 1. Default rate limiting (100 requests per 60 seconds):
 * @RateLimit()
 *
 * 2. Custom rate limiting:
 * @RateLimit({ limit: 50, ttl: 30 })
 * getProducts() {
 * }
 */
export function RateLimit(options?: { limit?: number; ttl?: number }) {
  return SetMetadata(RATE_LIMIT_METADATA, options || {});
}
