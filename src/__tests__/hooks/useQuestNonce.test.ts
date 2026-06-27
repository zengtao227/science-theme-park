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
