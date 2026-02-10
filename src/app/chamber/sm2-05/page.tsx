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

    // Helper to get base string based on difficulty
    const getBase = (n: number | string) => {
        if (isBasic) return String(n); // "2"
        if (isCore) return "x";
        if (isAdv) return "a";
        return "y";
    };

    if (stage === "RULES") {
        const quests: S205Quest[] = [];

        // 1. Multiply Rule: a^m * a^n = a^(m+n)
        const baseMult = isBasic ? 2 : (isCore ? "x" : (isAdv ? "a" : "y"));
        const m1 = isBasic ? 2 : 3;
        const n1 = isBasic ? 3 : 4;
        const sum1 = m1 + n1;

        quests.push({
            id: "R1", difficulty, stage,
            promptLatex: t.stages.rules_prompt_latex,
            expressionLatex: isBasic ? `${baseMult}^${m1} \\cdot ${baseMult}^${n1}` : `${baseMult}^${m1} \\cdot ${baseMult}^${n1}`,
            targetLatex: `${baseMult}^k`,
            visual: { mode: 'MULTIPLY', base: baseMult, m: m1, n: n1 },
            slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: sum1 }],
            correctLatex: `${baseMult}^{${sum1}}`,
            hintLatex: [`a^m \\cdot a^n = a^{m+n}`, `${baseMult}^{${m1}+${n1}}`],
        });

        // 2. Divide Rule: a^m / a^n = a^(m-n)
        const baseDiv = isBasic ? 3 : (isCore ? "y" : "b");
        const m2 = isBasic ? 5 : 6;
        const n2 = isBasic ? 2 : 3;
        const diff2 = m2 - n2;

        quests.push({
            id: "R2", difficulty, stage,
            promptLatex: t.stages.rules_prompt_latex,
            expressionLatex: `${baseDiv}^${m2} \\div ${baseDiv}^${n2}`,
            targetLatex: `${baseDiv}^k`,
            visual: { mode: 'DIVIDE', base: baseDiv, m: m2, n: n2 },
            slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: diff2 }],
            correctLatex: `${baseDiv}^{${diff2}}`,
            hintLatex: [`a^m \\div a^n = a^{m-n}`, `${baseDiv}^{${m2}-${n2}}`],
        });

        // 3. Power Rule: (a^m)^n = a^(m*n)
        const basePow = isBasic ? 2 : (isCore ? "z" : "c");
        const m3 = isBasic ? 2 : 3;
        const n3 = isBasic ? 3 : 2;
        const prod3 = m3 * n3;

        quests.push({
            id: "R3", difficulty, stage,
            promptLatex: t.stages.rules_prompt_latex,
            expressionLatex: `(${basePow}^${m3})^${n3}`,
            targetLatex: `${basePow}^k`,
            visual: { mode: 'POWER', base: basePow, m: m3, n: n3 },
            slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: prod3 }],
            correctLatex: `${basePow}^{${prod3}}`,
            hintLatex: [`(a^m)^n = a^{m \\cdot n}`, `${basePow}^{${m3}\\cdot${n3}}`],
        });

        return quests;
    }

    if (stage === "NEGATIVE") {
        const base = isBasic ? 5 : (isCore ? "x" : "a");
        const exp = isBasic ? 2 : 3;
        const val = Math.pow(Number(base), exp); // Only for basic

        return [
            {
                id: "N1", difficulty, stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: isBasic ? `${base}^{-${exp}}` : `${base}^{-${exp}}`,
                targetLatex: isBasic ? `\\frac{1}{${val}}` : `\\frac{1}{${base}^n}`,
                visual: { mode: 'NEGATIVE', base: base, m: 1, n: exp },
                slots: [{ id: "n", labelLatex: "n", placeholder: "?", expected: isBasic ? val : exp }],
                correctLatex: `\\frac{1}{${base}^${exp}}`,
                hintLatex: [`a^{-n} = \\frac{1}{a^n}`],
            }
        ];
    }

    if (stage === "SCIENTIFIC") {
        const m = 4.2;
        const n = 3;
        return [
            {
                id: "S1", difficulty, stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `4200`,
                targetLatex: `4.2 \\cdot 10^n`,
                visual: { mode: 'SCIENTIFIC', base: 10, m: 4.2, n: 3 },
                slots: [{ id: "n", labelLatex: "n", placeholder: "n", expected: 3 }],
                correctLatex: `4.2 \\cdot 10^3`,
                hintLatex: [`Move decimal 3 places left`],
            }
        ];
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
                    <p className="text-3xl text-white font-black italic whitespace-normal break-words">
                        {(() => {
                            const latex = currentQuest?.promptLatex || "";
                            if (latex.includes("\\text{")) {
                                return <span className="font-sans not-italic whitespace-pre-wrap">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ")}</span>;
                            }
                            return <InlineMath math={latex} />;
                        })()}
                    </p>
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
