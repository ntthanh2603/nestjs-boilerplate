# Asynchronous Mail System (Kafka-Driven)

High-performance, event-driven mailing system using NestJS Mailer and Kafka.

## 🏗️ 1. Architecture (Event-Driven)
- **Producer**: API modules NEVER send mail directly. They produce a message to `KafkaTopic.AUTH_MAIL`.
- **Consumer**: `MailConsumer` listens for events and calls `MailService` to perform the actual SMTP send.
- **Why**: Ensures API responsiveness and handles retries/failures gracefully without blocking the user.

## ✉️ 2. Event Patterns & Payloads
Every mail event MUST follow the `MailEventPayload` structure:
- `pattern`: Unique identifier (e.g., `send-otp`, `send-verification-email`).
- `data`: Actual data (email, url, code, etc.).
- `metadata`: Contains `timestamp` for latency monitoring.

## 🛡️ 3. Error Handling & DLQ
- **Try/Catch**: The Consumer wraps the logic in a try/catch.
- **DLQ**: Upon failure, the message is automatically moved to `KafkaTopic.AUTH_MAIL_DLQ` for audit and manual retry.

## 📊 4. Monitoring Rules
- **Latency**: If `Date.now() - metadata.timestamp > 10000` (10s), log a WARNING.
- **Context**: Always use `LoggerService` with the correct class context.

## 🎨 5. Templates (Handlebars)
- Files live in `src/services/mail/templates/*.hbs`.
- Always pass `appName` and `currentYear` in the context for consistent branding.

## 🔗 6. References
- [MAIL.md](./references/MAIL.md) (Implementation Patterns)
