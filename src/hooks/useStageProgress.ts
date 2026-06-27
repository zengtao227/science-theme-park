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
