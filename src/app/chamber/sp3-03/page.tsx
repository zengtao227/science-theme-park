"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import HydroCanvas from "@/components/chamber/sp1-03/HydroCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "POTENTIAL" | "KINETIC" | "POWER";

interface SP303Quest extends Quest {
    stage: Stage;
    mass?: number;
    height?: number;
    velocity?: number;
    force?: number;
    distance?: number;
}

type SP303T = typeof translations.EN.sp3_03;

export default function SP303Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp3_03 || translations.EN.sp3_03) as SP303T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP303Quest[] => {
        const quests: SP303Quest[] = [];

        if (stage === "POTENTIAL") {
            quests.push(
                {
                    id: "EP-1", difficulty, stage, mass: 2, height: 10,
                    promptLatex: `E_p = mgh. \\text{ If } m = 2 \\text{ kg, } h = 10 \\text{ m (}g=9.8\\text{), find } E_p.`,
                    expressionLatex: `E_p = 2 \\times 9.8 \\times 10`,
                    targetLatex: `E_p`,
                    slots: [{ id: "energy", labelLatex: `E_p \\text{ (J)}`, placeholder: "196", expected: 196 }],
                    correctLatex: `E_p = 196 \\text{ J}`,
                    hintLatex: [`E_p = mgh`]
                }
            );
        }

        if (stage === "KINETIC") {
            quests.push(
                {
                    id: "EK-1", difficulty, stage, mass: 4, velocity: 5,
                    promptLatex: `E_k = \\frac{1}{2}mv^2. \\text{ If } m = 4 \\text{ kg, } v = 5 \\text{ m/s, find } E_k.`,
                    expressionLatex: `E_k = 0.5 \\times 4 \\times 5^2`,
                    targetLatex: `E_k`,
                    slots: [{ id: "energy", labelLatex: `E_k \\text{ (J)}`, placeholder: "50", expected: 50 }],
                    correctLatex: `E_k = 50 \\text{ J}`,
                    hintLatex: [`E_k = 0.5 \\times 4 \\times 25`]
                }
            );
        }

        if (stage === "POWER") {
            quests.push(
                {
                    id: "W-1", difficulty, stage, force: 100, distance: 5,
                    promptLatex: `W = Fs. \\text{ If } F = 100 \\text{ N, } s = 5 \\text{ m, find } W.`,
                    expressionLatex: `W = 100 \\times 5`,
                    targetLatex: `W`,
                    slots: [{ id: "work", labelLatex: `W \\text{ (J)}`, placeholder: "500", expected: 500 }],
                    correctLatex: `W = 500 \\text{ J}`,
                    hintLatex: [`\\text{Work = Force } \\times \\text{ displacement}`]
                }
            );
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
    } = useQuestManager<SP303Quest, Stage>({
        buildPool,
        initialStage: "POTENTIAL",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-03", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "POTENTIAL" as Stage, label: t.stages.potential },
        { id: "KINETIC" as Stage, label: t.stages.kinetic },
        { id: "POWER" as Stage, label: t.stages.work },
    ], [t.stages]);

    if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SP3.03"
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
            monitorContent={<HydroCanvas stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
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
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
