"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sigma, X, Printer } from "lucide-react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import ConceptIcon from "@/components/ConceptIcon";
import ResizableLayout from "@/components/layout/ResizableLayout";
import { useAppStore, type HistoryEntry } from "@/lib/store";
import { Difficulty } from "@/hooks/useQuestManager";
import type { Quest, FeedbackLevel } from "@/hooks/useQuestManager";
import { translations as i18n, useLanguage } from "@/lib/i18n";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { MODULE_DEPENDENCIES } from "@/lib/curriculum/dependencies";
import CoopPanel from "@/components/coop/CoopPanel";
import HUDAlert from "@/components/shared/HUDAlert";
import LayeredFeedbackPanel from "@/components/feedback/LayeredFeedbackPanel";

interface ChamberLayoutProps {
    title: string;
    moduleCode: string;
    difficulty: Difficulty;
    onDifficultyChange: (d: Difficulty) => void;
    stages: { id: string; label: string }[];
    currentStage: string;
    onStageChange: (s: string) => void;
    children: React.ReactNode;
    monitorContent?: React.ReactNode;
    printContent?: React.ReactNode;
    printSections?: { id: string; label: string; content: React.ReactNode }[];
    defaultLeftWidth?: number;
    minLeftWidth?: number;
    maxLeftWidth?: number;
    checkStatus?: { ok: boolean; correct: string } | null;
    onVerify?: () => void;
    onNext?: () => void;
    successRate?: number;
    translations: {
        back: string;
        check: string;
        next: string;
        correct: string;
        incorrect: string;
        monitor_title?: string;
        difficulty: Record<string, string>;
    };
    adaptiveRecommendation?: {
        recommendedDifficulty: string;
        confidence: number;
        reason: string;
    } | null;
    aiFeedback?: string | null;
    isRequestingAi?: boolean;
    onAiDiagnosisRequested?: () => void;
    // Layered feedback props
    currentQuest?: Quest | null;
    feedbackLevel?: FeedbackLevel;
    feedbackAvailability?: { canShowHint: boolean; canShowSteps: boolean; canShowFull: boolean };
    currentHint?: string | null;
    onShowHint?: () => void;
    onShowSteps?: () => void;
    onShowFull?: () => void;
}

