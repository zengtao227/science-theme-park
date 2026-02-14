"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ThermodynamicsCanvas from "@/components/chamber/sp2-01/ThermodynamicsCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "HEAT_TRANSFER" | "SPECIFIC_HEAT" | "PHASE_CHANGES";

interface SP201Quest extends Quest {
    stage: Stage;
    scenario?: string;
}

type SP201T = typeof translations.EN.sp2_01;

export default function SP201Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp2_01 || translations.EN.sp2_01) as SP201T;
    const [temperature, setTemperature] = useState(25);
    const [showParticles, setShowParticles] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP201Quest[] => {
        const quests: SP201Quest[] = [];

        if (stage === "HEAT_TRANSFER") {
            // Heat transfer calculations
            const transfers = [
                { method: "conduction", material: "copper", rate: 400, distance: 0.1, answer: "4000" },
                { method: "convection", fluid: "water", temp_diff: 50, coefficient: 500, answer: "25000" },
                { method: "radiation", temp: 373, emissivity: 0.9, area: 1, answer: "1000" },
                { method: "conduction", material: "steel", rate: 50, distance: 0.05, answer: "500" },
                { method: "convection", fluid: "air", temp_diff: 30, coefficient: 25, answer: "750" }
            ];

            transfers.forEach((trans, idx) => {
                quests.push({
                    id: `HEAT-${idx}`,
                    difficulty,
                    stage,
                    scenario: trans.method,
                    promptLatex: `\\text{${t.prompts.heat_transfer.replace('{method}', trans.method)}}`,
                    expressionLatex: trans.method === "conduction" ? 
                        `Q = k \\cdot A \\cdot \\frac{\\Delta T}{d}` :
                        trans.method === "convection" ?
                        `Q = h \\cdot A \\cdot \\Delta T` :
                        `Q = \\sigma \\cdot \\varepsilon \\cdot A \\cdot T^4`,
                    targetLatex: trans.answer,
                    slots: [{ id: "ans", labelLatex: "Q\\text{ (W)}", placeholder: "...", expected: trans.answer }],
                    correctLatex: `${trans.answer}\\,\\text{W}`,
                    hintLatex: [`\\text{${t.prompts.hint_heat}}`]
                });
            });
        }

        if (stage === "SPECIFIC_HEAT") {
            // Specific heat capacity problems (Q = mcΔT)
            const problems = [
                { mass: 2, c: 4186, deltaT: 10, q: 83720 },
                { mass: 0.5, c: 4186, deltaT: 20, q: 41860 },
                { mass: 1, c: 900, deltaT: 50, q: 45000 },
                { mass: 3, c: 4186, deltaT: 15, q: 188370 },
                { mass: 1.5, c: 4186, deltaT: 25, q: 156975 }
            ];

            problems.forEach((prob, idx) => {
                quests.push({
                    id: `SPEC-${idx}`,
                    difficulty,
                    stage,
                    scenario: "water_heating",
                    promptLatex: `\\text{${t.prompts.specific_heat.replace('{mass}', prob.mass.toString()).replace('{deltaT}', prob.deltaT.toString())}}`,
                    expressionLatex: `Q = m \\cdot c \\cdot \\Delta T = ${prob.mass} \\times ${prob.c} \\times ${prob.deltaT}`,
                    targetLatex: prob.q.toString(),
                    slots: [{ id: "ans", labelLatex: "Q\\text{ (J)}", placeholder: "...", expected: prob.q.toString() }],
                    correctLatex: `${prob.q}\\,\\text{J}`,
                    hintLatex: [`\\text{${t.prompts.hint_specific}}`]
                });
            });
        }

        if (stage === "PHASE_CHANGES") {
            // Phase change calculations (Q = mL)
            const changes = [
                { substance: "water", mass: 1, L: 334000, phase: "melting", q: 334000 },
                { substance: "water", mass: 2, L: 2260000, phase: "boiling", q: 4520000 },
                { substance: "ice", mass: 0.5, L: 334000, phase: "melting", q: 167000 },
                { substance: "water", mass: 1.5, L: 2260000, phase: "boiling", q: 3390000 },
                { substance: "ice", mass: 0.8, L: 334000, phase: "melting", q: 267200 }
            ];

            changes.forEach((change, idx) => {
                quests.push({
                    id: `PHASE-${idx}`,
                    difficulty,
                    stage,
                    scenario: change.phase,
                    promptLatex: `\\text{${t.prompts.phase_change.replace('{mass}', change.mass.toString()).replace('{phase}', change.phase)}}`,
                    expressionLatex: `Q = m \\cdot L = ${change.mass} \\times ${change.L}`,
                    targetLatex: change.q.toString(),
                    slots: [{ id: "ans", labelLatex: "Q\\text{ (J)}", placeholder: "...", expected: change.q.toString() }],
                    correctLatex: `${change.q}\\,\\text{J}`,
                    hintLatex: [`\\text{${t.prompts.hint_phase}}`]
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
    } = useQuestManager<SP201Quest, Stage>({
        buildPool,
        initialStage: "HEAT_TRANSFER",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SP2.01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "HEAT_TRANSFER", label: t.stages.heat_transfer },
        { id: "SPECIFIC_HEAT", label: t.stages.specific_heat },
        { id: "PHASE_CHANGES", label: t.stages.phase_changes },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SP2.01"
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
                        <ThermodynamicsCanvas
                            stage={stage}
                            temperature={temperature}
                            showParticles={showParticles}
                            translations={t}
                        />
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 gap-2">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.temperature}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="-20"
                                    max="120"
                                    value={temperature}
                                    onChange={(e) => setTemperature(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-amber"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-20 text-right">{temperature}°C</span>
                            </div>
                        </div>
                        <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                            <span className="text-[10px] uppercase text-white/60 tracking-widest">{t.labels.show_particles}</span>
                            <input
                                type="checkbox"
                                checked={showParticles}
                                onChange={(e) => setShowParticles(e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-black text-neon-amber focus:ring-neon-amber/50"
                            />
                        </label>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.thermal_score}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${
                                        i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                                            ? "bg-neon-amber shadow-[0_0_5px_#ffaa00]"
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
                            <h3 className="text-[10px] text-neon-amber uppercase tracking-[0.5em] font-black italic">
                                {t.objective_title}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-amber/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(255,170,0,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-amber/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t.labels.thermal_display}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-amber/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-amber font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-amber/30" />
                                    {t.labels.input_terminal}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-amber/30 font-mono">THERM_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-amber/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-amber/0 group-focus-within:bg-neon-amber/20 transition-all blur-sm" />
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
