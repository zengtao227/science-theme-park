"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
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

// Data structure for quest generation
interface AlgebraData {
    var1?: string;
    val1?: number;
    var2?: string;
    val2?: number;
    var3?: string;
    val3?: number;
    expr?: string;
    answer: number | string;
    visualMode: AlgebraVisualMode;
    visualData: {
        variables?: { label: string; value: number | string; color: string }[];
        expression?: string;
        items?: { type: string; count: number; color: string }[];
        inputValue?: number;
        formula?: string;
    };
}

const QUEST_DATA: Record<Stage, Record<Difficulty, AlgebraData[]>> = {
    VARIABLES: {
        BASIC: [
            { var1: 'x', val1: 5, answer: 5, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 5, color: '#a855f7' }] } },
            { var1: 'y', val1: 10, answer: 10, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'y', value: 10, color: '#3b82f6' }] } },
            { var1: 'z', val1: 2, answer: 2, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'z', value: 2, color: '#22c55e' }] } },
            { var1: 'a', val1: 7, answer: 7, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 7, color: '#ef4444' }] } },
            { var1: 'b', val1: 0, answer: 0, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'b', value: 0, color: '#64748b' }] } },
        ],
        CORE: [
            { var1: 'x', val1: 3, expr: 'x+x', answer: 6, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 3, color: '#a855f7' }, { label: 'x', value: 3, color: '#a855f7' }] } },
            { var1: 'y', val1: 4, expr: 'y+y+y', answer: 12, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'y', value: 4, color: '#3b82f6' }, { label: 'y', value: 4, color: '#3b82f6' }, { label: 'y', value: 4, color: '#3b82f6' }] } },
            { var1: 'a', val1: 5, expr: '2a', answer: 10, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 5, color: '#ef4444' }, { label: 'a', value: 5, color: '#ef4444' }] } },
            { var1: 'x', val1: 2, expr: 'x+5', answer: 7, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 2, color: '#a855f7' }, { label: '1', value: 5, color: '#64748b' }] } },
            { var1: 'b', val1: 6, expr: 'b-2', answer: 4, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'b', value: 6, color: '#22c55e' }] } },
        ],
        ADVANCED: [
            { var1: 'a', val1: 4, var2: 'b', val2: 2, expr: 'a+b', answer: 6, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 4, color: '#ef4444' }, { label: 'b', value: 2, color: '#22c55e' }] } },
            { var1: 'x', val1: 5, var2: 'y', val2: 3, expr: 'x-y', answer: 2, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 5, color: '#a855f7' }, { label: 'y', value: 3, color: '#3b82f6' }] } },
            { var1: 'a', val1: 3, var2: 'b', val2: 4, expr: '2a+b', answer: 10, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 3, color: '#ef4444' }, { label: 'a', value: 3, color: '#ef4444' }, { label: 'b', value: 4, color: '#22c55e' }] } },
            { var1: 'x', val1: 10, expr: 'x/2', answer: 5, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 10, color: '#a855f7' }] } },
            { var1: 'p', val1: 3, var2: 'q', val2: 2, expr: '3p-q', answer: 7, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'p', value: 3, color: '#eab308' }, { label: 'p', value: 3, color: '#eab308' }, { label: 'p', value: 3, color: '#eab308' }, { label: 'q', value: 2, color: '#ec4899' }] } },
        ],
        ELITE: [
            { var1: 'x', val1: 3, expr: '2x+1', answer: 7, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 3, color: '#a855f7' }, { label: 'x', value: 3, color: '#a855f7' }, { label: '1', value: 1, color: '#64748b' }] } },
            { var1: 'x', val1: 5, var2: 'y', val2: 2, expr: '2x-3y', answer: 4, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 5, color: '#a855f7' }, { label: 'x', value: 5, color: '#a855f7' }, { label: 'y', value: 2, color: '#3b82f6' }] } },
            { var1: 'a', val1: 4, expr: 'a^2', answer: 16, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'a', value: 4, color: '#ef4444' }] } },
            { var1: 'x', val1: 2, var2: 'y', val2: 3, var3: 'z', val3: 4, expr: 'x+y+z', answer: 9, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'x', value: 2, color: '#a855f7' }, { label: 'y', value: 3, color: '#3b82f6' }, { label: 'z', value: 4, color: '#22c55e' }] } },
            { var1: 'k', val1: 10, expr: '2k+5', answer: 25, visualMode: 'CONTAINERS', visualData: { variables: [{ label: 'k', value: 10, color: '#eab308' }, { label: 'k', value: 10, color: '#eab308' }, { label: '5', value: 5, color: '#64748b' }] } },
        ],
    },
    TERMS: {
        BASIC: [
            { expr: '3a+2a', answer: '5a', visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 3, color: '#ef4444' }, { type: 'a', count: 2, color: '#ef4444' }] } },
            { expr: '4x+x', answer: '5x', visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 4, color: '#3b82f6' }, { type: 'x', count: 1, color: '#3b82f6' }] } },
            { expr: '2y+5y', answer: '7y', visualMode: 'SORTING', visualData: { items: [{ type: 'y', count: 2, color: '#eab308' }, { type: 'y', count: 5, color: '#eab308' }] } },
            { expr: 'a+a', answer: '2a', visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 1, color: '#ef4444' }, { type: 'a', count: 1, color: '#ef4444' }] } },
            { expr: '6b+2b', answer: '8b', visualMode: 'SORTING', visualData: { items: [{ type: 'b', count: 6, color: '#22c55e' }, { type: 'b', count: 2, color: '#22c55e' }] } },
        ],
        CORE: [
            { expr: '5x-2x', answer: '3x', visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 5, color: '#3b82f6' }, { type: 'x (remove)', count: -2, color: '#9ca3af' }] } },
            { expr: '10y-4y', answer: '6y', visualMode: 'SORTING', visualData: { items: [{ type: 'y', count: 10, color: '#eab308' }, { type: 'y', count: -4, color: '#9ca3af' }] } },
            { expr: '3a+4a-2a', answer: '5a', visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 3, color: '#ef4444' }, { type: 'a', count: 4, color: '#ef4444' }, { type: 'a', count: -2, color: '#9ca3af' }] } },
            { expr: '8z-z', answer: '7z', visualMode: 'SORTING', visualData: { items: [{ type: 'z', count: 8, color: '#22c55e' }, { type: 'z', count: -1, color: '#9ca3af' }] } },
            { expr: '2x+2x+2x', answer: '6x', visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 2, color: '#3b82f6' }, { type: 'x', count: 2, color: '#3b82f6' }, { type: 'x', count: 2, color: '#3b82f6' }] } },
        ],
        ADVANCED: [
            { expr: '2x+3y+x', answer: '3x+3y', visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 2, color: '#3b82f6' }, { type: 'y', count: 3, color: '#eab308' }, { type: 'x', count: 1, color: '#3b82f6' }] } },
            { expr: '4a+2b+a', answer: '5a+2b', visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 4, color: '#ef4444' }, { type: 'b', count: 2, color: '#22c55e' }, { type: 'a', count: 1, color: '#ef4444' }] } },
            { expr: '5x+5y-2x', answer: '3x+5y', visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 5, color: '#3b82f6' }, { type: 'y', count: 5, color: '#eab308' }, { type: 'x', count: -2, color: '#9ca3af' }] } },
            { expr: '3a+2b+3a+b', answer: '6a+3b', visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 3, color: '#ef4444' }, { type: 'b', count: 2, color: '#22c55e' }, { type: 'a', count: 3, color: '#ef4444' }, { type: 'b', count: 1, color: '#22c55e' }] } },
            { expr: 'x+y+x+y', answer: '2x+2y', visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 1, color: '#3b82f6' }, { type: 'y', count: 1, color: '#eab308' }, { type: 'x', count: 1, color: '#3b82f6' }, { type: 'y', count: 1, color: '#eab308' }] } },
        ],
        ELITE: [
            { expr: '4a+5-a+2', answer: '3a+7', visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 4, color: '#ef4444' }, { type: '1', count: 5, color: '#64748b' }, { type: 'a', count: -1, color: '#fca5a5' }, { type: '1', count: 2, color: '#64748b' }] } },
            { expr: '2x-3+5x+10', answer: '7x+7', visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 2, color: '#3b82f6' }, { type: '1', count: -3, color: '#64748b' }, { type: 'x', count: 5, color: '#3b82f6' }, { type: '1', count: 10, color: '#64748b' }] } },
            { expr: '3y+2-y-5', answer: '2y-3', visualMode: 'SORTING', visualData: { items: [{ type: 'y', count: 3, color: '#eab308' }, { type: '1', count: 2, color: '#64748b' }, { type: 'y', count: -1, color: '#fca5a5' }, { type: '1', count: -5, color: '#64748b' }] } },
            { expr: '5a-2a+3b-b', answer: '3a+2b', visualMode: 'SORTING', visualData: { items: [{ type: 'a', count: 5, color: '#ef4444' }, { type: 'a', count: -2, color: '#fca5a5' }, { type: 'b', count: 3, color: '#22c55e' }, { type: 'b', count: -1, color: '#9ca3af' }] } },
            { expr: 'x+x+x-3x', answer: '0', visualMode: 'SORTING', visualData: { items: [{ type: 'x', count: 1, color: '#3b82f6' }, { type: 'x', count: 1, color: '#3b82f6' }, { type: 'x', count: 1, color: '#3b82f6' }, { type: 'x', count: -3, color: '#fca5a5' }] } },
        ],
    },
    SUBSTITUTION: {
        BASIC: [
            { var1: 'x', val1: 3, expr: '2x', answer: 6, visualMode: 'MACHINE', visualData: { inputValue: 3, formula: '2x' } },
            { var1: 'x', val1: 2, expr: 'x+5', answer: 7, visualMode: 'MACHINE', visualData: { inputValue: 2, formula: 'x+5' } },
            { var1: 'x', val1: 10, expr: 'x-1', answer: 9, visualMode: 'MACHINE', visualData: { inputValue: 10, formula: 'x-1' } },
            { var1: 'x', val1: 0, expr: '3x', answer: 0, visualMode: 'MACHINE', visualData: { inputValue: 0, formula: '3x' } },
            { var1: 'x', val1: 8, expr: 'x/2', answer: 4, visualMode: 'MACHINE', visualData: { inputValue: 8, formula: 'x/2' } },
        ],
        CORE: [
            { var1: 'x', val1: 4, expr: '3x+2', answer: 14, visualMode: 'MACHINE', visualData: { inputValue: 4, formula: '3x+2' } },
            { var1: 'x', val1: 5, expr: '2x-5', answer: 5, visualMode: 'MACHINE', visualData: { inputValue: 5, formula: '2x-5' } },
            { var1: 'x', val1: 1, expr: '4x+1', answer: 5, visualMode: 'MACHINE', visualData: { inputValue: 1, formula: '4x+1' } },
            { var1: 'x', val1: 3, expr: '10-x', answer: 7, visualMode: 'MACHINE', visualData: { inputValue: 3, formula: '10-x' } },
            { var1: 'x', val1: 1.5, expr: '5x', answer: 7.5, visualMode: 'MACHINE', visualData: { inputValue: 1.5, formula: '5x' } },
        ],
        ADVANCED: [
            { var1: 'x', val1: 5, expr: 'x^2', answer: 25, visualMode: 'MACHINE', visualData: { inputValue: 5, formula: 'x^2' } },
            { var1: 'x', val1: 3, expr: 'x^2+2', answer: 11, visualMode: 'MACHINE', visualData: { inputValue: 3, formula: 'x^2+2' } },
            { var1: 'x', val1: 2, expr: '2x^2', answer: 8, visualMode: 'MACHINE', visualData: { inputValue: 2, formula: '2x^2' } },
            { var1: 'x', val1: 4, expr: '100-x^2', answer: 84, visualMode: 'MACHINE', visualData: { inputValue: 4, formula: '100-x^2' } },
            { var1: 'x', val1: 3, expr: '(x+1)^2', answer: 16, visualMode: 'MACHINE', visualData: { inputValue: 3, formula: '(x+1)^2' } },
        ],
        ELITE: [
            { var1: 'x', val1: 3, expr: '2x^2+1', answer: 19, visualMode: 'MACHINE', visualData: { inputValue: 3, formula: '2x^2+1' } },
            { var1: 'x', val1: 5, expr: 'x^2-3x', answer: 10, visualMode: 'MACHINE', visualData: { inputValue: 5, formula: 'x^2-3x' } },
            { var1: 'x', val1: 4, expr: 'x^2/2', answer: 8, visualMode: 'MACHINE', visualData: { inputValue: 4, formula: 'x^2/2' } },
            { var1: 'x', val1: 2, expr: '3x^2+x-10', answer: 4, visualMode: 'MACHINE', visualData: { inputValue: 2, formula: '3x^2+x-10' } },
            { var1: 'x', val1: 16, expr: '\\sqrt{x}+5', answer: 9, visualMode: 'MACHINE', visualData: { inputValue: 16, formula: '\\sqrt{x}+5' } },
        ],
    },
};

