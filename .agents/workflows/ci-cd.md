---
description: "CI/CD pipeline fix workflow from environment analysis to deployment and performance optimization"
---

## 🔧 CI/CD Fix Development Workflow (AI-Enforced)

> Role: **Senior DevOps Engineer**
> Requirement: Follow **exactly** the workflow below when implementing CI/CD fixes.

---

### 1. Issue Analysis & Root Cause identification

- **Reproduce the CI/CD issue** before implementing any fix.
  - Identify the stage where the pipeline fails (build, test, deploy).
  - Document exact error messages and logs.
  - Understand differences between local and CI environments.

- Identify **root cause**:
  - Environment differences (Node.js version, OS).
  - Permission issues or network connectivity.
  - Resource limitations (memory, disk, timeouts).

---

### 2. Implementation (CI/CD Fix)

- **Mandatory Requirements**:
  - Create a **targeted fix** that addresses ONLY the identified issue.
  - Maintain backward compatibility.
  - Optimize for build performance and reliability.
  - MUST have full documentation comments above every modified configuration.

- **CI/CD Rules**:
  - **Rule 1**: Fix the root cause, not the symptoms.
  - **Rule 2**: Ensure fix works in both local and CI environments.
  - **Rule 3**: Update `.dockerignore` to keep images small.
  - **Rule 4**: Add proper logging for future debugging.

---

### 3. Validation (MANDATORY)

- Before implementing, identify validation steps:
  - Local Docker build verification (`docker build -t test-image .`).
  - Local script execution.
- After implementing, validate in:
  - Local dev environment.
  - Local Docker container.
  - ACTUAL CI environment (via branch push).

---

### 4. Linting & Code Quality

- Ensure configuration files pass available linters:
```bash
# YAML linting
# npm run lint (if configured for yaml)
```
- **Zero tolerance**: No errors in CI/CD configurations.

---

### 5. Documentation

- Add **English comments** to explain complex configurations or workarounds.
- Update `README.md` or `DEVELOPER_GUIDE.md` if deployment steps change.

---

### 6. Completion Summary (REQUIRED)

Provide a summary:
- **Root cause** identified.
- **Files modified**.
- **Performance impact** (if any).
- **Validation results**.
- Status: **READY FOR DEPLOYMENT**.

---

> ❌ Missing any step → **work is NOT considered complete**
