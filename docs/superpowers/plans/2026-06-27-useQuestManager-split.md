# useQuestManager Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the 502-line `useQuestManager` God Hook into focused sub-hooks and pure functions while maintaining 100% backward compatibility with 105 consuming pages.

**Architecture:** 4-phase risk-graduated split. Task 0 first locks behavior with characterization tests (the load-bearing gate). Task 1 extracts pure answer-matching functions (zero risk). Tasks 2–4 extract sub-hooks in descending self-containment order: `useAiFeedback` → `useStageProgress` → `useQuestNonce`. The orchestrator (`useQuestManager`) retains all cross-cutting coordination and its return contract is frozen.

**Tech Stack:** React 18, TypeScript strict, Jest + `@testing-library/react` (`renderHook` + `act`), `localStorage` mocked by Jest JSDOM

## Global Constraints

- 34 return fields of `useQuestManager`, their types, and their semantics are frozen — zero changes to consumers
- `chamberLayoutProps` useMemo with its 21 fields and exact deps array is preserved
- All type/constant exports (`Difficulty`, `FeedbackLevel`, `FeedbackContent`, `FeedbackPolicy`, `Slot`, `Quest`, `UseQuestManagerOptions`, `DEFAULT_FEEDBACK_POLICY`) continue to be importable from `@/hooks/useQuestManager`
- `npm run test` must stay green (28 suites, 399 tests) after **every** commit
- No browser rendering tests — only `renderHook` + `act`
- Each task is an independent commit; any task can be independently reverted via `git revert`
- Run `npm run test` before starting to confirm baseline: all 399 pass

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/__tests__/hooks/useQuestManager.test.ts` | Add 8 characterization tests (Task 0) |
| Create | `src/lib/quest/answerMatching.ts` | Pure functions: `parseNumberLike`, `normalizeAnswer` (Task 1) |
| Create | `src/lib/quest/__tests__/answerMatching.test.ts` | Unit tests for pure functions (Task 1) |
| Create | `src/hooks/useAiFeedback.ts` | AI feedback state sub-hook (Task 2) |
| Create | `src/__tests__/hooks/useAiFeedback.test.ts` | Tests for useAiFeedback (Task 2) |
| Create | `src/hooks/useStageProgress.ts` | Stage stats + error counts sub-hook (Task 3) |
| Create | `src/__tests__/hooks/useStageProgress.test.ts` | Tests for useStageProgress (Task 3) |
| Create | `src/hooks/useQuestNonce.ts` | Nonce + localStorage persistence sub-hook (Task 4) |
| Create | `src/__tests__/hooks/useQuestNonce.test.ts` | Tests for useQuestNonce (Task 4) |
| Modify | `src/hooks/useQuestManager.ts` | Use sub-hooks; remove extracted code (Tasks 1–4) |

---

### Task 0: Characterization Tests

**Lock down all hidden behavioral contracts before touching any code.**

**Files:**
- Modify: `src/__tests__/hooks/useQuestManager.test.ts`

**Interfaces:**
- Produces: 8 green tests that act as the regression gate for Tasks 1–4

- [ ] **Step 1: Add the 8 characterization tests to the existing describe block**

Open `src/__tests__/hooks/useQuestManager.test.ts`. After the existing 5 tests (inside the same `describe("useQuestManager", ...)` block), add:

```typescript
  // ── CHARACTERIZATION TESTS (lock hidden contracts before refactoring) ────

  const mockBuildPoolDouble = jest.fn(() => [
    {
      id: "Q1", difficulty: "CORE", stage: "STAGE1",
      promptLatex: "prompt1", expressionLatex: "expr1", targetLatex: "target1",
      slots: [{ id: "ans", labelLatex: "x", placeholder: "", expected: 2 }],
      correctLatex: "2",
    },
    {
      id: "Q2", difficulty: "CORE", stage: "STAGE1",
      promptLatex: "prompt2", expressionLatex: "expr2", targetLatex: "target2",
      slots: [{ id: "ans", labelLatex: "x", placeholder: "", expected: 3 }],
      correctLatex: "3",
    },
  ]);

  const mockBuildPoolWithHints = jest.fn(() => [
    {
      id: "Q1", difficulty: "CORE", stage: "STAGE1",
      promptLatex: "What is 1+1?", expressionLatex: "1+1", targetLatex: "2",
      slots: [{ id: "ans", labelLatex: "x", placeholder: "", expected: 2 }],
      correctLatex: "2",
      hintLatex: ["hint1", "hint2", "hint3"],
    },
  ]);

  beforeEach(() => {
    mockBuildPoolDouble.mockClear();
    mockBuildPoolWithHints.mockClear();
  });

  it("C1: verify error atomically increments stageStats and errorCounts", () => {
    const { result } = renderHook(() =>
      useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
    );
    act(() => { result.current.setInputs({ ans: "99" }); });
    act(() => { result.current.verify(); });

    expect(result.current.currentStageStats.attempts).toBe(1);
    expect(result.current.currentStageStats.incorrect).toBe(1);
    expect(result.current.currentStageStats.correct).toBe(0);
    expect(result.current.getCurrentErrorCount()).toBe(1);
    expect(result.current.lastCheck?.ok).toBe(false);
  });

  it("C2: empty slot counts as attempt and increments errorCount", () => {
    const { result } = renderHook(() =>
      useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
    );
    // inputs left empty — anyEmpty path
    act(() => { result.current.verify(); });

    expect(result.current.currentStageStats.attempts).toBe(1);
    expect(result.current.currentStageStats.incorrect).toBe(1);
    expect(result.current.getCurrentErrorCount()).toBe(1);
  });

  it("C3: correct verify zeroes errorCount, increments correct, leaves incorrect unchanged", () => {
    const { result } = renderHook(() =>
      useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
    );
    act(() => { result.current.setInputs({ ans: "99" }); });
    act(() => { result.current.verify(); });
    expect(result.current.getCurrentErrorCount()).toBe(1);

    act(() => { result.current.setInputs({ ans: "2" }); });
    act(() => { result.current.verify(); });

    expect(result.current.currentStageStats.correct).toBe(1);
    expect(result.current.currentStageStats.incorrect).toBe(1);
    expect(result.current.currentStageStats.attempts).toBe(2);
    expect(result.current.getCurrentErrorCount()).toBe(0);
    expect(result.current.lastCheck?.ok).toBe(true);
  });

  it("C4: getHint follows hintLatex index, clamped at last entry", () => {
    const { result } = renderHook(() =>
      useQuestManager({ moduleCode: "test", buildPool: mockBuildPoolWithHints, initialStage: "STAGE1" })
    );
    expect(result.current.getHint()).toBe(null); // 0 errors

    act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
    expect(result.current.getHint()).toBe("hint1"); // 1 error

    act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
    expect(result.current.getHint()).toBe("hint2"); // 2 errors

    act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
    expect(result.current.getHint()).toBe("hint3"); // 3 errors

    act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
    expect(result.current.getHint()).toBe("hint3"); // 4 errors — clamped at last
  });

  it("C5: feedbackAvailability gates on error thresholds and correct state", () => {
    const { result } = renderHook(() =>
      useQuestManager({
        moduleCode: "test",
        buildPool: mockBuildPoolWithHints,
        initialStage: "STAGE1",
        feedbackPolicy: { hintThreshold: 1, stepsThreshold: 2, fullThreshold: 3, showAfterCorrect: true, confirmFullSolution: false },
      })
    );
    // No attempts: nothing available
    expect(result.current.feedbackAvailability.canShowHint).toBe(false);
    expect(result.current.feedbackAvailability.canShowFull).toBe(false);

    // 1 wrong: hint available (errors=1 >= hintThreshold=1)
    act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
    expect(result.current.feedbackAvailability.canShowHint).toBe(true);
    expect(result.current.feedbackAvailability.canShowFull).toBe(false);

    // Correct: showAfterCorrect opens hint + full
    act(() => { result.current.setInputs({ ans: "2" }); result.current.verify(); });
    expect(result.current.feedbackAvailability.canShowHint).toBe(true);
    expect(result.current.feedbackAvailability.canShowFull).toBe(true);
  });

  it("C6: next() resets feedbackLevel and aiFeedback via clearInputs", () => {
    const { result } = renderHook(() =>
      useQuestManager({ moduleCode: "test", buildPool: mockBuildPoolDouble, initialStage: "STAGE1" })
    );
    act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
    act(() => { result.current.showHintLevel(); });
    expect(result.current.feedbackLevel).toBe("HINT");

    act(() => { result.current.next(); });
    expect(result.current.feedbackLevel).toBe("NONE");
    expect(result.current.aiFeedback).toBe(null);
    expect(result.current.isRequestingAi).toBe(false);
  });

  it("C7: handleStageChange clears errorCounts; handleDifficultyChange also resets stageStats", () => {
    const { result } = renderHook(() =>
      useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
    );
    act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
    expect(result.current.getCurrentErrorCount()).toBe(1);
    expect(result.current.currentStageStats.attempts).toBe(1);

    act(() => { result.current.handleStageChange("STAGE2"); });
    // After stage change, errorCounts cleared, currentStageStats for new stage is empty
    expect(result.current.getCurrentErrorCount()).toBe(0);

    // Difficulty change: go back and verify again, then change difficulty
    act(() => { result.current.handleStageChange("STAGE1"); });
    act(() => { result.current.setInputs({ ans: "2" }); result.current.verify(); });
    expect(result.current.currentStageStats.attempts).toBe(1);

    act(() => { result.current.handleDifficultyChange("ADVANCED"); });
    expect(result.current.currentStageStats.attempts).toBe(0); // STAGE1 stats deleted
    expect(result.current.getCurrentErrorCount()).toBe(0);
  });

  it("C8: nonce writes to localStorage on next(); reads back on remount", () => {
    const { result } = renderHook(() =>
      useQuestManager({ moduleCode: "m1", buildPool: mockBuildPoolDouble, initialStage: "S1" })
    );
    act(() => { result.current.next(); });

    const key = "quest_manager_nonce_m1_S1_CORE";
    expect(localStorage.getItem(key)).toBe("1");

    // Remount reads saved nonce
    const { result: result2 } = renderHook(() =>
      useQuestManager({ moduleCode: "m1", buildPool: mockBuildPoolDouble, initialStage: "S1" })
    );
    expect(result2.current.nonce).toBe(1);
  });
