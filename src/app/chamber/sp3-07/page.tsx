"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import FerryCanvas from "@/components/chamber/sp3-07/FerryCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "COMPOSITION" | "DRIFT" | "NAVIGATION";

interface SP307Quest extends Quest {
    stage: Stage;
    vRiver: number;
    vFerry: number;
    theta: number; // degrees
}

type SP307T = typeof translations.EN.sp3_07;

export default function SP307Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp3_07 || translations.EN.sp3_07) as SP307T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP307Quest[] => {
        const isBasic = difficulty === "BASIC";
        const isCore = difficulty === "CORE";
        const isAdv = difficulty === "ADVANCED";
        const isElite = difficulty === "ELITE";

        const quests: SP307Quest[] = [];

        if (stage === "COMPOSITION") {
            // Focus on basic vector addition: V_net_z = V_ferry_z + V_river
            if (isBasic) {
                quests.push(
                    {
                        id: "C-B1", difficulty, stage, vRiver: 1.0, vFerry: 2.0, theta: 0,
                        promptLatex: "\\text{Ferry moves at } 2m/s \\text{ north. River flows } 1m/s \\text{ north. Net speed?}",
                        expressionLatex: "v_{net} = v_f + v_r", targetLatex: "3.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 3.0 }],
                        correctLatex: "3.0", hintLatex: ["Add the velocities."]
                    },
                    {
                        id: "C-B2", difficulty, stage, vRiver: 1.5, vFerry: 1.5, theta: 180,
                        promptLatex: "\\text{Ferry moves at } 1.5m/s \\text{ south against } 1.5m/s \\text{ current. Net speed?}",
                        expressionLatex: "v_{net} = v_r - v_f", targetLatex: "0.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 0.0 }],
                        correctLatex: "0.0", hintLatex: ["They cancel out."]
                    }
                );
            } else {
                quests.push(
                    {
                        id: "C-C1", difficulty, stage, vRiver: 2.0, vFerry: 4.0, theta: 60,
                        promptLatex: "\\text{Calculate the longitudinal velocity component } v_{net,z}.",
                        expressionLatex: "v_{net,z} = v_f \\cos(60^\\circ) + v_r", targetLatex: "4.0",
                        slots: [{ id: "ans", labelLatex: "v_{net,z}", placeholder: "m/s", expected: 4.0 }],
                        correctLatex: "4.0", hintLatex: ["\\cos(60^\\circ) = 0.5"]
                    }
                );
            }
        }

        if (stage === "DRIFT") {
            // Focus on neutralizing drift: V_net_z = 0
            quests.push(
                {
                    id: "D-C1", difficulty, stage, vRiver: 1.5, vFerry: 3.0, theta: 120,
                    promptLatex: "\\text{Find the angle } \\theta \\text{ to achieve zero longitudinal drift if } v_r=1.5, v_f=3.0.",
                    expressionLatex: "3.0 \\cos(\\theta) + 1.5 = 0", targetLatex: "120",
                    slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                    correctLatex: "120", hintLatex: ["\\cos(\\theta) = -0.5"]
                }
            );
        }

        if (stage === "NAVIGATION") {
            // Comprehensive path finding
            quests.push(
                {
                    id: "N-A1", difficulty, stage, vRiver: 1.2, vFerry: 2.4, theta: 120,
                    promptLatex: "\\text{If crossing a 20m wide river with } v_{net,x} \\text{, how long to reach the bank?}",
                    expressionLatex: "t = \\frac{20}{v_{f} \\sin(120^\\circ)}", targetLatex: "9.62",
                    slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 9.62 }],
                    correctLatex: "9.62", hintLatex: ["v_x = v_f \\sin(120^\\circ)"]
                }
            );
        }

        return quests;
    }, []);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

    const {
        currentQuest,
        difficulty,
        stage,
        lastCheck,
        inputs,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        getHint,
        currentStageStats,
    } = useQuestManager<SP307Quest, Stage>({
        buildPool,
        initialStage: "COMPOSITION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-07", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "COMPOSITION", label: t.stages.composition },
        { id: "DRIFT", label: t.stages.drift },
        { id: "NAVIGATION", label: t.stages.navigation },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SP3.07"
            title={t.title}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
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
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        {currentQuest ? (
                            <FerryCanvas
                                riverSpeed={currentQuest.vRiver}
                                cableAngle={currentQuest.theta}
                                ferrySpeed={currentQuest.vFerry}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white/50 italic font-mono">
                                COMPILING_VECTORS...
                            </div>
                        )}
                    </div>
                    {/* HUD Overlay */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t.labels.river_speed}</div>
                            <div className="text-sm font-mono text-neon-cyan">{currentQuest?.vRiver.toFixed(2)} m/s</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t.labels.cable_angle}</div>
                            <div className="text-sm font-mono text-neon-cyan">{currentQuest?.theta.toFixed(1)}°</div>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>Vector Stability</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-neon-cyan shadow-[0_0_5px_cyan]" : "bg-transparent"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                                Mission Objective
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    Vector Geometry
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    Terminal Input [Node Alpha]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">PARM_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/20 transition-all blur-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {lastCheck && (
                                        <motion.div
                                            key={lastCheck.ok ? "correct" : "incorrect"}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${lastCheck.ok
                                                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                                                    }`}>
                                                    {lastCheck.ok ? "✓" : "✗"}
                                                </div>
                                                <div>
                                                    <div className="font-black text-lg tracking-widest uppercase italic">
                                                        {lastCheck.ok ? "Calculation Valid" : "Vector Mismatch"}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? "Physics confirmed. Proceeding to next objective." : "Recalculate vector components."}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Hint:</span>
                                                    <div className="text-white font-bold">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    Next Mission
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ChamberLayout>
    );
}
