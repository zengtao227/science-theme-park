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
