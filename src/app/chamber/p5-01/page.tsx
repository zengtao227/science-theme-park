"use client";

import { useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import P501NuclearCanvas from "@/components/chamber/p5-01/NuclearCanvas";

type Stage = "ALPHA" | "BETA" | "GAMMA" | "FISSION";
type P501T = typeof translations.EN.p5_01;

interface P501Quest extends Quest {
    stage: Stage;
    initialElement: { name: string; symbol: string; A: number; Z: number };
    particle?: { name: string; symbol: string; A: number; Z: number };
    resultElement?: { name: string; symbol: string; A: number; Z: number };
}

function buildStagePool(t: P501T, difficulty: Difficulty, stage: Stage): P501Quest[] {
    if (stage === "ALPHA") {
        return [
            {
                id: "A1", difficulty, stage,
                initialElement: { name: "Uranium-238", symbol: "U", A: 238, Z: 92 },
                particle: { name: "Alpha", symbol: "\\alpha", A: 4, Z: 2 },
                resultElement: { name: "Thorium-234", symbol: "Th", A: 234, Z: 90 },
                promptLatex: `\\text{${t.stages.alpha_decay_prompt_latex}}`,
                expressionLatex: `{}^{238}_{92}\\text{U} \\rightarrow {}^{A}_{Z}\\text{X} + {}^{4}_{2}\\alpha`,
                targetLatex: `A, Z`,
                slots: [
                    { id: "A", labelLatex: "A", placeholder: "mass", expected: 234 },
                    { id: "Z", labelLatex: "Z", placeholder: "atomic", expected: 90 }
                ],
                correctLatex: `{}^{238}_{92}\\text{U} \\rightarrow {}^{234}_{90}\\text{Th} + {}^{4}_{2}\\alpha`
            },
            {
                id: "A2", difficulty, stage,
                initialElement: { name: "Radium-226", symbol: "Ra", A: 226, Z: 88 },
                particle: { name: "Alpha", symbol: "\\alpha", A: 4, Z: 2 },
                resultElement: { name: "Radon-222", symbol: "Rn", A: 222, Z: 86 },
                promptLatex: `\\text{${t.stages.alpha_decay_prompt_latex}}`,
                expressionLatex: `{}^{226}_{88}\\text{Ra} \\rightarrow {}^{A}_{Z}\\text{X} + {}^{4}_{2}\\alpha`,
                targetLatex: `A, Z`,
                slots: [
                    { id: "A", labelLatex: "A", placeholder: "mass", expected: 222 },
                    { id: "Z", labelLatex: "Z", placeholder: "atomic", expected: 86 }
                ],
                correctLatex: `{}^{226}_{88}\\text{Ra} \\rightarrow {}^{222}_{86}\\text{Rn} + {}^{4}_{2}\\alpha`
            }
        ];
    }

    if (stage === "BETA") {
        return [
            {
                id: "B1", difficulty, stage,
                initialElement: { name: "Carbon-14", symbol: "C", A: 14, Z: 6 },
                particle: { name: "Beta", symbol: "\\beta^-", A: 0, Z: -1 },
                resultElement: { name: "Nitrogen-14", symbol: "N", A: 14, Z: 7 },
                promptLatex: `\\text{${t.stages.beta_decay_prompt_latex}}`,
                expressionLatex: `{}^{14}_{6}\\text{C} \\rightarrow {}^{A}_{Z}\\text{X} + {}^{0}_{-1}\\beta^-`,
                targetLatex: `A, Z`,
                slots: [
                    { id: "A", labelLatex: "A", placeholder: "mass", expected: 14 },
                    { id: "Z", labelLatex: "Z", placeholder: "atomic", expected: 7 }
                ],
                correctLatex: `{}^{14}_{6}\\text{C} \\rightarrow {}^{14}_{7}\\text{N} + {}^{0}_{-1}\\beta^-`
            },
            {
                id: "B2", difficulty, stage,
                initialElement: { name: "Cesium-137", symbol: "Cs", A: 137, Z: 55 },
                particle: { name: "Beta", symbol: "\\beta^-", A: 0, Z: -1 },
                resultElement: { name: "Barium-137", symbol: "Ba", A: 137, Z: 56 },
                promptLatex: `\\text{${t.stages.beta_decay_prompt_latex}}`,
                expressionLatex: `{}^{137}_{55}\\text{Cs} \\rightarrow {}^{A}_{Z}\\text{X} + {}^{0}_{-1}\\beta^-`,
                targetLatex: `A, Z`,
                slots: [
                    { id: "A", labelLatex: "A", placeholder: "mass", expected: 137 },
                    { id: "Z", labelLatex: "Z", placeholder: "atomic", expected: 56 }
                ],
                correctLatex: `{}^{137}_{55}\\text{Cs} \\rightarrow {}^{137}_{56}\\text{Ba} + {}^{0}_{-1}\\beta^-`
            }
        ];
    }

    if (stage === "FISSION") {
        return [
            {
                id: "F1", difficulty, stage,
                initialElement: { name: "Uranium-235", symbol: "U", A: 235, Z: 92 },
                promptLatex: `\\text{${t.stages.fission_prompt_latex}}`,
                expressionLatex: `{}^{1}_{0}\\text{n} + {}^{235}_{92}\\text{U} \\rightarrow {}^{141}_{56}\\text{Ba} + {}^{A}_{Z}\\text{Kr} + 3{}^{1}_{0}\\text{n}`,
                targetLatex: `A, Z`,
                slots: [
                    { id: "A", labelLatex: "A", placeholder: "mass", expected: 92 },
                    { id: "Z", labelLatex: "Z", placeholder: "atomic", expected: 36 }
                ],
                correctLatex: `{}^{1}_{0}\\text{n} + {}^{235}_{92}\\text{U} \\rightarrow {}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + 3{}^{1}_{0}\\text{n}`
            }
        ];
    }

    return [];
}

export default function P501Page() {
    const { currentLanguage, completeStage } = useAppStore();

    const t = translations[currentLanguage].p5_01;

    const {
        difficulty, stage, inputs, lastCheck, currentQuest,
        setInputs, verify, next, handleDifficultyChange, handleStageChange,
    } = useQuestManager<P501Quest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "ALPHA",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("p5-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="P5.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "ALPHA", label: t.stages.alpha_decay },
                { id: "BETA", label: t.stages.beta_decay },
                { id: "GAMMA", label: t.stages.gamma_decay },
                { id: "FISSION", label: t.stages.fission },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            translations={{
                back: t.back,
                check: t.check,
                next: t.next,
                correct: t.correct,
                incorrect: t.incorrect,
                ready: t.ready,
                monitor_title: t.monitor_title,
                difficulty: {
                    basic: t.difficulty.basic,
                    core: t.difficulty.core,
                    advanced: t.difficulty.advanced,
                    elite: t.difficulty.elite,
                }
            }}
            monitorContent={
                <P501NuclearCanvas
                    quest={currentQuest}
                    lastCheck={lastCheck}
                />
            }
        >
            <div className="space-y-10">
                <div className="text-center space-y-4">
                    <h3 className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
                    <p className="text-base text-white/60 font-mono max-w-xl mx-auto">{t.mission.description}</p>
                </div>

                <div className="text-center bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black mb-6">{t.objective_title}</h3>
                    <div className="text-3xl font-black text-white italic drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <div className="text-5xl font-mono text-white tracking-widest bg-black/40 px-10 py-8 border border-white/10 rounded-2xl shadow-inner">
                        <InlineMath math={currentQuest?.expressionLatex || ""} />
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="space-y-3">
                                <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold block text-center">
                                    {slot.labelLatex}
                                </label>
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs(prev => ({ ...prev, [slot.id]: e.target.value }))}
                                    className="w-full bg-black/60 border-2 border-white/10 p-5 text-center text-3xl font-black text-neon-cyan focus:border-neon-cyan/50 focus:bg-neon-cyan/5 outline-none transition-all rounded-xl"
                                    placeholder={slot.placeholder}
                                    autoFocus={slot.id === 'A'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
