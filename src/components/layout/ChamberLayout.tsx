"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sigma, X } from "lucide-react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import ConceptIcon from "@/components/ConceptIcon";
import NotificationToast from "@/components/ui/NotificationToast";
import ResizableLayout from "@/components/layout/ResizableLayout";
import { useAppStore, type HistoryEntry } from "@/lib/store";
import { Difficulty } from "@/hooks/useQuestManager";
import { translations as i18n } from "@/lib/i18n";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import SuccessEureka from "@/components/shared/SuccessEureka";
import { MODULE_DEPENDENCIES } from "@/lib/curriculum/dependencies";
import HUDAlert from "@/components/shared/HUDAlert";

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
    footerLeft?: string;
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
        ready?: string;
        monitor_title?: string;
        difficulty: Record<string, string>;
    };
    adaptiveRecommendation?: {
        recommendedDifficulty: string;
        confidence: number;
        reason: string;
    } | null;
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
    footerLeft,
    checkStatus,
    onVerify,
    onNext,
    successRate,
    translations,
    adaptiveRecommendation
}: ChamberLayoutProps) {
    const { currentLanguage, setLanguage, history, addHistory } = useAppStore();
    const common = i18n[currentLanguage].common;
    const locale = currentLanguage === "CN" ? "zh-CN" : currentLanguage === "DE" ? "de-DE" : "en-US";
    const [historyOpen, setHistoryOpen] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<"controls" | "monitor" | "history">("controls");
    const prevOkRef = useRef(false);
    const stageStartRef = useRef(0);
    const hadFailureRef = useRef(false);
    const [showEureka, setShowEureka] = useState(false);

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

    // Check Prerequisites
    const prerequisites = useMemo(() => {
        const deps = MODULE_DEPENDENCIES[moduleCode] || [];
        return deps.map(dep => {
            const isCompleted = history.some(h => h.moduleCode === dep.moduleCode);
            return { ...dep, isCompleted };
        });
    }, [moduleCode, history]);

    const allPrereqsMet = useMemo(() => prerequisites.every(p => p.isCompleted), [prerequisites]);

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
            setShowEureka(true);
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

    const panelLabels =
        currentLanguage === "CN"
            ? { controls: "控制", monitor: "描述", history: "历史" }
            : currentLanguage === "DE"
                ? { controls: "STEUERUNG", monitor: "BESCHREIBUNG", history: "VERLAUF" }
                : { controls: "CONTROL", monitor: "MONITOR", history: "HISTORY" };

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
                        <div className="text-white/70 font-black break-words max-w-lg mx-auto p-3 bg-white/[0.03] rounded border border-white/5">
                            <InlineMath math={checkStatus.correct} />
                        </div>
                    )}
                </div>
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
        <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
            <header className="relative p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl h-20">
                <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10 text-nowrap">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black tracking-[0.2em] uppercase">{translations.back}</span>
                </Link>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex flex-col items-center">
                    <ConceptIcon code={moduleCode} className="w-8 h-8 text-white mb-1" />
                    <div className="text-lg font-black tracking-[0.25em] uppercase text-white shadow-neon text-nowrap">
                        {title}
                    </div>
                </div>

                <div className="flex items-center gap-4 z-10">
                    <button
                        onClick={() => setHistoryOpen((v) => !v)}
                        className={clsx(
                            "hidden md:inline-flex items-center justify-center min-h-[44px] px-3 py-1.5 text-[9px] font-black tracking-[0.3em] uppercase transition-all border",
                            historyOpen ? "border-white bg-white text-black" : "border-white/70 text-white hover:border-white/50"
                        )}
                    >
                        {common.history_toggle}
                    </button>

                    <div className="hidden md:flex items-center gap-1">
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

                    <div className="flex items-center gap-2">
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

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                {/* 桌面端：可拖动布局 */}
                <div className="hidden md:flex flex-1 overflow-hidden">
                    <ResizableLayout
                        moduleCode={moduleCode}
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
                                            title={currentLanguage === "CN" ? "路径依赖" : currentLanguage === "DE" ? "PFAD-VERBINDUNG" : "PATHWAY_CONNECTION"}
                                            className="max-w-2xl mx-auto"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[8px] font-mono opacity-60">
                                                    {allPrereqsMet ? "LINK_STABLE" : "PREREQUISITE_REQUIRED"}
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
                                                    {currentLanguage === "CN"
                                                        ? `建议先完成 ${prerequisites.filter(p => !p.isCompleted).map(p => p.moduleCode).join(", ")} 以获得最佳学习体验。`
                                                        : currentLanguage === "DE"
                                                            ? `Empfehlung: Schließen Sie ${prerequisites.filter(p => !p.isCompleted).map(p => p.moduleCode).join(", ")} zuerst ab.`
                                                            : `Recommended: Complete ${prerequisites.filter(p => !p.isCompleted).map(p => p.moduleCode).join(", ")} first for the optimal experience.`
                                                    }
                                                </p>
                                            )}
                                        </HUDAlert>
                                    )}

                                    {adaptiveRecommendation && adaptiveRecommendation.recommendedDifficulty !== difficulty && (
                                        <HUDAlert
                                            type="info"
                                            title={currentLanguage === "CN" ? "AI 难度建议" : currentLanguage === "DE" ? "AI-SCHWIERIGKEITSEMPFEHLUNG" : "AI DIFFICULTY ADAPTATION"}
                                            className="mb-6 border-cyan-500/50 bg-cyan-500/5"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <div className="text-[11px] font-bold text-cyan-300">
                                                    {currentLanguage === "CN" ? "推荐切换至" : currentLanguage === "DE" ? "Empfohlen:" : "Recommended:"} {adaptiveRecommendation.recommendedDifficulty}
                                                </div>
                                                <div className="text-[9px] text-white/60">
                                                    {adaptiveRecommendation.reason === 'HIGH_ACCURACY_DETECTED' && (currentLanguage === "CN" ? "检测到极高正确率，您可以尝试更高难度。" : "High accuracy detected. Challenge yourself with a higher level.")}
                                                    {adaptiveRecommendation.reason === 'MASTERY_DETECTED' && (currentLanguage === "CN" ? "已精通当前级别，建议进阶。" : "Mastery detected. Time to move up.")}
                                                    {adaptiveRecommendation.reason === 'REMEDIATION_REQUIRED' && (currentLanguage === "CN" ? "检测到挑战较大，建议先巩固基础。" : "Multiple errors detected. Let's build a stronger foundation first.")}
                                                    {adaptiveRecommendation.reason === 'STABLE_PERFORMANCE' && (currentLanguage === "CN" ? "表现稳定，可以根据需要调整。" : "Performance is stable. Adjust as you feel comfortable.") || adaptiveRecommendation.reason}
                                                </div>
                                                <button
                                                    onClick={() => onDifficultyChange(adaptiveRecommendation.recommendedDifficulty as Difficulty)}
                                                    className="mt-2 self-start px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 text-cyan-300 text-[9px] font-black uppercase tracking-widest rounded"
                                                >
                                                    {currentLanguage === "CN" ? "应用建议" : currentLanguage === "DE" ? "ÜBERNEHMEN" : "APPLY"}
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
                <main className="flex-1 md:hidden p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center">
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
                                title={currentLanguage === "CN" ? "路径依赖" : currentLanguage === "DE" ? "PFAD-VERBINDUNG" : "PATHWAY_CONNECTION"}
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


            <SuccessEureka show={showEureka} onComplete={() => setShowEureka(false)} />

            <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
                <span>{footerLeft}</span>
                <span className="flex items-center gap-2">
                    <Sigma className="w-3 h-3 text-white" />
                    {checkStatus ? (checkStatus.ok ? translations.correct : translations.incorrect) : (translations.ready || "SYSTEM READY")}
                </span>
            </footer>
        </div>
    );
}
