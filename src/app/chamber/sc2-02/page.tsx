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
    const quests: TitrationQuest[] = [];
    
    // Stage 1: CURVES - Titration curve analysis (20 questions: 4 difficulties × 5 questions)
    if (stage === "CURVES") {
        const curveQuestions = [
            // BASIC (5 questions) - Simple curve identification
            { acidType: "strong" as const, acidConc: 0.1, baseConc: 0.1, question: "Identify curve type", expected: "strong-strong" },
            { acidType: "weak" as const, acidConc: 0.1, baseConc: 0.1, question: "Identify weak acid curve", expected: "weak-strong" },
            { acidType: "strong" as const, acidConc: 0.2, baseConc: 0.1, question: "Find equivalence volume", expected: 100 },
            { acidType: "strong" as const, acidConc: 0.1, baseConc: 0.2, question: "Calculate eq point", expected: 25 },
            { acidType: "weak" as const, acidConc: 0.15, baseConc: 0.1, question: "Weak acid eq volume", expected: 75 },
            
            // CORE (5 questions) - pH calculations
            { acidType: "strong" as const, acidConc: 0.1, baseConc: 0.1, question: "pH at equivalence", expected: 7 },
            { acidType: "weak" as const, acidConc: 0.1, baseConc: 0.1, question: "Weak acid pH at eq", expected: 8.5 },
            { acidType: "strong" as const, acidConc: 0.2, baseConc: 0.2, question: "Strong acid eq pH", expected: 7 },
            { acidType: "weak" as const, acidConc: 0.15, baseConc: 0.15, question: "Buffer region pH", expected: 4.75 },
            { acidType: "strong" as const, acidConc: 0.05, baseConc: 0.1, question: "Dilute acid eq volume", expected: 25 },
            
            // ADVANCED (5 questions) - Complex calculations
            { acidType: "weak" as const, acidConc: 0.1, baseConc: 0.2, question: "Weak acid pKa", expected: 4.75 },
            { acidType: "strong" as const, acidConc: 0.3, baseConc: 0.1, question: "High conc eq point", expected: 150 },
            { acidType: "weak" as const, acidConc: 0.2, baseConc: 0.1, question: "Buffer capacity", expected: 100 },
            { acidType: "weak" as const, acidConc: 0.1, baseConc: 0.15, question: "Half-eq pH", expected: 4.75 },
            { acidType: "strong" as const, acidConc: 0.25, baseConc: 0.2, question: "Precise eq volume", expected: 62.5 },
            
            // ELITE (5 questions) - Expert level
            { acidType: "weak" as const, acidConc: 0.12, baseConc: 0.18, question: "Complex pKa calc", expected: 4.75 },
            { acidType: "weak" as const, acidConc: 0.08, baseConc: 0.12, question: "Low conc buffer", expected: 33.3 },
            { acidType: "strong" as const, acidConc: 0.15, baseConc: 0.25, question: "Multi-step calc", expected: 30 },
            { acidType: "weak" as const, acidConc: 0.2, baseConc: 0.15, question: "Advanced buffer", expected: 66.7 },
            { acidType: "weak" as const, acidConc: 0.1, baseConc: 0.1, question: "Exact pH at 25mL", expected: 4.75 },
        ];
        
        const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
        const selectedQuestions = curveQuestions.slice(startIdx, startIdx + 5);
        
        selectedQuestions.forEach((q, idx) => {
            quests.push({
                id: `CURVES_${difficulty}_${idx}`,
                difficulty,
                stage,
                promptLatex: `\\\\text{${q.question}}`,
                expressionLatex: `C_a=${q.acidConc}\\\\text{M},\\; C_b=${q.baseConc}\\\\text{M}`,
                targetLatex: "\\\\text{Answer}",
                slots: [{ id: "ans", labelLatex: "Answer", placeholder: "Result", expected: q.expected }],
                correctLatex: q.expected.toString(),
                simConfig: {
                    acidType: q.acidType,
                    acidConc: q.acidConc,
                    baseConc: q.baseConc,
                    volumeAdded: 0,
                    indicator: "phenolphthalein"
                }
            });
        });
        
        return quests;
    }
    
    // Stage 2: EQUIVALENCE - Equivalence point calculations (20 questions)
    if (stage === "EQUIVALENCE") {
        const eqQuestions = [
            // BASIC (5 questions)
            { acidConc: 0.1, baseConc: 0.1, volume: 50, question: "Find equivalence volume", expected: 50 },
            { acidConc: 0.2, baseConc: 0.1, volume: 50, question: "Calculate eq point", expected: 100 },
            { acidConc: 0.1, baseConc: 0.2, volume: 50, question: "Eq volume calc", expected: 25 },
            { acidConc: 0.15, baseConc: 0.1, volume: 50, question: "Find eq volume", expected: 75 },
            { acidConc: 0.1, baseConc: 0.15, volume: 50, question: "Calculate eq", expected: 33.3 },
            
            // CORE (5 questions)
            { acidConc: 0.25, baseConc: 0.2, volume: 50, question: "Precise eq point", expected: 62.5 },
            { acidConc: 0.3, baseConc: 0.15, volume: 50, question: "High conc eq", expected: 100 },
            { acidConc: 0.05, baseConc: 0.1, volume: 50, question: "Low conc eq", expected: 25 },
            { acidConc: 0.12, baseConc: 0.18, volume: 50, question: "Complex eq calc", expected: 33.3 },
            { acidConc: 0.18, baseConc: 0.12, volume: 50, question: "Reverse calc", expected: 75 },
            
            // ADVANCED (5 questions)
            { acidConc: 0.08, baseConc: 0.12, volume: 50, question: "Dilute eq point", expected: 33.3 },
            { acidConc: 0.22, baseConc: 0.11, volume: 50, question: "2:1 ratio eq", expected: 100 },
            { acidConc: 0.15, baseConc: 0.25, volume: 50, question: "Inverse ratio", expected: 30 },
            { acidConc: 0.35, baseConc: 0.14, volume: 50, question: "High precision", expected: 125 },
            { acidConc: 0.06, baseConc: 0.18, volume: 50, question: "1:3 ratio", expected: 16.7 },
            
            // ELITE (5 questions)
            { acidConc: 0.125, baseConc: 0.175, volume: 50, question: "Complex ratio", expected: 35.7 },
            { acidConc: 0.275, baseConc: 0.225, volume: 50, question: "Near 1:1 ratio", expected: 61.1 },
            { acidConc: 0.085, baseConc: 0.135, volume: 50, question: "Precise dilute", expected: 31.5 },
            { acidConc: 0.195, baseConc: 0.165, volume: 50, question: "Close conc", expected: 59.1 },
            { acidConc: 0.105, baseConc: 0.155, volume: 50, question: "Fine tuning", expected: 33.9 },
        ];
        
        const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
        const selectedQuestions = eqQuestions.slice(startIdx, startIdx + 5);
        
        selectedQuestions.forEach((q, idx) => {
            quests.push({
                id: `EQUIVALENCE_${difficulty}_${idx}`,
                difficulty,
                stage,
                promptLatex: `\\\\text{${q.question}}`,
                expressionLatex: `V_a C_a = V_b C_b,\\; C_a=${q.acidConc}\\\\text{M},\\; C_b=${q.baseConc}\\\\text{M}`,
                targetLatex: "V_b\\\\text{ (mL)}",
                slots: [{ id: "ans", labelLatex: "Volume (mL)", placeholder: "mL", expected: q.expected }],
                correctLatex: `${q.expected}\\\\text{ mL}`,
                simConfig: {
                    acidType: "strong",
                    acidConc: q.acidConc,
                    baseConc: q.baseConc,
                    volumeAdded: 0,
                    indicator: "phenolphthalein"
                }
            });
        });
        
        return quests;
    }
    
    // Stage 3: INDICATORS - Indicator selection (20 questions)
    const indicatorQuestions = [
        // BASIC (5 questions)
        { acidType: "strong" as const, pHRange: "8-10", question: "Select indicator for strong acid", expected: "phenolphthalein" },
        { acidType: "strong" as const, pHRange: "3-5", question: "Choose indicator", expected: "methyl_orange" },
        { acidType: "weak" as const, pHRange: "8-10", question: "Weak acid indicator", expected: "phenolphthalein" },
        { acidType: "strong" as const, pHRange: "4-10", question: "Universal indicator", expected: "universal" },
        { acidType: "strong" as const, pHRange: "8-10", question: "Basic range indicator", expected: "phenolphthalein" },
        
        // CORE (5 questions)
        { acidType: "weak" as const, pHRange: "8-10", question: "Weak acid best indicator", expected: "phenolphthalein" },
        { acidType: "strong" as const, pHRange: "3-5", question: "Acidic range", expected: "methyl_orange" },
        { acidType: "weak" as const, pHRange: "7-9", question: "Near neutral weak", expected: "phenolphthalein" },
        { acidType: "strong" as const, pHRange: "6-8", question: "Neutral range", expected: "universal" },
        { acidType: "weak" as const, pHRange: "8-10", question: "Buffer indicator", expected: "phenolphthalein" },
        
        // ADVANCED (5 questions)
        { acidType: "weak" as const, pHRange: "4-6", question: "Half-eq indicator", expected: "methyl_orange" },
        { acidType: "strong" as const, pHRange: "2-4", question: "Strong acid low pH", expected: "methyl_orange" },
        { acidType: "weak" as const, pHRange: "9-11", question: "High pH weak", expected: "phenolphthalein" },
        { acidType: "strong" as const, pHRange: "1-14", question: "Full range", expected: "universal" },
        { acidType: "weak" as const, pHRange: "7-10", question: "Weak acid eq range", expected: "phenolphthalein" },
        
        // ELITE (5 questions)
        { acidType: "weak" as const, pHRange: "8.5-9.5", question: "Precise weak acid", expected: "phenolphthalein" },
        { acidType: "strong" as const, pHRange: "3.5-4.5", question: "Narrow acidic", expected: "methyl_orange" },
        { acidType: "weak" as const, pHRange: "4.5-5.5", question: "Buffer region", expected: "methyl_orange" },
        { acidType: "strong" as const, pHRange: "6.5-7.5", question: "Near neutral", expected: "universal" },
        { acidType: "weak" as const, pHRange: "8-10", question: "Optimal weak acid", expected: "phenolphthalein" },
    ];
    
    const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
    const selectedQuestions = indicatorQuestions.slice(startIdx, startIdx + 5);
    
    selectedQuestions.forEach((q, idx) => {
        quests.push({
            id: `INDICATORS_${difficulty}_${idx}`,
            difficulty,
            stage,
            promptLatex: `\\\\text{${q.question} (pH ${q.pHRange})}`,
            expressionLatex: `\\\\text{pH range: ${q.pHRange}}`,
            targetLatex: "\\\\text{Indicator}",
            slots: [{ id: "ans", labelLatex: "Indicator", placeholder: "indicator name", expected: q.expected }],
            correctLatex: `\\\\text{${q.expected}}`,
            simConfig: {
                acidType: q.acidType,
                acidConc: 0.1,
                baseConc: 0.1,
                volumeAdded: 0,
                indicator: q.expected as any
            }
        });
    });
    
    return quests;
}

