import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { getAdaptiveDifficulty, DifficultyAdjustment } from "@/lib/ai/adaptiveEngine";
import { localizeFreeText } from "@/lib/i18n/freeTextLocale";
import { useAiFeedback } from "./useAiFeedback";
import { useStageProgress, type StageStats } from "./useStageProgress";
import { useQuestNonce } from "./useQuestNonce";
import { parseNumberLike as parseNumberLikePure, normalizeAnswer, type Locale } from "@/lib/quest/answerMatching";

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
    const { nonce, setNonce } = useQuestNonce(moduleCode, stage as string, difficulty);
    const {
        stageStats,
        errorCounts,
        recordAttempt,
        resetStageStats,
        clearErrorCounts,
        getCurrentStageStats,
        getSuccessRate,
        getErrorCount,
    } = useStageProgress(storageKey);

    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correct: string }>(null);
    const [feedbackLevel, setFeedbackLevel] = useState<FeedbackLevel>("NONE");

    const [adaptiveRecommendation, setAdaptiveRecommendation] = useState<DifficultyAdjustment | null>(null);
    const userHasSetDifficultyRef = useRef(false);

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

    const { aiFeedback, isRequestingAi, requestAiFeedback, reset: resetAiFeedback } = useAiFeedback(
        currentQuest,
        inputs,
        currentLanguage
    );

    const clearInputs = useCallback(() => {
        setInputs({});
        setLastCheck(null);
        setFeedbackLevel("NONE");
        resetAiFeedback();
    }, [resetAiFeedback]);

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

    const parseNumberLike = useCallback(
        (s: string) => parseNumberLikePure(s, locale as Locale),
        [locale]
    );

    const verify = useCallback(() => {
        if (!currentQuest) return;

        const sKey = `${stage}`;
        const questKey = `${stage}:${currentQuest.id}`;

        const anyEmpty = currentQuest.slots.some((slot) => !(inputs[slot.id] ?? "").trim());
        if (anyEmpty) {
            recordAttempt({ stageKey: sKey, questKey, correct: false });
            setLastCheck({ ok: false, correct: "" });
            return;
        }

        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";

            if (typeof slot.expected === "number") {
                const v = parseNumberLikePure(raw, locale as Locale);
                if (v === null || Math.abs(v - slot.expected) > tolerance) {
                    recordAttempt({ stageKey: sKey, questKey, correct: false });
                    setLastCheck({ ok: false, correct: "" });
                    return;
                }
            } else if (normalizeAnswer(raw, locale as Locale) !== normalizeAnswer(slot.expected.toString(), locale as Locale)) {
                recordAttempt({ stageKey: sKey, questKey, correct: false });
                setLastCheck({ ok: false, correct: "" });
                return;
            }
        }

        recordAttempt({ stageKey: sKey, questKey, correct: true });
        setLastCheck({ ok: true, correct: currentQuest.correctLatex });
        completeStage(moduleCode, stage);
    }, [currentQuest, inputs, stage, tolerance, locale, completeStage, moduleCode, recordAttempt]);

    const handleDifficultyChange = useCallback((d: Difficulty) => {
        userHasSetDifficultyRef.current = true;
        setDifficulty(d);
        clearInputs();
        clearErrorCounts();
        resetStageStats(`${stage}`);
    }, [clearInputs, stage, clearErrorCounts, resetStageStats]);

    const handleStageChange = useCallback((s: S) => {
        setStage(s);
        clearInputs();
        clearErrorCounts();
    }, [clearInputs, clearErrorCounts]);

    const currentStageStats = getCurrentStageStats(`${stage}`);
    const successRate = getSuccessRate(`${stage}`);

    const getHint = useCallback(() => {
        if (!currentQuest) return null;
        const errors = getErrorCount(stage, currentQuest.id);
        if (errors <= 0) return null;

        if (currentQuest.hintLatex && currentQuest.hintLatex.length > 0) {
            const idx = Math.min(errors - 1, currentQuest.hintLatex.length - 1);
            return currentQuest.hintLatex[idx];
        }

        if (errors === 1) return currentQuest.targetLatex;
        if (errors === 2) return currentQuest.expressionLatex;
        return currentQuest.promptLatex || currentQuest.expressionLatex;
    }, [currentQuest, getErrorCount, stage]);

    const getCurrentErrorCount = useCallback(() => {
        if (!currentQuest) return 0;
        return getErrorCount(stage, currentQuest.id);
    }, [currentQuest, getErrorCount, stage]);

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
