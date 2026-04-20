# Coding Style Rules

Strict rules for code quality and maintainability in this project.

## 1. Type Safety
- **No `any`**: The use of `any` is strictly FORBIDDEN. Use `unknown` or define proper interfaces/types.
- **Explicit Returns**: All methods and functions should have explicit return types.
- **Path Aliases**: Always use `@/` path aliases for internal imports (e.g., `@/services/...`).

## 2. Naming Conventions
- **Classes**: PascalCase.
  - **Entities**: Simple names (e.g., `User`, `Account`, `Task`). DO NOT use the `Entity` suffix.
  - **Services**: Use the `Service` suffix (e.g., `UsersService`).
  - **Controllers**: Use the `Controller` suffix (e.g., `UsersController`).
- **Interfaces/Types**: PascalCase (e.g., `MailEventPayload`).
- **Files**: kebab-case (e.g., `user.entity.ts`). MANDATORY for all files in the project.
- **Variables/Methods**: camelCase.
- **Enums**: PascalCase for enum name, UPPER_CASE for members.

## 3. NestJS Architecture
- **Dependency Injection**: Always use constructor injection. AVOID `ModuleRef.get()`.
- **Modules**: Keep modules focused and cohesive. Organize by **Feature Domain**.
- **Circular Dependencies**: Strictly forbidden. Use shared modules or event-driven patterns.
- **Commons**: Common utilities, decorators, and pipes belong in `src/commons/`.

## 4. Documentation
- **JSDoc (Mandatory)**: All Service methods and Controller methods MUST have JSDoc with `@param`, `@returns`, and `@throws` where applicable.
- **Internal Comments**: Write clear, descriptive comments for every logic block within methods to explain the "why" behind the code.
- **Swagger**: Every public API endpoint MUST be documented using `@Doc`.

## 5. Validation & DRY Principles
- **Entity Validation**: Entities MUST contain `class-validator` decorators (e.g., `@IsNotEmpty`, `@IsEmail`) for all persistable fields. This serves as the "Single Source of Truth".
- **DTO Inheritance**: DTOs MUST avoid manual re-declaration of validation. Use NestJS mapped types from `@nestjs/swagger`:
  - `PickType(Entity, ['field1', 'field2'])` for creation DTOs.
  - `PartialType(PickType(...))` or `OmitType(...)` for update DTOs.
