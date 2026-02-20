"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PhotosynthesisCanvas from "@/components/chamber/sb1-02/PhotosynthesisCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "EQUATION" | "FACTORS" | "CHLOROPLAST";

interface SB102Quest extends Quest {
    stage: Stage;
    factor?: string;
    structure?: string;
}

export default function SB102Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [lightIntensity, setLightIntensity] = useState(50);
    const [co2Level, setCo2Level] = useState(50);
    const [temperature, setTemperature] = useState(25);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB102Quest[] => {
        const quests: SB102Quest[] = [];

        // EQUATION stage: 5 questions per difficulty
        if (stage === "EQUATION") {
            const equations = {
                BASIC: [
                    { q: "oxygen_product", answer: "O2", equation: "6CO_2 + 6H_2O + \\text{light} \\rightarrow C_6H_{12}O_6 + ?" },
                    { q: "glucose_product", answer: "glucose", equation: "6CO_2 + 6H_2O \\rightarrow ? + 6O_2" },
                    { q: "co2_count", answer: "6", equation: "?CO_2 + 6H_2O \\rightarrow C_6H_{12}O_6 + 6O_2" },
                    { q: "water_count", answer: "6", equation: "6CO_2 + ?H_2O \\rightarrow C_6H_{12}O_6 + 6O_2" },
                    { q: "light_requirement", answer: "light", equation: "6CO_2 + 6H_2O + ? \\rightarrow C_6H_{12}O_6 + 6O_2" }
                ],
                CORE: [
                    { q: "carbon_atoms", answer: "6", equation: "\\text{Carbon atoms in glucose} = ?" },
                    { q: "oxygen_atoms_product", answer: "12", equation: "\\text{Oxygen atoms in 6O}_2 = ?" },
                    { q: "hydrogen_atoms", answer: "12", equation: "\\text{Hydrogen atoms in glucose} = ?" },
                    { q: "water_molecules", answer: "6", equation: "\\text{Water molecules needed} = ?" },
                    { q: "co2_molecules", answer: "6", equation: "\\text{CO}_2 \\text{ molecules needed} = ?" }
                ],
                ADVANCED: [
                    { q: "light_dependent", answer: "thylakoid", equation: "\\text{Light reactions occur in} = ?" },
                    { q: "light_independent", answer: "stroma", equation: "\\text{Calvin cycle occurs in} = ?" },
                    { q: "nadph_production", answer: "NADPH", equation: "\\text{Electron carrier produced} = ?" },
                    { q: "atp_production", answer: "ATP", equation: "\\text{Energy molecule produced} = ?" },
                    { q: "water_splitting", answer: "photolysis", equation: "\\text{Water splitting process} = ?" }
                ],
                ELITE: [
                    { q: "photosystem_ii", answer: "P680", equation: "\\text{Photosystem II reaction center} = ?" },
                    { q: "photosystem_i", answer: "P700", equation: "\\text{Photosystem I reaction center} = ?" },
                    { q: "electron_transport", answer: "plastoquinone", equation: "\\text{Electron carrier between PS II and PS I} = ?" },
                    { q: "carbon_fixation", answer: "RuBisCO", equation: "\\text{Enzyme fixing CO}_2 = ?" },
                    { q: "g3p_molecules", answer: "2", equation: "\\text{G3P molecules per glucose} = ?" }
                ]
            };

            const eqList = equations[difficulty];
            eqList.forEach((item, idx) => {
                quests.push({
                    id: `EQ_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    promptLatex: t(`sb1_02.prompts.eq_${item.q}`),
                    expressionLatex: item.equation,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Answer}", placeholder: "...", expected: item.answer }],
                    correctLatex: item.answer,
                    hintLatex: [t(`sb1_02.prompts.hint_${item.q}`)]
                });
            });
        }

        // FACTORS stage: 5 questions per difficulty
        if (stage === "FACTORS") {
            const factors = {
                BASIC: [
                    { factor: "light", effect: "increase", answer: "increase" },
                    { factor: "co2", effect: "increase", answer: "increase" },
                    { factor: "temperature", effect: "increase", answer: "increase" },
                    { factor: "water", effect: "increase", answer: "increase" },
                    { factor: "chlorophyll", effect: "increase", answer: "increase" }
                ],
                CORE: [
                    { factor: "light_saturation", effect: "plateau", answer: "plateau" },
                    { factor: "co2_saturation", effect: "plateau", answer: "plateau" },
                    { factor: "temperature_optimal", effect: "optimal", answer: "25" },
                    { factor: "light_compensation", effect: "zero", answer: "compensation" },
                    { factor: "limiting_factor", effect: "slowest", answer: "limiting" }
                ],
                ADVANCED: [
                    { factor: "c3_plants", effect: "photorespiration", answer: "photorespiration" },
                    { factor: "c4_plants", effect: "efficient", answer: "efficient" },
                    { factor: "cam_plants", effect: "nocturnal", answer: "nocturnal" },
                    { factor: "stomata_open", effect: "increase", answer: "increase" },
                    { factor: "stomata_closed", effect: "decrease", answer: "decrease" }
                ],
                ELITE: [
                    { factor: "quantum_yield", effect: "efficiency", answer: "8" },
                    { factor: "action_spectrum", effect: "blue_red", answer: "blue" },
                    { factor: "absorption_spectrum", effect: "chlorophyll", answer: "chlorophyll" },
                    { factor: "light_saturation_point", effect: "maximum", answer: "1000" },
                    { factor: "co2_compensation_point", effect: "minimum", answer: "50" }
                ]
            };

            const factorList = factors[difficulty];
            factorList.forEach((item, idx) => {
                quests.push({
                    id: `FACT_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    factor: item.factor,
                    promptLatex: t(`sb1_02.prompts.factor_${item.factor}`),
                    expressionLatex: `\\text{${item.factor.replace(/_/g, ' ')}} \\rightarrow ?`,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Effect}", placeholder: "...", expected: item.answer }],
                    correctLatex: item.answer,
                    hintLatex: [t(`sb1_02.prompts.hint_factor_${item.factor}`)]
                });
            });
        }

        // CHLOROPLAST stage: 5 questions per difficulty
        if (stage === "CHLOROPLAST") {
            const structures = {
                BASIC: [
                    { name: "thylakoid", function: "light reactions" },
                    { name: "stroma", function: "calvin cycle" },
                    { name: "grana", function: "stacked thylakoids" },
                    { name: "chlorophyll", function: "light absorption" },
                    { name: "membrane", function: "outer boundary" }
                ],
                CORE: [
                    { name: "lumen", function: "proton reservoir" },
                    { name: "stroma_lamellae", function: "connecting thylakoids" },
                    { name: "photosystem", function: "light harvesting" },
                    { name: "atp_synthase", function: "ATP production" },
                    { name: "rubisco", function: "carbon fixation" }
                ],
                ADVANCED: [
                    { name: "antenna_complex", function: "light collection" },
                    { name: "reaction_center", function: "electron excitation" },
                    { name: "plastocyanin", function: "electron transport" },
                    { name: "ferredoxin", function: "NADPH production" },
                    { name: "cytochrome_b6f", function: "proton pumping" }
                ],
                ELITE: [
                    { name: "psii_core", function: "water oxidation" },
                    { name: "psi_core", function: "NADP+ reduction" },
                    { name: "oxygen_evolving_complex", function: "O2 release" },
                    { name: "calvin_cycle_enzymes", function: "carbon reduction" },
                    { name: "starch_granules", function: "glucose storage" }
                ]
            };

            const structList = structures[difficulty];
            structList.forEach((item, idx) => {
                quests.push({
                    id: `STRUCT_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    structure: item.name,
                    promptLatex: t(`sb1_02.prompts.struct_${item.name}`),
                    expressionLatex: `\\\\text{${item.function}} \\rightarrow ?`,
                    targetLatex: item.name,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Structure}", placeholder: "...", expected: item.name }],
                    correctLatex: item.name,
                    hintLatex: [t(`sb1_02.prompts.hint_struct_${item.name}`)]
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
      adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SB102Quest, Stage>({
    moduleCode: "sb1-02",
        buildPool,
        initialStage: "EQUATION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb1-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "EQUATION" as Stage, label: t("sb1_02.stages.equation") },
        { id: "FACTORS" as Stage, label: t("sb1_02.stages.factors") },
        { id: "CHLOROPLAST" as Stage, label: t("sb1_02.stages.chloroplast") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      moduleCode="SB1.02"
            title={t("sb1_02.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb1_02.footer_left")}
            translations={{
                back: t("sb1_02.back"),
                check: t("sb1_02.check"),
                next: t("sb1_02.next"),
                correct: t("sb1_02.correct"),
                incorrect: t("sb1_02.incorrect"),
                ready: t("sb1_02.ready"),
                monitor_title: t("sb1_02.monitor_title"),
                difficulty: {
                    basic: t("sb1_02.difficulty.basic"),
                    core: t("sb1_02.difficulty.core"),
                    advanced: t("sb1_02.difficulty.advanced"),
                    elite: t("sb1_02.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <PhotosynthesisCanvas
                            lightIntensity={lightIntensity}
                            co2Level={co2Level}
                            temperature={temperature}
                            stage={stage}
                            translations={t("sb1_02")}
                        />
                    </div>

                    {/* Environmental Controls */}
                    <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t("sb1_02.labels.light")}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={lightIntensity}
                                    onChange={(e) => setLightIntensity(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-green"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-10 text-right">{lightIntensity}%</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t("sb1_02.labels.co2")}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={co2Level}
                                    onChange={(e) => setCo2Level(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-cyan"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-10 text-right">{co2Level}%</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t("sb1_02.labels.temp")}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={temperature}
                                    onChange={(e) => setTemperature(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-amber"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-12 text-right">{temperature}°C</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t("sb1_02.labels.efficiency")}</span>
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
                                {t("labels.mission_objective")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-green/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-green/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sb1_02.labels.reaction_display")}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest?.expressionLatex || ""} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-green/30" />
                                    {t("labels.terminal_input")}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest?.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-green/30 font-mono">PHOTO_0x{slot.id.toUpperCase()}</span>
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
                                                        {lastCheck.ok ? t("sb1_02.results.valid") : t("sb1_02.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb1_02.results.valid_desc") : t("sb1_02.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("labels.hint")}:</span>
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
                                                    {t("sb1_02.results.next")}
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
