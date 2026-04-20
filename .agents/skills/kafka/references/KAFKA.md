# 📬 Kafka Messaging

This project uses **Apache Kafka** for asynchronous communication between services. The `KafkaService` is built using the `kafkajs` library and integrated into the NestJS lifecycle.

---

## 🏗️ Architecture

- **Engine**: [KafkaJS](https://kafka.js.org/)
- **Integration**: `src/services/kafka/kafka.service.ts`
- **Module**: `src/services/kafka/kafka.module.ts`

---

## ✨ Features

- **Producer**: Send messages to any topic with automatic JSON stringification.
- **Consumer**: Subscribe to topics with specified `groupId`.
- **Batch Processing**: Support for `consumeBatch` for high-throughput scenarios.
- **Resiliancy**: 
  - Automatic producer connection on module init.
  - Graceful disconnection on module destroy.
  - Customizable retry strategies for consumers.

---

## 🛠️ Configuration

Key environment variables in `.env`:

```env
KAFKA_HOST=localhost
KAFKA_PORT=9092
KAFKA_CLIENT_ID=nest-base
```

---

## 📟 Example Usage

### 🚀 Producing Messages

```typescript
import { KafkaService } from '@/services/kafka/kafka.service';

@Injectable()
export class MyService {
  constructor(private readonly kafkaService: KafkaService) {}

  async notifyUser(userId: string) {
    await this.kafkaService.produce('user-notifications', [
      {
        value: {
          userId,
          message: 'Welcome to Nest Base!',
          timestamp: new Date().toISOString()
        }
      }
    ]);
  }
}
```

### 📥 Consuming Messages

```typescript
@Injectable()
export class MyConsumer implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    await this.kafkaService.consume(
      'user-notifications',
      'notification-group',
      async ({ topic, partition, message }) => {
        const payload = JSON.parse(message.value.toString());
        console.log(`Received notification for user: ${payload.userId}`);
      }
    );
  }
}
```

---

## 📋 Topics List

| Topic | Description |
| :--- | :--- |
| `storage-upload` | Used for processing asynchronous file uploads (S3/SeaweedFS). |
| `user-registrations` | Used for downstream actions after a user signs up. |

---

## ⚙️ Maintenance & Lifecycle

The `KafkaService` handles connection lifecycle automatically:
- **`onModuleInit`**: Connects the global producer.
- **`onModuleDestroy`**: Disconnects the producer and all active consumers.
