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
        const isAdvanced = difficulty === "ADVANCED" || difficulty === "ELITE";

        if (stage === "TISSUES") {
            const tissueQuests = [
                {
                    id: `T-${difficulty}-1`, difficulty, stage, tissueType: "epithelial",
                    promptLatex: t("sb2_01_tissues.prompts.epithelial_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Skin, intestines" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "protection", expected: "protection" }],
                    correctLatex: "Protection",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_epithelial")]
                },
                {
                    id: `T-${difficulty}-2`, difficulty, stage, tissueType: "connective",
                    promptLatex: t("sb2_01_tissues.prompts.connective_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Bone, cartilage" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "support", expected: "support" }],
                    correctLatex: "Support",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_connective")]
                },
                {
                    id: `T-${difficulty}-3`, difficulty, stage, tissueType: "muscle",
                    promptLatex: t("sb2_01_tissues.prompts.muscle_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Heart, limbs" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "movement", expected: "movement" }],
                    correctLatex: "Movement",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_muscle")]
                },
                {
                    id: `T-${difficulty}-4`, difficulty, stage, tissueType: "nervous",
                    promptLatex: t("sb2_01_tissues.prompts.nervous_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Brain, nerves" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "signaling", expected: "signaling" }],
                    correctLatex: "Signaling",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_nervous")]
                }
            ];

            if (isAdvanced) {
                tissueQuests.push({
                    id: `T-${difficulty}-5`, difficulty, stage, tissueType: "epithelial",
                    promptLatex: t("sb2_01_tissues.prompts.absorb_func"),
                    expressionLatex: t("sb2_01_tissues.prompts.location", { loc: "Small intestine" }),
                    targetLatex: t("sb2_01_tissues.prompts.function_label"),
                    slots: [{ id: "func", labelLatex: t("sb2_01_tissues.prompts.function_label"), placeholder: "absorption", expected: "absorption" }],
                    correctLatex: "Absorption",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_epithelial")]
                });
            }

            quests.push(...tissueQuests);
        }

        if (stage === "ORGANS") {
            const organQuests = [
                {
                    id: `O-${difficulty}-1`, difficulty, stage, organName: "heart",
                    promptLatex: t("sb2_01_tissues.prompts.organ_count", { organ: "Heart" }),
                    expressionLatex: "\\text{Organ: Heart}",
                    targetLatex: "n",
                    slots: [{ id: "count", labelLatex: "n", placeholder: "4", expected: "4" }],
                    correctLatex: "n = 4",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_organs")]
                },
                {
                    id: `O-${difficulty}-2`, difficulty, stage, organName: "stomach",
                    promptLatex: t("sb2_01_tissues.prompts.organ_count", { organ: "Stomach" }),
                    expressionLatex: "\\text{Organ: Stomach}",
                    targetLatex: "n",
                    slots: [{ id: "count", labelLatex: "n", placeholder: "4", expected: "4" }],
                    correctLatex: "n = 4",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_organs")]
                }
            ];

            if (isAdvanced) {
                organQuests.push({
                    id: `O-${difficulty}-3`, difficulty, stage, organName: "liver",
                    promptLatex: t("sb2_01_tissues.prompts.organ_count", { organ: "Liver" }),
                    expressionLatex: "\\text{Organ: Liver}",
                    targetLatex: "n",
                    slots: [{ id: "count", labelLatex: "n", placeholder: "3", expected: "3" }],
                    correctLatex: "n = 3",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_organs")]
                });
            }

            quests.push(...organQuests);
        }

        if (stage === "SYSTEMS") {
            const systemQuests = [
                {
                    id: `S-${difficulty}-1`, difficulty, stage, systemName: "hierarchy",
                    promptLatex: t("sb2_01_tissues.prompts.hierarchy"),
                    expressionLatex: "\\text{Cell} \\rightarrow \\text{Tissue} \\rightarrow \\text{Organ} \\rightarrow ?",
                    targetLatex: t("sb2_01_tissues.prompts.next_level"),
                    slots: [{ id: "level", labelLatex: t("sb2_01_tissues.prompts.next_level"), placeholder: "system", expected: "system" }],
                    correctLatex: "Organ System",
                    hintLatex: [t("sb2_01_tissues.prompts.hint_systems")]
                }
            ];

            if (isAdvanced) {
                systemQuests.push({
                    id: `S-${difficulty}-2`, difficulty, stage, systemName: "organism",
                    promptLatex: "Complete the hierarchy: Organ System \\rightarrow ?",
                    expressionLatex: "\\text{System} \\rightarrow ?",
                    targetLatex: "Next Level",
                    slots: [{ id: "level", labelLatex: "\\text{Level}", placeholder: "organism", expected: "organism" }],
                    correctLatex: "Organism",
                    hintLatex: ["The complete living individual"]
                });
            }

            quests.push(...systemQuests);
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
        getCurrentErrorCount,
        currentStageStats,
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
            monitorContent={
                <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <TissueVisualization quest={currentQuest} stage={stage} />
                    
                    {/* Stage Progress Indicator */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 flex justify-between items-center font-black">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                                {stage.replace('_', ' ')} STAGE
                            </span>
                            <span className="text-neon-green">{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        
                        {/* Visual progress bar */}
                        <div className="flex gap-1 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 bg-neon-green shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? 1 : 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                />
                            ))}
                        </div>
                        
                        {/* Stage info */}
                        <div className="mt-3 text-[9px] text-white/30 font-mono text-center">
                            {stage === "TISSUES" && "Analyzing tissue morphology..."}
                            {stage === "ORGANS" && "Mapping organ composition..."}
                            {stage === "SYSTEMS" && "Tracing biological hierarchy..."}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {/* Scenario Description with enhanced animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`scenario-${stage}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden group"
                    >
                        {/* Animated border accent */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />
                        <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                            {t("sb2_01_tissues.objective_title")}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed font-medium">
                            {t(`sb2_01_tissues.scenarios.${stage.toLowerCase()}` as any)}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {currentQuest && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`quest-${currentQuest.id}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12"
                        >
                        <motion.div
                            className="text-center space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic flex items-center justify-center gap-2">
                                <span className="w-8 h-px bg-neon-green/30" />
                                {t("sb2_01_tissues.labels.analysis")}
                                <span className="w-8 h-px bg-neon-green/30" />
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-green/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,0,0.05)] group hover:shadow-[0_0_50px_rgba(0,255,0,0.1)] transition-all duration-500">
                                <motion.div
                                    className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-green/40"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {stage === "TISSUES" ? "TISSUE SAMPLE" : stage === "ORGANS" ? "ORGAN STRUCTURE" : "HIERARCHY LEVEL"}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <motion.div
                                className="absolute top-0 left-0 w-1 h-full bg-neon-green/50"
                                initial={{ height: "100%" }}
                                whileHover={{ height: "0%" }}
                                transition={{ duration: 0.7 }}
                            />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-green/30" />
                                    {t("sb2_01_tissues.labels.terminal")}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot, index) => (
                                        <motion.div
                                            key={slot.id}
                                            className="w-full max-w-md space-y-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                                        >
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-green/30 font-mono">TISSUE_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <motion.div 
                                                className="relative group"
                                                animate={lastCheck && !lastCheck.ok ? {
                                                    x: [0, -10, 10, -10, 10, 0],
                                                } : {}}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <input
                                                    className={`w-full bg-white/5 border-2 transition-all p-6 text-center outline-none font-mono text-3xl text-white rounded-2xl shadow-inner uppercase ${
                                                        lastCheck && !lastCheck.ok && !inputs[slot.id]?.trim()
                                                            ? 'border-red-500/50 animate-pulse'
                                                            : 'border-white/10 group-focus-within:border-neon-green/50'
                                                    }`}
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <motion.div
                                                    className="absolute inset-x-0 bottom-0 h-1 bg-neon-green/20 blur-sm"
                                                    initial={{ scaleX: 0 }}
                                                    whileFocus={{ scaleX: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                                {/* Empty field indicator */}
                                                {lastCheck && !lastCheck.ok && !inputs[slot.id]?.trim() && (
                                                    <motion.div
                                                        className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-black"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                    >
                                                        <span className="text-[8px] text-white font-black flex items-center justify-center h-full">!</span>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {lastCheck && (
                                        <motion.div
                                            key={lastCheck.ok ? "correct" : "incorrect"}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors relative overflow-hidden ${lastCheck.ok
                                                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                }`}
                                        >
                                            {/* Enhanced visual effect for feedback */}
                                            <motion.div
                                                className={`absolute inset-0 ${lastCheck.ok ? 'bg-green-500/5' : 'bg-red-500/5'}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 0.5, 0] }}
                                                transition={{ duration: 1.5, repeat: lastCheck.ok ? 0 : 2 }}
                                            />
                                            
                                            <div className="flex items-center gap-5 relative z-10">
                                                <motion.div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                                                        }`}
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                                >
                                                    {lastCheck.ok ? "✓" : "✗"}
                                                </motion.div>
                                                <div>
                                                    <div className="font-black text-lg tracking-widest uppercase italic">
                                                        {lastCheck.ok ? t("sb2_01_tissues.results.valid") : t("sb2_01_tissues.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb2_01_tissues.results.valid_desc") : t("sb2_01_tissues.results.invalid_desc")}
                                                    </div>
                                                    {/* Error count indicator */}
                                                    {!lastCheck.ok && getCurrentErrorCount() > 0 && (
                                                        <motion.div
                                                            className="mt-2 text-xs font-mono text-white/40"
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                        >
                                                            Attempt {getCurrentErrorCount()} • {getCurrentErrorCount() >= 3 ? "Showing detailed hint" : "Keep trying"}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <motion.div
                                                    className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3 relative z-10"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <motion.span 
                                                        className="text-[10px] font-black uppercase tracking-widest text-white/40"
                                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        {t("sb2_01_tissues.labels.hint")}:
                                                    </motion.span>
                                                    <div className="text-white font-bold">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {lastCheck.ok && (
                                                <motion.button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 relative z-10"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                    whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                                                >
                                                    {t("sb2_01_tissues.results.next")}
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </ChamberLayout>
    );
}
