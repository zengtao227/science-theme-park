"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GasLawsVisualization from "@/components/chamber/gp2-01/GasLawsVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "IDEAL_GAS" | "BOYLES_LAW" | "CHARLES_LAW";

interface GP201Quest extends Quest {
    stage: Stage;
    gasType?: string;
    lawType?: string;
}

type GP201T = typeof translations.EN.gp2_01;

export default function GP201Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gp2_01 || translations.EN.gp2_01) as GP201T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GP201Quest[] => {
        const quests: GP201Quest[] = [];

        if (stage === "IDEAL_GAS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "IG-B1", difficulty, stage, gasType: "ideal",
                        promptLatex: `\\text{Ideal gas: } n = 2 \\text{ mol, } T = 300 \\text{ K, } V = 0.05 \\text{ m}^3. \\text{ Find } P. \\text{ (R = 8.314)}`,
                        expressionLatex: `PV = nRT \\Rightarrow P = \\frac{nRT}{V}`,
                        targetLatex: `P`,
                        slots: [{ id: "pressure", labelLatex: `P \\text{ (Pa)}`, placeholder: "99768", expected: 99768 }],
                        correctLatex: `P = 99768 \\text{ Pa}`,
                        hintLatex: [`P = \\frac{2 \\times 8.314 \\times 300}{0.05}`]
                    },
                    {
                        id: "IG-B2", difficulty, stage, gasType: "ideal",
                        promptLatex: `\\text{Gas: } P = 100000 \\text{ Pa, } V = 0.1 \\text{ m}^3, T = 400 \\text{ K. Find } n.`,
                        expressionLatex: `n = \\frac{PV}{RT}`,
                        targetLatex: `n`,
                        slots: [{ id: "moles", labelLatex: `n \\text{ (mol)}`, placeholder: "3.01", expected: 3.01 }],
                        correctLatex: `n \\approx 3.01 \\text{ mol}`,
                        hintLatex: [`n = \\frac{100000 \\times 0.1}{8.314 \\times 400}`]
                    },
                    {
                        id: "IG-B3", difficulty, stage, gasType: "ideal",
                        promptLatex: `\\text{Gas: } n = 1 \\text{ mol, } P = 101325 \\text{ Pa, } T = 273 \\text{ K. Find } V.`,
                        expressionLatex: `V = \\frac{nRT}{P}`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V \\text{ (m}^3\\text{)}`, placeholder: "0.0224", expected: 0.0224 }],
                        correctLatex: `V \\approx 0.0224 \\text{ m}^3 = 22.4 \\text{ L}`,
                        hintLatex: [`\\text{Standard molar volume at STP}`]
                    },
                    {
                        id: "IG-B4", difficulty, stage, gasType: "ideal",
                        promptLatex: `\\text{Gas: } P = 200000 \\text{ Pa, } V = 0.02 \\text{ m}^3, n = 2 \\text{ mol. Find } T.`,
                        expressionLatex: `T = \\frac{PV}{nR}`,
                        targetLatex: `T`,
                        slots: [{ id: "temp", labelLatex: `T \\text{ (K)}`, placeholder: "240", expected: 240 }],
                        correctLatex: `T \\approx 240 \\text{ K}`,
                        hintLatex: [`T = \\frac{200000 \\times 0.02}{2 \\times 8.314}`]
                    },
                    {
                        id: "IG-B5", difficulty, stage, gasType: "ideal",
                        promptLatex: `\\text{Double the temperature at constant volume. Pressure changes by what factor?}`,
                        expressionLatex: `\\frac{P_2}{P_1} = \\frac{T_2}{T_1}`,
                        targetLatex: `\\text{Factor}`,
                        slots: [{ id: "factor", labelLatex: `\\text{Factor}`, placeholder: "2", expected: 2 }],
                        correctLatex: `\\text{Pressure doubles (factor = 2)}`,
                        hintLatex: [`P \\propto T \\text{ at constant } V`]
                    }
                );
            }
        }

        if (stage === "BOYLES_LAW") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "B-C1", difficulty, stage, lawType: "boyle",
                        promptLatex: `\\text{Boyle's Law: } P_1V_1 = P_2V_2. \\text{ If } P_1 = 100 \\text{ kPa, } V_1 = 2 \\text{ L, } V_2 = 1 \\text{ L, find } P_2.`,
                        expressionLatex: `P_2 = \\frac{P_1V_1}{V_2}`,
                        targetLatex: `P_2`,
                        slots: [{ id: "pressure", labelLatex: `P_2 \\text{ (kPa)}`, placeholder: "200", expected: 200 }],
                        correctLatex: `P_2 = 200 \\text{ kPa}`,
                        hintLatex: [`\\text{Volume halves, pressure doubles}`]
                    },
                    {
                        id: "B-C2", difficulty, stage, lawType: "boyle",
                        promptLatex: `\\text{Gas: } P_1 = 150 \\text{ kPa, } V_1 = 3 \\text{ L, } P_2 = 50 \\text{ kPa. Find } V_2.`,
                        expressionLatex: `V_2 = \\frac{P_1V_1}{P_2}`,
                        targetLatex: `V_2`,
                        slots: [{ id: "volume", labelLatex: `V_2 \\text{ (L)}`, placeholder: "9", expected: 9 }],
                        correctLatex: `V_2 = 9 \\text{ L}`,
                        hintLatex: [`V_2 = \\frac{150 \\times 3}{50}`]
                    },
                    {
                        id: "B-C3", difficulty, stage, lawType: "boyle",
                        promptLatex: `\\text{Compress gas from } 10 \\text{ L to } 2 \\text{ L at constant T. Pressure multiplies by?}`,
                        expressionLatex: `\\frac{P_2}{P_1} = \\frac{V_1}{V_2}`,
                        targetLatex: `\\text{Factor}`,
                        slots: [{ id: "factor", labelLatex: `\\text{Factor}`, placeholder: "5", expected: 5 }],
                        correctLatex: `\\text{Pressure multiplies by 5}`,
                        hintLatex: [`\\frac{10}{2} = 5`]
                    },
                    {
                        id: "B-C4", difficulty, stage, lawType: "boyle",
                        promptLatex: `\\text{Scuba tank: } P = 200 \\text{ bar, } V = 10 \\text{ L. At } 1 \\text{ bar, volume = ?}`,
                        expressionLatex: `V_2 = \\frac{P_1V_1}{P_2}`,
                        targetLatex: `V_2`,
                        slots: [{ id: "volume", labelLatex: `V_2 \\text{ (L)}`, placeholder: "2000", expected: 2000 }],
                        correctLatex: `V_2 = 2000 \\text{ L}`,
                        hintLatex: [`V_2 = \\frac{200 \\times 10}{1}`]
                    },
                    {
                        id: "B-C5", difficulty, stage, lawType: "boyle",
                        promptLatex: `\\text{Boyle's Law requires which quantity to remain constant?}`,
                        expressionLatex: `PV = \\text{constant (at constant T and n)}`,
                        targetLatex: `\\text{Quantity}`,
                        slots: [{ id: "const", labelLatex: `\\text{Constant}`, placeholder: "temperature", expected: "temperature" }],
                        correctLatex: `\\text{Temperature (T) must be constant}`,
                        hintLatex: [`\\text{Isothermal process}`]
                    }
                );
            }
        }

        if (stage === "CHARLES_LAW") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "C-A1", difficulty, stage, lawType: "charles",
                        promptLatex: `\\text{Charles's Law: } \\frac{V_1}{T_1} = \\frac{V_2}{T_2}. \\text{ If } V_1 = 2 \\text{ L, } T_1 = 300 \\text{ K, } T_2 = 600 \\text{ K, find } V_2.`,
                        expressionLatex: `V_2 = \\frac{V_1T_2}{T_1}`,
                        targetLatex: `V_2`,
                        slots: [{ id: "volume", labelLatex: `V_2 \\text{ (L)}`, placeholder: "4", expected: 4 }],
                        correctLatex: `V_2 = 4 \\text{ L}`,
                        hintLatex: [`\\text{Temperature doubles, volume doubles}`]
                    },
                    {
                        id: "C-A2", difficulty, stage, lawType: "charles",
                        promptLatex: `\\text{Balloon: } V_1 = 5 \\text{ L at } 20°C. \\text{ At } 80°C, V_2 = ? \\text{ (Use Kelvin!)}`,
                        expressionLatex: `V_2 = \\frac{V_1T_2}{T_1}, \\quad T_1 = 293 \\text{ K, } T_2 = 353 \\text{ K}`,
                        targetLatex: `V_2`,
                        slots: [{ id: "volume", labelLatex: `V_2 \\text{ (L)}`, placeholder: "6.02", expected: 6.02 }],
                        correctLatex: `V_2 \\approx 6.02 \\text{ L}`,
                        hintLatex: [`\\text{Convert to Kelvin first!}`]
                    },
                    {
                        id: "C-A3", difficulty, stage, lawType: "charles",
                        promptLatex: `\\text{Gas: } V_1 = 10 \\text{ L, } T_1 = 400 \\text{ K, } V_2 = 5 \\text{ L. Find } T_2.`,
                        expressionLatex: `T_2 = \\frac{V_2T_1}{V_1}`,
                        targetLatex: `T_2`,
                        slots: [{ id: "temp", labelLatex: `T_2 \\text{ (K)}`, placeholder: "200", expected: 200 }],
                        correctLatex: `T_2 = 200 \\text{ K}`,
                        hintLatex: [`T_2 = \\frac{5 \\times 400}{10}`]
                    },
                    {
                        id: "C-A4", difficulty, stage, lawType: "charles",
                        promptLatex: `\\text{Charles's Law requires which quantity to remain constant?}`,
                        expressionLatex: `\\frac{V}{T} = \\text{constant (at constant P and n)}`,
                        targetLatex: `\\text{Quantity}`,
                        slots: [{ id: "const", labelLatex: `\\text{Constant}`, placeholder: "pressure", expected: "pressure" }],
                        correctLatex: `\\text{Pressure (P) must be constant}`,
                        hintLatex: [`\\text{Isobaric process}`]
                    },
                    {
                        id: "C-A5", difficulty, stage, lawType: "combined",
                        promptLatex: `\\text{Combined Gas Law: } \\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}. \\text{ Which law is this at constant P?}`,
                        expressionLatex: `\\text{At constant } P: \\frac{V_1}{T_1} = \\frac{V_2}{T_2}`,
                        targetLatex: `\\text{Law}`,
                        slots: [{ id: "law", labelLatex: `\\text{Law}`, placeholder: "charles", expected: "charles" }],
                        correctLatex: `\\text{Charles's Law}`,
                        hintLatex: [`\\text{Cancel out P from both sides}`]
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
    } = useQuestManager<GP201Quest, Stage>({
        buildPool,
        initialStage: "IDEAL_GAS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gp2-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "IDEAL_GAS" as Stage, label: t.stages.ideal_gas },
        { id: "BOYLES_LAW" as Stage, label: t.stages.boyles_law },
        { id: "CHARLES_LAW" as Stage, label: t.stages.charles_law },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="GP2.01"
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
                monitorContent={<GasLawsVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="GP2.01"
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
            monitorContent={<GasLawsVisualization quest={currentQuest} stage={stage} />}
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
