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
    const [nonce, setNonce] = useState(() => {
        if (typeof window === "undefined") return 0;
        try {
            const key = `quest_manager_nonce_${initialStage}_CORE`;
            const saved = window.localStorage.getItem(key);
            return saved ? parseInt(saved, 10) : 0;
        } catch {
            return 0;
        }
    });

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

    // Load nonce when stage or difficulty changes
    useEffect(() => {
        if (typeof window === "undefined") return;
        const key = `quest_manager_nonce_${stage}_${difficulty}`;
        const saved = window.localStorage.getItem(key);
        if (saved) {
            setNonce(parseInt(saved, 10));
        } else {
            setNonce(0);
        }
    }, [stage, difficulty]);

    // Persist nonce when it changes
    useEffect(() => {
        if (typeof window === "undefined") return;
        const key = `quest_manager_nonce_${stage}_${difficulty}`;
        window.localStorage.setItem(key, nonce.toString());
    }, [nonce, stage, difficulty]);
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

    const previous = useCallback(() => {
        if (nonce > 0) {
            clearInputs();
            setNonce((v) => v - 1);
            if (currentQuest) {
                const questKey = `${stage}:${currentQuest.id}`;
                setErrorCounts((prev) => {
                    const nextMap = { ...prev };
                    delete nextMap[questKey];
                    return nextMap;
                });
            }
        }
    }, [clearInputs, currentQuest, stage, nonce]);

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

    const canPrevious = nonce > 0;
    const canNext = pool.length > 0 && nonce < pool.length - 1;
    const progress = pool.length > 0 ? Math.min((nonce / pool.length) * 100, 100) : 0;


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

    /**
     * Enhanced validation function with improved error feedback
     * 
     * Features:
     * - Detailed empty field tracking and reporting
     * - Progressive error counting for smart hint system
     * - Enhanced error messages with context
     * - Locale-aware number parsing (supports German decimal comma)
     * - Robust string comparison with mathematical normalization
     * 
     * Validation flow:
     * 1. Check for empty inputs and track which fields are empty
     * 2. For numeric slots: parse with locale support and check tolerance
     * 3. For string slots: normalize and compare (handles mathematical notation)
     * 4. Update statistics and error counts for progressive hints
     * 5. Provide contextual feedback through lastCheck state
     */
    const verify = useCallback(() => {
        if (!currentQuest) return;

        // Enhanced validation: Check for empty inputs with detailed feedback
        let anyEmpty = false;
        const emptySlots: string[] = [];
        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";
            if (!raw.trim()) {
                anyEmpty = true;
                emptySlots.push(slot.labelLatex);
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
            // Enhanced error message for empty inputs
            const errorMessage = emptySlots.length > 0
                ? `${currentQuest.correctLatex} \\text{ (Empty: ${emptySlots.join(', ')})}`
                : currentQuest.correctLatex;
            setLastCheck({ ok: false, correct: errorMessage });
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
                        .replace(/²/g, "^2") // Normalize superscript
                        .replace(/³/g, "^3") // Normalize superscript
                        .replace(/\^1(?![0-9])/, "") // Remove ^1
                        .replace(/^1([a-z^])/, "$1") // "1x" -> "x" (at start)
                        .replace(/([^0-9.])1([a-z^])/, "$1$2"); // "2+1x" -> "2+x"
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
        clearInputs();
        setErrorCounts({});
    }, [clearInputs]);

    const handleStageChange = useCallback((s: S) => {
        setStage(s);
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

    /**
     * Progressive hint system that provides increasingly specific guidance
     * 
     * Hint progression:
     * - Error 1: Show target format/structure
     * - Error 2: Show expression context
     * - Error 3: Show partial answer (masked)
     * - Error 4+: Show complete answer
     * 
     * If quest has custom hintLatex array, uses those hints instead
     * 
     * @returns Hint string in LaTeX format, or null if no errors yet
     */
    const getHint = useCallback(() => {
        if (!currentQuest) return null;
        const questKey = `${stage}:${currentQuest.id}`;
        const errors = errorCounts[questKey] ?? 0;
        if (errors <= 0) return null;

        // Progressive hint system: provide increasingly specific hints
        if (currentQuest.hintLatex && currentQuest.hintLatex.length > 0) {
            const idx = Math.min(errors - 1, currentQuest.hintLatex.length - 1);
            return currentQuest.hintLatex[idx];
        }

        // Smart fallback hints based on error count
        if (errors === 1) {
            // First error: show target format
            return currentQuest.targetLatex;
        } else if (errors === 2) {
            // Second error: show expression context
            return currentQuest.expressionLatex;
        } else if (errors === 3) {
            // Third error: show partial answer (mask some digits)
            const masked = currentQuest.correctLatex.replace(/[0-9]/g, (match, offset, str) => {
                // Show first and last digit, mask middle ones
                const digitPositions = [...str.matchAll(/[0-9]/g)].map(m => m.index);
                const currentPos = digitPositions.indexOf(offset);
                if (currentPos === 0 || currentPos === digitPositions.length - 1) {
                    return match;
                }
                return "•";
            });
            return masked;
        } else {
            // Fourth+ error: show full answer
            return currentQuest.correctLatex;
        }
    }, [currentQuest, errorCounts, stage]);

    /**
     * Get the current error count for the active quest
     * Useful for displaying attempt numbers and adjusting UI feedback
     * 
     * @returns Number of incorrect attempts for current quest
     */
    const getCurrentErrorCount = useCallback(() => {
        if (!currentQuest) return 0;
        const questKey = `${stage}:${currentQuest.id}`;
        return errorCounts[questKey] ?? 0;
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
        progress,
        canPrevious,
        canNext,
        getHint,
        getCurrentErrorCount,
        setInputs,
        verify,
        next,
        previous,
        handleDifficultyChange,
        handleStageChange,
        parseNumberLike,
    };
}
