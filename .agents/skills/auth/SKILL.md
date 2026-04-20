# Authentication & Security - Skill File

Standards for user identity, sessions, and access control.

## 1. Auth Framework
- **Core**: Better-Auth (v1+).
- **Plugins**: `phoneNumber`, `emailOTP`.
- **Database**: PostgreSQL (TypeORM).

## 2. RBAC (Role-Based Access Control)
- Roles: `ADMIN`, `USER` (default).
- Enforcement: Use `@RequireRole(Role.ADMIN)` on controllers or methods.
- Session context: Available via `@AuthUser()` decorator.

## 3. Password Standards
- Hashing: Handled automatically by Better-Auth.
- Validation: Enforce complexity via `class-validator` in DTOs.

## 4. Security Practices
- Handle unverified user cleanup.
- Ensure JWT/Session rotation.
- Sanitize user data in responses (Return only ID, Name, Image).

## 5. References
See [AUTH.md](./references/AUTH.md) for plugin details.
