---
trigger: always_on
---

# 🏗️ Project Structure & File Nesting Map

> This guide defines the canonical location for every type of file in the Nest-Base project. 

---

## 📂 1. High-Level Organization

| Path | Responsibility |
| :--- | :--- |
| `src/` | **Application Source**: All production code. |
| `.agents/` | **Agent OS**: Workflows, skills, and rules that guide AI agents. |
| `test/` | **Global Testing**: E2E test suites and test environment setups. |
| `databases/` | **Docker Configs**: Database-related infra (e.g., initialization scripts). |

---

## 🧩 2. Source Code Anatomy (`src/`)

### 📦 Feature Modules (`src/modules/`)
Organized by **Domain**. Each module is self-contained.
```plaintext
src/modules/<feature-name>/
├── dtos/                # Input/Output validation (LoginDto, CreateUserDto)
├── entities/            # TypeORM Entity definitions for this domain
├── <name>.controller.ts # Routing, Swagger docs (@Doc), and DTO validation
├── <name>.service.ts    # Business logic, DB operations, Kafka producers
├── <name>.module.ts     # Dependency injection configuration
└── <name>.interface.ts  # (Optional) Domain-specific types/interfaces
```

### ⚙️ Infrastructure Services (`src/services/`)
Shared services used across multiple feature modules.
- `kafka/`: Producers, consumers, and topic configurations.
- `mail/`: Template rendering and email dispatch logic.
- `storage/`: File upload (S3), processing (Sharp), and presigned URLs.
- `search/`: OpenSearch indexing and complex search queries.

### 🛠️ Shared Commons (`src/commons/`)
Cross-cutting concerns and reusable base classes.
- `decorators/`: Custom NestJS decorators (e.g., `@FileUpload`).
- `docs/`: Swagger-specific helpers (`@Doc`).
- `entities/`: `BaseEntity` (provides `id`, `createdAt`, `updatedAt`, `deletedAt`).
- `exceptions/`: Domain-specific exceptions and the `ErrorCode` enum.
- `guards/`: Security logic (Auth, RBAC, API Key).
- `pipes/`: Global and custom validation pipes.

---

## 🧭 3. Decision Matrix: "Where do I put this?"

| If you are adding a... | Then put it in... | Example |
| :--- | :--- | :--- |
| **New API Endpoint** | `src/modules/<feature>/` | `users.controller.ts` |
| **New DB Table** | `src/modules/<feature>/entities/` | `user.entity.ts` |
| **Validation Logic** | `src/modules/<feature>/dtos/` | `create-user.dto.ts` |
| **Custom Filter/Guard** | `src/commons/guards/` | `roles.guard.ts` |
| **Reusable Utility** | `src/utils/` | `date-helper.ts` |
| **Kafka Topic** | `src/commons/constants/` | `kafka.constant.ts` |

---

## ⚠️ 4. Anti-Patterns (NEVER do this)
- ❌ **Do NOT** put business logic in Controllers.
- ❌ **Do NOT** create cross-module imports for DTOs.
- ❌ **Do NOT** bypass `BaseEntity` when creating new models.
- ❌ **Do NOT** use `any` in any directory.
