"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CircuitVisualization from "@/components/chamber/sp2-01/CircuitVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "COMPONENTS" | "SIMPLE_CIRCUITS" | "CIRCUIT_DIAGRAMS";

interface SP201Quest extends Quest {
    stage: Stage;
    component?: string;
    circuit?: {
        battery: number;
        bulbs: number;
        switches: number;
        wires: number;
    };
    symbol?: string;
    answer: string;
}

export default function SP201CircuitBasics() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [lightIntensity, setLightIntensity] = useState(0);

    // Translation object - extract all t() calls
    const sp2_01_t = useMemo(() => ({
        title: t("sp2_01.title"),
        back: t("sp2_01.back"),
        difficulty: {
            basic: t("sp2_01.difficulty.basic"),
            core: t("sp2_01.difficulty.core"),
            advanced: t("sp2_01.difficulty.advanced"),
            elite: t("sp2_01.difficulty.elite")
        },
        stages: {
            components: t("sp2_01.stages.components"),
            simple_circuits: t("sp2_01.stages.simple_circuits"),
            circuit_diagrams: t("sp2_01.stages.circuit_diagrams")
        },
        scenarios: {
            components: t("sp2_01.scenarios.components"),
            simple_circuits: t("sp2_01.scenarios.simple_circuits"),
            circuit_diagrams: t("sp2_01.scenarios.circuit_diagrams")
        },
        footer_left: t("sp2_01.footer_left"),
        check: t("sp2_01.check"),
        next: t("sp2_01.next"),
        correct: t("sp2_01.correct"),
        incorrect: t("sp2_01.incorrect")
    }), [t]);

    // Build stage pool function
    const buildStagePool = useCallback((
        tObj: typeof sp2_01_t,
        difficulty: Difficulty,
        stage: Stage
    ): SP201Quest[] => {
        // STAGE 1: COMPONENTS - Identify circuit components
        if (stage === "COMPONENTS") {
            const componentsData = {
                BASIC: [
                    { component: "battery", answer: "battery", prompt: "Power source that provides voltage" },
                    { component: "bulb", answer: "bulb", prompt: "Converts electrical energy to light" },
                    { component: "switch", answer: "switch", prompt: "Controls circuit by opening/closing" },
                    { component: "wire", answer: "wire", prompt: "Conducts electricity between components" },
                    { component: "resistor", answer: "resistor", prompt: "Limits current flow in circuit" }
                ],
                CORE: [
                    { component: "battery_series", answer: "series", prompt: "Two batteries connected end-to-end" },
                    { component: "battery_parallel", answer: "parallel", prompt: "Two batteries connected side-by-side" },
                    { component: "bulb_bright", answer: "bright", prompt: "Bulb with low resistance glows..." },
                    { component: "bulb_dim", answer: "dim", prompt: "Bulb with high resistance glows..." },
                    { component: "switch_open", answer: "open", prompt: "Switch position that stops current" }
                ],
                ADVANCED: [
                    { component: "ammeter", answer: "ammeter", prompt: "Measures current in amperes (A)" },
                    { component: "voltmeter", answer: "voltmeter", prompt: "Measures voltage in volts (V)" },
                    { component: "fuse", answer: "fuse", prompt: "Safety device that melts when current too high" },
                    { component: "led", answer: "LED", prompt: "Light Emitting Diode - efficient light source" },
                    { component: "motor", answer: "motor", prompt: "Converts electrical energy to mechanical" }
                ],
                ELITE: [
                    { component: "capacitor", answer: "capacitor", prompt: "Stores electrical charge temporarily" },
                    { component: "diode", answer: "diode", prompt: "Allows current in one direction only" },
                    { component: "transistor", answer: "transistor", prompt: "Electronic switch or amplifier" },
                    { component: "transformer", answer: "transformer", prompt: "Changes voltage level using coils" },
                    { component: "relay", answer: "relay", prompt: "Electromagnetic switch controlled by current" }
                ]
            };

            return componentsData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                component: item.component,
                promptLatex: item.prompt,
                expressionLatex: `\\\\text{Component: } ${item.component}`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: "Component Name",
                        placeholder: "type name",
                        expected: item.answer
                    }
                ],
                correctLatex: `\\\\text{Answer: } ${item.answer}`,
                answer: item.answer
            }));
        }

        // STAGE 2: SIMPLE_CIRCUITS - Analyze simple circuits
        if (stage === "SIMPLE_CIRCUITS") {
            const circuitsData = {
                BASIC: [
                    { circuit: { battery: 1, bulbs: 1, switches: 1, wires: 2 }, answer: "complete", prompt: "Battery + bulb + closed switch = ?" },
                    { circuit: { battery: 1, bulbs: 1, switches: 1, wires: 2 }, answer: "incomplete", prompt: "Battery + bulb + open switch = ?" },
                    { circuit: { battery: 1, bulbs: 2, switches: 0, wires: 3 }, answer: "series", prompt: "Two bulbs in a single path = ?" },
                    { circuit: { battery: 1, bulbs: 2, switches: 0, wires: 4 }, answer: "parallel", prompt: "Two bulbs in separate paths = ?" },
                    { circuit: { battery: 0, bulbs: 1, switches: 1, wires: 2 }, answer: "no", prompt: "Circuit without battery will light bulb?" }
                ],
                CORE: [
                    { circuit: { battery: 1, bulbs: 3, switches: 0, wires: 4 }, answer: "dim", prompt: "Three bulbs in series are..." },
                    { circuit: { battery: 1, bulbs: 3, switches: 0, wires: 6 }, answer: "bright", prompt: "Three bulbs in parallel are..." },
                    { circuit: { battery: 2, bulbs: 1, switches: 0, wires: 3 }, answer: "brighter", prompt: "Two batteries in series make bulb..." },
                    { circuit: { battery: 1, bulbs: 2, switches: 2, wires: 4 }, answer: "independent", prompt: "Parallel circuit with switches: bulbs are..." },
                    { circuit: { battery: 1, bulbs: 2, switches: 1, wires: 3 }, answer: "dependent", prompt: "Series circuit with switch: bulbs are..." }
                ],
                ADVANCED: [
                    { circuit: { battery: 1, bulbs: 2, switches: 1, wires: 4 }, answer: "short", prompt: "Wire bypassing bulb creates..." },
                    { circuit: { battery: 1, bulbs: 1, switches: 0, wires: 1 }, answer: "incomplete", prompt: "Circuit with missing wire is..." },
                    { circuit: { battery: 1, bulbs: 3, switches: 2, wires: 6 }, answer: "mixed", prompt: "Circuit with both series and parallel = ?" },
                    { circuit: { battery: 2, bulbs: 2, switches: 0, wires: 5 }, answer: "balanced", prompt: "Two batteries + two bulbs in parallel = ?" },
                    { circuit: { battery: 1, bulbs: 4, switches: 1, wires: 7 }, answer: "complex", prompt: "Multiple paths with switch control = ?" }
                ],
                ELITE: [
                    { circuit: { battery: 2, bulbs: 3, switches: 2, wires: 8 }, answer: "network", prompt: "Complex circuit with multiple control points = ?" },
                    { circuit: { battery: 1, bulbs: 2, switches: 1, wires: 5 }, answer: "reversible", prompt: "Circuit with polarity switch = ?" },
                    { circuit: { battery: 3, bulbs: 4, switches: 3, wires: 10 }, answer: "distributed", prompt: "Multi-battery multi-path circuit = ?" },
                    { circuit: { battery: 1, bulbs: 3, switches: 2, wires: 7 }, answer: "selective", prompt: "Circuit allowing individual bulb control = ?" },
                    { circuit: { battery: 2, bulbs: 2, switches: 1, wires: 6 }, answer: "redundant", prompt: "Circuit with backup power path = ?" }
                ]
            };

            return circuitsData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                circuit: item.circuit,
                promptLatex: item.prompt,
                expressionLatex: `\\\\text{Circuit: } ${item.circuit.battery}B + ${item.circuit.bulbs}L + ${item.circuit.switches}S`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: "Circuit Type",
                        placeholder: "type answer",
                        expected: item.answer
                    }
                ],
                correctLatex: `\\\\text{Answer: } ${item.answer}`,
                answer: item.answer
            }));
        }

        // STAGE 3: CIRCUIT_DIAGRAMS - Draw and interpret circuit symbols
        if (stage === "CIRCUIT_DIAGRAMS") {
            const symbolsData = {
                BASIC: [
                    { symbol: "battery", answer: "battery", prompt: "Symbol: Two parallel lines (long + short)" },
                    { symbol: "bulb", answer: "bulb", prompt: "Symbol: Circle with X inside" },
                    { symbol: "switch_open", answer: "open", prompt: "Symbol: Gap in line" },
                    { symbol: "switch_closed", answer: "closed", prompt: "Symbol: Continuous line" },
                    { symbol: "wire", answer: "wire", prompt: "Symbol: Straight line" }
                ],
                CORE: [
                    { symbol: "resistor", answer: "resistor", prompt: "Symbol: Rectangle or zigzag" },
                    { symbol: "ammeter", answer: "ammeter", prompt: "Symbol: Circle with 'A' inside" },
                    { symbol: "voltmeter", answer: "voltmeter", prompt: "Symbol: Circle with 'V' inside" },
                    { symbol: "series_circuit", answer: "series", prompt: "Diagram: Components in single loop" },
                    { symbol: "parallel_circuit", answer: "parallel", prompt: "Diagram: Components in separate branches" }
                ],
                ADVANCED: [
                    { symbol: "led", answer: "LED", prompt: "Symbol: Diode with arrows pointing out" },
                    { symbol: "motor", answer: "motor", prompt: "Symbol: Circle with 'M' inside" },
                    { symbol: "fuse", answer: "fuse", prompt: "Symbol: Rectangle with line through it" },
                    { symbol: "ground", answer: "ground", prompt: "Symbol: Three horizontal lines decreasing" },
                    { symbol: "junction", answer: "junction", prompt: "Symbol: Dot where wires meet" }
                ],
                ELITE: [
                    { symbol: "capacitor", answer: "capacitor", prompt: "Symbol: Two parallel lines (equal length)" },
                    { symbol: "diode", answer: "diode", prompt: "Symbol: Triangle with line" },
                    { symbol: "transistor", answer: "transistor", prompt: "Symbol: Three terminals with arrow" },
                    { symbol: "transformer", answer: "transformer", prompt: "Symbol: Two coils with lines between" },
                    { symbol: "relay", answer: "relay", prompt: "Symbol: Coil with switch contacts" }
                ]
            };

            return symbolsData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                symbol: item.symbol,
                promptLatex: item.prompt,
                expressionLatex: `\\\\text{Symbol: } ${item.symbol}`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: "Symbol Name",
                        placeholder: "type name",
                        expected: item.answer
                    }
                ],
                correctLatex: `\\\\text{Answer: } ${item.answer}`,
                answer: item.answer
            }));
        }

        return [];
    }, []);

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
    } = useQuestManager<SP201Quest, Stage>({
        buildPool: (d, s) => buildStagePool(sp2_01_t, d, s),
        initialStage: "COMPONENTS",
    });

    // Update light intensity based on circuit state
    const updateVisualization = useCallback(() => {
        if (!currentQuest) return;
        
        if (stage === "SIMPLE_CIRCUITS" && currentQuest.circuit) {
            const { battery, bulbs, switches } = currentQuest.circuit;
            // Simple logic: more batteries = brighter, more bulbs in series = dimmer
            const intensity = (battery * 100) / (bulbs || 1);
            setLightIntensity(Math.min(100, intensity));
        } else {
            setLightIntensity(50); // Default
        }
    }, [currentQuest, stage]);

    // Update visualization when quest changes
    useEffect(() => {
        updateVisualization();
    }, [updateVisualization]);

    if (!currentQuest) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <ChamberLayout
            title={sp2_01_t.title}
            moduleCode="SP2.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "COMPONENTS", label: sp2_01_t.stages.components },
                { id: "SIMPLE_CIRCUITS", label: sp2_01_t.stages.simple_circuits },
                { id: "CIRCUIT_DIAGRAMS", label: sp2_01_t.stages.circuit_diagrams },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sp2_01_t.footer_left}
            translations={{
                back: sp2_01_t.back,
                difficulty: sp2_01_t.difficulty,
                check: sp2_01_t.check,
                next: sp2_01_t.next,
                correct: sp2_01_t.correct,
                incorrect: sp2_01_t.incorrect,
            }}
            monitorContent={
                <CircuitVisualization
                    quest={currentQuest}
                    stage={stage}
                    lightIntensity={lightIntensity}
                    translations={{
                        components: sp2_01_t.stages.components,
                        simple_circuits: sp2_01_t.stages.simple_circuits,
                        circuit_diagrams: sp2_01_t.stages.circuit_diagrams,
                    }}
                />
            }
        >
            <div className="flex flex-col gap-6">
                {/* Scenario Description */}
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                        {stage === "COMPONENTS" && sp2_01_t.stages.components}
                        {stage === "SIMPLE_CIRCUITS" && sp2_01_t.stages.simple_circuits}
                        {stage === "CIRCUIT_DIAGRAMS" && sp2_01_t.stages.circuit_diagrams}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {stage === "COMPONENTS" && sp2_01_t.scenarios.components}
                        {stage === "SIMPLE_CIRCUITS" && sp2_01_t.scenarios.simple_circuits}
                        {stage === "CIRCUIT_DIAGRAMS" && sp2_01_t.scenarios.circuit_diagrams}
                    </p>
                </div>

                {/* Question Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black/30 rounded-xl p-6 border border-white/10"
                    >
                        <div className="mb-4">
                            <div className="text-white/50 text-sm mb-2">Question {currentQuest.id}</div>
                            <div className="text-white text-lg">{currentQuest.promptLatex}</div>
                        </div>

                        {/* Input Slot */}
                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-4">
                                <label className="text-white/70 min-w-[120px]">{slot.labelLatex}:</label>
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        ))}

                        {/* Feedback */}
                        {lastCheck && (
                            <div className={`mt-4 p-3 rounded-lg ${lastCheck.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {lastCheck.ok ? sp2_01_t.correct : sp2_01_t.incorrect}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
