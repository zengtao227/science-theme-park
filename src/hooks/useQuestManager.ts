import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { getAdaptiveDifficulty, DifficultyAdjustment } from "@/lib/ai/adaptiveEngine";
import { requestPersonalizedFeedback } from "@/lib/ai/feedbackEngine";
import { canonicalizeFreeText, localizeFreeText } from "@/lib/i18n/freeTextLocale";

export type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
export type FeedbackLevel = "NONE" | "HINT" | "STEPS" | "FULL";

export interface PlatformSolutionStep {
    stepNumber: number;
    expressionLatex: string;
    justification: string;
    emphasis?: "warning" | "key" | "transform";
}

export interface FeedbackContent {
    hint: string | null;
    steps: PlatformSolutionStep[];
    fullSolutionLatex: string | null;
    hasFullSolution: boolean;
}

export interface FeedbackPolicy {
    hintThreshold: number;
    stepsThreshold: number;
    fullThreshold: number;
    confirmFullSolution: boolean;
    showAfterCorrect: boolean;
}

export const DEFAULT_FEEDBACK_POLICY: FeedbackPolicy = {
    hintThreshold: 1,
    stepsThreshold: 2,
    fullThreshold: 3,
    confirmFullSolution: true,
    showAfterCorrect: true,
};

export interface Slot {
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number | string;
    unit?: string;
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
    moduleCode: string;
    buildPool: (difficulty: Difficulty, stage: S) => T[];
    initialStage: S;
    initialDifficulty?: Difficulty;
    tolerance?: number;
    feedbackContentProvider?: (quest: T) => Omit<FeedbackContent, 'hint'>;
    feedbackPolicy?: Partial<FeedbackPolicy>;
}

type StageStats = {
    attempts: number;
    correct: number;
    incorrect: number;
    lastUpdated: number;
};

const EMPTY_STAGE_STATS: StageStats = { attempts: 0, correct: 0, incorrect: 0, lastUpdated: 0 };

