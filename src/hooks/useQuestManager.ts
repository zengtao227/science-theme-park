"use client";

import { useState, useMemo, useCallback } from "react";
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

export function useQuestManager<T extends Quest, S extends string>({
    buildPool,
    initialStage,
    tolerance = 0.1
}: UseQuestManagerOptions<T, S>) {
    const { currentLanguage } = useAppStore();
    const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
    const [stage, setStage] = useState<S>(initialStage);
    const [nonce, setNonce] = useState(0);
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correct: string }>(null);

    const locale = currentLanguage === "DE" ? "DE" : currentLanguage === "CN" ? "CN" : "EN";

    const pool = useMemo(() => buildPool(difficulty, stage), [buildPool, difficulty, stage]);

    const currentQuest = useMemo(() => {
        const sorted = [...pool].sort((a, b) => a.id.localeCompare(b.id));
        return sorted[nonce % Math.max(1, sorted.length)];
    }, [nonce, pool]);

    const clearInputs = useCallback(() => {
        setInputs({});
        setLastCheck(null);
    }, []);

    const next = useCallback(() => {
        clearInputs();
        setNonce((v) => v + 1);
    }, [clearInputs]);

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
            // Optional: You could set a special state for "Incomplete"
            // For now, we'll just treat it as Incorrect but maybe the UI should handle it.
            setLastCheck({ ok: false, correct: currentQuest.correctLatex });
            return;
        }

        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";

            if (typeof slot.expected === "number") {
                const v = parseNumberLike(raw);
                if (v === null || Math.abs(v - slot.expected) > tolerance) {
                    setLastCheck({ ok: false, correct: currentQuest.correctLatex });
                    return;
                }
            } else {
                // String comparison fallback
                if (raw.trim() !== slot.expected) {
                    setLastCheck({ ok: false, correct: currentQuest.correctLatex });
                    return;
                }
            }
        }
        setLastCheck({ ok: true, correct: currentQuest.correctLatex });
    }, [currentQuest, inputs, parseNumberLike, tolerance]);

    const handleDifficultyChange = useCallback((d: Difficulty) => {
        setDifficulty(d);
        setNonce(0);
        clearInputs();
    }, [clearInputs]);

    const handleStageChange = useCallback((s: S) => {
        setStage(s);
        setNonce(0);
        clearInputs();
    }, [clearInputs]);

    return {
        difficulty,
        stage,
        nonce,
        inputs,
        lastCheck,
        currentQuest,
        pool,
        locale,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        parseNumberLike,
    };
}