```

- [ ] **Step 2: Run the new tests to confirm they all pass**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test -- --testPathPattern="useQuestManager" --verbose 2>&1 | tail -30
```

Expected: 13 passed (5 existing + 8 new). Any failure means the test is wrong — fix the test assertion to match the current behavior before continuing.

- [ ] **Step 3: Commit**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
git add src/__tests__/hooks/useQuestManager.test.ts
git commit -m "test: characterization tests for useQuestManager seams (Task 0)"
```

---

### Task 1: Extract Pure Answer-Matching Functions

**Extract `parseNumberLike` and `normalize` (the inline verify helper) to a pure, independently-testable module.**

**Files:**
- Create: `src/lib/quest/answerMatching.ts`
- Create: `src/lib/quest/__tests__/answerMatching.test.ts`
- Modify: `src/hooks/useQuestManager.ts`

**Interfaces:**
- Produces:
  - `parseNumberLike(s: string, locale: Locale): number | null`
  - `normalizeAnswer(s: string, locale: Locale): string`
  - `type Locale = "EN" | "DE" | "CN"`

- [ ] **Step 1: Create `src/lib/quest/answerMatching.ts`**

```typescript
import { canonicalizeFreeText } from "@/lib/i18n/freeTextLocale";

export type Locale = "EN" | "DE" | "CN";

