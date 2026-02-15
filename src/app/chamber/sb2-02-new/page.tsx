"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";

type Stage = "DIGESTIVE" | "CIRCULATORY" | "RESPIRATORY";
type SB202T = typeof translations.EN.sb2_02_new;

interface SB202Quest extends Quest {
    stage: Stage;
}

function buildStagePool(t: SB202T, difficulty: Difficulty, stage: Stage): SB202Quest[] {
    if (stage === "DIGESTIVE") {
        const all: SB202Quest[] = [
            {
                id: "D1", difficulty, stage,
                promptLatex: t.prompts.digestive_path,
                expressionLatex: `\\text{Mouth} \\to \\text{Esophagus} \\to \\text{Stomach} \\to \\text{Intestines}`,
                targetLatex: `\\text{Pathway}`,
                slots: [
                    { id: "s1", labelLatex: `\\text{After Mouth}`, placeholder: "organ", expected: "esophagus" },
                    { id: "s2", labelLatex: `\\text{After Stomach}`, placeholder: "organ", expected: "intestines" }
                ],
                correctLatex: `\\text{Esophagus, Intestines}`,
                hintLatex: [t.hints.digestive, `\\text{Food path}`, `\\text{Esophagus → Intestines}`],
            },
        ];
        return all;
    }
    
    if (stage === "CIRCULATORY") {
        const all: SB202Quest[] = [
            {
                id: "C1", difficulty, stage,
                promptLatex: t.prompts.circulatory_function,
                expressionLatex: `\\text{Heart function: Pump blood}`,
                targetLatex: `\\text{Function}`,
                slots: [{ id: "f", labelLatex: `\\text{Function}`, placeholder: "pump/transport", expected: "pump" }],
                correctLatex: `\\text{Pump blood}`,
                hintLatex: [t.hints.circulatory, `\\text{Heart pumps}`, `\\text{Pump}`],
            },
        ];
        return all;
    }
    
    // RESPIRATORY stage
    const all: SB202Quest[] = [
        {
            id: "R1", difficulty, stage,
            promptLatex: t.prompts.respiratory_exchange,
            expressionLatex: `\\text{Gas exchange location: Alveoli}`,
            targetLatex: `\\text{Location}`,
            slots: [{ id: "l", labelLatex: `\\text{Location}`, placeholder: "alveoli", expected: "alveoli" }],
            correctLatex: `\\text{Alveoli}`,
            hintLatex: [t.hints.respiratory, `\\text{Tiny air sacs}`, `\\text{Alveoli}`],
        },
    ];
    return all;
}

export default function SB202Page() {
    const { currentLanguage } = useAppStore();
    const t = translations[currentLanguage].sb2_02_new;

    const {
        currentQuest,
        userAnswers,
        feedback,
        isCorrect,
        currentStage,
        handleInputChange,
        handleCheck,
        handleNext,
        resetModule,
    } = useQuestManager<SB202Quest, Stage>({
        stages: ["DIGESTIVE", "CIRCULATORY", "RESPIRATORY"],
        buildStagePool: (difficulty, stage) => buildStagePool(t, difficulty, stage),
        passingScore: 0.7,
    });

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                backHref="/"
                backLabel={t.back}
                footerLeft={t.footer_left}
            >
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <p className="text-green-400 text-xl mb-4">Module Complete!</p>
                        <button
                            onClick={resetModule}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        >
                            Restart
                        </button>
                    </div>
                </div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            backHref="/"
            backLabel={t.back}
            footerLeft={t.footer_left}
        >
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Stage Indicator */}
                <div className="bg-gray-800 p-4 rounded">
                    <h2 className="text-xl font-bold text-cyan-400">
                        {t.stages[currentStage.toLowerCase() as keyof typeof t.stages]}
                    </h2>
                </div>

                {/* Quest Display */}
                <div className="bg-gray-900 p-6 rounded space-y-4">
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
                                    value={userAnswers[slot.id] || ""}
                                    onChange={(e) => handleInputChange(slot.id, e.target.value)}
                                    placeholder={slot.placeholder}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded"
                                    disabled={isCorrect}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Feedback */}
                    {feedback && (
                        <div className={clsx(
                            "p-3 rounded",
                            isCorrect ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                        )}>
                            {feedback}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        {!isCorrect && (
                            <button
                                onClick={handleCheck}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                            >
                                {t.check}
                            </button>
                        )}
                        {isCorrect && (
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded"
                            >
                                {t.next}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
