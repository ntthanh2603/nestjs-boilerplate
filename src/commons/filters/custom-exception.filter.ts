import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import type { Request, Response } from 'express';
import { CustomException } from '../exceptions/custom.exception';
import { LoggerService } from '../logger/logger.service';
import { getCorrelationId } from '../middlewares/correlation-id.middleware';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as Record<
      string,
      unknown
    >;
    const correlationId = getCorrelationId(request);

    // Log async (Fire-and-Forget) - not block request
    this.logExceptionAsync(exception, correlationId);

    response.status(status).json({
      statusCode: status,
      message: exceptionResponse.message || exception.message,
      code: exceptionResponse.code,
    });
  }

  /**
   * Log exception async - Fire and Forget pattern
   * Not await, not block request
   */
  private logExceptionAsync(
    exception: CustomException,
    correlationId: string,
  ): void {
    // Use setImmediate to defer logging, not block current request
    setImmediate(() => {
      try {
        // Context is already extracted in CustomException constructor
        const context = exception.context || 'Exception';
        this.logger.error(
          exception.message,
          exception.stack || '',
          context,
          correlationId,
        );
      } catch {
        // eslint-disable-next-line no-console
        console.error('[LoggingError]', 'Failed to log exception');
      }
    });
  }
}
