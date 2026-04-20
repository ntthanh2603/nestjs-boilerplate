# Node.js & NestJS Best Practices

High-performance server-side principles for 2025.

## 🏗️ Layered Architecture (MANDATORY)
1. **Controller Layer**: Handles HTTP, validation at boundary, calls Service.
2. **Service Layer**: Pure Business Logic, framework-agnostic.
3. **Repository Layer**: Data access only, ORM interactions.

## ⚡ Performance Principles
- **Event Loop**: Never block with CPU-intensive work (use workers or offload).
- **Async/Await**: Use `Promise.all` for independent parallel tasks.
- **Fail Fast**: Validate early at the API boundary using DTOs.

## 🔐 Security Execution
- **Trust Nothing**: All inputs (params, body, headers) must be validated.
- **Centralized Errors**: Don't expose internal stack traces to clients.
- **Fail Secure**: On error, the default state should be "Access Denied".

## 🛑 Anti-Patterns
❌ Putting business logic in Controllers.
❌ Using sync methods (`fs.readFileSync`) in async paths.
❌ Hardcoding secrets or environment-specific values.
