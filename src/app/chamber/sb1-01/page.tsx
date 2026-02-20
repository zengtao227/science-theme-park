"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CellCanvas from "@/components/chamber/sb1-01/CellCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "IDENTIFICATION" | "FUNCTION" | "ORGANELLES";

interface SB101Quest extends Quest {
    stage: Stage;
    targetOrganelleId: string;
    organelleName: string;
}

export default function SB101Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);
    const [showCutaway, setShowCutaway] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB101Quest[] => {
        const quests: SB101Quest[] = [];

        // IDENTIFICATION stage: 5 questions per difficulty
        if (stage === "IDENTIFICATION") {
            const organelles = {
                BASIC: [
                    { id: "nucleus", key: "nucleus", size: "10" },
                    { id: "mitochondria1", key: "mitochondria", size: "2" },
                    { id: "ribosome1", key: "ribosome", size: "0.025" },
                    { id: "golgi", key: "golgi", size: "1" },
                    { id: "er", key: "er", size: "variable" }
                ],
                CORE: [
                    { id: "lysosome", key: "lysosome", size: "0.5" },
                    { id: "peroxisome", key: "peroxisome", size: "0.5" },
                    { id: "centrosome", key: "centrosome", size: "0.2" },
                    { id: "vacuole", key: "vacuole", size: "variable" },
                    { id: "cytoskeleton", key: "cytoskeleton", size: "network" }
                ],
                ADVANCED: [
                    { id: "nucleolus", key: "nucleolus", size: "1" },
                    { id: "nuclear_pore", key: "nuclear_pore", size: "0.1" },
                    { id: "smooth_er", key: "smooth_er", size: "variable" },
                    { id: "rough_er", key: "rough_er", size: "variable" },
                    { id: "centriole", key: "centriole", size: "0.2" }
                ],
                ELITE: [
                    { id: "microtubule", key: "microtubule", size: "0.025" },
                    { id: "microfilament", key: "microfilament", size: "0.007" },
                    { id: "intermediate_filament", key: "intermediate_filament", size: "0.010" },
                    { id: "nuclear_envelope", key: "nuclear_envelope", size: "0.04" },
                    { id: "cristae", key: "cristae", size: "0.02" }
                ]
            };

            const orgList = organelles[difficulty];
            orgList.forEach((org, idx) => {
                quests.push({
                    id: `ID_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    targetOrganelleId: org.id,
                    organelleName: org.key,
                    promptLatex: t("sb1_01.prompts.id_prompt", { organelle: org.key }),
                    expressionLatex: `\\\\text{Size: } ${org.size} \\, \\mu\\\\text{m}`,
                    targetLatex: org.key,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Organelle}", placeholder: "...", expected: org.key }],
                    correctLatex: org.key,
                    hintLatex: [t("sb1_01.prompts.hint_start", { char: org.key[0].toUpperCase() })]
                });
            });
        }

        // FUNCTION stage: 5 questions per difficulty
        if (stage === "FUNCTION") {
            const functions = {
                BASIC: [
                    { org: "nucleus", func: "DNA storage", answer: "nucleus" },
                    { org: "mitochondria", func: "ATP production", answer: "mitochondria" },
                    { org: "ribosome", func: "protein synthesis", answer: "ribosome" },
                    { org: "golgi", func: "protein packaging", answer: "golgi" },
                    { org: "er", func: "protein transport", answer: "er" }
                ],
                CORE: [
                    { org: "lysosome", func: "cellular digestion", answer: "lysosome" },
                    { org: "peroxisome", func: "lipid metabolism", answer: "peroxisome" },
                    { org: "centrosome", func: "microtubule organization", answer: "centrosome" },
                    { org: "vacuole", func: "storage and turgor", answer: "vacuole" },
                    { org: "cytoskeleton", func: "structural support", answer: "cytoskeleton" }
                ],
                ADVANCED: [
                    { org: "nucleolus", func: "ribosome assembly", answer: "nucleolus" },
                    { org: "nuclear_pore", func: "nuclear transport", answer: "nuclear_pore" },
                    { org: "smooth_er", func: "lipid synthesis", answer: "smooth_er" },
                    { org: "rough_er", func: "protein synthesis", answer: "rough_er" },
                    { org: "centriole", func: "spindle formation", answer: "centriole" }
                ],
                ELITE: [
                    { org: "microtubule", func: "intracellular transport", answer: "microtubule" },
                    { org: "microfilament", func: "cell motility", answer: "microfilament" },
                    { org: "intermediate_filament", func: "mechanical strength", answer: "intermediate_filament" },
                    { org: "nuclear_envelope", func: "nuclear compartmentalization", answer: "nuclear_envelope" },
                    { org: "cristae", func: "ATP synthesis surface", answer: "cristae" }
                ]
            };

            const funcList = functions[difficulty];
            funcList.forEach((item, idx) => {
                quests.push({
                    id: `FN_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    targetOrganelleId: item.org,
                    organelleName: item.org,
                    promptLatex: t("sb1_01.prompts.fn_prompt", { func: item.func }),
                    expressionLatex: `\\\\text{Function: } \\\\text{${item.func}}`,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Organelle}", placeholder: "...", expected: item.answer }],
                    correctLatex: item.answer,
                    hintLatex: [t("sb1_01.prompts.hint_func", { func: item.func })]
                });
            });
        }

        // ORGANELLES stage: 5 questions per difficulty (comparative/quantitative)
        if (stage === "ORGANELLES") {
            const comparisons = {
                BASIC: [
                    { q: "count_mitochondria", answer: "100", unit: "" },
                    { q: "count_ribosomes", answer: "10000", unit: "" },
                    { q: "nucleus_diameter", answer: "10", unit: "μm" },
                    { q: "cell_diameter", answer: "20", unit: "μm" },
                    { q: "mitochondria_length", answer: "2", unit: "μm" }
                ],
                CORE: [
                    { q: "golgi_cisternae", answer: "6", unit: "" },
                    { q: "lysosome_count", answer: "50", unit: "" },
                    { q: "er_percentage", answer: "10", unit: "%" },
                    { q: "nuclear_pores", answer: "3000", unit: "" },
                    { q: "peroxisome_count", answer: "100", unit: "" }
                ],
                ADVANCED: [
                    { q: "atp_per_glucose", answer: "36", unit: "ATP" },
                    { q: "protein_synthesis_rate", answer: "20", unit: "aa/s" },
                    { q: "membrane_thickness", answer: "7.5", unit: "nm" },
                    { q: "microtubule_diameter", answer: "25", unit: "nm" },
                    { q: "ribosome_diameter", answer: "25", unit: "nm" }
                ],
                ELITE: [
                    { q: "cristae_surface_area", answer: "40", unit: "μm^2" },
                    { q: "nuclear_dna_length", answer: "2", unit: "m" },
                    { q: "golgi_transit_time", answer: "30", unit: "min" },
                    { q: "lysosome_ph", answer: "4.5", unit: "" },
                    { q: "mitochondrial_dna", answer: "37", unit: "genes" }
                ]
            };

            const compList = comparisons[difficulty];
            compList.forEach((item, idx) => {
                quests.push({
                    id: `ORG_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    targetOrganelleId: "cell",
                    organelleName: "cell",
                    promptLatex: t(`sb1_01.prompts.org_${item.q}`),
                    expressionLatex: `\\text{${item.q.replace(/_/g, ' ')}}`,
                    targetLatex: `${item.answer}${item.unit ? ' \\, \\text{' + item.unit + '}' : ''}`,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Value}", placeholder: "...", expected: item.answer }],
                    correctLatex: `${item.answer}${item.unit ? ' \\, \\text{' + item.unit + '}' : ''}`,
                    hintLatex: [t("sb1_01.prompts.hint_range", { min: Math.floor(parseFloat(item.answer) * 0.8), max: Math.ceil(parseFloat(item.answer) * 1.2) })]
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
      adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SB101Quest, Stage>({
    moduleCode: "sb1-01",
        buildPool,
        initialStage: "IDENTIFICATION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb1-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "IDENTIFICATION" as Stage, label: t("sb1_01.stages.identification") },
        { id: "FUNCTION" as Stage, label: t("sb1_01.stages.function") },
        { id: "ORGANELLES" as Stage, label: t("sb1_01.stages.organelles") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      moduleCode="SB1.01"
            title={t("sb1_01.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb1_01.footer_left")}
            translations={{
                back: t("sb1_01.back"),
                check: t("sb1_01.check"),
                next: t("sb1_01.next"),
                correct: t("sb1_01.correct"),
                incorrect: t("sb1_01.incorrect"),
                ready: t("sb1_01.ready"),
                monitor_title: t("sb1_01.monitor_title"),
                difficulty: {
                    basic: t("sb1_01.difficulty.basic"),
                    core: t("sb1_01.difficulty.core"),
                    advanced: t("sb1_01.difficulty.advanced"),
                    elite: t("sb1_01.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <CellCanvas
                            selectedOrganelle={currentQuest?.targetOrganelleId || selectedOrganelle}
                            onSelectOrganelle={setSelectedOrganelle}
                            showCutaway={showCutaway}
                            translations={t("sb1_01")}
                        />
                    </div>
                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowCutaway(!showCutaway)}
                            className={`p-3 rounded-lg border transition-all text-[10px] font-black tracking-widest uppercase ${showCutaway
                                ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                }`}
                        >
                            {t("sb1_01.labels.cutaway_view")}
                        </button>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex flex-col justify-center">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t("sb1_01.labels.selected")}</div>
                            <div className="text-xs font-mono text-neon-cyan truncate uppercase">
                                {selectedOrganelle || "NONE"}
                            </div>
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
                                    {t("sb1_01.results.analysis")}
                                </span>
                                <div className="text-4xl text-white font-black uppercase">
                                    <InlineMath math={currentQuest?.expressionLatex || ""} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    {t("labels.terminal_input")} [Bio-Node]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest?.slots.map((slot) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">SEQ_0x{slot.id.toUpperCase()}</span>
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
                                                        {lastCheck.ok ? t("sb1_01.results.valid") : t("sb1_01.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb1_01.results.valid_desc") : t("sb1_01.results.invalid_desc")}
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
                                                    {t("sb1_01.results.next")}
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
