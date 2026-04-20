# Web Application Testing Strategy

Ensuring quality across API and Frontend integration.

## 🗼 Testing Pyramid
- **Unit (Many)**: Business logic in Services.
- **Integration (Some)**: Controller endpoints, DB interactions.
- **E2E (Few)**: Critical user flows (Auth, Checkout) using Playwright.

## ✅ E2E Best Practices
- **Happy Paths**: Focus on the 80% of successful user journeys.
- **Auto-wait**: Never use hardcoded timeouts (`sleep`). Use `waitFor`.
- **Clean State**: Each test should start with a clean Database/Session.

## 🛑 Testing Anti-Patterns
❌ Testing framework internals (e.g., testing if NestJS correctly calls a method).
❌ Skipping error case testing.
❌ Flaky tests that fail randomly due to network issues.
