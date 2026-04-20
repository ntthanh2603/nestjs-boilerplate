# Security References

## Sanitization Pipe
- **Path**: `src/commons/pipes/sanitize-request.pipe.ts`
- **Description**: Automatically cleans string inputs to prevent XSS.

## Rate Limiting Guard
- **Path**: `src/commons/guards/rate-limit.guard.ts`
- **Description**: Uses Redis to limit requests based on IP or User ID.
