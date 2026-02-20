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
            slots: [{ id: "ans", labelLatex: "x", placeholder: "?", expected: 2 }],
            correctLatex: "2",
        }
    ]);

    beforeEach(() => {
        (useAppStore as any).mockReturnValue({
            currentLanguage: "EN",
        });
        mockBuildPool.mockClear();
        localStorage.clear();
    });

    it("should initialize with CORE difficulty and the given initial stage", () => {
        const { result } = renderHook(() =>
            useQuestManager({ buildPool: mockBuildPool, initialStage: "STAGE1" })
        );

        expect(result.current.difficulty).toBe("CORE");
        expect(result.current.stage).toBe("STAGE1");
        expect(mockBuildPool).toHaveBeenCalledWith("CORE", "STAGE1");
    });

    it("should handle input changes", () => {
        const { result } = renderHook(() =>
            useQuestManager({ buildPool: mockBuildPool, initialStage: "STAGE1" })
        );

        act(() => {
            result.current.setInputs({ ans: "2" });
        });

        expect(result.current.inputs).toEqual({ ans: "2" });
    });

    it("should verify correct answers", () => {
        const { result } = renderHook(() =>
            useQuestManager({ buildPool: mockBuildPool, initialStage: "STAGE1" })
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
            useQuestManager({ buildPool: mockBuildPool, initialStage: "STAGE1" })
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
            useQuestManager({ buildPool: mockBuildPool, initialStage: "STAGE1" })
        );

        act(() => {
            result.current.setInputs({ ans: "2" });
            result.current.next();
        });

        expect(result.current.nonce).toBe(1);
        expect(result.current.inputs).toEqual({});
        expect(result.current.lastCheck).toBe(null);
    });
});
