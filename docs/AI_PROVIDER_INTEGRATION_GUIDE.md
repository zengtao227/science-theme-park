# AI Provider Integration Guide

## Purpose

This guide defines the standard way to upgrade a chamber module from:

- layered feedback fallback only

to:

- real module-specific `feedbackContentProvider`
- deterministic `steps`
- deterministic `fullSolutionLatex`

The goal is not to reveal answers earlier. The goal is to replace raw fallback answers with guided solving.

## Architecture Boundary

The platform already owns:

- feedback unlock thresholds
- anti-spoiler confirmation
- hint lifecycle
- display of hint / steps / full solution

Module code must only provide:

- deterministic solving logic
- module-specific `steps`
- module-specific `fullSolutionLatex`

Do not reimplement panel behavior inside a chamber page.

## Required Contract

Provider contract:

```ts
(quest: TQuest) => Omit<FeedbackContent, "hint">
```

Important rules:

1. `hint` is platform-derived. Providers must not return it.
2. Provider must be a pure function.
3. Provider must not read error counts or UI state.
4. Provider must not mutate `quest`.
5. Unsupported question types must return:
   - `steps: []`
   - `fullSolutionLatex: null`
   - `hasFullSolution: false`

## Standard File Layout

For a module like `sm2-10`:

- page:
  - `src/app/chamber/sm2-10/page.tsx`
- provider:
  - `src/lib/sm2-10/provider.ts`
- solver:
  - `src/lib/sm2-10/solver.ts`

Recommended split:

- `solver.ts`
  - pure deterministic solving logic
- `provider.ts`
  - adapter from module quest to platform feedback contract
- `page.tsx`
  - mounts provider into `useQuestManager`

## Implementation SOP

### Step 1: Audit quest types

Before writing code, list all quest subtypes in the module:

- `stage`
- `difficulty`
- `dataType` or equivalent subtype key
- whether each subtype is:
  - computational
  - structural/conceptual
  - currently unsupported

Do not start by writing one giant solver blindly.

### Step 2: Write deterministic solver logic

Prefer local code, not LLM inference, for exact subjects:

- algebra
- geometry
- statistics
- physics calculations
- chemistry balancing/calculation

The solver should accept only the data it needs:

```ts
solveModuleX(dataType, parameters, t, correctLatex)
```

Output:

```ts
{
  steps: PlatformSolutionStep[];
  fullSolutionLatex: string | null;
}
```

### Step 3: Distinguish supported vs unsupported subtypes

Do not fake coverage.

If a subtype does not yet have enough parameters or logic:

- return no steps
- return no full solution
- let platform fallback handle it

This is better than turning `correctLatex` into a fake "step".

### Step 4: Build provider adapter

Recommended pattern:

```ts
export function createModuleXFeedbackProvider(t: Translator) {
  return (quest: ModuleXQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveModuleX(
      quest.dataType,
      quest.parameters,
      t,
      quest.correctLatex || ""
    );

    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
```

### Step 5: Mount it in the page

Inside `page.tsx`:

```ts
const feedbackContentProvider = useMemo(
  () => createModuleXFeedbackProvider(t),
  [t]
);

const questManager = useQuestManager<ModuleXQuest, Stage>({
  moduleCode: "module-x",
  buildPool,
  initialStage: "BASIC_STAGE",
  feedbackContentProvider,
});
```

If the provider is only imported but not passed into `useQuestManager`, the whole feature is dead at runtime.

## Parameter Strategy

Computational subtypes usually need explicit `parameters`.

Examples:

- ordered dataset
- quartiles
- IQR
- bounds
- means
- target values
- known constants

Rules:

1. Parameters must be derived from the actual quest content.
2. Parameters must agree with:
   - `correctLatex`
   - hints
   - prompt meaning
3. Do not add random parameters that are never used.

## Step Quality Rules

Good steps:

- show one real transformation at a time
- use mathematical expressions, not long prose blobs
- use localized `justification`
- keep `expressionLatex` mathematical

Bad steps:

- restating the final answer only
- dumping `correctLatex` as a fake derivation
- using untranslated English text inside math blocks

## Conceptual Questions

Not every subtype needs numeric calculation.

For conceptual questions, valid steps can still exist:

- identify definition
- identify structural rule
- compare quantities or relationships
- conclude using the correct concept

Example:

- step 1: identify what the box in a box plot spans
- step 2: conclude it represents the IQR

This is acceptable if it is still a real explanation, not just the final answer duplicated.

## Translation Rules

When adding new step justifications:

- add them to module i18n keys
- do not hardcode English
- keep justification as normal localized text
- keep `expressionLatex` mathematical where possible

Avoid writing raw LaTeX operators inside justification text.

## Validation Checklist

After implementation:

1. Wrong answer once:
   - hint only
2. Wrong answer twice:
   - steps unlock if real steps exist
3. Wrong answer three times:
   - full solution unlocks
4. Full solution still requires confirmation when policy requires it
5. Unsupported subtypes:
   - no fake steps
   - platform fallback still works
6. Correct answers:
   - review remains available only per platform policy

## Mandatory Project Checks

After code changes, always run:

```bash
npm run validate:translations
bash scripts/audit-rendering.sh
npm run build
```

Then commit and push.

## Recommended Rollout Order

Use this order for new module upgrades:

1. one benchmark module
2. one structurally similar second module
3. one different-style module
4. only then batch by category

Recommended first wave:

- statistics
- algebra
- sequences/functions

Delay LLM-backed providers until deterministic numeric modules are stable.

## Do Not Do This

- do not mutate `Quest`
- do not pass `(quest, t)` directly as provider contract
- do not expose `correctLatex` as steps
- do not claim unsupported subtypes are covered
- do not skip platform validation checks
