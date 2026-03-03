import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { RedisService } from '../../services/redis/redis.service';
import { RATE_LIMIT_METADATA } from '../decorators/rate-limit.decorator';

/**
 * Rate limiting guard to prevent abuse of the API
 * Limit request per user or IP address
 *
 * The usage is as follows:
 *
 * 1. Default rate limiting (10 requests per 60 seconds):
 * @RateLimit()
 *
 * 2. Custom rate limiting:
 * @RateLimit({ limit: 50, ttl: 30 })
 */
@Injectable()
export class CustomRateLimitGuard implements CanActivate {
  private readonly logger = new Logger(CustomRateLimitGuard.name);
  private readonly defaultLimit = 100;
  private readonly defaultTtl = 60; // seconds

  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const decoratorOptions = this.reflector.get<{
      limit?: number;
      ttl?: number;
    }>(RATE_LIMIT_METADATA, context.getHandler());

    const limit = decoratorOptions?.limit || this.defaultLimit;
    const ttl = decoratorOptions?.ttl || this.defaultTtl;

    const request = context.switchToHttp().getRequest<Request>();
    const identifier = this.getIdentifier(request);
    const key = `throttle:${identifier}`;

    try {
      const current = await this.redisService.incr(key); // atomic increment

      if (current === 1) {
        // Set TTL for the first request
        await this.redisService.expire(key, ttl);
      }

      if (current > limit) {
        throw new HttpException(
          {
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: `Too many requests. Max ${limit} requests per ${ttl} seconds.`,
            retryAfter: ttl,
          },
          HttpStatus.TOO_MANY_REQUESTS,
          { cause: { retryAfter: ttl } },
        );
      }

      // Add info to request object for later use
      request.rateLimit = {
        limit,
        current,
        remaining: limit - current,
        resetTime: Date.now() + ttl * 1000,
      };

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      // If Redis has an error, allow the request to pass through
      this.logger.warn(
        `Rate limit check failed for ${identifier}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      return true;
    }
  }

  /**
   * Get identifier for rate limiting
   * Priority: userId (if authenticated) > IP address
   */
  private getIdentifier(request: Request): string {
    // If user is authenticated, limit per user
    if (request.user?.id) {
      return `user:${request.user.id}`;
    }

    // If not, limit per IP
    const ip =
      request.ip ||
      (request.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      request.socket.remoteAddress ||
      'unknown';

    return `ip:${ip}`;
  }
}
