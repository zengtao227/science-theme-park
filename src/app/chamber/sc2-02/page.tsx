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

const TitrationCanvas = dynamic(() => import("@/components/chamber/sc2-02/TitrationCanvas"), {
    ssr: false,
});

type Stage = "CURVES" | "EQUIVALENCE" | "INDICATORS";

interface TitrationQuest extends Quest {
    stage: Stage;
    simConfig: {
        acidType: "strong" | "weak";
        acidConc: number;
        baseConc: number;
        volumeAdded: number;
        indicator: "phenolphthalein" | "methyl_orange" | "universal";
    };
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): TitrationQuest[] {
    const questKeys = [
        "curve_type", "find_eq", "select_indicator", "weak_ph_calc", "eq_ph_guess", "conc_calc"
    ];

    let indices: number[] = [];
    if (difficulty === "BASIC") indices = [0, 4];
    else if (difficulty === "CORE") indices = [1, 2];
    else if (difficulty === "ADVANCED") indices = [3, 5];
    else indices = [1, 3, 5];

    return indices.map((idx) => {
        const key = questKeys[idx];
        let prompt = t.prompts[key];

        const config: TitrationQuest["simConfig"] = {
            acidType: "strong",
            acidConc: 0.1,
            baseConc: 0.1,
            volumeAdded: 0,
            indicator: "phenolphthalein"
        };

        let expected: string | number = "1";

        if (idx === 0) { // curve_type
            config.acidType = "weak";
            prompt = prompt.replace("{ph}", "3.0");
            expected = "2";
        } else if (idx === 1) { // find_eq
            config.acidConc = 0.1;
            config.baseConc = 0.2;
            expected = 25; // (0.1 * 50) / 0.2 = 25
        } else if (idx === 3) { // weak_ph_calc
            config.acidType = "weak";
            expected = 4.75;
        } else if (idx === 4) { // eq_ph_guess
            expected = "2"; // 7
        } else if (idx === 5) { // conc_calc
            expected = 0.1; // (10 * 0.2) / 20 = 0.1
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
            simConfig: config
        };
    });
}

export default function SC202Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].sc2_02 || translations.EN.sc2_02;

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
    } = useQuestManager<TitrationQuest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "CURVES",
        tolerance: 0.05
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sc2-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const activeScenario = useMemo(() => {
        if (!t?.scenarios) return null;
        if (stage === "CURVES") return t.scenarios.environmental_monitoring;
        if (stage === "EQUIVALENCE") return t.scenarios.water_quality;
        return t.scenarios.biotech_titration;
    }, [stage, t]);

    const stages = [
        { id: "CURVES", label: t?.stages?.curves || "CURVES" },
        { id: "EQUIVALENCE", label: t?.stages?.equivalence || "EQUIVALENCE" },
        { id: "INDICATORS", label: t?.stages?.indicators || "INDICATORS" },
    ];

    const config = currentQuest?.simConfig || {
        acidType: "strong",
        acidConc: 0.1,
        baseConc: 0.1,
        volumeAdded: 0,
        indicator: "phenolphthalein"
    };

    return (
        <ChamberLayout
            title={t?.title || "SC2.02 // pH SENTINEL"}
            moduleCode="SC2.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t?.footer_left || "SC2.02_PH_SENTINEL // NODE: BASEL"}
            translations={t}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <TitrationCanvas
                            acidType={config.acidType as any}
                            baseType="strong"
                            acidConcentration={config.acidConc}
                            baseConcentration={config.baseConc}
                            volumeAdded={config.volumeAdded}
                            indicator={config.indicator as any}
                        />
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3 font-mono">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                            {t?.labels?.eq_point || "EQUIVALENCE"}
                        </div>
                        <div className="text-3xl text-neon-green font-black text-center shadow-[0_0_15px_rgba(0,255,0,0.1)]">
                            {((config.acidConc * 50) / config.baseConc).toFixed(1)} mL
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
                        <div className="flex justify-between text-[9px] uppercase font-black text-white/40 mb-1">
                            <span>INDICATOR</span>
                            <span className="text-neon-amber">{config.indicator.replace("_", " ")}</span>
                        </div>
                        <div className="flex justify-between text-[9px] uppercase font-black text-white/40">
                            <span>ACID TYPE</span>
                            <span className="text-neon-cyan">{config.acidType}</span>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-[10px] text-neon-purple uppercase tracking-[0.5em] font-black mb-4 italic">
                        {t?.monitor_title || "TITRATION ANALYSIS"}
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

                    <div className="p-4 bg-white/[0.03] border border-white/10 rounded-3xl relative">
                        <div className="text-[10px] text-white/40 uppercase font-black mb-4 tracking-widest text-center">{t.labels.formula}</div>
                        <div className="flex flex-wrap gap-6 justify-center items-center">
                            <div className="text-white font-mono text-sm opacity-60"><InlineMath math="V_a C_a = V_b C_b" /></div>
                            <div className="text-white font-mono text-sm opacity-60"><InlineMath math="\text{pH} = pK_a + \log\frac{[A^-]}{[HA]}" /></div>
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
