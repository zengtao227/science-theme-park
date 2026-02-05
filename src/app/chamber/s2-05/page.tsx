"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S205_PowerCanvas, { type PowerVisual } from "@/components/chamber/s2-05/PowerCanvas";

type Stage = "RULES" | "NEGATIVE" | "SCIENTIFIC";
type S205T = typeof translations.EN.s2_05;

interface S205Quest extends Quest {
    stage: Stage;
    visual: PowerVisual;
}

function buildStagePool(t: S205T, difficulty: Difficulty, stage: Stage): S205Quest[] {
    if (stage === "RULES") {
        return [
            {
                id: "R1", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `2^3\\cdot 2^4`,
                targetLatex: `2^n`,
                visual: { base: 2, exponent: 3, mode: 'dimension' },
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 7 }],
                correctLatex: `2^7`,
                hintLatex: [`a^m\\cdot a^n=a^{m+n}`, `2^{3+4}=2^7`],
            },
            {
                id: "R2", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `3^5\\div 3^2`,
                targetLatex: `3^n`,
                visual: { base: 3, exponent: 2, mode: 'dimension' },
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 3 }],
                correctLatex: `3^3`,
                hintLatex: [`a^m\\div a^n=a^{m-n}`, `3^{5-2}=3^3`],
            },
            {
                id: "R3", difficulty, stage,
                promptLatex: t.stages.rules_prompt_latex,
                expressionLatex: `(2^2)^3`,
                targetLatex: `2^n`,
                visual: { base: 2, exponent: 3, mode: 'dimension' },
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 6 }],
                correctLatex: `2^6`,
                hintLatex: [`(a^m)^n=a^{m\\cdot n}`, `2^{2\\cdot 3}=2^6`],
            }
        ];
    }
    if (stage === "NEGATIVE") {
        return [
            {
                id: "N1", difficulty, stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `5^{-2}`,
                targetLatex: `\\frac{1}{x}`,
                visual: { base: 5, exponent: -2, mode: 'growth' },
                slots: [{ id: "x", labelLatex: `x`, placeholder: "val", expected: 25 }],
                correctLatex: `5^{-2} = \\frac{1}{5^2} = \\frac{1}{25}`,
                hintLatex: [`a^{-n} = \\frac{1}{a^n}`, `\\frac{1}{5^2} = \\frac{1}{25}`],
            },
            {
                id: "N2", difficulty, stage,
                promptLatex: t.stages.negative_prompt_latex,
                expressionLatex: `\\left(\\frac{1}{2}\\right)^{-3}`,
                targetLatex: `x`,
                visual: { base: 2, exponent: 3, mode: 'growth' },
                slots: [{ id: "x", labelLatex: `x`, placeholder: "val", expected: 8 }],
                correctLatex: `\\left(\\frac{1}{2}\\right)^{-3} = 2^3 = 8`,
                hintLatex: [`(\\frac{1}{a})^{-n} = a^n`, `2^3 = 8`],
            }
        ];
    }
    if (stage === "SCIENTIFIC") {
        return [
            {
                id: "S1", difficulty, stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `4200`,
                targetLatex: `4.2 \\cdot 10^n`,
                visual: { base: 10, exponent: 3, mode: 'growth' },
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: 3 }],
                correctLatex: `4.2 \\cdot 10^3`,
                hintLatex: [`4.200 = 4.2 \\cdot 10^3`],
            },
            {
                id: "S2", difficulty, stage,
                promptLatex: t.stages.scientific_prompt_latex,
                expressionLatex: `0.015`,
                targetLatex: `1.5 \\cdot 10^n`,
                visual: { base: 10, exponent: -2, mode: 'growth' },
                slots: [{ id: "n", labelLatex: `n`, placeholder: "n", expected: -2 }],
                correctLatex: `1.5 \\cdot 10^{-2}`,
                hintLatex: [`0.015 = 1.5 \\cdot 10^{-2}`],
            }
        ];
    }
    return [];
}

export default function S205Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].s2_05;

    const {
        difficulty, stage, inputs, lastCheck, currentQuest,
        setInputs, verify, next, handleDifficultyChange, handleStageChange,
    } = useQuestManager<S205Quest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "RULES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("s2-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="S2.05"
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
                    <p className="text-3xl text-white font-black italic">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
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

