"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import OrbitalCanvas from "@/components/chamber/sc3-05/OrbitalCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "VSEPR" | "HYBRIDIZATION" | "MO_THEORY";

interface SC305Quest extends Quest {
    stage: Stage;
    data?: any;
}

type SC305T = typeof translations.EN.sc3_05;

export default function SC305MolecularForge() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sc3_05 || translations.EN.sc3_05) as SC305T;
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
                    promptLatex: `\\text{${t.prompts.vsepr_geometry.replace("{molecule}", m.name).replace("{lone}", m.lone.toString()).replace("{bonded}", m.bonded.toString())}}`,
                    expressionLatex: "",
                    targetLatex: `\\text{${m.shape}}`,
                    slots: [{ id: "ans", labelLatex: "\\text{Geometry}", placeholder: "...", expected: m.shape }],
                    correctLatex: m.shape,
                    hintLatex: [`\\text{${t.prompts.hint_vsepr}}`]
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
                    promptLatex: `\\text{${t.prompts.hybridization_type.replace("{molecule}", h.m)}}`,
                    expressionLatex: "",
                    targetLatex: h.h,
                    slots: [{ id: "ans", labelLatex: "\\text{Hybridization}", placeholder: "...", expected: h.h }],
                    correctLatex: h.h,
                    hintLatex: [`\\text{${t.prompts.hint_hybrid}}`]
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
                    promptLatex: `\\text{${t.prompts.bond_order_calc.replace("{ion}", m.ion)}}. (\\text{Bonding } e^- = ${m.b}, \\text{Antibonding } e^- = ${m.ab})`,
                    expressionLatex: "\\text{Bond Order} = \\frac{1}{2}(n_b - n_a)",
                    targetLatex: m.order,
                    slots: [{ id: "ans", labelLatex: "\\text{Bond Order}", placeholder: "0", expected: m.order }],
                    correctLatex: m.order,
                    hintLatex: [`\\text{${t.prompts.hint_mo}}`]
                });
            });
        }

        return quests;
    }, [t]);

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
            title={t.title}
            moduleCode="SC3.05"
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            stages={[
                { id: "VSEPR", label: t.stages.vsepr },
                { id: "HYBRIDIZATION", label: t.stages.hybridization },
                { id: "MO_THEORY", label: t.stages.mo_theory },
            ]}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            translations={t}
            checkStatus={lastCheck}
            onVerify={verify}
            onNext={next}
            monitorContent={[
                <div key="stats" className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">{t.monitor_title}</span>
                        <span className="text-xl font-mono text-pink-400">
                            {stability.toFixed(1)} <span className="text-xs text-white/20">%</span>
                        </span>
                    </div>
                </div>
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                {/* Left Column */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex-1 overflow-y-auto">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-white/10" />
                            {t.objective_title}
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
                                            {t.check}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            {t.scenarios.basel_catalysis}
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
                                <div className="text-[8px] uppercase tracking-widest text-white/40 mb-2">{t.labels.hybrid_type}</div>
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
