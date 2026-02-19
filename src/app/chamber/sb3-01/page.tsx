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

type Stage = "FOOD_CHAINS" | "ENERGY_FLOW" | "CYCLES" | "ELITE";

interface SB301Quest extends Quest {
    stage: Stage;
    scenario: string;
}

export default function SB301Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB301Quest[] => {
        const quests: SB301Quest[] = [];

        if (stage === "FOOD_CHAINS") {
            const scenariosByDifficulty: Record<Difficulty, Array<{ p: string; c: string; next: string; scenario: string }>> = {
                BASIC: [
                    { p: "Algae", c: "Zooplankton", next: "Silver Carp", scenario: "rhine_river" },
                    { p: "Waterweed", c: "Snails", next: "Tench", scenario: "rhine_river" },
                    { p: "Grass", c: "Grasshopper", next: "Frog", scenario: "rhine_river" },
                    { p: "Phytoplankton", c: "Krill", next: "Fish", scenario: "rhine_river" },
                    { p: "Leaves", c: "Caterpillar", next: "Bird", scenario: "rhine_river" }
                ],
                CORE: [
                    { p: "Detritus", c: "Benthic Invertebrates", next: "Eel", scenario: "rhine_river" },
                    { p: "Phytoplankton", c: "Mussels", next: "Cormorant", scenario: "rhine_river" },
                    { p: "Algae", c: "Water Flea", next: "Minnow", scenario: "rhine_river" },
                    { p: "Aquatic Plants", c: "Tadpole", next: "Pike", scenario: "rhine_river" },
                    { p: "Diatoms", c: "Copepods", next: "Herring", scenario: "rhine_river" }
                ],
                ADVANCED: [
                    { p: "Seaweed", c: "Sea Urchin", next: "Sea Otter", scenario: "rhine_river" },
                    { p: "Plankton", c: "Shrimp", next: "Salmon", scenario: "rhine_river" },
                    { p: "Kelp", c: "Abalone", next: "Octopus", scenario: "rhine_river" },
                    { p: "Microalgae", c: "Brine Shrimp", next: "Flamingo", scenario: "rhine_river" },
                    { p: "Moss", c: "Snail", next: "Thrush", scenario: "rhine_river" }
                ],
                ELITE: [
                    { p: "Chemosynthetic Bacteria", c: "Tube Worms", next: "Deep Sea Fish", scenario: "rhine_river" },
                    { p: "Cyanobacteria", c: "Protists", next: "Jellyfish", scenario: "rhine_river" },
                    { p: "Dinoflagellates", c: "Coral Polyps", next: "Parrotfish", scenario: "rhine_river" },
                    { p: "Benthic Algae", c: "Sea Cucumber", next: "Triggerfish", scenario: "rhine_river" },
                    { p: "Epiphytes", c: "Tree Frog", next: "Snake", scenario: "rhine_river" }
                ]
            };

            const scenarios = scenariosByDifficulty[difficulty];
            scenarios.forEach((item, idx) => {
                quests.push({
                    id: `FC-${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: item.scenario,
                    promptLatex: t("sb3_01.prompts.food_chain", { producer: item.p, consumer: item.c }),
                    expressionLatex: `\\\\text{${item.p}} \\rightarrow \\\\text{${item.c}} \\rightarrow ?`,
                    targetLatex: item.next,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Level 3}", placeholder: "...", expected: item.next.toLowerCase() }],
                    correctLatex: item.next,
                    hintLatex: [t("sb3_01.prompts.hint_trophic")]
                });
            });
        }

        if (stage === "ENERGY_FLOW") {
            const scenariosByDifficulty: Record<Difficulty, Array<{ level: string; energy: number; expected: string }>> = {
                BASIC: [
                    { level: "Primary", energy: 10000, expected: "1000" },
                    { level: "Primary", energy: 25000, expected: "2500" },
                    { level: "Primary", energy: 15000, expected: "1500" },
                    { level: "Primary", energy: 20000, expected: "2000" },
                    { level: "Primary", energy: 30000, expected: "3000" }
                ],
                CORE: [
                    { level: "Secondary", energy: 1000, expected: "100" },
                    { level: "Secondary", energy: 2500, expected: "250" },
                    { level: "Secondary", energy: 1500, expected: "150" },
                    { level: "Secondary", energy: 3000, expected: "300" },
                    { level: "Secondary", energy: 2000, expected: "200" }
                ],
                ADVANCED: [
                    { level: "Secondary", energy: 1250, expected: "125" },
                    { level: "Tertiary", energy: 850, expected: "85" },
                    { level: "Tertiary", energy: 1200, expected: "120" },
                    { level: "Tertiary", energy: 750, expected: "75" },
                    { level: "Tertiary", energy: 950, expected: "95" }
                ],
                ELITE: [
                    { level: "Tertiary", energy: 85, expected: "8.5" },
                    { level: "Quaternary", energy: 12, expected: "1.2" },
                    { level: "Quaternary", energy: 25, expected: "2.5" },
                    { level: "Quaternary", energy: 18, expected: "1.8" },
                    { level: "Quaternary", energy: 32, expected: "3.2" }
                ]
            };

            const scenarios = scenariosByDifficulty[difficulty];
            scenarios.forEach((item, idx) => {
                quests.push({
                    id: `EF-${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: "energy_pyramid",
                    promptLatex: t("sb3_01.prompts.energy_transfer", { level: item.level, energy: item.energy.toString() }),
                    expressionLatex: `E_{next} = E_{current} \\times 10\\%`,
                    targetLatex: item.expected,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Energy (kJ)}", placeholder: "0", expected: item.expected }],
                    correctLatex: `${item.expected}\\\\text{ kJ}`,
                    hintLatex: [t("sb3_01.prompts.hint_10percent")]
                });
            });
        }

        if (stage === "CYCLES") {
            const scenariosByDifficulty: Record<Difficulty, Array<{ cycle: string; process: string; out: string; scenario: string }>> = {
                BASIC: [
                    { cycle: "Carbon", process: "Photosynthesis", out: "Oxygen", scenario: "carbon_cycle" },
                    { cycle: "Carbon", process: "Respiration", out: "CO2", scenario: "carbon_cycle" },
                    { cycle: "Water", process: "Evaporation", out: "Water Vapor", scenario: "water_cycle" },
                    { cycle: "Water", process: "Condensation", out: "Clouds", scenario: "water_cycle" },
                    { cycle: "Water", process: "Precipitation", out: "Rain", scenario: "water_cycle" }
                ],
                CORE: [
                    { cycle: "Nitrogen", process: "Nitrogen Fixation", out: "Ammonia", scenario: "nitrogen_cycle" },
                    { cycle: "Nitrogen", process: "Nitrification", out: "Nitrate", scenario: "nitrogen_cycle" },
                    { cycle: "Carbon", process: "Decomposition", out: "CO2", scenario: "carbon_cycle" },
                    { cycle: "Carbon", process: "Combustion", out: "CO2", scenario: "carbon_cycle" },
                    { cycle: "Nitrogen", process: "Assimilation", out: "Proteins", scenario: "nitrogen_cycle" }
                ],
                ADVANCED: [
                    { cycle: "Nitrogen", process: "Denitrification", out: "N2", scenario: "nitrogen_cycle" },
                    { cycle: "Phosphorus", process: "Weathering", out: "Phosphate", scenario: "phosphorus_cycle" },
                    { cycle: "Phosphorus", process: "Uptake", out: "Organic P", scenario: "phosphorus_cycle" },
                    { cycle: "Sulfur", process: "Mineralization", out: "Sulfate", scenario: "sulfur_cycle" },
                    { cycle: "Carbon", process: "Fossilization", out: "Fossil Fuels", scenario: "carbon_cycle" }
                ],
                ELITE: [
                    { cycle: "Nitrogen", process: "Anammox", out: "N2", scenario: "nitrogen_cycle" },
                    { cycle: "Phosphorus", process: "Sedimentation", out: "Rock Phosphate", scenario: "phosphorus_cycle" },
                    { cycle: "Sulfur", process: "Sulfate Reduction", out: "H2S", scenario: "sulfur_cycle" },
                    { cycle: "Carbon", process: "Methanogenesis", out: "Methane", scenario: "carbon_cycle" },
                    { cycle: "Nitrogen", process: "DNRA", out: "Ammonium", scenario: "nitrogen_cycle" }
                ]
            };

            const scenarios = scenariosByDifficulty[difficulty];
            scenarios.forEach((item, idx) => {
                quests.push({
                    id: `CYC-${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: item.scenario,
                    promptLatex: t("sb3_01.prompts.cycle_process", { cycle: item.cycle, process: item.process }),
                    expressionLatex: `\\\\text{${item.process}} \\rightarrow ?`,
                    targetLatex: item.out,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Product}", placeholder: "...", expected: item.out.toLowerCase() }],
                    correctLatex: item.out,
                    hintLatex: [t("sb3_01.prompts.hint_cycle")]
                });
            });
        }

        if (stage === "ELITE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "ELITE-B1", difficulty, stage, scenario: "kannenfeldpark",
                        promptLatex: `\\\\text{Kannenfeldpark: Primary productivity = 8,500 kcal/m²/year. Herbivores consume mean = 850 kcal/m²/year. Calculate energy transfer efficiency (\\%).}`,
                        expressionLatex: `\\\\text{Efficiency} = \\\\frac{\\\\text{Energy consumed}}{\\\\text{Energy available}} \\\\times 100\\\\%`,
                        targetLatex: `\\\\text{Efficiency}`,
                        slots: [{ id: "eff", labelLatex: `\\\\text{Efficiency (\\%)}`, placeholder: "10", expected: "10" }],
                        correctLatex: `10\\\\%`,
                        hintLatex: [
                            `\\\\frac{850}{8500} \\\\times 100\\\\% = 10\\\\%`,
                            `\\\\text{Matches theoretical 10\\% rule}`,
                            `\\\\text{Energy loss through respiration, heat, incomplete consumption}`
                        ]
                    },
                    {
                        id: "ELITE-B2", difficulty, stage, scenario: "rhine_river",
                        promptLatex: `\\\\text{Rhine macroinvertebrates (n=200): Mayfly 80 (p=0.40), Caddisfly 60 (p=0.30), Stonefly 40 (p=0.20), Dragonfly 20 (p=0.10). Calculate Shannon index } H' = -\\\\sum p_i \\\\ln(p_i).`,
                        expressionLatex: `H' = -[p_1\\\\ln(p_1) + p_2\\\\ln(p_2) + p_3\\\\ln(p_3) + p_4\\\\ln(p_4)]`,
                        targetLatex: `H'`,
                        slots: [{ id: "h", labelLatex: `H'`, placeholder: "1.28", expected: "1.28" }],
                        correctLatex: `1.28`,
                        hintLatex: [
                            `\\\\ln(0.40)=-0.916, \\\\ln(0.30)=-1.204, \\\\ln(0.20)=-1.609, \\\\ln(0.10)=-2.303`,
                            `H' = -[0.40(-0.916) + 0.30(-1.204) + 0.20(-1.609) + 0.10(-2.303)]`,
                            `H' = -[-0.366 - 0.361 - 0.322 - 0.230] = 1.28`
                        ]
                    }
                );
            } else if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "ELITE-C1", difficulty, stage, scenario: "basel_parks",
                        promptLatex: `\\\\text{Basel blackbird population: 2020 = 450, 2024 = 520 (4 years). Using } N_t = N_0 \\\\times e^{rt}, \\\\text{ calculate annual growth rate } r.`,
                        expressionLatex: `520 = 450 \\\\times e^{4r}, \\\\text{ solve for } r`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r`, placeholder: "0.036", expected: "0.036" }],
                        correctLatex: `r = 0.036`,
                        hintLatex: [
                            `\\\\frac{520}{450} = 1.156 = e^{4r}`,
                            `\\\\ln(1.156) = 0.145 = 4r`,
                            `r = \\\\frac{0.145}{4} = 0.036 \\\\text{ or } 3.6\\\\% \\\\text{ per year}`
                        ]
                    },
                    {
                        id: "ELITE-C2", difficulty, stage, scenario: "rhine_river",
                        promptLatex: `\\\\text{Rhine biomass (kg/ha): Producers mean = 12,000, Primary consumers = 1,200, Secondary consumers = 120. Calculate biomass ratio (producers:secondary).}`,
                        expressionLatex: `\\\\text{Ratio} = \\\\frac{\\\\text{Producer biomass}}{\\\\text{Secondary consumer biomass}}`,
                        targetLatex: `\\\\text{Ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\\\text{Ratio}`, placeholder: "100", expected: "100" }],
                        correctLatex: `100:1`,
                        hintLatex: [
                            `\\\\frac{12000}{120} = 100`,
                            `\\\\text{Each trophic level: } 10\\\\% \\\\text{ energy retained}`,
                            `\\\\text{Two levels: } 10 \\\\times 10 = 100\\\\times \\\\text{ reduction}`
                        ]
                    }
                );
            } else if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "ELITE-A1", difficulty, stage, scenario: "basel_green_corridors",
                        promptLatex: `\\\\text{Basel urban deer: logistic growth } \\\\frac{dN}{dt} = rN(1 - \\\\frac{N}{K}), \\\\text{ where } r = 0.18/\\\\text{year}, K = 200, N = 150. \\\\text{ Calculate } \\\\frac{dN}{dt}.`,
                        expressionLatex: `\\\\frac{dN}{dt} = 0.18 \\\\times 150 \\\\times (1 - \\\\frac{150}{200})`,
                        targetLatex: `\\\\frac{dN}{dt}`,
                        slots: [{ id: "dndt", labelLatex: `\\\\frac{dN}{dt}`, placeholder: "6.8", expected: "6.8" }],
                        correctLatex: `6.8 \\\\text{ individuals/year}`,
                        hintLatex: [
                            `1 - \\\\frac{150}{200} = 1 - 0.75 = 0.25`,
                            `\\\\frac{dN}{dt} = 0.18 \\\\times 150 \\\\times 0.25`,
                            `\\\\frac{dN}{dt} = 6.75 \\\\approx 6.8 \\\\text{ individuals/year}`
                        ]
                    }
                );
            }
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
        { id: "ELITE" as Stage, label: t("sb3_01.stages.elite") },
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
