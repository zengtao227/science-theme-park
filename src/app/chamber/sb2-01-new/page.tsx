"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";

type Stage = "TISSUES" | "ORGANS" | "SYSTEMS";
type SB201T = typeof translations.EN.sb2_01_new;

interface SB201Quest extends Quest {
    stage: Stage;
}

function buildStagePool(t: SB201T, difficulty: Difficulty, stage: Stage): SB201Quest[] {
    if (stage === "TISSUES") {
        const all: SB201Quest[] = [
            {
                id: "T1", difficulty, stage,
                promptLatex: t.prompts.tissue_type,
                expressionLatex: `\\text{Epithelial tissue covers body surfaces}`,
                targetLatex: `\\text{Function}`,
                slots: [{ id: "f", labelLatex: `\\text{Function}`, placeholder: "protection/absorption", expected: "protection" }],
                correctLatex: `\\text{Protection and absorption}`,
                hintLatex: [t.hints.epithelial, `\\text{Covers surfaces}`, `\\text{Protection}`],
            },
        ];
        return all;
    }
    
    if (stage === "ORGANS") {
        const all: SB201Quest[] = [
            {
                id: "O1", difficulty, stage,
                promptLatex: t.prompts.organ_composition,
                expressionLatex: `\\text{Heart = Muscle + Epithelial + Connective}`,
                targetLatex: `\\text{Tissue types}`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "number", expected: 3 }],
                correctLatex: `n=3`,
                hintLatex: [t.hints.organ_tissues, `\\text{Count tissue types}`, `3`],
            },
        ];
        return all;
    }
    
    // SYSTEMS stage
    const all: SB201Quest[] = [
        {
            id: "S1", difficulty, stage,
            promptLatex: t.prompts.system_hierarchy,
            expressionLatex: `\\text{Cell} \\to \\text{Tissue} \\to \\text{Organ} \\to ?`,
            targetLatex: `\\text{Next level}`,
            slots: [{ id: "l", labelLatex: `\\text{Level}`, placeholder: "system", expected: "system" }],
            correctLatex: `\\text{Organ System}`,
            hintLatex: [t.hints.hierarchy, `\\text{Cells → Tissues → Organs → ?}`, `\\text{System}`],
        },
    ];
    return all;
}

export default function SB201Page() {
    const { currentLanguage } = useAppStore();
    const t = translations[currentLanguage].sb2_01_new;

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
    } = useQuestManager<SB201Quest, Stage>({
        stages: ["TISSUES", "ORGANS", "SYSTEMS"],
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
