"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import { motion, AnimatePresence } from "framer-motion";

const OrganicCanvas = dynamic(() => import("@/components/chamber/gc2-01/OrganicCanvas"), {
    ssr: false,
});

type Stage = "ALKANES" | "AROMATICS" | "BIOMOLECULES";

interface OrganicQuest extends Quest {
    stage: Stage;
    simConfig: {
        molecule: "methane" | "ethane" | "benzene" | "glucose" | "alanine";
        showBonds: boolean;
        showHydrogens: boolean;
    };
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): OrganicQuest[] {
    const quests: OrganicQuest[] = [];

    // Each stage × difficulty = 5 questions (60 total)
    const questData = {
        BASIC: [
            { key: "atom_count", molecule: "methane" as const, expected: "5" },
            { key: "carbon_count", molecule: "ethane" as const, expected: "2" },
            { key: "hydrogen_count", molecule: "methane" as const, expected: "4" },
            { key: "bond_count", molecule: "ethane" as const, expected: "7" },
            { key: "mol_formula", molecule: "methane" as const, expected: "CH4" }
        ],
        CORE: [
            { key: "bond_type", molecule: "benzene" as const, expected: "delocalized" },
            { key: "mol_type", molecule: "ethane" as const, expected: "alkane" },
            { key: "saturation", molecule: "benzene" as const, expected: "unsaturated" },
            { key: "hybridization", molecule: "methane" as const, expected: "sp3" },
            { key: "geometry", molecule: "methane" as const, expected: "tetrahedral" }
        ],
        ADVANCED: [
            { key: "aromatic_test", molecule: "benzene" as const, expected: "yes" },
            { key: "functional_id", molecule: "glucose" as const, expected: "hydroxyl" },
            { key: "isomer_count", molecule: "ethane" as const, expected: "1" },
            { key: "resonance", molecule: "benzene" as const, expected: "yes" },
            { key: "ring_strain", molecule: "benzene" as const, expected: "no" }
        ],
        ELITE: [
            { key: "amino_acid", molecule: "alanine" as const, expected: "amino" },
            { key: "chirality", molecule: "alanine" as const, expected: "yes" },
            { key: "peptide_bond", molecule: "alanine" as const, expected: "amide" },
            { key: "sugar_type", molecule: "glucose" as const, expected: "aldose" },
            { key: "biomolecule_class", molecule: "glucose" as const, expected: "carbohydrate" }
        ]
    };

    const dataList = questData[difficulty];
    dataList.forEach((data, idx) => {
        quests.push({
            id: `${stage}_${difficulty[0]}${idx + 1}`,
            difficulty,
            stage,
            promptLatex: `\\\\text{${t(`gc2_01.prompts.${data.key}`)}}`,
            expressionLatex: "",
            targetLatex: "\\\\text{Answer}",
            slots: [{ id: "ans", labelLatex: "Answer", placeholder: "...", expected: data.expected }],
            correctLatex: data.expected,
            simConfig: {
                molecule: data.molecule,
                showBonds: true,
                showHydrogens: true
            }
        });
    });

    return quests;
}

export default function GC201Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
      adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<OrganicQuest, Stage>({
    moduleCode: "gc2-01",
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "ALKANES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gc2-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const activeScenario = useMemo(() => {
        if (stage === "ALKANES") return t("gc2_01.scenarios.lonza_methane_cracking");
        if (stage === "AROMATICS") return t("gc2_01.scenarios.roche_aromatic_pipeline");
        return t("gc2_01.scenarios.biozentrum_protein_research");
    }, [stage, t]);

    const stages = [
        { id: "ALKANES", label: t("gc2_01.stages.alkanes") },
        { id: "AROMATICS", label: t("gc2_01.stages.aromatics") },
        { id: "BIOMOLECULES", label: t("gc2_01.stages.biomolecules") },
    ];

    const config = currentQuest?.simConfig || {
        molecule: "methane",
        showBonds: true,
        showHydrogens: true
    };

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("gc2_01.title")}
            moduleCode="GC2.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("gc2_01.footer_left")}
            translations={{
                back: t("gc2_01.back"),
                check: t("gc2_01.check"),
                next: t("gc2_01.next"),
                correct: t("gc2_01.correct"),
                incorrect: t("gc2_01.incorrect"),
                difficulty: {
                    BASIC: t("gc2_01.difficulty.BASIC"),
                    CORE: t("gc2_01.difficulty.CORE"),
                    ADVANCED: t("gc2_01.difficulty.ADVANCED"),
                    ELITE: t("gc2_01.difficulty.ELITE"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <OrganicCanvas
                            molecule={config.molecule}
                            showBonds={config.showBonds}
                            showHydrogens={config.showHydrogens}
                            rotationSpeed={0.5}
                        />
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3 font-mono text-center">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                            {t("gc2_01.labels.molecule_info")}
                        </div>
                        <div className="text-2xl text-neon-cyan font-black">
                            {config.molecule.toUpperCase()}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg text-center">
                            <div className="text-[8px] text-white/40 uppercase font-black mb-1">TYPE</div>
                            <div className="text-xs font-black text-white/80">
                                {stage}
                            </div>
                        </div>
                        <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg text-center">
                            <div className="text-[8px] text-white/40 uppercase font-black mb-1">STATE</div>
                            <div className="text-xs font-black text-neon-green">STABLE</div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-[10px] text-neon-purple uppercase tracking-[0.5em] font-black mb-4 italic">
                        {t("gc2_01.monitor_title")}
                    </h3>
                    <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </div>
                </div>

                <div className="p-6 bg-black/40 border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 backdrop-blur-md">
                    <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black text-center">
                            {t("gc2_01.labels.input_answer")}
                        </div>
                        <input
                            value={inputs["ans"] || ""}
                            onChange={(e) => setInputs({ ans: e.target.value })}
                            className="w-full bg-black/50 border-2 border-neon-purple p-4 text-center outline-none focus:border-white placeholder:text-white/20 font-black text-2xl text-white transition-all shadow-[0_0_30px_rgba(255,0,255,0.05)]"
                            placeholder="..."
                        />
                    </div>
                </div>

                {activeScenario && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${stage}-${difficulty}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[10px] uppercase tracking-widest text-neon-purple/60 font-black">Regional Case Study // Basel Node</div>
                                    <p className="text-sm text-white/50 leading-relaxed italic">
                                        {activeScenario}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </ChamberLayout>
    );
}
