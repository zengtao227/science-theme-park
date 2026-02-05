"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import RelativityCanvas from "@/components/chamber/p1-04/RelativityCanvas";

type Stage = "CONTRACTION" | "DILATION" | "SPACETIME";
type P104T = typeof translations.EN.p1_04;

interface P104Quest extends Quest {
    stage: Stage;
    v: number; // velocity as fraction of c (0 to 1)
    l0?: number; // proper length
    t0?: number; // proper time
}

const c = 1;

function getGamma(v: number) {
    return 1 / Math.sqrt(1 - v * v);
}

const questData = [
    { id: "R1", v: 0.6 },
    { id: "R2", v: 0.8 },
    { id: "R3", v: 0.95 },
    { id: "R4", v: 0.5 },
    { id: "R5", v: 0.99 },
    { id: "R6", v: 0.866 }, // gamma approx 2
    { id: "R7", v: 0.943 }, // gamma approx 3
];

function buildStagePool(t: P104T, difficulty: Difficulty, stage: Stage): P104Quest[] {
    const all = questData.map((item) => {
        const gamma = getGamma(item.v);
        const l0 = 10;
        const t0 = 10;

        let expected = 0;
        let prompt = "";
        let target = "";
        let correct = "";
        let slots: any[] = [];

        if (stage === "CONTRACTION") {
            expected = Number((l0 / gamma).toFixed(2));
            prompt = t.stages.contraction_prompt_latex;
            target = "L";
            correct = `L = L_0/\\gamma = ${expected}\\;m`;
            slots = [{ id: "L", labelLatex: "L", placeholder: "m", expected }];
        } else if (stage === "DILATION") {
            expected = Number((t0 * gamma).toFixed(2));
            prompt = t.stages.dilation_prompt_latex;
            target = "t";
            correct = `t = t_0 \\cdot \\gamma = ${expected}\\;s`;
            slots = [{ id: "t", labelLatex: "t", placeholder: "s", expected }];
        } else {
            expected = Number(gamma.toFixed(2));
            prompt = t.stages.spacetime_prompt_latex;
            target = "\\gamma";
            correct = `\\gamma = ${expected}`;
            slots = [{ id: "gamma", labelLatex: "\\gamma", placeholder: "factor", expected }];
        }

        return {
            id: item.id,
            difficulty,
            stage,
            v: item.v,
            l0,
            t0,
            promptLatex: prompt,
            expressionLatex: `v=${item.v}c,\\; L_0=10m,\\; t_0=10s`,
            targetLatex: target,
            slots,
            correctLatex: correct,
        };
    });

    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
}

export default function P104Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].p1_04;

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
        parseNumberLike,
    } = useQuestManager<P104Quest, Stage>({
        buildPool: (d, s) => buildStagePool(t, d, s),
        initialStage: "CONTRACTION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("p1-04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const [simVelocity, setSimVelocity] = useState(0.8);

    useEffect(() => {
        if (currentQuest) {
            setSimVelocity(currentQuest.v);
        }
    }, [currentQuest]);

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="P1.04"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "CONTRACTION", label: t.stages.contraction },
                { id: "DILATION", label: t.stages.dilation },
                { id: "SPACETIME", label: t.stages.spacetime },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t.footer_left}
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
                <div className="space-y-4">
                    <RelativityCanvas
                        velocityFraction={simVelocity}
                        restLength={currentQuest?.l0 || 3}
                        properTimeSeconds={currentQuest?.t0 || 10}
                    />

                    <div className="hud-panel p-4 space-y-3 bg-white/[0.02] border-white/10">
                        <label className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-neon-cyan">
                            <span>{t.labels.velocity}</span>
                            <span className="text-sm font-mono">{simVelocity.toFixed(3)} c</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="0.99"
                            step="0.01"
                            value={simVelocity}
                            onChange={(e) => setSimVelocity(parseFloat(e.target.value))}
                            className="w-full accent-neon-cyan bg-white/10"
                        />

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="space-y-1">
                                <div className="text-[8px] text-white/40 uppercase tracking-widest">{t.labels.gamma}</div>
                                <div className="text-xs text-white font-mono">{getGamma(simVelocity).toFixed(3)}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[8px] text-white/40 uppercase tracking-widest">{t.labels.length}</div>
                                <div className="text-xs text-white font-mono">{(3 / getGamma(simVelocity)).toFixed(2)}m</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10">
                <div className="text-center space-y-2">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
                    <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
                </div>

                <div className="text-center">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
                    <p className="text-3xl text-white font-black italic">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </p>
                    <div className="mt-2 text-white/50 font-mono text-sm underline decoration-white/20">
                        <InlineMath math={currentQuest?.expressionLatex || ""} />
                    </div>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-2xl mx-auto w-full space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="space-y-3">
                                <div className="text-center text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                    <InlineMath math={slot.labelLatex} />
                                </div>
                                <div className="flex items-center gap-4 justify-center">
                                    <input
                                        value={inputs[slot.id] ?? ""}
                                        onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                        className="w-48 bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                                        placeholder={slot.placeholder}
                                        autoFocus
                                    />
                                    {slot.id !== 'gamma' && (
                                        <span className="text-xl font-black text-white/40 font-mono">
                                            <InlineMath math={slot.id === 'L' ? 'm' : 's'} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-[10px] text-white/30 font-mono italic text-center border-t border-white/5 pt-6">
                        {currentLanguage === 'CN'
                            ? "提示：所有计算结果请保留 2 位小数。"
                            : currentLanguage === 'DE'
                                ? "Tipp: Alle Ergebnisse auf 2 Dezimalstellen runden."
                                : "Tip: Round all calculations to 2 decimal places."
                        }
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
