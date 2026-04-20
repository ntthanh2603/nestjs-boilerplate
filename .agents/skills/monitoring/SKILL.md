# Health, Monitoring & Observability - Skill File

Standards for ensuring the application is alive, healthy, and traceable.

## 1. Health Checks (Terminus)
- **Endpoint**: `/health`.
- **Logic**: Use `@nestjs/terminus` to implement:
  - `TypeOrmHealthIndicator`: Check DB connection.
  - `RedisHealthIndicator`: Check cache availability.
  - `MicroserviceHealthIndicator`: Check Kafka connection.
- **Requirement**: The app MUST return a 503 status if any critical dependency is down.

## 2. Distributed Tracing
- **Correlation ID**: All logs MUST include a `correlationId`.
- **Usage**: When a request starts, the `CorrelationIdMiddleware` generates a UUID. This ID must follow the request into Kafka messages and background jobs.

## 3. Metrics (Optional)
- **Prometheus**: If enabled, expose `/metrics` for scraping.
- **Performance**: Track API response times and DB query durations.

## 4. References
- `all-exceptions.filter.ts` (for error tracking)
- `correlation-id.middleware.ts`
- `health.controller.ts` (if implemented)
