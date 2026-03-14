"use client";

import { useMemo, useCallback, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { InlineMath } from "react-katex";
import ChamberLayout from "@/components/layout/ChamberLayout";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";
import BondingVisualization3D from "@/components/chamber/sc1-05/BondingVisualization3D";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "IONIC" | "COVALENT" | "METALLIC";
type BondQuest = Quest & { stage: Stage };

export default function SC105Page() {
    const { t } = useLanguage();
    const { completeStage } = useAppStore();

    const sc1_05_t = {
        title: t("sc1_05.title"),
        footer_left: t("sc1_05.footer_left"),
        back: t("sc1_05.back"),
        check: t("sc1_05.check"),
        next: t("sc1_05.next"),
        correct: t("sc1_05.correct"),
        incorrect: t("sc1_05.incorrect"),
        ready: t("sc1_05.ready"),
        monitor_title: t("sc1_05.monitor_title"),
        objective_title: t("sc1_05.objective_title"),
        stages: {
            ionic: t("sc1_05.stages.ionic"),
            covalent: t("sc1_05.stages.covalent"),
            metallic: t("sc1_05.stages.metallic"),
        },
        labels: {
            bond_type: t("sc1_05.labels.bond_type"),
            case_study: t("sc1_05.labels.case_study"),
        },
        scenarios: {
            ionic_salts: t("sc1_05.scenarios.ionic_salts"),
            molecular_oxygen: t("sc1_05.scenarios.molecular_oxygen"),
            pharmaceutical_chains: t("sc1_05.scenarios.pharmaceutical_chains"),
        },
        descriptions: {
            ionic: t("sc1_05.descriptions.ionic"),
            covalent: t("sc1_05.descriptions.covalent"),
            metallic: t("sc1_05.descriptions.metallic"),
        },
        difficulty: {
            basic: t("sc1_05.difficulty.basic"),
            core: t("sc1_05.difficulty.core"),
            advanced: t("sc1_05.difficulty.advanced"),
            elite: t("sc1_05.difficulty.elite"),
        },
    };

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): BondQuest[] => {
        const bank: Record<Stage, Record<Difficulty, BondQuest[]>> = {
            IONIC: {
                BASIC: [{ id: "I-B-1", difficulty, stage, promptLatex: t("sc1_05.prompts.ionic_charge_product"), expressionLatex: "Na^+,\\;Cl^-", targetLatex: "|q_1q_2|", slots: [{ id: "q", labelLatex: "|q_1q_2|", placeholder: "1", expected: 1 }], correctLatex: "|q_1q_2|=1" }],
                CORE: [{ id: "I-C-1", difficulty, stage, promptLatex: t("sc1_05.prompts.ionic_subscript"), expressionLatex: "Mg^{2+},\\;Cl^-", targetLatex: "x", slots: [{ id: "x", labelLatex: "x", placeholder: "2", expected: 2 }], correctLatex: "MgCl_2" }],
                ADVANCED: [{ id: "I-A-1", difficulty, stage, promptLatex: t("sc1_05.prompts.ionic_total_charge"), expressionLatex: "Al^{3+}+3Cl^-", targetLatex: "Q", slots: [{ id: "Q", labelLatex: "Q", placeholder: "0", expected: 0 }], correctLatex: "Q=0" }],
                ELITE: [{ id: "I-E-1", difficulty, stage, promptLatex: t("sc1_05.prompts.ionic_ratio_n"), expressionLatex: "Ca^{2+},\\;F^-", targetLatex: "n", slots: [{ id: "n", labelLatex: "n", placeholder: "2", expected: 2 }], correctLatex: "CaF_2" }],
            },
            COVALENT: {
                BASIC: [{ id: "C-B-1", difficulty, stage, promptLatex: t("sc1_05.prompts.covalent_bond_order"), expressionLatex: "H_2", targetLatex: "n", slots: [{ id: "n", labelLatex: "n", placeholder: "1", expected: 1 }], correctLatex: "n=1" }],
                CORE: [{ id: "C-C-1", difficulty, stage, promptLatex: t("sc1_05.prompts.covalent_bond_order"), expressionLatex: "O_2", targetLatex: "n", slots: [{ id: "n", labelLatex: "n", placeholder: "2", expected: 2 }], correctLatex: "n=2" }],
                ADVANCED: [{ id: "C-A-1", difficulty, stage, promptLatex: t("sc1_05.prompts.covalent_bond_order"), expressionLatex: "N_2", targetLatex: "n", slots: [{ id: "n", labelLatex: "n", placeholder: "3", expected: 3 }], correctLatex: "n=3" }],
                ELITE: [{ id: "C-E-1", difficulty, stage, promptLatex: t("sc1_05.prompts.covalent_bonds_count"), expressionLatex: "CO_2\\;(O=C=O)", targetLatex: "b", slots: [{ id: "b", labelLatex: "b", placeholder: "2", expected: 2 }], correctLatex: "b=2" }],
            },
            METALLIC: {
                BASIC: [{ id: "M-B-1", difficulty, stage, promptLatex: t("sc1_05.prompts.metallic_valence"), expressionLatex: "Na", targetLatex: "v", slots: [{ id: "v", labelLatex: "v", placeholder: "1", expected: 1 }], correctLatex: "v=1" }],
                CORE: [{ id: "M-C-1", difficulty, stage, promptLatex: t("sc1_05.prompts.metallic_valence"), expressionLatex: "Mg", targetLatex: "v", slots: [{ id: "v", labelLatex: "v", placeholder: "2", expected: 2 }], correctLatex: "v=2" }],
                ADVANCED: [{ id: "M-A-1", difficulty, stage, promptLatex: t("sc1_05.prompts.metallic_coordination_number"), expressionLatex: "4\\times 3", targetLatex: "N", slots: [{ id: "N", labelLatex: "N", placeholder: "12", expected: 12 }], correctLatex: "N=12" }],
                ELITE: [{ id: "M-E-1", difficulty, stage, promptLatex: t("sc1_05.prompts.metallic_ratio"), expressionLatex: "\\frac{3}{1}", targetLatex: "r", slots: [{ id: "r", labelLatex: "r", placeholder: "3", expected: 3 }], correctLatex: "r=3" }],
            },
        };

        return bank[stage][difficulty] ?? [];
    }, [t]);

    const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => {
        return buildStagePool(difficulty, stage);
    }, [buildStagePool]);

    const {
        currentQuest: quest,
        stage,
        inputs,
        setInputs,
        lastCheck,
        verify,
        next,
        handleStageChange,
        difficulty,
        handleDifficultyChange,
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback,
    } = useQuestManager<BondQuest, Stage>({
        moduleCode: "sc1-05",
        buildPool,
        initialStage: "IONIC",
        tolerance: 0.02,
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sc1-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "IONIC", label: sc1_05_t.stages.ionic },
        { id: "COVALENT", label: sc1_05_t.stages.covalent },
        { id: "METALLIC", label: sc1_05_t.stages.metallic },
    ], [sc1_05_t.stages.ionic, sc1_05_t.stages.covalent, sc1_05_t.stages.metallic]);

    const activeScenario = useMemo(() => {
        if (stage === "IONIC") return sc1_05_t.scenarios.ionic_salts;
        if (stage === "COVALENT") return sc1_05_t.scenarios.molecular_oxygen;
        return sc1_05_t.scenarios.pharmaceutical_chains;
    }, [stage, sc1_05_t.scenarios.ionic_salts, sc1_05_t.scenarios.molecular_oxygen, sc1_05_t.scenarios.pharmaceutical_chains]);

    const activeStageLabel = useMemo(() => {
        if (stage === "IONIC") return sc1_05_t.stages.ionic;
        if (stage === "COVALENT") return sc1_05_t.stages.covalent;
        return sc1_05_t.stages.metallic;
    }, [stage, sc1_05_t.stages.ionic, sc1_05_t.stages.covalent, sc1_05_t.stages.metallic]);

    const activeDescription = useMemo(() => {
        if (stage === "IONIC") return sc1_05_t.descriptions.ionic;
        if (stage === "COVALENT") return sc1_05_t.descriptions.covalent;
        return sc1_05_t.descriptions.metallic;
    }, [stage, sc1_05_t.descriptions.ionic, sc1_05_t.descriptions.covalent, sc1_05_t.descriptions.metallic]);

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            moduleCode="SC1.05"
            title={sc1_05_t.title}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sc1_05_t.footer_left}
            translations={{
                back: sc1_05_t.back,
                check: sc1_05_t.check,
                next: sc1_05_t.next,
                correct: sc1_05_t.correct,
                incorrect: sc1_05_t.incorrect,
                ready: sc1_05_t.ready,
                monitor_title: sc1_05_t.monitor_title,
                difficulty: sc1_05_t.difficulty,
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[400px]">
                        <BondingVisualization3D type={stage} />
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                            {sc1_05_t.labels.bond_type}
                        </div>
                        <div className="text-base text-neon-cyan font-black">
                            {activeStageLabel}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full text-center">
                <div className="space-y-4">
                    <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                        {sc1_05_t.title}
                    </h3>
                    <p className="text-xl text-white/70 font-mono italic">
                        {activeDescription}
                    </p>
                </div>

                {activeScenario && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-neon-cyan/[0.02] border border-neon-cyan/10 rounded-3xl p-8 backdrop-blur-sm"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-neon-cyan/20 rounded-lg text-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-2 text-left">
                                <div className="text-[10px] uppercase tracking-widest text-neon-cyan/60 font-black">{sc1_05_t.labels.case_study}</div>
                                <p className="text-sm text-white/50 leading-relaxed italic">{activeScenario}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {quest && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 text-left">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black text-center">
                            {sc1_05_t.check}
                        </div>
                        <div className="text-center text-2xl text-white font-black">{renderMixedText(quest.promptLatex)}</div>
                        <div className="text-center p-3 bg-white/5 border border-white/10 rounded-xl">
                            <KatexTextWrap math={quest.expressionLatex || ""} />
                        </div>
                        {quest.slots.map((slot) => (
                            <div key={slot.id} className="space-y-2">
                                <label className="text-sm text-white/70 font-mono">
                                    <InlineMath math={slot.labelLatex} />
                                </label>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, [slot.id]: e.target.value }))}
                                    aria-label={slot.id}
                                    className="w-full bg-black border-2 border-cyan-500/50 p-4 text-center outline-none focus:border-cyan-400 placeholder:text-white/40 font-black text-2xl text-white rounded-lg"
                                    placeholder={slot.placeholder}
                                />
                            </div>
                        ))}
                        {lastCheck?.ok && (
                            <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                <InlineMath math={quest.correctLatex} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ChamberLayout>
    );
}
