"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TemperatureVisualization from "@/components/chamber/sp3-04/TemperatureVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "TEMPERATURE" | "HEAT_TRANSFER" | "THERMAL_EQUILIBRIUM";

interface SP304Quest extends Quest {
    stage: Stage;
    tempType?: string;
    material?: string;
    heatFlow?: string;
}

type SP304T = typeof translations.EN.sp3_04;

export default function SP304Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp3_04 || translations.EN.sp3_04) as SP304T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP304Quest[] => {
        const quests: SP304Quest[] = [];

        if (stage === "TEMPERATURE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "T-B1", difficulty, stage, tempType: "celsius",
                        promptLatex: `\\text{Water freezes at } 0°C. \\text{ Convert to Kelvin: } T_K = T_C + 273`,
                        expressionLatex: `T_K = 0 + 273`,
                        targetLatex: `T_K`,
                        slots: [{ id: "temp", labelLatex: `T_K`, placeholder: "273", expected: 273 }],
                        correctLatex: `T_K = 273 \\text{ K}`,
                        hintLatex: [`\\text{Add 273 to Celsius temperature}`]
                    },
                    {
                        id: "T-B2", difficulty, stage, tempType: "celsius",
                        promptLatex: `\\text{Water boils at } 100°C. \\text{ Convert to Kelvin.}`,
                        expressionLatex: `T_K = T_C + 273`,
                        targetLatex: `T_K`,
                        slots: [{ id: "temp", labelLatex: `T_K`, placeholder: "373", expected: 373 }],
                        correctLatex: `T_K = 373 \\text{ K}`,
                        hintLatex: [`T_K = 100 + 273`]
                    },
                    {
                        id: "T-B3", difficulty, stage, tempType: "kelvin",
                        promptLatex: `\\text{Room temperature is } 293 \\text{ K. Convert to Celsius: } T_C = T_K - 273`,
                        expressionLatex: `T_C = 293 - 273`,
                        targetLatex: `T_C`,
                        slots: [{ id: "temp", labelLatex: `T_C`, placeholder: "20", expected: 20 }],
                        correctLatex: `T_C = 20°C`,
                        hintLatex: [`\\text{Subtract 273 from Kelvin}`]
                    },
                    {
                        id: "T-B4", difficulty, stage, tempType: "absolute",
                        promptLatex: `\\text{Absolute zero is the lowest possible temperature. What is it in Kelvin?}`,
                        expressionLatex: `T_{\\text{absolute zero}}`,
                        targetLatex: `T_K`,
                        slots: [{ id: "temp", labelLatex: `T_K`, placeholder: "0", expected: 0 }],
                        correctLatex: `T_K = 0 \\text{ K}`,
                        hintLatex: [`\\text{No molecular motion at absolute zero}`]
                    },
                    {
                        id: "T-B5", difficulty, stage, tempType: "scale",
                        promptLatex: `\\text{Basel winter: } -5°C. \\text{ Convert to Kelvin.}`,
                        expressionLatex: `T_K = T_C + 273`,
                        targetLatex: `T_K`,
                        slots: [{ id: "temp", labelLatex: `T_K`, placeholder: "268", expected: 268 }],
                        correctLatex: `T_K = 268 \\text{ K}`,
                        hintLatex: [`T_K = -5 + 273`]
                    }
                );
            }
        }

        if (stage === "HEAT_TRANSFER") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "H-C1", difficulty, stage, material: "water",
                        promptLatex: `\\text{Heat } 2 \\text{ kg water by } 10°C. \\text{ Specific heat } c = 4200 \\text{ J/(kg·K)}`,
                        expressionLatex: `Q = mc\\Delta T = 2 \\times 4200 \\times 10`,
                        targetLatex: `Q`,
                        slots: [{ id: "heat", labelLatex: `Q \\text{ (J)}`, placeholder: "84000", expected: 84000 }],
                        correctLatex: `Q = 84000 \\text{ J}`,
                        hintLatex: [`Q = mc\\Delta T`]
                    },
                    {
                        id: "H-C2", difficulty, stage, material: "aluminum",
                        promptLatex: `\\text{Heat } 1 \\text{ kg aluminum by } 20°C. \\text{ Specific heat } c = 900 \\text{ J/(kg·K)}`,
                        expressionLatex: `Q = mc\\Delta T`,
                        targetLatex: `Q`,
                        slots: [{ id: "heat", labelLatex: `Q \\text{ (J)}`, placeholder: "18000", expected: 18000 }],
                        correctLatex: `Q = 18000 \\text{ J}`,
                        hintLatex: [`Q = 1 \\times 900 \\times 20`]
                    },
                    {
                        id: "H-C3", difficulty, stage, material: "iron",
                        promptLatex: `\\text{Heat } 0.5 \\text{ kg iron by } 50°C. \\text{ Specific heat } c = 450 \\text{ J/(kg·K)}`,
                        expressionLatex: `Q = mc\\Delta T`,
                        targetLatex: `Q`,
                        slots: [{ id: "heat", labelLatex: `Q \\text{ (J)}`, placeholder: "11250", expected: 11250 }],
                        correctLatex: `Q = 11250 \\text{ J}`,
                        hintLatex: [`Q = 0.5 \\times 450 \\times 50`]
                    },
                    {
                        id: "H-C4", difficulty, stage, heatFlow: "conduction",
                        promptLatex: `\\text{Which material conducts heat fastest: copper, wood, or air?}`,
                        expressionLatex: `\\text{Thermal conductivity comparison}`,
                        targetLatex: `\\text{Material}`,
                        slots: [{ id: "material", labelLatex: `\\text{Material}`, placeholder: "copper", expected: "copper" }],
                        correctLatex: `\\text{Copper (metal)}`,
                        hintLatex: [`\\text{Metals conduct heat best}`]
                    },
                    {
                        id: "H-C5", difficulty, stage, heatFlow: "insulation",
                        promptLatex: `\\text{Which material is the best insulator: metal, plastic, or air?}`,
                        expressionLatex: `\\text{Thermal insulation comparison}`,
                        targetLatex: `\\text{Material}`,
                        slots: [{ id: "material", labelLatex: `\\text{Material}`, placeholder: "air", expected: "air" }],
                        correctLatex: `\\text{Air (gas)}`,
                        hintLatex: [`\\text{Gases insulate best}`]
                    }
                );
            }
        }

        if (stage === "THERMAL_EQUILIBRIUM") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "E-A1", difficulty, stage,
                        promptLatex: `\\text{Mix } 1 \\text{ kg water at } 80°C \\text{ with } 1 \\text{ kg water at } 20°C. \\text{ Final temp?}`,
                        expressionLatex: `T_f = \\frac{m_1T_1 + m_2T_2}{m_1 + m_2} = \\frac{80 + 20}{2}`,
                        targetLatex: `T_f`,
                        slots: [{ id: "temp", labelLatex: `T_f \\text{ (°C)}`, placeholder: "50", expected: 50 }],
                        correctLatex: `T_f = 50°C`,
                        hintLatex: [`\\text{Average of two equal masses}`]
                    },
                    {
                        id: "E-A2", difficulty, stage,
                        promptLatex: `\\text{Mix } 2 \\text{ kg water at } 60°C \\text{ with } 1 \\text{ kg water at } 30°C. \\text{ Final temp?}`,
                        expressionLatex: `T_f = \\frac{2 \\times 60 + 1 \\times 30}{2 + 1}`,
                        targetLatex: `T_f`,
                        slots: [{ id: "temp", labelLatex: `T_f \\text{ (°C)}`, placeholder: "50", expected: 50 }],
                        correctLatex: `T_f = 50°C`,
                        hintLatex: [`T_f = \\frac{120 + 30}{3}`]
                    },
                    {
                        id: "E-A3", difficulty, stage,
                        promptLatex: `\\text{Hot object at } 100°C \\text{ cools to room temp } 20°C. \\text{ Heat flows which direction?}`,
                        expressionLatex: `\\text{Heat flow direction}`,
                        targetLatex: `\\text{Direction}`,
                        slots: [{ id: "dir", labelLatex: `\\text{Direction}`, placeholder: "out", expected: "out" }],
                        correctLatex: `\\text{Heat flows OUT (hot to cold)}`,
                        hintLatex: [`\\text{Heat always flows from hot to cold}`]
                    },
                    {
                        id: "E-A4", difficulty, stage,
                        promptLatex: `\\text{Two objects reach thermal equilibrium. What is true about their temperatures?}`,
                        expressionLatex: `\\text{Equilibrium condition}`,
                        targetLatex: `\\text{Condition}`,
                        slots: [{ id: "cond", labelLatex: `\\text{Condition}`, placeholder: "equal", expected: "equal" }],
                        correctLatex: `\\text{Temperatures are EQUAL}`,
                        hintLatex: [`\\text{No heat flow when T}_1 = T_2`]
                    },
                    {
                        id: "E-A5", difficulty, stage,
                        promptLatex: `\\text{Ice at } 0°C \\text{ melts. Does temperature change during melting?}`,
                        expressionLatex: `\\text{Phase change behavior}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Answer}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - temperature stays constant}`,
                        hintLatex: [`\\text{Energy goes to breaking bonds, not raising T}`]
                    }
                );
            }
        }

        return quests;
    }, []);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

    const {
        currentQuest,
        difficulty,
        stage,
        lastCheck,
        inputs,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<SP304Quest, Stage>({
        buildPool,
        initialStage: "TEMPERATURE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "TEMPERATURE" as Stage, label: t.stages.temperature },
        { id: "HEAT_TRANSFER" as Stage, label: t.stages.heat_transfer },
        { id: "THERMAL_EQUILIBRIUM" as Stage, label: t.stages.thermal_equilibrium },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="SP3.04"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t.footer_left}
                translations={{
                    back: t.back,
                    check: t.check,
                    next: t.next,
                    correct: t.correct,
                    incorrect: t.incorrect,
                    difficulty: t.difficulty,
                }}
                monitorContent={<TemperatureVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SP3.04"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t.footer_left}
            translations={{
                back: t.back,
                check: t.check,
                next: t.next,
                correct: t.correct,
                incorrect: t.incorrect,
                difficulty: t.difficulty,
            }}
            monitorContent={<TemperatureVisualization quest={currentQuest} stage={stage} />}
        >
            {/* Left side: Quest content */}
            <div className="space-y-6">
                {/* Scenario Description */}
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
                    <h3 className="text-cyan-400 font-bold mb-2">{t.objective_title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
                    </p>
                </div>

                {/* Quest Display */}
                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>
                    
                    <div className="text-cyan-300">
                        <InlineMath math={currentQuest.expressionLatex} />
                    </div>

                    {/* Input Slots */}
                    <div className="space-y-3">
                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3">
                                <InlineMath math={slot.labelLatex} />
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                    disabled={lastCheck?.ok}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
