"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EcosystemVisualization from "@/components/chamber/sb3-01/EcosystemVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "FOOD_CHAINS" | "ENERGY_FLOW" | "CYCLES";

interface SB301Quest extends Quest {
    stage: Stage;
    scenario: string;
}

export default function SB301Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB301Quest[] => {
        const quests: SB301Quest[] = [];
        const isAdvanced = difficulty === "ADVANCED" || difficulty === "ELITE";

        if (stage === "FOOD_CHAINS") {
            const scenarios = [
                { p: "Algae", c: "Zooplankton", next: "Silver Carp", scenario: "rhine_river" },
                { p: "Waterweed", c: "Snails", next: "Tench", scenario: "rhine_river" },
                { p: "Detritus", c: "Benthic Invertebrates", next: "Eel", scenario: "rhine_river" },
                { p: "Phytoplankton", c: "Mussels", next: "Cormorant", scenario: "rhine_river" }
            ];

            const filtered = isAdvanced ? scenarios : scenarios.slice(0, 2);

            filtered.forEach((item, idx) => {
                quests.push({
                    id: `FC-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: item.scenario,
                    promptLatex: t("sb3_01.prompts.food_chain", { producer: item.p, consumer: item.c }),
                    expressionLatex: `\\text{${item.p}} \\rightarrow \\text{${item.c}} \\rightarrow ?`,
                    targetLatex: item.next,
                    slots: [{ id: "ans", labelLatex: "\\text{Level 3}", placeholder: "...", expected: item.next.toLowerCase() }],
                    correctLatex: item.next,
                    hintLatex: [t("sb3_01.prompts.hint_trophic")]
                });
            });
        }

        if (stage === "ENERGY_FLOW") {
            const scenarios = isAdvanced ? [
                { level: "Secondary", energy: 1250, expected: "125" },
                { level: "Tertiary", energy: 85, expected: "8.5" }
            ] : [
                { level: "Primary", energy: 10000, expected: "1000" },
                { level: "Primary", energy: 25000, expected: "2500" }
            ];

            scenarios.forEach((item, idx) => {
                quests.push({
                    id: `EF-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: "energy_pyramid",
                    promptLatex: t("sb3_01.prompts.energy_transfer", { level: item.level, energy: item.energy.toString() }),
                    expressionLatex: `E_{next} = E_{current} \\times 10\\%`,
                    targetLatex: item.expected,
                    slots: [{ id: "ans", labelLatex: "\\text{Energy (kJ)}", placeholder: "0", expected: item.expected }],
                    correctLatex: `${item.expected}\\text{ kJ}`,
                    hintLatex: [t("sb3_01.prompts.hint_10percent")]
                });
            });
        }

        if (stage === "CYCLES") {
            const scenarios = [
                { cycle: "Carbon", process: "Photosynthesis", out: "Oxygen", scenario: "carbon_cycle" },
                { cycle: "Carbon", process: "Respiration", out: "CO2", scenario: "carbon_cycle" },
                { cycle: "Nitrogen", process: "Nitrogen Fixation", out: "Ammonia", scenario: "nitrogen_cycle" },
                { cycle: "Water", process: "Evaporation", out: "Water Vapor", scenario: "water_cycle" }
            ];

            const filtered = isAdvanced ? scenarios : scenarios.slice(0, 2);

            filtered.forEach((item, idx) => {
                quests.push({
                    id: `CYC-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: item.scenario,
                    promptLatex: t("sb3_01.prompts.cycle_process", { cycle: item.cycle, process: item.process }),
                    expressionLatex: `\\text{${item.process}} \\rightarrow ?`,
                    targetLatex: item.out,
                    slots: [{ id: "ans", labelLatex: "\\text{Product}", placeholder: "...", expected: item.out.toLowerCase() }],
                    correctLatex: item.out,
                    hintLatex: [t("sb3_01.prompts.hint_cycle")]
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
            completeStage("sb3-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "FOOD_CHAINS" as Stage, label: t("sb3_01.stages.food_chains") },
        { id: "ENERGY_FLOW" as Stage, label: t("sb3_01.stages.energy_flow") },
        { id: "CYCLES" as Stage, label: t("sb3_01.stages.cycles") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB3.01"
            title={t("sb3_01.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb3_01.footer_left")}
            translations={{
                back: t("sb3_01.back"),
                check: t("sb3_01.check"),
                next: t("sb3_01.next"),
                correct: t("sb3_01.correct"),
                incorrect: t("sb3_01.incorrect"),
                ready: t("sb3_01.ready"),
                monitor_title: t("sb3_01.monitor_title"),
                difficulty: {
                    basic: t("sb3_01.difficulty.basic"),
                    core: t("sb3_01.difficulty.core"),
                    advanced: t("sb3_01.difficulty.advanced"),
                    elite: t("sb3_01.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <EcosystemVisualization
                        quest={currentQuest}
                        stage={stage}
                        translations={t("sb3_01")}
                    />
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between font-black">
                            <span>{t("sb3_01.labels.analysis")}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-green-500 shadow-[0_0_5px_green]" : "bg-transparent"
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
                {currentQuest && (
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                        <h3 className="text-[10px] text-green-400 uppercase tracking-[0.5em] font-black italic mb-4">
                            {t("sb3_01.objective_title")}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed font-medium">
                            {t(`sb3_01.scenarios.${currentQuest.scenario}` as any)}
                        </p>
                    </div>
                )}

                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-green-400 uppercase tracking-[0.5em] font-black italic">
                                {t("sb3_01.labels.trophic_level")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto drop-shadow-sm">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-green-500/[0.03] border-2 border-green-500/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(34,197,94,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sb3_01.labels.input_terminal")}
                                </span>
                                <div className="text-3xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-green-400 font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-green-500/30" />
                                    {t("sb3_01.labels.analysis")} [Bio-Tracker]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-green-500/30 font-mono">NODE_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-green-500/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500/0 group-focus-within:bg-green-500/20 transition-all blur-sm" />
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
                                                    <div className="font-black text-lg tracking-widest uppercase italic leading-none mb-1">
                                                        {lastCheck.ok ? t("sb3_01.results.valid") : t("sb3_01.results.invalid")}
                                                    </div>
                                                    <div className="text-xs font-bold opacity-70">
                                                        {lastCheck.ok ? t("sb3_01.results.valid_desc") : t("sb3_01.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("sb3_01.labels.hint")}:</span>
                                                    <div className="text-white font-bold text-sm">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-[10px] font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    {t("sb3_01.results.next")}
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
