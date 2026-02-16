"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GeneticsLab from "@/components/chamber/sb2-03/GeneticsLab";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "MONOHYBRID" | "PROBABILITY" | "DIHYBRID";
type Genotype = "RR" | "Rr" | "rr";

interface SB203Quest extends Quest {
    stage: Stage;
    p1: Genotype;
    p2: Genotype;
}

export default function SB203Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [p1, setP1] = useState<Genotype>("Rr");
    const [p2, setP2] = useState<Genotype>("Rr");

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB203Quest[] => {
        const quests: SB203Quest[] = [];

        if (stage === "MONOHYBRID") {
            quests.push(
                {
                    id: "M-1", difficulty, stage, p1: "Rr", p2: "Rr",
                    promptLatex: t("sb2_03.prompts.monohybrid_ratio", { p1: "Rr", p2: "Rr" }),
                    expressionLatex: t("sb2_03.prompts.ratio_target"), targetLatex: "3:1",
                    slots: [{ id: "ans", labelLatex: "\\text{Ratio}", placeholder: "X:Y", expected: "3:1" }],
                    correctLatex: "3:1", hintLatex: [t("sb2_03.prompts.hint_square")]
                },
                {
                    id: "M-2", difficulty, stage, p1: "RR", p2: "rr",
                    promptLatex: t("sb2_03.prompts.monohybrid_percent", { p1: "RR", p2: "rr" }),
                    expressionLatex: t("sb2_03.prompts.percent_target"), targetLatex: "100\\%",
                    slots: [{ id: "ans", labelLatex: "\\text{Percentage}", placeholder: "X%", expected: "100%" }],
                    correctLatex: "100%", hintLatex: [t("sb2_03.prompts.hint_all_rr")]
                }
            );
        }

        if (stage === "PROBABILITY") {
            quests.push(
                {
                    id: "P-1", difficulty, stage, p1: "Rr", p2: "Rr",
                    promptLatex: t("sb2_03.prompts.prob_genotype", { p1: "Rr", p2: "Rr", genotype: "rr" }),
                    expressionLatex: t("sb2_03.prompts.prob_target", { genotype: "rr" }), targetLatex: "0.25",
                    slots: [{ id: "ans", labelLatex: "P", placeholder: "0.XX", expected: "0.25" }],
                    correctLatex: "0.25", hintLatex: [t("sb2_03.prompts.hint_count", { count: 1 })]
                }
            );
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
    } = useQuestManager<SB203Quest, Stage>({
        buildPool,
        initialStage: "MONOHYBRID",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb2-03", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "MONOHYBRID" as Stage, label: t("sb2_03.stages.monohybrid") },
        { id: "PROBABILITY" as Stage, label: t("sb2_03.stages.probability") },
        { id: "DIHYBRID" as Stage, label: t("sb2_03.stages.dihybrid") },
    ], [t]);

    useEffect(() => {
        if (currentQuest) {
            setP1(currentQuest.p1);
            setP2(currentQuest.p2);
        }
    }, [currentQuest]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB2.03"
            title={t("sb2_03.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb2_03.footer_left")}
            translations={{
                back: t("sb2_03.back"),
                check: t("sb2_03.check"),
                next: t("sb2_03.next"),
                correct: t("sb2_03.correct"),
                incorrect: t("sb2_03.incorrect"),
                ready: t("sb2_03.ready"),
                monitor_title: t("sb2_03.monitor_title"),
                difficulty: {
                    basic: t("sb2_03.difficulty.basic"),
                    core: t("sb2_03.difficulty.core"),
                    advanced: t("sb2_03.difficulty.advanced"),
                    elite: t("sb2_03.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <GeneticsLab
                        parent1={p1}
                        parent2={p2}
                        onParent1Change={(gen) => setP1(gen as Genotype)}
                        onParent2Change={(gen) => setP2(gen as Genotype)}
                        translations={t("sb2_03")}
                    />
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t("sb2_03.labels.analysis")}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-neon-cyan shadow-[0_0_5px_cyan]" : "bg-transparent"
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
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                    <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic mb-4">
                        {t("sb2_03.objective_title")}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed font-medium">
                        {t(`sb2_03.scenarios.${stage.toLowerCase()}` as any)}
                    </p>
                </div>

                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                                {t("sb2_03.labels.analysis")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sb2_03.labels.prediction")}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    {t("sb2_03.labels.instructions")} [Gene-Sequencer]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">GENE_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/20 transition-all blur-sm" />
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
                                                    <div className="font-black text-lg tracking-widest uppercase italic">
                                                        {lastCheck.ok ? t("sb2_03.results.valid") : t("sb2_03.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb2_03.results.valid_desc") : t("sb2_03.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("sb2_03.labels.hint")}:</span>
                                                    <div className="text-white font-bold">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    {t("sb2_03.results.next")}
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