export function parseNumberLike(s: string, locale: Locale): number | null {
    const raw = s.trim();
    if (!raw) return null;

    const normalized = (locale === "DE" ? raw.replace(/,/g, ".") : raw).replace(/\s+/g, "");

    if (normalized.includes("/")) {
        const parts = normalized.split("/");
        if (parts.length !== 2) return null;
        const [numStr, denStr] = parts;
        const num = Number(numStr);
        const den = Number(denStr);
        if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
            return num / den;
        }
        return null;
    }

    const v = Number(normalized);
    return Number.isFinite(v) ? v : null;
}

export function normalizeAnswer(s: string, locale: Locale): string {
    const canonical = canonicalizeFreeText(s, locale);
    return canonical.trim()
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/²/g, "^2")
        .replace(/³/g, "^3")
        .replace(/\^1(?![0-9])/g, "")
        .replace(/^1([a-z^])/, "$1")
        .replace(/([^0-9.])1([a-z^])/g, "$1$2");
}
```

- [ ] **Step 2: Create `src/lib/quest/__tests__/answerMatching.test.ts`**

```typescript
import { parseNumberLike, normalizeAnswer } from "../answerMatching";

describe("parseNumberLike", () => {
    it("returns null for empty string", () => {
        expect(parseNumberLike("", "EN")).toBe(null);
        expect(parseNumberLike("  ", "EN")).toBe(null);
    });

    it("parses plain integers", () => {
        expect(parseNumberLike("42", "EN")).toBe(42);
        expect(parseNumberLike("-3", "EN")).toBe(-3);
    });

    it("parses decimals (EN dot)", () => {
        expect(parseNumberLike("3.14", "EN")).toBe(3.14);
    });

    it("parses decimals with DE comma", () => {
        expect(parseNumberLike("3,14", "DE")).toBeCloseTo(3.14);
    });

    it("parses fractions", () => {
        expect(parseNumberLike("1/2", "EN")).toBe(0.5);
        expect(parseNumberLike("3/4", "EN")).toBe(0.75);
    });

    it("returns null for division by zero", () => {
        expect(parseNumberLike("5/0", "EN")).toBe(null);
    });

    it("returns null for malformed fraction", () => {
        expect(parseNumberLike("1/2/3", "EN")).toBe(null);
    });

    it("returns null for non-numeric strings", () => {
        expect(parseNumberLike("abc", "EN")).toBe(null);
    });

    it("handles spaces in number", () => {
        expect(parseNumberLike("1 000", "EN")).toBe(1000);
    });
});

describe("normalizeAnswer", () => {
    it("lowercases and trims", () => {
        expect(normalizeAnswer("  ABC  ", "EN")).toBe("abc");
    });

    it("removes whitespace", () => {
        expect(normalizeAnswer("a b", "EN")).toBe("ab");
    });

    it("converts unicode superscripts", () => {
        expect(normalizeAnswer("x²", "EN")).toContain("^2");
        expect(normalizeAnswer("x³", "EN")).toContain("^3");
    });

    it("removes trailing ^1", () => {
        expect(normalizeAnswer("x^1", "EN")).toBe("x");
    });

    it("removes leading coefficient 1 before letter", () => {
        expect(normalizeAnswer("1x", "EN")).toBe("x");
    });
});
```

- [ ] **Step 3: Run pure function tests to confirm they pass**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test -- --testPathPattern="answerMatching" --verbose 2>&1 | tail -20
```

Expected: all answerMatching tests PASS.

- [ ] **Step 4: Update `src/hooks/useQuestManager.ts` to use the pure functions**

Add the import at the top of the file (after existing imports):

```typescript
import { parseNumberLike as parseNumberLikePure, normalizeAnswer, type Locale } from "@/lib/quest/answerMatching";
```

Replace the `parseNumberLike` useCallback (lines 222–242) with a locale-bound wrapper:

```typescript
    const parseNumberLike = useCallback(
        (s: string) => parseNumberLikePure(s, locale as Locale),
        [locale]
    );
```

Inside `verify`, find the `normalize` inner function definition (lines 267–277) and **delete it**. Then replace both usages of `normalize(raw)`:
- `normalize(raw) !== normalize(slot.expected.toString())` →
  `normalizeAnswer(raw, locale as Locale) !== normalizeAnswer(slot.expected.toString(), locale as Locale)`

And replace `parseNumberLike(raw)` inside verify with `parseNumberLikePure(raw, locale as Locale)` (the pure function, since `parseNumberLike` wrapper now wraps the pure fn):

```typescript
        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";

            if (typeof slot.expected === "number") {
                const v = parseNumberLikePure(raw, locale as Locale);
                if (v === null || Math.abs(v - slot.expected) > tolerance) {
                    recordIncorrect();
                    return;
                }
            } else if (normalizeAnswer(raw, locale as Locale) !== normalizeAnswer(slot.expected.toString(), locale as Locale)) {
                recordIncorrect();
                return;
            }
        }
```

