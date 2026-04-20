# Kafka Messaging & DLQ - Skill File

Standards for asynchronous communication and error handling using Kafka.

## 1. Principles
- **Async First**: Use Kafka to offload long-running tasks (email, image processing).
- **Resiliency**: Every consumer MUST implement a Dead Letter Queue (DLQ) pattern.
- **Reliability**: Ensure graceful shutdown of consumers to avoid message loss.

## 2. Producer Standards
- **Topic Naming**: Must use `KafkaTopic` enum.
- **Payloads**: Must use `type` definitions (not `interface`) to ensure compatibility with `Record<string, unknown>`.
- **Metadata**: Include source, timestamp, and traceId if available.

## 3. Consumer Standards
- **Error Handling**: 
  - Wrap the message processing in a `try-catch` block.
  - On failure, produce the message to the corresponding `.dlq` topic.
  - Include original payload + error stack + partition/offset/timestamp in the DLQ.
- **Non-blocking**: Do not block the main event loop; use `setImmediate` for heavy logging or secondary side effects.
- **Performance & Timeouts**: 
  - For heavy tasks (e.g., intensive image processing), increase `sessionTimeout` or offload to background workers.
  - Monitor consumer lag to adjust fetching strategies or parallelize.

## 4. Topic Mapping
- `auth.mail` -> `auth.mail.dlq`
- `storage.upload` -> `storage.upload.dlq`

## 5. References
See [KAFKA.md](./references/KAFKA.md) for setup details.
