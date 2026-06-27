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
