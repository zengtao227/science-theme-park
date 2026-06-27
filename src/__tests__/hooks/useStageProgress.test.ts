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

    it("recordAttempt(correct:true) increments correct and zeroes errorCount", () => {
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
        localStorage.setItem("key_load", JSON.stringify({
            S1: { attempts: 5, correct: 3, incorrect: 2, lastUpdated: 0 },
        }));
        const { result } = renderHook(() => useStageProgress("key_load"));
        expect(result.current.getCurrentStageStats("S1").attempts).toBe(5);
    });
});
