"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ElectromagnetismVisualization from "@/components/chamber/gp3-02/ElectromagnetismVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

type Stage = "ELECTRIC_FIELD" | "MAGNETIC_FIELD" | "PARTICLE_MOTION";

interface GP302Quest extends Quest {
    stage: Stage;
    charge?: number;
    distance?: number;
    fieldStrength?: number;
    velocity?: number;
    magneticField?: number;
}

export default function GP302Electromagnetism() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [fieldIntensity, setFieldIntensity] = useState(0);

    const gp3_02_t = useMemo(() => ({
        title: t("gp3_02.title"),
        back: t("gp3_02.back"),
        difficulty: {
            basic: t("gp3_02.difficulty.basic"),
            core: t("gp3_02.difficulty.core"),
            advanced: t("gp3_02.difficulty.advanced"),
            elite: t("gp3_02.difficulty.elite")
        },
        stages: {
            electric_field: t("gp3_02.stages.electric_field"),
            magnetic_field: t("gp3_02.stages.magnetic_field"),
            particle_motion: t("gp3_02.stages.particle_motion")
        },
        scenarios: {
            electric_field: t("gp3_02.scenarios.electric_field"),
            magnetic_field: t("gp3_02.scenarios.magnetic_field"),
            particle_motion: t("gp3_02.scenarios.particle_motion")
        },
        footer_left: t("gp3_02.footer_left"),
        check: t("gp3_02.check"),
        next: t("gp3_02.next"),
        correct: t("gp3_02.correct"),
        incorrect: t("gp3_02.incorrect")
    }), [t]);

    const buildStagePool = useCallback((
        tObj: typeof gp3_02_t,
        difficulty: Difficulty,
        stage: Stage
    ): GP302Quest[] => {
        // STAGE 1: ELECTRIC_FIELD - Electric field calculations
        if (stage === "ELECTRIC_FIELD") {
            const electricData = {
                BASIC: [
                    { charge: 1e-6, distance: 1, field: "9000", prompt: "Q=1μC, r=1m, find E (N/C)" },
                    { charge: 2e-6, distance: 2, field: "4500", prompt: "Q=2μC, r=2m, find E (N/C)" },
                    { charge: 5e-6, distance: 1, field: "45000", prompt: "Q=5μC, r=1m, find E (N/C)" },
                    { charge: 1e-6, distance: 0.5, field: "36000", prompt: "Q=1μC, r=0.5m, find E (N/C)" },
                    { charge: 3e-6, distance: 3, field: "3000", prompt: "Q=3μC, r=3m, find E (N/C)" }
                ],
                CORE: [
                    { charge: 1e-9, distance: 0.1, field: "900", prompt: "Q=1nC, r=0.1m, find E (N/C)" },
                    { charge: 5e-9, distance: 0.5, field: "180", prompt: "Q=5nC, r=0.5m, find E (N/C)" },
                    { charge: 10e-9, distance: 0.2, field: "2250", prompt: "Q=10nC, r=0.2m, find E (N/C)" },
                    { charge: 2e-9, distance: 0.1, field: "1800", prompt: "Q=2nC, r=0.1m, find E (N/C)" },
                    { charge: 8e-9, distance: 0.4, field: "450", prompt: "Q=8nC, r=0.4m, find E (N/C)" }
                ],
                ADVANCED: [
                    { charge: 1.6e-19, distance: 1e-10, field: "1.44e11", prompt: "Electron field at 0.1nm" },
                    { charge: 3.2e-19, distance: 2e-10, field: "7.2e10", prompt: "2 electrons at 0.2nm" },
                    { charge: 1.6e-19, distance: 5e-11, field: "5.76e11", prompt: "Electron at 0.05nm" },
                    { charge: 4.8e-19, distance: 3e-10, field: "4.8e10", prompt: "3 electrons at 0.3nm" },
                    { charge: 1.6e-19, distance: 2e-10, field: "3.6e10", prompt: "Electron at 0.2nm" }
                ],
                ELITE: [
                    { charge: 1e-6, distance: 1, force: 1.6e-19, answer: "1.44e-12", prompt: "Force on electron in 9000 N/C field" },
                    { charge: 2e-6, distance: 2, force: 1.6e-19, answer: "7.2e-13", prompt: "Force on electron in 4500 N/C field" },
                    { charge: 5e-6, distance: 1, force: 1.6e-19, answer: "7.2e-12", prompt: "Force on electron in 45000 N/C field" },
                    { charge: 1e-6, distance: 0.5, force: 1.6e-19, answer: "5.76e-12", prompt: "Force on electron in 36000 N/C field" },
                    { charge: 3e-6, distance: 3, force: 1.6e-19, answer: "4.8e-13", prompt: "Force on electron in 3000 N/C field" }
                ]
            };

            return electricData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                charge: item.charge,
                distance: item.distance,
                promptLatex: item.prompt,
                expressionLatex: `E = k \\\\frac{Q}{r^2}`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: difficulty === "ELITE" ? "Force (N)" : "Field (N/C)",
                        placeholder: "type value",
                        expected: 'field' in item ? item.field : item.answer
                    }
                ],
                correctLatex: `\\text{Answer: } ${'field' in item ? item.field : item.answer}`,
                answer: ('field' in item ? item.field : item.answer) as string
            }));
        }

        // STAGE 2: MAGNETIC_FIELD - Magnetic field calculations
        if (stage === "MAGNETIC_FIELD") {
            const magneticData = {
                BASIC: [
                    { current: 10, distance: 0.1, field: "2e-5", prompt: "I=10A, r=0.1m, find B (T)" },
                    { current: 5, distance: 0.05, field: "2e-5", prompt: "I=5A, r=0.05m, find B (T)" },
                    { current: 20, distance: 0.2, field: "2e-5", prompt: "I=20A, r=0.2m, find B (T)" },
                    { current: 15, distance: 0.15, field: "2e-5", prompt: "I=15A, r=0.15m, find B (T)" },
                    { current: 8, distance: 0.08, field: "2e-5", prompt: "I=8A, r=0.08m, find B (T)" }
                ],
                CORE: [
                    { current: 100, distance: 0.01, field: "2e-3", prompt: "I=100A, r=1cm, find B (T)" },
                    { current: 50, distance: 0.02, field: "5e-4", prompt: "I=50A, r=2cm, find B (T)" },
                    { current: 200, distance: 0.05, field: "8e-4", prompt: "I=200A, r=5cm, find B (T)" },
                    { current: 75, distance: 0.03, field: "5e-4", prompt: "I=75A, r=3cm, find B (T)" },
                    { current: 150, distance: 0.06, field: "5e-4", prompt: "I=150A, r=6cm, find B (T)" }
                ],
                ADVANCED: [
                    { turns: 100, current: 2, length: 0.5, field: "5.03e-4", prompt: "Solenoid: N=100, I=2A, L=0.5m, find B" },
                    { turns: 200, current: 1, length: 0.4, field: "6.28e-4", prompt: "Solenoid: N=200, I=1A, L=0.4m, find B" },
                    { turns: 500, current: 0.5, length: 1, field: "3.14e-4", prompt: "Solenoid: N=500, I=0.5A, L=1m, find B" },
                    { turns: 300, current: 1.5, length: 0.6, field: "9.42e-4", prompt: "Solenoid: N=300, I=1.5A, L=0.6m, find B" },
                    { turns: 400, current: 1, length: 0.8, field: "6.28e-4", prompt: "Solenoid: N=400, I=1A, L=0.8m, find B" }
                ],
                ELITE: [
                    { current: 1000, distance: 0.001, field: "0.2", prompt: "I=1000A, r=1mm, find B (T)" },
                    { current: 5000, distance: 0.005, field: "0.2", prompt: "I=5000A, r=5mm, find B (T)" },
                    { current: 2000, distance: 0.002, field: "0.2", prompt: "I=2000A, r=2mm, find B (T)" },
                    { current: 10000, distance: 0.01, field: "0.2", prompt: "I=10000A, r=1cm, find B (T)" },
                    { current: 3000, distance: 0.003, field: "0.2", prompt: "I=3000A, r=3mm, find B (T)" }
                ]
            };

            return magneticData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: item.prompt,
                expressionLatex: difficulty === "ADVANCED" ? 
                    `B = \\mu_0 \\frac{NI}{L}` : `B = \\frac{\\mu_0 I}{2\\pi r}`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: "Magnetic Field (T)",
                        placeholder: "type value",
                        expected: item.field
                    }
                ],
                correctLatex: `\\\\text{B = } ${item.field} \\\\text{ T}`,
                answer: item.field as string
            }));
        }

        // STAGE 3: PARTICLE_MOTION - Charged particle motion in fields
        if (stage === "PARTICLE_MOTION") {
            const motionData = {
                BASIC: [
                    { charge: 1.6e-19, field: 1000, force: "1.6e-16", prompt: "Electron in 1000 N/C field, find force" },
                    { charge: 1.6e-19, field: 5000, force: "8e-16", prompt: "Electron in 5000 N/C field, find force" },
                    { charge: 1.6e-19, field: 2000, force: "3.2e-16", prompt: "Electron in 2000 N/C field, find force" },
                    { charge: 3.2e-19, field: 1000, force: "3.2e-16", prompt: "2 electrons in 1000 N/C field, find force" },
                    { charge: 1.6e-19, field: 10000, force: "1.6e-15", prompt: "Electron in 10000 N/C field, find force" }
                ],
                CORE: [
                    { charge: 1.6e-19, velocity: 1e6, field: 0.1, force: "1.6e-14", prompt: "Electron v=1e6 m/s, B=0.1T, find force" },
                    { charge: 1.6e-19, velocity: 2e6, field: 0.05, force: "1.6e-14", prompt: "Electron v=2e6 m/s, B=0.05T, find force" },
                    { charge: 1.6e-19, velocity: 5e5, field: 0.2, force: "1.6e-14", prompt: "Electron v=5e5 m/s, B=0.2T, find force" },
                    { charge: 1.6e-19, velocity: 1e7, field: 0.01, force: "1.6e-14", prompt: "Electron v=1e7 m/s, B=0.01T, find force" },
                    { charge: 1.6e-19, velocity: 3e6, field: 0.05, force: "2.4e-14", prompt: "Electron v=3e6 m/s, B=0.05T, find force" }
                ],
                ADVANCED: [
                    { charge: 1.6e-19, velocity: 1e6, field: 0.1, mass: 9.1e-31, radius: "5.69e-5", prompt: "Electron circular motion, find radius" },
                    { charge: 1.6e-19, velocity: 2e6, field: 0.05, mass: 9.1e-31, radius: "2.28e-4", prompt: "Electron v=2e6 m/s, B=0.05T, find radius" },
                    { charge: 1.6e-19, velocity: 5e5, field: 0.2, mass: 9.1e-31, radius: "1.42e-5", prompt: "Electron v=5e5 m/s, B=0.2T, find radius" },
                    { charge: 1.6e-19, velocity: 1e7, field: 0.01, mass: 9.1e-31, radius: "5.69e-3", prompt: "Electron v=1e7 m/s, B=0.01T, find radius" },
                    { charge: 1.6e-19, velocity: 3e6, field: 0.1, mass: 9.1e-31, radius: "1.71e-4", prompt: "Electron v=3e6 m/s, B=0.1T, find radius" }
                ],
                ELITE: [
                    { charge: 1.6e-19, voltage: 1000, mass: 9.1e-31, velocity: "1.88e7", prompt: "Electron accelerated by 1000V, find velocity" },
                    { charge: 1.6e-19, voltage: 5000, mass: 9.1e-31, velocity: "4.19e7", prompt: "Electron accelerated by 5000V, find velocity" },
                    { charge: 1.6e-19, voltage: 2000, mass: 9.1e-31, velocity: "2.65e7", prompt: "Electron accelerated by 2000V, find velocity" },
                    { charge: 1.6e-19, voltage: 10000, mass: 9.1e-31, velocity: "5.93e7", prompt: "Electron accelerated by 10000V, find velocity" },
                    { charge: 1.6e-19, voltage: 500, mass: 9.1e-31, velocity: "1.33e7", prompt: "Electron accelerated by 500V, find velocity" }
                ]
            };

            return motionData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                charge: item.charge,
                velocity: 'velocity' in item ? (typeof item.velocity === 'string' ? parseFloat(item.velocity) : item.velocity) : undefined,
                magneticField: 'field' in item ? item.field : undefined,
                promptLatex: item.prompt,
                expressionLatex: difficulty === "BASIC" ? `F = qE` :
                               difficulty === "CORE" ? `F = qvB` :
                               difficulty === "ADVANCED" ? `r = \\frac{mv}{qB}` :
                               `v = \\sqrt{\\frac{2qV}{m}}`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: difficulty === "BASIC" || difficulty === "CORE" ? "Force (N)" :
                                   difficulty === "ADVANCED" ? "Radius (m)" : "Velocity (m/s)",
                        placeholder: "type value",
                        expected: 'force' in item ? item.force : 'radius' in item ? item.radius : item.velocity
                    }
                ],
                correctLatex: `\\text{Answer: } ${'force' in item ? item.force : 'radius' in item ? item.radius : item.velocity}`,
                answer: ('force' in item ? item.force : 'radius' in item ? item.radius : item.velocity) as string
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
    } = useQuestManager<GP302Quest, Stage>({
        buildPool: (d, s) => buildStagePool(gp3_02_t, d, s),
        initialStage: "ELECTRIC_FIELD",
    });

    useEffect(() => {
        if (!currentQuest) return;
        if (currentQuest.fieldStrength) setFieldIntensity(currentQuest.fieldStrength);
    }, [currentQuest]);

    if (!currentQuest) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <ChamberLayout
            title={gp3_02_t.title}
            moduleCode="GP3.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "ELECTRIC_FIELD", label: gp3_02_t.stages.electric_field },
                { id: "MAGNETIC_FIELD", label: gp3_02_t.stages.magnetic_field },
                { id: "PARTICLE_MOTION", label: gp3_02_t.stages.particle_motion },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={gp3_02_t.footer_left}
            translations={{
                back: gp3_02_t.back,
                difficulty: gp3_02_t.difficulty,
                check: gp3_02_t.check,
                next: gp3_02_t.next,
                correct: gp3_02_t.correct,
                incorrect: gp3_02_t.incorrect,
            }}
            monitorContent={
                <ElectromagnetismVisualization
                    quest={currentQuest}
                    stage={stage}
                    fieldIntensity={fieldIntensity}
                    translations={{
                        electric_field: gp3_02_t.stages.electric_field,
                        magnetic_field: gp3_02_t.stages.magnetic_field,
                        particle_motion: gp3_02_t.stages.particle_motion,
                    }}
                />
            }
        >
            <div className="flex flex-col gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                        {stage === "ELECTRIC_FIELD" && gp3_02_t.stages.electric_field}
                        {stage === "MAGNETIC_FIELD" && gp3_02_t.stages.magnetic_field}
                        {stage === "PARTICLE_MOTION" && gp3_02_t.stages.particle_motion}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {stage === "ELECTRIC_FIELD" && gp3_02_t.scenarios.electric_field}
                        {stage === "MAGNETIC_FIELD" && gp3_02_t.scenarios.magnetic_field}
                        {stage === "PARTICLE_MOTION" && gp3_02_t.scenarios.particle_motion}
                    </p>
                </div>

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

                        <div className="mb-4 p-4 bg-black/50 rounded-lg border border-cyan-500/30">
                            <div className="text-white/60 text-xs uppercase tracking-wider mb-2">Formula</div>
                            <div className="text-white text-xl">
                                <InlineMath math={currentQuest.expressionLatex} />
                            </div>
                        </div>

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

                        {lastCheck && (
                            <div className={`mt-4 p-3 rounded-lg ${lastCheck.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {lastCheck.ok ? gp3_02_t.correct : gp3_02_t.incorrect}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
