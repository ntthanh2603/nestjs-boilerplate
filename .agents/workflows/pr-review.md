# Code Review & PR Workflow

Guidelines for reviewing code and preparing Pull Requests.

## 1. Self-Review Checklist
Before marking a task as DONE, verify:
- [ ] No `any` types used.
- [ ] All public API methods have `@Doc()`.
- [ ] Business logic has corresponding unit tests.
- [ ] Kafka topics are in the `KafkaTopic` enum.
- [ ] DLQ handling is implemented for consumers.
- [ ] `npm run lint` passes with 0 issues.

## 2. Review Process
- **Readability**: Is the code self-documenting? Are non-obvious parts commented?
- **Efficiency**: Are there unnecessary DB queries or Kafka messages?
- **Safety**: Is input validation strict enough?

## 3. Deployment Readiness
- Ensure all environment variables are added to `.env.example`.
- Ensure migrations are generated and tested locally.
