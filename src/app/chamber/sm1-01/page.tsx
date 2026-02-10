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
    const scale = difficulty === "BASIC" ? 1 : difficulty === "CORE" ? 1.5 : difficulty === "ADVANCED" ? 2.2 : 3.8;
    const isElite = difficulty === "ELITE";

    if (stage === "AREAS") {
        const all: S101Quest[] = [
            {
                id: "A1", difficulty, stage,
                promptLatex: `\\text{ 阿尔卑斯滑雪场需要铺设新雪道。雪道是长方形，}`,
                expressionLatex: `\\text{长 }a=${Math.round(5 * scale)}\\text{m, 宽 }b=${Math.round(8 * scale)}\\text{m，计算雪道面积}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: Math.round(40 * scale * scale) }],
                correctLatex: `A=${Math.round(5 * scale)}\\cdot ${Math.round(8 * scale)}=${Math.round(40 * scale * scale)}`,
                hintLatex: [`A=a\\cdot b`],
                visualMeta: { type: 'rectangle', params: { a: 5 * scale, b: 8 * scale } },
            },
            {
                id: "A2", difficulty, stage,
                promptLatex: `\\text{ 苏黎世帆船俱乐部需要订制新帆布。帆是三角形，}`,
                expressionLatex: `\\text{底边 }b=${Math.round(6 * scale)}\\text{m, 高 }h=${Math.round(4 * scale)}\\text{m，计算帆的面积}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: Math.round(12 * scale * scale) }],
                correctLatex: `A=\\frac{1}{2}\\cdot ${Math.round(6 * scale)}\\cdot ${Math.round(4 * scale)}=${Math.round(12 * scale * scale)}`,
                hintLatex: [`A=\\frac{1}{2}bh`],
                visualMeta: { type: 'triangle', params: { b: 6 * scale, h: 4 * scale } },
            },
            {
                id: "A3", difficulty, stage,
                promptLatex: `\\text{ 巴塞尔莱茵河防洪闸门截面是梯形，}`,
                expressionLatex: `\\text{上底 }a=${Math.round(4 * scale)}\\text{m, 下底 }b=${Math.round(6 * scale)}\\text{m, 高 }h=${Math.round(5 * scale)}\\text{m, 求截面积}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected: Math.round(25 * scale * scale) }],
                correctLatex: `A=\\frac{1}{2}(${Math.round(4 * scale)}+${Math.round(6 * scale)})\\cdot ${Math.round(5 * scale)}=${Math.round(25 * scale * scale)}`,
                hintLatex: [`A=\\frac{1}{2}(a+b)h`],
                visualMeta: { type: 'trapezoid', params: { a: 4 * scale, b: 6 * scale, h: 5 * scale } },
            },
            {
                id: "A4", difficulty, stage,
                promptLatex: `\\text{ 格律耶尔奶酪工厂的圆形模具，}`,
                expressionLatex: `\\text{半径 }r=${isElite ? (3.5 * scale).toFixed(1) : Math.round(3 * scale)}\\text{cm，计算模具底面积}`,
                targetLatex: `A`,
                slots: [{
                    id: "A",
                    labelLatex: `A`,
                    placeholder: "area",
                    expected: parseFloat((Math.PI * Math.pow(isElite ? 3.5 * scale : 3 * scale, 2)).toFixed(2))
                }],
                correctLatex: `A=\\pi\\cdot (${isElite ? (3.5 * scale).toFixed(1) : Math.round(3 * scale)})^2\\approx ${(Math.PI * Math.pow(isElite ? 3.5 * scale : 3 * scale, 2)).toFixed(2)}`,
                hintLatex: [`A=\\pi r^2`],
                visualMeta: { type: 'circle', params: { r: isElite ? 3.5 * scale : 3 * scale } },
            },
        ];
        return all;
    }

    if (stage === "VOLUMES") {
        const all: S101Quest[] = [
            {
                id: "V1", difficulty, stage,
                promptLatex: `\\text{ 瑞士木屋阁楼是正方体空间，需要选购空气净化器，}`,
                expressionLatex: `\\text{边长 }a=${Math.round(4 * scale)}\\text{m，计算空间体积}`,
                targetLatex: `V`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "volume", expected: Math.pow(Math.round(4 * scale), 3) }],
                correctLatex: `V=${Math.round(4 * scale)}^3=${Math.pow(Math.round(4 * scale), 3)}`,
                hintLatex: [`V=a^3`],
                visualMeta: { type: 'cube', params: { a: 4 * scale } },
            },
            {
                id: "V2", difficulty, stage,
                promptLatex: `\\text{ CERN 实验室需要一个精密仪器的储存箱，}`,
                expressionLatex: `\\text{长 }a=${Math.round(3 * scale)}\\text{m, 宽 }b=${Math.round(4 * scale)}\\text{m, 高 }c=${Math.round(5 * scale)}\\text{m, 计算储存箱容积}`,
                targetLatex: `V`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "volume", expected: Math.round(60 * Math.pow(scale, 3)) }],
                correctLatex: `V=${Math.round(3 * scale)}\\cdot ${Math.round(4 * scale)}\\cdot ${Math.round(5 * scale)}=${Math.round(60 * Math.pow(scale, 3))}`,
                hintLatex: [`V=abc`],
                visualMeta: { type: 'prism', params: { a: 3 * scale, b: 4 * scale, c: 5 * scale } },
            },
            {
                id: "V3", difficulty, stage,
                promptLatex: `\\text{ 圣莫里茨的滑雪缆车支架是圆柱体，}`,
                expressionLatex: `\\text{底面半径 }r=${Math.round(3 * scale)}\\text{m, 高 }h=${Math.round(10 * scale)}\\text{m，计算支架体积}`,
                targetLatex: `V`,
                slots: [{
                    id: "V",
                    labelLatex: `V`,
                    placeholder: "volume",
                    expected: parseFloat((Math.PI * Math.pow(Math.round(3 * scale), 2) * Math.round(10 * scale)).toFixed(2))
                }],
                correctLatex: `V=\\pi\\cdot ${Math.round(3 * scale)}^2\\cdot ${Math.round(10 * scale)}\\approx ${(Math.PI * Math.pow(Math.round(3 * scale), 2) * Math.round(10 * scale)).toFixed(2)}`,
                hintLatex: [`V=\\pi r^2 h`],
                visualMeta: { type: 'cylinder', params: { r: 3 * scale, h: 10 * scale } },
            },
        ];
        return all;
    }

    if (stage === "COMPLEX") {
        const h = Math.round(5 * scale);
        const a = Math.round(8 * scale);
        const b = Math.round(12 * scale);
        const expected = 0.5 * (a + b) * h;

        const all: S101Quest[] = [
            {
                id: "C1", difficulty, stage,
                promptLatex: `\\text{${t.mission?.protocol}}\\\\\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                expressionLatex: `\\text{Trapezoid: }a=${a},\\; b=${b},\\; h=${h}`,
                targetLatex: `A`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "area", expected }],
                correctLatex: `A=\\frac{1}{2}(${a}+${b})\\cdot ${h}=${expected}`,
                hintLatex: [`A=\\frac{1}{2}(a+b)h`],
                visualMeta: { type: 'trapezoid', params: { a, b, h } },
            },
        ];
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
                <div className="space-y-6">
                    <div className="relative w-full aspect-square bg-black/20 rounded-xl overflow-hidden shadow-inner">
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
                                <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 pointer-events-none">
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
                            <div className="space-y-2 text-white/50 font-black text-[10px] uppercase tracking-[0.25em] pt-4 border-t border-white/5">
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
                </div>
            }
        >
            <div className="space-y-12 py-10">
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
                    <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
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

                <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                    <div className="space-y-6">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                            {t.labels.input}
                        </div>
                        <div className={clsx("grid gap-6", currentQuest.slots.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                            {currentQuest.slots.map((slot) => (
                                <div key={slot.id} className="space-y-3">
                                    <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                        <InlineMath math={slot.labelLatex} />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            value={inputs[slot.id] ?? ""}
                                            onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                            className="flex-1 bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white transition-all focus:border-neon-cyan"
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
                    <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-white/40 font-mono italic text-center">
                        {currentLanguage === 'DE'
                            ? "Tipp: Gib das Resultat als Bruch (z.B. 4/3) oder auf 2 Dezimalstellen gerundet an."
                            : currentLanguage === 'CN'
                                ? "提示：输入分数 (如 4/3) 或保留 2 位小数。"
                                : "Tip: Enter result as a fraction (e.g. 4/3) or rounded to 2 decimal places."
                        }
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