- [ ] **Step 5: Run all tests to confirm nothing broke**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test 2>&1 | tail -10
```

Expected: 28 suites, 407 tests (399 + 8 new answerMatching tests), all PASS.

- [ ] **Step 6: Commit**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
git add src/lib/quest/answerMatching.ts src/lib/quest/__tests__/answerMatching.test.ts src/hooks/useQuestManager.ts
git commit -m "refactor: Phase 1 — extract parseNumberLike/normalizeAnswer to lib/quest/answerMatching"
```

---

### Task 2: Extract `useAiFeedback`

**Extract the three AI-feedback state values and their request logic into a self-contained sub-hook. Update `clearInputs` in the orchestrator to call `reset()` instead of two inline setters.**

**Files:**
- Create: `src/hooks/useAiFeedback.ts`
- Create: `src/__tests__/hooks/useAiFeedback.test.ts`
- Modify: `src/hooks/useQuestManager.ts`

**Interfaces:**
- Consumes: `currentQuest: Quest | null`, `inputs: Record<string, string>`, `currentLanguage: string`
- Produces: `{ aiFeedback: string | null, isRequestingAi: boolean, requestAiFeedback: () => Promise<void>, reset: () => void }`

- [ ] **Step 1: Create `src/hooks/useAiFeedback.ts`**

```typescript
import { useState, useCallback } from "react";
import { requestPersonalizedFeedback } from "@/lib/ai/feedbackEngine";
import type { Quest } from "./useQuestManager";

export interface UseAiFeedbackResult {
    aiFeedback: string | null;
    isRequestingAi: boolean;
    requestAiFeedback: () => Promise<void>;
    reset: () => void;
}

export function useAiFeedback(
    currentQuest: Quest | null,
    inputs: Record<string, string>,
    currentLanguage: string
): UseAiFeedbackResult {
    const [aiFeedback, setAiFeedback] = useState<string | null>(null);
    const [isRequestingAi, setIsRequestingAi] = useState(false);

    const reset = useCallback(() => {
        setAiFeedback(null);
        setIsRequestingAi(false);
    }, []);

    const requestAiFeedback = useCallback(async () => {
        if (!currentQuest || isRequestingAi) return;
        setIsRequestingAi(true);
        setAiFeedback(null);
        try {
            const feedback = await requestPersonalizedFeedback({
                quest: currentQuest as Quest,
                inputs,
                language: currentLanguage,
            });
            setAiFeedback(feedback);
        } catch (error: any) {
            setAiFeedback(`AI Diagnosis Error: ${error.message || "Unknown error"}`);
        } finally {
            setIsRequestingAi(false);
        }
    }, [currentQuest, inputs, isRequestingAi, currentLanguage]);

    return { aiFeedback, isRequestingAi, requestAiFeedback, reset };
}
```

- [ ] **Step 2: Create `src/__tests__/hooks/useAiFeedback.test.ts`**

```typescript
import { renderHook, act } from "@testing-library/react";
import { useAiFeedback } from "../../hooks/useAiFeedback";

jest.mock("../../lib/ai/feedbackEngine", () => ({
    requestPersonalizedFeedback: jest.fn(),
}));

import { requestPersonalizedFeedback } from "../../lib/ai/feedbackEngine";
const mockRequest = requestPersonalizedFeedback as jest.MockedFunction<typeof requestPersonalizedFeedback>;

const mockQuest = {
    id: "Q1", difficulty: "CORE" as const, stage: "S1",
    promptLatex: "", expressionLatex: "", targetLatex: "",
    slots: [], correctLatex: "",
};

beforeEach(() => { mockRequest.mockReset(); });

describe("useAiFeedback", () => {
    it("initialises with null feedback and not requesting", () => {
        const { result } = renderHook(() =>
            useAiFeedback(mockQuest, {}, "EN")
        );
        expect(result.current.aiFeedback).toBe(null);
        expect(result.current.isRequestingAi).toBe(false);
    });

    it("sets isRequestingAi during request and stores result", async () => {
        mockRequest.mockResolvedValueOnce("Great job!");
        const { result } = renderHook(() =>
            useAiFeedback(mockQuest, { ans: "2" }, "EN")
        );

        await act(async () => { await result.current.requestAiFeedback(); });

        expect(result.current.aiFeedback).toBe("Great job!");
        expect(result.current.isRequestingAi).toBe(false);
    });

    it("stores error message on failure", async () => {
        mockRequest.mockRejectedValueOnce(new Error("network timeout"));
        const { result } = renderHook(() =>
            useAiFeedback(mockQuest, {}, "EN")
        );

        await act(async () => { await result.current.requestAiFeedback(); });

        expect(result.current.aiFeedback).toMatch("AI Diagnosis Error");
        expect(result.current.isRequestingAi).toBe(false);
    });

    it("reset() clears aiFeedback and isRequestingAi", async () => {
        mockRequest.mockResolvedValueOnce("Some feedback");
        const { result } = renderHook(() =>
            useAiFeedback(mockQuest, {}, "EN")
        );
        await act(async () => { await result.current.requestAiFeedback(); });
        expect(result.current.aiFeedback).toBe("Some feedback");

        act(() => { result.current.reset(); });
        expect(result.current.aiFeedback).toBe(null);
        expect(result.current.isRequestingAi).toBe(false);
    });

    it("does nothing if currentQuest is null", async () => {
        const { result } = renderHook(() =>
            useAiFeedback(null, {}, "EN")
        );
        await act(async () => { await result.current.requestAiFeedback(); });
        expect(mockRequest).not.toHaveBeenCalled();
    });
});
```

