"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
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
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [voltage, setVoltage] = useState(2.0);
    const [electrolyte, setElectrolyte] = useState("ZnCl2");
    const [showIons, setShowIons] = useState(true);

    const buildPool = useCallback((difficulty: Difficulty, stage: Stage): GC102Quest[] => {
        const pool: GC102Quest[] = [];

        // Each stage × difficulty = 5 questions (60 total)
        if (stage === "PRINCIPLES") {
            const questData = {
                BASIC: [
                    { metal: "Copper", current: 1.0, time: 600, z: 2, M: 63.5 },
                    { metal: "Zinc", current: 2.0, time: 1200, z: 2, M: 65.4 },
                    { metal: "Silver", current: 1.5, time: 900, z: 1, M: 107.9 },
                    { metal: "Copper", current: 0.5, time: 300, z: 2, M: 63.5 },
                    { metal: "Zinc", current: 1.0, time: 600, z: 2, M: 65.4 }
                ],
                CORE: [
                    { metal: "Aluminium", current: 2.0, time: 1800, z: 3, M: 27.0 },
                    { metal: "Silver", current: 2.5, time: 1500, z: 1, M: 107.9 },
                    { metal: "Copper", current: 3.0, time: 2400, z: 2, M: 63.5 },
                    { metal: "Zinc", current: 1.5, time: 1000, z: 2, M: 65.4 },
                    { metal: "Aluminium", current: 1.0, time: 900, z: 3, M: 27.0 }
                ],
                ADVANCED: [
                    { metal: "Copper", current: 2.5, time: 3600, z: 2, M: 63.5 },
                    { metal: "Silver", current: 3.0, time: 2700, z: 1, M: 107.9 },
                    { metal: "Aluminium", current: 2.0, time: 3000, z: 3, M: 27.0 },
                    { metal: "Zinc", current: 2.0, time: 2400, z: 2, M: 65.4 },
                    { metal: "Copper", current: 1.5, time: 1800, z: 2, M: 63.5 }
                ],
                ELITE: [
                    { metal: "Aluminium", current: 3.0, time: 4500, z: 3, M: 27.0 },
                    { metal: "Silver", current: 4.0, time: 3600, z: 1, M: 107.9 },
                    { metal: "Copper", current: 3.5, time: 5400, z: 2, M: 63.5 },
                    { metal: "Zinc", current: 2.5, time: 3600, z: 2, M: 65.4 },
                    { metal: "Aluminium", current: 2.5, time: 3600, z: 3, M: 27.0 }
                ]
            };

            const dataList = questData[difficulty];
            dataList.forEach((data, idx) => {
                const F = 96485;
                const expectedMass = (data.current * data.time * data.M) / (data.z * F);

                pool.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    metal: data.metal,
                    current: data.current,
                    time: data.time,
                    solution: `${data.metal}SO4`,
                    promptLatex: `I = ${data.current}A, t = ${data.time}s, M = ${data.M}g/mol, z = ${data.z}`,
                    expressionLatex: `m = \\\\frac{I \\cdot t \\cdot M}{z \\cdot F}`,
                    targetLatex: `m \\\\text{ (g)}`,
                    slots: [
                        { id: "mass", labelLatex: "m", placeholder: "0.00", expected: parseFloat(expectedMass.toFixed(3)) }
                    ],
                    correctLatex: `${expectedMass.toFixed(3)}g`
                });
            });
        } else if (stage === "PLATING") {
            const questData = {
                BASIC: [
                    { solution: "CuSO4", expected: 2 },
                    { solution: "AgNO3", expected: 2 },
                    { solution: "ZnCl2", expected: 2 },
                    { solution: "NiSO4", expected: 2 },
                    { solution: "CuSO4", expected: 2 }
                ],
                CORE: [
                    { solution: "AuCl3", expected: 2 },
                    { solution: "CuSO4", expected: 2 },
                    { solution: "AgNO3", expected: 2 },
                    { solution: "ZnCl2", expected: 2 },
                    { solution: "NiSO4", expected: 2 }
                ],
                ADVANCED: [
                    { solution: "CuSO4", expected: 2 },
                    { solution: "AgNO3", expected: 2 },
                    { solution: "AuCl3", expected: 2 },
                    { solution: "ZnCl2", expected: 2 },
                    { solution: "NiSO4", expected: 2 }
                ],
                ELITE: [
                    { solution: "AuCl3", expected: 2 },
                    { solution: "PtCl4", expected: 2 },
                    { solution: "AgNO3", expected: 2 },
                    { solution: "CuSO4", expected: 2 },
                    { solution: "NiSO4", expected: 2 }
                ]
            };

            const dataList = questData[difficulty];
            dataList.forEach((data, idx) => {
                pool.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    metal: data.solution.substring(0, 2),
                    current: 1.5,
                    time: 500,
                    solution: data.solution,
                    promptLatex: `Electrolysis of ${data.solution}`,
                    expressionLatex: `\\\\text{Which electrode for object?}`,
                    targetLatex: `\\\\text{1: Anode, 2: Cathode}`,
                    slots: [
                        { id: "electrode", labelLatex: "\\\\text{Pos}", placeholder: "1 or 2", expected: data.expected }
                    ],
                    correctLatex: `\\\\text{Cathode}`
                });
            });
        } else {
            const questData = {
                BASIC: [
                    { metal: "Iron", expected: 1 },
                    { metal: "Steel", expected: 1 },
                    { metal: "Copper", expected: 1 },
                    { metal: "Iron", expected: 1 },
                    { metal: "Steel", expected: 1 }
                ],
                CORE: [
                    { metal: "Aluminium", expected: 1 },
                    { metal: "Iron", expected: 1 },
                    { metal: "Steel", expected: 1 },
                    { metal: "Copper", expected: 1 },
                    { metal: "Zinc", expected: 1 }
                ],
                ADVANCED: [
                    { metal: "Iron", expected: 1 },
                    { metal: "Steel", expected: 1 },
                    { metal: "Copper", expected: 1 },
                    { metal: "Aluminium", expected: 1 },
                    { metal: "Zinc", expected: 1 }
                ],
                ELITE: [
                    { metal: "Iron", expected: 1 },
                    { metal: "Steel", expected: 1 },
                    { metal: "Copper", expected: 1 },
                    { metal: "Aluminium", expected: 1 },
                    { metal: "Titanium", expected: 1 }
                ]
            };

            const dataList = questData[difficulty];
            dataList.forEach((data, idx) => {
                pool.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    metal: data.metal,
                    current: 0,
                    time: 0,
                    solution: "Seawater",
                    promptLatex: `Protecting ${data.metal} from corrosion.`,
                    expressionLatex: `\\\\text{Select sacrificial anode: 1: Mg, 2: Au, 3: Pt}`,
                    targetLatex: `\\\\text{Option}`,
                    slots: [
                        { id: "anode", labelLatex: "\\\\text{Choice}", placeholder: "1-3", expected: data.expected }
                    ],
                    correctLatex: `\\\\text{Magnesium (Mg)}`
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
            title={t("gc1_02.title")}
            moduleCode="GC1.02"
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            stages={[
                { id: "PRINCIPLES", label: t("gc1_02.stages.principles") },
                { id: "PLATING", label: t("gc1_02.stages.plating") },
                { id: "CORROSION", label: t("gc1_02.stages.corrosion") },
            ]}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            footerLeft={t("gc1_02.footer_left")}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            successRate={successRate}
            translations={{
                back: t("gc1_02.back"),
                check: t("gc1_02.check"),
                next: t("gc1_02.next"),
                correct: t("gc1_02.correct"),
                incorrect: t("gc1_02.incorrect"),
                ready: t("gc1_02.ready"),
                monitor_title: t("gc1_02.monitor_title"),
                difficulty: {
                    BASIC: t("gc1_02.difficulty.BASIC"),
                    CORE: t("gc1_02.difficulty.CORE"),
                    ADVANCED: t("gc1_02.difficulty.ADVANCED"),
                    ELITE: t("gc1_02.difficulty.ELITE"),
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
                                    {t("gc1_02.labels.power_status")}
                                </button>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{t("gc1_02.monitor_title")}</div>
                                <div className="text-xs font-mono text-cyan-400">STATUS: NOMINAL</div>
                            </div>
                        </div>
                    </div>

                    {/* Property Cards */}
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { label: t("gc1_02.labels.voltage"), value: `${voltage.toFixed(1)} V`, icon: "⚡" },
                            { label: t("gc1_02.labels.current"), value: `${currentQuest?.current || 0} A`, icon: "I" },
                            { label: t("gc1_02.labels.time"), value: `${currentQuest?.time || 0} s`, icon: "T" },
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
                            <span>{t("gc1_02.labels.mass_deposited")}</span>
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
                        {t("gc1_02.objective_title")}
                    </div>

                    {currentQuest && (
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="text-2xl text-white font-light leading-snug">
                                    {t("gc1_02.prompts.calc_mass", { 
                                        metal: currentQuest.metal, 
                                        current: currentQuest.current.toString(), 
                                        time: currentQuest.time.toString(), 
                                        solution: currentQuest.solution 
                                    })}
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
                                            {t("gc1_02.check")}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={next}
                                            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-xl transition-all shadow-lg shadow-green-900/40 active:scale-[0.98] tracking-[0.2em] uppercase text-xs"
                                        >
                                            {t("gc1_02.next")}
                                        </button>
                                    )}
                                </div>

                                {lastCheck && !lastCheck.ok && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl space-y-2"
                                    >
                                        <div className="text-xs text-red-400 font-black tracking-widest uppercase">{t("gc1_02.incorrect")}</div>
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
                            {t("gc1_02.footer_left")}
                        </h3>
                        <p className="text-xs leading-relaxed text-cyan-100/70 italic font-light">
                            {stage === "PRINCIPLES" ? t("gc1_02.scenarios.basel_metal_refinery") :
                                stage === "PLATING" ? t("gc1_02.scenarios.swiss_watchmaking") :
                                    t("gc1_02.scenarios.rhine_infrastructure")}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
