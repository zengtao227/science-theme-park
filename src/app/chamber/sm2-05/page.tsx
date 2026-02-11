"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S205_PowerCanvas, { type PowerVisual } from "@/components/chamber/sm2-05/PowerCanvas";

type Stage = "RULES" | "NEGATIVE" | "SCIENTIFIC";
type S205T = typeof translations.EN.sm2_05;

interface S205Quest extends Quest {
    stage: Stage;
    visual: PowerVisual;
}

function buildStagePool(t: S205T, difficulty: Difficulty, stage: Stage): S205Quest[] {
    const isBasic = difficulty === "BASIC";
    const isCore = difficulty === "CORE";
    const isAdv = difficulty === "ADVANCED";
    const isElite = difficulty === "ELITE";

    if (stage === "RULES") {
        const quests: S205Quest[] = [];

        if (isBasic) {
            // Numeric basis, simple laws
            quests.push({
                id: "R1-B", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `2^3 \\cdot 2^2`,
                targetLatex: `2^x`,
                visual: { mode: 'MULTIPLY', base: 2, m: 3, n: 2 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 5 }],
                correctLatex: `2^5`,
                hintLatex: [`a^m \\cdot a^n = a^{m+n}`, `2^{3+2}=2^5`],
            });
            quests.push({
                id: "R2-B", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `3^6 \\div 3^2`,
                targetLatex: `3^x`,
                visual: { mode: 'DIVIDE', base: 3, m: 6, n: 2 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 4 }],
                correctLatex: `3^4`,
                hintLatex: [`a^m \\div a^n = a^{m-n}`, `3^{6-2}=3^4`],
            });
        } else if (isCore) {
            // Algebraic variables
            quests.push({
                id: "R1-C", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `x^5 \\cdot x^4`,
                targetLatex: `x^n`,
                visual: { mode: 'MULTIPLY', base: 'x', m: 5, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 9 }],
                correctLatex: `x^9`,
                hintLatex: [`x^5 \\cdot x^4 = x^{5+4}`],
            });
            quests.push({
                id: "R2-C", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `(z^4)^2`,
                targetLatex: `z^n`,
                visual: { mode: 'POWER', base: 'z', m: 4, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 8 }],
                correctLatex: `z^8`,
                hintLatex: [`(z^4)^2 = z^{4 \\cdot 2}`],
            });
        } else if (isAdv) {
            // Combined rules
            quests.push({
                id: "R1-A", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `a^2 \\cdot (a^3)^2`,
                targetLatex: `a^n`,
                visual: { mode: 'POWER', base: 'a', m: 3, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 8 }],
                correctLatex: `a^2 \\cdot a^6 = a^8`,
                hintLatex: [`Apply (a^m)^n first`, `Then a^m \\cdot a^n`],
            });
            quests.push({
                id: "R2-A", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `(b^4 \\cdot b^2)^3`,
                targetLatex: `b^n`,
                visual: { mode: 'MULTIPLY', base: 'b', m: 4, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 18 }],
                correctLatex: `(b^{4+2})^3 = (b^6)^3 = b^{18}`,
                hintLatex: [`Apply a^m \\cdot a^n inside parentheses first`],
            });
        } else {
            // Elite: Constant and multiple variables
            quests.push({
                id: "R1-E", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `(2x^3)^2 \\div 4x^2`,
                targetLatex: `x^n`,
                visual: { mode: 'POWER', base: '2x', m: 3, n: 2 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 4 }],
                correctLatex: `4x^6 \\div 4x^2 = x^4`,
                hintLatex: [`(cx^m)^n = c^n \\cdot x^{mn}`, `Then divide`],
            });
        }
        return quests;
    }

    if (stage === "NEGATIVE") {
        const quests: S205Quest[] = [];
        if (isBasic) {
            quests.push({
                id: "N1-B", difficulty, stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `5^{-2}`,
                targetLatex: `\\frac{1}{x}`,
                visual: { mode: 'NEGATIVE', base: 5, m: 1, n: 2 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "x", expected: 25 }],
                correctLatex: `\\frac{1}{5^2} = \\frac{1}{25}`,
                hintLatex: [`a^{-n} = \\frac{1}{a^n}`],
            });
        } else if (isCore) {
            quests.push({
                id: "N1-C", difficulty, stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `x^{-4}`,
                targetLatex: `\\frac{1}{x^n}`,
                visual: { mode: 'NEGATIVE', base: 'x', m: 1, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 4 }],
                correctLatex: `\\frac{1}{x^4}`,
                hintLatex: [`a^{-n} = \\frac{1}{a^n}`],
            });
        } else if (isAdv) {
            quests.push({
                id: "N1-A", difficulty, stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `\\frac{1}{a^{-3}}`,
                targetLatex: `a^n`,
                visual: { mode: 'NEGATIVE', base: 'a', m: 1, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `a^3`,
                hintLatex: [`\\frac{1}{a^{-n}} = a^n`],
            });
        } else {
            quests.push({
                id: "N1-E", difficulty, stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `\\left(\\frac{x}{2}\\right)^{-3}`,
                targetLatex: `\\frac{8}{x^n}`,
                visual: { mode: 'NEGATIVE', base: 'x/2', m: 1, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `(\\frac{2}{x})^3 = \\frac{8}{x^3}`,
                hintLatex: [`(\\frac{a}{b})^{-n} = (\\frac{b}{a})^n`],
            });
        }
        return quests;
    }

    if (stage === "SCIENTIFIC") {
        const quests: S205Quest[] = [];
        if (isBasic) {
            quests.push({
                id: "S1-B", difficulty, stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `72000`,
                targetLatex: `7.2 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 7.2, n: 4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 4 }],
                correctLatex: `7.2 \\cdot 10^4`,
                hintLatex: [`Move decimal 4 places left`],
            });
        } else if (isCore) {
            quests.push({
                id: "S1-C", difficulty, stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `0.00035`,
                targetLatex: `3.5 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 3.5, n: -4 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: -4 }],
                correctLatex: `3.5 \\cdot 10^{-4}`,
                hintLatex: [`Move decimal 4 places right`],
            });
        } else if (isAdv) {
            quests.push({
                id: "S1-A", difficulty, stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `1.2 \\cdot 10^5`,
                targetLatex: `x`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 1.2, n: 5 },
                slots: [{ id: "x", labelLatex: "x", placeholder: "value", expected: 120000 }],
                correctLatex: `120,000`,
                hintLatex: [`Add 5 zeros and move decimal`],
            });
        } else {
            quests.push({
                id: "S1-E", difficulty, stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `(3 \\cdot 10^4) \\cdot (2 \\cdot 10^3)`,
                targetLatex: `6 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 6, n: 7 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 7 }],
                correctLatex: `(3\\cdot 2) \\cdot 10^{4+3} = 6 \\cdot 10^7`,
                hintLatex: [`Multiply coefficients, add exponents`],
            });
        }
        return quests;
    }

    return [];
}

export default function S205Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].sm2_05;

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

    const {
        difficulty, stage, inputs, lastCheck, currentQuest,
        successRate,
        setInputs, verify, next, handleDifficultyChange, handleStageChange,
    } = useQuestManager<S205Quest, Stage>({
        buildPool,
        initialStage: "RULES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm2-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SM2.05"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "RULES", label: t.stages.rules },
                { id: "NEGATIVE", label: t.stages.negative },
                { id: "SCIENTIFIC", label: t.stages.scientific },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            successRate={successRate}
            checkStatus={lastCheck}
            translations={{
                back: t.back, check: t.check, next: t.next, correct: t.correct, incorrect: t.incorrect,
                ready: t.ready, monitor_title: t.monitor_title,
                difficulty: { basic: t.difficulty.basic, core: t.difficulty.core, advanced: t.difficulty.advanced, elite: t.difficulty.elite },
            }}
            monitorContent={
                <div className="w-full flex justify-center">
                    <S205_PowerCanvas visual={currentQuest?.visual} />
                </div>
            }
        >
            <div className="space-y-12">
                <div className="text-center group">
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-black mb-4 group-hover:text-neon-purple transition-colors">
                        {t.objective_title}
                    </div>
                    <div className="text-3xl text-white font-black italic whitespace-normal break-words leading-tight">
                        {(() => {
                            const latex = currentQuest?.promptLatex || "";
                            if (latex.includes("\\text{")) {
                                return <span className="font-sans not-italic whitespace-pre-wrap">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ")}</span>;
                            }
                            return <InlineMath math={latex} />;
                        })()}
                    </div>
                    <div className="mt-8 p-8 bg-white/[0.03] border border-white/10 rounded-2xl inline-block backdrop-blur-sm shadow-2xl">
                        <div className="text-5xl text-white font-black tracking-widest">
                            <InlineMath math={currentQuest?.expressionLatex || ""} />
                        </div>
                        <div className="mt-4 text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase">
                            Target_Pattern: <InlineMath math={currentQuest?.targetLatex || ""} />
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/50" />
                                    <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                        Input_Param: <InlineMath math={slot.labelLatex} />
                                    </div>
                                </div>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                    placeholder={slot.placeholder}
                                    className="w-full bg-black/60 border-2 border-white/10 p-6 text-center outline-none focus:border-neon-purple text-white font-black text-4xl rounded-2xl transition-all focus:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decoder Visual Overlay */}
                <div className="flex justify-center gap-8 opacity-20 group pointer-events-none">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20 self-center" />
                    <div className="text-[8px] font-mono text-white tracking-[0.6em] uppercase">
                        Quantum_Scaling_Active...
                    </div>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20 self-center" />
                </div>
            </div>
        </ChamberLayout>
    );
}