- [ ] **Step 3: Run the new hook tests**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test -- --testPathPattern="useAiFeedback" --verbose 2>&1 | tail -20
```

Expected: 5 tests PASS.

- [ ] **Step 4: Update `src/hooks/useQuestManager.ts` to use `useAiFeedback`**

Add import near top:
```typescript
import { useAiFeedback } from "./useAiFeedback";
```

Remove these three blocks from the hook body:
```typescript
// DELETE these lines:
const [aiFeedback, setAiFeedback] = useState<string | null>(null);
const [isRequestingAi, setIsRequestingAi] = useState(false);

const requestAiFeedback = useCallback(async () => {
    if (!currentQuest || isRequestingAi) return;
    setIsRequestingAi(true);
    setAiFeedback(null);
    try {
        const feedback = await requestPersonalizedFeedback({
            quest: currentQuest as Quest,
            inputs,
            language: currentLanguage
        });
        setAiFeedback(feedback);
    } catch (error: any) {
        setAiFeedback(`AI Diagnosis Error: ${error.message || 'Unknown error'}`);
    } finally {
        setIsRequestingAi(false);
    }
}, [currentQuest, inputs, isRequestingAi, currentLanguage]);
```

Add in their place (after the `locale` line, before `rawPool`):
```typescript
    const { aiFeedback, isRequestingAi, requestAiFeedback, reset: resetAiFeedback } = useAiFeedback(
        currentQuest,
        inputs,
        currentLanguage
    );
```

In `clearInputs`, replace:
```typescript
// OLD:
        setAiFeedback(null);
        setIsRequestingAi(false);
// NEW:
        resetAiFeedback();
```

Remove the `import { requestPersonalizedFeedback }` line (it's now only used inside useAiFeedback.ts).

**Important:** `currentQuest` is defined after `rawPool`/`pool` in the original code, but `useAiFeedback` needs it. Move the `useAiFeedback` call to **after** the `currentQuest` useMemo. Find:
```typescript
    const currentQuest = useMemo(() => { ... }, [nonce, pool]);
```
and place the `useAiFeedback` call immediately after it.

- [ ] **Step 5: Run all tests**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test 2>&1 | tail -10
```

Expected: 29 suites, 412 tests, all PASS.

- [ ] **Step 6: Commit**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
git add src/hooks/useAiFeedback.ts src/__tests__/hooks/useAiFeedback.test.ts src/hooks/useQuestManager.ts
git commit -m "refactor: Phase 2 — extract useAiFeedback sub-hook"
```

---

### Task 3: Extract `useStageProgress`

**Extract `stageStats`, `errorCounts`, and their localStorage persistence into a sub-hook. The orchestrator's `verify` calls `recordAttempt()` as a single atomic operation.**

**Files:**
- Create: `src/hooks/useStageProgress.ts`
- Create: `src/__tests__/hooks/useStageProgress.test.ts`
- Modify: `src/hooks/useQuestManager.ts`

**Interfaces:**
- Consumes: `storageKey: string`
- Produces:
  ```typescript
  {
    stageStats: Record<string, StageStats>,
    errorCounts: Record<string, number>,
    recordAttempt: (p: { stageKey: string; questKey: string; correct: boolean }) => void,
    resetStageStats: (stageKey: string) => void,
    clearErrorCounts: () => void,
    getCurrentStageStats: (stage: string) => StageStats,
    getSuccessRate: (stage: string) => number,
    getErrorCount: (stage: string, questId: string) => number,
  }
  ```

- [ ] **Step 1: Create `src/hooks/useStageProgress.ts`**

```typescript
import { useState, useCallback, useEffect } from "react";

export type StageStats = {
    attempts: number;
    correct: number;
    incorrect: number;
    lastUpdated: number;
};

const EMPTY_STAGE_STATS: StageStats = { attempts: 0, correct: 0, incorrect: 0, lastUpdated: 0 };

interface RecordAttemptParams {
    stageKey: string;
    questKey: string;
    correct: boolean;
}

export interface UseStageProgressResult {
    stageStats: Record<string, StageStats>;
    errorCounts: Record<string, number>;
    recordAttempt: (params: RecordAttemptParams) => void;
    resetStageStats: (stageKey: string) => void;
    clearErrorCounts: () => void;
    getCurrentStageStats: (stage: string) => StageStats;
    getSuccessRate: (stage: string) => number;
    getErrorCount: (stage: string, questId: string) => number;
}

