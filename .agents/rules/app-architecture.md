# Project Architecture - Nest-Base

High-level overview of the system components and their interactions.

## 1. Core Stack
- **Framework**: NestJS (v11+) - Modular architecture.
- **Database**: PostgreSQL - Managed via TypeORM.
- **Cache**: Redis (ioredis) - Used for session management and rate limiting.

## 2. Communication & Messaging
- **Kafka**: Primary asynchronous message broker (kafkajs).
  - **Topics**: `auth.mail`, `storage.upload`, `auth.mail.dlq`, etc.
  - **Pattern**: Event-driven architecture with Dead Letter Queues for resiliency.

## 3. Storage & Media
- **S3-Compatible**: SeaweedFS/AWS S3.
- **Image Processing**: Sharp (WebP conversion, resizing).
- **Upload Flow**: 
  - Sync: Directly to S3.
  - Async: RAW buffer to `temporary/` -> Kafka -> Worker -> Processed Buffer to final folder.

## 4. Search & Analytics
- **OpenSearch**: Full-text search engine.
- **Integration**: `SearchService` handles indexing and universal search queries.

## 5. Metadata & Flow
- **Request Lifecycle**: 
  - `Guard` (Auth/RBAC) -> `ValidationPipe` (DTO) -> `Controller` -> `Service` -> `Entity/Repository`.
- **Error Handling**: `GlobalExceptionFilter` maps custom exceptions to standardized JSON responses.
