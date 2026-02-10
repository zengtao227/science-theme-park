"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useAppStore } from "@/lib/store";

export type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";

export interface Slot {
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number | string;
    unit?: string; // Optional unit to display next to input
}

export interface Quest {
    id: string;
    difficulty: Difficulty;
    stage: string;
    promptLatex: string;
    expressionLatex: string;
    targetLatex: string;
    slots: Slot[];
    correctLatex: string;
    hintLatex?: string[];
    visual?: unknown;
}

export interface UseQuestManagerOptions<T extends Quest, S extends string> {
    buildPool: (difficulty: Difficulty, stage: S) => T[];
    initialStage: S;
    tolerance?: number;
}

type StageStats = {
    attempts: number;
    correct: number;
    incorrect: number;
    lastUpdated: number;
};

export function useQuestManager<T extends Quest, S extends string>({
    buildPool,
    initialStage,
    tolerance = 0.1
}: UseQuestManagerOptions<T, S>) {
    const { currentLanguage } = useAppStore();
    const storageKey = "quest_manager_stats_v1";
    const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
    const [stage, setStage] = useState<S>(initialStage);
    const [nonce, setNonce] = useState(0);
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correct: string }>(null);
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

    const locale = currentLanguage === "DE" ? "DE" : currentLanguage === "CN" ? "CN" : "EN";

    const pool = useMemo(() => buildPool(difficulty, stage), [buildPool, difficulty, stage]);

    const currentQuest = useMemo(() => {
        const sorted = [...pool].sort((a, b) => a.id.localeCompare(b.id));
        return sorted[nonce % Math.max(1, sorted.length)];
    }, [nonce, pool]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(storageKey, JSON.stringify(stageStats));
    }, [stageStats]);

    const clearInputs = useCallback(() => {
        setInputs({});
        setLastCheck(null);
    }, []);

    const next = useCallback(() => {
        clearInputs();
        setNonce((v) => v + 1);
        if (currentQuest) {
            const questKey = `${stage}:${currentQuest.id}`;
            setErrorCounts((prev) => {
                const nextMap = { ...prev };
                delete nextMap[questKey];
                return nextMap;
            });
        }
    }, [clearInputs, currentQuest, stage]);

    const parseNumberLike = useCallback((s: string) => {
        const raw = s.trim();
        if (!raw) return null;

        // Handle German decimal comma
        const normalized = (locale === "DE" ? raw.replace(/,/g, ".") : raw).replace(/\s+/g, "");

        // Handle fractions (e.g., "4/3")
        if (normalized.includes("/")) {
            const [numStr, denStr] = normalized.split("/");
            const num = Number(numStr);
            const den = Number(denStr);
            if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
                return num / den;
            }
            return null;
        }

        const v = Number(normalized);
        return Number.isFinite(v) ? v : null;
    }, [locale]);

    const verify = useCallback(() => {
        if (!currentQuest) return;

        let anyEmpty = false;
        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";
            if (!raw.trim()) {
                anyEmpty = true;
                break;
            }
        }

        if (anyEmpty) {
            const stageKey = `${stage}`;
            const questKey = `${stage}:${currentQuest.id}`;
            setStageStats((prev) => {
                const existing = prev[stageKey] ?? { attempts: 0, correct: 0, incorrect: 0, lastUpdated: 0 };
                return {
                    ...prev,
                    [stageKey]: {
                        attempts: existing.attempts + 1,
                        correct: existing.correct,
                        incorrect: existing.incorrect + 1,
                        lastUpdated: Date.now(),
                    },
                };
            });
            setErrorCounts((prev) => ({ ...prev, [questKey]: (prev[questKey] ?? 0) + 1 }));
            setLastCheck({ ok: false, correct: currentQuest.correctLatex });
            return;
        }

        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";

            if (typeof slot.expected === "number") {
                const v = parseNumberLike(raw);
                if (v === null || Math.abs(v - slot.expected) > tolerance) {
                    const stageKey = `${stage}`;
                    const questKey = `${stage}:${currentQuest.id}`;
                    setStageStats((prev) => {
                        const existing = prev[stageKey] ?? { attempts: 0, correct: 0, incorrect: 0, lastUpdated: 0 };
                        return {
                            ...prev,
                            [stageKey]: {
                                attempts: existing.attempts + 1,
                                correct: existing.correct,
                                incorrect: existing.incorrect + 1,
                                lastUpdated: Date.now(),
                            },
                        };
                    });
                    setErrorCounts((prev) => ({ ...prev, [questKey]: (prev[questKey] ?? 0) + 1 }));
                    setLastCheck({ ok: false, correct: currentQuest.correctLatex });
                    return;
                }
            } else {
                // Robust String comparison with mathematical normalization (e.g., 1x == x)
                const normalize = (s: string) => {
                    return s.trim()
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .replace(/^1([a-z])/, "$1")           // "1x" -> "x" (at start)
                        .replace(/([^0-9])1([a-z])/, "$1$2"); // "2+1x" -> "2+x"
                };

                if (normalize(raw) !== normalize(slot.expected.toString())) {
                    const stageKey = `${stage}`;
                    const questKey = `${stage}:${currentQuest.id}`;
                    setStageStats((prev) => {
                        const existing = prev[stageKey] ?? { attempts: 0, correct: 0, incorrect: 0, lastUpdated: 0 };
                        return {
                            ...prev,
                            [stageKey]: {
                                attempts: existing.attempts + 1,
                                correct: existing.correct,
                                incorrect: existing.incorrect + 1,
                                lastUpdated: Date.now(),
                            },
                        };
                    });
                    setErrorCounts((prev) => ({ ...prev, [questKey]: (prev[questKey] ?? 0) + 1 }));
                    setLastCheck({ ok: false, correct: currentQuest.correctLatex });
                    return;
                }
            }
        }
        const stageKey = `${stage}`;
        const questKey = `${stage}:${currentQuest.id}`;
        setStageStats((prev) => {
            const existing = prev[stageKey] ?? { attempts: 0, correct: 0, incorrect: 0, lastUpdated: 0 };
            return {
                ...prev,
                [stageKey]: {
                    attempts: existing.attempts + 1,
                    correct: existing.correct + 1,
                    incorrect: existing.incorrect,
                    lastUpdated: Date.now(),
                },
            };
        });
        setErrorCounts((prev) => ({ ...prev, [questKey]: 0 }));
        setLastCheck({ ok: true, correct: currentQuest.correctLatex });
    }, [currentQuest, inputs, parseNumberLike, stage, tolerance]);

    const handleDifficultyChange = useCallback((d: Difficulty) => {
        setDifficulty(d);
        setNonce(0);
        clearInputs();
        setErrorCounts({});
    }, [clearInputs]);

    const handleStageChange = useCallback((s: S) => {
        setStage(s);
        setNonce(0);
        clearInputs();
        setErrorCounts({});
    }, [clearInputs]);

    const currentStageStats = useMemo(() => {
        const stageKey = `${stage}`;
        return stageStats[stageKey] ?? { attempts: 0, correct: 0, incorrect: 0, lastUpdated: 0 };
    }, [stage, stageStats]);

    const successRate = useMemo(() => {
        if (!currentStageStats.attempts) return 0;
        return currentStageStats.correct / currentStageStats.attempts;
    }, [currentStageStats]);

    const getHint = useCallback(() => {
        if (!currentQuest) return null;
        const questKey = `${stage}:${currentQuest.id}`;
        const errors = errorCounts[questKey] ?? 0;
        if (errors <= 0) return null;
        if (currentQuest.hintLatex && currentQuest.hintLatex.length > 0) {
            const idx = Math.min(errors - 1, currentQuest.hintLatex.length - 1);
            return currentQuest.hintLatex[idx];
        }
        if (errors === 1) return currentQuest.targetLatex;
        if (errors === 2) return currentQuest.expressionLatex;
        return currentQuest.correctLatex.replace(/[0-9]/g, "•");
    }, [currentQuest, errorCounts, stage]);

    return {
        difficulty,
        stage,
        nonce,
        inputs,
        lastCheck,
        currentQuest,
        pool,
        locale,
        stageStats,
        currentStageStats,
        successRate,
        getHint,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        parseNumberLike,
    };
}