export function useStageProgress(storageKey: string): UseStageProgressResult {
    const [stageStats, setStageStats] = useState<Record<string, StageStats>>(() => {
        if (typeof window === "undefined") return {};
        try {
            const raw = window.localStorage.getItem(storageKey);
            return raw ? (JSON.parse(raw) as Record<string, StageStats>) : {};
        } catch {
            return {};
        }
    });

    const [errorCounts, setErrorCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(storageKey, JSON.stringify(stageStats));
    }, [storageKey, stageStats]);

    const recordAttempt = useCallback(({ stageKey, questKey, correct }: RecordAttemptParams) => {
        setStageStats((prev) => {
            const existing = prev[stageKey] ?? EMPTY_STAGE_STATS;
            return {
                ...prev,
                [stageKey]: {
                    attempts: existing.attempts + 1,
                    correct: correct ? existing.correct + 1 : existing.correct,
                    incorrect: correct ? existing.incorrect : existing.incorrect + 1,
                    lastUpdated: Date.now(),
                },
            };
        });
        setErrorCounts((prev) => ({
            ...prev,
            [questKey]: correct ? 0 : (prev[questKey] ?? 0) + 1,
        }));
    }, []);

    const resetStageStats = useCallback((stageKey: string) => {
        setStageStats((prev) => {
            const next = { ...prev };
            delete next[stageKey];
            return next;
        });
    }, []);

    const clearErrorCounts = useCallback(() => {
        setErrorCounts({});
    }, []);

    const getCurrentStageStats = useCallback((stage: string): StageStats => {
        return stageStats[stage] ?? EMPTY_STAGE_STATS;
    }, [stageStats]);

    const getSuccessRate = useCallback((stage: string): number => {
        const stats = stageStats[stage] ?? EMPTY_STAGE_STATS;
        if (!stats.attempts) return 0;
        return stats.correct / stats.attempts;
    }, [stageStats]);

    const getErrorCount = useCallback((stage: string, questId: string): number => {
        return errorCounts[`${stage}:${questId}`] ?? 0;
    }, [errorCounts]);

    return {
        stageStats,
        errorCounts,
        recordAttempt,
        resetStageStats,
        clearErrorCounts,
        getCurrentStageStats,
        getSuccessRate,
        getErrorCount,
    };
}
```

- [ ] **Step 2: Create `src/__tests__/hooks/useStageProgress.test.ts`**

```typescript
import { renderHook, act } from "@testing-library/react";
import { useStageProgress } from "../../hooks/useStageProgress";

beforeEach(() => { localStorage.clear(); });

describe("useStageProgress", () => {
    it("initialises with empty stats", () => {
        const { result } = renderHook(() => useStageProgress("key1"));
        expect(result.current.getCurrentStageStats("S1").attempts).toBe(0);
        expect(result.current.getErrorCount("S1", "Q1")).toBe(0);
    });

    it("recordAttempt(correct:false) increments attempts, incorrect, and errorCount", () => {
        const { result } = renderHook(() => useStageProgress("key1"));
        act(() => {
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q1", correct: false });
        });
        const stats = result.current.getCurrentStageStats("S1");
        expect(stats.attempts).toBe(1);
        expect(stats.incorrect).toBe(1);
        expect(stats.correct).toBe(0);
        expect(result.current.getErrorCount("S1", "Q1")).toBe(1);
    });

    it("recordAttempt(correct:true) increments attempts, correct, and zeroes errorCount", () => {
        const { result } = renderHook(() => useStageProgress("key1"));
        act(() => {
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q1", correct: false });
        });
        act(() => {
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q1", correct: true });
        });
        const stats = result.current.getCurrentStageStats("S1");
        expect(stats.attempts).toBe(2);
        expect(stats.correct).toBe(1);
        expect(stats.incorrect).toBe(1);
        expect(result.current.getErrorCount("S1", "Q1")).toBe(0);
    });

    it("getSuccessRate returns correct/attempts", () => {
        const { result } = renderHook(() => useStageProgress("key1"));
        act(() => {
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q1", correct: true });
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q1", correct: false });
        });
        expect(result.current.getSuccessRate("S1")).toBe(0.5);
    });

    it("resetStageStats deletes the stage entry", () => {
        const { result } = renderHook(() => useStageProgress("key1"));
        act(() => {
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q1", correct: false });
        });
        expect(result.current.getCurrentStageStats("S1").attempts).toBe(1);

        act(() => { result.current.resetStageStats("S1"); });
        expect(result.current.getCurrentStageStats("S1").attempts).toBe(0);
    });

    it("clearErrorCounts zeroes all error counts", () => {
        const { result } = renderHook(() => useStageProgress("key1"));
        act(() => {
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q1", correct: false });
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q2", correct: false });
        });
        expect(result.current.getErrorCount("S1", "Q1")).toBe(1);

        act(() => { result.current.clearErrorCounts(); });
        expect(result.current.getErrorCount("S1", "Q1")).toBe(0);
        expect(result.current.getErrorCount("S1", "Q2")).toBe(0);
    });

    it("persists stageStats to localStorage", () => {
        const { result } = renderHook(() => useStageProgress("key_persist"));
        act(() => {
            result.current.recordAttempt({ stageKey: "S1", questKey: "S1:Q1", correct: true });
        });
        const stored = JSON.parse(localStorage.getItem("key_persist") ?? "{}");
        expect(stored["S1"].correct).toBe(1);
    });

    it("loads stageStats from localStorage on mount", () => {
        localStorage.setItem("key_load", JSON.stringify({ S1: { attempts: 5, correct: 3, incorrect: 2, lastUpdated: 0 } }));
        const { result } = renderHook(() => useStageProgress("key_load"));
        expect(result.current.getCurrentStageStats("S1").attempts).toBe(5);
    });
});
```

- [ ] **Step 3: Run the new hook tests**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test -- --testPathPattern="useStageProgress" --verbose 2>&1 | tail -20
```

Expected: 7 tests PASS.

- [ ] **Step 4: Update `src/hooks/useQuestManager.ts` to use `useStageProgress`**

Add import:
```typescript
import { useStageProgress } from "./useStageProgress";
```

Remove from the hook body:
- The `StageStats` type definition and `EMPTY_STAGE_STATS` constant
- `const [stageStats, setStageStats] = useState<...>` initializer
- `const [errorCounts, setErrorCounts] = useState<...>`
- The stageStats localStorage `useEffect`
- `const currentStageStats = useMemo(...)`
- `const successRate = useMemo(...)`
- `const getCurrentErrorCount = useCallback(...)`
- Inside `getHint`: the `const questKey = ...` and `const errors = errorCounts[questKey] ?? 0` lines
- Inside verify: the `recordIncorrect` inner function; the stageStats/errorCounts updates in the correct path

