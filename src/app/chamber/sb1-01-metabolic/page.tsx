"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
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

type MetabolicT = typeof translations.EN.sb1_01_metabolic;

export default function SB101MetabolicPage() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sb1_01_metabolic || translations.EN.sb1_01_metabolic) as MetabolicT;

    const [osmolarity, setOsmolarity] = useState(0);
    const [showATP, setShowATP] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): MetabolicQuest[] => {
        const quests: MetabolicQuest[] = [];

        if (stage === "OSMOSIS") {
            const scenarios: { status: "hypertonic" | "hypotonic" | "isotonic", target: string, hint: string }[] = [
                { status: "hypertonic", target: "leave", hint: t.prompts.hint_hyper },
                { status: "hypotonic", target: "enter", hint: t.prompts.hint_hypo },
                { status: "isotonic", target: "stable", hint: `\\text{${t.prompts.hint_iso}}` }
            ];

            scenarios.forEach((s, idx) => {
                quests.push({
                    id: `OSM-${idx}`,
                    difficulty,
                    stage,
                    statusKey: s.status,
                    promptLatex: t.prompts.osmosis_prompt.replace("{status}", t.labels[s.status]),
                    expressionLatex: `\\text{${t.labels.status}: } \\text{${t.labels[s.status]}}`,
                    targetLatex: s.target,
                    slots: [{ id: "ans", labelLatex: `\\text{${t.latex_labels.water_movement}}`, placeholder: "enter/leave/stable", expected: s.target }],
                    correctLatex: s.target,
                    hintLatex: [s.hint]
                });
            });
        }

        if (stage === "RESPIRATION") {
            quests.push({
                id: "RESP-1",
                difficulty,
                stage,
                promptLatex: t.prompts.respiration_prompt.replace("{reactant}", "?"),
                expressionLatex: `C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + \\text{?}`,
                targetLatex: "atp",
                slots: [{ id: "ans", labelLatex: `\\text{${t.latex_labels.product}}`, placeholder: "...", expected: "atp" }],
                correctLatex: "ATP",
                hintLatex: [`\\text{${t.prompts.hint_atp}}`]
            });
            quests.push({
                id: "RESP-2",
                difficulty,
                stage,
                promptLatex: t.prompts.respiration_prompt.replace("{reactant}", "O_2"),
                expressionLatex: `C_6H_{12}O_6 + 6\\text{?} \\rightarrow 6CO_2 + 6H_2O + ATP`,
                targetLatex: "oxygen",
                slots: [{ id: "ans", labelLatex: `\\text{${t.latex_labels.reactant}}`, placeholder: "...", expected: "oxygen" }],
                correctLatex: "Oxygen",
                hintLatex: [t.prompts.hint_oxy]
            });
        }

        if (stage === "HOMEOSTASIS") {
            const targets = [-0.6, 0.6, -0.4, 0.4];
            targets.forEach((target, idx) => {
                quests.push({
                    id: `HOM-${idx}`,
                    difficulty,
                    stage,
                    targetOsmolarity: target,
                    promptLatex: t.prompts.homeostasis_target,
                    expressionLatex: `\\text{${t.latex_labels.current_error}}${target > 0 ? "+" : ""}${target.toFixed(1)}`,
                    targetLatex: "0",
                    slots: [{ id: "ans", labelLatex: `\\text{${t.latex_labels.target_osmolarity}}`, placeholder: "0", expected: "0" }],
                    correctLatex: "0 (Isotonic)",
                    hintLatex: [`\\text{${t.prompts.hint_homeostasis}}`]
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
    } = useQuestManager<MetabolicQuest, Stage>({
        buildPool,
        initialStage: "OSMOSIS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb1-01-metabolic", stage);
        }
    }, [lastCheck, completeStage, stage]);

    // Sync visual state with quest
    useEffect(() => {
        if (currentQuest) {
            if (currentQuest.stage === "OSMOSIS") {
                if (currentQuest.statusKey === "hypertonic") setOsmolarity(-0.6);
                else if (currentQuest.statusKey === "hypotonic") setOsmolarity(0.6);
                else setOsmolarity(0);
            } else if (currentQuest.stage === "HOMEOSTASIS") {
                setOsmolarity(currentQuest.targetOsmolarity || 0);
            }
        }
    }, [currentQuest]);

    const stagesProps = useMemo(() => [
        { id: "OSMOSIS", label: t.stages.osmosis },
        { id: "RESPIRATION", label: t.stages.respiration },
        { id: "HOMEOSTASIS", label: t.stages.homeostasis },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB1.01-M"
            title={t.title}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t.footer_left}
            translations={{
                back: t.back,
                check: t.check,
                next: t.next,
                correct: t.correct,
                incorrect: t.incorrect,
                ready: t.ready,
                monitor_title: t.monitor_title,
                difficulty: {
                    basic: t.difficulty.basic,
                    core: t.difficulty.core,
                    advanced: t.difficulty.advanced,
                    elite: t.difficulty.elite,
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

                    {/* Visual Controls */}
                    <div className="grid grid-cols-1 gap-2">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.osmolarity}</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="-1"
                                    max="1"
                                    step="0.1"
                                    value={osmolarity}
                                    onChange={(e) => setOsmolarity(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-pink"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-10 text-right">
                                    {osmolarity > 0 ? "+" : ""}{osmolarity.toFixed(1)}
                                </span>
                            </div>
                        </div>
                        <label className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10 cursor-pointer hover:bg-white/10">
                            <span className="text-[9px] uppercase text-white/60">{t.labels.atp_flow}</span>
                            <input
                                type="checkbox"
                                checked={showATP}
                                onChange={(e) => setShowATP(e.target.checked)}
                                className="w-3 h-3 rounded bg-black border-white/20 text-neon-pink focus:ring-neon-pink/50"
                            />
                        </label>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>Metabolic Efficiency</span>
                            <span>{currentStageStats?.correct || 0} / {currentStageStats?.attempts || 0}</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-700 ${i < (currentStageStats ? (currentStageStats.correct / (currentStageStats.attempts || 1)) * 10 : 0) ? "bg-neon-pink shadow-[0_0_5px_#ff2d7d]" : "bg-transparent"
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
                            <h3 className="text-[10px] text-neon-pink uppercase tracking-[0.5em] font-black italic">
                                Biological Objective
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-pink/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(255,45,125,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-pink/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    Cellular Monitor (ATP_ACTIVE)
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-pink/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-pink font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-pink/30" />
                                    Metabolic Pipeline [v2.2]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-pink/30 font-mono">CODE_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-pink/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-pink/0 group-focus-within:bg-neon-pink/20 transition-all blur-sm" />
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
                                                        {lastCheck.ok ? t.correct : t.incorrect}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? "Cellular balance maintained." : "Critical resource threshold alert."}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Hint:</span>
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
                                                    {t.next}
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
