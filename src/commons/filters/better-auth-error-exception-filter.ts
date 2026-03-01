import type { ArgumentsHost } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import type { ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { getCorrelationId } from '../middlewares/correlation-id.middleware';
import { APIError } from 'better-auth';

@Catch(APIError)
export class BetterAuthErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: APIError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.statusCode;
    const message = exception.body?.message || exception.message;
    const correlationId = getCorrelationId(request);

    // Log async (Fire-and-Forget) - Not block request
    this.logExceptionAsync(exception, correlationId);

    // Standardized response format — consistent across all filters
    response.status(status).json({
      statusCode: status,
      message,
      code: 'AUTH_ERROR',
    });
  }

  /**
   * Log exception async - Fire and Forget pattern
   * Not await, not block request
   */
  private logExceptionAsync(exception: APIError, correlationId: string): void {
    // Use setImmediate to defer logging, not block current request
    setImmediate(() => {
      try {
        this.logger.error(
          exception.message,
          exception.stack || '',
          'BetterAuthError',
          correlationId,
        );
      } catch {
        // eslint-disable-next-line no-console
        console.error('[LoggingError]', 'Failed to log exception');
      }
    });
  }
}
