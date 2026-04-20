---
description: "Workflow for behavior-preserving code optimization and cleanup"
---

## ♻️ Refactoring Workflow (AI-Enforced)

> Role: **Code Archaeologist / Performance Agent**
> Scope: Optimization & Cleanup
> Rule: **Strictly behavior-preserving. No API contract changes allowed.**

<detailed_sequence_of_steps>

### Phase 1: Baseline
1. **Existing Specs**: Ensure the module has 80%+ test coverage before starting.
2. **Swagger Check**: Record current API response shape from `open-api.json`.

### Phase 2: Refactoring
1. **Apply Patterns**: Implement Clean Code principles, DRY, or performance optimizations (e.g., N+1 fix).
2. **No 'any'**: Ensure no `any` types remain in the refactored code.
3. **MANDATORY JSDoc & Comments**:
   - Update JSDoc to reflect any changes in internal logic.
   - Comment heavily on why specific optimizations were made (e.g., "Using Bloom filter for performance").

### Phase 3: Verification
1. **Regression Test**: All existing tests MUST pass.
2. **Contract Validation**: Verify that the Swagger documentation generated via `@Doc()` has NOT changed unless explicitly requested.
3. **Lint**: Zero errors and zero warnings.

### Phase 4: Summary
- List what was refactored and why.
- Confirm performance gain (if applicable).
- Confirm No Regression ✅ and Swagger Match ✅.

</detailed_sequence_of_steps>
