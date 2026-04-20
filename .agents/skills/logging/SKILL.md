# Logging & Tracing Standards - Skill File

Standards for application logging and request tracing.

## 1. Using the Logger
- **Service**: Use `LoggerService` from `src/commons/logger/`.
- **Injection**: Inject it into your services.
- **Context**: Always set the context name in the constructor: `this.logger.setContext(MyService.name)`.

## 2. Log Levels
- `log()` / `info()`: General operational info.
- `debug()`: Detailed info for troubleshooting (not for production noise).
- `warn()`: Unexpected but non-fatal behavior.
- `error()`: Critical failures. Always include the `stack` or `error` object.

## 3. Distributed Tracing
- **Correlation ID**: The logger automatically picks up the `correlationId` from the AsyncLocalStorage if configured.
- **Rule**: When logging events related to a specific request, ensure the trace info is preserved.

## 4. References
- `src/commons/logger/logger.service.ts`
