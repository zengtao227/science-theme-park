"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import HeatEngineVisualization from "@/components/chamber/gp2-03/HeatEngineVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "EFFICIENCY" | "CARNOT_CYCLE" | "HEAT_FLOW";

interface GP203Quest extends Quest {
    stage: Stage;
    engineType?: string;
}

type GP203T = typeof translations.EN.gp2_03;

export default function GP203Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gp2_03 || translations.EN.gp2_03) as GP203T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GP203Quest[] => {
        const quests: GP203Quest[] = [];

        if (stage === "EFFICIENCY") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "E-B1", difficulty, stage, engineType: "basic",
                        promptLatex: `\\text{Engine: } Q_h = 1000 \\text{ J, } W = 300 \\text{ J. Find efficiency } \\eta.`,
                        expressionLatex: `\\eta = \\frac{W}{Q_h} = \\frac{300}{1000}`,
                        targetLatex: `\\eta`,
                        slots: [{ id: "eff", labelLatex: `\\eta`, placeholder: "0.3", expected: 0.3 }],
                        correctLatex: `\\eta = 0.3 = 30\\%`,
                        hintLatex: [`\\text{Efficiency = Work out / Heat in}`]
                    },
                    {
                        id: "E-B2", difficulty, stage, engineType: "basic",
                        promptLatex: `\\text{Engine absorbs } 2000 \\text{ J, does } 600 \\text{ J work. Find } \\eta.`,
                        expressionLatex: `\\eta = \\frac{W}{Q_h}`,
                        targetLatex: `\\eta`,
                        slots: [{ id: "eff", labelLatex: `\\eta`, placeholder: "0.3", expected: 0.3 }],
                        correctLatex: `\\eta = 0.3 = 30\\%`,
                        hintLatex: [`\\eta = \\frac{600}{2000}`]
                    },
                    {
                        id: "E-B3", difficulty, stage, engineType: "basic",
                        promptLatex: `\\text{Engine: } \\eta = 0.4, Q_h = 500 \\text{ J. Find work } W.`,
                        expressionLatex: `W = \\eta Q_h = 0.4 \\times 500`,
                        targetLatex: `W`,
                        slots: [{ id: "work", labelLatex: `W \\text{ (J)}`, placeholder: "200", expected: 200 }],
                        correctLatex: `W = 200 \\text{ J}`,
                        hintLatex: [`W = 0.4 \\times 500`]
                    },
                    {
                        id: "E-B4", difficulty, stage, engineType: "waste",
                        promptLatex: `\\text{Engine: } Q_h = 1000 \\text{ J, } W = 400 \\text{ J. Find waste heat } Q_c.`,
                        expressionLatex: `Q_c = Q_h - W = 1000 - 400`,
                        targetLatex: `Q_c`,
                        slots: [{ id: "heat", labelLatex: `Q_c \\text{ (J)}`, placeholder: "600", expected: 600 }],
                        correctLatex: `Q_c = 600 \\text{ J}`,
                        hintLatex: [`\\text{Energy conservation: } Q_h = W + Q_c`]
                    },
                    {
                        id: "E-B5", difficulty, stage, engineType: "percent",
                        promptLatex: `\\text{Engine converts 25\\% of heat to work. What is } \\eta?`,
                        expressionLatex: `\\eta = 0.25`,
                        targetLatex: `\\eta`,
                        slots: [{ id: "eff", labelLatex: `\\eta`, placeholder: "0.25", expected: 0.25 }],
                        correctLatex: `\\eta = 0.25`,
                        hintLatex: [`25\\% = 0.25`]
                    }
                );
            }
        }

        if (stage === "CARNOT_CYCLE") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "C-C1", difficulty, stage, engineType: "carnot",
                        promptLatex: `\\text{Carnot engine: } T_h = 600 \\text{ K, } T_c = 300 \\text{ K. Find } \\eta_{\\text{Carnot}}.`,
                        expressionLatex: `\\eta_C = 1 - \\frac{T_c}{T_h} = 1 - \\frac{300}{600}`,
                        targetLatex: `\\eta_C`,
                        slots: [{ id: "eff", labelLatex: `\\eta_C`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `\\eta_C = 0.5 = 50\\%`,
                        hintLatex: [`\\eta_C = 1 - \\frac{300}{600} = 0.5`]
                    },
                    {
                        id: "C-C2", difficulty, stage, engineType: "carnot",
                        promptLatex: `\\text{Carnot: } T_h = 800 \\text{ K, } T_c = 400 \\text{ K. Find } \\eta_C.`,
                        expressionLatex: `\\eta_C = 1 - \\frac{T_c}{T_h}`,
                        targetLatex: `\\eta_C`,
                        slots: [{ id: "eff", labelLatex: `\\eta_C`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `\\eta_C = 0.5 = 50\\%`,
                        hintLatex: [`1 - \\frac{400}{800} = 0.5`]
                    },
                    {
                        id: "C-C3", difficulty, stage, engineType: "carnot",
                        promptLatex: `\\text{Carnot: } T_h = 500 \\text{ K, } \\eta_C = 0.4. \\text{ Find } T_c.`,
                        expressionLatex: `0.4 = 1 - \\frac{T_c}{500} \\Rightarrow T_c = 500(1 - 0.4)`,
                        targetLatex: `T_c`,
                        slots: [{ id: "temp", labelLatex: `T_c \\text{ (K)}`, placeholder: "300", expected: 300 }],
                        correctLatex: `T_c = 300 \\text{ K}`,
                        hintLatex: [`T_c = 500 \\times 0.6`]
                    },
                    {
                        id: "C-C4", difficulty, stage, engineType: "maximum",
                        promptLatex: `\\text{Real engine: } \\eta = 0.3. \\text{ Carnot: } \\eta_C = 0.6. \\text{ Is this possible?}`,
                        expressionLatex: `\\eta < \\eta_C \\text{ (always true)}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Possible?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{YES - real engines always less efficient}`,
                        hintLatex: [`\\text{Carnot is maximum possible efficiency}`]
                    },
                    {
                        id: "C-C5", difficulty, stage, engineType: "impossible",
                        promptLatex: `\\text{Engine claims } \\eta = 0.8. \\text{ Carnot limit: } \\eta_C = 0.7. \\text{ Possible?}`,
                        expressionLatex: `\\eta > \\eta_C \\text{ (impossible!)}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Possible?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - violates Second Law}`,
                        hintLatex: [`\\text{Cannot exceed Carnot efficiency}`]
                    }
                );
            }
        }

        if (stage === "HEAT_FLOW") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "HF-A1", difficulty, stage, engineType: "flow",
                        promptLatex: `\\text{Engine: } Q_h = 1000 \\text{ J, } \\eta = 0.3. \\text{ Find } Q_c.`,
                        expressionLatex: `W = \\eta Q_h = 300 \\text{ J}, \\quad Q_c = Q_h - W`,
                        targetLatex: `Q_c`,
                        slots: [{ id: "heat", labelLatex: `Q_c \\text{ (J)}`, placeholder: "700", expected: 700 }],
                        correctLatex: `Q_c = 700 \\text{ J}`,
                        hintLatex: [`Q_c = 1000 - 300`]
                    },
                    {
                        id: "HF-A2", difficulty, stage, engineType: "carnot_flow",
                        promptLatex: `\\text{Carnot: } T_h = 600 \\text{ K, } T_c = 300 \\text{ K, } Q_h = 1200 \\text{ J. Find } Q_c.`,
                        expressionLatex: `\\frac{Q_c}{Q_h} = \\frac{T_c}{T_h} \\Rightarrow Q_c = Q_h \\frac{T_c}{T_h}`,
                        targetLatex: `Q_c`,
                        slots: [{ id: "heat", labelLatex: `Q_c \\text{ (J)}`, placeholder: "600", expected: 600 }],
                        correctLatex: `Q_c = 600 \\text{ J}`,
                        hintLatex: [`Q_c = 1200 \\times \\frac{300}{600}`]
                    },
                    {
                        id: "HF-A3", difficulty, stage, engineType: "work",
                        promptLatex: `\\text{Carnot: } Q_h = 1000 \\text{ J, } Q_c = 400 \\text{ J. Find work } W.`,
                        expressionLatex: `W = Q_h - Q_c`,
                        targetLatex: `W`,
                        slots: [{ id: "work", labelLatex: `W \\text{ (J)}`, placeholder: "600", expected: 600 }],
                        correctLatex: `W = 600 \\text{ J}`,
                        hintLatex: [`W = 1000 - 400`]
                    },
                    {
                        id: "HF-A4", difficulty, stage, engineType: "ratio",
                        promptLatex: `\\text{Carnot: } T_h = 400 \\text{ K, } T_c = 300 \\text{ K. Find } \\frac{Q_c}{Q_h}.`,
                        expressionLatex: `\\frac{Q_c}{Q_h} = \\frac{T_c}{T_h}`,
                        targetLatex: `\\text{Ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\frac{Q_c}{Q_h}`, placeholder: "0.75", expected: 0.75 }],
                        correctLatex: `\\frac{Q_c}{Q_h} = 0.75`,
                        hintLatex: [`\\frac{300}{400} = 0.75`]
                    },
                    {
                        id: "HF-A5", difficulty, stage, engineType: "reverse",
                        promptLatex: `\\text{Refrigerator (reverse engine): } W = 100 \\text{ J, } Q_c = 400 \\text{ J. Find } Q_h.`,
                        expressionLatex: `Q_h = Q_c + W`,
                        targetLatex: `Q_h`,
                        slots: [{ id: "heat", labelLatex: `Q_h \\text{ (J)}`, placeholder: "500", expected: 500 }],
                        correctLatex: `Q_h = 500 \\text{ J}`,
                        hintLatex: [`\\text{Energy conservation: } Q_h = Q_c + W`]
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
    } = useQuestManager<GP203Quest, Stage>({
        buildPool,
        initialStage: "EFFICIENCY",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gp2-03", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "EFFICIENCY" as Stage, label: t.stages.efficiency },
        { id: "CARNOT_CYCLE" as Stage, label: t.stages.carnot_cycle },
        { id: "HEAT_FLOW" as Stage, label: t.stages.heat_flow },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="GP2.03"
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
                monitorContent={<HeatEngineVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="GP2.03"
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
            monitorContent={<HeatEngineVisualization quest={currentQuest} stage={stage} />}
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
