"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ElectromagnetismVisualization from "@/components/chamber/gp3-02/ElectromagnetismVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";

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
    const { t } = useLanguage();
    const [fieldIntensity, setFieldIntensity] = useState(0);

    const formatValue = useCallback((value: number) => {
        const abs = Math.abs(value);
        if (abs >= 1e4 || (abs > 0 && abs < 1e-2)) return value.toExponential(2);
        return Number(value.toFixed(4)).toString();
    }, []);

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
        check: t("gp3_02.check"),
        next: t("gp3_02.next"),
        correct: t("gp3_02.correct"),
        incorrect: t("gp3_02.incorrect"),
        labels: {
            loading: t("gp3_02.labels.loading"),
            question: t("gp3_02.labels.question"),
            formula: t("gp3_02.labels.formula"),
            placeholder_value: t("gp3_02.labels.placeholder_value"),
            answer_field: t("gp3_02.labels.answer_field"),
            answer_force: t("gp3_02.labels.answer_force"),
            answer_radius: t("gp3_02.labels.answer_radius"),
            answer_velocity: t("gp3_02.labels.answer_velocity")
        }
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
                    { charge: 1e-6, distance: 1, field: "9000" },
                    { charge: 2e-6, distance: 2, field: "4500" },
                    { charge: 5e-6, distance: 1, field: "45000" },
                    { charge: 1e-6, distance: 0.5, field: "36000" },
                    { charge: 3e-6, distance: 3, field: "3000" }
                ],
                CORE: [
                    { charge: 1e-9, distance: 0.1, field: "900" },
                    { charge: 5e-9, distance: 0.5, field: "180" },
                    { charge: 10e-9, distance: 0.2, field: "2250" },
                    { charge: 2e-9, distance: 0.1, field: "1800" },
                    { charge: 8e-9, distance: 0.4, field: "450" }
                ],
                ADVANCED: [
                    { charge: 1.6e-19, distance: 1e-10, field: "1.44e11" },
                    { charge: 3.2e-19, distance: 2e-10, field: "7.2e10" },
                    { charge: 1.6e-19, distance: 5e-11, field: "5.76e11" },
                    { charge: 4.8e-19, distance: 3e-10, field: "4.8e10" },
                    { charge: 1.6e-19, distance: 2e-10, field: "3.6e10" }
                ],
                ELITE: [
                    { charge: 1e-6, distance: 1, force: 1.6e-19, answer: "1.44e-12" },
                    { charge: 2e-6, distance: 2, force: 1.6e-19, answer: "7.2e-13" },
                    { charge: 5e-6, distance: 1, force: 1.6e-19, answer: "7.2e-12" },
                    { charge: 1e-6, distance: 0.5, force: 1.6e-19, answer: "5.76e-12" },
                    { charge: 3e-6, distance: 3, force: 1.6e-19, answer: "4.8e-13" }
                ]
            };

            return electricData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                charge: item.charge,
                distance: item.distance,
                promptLatex: difficulty === "ELITE"
                    ? t("gp3_02.prompts.ef_force_from_qr", {
                        Q: formatValue(item.charge),
                        r: formatValue(item.distance),
                        q: formatValue(1.6e-19)
                    })
                    : t("gp3_02.prompts.ef_field_from_qr", {
                        Q: formatValue(item.charge),
                        r: formatValue(item.distance)
                    }),
                expressionLatex: `E = k \\frac{Q}{r^2}`,
                targetLatex: "answer",
                slots: [
                    {
                        id: "answer",
                        labelLatex: difficulty === "ELITE" ? t("gp3_02.labels.answer_force") : t("gp3_02.labels.answer_field"),
                        placeholder: t("gp3_02.labels.placeholder_value"),
                        expected: 'field' in item ? item.field : item.answer
                    }
                ],
                correctLatex: `${t("common.answer_prefix")} ${'field' in item ? item.field : item.answer}`,
                answer: ('field' in item ? item.field : item.answer) as string
            }));
        }

        // STAGE 2: MAGNETIC_FIELD - Magnetic field calculations
        if (stage === "MAGNETIC_FIELD") {
            const magneticData = {
                BASIC: [
                    { current: 10, distance: 0.1, field: "2e-5" },
                    { current: 5, distance: 0.05, field: "2e-5" },
                    { current: 20, distance: 0.2, field: "2e-5" },
                    { current: 15, distance: 0.15, field: "2e-5" },
                    { current: 8, distance: 0.08, field: "2e-5" }
                ],
                CORE: [
                    { current: 100, distance: 0.01, field: "2e-3" },
                    { current: 50, distance: 0.02, field: "5e-4" },
                    { current: 200, distance: 0.05, field: "8e-4" },
                    { current: 75, distance: 0.03, field: "5e-4" },
                    { current: 150, distance: 0.06, field: "5e-4" }
                ],
                ADVANCED: [
                    { turns: 100, current: 2, length: 0.5, field: "5.03e-4" },
                    { turns: 200, current: 1, length: 0.4, field: "6.28e-4" },
                    { turns: 500, current: 0.5, length: 1, field: "3.14e-4" },
                    { turns: 300, current: 1.5, length: 0.6, field: "9.42e-4" },
                    { turns: 400, current: 1, length: 0.8, field: "6.28e-4" }
                ],
                ELITE: [
                    { current: 1000, distance: 0.001, field: "0.2" },
                    { current: 5000, distance: 0.005, field: "0.2" },
                    { current: 2000, distance: 0.002, field: "0.2" },
                    { current: 10000, distance: 0.01, field: "0.2" },
                    { current: 3000, distance: 0.003, field: "0.2" }
                ]
            };

            return magneticData[difficulty].map((item, idx) => {
                const promptLatex = "turns" in item
                    ? t("gp3_02.prompts.mf_solenoid_field", {
                        N: formatValue(item.turns),
                        I: formatValue(item.current),
                        L: formatValue(item.length)
                    })
                    : t("gp3_02.prompts.mf_wire_field", {
                        I: formatValue(item.current),
                        r: formatValue(item.distance)
                    });

                const expressionLatex = "turns" in item
                    ? `B = \\mu_0 \\frac{NI}{L}`
                    : `B = \\frac{\\mu_0 I}{2\\pi r}`;

                return {
                    id: `${stage}_${difficulty}_${idx + 1}`,
                    difficulty,
                    stage,
                    promptLatex,
                    expressionLatex,
                    targetLatex: "answer",
                    slots: [
                        {
                            id: "answer",
                            labelLatex: t("gp3_02.labels.answer_field"),
                            placeholder: t("gp3_02.labels.placeholder_value"),
                            expected: item.field
                        }
                    ],
                    correctLatex: `\\text{B = } ${item.field} \\text{ T}`,
                    answer: item.field as string
                };
            });
        }

        // STAGE 3: PARTICLE_MOTION - Charged particle motion in fields
        if (stage === "PARTICLE_MOTION") {
            const motionData = {
                BASIC: [
                    { charge: 1.6e-19, field: 1000, force: "1.6e-16" },
                    { charge: 1.6e-19, field: 5000, force: "8e-16" },
                    { charge: 1.6e-19, field: 2000, force: "3.2e-16" },
                    { charge: 3.2e-19, field: 1000, force: "3.2e-16" },
                    { charge: 1.6e-19, field: 10000, force: "1.6e-15" }
                ],
                CORE: [
                    { charge: 1.6e-19, velocity: 1e6, field: 0.1, force: "1.6e-14" },
                    { charge: 1.6e-19, velocity: 2e6, field: 0.05, force: "1.6e-14" },
                    { charge: 1.6e-19, velocity: 5e5, field: 0.2, force: "1.6e-14" },
                    { charge: 1.6e-19, velocity: 1e7, field: 0.01, force: "1.6e-14" },
                    { charge: 1.6e-19, velocity: 3e6, field: 0.05, force: "2.4e-14" }
                ],
                ADVANCED: [
                    { charge: 1.6e-19, velocity: 1e6, field: 0.1, mass: 9.1e-31, radius: "5.69e-5" },
                    { charge: 1.6e-19, velocity: 2e6, field: 0.05, mass: 9.1e-31, radius: "2.28e-4" },
                    { charge: 1.6e-19, velocity: 5e5, field: 0.2, mass: 9.1e-31, radius: "1.42e-5" },
                    { charge: 1.6e-19, velocity: 1e7, field: 0.01, mass: 9.1e-31, radius: "5.69e-3" },
                    { charge: 1.6e-19, velocity: 3e6, field: 0.1, mass: 9.1e-31, radius: "1.71e-4" }
                ],
                ELITE: [
                    { charge: 1.6e-19, voltage: 1000, mass: 9.1e-31, velocity: "1.88e7" },
                    { charge: 1.6e-19, voltage: 5000, mass: 9.1e-31, velocity: "4.19e7" },
                    { charge: 1.6e-19, voltage: 2000, mass: 9.1e-31, velocity: "2.65e7" },
                    { charge: 1.6e-19, voltage: 10000, mass: 9.1e-31, velocity: "5.93e7" },
                    { charge: 1.6e-19, voltage: 500, mass: 9.1e-31, velocity: "1.33e7" }
                ]
            };

            return motionData[difficulty].map((item, idx) => {
                const promptLatex = "voltage" in item
                    ? t("gp3_02.prompts.pm_velocity_from_voltage", {
                        q: formatValue(item.charge),
                        V: formatValue(item.voltage),
                        m: formatValue(item.mass)
                    })
                    : "radius" in item && "mass" in item && "velocity" in item
                        ? t("gp3_02.prompts.pm_radius", {
                            m: formatValue(item.mass),
                            v: formatValue(item.velocity),
                            q: formatValue(item.charge),
                            B: formatValue(item.field)
                        })
                        : "velocity" in item
                            ? t("gp3_02.prompts.pm_magnetic_force", {
                                q: formatValue(item.charge),
                                v: formatValue(item.velocity),
                                B: formatValue(item.field)
                            })
                            : t("gp3_02.prompts.pm_electric_force", {
                                q: formatValue(item.charge),
                                E: formatValue(item.field)
                            });

                const expressionLatex = "voltage" in item
                    ? `v = \\sqrt{\\frac{2qV}{m}}`
                    : "radius" in item
                        ? `r = \\frac{mv}{qB}`
                        : "velocity" in item
                            ? `F = qvB`
                            : `F = qE`;

                const labelLatex = "voltage" in item
                    ? t("gp3_02.labels.answer_velocity")
                    : "radius" in item
                        ? t("gp3_02.labels.answer_radius")
                        : t("gp3_02.labels.answer_force");

                const expectedValue = "force" in item ? item.force : "radius" in item ? item.radius : item.velocity;

                return {
                    id: `${stage}_${difficulty}_${idx + 1}`,
                    difficulty,
                    stage,
                    charge: item.charge,
                    velocity: "velocity" in item ? (typeof item.velocity === "string" ? parseFloat(item.velocity) : item.velocity) : undefined,
                    magneticField: "field" in item ? item.field : undefined,
                    promptLatex,
                    expressionLatex,
                    targetLatex: "answer",
                    slots: [
                        {
                            id: "answer",
                            labelLatex,
                            placeholder: t("gp3_02.labels.placeholder_value"),
                            expected: expectedValue
                        }
                    ],
                    correctLatex: `${t("common.answer_prefix")} ${expectedValue}`,
                    answer: expectedValue as string
                };
            });
        }

        return [];
    }, [t, formatValue]);

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
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<GP302Quest, Stage>({
    moduleCode: "gp3-02",
        buildPool: (d, s) => buildStagePool(gp3_02_t, d, s),
        initialStage: "ELECTRIC_FIELD",
    });

    useEffect(() => {
        if (!currentQuest) return;
        if (currentQuest?.fieldStrength) setFieldIntensity(currentQuest?.fieldStrength);
    }, [currentQuest]);

    const stages = useMemo(() => [
        { id: "ELECTRIC_FIELD" as Stage, label: gp3_02_t.stages.electric_field },
        { id: "MAGNETIC_FIELD" as Stage, label: gp3_02_t.stages.magnetic_field },
        { id: "PARTICLE_MOTION" as Stage, label: gp3_02_t.stages.particle_motion },
    ], [gp3_02_t.stages]);

    const printSections = useMemo(() => buildQuestPrintSections<GP302Quest, Stage>({
        moduleTitle: gp3_02_t.title,
        stages,
        difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
        difficultyLabels: {
            BASIC: gp3_02_t.difficulty.basic,
            CORE: gp3_02_t.difficulty.core,
            ADVANCED: gp3_02_t.difficulty.advanced,
            ELITE: gp3_02_t.difficulty.elite,
        },
        buildPool: (d, s) => buildStagePool(gp3_02_t, d, s),
    }), [buildStagePool, gp3_02_t, stages]);

    if (!currentQuest) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">{gp3_02_t.labels.loading}</div>
            </div>
        );
    }

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
            title={gp3_02_t.title}
            moduleCode="GP3.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            printSections={printSections}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
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
                        key={currentQuest?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black/30 rounded-xl p-6 border border-white/10"
                    >
                        <div className="mb-4">
                            <div className="text-white/50 text-sm mb-2">{gp3_02_t.labels.question} {currentQuest?.id}</div>
                            <div className="text-white text-lg">{renderMixedText(currentQuest?.promptLatex || "")}</div>
                        </div>

                        <div className="mb-4 p-4 bg-black/50 rounded-lg border border-cyan-500/30">
                            <div className="text-white/60 text-xs uppercase tracking-wider mb-2">{gp3_02_t.labels.formula}</div>
                            <div className="text-white text-xl">
                                <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
                            </div>
                        </div>

                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-4">
                                <label className="text-white/70 min-w-[120px]">{slot.labelLatex}:</label>
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    aria-label={slot.id}
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
