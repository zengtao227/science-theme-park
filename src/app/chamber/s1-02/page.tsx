"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TesseractCanvas from "@/components/chamber/s1-02/TesseractCanvas";

type Stage = "PROJECTION" | "ROTATION" | "UNFOLD";
type Mg13T = typeof translations.EN.s1_02;

interface S102Quest extends Quest {
    stage: Stage;
    unfoldProgress?: number;
}

function buildStagePool(t: Mg13T, difficulty: Difficulty, stage: Stage): S102Quest[] {
    if (stage === "PROJECTION") {
        const all: S102Quest[] = [
            {
                id: "P1", difficulty, stage,
                promptLatex: t.stages.projection_prompt_latex,
                expressionLatex: `\\text{4D Point: }(1,1,1,0)`,
                targetLatex: `\\text{3D Projection: }(x,y,z)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 1 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 1 },
                    { id: "z", labelLatex: `z`, placeholder: "z", expected: 1 },
                ],
                correctLatex: `(1,1,1)`,
                hintLatex: [`\\text{When }w=0\\text{, projection is }(x,y,z)`, `\\text{Factor}=\\frac{d}{d-w}=1`],
                unfoldProgress: 0,
            },
            {
                id: "P2", difficulty, stage,
                promptLatex: t.stages.projection_prompt_latex,
                expressionLatex: `\\text{4D Point: }(2,0,0,1)`,
                targetLatex: `\\text{3D Projection: }(x,y,z)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 3 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 0 },
                    { id: "z", labelLatex: `z`, placeholder: "z", expected: 0 },
                ],
                correctLatex: `(3,0,0)`,
                hintLatex: [`\\text{Factor}=\\frac{3}{3-1}=1.5`, `x'=2\\times 1.5=3`],
                unfoldProgress: 0,
            },
            {
                id: "P3", difficulty, stage,
                promptLatex: `\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{4D Point: }(1,1,0,0.5)`,
                targetLatex: `\\text{3D Projection: }(x,y,z)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 1.2 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 1.2 },
                    { id: "z", labelLatex: `z`, placeholder: "z", expected: 0 },
                ],
                correctLatex: `(1.2,1.2,0)`,
                hintLatex: [`\\text{Factor}=\\frac{3}{3-0.5}=1.2`, `x'=1\\times 1.2=1.2`],
                unfoldProgress: 0,
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        return all;
    }

    if (stage === "ROTATION") {
        const all: S102Quest[] = [
            {
                id: "R1", difficulty, stage,
                promptLatex: t.stages.rotation_prompt_latex,
                expressionLatex: `\\text{Rotate }(1,0,0,0)\\text{ by }90^\\circ\\text{ in XY plane}`,
                targetLatex: `\\text{Result: }(x,y,z,w)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 0 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 1 },
                    { id: "z", labelLatex: `z`, placeholder: "z", expected: 0 },
                    { id: "w", labelLatex: `w`, placeholder: "w", expected: 0 },
                ],
                correctLatex: `(0,1,0,0)`,
                hintLatex: [`\\text{XY rotation: }x'=x\\cos\\theta-y\\sin\\theta`, `y'=x\\sin\\theta+y\\cos\\theta`],
                unfoldProgress: 0,
            },
            {
                id: "R2", difficulty, stage,
                promptLatex: t.stages.rotation_prompt_latex,
                expressionLatex: `\\text{Rotate }(0,0,1,0)\\text{ by }90^\\circ\\text{ in ZW plane}`,
                targetLatex: `\\text{Result: }(x,y,z,w)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 0 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 0 },
                    { id: "z", labelLatex: `z`, placeholder: "z", expected: 0 },
                    { id: "w", labelLatex: `w`, placeholder: "w", expected: 1 },
                ],
                correctLatex: `(0,0,0,1)`,
                hintLatex: [`\\text{ZW rotation: }z'=z\\cos\\theta-w\\sin\\theta`, `w'=z\\sin\\theta+w\\cos\\theta`],
                unfoldProgress: 0,
            },
            {
                id: "R3", difficulty, stage,
                promptLatex: `\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{Rotate }(1,1,0,0)\\text{ by }45^\\circ\\text{ in XY plane}`,
                targetLatex: `\\text{Result: }(x,y,z,w)`,
                slots: [
                    { id: "x", labelLatex: `x`, placeholder: "x", expected: 0 },
                    { id: "y", labelLatex: `y`, placeholder: "y", expected: 1.41 },
                    { id: "z", labelLatex: `z`, placeholder: "z", expected: 0 },
                    { id: "w", labelLatex: `w`, placeholder: "w", expected: 0 },
                ],
                correctLatex: `(0,\\sqrt{2},0,0)\\approx(0,1.41,0,0)`,
                hintLatex: [`\\cos 45^\\circ=\\sin 45^\\circ=\\frac{\\sqrt{2}}{2}`, `x'=1\\cdot\\frac{\\sqrt{2}}{2}-1\\cdot\\frac{\\sqrt{2}}{2}=0`],
                unfoldProgress: 0,
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        return all;
    }

    if (stage === "UNFOLD") {
        const all: S102Quest[] = [
            {
                id: "U1", difficulty, stage,
                promptLatex: t.stages.unfold_prompt_latex,
                expressionLatex: `\\text{Tesseract: }16\\text{ vertices, }32\\text{ edges}`,
                targetLatex: `\\text{How many 3D cells?}`,
                slots: [
                    { id: "cells", labelLatex: `\\text{Cells}`, placeholder: "cells", expected: 8 },
                ],
                correctLatex: `8\\text{ cells}`,
                hintLatex: [`\\text{A tesseract has 8 cubic cells}`, `\\text{Like a cube has 6 square faces}`],
                unfoldProgress: 0.3,
            },
            {
                id: "U2", difficulty, stage,
                promptLatex: t.stages.unfold_prompt_latex,
                expressionLatex: `\\text{Tesseract: }8\\text{ cells, }24\\text{ faces per cell}`,
                targetLatex: `\\text{Total faces?}`,
                slots: [
                    { id: "faces", labelLatex: `\\text{Faces}`, placeholder: "faces", expected: 24 },
                ],
                correctLatex: `24\\text{ faces}`,
                hintLatex: [`\\text{Each face is shared by 2 cells}`, `\\frac{8\\times 6}{2}=24`],
                unfoldProgress: 0.6,
            },
            {
                id: "U3", difficulty, stage,
                promptLatex: `\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{Tesseract edge length: }a`,
                targetLatex: `\\text{4D hypervolume?}`,
                slots: [
                    { id: "volume", labelLatex: `V_4`, placeholder: "volume", expected: "a^4" },
                ],
                correctLatex: `V_4=a^4`,
                hintLatex: [`\\text{1D: }a,\\;\\text{2D: }a^2,\\;\\text{3D: }a^3`, `\\text{4D: }a^4`],
                unfoldProgress: 1,
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        return all;
    }

    return [];
}

export default function S102Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].s1_02;

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<S102Quest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "PROJECTION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("s1-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "PROJECTION", label: t.stages.projection },
        { id: "ROTATION", label: t.stages.rotation },
        { id: "UNFOLD", label: t.stages.unfold },
    ];

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="S1.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
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
                    <TesseractCanvas
                        unfoldProgress={currentQuest.unfoldProgress || 0}
                        rotationSpeed={stage === "ROTATION" ? 1.5 : 1}
                    />
                    <div className="space-y-4 mt-4">
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
                            {difficulty}{" // "}S1.02{" // "}{t.stages[stage.toLowerCase() as keyof typeof t.stages]}
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
                    <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                        <InlineMath math={currentQuest.promptLatex} />
                    </p>
                </div>

                <div className="flex justify-center overflow-x-auto w-full">
                    <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                        <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
                            {t.target_title}
                        </span>
                        <div className="space-y-4">
                            <div className="text-white font-black text-[clamp(1.2rem,3.8vw,3.3rem)] leading-[0.95] whitespace-nowrap">
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
                    <div className={clsx("grid gap-4", currentQuest.slots.length <= 2 ? "grid-cols-2" : currentQuest.slots.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4")}>
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
                                    inputMode="text"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-[10px] text-white/40 font-mono italic text-center mt-6">
                    {currentLanguage === 'DE'
                        ? "Tipp: Gib das Resultat als Ganzzahl, Dezimalzahl (z.B. 1.41) oder algebraischen Ausdruck (z.B. a^4) an."
                        : currentLanguage === 'CN'
                            ? "提示：输入整数、小数 (如 1.41) 或代数表达式 (如 a^4)。"
                            : "Tip: Enter result as an integer, decimal (e.g. 1.41) or algebraic expression (e.g. a^4)."
                    }
                </div>

            </div>
        </ChamberLayout>
    );
}
