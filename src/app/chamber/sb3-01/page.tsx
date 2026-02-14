"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EcosystemCanvas from "@/components/chamber/sb3-01/EcosystemCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "FOOD_CHAINS" | "ENERGY_FLOW" | "CYCLES";

interface SB301Quest extends Quest {
    stage: Stage;
    ecosystem?: string;
}

type SB301T = typeof translations.EN.sb3_01;

export default function SB301Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sb3_01 || translations.EN.sb3_01) as SB301T;
    const [selectedLevel, setSelectedLevel] = useState<number>(1);
    const [showEnergyFlow, setShowEnergyFlow] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB301Quest[] => {
        const quests: SB301Quest[] = [];

        if (stage === "FOOD_CHAINS") {
            // Food chain relationships
            const chains = [
                { producer: "algae", consumer1: "zooplankton", consumer2: "fish", predator: "bird" },
                { producer: "grass", consumer1: "grasshopper", consumer2: "frog", predator: "snake" },
                { producer: "phytoplankton", consumer1: "krill", consumer2: "fish", predator: "seal" },
                { producer: "plants", consumer1: "rabbit", consumer2: "fox", predator: "eagle" },
                { producer: "seaweed", consumer1: "snail", consumer2: "crab", predator: "octopus" }
            ];

            chains.forEach((chain, idx) => {
                quests.push({
                    id: `CHAIN-${idx}`,
                    difficulty,
                    stage,
                    ecosystem: "rhine_river",
                    promptLatex: `\\text{${t.prompts.food_chain.replace('{producer}', chain.producer).replace('{consumer}', chain.consumer1)}}`,
                    expressionLatex: `\\text{${chain.producer}} \\rightarrow \\text{${chain.consumer1}} \\rightarrow \\text{?}`,
                    targetLatex: chain.consumer2.replace(" ", "_"),
                    slots: [{ id: "ans", labelLatex: "\\text{Next Level}", placeholder: "...", expected: chain.consumer2.replace(" ", "_") }],
                    correctLatex: chain.consumer2,
                    hintLatex: [`\\text{${t.prompts.hint_trophic}}`]
                });
            });
        }

        if (stage === "ENERGY_FLOW") {
            // Energy transfer efficiency
            const transfers = [
                { level: "producer", energy: "10000", next: "1000", efficiency: "10" },
                { level: "primary", energy: "1000", next: "100", efficiency: "10" },
                { level: "secondary", energy: "100", next: "10", efficiency: "10" },
                { level: "tertiary", energy: "10", next: "1", efficiency: "10" },
                { level: "producer", energy: "5000", next: "500", efficiency: "10" }
            ];

            transfers.forEach((t_data, idx) => {
                quests.push({
                    id: `ENERGY-${idx}`,
                    difficulty,
                    stage,
                    ecosystem: "energy_pyramid",
                    promptLatex: `\\text{${t.prompts.energy_transfer.replace('{energy}', t_data.energy).replace('{level}', t_data.level)}}`,
                    expressionLatex: `${t_data.energy}\\,\\text{kJ} \\times 0.1 = \\text{?}\\,\\text{kJ}`,
                    targetLatex: t_data.next,
                    slots: [{ id: "ans", labelLatex: "\\text{Energy (kJ)}", placeholder: "...", expected: t_data.next }],
                    correctLatex: `${t_data.next}\\,\\text{kJ}`,
                    hintLatex: [`\\text{${t.prompts.hint_10percent}}`]
                });
            });
        }

        if (stage === "CYCLES") {
            // Biogeochemical cycles
            const cycles = [
                { cycle: "carbon", process: "photosynthesis", input: "co2", output: "glucose" },
                { cycle: "carbon", process: "respiration", input: "glucose", output: "co2" },
                { cycle: "nitrogen", process: "fixation", input: "n2", output: "nh3" },
                { cycle: "water", process: "evaporation", input: "liquid", output: "vapor" },
                { cycle: "nitrogen", process: "nitrification", input: "nh3", output: "no3" }
            ];

            cycles.forEach((c, idx) => {
                quests.push({
                    id: `CYCLE-${idx}`,
                    difficulty,
                    stage,
                    ecosystem: `${c.cycle}_cycle`,
                    promptLatex: `\\text{${t.prompts.cycle_process.replace('{cycle}', c.cycle).replace('{process}', c.process)}}`,
                    expressionLatex: `\\text{${c.input}} \\xrightarrow{\\text{${c.process}}} \\text{?}`,
                    targetLatex: c.output,
                    slots: [{ id: "ans", labelLatex: "\\text{Product}", placeholder: "...", expected: c.output }],
                    correctLatex: c.output.toUpperCase(),
                    hintLatex: [`\\text{${t.prompts.hint_cycle}}`]
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
    } = useQuestManager<SB301Quest, Stage>({
        buildPool,
        initialStage: "FOOD_CHAINS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SB3.01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "FOOD_CHAINS", label: t.stages.food_chains },
        { id: "ENERGY_FLOW", label: t.stages.energy_flow },
        { id: "CYCLES", label: t.stages.cycles },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB3.01"
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
                        <EcosystemCanvas
                            stage={stage}
                            selectedLevel={selectedLevel}
                            showEnergyFlow={showEnergyFlow}
                            translations={t}
                        />
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 gap-2">
                        {stage === "ENERGY_FLOW" && (
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.trophic_level}</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="1"
                                        max="4"
                                        value={selectedLevel}
                                        onChange={(e) => setSelectedLevel(Number(e.target.value))}
                                        className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-green"
                                    />
                                    <span className="text-[10px] font-mono text-white/60 w-16 text-right">Level {selectedLevel}</span>
                                </div>
                            </div>
                        )}
                        <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                            <span className="text-[10px] uppercase text-white/60 tracking-widest">{t.labels.show_energy}</span>
                            <input
                                type="checkbox"
                                checked={showEnergyFlow}
                                onChange={(e) => setShowEnergyFlow(e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-black text-neon-green focus:ring-neon-green/50"
                            />
                        </label>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.ecology_score}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${
                                        i < (currentStageStats ? currentStageStats.correct % 6 : 0)
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
                                    {t.labels.ecosystem_display}
                                </span>
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
                                    {t.labels.input_terminal}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-green/30 font-mono">ECO_0x{slot.id.toUpperCase()}</span>
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
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
                                                lastCheck.ok
                                                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                                            }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${
                                                    lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
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
