"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TissueVisualization from "@/components/chamber/sb2-01-tissues/TissueVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "TISSUES" | "ORGANS" | "SYSTEMS";

interface SB201TissuesQuest extends Quest {
    stage: Stage;
    tissueType?: string;
    organName?: string;
    systemName?: string;
}

export default function SB201TissuesPage() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB201TissuesQuest[] => {
        const quests: SB201TissuesQuest[] = [];

        if (stage === "TISSUES") {
            quests.push(
                {
                    id: "T-B1", difficulty, stage, tissueType: "epithelial",
                    promptLatex: t("sb2_01_tissues.prompts.epithelial_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Skin, intestines" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "protection", expected: "protection" }],
                    correctLatex: "Protection",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_epithelial")]
                },
                {
                    id: "T-B2", difficulty, stage, tissueType: "connective",
                    promptLatex: t("sb2_01_tissues.prompts.connective_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Bone, cartilage" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "support", expected: "support" }],
                    correctLatex: "Support",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_connective")]
                },
                {
                    id: "T-B3", difficulty, stage, tissueType: "muscle",
                    promptLatex: t("sb2_01_tissues.prompts.muscle_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Heart, limbs" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "movement", expected: "movement" }],
                    correctLatex: "Movement",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_muscle")]
                },
                {
                    id: "T-B4", difficulty, stage, tissueType: "nervous",
                    promptLatex: t("sb2_01_tissues.prompts.nervous_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Brain, nerves" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "signaling", expected: "signaling" }],
                    correctLatex: "Signaling",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_nervous")]
                },
                {
                    id: "T-B5", difficulty, stage, tissueType: "epithelial",
                    promptLatex: t("sb2_01_tissues.prompts.absorb_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Small intestine" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "absorption", expected: "absorption" }],
                    correctLatex: "Absorption",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_epithelial")]
                }
            );
        }

        if (stage === "ORGANS") {
            quests.push(
                {
                    id: "O-C1", difficulty, stage, organName: "heart",
                    promptLatex: t("sb2_01_tissues.prompts.organ_count", { organ: "Heart" }),
                    expressionLatex: "\\text{Organ: Heart}",
                    targetLatex: "n",
                    slots: [{ id: "count", labelLatex: "n", placeholder: "4", expected: "4" }],
                    correctLatex: "n = 4",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_organs")]
                },
                {
                    id: "O-C2", difficulty, stage, organName: "stomach",
                    promptLatex: t("sb2_01_tissues.prompts.organ_count", { organ: "Stomach" }),
                    expressionLatex: "\\text{Organ: Stomach}",
                    targetLatex: "n",
                    slots: [{ id: "count", labelLatex: "n", placeholder: "4", expected: "4" }],
                    correctLatex: "n = 4",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_organs")]
                }
            );
        }

        if (stage === "SYSTEMS") {
            quests.push(
                {
                    id: "S-A1", difficulty, stage, systemName: "hierarchy",
                    promptLatex: t("sb2_01_tissues.prompts.hierarchy"),
                    expressionLatex: "\\text{Biological Hierarchy}",
                    targetLatex: t("sb2_01_tissues.prompts.next_level"),
                    slots: [{ id: "level", labelLatex: t("sb2_01_tissues.prompts.next_level"), placeholder: "system", expected: "system" }],
                    correctLatex: "Organ System",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_systems")]
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
    } = useQuestManager<SB201TissuesQuest, Stage>({
        buildPool,
        initialStage: "TISSUES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb2-01-tissues", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "TISSUES" as Stage, label: t("sb2_01_tissues.stages.tissues") },
        { id: "ORGANS" as Stage, label: t("sb2_01_tissues.stages.organs") },
        { id: "SYSTEMS" as Stage, label: t("sb2_01_tissues.stages.systems") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB2.01"
            title={t("sb2_01_tissues.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb2_01_tissues.footer_left")}
            translations={{
                back: t("sb2_01_tissues.back"),
                check: t("sb2_01_tissues.check"),
                next: t("sb2_01_tissues.next"),
                correct: t("sb2_01_tissues.correct"),
                incorrect: t("sb2_01_tissues.incorrect"),
                ready: t("sb1_01.ready"), // Fallback to common or sibling
                monitor_title: t("sb2_01_tissues.monitor_title"),
                difficulty: {
                    basic: t("sb2_01_tissues.difficulty.basic"),
                    core: t("sb2_01_tissues.difficulty.core"),
                    advanced: t("sb2_01_tissues.difficulty.advanced"),
                    elite: t("sb2_01_tissues.difficulty.elite"),
                },
            }}
            monitorContent={<TissueVisualization quest={currentQuest} stage={stage} />}
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {/* Scenario Description */}
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                    <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic mb-4">
                        {t("sb2_01_tissues.objective_title")}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed font-medium">
                        {t(`sb2_01_tissues.scenarios.${stage.toLowerCase()}` as any)}
                    </p>
                </div>

                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic">
                                {t("sb2_01_tissues.labels.analysis")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-green/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-green/40 animate-pulse" />
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-green/30" />
                                    {t("sb2_01_tissues.labels.terminal")}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-green/30 font-mono">TISSUE_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-green/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-green/0 group-focus-within:bg-neon-green/20 transition-all blur-sm" />
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
                                                        {lastCheck.ok ? t("sb2_01_tissues.results.valid") : t("sb2_01_tissues.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb2_01_tissues.results.valid_desc") : t("sb2_01_tissues.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("sb2_01_tissues.labels.hint")}:</span>
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
                                                    {t("sb2_01_tissues.results.next")}
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
