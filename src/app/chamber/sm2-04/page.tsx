"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S204_SimilarityCanvas, { SimilarityVisual } from "@/components/chamber/sm2-04/SimilarityCanvas";

type Stage = "SCALE_FACTOR" | "SIMILAR_TRIANGLES" | "MISSION";
type Mg08T = typeof translations.EN.sm2_04;

interface S204Quest extends Quest {
    stage: Stage;
    visual?: SimilarityVisual;
}

function buildStagePool(t: Mg08T, difficulty: Difficulty, stage: Stage): S204Quest[] {
    if (stage === "SCALE_FACTOR") {
        const all: S204Quest[] = [
            {
                id: "S1", difficulty, stage,
                promptLatex: t.stages.stages_prompt_latex,
                expressionLatex: `\\text{Old}=4,\\; k=\\frac{3}{2}`,
                targetLatex: `\\text{New}`,
                slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 6 }],
                correctLatex: `\\text{New}=4\\cdot \\frac{3}{2}=6`,
                hintLatex: [t.hints.rules.scale_factor_latex, `\\text{New}=k\\cdot \\text{Old}`, `6`],
                visual: { kind: "rect-scale", a: 4, b: 2, k: 1.5 },
            },
            {
                id: "S2", difficulty, stage,
                promptLatex: t.stages.stages_prompt_latex,
                expressionLatex: `\\text{Old}=8,\\; \\text{New}=12`,
                targetLatex: `k`,
                slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 1.5 }],
                correctLatex: `k=\\frac{12}{8}=\\frac{3}{2}=1.5`,
                hintLatex: [t.hints.rules.scale_factor_latex, `k=\\frac{\\text{New}}{\\text{Old}}`, `k=\\frac{3}{2}`],
                visual: { kind: "rect-scale", a: 8, b: 3, k: 1.5 },
            },
            {
                id: "S3", difficulty, stage,
                promptLatex: t.stages.stages_prompt_latex,
                expressionLatex: `\\text{Old}=5,\\; k=0.8`,
                targetLatex: `\\text{New}`,
                slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 4 }],
                correctLatex: `\\text{New}=5\\cdot 0.8=4`,
                hintLatex: [`\\text{Multiply by }k.`, `4`],
                visual: { kind: "rect-scale", a: 5, b: 2, k: 0.8 },
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 1);
        if (difficulty === "CORE") return all.slice(0, 2);
        return all;
    }

    if (stage === "SIMILAR_TRIANGLES") {
        const all: S204Quest[] = [
            {
                id: "T1", difficulty, stage,
                promptLatex: t.stages.stages_prompt_latex,
                expressionLatex: `\\frac{6}{3}=\\frac{x}{4}=\\frac{10}{5}`,
                targetLatex: `x`,
                slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 8 }],
                correctLatex: `k=2\\Rightarrow x=2\\cdot 4=8`,
                hintLatex: [t.hints.rules.proportional_latex, t.hints.rules.cross_multiply_latex, `x=8`],
                visual: { kind: "tri-sim", a: 4, b: 8, k: 2 },
            },
            {
                id: "T2", difficulty, stage,
                promptLatex: t.stages.stages_prompt_latex,
                expressionLatex: `\\frac{15}{5}=\\frac{x}{7}`,
                targetLatex: `x`,
                slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 21 }],
                correctLatex: `x=7\\cdot 3=21`,
                hintLatex: [t.hints.rules.proportional_latex, `\\frac{15}{5}=3`, `x=21`],
                visual: { kind: "tri-sim", a: 7, b: 21, k: 3 },
            },
        ];
        const seed = difficulty === "BASIC" ? 2 : difficulty === "CORE" ? 3 : difficulty === "ADVANCED" ? 4 : 5;
        const a = 3 * seed;
        const b = 2 * seed;
        all.push({
            id: `T3-${seed}`, difficulty, stage,
            promptLatex: t.stages.stages_prompt_latex,
            expressionLatex: `\\frac{${a}}{${b}}=\\frac{x}{${4 * seed}}`,
            targetLatex: `x`,
            slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 6 * seed }],
            correctLatex: `x=${6 * seed}`,
            hintLatex: [t.hints.rules.proportional_latex, t.hints.rules.cross_multiply_latex],
            visual: { kind: "tri-sim", a: 4 * seed, b: 6 * seed, k: 3 / 2 },
        });
        all.push({
            id: `T4-${seed}`, difficulty, stage,
            promptLatex: t.stages.stages_prompt_latex,
            expressionLatex: `\\frac{${5 * seed}}{${4 * seed}}=\\frac{y}{${8 * seed}}`,
            targetLatex: `y`,
            slots: [{ id: "y", labelLatex: `y`, placeholder: "y", expected: 10 * seed }],
            correctLatex: `y=${10 * seed}`,
            hintLatex: [t.hints.rules.proportional_latex],
            visual: { kind: "tri-sim", a: 8 * seed, b: 10 * seed, k: 5 / 4 },
        });

        if (difficulty === "BASIC") return all.slice(0, 1);
        if (difficulty === "CORE") return all.slice(0, 3);
        return all;
    }

    if (stage === "MISSION") {
        const all: S204Quest[] = [
            {
                id: "M1", difficulty, stage,
                promptLatex: `\\text{${t.mission?.protocol}}\\\\\\text{${t.mission?.tower_title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{Tower Shadow}=12\\text{ m},\\; \\text{Stick}(1.5\\text{ m})\\text{ Shadow}=2.4\\text{ m}`,
                targetLatex: `\\text{Tower Height}(H)`,
                slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 7.5 }],
                correctLatex: `\\frac{H}{12}=\\frac{1.5}{2.4}\\Rightarrow H=7.5`,
                hintLatex: [t.hints.rules.proportional_latex, `\\frac{H}{12}=0.625`, `H=7.5`],
                visual: { kind: "shadow", a: 7.5, b: 12, k: 0.625 },
            },
        ];
        const ringSet = difficulty === "BASIC" ? [6, 7] : difficulty === "CORE" ? [8, 9] : difficulty === "ADVANCED" ? [10, 12] : [12, 14];
        ringSet.forEach((ringR, idx) => {
            const ringL = Number((ringR * 1.6).toFixed(1));
            const ringD = Math.sqrt(ringR * ringR - (ringL / 2) * (ringL / 2));
            const ringW = Number((ringR - ringD).toFixed(2));
            all.push({
                id: `M2-${idx}`, difficulty, stage,
                promptLatex: `\\text{${t.mission?.protocol}}\\\\\\text{${t.mission?.ring_title}}\\\\\\text{${t.mission?.ring_desc}}`,
                expressionLatex: `R=${ringR}\\text{ cm},\\; L=${ringL}\\text{ cm}`,
                targetLatex: `w`,
                slots: [{ id: `w-${idx}`, labelLatex: `w`, placeholder: "width", expected: ringW }],
                correctLatex: `w=${ringW}\\text{ cm}`,
                hintLatex: [`d=\\sqrt{R^2-(\\frac{L}{2})^2}`, `w=R-d`],
                visual: { kind: "ring", a: ringW, b: ringR, r: ringR, l: ringL },
            });
        });
        return all;
    }

    return [];
}

