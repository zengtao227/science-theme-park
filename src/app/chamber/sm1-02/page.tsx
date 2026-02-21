"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AlgebraCanvas, { type AlgebraVisualMode } from "@/components/chamber/sm1-02/AlgebraCanvas";

type Stage = "VARIABLES" | "TERMS" | "SUBSTITUTION";

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

const VAR_COLORS = {
    x: '#3b82f6', // blue
    y: '#eab308', // yellow
    z: '#22c55e', // green
    a: '#ef4444', // red
    b: '#a855f7', // purple
    c: '#f97316', // orange
    p: '#14b8a6', // teal
    q: '#ec4899', // pink
};

function buildStagePool(sm1_02_t: any, difficulty: Difficulty, stage: Stage): S103Quest[] {
    const quests: S103Quest[] = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
        const id = `${stage[0]}${i + 1}-${difficulty[0]}`;

        if (stage === "VARIABLES") {
            const vars = ['x', 'y', 'a', 'b', 'p'];
            const var1 = vars[Math.floor(Math.random() * vars.length)];
            const var2 = vars[(vars.indexOf(var1) + 1) % vars.length];
            const color1 = VAR_COLORS[var1 as keyof typeof VAR_COLORS];
            const color2 = VAR_COLORS[var2 as keyof typeof VAR_COLORS];

            let promptLatex = "";
            let expressionLatex = "";
            let targetLatex = "";
            let hintLatex = [""];
            let visualData: any = {};
            let answer: number = 0;

            if (difficulty === "BASIC") {
                const val1 = Math.floor(Math.random() * 10) + 1;
                answer = val1;
                promptLatex = `\\\\text{${sm1_02_t.prompts.if} } ${var1}=${val1} \\\\text{, ${sm1_02_t.prompts.what_is} } ${var1}?`;
                expressionLatex = var1;
                hintLatex = [`\\\\text{${sm1_02_t.labels.variable} ${var1} holds the value ${val1}.}`];
                visualData = { variables: [{ label: var1, value: val1, color: color1 }] };
            } else if (difficulty === "CORE") {
                const val1 = Math.floor(Math.random() * 8) + 2;
                const coeff = Math.floor(Math.random() * 3) + 2; // 2 or 3
                answer = coeff * val1;
                const expr = coeff === 2 ? `${var1}+${var1}` : `${coeff}${var1}`;
                promptLatex = `\\\\text{${sm1_02_t.prompts.if} } ${var1}=${val1} \\\\text{, ${sm1_02_t.prompts.calculate} } ${expr}`;
                expressionLatex = expr;
                hintLatex = [`\\text{Evaluate the expression}`];
                visualData = {
                    variables: Array(coeff).fill(null).map(() => ({ label: var1, value: val1, color: color1 }))
                };
            } else if (difficulty === "ADVANCED") {
                const val1 = Math.floor(Math.random() * 5) + 3;
                const val2 = Math.floor(Math.random() * 5) + 1;
                const sign = Math.random() > 0.5 ? '+' : '-';
                answer = sign === '+' ? val1 + val2 : val1 - val2;
                promptLatex = `\\\\text{${sm1_02_t.prompts.if} } ${var1}=${val1}, ${var2}=${val2} \\\\text{, ${sm1_02_t.prompts.calculate} } ${var1}${sign}${var2}`;
                expressionLatex = `${var1}${sign}${var2}`;
                hintLatex = [`\\text{Substitute both variables}`];
                visualData = {
                    variables: [
                        { label: var1, value: val1, color: color1 },
                        { label: var2, value: sign === '-' ? -val2 : val2, color: color2 }
                    ]
                };
            } else if (difficulty === "ELITE") {
                const val1 = Math.floor(Math.random() * 5) + 2;
                const val2 = Math.floor(Math.random() * 5) + 2;
                const c1 = Math.floor(Math.random() * 2) + 2;
                const c2 = Math.floor(Math.random() * 2) + 2;
                const sign = Math.random() > 0.4 ? '+' : '-';
                answer = sign === '+' ? c1 * val1 + c2 * val2 : c1 * val1 - c2 * val2;
                promptLatex = `\\\\text{${sm1_02_t.prompts.if} } ${var1}=${val1}, ${var2}=${val2} \\\\text{, ${sm1_02_t.prompts.calculate} } ${c1}${var1}${sign}${c2}${var2}`;
                expressionLatex = `${c1}${var1}${sign}${c2}${var2}`;
                hintLatex = [`\\text{Multiply coefficients first}`];
                visualData = {
                    variables: [
                        ...Array(c1).fill(null).map(() => ({ label: var1, value: val1, color: color1 })),
                        ...Array(c2).fill(null).map(() => ({ label: var2, value: sign === '-' ? -val2 : val2, color: color2 }))
                    ]
                };
            }
            targetLatex = String(answer);

            quests.push({
                id,
                difficulty,
                stage,
                promptLatex,
                expressionLatex,
                targetLatex,
                visualMode: 'CONTAINERS',
                visualData,
                slots: [{ id: "ans", labelLatex: `\\\\text{${sm1_02_t.labels.value}}`, placeholder: "?", expected: answer }],
                correctLatex: String(answer),
                hintLatex,
            });

        } else if (stage === "TERMS") {
            const vars = ['x', 'y', 'a', 'b', 'p'];
            const v1 = vars[Math.floor(Math.random() * vars.length)];
            let v2 = vars[(vars.indexOf(v1) + 1) % vars.length];
            const color1 = VAR_COLORS[v1 as keyof typeof VAR_COLORS];
            const color2 = VAR_COLORS[v2 as keyof typeof VAR_COLORS];

            let expr = "";
            let answerStr = "";
            let items: any[] = [];
            let isMultiVar = false;

            if (difficulty === "BASIC") {
                const c1 = Math.floor(Math.random() * 5) + 2;
                const c2 = Math.floor(Math.random() * 5) + 1;
                expr = `${c1}${v1}+${c2}${v1}`;
                answerStr = `${c1 + c2}${v1}`;
                items = [
                    { type: v1, count: c1, color: color1 },
                    { type: v1, count: c2, color: color1 }
                ];
            } else if (difficulty === "CORE") {
                const c1 = Math.floor(Math.random() * 6) + 4;
                const c2 = Math.floor(Math.random() * (c1 - 1)) + 1;
                expr = `${c1}${v1}-${c2}${v1}`;
                answerStr = `${c1 - c2}${v1}`;
                if (answerStr === `1${v1}`) answerStr = v1;
                items = [
                    { type: v1, count: c1, color: color1 },
                    { type: `${v1} (remove)`, count: -c2, color: '#9ca3af' }
                ];
            } else if (difficulty === "ADVANCED") {
                isMultiVar = true;
                const c1 = Math.floor(Math.random() * 4) + 2;
                const c2 = Math.floor(Math.random() * 3) + 2;
                const c3 = Math.floor(Math.random() * 3) + 1;
                expr = `${c1}${v1}+${c2}${v2}+${c3}${v1}`;
                answerStr = `${c1 + c3}${v1}+${c2}${v2}`;
                items = [
                    { type: v1, count: c1, color: color1 },
                    { type: v2, count: c2, color: color2 },
                    { type: v1, count: c3, color: color1 }
                ];
            } else if (difficulty === "ELITE") {
                isMultiVar = true;
                const c1 = Math.floor(Math.random() * 5) + 3;
                const c2 = Math.floor(Math.random() * 3) + 2;
                const k1 = Math.floor(Math.random() * 5) + 2;
                const k2 = Math.floor(Math.random() * 4) + 1;
                expr = `${c1}${v1}+${k1}-${c2}${v1}+${k2}`;
                let finalC = c1 - c2;
                let cStr = finalC === 1 ? v1 : finalC === -1 ? `-${v1}` : `${finalC}${v1}`;
                if (finalC === 0) cStr = "";
                answerStr = `${cStr}${cStr ? '+' : ''}${k1 + k2}`;
                items = [
                    { type: v1, count: c1, color: color1 },
                    { type: '1', count: k1, color: '#64748b' },
                    { type: v1, count: -c2, color: '#fca5a5' },
                    { type: '1', count: k2, color: '#64748b' }
                ];
            }

            const slots = isMultiVar
                ? [{ id: "res", labelLatex: `\\\\text{${sm1_02_t.labels.result}}`, placeholder: answerStr, expected: answerStr }]
                : [
                    { id: "coef", labelLatex: `\\\\text{${sm1_02_t.labels.coefficient}}`, placeholder: "#", expected: String(parseInt(answerStr) || 0) },
                    { id: "var", labelLatex: `\\\\text{${sm1_02_t.labels.variable}}`, placeholder: "x", expected: answerStr.replace(/[0-9-]/g, '') }
                ];

            quests.push({
                id,
                difficulty,
                stage,
                promptLatex: `\\\\text{${sm1_02_t.prompts.simplify} } ${expr}`,
                expressionLatex: expr,
                targetLatex: answerStr,
                visualMode: 'SORTING',
                visualData: { items },
                slots,
                correctLatex: answerStr,
                hintLatex: [`\\\\text{${sm1_02_t.prompts.combine_like_terms}}`],
            });

        } else if (stage === "SUBSTITUTION") {
            const v1 = ['x', 'y', 't', 'k'][Math.floor(Math.random() * 4)];
            let val = 0;
            let expr = "";
            let answer = 0;

            if (difficulty === "BASIC") {
                val = Math.floor(Math.random() * 8) + 2;
                const c = Math.floor(Math.random() * 3) + 2;
                expr = `${c}${v1}`;
                answer = c * val;
            } else if (difficulty === "CORE") {
                val = Math.floor(Math.random() * 6) + 2;
                const c = Math.floor(Math.random() * 4) + 2;
                const k = Math.floor(Math.random() * 5) + 1;
                const sign = Math.random() > 0.5 ? '+' : '-';
                expr = `${c}${v1}${sign}${k}`;
                answer = sign === '+' ? c * val + k : c * val - k;
            } else if (difficulty === "ADVANCED") {
                val = Math.floor(Math.random() * 5) + 2;
                const k = Math.floor(Math.random() * 3) + 1;
                const sign = Math.random() > 0.5 ? '+' : '-';
                expr = `${v1}^{2}${sign}${k}`;
                answer = sign === '+' ? val * val + k : val * val - k;
            } else if (difficulty === "ELITE") {
                val = Math.floor(Math.random() * 4) + 2;
                const c = Math.floor(Math.random() * 3) + 2;
                const k = Math.floor(Math.random() * 5) + 2;
                expr = `${c}${v1}^{2} - ${v1} + ${k}`;
                answer = c * val * val - val + k;
            }

            quests.push({
                id,
                difficulty,
                stage,
                promptLatex: `\\\\text{${sm1_02_t.prompts.calculate} } ${expr} \\\\text{ ${sm1_02_t.prompts.if} } ${v1}=${val}`,
                expressionLatex: expr,
                targetLatex: String(answer),
                visualMode: 'MACHINE',
                visualData: { inputValue: val, formula: expr },
                slots: [{ id: "ans", labelLatex: `\\\\text{${sm1_02_t.labels.output}}`, placeholder: "?", expected: answer }],
                correctLatex: String(answer),
                hintLatex: [`\\\\text{${sm1_02_t.prompts.substitute_and_evaluate}}`],
            });
        }
    }

    return quests;
}

