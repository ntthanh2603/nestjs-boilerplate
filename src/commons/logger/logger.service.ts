/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { createLogger, Logger, format, transports } from 'winston';
import type { Logform } from 'winston';
import { generateId } from '../../utils/nanoid-generators';
import dayjs from 'dayjs';
import chalk from 'chalk';
import * as path from 'path';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService implements NestLoggerService {
  private static logger: Logger;
  private static consoleOnlyLogger: Logger;
  private static initialized = false;

  private context?: string;

  constructor(context?: string) {
    this.context = context;

    // Initialize Winston instances only once to prevent duplicate file transports
    if (!LoggerService.initialized) {
      LoggerService.initialized = true;
      LoggerService.initializeLoggers();
    }
  }

  /**
   * Bootstrap both the full logger (console + file) and the console-only logger.
   * Called once at startup via the initialized guard.
   */
  private static initializeLoggers(): void {
    const consoleLogLevel = process.env.LOG_LEVEL ?? 'debug';

    const fileTransport = new transports.DailyRotateFile({
      level: 'info',
      dirname: path.join(process.cwd(), 'logs'),
      filename: 'app-%DATE%.json',
      datePattern: 'YYYY-MM-DD',
      maxSize: '100m',
      maxFiles: '14d',
      zippedArchive: true,
      format: format.combine(format.timestamp(), format.json()),
    });

    // Catch file transport errors to prevent application crash
    fileTransport.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error('[LoggerService] File transport error:', err);
    });

    LoggerService.logger = createLogger({
      level: 'silly',
      transports: [
        LoggerService.createConsoleTransport(consoleLogLevel),
        fileTransport,
      ],
    });

    LoggerService.consoleOnlyLogger = createLogger({
      level: 'silly',
      transports: [LoggerService.createConsoleTransport(consoleLogLevel)],
    });
  }

  /**
   * Override the context that was auto-detected at injection time.
   * Useful when LoggerService is instantiated manually outside DI.
   */
  setContext(context: string): void {
    this.context = context;
  }

  // Context is intentionally omitted from every public method.
  // It is resolved automatically from the injecting class via INQUIRER.
  log(
    message: any,
    metadata?: Record<string, any> | null,
    correlationId?: string | null,
  ): void {
    this.emit(LoggerService.logger, 'info', message, metadata, correlationId);
  }

  error(
    message: any,
    stackOrMetadata?: string | Record<string, any> | null,
    correlationId?: string | null,
    stack?: string,
  ): void {
    let meta: Record<string, any> | undefined | null;
    let trace: string | undefined;

    if (typeof stackOrMetadata === 'string') {
      trace = stackOrMetadata;
    } else {
      meta = stackOrMetadata;
      trace = stack;
    }

    this.emit(
      LoggerService.logger,
      'error',
      message,
      meta,
      correlationId,
      trace,
    );
  }

  warn(
    message: any,
    metadata?: Record<string, any> | null,
    correlationId?: string | null,
  ): void {
    this.emit(LoggerService.logger, 'warn', message, metadata, correlationId);
  }

  debug(
    message: any,
    metadata?: Record<string, any> | null,
    correlationId?: string | null,
  ): void {
    this.emit(LoggerService.logger, 'debug', message, metadata, correlationId);
  }

  verbose(
    message: any,
    metadata?: Record<string, any> | null,
    correlationId?: string | null,
  ): void {
    this.emit(
      LoggerService.logger,
      'verbose',
      message,
      metadata,
      correlationId,
    );
  }

  // Log only in console
  logConsoleOnly(
    message: any,
    metadata?: Record<string, any> | null,
    correlationId?: string | null,
  ): void {
    this.emit(
      LoggerService.consoleOnlyLogger,
      'info',
      message,
      metadata,
      correlationId,
    );
  }

  errorConsoleOnly(
    message: any,
    metadata?: Record<string, any> | null,
    correlationId?: string | null,
  ): void {
    this.emit(
      LoggerService.consoleOnlyLogger,
      'error',
      message,
      metadata,
      correlationId,
    );
  }

  warnConsoleOnly(
    message: any,
    metadata?: Record<string, any> | null,
    correlationId?: string | null,
  ): void {
    this.emit(
      LoggerService.consoleOnlyLogger,
      'warn',
      message,
      metadata,
      correlationId,
    );
  }

  /**
   * Single emission point shared by all log methods.
   * Eliminates DRY violations across the public API.
   * generateId is only called for error-level entries to reduce hot-path overhead.
   */
  private emit(
    logger: Logger,
    level: string,
    message: any,
    metadata?: Record<string, any> | null,
    correlationId?: string | null,
    trace?: string,
  ): void {
    const time = dayjs().format('DD/MM/YYYY, h:mm:ss A');

    // Generate a unique ID only for errors — avoids unnecessary CPU cost on hot path
    const logId = level === 'error' ? generateId() : undefined;

    logger.log(level, message, {
      context: this.context ?? 'App',
      time,
      ...(logId && { id: logId }),
      ...(metadata && { metadata }),
      ...(trace && { trace }),
      ...(correlationId && { correlationId }),
    });
  }

  /**
   * Creates a reusable Console transport with the shared format applied.
   * Defined as a static factory to avoid format duplication between loggers.
   */
  private static createConsoleTransport(
    level: string,
  ): transports.ConsoleTransportInstance {
    return new transports.Console({
      level,
      format: LoggerService.createConsoleFormat(),
    });
  }

  /**
   * Shared console format used by both the full logger and the console-only logger.
   * Defined once here to guarantee consistent output across both instances.
   */
  private static createConsoleFormat(): Logform.Format {
    return format.combine(
      format.printf((info) => {
        const msg = LoggerService.formatMessage(info.message);
        const ctxStr = (info.context as string) ?? 'App';
        const pid = process.pid;

        const metadataStr = info.metadata
          ? ` ${chalk.gray(JSON.stringify(info.metadata))}`
          : '';

        const strApp = chalk.green('[Nest]');
        const strPid = chalk.green(`${pid}`);
        const strContext = chalk.yellow(`[${ctxStr}]`);
        const formattedLevel = LoggerService.colorizeLevel(info.level);

        return `${strApp} ${strPid}  - ${info.time as string}     ${formattedLevel} ${strContext} ${msg}${metadataStr}`;
      }),
    );
  }

  /**
   * Safely serializes a log message to string.
   * Handles Error instances explicitly to avoid "[object Object]" output.
   */
  private static formatMessage(message: any): string {
    if (message instanceof Error) {
      return message.message;
    }
    if (typeof message === 'object' && message !== null) {
      return JSON.stringify(message);
    }
    return String(message);
  }

  /**
   * Maps a Winston log level to its corresponding chalk color function.
   * Falls back to plain uppercase label for unknown levels.
   */
  private static colorizeLevel(level: string): string {
    const levelColors: Record<string, (s: string) => string> = {
      info: chalk.green,
      error: chalk.red,
      warn: chalk.yellow,
      debug: chalk.magenta,
      verbose: chalk.cyan,
    };

    const colorFn = levelColors[level];
    const label = level === 'info' ? 'LOG' : level.toUpperCase();
    return colorFn ? colorFn(label) : label;
  }
}