export default function ChamberLayout({
    title,
    moduleCode,
    difficulty,
    onDifficultyChange,
    stages,
    currentStage,
    onStageChange,
    children,
    monitorContent,
    printContent,
    printSections,
    defaultLeftWidth,
    minLeftWidth,
    maxLeftWidth,
    checkStatus,
    onVerify,
    onNext,
    successRate,
    translations,
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    onAiDiagnosisRequested,
    currentQuest,
    feedbackLevel,
    feedbackAvailability,
    currentHint,
    onShowHint,
    onShowSteps,
    onShowFull,
}: ChamberLayoutProps) {
    const { currentLanguage, setLanguage, history, addHistory } = useAppStore();
    const { t } = useLanguage();
    const common = i18n[currentLanguage].common;
    const locale = currentLanguage === "CN" ? "zh-CN" : currentLanguage === "DE" ? "de-DE" : "en-US";
    const historyToggleLabel = typeof common?.history_toggle === "string" && common.history_toggle.trim().length > 0
        ? common.history_toggle
        : (typeof common?.history_title === "string" && common.history_title.trim().length > 0 ? common.history_title : "History");
    const [historyOpen, setHistoryOpen] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<"controls" | "monitor" | "history">("controls");
    const prevOkRef = useRef(false);
    const stageStartRef = useRef(0);
    const hadFailureRef = useRef(false);
    const [printSelectorOpen, setPrintSelectorOpen] = useState(false);
    const [selectedPrintSectionIds, setSelectedPrintSectionIds] = useState<string[]>([]);
    const hasPrintSections = Array.isArray(printSections) && printSections.length > 0;
    const hasPrintContent = !!printContent || hasPrintSections;

    useEffect(() => {
        if (!hasPrintSections || !printSections) {
            setSelectedPrintSectionIds([]);
            return;
        }
        setSelectedPrintSectionIds(printSections.map((section) => section.id));
    }, [hasPrintSections, printSections]);

    const moduleEntries = useMemo<HistoryEntry[]>(() => {
        return history.filter((entry) => entry.moduleCode === moduleCode);
    }, [history, moduleCode]);

    const bestEntry = useMemo<HistoryEntry | null>(() => {
        if (!moduleEntries.length) return null;
        return moduleEntries.reduce((best, entry) => entry.score > best.score ? entry : best, moduleEntries[0]);
    }, [moduleEntries]);

    const stageLabel = useMemo(() => {
        return stages.find((s) => s.id === currentStage)?.label ?? currentStage;
    }, [stages, currentStage]);

    const selectedPrintSections = useMemo(() => {
        if (!hasPrintSections || !printSections) return [];
        return printSections.filter((section) => selectedPrintSectionIds.includes(section.id));
    }, [hasPrintSections, printSections, selectedPrintSectionIds]);

    const canPrint = !hasPrintSections || selectedPrintSections.length > 0;

    // Check Prerequisites
    const prerequisites = useMemo(() => {
        const deps = MODULE_DEPENDENCIES[moduleCode] || [];
        return deps.map(dep => {
            const isCompleted = history.some(h => h.moduleCode === dep.moduleCode);
            return { ...dep, isCompleted };
        });
    }, [moduleCode, history]);

    const allPrereqsMet = useMemo(() => prerequisites.every(p => p.isCompleted), [prerequisites]);
    const missingPrereqCodes = useMemo(
        () => prerequisites.filter(p => !p.isCompleted).map(p => p.moduleCode),
        [prerequisites]
    );
    const missingPrereqLabel = missingPrereqCodes.join(", ");

    const getDifficultyLabel = useCallback((value?: string) => {
        if (!value) return t("common.ai_recommendation_difficulty_unknown");
        const key = value.toLowerCase();
        const moduleLabel = translations?.difficulty?.[key];
        if (moduleLabel) return moduleLabel;
        const commonLabel = common?.difficulty?.[key];
        if (commonLabel) return commonLabel;
        return t("common.ai_recommendation_difficulty_unknown");
    }, [common, t, translations]);

    const getRecommendationReason = useCallback((reason?: string) => {
        if (!reason) return t("common.ai_recommendation_reason_unknown");
        const key = `common.ai_recommendation_reason.${reason}`;
        const translated = t(key);
        if (translated === key) return t("common.ai_recommendation_reason_unknown");
        return translated;
    }, [t]);

    useEffect(() => {
        stageStartRef.current = Date.now();
        hadFailureRef.current = false;
    }, [currentStage, difficulty]);

    useEffect(() => {
        if (checkStatus && !checkStatus.ok) {
            hadFailureRef.current = true;
        }
    }, [checkStatus]);

    useEffect(() => {
        const ok = !!checkStatus?.ok;
        if (ok && !prevOkRef.current) {
            const durationMs = Date.now() - stageStartRef.current;
            const accuracy = typeof successRate === "number" ? successRate : 1;
            addHistory({
                id: `${moduleCode}-${currentStage}-${Date.now()}`,
                timestamp: Date.now(),
                moduleCode,
                stage: currentStage,
                stageLabel,
                difficulty,
                score: accuracy,
                durationMs,
                rigor: !hadFailureRef.current,
            });
        }
        prevOkRef.current = ok;
    }, [addHistory, checkStatus, currentStage, difficulty, moduleCode, stageLabel, successRate]);

    const formatAccuracy = (value: number) => `${Math.round(value * 100)}%`;
    const formatTime = (value: number) => new Date(value).toLocaleString(locale, { hour12: false });
    const formatDuration = (value: number) => {
        if (!Number.isFinite(value)) return "--";
        const seconds = Math.max(1, Math.round(value / 1000));
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;
        return minutes ? `${minutes}m ${remaining}s` : `${remaining}s`;
    };

    const panelLabels = {
        controls: t("common.chamber_layout.panels.controls"),
        monitor: t("common.chamber_layout.panels.monitor"),
        history: t("common.chamber_layout.panels.history"),
    };

    const printLabels = {
        selector: t("common.chamber_layout.print.selector"),
        all: t("common.chamber_layout.print.all"),
        clear: t("common.chamber_layout.print.clear"),
        selected: t("common.chamber_layout.print.selected"),
    };

    const togglePrintSection = useCallback((sectionId: string) => {
        setSelectedPrintSectionIds((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
        );
    }, []);

    const actionPanel = (onVerify || onNext) ? (
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
                {onVerify && (
                    <button
                        onClick={onVerify}
                        className="min-h-[44px] px-6 py-3 border-2 border-white text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:bg-white hover:text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
                    >
                        {translations.check}
                    </button>
                )}
                {onNext && (
                    <button
                        onClick={onNext}
                        className="min-h-[44px] px-6 py-3 border-2 border-white/50 text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:bg-white hover:text-black active:scale-95 flex items-center gap-2"
                    >
                        {translations.next}
                    </button>
                )}
            </div>

            {checkStatus && (
                <div className="text-center animate-in fade-in slide-in-from-bottom-2">
                    <div className={clsx(
                        "text-[10px] font-black tracking-[0.4em] uppercase mb-2",
                        checkStatus.ok ? "text-neon-green" : "text-orange-400"
                    )}>
                        {checkStatus.ok ? translations.correct : translations.incorrect}
                    </div>
                    {!checkStatus.ok && (
                        <div className="text-white/70 font-black break-words max-w-lg mx-auto p-3 bg-white/[0.03] rounded border border-white/5 relative">
                            <InlineMath math={checkStatus.correct} />

                            {/* AI Diagnosis Area */}
                            {onAiDiagnosisRequested && (
                                <div className="mt-4 pt-4 border-t border-white/10 w-full flex flex-col items-center">
                                    {!aiFeedback && (
                                        <button
                                            onClick={onAiDiagnosisRequested}
                                            disabled={isRequestingAi}
                                            className="px-4 py-2 border border-neon-purple/50 bg-neon-purple/10 text-neon-purple text-[10px] font-black tracking-widest uppercase rounded hover:bg-neon-purple/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isRequestingAi ? (
                                                <span className="animate-pulse">✨ AI Diagnosing...</span>
                                            ) : (
                                                <span>🪄 Ask AI for Explanation</span>
                                            )}
                                        </button>
                                    )}
                                    {aiFeedback && (
                                        <div className="w-full text-left bg-black/40 border border-neon-purple/30 rounded-lg p-4 mt-2 shadow-[0_0_15px_rgba(var(--color-neon-purple),0.15)]">
                                            <div className="text-[10px] uppercase font-black text-neon-purple tracking-[0.3em] mb-2 flex items-center gap-2">
                                                🪄 Nexus AI Assistant
                                            </div>
                                            <div className="text-sm font-sans tracking-normal leading-relaxed text-white/90 break-words whitespace-pre-wrap">
                                                {/* Use a simple method to render inline latex if present but standard string is handled by react-katex?
                                                    Feedback might contain $$ $$ or \` \`. We'll just render it as raw string here or try to pass it to InlineMath for simple cases.
                                                    Actually, for robust markdown/math we'd use react-markdown, but we can just output text. */}
                                                {aiFeedback}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Layered Feedback Panel */}
            {currentQuest && feedbackLevel && feedbackAvailability && onShowHint && onShowSteps && onShowFull && (
                <LayeredFeedbackPanel
                    quest={currentQuest}
                    feedbackLevel={feedbackLevel}
                    feedbackAvailability={feedbackAvailability}
                    currentHint={currentHint ?? null}
                    onShowHint={onShowHint}
                    onShowSteps={onShowSteps}
                    onShowFull={onShowFull}
                    translations={{
                        view_hint: common.chamber_layout?.feedback?.view_hint ?? "VIEW HINT",
                        view_steps: common.chamber_layout?.feedback?.view_steps ?? "VIEW STEPS",
                        view_full_solution: common.chamber_layout?.feedback?.view_full_solution ?? "FULL SOLUTION",
                        hint_title: common.chamber_layout?.feedback?.hint_title ?? "HINT",
                        steps_title: common.chamber_layout?.feedback?.steps_title ?? "SOLUTION STEPS",
                        full_solution_title: common.chamber_layout?.feedback?.full_solution_title ?? "COMPLETE SOLUTION",
                        step_label: common.chamber_layout?.feedback?.step_label ?? "Step",
                    }}
                />
            )}
        </div>
    ) : null;

    const historyPanel = (
        <div className="space-y-6">
            {bestEntry && (
                <div className="border border-neon-green/30 bg-neon-green/5 rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black">{common.history_best}</div>
                    <div className="mt-2 text-sm font-black">{bestEntry.stageLabel}</div>
                    <div className="text-xs text-white/60 font-mono">{formatAccuracy(bestEntry.score)} · {formatTime(bestEntry.timestamp)}</div>
                </div>
            )}

            {moduleEntries.length === 0 && (
                <div className="text-sm text-white font-mono border border-white/10 rounded-xl p-6 text-center">
                    {common.history_empty}
                </div>
            )}

            <div className="space-y-3">
                {moduleEntries.map((entry) => (
                    <div key={entry.id} className="border border-white/10 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setExpandedId((prev) => prev === entry.id ? null : entry.id)}
                            className="w-full px-4 py-3 min-h-[44px] flex items-center justify-between text-left bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                        >
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{entry.stageLabel}</div>
                                <div className="text-xs text-white/60 font-mono">{formatAccuracy(entry.score)} · {entry.difficulty}</div>
                            </div>
                            <div className="text-xs text-white/90 font-mono">{formatTime(entry.timestamp)}</div>
                        </button>
                        {expandedId === entry.id && (
                            <div className="px-4 py-3 text-xs text-white/60 font-mono border-t border-white/10 space-y-1">
                                <div>{common.history_stage}: {entry.stage}</div>
                                <div>{common.history_accuracy}: {formatAccuracy(entry.score)}</div>
                                <div>{common.history_difficulty}: {entry.difficulty}</div>
                                <div>{common.history_time}: {formatTime(entry.timestamp)}</div>
                                <div>{common.history_speed}: {formatDuration(entry.durationMs)}</div>
                                <div>{common.history_rigor}: {entry.rigor ? "100%" : "0%"}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={clsx("chamber-root w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono", hasPrintContent && "has-print-content")}>
            <header className="relative p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl h-20">
                <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10 text-nowrap">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black tracking-[0.2em] uppercase">{translations.back}</span>
                </Link>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex flex-col items-center">
                    <ConceptIcon code={moduleCode} className="w-8 h-8 text-white mb-1" />
                    <div className="text-[10px] font-black tracking-[0.35em] uppercase text-white/60 text-nowrap">
                        {moduleCode}
                    </div>
                    <div className="text-lg font-black tracking-[0.25em] uppercase text-white shadow-neon text-nowrap">
                        {title}
                    </div>
                </div>

                <div className="flex items-center gap-4 z-10">
                    <button
                        onClick={() => setHistoryOpen((v) => !v)}
                        title={historyToggleLabel}
                        className={clsx(
                            "hidden md:inline-flex items-center justify-center min-h-[44px] min-w-[6.5rem] px-3 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap transition-all border",
                            historyOpen ? "border-white bg-white text-black" : "border-white/70 text-white hover:border-white/50"
                        )}
                    >
                        {historyToggleLabel}
                    </button>
                    {hasPrintSections && (
                        <div className="relative hidden md:block no-print">
                            <button
                                onClick={() => setPrintSelectorOpen((prev) => !prev)}
                                className={clsx(
                                    "inline-flex items-center justify-center min-h-[44px] px-3 py-1.5 text-[9px] font-black tracking-[0.2em] uppercase transition-all border",
                                    printSelectorOpen ? "border-white bg-white text-black" : "border-white/70 text-white hover:border-white/50"
                                )}
                                title={printLabels.selector}
                            >
                                {printLabels.selector}
                            </button>
                            {printSelectorOpen && (
                                <div className="absolute right-0 top-full mt-2 w-72 border border-white/20 bg-black/95 backdrop-blur z-[70] p-3 space-y-3 shadow-2xl">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-black">{printLabels.selected}: {selectedPrintSections.length}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedPrintSectionIds(printSections?.map((section) => section.id) ?? [])}
                                                className="min-h-[32px] px-2 border border-white/50 text-[9px] font-black tracking-[0.2em] uppercase hover:border-white/80"
                                            >
                                                {printLabels.all}
                                            </button>
                                            <button
                                                onClick={() => setSelectedPrintSectionIds([])}
                                                className="min-h-[32px] px-2 border border-white/30 text-[9px] font-black tracking-[0.2em] uppercase hover:border-white/60"
                                            >
                                                {printLabels.clear}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                                        {printSections?.map((section) => {
                                            const selected = selectedPrintSectionIds.includes(section.id);
                                            return (
                                                <button
                                                    key={section.id}
                                                    onClick={() => togglePrintSection(section.id)}
                                                    className={clsx(
                                                        "w-full min-h-[36px] px-3 border text-left text-[10px] font-black tracking-[0.15em] uppercase transition-all",
                                                        selected ? "border-white bg-white/10 text-white" : "border-white/25 text-white/70 hover:border-white/50"
                                                    )}
                                                >
                                                    {section.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <button
                        onClick={() => canPrint && window.print()}
                        disabled={!canPrint}
                        className={clsx(
                            "inline-flex items-center justify-center min-h-[44px] px-3 py-1.5 text-[9px] font-black tracking-[0.3em] uppercase transition-all border",
                            canPrint
                                ? "border-white/70 text-white hover:border-white/50"
                                : "border-white/20 text-white/30 cursor-not-allowed"
                        )}
                        title="Export as PDF / Print"
                    >
                        <Printer className="w-4 h-4" />
                    </button>

                    <div className="hidden md:flex items-center gap-1 no-print">
                        {(["BASIC", "CORE", "ADVANCED", "ELITE"] as const).map((d) => (
                            <button
                                key={d}
                                onClick={() => onDifficultyChange(d)}
                                className={clsx(
                                    "min-h-[44px] px-2 py-1 text-[9px] font-black tracking-[0.2em] uppercase transition-all border",
                                    difficulty === d
                                        ? "border-white bg-white text-black"
                                        : "border-white/70 text-white hover:border-white/50"
                                )}
                            >
                                {translations.difficulty[d.toLowerCase()]}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-4 bg-white/60 hidden md:block" />

                    <div className="flex items-center gap-2 no-print">
                        {(['DE', 'EN', 'CN'] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={clsx(
                                    "text-[10px] font-black w-6 h-6 flex items-center justify-center rounded transition-all border",
                                    currentLanguage === lang
                                        ? "bg-white text-black border-white"
                                        : "text-white border-white/70 hover:border-white/50"
                                )}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* PRINT ONLY HEADER */}
            <div className="hidden print:block mb-10 border-b-4 border-black pb-6 text-black">
                <div className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">{title}</div>
                <div className="text-xs font-mono opacity-70">{moduleCode}</div>
            </div>

            <div className="chamber-body flex-1 flex flex-col md:flex-row overflow-hidden relative">
                {/* 桌面端：可拖动布局 */}
                <div className="chamber-desktop hidden md:flex flex-1 overflow-hidden">
                    <ResizableLayout
                        moduleCode={moduleCode}
                        defaultLeftWidth={defaultLeftWidth}
                        minLeftWidth={minLeftWidth}
                        maxLeftWidth={maxLeftWidth}
                        leftContent={
                            <main className="h-full p-6 flex flex-col gap-4 bg-black overflow-y-auto items-center">
                                <div className="w-full max-w-5xl space-y-10">
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {stages.map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => onStageChange(s.id)}
                                                className={clsx(
                                                    "min-h-[44px] px-4 py-2 border text-[10px] font-black tracking-[0.25em] uppercase transition-all",
                                                    currentStage === s.id ? "border-white bg-white text-black" : "border-white/70 text-white hover:border-white/50"
                                                )}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Pathway Connection Alert */}
                                    {prerequisites.length > 0 && (
                                        <HUDAlert
                                            type={allPrereqsMet ? "success" : "warning"}
                                            title={t("common.chamber_layout.pathway_connection")}
                                            className="max-w-2xl mx-auto"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[8px] font-mono opacity-60">
                                                    {allPrereqsMet ? t("quest.link_stable") : t("quest.prereq_required")}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {prerequisites.map((p, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <div className={clsx(
                                                            "w-2 h-2 rounded-full",
                                                            p.isCompleted ? "bg-neon-green shadow-[0_0_5px_green]" : "bg-white/20"
                                                        )} />
                                                        <span className={clsx(
                                                            "text-[10px] font-bold tracking-widest",
                                                            p.isCompleted ? "text-white" : "text-white/40"
                                                        )}>
                                                            {p.moduleCode}
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="h-px flex-1 bg-white/10" />
                                                <div className="w-4 h-4 border border-white/20 rounded flex items-center justify-center text-[8px] font-mono">
                                                    {moduleCode}
                                                </div>
                                            </div>
                                            {!allPrereqsMet && (
                                                <p className="text-[10px] text-white/60 leading-relaxed italic mt-2">
                                                    {t("common.prereq_recommendation", { modules: missingPrereqLabel })}
                                                </p>
                                            )}
                                        </HUDAlert>
                                    )}

                                    {adaptiveRecommendation && adaptiveRecommendation.recommendedDifficulty !== difficulty && (
                                        <HUDAlert
                                            type="info"
                                            title={t("common.ai_recommendation_title")}
                                            className="mb-6 border-cyan-500/50 bg-cyan-500/5"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <div className="text-[11px] font-bold text-cyan-300">
                                                    {t("common.ai_recommendation_switch_to", { difficulty: getDifficultyLabel(adaptiveRecommendation.recommendedDifficulty) })}
                                                </div>
                                                <div className="text-[9px] text-white/60">
                                                    {getRecommendationReason(adaptiveRecommendation.reason)}
                                                </div>
                                                <button
                                                    onClick={() => onDifficultyChange(adaptiveRecommendation.recommendedDifficulty as Difficulty)}
                                                    className="mt-2 self-start px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 text-cyan-300 text-[9px] font-black uppercase tracking-widest rounded"
                                                >
                                                    {t("common.ai_recommendation_apply")}
                                                </button>
                                            </div>
                                        </HUDAlert>
                                    )}

                                    {children}

                                    {actionPanel && (
                                        <div>
                                            {actionPanel}
                                        </div>
                                    )}
                                </div>
                            </main>
                        }
                        rightContent={
                            <aside className="h-full relative bg-black flex flex-col">
                                <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white font-black flex justify-between items-center">
                                    <span>{translations.monitor_title || "SYSTEM MONITOR"}</span>
                                    <div className="flex gap-2">
                                        <div className="w-1 h-1 bg-white" />
                                        <div className="w-1 h-1 bg-white/40" />
                                    </div>
                                </div>
                                <div className="flex-1 p-6 overflow-y-auto">
                                    <div className="border-2 border-white/10 rounded-xl p-6 bg-white/[0.02] min-h-full flex flex-col gap-6">
                                        {monitorContent}
                                    </div>
                                </div>
                            </aside>
                        }
                    />
                </div>

                {/* 移动端：原有布局 */}
                <main className="chamber-mobile-main flex-1 md:hidden p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center">
                    <div className="w-full max-w-5xl space-y-10">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {stages.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => onStageChange(s.id)}
                                    className={clsx(
                                        "min-h-[44px] px-4 py-2 border text-[10px] font-black tracking-[0.25em] uppercase transition-all",
                                        currentStage === s.id ? "border-white bg-white text-black" : "border-white/70 text-white hover:border-white/50"
                                    )}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Pathway Connection Alert (Mobile) */}
                        {prerequisites.length > 0 && (
                            <HUDAlert
                                type={allPrereqsMet ? "success" : "warning"}
                                title={t("common.chamber_layout.pathway_connection")}
                                className="opacity-60"
                            >
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    {prerequisites.map((p, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5">
                                            <div className={clsx("w-1.5 h-1.5 rounded-full", p.isCompleted ? "bg-neon-green" : "bg-white/20")} />
                                            <span className={clsx("text-[9px] font-bold", p.isCompleted ? "text-white" : "text-white/40")}>
                                                {p.moduleCode}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </HUDAlert>
                        )}

                        {children}

                        {actionPanel && (
                            <div>
                                {actionPanel}
                            </div>
                        )}
                    </div>
                </main>

                <aside className="w-full md:hidden relative bg-black flex flex-col border-t border-white/10">
                    <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                        {(["controls", "monitor", "history"] as const).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActivePanel(key)}
                                className={clsx(
                                    "min-h-[44px] px-3 text-[9px] font-black tracking-[0.3em] uppercase transition-all border flex-1",
                                    activePanel === key
                                        ? "border-white bg-white text-black"
                                        : "border-white/70 text-white hover:border-white/50"
                                )}
                            >
                                {panelLabels[key]}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {activePanel === "controls" && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {(["BASIC", "CORE", "ADVANCED", "ELITE"] as const).map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => onDifficultyChange(d)}
                                            className={clsx(
                                                "min-h-[44px] px-3 py-2 text-[9px] font-black tracking-[0.2em] uppercase transition-all border",
                                                difficulty === d
                                                    ? "border-white bg-white text-black"
                                                    : "border-white/70 text-white hover:border-white/50"
                                            )}
                                        >
                                            {translations.difficulty[d.toLowerCase()]}
                                        </button>
                                    ))}
                                </div>
                                {actionPanel}
                            </div>
                        )}
                        {activePanel === "monitor" && (
                            <div className="border-2 border-white/10 rounded-xl p-5 bg-white/[0.02] min-h-[200px] flex flex-col gap-6">
                                {monitorContent}
                            </div>
                        )}
                        {activePanel === "history" && historyPanel}
                    </div>
                </aside>
            </div>

            <AnimatePresence>
                {historyOpen && (
                    <motion.aside
                        initial={{ x: 420, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 420, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-black border-l border-white/10 z-[60] flex flex-col"
                    >
                        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
                            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{common.history_title}</div>
                            <button
                                onClick={() => setHistoryOpen(false)}
                                className="w-8 h-8 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/60 hover:border-white/50 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {historyPanel}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            <CoopPanel lastCheckCorrect={checkStatus ? checkStatus.ok : null} />

            <div className="print-questlist-wrapper hidden">
                {printContent}
                {hasPrintSections && selectedPrintSections.map((section) => (
                    <section key={section.id} className="print-section">
                        {section.content}
                    </section>
                ))}
            </div>

            {checkStatus && (
                <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-end tracking-[0.4em] text-white/80 uppercase">
                    <span className="flex items-center gap-2">
                        <Sigma className="w-3 h-3 text-white" />
                        {checkStatus.ok ? translations.correct : translations.incorrect}
                    </span>
                </footer>
            )}

            <style jsx global>{`
                @media print {
                    header, footer, nav, button, .no-print, [role="button"], .fixed, .absolute, aside, .hud-overlay {
                        display: none !important;
                    }
                    html, body {
                        background: white !important;
                        color: black !important;
                    }
                    .chamber-root {
                        display: block !important;
                        height: auto !important;
                        min-height: auto !important;
                        overflow: visible !important;
                        background: white !important;
                        color: black !important;
                    }
                    .chamber-body,
                    .chamber-desktop,
                    .chamber-mobile-main {
                        height: auto !important;
                        min-height: auto !important;
                        overflow: visible !important;
                        display: block !important;
                    }
                    main, .print-content {
                        display: block !important;
                        position: static !important;
                        width: 100% !important;
                        height: auto !important;
                        overflow: visible !important;
                        background: white !important;
                        color: black !important;
                        padding: 2rem !important;
                    }
                    .print-questlist-wrapper {
                        display: none !important;
                        padding: 1rem 2rem 2rem !important;
                        color: black !important;
                        background: white !important;
                    }
                    .print-section {
                        break-after: page;
                        page-break-after: always;
                    }
                    .print-section:last-child {
                        break-after: auto;
                        page-break-after: auto;
                    }
                    .has-print-content .chamber-body {
                        display: none !important;
                    }
                    .has-print-content .print-questlist-wrapper {
                        display: block !important;
                    }
                    .katex {
                        font-size: 1.4em !important;
                        color: black !important;
                    }
                    * {
                        box-shadow: none !important;
                        text-shadow: none !important;
                        background: transparent !important;
                        border-color: black !important;
                    }
                    input {
                        border: 1px solid black !important;
                        background: white !important;
                    }
                }
            `}</style>
        </div>
    );
}