function buildStagePool(sm1_02_t: any, difficulty: Difficulty, stage: Stage): S103Quest[] {
    const quests: S103Quest[] = [];
    const dataList = QUEST_DATA[stage]?.[difficulty] || [];

    dataList.forEach((data, idx) => {
        const id = `${stage[0]}${idx + 1}-${difficulty[0]}`;

        if (stage === "VARIABLES") {
            let promptLatex = "";
            let expressionLatex = "";
            let targetLatex = "";
            let hintLatex = [""];

            if (data.expr) {
                if (data.var2) {
                    promptLatex = `\\\\text{If } ${data.var1}=${data.val1}, ${data.var2}=${data.val2}${data.var3 ? `, ${data.var3}=${data.val3}` : ''} \\\\text{, calculate } ${data.expr}`;
                } else {
                    promptLatex = `\\\\text{If } ${data.var1}=${data.val1} \\\\text{, calculate } ${data.expr}`;
                }
                expressionLatex = data.expr;
                targetLatex = String(data.answer);
                hintLatex = [`\\text{Evaluate the expression}`];
            } else {
                promptLatex = `\\\\text{If } ${data.var1}=${data.val1} \\\\text{, what is } ${data.var1}?`;
                expressionLatex = data.var1!;
                targetLatex = String(data.answer);
                hintLatex = [`\\\\text{The variable ${data.var1} holds the value ${data.val1}.}`];
            }

            quests.push({
                id,
                difficulty,
                stage,
                promptLatex,
                expressionLatex,
                targetLatex,
                visualMode: data.visualMode,
                visualData: data.visualData,
                slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: data.answer }],
                correctLatex: String(data.answer),
                hintLatex,
            });
        } else if (stage === "TERMS") {
            const isMultiVar = typeof data.answer === 'string' && (data.answer.includes('+') || data.answer.includes('-'));
            const slots = isMultiVar
                ? [{ id: "res", labelLatex: "Result", placeholder: String(data.answer), expected: String(data.answer) }]
                : [
                    { id: "coef", labelLatex: "Coefficient", placeholder: "#", expected: String(parseInt(String(data.answer)) || 0) },
                    { id: "var", labelLatex: "Variable", placeholder: "x", expected: String(data.answer).replace(/[0-9]/g, '') }
                ];

            quests.push({
                id,
                difficulty,
                stage,
                promptLatex: `\\\\text{${sm1_02_t.prompts.simplify} } ${data.expr}`,
                expressionLatex: data.expr!,
                targetLatex: String(data.answer),
                visualMode: data.visualMode,
                visualData: data.visualData,
                slots,
                correctLatex: String(data.answer),
                hintLatex: [`\\\\text{${sm1_02_t.prompts.combine_like_terms}}`],
            });
        } else if (stage === "SUBSTITUTION") {
            quests.push({
                id,
                difficulty,
                stage,
                promptLatex: `\\\\text{${sm1_02_t.prompts.simplify} } ${data.expr} \\\\text{ for } ${data.var1}=${data.val1}`,
                expressionLatex: data.expr!,
                targetLatex: String(data.answer),
                visualMode: data.visualMode,
                visualData: data.visualData,
                slots: [{ id: "ans", labelLatex: "Output", placeholder: "?", expected: data.answer }],
                correctLatex: String(data.answer),
                hintLatex: [`\\\\text{${sm1_02_t.prompts.substitute_and_evaluate}}`],
            });
        }
    });

    return quests;
}

