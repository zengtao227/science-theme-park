"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PressureBuoyancyCanvas from "@/components/chamber/sp1-07/PressureBuoyancyCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "PRESSURE" | "BUOYANCY" | "HYDRAULICS";

interface SP304Quest extends Quest {
    stage: Stage;
    depth?: number;
    area?: number;
    force?: number;
    volume?: number;
}

type SP304T = typeof translations.EN.sp3_04;

export default function SP304Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp3_04 || translations.EN.sp3_04) as SP304T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP304Quest[] => {
        const quests: SP304Quest[] = [];

        if (stage === "PRESSURE") {
            quests.push(
                {
                    id: "P-1", difficulty, stage, depth: 10,
                    promptLatex: `P = \\rho gh. \\text{ If } h = 10 \\text{ m, } \\rho = 1000 \\text{ kg/m}^3, \\text{ find gauge pressure } P.`,
                    expressionLatex: `P = 1000 \\times 9.8 \\times 10`,
                    targetLatex: `P`,
                    slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "98000", expected: 98000 }],
                    correctLatex: `P = 98000 \\text{ Pa}`,
                    hintLatex: [`P = \\rho gh`]
                }
            );
        }

        if (stage === "BUOYANCY") {
            quests.push(
                {
                    id: "B-1", difficulty, stage, volume: 0.1,
                    promptLatex: `F_b = \\rho Vg. \\text{ If } V = 0.1 \\text{ m}^3, \\rho = 1000, \\text{ find buoyant force } F_b.`,
                    expressionLatex: `F_b = 1000 \\times 0.1 \\times 9.8`,
                    targetLatex: `F_b`,
                    slots: [{ id: "force", labelLatex: `F_b \\text{ (N)}`, placeholder: "980", expected: 980 }],
                    correctLatex: `F_b = 980 \\text{ N}`,
                    hintLatex: [`\\text{Archimedes' Principle}`]
                }
            );
        }

        if (stage === "HYDRAULICS") {
            quests.push(
                {
                    id: "H-1", difficulty, stage, area: 0.01, force: 100,
                    promptLatex: `P = F/A. \\text{ If } F = 100 \\text{ N on } A = 0.01 \\text{ m}^2, \\text{ find pressure } P.`,
                    expressionLatex: `P = 100 / 0.01`,
                    targetLatex: `P`,
                    slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                    correctLatex: `P = 10000 \\text{ Pa}`,
                    hintLatex: [`\\text{Pressure is force per unit area}`]
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
    } = useQuestManager<SP304Quest, Stage>({
        buildPool,
        initialStage: "PRESSURE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "PRESSURE" as Stage, label: t.stages.pressure },
        { id: "BUOYANCY" as Stage, label: t.stages.buoyancy },
        { id: "HYDRAULICS" as Stage, label: t.stages.hydraulics },
    ], [t.stages]);

    if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

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
            monitorContent={
                <PressureBuoyancyCanvas
                    stage={stage.toLowerCase()}
                    depth={currentQuest.depth || 0}
                    objectDensity={1000}
                    pistonForce={currentQuest.force || 0}
                    translations={t}
                />
            }
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
