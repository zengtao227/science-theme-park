"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EvolutionCanvas from "@/components/chamber/gb1-01/EvolutionCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "NATURAL_SELECTION" | "SPECIATION" | "EVIDENCE";

interface GB101Quest extends Quest {
    stage: Stage;
    scenario?: string;
}

type GB101T = typeof translations.EN.gb1_01;

export default function GB101Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gb1_01 || translations.EN.gb1_01) as GB101T;
    const [generation, setGeneration] = useState(0);
    const [selectionPressure, setSelectionPressure] = useState(0.5);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GB101Quest[] => {
        const quests: GB101Quest[] = [];
        const isAdvanced = difficulty === "ADVANCED" || difficulty === "ELITE";

        if (stage === "NATURAL_SELECTION") {
            const scenarios = isAdvanced ? [
                { initial: 500, survival: 125, fitness: 0.25, scenario: "galapagos_study" },
                { initial: 1000, survival: 50, fitness: 0.05, scenario: "genetic_drift" },
                { initial: 1200, survival: 960, fitness: 0.8, scenario: "galapagos_study" }
            ] : [
                { initial: 100, survival: 60, fitness: 0.6, scenario: "galapagos_study" },
                { initial: 200, survival: 140, fitness: 0.7, scenario: "galapagos_study" },
                { initial: 80, survival: 64, fitness: 0.8, scenario: "galapagos_study" }
            ];

            scenarios.forEach((s, idx) => {
                quests.push({
                    id: `NS-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: s.scenario,
                    promptLatex: `\\text{${t.prompts.natural_selection.replace('{initial}', s.initial.toString()).replace('{survival}', s.survival.toString())}}`,
                    expressionLatex: `\\text{Fitness} = \\frac{\\text{Survivors}}{\\text{Initial}} = \\frac{${s.survival}}{${s.initial}}`,
                    targetLatex: s.fitness.toFixed(2),
                    slots: [{ id: "ans", labelLatex: "\\text{Fitness}", placeholder: "0.00", expected: s.fitness.toFixed(2) }],
                    correctLatex: `${s.fitness.toFixed(2)}`,
                    hintLatex: [`\\text{${t.prompts.hint_fitness}}`]
                });
            });
        }

        if (stage === "SPECIATION") {
            const scenarios = isAdvanced ? [
                { generations: 5000, mutation_rate: 0.001, divergence: 5.0, scenario: "genetic_drift" },
                { generations: 10000, mutation_rate: 0.0005, divergence: 5.0, scenario: "molecular_clock" },
                { generations: 2500, mutation_rate: 0.004, divergence: 10.0, scenario: "genetic_drift" }
            ] : [
                { generations: 100, mutation_rate: 0.01, divergence: 1, scenario: "genetic_drift" },
                { generations: 200, mutation_rate: 0.02, divergence: 4, scenario: "genetic_drift" },
                { generations: 300, mutation_rate: 0.02, divergence: 6, scenario: "genetic_drift" }
            ];

            scenarios.forEach((s, idx) => {
                quests.push({
                    id: `SP-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: s.scenario,
                    promptLatex: `\\text{${t.prompts.speciation.replace('{generations}', s.generations.toString()).replace('{rate}', s.mutation_rate.toString())}}`,
                    expressionLatex: `\\text{Divergence} = \\text{generations} \\times \\text{rate} = ${s.generations} \\times ${s.mutation_rate}`,
                    targetLatex: s.divergence.toString(),
                    slots: [{ id: "ans", labelLatex: "\\text{Divergence}", placeholder: "0.0", expected: s.divergence.toString() }],
                    correctLatex: `${s.divergence}`,
                    hintLatex: [`\\text{${t.prompts.hint_divergence}}`]
                });
            });
        }

        if (stage === "EVIDENCE") {
            const scenarios = isAdvanced ? [
                { fossil_age: 22920, half_life: 5730, scenario: "fossil_record" },
                { fossil_age: 28650, half_life: 5730, scenario: "molecular_clock" },
                { fossil_age: 11460, half_life: 5730, scenario: "fossil_record" }
            ] : [
                { fossil_age: 5730, half_life: 5730, scenario: "fossil_record" },
                { fossil_age: 11460, half_life: 5730, scenario: "fossil_record" },
                { fossil_age: 17190, half_life: 5730, scenario: "molecular_clock" }
            ];

            scenarios.forEach((s, idx) => {
                const half_lives = s.fossil_age / s.half_life;
                const remaining = Math.pow(0.5, half_lives);
                quests.push({
                    id: `EV-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: s.scenario,
                    promptLatex: `\\text{${t.prompts.evidence.replace('{age}', s.fossil_age.toString()).replace('{halflife}', s.half_life.toString())}}`,
                    expressionLatex: `\\text{Remaining} = (0.5)^{t/t_{1/2}} = (0.5)^{${s.fossil_age}/${s.half_life}}`,
                    targetLatex: remaining.toFixed(3),
                    slots: [{ id: "ans", labelLatex: "\\text{Fraction}", placeholder: "0.000", expected: remaining.toFixed(3) }],
                    correctLatex: `${remaining.toFixed(3)}`,
                    hintLatex: [`\\text{${t.prompts.hint_halflife}}`]
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
    } = useQuestManager<GB101Quest, Stage>({
        buildPool,
        initialStage: "NATURAL_SELECTION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("GB1.01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "NATURAL_SELECTION", label: t.stages.natural_selection },
        { id: "SPECIATION", label: t.stages.speciation },
        { id: "EVIDENCE", label: t.stages.evidence },
    ], [t]);

    const hint = getHint();

    const activeScenario = useMemo(() => {
        if (currentQuest?.scenario && t.scenarios[currentQuest.scenario as keyof typeof t.scenarios]) {
            return t.scenarios[currentQuest.scenario as keyof typeof t.scenarios];
        }
        const keys = Object.keys(t.scenarios);
        return t.scenarios[keys[0] as keyof typeof t.scenarios];
    }, [t, currentQuest]);

    return (
        <ChamberLayout
            moduleCode="GB1.01"
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
            translations={t}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <EvolutionCanvas
                            stage={stage}
                            generation={generation}
                            selectionPressure={selectionPressure}
                            translations={t}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.generation}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={generation}
                                    onChange={(e) => setGeneration(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-green"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-16 text-right">Gen {generation}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.selection_pressure}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={selectionPressure}
                                    onChange={(e) => setSelectionPressure(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-amber"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-16 text-right">{(selectionPressure * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.evolution_score}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                                        ? "bg-neon-green shadow-[0_0_5px_#00ff00]"
                                        : "bg-transparent"
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
                            <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic">
                                {t.objective_title}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-green/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-green/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t.labels.evolution_display}
                                </span>
                                <div className="text-4xl text-white font-black overflow-x-auto">
                                    <BlockMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-green/30" />
                                    {t.labels.input_terminal}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-green/30 font-mono">EVO_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-green/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
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
                                                        {lastCheck.ok ? t.correct : t.incorrect}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t.feedback.correct : t.feedback.incorrect}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Hint:</span>
                                                    <div className="text-white font-bold">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0, 255, 0, 0.2)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={lastCheck?.ok ? next : verify}
                                    className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-xl ${lastCheck?.ok
                                        ? "bg-neon-green text-black"
                                        : "bg-white/10 text-white hover:bg-white/20 border-2 border-white/5"
                                        }`}
                                >
                                    {lastCheck?.ok ? t.next : t.check}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )}

                {activeScenario && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-neon-green/[0.02] border border-neon-green/10 rounded-3xl p-8 backdrop-blur-sm shadow-[0_0_50px_rgba(0,255,0,0.02)]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-neon-green/20 rounded-lg text-neon-green shadow-[0_0_15px_rgba(0,255,0,0.1)]">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] uppercase tracking-widest text-neon-green/60 font-black">Regional Case Study // Basel Node</div>
                                <p className="text-sm text-white/50 leading-relaxed italic">{activeScenario}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </ChamberLayout>
    );
}
