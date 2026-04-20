# Redis & Caching - Skill File

Standards for distributed caching, session management, and locking in the `nest-base` project.

## 1. Stack
- **Library**: `ioredis`.
- **Wrapper**: `RedisService` in `src/services/redis/`.
- **Patterns**: Distributed Locking via Redlock pattern.

## 2. Distributed Locking
- **Preferred Method**: ALWAYS use `redisLockService.withLock<T>(key, ttl, action)`.
  - It automatically handles acquisition, error reporting, and release in a `finally` block.
- **Rule**: Avoid `lockWithTimeOut` as it is deprecated and prone to race conditions.
- **TTL**: Specify TTL in milliseconds (e.g., `5000` for 5 seconds).

## 3. Advanced Redis Operations
- **Bulk Cleanup**: Use `redisService.removeKeyWithPrefix(prefix)` to atomically delete multiple keys (e.g., `orders:*`).
- **Pub/Sub**: Use `redisService.publish()` and `redisService.subscribe()` for real-time messaging.
- **Client Types**:
  - `client`: General commands.
  - `cacheClient`: Get/Set operations (separate from pub/sub).
  - `publisher/subscriber`: Dedicated for messaging.

## 4. Caching Strategy
- **Namespace-based keys**: Always prefix keys with a descriptive namespace (e.g., `prod:user:session:<id>`).
- **TTL (Time To Live)**: 
  - Sessions: 30 days.
  - OTP/Sensitive: 5-10 minutes.
  - Data Cache: 1 hour (default).
- **Serialization**: Data stored in Redis MUST be JSON stringified/parsed via the service.

## 3. Distributed Locking
- Use `DistributedLockService` to prevent race conditions in highly concurrent tasks (e.g., wallet deduction, high-traffic inventory).
- **TTL for locks**: Keep it as short as possible (typically 5000ms - 10000ms).
- **Resource Naming**: Use unique keys like `lock:booking:<id>`.

## 4. Coding Standards
- **Injection**: Inject `RedisService` or `DistributedLockService`.
- **Fail-safe**: Cache failures should generally not crash the main request unless it's a critical lock. Use try-catch blocks where appropriate.

## 5. References
- `redis.service.ts`
- `distributed-lock.service.ts`
- `redis.module.ts`
