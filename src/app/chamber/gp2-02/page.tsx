"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ThermodynamicsVisualization from "@/components/chamber/gp2-02/ThermodynamicsVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "FIRST_LAW" | "INTERNAL_ENERGY" | "WORK_HEAT";

interface GP202Quest extends Quest {
    stage: Stage;
    processType?: string;
}

type GP202T = typeof translations.EN.gp2_02;

export default function GP202Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gp2_02 || translations.EN.gp2_02) as GP202T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GP202Quest[] => {
        const quests: GP202Quest[] = [];

        if (stage === "FIRST_LAW") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "FL-B1", difficulty, stage, processType: "basic",
                        promptLatex: `\\text{First Law: } \\Delta U = Q - W. \\text{ If } Q = 100 \\text{ J, } W = 30 \\text{ J, find } \\Delta U.`,
                        expressionLatex: `\\Delta U = 100 - 30`,
                        targetLatex: `\\Delta U`,
                        slots: [{ id: "energy", labelLatex: `\\Delta U \\text{ (J)}`, placeholder: "70", expected: 70 }],
                        correctLatex: `\\Delta U = 70 \\text{ J}`,
                        hintLatex: [`\\text{Energy added minus work done}`]
                    },
                    {
                        id: "FL-B2", difficulty, stage, processType: "basic",
                        promptLatex: `\\text{System absorbs } 200 \\text{ J heat, does } 50 \\text{ J work. Find } \\Delta U.`,
                        expressionLatex: `\\Delta U = Q - W`,
                        targetLatex: `\\Delta U`,
                        slots: [{ id: "energy", labelLatex: `\\Delta U \\text{ (J)}`, placeholder: "150", expected: 150 }],
                        correctLatex: `\\Delta U = 150 \\text{ J}`,
                        hintLatex: [`\\Delta U = 200 - 50`]
                    },
                    {
                        id: "FL-B3", difficulty, stage, processType: "basic",
                        promptLatex: `\\text{System: } \\Delta U = 80 \\text{ J, } W = 20 \\text{ J. Find heat } Q.`,
                        expressionLatex: `Q = \\Delta U + W`,
                        targetLatex: `Q`,
                        slots: [{ id: "heat", labelLatex: `Q \\text{ (J)}`, placeholder: "100", expected: 100 }],
                        correctLatex: `Q = 100 \\text{ J}`,
                        hintLatex: [`Q = 80 + 20`]
                    },
                    {
                        id: "FL-B4", difficulty, stage, processType: "basic",
                        promptLatex: `\\text{System releases } 50 \\text{ J heat (}Q = -50\\text{), does } 30 \\text{ J work. Find } \\Delta U.`,
                        expressionLatex: `\\Delta U = Q - W = -50 - 30`,
                        targetLatex: `\\Delta U`,
                        slots: [{ id: "energy", labelLatex: `\\Delta U \\text{ (J)}`, placeholder: "-80", expected: -80 }],
                        correctLatex: `\\Delta U = -80 \\text{ J (decreases)}`,
                        hintLatex: [`\\text{Both heat loss and work decrease internal energy}`]
                    },
                    {
                        id: "FL-B5", difficulty, stage, processType: "basic",
                        promptLatex: `\\text{Adiabatic process: } Q = 0. \\text{ If } W = 40 \\text{ J, find } \\Delta U.`,
                        expressionLatex: `\\Delta U = Q - W = 0 - 40`,
                        targetLatex: `\\Delta U`,
                        slots: [{ id: "energy", labelLatex: `\\Delta U \\text{ (J)}`, placeholder: "-40", expected: -40 }],
                        correctLatex: `\\Delta U = -40 \\text{ J}`,
                        hintLatex: [`\\text{No heat transfer, all work comes from internal energy}`]
                    }
                );
            }
        }

        if (stage === "INTERNAL_ENERGY") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "IE-C1", difficulty, stage, processType: "monatomic",
                        promptLatex: `\\text{Monatomic ideal gas: } U = \\frac{3}{2}nRT. \\text{ If } n = 2 \\text{ mol, } T = 300 \\text{ K, find } U.`,
                        expressionLatex: `U = \\frac{3}{2} \\times 2 \\times 8.314 \\times 300`,
                        targetLatex: `U`,
                        slots: [{ id: "energy", labelLatex: `U \\text{ (J)}`, placeholder: "7483", expected: 7483 }],
                        correctLatex: `U \\approx 7483 \\text{ J}`,
                        hintLatex: [`U = 1.5 \\times 2 \\times 8.314 \\times 300`]
                    },
                    {
                        id: "IE-C2", difficulty, stage, processType: "temperature",
                        promptLatex: `\\text{Gas: } U_1 = 5000 \\text{ J at } 300 \\text{ K. At } 600 \\text{ K, } U_2 = ?`,
                        expressionLatex: `\\frac{U_2}{U_1} = \\frac{T_2}{T_1} \\Rightarrow U_2 = U_1 \\times \\frac{T_2}{T_1}`,
                        targetLatex: `U_2`,
                        slots: [{ id: "energy", labelLatex: `U_2 \\text{ (J)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `U_2 = 10000 \\text{ J}`,
                        hintLatex: [`\\text{Temperature doubles, internal energy doubles}`]
                    },
                    {
                        id: "IE-C3", difficulty, stage, processType: "change",
                        promptLatex: `\\text{Heat gas from } 300 \\text{ K to } 400 \\text{ K. } \\Delta U = 1000 \\text{ J. Find } \\Delta U \\text{ from } 400 \\text{ K to } 500 \\text{ K.}`,
                        expressionLatex: `\\Delta U \\propto \\Delta T`,
                        targetLatex: `\\Delta U`,
                        slots: [{ id: "energy", labelLatex: `\\Delta U \\text{ (J)}`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `\\Delta U = 1000 \\text{ J (same } \\Delta T\\text{)}`,
                        hintLatex: [`\\text{Both have } \\Delta T = 100 \\text{ K}`]
                    },
                    {
                        id: "IE-C4", difficulty, stage, processType: "isothermal",
                        promptLatex: `\\text{Isothermal process (constant T). What is } \\Delta U?`,
                        expressionLatex: `\\Delta U = 0 \\text{ (since } U \\propto T\\text{)}`,
                        targetLatex: `\\Delta U`,
                        slots: [{ id: "energy", labelLatex: `\\Delta U \\text{ (J)}`, placeholder: "0", expected: 0 }],
                        correctLatex: `\\Delta U = 0 \\text{ J}`,
                        hintLatex: [`\\text{No temperature change means no internal energy change}`]
                    },
                    {
                        id: "IE-C5", difficulty, stage, processType: "diatomic",
                        promptLatex: `\\text{Diatomic gas: } U = \\frac{5}{2}nRT. \\text{ If } n = 1 \\text{ mol, } T = 400 \\text{ K, find } U.`,
                        expressionLatex: `U = \\frac{5}{2} \\times 1 \\times 8.314 \\times 400`,
                        targetLatex: `U`,
                        slots: [{ id: "energy", labelLatex: `U \\text{ (J)}`, placeholder: "8314", expected: 8314 }],
                        correctLatex: `U \\approx 8314 \\text{ J}`,
                        hintLatex: [`U = 2.5 \\times 8.314 \\times 400`]
                    }
                );
            }
        }

        if (stage === "WORK_HEAT") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "WH-A1", difficulty, stage, processType: "isobaric",
                        promptLatex: `\\text{Isobaric expansion: } P = 100000 \\text{ Pa, } \\Delta V = 0.02 \\text{ m}^3. \\text{ Find work } W.`,
                        expressionLatex: `W = P\\Delta V = 100000 \\times 0.02`,
                        targetLatex: `W`,
                        slots: [{ id: "work", labelLatex: `W \\text{ (J)}`, placeholder: "2000", expected: 2000 }],
                        correctLatex: `W = 2000 \\text{ J}`,
                        hintLatex: [`\\text{Work = Pressure × Volume change}`]
                    },
                    {
                        id: "WH-A2", difficulty, stage, processType: "isochoric",
                        promptLatex: `\\text{Isochoric process (constant V). What is work } W?`,
                        expressionLatex: `W = P\\Delta V = P \\times 0`,
                        targetLatex: `W`,
                        slots: [{ id: "work", labelLatex: `W \\text{ (J)}`, placeholder: "0", expected: 0 }],
                        correctLatex: `W = 0 \\text{ J}`,
                        hintLatex: [`\\text{No volume change means no work done}`]
                    },
                    {
                        id: "WH-A3", difficulty, stage, processType: "cycle",
                        promptLatex: `\\text{Complete cycle: system returns to initial state. What is } \\Delta U?`,
                        expressionLatex: `\\Delta U = 0 \\text{ (state function)}`,
                        targetLatex: `\\Delta U`,
                        slots: [{ id: "energy", labelLatex: `\\Delta U \\text{ (J)}`, placeholder: "0", expected: 0 }],
                        correctLatex: `\\Delta U = 0 \\text{ J}`,
                        hintLatex: [`\\text{Internal energy depends only on state, not path}`]
                    },
                    {
                        id: "WH-A4", difficulty, stage, processType: "isothermal",
                        promptLatex: `\\text{Isothermal: } \\Delta U = 0. \\text{ If } Q = 500 \\text{ J, find work } W.`,
                        expressionLatex: `0 = Q - W \\Rightarrow W = Q`,
                        targetLatex: `W`,
                        slots: [{ id: "work", labelLatex: `W \\text{ (J)}`, placeholder: "500", expected: 500 }],
                        correctLatex: `W = 500 \\text{ J}`,
                        hintLatex: [`\\text{All heat goes into work}`]
                    },
                    {
                        id: "WH-A5", difficulty, stage, processType: "adiabatic",
                        promptLatex: `\\text{Adiabatic compression: } W = -300 \\text{ J (work done ON gas). Find } \\Delta U.`,
                        expressionLatex: `\\Delta U = Q - W = 0 - (-300)`,
                        targetLatex: `\\Delta U`,
                        slots: [{ id: "energy", labelLatex: `\\Delta U \\text{ (J)}`, placeholder: "300", expected: 300 }],
                        correctLatex: `\\Delta U = 300 \\text{ J (increases)}`,
                        hintLatex: [`\\text{Work done on gas increases internal energy}`]
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
    } = useQuestManager<GP202Quest, Stage>({
        buildPool,
        initialStage: "FIRST_LAW",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gp2-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "FIRST_LAW" as Stage, label: t.stages.first_law },
        { id: "INTERNAL_ENERGY" as Stage, label: t.stages.internal_energy },
        { id: "WORK_HEAT" as Stage, label: t.stages.work_heat },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="GP2.02"
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
                monitorContent={<ThermodynamicsVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="GP2.02"
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
            monitorContent={<ThermodynamicsVisualization quest={currentQuest} stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
                    <h3 className="text-cyan-400 font-bold mb-2">{t.objective_title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>
                    
                    <div className="text-cyan-300">
                        <InlineMath math={currentQuest.expressionLatex} />
                    </div>

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
