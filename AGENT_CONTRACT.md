# AGENT CONTRACT

This repository enforces automatic regression protection.
All agents (human or AI) operating on this codebase must follow these rules.

---

## CORE RULES

### 1. No Cross-File Changes Without Explicit Scope
- If a task names file A, ONLY file A may be modified.
- Modifying file B because it is "related" or "also needs fixing" is FORBIDDEN.
- Exception: if the task explicitly lists multiple files.

### 2. No Implicit Refactors
- Fixing a bug does not authorize cleanup of surrounding code.
- Adding a feature does not authorize renaming variables.
- Optimizing performance does not authorize architectural changes.

### 3. No "Helpful Fixes"
- Do not fix issues you notice unless they are in the explicit task scope.
- Log noticed issues in a comment or report, but do NOT modify code.
- "I noticed this was also broken so I fixed it" is a scope violation.

### 4. Declare Scope Before Modification
Before touching any file, explicitly state:
```
Files to modify:
  - path/to/file.tsx
  - reason: [one sentence]
  - impact: [one sentence]
```
Do not proceed until scope is acknowledged.

### 5. Protected Files Require Double Confirmation
Before modifying any file in the locked list (see docs/ARCHITECTURE_CONTRACT.md §3):
1. State the file and reason
2. Wait for explicit "confirmed, proceed" response
3. Do not interpret silence as approval

---

## CURRENT SYSTEM STATE (as of last stable commit)

| Metric | Value |
|--------|-------|
| Homepage First Load JS | ~275 kB gz |
| i18n chunk on homepage | NONE (removed) |
| Three.js on homepage | NONE (fully deferred) |
| Build status | 111 static pages, 0 errors |

---

## WHAT IS ALLOWED WITHOUT PRIOR APPROVAL

- Reading files (grep, cat, find)
- Running build/lint in read-only mode
- Creating new files in `scripts/`, `docs/`, `.github/`
- Running the test suite

## WHAT REQUIRES EXPLICIT APPROVAL

- Modifying any `src/` file
- Modifying `package.json`, `next.config.ts`, `tsconfig.json`
- Adding new npm dependencies
- Modifying any locked file (double confirmation required)

---

## IF UNSURE → DO NOTHING

If the correct action is unclear:
1. State what you observed
2. State what you are considering
3. Ask for direction
4. Wait

Do not proceed on ambiguity.
