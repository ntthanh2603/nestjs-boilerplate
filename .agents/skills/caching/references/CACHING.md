# Caching & Redis Reference

## Core Services
- **Redis Service**: `src/services/redis/redis.service.ts`
- **Lock Service**: `src/services/redis/distributed-lock.service.ts`

## Key Methods (Code Snippets)

### Distributed Lock (The Right Way)
```typescript
await this.redisLockService.withLock('order-process-123', 5000, async () => {
  // Your critical logic here
});
```

### Bulk Delete Keys
```typescript
const deletedCount = await this.redisService.removeKeyWithPrefix('user:session:*');
```

### Pub/Sub
```typescript
// Publisher
await this.redisService.publish('notification-channel', JSON.stringify(data));

// Subscriber
await this.redisService.subscribe('notification-channel', (channel, msg) => {
  console.log(`Received message on ${channel}: ${msg}`);
});
```
