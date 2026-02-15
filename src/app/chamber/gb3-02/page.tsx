"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ImmuneCanvas from "@/components/chamber/gb3-02/ImmuneCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "INNATE" | "ADAPTIVE" | "VACCINES";

interface GB302Quest extends Quest {
    stage: Stage;
    data?: any;
}

type GB302T = typeof translations.EN.gb3_02;

export default function GB302Immunology() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gb3_02 || translations.EN.gb3_02) as GB302T;
    const [antigenLoad, setAntigenLoad] = useState(100);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GB302Quest[] => {
        const quests: GB302Quest[] = [];

        if (stage === "INNATE") {
            const cells = [
                { id: "macro", name: "Macrophages", role: "ingesting pathogens" },
                { id: "neutro", name: "Neutrophils", role: "first responders to sites of infection" },
                { id: "nk", name: "Natural Killer Cells", role: "destroying virus-infected cells" }
            ];

            cells.forEach((c, idx) => {
                quests.push({
                    id: `IN-${idx}`,
                    difficulty,
                    stage,
                    promptLatex: `\\text{${t.prompts.innate_defense.replace("{pathogen}", "Staphylococcus")}}`,
                    expressionLatex: "",
                    targetLatex: `\\text{${c.name}}`,
                    slots: [{ id: "ans", labelLatex: "\\text{Cell type}", placeholder: "...", expected: c.name }],
                    correctLatex: c.name,
                    hintLatex: [`\\text{${t.prompts.hint_innate}}`]
                });
            });
        }

        if (stage === "ADAPTIVE") {
            quests.push({
                id: `AD-MATCH`,
                difficulty,
                stage,
                promptLatex: `\\text{${t.prompts.antibody_matching.replace("{antigen}", "A-type spike")}}`,
                expressionLatex: "",
                targetLatex: "\\text{Variable region}",
                slots: [{ id: "ans", labelLatex: "\\text{Region}", placeholder: "...", expected: "Variable region" }],
                correctLatex: "\\text{Variable region}",
                hintLatex: [`\\text{${t.prompts.hint_constant}}`]
            });

            const logic = [
                { q: "MHC molecules", a: "antigen presentation" },
                { q: "Cytotoxic T cells", a: "apoptosis induction" },
                { q: "Plasma B cells", a: "antibody secretion" }
            ];

            logic.forEach((l, idx) => {
                quests.push({
                    id: `AD-LOG-${idx}`,
                    difficulty,
                    stage,
                    promptLatex: `\\text{Function of } \\text{${l.q}}?`,
                    expressionLatex: "",
                    targetLatex: `\\text{${l.a}}`,
                    slots: [{ id: "ans", labelLatex: "\\text{Function}", placeholder: "...", expected: l.a }],
                    correctLatex: l.a
                });
            });
        }

        if (stage === "VACCINES") {
            const accelerations = [
                { lag: 2, prim: 10, expected: "5" },
                { lag: 1, prim: 7, expected: "7" },
                { lag: 3, prim: 12, expected: "4" }
            ];

            accelerations.forEach((s, idx) => {
                quests.push({
                    id: `VA-ACC-${idx}`,
                    difficulty,
                    stage,
                    promptLatex: `\\text{Secondary: } ${s.lag} \\text{ days, Primary: } ${s.prim} \\text{ days. Calculate acceleration factor.}`,
                    expressionLatex: "\\text{Factor} = \\frac{\\text{Primary Lag}}{\\text{Secondary Lag}}",
                    targetLatex: s.expected,
                    slots: [{ id: "ans", labelLatex: "\\text{Factor}", placeholder: "...", expected: s.expected }],
                    correctLatex: `${s.expected}x`,
                    hintLatex: [`\\text{${t.prompts.hint_memory}}`]
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
    } = useQuestManager<GB302Quest, Stage>({
        buildPool: buildStagePool,
        initialStage: "INNATE",
    });

    const activeScenario = useMemo(() => {
        const keys = Object.keys(t.scenarios);
        return t.scenarios[keys[Math.floor(Math.random() * keys.length)] as keyof typeof t.scenarios];
    }, [t, stage]);

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="GB3.02"
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            stages={[
                { id: "INNATE", label: t.stages.innate },
                { id: "ADAPTIVE", label: t.stages.adaptive },
                { id: "VACCINES", label: t.stages.vaccines },
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
                        <span className="text-xl font-mono text-cyan-400">
                            {antigenLoad} <span className="text-xs text-white/20">U/ml</span>
                        </span>
                    </div>
                </div>
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                {/* Left Column: Mission Controls */}
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
                                        <div className="text-lg text-white/90 leading-relaxed mb-4">
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
                                                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => e.key === "Enter" && verify()}
                                                />
                                            </div>
                                        ))}

                                        <button
                                            onClick={verify}
                                            className="w-full bg-cyan-500 text-black font-bold py-4 rounded-xl hover:bg-cyan-400 active:scale-[0.98] transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(0,243,255,0.2)]"
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
                            {activeScenario}
                        </p>
                    </div>
                </div>

                {/* Right Column: Immunity Visualization */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md relative overflow-hidden flex flex-col p-8 min-h-[500px]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4 text-xs tracking-widest uppercase font-mono">
                                <span className="text-cyan-400">detecting pathogens...</span>
                            </div>
                        </div>

                        <div className="flex-1 relative border border-white/5 rounded-xl bg-black/40 shadow-inner group">
                            <ImmuneCanvas stage={stage} isActive={true} />

                            {/* Readouts */}
                            <div className="absolute top-4 left-4 p-4 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg">
                                <div className="text-[8px] uppercase tracking-widest text-white/40 mb-2">{t.labels.antigen_count}</div>
                                <div className="text-2xl font-mono text-pink-500">{antigenLoad}</div>
                            </div>

                            <div className="absolute top-4 right-4 p-4 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg">
                                <div className="text-[8px] uppercase tracking-widest text-white/40 mb-2">{t.labels.antibody_titer}</div>
                                <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-cyan-500"
                                        animate={{ width: `${Math.min(100, (currentStageStats?.correct ?? 0) * 20)}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between text-[10px] font-mono tracking-widest text-white/20">
                            <div className="flex gap-6">
                                <span>INNATE_CELLS: NOMINAL</span>
                                <span>ADAPTIVE_LINK: ACTIVE</span>
                            </div>
                            <span className="animate-pulse">SYSTEM SECURE</span>
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
