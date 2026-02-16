"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import SimpleMachineCanvas from "@/components/chamber/sp3-05/SimpleMachineCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "LEVERS" | "PULLEYS" | "INCLINED_PLANES";

interface SP305Quest extends Quest {
    stage: Stage;
    machineType?: string;
}

type SP305T = typeof translations.EN.sp3_05;

export default function SP305Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp3_05 || translations.EN.sp3_05) as SP305T;
    const [forceRatio, setForceRatio] = useState(2);
    const [showForces, setShowForces] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP305Quest[] => {
        const quests: SP305Quest[] = [];

        if (stage === "LEVERS") {
            // Lever mechanical advantage problems
            const levers = [
                { effort: 100, load: 300, effortArm: 3, loadArm: 1 },
                { effort: 50, load: 200, effortArm: 4, loadArm: 1 },
                { effort: 80, load: 160, effortArm: 2, loadArm: 1 },
                { effort: 60, load: 240, effortArm: 4, loadArm: 1 },
                { effort: 75, load: 225, effortArm: 3, loadArm: 1 }
            ];

            levers.forEach((lever, idx) => {
                quests.push({
                    id: `LEVER-${idx}`,
                    difficulty,
                    stage,
                    machineType: "lever",
                    promptLatex: `\\text{${t.prompts.lever.replace('{load}', lever.load.toString()).replace('{effortArm}', lever.effortArm.toString()).replace('{loadArm}', lever.loadArm.toString())}}`,
                    expressionLatex: `\\text{MA} = \\frac{d_e}{d_l} = \\frac{${lever.effortArm}}{${lever.loadArm}}`,
                    targetLatex: lever.effort.toString(),
                    slots: [{ id: "ans", labelLatex: "F_e\\text{ (N)}", placeholder: "...", expected: lever.effort.toString() }],
                    correctLatex: `${lever.effort}\\,\\text{N}`,
                    hintLatex: [`\\text{${t.prompts.hint_lever}}`]
                });
            });
        }

        if (stage === "PULLEYS") {
            // Pulley system problems
            const pulleys = [
                { load: 400, strands: 4, effort: 100 },
                { load: 600, strands: 3, effort: 200 },
                { load: 300, strands: 2, effort: 150 },
                { load: 500, strands: 5, effort: 100 },
                { load: 800, strands: 4, effort: 200 }
            ];

            pulleys.forEach((pulley, idx) => {
                quests.push({
                    id: `PULLEY-${idx}`,
                    difficulty,
                    stage,
                    machineType: "pulley",
                    promptLatex: `\\text{${t.prompts.pulley.replace('{load}', pulley.load.toString()).replace('{strands}', pulley.strands.toString())}}`,
                    expressionLatex: `F_e = \\frac{F_l}{n} = \\frac{${pulley.load}}{${pulley.strands}}`,
                    targetLatex: pulley.effort.toString(),
                    slots: [{ id: "ans", labelLatex: "F_e\\text{ (N)}", placeholder: "...", expected: pulley.effort.toString() }],
                    correctLatex: `${pulley.effort}\\,\\text{N}`,
                    hintLatex: [`\\text{${t.prompts.hint_pulley}}`]
                });
            });
        }

        if (stage === "INCLINED_PLANES") {
            // Inclined plane problems
            const planes = [
                { load: 500, height: 2, length: 10, effort: 100 },
                { load: 600, height: 3, length: 12, effort: 150 },
                { load: 400, height: 1, length: 8, effort: 50 },
                { load: 800, height: 4, length: 16, effort: 200 },
                { load: 1000, height: 5, length: 20, effort: 250 }
            ];

            planes.forEach((plane, idx) => {
                quests.push({
                    id: `PLANE-${idx}`,
                    difficulty,
                    stage,
                    machineType: "inclined_plane",
                    promptLatex: `\\text{${t.prompts.inclined_plane.replace('{load}', plane.load.toString()).replace('{height}', plane.height.toString()).replace('{length}', plane.length.toString())}}`,
                    expressionLatex: `F_e = F_l \\times \\frac{h}{l} = ${plane.load} \\times \\frac{${plane.height}}{${plane.length}}`,
                    targetLatex: plane.effort.toString(),
                    slots: [{ id: "ans", labelLatex: "F_e\\text{ (N)}", placeholder: "...", expected: plane.effort.toString() }],
                    correctLatex: `${plane.effort}\\,\\text{N}`,
                    hintLatex: [`\\text{${t.prompts.hint_inclined}}`]
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
    } = useQuestManager<SP305Quest, Stage>({
        buildPool,
        initialStage: "LEVERS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SP3.05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "LEVERS", label: t.stages.levers },
        { id: "PULLEYS", label: t.stages.pulleys },
        { id: "INCLINED_PLANES", label: t.stages.inclined_planes },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SP3.05"
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
                        <SimpleMachineCanvas
                            stage={stage}
                            forceRatio={forceRatio}
                            showForces={showForces}
                            translations={t}
                        />
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 gap-2">
                        {stage === "LEVERS" && (
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.force_ratio}</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={forceRatio}
                                        onChange={(e) => setForceRatio(Number(e.target.value))}
                                        className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-green"
                                    />
                                    <span className="text-[10px] font-mono text-white/60 w-16 text-right">MA = {forceRatio}</span>
                                </div>
                            </div>
                        )}
                        <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                            <span className="text-[10px] uppercase text-white/60 tracking-widest">{t.labels.show_forces}</span>
                            <input
                                type="checkbox"
                                checked={showForces}
                                onChange={(e) => setShowForces(e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-black text-neon-green focus:ring-neon-green/50"
                            />
                        </label>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.mechanics_score}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                                        ? "bg-neon-green shadow-[0_0_5px_#00ff00]"
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
                            <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic">
                                {t.objective_title}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-green/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-green/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t.labels.machine_display}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-green/30" />
                                    {t.labels.input_terminal}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-green/30 font-mono">MECH_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-green/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-green/0 group-focus-within:bg-neon-green/20 transition-all blur-sm" />
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
