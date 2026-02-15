"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MagneticFieldVisualization from "@/components/chamber/gp2-05/MagneticFieldVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "MAGNETIC_FORCE" | "MAGNETIC_FIELD" | "APPLICATIONS";

interface GP205Quest extends Quest {
    stage: Stage;
    magneticType?: string;
}

type GP205T = typeof translations.EN.gp2_05;

export default function GP205Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gp2_05 || translations.EN.gp2_05) as GP205T;

    const buildPool = useCallback((difficulty: Difficulty, stage: Stage): GP205Quest[] => {
        const quests: GP205Quest[] = [];

        if (stage === "MAGNETIC_FORCE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "MF-B1", difficulty, stage, magneticType: "lorentz_basic",
                        promptLatex: `\\text{Proton (q = 1.6 × 10}^{-19}\\text{ C) moves at 1000 m/s perpendicular to 0.5 T field. Force?}`,
                        expressionLatex: `F = qvB`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "8e-17", expected: 8e-17 }],
                        correctLatex: `8 \\times 10^{-17}\\text{ N}`,
                        hintLatex: [`1.6 \\times 10^{-19} \\times 1000 \\times 0.5 = 8 \\times 10^{-17}`]
                    },
                    {
                        id: "MF-B2", difficulty, stage, magneticType: "direction",
                        promptLatex: `\\text{Positive charge moves right in magnetic field pointing up. Force direction?}`,
                        expressionLatex: `\\text{Right-hand rule}`,
                        targetLatex: `\\text{Direction}`,
                        slots: [{ id: "dir", labelLatex: `\\text{Direction}`, placeholder: "out", expected: "out" }],
                        correctLatex: `\\text{Out of page}`,
                        hintLatex: [`\\text{Fingers: velocity, curl: field, thumb: force}`]
                    }
                );
            }
        }

        return quests;
    }, []);

    const {
        stage,
        difficulty,
        currentQuest,
        inputs,
        setInputs,
        lastCheck,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<GP205Quest, Stage>({
        buildPool,
        initialStage: "MAGNETIC_FORCE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gp2-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "MAGNETIC_FORCE" as Stage, label: t.stages.magnetic_force },
        { id: "MAGNETIC_FIELD" as Stage, label: t.stages.magnetic_field },
        { id: "APPLICATIONS" as Stage, label: t.stages.applications },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="GP2.05"
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
                monitorContent={<MagneticFieldVisualization stage={stage} />}
            >
                <div className="text-center text-cyan-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="GP2.05"
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
            monitorContent={<MagneticFieldVisualization stage={stage} />}
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
