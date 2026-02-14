"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PressureBuoyancyCanvas from "@/components/chamber/sp1-07/PressureBuoyancyCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "PRESSURE" | "BUOYANCY" | "HYDRAULICS";

interface SP107Quest extends Quest {
    stage: Stage;
    scenario?: string;
}

type SP107T = typeof translations.EN.sp1_07;

export default function SP107Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp1_07 || translations.EN.sp1_07) as SP107T;
    const [depth, setDepth] = useState(5);
    const [objectDensity, setObjectDensity] = useState(800);
    const [pistonForce, setPistonForce] = useState(100);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP107Quest[] => {
        const quests: SP107Quest[] = [];

        if (stage === "PRESSURE") {
            // Pressure calculations
            const scenarios = [
                { depth: 10, pressure: "200000", unit: "Pa" },
                { depth: 5, pressure: "150000", unit: "Pa" },
                { depth: 20, pressure: "300000", unit: "Pa" },
                { depth: 15, pressure: "250000", unit: "Pa" }
            ];

            scenarios.forEach((s, idx) => {
                quests.push({
                    id: `PRESS-${idx}`,
                    difficulty,
                    stage,
                    scenario: "rhine_swimming",
                    promptLatex: `\\text{${t.prompts.pressure_depth.replace('{depth}', s.depth.toString())}}`,
                    expressionLatex: `P = P_0 + \\rho g h = \\text{?}`,
                    targetLatex: s.pressure,
                    slots: [{ id: "ans", labelLatex: "P\\,(\\text{Pa})", placeholder: "...", expected: s.pressure }],
                    correctLatex: `${s.pressure}\\,\\text{Pa}`,
                    hintLatex: [`\\text{${t.prompts.hint_pressure}}`]
                });
            });
        }

        if (stage === "BUOYANCY") {
            // Buoyancy and Archimedes
            const objects = [
                { volume: 0.001, density: 800, buoyant: "10", floats: "yes" },
                { volume: 0.002, density: 1200, buoyant: "20", floats: "no" },
                { volume: 0.0015, density: 900, buoyant: "15", floats: "yes" },
                { volume: 0.0008, density: 1100, buoyant: "8", floats: "no" }
            ];

            objects.forEach((obj, idx) => {
                quests.push({
                    id: `BUOY-${idx}`,
                    difficulty,
                    stage,
                    scenario: "rhine_boat",
                    promptLatex: `\\text{${t.prompts.buoyant_force.replace('{volume}', obj.volume.toString())}}`,
                    expressionLatex: `F_b = \\rho_{water} V g = \\text{?}`,
                    targetLatex: obj.buoyant,
                    slots: [{ id: "ans", labelLatex: "F_b\\,(\\text{N})", placeholder: "...", expected: obj.buoyant }],
                    correctLatex: `${obj.buoyant}\\,\\text{N}`,
                    hintLatex: [`\\text{${t.prompts.hint_archimedes}}`]
                });
            });
        }

        if (stage === "HYDRAULICS") {
            // Pascal's principle
            const hydraulics = [
                { f1: 100, a1: 0.01, a2: 0.1, f2: "1000" },
                { f1: 50, a1: 0.005, a2: 0.05, f2: "500" },
                { f1: 200, a1: 0.02, a2: 0.2, f2: "2000" },
                { f1: 150, a1: 0.015, a2: 0.15, f2: "1500" }
            ];

            hydraulics.forEach((h, idx) => {
                quests.push({
                    id: `HYD-${idx}`,
                    difficulty,
                    stage,
                    scenario: "hydraulic_lift",
                    promptLatex: `\\text{${t.prompts.hydraulic_force.replace('{f1}', h.f1.toString()).replace('{a1}', h.a1.toString()).replace('{a2}', h.a2.toString())}}`,
                    expressionLatex: `\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\Rightarrow F_2 = \\text{?}`,
                    targetLatex: h.f2,
                    slots: [{ id: "ans", labelLatex: "F_2\\,(\\text{N})", placeholder: "...", expected: h.f2 }],
                    correctLatex: `${h.f2}\\,\\text{N}`,
                    hintLatex: [`\\text{${t.prompts.hint_pascal}}`]
                });
            });
        }

        return quests;
    }, [t]);

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
    } = useQuestManager<SP107Quest, Stage>({
        buildPool,
        initialStage: "PRESSURE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SP1.07", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "PRESSURE", label: t.stages.pressure },
        { id: "BUOYANCY", label: t.stages.buoyancy },
        { id: "HYDRAULICS", label: t.stages.hydraulics },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SP1.07"
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
                        <PressureBuoyancyCanvas
                            stage={stage}
                            depth={depth}
                            objectDensity={objectDensity}
                            pistonForce={pistonForce}
                            translations={t}
                        />
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 gap-3">
                        {stage === "PRESSURE" && (
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.depth}</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={depth}
                                        onChange={(e) => setDepth(Number(e.target.value))}
                                        className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-cyan"
                                    />
                                    <span className="text-[10px] font-mono text-white/60 w-10 text-right">{depth}m</span>
                                </div>
                            </div>
                        )}
                        {stage === "BUOYANCY" && (
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.density}</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="500"
                                        max="1500"
                                        step="100"
                                        value={objectDensity}
                                        onChange={(e) => setObjectDensity(Number(e.target.value))}
                                        className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-green"
                                    />
                                    <span className="text-[10px] font-mono text-white/60 w-16 text-right">{objectDensity}kg/m³</span>
                                </div>
                            </div>
                        )}
                        {stage === "HYDRAULICS" && (
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.force}</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="50"
                                        max="200"
                                        step="10"
                                        value={pistonForce}
                                        onChange={(e) => setPistonForce(Number(e.target.value))}
                                        className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-purple"
                                    />
                                    <span className="text-[10px] font-mono text-white/60 w-12 text-right">{pistonForce}N</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.fluid_mastery}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${
                                        i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                                            ? "bg-neon-cyan shadow-[0_0_5px_cyan]"
                                            : "bg-transparent"
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
                                {t.objective_title}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t.labels.physics_display}
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
                                    {t.labels.input_terminal}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">FLUID_0x{slot.id.toUpperCase()}</span>
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
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
                                                lastCheck.ok
                                                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                                            }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${
                                                    lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                                                }`}>
                                                    {lastCheck.ok ? "✓" : "✗"}
                                                </div>
                                                <div>
                                                    <div className="font-black text-lg tracking-widest uppercase italic">
                                                        {lastCheck.ok ? t.correct : t.incorrect}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t.feedback.correct : t.feedback.incorrect}
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
                                                    {t.next}
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