export default function SM103Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const sm1_02_t = {
        title: t("sm1_02.title"),
        back: t("sm1_02.back"),
        check: t("sm1_02.check"),
        next: t("sm1_02.next"),
        correct: t("sm1_02.correct"),
        incorrect: t("sm1_02.incorrect"),
        ready: t("sm1_02.ready"),
        difficulty: {
            basic: t("sm1_02.difficulty.basic"),
            core: t("sm1_02.difficulty.core"),
            advanced: t("sm1_02.difficulty.advanced"),
            elite: t("sm1_02.difficulty.elite")
        },
        stages: {
            variables: t("sm1_02.stages.variables"),
            terms: t("sm1_02.stages.terms"),
            substitution: t("sm1_02.stages.substitution")
        },
        scenarios: {
            variables: t("sm1_02.scenarios.variables"),
            terms: t("sm1_02.scenarios.terms"),
            substitution: t("sm1_02.scenarios.substitution")
        },
        prompts: {
            simplify: t("sm1_02.prompts.simplify"),
            combine_like_terms: t("sm1_02.prompts.combine_like_terms"),
            substitute_and_evaluate: t("sm1_02.prompts.substitute_and_evaluate")
        }
    };

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(sm1_02_t, d, s), [sm1_02_t]);

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
            completeStage("sm1-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    // Format Visual Data for component
    const visualProps = currentQuest ? {
        mode: currentQuest.visualMode,
        data: currentQuest.visualData
    } : { mode: 'CONTAINERS' as AlgebraVisualMode, data: {} };


    return (
        <ChamberLayout
            title={sm1_02_t.title}
            moduleCode="SM1.02"
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
                        {stage === 'VARIABLES' && sm1_02_t.scenarios.variables}
                        {stage === 'TERMS' && sm1_02_t.scenarios.terms}
                        {stage === 'SUBSTITUTION' && sm1_02_t.scenarios.substitution}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
