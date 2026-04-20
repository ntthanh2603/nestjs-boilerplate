# Troubleshooting & Debugging - Skill File

A guide for AI Agents to diagnose and fix issues in the `nest-base` project.

## 1. Request Tracing
- **Correlation ID**: Every request has a unique `x-correlation-id` in human-readable logs and response headers.
- **Search Logic**: Use the Correlation ID to filter logs in OpenSearch/CloudWatch to see the full lifecycle of a single request across multiple services.

## 2. Infrastructure Checks
- **Redis**: Check if keys exist via `redis-cli` or `RedisService`. Common issue: Key expired or wrong namespace.
- **Kafka**: 
  - Check `.dlq` topics for failed messages. 
  - Verify if consumers are active and have no lag.
- **Database**:
  - Check `migrations` table to ensure the schema is up to date.
  - Verify indexes on columns that appear in slow query logs.

## 3. Common Error Patterns
- **403 Forbidden**: Check RBAC guards or `BetterAuth` session status.
- **400 Bad Request**: Check DTO validation or `SanitizeRequestPipe` behavior.
- **500 Internal Error**: Look for `BusinessException` vs unexpected `Error` objects. Unexpected errors should be reported for fix.

## 4. Debugging Lifecycle
1. **Reproduce**: Write a minimal failing test in `*.spec.ts`.
2. **Trace**: Check logs for the specific `correlationId`.
3. **Inspect**: Check DB/Redis/Kafka state.
4. **Fix**: Follow the [workflows/bugfix.md](../workflows/bugfix.md) process.

## 5. Log Locations
- **Standard Out**: For local development.
- **OpenSearch**: For production/staging logs.
- **Container Logs**: For infrastructure-level crashes.
