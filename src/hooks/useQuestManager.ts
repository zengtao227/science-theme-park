import { useState, useMemo, useCallback } from "react";
import { useAppStore } from "@/lib/store";

export type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";

export interface Slot {
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number | string;
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
    visual?: any;
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
        const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
        const v = Number(normalized);
        return Number.isFinite(v) ? v : null;
    }, [locale]);

    const verify = useCallback(() => {
        if (!currentQuest) return;

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
    };
}
