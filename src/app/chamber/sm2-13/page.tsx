"use client";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Stage, SM213Quest, buildStagePool } from "@/lib/sm2-13-quest-data";
import { createSM213FeedbackProvider } from "@/lib/sm2-13/provider";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import clsx from "clsx";
import { HelpCircle } from "lucide-react";
import { renderMixedText } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";

type MonitorPoint = { x: number; y: number };

function extractPoint(latex: string | undefined, pattern: RegExp): MonitorPoint | null {
    if (!latex) return null;
    const match = latex.match(pattern);
    if (!match) return null;
    const x = Number(match[1]);
    const y = Number(match[2]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    return { x, y };
}

function TransformationMonitor({
    quest,
    checkStatus,
    labels,
}: {
    quest: SM213Quest | null;
    checkStatus: { ok: boolean; correct: string } | null;
    labels: {
        original_point: string;
        transformed_point: string;
        monitor_verify_to_reveal: string;
        monitor_no_point_data: string;
    };
}) {
    if (!quest) {
        return <div className="text-xs text-white/50">{labels.monitor_no_point_data}</div>;
    }

    const original = extractPoint(quest.promptLatex, /P\((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)/);
    const transformed = extractPoint(quest.correctLatex, /P'\((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)/);
    const showTransformed = !!checkStatus?.ok && !!transformed;

    const size = 240;
    const center = size / 2;
    const unit = 10;
    const toCanvas = (v: number) => center + v * unit;
    const toCanvasY = (v: number) => center - v * unit;

    return (
        <div className="space-y-4">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="w-full rounded-lg border border-white/10 bg-black/60">
                {Array.from({ length: 25 }).map((_, i) => {
                    const pos = i * 10;
                    return (
                        <g key={i}>
                            <line x1={pos} y1={0} x2={pos} y2={size} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
                            <line x1={0} y1={pos} x2={size} y2={pos} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
                        </g>
                    );
                })}
                <line x1={0} y1={center} x2={size} y2={center} stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} />
                <line x1={center} y1={0} x2={center} y2={size} stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} />

                {original && (
                    <g>
                        <circle cx={toCanvas(original.x)} cy={toCanvasY(original.y)} r={5} fill="#22d3ee" />
                        <text x={toCanvas(original.x) + 8} y={toCanvasY(original.y) - 8} fill="#67e8f9" fontSize={10}>
                            P
                        </text>
                    </g>
                )}
                {showTransformed && transformed && (
                    <g>
                        <circle cx={toCanvas(transformed.x)} cy={toCanvasY(transformed.y)} r={5} fill="#f59e0b" />
                        <text x={toCanvas(transformed.x) + 8} y={toCanvasY(transformed.y) - 8} fill="#fcd34d" fontSize={10}>
                            P&apos;
                        </text>
                    </g>
                )}
            </svg>

            <div className="space-y-2 text-xs font-mono text-white/70">
                <div className="flex items-center justify-between border border-white/10 rounded px-2 py-1 bg-white/[0.02]">
                    <span className="text-cyan-300">{labels.original_point}</span>
                    <span>{original ? `(${original.x}, ${original.y})` : "--"}</span>
                </div>
                <div className="flex items-center justify-between border border-white/10 rounded px-2 py-1 bg-white/[0.02]">
                    <span className="text-amber-300">{labels.transformed_point}</span>
                    <span>
                        {showTransformed && transformed ? `(${transformed.x}, ${transformed.y})` : labels.monitor_verify_to_reveal}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function SM213Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const feedbackContentProvider = React.useMemo(() => createSM213FeedbackProvider(t), [t]);

    const sm2_13_t = React.useMemo(() => ({
        title: t("sm2_13.title"),
        moduleCode: t("sm2_13.module_code"),
        stages: {
            reflection: t("sm2_13.stages.reflection"),
            translation: t("sm2_13.stages.translation"),
            rotation: t("sm2_13.stages.rotation"),
            composition: t("sm2_13.stages.composition")
        },
            translations: {
                back: t("sm2_13.back"),
                check: t("sm2_13.check"),
                next: t("sm2_13.next"),
                correct: t("sm2_13.correct"),
                incorrect: t("sm2_13.incorrect"),
                monitor_title: t("sm2_13.monitor_title"),
                difficulty: {
                    basic: t("sm2_13.difficulty.basic"),
                    core: t("sm2_13.difficulty.core"),
                    advanced: t("sm2_13.difficulty.advanced"),
                    elite: t("sm2_13.difficulty.elite")
            }
        },
            labels: {
                context: t("sm2_13.labels.context"),
                answer_confirmed: t("sm2_13.labels.answer_confirmed"),
                hint: t("sm2_13.labels.hint"),
                loading_data: t("sm2_13.labels.loading_data"),
                transformation_matrix: t("sm2_13.labels.transformation_matrix"),
                reflection: t("sm2_13.labels.reflection"),
                translation: t("sm2_13.labels.translation"),
                rotation_origin: t("sm2_13.labels.rotation_origin"),
                sequence_progress: t("sm2_13.labels.sequence_progress"),
                x_axis: t("sm2_13.labels.x_axis"),
                y_axis: t("sm2_13.labels.y_axis"),
                degree_90: t("sm2_13.labels.degree_90"),
                degree_180: t("sm2_13.labels.degree_180"),
                original_point: t("sm2_13.labels.original_point"),
                transformed_point: t("sm2_13.labels.transformed_point"),
                monitor_verify_to_reveal: t("sm2_13.labels.monitor_verify_to_reveal"),
                monitor_no_point_data: t("sm2_13.labels.monitor_no_point_data"),
            }
        }), [t]);

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        nonce,
        progress,
        canPrevious,
        canNext,
        getHint,
        setInputs,
        verify,
        next,
        previous,
        handleDifficultyChange,
        handleStageChange,
        feedbackLevel,
        feedbackContent,
        feedbackAvailability,
        showHintLevel,
        showStepsLevel,
        showFullSolution,
        policy,
    } = useQuestManager<SM213Quest, Stage>({
        moduleCode: "SM2.13",
        buildPool: (diff, s) => buildStagePool(diff, s, t),
        initialStage: "reflection",
        tolerance: 0.1,
        feedbackContentProvider,
    });

    // Mark stage complete when verified
    React.useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SM2.13", stage);
        }
    }, [lastCheck, stage, completeStage]);

    const hint = getHint();
    const stages = React.useMemo<{ id: Stage; label: string }[]>(() => [
        { id: "reflection", label: sm2_13_t.stages.reflection },
        { id: "translation", label: sm2_13_t.stages.translation },
        { id: "rotation", label: sm2_13_t.stages.rotation },
        { id: "composition", label: sm2_13_t.stages.composition }
    ], [sm2_13_t]);
    const difficultyLabelMap = React.useMemo<Record<Difficulty, string>>(() => ({
        BASIC: sm2_13_t.translations.difficulty.basic,
        CORE: sm2_13_t.translations.difficulty.core,
        ADVANCED: sm2_13_t.translations.difficulty.advanced,
        ELITE: sm2_13_t.translations.difficulty.elite,
    }), [sm2_13_t]);
    const printSections = React.useMemo(() => buildQuestPrintSections<SM213Quest, Stage>({
        moduleTitle: sm2_13_t.title,
        stages,
        difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
        difficultyLabels: difficultyLabelMap,
        buildPool: (diff, s) => buildStagePool(diff, s, t),
        showHints: true,
        maxHints: 1,
    }), [difficultyLabelMap, stages, sm2_13_t.title, t]);

    return (
        <ChamberLayout
            title={sm2_13_t.title}
            moduleCode={sm2_13_t.moduleCode}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            printSections={printSections}
            translations={sm2_13_t.translations}
            feedbackContent={feedbackContent}
            feedbackLevel={feedbackLevel}
            feedbackAvailability={feedbackAvailability}
            feedbackPolicy={policy}
            onShowHint={showHintLevel}
            onShowSteps={showStepsLevel}
            onShowFull={showFullSolution}
            monitorContent={
                <TransformationMonitor
                    quest={currentQuest}
                    checkStatus={lastCheck}
                    labels={{
                        original_point: sm2_13_t.labels.original_point,
                        transformed_point: sm2_13_t.labels.transformed_point,
                        monitor_verify_to_reveal: sm2_13_t.labels.monitor_verify_to_reveal,
                        monitor_no_point_data: sm2_13_t.labels.monitor_no_point_data,
                    }}
                />
            }
        >
            <div className="flex-1 flex flex-col h-full bg-black/40 backdrop-blur-sm overflow-y-auto">
                <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12 space-y-8 flex flex-col lg:flex-row gap-8">
                    {/* Left: Interactive Quest Area */}
                    <div className="flex-1 min-w-0">
                        {currentQuest ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuest.id + nonce}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] font-black tracking-widest text-amber-500 uppercase">
                                            {sm2_13_t.stages[stage]}
                                        </div>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>

                                    <div className="space-y-6">
                                        <div className="text-xl md:text-2xl font-bold leading-tight text-white/90">
                                            {renderMixedText(currentQuest.promptLatex || "")}
                                        </div>

                                        <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl relative group overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                                            <div className="text-xs font-black tracking-widest text-amber-500 uppercase mb-4 opacity-50">
                                                {sm2_13_t.labels.context}
                                            </div>
                                            <div className="text-lg font-mono text-white/60">
                                                <BlockMath math={currentQuest.expressionLatex} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex flex-wrap gap-4">
                                            {currentQuest.targetLatex && (
                                                <div className="flex items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 text-white mr-2">
                                                    <InlineMath math={currentQuest.targetLatex} />
                                                </div>
                                            )}
                                            {currentQuest.slots.map((slot) => (
                                                <div key={slot.id} className="space-y-2 flex-1 min-w-[120px]">
                                                    <div className="text-xs font-bold text-white/60 flex items-center gap-2">
                                                        <InlineMath math={slot.labelLatex} />
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={inputs[slot.id] || ""}
                                                            onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                            placeholder={slot.placeholder || ""}
                                                            disabled={lastCheck?.ok}
                                                            className={clsx(
                                                                "w-full bg-black/50 border border-white/20 px-4 py-3 rounded-lg text-lg font-mono focus:border-amber-500 focus:outline-none transition-all placeholder:text-white/20",
                                                                lastCheck?.ok === false && "border-red-500/50 bg-red-500/5",
                                                                lastCheck?.ok === true && "border-green-500/50 bg-green-500/5 text-green-400"
                                                            )}
                                                        />
                                                        {slot.unit && (
                                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-mono text-sm pointer-events-none">
                                                                <InlineMath math={slot.unit} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Solution / Result info if needed */}
                                    {lastCheck?.ok && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                            <div className="text-green-400 font-bold mb-2">{sm2_13_t.labels.answer_confirmed}</div>
                                            {currentQuest.correctLatex && <BlockMath math={currentQuest.correctLatex} />}
                                        </div>
                                    )}

                                    {hint && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mt-4"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <HelpCircle className="w-4 h-4 text-amber-500" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">{sm2_13_t.labels.hint}</span>
                                            </div>
                                            <div className="text-white/70 font-mono text-sm">
                                                <InlineMath math={hint} />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <div className="animate-pulse text-white/40 uppercase tracking-widest text-sm">{sm2_13_t.labels.loading_data}</div>
                            </div>
                        )}
                    </div>

                    {/* Right: Matrix Cheat Sheet */}
                    <div className="w-full lg:w-64 border border-amber-500/20 bg-black/60 backdrop-blur rounded-xl p-5 h-fit sticky top-6">
                        <h3 className="text-xs font-black tracking-[0.2em] text-amber-500 uppercase border-b border-amber-500/30 pb-3 mb-4">
                            {sm2_13_t.labels.transformation_matrix}
                        </h3>
                        <div className="text-sm font-mono text-white/70 space-y-6">
                            <div>
                                <div className="text-white/50 mb-1 tracking-wider uppercase text-[10px]">{sm2_13_t.labels.reflection}</div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                            <span>{sm2_13_t.labels.x_axis}</span>
                                            <InlineMath math="(x, -y)" />
                                        </div>
                                        <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                            <span>{sm2_13_t.labels.y_axis}</span>
                                            <InlineMath math="(-x, y)" />
                                        </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <InlineMath math="y = x" />
                                        <InlineMath math="(y, x)" />
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <InlineMath math="y = -x" />
                                        <InlineMath math="(-y, -x)" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="text-white/50 mb-1 tracking-wider uppercase text-[10px]">{sm2_13_t.labels.translation}</div>
                                <div className="bg-white/5 px-2 py-1 rounded">
                                    <InlineMath math="(x{+}dx, y{+}dy)" />
                                </div>
                            </div>
                            <div>
                                <div className="text-white/50 mb-1 tracking-wider uppercase text-[10px]">{sm2_13_t.labels.rotation_origin}</div>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <span>{`${sm2_13_t.labels.degree_90} ${t("sm2_13.labels.ccw")}`}</span>
                                        <InlineMath math="(-y, x)" />
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <span>{sm2_13_t.labels.degree_180}</span>
                                        <InlineMath math="(-x, -y)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Progress HUD */}
                <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-md">
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={previous}
                                disabled={!canPrevious}
                                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all text-white"
                            >
                                <span className="rotate-180">➜</span>
                            </button>
                            <button
                                onClick={next}
                                disabled={!canNext}
                                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all font-bold text-white"
                            >
                                ➜
                            </button>
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-[10px] font-black tracking-widest text-white/40 uppercase">
                                <span>{sm2_13_t.labels.sequence_progress}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-amber-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
