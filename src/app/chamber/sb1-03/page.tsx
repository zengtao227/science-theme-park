"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CellDivisionVisualization from "@/components/chamber/sb1-03/CellDivisionVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "MITOSIS" | "MEIOSIS_I" | "MEIOSIS_II";

interface SB103Quest extends Quest {
    stage: Stage;
    phase: string;
    chromosomeCount: number;
}

export default function SB103Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB103Quest[] => {
        const quests: SB103Quest[] = [];
        const isAdvanced = difficulty === "ADVANCED" || difficulty === "ELITE";

        if (stage === "MITOSIS") {
            const scenarios = [
                { phase: "Prophase", chromatids: 46, answer: "46" },
                { phase: "Metaphase", chromatids: 46, answer: "46" },
                { phase: "Anaphase", chromatids: 92, answer: "92" },
                { phase: "Telophase", chromatids: 46, answer: "46" }
            ];

            const filtered = isAdvanced ? scenarios : scenarios.slice(0, 2);

            filtered.forEach((item, idx) => {
                quests.push({
                    id: `MIT-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    phase: item.phase,
                    chromosomeCount: item.chromatids,
                    promptLatex: t("sb1_03.prompts.mitosis_count", { phase: item.phase }),
                    expressionLatex: `\\text{${item.phase}} \\rightarrow \\text{Chromatids} = ?`,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\text{Count}", placeholder: "0", expected: item.answer }],
                    correctLatex: `${item.answer}\\text{ chromatids}`,
                    hintLatex: [t("sb1_03.prompts.hint_mitosis")]
                });
            });
        }

        if (stage === "MEIOSIS_I") {
            const scenarios = isAdvanced ? [
                { phase: "Prophase I", pairs: 23, answer: "23" },
                { phase: "Metaphase I", pairs: 23, answer: "23" },
                { phase: "Anaphase I", chromosomes: 46, answer: "46" },
                { phase: "Telophase I", chromosomes: 23, answer: "23" }
            ] : [
                { phase: "Prophase I", pairs: 23, answer: "23" },
                { phase: "Anaphase I", chromosomes: 46, answer: "46" }
            ];

            scenarios.forEach((item, idx) => {
                quests.push({
                    id: `MEI1-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    phase: item.phase,
                    chromosomeCount: item.pairs || item.chromosomes || 23,
                    promptLatex: t("sb1_03.prompts.meiosis_i_count", { phase: item.phase }),
                    expressionLatex: `\\text{${item.phase}} \\rightarrow ?`,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\text{Count}", placeholder: "0", expected: item.answer }],
                    correctLatex: `${item.answer}`,
                    hintLatex: [t("sb1_03.prompts.hint_meiosis_i")]
                });
            });
        }

        if (stage === "MEIOSIS_II") {
            const scenarios = isAdvanced ? [
                { phase: "Prophase II", chromosomes: 23, answer: "23" },
                { phase: "Metaphase II", chromosomes: 23, answer: "23" },
                { phase: "Anaphase II", chromatids: 46, answer: "46" },
                { phase: "Telophase II", chromosomes: 23, answer: "23" }
            ] : [
                { phase: "Metaphase II", chromosomes: 23, answer: "23" },
                { phase: "Telophase II", chromosomes: 23, answer: "23" }
            ];

            scenarios.forEach((item, idx) => {
                quests.push({
                    id: `MEI2-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    phase: item.phase,
                    chromosomeCount: item.chromosomes || item.chromatids || 23,
                    promptLatex: t("sb1_03.prompts.meiosis_ii_count", { phase: item.phase }),
                    expressionLatex: `\\text{${item.phase}} \\rightarrow ?`,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\text{Count}", placeholder: "0", expected: item.answer }],
                    correctLatex: `${item.answer}`,
                    hintLatex: [t("sb1_03.prompts.hint_meiosis_ii")]
                });
            });
        }

        return quests;
    }, [t]);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

    const {
        currentQuest,
        difficulty,
        stage,
        lastCheck,
        inputs,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        getHint,
        currentStageStats,
    } = useQuestManager<SB103Quest, Stage>({
        buildPool,
        initialStage: "MITOSIS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb1-03", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "MITOSIS" as Stage, label: t("sb1_03.stages.mitosis") },
        { id: "MEIOSIS_I" as Stage, label: t("sb1_03.stages.meiosis_i") },
        { id: "MEIOSIS_II" as Stage, label: t("sb1_03.stages.meiosis_ii") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB1.03"
            title={t("sb1_03.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb1_03.footer_left")}
            translations={{
                back: t("sb1_03.back"),
                check: t("sb1_03.check"),
                next: t("sb1_03.next"),
                correct: t("sb1_03.correct"),
                incorrect: t("sb1_03.incorrect"),
                ready: t("sb1_03.ready"),
                monitor_title: t("sb1_03.monitor_title"),
                difficulty: {
                    basic: t("sb1_03.difficulty.basic"),
                    core: t("sb1_03.difficulty.core"),
                    advanced: t("sb1_03.difficulty.advanced"),
                    elite: t("sb1_03.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <CellDivisionVisualization
                        quest={currentQuest}
                        stage={stage}
                        translations={t("sb1_03")}
                    />
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between font-black">
                            <span>{t("sb1_03.labels.analysis")}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-neon-emerald shadow-[0_0_5px_#10b981]" : "bg-transparent"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {/* Scenario Description */}
                {currentQuest && (
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                        <h3 className="text-[10px] text-neon-emerald uppercase tracking-[0.5em] font-black italic mb-4">
                            {t("sb1_03.objective_title")}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed font-medium">
                            {t(`sb1_03.scenarios.${stage.toLowerCase()}` as any)}
                        </p>
                    </div>
                )}

                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-emerald uppercase tracking-[0.5em] font-black italic">
                                {t("sb1_03.labels.phase_analysis")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto drop-shadow-sm">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-emerald-500/[0.03] border-2 border-emerald-500/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sb1_03.labels.chromosome_count")}
                                </span>
                                <div className="text-3xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-emerald font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-emerald-500/30" />
                                    {t("sb1_03.labels.analysis")} [Cell-Tracker]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-emerald-500/30 font-mono">CELL_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-emerald-500/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500/0 group-focus-within:bg-emerald-500/20 transition-all blur-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {lastCheck && (
                                        <motion.div
                                            key={lastCheck.ok ? "correct" : "incorrect"}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${lastCheck.ok
                                                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                                                    }`}>
                                                    {lastCheck.ok ? "✓" : "✗"}
                                                </div>
                                                <div>
                                                    <div className="font-black text-lg tracking-widest uppercase italic leading-none mb-1">
                                                        {lastCheck.ok ? t("sb1_03.results.valid") : t("sb1_03.results.invalid")}
                                                    </div>
                                                    <div className="text-xs font-bold opacity-70">
                                                        {lastCheck.ok ? t("sb1_03.results.valid_desc") : t("sb1_03.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("sb1_03.labels.hint")}:</span>
                                                    <div className="text-white font-bold text-sm">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-[10px] font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    {t("sb1_03.results.next")}
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ChamberLayout>
    );
}
