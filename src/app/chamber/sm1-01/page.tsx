"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ResizableLayout from "@/components/layout/ResizableLayout";
import S101_GeometryCanvas, { GeometryMeta } from "@/components/chamber/sm1-01/GeometryCanvas";

type Stage = "AREAS" | "VOLUMES" | "COMPLEX";
type Mg12T = typeof translations.EN.sm1_01;

interface S101Quest extends Quest {
    stage: Stage;
    visualMeta?: GeometryMeta;
}

function buildStagePool(t: Mg12T, difficulty: Difficulty, stage: Stage): S101Quest[] {
    if (stage === "AREAS") {
        const all: S101Quest[] = [
            {
                id: "A1", difficulty, stage,
                promptLatex: t.stages.areas_prompt_latex,
                expressionLatex: `\\text{Rectangle: }a=5,\\; b=8`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: 40, unit: "cm^2" }],
                correctLatex: `A=5\\cdot 8=40`,
                hintLatex: [`A=a\\cdot b`, `A=40`],
                visualMeta: { type: 'rectangle', params: { a: 5, b: 8 } },
            },
            {
                id: "A2", difficulty, stage,
                promptLatex: t.stages.areas_prompt_latex,
                expressionLatex: `\\text{Triangle: }b=6,\\; h=4`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: 12, unit: "cm^2" }],
                correctLatex: `A=\\frac{1}{2}\\cdot 6\\cdot 4=12`,
                hintLatex: [`A=\\frac{1}{2}bh`, `A=12`],
                visualMeta: { type: 'triangle', params: { b: 6, h: 4 } },
            },
            {
                id: "A3", difficulty, stage,
                promptLatex: t.stages.areas_prompt_latex,
                expressionLatex: `\\text{Trapezoid: }a=4,\\; b=6,\\; h=5`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: 25, unit: "cm^2" }],
                correctLatex: `A=\\frac{1}{2}(4+6)\\cdot 5=25`,
                hintLatex: [`A=\\frac{1}{2}(a+b)h`, `A=25`],
                visualMeta: { type: 'trapezoid', params: { a: 4, b: 6, h: 5 } },
            },
            {
                id: "A4", difficulty, stage,
                promptLatex: t.stages.areas_prompt_latex,
                expressionLatex: `\\text{Circle: }r=3`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: 28.27, unit: "cm^2" }],
                correctLatex: `A=\\pi r^2\\approx 28.27`,
                hintLatex: [`A=\\pi r^2`, `A\\approx 28.27`],
                visualMeta: { type: 'circle', params: { r: 3 } },
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        if (difficulty === "CORE") return all.slice(0, 3);
        return all;
    }

    if (stage === "VOLUMES") {
        const all: S101Quest[] = [
            {
                id: "V1", difficulty, stage,
                promptLatex: t.stages.volumes_prompt_latex,
                expressionLatex: `\\text{Cube: }a=4`,
                targetLatex: `V`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "volume", expected: 64, unit: "cm^3" }],
                correctLatex: `V=4^3=64`,
                hintLatex: [`V=a^3`, `V=64`],
                visualMeta: { type: 'cube', params: { a: 4 } },
            },
            {
                id: "V2", difficulty, stage,
                promptLatex: t.stages.volumes_prompt_latex,
                expressionLatex: `\\text{Rectangular Prism: }a=3,\\; b=4,\\; c=5`,
                targetLatex: `V`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "volume", expected: 60, unit: "cm^3" }],
                correctLatex: `V=3\\cdot 4\\cdot 5=60`,
                hintLatex: [`V=abc`, `V=60`],
                visualMeta: { type: 'prism', params: { a: 3, b: 4, c: 5 } },
            },
            {
                id: "V3", difficulty, stage,
                promptLatex: t.stages.volumes_prompt_latex,
                expressionLatex: `\\text{Cylinder: }r=2,\\; h=5`,
                targetLatex: `V`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "volume", expected: 62.83, unit: "cm^3" }],
                correctLatex: `V=\\pi r^2h\\approx 62.83`,
                hintLatex: [`V=\\pi r^2h`, `V\\approx 62.83`],
                visualMeta: { type: 'cylinder', params: { r: 2, h: 5 } },
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        return all;
    }

    if (stage === "COMPLEX") {
        const all: S101Quest[] = [
            {
                id: "C1", difficulty, stage,
                promptLatex: `\\text{${t.mission?.protocol}}\\\\\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{Trapezoid: }a=8,\\; b=12,\\; h=5`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: 50 }],
                correctLatex: `A=\\frac{1}{2}(8+12)\\cdot 5=50`,
                hintLatex: [`A=\\frac{1}{2}(a+b)h`, `A=50`],
                visualMeta: { type: 'trapezoid', params: { a: 8, b: 12, h: 5 } },
            },
            {
                id: "C2", difficulty, stage,
                promptLatex: `\\text{${t.mission?.protocol}}\\\\\\text{${t.mission?.cube_title}}\\\\\\text{${t.mission?.cube_desc}}`,
                expressionLatex: `\\text{Cube: }a=6`,
                targetLatex: `d`,
                slots: [{ id: "d", labelLatex: `d`, placeholder: "diagonal", expected: 10.39 }],
                correctLatex: `d=a\\sqrt{3}\\approx 10.39`,
                hintLatex: [`d=a\\sqrt{3}`, `d\\approx 10.39`],
                visualMeta: { type: 'cube', params: { a: 6 } },
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 1);
        return all;
    }

    return [];
}

export default function S101Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].sm1_01;

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
    } = useQuestManager<S101Quest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "AREAS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm1-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "AREAS", label: t.stages.areas },
        { id: "VOLUMES", label: t.stages.volumes },
        { id: "COMPLEX", label: t.stages.complex },
    ];

    const userAnswer = inputs['A'] || inputs['V'] || inputs['d'];
    const parsedAnswer = userAnswer ? parseFloat(userAnswer) : undefined;

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SM1.01"
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
                    <div className="relative w-full">
                        <S101_GeometryCanvas
                            geometry={currentQuest.visualMeta}
                            userAnswer={parsedAnswer}
                            isVolumeMode={stage === 'VOLUMES'}
                        />
                        <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 pointer-events-none">
                            REAL-TIME GEOMETRY
                        </div>
                    </div>

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
                            {difficulty}{" // "}S1.01{" // "}{t.stages[stage.toLowerCase() as keyof typeof t.stages]}
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
                    <div className={clsx("grid gap-4", currentQuest.slots.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="space-y-2">
                                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                    <InlineMath math={slot.labelLatex} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        value={inputs[slot.id] ?? ""}
                                        onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                        className="flex-1 bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                                        placeholder={slot.placeholder}
                                        inputMode="numeric"
                                    />
                                    {slot.unit && (
                                        <div className="text-xl font-black text-white/80 min-w-[50px]">
                                            <InlineMath math={slot.unit} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-[10px] text-white/40 font-mono italic text-center">
                    {currentLanguage === 'DE'
                        ? "Tipp: Gib das Resultat als Bruch (z.B. 4/3) oder auf 2 Dezimalstellen gerundet an."
                        : currentLanguage === 'CN'
                            ? "提示：输入分数 (如 4/3) 或保留 2 位小数。"
                            : "Tip: Enter result as a fraction (e.g. 4/3) or rounded to 2 decimal places."
                    }
                </div>

            </div>
        </ChamberLayout>
    );
}