export default function SM103Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const sm1_02_t = {
        title: t("sm1_02.title") || "SM1.02 // ALGEBRAIC EXPRESSIONS",
        back: t("sm1_02.back") || "Back",
        check: t("sm1_02.check") || "Verify",
        next: t("sm1_02.next") || "Next",
        correct: t("sm1_02.correct") || "Correct",
        incorrect: t("sm1_02.incorrect") || "Incorrect",
        ready: t("sm1_02.ready") || "READY",
        difficulty: {
            basic: t("sm1_02.difficulty.basic") || "BASIC",
            core: t("sm1_02.difficulty.core") || "CORE",
            advanced: t("sm1_02.difficulty.advanced") || "ADVANCED",
            elite: t("sm1_02.difficulty.elite") || "ELITE"
        },
        stages: {
            variables: t("sm1_02.stages.variables") || "VARIABLES",
            terms: t("sm1_02.stages.terms") || "TERMS",
            substitution: t("sm1_02.stages.substitution") || "SUBSTITUTION"
        },
        scenarios: {
            variables: t("sm1_02.scenarios.variables") || "Variables store values like containers.",
            terms: t("sm1_02.scenarios.terms") || "Group matching variables together to simplify.",
            substitution: t("sm1_02.scenarios.substitution") || "Put the value inside the operation machine."
        },
        prompts: {
            simplify: t("sm1_02.prompts.simplify") || "Simplify:",
            combine_like_terms: t("sm1_02.prompts.combine_like_terms") || "Combine terms with same variables",
            substitute_and_evaluate: t("sm1_02.prompts.substitute_and_evaluate") || "Substitute value into expression",
            if: t("sm1_02.prompts.if") || "If",
            calculate: t("sm1_02.prompts.calculate") || "calculate",
            what_is: t("sm1_02.prompts.what_is") || "what is"
        },
        labels: {
            result: t("sm1_02.labels.result") || "Result",
            coefficient: t("sm1_02.labels.coefficient") || "Coefficient",
            variable: t("sm1_02.labels.variable") || "Variable",
            value: t("sm1_02.labels.value") || "Value",
            output: t("sm1_02.labels.output") || "Output",
            input: t("sm1_02.labels.input") || "Input",
            mixed_items: t("sm1_02.labels.mixed_items") || "Mixed Items",
            combine_hint: t("sm1_02.labels.combine_hint") || "Combine like items",
            processing_core: t("sm1_02.labels.processing_core") || "Processing Core"
        },
        objective_title: t("sm1_02.objective_title") || "MISSION OBJECTIVE",
        scenario_title: t("sm1_02.scenario_title") || "SCENARIO CONTEXT"
    };

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(sm1_02_t, d, s), [sm1_02_t]);

    const {
        difficulty, stage, inputs, lastCheck, currentQuest,
        successRate,
        setInputs, verify, next, handleDifficultyChange, handleStageChange,
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback
    } = useQuestManager<S103Quest, Stage>({
        moduleCode: "SM1.02",
        buildPool,
        initialStage: "VARIABLES",
        tolerance: 0.1
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SM1.02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    // Format Visual Data for component
    const visualProps = currentQuest ? {
        mode: currentQuest?.visualMode,
        data: currentQuest?.visualData
    } : { mode: 'CONTAINERS' as AlgebraVisualMode, data: {} };


    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            title={sm1_02_t.title}
            moduleCode="SM1.02" // ensure uniform capital case
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "VARIABLES", label: sm1_02_t.stages.variables },
                { id: "TERMS", label: sm1_02_t.stages.terms },
                { id: "SUBSTITUTION", label: sm1_02_t.stages.substitution },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            successRate={successRate}
            checkStatus={lastCheck}
            translations={{
                back: sm1_02_t.back, check: sm1_02_t.check, next: sm1_02_t.next, correct: sm1_02_t.correct, incorrect: sm1_02_t.incorrect,
                ready: sm1_02_t.ready, monitor_title: "ALGEBRA_VISUALIZER",
                difficulty: { basic: sm1_02_t.difficulty.basic, core: sm1_02_t.difficulty.core, advanced: sm1_02_t.difficulty.advanced, elite: sm1_02_t.difficulty.elite },
            }}
            monitorContent={
                <div className="w-full h-full flex items-center justify-center">
                    <AlgebraCanvas
                        {...visualProps}
                        translations={{
                            input: sm1_02_t.labels.input,
                            output: sm1_02_t.labels.output,
                            mixed_items: sm1_02_t.labels.mixed_items,
                            combine_hint: sm1_02_t.labels.combine_hint,
                            processing_core: sm1_02_t.labels.processing_core
                        }}
                    />
                </div>
            }
        >
            <div className="space-y-12">
                <div className="text-center group">
                    <div className="text-[10px] text-white/90 uppercase tracking-[0.5em] font-black mb-4 group-hover:text-neon-purple transition-colors">
                        {sm1_02_t.objective_title}
                    </div>
                    <div className="text-2xl text-white font-black italic whitespace-normal break-words leading-tight min-h-[5rem] flex items-center justify-center">
                        {currentQuest?.promptLatex && (
                            <InlineMath math={currentQuest?.promptLatex || ""} />
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
                    <div className="text-xs font-mono text-neon-blue mb-2">{sm1_02_t.scenario_title}</div>
                    <div className="text-sm italic text-white max-w-lg mx-auto leading-relaxed">
                        {stage === 'VARIABLES' && sm1_02_t.scenarios.variables}
                        {stage === 'TERMS' && sm1_02_t.scenarios.terms}
                        {stage === 'SUBSTITUTION' && sm1_02_t.scenarios.substitution}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
