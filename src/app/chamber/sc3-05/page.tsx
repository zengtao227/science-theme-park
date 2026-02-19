"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import OrbitalCanvas from "@/components/chamber/sc3-05/OrbitalCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "VSEPR" | "HYBRIDIZATION" | "MO_THEORY";

interface SC305Quest extends Quest {
    stage: Stage;
    data?: any;
}

export default function SC305MolecularForge() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const sc3_05_t = {
        title: t("sc3_05.title"),
        footer_left: t("sc3_05.footer_left"),
        back: t("sc3_05.back"),
        check: t("sc3_05.check"),
        next: t("sc3_05.next"),
        correct: t("sc3_05.correct"),
        incorrect: t("sc3_05.incorrect"),
        ready: t("sc3_05.ready"),
        monitor_title: t("sc3_05.monitor_title"),
        stages: {
            vsepr: t("sc3_05.stages.vsepr"),
            hybridization: t("sc3_05.stages.hybridization"),
            mo_theory: t("sc3_05.stages.mo_theory"),
        },
        prompts: {
            vsepr_geometry: t("sc3_05.prompts.vsepr_geometry"),
            hint_vsepr: t("sc3_05.prompts.hint_vsepr"),
        },
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE",
        },
    };
    const [stability, setStability] = useState(98.5);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SC305Quest[] => {
        const quests: SC305Quest[] = [];

        if (stage === "VSEPR") {
            const molecules = [
                { id: "ch4", name: "CH_4", lone: 0, bonded: 4, shape: "Tetrahedral" },
                { id: "nh3", name: "NH_3", lone: 1, bonded: 3, shape: "Trigonal pyramidal" },
                { id: "h2o", name: "H_2O", lone: 2, bonded: 2, shape: "Bent" },
                { id: "co2", name: "CO_2", lone: 0, bonded: 2, shape: "Linear" },
                { id: "sf6", name: "SF_6", lone: 0, bonded: 6, shape: "Octahedral" }
            ];

            molecules.forEach((m, idx) => {
                quests.push({
                    id: `VS-${idx}`,
                    difficulty,
                    stage,
                    promptLatex: `\\\\text{Determine geometry of ${m.name} with ${m.lone} lone pairs and ${m.bonded} bonded atoms}`,
                    expressionLatex: "",
                    targetLatex: `\\\\text{${m.shape}}`,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Geometry}", placeholder: "...", expected: m.shape }],
                    correctLatex: m.shape,
                    hintLatex: [`\\\\text{Use VSEPR theory: count electron domains}`]
                });
            });
        }

        if (stage === "HYBRIDIZATION") {
            const hyb = [
                { m: "CH_4", h: "sp3" },
                { m: "C_2H_4 \\text{ (central C)}", h: "sp2" },
                { m: "C_2H_2", h: "sp" },
                { m: "PCl_5", h: "sp3d" },
                { m: "SF_6", h: "sp3d2" }
            ];

            hyb.forEach((h, idx) => {
                quests.push({
                    id: `HY-${idx}`,
                    difficulty,
                    stage,
                    promptLatex: `\\\\text{Determine hybridization of ${h.m}}`,
                    expressionLatex: "",
                    targetLatex: h.h,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Hybridization}", placeholder: "...", expected: h.h }],
                    correctLatex: h.h,
                    hintLatex: [`\\\\text{Count electron domains around central atom}`]
                });
            });
        }

        if (stage === "MO_THEORY") {
            const mos = [
                { ion: "He_2", b: 2, ab: 2, order: "0" },
                { ion: "O_2", b: 10, ab: 6, order: "2" },
                { ion: "N_2", b: 10, ab: 4, order: "3" },
                { ion: "H_2^+", b: 1, ab: 0, order: "0.5" }
            ];

            mos.forEach((m, idx) => {
                quests.push({
                    id: `MO-${idx}`,
                    difficulty,
                    stage,
                    promptLatex: `\\\\text{Calculate bond order for ${m.ion}}. (\\\\text{Bonding } e^- = ${m.b}, \\\\text{Antibonding } e^- = ${m.ab})`,
                    expressionLatex: "\\\\text{Bond Order} = \\\\frac{1}{2}(n_b - n_a)",
                    targetLatex: m.order,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Bond Order}", placeholder: "0", expected: m.order }],
                    correctLatex: m.order,
                    hintLatex: [`\\\\text{Use the formula: Bond Order = (bonding - antibonding) / 2}`]
                });
            });
        }

        return quests;
    }, []);

    const {
        stage,
        difficulty,
        currentQuest,
        handleStageChange,
        handleDifficultyChange,
        currentStageStats,
        pool,
        verify,
        next,
        inputs,
        setInputs,
        lastCheck
    } = useQuestManager<SC305Quest, Stage>({
        buildPool: buildStagePool,
        initialStage: "VSEPR",
    });

    return (
        <ChamberLayout
            title={sc3_05_t.title}
            moduleCode="SC3.05"
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            stages={[
                { id: "VSEPR", label: sc3_05_t.stages.vsepr },
                { id: "HYBRIDIZATION", label: sc3_05_t.stages.hybridization },
                { id: "MO_THEORY", label: sc3_05_t.stages.mo_theory },
            ]}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            translations={sc3_05_t}
            checkStatus={lastCheck}
            onVerify={verify}
            onNext={next}
            footerLeft={sc3_05_t.footer_left}
            monitorContent={
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">STABILITY</span>
                        <span className="text-xl font-mono text-pink-400">
                            {stability.toFixed(1)} <span className="text-xs text-white/20">%</span>
                        </span>
                    </div>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                {/* Left Column */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex-1 overflow-y-auto">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-white/10" />
                            OBJECTIVE
                        </div>

                        <AnimatePresence mode="wait">
                            {currentQuest && (
                                <motion.div
                                    key={currentQuest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                        <div className="text-lg text-white/90 leading-relaxed mb-4 overflow-x-auto">
                                            <BlockMath math={currentQuest.promptLatex} />
                                        </div>
                                        {currentQuest.expressionLatex && (
                                            <div className="p-4 bg-black/30 rounded-lg border border-white/5 flex justify-center">
                                                <BlockMath math={currentQuest.expressionLatex} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Section */}
                                    <div className="space-y-6">
                                        {currentQuest.slots.map((slot) => (
                                            <div key={slot.id} className="space-y-3">
                                                <label className="text-xs uppercase tracking-widest text-white/40 block">
                                                    <InlineMath math={slot.labelLatex} />
                                                </label>
                                                <input
                                                    type="text"
                                                    value={inputs[slot.id] || ""}
                                                    placeholder={slot.placeholder}
                                                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-all font-mono"
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => e.key === "Enter" && verify()}
                                                />
                                            </div>
                                        ))}

                                        <button
                                            onClick={verify}
                                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        >
                                            CHECK
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            Basel pharmaceutical companies use molecular orbital theory to design drug molecules with optimal binding properties.
                        </p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md relative overflow-hidden flex flex-col p-8 min-h-[500px]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4 text-xs tracking-widest uppercase font-mono">
                                <span className="text-pink-400">calculating orbital overlap...</span>
                            </div>
                        </div>

                        <div className="flex-1 relative border border-white/5 rounded-xl bg-black/40 shadow-inner group">
                            <OrbitalCanvas stage={stage} isActive={true} />

                            {/* Readouts */}
                            <div className="absolute top-4 left-4 p-4 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg">
                                <div className="text-[8px] uppercase tracking-widest text-white/40 mb-2">HYBRID TYPE</div>
                                <div className="text-2xl font-mono text-cyan-400">
                                    {stage === "HYBRIDIZATION" ? "sp³" : stage === "VSEPR" ? "VSEPR" : "MO"}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between text-[10px] font-mono tracking-widest text-white/20 uppercase">
                            <div className="flex gap-6">
                                <span>Quantum state: synchronized</span>
                                <span>Overlap integral: 0.84</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
