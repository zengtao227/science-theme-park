"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AlgebraCanvas, { type AlgebraVisualMode } from "@/components/chamber/sm1-03/AlgebraCanvas";

type Stage = "VARIABLES" | "TERMS" | "SUBSTITUTION";
type S103T = typeof translations.EN.sm1_03;

interface S103Quest extends Quest {
    visualMode: AlgebraVisualMode;
    visualData: {
        variables?: { label: string; value: number | string; color: string }[];
        expression?: string;
        items?: { type: string; count: number; color: string }[];
        inputValue?: number;
        formula?: string;
    };
}

function buildStagePool(t: S103T, difficulty: Difficulty, stage: Stage): S103Quest[] {
    const isBasic = difficulty === "BASIC";
    const isCore = difficulty === "CORE";
    const isAdv = difficulty === "ADVANCED";
    const isElite = difficulty === "ELITE";

    const quests: S103Quest[] = [];

    // --- STAGE 1: VARIABLES ---
    if (stage === "VARIABLES") {
        if (isBasic) {
            quests.push({
                id: "V1-B", difficulty, stage,
                promptLatex: "\\text{If } x=5 \\text{, what is the value inside the container?}",
                expressionLatex: "x",
                targetLatex: "5",
                visualMode: 'CONTAINERS',
                visualData: {
                    variables: [{ label: 'x', value: 5, color: '#a855f7' }]
                },
                slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 5 }],
                correctLatex: "x=5",
                hintLatex: ["\\text{The variable x holds the value 5.}"]
            });
            quests.push({
                id: "V2-B", difficulty, stage,
                promptLatex: "\\text{If } y=10 \\text{, what is } y?",
                expressionLatex: "y",
                targetLatex: "10",
                visualMode: 'CONTAINERS',
                visualData: {
                    variables: [{ label: 'y', value: 10, color: '#3b82f6' }]
                },
                slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 10 }],
                correctLatex: "y=10",
                hintLatex: ["\\text{The variable y holds the value 10.}"]
            });
        } else if (isCore) {
            quests.push({
                id: "V1-C", difficulty, stage,
                promptLatex: "\\text{If } x=3 \\text{, calculate } x + x",
                expressionLatex: "x+x",
                targetLatex: "6",
                visualMode: 'CONTAINERS',
                visualData: {
                    variables: [
                        { label: 'x', value: 3, color: '#a855f7' },
                        { label: 'x', value: 3, color: '#a855f7' }
                    ]
                },
                slots: [{ id: "ans", labelLatex: "Sum", placeholder: "?", expected: 6 }],
                correctLatex: "3+3=6",
                hintLatex: ["\\text{Add the values inside the two x containers.}"]
            });
        } else if (isAdv) {
            quests.push({
                id: "V1-A", difficulty, stage,
                promptLatex: "\\text{If } a=4, b=2 \\text{, calculate } a + b",
                expressionLatex: "a+b",
                targetLatex: "6",
                visualMode: 'CONTAINERS',
                visualData: {
                    variables: [
                        { label: 'a', value: 4, color: '#ef4444' },
                        { label: 'b', value: 2, color: '#22c55e' }
                    ]
                },
                slots: [{ id: "ans", labelLatex: "Sum", placeholder: "?", expected: 6 }],
                correctLatex: "4+2=6",
                hintLatex: ["\\text{Add the value of a and b.}"]
            });
        } else {
            // Elite
            quests.push({
                id: "V1-E", difficulty, stage,
                promptLatex: "\\text{If } x=3 \\text{, calculate } 2x + 1",
                expressionLatex: "2x+1",
                targetLatex: "7",
                visualMode: 'CONTAINERS',
                visualData: {
                    variables: [
                        { label: 'x', value: 3, color: '#a855f7' },
                        { label: 'x', value: 3, color: '#a855f7' },
                        { label: '1', value: 1, color: '#64748b' }
                    ]
                },
                slots: [{ id: "ans", labelLatex: "Result", placeholder: "?", expected: 7 }],
                correctLatex: "2(3)+1=7",
                hintLatex: ["\\text{Two containers of x plus 1.}"]
            });
        }
    }

    // --- STAGE 2: TERMS ---
    if (stage === "TERMS") {
        if (isBasic) {
            quests.push({
                id: "T1-B", difficulty, stage,
                promptLatex: "\\text{Simplify: } 3a + 2a",
                expressionLatex: "3a + 2a",
                targetLatex: "5a",
                visualMode: 'SORTING',
                visualData: {
                    items: [
                        { type: 'a', count: 3, color: '#ef4444' },
                        { type: 'a', count: 2, color: '#ef4444' }
                    ]
                },
                slots: [
                    { id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 5 },
                    { id: "var", labelLatex: "Variable", placeholder: "x", expected: "a" }
                ],
                correctLatex: "5a",
                hintLatex: ["\\text{Add the coefficients: 3+2=5.}"]
            });
        } else if (isCore) {
            quests.push({
                id: "T1-C", difficulty, stage,
                promptLatex: "\\text{Simplify: } 5x - 2x",
                expressionLatex: "5x - 2x",
                targetLatex: "3x",
                visualMode: 'SORTING',
                visualData: {
                    items: [
                        { type: 'x', count: 5, color: '#3b82f6' },
                        { type: 'x (remove)', count: -2, color: '#9ca3af' }
                    ]
                },
                slots: [
                    { id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: 3 },
                    { id: "var", labelLatex: "Variable", placeholder: "x", expected: "x" }
                ],
                correctLatex: "3x",
                hintLatex: ["5-2=3"]
            });
        } else if (isAdv) {
            quests.push({
                id: "T1-A", difficulty, stage,
                promptLatex: "\\text{Simplify: } 2x + 3y + x",
                expressionLatex: "3x + 3y",
                targetLatex: "Ax + By",
                visualMode: 'SORTING',
                visualData: {
                    items: [
                        { type: 'x', count: 2, color: '#3b82f6' },
                        { type: 'y', count: 3, color: '#eab308' },
                        { type: 'x', count: 1, color: '#3b82f6' }
                    ]
                },
                slots: [
                    { id: "x_term", labelLatex: "Term x", placeholder: "Ax", expected: "3x" },
                    { id: "y_term", labelLatex: "Term y", placeholder: "By", expected: "3y" }
                ],
                correctLatex: "3x+3y",
                hintLatex: ["\\text{Combine x terms together, keep y separate.}"]
            });
        } else {
            // Elite
            quests.push({
                id: "T1-E", difficulty, stage,
                promptLatex: "\\text{Simplify: } 4a + 5 - a + 2",
                expressionLatex: "3a + 7",
                targetLatex: "Aa + B",
                visualMode: 'SORTING',
                visualData: {
                    items: [
                        { type: 'a', count: 4, color: '#ef4444' },
                        { type: '1', count: 5, color: '#64748b' },
                        { type: 'a', count: -1, color: '#fca5a5' },
                        { type: '1', count: 2, color: '#64748b' }
                    ]
                },
                slots: [
                    { id: "res", labelLatex: "Result", placeholder: "3a+7", expected: "3a+7" } // Simplified single input for elite
                ],
                correctLatex: "3a+7",
                hintLatex: ["\\text{Combine 'a' terms: 4a-a=3a. Combine numbers: 5+2=7.}"]
            });
        }
    }

    // --- STAGE 3: SUBSTITUTION ---
    if (stage === "SUBSTITUTION") {
        if (isBasic) {
            quests.push({
                id: "S1-B", difficulty, stage,
                promptLatex: "\\text{Evaluate } 2x \\text{ for } x=3",
                expressionLatex: "2(3)",
                targetLatex: "?",
                visualMode: 'MACHINE',
                visualData: {
                    inputValue: 3,
                    formula: "2x"
                },
                slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 6 }],
                correctLatex: "6",
                hintLatex: ["2 \\times 3 = 6"]
            });
        } else if (isCore) {
            quests.push({
                id: "S1-C", difficulty, stage,
                promptLatex: "\\text{Evaluate } 3x + 2 \\text{ for } x=4",
                expressionLatex: "3(4)+2",
                targetLatex: "?",
                visualMode: 'MACHINE',
                visualData: {
                    inputValue: 4,
                    formula: "3x+2"
                },
                slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 14 }],
                correctLatex: "12+2=14",
                hintLatex: ["3 \\times 4 = 12, \\text{ then } + 2"]
            });
        } else if (isAdv) {
            quests.push({
                id: "S1-A", difficulty, stage,
                promptLatex: "\\text{Evaluate } x^2 \\text{ for } x=5",
                expressionLatex: "5^2",
                targetLatex: "?",
                visualMode: 'MACHINE',
                visualData: {
                    inputValue: 5,
                    formula: "x^2"
                },
                slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 25 }],
                correctLatex: "25",
                hintLatex: ["5 \\times 5 = 25"]
            });
        } else {
            quests.push({
                id: "S1-E", difficulty, stage,
                promptLatex: "\\text{Evaluate } 2x^2 + 1 \\text{ for } x=3",
                expressionLatex: "2(3^2)+1",
                targetLatex: "?",
                visualMode: 'MACHINE',
                visualData: {
                    inputValue: 3,
                    formula: "2x^2+1"
                },
                slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: 19 }],
                correctLatex: "2(9)+1=18+1=19",
                hintLatex: ["\\text{Square first: } 3^2=9 \\text{, then multiply by 2.}"]
            });
        }
    }

    return quests;
}

