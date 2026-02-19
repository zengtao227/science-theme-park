"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PowerVisualization from "@/components/chamber/sp2-03/PowerVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

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

export default function SP203ElectricPower() {
    const { completeStage } = useAppStore();
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

    const buildStagePool = useCallback((
        tObj: typeof sp2_03_t,
        difficulty: Difficulty,
        stage: Stage
    ): SP203Quest[] => {
        // STAGE 1: POWER_BASICS - P=UI calculations
        if (stage === "POWER_BASICS") {
            const powerData = {
                BASIC: [
                    { voltage: 12, current: 2, power: "24", prompt: "V=12V, I=2A, find P" },
                    { voltage: 6, current: 3, power: "18", prompt: "V=6V, I=3A, find P" },
                    { voltage: 9, current: 1, power: "9", prompt: "V=9V, I=1A, find P" },
                    { power: 60, voltage: 12, current: "5", prompt: "P=60W, V=12V, find I" },
                    { power: 100, current: 5, voltage: "20", prompt: "P=100W, I=5A, find V" }
                ],
                CORE: [
                    { voltage: 220, current: 0.5, power: "110", prompt: "V=220V, I=0.5A, find P" },
                    { voltage: 120, current: 2.5, power: "300", prompt: "V=120V, I=2.5A, find P" },
                    { power: 1000, voltage: 220, current: "4.55", prompt: "P=1000W, V=220V, find I" },
                    { power: 500, current: 2, voltage: "250", prompt: "P=500W, I=2A, find V" },
                    { voltage: 110, current: 10, power: "1100", prompt: "V=110V, I=10A, find P" }
                ],
                ADVANCED: [
                    { voltage: 230, current: 4.35, power: "1000", prompt: "V=230V, I=4.35A, find P" },
                    { power: 2000, voltage: 220, current: "9.09", prompt: "P=2000W, V=220V, find I" },
                    { power: 1500, current: 6.5, voltage: "231", prompt: "P=1500W, I=6.5A, find V" },
                    { voltage: 240, current: 8.33, power: "2000", prompt: "V=240V, I=8.33A, find P" },
                    { power: 3000, voltage: 230, current: "13.04", prompt: "P=3000W, V=230V, find I" }
                ],
                ELITE: [
                    { voltage: 380, current: 16, power: "6080", prompt: "V=380V, I=16A, find P (3-phase)" },
                    { power: 5000, voltage: 220, current: "22.73", prompt: "P=5000W, V=220V, find I" },
                    { power: 10000, current: 45, voltage: "222", prompt: "P=10kW, I=45A, find V" },
                    { voltage: 400, current: 25, power: "10000", prompt: "V=400V, I=25A, find P" },
                    { power: 7500, voltage: 380, current: "19.74", prompt: "P=7.5kW, V=380V, find I" }
                ]
            };

            return powerData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                voltage: typeof item.voltage === 'string' ? parseFloat(item.voltage) : item.voltage,
                current: typeof item.current === 'number' ? item.current : undefined,
                power: typeof item.power === 'number' ? item.power : undefined,
                promptLatex: item.prompt,
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
                correctLatex: `\\text{Answer: } ${typeof item.power === 'string' ? item.power : 
                              typeof item.current === 'string' ? item.current : item.voltage}`,
                answer: typeof item.power === 'string' ? item.power : 
                       typeof item.current === 'string' ? item.current : item.voltage as string
            }));
        }

        // STAGE 2: ENERGY_CONSUMPTION - W=Pt and cost calculations
        if (stage === "ENERGY_CONSUMPTION") {
            const energyData = {
                BASIC: [
                    { power: 100, time: 10, energy: "1000", prompt: "P=100W, t=10h, find E (Wh)" },
                    { power: 60, time: 5, energy: "300", prompt: "P=60W, t=5h, find E (Wh)" },
                    { power: 1000, time: 2, energy: "2000", prompt: "P=1000W, t=2h, find E (Wh)" },
                    { power: 40, time: 24, energy: "960", prompt: "P=40W, t=24h, find E (Wh)" },
                    { power: 200, time: 3, energy: "600", prompt: "P=200W, t=3h, find E (Wh)" }
                ],
                CORE: [
                    { power: 1000, time: 5, energy: "5", prompt: "P=1kW, t=5h, find E (kWh)" },
                    { power: 2000, time: 3, energy: "6", prompt: "P=2kW, t=3h, find E (kWh)" },
                    { power: 500, time: 10, energy: "5", prompt: "P=500W, t=10h, find E (kWh)" },
                    { power: 1500, time: 4, energy: "6", prompt: "P=1.5kW, t=4h, find E (kWh)" },
                    { power: 3000, time: 2, energy: "6", prompt: "P=3kW, t=2h, find E (kWh)" }
                ],
                ADVANCED: [
                    { power: 1000, time: 30, cost: 0.25, answer: "7.5", prompt: "P=1kW, 30 days, 0.25 CHF/kWh, find cost" },
                    { power: 2000, time: 15, cost: 0.20, answer: "6", prompt: "P=2kW, 15 days, 0.20 CHF/kWh, find cost" },
                    { power: 500, time: 60, cost: 0.30, answer: "9", prompt: "P=500W, 60 days, 0.30 CHF/kWh, find cost" },
                    { power: 1500, time: 20, cost: 0.25, answer: "7.5", prompt: "P=1.5kW, 20 days, 0.25 CHF/kWh, find cost" },
                    { power: 3000, time: 10, cost: 0.20, answer: "6", prompt: "P=3kW, 10 days, 0.20 CHF/kWh, find cost" }
                ],
                ELITE: [
                    { power: 5000, time: 365, cost: 0.25, answer: "10950", prompt: "P=5kW, 1 year, 0.25 CHF/kWh, annual cost" },
                    { power: 10000, time: 180, cost: 0.20, answer: "8640", prompt: "P=10kW, 6 months, 0.20 CHF/kWh, cost" },
                    { power: 2500, time: 730, cost: 0.30, answer: "13140", prompt: "P=2.5kW, 2 years, 0.30 CHF/kWh, cost" },
                    { power: 7500, time: 90, cost: 0.25, answer: "4050", prompt: "P=7.5kW, 3 months, 0.25 CHF/kWh, cost" },
                    { power: 15000, time: 60, cost: 0.20, answer: "4320", prompt: "P=15kW, 60 days, 0.20 CHF/kWh, cost" }
                ]
            };

            return energyData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                power: item.power,
                time: item.time,
                cost: 'cost' in item ? item.cost : undefined,
                promptLatex: item.prompt,
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
                correctLatex: `\\text{Answer: } ${('energy' in item ? item.energy : undefined) || 
                             ('answer' in item ? item.answer : undefined) || "0"}`,
                answer: (('energy' in item ? item.energy : undefined) || 
                        ('answer' in item ? item.answer : undefined) || "0") as string
            }));
        }

        // STAGE 3: EFFICIENCY - Efficiency calculations
        if (stage === "EFFICIENCY") {
            const efficiencyData = {
                BASIC: [
                    { input: 100, output: 80, efficiency: "80", prompt: "Input=100W, Output=80W, find efficiency %" },
                    { input: 200, output: 150, efficiency: "75", prompt: "Input=200W, Output=150W, find efficiency %" },
                    { input: 50, output: 40, efficiency: "80", prompt: "Input=50W, Output=40W, find efficiency %" },
                    { input: 1000, output: 900, efficiency: "90", prompt: "Input=1000W, Output=900W, find efficiency %" },
                    { input: 500, output: 400, efficiency: "80", prompt: "Input=500W, Output=400W, find efficiency %" }
                ],
                CORE: [
                    { input: 1000, efficiency: 85, output: "850", prompt: "Input=1000W, Efficiency=85%, find output" },
                    { input: 2000, efficiency: 90, output: "1800", prompt: "Input=2000W, Efficiency=90%, find output" },
                    { output: 750, efficiency: 75, input: "1000", prompt: "Output=750W, Efficiency=75%, find input" },
                    { output: 1800, efficiency: 90, input: "2000", prompt: "Output=1800W, Efficiency=90%, find input" },
                    { input: 500, efficiency: 80, output: "400", prompt: "Input=500W, Efficiency=80%, find output" }
                ],
                ADVANCED: [
                    { input: 1000, output: 850, loss: "150", prompt: "Input=1000W, Output=850W, find power loss" },
                    { input: 2000, output: 1700, loss: "300", prompt: "Input=2000W, Output=1700W, find power loss" },
                    { input: 5000, efficiency: 92, loss: "400", prompt: "Input=5000W, Efficiency=92%, find loss" },
                    { output: 4500, efficiency: 90, loss: "500", prompt: "Output=4500W, Efficiency=90%, find loss" },
                    { input: 3000, output: 2550, loss: "450", prompt: "Input=3000W, Output=2550W, find loss" }
                ],
                ELITE: [
                    { device: "LED", input: 10, output: 9, efficiency: "90", prompt: "LED: 10W input, 9W light, efficiency?" },
                    { device: "Incandescent", input: 60, output: 6, efficiency: "10", prompt: "Bulb: 60W input, 6W light, efficiency?" },
                    { device: "Motor", input: 1000, output: 850, efficiency: "85", prompt: "Motor: 1000W input, 850W output, efficiency?" },
                    { device: "Transformer", input: 5000, output: 4750, efficiency: "95", prompt: "Transformer: 5000W input, 4750W output, efficiency?" },
                    { device: "Solar Panel", input: 1000, output: 200, efficiency: "20", prompt: "Solar: 1000W sunlight, 200W electric, efficiency?" }
                ]
            };

            return efficiencyData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: item.prompt,
                expressionLatex: `\\eta = \\\\frac{P_{out}}{P_{in}} \\times 100\\%`,
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
                correctLatex: `\\text{Answer: } ${('efficiency' in item ? item.efficiency : undefined) || 
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
    }, []);

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
    } = useQuestManager<SP203Quest, Stage>({
        buildPool: (d, s) => buildStagePool(sp2_03_t, d, s),
        initialStage: "POWER_BASICS",
    });

    useEffect(() => {
        if (!currentQuest) return;
        if (currentQuest.power) setCurrentPower(currentQuest.power);
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
                        key={currentQuest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black/30 rounded-xl p-6 border border-white/10"
                    >
                        <div className="mb-4">
                            <div className="text-white/50 text-sm mb-2">Question {currentQuest.id}</div>
                            <div className="text-white text-lg">{currentQuest.promptLatex}</div>
                        </div>

                        {currentQuest.slots.map((slot) => (
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
