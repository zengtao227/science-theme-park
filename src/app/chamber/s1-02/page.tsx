"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S102_StatisticsCanvas from "@/components/chamber/s1-02/StatisticsCanvas";

type Stage = "STATISTICS" | "PROBABILITY" | "COMBINATORICS";
type Mg13T = typeof translations.EN.s1_02;

interface S102Quest extends Quest {
    stage: Stage;
}

function buildStagePool(t: Mg13T, difficulty: Difficulty, stage: Stage): S102Quest[] {
    if (stage === "STATISTICS") {
        const all: S102Quest[] = [
            {
                id: "S1", difficulty, stage,
                promptLatex: t.stages.statistics_prompt_latex,
                expressionLatex: `\\text{Data: }2,4,6,8,10`,
                targetLatex: `\\text{Mean},\\; \\text{Median}`,
                slots: [
                    { id: "mean", labelLatex: `\\text{Mean}`, placeholder: "mean", expected: 6 },
                    { id: "median", labelLatex: `\\text{Median}`, placeholder: "median", expected: 6 },
                ],
                correctLatex: `\\text{Mean}=6,\\; \\text{Median}=6`,
                hintLatex: [`\\text{Mean}=\\frac{2+4+6+8+10}{5}=6`, `\\text{Median}=6`],
            },
            {
                id: "S2", difficulty, stage,
                promptLatex: t.stages.statistics_prompt_latex,
                expressionLatex: `\\text{Data: }3,5,7,9,11,13`,
                targetLatex: `\\text{Mean},\\; \\text{Median}`,
                slots: [
                    { id: "mean", labelLatex: `\\text{Mean}`, placeholder: "mean", expected: 8 },
                    { id: "median", labelLatex: `\\text{Median}`, placeholder: "median", expected: 8 },
                ],
                correctLatex: `\\text{Mean}=8,\\; \\text{Median}=8`,
                hintLatex: [`\\text{Mean}=\\frac{3+5+7+9+11+13}{6}=8`, `\\text{Median}=\\frac{7+9}{2}=8`],
            },
            {
                id: "S3", difficulty, stage,
                promptLatex: `\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{Delays (min): }2,3,5,7,8`,
                targetLatex: `\\text{Mean},\\; \\text{Median}`,
                slots: [
                    { id: "mean", labelLatex: `\\text{Mean}`, placeholder: "mean", expected: 5 },
                    { id: "median", labelLatex: `\\text{Median}`, placeholder: "median", expected: 5 },
                ],
                correctLatex: `\\text{Mean}=5,\\; \\text{Median}=5`,
                hintLatex: [`\\text{Mean}=\\frac{2+3+5+7+8}{5}=5`, `\\text{Median}=5`],
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        return all;
    }

    if (stage === "PROBABILITY") {
        const all: S102Quest[] = [
            {
                id: "P1", difficulty, stage,
                promptLatex: t.stages.probability_prompt_latex,
                expressionLatex: `\\text{Coin flip: }P(\\text{Heads})`,
                targetLatex: `P`,
                slots: [{ id: "P", labelLatex: `P`, placeholder: "probability", expected: 0.5 }],
                correctLatex: `P=0.5`,
                hintLatex: [`P(\\text{Heads})=\\frac{1}{2}=0.5`],
            },
            {
                id: "P2", difficulty, stage,
                promptLatex: t.stages.probability_prompt_latex,
                expressionLatex: `\\text{Die roll: }P(\\text{Even})`,
                targetLatex: `P`,
                slots: [{ id: "P", labelLatex: `P`, placeholder: "probability", expected: 0.5 }],
                correctLatex: `P=0.5`,
                hintLatex: [`P(\\text{Even})=\\frac{3}{6}=0.5`],
            },
            {
                id: "P3", difficulty, stage,
                promptLatex: `\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{Tram arrives in 10 min, you arrive randomly in 30 min}`,
                targetLatex: `P`,
                slots: [{ id: "P", labelLatex: `P`, placeholder: "probability", expected: 1 / 3 }],
                correctLatex: `P\\approx 0.33`,
                hintLatex: [`P=\\frac{10}{30}\\approx 0.33`],
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        return all;
    }

    if (stage === "COMBINATORICS") {
        const all: S102Quest[] = [
            {
                id: "C1", difficulty, stage,
                promptLatex: t.stages.probability_prompt_latex, // Reuse probability prompt
                expressionLatex: `\\text{Choose 2 from 4: }\\binom{4}{2}`,
                targetLatex: `n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "count", expected: 6 }],
                correctLatex: `\\binom{4}{2}=6`,
                hintLatex: [`\\binom{4}{2}=\\frac{4!}{2!2!}=6`],
            },
            {
                id: "C2", difficulty, stage,
                promptLatex: t.stages.probability_prompt_latex,
                expressionLatex: `\\text{Choose 3 from 5: }\\binom{5}{3}`,
                targetLatex: `n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "count", expected: 10 }],
                correctLatex: `\\binom{5}{3}=10`,
                hintLatex: [`\\binom{5}{3}=\\frac{5!}{3!2!}=10`],
            },
            {
                id: "C3", difficulty, stage,
                promptLatex: `\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{Choose 2 toppings from 6: }\\binom{6}{2}`,
                targetLatex: `n`,
                slots: [{ id: "n", labelLatex: `n`, placeholder: "count", expected: 15 }],
                correctLatex: `\\binom{6}{2}=15`,
                hintLatex: [`\\binom{6}{2}=\\frac{6!}{2!4!}=15`],
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
        initialStage: "STATISTICS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("s1-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "STATISTICS", label: t.stages.statistics },
        { id: "PROBABILITY", label: t.stages.probability },
        { id: "COMBINATORICS", label: t.stages.combinatorics },
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
                    <S102_StatisticsCanvas
                        type={stage}
                        data={currentQuest?.expressionLatex.includes("Data:") ?
                            currentQuest.expressionLatex.split("Data:")[1].split(",").map(n => parseFloat(n)) : undefined}
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
                                    inputMode="text"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-[10px] text-white/40 font-mono italic text-center mt-6">
                    {currentLanguage === 'DE'
                        ? "Tipp: Gib das Resultat als Ganzzahl, Bruch (z.B. 1/3) oder auf 2 Dezimalstellen gerundet an."
                        : currentLanguage === 'CN'
                            ? "提示：输入整数、分数 (如 1/3) 或保留 2 位小数。"
                            : "Tip: Enter result as an integer, fraction (e.g. 1/3) or rounded to 2 decimal places."
                    }
                </div>

            </div>
        </ChamberLayout>
    );
}
