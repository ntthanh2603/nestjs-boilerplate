# Environment & Configuration - Skill File

Standards for managing secrets and environment-specific settings.

## 1. Secrets Management
- **Rule**: NEVER hardcode secrets (API Keys, Passwords, Tokens) in the code.
- **Source**: Use `.env` for local and Environment Variables for Production/CI.
- **Access**: Always use `ConfigService` or a dedicated `ConfigModule`. Avoid `process.env` directly in services.

### Usage Example:
```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

const dbHost = this.configService.get<string>('database.host');
```

## 2. Validation
- **Requirement**: Use a schema validator (Zod or Joi) to validate `.env` on startup. The app should FAIL to boot if required variables are missing.

## 3. Configuration Organization
- **Structure**: Group related configs (e.g., `db.config.ts`, `kafka.config.ts`, `app.config.ts`).
- **Nesting**: Use nested configurations for better organization: `this.configService.get('database.host')`.

## 4. References
- `database.config.ts`
- `app.module.ts` (ConfigModule setup)