export default function S204Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].sm2_04;

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        successRate,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<S204Quest, Stage>({
        buildPool,
        initialStage: "SCALE_FACTOR",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm2-04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "SCALE_FACTOR", label: t.stages.scale_factor },
        { id: "SIMILAR_TRIANGLES", label: t.stages.similar_triangles },
        { id: "MISSION", label: t.mission?.title || t.stages.application },
    ];

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SM2.04"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            successRate={successRate}
            footerLeft={t.footer_left}
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
                },
            }}
            monitorContent={
                <>
                    <S204_SimilarityCanvas
                        visual={currentQuest.visual}
                        labels={{
                            tower: t.mission?.labels?.tower,
                            tower_shadow: t.mission?.labels?.tower_shadow,
                            stick: t.mission?.labels?.stick,
                            stick_shadow: t.mission?.labels?.stick_shadow,
                        }}
                    />

                    <div className="space-y-4">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                            {t.target_title}
                        </div>
                        <div className="text-white font-black text-xl overflow-x-auto max-w-full py-1 whitespace-nowrap">
                            <span className="inline-block">
                                <InlineMath math={currentQuest.expressionLatex} />
                            </span>
                        </div>
                        <div className="text-white/70 font-mono text-sm break-words">
                            <InlineMath math={currentQuest.promptLatex} />
                        </div>
                        {currentQuest.hintLatex && currentQuest.hintLatex.length > 0 && (
                            <div className="space-y-2 text-white/50 font-black text-[10px] uppercase tracking-[0.25em]">
                                <div className="text-white/40">{t.labels.hints}</div>
                                {currentQuest.hintLatex.slice(0, 3).map((h, idx) => (
                                    <div key={`${currentQuest.id}|h|${idx}`} className="flex gap-2 items-start">
                                        <div className="text-white/30 w-6">{String(idx + 1).padStart(2, "0")}</div>
                                        <div className="flex-1">
                                            <InlineMath math={h} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">
                            {difficulty}{" // "}S2.04{" // "}{stages.find(s => s.id === stage)?.label}
                        </div>
                    </div>
                </>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
                        {t.objective_title}
                    </h3>
                    <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic whitespace-normal break-words">
                        {(() => {
                            const latex = currentQuest.promptLatex;
                            if (latex.includes("\\text{")) {
                                return <span className="font-sans not-italic whitespace-pre-wrap">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n")}</span>;
                            }
                            return <InlineMath math={latex} />;
                        })()}
                    </p>
                </div>

                <div className="flex justify-center overflow-x-auto w-full">
                    <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                        <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
                            {t.target_title}
                        </span>
                        <div className="space-y-4">
                            <div className="text-white font-black text-[clamp(1.2rem,3.8vw,3.3rem)] leading-[1.2] whitespace-normal break-words">
                                <InlineMath math={currentQuest.expressionLatex} />
                            </div>
                            <div className="text-white/60 font-black">
                                <InlineMath math={currentQuest.targetLatex} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                <div className="space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                        {t.labels.input}
                    </div>
                    <div className={clsx("grid gap-4", currentQuest.slots.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="space-y-2">
                                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                    <InlineMath math={slot.labelLatex} />
                                </div>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                    className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                                    placeholder={slot.placeholder}
                                    inputMode="numeric"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </ChamberLayout>
    );
}
