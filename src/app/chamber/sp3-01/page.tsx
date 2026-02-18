"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
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

export default function SP301Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const { t } = useLanguage();
    
    const sp3_01_t = {
        title: t("sp3_01.title"),
        back: t("sp3_01.back"),
        check: t("sp3_01.check"),
        next: t("sp3_01.next"),
        correct: t("sp3_01.correct"),
        incorrect: t("sp3_01.incorrect"),
        ready: t("sp3_01.ready"),
        monitor_title: t("sp3_01.monitor_title"),
        footer_left: t("sp3_01.footer_left"),
        objective_title: t("sp3_01.objective_title"),
        target_title: t("sp3_01.target_title"),
        difficulty: {
            basic: t("sp3_01.difficulty.basic"),
            core: t("sp3_01.difficulty.core"),
            advanced: t("sp3_01.difficulty.advanced"),
            elite: t("sp3_01.difficulty.elite")
        },
        stages: {
            si_units: t("sp3_01.stages.si_units"),
            conversion: t("sp3_01.stages.conversion"),
            precision: t("sp3_01.stages.precision")
        },
        labels: {
            measurement_tool: t("sp3_01.labels.measurement_tool"),
            ruler: t("sp3_01.labels.ruler"),
            caliper: t("sp3_01.labels.caliper"),
            micrometer: t("sp3_01.labels.micrometer"),
            measured_value: t("sp3_01.labels.measured_value"),
            precision: t("sp3_01.labels.precision"),
            measurement_display: t("sp3_01.labels.measurement_display"),
            input_terminal: t("sp3_01.labels.input_terminal")
        },
        tools: {
            ruler: t("sp3_01.tools.ruler"),
            scale: t("sp3_01.tools.scale"),
            timer: t("sp3_01.tools.timer")
        },
        feedback: {
            correct: t("sp3_01.feedback.correct"),
            incorrect: t("sp3_01.feedback.incorrect")
        },
        mission: {
            title: t("sp3_01.mission.title"),
            description: t("sp3_01.mission.description")
        }
    };
    
    const [selectedTool, setSelectedTool] = useState<string>("ruler");
    const [measurementValue, setMeasurementValue] = useState<number>(0);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP301Quest[] => {
        const quests: SP301Quest[] = [];

        const QUEST_DATA: Record<Stage, Record<Difficulty, any[]>> = {
            SI_UNITS: {
                BASIC: [
                    { measurement: "length", unit: "m", name: "meter" },
                    { measurement: "mass", unit: "\text{kg}", name: "kilogram" },
                    { measurement: "time", unit: "s", name: "second" },
                    { measurement: "temperature", unit: "K", name: "kelvin" },
                    { measurement: "current", unit: "A", name: "ampere" }
                ],
                CORE: [
                    { quantity: "force", unit: "\text{N}", formula: "kg·m/s²" },
                    { quantity: "energy", unit: "\text{J}", formula: "N·m" },
                    { quantity: "power", unit: "\text{W}", formula: "J/s" },
                    { quantity: "pressure", unit: "\text{Pa}", formula: "N/m²" },
                    { quantity: "frequency", unit: "Hz", formula: "1/s" }
                ],
                ADVANCED: [
                    { value: 5000, from: "mm", to: "m", answer: "5" },
                    { value: 2.5, from: "kg", to: "g", answer: "2500" },
                    { value: 3600, from: "s", to: "h", answer: "1" },
                    { value: 0.5, from: "km", to: "m", answer: "500" },
                    { value: 250, from: "cm", to: "m", answer: "2.5" }
                ],
                ELITE: [
                    { expr: "kg·m²/s²", unit: "\text{J}", name: "joule" },
                    { expr: "kg·m/s²", unit: "\text{N}", name: "newton" },
                    { expr: "kg/(m·s²)", unit: "\text{Pa}", name: "pascal" },
                    { expr: "J/s", unit: "\text{W}", name: "watt" },
                    { expr: "C/s", unit: "A", name: "ampere" }
                ]
            },
            CONVERSION: {
                BASIC: [
                    { value: 1000, from: "m", to: "km", factor: 0.001, answer: "1" },
                    { value: 5, from: "km", to: "m", factor: 1000, answer: "5000" },
                    { value: 100, from: "cm", to: "m", factor: 0.01, answer: "1" },
                    { value: 2.5, from: "kg", to: "g", factor: 1000, answer: "2500" },
                    { value: 3600, from: "s", to: "h", factor: 1 / 3600, answer: "1" }
                ],
                CORE: [
                    { value: 2.5, from: "km", to: "cm", answer: "250000" },
                    { value: 0.5, from: "kg", to: "mg", answer: "500000" },
                    { value: 2, from: "h", to: "s", answer: "7200" },
                    { value: 500, from: "mm", to: "km", answer: "0.0005" },
                    { value: 1.5, from: "L", to: "mL", answer: "1500" }
                ],
                ADVANCED: [
                    { value: 1, from: "m²", to: "cm²", answer: "10000" },
                    { value: 2, from: "km²", to: "m²", answer: "2000000" },
                    { value: 1, from: "m³", to: "L", answer: "1000" },
                    { value: 0.5, from: "m³", to: "cm³", answer: "500000" },
                    { value: 5000, from: "cm²", to: "m²", answer: "0.5" }
                ],
                ELITE: [
                    { value: 72, from: "km/h", to: "m/s", answer: "20" },
                    { value: 10, from: "m/s", to: "km/h", answer: "36" },
                    { value: 1000, from: "g/cm³", to: "kg/m³", answer: "1000000" },
                    { value: 2, from: "kg/m³", to: "g/cm³", answer: "0.002" },
                    { value: 100, from: "kPa", to: "Pa", answer: "100000" }
                ]
            },
            PRECISION: {
                BASIC: [
                    { value: "12.5", sigfigs: "3", measurement: "length" },
                    { value: "0.0045", sigfigs: "2", measurement: "mass" },
                    { value: "100", sigfigs: "1", measurement: "time" },
                    { value: "3.14", sigfigs: "3", measurement: "distance" },
                    { value: "0.500", sigfigs: "3", measurement: "volume" }
                ],
                CORE: [
                    { value: "12.345", sigfigs: 3, answer: "12.3" },
                    { value: "0.004567", sigfigs: 2, answer: "0.0046" },
                    { value: "1234.5", sigfigs: 3, answer: "1230" },
                    { value: "0.09876", sigfigs: 2, answer: "0.099" },
                    { value: "567.89", sigfigs: 4, answer: "567.9" }
                ],
                ADVANCED: [
                    { expr: "12.5 + 3.456", answer: "16.0", rule: "decimal places" },
                    { expr: "4.5 × 2.34", answer: "11", rule: "sig figs" },
                    { expr: "100.0 ÷ 3.0", answer: "33", rule: "sig figs" },
                    { expr: "25.0 - 12.34", answer: "12.7", rule: "decimal places" },
                    { expr: "2.5 × 3.14", answer: "7.9", rule: "sig figs" }
                ],
                ELITE: [
                    { measurement: "12.5 ± 0.1", quantity: "length", unit: "cm", percent: "0.8" },
                    { measurement: "100 ± 5", quantity: "mass", unit: "g", percent: "5" },
                    { measurement: "25.0 ± 0.5", quantity: "time", unit: "s", percent: "2" },
                    { measurement: "50 ± 2", quantity: "volume", unit: "mL", percent: "4" },
                    { measurement: "200 ± 10", quantity: "distance", unit: "m", percent: "5" }
                ]
            }
        };

        if (stage === "SI_UNITS") {
            if (difficulty === "BASIC") {
                QUEST_DATA.SI_UNITS.BASIC.forEach((u, idx) => {
                    quests.push({
                        id: `SI-B${idx}`,
                        difficulty,
                        stage,
                        measurement: u.measurement,
                        promptLatex: `\\text{What is the SI unit for ${u.measurement}?}`,
                        expressionLatex: `\\text{${u.measurement}} \\rightarrow \\text{?}`,
                        targetLatex: u.unit,
                        slots: [{ id: "ans", labelLatex: "\\text{SI Unit}", placeholder: "...", expected: u.unit }],
                        correctLatex: `\\text{${u.unit}} \\text{ (${u.name})}`,
                        hintLatex: [`\\text{The base unit for ${u.measurement} is ${u.name}}`]
                    });
                });
            }
            
            if (difficulty === "CORE") {
                QUEST_DATA.SI_UNITS.CORE.forEach((d, idx) => {
                    quests.push({
                        id: `SI-C${idx}`,
                        difficulty,
                        stage,
                        promptLatex: `\\text{What is the SI unit for ${d.quantity}?}`,
                        expressionLatex: `\\text{${d.quantity}} = ${d.formula}`,
                        targetLatex: d.unit,
                        slots: [{ id: "ans", labelLatex: "\\text{Unit}", placeholder: "...", expected: d.unit }],
                        correctLatex: `\\text{${d.unit}}`,
                        hintLatex: [`\\text{${d.formula}}`]
                    });
                });
            }
            
            if (difficulty === "ADVANCED") {
                QUEST_DATA.SI_UNITS.ADVANCED.forEach((c, idx) => {
                    quests.push({
                        id: `SI-A${idx}`,
                        difficulty,
                        stage,
                        value: c.value,
                        fromUnit: c.from,
                        toUnit: c.to,
                        promptLatex: `\\text{Convert ${c.value} ${c.from} to ${c.to}}`,
                        expressionLatex: `${c.value}\\,\\text{${c.from}} = \\text{?}\\,\\text{${c.to}}`,
                        targetLatex: c.answer,
                        slots: [{ id: "ans", labelLatex: `\\text{${c.to}}`, placeholder: "...", expected: c.answer }],
                        correctLatex: `${c.answer}\\,\\text{${c.to}}`,
                        hintLatex: [`\\text{Use metric prefixes}`]
                    });
                });
            }
            
            if (difficulty === "ELITE") {
                QUEST_DATA.SI_UNITS.ELITE.forEach((c, idx) => {
                    quests.push({
                        id: `SI-E${idx}`,
                        difficulty,
                        stage,
                        promptLatex: `\\text{What unit is equivalent to ${c.expr}?}`,
                        expressionLatex: `${c.expr} = \\text{?}`,
                        targetLatex: c.unit,
                        slots: [{ id: "ans", labelLatex: "\\text{Unit}", placeholder: "...", expected: c.unit }],
                        correctLatex: `\\text{${c.unit} (${c.name})}`,
                        hintLatex: [`\\text{Simplify the base units}`]
                    });
                });
            }
        }

        if (stage === "CONVERSION") {
            if (difficulty === "BASIC") {
                // Simple metric conversions
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
                        id: `CONV-B${idx}`,
                        difficulty,
                        stage,
                        value: c.value,
                        fromUnit: c.from,
                        toUnit: c.to,
                        promptLatex: `\\text{Convert ${c.value} ${c.from} to ${c.to}}`,
                        expressionLatex: `${c.value}\\,\\text{${c.from}} = \\text{?}\\,\\text{${c.to}}`,
                        targetLatex: result,
                        slots: [{ id: "ans", labelLatex: `\\text{${c.to}}`, placeholder: "...", expected: result }],
                        correctLatex: `${result}\\,\\text{${c.to}}`,
                        hintLatex: [`\\text{Factor: ${c.factor}}`]
                    });
                });
            }
            
            if (difficulty === "CORE") {
                // Multi-step conversions
                const conversions = [
                    { value: 2.5, from: "km", to: "cm", answer: "250000" },
                    { value: 0.5, from: "kg", to: "mg", answer: "500000" },
                    { value: 2, from: "h", to: "s", answer: "7200" },
                    { value: 500, from: "mm", to: "km", answer: "0.0005" },
                    { value: 1.5, from: "L", to: "mL", answer: "1500" }
                ];

                conversions.forEach((c, idx) => {
                    quests.push({
                        id: `CONV-C${idx}`,
                        difficulty,
                        stage,
                        value: c.value,
                        fromUnit: c.from,
                        toUnit: c.to,
                        promptLatex: `\\text{Convert ${c.value} ${c.from} to ${c.to}}`,
                        expressionLatex: `${c.value}\\,\\text{${c.from}} = \\text{?}\\,\\text{${c.to}}`,
                        targetLatex: c.answer,
                        slots: [{ id: "ans", labelLatex: `\\text{${c.to}}`, placeholder: "...", expected: c.answer }],
                        correctLatex: `${c.answer}\\,\\text{${c.to}}`,
                        hintLatex: [`\\text{Multiple steps needed}`]
                    });
                });
            }
            
            if (difficulty === "ADVANCED") {
                // Area and volume conversions
                const conversions = [
                    { value: 1, from: "m²", to: "cm²", answer: "10000" },
                    { value: 2, from: "km²", to: "m²", answer: "2000000" },
                    { value: 1, from: "m³", to: "L", answer: "1000" },
                    { value: 0.5, from: "m³", to: "cm³", answer: "500000" },
                    { value: 5000, from: "cm²", to: "m²", answer: "0.5" }
                ];

                conversions.forEach((c, idx) => {
                    quests.push({
                        id: `CONV-A${idx}`,
                        difficulty,
                        stage,
                        value: c.value,
                        fromUnit: c.from,
                        toUnit: c.to,
                        promptLatex: `\\text{Convert ${c.value} ${c.from} to ${c.to}}`,
                        expressionLatex: `${c.value}\\,\\text{${c.from}} = \\text{?}\\,\\text{${c.to}}`,
                        targetLatex: c.answer,
                        slots: [{ id: "ans", labelLatex: `\\text{${c.to}}`, placeholder: "...", expected: c.answer }],
                        correctLatex: `${c.answer}\\,\\text{${c.to}}`,
                        hintLatex: [`\\text{Square or cube the conversion factor}`]
                    });
                });
            }
            
            if (difficulty === "ELITE") {
                // Compound unit conversions
                const conversions = [
                    { value: 72, from: "km/h", to: "m/s", answer: "20" },
                    { value: 10, from: "m/s", to: "km/h", answer: "36" },
                    { value: 1000, from: "g/cm³", to: "kg/m³", answer: "1000000" },
                    { value: 2, from: "kg/m³", to: "g/cm³", answer: "0.002" },
                    { value: 100, from: "kPa", to: "Pa", answer: "100000" }
                ];

                conversions.forEach((c, idx) => {
                    quests.push({
                        id: `CONV-E${idx}`,
                        difficulty,
                        stage,
                        value: c.value,
                        fromUnit: c.from,
                        toUnit: c.to,
                        promptLatex: `\\text{Convert ${c.value} ${c.from} to ${c.to}}`,
                        expressionLatex: `${c.value}\\,\\text{${c.from}} = \\text{?}\\,\\text{${c.to}}`,
                        targetLatex: c.answer,
                        slots: [{ id: "ans", labelLatex: `\\text{${c.to}}`, placeholder: "...", expected: c.answer }],
                        correctLatex: `${c.answer}\\,\\text{${c.to}}`,
                        hintLatex: [`\\text{Convert numerator and denominator separately}`]
                    });
                });
            }
        }

        if (stage === "PRECISION") {
            if (difficulty === "BASIC") {
                // Counting significant figures
                const precision = [
                    { value: "12.5", sigfigs: "3", measurement: "length" },
                    { value: "0.0045", sigfigs: "2", measurement: "mass" },
                    { value: "100", sigfigs: "1", measurement: "time" },
                    { value: "3.14", sigfigs: "3", measurement: "distance" },
                    { value: "0.500", sigfigs: "3", measurement: "volume" }
                ];

                precision.forEach((p, idx) => {
                    quests.push({
                        id: `PREC-B${idx}`,
                        difficulty,
                        stage,
                        promptLatex: `\\text{How many significant figures in ${p.value}?}`,
                        expressionLatex: `${p.value} \\rightarrow \\text{? sig figs}`,
                        targetLatex: p.sigfigs,
                        slots: [{ id: "ans", labelLatex: "\\text{Sig Figs}", placeholder: "...", expected: p.sigfigs }],
                        correctLatex: `${p.sigfigs}\\text{ significant figures}`,
                        hintLatex: [`\\text{Count non-zero digits and trapped zeros}`]
                    });
                });
            }
            
            if (difficulty === "CORE") {
                // Rounding to significant figures
                const rounding = [
                    { value: "12.345", sigfigs: 3, answer: "12.3" },
                    { value: "0.004567", sigfigs: 2, answer: "0.0046" },
                    { value: "1234.5", sigfigs: 3, answer: "1230" },
                    { value: "0.09876", sigfigs: 2, answer: "0.099" },
                    { value: "567.89", sigfigs: 4, answer: "567.9" }
                ];

                rounding.forEach((r, idx) => {
                    quests.push({
                        id: `PREC-C${idx}`,
                        difficulty,
                        stage,
                        promptLatex: `\\text{Round ${r.value} to ${r.sigfigs} significant figures}`,
                        expressionLatex: `${r.value} \\rightarrow ${r.sigfigs}\\text{ sig figs}`,
                        targetLatex: r.answer,
                        slots: [{ id: "ans", labelLatex: "\\text{Result}", placeholder: "...", expected: r.answer }],
                        correctLatex: `${r.answer}`,
                        hintLatex: [`\\text{Round at the ${r.sigfigs}th significant digit}`]
                    });
                });
            }
            
            if (difficulty === "ADVANCED") {
                // Calculations with significant figures
                const calculations = [
                    { expr: "12.5 + 3.456", answer: "16.0", rule: "decimal places" },
                    { expr: "4.5 × 2.34", answer: "11", rule: "sig figs" },
                    { expr: "100.0 ÷ 3.0", answer: "33", rule: "sig figs" },
                    { expr: "25.0 - 12.34", answer: "12.7", rule: "decimal places" },
                    { expr: "2.5 × 3.14", answer: "7.9", rule: "sig figs" }
                ];

                calculations.forEach((c, idx) => {
                    quests.push({
                        id: `PREC-A${idx}`,
                        difficulty,
                        stage,
                        promptLatex: `\\text{Calculate ${c.expr} with proper sig figs}`,
                        expressionLatex: `${c.expr}`,
                        targetLatex: c.answer,
                        slots: [{ id: "ans", labelLatex: "\\text{Result}", placeholder: "...", expected: c.answer }],
                        correctLatex: `${c.answer}`,
                        hintLatex: [`\\text{Use ${c.rule} rule}`]
                    });
                });
            }
            
            if (difficulty === "ELITE") {
                // Uncertainty and error analysis
                const uncertainty = [
                    { measurement: "12.5 ± 0.1", quantity: "length", unit: "cm", percent: "0.8" },
                    { measurement: "100 ± 5", quantity: "mass", unit: "g", percent: "5" },
                    { measurement: "25.0 ± 0.5", quantity: "time", unit: "s", percent: "2" },
                    { measurement: "50 ± 2", quantity: "volume", unit: "mL", percent: "4" },
                    { measurement: "200 ± 10", quantity: "distance", unit: "m", percent: "5" }
                ];

                uncertainty.forEach((u, idx) => {
                    quests.push({
                        id: `PREC-E${idx}`,
                        difficulty,
                        stage,
                        promptLatex: `\\text{What is the percent uncertainty of ${u.measurement} ${u.unit}?}`,
                        expressionLatex: `\\frac{\\text{uncertainty}}{\\text{value}} \\times 100\\%`,
                        targetLatex: u.percent,
                        slots: [{ id: "ans", labelLatex: "\\text{Percent}", placeholder: "...", expected: u.percent }],
                        correctLatex: `${u.percent}\\%`,
                        hintLatex: [`\\text{Divide uncertainty by measurement}`]
                    });
                });
            }
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
        { id: "SI_UNITS", label: sp3_01_t.stages.si_units },
        { id: "CONVERSION", label: sp3_01_t.stages.conversion },
        { id: "PRECISION", label: sp3_01_t.stages.precision },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SP3.01"
            title={sp3_01_t.title}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sp3_01_t.footer_left}
            translations={{
                back: sp3_01_t.back,
                check: sp3_01_t.check,
                next: sp3_01_t.next,
                correct: sp3_01_t.correct,
                incorrect: sp3_01_t.incorrect,
                ready: sp3_01_t.ready,
                monitor_title: sp3_01_t.monitor_title,
                difficulty: {
                    basic: sp3_01_t.difficulty.basic,
                    core: sp3_01_t.difficulty.core,
                    advanced: sp3_01_t.difficulty.advanced,
                    elite: sp3_01_t.difficulty.elite,
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
                                {sp3_01_t.tools[tool as keyof typeof sp3_01_t.tools]}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{sp3_01_t.labels.precision}</span>
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
                                {sp3_01_t.objective_title}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-green/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-green/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {sp3_01_t.labels.measurement_display}
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
                                    {sp3_01_t.labels.input_terminal}
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
                                                        {lastCheck.ok ? sp3_01_t.correct : sp3_01_t.incorrect}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? sp3_01_t.feedback.correct : sp3_01_t.feedback.incorrect}
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
                                                    {sp3_01_t.next}
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
