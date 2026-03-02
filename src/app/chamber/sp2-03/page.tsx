"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PowerVisualization from "@/components/chamber/sp2-03/PowerVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";
import { renderMixedText } from "@/lib/latex-utils";

type Stage = "POWER_BASICS" | "ENERGY_CONSUMPTION" | "EFFICIENCY";

interface SP203Quest extends Quest {
    stage: Stage;
    voltage?: number;
    current?: number;
    power?: number;
    time?: number;
    energy?: number;
    cost?: number;
}

interface PowerDataItem {
    voltage: number | string;
    current: number | string;
    power: number | string;
}

interface EnergyDataItem {
    power: number;
    time: number;
    energy?: string;
    cost?: number;
    answer?: string;
}

interface EfficiencyDataItem {
    input?: number | string;
    output?: number | string;
    efficiency?: number | string;
    loss?: string;
    device?: string;
}

export default function SP203ElectricPower() {
    const { t } = useLanguage();
    const [currentPower, setCurrentPower] = useState(0);

    const sp2_03_t = useMemo(() => ({
        title: t("sp2_03.title"),
        back: t("sp2_03.back"),
        difficulty: {
            basic: t("sp2_03.difficulty.basic"),
            core: t("sp2_03.difficulty.core"),
            advanced: t("sp2_03.difficulty.advanced"),
            elite: t("sp2_03.difficulty.elite")
        },
        stages: {
            power_basics: t("sp2_03.stages.power_basics"),
            energy_consumption: t("sp2_03.stages.energy_consumption"),
            efficiency: t("sp2_03.stages.efficiency")
        },
        scenarios: {
            power_basics: t("sp2_03.scenarios.power_basics"),
            energy_consumption: t("sp2_03.scenarios.energy_consumption"),
            efficiency: t("sp2_03.scenarios.efficiency")
        },
        footer_left: t("sp2_03.footer_left"),
        check: t("sp2_03.check"),
        next: t("sp2_03.next"),
        correct: t("sp2_03.correct"),
        incorrect: t("sp2_03.incorrect")
    }), [t]);

    const buildPowerPrompt = useCallback((item: PowerDataItem) => {
        if (typeof item.power === "string") {
            if (item.voltage === 380 && item.current === 16) {
                return t("sp2_03.prompts.power_find_power_three_phase", {
                    voltage: item.voltage,
                    current: item.current
                });
            }
            return t("sp2_03.prompts.power_find_power", {
                voltage: item.voltage,
                current: item.current
            });
        }
        if (typeof item.current === "string") {
            return t("sp2_03.prompts.power_find_current", {
                power: item.power,
                voltage: item.voltage
            });
        }
        return t("sp2_03.prompts.power_find_voltage", {
            power: item.power,
            current: item.current
        });
    }, [t]);

    const buildEnergyPrompt = useCallback((item: EnergyDataItem, questDifficulty: Difficulty, index: number) => {
        if (questDifficulty === "ELITE") {
            return t(`sp2_03.prompts.e${index + 1}`);
        }
        if (questDifficulty === "BASIC") {
            return t("sp2_03.prompts.energy_find_wh", {
                power: item.power,
                time: item.time
            });
        }
        if (questDifficulty === "CORE") {
            return t("sp2_03.prompts.energy_find_kwh", {
                power: item.power,
                time: item.time
            });
        }
        return t("sp2_03.prompts.energy_find_cost", {
            power: item.power,
            days: item.time,
            rate: item.cost as number
        });
    }, [t]);

    const buildEfficiencyPrompt = useCallback((item: EfficiencyDataItem, questDifficulty: Difficulty) => {
        if (questDifficulty === "BASIC") {
            return t("sp2_03.prompts.efficiency_find_percent", {
                input: item.input as string | number,
                output: item.output as string | number
            });
        }
        if (questDifficulty === "CORE") {
            if (typeof item.output === "string") {
                return t("sp2_03.prompts.efficiency_find_output", {
                    input: item.input as string | number,
                    efficiency: item.efficiency as string | number
                });
            }
            return t("sp2_03.prompts.efficiency_find_input", {
                output: item.output as string | number,
                efficiency: item.efficiency as string | number
            });
        }
        if (questDifficulty === "ADVANCED") {
            if (typeof item.output === "number" && typeof item.input === "number") {
                return t("sp2_03.prompts.efficiency_find_loss_io", {
                    input: item.input as string | number,
                    output: item.output as string | number
                });
            }
            if (typeof item.input === "number") {
                return t("sp2_03.prompts.efficiency_find_loss_input_eff", {
                    input: item.input as string | number,
                    efficiency: item.efficiency as string | number
                });
            }
            return t("sp2_03.prompts.efficiency_find_loss_output_eff", {
                output: item.output as string | number,
                efficiency: item.efficiency as string | number
            });
        }
        return t("sp2_03.prompts.efficiency_device", {
            device: item.device as string | number,
            input: item.input as string | number,
            output: item.output as string | number
        });
    }, [t]);

    const buildStagePool = useCallback((
        tObj: typeof sp2_03_t,
        difficulty: Difficulty,
        stage: Stage
    ): SP203Quest[] => {
        // STAGE 1: POWER_BASICS - P=UI calculations
        if (stage === "POWER_BASICS") {
            const powerData: Record<Difficulty, PowerDataItem[]> = {
                BASIC: [
                    { voltage: 12, current: 2, power: "24" },
                    { voltage: 6, current: 3, power: "18" },
                    { voltage: 9, current: 1, power: "9" },
                    { power: 60, voltage: 12, current: "5" },
                    { power: 100, current: 5, voltage: "20" }
                ],
                CORE: [
                    { voltage: 220, current: 0.5, power: "110" },
                    { voltage: 120, current: 2.5, power: "300" },
                    { power: 1000, voltage: 220, current: "4.55" },
                    { power: 500, current: 2, voltage: "250" },
                    { voltage: 110, current: 10, power: "1100" }
                ],
                ADVANCED: [
                    { voltage: 230, current: 4.35, power: "1000" },
                    { power: 2000, voltage: 220, current: "9.09" },
                    { power: 1500, current: 6.5, voltage: "231" },
                    { voltage: 240, current: 8.33, power: "2000" },
                    { power: 3000, voltage: 230, current: "13.04" }
                ],
                ELITE: [
                    { voltage: 380, current: 16, power: "6080" },
                    { power: 5000, voltage: 220, current: "22.73" },
                    { power: 10000, current: 45, voltage: "222" },
                    { voltage: 400, current: 25, power: "10000" },
                    { power: 7500, voltage: 380, current: "19.74" }
                ]
            };

            return powerData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                voltage: typeof item.voltage === 'string' ? parseFloat(item.voltage) : item.voltage,
                current: typeof item.current === 'number' ? item.current : undefined,
                power: typeof item.power === 'number' ? item.power : undefined,
                promptLatex: buildPowerPrompt(item),
                expressionLatex: `P = U \\times I`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: "Answer",
                        placeholder: "type value",
                        expected: typeof item.power === 'string' ? item.power :
                            typeof item.current === 'string' ? item.current : item.voltage
                    }
                ],
                correctLatex: `${t("common.answer_prefix")} ${typeof item.power === 'string' ? item.power :
                    typeof item.current === 'string' ? item.current : item.voltage}`,
                answer: typeof item.power === 'string' ? item.power :
                    typeof item.current === 'string' ? item.current : item.voltage as string
            }));
        }

        // STAGE 2: ENERGY_CONSUMPTION - W=Pt and cost calculations
        if (stage === "ENERGY_CONSUMPTION") {
            const energyData: Record<Difficulty, EnergyDataItem[]> = {
                BASIC: [
                    { power: 100, time: 10, energy: "1000" },
                    { power: 60, time: 5, energy: "300" },
                    { power: 1000, time: 2, energy: "2000" },
                    { power: 40, time: 24, energy: "960" },
                    { power: 200, time: 3, energy: "600" }
                ],
                CORE: [
                    { power: 1000, time: 5, energy: "5" },
                    { power: 2000, time: 3, energy: "6" },
                    { power: 500, time: 10, energy: "5" },
                    { power: 1500, time: 4, energy: "6" },
                    { power: 3000, time: 2, energy: "6" }
                ],
                ADVANCED: [
                    { power: 1000, time: 30, cost: 0.25, answer: "7.5" },
                    { power: 2000, time: 15, cost: 0.20, answer: "6" },
                    { power: 500, time: 60, cost: 0.30, answer: "9" },
                    { power: 1500, time: 20, cost: 0.25, answer: "7.5" },
                    { power: 3000, time: 10, cost: 0.20, answer: "6" }
                ],
                ELITE: [
                    { power: 3000, time: 500, cost: 0.28, answer: "420" },
                    { power: 1500, time: 100, cost: 0.28, answer: "42" },
                    { power: 2000, time: 5, cost: 0.28, answer: "2.8" },
                    { power: 11000, time: 50, cost: 0.24, answer: "132" },
                    { power: 500, time: 72, cost: 0.28, answer: "10.08" }
                ]
            };

            return energyData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                power: item.power,
                time: item.time,
                cost: 'cost' in item ? item.cost : undefined,
                promptLatex: buildEnergyPrompt(item, difficulty, idx),
                expressionLatex: difficulty === "BASIC" || difficulty === "CORE" ?
                    `E = P \\times t` : `\\text{Cost} = E \\times \\text{rate}`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: difficulty === "BASIC" ? "Energy (Wh)" :
                            difficulty === "CORE" ? "Energy (kWh)" : "Cost (CHF)",
                        placeholder: "type value",
                        expected: ('energy' in item ? item.energy : undefined) ||
                            ('answer' in item ? item.answer : undefined) || "0"
                    }
                ],
                correctLatex: `${t("common.answer_prefix")} ${('energy' in item ? item.energy : undefined) ||
                    ('answer' in item ? item.answer : undefined) || "0"}`,
                answer: (('energy' in item ? item.energy : undefined) ||
                    ('answer' in item ? item.answer : undefined) || "0") as string
            }));
        }

        // STAGE 3: EFFICIENCY - Efficiency calculations
        if (stage === "EFFICIENCY") {
            const efficiencyData: Record<Difficulty, EfficiencyDataItem[]> = {
                BASIC: [
                    { input: 100, output: 80, efficiency: "80" },
                    { input: 200, output: 150, efficiency: "75" },
                    { input: 50, output: 40, efficiency: "80" },
                    { input: 1000, output: 900, efficiency: "90" },
                    { input: 500, output: 400, efficiency: "80" }
                ],
                CORE: [
                    { input: 1000, efficiency: 85, output: "850" },
                    { input: 2000, efficiency: 90, output: "1800" },
                    { output: 750, efficiency: 75, input: "1000" },
                    { output: 1800, efficiency: 90, input: "2000" },
                    { input: 500, efficiency: 80, output: "400" }
                ],
                ADVANCED: [
                    { input: 1000, output: 850, loss: "150" },
                    { input: 2000, output: 1700, loss: "300" },
                    { input: 5000, efficiency: 92, loss: "400" },
                    { output: 4500, efficiency: 90, loss: "500" },
                    { input: 3000, output: 2550, loss: "450" }
                ],
                ELITE: [
                    { device: "LED", input: 10, output: 9, efficiency: "90" },
                    { device: "Incandescent", input: 60, output: 6, efficiency: "10" },
                    { device: "Motor", input: 1000, output: 850, efficiency: "85" },
                    { device: "Transformer", input: 5000, output: 4750, efficiency: "95" },
                    { device: "Solar Panel", input: 1000, output: 200, efficiency: "20" }
                ]
            };

            return efficiencyData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: buildEfficiencyPrompt(item, difficulty),
                expressionLatex: `\\eta = \\frac{P_{out}}{P_{in}} \\times 100\\%`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: difficulty === "BASIC" ? "Efficiency (%)" :
                            difficulty === "CORE" ? (('output' in item && typeof item.output === 'string') ? "Output (W)" : "Input (W)") :
                                difficulty === "ADVANCED" ? "Power Loss (W)" : "Efficiency (%)",
                        placeholder: "type value",
                        expected: ('efficiency' in item ? item.efficiency : undefined) ||
                            ('output' in item ? item.output : undefined) ||
                            ('input' in item ? item.input : undefined) ||
                            ('loss' in item ? item.loss : undefined) || "0"
                    }
                ],
                correctLatex: `${t("common.answer_prefix")} ${('efficiency' in item ? item.efficiency : undefined) ||
                    ('output' in item ? item.output : undefined) ||
                    ('input' in item ? item.input : undefined) ||
                    ('loss' in item ? item.loss : undefined) || "0"}`,
                answer: (('efficiency' in item ? item.efficiency : undefined) ||
                    ('output' in item ? item.output : undefined) ||
                    ('input' in item ? item.input : undefined) ||
                    ('loss' in item ? item.loss : undefined) || "0") as string
            }));
        }

        return [];
    }, [buildEnergyPrompt, buildEfficiencyPrompt, buildPowerPrompt, t]);

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
    } = useQuestManager<SP203Quest, Stage>({
    moduleCode: "sp2-03",
        buildPool: (d, s) => buildStagePool(sp2_03_t, d, s),
        initialStage: "POWER_BASICS",
    });

    useEffect(() => {
        if (!currentQuest) return;
        if (currentQuest?.power) setCurrentPower(currentQuest?.power);
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
      title={sp2_03_t.title}
            moduleCode="SP2.03"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "POWER_BASICS", label: sp2_03_t.stages.power_basics },
                { id: "ENERGY_CONSUMPTION", label: sp2_03_t.stages.energy_consumption },
                { id: "EFFICIENCY", label: sp2_03_t.stages.efficiency },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sp2_03_t.footer_left}
            translations={{
                back: sp2_03_t.back,
                difficulty: sp2_03_t.difficulty,
                check: sp2_03_t.check,
                next: sp2_03_t.next,
                correct: sp2_03_t.correct,
                incorrect: sp2_03_t.incorrect,
            }}
            monitorContent={
                <PowerVisualization
                    quest={currentQuest}
                    stage={stage}
                    power={currentPower}
                    translations={{
                        power_basics: sp2_03_t.stages.power_basics,
                        energy_consumption: sp2_03_t.stages.energy_consumption,
                        efficiency: sp2_03_t.stages.efficiency,
                    }}
                />
            }
        >
            <div className="flex flex-col gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                        {stage === "POWER_BASICS" && sp2_03_t.stages.power_basics}
                        {stage === "ENERGY_CONSUMPTION" && sp2_03_t.stages.energy_consumption}
                        {stage === "EFFICIENCY" && sp2_03_t.stages.efficiency}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {stage === "POWER_BASICS" && sp2_03_t.scenarios.power_basics}
                        {stage === "ENERGY_CONSUMPTION" && sp2_03_t.scenarios.energy_consumption}
                        {stage === "EFFICIENCY" && sp2_03_t.scenarios.efficiency}
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
                                {lastCheck.ok ? sp2_03_t.correct : sp2_03_t.incorrect}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