Add after `const storageKey = ...`:
```typescript
    const {
        stageStats,
        errorCounts,
        recordAttempt,
        resetStageStats,
        clearErrorCounts,
        getCurrentStageStats,
        getSuccessRate,
        getErrorCount,
    } = useStageProgress(storageKey);
```

Add derived values (replacing the removed useMemo/useCallback):
```typescript
    const currentStageStats = getCurrentStageStats(stage);
    const successRate = getSuccessRate(stage);

    const getCurrentErrorCount = useCallback(() => {
        if (!currentQuest) return 0;
        return getErrorCount(stage, currentQuest.id);
    }, [currentQuest, getErrorCount, stage]);
```

Update `getHint` to use `getErrorCount` instead of `errorCounts`:
```typescript
    const getHint = useCallback(() => {
        if (!currentQuest) return null;
        const errors = getErrorCount(stage, currentQuest.id);
        if (errors <= 0) return null;

        if (currentQuest.hintLatex && currentQuest.hintLatex.length > 0) {
            const idx = Math.min(errors - 1, currentQuest.hintLatex.length - 1);
            return currentQuest.hintLatex[idx];
        }

        if (errors === 1) return currentQuest.targetLatex;
        if (errors === 2) return currentQuest.expressionLatex;
        return currentQuest.promptLatex || currentQuest.expressionLatex;
    }, [currentQuest, getErrorCount, stage]);
```

Replace the `recordIncorrect` inner function and stageStats/errorCounts updates inside `verify`. The full new `verify` body:
```typescript
    const verify = useCallback(() => {
        if (!currentQuest) return;

        const sKey = `${stage}`;
        const questKey = `${stage}:${currentQuest.id}`;

        const anyEmpty = currentQuest.slots.some((slot) => !(inputs[slot.id] ?? "").trim());
        if (anyEmpty) {
            recordAttempt({ stageKey: sKey, questKey, correct: false });
            setLastCheck({ ok: false, correct: "" });
            return;
        }

        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";

            if (typeof slot.expected === "number") {
                const v = parseNumberLikePure(raw, locale as Locale);
                if (v === null || Math.abs(v - slot.expected) > tolerance) {
                    recordAttempt({ stageKey: sKey, questKey, correct: false });
                    setLastCheck({ ok: false, correct: "" });
                    return;
                }
            } else if (normalizeAnswer(raw, locale as Locale) !== normalizeAnswer(slot.expected.toString(), locale as Locale)) {
                recordAttempt({ stageKey: sKey, questKey, correct: false });
                setLastCheck({ ok: false, correct: "" });
                return;
            }
        }

        recordAttempt({ stageKey: sKey, questKey, correct: true });
        setLastCheck({ ok: true, correct: currentQuest.correctLatex });
        completeStage(moduleCode, stage);
    }, [currentQuest, inputs, parseNumberLikePure, normalizeAnswer, stage, tolerance, locale, completeStage, moduleCode, recordAttempt]);
```

> **Note:** `parseNumberLikePure` and `normalizeAnswer` are stable references (module-level functions), not reactive. They can safely be in the deps array but also can be omitted — adding them is defensive. Keep them to satisfy exhaustive-deps lint.

Update `handleDifficultyChange` to use sub-hook primitives:
```typescript
    const handleDifficultyChange = useCallback((d: Difficulty) => {
        userHasSetDifficultyRef.current = true;
        setDifficulty(d);
        clearInputs();
        clearErrorCounts();
        resetStageStats(`${stage}`);
    }, [clearInputs, clearErrorCounts, resetStageStats, stage]);
```

Update `handleStageChange`:
```typescript
    const handleStageChange = useCallback((s: S) => {
        setStage(s);
        clearInputs();
        clearErrorCounts();
    }, [clearInputs, clearErrorCounts]);
```

- [ ] **Step 5: Run all tests**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test 2>&1 | tail -10
```

Expected: 30 suites, 419 tests, all PASS.

- [ ] **Step 6: Commit**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
git add src/hooks/useStageProgress.ts src/__tests__/hooks/useStageProgress.test.ts src/hooks/useQuestManager.ts
git commit -m "refactor: Phase 3 — extract useStageProgress sub-hook"
```

---

### Task 4: Extract `useQuestNonce` (Highest Risk — Do Last)

**Extract nonce state and its three localStorage effects. The effect pairing (read-on-change / write-on-change) must be preserved byte-for-byte to maintain the cross-stage pointer timing contract.**

**Files:**
- Create: `src/hooks/useQuestNonce.ts`
- Create: `src/__tests__/hooks/useQuestNonce.test.ts`
- Modify: `src/hooks/useQuestManager.ts`

**Interfaces:**
- Consumes: `moduleCode: string`, `stage: string`, `difficulty: string`
- Produces: `{ nonce: number, setNonce: React.Dispatch<React.SetStateAction<number>> }`

- [ ] **Step 1: Create `src/hooks/useQuestNonce.ts`**

