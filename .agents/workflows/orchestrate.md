# Task Orchestration Workflow

A high-level guide to planning complex backend features before implementation.

## 🧠 The Orchestration Process

### Step 1: Context Discovery
- Search the codebase for similar features.
- Identify all affected Modules, Services, and Entities.
- Consult `.agents/memory/LESSONS.md` for historical pitfalls.

### Step 2: Solution Design (Brainstorm)
- Propose 2-3 implementation approaches (Sync vs Async, Direct DB vs Search Index).
- Pick the best approach based on **Performance, Scalability, and Maintainability**.

### Step 3: Action Planning
- Break down the task into small, atomic steps.
- Assign a specialized persona to each step (e.g., "DB Architect for the Migration", "Security Auditor for the Pipe").

### Step 4: Verification Strategy
- Define what "Done" looks like (Unit tests, 80% coverage, Swagger docs).

## 🛑 Rule: NEVER start coding a complex feature without providing an "Orchestration Plan" first.
