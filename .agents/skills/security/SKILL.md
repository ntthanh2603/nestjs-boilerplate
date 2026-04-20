# Security & Data Validation - Skill File

Strict security standards for the `nest-base` project.

## 1. Input Validation
- **DTOs**: Use `class-validator` for ALL request bodies. Use `strictGroups` if editing sensitive fields.
- **Sanitization**: All string inputs are passed through `SanitizeRequestPipe`. This middleware trims whitespaces and removes dangerous HTML/XSS elements.
- **No Raw Queries**: Avoid `query()` or `createQueryBuilder().where("... = " + input)`. Use parameter binding to prevent SQL Injection.

## 2. Sensitive Data
- **Scrubbing**: Ensure passwords, secrets, and private keys are NEVER returned in API responses. Use `@Exclude()` in entities or `ignoreFields` in `getManyResponse`.
- **Hashing**: Use `argon2` or `bcrypt` for password hashing. Use the `auth` module standards.

## 3. Rate Limiting
- **Sensitive Endpoints**: Use `@RateLimit({ points: 5, duration: 60 })` for Login, OTP, and Password Reset.
- **Global Limit**: Managed via `RedisThrottlerStorage`.

## 4. Authorization (RBAC)
- **Guards**: Always apply `@UseGuards(JwtAuthGuard, RolesGuard)` for protected routes.
- **Decorators**: Use `@Roles(Role.ADMIN)` or similar to restrict access.

## 5. References
- `sanitize-request.pipe.ts`
- `roles.guard.ts`
- `rate-limit.decorator.ts`