```typescript
import { useState, useEffect } from "react";

export interface UseQuestNonceResult {
    nonce: number;
    setNonce: React.Dispatch<React.SetStateAction<number>>;
}

export function useQuestNonce(
    moduleCode: string,
    stage: string,
    difficulty: string
): UseQuestNonceResult {
    // Lazy init: reads from localStorage using the initial stage/difficulty
    // (stage and difficulty equal initialStage/initialDifficulty on first render)
    const [nonce, setNonce] = useState(() => {
        if (typeof window === "undefined") return 0;
        try {
            const key = `quest_manager_nonce_${moduleCode}_${stage}_${difficulty}`;
            const saved = window.localStorage.getItem(key);
            return saved ? parseInt(saved, 10) : 0;
        } catch {
            return 0;
        }
    });

    // Read from localStorage when stage or difficulty changes — MUST run before write effect
    useEffect(() => {
        if (typeof window === "undefined") return;
        const key = `quest_manager_nonce_${moduleCode}_${stage}_${difficulty}`;
        const saved = window.localStorage.getItem(key);
        setNonce(saved ? parseInt(saved, 10) : 0);
    }, [moduleCode, stage, difficulty]);

    // Write to localStorage whenever nonce changes
    useEffect(() => {
        if (typeof window === "undefined") return;
        const key = `quest_manager_nonce_${moduleCode}_${stage}_${difficulty}`;
        window.localStorage.setItem(key, nonce.toString());
    }, [moduleCode, nonce, stage, difficulty]);

    return { nonce, setNonce };
}
```

- [ ] **Step 2: Create `src/__tests__/hooks/useQuestNonce.test.ts`**

```typescript
import { renderHook, act } from "@testing-library/react";
import { useQuestNonce } from "../../hooks/useQuestNonce";

beforeEach(() => { localStorage.clear(); });

describe("useQuestNonce", () => {
    it("initialises to 0 when localStorage is empty", () => {
        const { result } = renderHook(() => useQuestNonce("mod1", "S1", "CORE"));
        expect(result.current.nonce).toBe(0);
    });

    it("reads saved nonce from localStorage on mount", () => {
        localStorage.setItem("quest_manager_nonce_mod1_S1_CORE", "3");
        const { result } = renderHook(() => useQuestNonce("mod1", "S1", "CORE"));
        expect(result.current.nonce).toBe(3);
    });

    it("writes nonce to localStorage when setNonce is called", () => {
        const { result } = renderHook(() => useQuestNonce("mod1", "S1", "CORE"));
        act(() => { result.current.setNonce(2); });
        expect(localStorage.getItem("quest_manager_nonce_mod1_S1_CORE")).toBe("2");
    });

    it("resets nonce to 0 when stage changes and no saved value", () => {
        const { result, rerender } = renderHook(
            ({ stage }: { stage: string }) => useQuestNonce("mod1", stage, "CORE"),
            { initialProps: { stage: "S1" } }
        );
        act(() => { result.current.setNonce(5); });
        expect(result.current.nonce).toBe(5);

        rerender({ stage: "S2" });
        expect(result.current.nonce).toBe(0);
    });

    it("restores saved nonce when switching to a stage that has one", () => {
        localStorage.setItem("quest_manager_nonce_mod1_S2_CORE", "7");
        const { result, rerender } = renderHook(
            ({ stage }: { stage: string }) => useQuestNonce("mod1", stage, "CORE"),
            { initialProps: { stage: "S1" } }
        );
        rerender({ stage: "S2" });
        expect(result.current.nonce).toBe(7);
    });

    it("uses separate keys for different difficulty values", () => {
        localStorage.setItem("quest_manager_nonce_mod1_S1_ADVANCED", "4");
        const { result } = renderHook(() => useQuestNonce("mod1", "S1", "ADVANCED"));
        expect(result.current.nonce).toBe(4);
    });
});
```

- [ ] **Step 3: Run the new hook tests**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test -- --testPathPattern="useQuestNonce" --verbose 2>&1 | tail -20
```

Expected: 6 tests PASS.

- [ ] **Step 4: Update `src/hooks/useQuestManager.ts` to use `useQuestNonce`**

Add import:
```typescript
import { useQuestNonce } from "./useQuestNonce";
```

Remove from the hook body:
- The nonce `useState` with lazy initializer (lines ~100–109)
- The nonce read `useEffect` (lines ~142–147)
- The nonce write `useEffect` (lines ~149–153)

Add after `const storageKey = ...` (before `const { stageStats, ... } = useStageProgress`):
```typescript
    const { nonce, setNonce } = useQuestNonce(moduleCode, stage as string, difficulty);
```

Everything else that uses `nonce` or `setNonce` (the `previous`/`next` callbacks, `currentQuest` useMemo, `canPrevious`/`canNext`/`progress`, `chamberLayoutProps`) stays identical — they already reference `nonce` and `setNonce` by name.

- [ ] **Step 5: Run ALL tests — this is the final regression gate**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
npm run test 2>&1 | tail -15
```

Expected: 31 suites, 425 tests (or close — exact count depends on deduplication), all PASS. If C8 (localStorage nonce round-trip characterization test) fails, the effect pairing has a timing issue — revert this task and investigate before proceeding.

- [ ] **Step 6: Commit**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
git add src/hooks/useQuestNonce.ts src/__tests__/hooks/useQuestNonce.test.ts src/hooks/useQuestManager.ts
git commit -m "refactor: Phase 4 — extract useQuestNonce sub-hook"
```

- [ ] **Step 7: Push to GitHub**

```bash
cd "/Users/zengtao/Doc/My code/science-theme-park"
git push
```

---

## Summary of Commits

| Commit | Content |
|--------|---------|
| Task 0 | characterization tests (8 new tests) |
| Task 1 | answerMatching.ts pure functions + unit tests; orchestrator updated |
| Task 2 | useAiFeedback.ts + tests; orchestrator updated |
| Task 3 | useStageProgress.ts + tests; orchestrator updated |
| Task 4 | useQuestNonce.ts + tests; orchestrator updated; push |

## Rollback

Each task is a single commit. If any task fails tests or causes unexpected behavior:
```bash
git revert HEAD
npm run test  # confirm back to green
```

Prior phases are independent — reverting Task 4 does not affect Tasks 1–3.