export function useQuestManager<T extends Quest, S extends string>({
    moduleCode,
    buildPool,
    initialStage,
    initialDifficulty = "CORE",
    tolerance = 0.1,
    feedbackContentProvider,
    feedbackPolicy: policyOverrides,
}: UseQuestManagerOptions<T, S>) {
    const policy: FeedbackPolicy = useMemo(
        () => ({ ...DEFAULT_FEEDBACK_POLICY, ...policyOverrides }),
        [policyOverrides]
    );
    const currentLanguage = useAppStore((s) => s.currentLanguage);
    const history = useAppStore((s) => s.history);
    const completeStage = useAppStore((s) => s.completeStage);

    const storageKey = `quest_manager_stats_${moduleCode}_v1`;
    const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
    const [stage, setStage] = useState<S>(initialStage);
    const [nonce, setNonce] = useState(() => {
        if (typeof window === "undefined") return 0;
        try {
            const key = `quest_manager_nonce_${moduleCode}_${initialStage}_${initialDifficulty}`;
            const saved = window.localStorage.getItem(key);
            return saved ? parseInt(saved, 10) : 0;
        } catch {
            return 0;
        }
    });

    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correct: string }>(null);
    const [feedbackLevel, setFeedbackLevel] = useState<FeedbackLevel>("NONE");
    const [stageStats, setStageStats] = useState<Record<string, StageStats>>(() => {
        if (typeof window === "undefined") return {};
        try {
            const raw = window.localStorage.getItem(storageKey);
            return raw ? (JSON.parse(raw) as Record<string, StageStats>) : {};
        } catch {
            return {};
        }
    });

    const [adaptiveRecommendation, setAdaptiveRecommendation] = useState<DifficultyAdjustment | null>(null);
    const userHasSetDifficultyRef = useRef(false);
    const [aiFeedback, setAiFeedback] = useState<string | null>(null);
    const [isRequestingAi, setIsRequestingAi] = useState(false);

    useEffect(() => {
        const recommendation = getAdaptiveDifficulty(history, moduleCode);
        setAdaptiveRecommendation(recommendation);

        if (
            !userHasSetDifficultyRef.current &&
            recommendation.confidence > 0.9 &&
            recommendation.recommendedDifficulty !== difficulty
        ) {
            setDifficulty(recommendation.recommendedDifficulty as Difficulty);
        }
    }, [history, moduleCode]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (typeof window === "undefined") return;
        const key = `quest_manager_nonce_${moduleCode}_${stage}_${difficulty}`;
        const saved = window.localStorage.getItem(key);
        setNonce(saved ? parseInt(saved, 10) : 0);
    }, [moduleCode, stage, difficulty]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const key = `quest_manager_nonce_${moduleCode}_${stage}_${difficulty}`;
        window.localStorage.setItem(key, nonce.toString());
    }, [moduleCode, nonce, stage, difficulty]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(storageKey, JSON.stringify(stageStats));
    }, [storageKey, stageStats]);

    const [errorCounts, setErrorCounts] = useState<Record<string, number>>({});
    const locale = currentLanguage === "DE" ? "DE" : currentLanguage === "CN" ? "CN" : "EN";

    const rawPool = useMemo(() => buildPool(difficulty, stage), [buildPool, difficulty, stage]);
    const pool = useMemo(() => {
        return rawPool.map((quest) => ({
            ...quest,
            slots: quest.slots.map((slot) => ({
                ...slot,
                placeholder: localizeFreeText(slot.placeholder, locale),
            })),
        }));
    }, [rawPool, locale]);

    const currentQuest = useMemo(() => {
        const sorted = [...pool].sort((a, b) => a.id.localeCompare(b.id));
        if (sorted.length === 0) return null;
        return sorted[nonce % sorted.length];
    }, [nonce, pool]);

    const clearInputs = useCallback(() => {
        setInputs({});
        setLastCheck(null);
        setFeedbackLevel("NONE");
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
                language: currentLanguage
            });
            setAiFeedback(feedback);
        } catch (error: any) {
            setAiFeedback(`AI Diagnosis Error: ${error.message || 'Unknown error'}`);
        } finally {
            setIsRequestingAi(false);
        }
    }, [currentQuest, inputs, isRequestingAi, currentLanguage]);

    const previous = useCallback(() => {
        if (nonce > 0) {
            clearInputs();
            setNonce((v) => v - 1);
        }
    }, [clearInputs, nonce]);

    const next = useCallback(() => {
        clearInputs();
        setNonce((v) => v + 1);
    }, [clearInputs]);

    const canPrevious = nonce > 0;
    const canNext = pool.length > 0 && nonce < pool.length - 1;
    const progress = pool.length > 0 ? Math.min((nonce / pool.length) * 100, 100) : 0;

    const parseNumberLike = useCallback((s: string) => {
        const raw = s.trim();
        if (!raw) return null;

        const normalized = (locale === "DE" ? raw.replace(/,/g, ".") : raw).replace(/\s+/g, "");

        if (normalized.includes("/")) {
            const parts = normalized.split("/");
            if (parts.length !== 2) return null;
            const [numStr, denStr] = parts;
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

        const sKey = `${stage}`;
        const questKey = `${stage}:${currentQuest.id}`;

        const recordIncorrect = () => {
            setStageStats((prev) => {
                const existing = prev[sKey] ?? EMPTY_STAGE_STATS;
                return {
                    ...prev,
                    [sKey]: {
                        attempts: existing.attempts + 1,
                        correct: existing.correct,
                        incorrect: existing.incorrect + 1,
                        lastUpdated: Date.now(),
                    },
                };
            });
            setErrorCounts((prev) => ({ ...prev, [questKey]: (prev[questKey] ?? 0) + 1 }));
            setLastCheck({ ok: false, correct: "" });
        };

        const normalize = (s: string) => {
            const canonical = canonicalizeFreeText(s, locale);
            return canonical.trim()
                .toLowerCase()
                .replace(/\s/g, "")
                .replace(/²/g, "^2")
                .replace(/³/g, "^3")
                .replace(/\^1(?![0-9])/g, "")
                .replace(/^1([a-z^])/, "$1")
                .replace(/([^0-9.])1([a-z^])/g, "$1$2");
        };

        const anyEmpty = currentQuest.slots.some((slot) => !(inputs[slot.id] ?? "").trim());
        if (anyEmpty) {
            recordIncorrect();
            return;
        }

        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";

            if (typeof slot.expected === "number") {
                const v = parseNumberLike(raw);
                if (v === null || Math.abs(v - slot.expected) > tolerance) {
                    recordIncorrect();
                    return;
                }
            } else if (normalize(raw) !== normalize(slot.expected.toString())) {
                recordIncorrect();
                return;
            }
        }

        setStageStats((prev) => {
            const existing = prev[sKey] ?? EMPTY_STAGE_STATS;
            return {
                ...prev,
                [sKey]: {
                    attempts: existing.attempts + 1,
                    correct: existing.correct + 1,
                    incorrect: existing.incorrect,
                    lastUpdated: Date.now(),
                },
            };
        });
        setErrorCounts((prev) => ({ ...prev, [questKey]: 0 }));
        setLastCheck({ ok: true, correct: currentQuest.correctLatex });
        completeStage(moduleCode, stage);
    }, [currentQuest, inputs, parseNumberLike, stage, tolerance, locale, completeStage, moduleCode]);

    const handleDifficultyChange = useCallback((d: Difficulty) => {
        userHasSetDifficultyRef.current = true;
        setDifficulty(d);
        clearInputs();
        setErrorCounts({});
        setStageStats((prev) => {
            const nextStats = { ...prev };
            delete nextStats[`${stage}`];
            return nextStats;
        });
    }, [clearInputs, stage]);

    const handleStageChange = useCallback((s: S) => {
        setStage(s);
        clearInputs();
        setErrorCounts({});
    }, [clearInputs]);

    const currentStageStats = useMemo(() => {
        const sKey = `${stage}`;
        return stageStats[sKey] ?? EMPTY_STAGE_STATS;
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
        return currentQuest.promptLatex || currentQuest.expressionLatex;
    }, [currentQuest, errorCounts, stage]);

    const getCurrentErrorCount = useCallback(() => {
        if (!currentQuest) return 0;
        const questKey = `${stage}:${currentQuest.id}`;
        return errorCounts[questKey] ?? 0;
    }, [currentQuest, errorCounts, stage]);

    const showHintLevel = useCallback(() => setFeedbackLevel("HINT"), []);
    const showStepsLevel = useCallback(() => setFeedbackLevel("STEPS"), []);
    const showFullSolution = useCallback(() => setFeedbackLevel("FULL"), []);

    const feedbackContent: FeedbackContent = useMemo(() => {
        if (!currentQuest) {
            return { hint: null, steps: [], fullSolutionLatex: null, hasFullSolution: false };
        }
        const hint = getHint();
        if (feedbackContentProvider) {
            const provided = feedbackContentProvider(currentQuest);
            return {
                hint,
                steps: provided.steps,
                fullSolutionLatex: provided.fullSolutionLatex ?? currentQuest.correctLatex,
                hasFullSolution: !!provided.fullSolutionLatex,
            };
        }
        return {
            hint,
            steps: [],
            fullSolutionLatex: currentQuest.correctLatex,
            hasFullSolution: false,
        };
    }, [currentQuest, getHint, feedbackContentProvider]);

    const feedbackAvailability = useMemo(() => {
        const errors = getCurrentErrorCount();
        const hasHints = feedbackContent.hint !== null;
        const hasSteps = feedbackContent.steps.length > 0;
        const isAnswered = lastCheck !== null;
        const isWrong = isAnswered && !lastCheck.ok;
        const isCorrect = isAnswered && lastCheck.ok;

        if (isCorrect && policy.showAfterCorrect) {
            return {
                canShowHint: hasHints,
                canShowSteps: hasSteps,
                canShowFull: true,
            };
        }

        return {
            canShowHint: isWrong && errors >= policy.hintThreshold && hasHints,
            canShowSteps: isWrong && errors >= policy.stepsThreshold && hasSteps,
            canShowFull: isWrong && errors >= policy.fullThreshold,
        };
    }, [getCurrentErrorCount, feedbackContent, lastCheck, policy]);

    const handleStageChangeString = useCallback(
        (s: string) => handleStageChange(s as S),
        [handleStageChange]
    );

    const chamberLayoutProps = useMemo(() => ({
        difficulty,
        onDifficultyChange: handleDifficultyChange,
        currentStage: stage as string,
        onStageChange: handleStageChangeString,
        checkStatus: lastCheck,
        onVerify: verify,
        onNext: next,
        successRate,
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        onAiDiagnosisRequested: requestAiFeedback,
        feedbackContent,
        feedbackLevel,
        feedbackAvailability,
        feedbackPolicy: policy,
        onShowHint: showHintLevel,
        onShowSteps: showStepsLevel,
        onShowFull: showFullSolution,
        questNonce: nonce,
    }), [
        difficulty,
        handleDifficultyChange,
        stage,
        handleStageChangeString,
        lastCheck,
        verify,
        next,
        successRate,
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback,
        feedbackContent,
        feedbackLevel,
        feedbackAvailability,
        policy,
        showHintLevel,
        showStepsLevel,
        showFullSolution,
        nonce,
    ]);

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
        feedbackLevel,
        feedbackContent,
        feedbackAvailability,
        showHintLevel,
        showStepsLevel,
        showFullSolution,
        policy,
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback,
        setInputs,
        verify,
        next,
        previous,
        handleDifficultyChange,
        handleStageChange,
        parseNumberLike,
        chamberLayoutProps,
    };
}
