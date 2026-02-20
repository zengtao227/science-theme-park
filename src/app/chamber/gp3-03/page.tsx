"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import InductionVisualization from "@/components/chamber/gp3-03/InductionVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "FARADAYS_LAW" | "LENZS_LAW" | "GENERATORS";

interface GP303Quest extends Quest {
    stage: Stage;
    flux?: number;
    time?: number;
    emf?: number;
    turns?: number;
}

export default function GP303Induction() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const gp3_03_t = useMemo(() => ({
        title: t("gp3_03.title"),
        back: t("gp3_03.back"),
        difficulty: {
            basic: t("gp3_03.difficulty.basic"),
            core: t("gp3_03.difficulty.core"),
            advanced: t("gp3_03.difficulty.advanced"),
            elite: t("gp3_03.difficulty.elite")
        },
        stages: {
            faradays_law: t("gp3_03.stages.faradays_law"),
            lenzs_law: t("gp3_03.stages.lenzs_law"),
            generators: t("gp3_03.stages.generators")
        },
        scenarios: {
            faradays_law: t("gp3_03.scenarios.faradays_law"),
            lenzs_law: t("gp3_03.scenarios.lenzs_law"),
            generators: t("gp3_03.scenarios.generators")
        },
        footer_left: t("gp3_03.footer_left"),
        check: t("gp3_03.check"),
        next: t("gp3_03.next"),
        correct: t("gp3_03.correct"),
        incorrect: t("gp3_03.incorrect")
    }), [t]);

    const buildStagePool = useCallback((
        tObj: typeof gp3_03_t,
        difficulty: Difficulty,
        stage: Stage
    ): GP303Quest[] => {
        if (stage === "FARADAYS_LAW") {
            const faradayData = {
                BASIC: [
                    { flux: 0.1, time: 0.5, emf: "0.2", prompt: "ΔΦ=0.1Wb, Δt=0.5s, find EMF" },
                    { flux: 0.2, time: 1, emf: "0.2", prompt: "ΔΦ=0.2Wb, Δt=1s, find EMF" },
                    { flux: 0.5, time: 2, emf: "0.25", prompt: "ΔΦ=0.5Wb, Δt=2s, find EMF" },
                    { flux: 0.3, time: 0.6, emf: "0.5", prompt: "ΔΦ=0.3Wb, Δt=0.6s, find EMF" },
                    { flux: 0.4, time: 0.8, emf: "0.5", prompt: "ΔΦ=0.4Wb, Δt=0.8s, find EMF" }
                ],
                CORE: [
                    { turns: 100, flux: 0.01, time: 0.1, emf: "10", prompt: "N=100, ΔΦ=0.01Wb, Δt=0.1s, find EMF" },
                    { turns: 200, flux: 0.005, time: 0.1, emf: "10", prompt: "N=200, ΔΦ=0.005Wb, Δt=0.1s, find EMF" },
                    { turns: 50, flux: 0.02, time: 0.05, emf: "20", prompt: "N=50, ΔΦ=0.02Wb, Δt=0.05s, find EMF" },
                    { turns: 150, flux: 0.01, time: 0.15, emf: "10", prompt: "N=150, ΔΦ=0.01Wb, Δt=0.15s, find EMF" },
                    { turns: 300, flux: 0.01, time: 0.3, emf: "10", prompt: "N=300, ΔΦ=0.01Wb, Δt=0.3s, find EMF" }
                ],
                ADVANCED: [
                    { turns: 500, area: 0.01, field: 0.5, time: 0.1, emf: "25", prompt: "N=500, A=0.01m², ΔB=0.5T, Δt=0.1s" },
                    { turns: 1000, area: 0.005, field: 0.2, time: 0.1, emf: "10", prompt: "N=1000, A=0.005m², ΔB=0.2T, Δt=0.1s" },
                    { turns: 200, area: 0.02, field: 1, time: 0.2, emf: "20", prompt: "N=200, A=0.02m², ΔB=1T, Δt=0.2s" },
                    { turns: 800, area: 0.01, field: 0.25, time: 0.1, emf: "20", prompt: "N=800, A=0.01m², ΔB=0.25T, Δt=0.1s" },
                    { turns: 400, area: 0.015, field: 0.5, time: 0.15, emf: "20", prompt: "N=400, A=0.015m², ΔB=0.5T, Δt=0.15s" }
                ],
                ELITE: [
                    { turns: 1000, area: 0.01, field: 1, freq: 50, emf: "3142", prompt: "Generator: N=1000, A=0.01m², B=1T, f=50Hz" },
                    { turns: 500, area: 0.02, field: 0.5, freq: 60, emf: "1885", prompt: "Generator: N=500, A=0.02m², B=0.5T, f=60Hz" },
                    { turns: 2000, area: 0.005, field: 1, freq: 50, emf: "3142", prompt: "Generator: N=2000, A=0.005m², B=1T, f=50Hz" },
                    { turns: 800, area: 0.01, field: 0.8, freq: 50, emf: "2011", prompt: "Generator: N=800, A=0.01m², B=0.8T, f=50Hz" },
                    { turns: 1500, area: 0.008, field: 0.6, freq: 60, emf: "2714", prompt: "Generator: N=1500, A=0.008m², B=0.6T, f=60Hz" }
                ]
            };

            return faradayData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                flux: 'flux' in item ? item.flux : undefined,
                time: 'time' in item ? item.time : undefined,
                turns: 'turns' in item ? item.turns : undefined,
                promptLatex: item.prompt,
                expressionLatex: difficulty === "ELITE" ? 
                    `\\varepsilon = NAB\\omega` : `\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: "EMF (V)",
                    placeholder: "type value",
                    expected: item.emf
                }],
                correctLatex: `\\\\text{EMF = } ${item.emf} \\\\text{ V}`,
                answer: item.emf as string
            }));
        }

        if (stage === "LENZS_LAW") {
            const lenzData = {
                BASIC: [
                    { scenario: "magnet_approaching", direction: "oppose", prompt: "N pole approaching coil, induced current direction?" },
                    { scenario: "magnet_leaving", direction: "oppose", prompt: "N pole leaving coil, induced current direction?" },
                    { scenario: "field_increasing", direction: "oppose", prompt: "B field increasing, induced field direction?" },
                    { scenario: "field_decreasing", direction: "oppose", prompt: "B field decreasing, induced field direction?" },
                    { scenario: "coil_entering", direction: "oppose", prompt: "Coil entering B field, induced current?" }
                ],
                CORE: [
                    { scenario: "falling_magnet", direction: "slow", prompt: "Magnet falling through coil, what happens?" },
                    { scenario: "rotating_coil", direction: "alternating", prompt: "Coil rotating in B field, current type?" },
                    { scenario: "moving_conductor", direction: "perpendicular", prompt: "Conductor moving in B field, force direction?" },
                    { scenario: "changing_current", direction: "oppose", prompt: "Current increasing in coil, induced EMF?" },
                    { scenario: "transformer", direction: "transfer", prompt: "AC in primary coil, secondary coil effect?" }
                ],
                ADVANCED: [
                    { scenario: "eddy_currents", direction: "brake", prompt: "Metal plate in B field, what happens?" },
                    { scenario: "self_inductance", direction: "oppose", prompt: "Current changing in coil, self-induced EMF?" },
                    { scenario: "mutual_inductance", direction: "induce", prompt: "Current in coil A, effect on coil B?" },
                    { scenario: "lenz_brake", direction: "slow", prompt: "Conducting disk in B field, rotation effect?" },
                    { scenario: "induction_heating", direction: "heat", prompt: "AC in coil near metal, what happens?" }
                ],
                ELITE: [
                    { scenario: "maglev_train", direction: "levitate", prompt: "Moving magnet over conductor, force direction?" },
                    { scenario: "induction_motor", direction: "rotate", prompt: "Rotating B field, rotor behavior?" },
                    { scenario: "wireless_charging", direction: "transfer", prompt: "AC in transmitter coil, receiver effect?" },
                    { scenario: "metal_detector", direction: "detect", prompt: "Metal near coil, what changes?" },
                    { scenario: "regenerative_braking", direction: "generate", prompt: "Motor as generator, energy flow?" }
                ]
            };

            return lenzData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: item.prompt,
                expressionLatex: `\\text{Lenz's Law: Induced effects oppose change}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: "Direction/Effect",
                    placeholder: "type answer",
                    expected: item.direction
                }],
                correctLatex: `\\\\text{Answer: } ${item.direction}`,
                answer: item.direction as string
            }));
        }

        if (stage === "GENERATORS") {
            const generatorData = {
                BASIC: [
                    { type: "AC", output: "alternating", prompt: "Rotating coil in B field produces?" },
                    { type: "DC", output: "direct", prompt: "Generator with commutator produces?" },
                    { type: "frequency", output: "speed", prompt: "Generator frequency depends on?" },
                    { type: "voltage", output: "turns", prompt: "Generator voltage depends on?" },
                    { type: "power", output: "current", prompt: "Generator power depends on?" }
                ],
                CORE: [
                    { turns: 100, area: 0.1, field: 0.5, speed: 60, voltage: "188", prompt: "N=100, A=0.1m², B=0.5T, 60rpm, find V" },
                    { turns: 200, area: 0.05, field: 1, speed: 120, voltage: "377", prompt: "N=200, A=0.05m², B=1T, 120rpm, find V" },
                    { turns: 150, area: 0.08, field: 0.8, speed: 90, voltage: "339", prompt: "N=150, A=0.08m², B=0.8T, 90rpm, find V" },
                    { turns: 250, area: 0.04, field: 0.6, speed: 100, voltage: "377", prompt: "N=250, A=0.04m², B=0.6T, 100rpm, find V" },
                    { turns: 300, area: 0.03, field: 0.7, speed: 80, voltage: "396", prompt: "N=300, A=0.03m², B=0.7T, 80rpm, find V" }
                ],
                ADVANCED: [
                    { power: 1000, voltage: 220, current: "4.55", prompt: "P=1000W, V=220V, find I" },
                    { power: 5000, voltage: 380, current: "13.16", prompt: "P=5000W, V=380V, find I" },
                    { power: 2000, current: 10, voltage: "200", prompt: "P=2000W, I=10A, find V" },
                    { voltage: 220, current: 20, power: "4400", prompt: "V=220V, I=20A, find P" },
                    { power: 10000, voltage: 400, current: "25", prompt: "P=10kW, V=400V, find I" }
                ],
                ELITE: [
                    { type: "hydro", efficiency: 90, input: 10000, output: "9000", prompt: "Hydro generator 90% efficient, 10kW input" },
                    { type: "wind", efficiency: 85, input: 5000, output: "4250", prompt: "Wind generator 85% efficient, 5kW input" },
                    { type: "thermal", efficiency: 40, input: 100000, output: "40000", prompt: "Thermal plant 40% efficient, 100kW input" },
                    { type: "solar", efficiency: 20, input: 1000, output: "200", prompt: "Solar panel 20% efficient, 1kW sunlight" },
                    { type: "nuclear", efficiency: 33, input: 3000000, output: "990000", prompt: "Nuclear plant 33% efficient, 3MW input" }
                ]
            };

            return generatorData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: item.prompt,
                expressionLatex: difficulty === "BASIC" ? `\\text{Generator principles}` :
                               difficulty === "CORE" ? `\\varepsilon = NAB\\omega` :
                               difficulty === "ADVANCED" ? `P = VI` :
                               `\\eta = \\frac{P_{out}}{P_{in}}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: difficulty === "BASIC" ? "Answer" :
                               difficulty === "CORE" ? "Voltage (V)" :
                               difficulty === "ADVANCED" ? "Value" : "Output Power (W)",
                    placeholder: "type value",
                    expected: ('output' in item ? item.output : undefined) || 
                             ('voltage' in item ? item.voltage : undefined) || 
                             ('current' in item ? item.current : undefined) || 
                             ('power' in item ? item.power : undefined) || "0"
                }],
                correctLatex: `\\text{Answer: } ${('output' in item ? item.output : undefined) || 
                             ('voltage' in item ? item.voltage : undefined) || 
                             ('current' in item ? item.current : undefined) || 
                             ('power' in item ? item.power : undefined) || "0"}`,
                answer: (('output' in item ? item.output : undefined) || 
                        ('voltage' in item ? item.voltage : undefined) || 
                        ('current' in item ? item.current : undefined) || 
                        ('power' in item ? item.power : undefined) || "0") as string
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
      adaptiveRecommendation,
    } = useQuestManager<GP303Quest, Stage>({
    moduleCode: "gp3-03",
        buildPool: (d, s) => buildStagePool(gp3_03_t, d, s),
        initialStage: "FARADAYS_LAW",
    });

    if (!currentQuest) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      title={gp3_03_t.title}
            moduleCode="GP3.03"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "FARADAYS_LAW", label: gp3_03_t.stages.faradays_law },
                { id: "LENZS_LAW", label: gp3_03_t.stages.lenzs_law },
                { id: "GENERATORS", label: gp3_03_t.stages.generators },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={gp3_03_t.footer_left}
            translations={{
                back: gp3_03_t.back,
                difficulty: gp3_03_t.difficulty,
                check: gp3_03_t.check,
                next: gp3_03_t.next,
                correct: gp3_03_t.correct,
                incorrect: gp3_03_t.incorrect,
            }}
            monitorContent={
                <InductionVisualization
                    quest={currentQuest}
                    stage={stage}
                    translations={{
                        faradays_law: gp3_03_t.stages.faradays_law,
                        lenzs_law: gp3_03_t.stages.lenzs_law,
                        generators: gp3_03_t.stages.generators,
                    }}
                />
            }
        >
            <div className="flex flex-col gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                        {stage === "FARADAYS_LAW" && gp3_03_t.stages.faradays_law}
                        {stage === "LENZS_LAW" && gp3_03_t.stages.lenzs_law}
                        {stage === "GENERATORS" && gp3_03_t.stages.generators}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {stage === "FARADAYS_LAW" && gp3_03_t.scenarios.faradays_law}
                        {stage === "LENZS_LAW" && gp3_03_t.scenarios.lenzs_law}
                        {stage === "GENERATORS" && gp3_03_t.scenarios.generators}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuest?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black/30 rounded-xl p-6 border border-white/10"
                    >
                        <div className="mb-4">
                            <div className="text-white/50 text-sm mb-2">Question {currentQuest?.id}</div>
                            <div className="text-white text-lg">{currentQuest?.promptLatex}</div>
                        </div>

                        {currentQuest?.slots.map((slot) => (
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

                        {lastCheck && (
                            <div className={`mt-4 p-3 rounded-lg ${lastCheck.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {lastCheck.ok ? gp3_03_t.correct : gp3_03_t.incorrect}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
