"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
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
    const questKeys = ["atom_count", "bond_type", "mol_type", "functional_id"];

    let indices: number[] = [];
    if (difficulty === "BASIC") indices = [0, 2];
    else if (difficulty === "CORE") indices = [1, 2];
    else if (difficulty === "ADVANCED") indices = [2, 3];
    else indices = [0, 1, 2, 3];

    return indices.map((idx) => {
        const key = questKeys[idx];
        const prompt = t.prompts[key];

        let molecule: OrganicQuest["simConfig"]["molecule"] = "methane";
        if (stage === "ALKANES") molecule = idx % 2 === 0 ? "methane" : "ethane";
        else if (stage === "AROMATICS") molecule = "benzene";
        else molecule = idx % 2 === 0 ? "glucose" : "alanine";

        let expected: string | number = "1";
        if (idx === 0) { // atom_count
            expected = molecule === "methane" ? 5 : molecule === "ethane" ? 8 : 12;
        } else if (idx === 1) { // bond_type
            expected = molecule === "benzene" ? "delocalized" : "single";
        } else if (idx === 2) { // mol_type
            expected = molecule === "benzene" ? "aromatic" : (molecule === "methane" || molecule === "ethane") ? "alkane" : "sugar";
        } else if (idx === 3) { // functional_id
            expected = molecule === "alanine" ? "amino" : "hydroxyl";
        }

        return {
            id: `${stage}|${difficulty}|${key}`,
            difficulty,
            stage,
            promptLatex: `\\text{${prompt}}`,
            expressionLatex: "",
            targetLatex: "\\text{Conclusion}",
            slots: [{ id: "ans", labelLatex: "Answer", placeholder: "Result", expected }],
            correctLatex: expected.toString(),
            simConfig: {
                molecule,
                showBonds: true,
                showHydrogens: true
            }
        };
    });
}

export default function GC201Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].gc2_01 || translations.EN.gc2_01;

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
    } = useQuestManager<OrganicQuest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "ALKANES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gc2-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const activeScenario = useMemo(() => {
        if (!t?.scenarios) return null;
        if (stage === "ALKANES") return t.scenarios.lonza_methane_cracking;
        if (stage === "AROMATICS") return t.scenarios.roche_aromatic_pipeline;
        return t.scenarios.biozentrum_protein_research;
    }, [stage, t]);

    const stages = [
        { id: "ALKANES", label: t?.stages?.alkanes || "ALKANES" },
        { id: "AROMATICS", label: t?.stages?.aromatics || "AROMATICS" },
        { id: "BIOMOLECULES", label: t?.stages?.biomolecules || "BIOMOLECULES" },
    ];

    const config = currentQuest?.simConfig || {
        molecule: "methane",
        showBonds: true,
        showHydrogens: true
    };

    return (
        <ChamberLayout
            title={t?.title || "GC2.01 // CARBON KINGDOM"}
            moduleCode="GC2.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t?.footer_left || "GC2.01_CARBON_KINGDOM // NODE: BASEL"}
            translations={t}
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
                            {t?.labels?.molecule_info || "MOLECULE"}
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
                        {t?.monitor_title || "MOLECULAR RECONSTRUCTION"}
                    </h3>
                    <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </div>
                </div>

                <div className="p-6 bg-black/40 border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 backdrop-blur-md">
                    <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black text-center">
                            {t?.labels?.input_answer || "Enter Value"}
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
