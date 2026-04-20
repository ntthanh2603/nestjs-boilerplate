# Nest-Base Agent Architecture

> High-Performance NestJS Agentic Development Framework

---

## 📋 Overview

The Agent OS in this project is a modular system designed to empower AI agents with domain-specific knowledge and standardized workflows.

- **5 Core Personas** - Specialized roles defined in the root `AGENTS.md`.
- **19 Skills** - Domain-specific knowledge modules for NestJS, Kafka, and more.
- **8 Workflows** - Step-by-step procedures for common development tasks.

---

## 🏗️ Directory Structure

```plaintext
.agents/
├── ARCHITECTURE.md          # This file
├── rules/                   # Global directives (coding-style, git, structure)
├── skills/                  # 19 Domain-specific skills
└── workflows/               # 8 Command-driven workflows
```

---

## 🤖 Agents (Personas)

Defined in the root [AGENTS.md](/AGENTS.md). These roles guide the agent's focus during task execution.

| Persona              | Focus                                     | Key Responsibilities                                     |
| -------------------- | ----------------------------------------- | -------------------------------------------------------- |
| `Code Review`        | Type safety & Cleanup                     | Strict "No any" enforcement, logic correctness           |
| `Security Auditor`   | Auth & Data Safety                        | RBAC guards, S3 presigned URL security, input validation |
| `DB Architect`       | Schema & Performance                      | N+1 prevention, migrations, transaction integrity        |
| `Integration/Kafka`  | Messaging Flow                            | Claim Check pattern, DLQ implementation                  |
| `Testing Specialist` | Coverage & Quality                        | TDD, 80%+ coverage for critical modules                  |

---

## 🧩 Skills (19)

Modular knowledge domains loaded based on task context.

### Core Backend

| Skill                   | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `nodejs-best-practices` | Node.js async patterns and module standards          |
| `best-practices`        | General coding standards for the project             |
| `utils-and-helpers`     | Date handling (Day.js), Pagination, NanoID           |

### Infrastructure & Services

| Skill             | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `database`        | TypeORM entities, migrations, and performance        |
| `kafka`           | Async messaging, DLQ, and Claim Check patterns       |
| `search`          | OpenSearch integration and indexing                  |
| `caching`         | Redis key management and TTL strategies              |
| `storage`         | S3 bucket management and temporary uploads           |
| `mail`            | Template rendering and Kafka-driven delivery         |

### Quality & DevOps

| Skill                   | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `testing`               | Unit and integration testing with Jest               |
| `webapp-testing`        | E2E testing strategies                               |
| `troubleshooting`       | Root cause analysis and debugging logs               |
| `monitoring`            | Performance tracking and error reporting             |
| `logging`               | Standardized log formats across services             |
| `environment`           | Config management and secret injection               |

### Security & Compliance

| Skill                   | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `security`              | Authentication flows and RBAC                        |
| `vulnerability-scanner` | Security auditing for dependencies and endpoints     |

### Planning

| Skill           | Description                                          |
| --------------- | ---------------------------------------------------- |
| `plan-writing`  | Task breakdown and implementation strategy           |

---

## 🔄 Workflows (8)

Standardized procedures located in `.agents/workflows/`.

| Command             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `/api`              | E2E API development (Design -> Test -> Deployment)    |
| `/bugfix`           | Systematic debugging and regression prevention        |
| `/refactor`         | Behavior-preserving code optimization                 |
| `/test`             | Quality assurance and coverage enforcement            |
| `/ci-cd`            | Pipeline maintenance and deployment safety            |
| `/orchestrate`      | Complex task coordination                             |
| `/self-improvement` | Meta-analysis and rule updates                        |
| `/pr-review`        | Pre-submission code quality audit                     |

---

## 🎯 Skill Loading Protocol

```plaintext
Task Context → Metadata Match → Load SKILL.md
                                    ↓
                            Read references/
                                    ↓
                            Execute Validations
```

---

## 📊 Statistics

| Metric              | Value                         |
| ------------------- | ----------------------------- |
| **Total Personas**  | 5                             |
| **Total Skills**    | 19                            |
| **Total Workflows** | 8                             |
| **Coverage Area**   | 100% NestJS Backend Stack     |

---

## 🔗 Quick Reference

| Need     | Primary Persona     | Key Skills                     |
| -------- | ------------------- | ------------------------------ |
| New API  | `Code Review`       | database, utils-and-helpers    |
| Fix Bug  | `Testing Specialist`| troubleshooting, testing        |
| Security | `Security Auditor`  | security, vulnerability-scanner|
| Messaging| `Integration/Kafka` | kafka, storage                 |
