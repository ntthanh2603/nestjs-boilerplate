# Utils & Helpers - Skill File

Standards for using common utility functions in the project.

## 1. Pagination (`getManyResponse`)
- **Mandatory Usage**: Every endpoint returning a list MUST use the `getManyResponse` helper.
- **DTO**: Use `GetManyBaseQueryParams` for input and `GetManyBaseResponseDto<T>` for output.
- **Privacy**: Use the `ignoreFields` parameter to remove sensitive data (e.g., `password`, `secretKey`) from the response at the utility level.

## 2. Identifiers (`NanoID`)
- **Pattern**: Use `generateNanoId()` for public-facing identifiers or internal codes that require non-sequential strings.
- **Scripts**: See `src/utils/nanoid-generators.ts` for length configurations.

## 3. Redis Key Management
- **Naming**: Always use the `redisKey` helper to generate consistent keys.
- **Format**: `prefix:module:identifier` (e.g., `otp:auth:user@example.com`).

## 4. Swagger Metadata
- **Documentation**: Use `@Doc()` for comprehensive Swagger generation.
- **Complex Types**: For paginated responses in Swagger, use the `GetManyResponseDto(Model)` helper function in your controller.

## 5. Global Helpers
- `otp.util.ts`: for consistent 6-digit generation.
- **Date & Time**:
  - MUST use `dayjs` for all date logic.
  - Default timezone: `Asia/Ho_Chi_Minh`.
  - Avoid native `Date` object for business arithmetic.
- **TypeORM Transformers**: Use standard transformers (e.g., `ColumnNumericTransformer`) for consistent DB data types (e.g., decimals).

## 6. References
See [getManyResponse.ts](./references/getManyResponse.ts) for implementation.
