"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ResizableLayout from "@/components/layout/ResizableLayout";
import S101_GeometryCanvas, { GeometryMeta } from "@/components/chamber/sm1-01/GeometryCanvas";
import Cube3D from "@/components/chamber/sm1-01/Cube3D";

type Stage = "AREAS" | "VOLUMES" | "COMPLEX";
type Mg12T = typeof translations.EN.sm1_01;

interface S101Quest extends Quest {
    stage: Stage;
    visualMeta?: GeometryMeta;
}

function buildStagePool(t: Mg12T, difficulty: Difficulty, stage: Stage): S101Quest[] {
    const isBasic = difficulty === "BASIC";
    const isCore = difficulty === "CORE";
    const isAdvanced = difficulty === "ADVANCED";
    const isElite = difficulty === "ELITE";

    if (stage === "AREAS") {
        // --- A1: Rectangle (Ski Slope) ---
        let a1: number, b1: number, expr1: string, steps1: string;
        if (isBasic) {
            a1 = 5; b1 = 8;
            expr1 = `\\text{${t.labels.length} }a=${a1}\\text{m, }\\text{${t.labels.width} }b=${b1}\\text{m}`;
            steps1 = `A=${a1}\\cdot ${b1}=${a1 * b1}`;
        } else if (isCore) {
            b1 = 6; const diff = 4; a1 = b1 + diff;
            expr1 = `\\text{${t.quests.rect_core.replace("${w}", "6").replace("${diff}", "4")}}`;
            steps1 = `a=6+4=10 \\Rightarrow A=10\\cdot 6=60`;
        } else if (isAdvanced) {
            a1 = 20; b1 = a1 / 2;
            expr1 = `\\text{${t.quests.rect_advanced.replace("${l}", "20")}}`;
            steps1 = `b=20/2=10 \\Rightarrow A=20\\cdot 10=200`;
        } else { // ELITE
            const p = 40; const ratio = 3;
            // 2(w + 3w) = 40 => 8w = 40 => w = 5 => l = 15
            b1 = 5; a1 = 15;
            expr1 = `\\text{${t.quests.rect_elite.replace("${p}", "40").replace("${ratio}", "3")}}`;
            steps1 = `2(w + 3w)=40 \\Rightarrow 8w=40 \\Rightarrow w=5, l=15 \\Rightarrow A=5\\cdot 15=75`;
        }

        // --- A2: Triangle (Sail) ---
        let b2: number, h2: number, expr2: string;
        if (isBasic) {
            b2 = 6; h2 = 4;
            expr2 = `\\text{${t.labels.base} }b=${b2}\\text{m, }\\text{${t.labels.height} }h=${h2}\\text{m}`;
        } else if (isElite) {
            const c = 14.14; b2 = 10; h2 = 10;
            expr2 = `\\text{${t.quests.tri_elite.replace("${c}", "14.14")}}`;
        } else {
            b2 = 12; h2 = 6;
            expr2 = `\\text{${t.labels.base} }b=12\\text{m, }\\text{底边是高的2倍}`;
        }

        // --- A3: Trapezoid (Gate) ---
        const a3 = isElite ? 10 : 4;
        const b3 = isElite ? 20 : 6;
        const h3 = isElite ? 15 : 5;
        const expr3 = `\\text{${t.labels.side} }a=${a3}\\text{m, }\\text{${t.labels.base} }b=${b3}\\text{m, }\\text{${t.labels.height} }h=${h3}\\text{m}`;

        // --- A4: Circle (Cheese) ---
        let r4: number, expr4: string;
        if (isElite) {
            const circ = 31.42; r4 = 5;
            expr4 = `\\text{${t.quests.circle_elite.replace("${c}", "31.42")}}`;
        } else {
            r4 = isBasic ? 3 : 5;
            expr4 = `\\text{${t.labels.radius} }r=${r4}\\text{cm}`;
        }

        const all: S101Quest[] = [
            {
                id: "A1", difficulty, stage,
                promptLatex: `\\text{${t.quests.ski}}`,
                expressionLatex: `${expr1}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: a1 * b1, unit: "m^2" }],
                correctLatex: steps1,
                hintLatex: [`A=a\\cdot b`],
                visualMeta: { type: 'rectangle', params: { a: a1, b: b1 } },
            },
            {
                id: "A2", difficulty, stage,
                promptLatex: `\\text{${t.quests.sail}}`,
                expressionLatex: `${expr2}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: 0.5 * b2 * h2, unit: "m^2" }],
                correctLatex: `A=\\frac{1}{2}\\cdot ${b2}\\cdot ${h2}=${0.5 * b2 * h2}`,
                hintLatex: [`A=\\frac{1}{2}bh`],
                visualMeta: { type: 'triangle', params: { b: b2, h: h2 } },
            },
            {
                id: "A3", difficulty, stage,
                promptLatex: `\\text{${t.quests.gate}}`,
                expressionLatex: `${expr3}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: 0.5 * (a3 + b3) * h3, unit: "m^2" }],
                correctLatex: `A=\\frac{1}{2}(${a3}+${b3})\\cdot ${h3}=${0.5 * (a3 + b3) * h3}`,
                hintLatex: [`A=\\frac{1}{2}(a+b)h`],
                visualMeta: { type: 'trapezoid', params: { a: a3, b: b3, h: h3 } },
            },
            {
                id: "A4", difficulty, stage,
                promptLatex: `\\text{${t.quests.cheese}}`,
                expressionLatex: `${expr4}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: parseFloat((Math.PI * r4 * r4).toFixed(1)), unit: "cm^2" }],
                correctLatex: `A=\\pi r^2\\approx ${(Math.PI * r4 * r4).toFixed(1)}`,
                hintLatex: [`A=\\pi r^2`],
                visualMeta: { type: 'circle', params: { r: r4 } },
            },
        ];
        if (difficulty === "BASIC") return all.slice(0, 2);
        if (difficulty === "CORE") return all.slice(0, 3);
        return all;
    }

    if (stage === "VOLUMES") {
        // --- V1: Cube ---
        let v1_a: number, v1_expr: string, v1_steps: string;
        if (isElite) {
            v1_a = 5;
            v1_expr = `\\text{${t.quests.cube_elite.replace("${sa}", "150")}}`;
            v1_steps = `6a^2=150 \\Rightarrow a=5 \\Rightarrow V=5^3=125`;
        } else {
            v1_a = isBasic ? 4 : 6;
            v1_expr = `\\text{${t.labels.side} }a=${v1_a}\\text{m}`;
            v1_steps = `V=${v1_a}^3=${v1_a ** 3}`;
        }

        // --- V2: Prism ---
        let v2_a: number, v2_b: number, v2_h: number, v2_expr: string;
        if (isElite) {
            v2_a = 5; v2_b = 5; v2_h = 12;
            v2_expr = `\\text{${t.quests.prism_elite.replace("${p}", "20").replace("${h}", "12")}}`;
        } else {
            v2_a = 3; v2_b = 4; v2_h = 5;
            v2_expr = `\\text{${t.labels.length} }a=${v2_a}\\text{m, }\\text{${t.labels.width} }b=${v2_b}\\text{m, }\\text{${t.labels.height} }h=${v2_h}\\text{m}`;
        }

        // --- V3: Cylinder ---
        let v3_r: number, v3_h: number, v3_expr: string;
        if (isElite) {
            v3_r = 5; v3_h = 10;
            v3_expr = `\\text{${t.quests.cyl_elite.replace("${la}", "314.16").replace("${r}", "5")}}`;
        } else {
            v3_r = isBasic ? 2 : 4; v3_h = 5;
            v3_expr = `\\text{${t.labels.radius} }r=${v3_r}\\text{cm, }\\text{${t.labels.height} }h=${v3_h}\\text{cm}`;
        }

        const all: S101Quest[] = [
            {
                id: "V1", difficulty, stage,
                promptLatex: `\\text{${t.quests.attic}}`,
                expressionLatex: `${v1_expr}`,
                targetLatex: `V`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "volume", expected: v1_a ** 3, unit: "m^3" }],
                correctLatex: v1_steps,
                hintLatex: [`V=a^3`],
                visualMeta: { type: 'cube', params: { a: v1_a } },
            },
            {
                id: "V2", difficulty, stage,
                promptLatex: `\\text{${t.quests.crate}}`,
                expressionLatex: `${v2_expr}`,
                targetLatex: `V`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "volume", expected: v2_a * v2_b * v2_h, unit: "m^3" }],
                correctLatex: `V=${v2_a}\\cdot ${v2_b}\\cdot ${v2_h}=${v2_a * v2_b * v2_h}`,
                hintLatex: [`V=abc`],
                visualMeta: { type: 'prism', params: { a: v2_a, b: v2_b, c: v2_h } },
            },
            {
                id: "V3", difficulty, stage,
                promptLatex: `\\text{${t.quests.pylon}}`,
                expressionLatex: `${v3_expr}`,
                targetLatex: `V`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "volume", expected: Math.round(Math.PI * v3_r * v3_r * v3_h), unit: "cm^3" }],
                correctLatex: `V=\\pi r^2h\\approx ${Math.round(Math.PI * v3_r * v3_r * v3_h)}`,
                hintLatex: [`V=\\pi r^2h`],
                visualMeta: { type: 'cylinder', params: { r: v3_r, h: v3_h } },
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
    } = useQuestManager<S101Quest, Stage>({
        buildPool,
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
                        {/* Use 3D Cube for volume stage with cube geometry */}
                        {stage === 'VOLUMES' && currentQuest.visualMeta?.type === 'cube' ? (
                            <Cube3D
                                sideLength={currentQuest.visualMeta.params.a}
                                showDiagonal={false}
                            />
                        ) : (
                            <>
                                <S101_GeometryCanvas
                                    geometry={currentQuest.visualMeta}
                                    userAnswer={parsedAnswer}
                                    isVolumeMode={stage === 'VOLUMES'}
                                />
                                <div className="absolute top-2 right-2 text-[9px] font-mono text-white/70 pointer-events-none">
                                    REAL-TIME GEOMETRY
                                </div>
                            </>
                        )}
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
                            <div className="space-y-2 text-white font-black text-[10px] uppercase tracking-[0.25em]">
                                <div className="text-white/90">{t.labels.hints}</div>
                                {currentQuest.hintLatex.slice(0, 3).map((h, idx) => (
                                    <div key={`${currentQuest.id}|h|${idx}`} className="flex gap-2 items-start">
                                        <div className="text-white/70 w-6">{String(idx + 1).padStart(2, "0")}</div>
                                        <div className="flex-1">
                                            <InlineMath math={h} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="text-white/70 text-[10px] font-black tracking-[0.3em] uppercase">
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
                    <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic whitespace-normal break-words">
                        {(() => {
                            const latex = currentQuest.promptLatex;
                            if (latex.includes("\\text{")) {
                                const clean = latex
                                    .replace(/\\text\{/g, "")
                                    .replace(/\}/g, "")
                                    .replace(/\\\\/g, "\n")
                                    .replace(/\\;/g, " ")
                                    .replace(/\\,/g, " ")
                                    .replace(/\\quad/g, "  ")
                                    .replace(/\\!/g, "");
                                return <span className="whitespace-pre-wrap font-sans not-italic">{clean}</span>;
                            }
                            return <InlineMath math={latex} />;
                        })()}
                    </p>
                </div>

                <div className="flex justify-center overflow-x-auto w-full">
                    <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                        <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
                            {t.target_title}
                        </span>
                        <div className="space-y-4">
                            <div className="text-white font-black text-[clamp(1.2rem,3.8vw,3.3rem)] leading-[1.2] whitespace-normal break-words">
                                {(() => {
                                    const latex = currentQuest.expressionLatex;
                                    if (latex.includes("\\text{")) {
                                        return <span className="whitespace-pre-wrap">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ").replace(/\\,/g, " ")}</span>;
                                    }
                                    return <InlineMath math={latex.replace(/(\text{m)[,，]/g, "$1}, \\\\ \\text{")} />;
                                })()}
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
                                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                                    <InlineMath math={slot.labelLatex} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        value={inputs[slot.id] ?? ""}
                                        onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                        className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
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

                <div className="text-[10px] text-white/90 font-mono italic text-center">
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