export default function SC202Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const sc2_02_t = {
        title: t("sc2_02.title"),
        footer_left: t("sc2_02.footer_left"),
        monitor_title: t("sc2_02.monitor_title"),
        back: t("sc2_02.back"),
        check: t("sc2_02.check"),
        next: t("sc2_02.next"),
        correct: t("sc2_02.correct"),
        incorrect: t("sc2_02.incorrect"),
        ready: t("sc2_02.ready"),
        stages: {
            curves: t("sc2_02.stages.curves"),
            equivalence: t("sc2_02.stages.equivalence"),
            indicators: t("sc2_02.stages.indicators"),
        },
        prompts: {
            curve_type: t("sc2_02.prompts.curve_type"),
            eq_volume: t("sc2_02.prompts.eq_volume"),
            ph_at_eq: t("sc2_02.prompts.ph_at_eq"),
        },
        hints: {
            curve_hint: t("sc2_02.hints.curve_hint"),
            volume_hint: t("sc2_02.hints.volume_hint"),
            ph_hint: t("sc2_02.hints.ph_hint"),
        },
        scenarios: {
            environmental_monitoring: t("sc2_02.scenarios.environmental_monitoring"),
            water_quality: t("sc2_02.scenarios.water_quality"),
            biotech_titration: t("sc2_02.scenarios.biotech_titration"),
        },
        labels: {
            eq_point: t("sc2_02.labels.eq_point"),
            input_answer: t("sc2_02.labels.input_answer"),
            formula: t("sc2_02.labels.formula"),
        },
        difficulty: {
            basic: "BASIC",
            core: "CORE",
            advanced: "ADVANCED",
            elite: "ELITE",
        },
    };

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
        buildPool: (d, s) => buildStagePool(sc2_02_t, d, s),
        initialStage: "CURVES",
        tolerance: 0.05
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sc2-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const activeScenario = useMemo(() => {
        if (stage === "CURVES") return sc2_02_t.scenarios.environmental_monitoring;
        if (stage === "EQUIVALENCE") return sc2_02_t.scenarios.water_quality;
        return sc2_02_t.scenarios.biotech_titration;
    }, [stage, sc2_02_t]);

    const stages = [
        { id: "CURVES", label: sc2_02_t.stages.curves },
        { id: "EQUIVALENCE", label: sc2_02_t.stages.equivalence },
        { id: "INDICATORS", label: sc2_02_t.stages.indicators },
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
            title={sc2_02_t.title}
            moduleCode="SC2.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sc2_02_t.footer_left}
            translations={sc2_02_t}
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
                            {sc2_02_t.labels.eq_point}
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
                        {sc2_02_t.monitor_title}
                    </h3>
                    <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </div>
                </div>

                <div className="p-6 bg-black/40 border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 backdrop-blur-md">
                    <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black text-center">
                            {sc2_02_t.labels.input_answer}
                        </div>
                        <input
                            value={inputs["ans"] || ""}
                            onChange={(e) => setInputs({ ans: e.target.value })}
                            className="w-full bg-black/50 border-2 border-neon-purple p-4 text-center outline-none focus:border-white placeholder:text-white/20 font-black text-2xl text-white transition-all shadow-[0_0_30px_rgba(255,0,255,0.05)]"
                            placeholder="..."
                        />
                    </div>

                    <div className="p-4 bg-white/[0.03] border border-white/10 rounded-3xl relative">
                        <div className="text-[10px] text-white/40 uppercase font-black mb-4 tracking-widest text-center">{sc2_02_t.labels.formula}</div>
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
