"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MetabolicCell from "@/components/chamber/sb1-01/MetabolicCell";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "OSMOSIS" | "RESPIRATION" | "HOMEOSTASIS";

interface MetabolicQuest extends Quest {
    stage: Stage;
    targetOsmolarity?: number;
    statusKey?: "hypertonic" | "hypotonic" | "isotonic";
}

export default function SB101MetabolicPage() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const [osmolarity, setOsmolarity] = useState(0);
    const [showATP, setShowATP] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): MetabolicQuest[] => {
        const quests: MetabolicQuest[] = [];

        if (stage === "OSMOSIS") {
            const scenarios: { status: "hypertonic" | "hypotonic" | "isotonic", target: string, hint: string }[] = [
                { status: "hypertonic", target: "leave", hint: t("sb1_01_metabolic.prompts.hint_hyper") },
                { status: "hypotonic", target: "enter", hint: t("sb1_01_metabolic.prompts.hint_hypo") },
                { status: "isotonic", target: "stable", hint: `\\text{${t("sb1_01_metabolic.prompts.hint_iso")}}` }
            ];

            scenarios.forEach((s, idx) => {
                const statusLabel = t(`sb1_01_metabolic.labels.${s.status}`);
                quests.push({
                    id: `O-${idx}`, difficulty, stage, statusKey: s.status,
                    promptLatex: t("sb1_01_metabolic.prompts.osmosis_prompt", { status: statusLabel }),
                    expressionLatex: t("sb1_01_metabolic.prompts.osmosis_target"),
                    targetLatex: s.target,
                    slots: [{ id: "ans", labelLatex: "\\text{Water Flow}", placeholder: "enter/leave/stable", expected: s.target }],
                    correctLatex: s.target,
                    hintLatex: [s.hint]
                });
            });
        }

        if (stage === "RESPIRATION") {
            quests.push({
                id: "R-1", difficulty, stage,
                promptLatex: t("sb1_01_metabolic.prompts.respiration_prompt"),
                expressionLatex: "C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + ?",
                targetLatex: "ATP",
                slots: [{ id: "ans", labelLatex: "\\text{Energy}", placeholder: "ATP", expected: "ATP" }],
                correctLatex: "ATP",
                hintLatex: [t("sb1_01_metabolic.prompts.hint_atp")]
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
    } = useQuestManager<MetabolicQuest, Stage>({
        buildPool,
        initialStage: "OSMOSIS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb1-01-metabolic", stage);
        }
    }, [lastCheck, completeStage, stage]);

    useEffect(() => {
        if (currentQuest?.statusKey === "hypertonic") setOsmolarity(0.8);
        else if (currentQuest?.statusKey === "hypotonic") setOsmolarity(0.2);
        else setOsmolarity(0.5);
    }, [currentQuest]);

    const stagesProps = useMemo(() => [
        { id: "OSMOSIS" as Stage, label: t("sb1_01_metabolic.stages.osmosis") },
        { id: "RESPIRATION" as Stage, label: t("sb1_01_metabolic.stages.respiration") },
        { id: "HOMEOSTASIS" as Stage, label: t("sb1_01_metabolic.stages.homeostasis") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB1.01"
            title={t("sb1_01_metabolic.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb1_01_metabolic.footer_left")}
            translations={{
                back: t("sb1_01_metabolic.back"),
                check: t("sb1_01_metabolic.check"),
                next: t("sb1_01_metabolic.next"),
                correct: t("sb1_01_metabolic.correct"),
                incorrect: t("sb1_01_metabolic.incorrect"),
                ready: t("sb1_01_metabolic.ready"),
                monitor_title: t("sb1_01_metabolic.monitor_title"),
                difficulty: {
                    basic: t("sb1_01_metabolic.difficulty.basic"),
                    core: t("sb1_01_metabolic.difficulty.core"),
                    advanced: t("sb1_01_metabolic.difficulty.advanced"),
                    elite: t("sb1_01_metabolic.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <MetabolicCell
                            osmolarity={osmolarity}
                            showATP={showATP}
                        />
                    </div>
                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowATP(!showATP)}
                            className={`p-3 rounded-lg border transition-all text-[10px] font-black tracking-widest uppercase ${showATP
                                ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                }`}
                        >
                            {t("sb1_01_metabolic.labels.atp_flow")}
                        </button>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex flex-col justify-center">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t("sb1_01_metabolic.labels.status")}</div>
                            <div className="text-xs font-mono text-neon-cyan truncate uppercase">
                                {currentQuest?.statusKey ? t(`sb1_01_metabolic.labels.${currentQuest.statusKey}`) : "STABLE"}
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>Metabolic Flux</span>
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
                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                                {t("labels.mission_objective")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sb1_01_metabolic.labels.analysis")}
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
                                    {t("labels.terminal_input")} [Flux-Controller]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">NODE_0x{slot.id.toUpperCase()}</span>
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
                                                        {lastCheck.ok ? t("sb1_01_metabolic.results.valid") : t("sb1_01_metabolic.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb1_01_metabolic.results.valid_desc") : t("sb1_01_metabolic.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("labels.hint")}:</span>
                                                    <div className="text-white font-bold text-sm">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    {t("sb1_01_metabolic.results.next")}
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
