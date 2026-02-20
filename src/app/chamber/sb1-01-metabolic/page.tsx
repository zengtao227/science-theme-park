"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
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

export default function SB101MetabolicPage() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const [osmolarity, setOsmolarity] = useState(0);
    const [showATP, setShowATP] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): MetabolicQuest[] => {
        const quests: MetabolicQuest[] = [];

        // OSMOSIS stage: 5 questions per difficulty
        if (stage === "OSMOSIS") {
            const scenarios = {
                BASIC: [
                    { status: "hypertonic" as const, target: "leave", osmolarity: 0.8, desc: "0.8 M external" },
                    { status: "hypotonic" as const, target: "enter", osmolarity: 0.2, desc: "0.2 M external" },
                    { status: "isotonic" as const, target: "stable", osmolarity: 0.5, desc: "0.5 M external" },
                    { status: "hypertonic" as const, target: "leave", osmolarity: 0.9, desc: "0.9 M external" },
                    { status: "hypotonic" as const, target: "enter", osmolarity: 0.1, desc: "0.1 M external" }
                ],
                CORE: [
                    { status: "hypertonic" as const, target: "leave", osmolarity: 0.7, desc: "0.7 M external, 0.3 M internal" },
                    { status: "hypotonic" as const, target: "enter", osmolarity: 0.3, desc: "0.3 M external, 0.6 M internal" },
                    { status: "isotonic" as const, target: "stable", osmolarity: 0.5, desc: "0.5 M both sides" },
                    { status: "hypertonic" as const, target: "leave", osmolarity: 0.85, desc: "0.85 M external" },
                    { status: "hypotonic" as const, target: "enter", osmolarity: 0.15, desc: "0.15 M external" }
                ],
                ADVANCED: [
                    { status: "hypertonic" as const, target: "leave", osmolarity: 0.75, desc: "Seawater: 1.0 M NaCl" },
                    { status: "hypotonic" as const, target: "enter", osmolarity: 0.25, desc: "Freshwater: 0.001 M" },
                    { status: "isotonic" as const, target: "stable", osmolarity: 0.5, desc: "Blood plasma: 0.3 M" },
                    { status: "hypertonic" as const, target: "leave", osmolarity: 0.8, desc: "3% NaCl solution" },
                    { status: "hypotonic" as const, target: "enter", osmolarity: 0.2, desc: "0.9% NaCl solution" }
                ],
                ELITE: [
                    { status: "hypertonic" as const, target: "leave", osmolarity: 0.9, desc: "Hypertonic saline: 3% NaCl" },
                    { status: "hypotonic" as const, target: "enter", osmolarity: 0.1, desc: "Distilled water" },
                    { status: "isotonic" as const, target: "stable", osmolarity: 0.5, desc: "Isotonic saline: 0.9% NaCl" },
                    { status: "hypertonic" as const, target: "leave", osmolarity: 0.95, desc: "Dead Sea: 1.24 M" },
                    { status: "hypotonic" as const, target: "enter", osmolarity: 0.05, desc: "Rainwater: 0.0001 M" }
                ]
            };

            const scenarioList = scenarios[difficulty];
            scenarioList.forEach((s, idx) => {
                const statusLabel = t(`sb1_01_metabolic.labels.${s.status}`);
                quests.push({
                    id: `OSM_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    statusKey: s.status,
                    targetOsmolarity: s.osmolarity,
                    promptLatex: t("sb1_01_metabolic.prompts.osmosis_prompt", { status: statusLabel, desc: s.desc }),
                    expressionLatex: `\\\\text{${s.desc}}`,
                    targetLatex: s.target,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Water Flow}", placeholder: "enter/leave/stable", expected: s.target }],
                    correctLatex: s.target,
                    hintLatex: [t(`sb1_01_metabolic.prompts.hint_${s.status === "hypertonic" ? "hyper" : s.status === "hypotonic" ? "hypo" : "iso"}`)]
                });
            });
        }

        // RESPIRATION stage: 5 questions per difficulty
        if (stage === "RESPIRATION") {
            const respirationQuestions = {
                BASIC: [
                    { q: "atp_product", answer: "ATP", equation: "C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + ?" },
                    { q: "glucose_input", answer: "glucose", equation: "? + 6O_2 \\rightarrow 6CO_2 + 6H_2O + ATP" },
                    { q: "oxygen_input", answer: "oxygen", equation: "C_6H_{12}O_6 + ? \\rightarrow 6CO_2 + 6H_2O + ATP" },
                    { q: "co2_product", answer: "CO2", equation: "C_6H_{12}O_6 + 6O_2 \\rightarrow ? + 6H_2O + ATP" },
                    { q: "water_product", answer: "water", equation: "C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + ? + ATP" }
                ],
                CORE: [
                    { q: "atp_count", answer: "36", equation: "\\text{Total ATP from 1 glucose} = ?" },
                    { q: "glycolysis_atp", answer: "2", equation: "\\text{Glycolysis net ATP} = ?" },
                    { q: "krebs_atp", answer: "2", equation: "\\text{Krebs cycle ATP} = ?" },
                    { q: "etc_atp", answer: "32", equation: "\\text{Electron transport chain ATP} = ?" },
                    { q: "nadh_count", answer: "10", equation: "\\text{Total NADH produced} = ?" }
                ],
                ADVANCED: [
                    { q: "nadh_atp", answer: "3", equation: "\\text{ATP per NADH} = ?" },
                    { q: "fadh2_atp", answer: "2", equation: "\\text{ATP per FADH}_2 = ?" },
                    { q: "glycolysis_location", answer: "cytoplasm", equation: "\\text{Glycolysis occurs in} = ?" },
                    { q: "krebs_location", answer: "mitochondria", equation: "\\text{Krebs cycle occurs in} = ?" },
                    { q: "etc_location", answer: "cristae", equation: "\\text{ETC occurs in} = ?" }
                ],
                ELITE: [
                    { q: "proton_gradient", answer: "chemiosmosis", equation: "\\text{ATP synthesis mechanism} = ?" },
                    { q: "atp_synthase", answer: "synthase", equation: "\\text{Enzyme producing ATP} = ?" },
                    { q: "final_acceptor", answer: "oxygen", equation: "\\text{Final electron acceptor} = ?" },
                    { q: "anaerobic_atp", answer: "2", equation: "\\text{ATP without oxygen} = ?" },
                    { q: "fermentation_product", answer: "lactate", equation: "\\text{Muscle fermentation product} = ?" }
                ]
            };

            const respList = respirationQuestions[difficulty];
            respList.forEach((item, idx) => {
                quests.push({
                    id: `RESP_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    promptLatex: t(`sb1_01_metabolic.prompts.resp_${item.q}`),
                    expressionLatex: item.equation,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Answer}", placeholder: "...", expected: item.answer }],
                    correctLatex: item.answer,
                    hintLatex: [t(`sb1_01_metabolic.prompts.hint_${item.q}`)]
                });
            });
        }

        // HOMEOSTASIS stage: 5 questions per difficulty
        if (stage === "HOMEOSTASIS") {
            const homeostasisQuestions = {
                BASIC: [
                    { q: "body_temp", answer: "37", unit: "°C" },
                    { q: "blood_ph", answer: "7.4", unit: "" },
                    { q: "blood_glucose", answer: "90", unit: "mg/dL" },
                    { q: "heart_rate", answer: "70", unit: "bpm" },
                    { q: "blood_pressure", answer: "120", unit: "mmHg" }
                ],
                CORE: [
                    { q: "insulin_effect", answer: "decrease", unit: "" },
                    { q: "glucagon_effect", answer: "increase", unit: "" },
                    { q: "sweat_response", answer: "cooling", unit: "" },
                    { q: "shiver_response", answer: "warming", unit: "" },
                    { q: "kidney_function", answer: "filtration", unit: "" }
                ],
                ADVANCED: [
                    { q: "negative_feedback", answer: "negative", unit: "" },
                    { q: "set_point", answer: "37", unit: "°C" },
                    { q: "receptor_type", answer: "thermoreceptor", unit: "" },
                    { q: "effector_organ", answer: "muscle", unit: "" },
                    { q: "control_center", answer: "hypothalamus", unit: "" }
                ],
                ELITE: [
                    { q: "adh_function", answer: "water", unit: "" },
                    { q: "aldosterone_function", answer: "sodium", unit: "" },
                    { q: "parathyroid_function", answer: "calcium", unit: "" },
                    { q: "thyroid_function", answer: "metabolism", unit: "" },
                    { q: "cortisol_function", answer: "stress", unit: "" }
                ]
            };

            const homeoList = homeostasisQuestions[difficulty];
            homeoList.forEach((item, idx) => {
                quests.push({
                    id: `HOME_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    promptLatex: t(`sb1_01_metabolic.prompts.home_${item.q}`),
                    expressionLatex: `\\text{${item.q.replace(/_/g, ' ')}}`,
                    targetLatex: `${item.answer}${item.unit ? ' \\, \\text{' + item.unit + '}' : ''}`,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Value}", placeholder: "...", expected: item.answer }],
                    correctLatex: `${item.answer}${item.unit ? ' \\, \\text{' + item.unit + '}' : ''}`,
                    hintLatex: [t(`sb1_01_metabolic.prompts.hint_${item.q}`)]
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
    } = useQuestManager<MetabolicQuest, Stage>({
    moduleCode: "sb1-01-metabolic",
        buildPool,
        initialStage: "OSMOSIS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb1-01-metabolic", stage);
        }
    }, [lastCheck, completeStage, stage]);

    useEffect(() => {
        if (currentQuest?.statusKey === "hypertonic") setOsmolarity(0.8);
        else if (currentQuest?.statusKey === "hypotonic") setOsmolarity(0.2);
        else setOsmolarity(0.5);
    }, [currentQuest]);

    const stagesProps = useMemo(() => [
        { id: "OSMOSIS" as Stage, label: t("sb1_01_metabolic.stages.osmosis") },
        { id: "RESPIRATION" as Stage, label: t("sb1_01_metabolic.stages.respiration") },
        { id: "HOMEOSTASIS" as Stage, label: t("sb1_01_metabolic.stages.homeostasis") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      moduleCode="SB1.01"
            title={t("sb1_01_metabolic.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb1_01_metabolic.footer_left")}
            translations={{
                back: t("sb1_01_metabolic.back"),
                check: t("sb1_01_metabolic.check"),
                next: t("sb1_01_metabolic.next"),
                correct: t("sb1_01_metabolic.correct"),
                incorrect: t("sb1_01_metabolic.incorrect"),
                ready: t("sb1_01_metabolic.ready"),
                monitor_title: t("sb1_01_metabolic.monitor_title"),
                difficulty: {
                    basic: t("sb1_01_metabolic.difficulty.basic"),
                    core: t("sb1_01_metabolic.difficulty.core"),
                    advanced: t("sb1_01_metabolic.difficulty.advanced"),
                    elite: t("sb1_01_metabolic.difficulty.elite"),
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
                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowATP(!showATP)}
                            className={`p-3 rounded-lg border transition-all text-[10px] font-black tracking-widest uppercase ${showATP
                                ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                }`}
                        >
                            {t("sb1_01_metabolic.labels.atp_flow")}
                        </button>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex flex-col justify-center">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t("sb1_01_metabolic.labels.status")}</div>
                            <div className="text-xs font-mono text-neon-cyan truncate uppercase">
                                {currentQuest?.statusKey ? t(`sb1_01_metabolic.labels.${currentQuest?.statusKey}`) : "STABLE"}
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>Metabolic Flux</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-neon-cyan shadow-[0_0_5px_cyan]" : "bg-transparent"
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
                            <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                                {t("labels.mission_objective")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sb1_01_metabolic.labels.analysis")}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest?.expressionLatex || ""} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    {t("labels.terminal_input")} [Flux-Controller]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest?.slots.map((slot) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">NODE_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/20 transition-all blur-sm" />
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
                                                        {lastCheck.ok ? t("sb1_01_metabolic.results.valid") : t("sb1_01_metabolic.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb1_01_metabolic.results.valid_desc") : t("sb1_01_metabolic.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("labels.hint")}:</span>
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
                                                    {t("sb1_01_metabolic.results.next")}
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
