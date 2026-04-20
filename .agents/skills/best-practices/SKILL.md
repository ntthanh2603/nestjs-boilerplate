# Advanced NestJS Best Practices - Skill File

Critical architectural and performance standards derived from `agent-nestjs-skills`.

## 1. Modular Architecture (Critical)
- **Feature Modules**: Organize code by domain (e.g., `src/users/`, `src/orders/`), not by layer. Each module MUST be self-contained.
- **Circular Dependencies**: 
  - **Rule**: NEVER allow Module A to import Module B while B imports A.
  - **Prevention**: Extract shared logic to a `SharedModule` or use `@OnEvent` for decoupled communication.
  - **Last Resort**: Use `forwardRef()` only if strictly necessary.

## 2. Dependency Injection (DI)
- **Constructor Injection**: Always prefer constructor injection.
- **Avoid Service Locator**: NEVER use `ModuleRef.get()` to resolve dependencies at runtime if they can be injected. This hides dependencies and breaks testability.
- **Provider Scopes**: Be aware that `Scope.REQUEST` bubbles up and can impact performance. Use `DEFAULT` (Singleton) whenever possible.

## 3. Performance & Resource Management
- **Graceful Shutdown**: 
  - **Rule**: Enable `app.enableShutdownHooks()` in `main.ts`.
  - **Logic**: Use `OnApplicationShutdown` to close DB connections, stop Kafka consumers, and clear Redis locks.
- **Memory Management**: Avoid providing the same Service in multiple modules. Export it from a dedicated module and import that module instead.

## 4. API & Data Handling
- **Serialization**: Use `class-transformer` (e.g., `@Exclude()`, `@Expose()`) to control API output.
- **Pipes**: Use Pipes for both validation AND transformation (e.g., parsing strings to numbers).

## 5. References
- `arch-avoid-circular-deps.md`
- `devops-graceful-shutdown.md`
- `di-avoid-service-locator.md`
