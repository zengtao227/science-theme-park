"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import SimpleMachinesVisualization from "@/components/chamber/sp3-05/SimpleMachinesVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "LEVERS" | "PULLEYS" | "INCLINED_PLANES";

interface SP305Quest extends Quest {
    stage: Stage;
    machineType?: string;
}

type SP305T = typeof translations.EN.sp3_05;

export default function SP305Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp3_05 || translations.EN.sp3_05) as SP305T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP305Quest[] => {
        const quests: SP305Quest[] = [];

        if (stage === "LEVERS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "L-B1", difficulty, stage, machineType: "lever",
                        promptLatex: `\\text{Lever: Force } 10\\text{ N at } 2\\text{ m from fulcrum. Load at } 0.5\\text{ m. What load can be lifted?}`,
                        expressionLatex: `F_1 \\cdot d_1 = F_2 \\cdot d_2`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2\\text{ (N)}`, placeholder: "40", expected: 40 }],
                        correctLatex: `40\\text{ N}`,
                        hintLatex: [`10 \\times 2 = F_2 \\times 0.5`]
                    },
                    {
                        id: "L-B2", difficulty, stage, machineType: "lever",
                        promptLatex: `\\text{Mechanical advantage (MA) of lever with effort arm } 3\\text{ m, load arm } 1\\text{ m?}`,
                        expressionLatex: `\\text{MA} = \\frac{d_{\\text{effort}}}{d_{\\text{load}}}`,
                        targetLatex: `\\text{MA}`,
                        slots: [{ id: "ma", labelLatex: `\\text{MA}`, placeholder: "3", expected: 3 }],
                        correctLatex: `\\text{MA} = 3`,
                        hintLatex: [`3 \\div 1 = 3`]
                    },
                    {
                        id: "L-B3", difficulty, stage, machineType: "class1",
                        promptLatex: `\\text{Seesaw has fulcrum in middle. What class of lever?}`,
                        expressionLatex: `\\text{Fulcrum between effort and load}`,
                        targetLatex: `\\text{Class}`,
                        slots: [{ id: "class", labelLatex: `\\text{Class}`, placeholder: "1", expected: 1 }],
                        correctLatex: `\\text{Class 1 lever}`,
                        hintLatex: [`\\text{Fulcrum in middle = Class 1}`]
                    },
                    {
                        id: "L-B4", difficulty, stage, machineType: "wheelbarrow",
                        promptLatex: `\\text{Wheelbarrow: load between fulcrum and effort. What class?}`,
                        expressionLatex: `\\text{Load in middle}`,
                        targetLatex: `\\text{Class}`,
                        slots: [{ id: "class", labelLatex: `\\text{Class}`, placeholder: "2", expected: 2 }],
                        correctLatex: `\\text{Class 2 lever}`,
                        hintLatex: [`\\text{Load in middle = Class 2}`]
                    },
                    {
                        id: "L-B5", difficulty, stage, machineType: "efficiency",
                        promptLatex: `\\text{Input work } 100\\text{ J, output work } 80\\text{ J. Efficiency?}`,
                        expressionLatex: `\\eta = \\frac{W_{\\text{out}}}{W_{\\text{in}}} \\times 100\\%`,
                        targetLatex: `\\eta`,
                        slots: [{ id: "eff", labelLatex: `\\eta\\text{ (\\%)}`, placeholder: "80", expected: 80 }],
                        correctLatex: `80\\%`,
                        hintLatex: [`80 \\div 100 \\times 100\\% = 80\\%`]
                    }
                );
            }
        }

        if (stage === "PULLEYS") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "P-C1", difficulty, stage, machineType: "fixed",
                        promptLatex: `\\text{Fixed pulley: lift } 50\\text{ N load. How much force needed?}`,
                        expressionLatex: `\\text{Fixed pulley: MA} = 1`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "50", expected: 50 }],
                        correctLatex: `50\\text{ N (MA = 1)}`,
                        hintLatex: [`\\text{Fixed pulley doesn't reduce force}`]
                    },
                    {
                        id: "P-C2", difficulty, stage, machineType: "movable",
                        promptLatex: `\\text{Movable pulley: lift } 100\\text{ N load. How much force?}`,
                        expressionLatex: `\\text{Movable pulley: MA} = 2`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "50", expected: 50 }],
                        correctLatex: `50\\text{ N (MA = 2)}`,
                        hintLatex: [`100 \\div 2 = 50`]
                    },
                    {
                        id: "P-C3", difficulty, stage, machineType: "compound",
                        promptLatex: `\\text{Pulley system with 4 supporting ropes. What is MA?}`,
                        expressionLatex: `\\text{MA} = \\text{number of supporting ropes}`,
                        targetLatex: `\\text{MA}`,
                        slots: [{ id: "ma", labelLatex: `\\text{MA}`, placeholder: "4", expected: 4 }],
                        correctLatex: `\\text{MA} = 4`,
                        hintLatex: [`\\text{Count supporting ropes}`]
                    },
                    {
                        id: "P-C4", difficulty, stage, machineType: "distance",
                        promptLatex: `\\text{MA = 3, pull rope } 6\\text{ m. How far does load rise?}`,
                        expressionLatex: `d_{\\text{load}} = \\frac{d_{\\text{effort}}}{\\text{MA}}`,
                        targetLatex: `d`,
                        slots: [{ id: "dist", labelLatex: `d\\text{ (m)}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\text{ m}`,
                        hintLatex: [`6 \\div 3 = 2`]
                    },
                    {
                        id: "P-C5", difficulty, stage, machineType: "work",
                        promptLatex: `\\text{Lift } 200\\text{ N load } 2\\text{ m high. How much work?}`,
                        expressionLatex: `W = F \\cdot d`,
                        targetLatex: `W`,
                        slots: [{ id: "work", labelLatex: `W\\text{ (J)}`, placeholder: "400", expected: 400 }],
                        correctLatex: `400\\text{ J}`,
                        hintLatex: [`200 \\times 2 = 400`]
                    }
                );
            }
        }

        if (stage === "INCLINED_PLANES") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "IP-A1", difficulty, stage, machineType: "ramp",
                        promptLatex: `\\text{Ramp: length } 5\\text{ m, height } 1\\text{ m. What is MA?}`,
                        expressionLatex: `\\text{MA} = \\frac{\\text{length}}{\\text{height}}`,
                        targetLatex: `\\text{MA}`,
                        slots: [{ id: "ma", labelLatex: `\\text{MA}`, placeholder: "5", expected: 5 }],
                        correctLatex: `\\text{MA} = 5`,
                        hintLatex: [`5 \\div 1 = 5`]
                    },
                    {
                        id: "IP-A2", difficulty, stage, machineType: "force",
                        promptLatex: `\\text{Push } 500\\text{ N box up ramp with MA = 4. Force needed?}`,
                        expressionLatex: `F_{\\text{effort}} = \\frac{F_{\\text{load}}}{\\text{MA}}`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "125", expected: 125 }],
                        correctLatex: `125\\text{ N}`,
                        hintLatex: [`500 \\div 4 = 125`]
                    },
                    {
                        id: "IP-A3", difficulty, stage, machineType: "wedge",
                        promptLatex: `\\text{Wedge is a type of inclined plane. True or false?}`,
                        expressionLatex: `\\text{Wedge = moving inclined plane}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{T/F}`, placeholder: "true", expected: "true" }],
                        correctLatex: `\\text{True}`,
                        hintLatex: [`\\text{Wedge is inclined plane}`]
                    },
                    {
                        id: "IP-A4", difficulty, stage, machineType: "screw",
                        promptLatex: `\\text{Screw is an inclined plane wrapped around a cylinder. True or false?}`,
                        expressionLatex: `\\text{Screw = wrapped inclined plane}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{T/F}`, placeholder: "true", expected: "true" }],
                        correctLatex: `\\text{True}`,
                        hintLatex: [`\\text{Screw is wrapped ramp}`]
                    },
                    {
                        id: "IP-A5", difficulty, stage, machineType: "ideal",
                        promptLatex: `\\text{Ideal machine: input work = output work. What is efficiency?}`,
                        expressionLatex: `\\eta = \\frac{W_{\\text{out}}}{W_{\\text{in}}} \\times 100\\%`,
                        targetLatex: `\\eta`,
                        slots: [{ id: "eff", labelLatex: `\\eta\\text{ (\\%)}`, placeholder: "100", expected: 100 }],
                        correctLatex: `100\\%`,
                        hintLatex: [`\\text{Ideal = no friction = 100\\%}`]
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
    } = useQuestManager<SP305Quest, Stage>({
        buildPool,
        initialStage: "LEVERS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "LEVERS" as Stage, label: t.stages.levers },
        { id: "PULLEYS" as Stage, label: t.stages.pulleys },
        { id: "INCLINED_PLANES" as Stage, label: t.stages.inclined_planes },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="SP3.05"
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
                monitorContent={<SimpleMachinesVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-cyan-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SP3.05"
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
            monitorContent={<SimpleMachinesVisualization quest={currentQuest} stage={stage} />}
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
