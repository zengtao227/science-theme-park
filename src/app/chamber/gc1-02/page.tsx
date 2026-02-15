"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ElectrolysisCanvas from "@/components/chamber/gc1-02/ElectrolysisCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

interface GC102Quest extends Quest {
    metal: string;
    current: number;
    time: number;
    solution: string;
    stage: string;
}

type Stage = "PRINCIPLES" | "PLATING" | "CORROSION";

export default function GC102Page() {
    const { currentLanguage } = useAppStore();
    const [voltage, setVoltage] = useState(2.0);
    const [electrolyte, setElectrolyte] = useState("ZnCl2");
    const [showIons, setShowIons] = useState(true);

    const t = useMemo(() => {
        return translations[currentLanguage]?.gc1_02 || translations.EN.gc1_02;
    }, [currentLanguage]);

    const buildPool = useCallback((difficulty: Difficulty, stage: Stage): GC102Quest[] => {
        const pool: GC102Quest[] = [];
        const baseId = `gc1-02-${stage}-${difficulty}`;

        if (stage === "PRINCIPLES") {
            const metals = ["Copper", "Zinc", "Silver", "Aluminium"];
            const currents = [1.0, 2.0, 5.0];
            const times = [600, 1200, 3600];

            metals.forEach((m, i) => {
                const I = currents[i % currents.length];
                const s = times[i % times.length];
                // Faraday's first law: m = (Q * M) / (z * F)
                // Using simple values for game logic
                const z = m === "Aluminium" ? 3 : (m === "Silver" ? 1 : 2);
                const M = m === "Copper" ? 63.5 : (m === "Zinc" ? 65.4 : (m === "Silver" ? 107.9 : 27.0));
                const F = 96485;
                const expectedMass = (I * s * M) / (z * F);

                pool.push({
                    id: `${baseId}-${i}`,
                    difficulty,
                    stage,
                    metal: m,
                    current: I,
                    time: s,
                    solution: `${m}SO4`,
                    promptLatex: `I = ${I}A, t = ${s}s, M = ${M}g/mol, z = ${z}`,
                    expressionLatex: `m = \\frac{I \\cdot t \\cdot M}{z \\cdot F}`,
                    targetLatex: `m \\text{ (g)}`,
                    slots: [
                        { id: "mass", labelLatex: "m", placeholder: "0.00", expected: parseFloat(expectedMass.toFixed(3)) }
                    ],
                    correctLatex: `${expectedMass.toFixed(3)}g`
                });
            });
        } else if (stage === "PLATING") {
            const solutions = ["CuSO4", "AgNO3", "AuCl3"];
            solutions.forEach((sol, i) => {
                pool.push({
                    id: `${baseId}-${i}`,
                    difficulty,
                    stage,
                    metal: sol.substring(0, 2),
                    current: 1.5,
                    time: 500,
                    solution: sol,
                    promptLatex: `Electrolysis of ${sol}`,
                    expressionLatex: `\\text{Which electrode for object?}`,
                    targetLatex: `\\text{1: Anode, 2: Cathode}`,
                    slots: [
                        { id: "electrode", labelLatex: "\\text{Pos}", placeholder: "1 or 2", expected: 2 }
                    ],
                    correctLatex: `\\text{Cathode}`
                });
            });
        } else {
            const metals = ["Iron", "Steel", "Copper"];
            metals.forEach((m, i) => {
                pool.push({
                    id: `${baseId}-${i}`,
                    difficulty,
                    stage,
                    metal: m,
                    current: 0,
                    time: 0,
                    solution: "Seawater",
                    promptLatex: `Protecting ${m} from corrosion.`,
                    expressionLatex: `\\text{Select sacrificial anode: 1: Mg, 2: Au, 3: Pt}`,
                    targetLatex: `\\text{Option}`,
                    slots: [
                        { id: "anode", labelLatex: "\\text{Choice}", placeholder: "1-3", expected: 1 }
                    ],
                    correctLatex: `\\text{Magnesium (Mg)}`
                });
            });
        }
        return pool;
    }, []);

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        handleDifficultyChange,
        handleStageChange,
        setInputs,
        verify,
        next,
        getHint,
        currentStageStats,
        pool,
    } = useQuestManager<GC102Quest, Stage>({
        buildPool,
        initialStage: "PRINCIPLES",
    });

    const successRate = useMemo(() => {
        if (!currentStageStats || pool.length === 0) return 0;
        return (currentStageStats.correct / pool.length) * 100;
    }, [currentStageStats, pool.length]);

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="GC1.02"
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            stages={[
                { id: "PRINCIPLES", label: t.stages.principles },
                { id: "PLATING", label: t.stages.plating },
                { id: "CORROSION", label: t.stages.corrosion },
            ]}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            footerLeft={t.footer_left}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            successRate={successRate}
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
                        <ElectrolysisCanvas
                            voltage={voltage}
                            electrolyte={currentQuest?.solution || "ZnCl2"}
                            activeStage={stage}
                            showIons={showIons}
                        />

                        {/* Overlay Controls */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowIons(!showIons)}
                                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border transition-all ${showIons ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-white/10 text-white/40'
                                        }`}
                                >
                                    {t.labels.power_status}
                                </button>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{t.monitor_title}</div>
                                <div className="text-xs font-mono text-cyan-400">STATUS: NOMINAL</div>
                            </div>
                        </div>
                    </div>

                    {/* Property Cards */}
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { label: t.labels.voltage, value: `${voltage.toFixed(1)} V`, icon: "⚡" },
                            { label: t.labels.current, value: `${currentQuest?.current || 0} A`, icon: "I" },
                            { label: t.labels.time, value: `${currentQuest?.time || 0} s`, icon: "T" },
                        ].map((prop, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center">
                                <div className="text-[10px] uppercase tracking-wider text-white/40">{prop.label}</div>
                                <div className="text-sm font-medium text-white flex items-center gap-2">
                                    <span className="text-cyan-400">{prop.icon}</span>
                                    {prop.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.mass_deposited}</span>
                            <span>{currentStageStats?.correct || 0} / {pool.length}</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: pool.length }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-500 ${i < (currentStageStats?.correct || 0) ? 'bg-cyan-500 shadow-[0_0_5px_#00ffff]' : 'bg-transparent'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-white/10" />
                        {t.objective_title}
                    </div>

                    {currentQuest && (
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="text-2xl text-white font-light leading-snug">
                                    {t.prompts.calc_mass.replace("{metal}", currentQuest.metal).replace("{current}", currentQuest.current.toString()).replace("{time}", currentQuest.time.toString()).replace("{solution}", currentQuest.solution)}
                                </div>
                                <div className="p-6 bg-black/40 rounded-xl border border-white/5 flex justify-center shadow-inner">
                                    <BlockMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {currentQuest.slots.map((slot) => (
                                    <div key={slot.id} className="space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                                                Input Target: <InlineMath math={slot.labelLatex} />
                                            </div>
                                            <div className="text-[10px] text-white/20 uppercase tracking-tighter">
                                                Precision: ±0.01
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={inputs[slot.id] || ""}
                                                onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                placeholder={slot.placeholder}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-2xl text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 transition-all font-mono"
                                                onKeyDown={(e) => e.key === 'Enter' && verify()}
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                <span className="text-[10px] text-white/20 font-mono">QUANTITY</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex gap-4 pt-4">
                                    {!lastCheck?.ok ? (
                                        <button
                                            onClick={verify}
                                            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-black py-5 rounded-xl transition-all shadow-lg shadow-cyan-900/40 active:scale-[0.98] tracking-[0.2em] uppercase text-xs"
                                        >
                                            {t.check}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={next}
                                            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-xl transition-all shadow-lg shadow-green-900/40 active:scale-[0.98] tracking-[0.2em] uppercase text-xs"
                                        >
                                            {t.next}
                                        </button>
                                    )}
                                </div>

                                {lastCheck && !lastCheck.ok && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl space-y-2"
                                    >
                                        <div className="text-xs text-red-400 font-black tracking-widest uppercase">{t.incorrect}</div>
                                        <div className="text-xs text-red-300/60 leading-relaxed font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                                            HINT: <InlineMath math={getHint() || ""} />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Scenario Info */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={stage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-6 bg-cyan-950/20 border border-cyan-500/20 rounded-2xl backdrop-blur-sm"
                    >
                        <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#00ffff]" />
                            {t.footer_left}
                        </h3>
                        <p className="text-xs leading-relaxed text-cyan-100/70 italic font-light">
                            {stage === "PRINCIPLES" ? t.scenarios.basel_metal_refinery :
                                stage === "PLATING" ? t.scenarios.swiss_watchmaking :
                                    t.scenarios.rhine_infrastructure}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
