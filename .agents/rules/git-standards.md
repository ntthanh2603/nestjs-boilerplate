# Git & Commit Standards

Rules for version control and collaborative development.

## 1. Conventional Commits
All commit messages MUST follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:`: A new feature.
- `fix:`: A bug fix.
- `docs:`: Documentation only changes.
- `style:`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
- `refactor:`: A code change that neither fixes a bug nor adds a feature.
- `perf:`: A code change that improves performance.
- `test:`: Adding missing tests or correcting existing tests.
- `chore:`: Changes to the build process or auxiliary tools and libraries.

**Format**: `<type>(<scope>): <description>` (e.g., `feat(auth): add phone number login support`)

## 2. Branching Strategy
- **main**: Production-ready code.
- **develop**: Integration branch for features.
- **feature/***: New features.
- **fix/***: Bug fixes.

## 3. PR Standards
- Every PR must have a clear description of:
  - What changed.
  - Why it changed.
  - How to test it.
  - Checklist: Lint, Tests, Swagger docs.
