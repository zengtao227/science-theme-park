import { renderHook, act } from "@testing-library/react";
import { useQuestManager } from "../../hooks/useQuestManager";
import { useAppStore } from "../../lib/store";

// Mock useAppStore
jest.mock("../../lib/store", () => ({
    useAppStore: jest.fn(),
}));

describe("useQuestManager", () => {
    const mockBuildPool = jest.fn((difficulty, stage) => [
        {
            id: "Q1",
            difficulty,
            stage,
            promptLatex: "What is 1+1?",
            expressionLatex: "1+1",
            targetLatex: "2",
            slots: [{ id: "ans", labelLatex: "x", placeholder: "", expected: 2 }],
            correctLatex: "2",
        }
    ]);

    beforeEach(() => {
        const mockState = {
            currentLanguage: "EN",
            history: [],
            completeStage: jest.fn(),
        };
        (useAppStore as any).mockImplementation((selector: any) =>
            typeof selector === "function" ? selector(mockState) : mockState
        );
        mockBuildPool.mockClear();
        localStorage.clear();
    });

    it("should initialize with CORE difficulty and the given initial stage", () => {
        const { result } = renderHook(() =>
            useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
        );

        expect(result.current.difficulty).toBe("CORE");
        expect(result.current.stage).toBe("STAGE1");
        expect(mockBuildPool).toHaveBeenCalledWith("CORE", "STAGE1");
    });

    it("should handle input changes", () => {
        const { result } = renderHook(() =>
            useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
        );

        act(() => {
            result.current.setInputs({ ans: "2" });
        });

        expect(result.current.inputs).toEqual({ ans: "2" });
    });

    it("should verify correct answers", () => {
        const { result } = renderHook(() =>
            useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
        );

        act(() => {
            result.current.setInputs({ ans: "2" });
        });

        act(() => {
            result.current.verify();
        });

        expect(result.current.lastCheck?.ok).toBe(true);
    });

    it("should verify incorrect answers", () => {
        const { result } = renderHook(() =>
            useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
        );

        act(() => {
            result.current.setInputs({ ans: "3" });
        });

        act(() => {
            result.current.verify();
        });

        expect(result.current.lastCheck?.ok).toBe(false);
    });

    it("should move to next quest and clear inputs", () => {
        const { result } = renderHook(() =>
            useQuestManager({ moduleCode: "test", buildPool: mockBuildPool, initialStage: "STAGE1" })
        );

        act(() => {
            result.current.setInputs({ ans: "2" });
            result.current.next();
        });

        expect(result.current.nonce).toBe(1);
        expect(result.current.inputs).toEqual({});
        expect(result.current.lastCheck).toBe(null);
    });

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
        expect(result.current.getHint()).toBe(null);

        act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
        expect(result.current.getHint()).toBe("hint1");

        act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
        expect(result.current.getHint()).toBe("hint2");

        act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
        expect(result.current.getHint()).toBe("hint3");

        act(() => { result.current.setInputs({ ans: "99" }); result.current.verify(); });
        expect(result.current.getHint()).toBe("hint3");
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
        expect(result.current.feedbackAvailability.canShowHint).toBe(false);
        expect(result.current.feedbackAvailability.canShowFull).toBe(false);

        // Separate acts: setInputs first, then verify (so verify sees updated inputs)
        act(() => { result.current.setInputs({ ans: "99" }); });
        act(() => { result.current.verify(); });
        expect(result.current.feedbackAvailability.canShowHint).toBe(true);
        expect(result.current.feedbackAvailability.canShowFull).toBe(false);

        // Correct answer: errors zeroed → getHint()=null → canShowHint=false; showAfterCorrect → canShowFull=true
        act(() => { result.current.setInputs({ ans: "2" }); });
        act(() => { result.current.verify(); });
        expect(result.current.feedbackAvailability.canShowHint).toBe(false);
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
        // Generate errorCounts and stageStats in STAGE1
        act(() => { result.current.setInputs({ ans: "99" }); });
        act(() => { result.current.verify(); });
        expect(result.current.getCurrentErrorCount()).toBe(1);
        expect(result.current.currentStageStats.attempts).toBe(1);

        // handleStageChange clears errorCounts; STAGE1 stageStats persist
        act(() => { result.current.handleStageChange("STAGE2"); });
        expect(result.current.getCurrentErrorCount()).toBe(0); // STAGE2:Q1 never had errors

        // Difficulty change while back on STAGE1: clears errorCounts AND deletes STAGE1 stageStats
        act(() => { result.current.handleStageChange("STAGE1"); });
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

        const { result: result2 } = renderHook(() =>
            useQuestManager({ moduleCode: "m1", buildPool: mockBuildPoolDouble, initialStage: "S1" })
        );
        expect(result2.current.nonce).toBe(1);
    });
});
