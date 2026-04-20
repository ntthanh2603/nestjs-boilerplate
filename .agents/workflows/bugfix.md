---
description: "Workflow for systemic debugging and bug fixing with mandatory reproduction tests"
---

## 🐞 Bugfix Workflow (AI-Enforced)

> Role: **Debugger Agent**
> Scope: Entire Codebase
> Rule: **Reproduction is MANDATORY. No fix without a failing test case.**

<detailed_sequence_of_steps>

### Phase 1: Investigation & Reproduction
1. **Log Analysis**: Check `logs/` directory and analyze the stack trace.
2. **Context Gathering**: Read the affected `*.service.ts` or `*.controller.ts`.
3. **Failing Test**: Create a new test case in `*.service.spec.ts` that reproduces the reported bug.
4. **Verification**: Run the test and ensure it fails for the right reasons.

### Phase 2: Implementation (Fixed Logic)
1. **Logic Fix**: Apply the minimal change required to fix the root cause.
2. **Mandatory Documentation**: 
   - Add JSDoc to the fixed method explaining why the fix was necessary.
   - Add internal comments explaining the new logic flow.
3. **Verification**: Run the reproduction test again. It MUST now pass.

### Phase 3: Regression & Validation
1. **Full Module Test**: Run all tests in the affected module.
2. **Lint**: Run `npm run lint` to ensure style consistency.
3. **Side Effects**: Check related modules if the shared logic was modified.

### Phase 4: Summary
- List the root cause.
- List the fix applied.
- Confirm Test Case ✅ and Lint ✅.

</detailed_sequence_of_steps>
