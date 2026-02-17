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

const RedoxCanvas = dynamic(() => import("@/components/chamber/gc1-01/RedoxCanvas"), {
    ssr: false,
});

type Stage = "BUILD" | "MEASURE" | "ANALYZE";

interface RedoxQuest extends Quest {
    stage: Stage;
    simConfig: {
        znConc: number;
        cuConc: number;
        temp: number;
    };
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): RedoxQuest[] {
    const quests: RedoxQuest[] = [];

    // Each stage × difficulty = 5 questions (60 total)
    const questData = {
        BASIC: [
            { key: "electron_flow", expected: "anode", znConc: 1.0, cuConc: 1.0, temp: 298 },
            { key: "salt_bridge", expected: "ions", znConc: 1.0, cuConc: 1.0, temp: 298 },
            { key: "cathode_process", expected: "reduction", znConc: 1.0, cuConc: 1.0, temp: 298 },
            { key: "standard_v", expected: "1.10", znConc: 1.0, cuConc: 1.0, temp: 298 },
            { key: "cell_type", expected: "galvanic", znConc: 1.0, cuConc: 1.0, temp: 298 }
        ],
        CORE: [
            { key: "nernst_q", expected: "1.5", znConc: 1.5, cuConc: 1.0, temp: 298 },
            { key: "standard_v", expected: "1.10", znConc: 1.0, cuConc: 1.0, temp: 298 },
            { key: "zn_reduction", expected: "-0.76", znConc: 1.0, cuConc: 1.0, temp: 298 },
            { key: "temperature_effect", expected: "increase", znConc: 1.0, cuConc: 1.0, temp: 320 },
            { key: "concentration_effect", expected: "decrease", znConc: 0.5, cuConc: 1.0, temp: 298 }
        ],
        ADVANCED: [
            { key: "cell_potential_calc", expected: "1.13", znConc: 1.0, cuConc: 0.1, temp: 298 },
            { key: "nernst_q", expected: "1.5", znConc: 1.5, cuConc: 1.0, temp: 298 },
            { key: "standard_v", expected: "1.10", znConc: 1.0, cuConc: 1.0, temp: 298 },
            { key: "temperature_effect", expected: "increase", znConc: 1.0, cuConc: 1.0, temp: 320 },
            { key: "gibbs_energy", expected: "-212", znConc: 1.0, cuConc: 1.0, temp: 298 }
        ],
        ELITE: [
            { key: "cell_potential_calc", expected: "1.13", znConc: 1.0, cuConc: 0.1, temp: 298 },
            { key: "nernst_q", expected: "1.5", znConc: 1.5, cuConc: 1.0, temp: 298 },
            { key: "zn_reduction", expected: "-0.76", znConc: 1.0, cuConc: 1.0, temp: 298 },
            { key: "temperature_effect", expected: "increase", znConc: 1.0, cuConc: 1.0, temp: 320 },
            { key: "equilibrium_constant", expected: "1.5e37", znConc: 1.0, cuConc: 1.0, temp: 298 }
        ]
    };

    const dataList = questData[difficulty];
    dataList.forEach((data, idx) => {
        quests.push({
            id: `${stage}_${difficulty[0]}${idx + 1}`,
            difficulty,
            stage,
            promptLatex: `\\text{${t(`gc1_01.prompts.${data.key}`)}}`,
            expressionLatex: "",
            targetLatex: "\\text{Answer}",
            slots: [{ id: "ans", labelLatex: "Answer", placeholder: "...", expected: data.expected }],
            correctLatex: data.expected,
            simConfig: { znConc: data.znConc, cuConc: data.cuConc, temp: data.temp }
        });
    });

    return quests;
}

export default function GC101Page() {
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
    } = useQuestManager<RedoxQuest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "BUILD",
        tolerance: 0.02
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gc1-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const activeScenario = useMemo(() => {
        if (stage === "BUILD") return t("gc1_01.scenarios.corrosion_protection");
        if (stage === "MEASURE") return t("gc1_01.scenarios.battery_storage");
        return t("gc1_01.scenarios.fuel_cell_innovation");
    }, [stage, t]);

    // Rederived E for the gauge display
    const E0_cell = 1.10;
    const n = 2;
    const R = 8.314;
    const F = 96485;
    const znC = currentQuest?.simConfig.znConc ?? 1.0;
    const cuC = currentQuest?.simConfig.cuConc ?? 1.0;
    const temp = currentQuest?.simConfig.temp ?? 298;
    const Q = znC / cuC;
    const E = E0_cell - (R * temp / (n * F)) * Math.log(Q);

    const stages = [
        { id: "BUILD", label: t("gc1_01.stages.build") },
        { id: "MEASURE", label: t("gc1_01.stages.measure") },
        { id: "ANALYZE", label: t("gc1_01.stages.analyze") },
    ];

    return (
        <ChamberLayout
            title={t("gc1_01.title")}
            moduleCode="GC1.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("gc1_01.footer_left")}
            translations={{
                back: t("gc1_01.back"),
                check: t("gc1_01.check"),
                next: t("gc1_01.next"),
                correct: t("gc1_01.correct"),
                incorrect: t("gc1_01.incorrect"),
                difficulty: {
                    BASIC: t("gc1_01.difficulty.BASIC"),
                    CORE: t("gc1_01.difficulty.CORE"),
                    ADVANCED: t("gc1_01.difficulty.ADVANCED"),
                    ELITE: t("gc1_01.difficulty.ELITE"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <RedoxCanvas
                            znConcentration={znC}
                            cuConcentration={cuC}
                            temperature={temp}
                            showElectrons={true}
                            showIons={true}
                        />
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                            {t("gc1_01.labels.cell_potential")}
                        </div>
                        <div className="text-3xl text-neon-cyan font-black text-center shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                            {E.toFixed(3)} V
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono text-[9px] space-y-2">
                        <div className="flex justify-between">
                            <span className="text-white/40">ANODE:</span>
                            <span className="text-neon-cyan">Zn → Zn²⁺ + 2e⁻</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/40">CATHODE:</span>
                            <span className="text-neon-purple">Cu²⁺ + 2e⁻ → Cu</span>
                        </div>
                        <div className="pt-2 border-t border-white/5 text-center italic text-white/30">
                            Q = {Q.toFixed(2)} | T = {temp}K
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black mb-4 italic">
                        {t("gc1_01.mission.title")}
                    </h3>
                    <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </div>
                </div>

                <div className="p-6 bg-black/40 border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 backdrop-blur-md">
                    <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                            {t("gc1_01.labels.input_answer")}
                        </div>
                        <input
                            value={inputs["ans"] || ""}
                            onChange={(e) => setInputs({ ans: e.target.value })}
                            className="w-full bg-black/50 border-2 border-neon-cyan p-4 text-center outline-none focus:border-white placeholder:text-white/20 font-black text-2xl text-white transition-all shadow-[0_0_30px_rgba(0,255,255,0.05)]"
                            placeholder="..."
                        />
                    </div>

                    <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                        <div className="text-[9px] uppercase tracking-[0.3em] text-neon-amber font-black mb-2">
                            {t("gc1_01.labels.nernst_equation")}
                        </div>
                        <div className="text-sm text-white/70 italic text-center">
                            <InlineMath math="E = E^\circ - \frac{RT}{nF} \ln Q" />
                        </div>
                    </div>
                </div>

                {activeScenario && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${stage}-${difficulty}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-neon-cyan/[0.02] border border-neon-cyan/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-neon-cyan/20 rounded-lg text-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[10px] uppercase tracking-widest text-neon-cyan/60 font-black">Regional Case Study // Basel Node</div>
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
