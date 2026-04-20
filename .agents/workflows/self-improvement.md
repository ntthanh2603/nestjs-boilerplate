---
description: "Self-improvement workflow to reflect on tasks and propose improvements to active rules"
---

## 🧠 Self-Improving Agent Workflow (Reflection)

> Goal: Propose focused, high-value improvements to `.agents/` rules and skills based on interaction experience.

---

### 1. Applicability Check
Ask whether reflection is warranted:
- Did this task involve complex logic generation?
- Did the user have to correct the Agent's understanding multiple times?
- Was a new pattern discovered that isn't documented?

### 2. Identify Active Rules
- Scan `.agents/rules/` and `.agents/skills/`.
- Scan `.agents/workflows/`.

### 3. Review and Synthesize
Using the current task's context:
- Summarize user feedback (explicit and implicit).
- Identify where rules helped or hindered flow.
- Propose targeted improvements:
  - Address user feedback directly.
  - Consolidate overlapping guidance.
  - Remove outdated sections.

### 4. Present Proposals
Provide a concise list of suggested changes per file (no diff blocks). Focus on practical, high-value edits.

### 5. Approval to Act
Ask the user: "Would you like me to apply these improvements now, or just present recommendations?"

---

## Notes
- This is a **manual workflow**. Invoke it when an interaction reveals a gap in the project's Agent instructions.
- Keep proposals short, specific, and actionable.
