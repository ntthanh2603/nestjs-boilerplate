# Database Management & Design - Skill File

Comprehensive standards for schema design, TypeORM implementation, and performance.

## 1. Design & Optimization (Decision First)
### 🎯 Decision Checklist
- [ ] Have you identified the read/write ratio?
- [ ] Is this relationship 1:1, 1:N, or N:M?
- [ ] Are all foreign keys indexed?
- [ ] Can this JSON field be flattened into columns for performance?

### 🚀 Optimization Patterns
- **Indexing**: Use composite indexes for frequently filtered multi-column queries.
- **Explain Analyze**: Always profile complex SQL to find bottlenecks.

### 🛑 Anti-Patterns
- ❌ Ignoring database constraints (Unique, Not Null).
- ❌ Using `SELECT *` in heavy queries.
- ❌ Storing large blobs/files directly in the DB (Use Storage Skill instead).

## 2. NestJS Implementation
- **Entities**: EVERY entity MUST extend `BaseEntity` from `src/commons/entities/`. This provides `id`, `createdAt`, `updatedAt`, and `deletedAt`.
- **Transformers**: Use `ColumnNumericTransformer` and `PointTransformer` (from `src/utils/`) for specialized data types.
- **Hooks**: Use `@BeforeInsert` / `@BeforeUpdate` for metadata.
- **Repository Pattern**: Inject `Repository<Entity>`. Use `DataSource` only for complex transactions.

## 3. Performance & Transactions
- **N+1 Prevention**:
  - NEVER fetch relations in a loop.
  - USE `relations` option or `leftJoinAndSelect` in QueryBuilder.
- **Transactions**:
  - Always use `dataSource.transaction()` for multi-step updates to ensure atomicity.

## 4. Migrations
- **Naming**: Descriptive names only (e.g., `AddUserAvatar`).
- **Safety**: Never modify existing migrations.

## 5. References
- `base.entity.md` (Template)
- `DATABASE.md` (Implementation details)
- `SECURITY.md` (Sanitization standards)
- `CODING_STYLE.md` (Naming conventions)
