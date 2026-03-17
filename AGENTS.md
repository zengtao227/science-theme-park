# Codex Collaboration Rules

## Command Review First
- Even when the user provides ready-to-run commands, review each command/script before execution.
- If any command is risky, brittle, unclear, or likely to cause side effects, do not run it directly.
- Explain the issue and provide a safer equivalent command/script.

## Execute Only After Agreement
- Start execution only after the proposed approach and the user's intent are aligned.
- If there is any mismatch, pause and clarify first.

## Safety Baseline
- Prefer minimal, reversible edits.
- Avoid destructive actions unless explicitly requested.
- Validate changes with project checks before commit.
- After any code changes, push to GitHub.

## Rendering Hard Rules
- Rule 1: `promptLatex` must be rendered via `renderMixedText`, and new modules must not use `\text{${t(...)}}` wrappers. Use `t(...)` directly for prompt text.
- Rule 2: `expressionLatex` / `targetLatex` / `correctLatex` must be rendered via `<InlineMath math={...} />`, and source strings must use double backslashes.
- Rule 3: Run `scripts/audit-rendering.sh` before merge; any hit outside the `sc2-01` exemption must be fixed before push.

## Bugfix Workflow Rules
- **No Bugfix Specs**: When the user provides a direct fix plan with root cause analysis and specific implementation steps, execute it immediately without creating bugfix spec files (`.kiro/specs/*/bugfix.md`, `design.md`, `tasks.md`).
- **Direct Execution**: Follow the user's fix plan exactly as provided, make the changes, validate with audit scripts, and push to GitHub.
- **When to Use Specs**: Only create bugfix specs when the user explicitly requests a formal spec workflow, or when the issue requires investigation and no fix plan is provided.

## Proactive Issue Detection
- **After Every Fix**: When you complete any bugfix or code change, automatically search ALL modules for similar issues using the same pattern.
- **Search Scope**: Check all relevant files across the entire codebase (e.g., all `src/app/chamber/*/page.tsx` files, all Canvas components in `src/components/chamber/*/`).
- **Report Format**: Present findings with:
  1. List of affected modules/files
  2. Specific locations and hardcoded content found
  3. Proposed fix plan following the same pattern as the original fix
- **Wait for Approval**: DO NOT implement any fixes automatically. Report findings and wait for explicit user approval before proceeding.
- **Batch Fixes**: When multiple similar issues are found, propose fixing them all in a single batch operation for efficiency.
