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
