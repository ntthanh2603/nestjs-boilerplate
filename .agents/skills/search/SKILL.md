# Search & Analytics - Skill File

Advanced standards for **OpenSearch** integration, universal search, and high-performance indexing.

## 🏗️ 1. Architecture
- **Engine**: OpenSearch (managed service).
- **Client**: Official `@opensearch-project/opensearch`.
- **Health Check**: Mandatory health check on `onModuleInit`.

## ⚡ 2. Performance & Indexing
- **Bulk Operations**: ALWAYS use the `bulk()` method for syncing large datasets. Single `indexDocument()` is only for real-time single updates.
- **Refresh Policy**: `refresh: true` is used in single indexing for immediate consistency, but avoid it in high-frequency loops.
- **Mappings**: Never rely on dynamic mappings for Production. Always call `createIndex()` with explicit mappings/settings before indexing.

## 🔍 3. Querying Standards
- **Query DSL**: Use standard OpenSearch Query DSL.
- **Universal Search**: Use the `search()` wrapper for standard queries.
- **Advanced**: Use `getRawClient()` for specific cluster operations not covered by the wrapper.

## 🔐 4. Data Integrity
- No `any` for queries; use `Record<string, unknown>`.
- Log cluster health status but do not block app startup if OpenSearch is temporarily unavailable (soft failure).

## 🔗 5. References
- [SERVICE.md](./references/SERVICE.md) (Indexing, Bulk, and DSL Query samples)
