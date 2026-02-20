"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ImmuneCanvas from "@/components/chamber/gb3-02/ImmuneCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "INNATE" | "ADAPTIVE" | "VACCINES";

interface GB302Quest extends Quest {
    stage: Stage;
    scenario?: string;
    data?: any;
}

export default function GB302Immunology() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [antigenLoad] = useState(100);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GB302Quest[] => {
        const quests: GB302Quest[] = [];

        // Each stage × difficulty = 5 questions (60 total)
        const questData: Record<Stage, Record<Difficulty, Array<{
            pathogen: string;
            cell: string;
            role: string;
            scenario: string;
            lag?: number;
            prim?: number;
            expected: string;
        }>>> = {
            INNATE: {
                BASIC: [
                    { pathogen: "Staphylococcus", cell: "Macrophages", role: "phagocytosis", scenario: "basel_hospital_infectious", expected: "Macrophages" },
                    { pathogen: "E. coli", cell: "Neutrophils", role: "first response", scenario: "basel_hospital_infectious", expected: "Neutrophils" },
                    { pathogen: "Streptococcus", cell: "Macrophages", role: "engulfment", scenario: "basel_hospital_infectious", expected: "Macrophages" },
                    { pathogen: "Salmonella", cell: "Neutrophils", role: "rapid attack", scenario: "basel_hospital_infectious", expected: "Neutrophils" },
                    { pathogen: "Pseudomonas", cell: "Macrophages", role: "digestion", scenario: "basel_hospital_infectious", expected: "Macrophages" }
                ],
                CORE: [
                    { pathogen: "Influenza virus", cell: "Natural Killer Cells", role: "viral defense", scenario: "autoimmune_center", expected: "Natural Killer Cells" },
                    { pathogen: "Herpes virus", cell: "Natural Killer Cells", role: "infected cell lysis", scenario: "autoimmune_center", expected: "Natural Killer Cells" },
                    { pathogen: "Candida", cell: "Macrophages", role: "fungal clearance", scenario: "basel_hospital_infectious", expected: "Macrophages" },
                    { pathogen: "Listeria", cell: "Neutrophils", role: "bacterial killing", scenario: "basel_hospital_infectious", expected: "Neutrophils" },
                    { pathogen: "Adenovirus", cell: "Natural Killer Cells", role: "apoptosis induction", scenario: "autoimmune_center", expected: "Natural Killer Cells" }
                ],
                ADVANCED: [
                    { pathogen: "HIV", cell: "Natural Killer Cells", role: "perforin release", scenario: "autoimmune_center", expected: "Natural Killer Cells" },
                    { pathogen: "Mycobacterium", cell: "Macrophages", role: "granuloma formation", scenario: "basel_hospital_infectious", expected: "Macrophages" },
                    { pathogen: "Cytomegalovirus", cell: "Natural Killer Cells", role: "granzyme delivery", scenario: "autoimmune_center", expected: "Natural Killer Cells" },
                    { pathogen: "Aspergillus", cell: "Neutrophils", role: "oxidative burst", scenario: "basel_hospital_infectious", expected: "Neutrophils" },
                    { pathogen: "Toxoplasma", cell: "Macrophages", role: "parasite containment", scenario: "basel_hospital_infectious", expected: "Macrophages" }
                ],
                ELITE: [
                    { pathogen: "Ebola virus", cell: "Natural Killer Cells", role: "cytokine storm prevention", scenario: "autoimmune_center", expected: "Natural Killer Cells" },
                    { pathogen: "Plasmodium", cell: "Macrophages", role: "hemozoin clearance", scenario: "basel_hospital_infectious", expected: "Macrophages" },
                    { pathogen: "SARS-CoV-2", cell: "Natural Killer Cells", role: "ACE2 protection", scenario: "autoimmune_center", expected: "Natural Killer Cells" },
                    { pathogen: "Leishmania", cell: "Macrophages", role: "phagolysosome fusion", scenario: "basel_hospital_infectious", expected: "Macrophages" },
                    { pathogen: "Dengue virus", cell: "Natural Killer Cells", role: "antibody-dependent enhancement", scenario: "autoimmune_center", expected: "Natural Killer Cells" }
                ]
            },
            ADAPTIVE: {
                BASIC: [
                    { pathogen: "A-type spike", cell: "Plasma B cells", role: "antibody secretion", scenario: "roche_immunology", expected: "antibody secretion" },
                    { pathogen: "B-type spike", cell: "Plasma B cells", role: "IgG production", scenario: "roche_immunology", expected: "IgG production" },
                    { pathogen: "C-type spike", cell: "Plasma B cells", role: "IgM production", scenario: "roche_immunology", expected: "IgM production" },
                    { pathogen: "D-type spike", cell: "Plasma B cells", role: "antibody release", scenario: "roche_immunology", expected: "antibody release" },
                    { pathogen: "E-type spike", cell: "Plasma B cells", role: "immunoglobulin synthesis", scenario: "roche_immunology", expected: "immunoglobulin synthesis" }
                ],
                CORE: [
                    { pathogen: "Viral peptide", cell: "Cytotoxic T cells", role: "apoptosis induction", scenario: "autoimmune_center", expected: "apoptosis induction" },
                    { pathogen: "Tumor antigen", cell: "Cytotoxic T cells", role: "perforin release", scenario: "autoimmune_center", expected: "perforin release" },
                    { pathogen: "Bacterial peptide", cell: "Helper T cells", role: "cytokine release", scenario: "vaccine_research", expected: "cytokine release" },
                    { pathogen: "Fungal antigen", cell: "Helper T cells", role: "IL-2 secretion", scenario: "vaccine_research", expected: "IL-2 secretion" },
                    { pathogen: "Parasite antigen", cell: "Cytotoxic T cells", role: "granzyme delivery", scenario: "autoimmune_center", expected: "granzyme delivery" }
                ],
                ADVANCED: [
                    { pathogen: "MHC-I complex", cell: "Cytotoxic T cells", role: "CD8 recognition", scenario: "autoimmune_center", expected: "CD8 recognition" },
                    { pathogen: "MHC-II complex", cell: "Helper T cells", role: "CD4 activation", scenario: "vaccine_research", expected: "CD4 activation" },
                    { pathogen: "Superantigen", cell: "Helper T cells", role: "polyclonal activation", scenario: "vaccine_research", expected: "polyclonal activation" },
                    { pathogen: "Hapten-carrier", cell: "Plasma B cells", role: "hapten-specific IgG", scenario: "roche_immunology", expected: "hapten-specific IgG" },
                    { pathogen: "Cross-reactive epitope", cell: "Cytotoxic T cells", role: "molecular mimicry", scenario: "autoimmune_center", expected: "molecular mimicry" }
                ],
                ELITE: [
                    { pathogen: "Hypervariable region", cell: "Plasma B cells", role: "affinity maturation", scenario: "roche_immunology", expected: "affinity maturation" },
                    { pathogen: "Somatic hypermutation", cell: "Plasma B cells", role: "antibody diversity", scenario: "roche_immunology", expected: "antibody diversity" },
                    { pathogen: "Class switching signal", cell: "Plasma B cells", role: "IgG to IgA", scenario: "roche_immunology", expected: "IgG to IgA" },
                    { pathogen: "Regulatory T cell", cell: "Helper T cells", role: "immune suppression", scenario: "vaccine_research", expected: "immune suppression" },
                    { pathogen: "Memory T cell", cell: "Cytotoxic T cells", role: "rapid recall", scenario: "autoimmune_center", expected: "rapid recall" }
                ]
            },
            VACCINES: {
                BASIC: [
                    { lag: 2, prim: 10, expected: "5", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 3, prim: 12, expected: "4", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 4, prim: 16, expected: "4", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 5, prim: 20, expected: "4", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 2.5, prim: 15, expected: "6", scenario: "vaccine_research", pathogen: "", cell: "", role: "" }
                ],
                CORE: [
                    { lag: 1.5, prim: 12, expected: "8", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 1, prim: 14, expected: "14", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 2, prim: 18, expected: "9", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 1.2, prim: 12, expected: "10", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 0.8, prim: 16, expected: "20", scenario: "vaccine_research", pathogen: "", cell: "", role: "" }
                ],
                ADVANCED: [
                    { lag: 0.5, prim: 10, expected: "20", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 0.75, prim: 15, expected: "20", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 1.25, prim: 20, expected: "16", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 0.6, prim: 12, expected: "20", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 0.9, prim: 18, expected: "20", scenario: "vaccine_research", pathogen: "", cell: "", role: "" }
                ],
                ELITE: [
                    { lag: 0.3, prim: 12, expected: "40", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 0.4, prim: 16, expected: "40", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 0.25, prim: 10, expected: "40", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 0.35, prim: 14, expected: "40", scenario: "vaccine_research", pathogen: "", cell: "", role: "" },
                    { lag: 0.5, prim: 20, expected: "40", scenario: "vaccine_research", pathogen: "", cell: "", role: "" }
                ]
            }
        };

        const dataList = questData[stage][difficulty];
        dataList.forEach((data, idx) => {
            if (stage === "VACCINES") {
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: data.scenario,
                    promptLatex: `\\text{${t("gb3_02.prompts.memory_response").replace('{lag}', data.lag!.toString()).replace('{primary_lag}', data.prim!.toString())}}`,
                    expressionLatex: "\\\\text{Factor} = \\\\frac{\\\\text{Primary Lag}}{\\\\text{Secondary Lag}}",
                    targetLatex: data.expected,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Factor}", placeholder: "...", expected: data.expected }],
                    correctLatex: `${data.expected}x`,
                    hintLatex: [`\\text{${t("gb3_02.prompts.hint_memory")}}`]
                });
            } else if (stage === "INNATE") {
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: data.scenario,
                    promptLatex: `\\text{${t("gb3_02.prompts.innate_defense").replace("{pathogen}", data.pathogen)}}`,
                    expressionLatex: "",
                    targetLatex: `\\\\text{${data.cell}}`,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Cell type}", placeholder: "...", expected: data.cell }],
                    correctLatex: data.cell,
                    hintLatex: [`\\text{${t("gb3_02.prompts.hint_innate")}}`]
                });
            } else {
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: data.scenario,
                    promptLatex: `\\text{${t("gb3_02.prompts.adaptive_function").replace("{cell}", data.cell)}}`,
                    expressionLatex: "",
                    targetLatex: `\\\\text{${data.role}}`,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Function}", placeholder: "...", expected: data.role }],
                    correctLatex: data.role,
                    hintLatex: [`\\text{${t("gb3_02.prompts.hint_adaptive")}}`]
                });
            }
        });

        return quests;
    }, [t]);

    const {
        stage,
        difficulty,
        currentQuest,
        handleStageChange,
        handleDifficultyChange,
        currentStageStats,
        verify,
        next,
        inputs,
        setInputs,
        lastCheck, adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<GB302Quest, Stage>({
    moduleCode: "gb3-02",
        buildPool: buildStagePool,
        initialStage: "INNATE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("GB3.02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const activeScenario = useMemo(() => {
        if (currentQuest?.scenario) {
            return t(`gb3_02.scenarios.${currentQuest?.scenario}`);
        }
        return t("gb3_02.scenarios.basel_hospital_infectious");
    }, [t, currentQuest]);

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("gb3_02.title")}
            moduleCode="GB3.02"
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            stages={[
                { id: "INNATE", label: t("gb3_02.stages.innate") },
                { id: "ADAPTIVE", label: t("gb3_02.stages.adaptive") },
                { id: "VACCINES", label: t("gb3_02.stages.vaccines") },
            ]}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            translations={{
                back: t("gb3_02.back"),
                check: t("gb3_02.check"),
                next: t("gb3_02.next"),
                correct: t("gb3_02.correct"),
                incorrect: t("gb3_02.incorrect"),
                ready: t("gb3_02.ready"),
                monitor_title: t("gb3_02.monitor_title"),
                difficulty: {
                    basic: t("gb3_02.difficulty.basic"),
                    core: t("gb3_02.difficulty.core"),
                    advanced: t("gb3_02.difficulty.advanced"),
                    elite: t("gb3_02.difficulty.elite"),
                },
            }}
            checkStatus={lastCheck}
            onVerify={verify}
            onNext={next}
            footerLeft={t("gb3_02.footer_left")}
            monitorContent={[
                <div key="stats" className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">{t("gb3_02.monitor_title")}</span>
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
                            {t("gb3_02.objective_title")}
                        </div>

                        <AnimatePresence mode="wait">
                            {currentQuest && (
                                <motion.div
                                    key={currentQuest?.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                        <div className="text-lg text-white/90 leading-relaxed mb-4">
                                            <BlockMath math={currentQuest?.promptLatex || ""} />
                                        </div>
                                        {currentQuest?.expressionLatex && (
                                            <div className="p-4 bg-black/30 rounded-lg border border-white/5 flex justify-center">
                                                <BlockMath math={currentQuest?.expressionLatex || ""} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Section */}
                                    <div className="space-y-6">
                                        {currentQuest?.slots.map((slot) => (
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
                                            {t("gb3_02.check")}
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
                                <div className="text-[8px] uppercase tracking-widest text-white/40 mb-2">{t("gb3_02.labels.antigen_count")}</div>
                                <div className="text-2xl font-mono text-pink-500">{antigenLoad}</div>
                            </div>

                            <div className="absolute top-4 right-4 p-4 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg">
                                <div className="text-[8px] uppercase tracking-widest text-white/40 mb-2">{t("gb3_02.labels.antibody_titer")}</div>
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
