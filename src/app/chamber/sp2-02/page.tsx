"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import OhmsLawVisualization from "@/components/chamber/sp2-02/OhmsLawVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";
import { renderMixedText } from "@/lib/latex-utils";

type Stage = "OHMS_LAW" | "SERIES_CIRCUITS" | "PARALLEL_CIRCUITS";

interface SP202Quest extends Quest {
    stage: Stage;
    voltage?: number;
    current?: number;
    resistance?: number;
    circuitType?: "series" | "parallel" | "mixed";
    components?: number[];
}

interface OhmsDataItem {
    voltage: number | string;
    current: number | string;
    resistance: number | string;
}

interface CircuitDataItem {
    components: number[];
    voltage: number;
    answer: string;
}

export default function SP202OhmsLaw() {
    const { t } = useLanguage();
    const [currentVoltage, setCurrentVoltage] = useState(0);
    const [currentCurrent, setCurrentCurrent] = useState(0);

    const sp2_02_t = useMemo(() => ({
        title: t("sp2_02.title"),
        back: t("sp2_02.back"),
        difficulty: {
            basic: t("sp2_02.difficulty.basic"),
            core: t("sp2_02.difficulty.core"),
            advanced: t("sp2_02.difficulty.advanced"),
            elite: t("sp2_02.difficulty.elite")
        },
        stages: {
            ohms_law: t("sp2_02.stages.ohms_law"),
            series_circuits: t("sp2_02.stages.series_circuits"),
            parallel_circuits: t("sp2_02.stages.parallel_circuits")
        },
        scenarios: {
            ohms_law: t("sp2_02.scenarios.ohms_law"),
            series_circuits: t("sp2_02.scenarios.series_circuits"),
            parallel_circuits: t("sp2_02.scenarios.parallel_circuits")
        },
        footer_left: t("sp2_02.footer_left"),
        check: t("sp2_02.check"),
        next: t("sp2_02.next"),
        correct: t("sp2_02.correct"),
        incorrect: t("sp2_02.incorrect")
    }), [t]);

    const formatResistanceList = useCallback(
        (components: number[]) => components.map((value, index) => `R_${index + 1}=${value}\\Omega`).join(", "),
        []
    );

    const buildOhmsPrompt = useCallback((item: OhmsDataItem) => {
        if (typeof item.current === "string") {
            return t("sp2_02.prompts.ohms_find_current", {
                voltage: item.voltage,
                resistance: item.resistance
            });
        }
        if (typeof item.voltage === "string") {
            return t("sp2_02.prompts.ohms_find_voltage", {
                current: item.current,
                resistance: item.resistance
            });
        }
        return t("sp2_02.prompts.ohms_find_resistance", {
            current: item.current,
            voltage: item.voltage
        });
    }, [t]);

    const buildStagePool = useCallback((
        tObj: typeof sp2_02_t,
        difficulty: Difficulty,
        stage: Stage
    ): SP202Quest[] => {
        // STAGE 1: OHMS_LAW - Basic U=IR calculations
        if (stage === "OHMS_LAW") {
            const ohmsData: Record<Difficulty, OhmsDataItem[]> = {
                BASIC: [
                    { voltage: 12, resistance: 4, current: "3" },
                    { voltage: 9, resistance: 3, current: "3" },
                    { current: 2, resistance: 5, voltage: "10" },
                    { current: 4, voltage: 20, resistance: "5" },
                    { voltage: 6, resistance: 2, current: "3" }
                ],
                CORE: [
                    { voltage: 24, resistance: 8, current: "3" },
                    { current: 0.5, resistance: 10, voltage: "5" },
                    { voltage: 15, current: 0.3, resistance: "50" },
                    { voltage: 120, resistance: 60, current: "2" },
                    { current: 0.25, voltage: 12, resistance: "48" }
                ],
                ADVANCED: [
                    { voltage: 9, resistance: 4.5, current: "2" },
                    { current: 1.5, resistance: 8, voltage: "12" },
                    { voltage: 18, current: 0.6, resistance: "30" },
                    { voltage: 7.5, resistance: 2.5, current: "3" },
                    { current: 0.75, voltage: 15, resistance: "20" }
                ],
                ELITE: [
                    { voltage: 220, resistance: 440, current: "0.5" },
                    { current: 0.05, resistance: 1000, voltage: "50" },
                    { voltage: 3.3, current: 0.033, resistance: "100" },
                    { voltage: 5, resistance: 2200, current: "0.00227" },
                    { current: 0.001, voltage: 9, resistance: "9000" }
                ]
            };

            return ohmsData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                voltage: typeof item.voltage === 'string' ? parseFloat(item.voltage) : item.voltage,
                current: typeof item.current === 'number' ? item.current : undefined,
                resistance: typeof item.resistance === 'number' ? item.resistance : undefined,
                promptLatex: buildOhmsPrompt(item),
                expressionLatex: `U = I \\times R`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: "Answer",
                        placeholder: "type value",
                        expected: typeof item.current === 'string' ? item.current : 
                                 typeof item.voltage === 'string' ? item.voltage : item.resistance
                    }
                ],
                correctLatex: `${t("common.answer_prefix")} ${typeof item.current === 'string' ? item.current : 
                              typeof item.voltage === 'string' ? item.voltage : item.resistance}`,
                answer: typeof item.current === 'string' ? item.current : 
                       typeof item.voltage === 'string' ? item.voltage : item.resistance as string
            }));
        }

        // STAGE 2: SERIES_CIRCUITS - Series circuit calculations
        if (stage === "SERIES_CIRCUITS") {
            const seriesData: Record<Difficulty, CircuitDataItem[]> = {
                BASIC: [
                    { components: [2, 3], voltage: 10, answer: "2" },
                    { components: [4, 6], voltage: 20, answer: "2" },
                    { components: [5, 5], voltage: 20, answer: "2" },
                    { components: [3, 7], voltage: 10, answer: "1" },
                    { components: [2, 2, 2], voltage: 12, answer: "2" }
                ],
                CORE: [
                    { components: [10, 20, 30], voltage: 60, answer: "1" },
                    { components: [5, 10], voltage: 30, answer: "2" },
                    { components: [8, 12], voltage: 40, answer: "2" },
                    { components: [15, 25], voltage: 80, answer: "2" },
                    { components: [6, 9, 15], voltage: 60, answer: "2" }
                ],
                ADVANCED: [
                    { components: [4.5, 5.5], voltage: 20, answer: "2" },
                    { components: [12, 18, 30], voltage: 120, answer: "2" },
                    { components: [7.5, 12.5], voltage: 40, answer: "2" },
                    { components: [20, 30, 50], voltage: 200, answer: "2" },
                    { components: [3.3, 6.7], voltage: 20, answer: "2" }
                ],
                ELITE: [
                    { components: [100, 200, 300, 400], voltage: 100, answer: "0.1" },
                    { components: [47, 68, 100], voltage: 21.5, answer: "0.1" },
                    { components: [220, 330, 470], voltage: 102, answer: "0.1" },
                    { components: [1000, 2000, 3000], voltage: 120, answer: "0.02" },
                    { components: [150, 250, 350, 250], voltage: 100, answer: "0.1" }
                ]
            };

            return seriesData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                circuitType: "series",
                components: item.components,
                voltage: item.voltage,
                promptLatex: t("sp2_02.prompts.series_find_current", {
                    voltage: item.voltage,
                    components: formatResistanceList(item.components)
                }),
                expressionLatex: `R_{total} = R_1 + R_2 + ...`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: "Current (A)",
                        placeholder: "type value",
                        expected: item.answer
                    }
                ],
                correctLatex: `\\text{I = } ${item.answer} \\text{ A}`,
                answer: item.answer
            }));
        }

        // STAGE 3: PARALLEL_CIRCUITS - Parallel circuit calculations
        if (stage === "PARALLEL_CIRCUITS") {
            const parallelData: Record<Difficulty, CircuitDataItem[]> = {
                BASIC: [
                    { components: [6, 6], voltage: 12, answer: "4" },
                    { components: [4, 4], voltage: 8, answer: "4" },
                    { components: [10, 10], voltage: 10, answer: "2" },
                    { components: [3, 6], voltage: 6, answer: "3" },
                    { components: [5, 5], voltage: 10, answer: "4" }
                ],
                CORE: [
                    { components: [12, 6], voltage: 12, answer: "3" },
                    { components: [20, 30], voltage: 60, answer: "5" },
                    { components: [8, 8, 8], voltage: 24, answer: "9" },
                    { components: [15, 10], voltage: 30, answer: "5" },
                    { components: [6, 12, 12], voltage: 12, answer: "5" }
                ],
                ADVANCED: [
                    { components: [10, 15, 30], voltage: 30, answer: "8" },
                    { components: [20, 20, 10], voltage: 20, answer: "5" },
                    { components: [12, 24, 8], voltage: 24, answer: "8" },
                    { components: [30, 60, 20], voltage: 60, answer: "8" },
                    { components: [5, 10, 20], voltage: 20, answer: "9" }
                ],
                ELITE: [
                    { components: [100, 200, 300], voltage: 60, answer: "2" },
                    { components: [220, 330, 470], voltage: 110, answer: "1" },
                    { components: [1000, 2000, 4000], voltage: 100, answer: "0.175" },
                    { components: [150, 300, 600], voltage: 90, answer: "1.2" },
                    { components: [47, 68, 100, 150], voltage: 10, answer: "1" }
                ]
            };

            return parallelData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                circuitType: "parallel",
                components: item.components,
                voltage: item.voltage,
                promptLatex: t("sp2_02.prompts.parallel_find_total_current", {
                    voltage: item.voltage,
                    components: formatResistanceList(item.components)
                }),
                expressionLatex: `\\frac{1}{R_{total}} = \\frac{1}{R_1} + \\frac{1}{R_2} + ...`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: "Total Current (A)",
                        placeholder: "type value",
                        expected: item.answer
                    }
                ],
                correctLatex: `\\text{I = } ${item.answer} \\text{ A}`,
                answer: item.answer
            }));
        }

        return [];
    }, [formatResistanceList, buildOhmsPrompt, t]);

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
    } = useQuestManager<SP202Quest, Stage>({
    moduleCode: "sp2-02",
        buildPool: (d, s) => buildStagePool(sp2_02_t, d, s),
        initialStage: "OHMS_LAW",
    });

    useEffect(() => {
        if (!currentQuest) return;
        
        if (currentQuest?.voltage) setCurrentVoltage(currentQuest?.voltage);
        if (currentQuest?.current) setCurrentCurrent(currentQuest?.current);
    }, [currentQuest]);

    if (!currentQuest) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sp2_02_t.title}
            moduleCode="SP2.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "OHMS_LAW", label: sp2_02_t.stages.ohms_law },
                { id: "SERIES_CIRCUITS", label: sp2_02_t.stages.series_circuits },
                { id: "PARALLEL_CIRCUITS", label: sp2_02_t.stages.parallel_circuits },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sp2_02_t.footer_left}
            translations={{
                back: sp2_02_t.back,
                difficulty: sp2_02_t.difficulty,
                check: sp2_02_t.check,
                next: sp2_02_t.next,
                correct: sp2_02_t.correct,
                incorrect: sp2_02_t.incorrect,
            }}
            monitorContent={
                <OhmsLawVisualization
                    quest={currentQuest}
                    stage={stage}
                    voltage={currentVoltage}
                    current={currentCurrent}
                    translations={{
                        ohms_law: sp2_02_t.stages.ohms_law,
                        series_circuits: sp2_02_t.stages.series_circuits,
                        parallel_circuits: sp2_02_t.stages.parallel_circuits,
                    }}
                />
            }
        >
            <div className="flex flex-col gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                        {stage === "OHMS_LAW" && sp2_02_t.stages.ohms_law}
                        {stage === "SERIES_CIRCUITS" && sp2_02_t.stages.series_circuits}
                        {stage === "PARALLEL_CIRCUITS" && sp2_02_t.stages.parallel_circuits}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {stage === "OHMS_LAW" && sp2_02_t.scenarios.ohms_law}
                        {stage === "SERIES_CIRCUITS" && sp2_02_t.scenarios.series_circuits}
                        {stage === "PARALLEL_CIRCUITS" && sp2_02_t.scenarios.parallel_circuits}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuest?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black/30 rounded-xl p-6 border border-white/10"
                    >
                        <div className="mb-4">
                            <div className="text-white/50 text-sm mb-2">Question {currentQuest?.id}</div>
                            <div className="text-white text-lg">{renderMixedText(currentQuest?.promptLatex || "")}</div>
                        </div>

                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-4">
                                <label className="text-white/70 min-w-[120px]">{slot.labelLatex}:</label>
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        ))}

                        {lastCheck && (
                            <div className={`mt-4 p-3 rounded-lg ${lastCheck.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {lastCheck.ok ? sp2_02_t.correct : sp2_02_t.incorrect}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