export default function SM103Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].sm1_03;

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

    const {
        difficulty, stage, inputs, lastCheck, currentQuest,
        successRate,
        setInputs, verify, next, handleDifficultyChange, handleStageChange,
    } = useQuestManager<S103Quest, Stage>({
        buildPool,
        initialStage: "VARIABLES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm1-03", stage);
        }
    }, [lastCheck, completeStage, stage]);

    // Format Visual Data for component
    const visualProps = currentQuest ? {
        mode: currentQuest.visualMode,
        data: currentQuest.visualData
    } : { mode: 'CONTAINERS' as AlgebraVisualMode, data: {} };


    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SM1.03"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "VARIABLES", label: t.stages.variables },
                { id: "TERMS", label: t.stages.terms },
                { id: "SUBSTITUTION", label: t.stages.substitution },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            successRate={successRate}
            checkStatus={lastCheck}
            translations={{
                back: t.back, check: t.check, next: t.next, correct: t.correct, incorrect: t.incorrect,
                ready: t.ready, monitor_title: "ALGEBRA_VISUALIZER",
                difficulty: { basic: t.difficulty.basic, core: t.difficulty.core, advanced: t.difficulty.advanced, elite: t.difficulty.elite },
            }}
            monitorContent={
                <div className="w-full h-full flex items-center justify-center">
                    <AlgebraCanvas {...visualProps} />
                </div>
            }
        >
            <div className="space-y-12">
                <div className="text-center group">
                    <div className="text-[10px] text-white/90 uppercase tracking-[0.5em] font-black mb-4 group-hover:text-neon-purple transition-colors">
                        MISSION OBJECTIVE
                    </div>
                    <div className="text-2xl text-white font-black italic whitespace-normal break-words leading-tight min-h-[5rem] flex items-center justify-center">
                        {currentQuest?.promptLatex && (
                            <InlineMath math={currentQuest.promptLatex} />
                        )}
                    </div>
                </div>

                <div className="max-w-2xl mx-auto w-full">
                    <div className="flex flex-wrap justify-center gap-8">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="space-y-4">
                                <div className="flex items-center gap-2 justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/50" />
                                    <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                                        <InlineMath math={slot.labelLatex} />
                                    </div>
                                </div>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                    placeholder={slot.placeholder}
                                    className="w-48 bg-black/60 border-2 border-white/10 p-4 text-center outline-none focus:border-neon-purple text-white font-black text-3xl rounded-2xl transition-all focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scenario Hint Footer */}
                <div className="mt-8 text-center opacity-60 hover:opacity-100 transition-opacity">
                    <div className="text-xs font-mono text-neon-blue mb-2">SCENARIO CONTEXT</div>
                    <div className="text-sm italic text-white max-w-lg mx-auto leading-relaxed">
                        {stage === 'VARIABLES' && t.scenarios.variables}
                        {stage === 'TERMS' && t.scenarios.terms}
                        {stage === 'SUBSTITUTION' && t.scenarios.substitution}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
