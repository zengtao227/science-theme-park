"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MeasurementCanvas from "@/components/chamber/sp3-01/MeasurementCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "SI_UNITS" | "CONVERSION" | "PRECISION";

interface SP301Quest extends Quest {
    stage: Stage;
    value?: number;
    fromUnit?: string;
    toUnit?: string;
    measurement?: string;
}

type SP301T = typeof translations.EN.sp3_01;

export default function SP301Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp3_01 || translations.EN.sp3_01) as SP301T;
    const [selectedTool, setSelectedTool] = useState<string>("ruler");
    const [measurementValue, setMeasurementValue] = useState<number>(0);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP301Quest[] => {
        const quests: SP301Quest[] = [];

        if (stage === "SI_UNITS") {
            // Basic SI unit identification
            const units = [
                { measurement: "length", unit: "m", name: "meter" },
                { measurement: "mass", unit: "kg", name: "kilogram" },
                { measurement: "time", unit: "s", name: "second" },
                { measurement: "temperature", unit: "K", name: "kelvin" },
                { measurement: "current", unit: "A", name: "ampere" }
            ];

            units.forEach((u, idx) => {
                quests.push({
                    id: `SI-${idx}`,
                    difficulty,
                    stage,
                    measurement: u.measurement,
                    promptLatex: `\\text{${t.prompts.si_unit.replace('{measurement}', u.measurement)}}`,
                    expressionLatex: `\\text{${u.measurement}} \\rightarrow \\text{?}`,
                    targetLatex: u.unit,
                    slots: [{ id: "ans", labelLatex: "\\text{SI Unit}", placeholder: "...", expected: u.unit }],
                    correctLatex: `\\text{${u.unit}} \\text{ (${u.name})}`,
                    hintLatex: [`\\text{${t.prompts.hint_si.replace('{name}', u.name)}}`]
                });
            });
        }

        if (stage === "CONVERSION") {
            // Unit conversions
            const conversions = [
                { value: 1000, from: "m", to: "km", factor: 0.001, answer: "1" },
                { value: 5, from: "km", to: "m", factor: 1000, answer: "5000" },
                { value: 100, from: "cm", to: "m", factor: 0.01, answer: "1" },
                { value: 2.5, from: "kg", to: "g", factor: 1000, answer: "2500" },
                { value: 3600, from: "s", to: "h", factor: 1 / 3600, answer: "1" }
            ];

            conversions.forEach((c, idx) => {
                const result = (c.value * c.factor).toString();
                quests.push({
                    id: `CONV-${idx}`,
                    difficulty,
                    stage,
                    value: c.value,
                    fromUnit: c.from,
                    toUnit: c.to,
                    promptLatex: `\\text{${t.prompts.convert.replace('{value}', c.value.toString()).replace('{from}', c.from).replace('{to}', c.to)}}`,
                    expressionLatex: `${c.value}\\,\\text{${c.from}} = \\text{?}\\,\\text{${c.to}}`,
                    targetLatex: result,
                    slots: [{ id: "ans", labelLatex: `\\text{${c.to}}`, placeholder: "...", expected: result }],
                    correctLatex: `${result}\\,\\text{${c.to}}`,
                    hintLatex: [`\\text{${t.prompts.hint_factor.replace('{factor}', c.factor.toString())}}`]
                });
            });
        }

        if (stage === "PRECISION") {
            // Significant figures and precision
            const precision = [
                { value: "12.5", sigfigs: "3", measurement: "length" },
                { value: "0.0045", sigfigs: "2", measurement: "mass" },
                { value: "100", sigfigs: "1", measurement: "time" },
                { value: "3.14", sigfigs: "3", measurement: "distance" },
                { value: "0.500", sigfigs: "3", measurement: "volume" }
            ];

            precision.forEach((p, idx) => {
                quests.push({
                    id: `PREC-${idx}`,
                    difficulty,
                    stage,
                    promptLatex: `\\text{${t.prompts.sigfigs.replace('{value}', p.value)}}`,
                    expressionLatex: `${p.value} \\rightarrow \\text{? sig figs}`,
                    targetLatex: p.sigfigs,
                    slots: [{ id: "ans", labelLatex: "\\text{Sig Figs}", placeholder: "...", expected: p.sigfigs }],
                    correctLatex: `${p.sigfigs}\\text{ significant figures}`,
                    hintLatex: [`\\text{${t.prompts.hint_sigfigs}}`]
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
    } = useQuestManager<SP301Quest, Stage>({
        buildPool,
        initialStage: "SI_UNITS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SP3.01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "SI_UNITS", label: t.stages.si_units },
        { id: "CONVERSION", label: t.stages.conversion },
        { id: "PRECISION", label: t.stages.precision },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SP3.01"
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
                        <MeasurementCanvas
                            tool={selectedTool}
                            value={measurementValue}
                            stage={stage}
                            translations={t}
                        />
                    </div>

                    {/* Tool Selection */}
                    <div className="grid grid-cols-3 gap-2">
                        {["ruler", "scale", "timer"].map((tool) => (
                            <button
                                key={tool}
                                onClick={() => setSelectedTool(tool)}
                                className={`p-2 text-[9px] uppercase tracking-widest font-bold rounded border transition-all ${selectedTool === tool
                                    ? "bg-neon-green/20 border-neon-green text-neon-green"
                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {t.tools[tool as keyof typeof t.tools]}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.precision}</span>
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
                                    {t.labels.measurement_display}
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
                                                <span className="text-neon-green/30 font-mono">MEAS_0x{slot.id.toUpperCase()}</span>
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
