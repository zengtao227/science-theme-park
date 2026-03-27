"use client";

import { useCallback, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import InductionVisualization from "@/components/chamber/gp3-03/InductionVisualization";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";
import { renderMixedText } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createGP303FeedbackProvider } from "@/lib/gp3-03/provider";
import type { GP303Quest, Stage } from "@/lib/gp3-03/types";

export default function GP303Induction() {
    const { t } = useLanguage();
    const feedbackContentProvider = useMemo(() => createGP303FeedbackProvider(t), [t]);

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
        const buildFaradayPrompt = (item: any) => {
            if (difficulty === "BASIC") {
                return t("gp3_03.prompts.faraday_basic", { flux: item.flux, time: item.time });
            }
            if (difficulty === "CORE") {
                return t("gp3_03.prompts.faraday_core", { turns: item.turns, flux: item.flux, time: item.time });
            }
            if (difficulty === "ADVANCED") {
                return t("gp3_03.prompts.faraday_advanced", {
                    turns: item.turns,
                    area: item.area,
                    field: item.field,
                    time: item.time
                });
            }
            return t("gp3_03.prompts.faraday_elite", {
                turns: item.turns,
                area: item.area,
                field: item.field,
                freq: item.freq
            });
        };

        const buildGeneratorPrompt = (item: any) => {
            if (difficulty === "BASIC") {
                return t(`gp3_03.prompts.generator_basic_${String(item.type).toLowerCase()}`);
            }
            if (difficulty === "CORE") {
                return t("gp3_03.prompts.generator_core", {
                    turns: item.turns,
                    area: item.area,
                    field: item.field,
                    speed: item.speed
                });
            }
            if (difficulty === "ADVANCED") {
                if (typeof item.current === "string") {
                    return t("gp3_03.prompts.generator_adv_find_current", { power: item.power, voltage: item.voltage });
                }
                if (typeof item.voltage === "string") {
                    return t("gp3_03.prompts.generator_adv_find_voltage", { power: item.power, current: item.current });
                }
                return t("gp3_03.prompts.generator_adv_find_power", { voltage: item.voltage, current: item.current });
            }
            const typeLabel = t(`gp3_03.prompts.generator_type_${item.type}`);
            return t("gp3_03.prompts.generator_elite", {
                type: typeLabel,
                efficiency: item.efficiency,
                input: item.input
            });
        };

        if (stage === "FARADAYS_LAW") {
            const faradayData = {
                BASIC: [
                    { flux: 0.1, time: 0.5, emf: "0.2" },
                    { flux: 0.2, time: 1, emf: "0.2" },
                    { flux: 0.5, time: 2, emf: "0.25" },
                    { flux: 0.3, time: 0.6, emf: "0.5" },
                    { flux: 0.4, time: 0.8, emf: "0.5" }
                ],
                CORE: [
                    { turns: 100, flux: 0.01, time: 0.1, emf: "10" },
                    { turns: 200, flux: 0.005, time: 0.1, emf: "10" },
                    { turns: 50, flux: 0.02, time: 0.05, emf: "20" },
                    { turns: 150, flux: 0.01, time: 0.15, emf: "10" },
                    { turns: 300, flux: 0.01, time: 0.3, emf: "10" }
                ],
                ADVANCED: [
                    { turns: 500, area: 0.01, field: 0.5, time: 0.1, emf: "25" },
                    { turns: 1000, area: 0.005, field: 0.2, time: 0.1, emf: "10" },
                    { turns: 200, area: 0.02, field: 1, time: 0.2, emf: "20" },
                    { turns: 800, area: 0.01, field: 0.25, time: 0.1, emf: "20" },
                    { turns: 400, area: 0.015, field: 0.5, time: 0.15, emf: "20" }
                ],
                ELITE: [
                    { turns: 1000, area: 0.01, field: 1, freq: 50, emf: "3142" },
                    { turns: 500, area: 0.02, field: 0.5, freq: 60, emf: "1885" },
                    { turns: 2000, area: 0.005, field: 1, freq: 50, emf: "3142" },
                    { turns: 800, area: 0.01, field: 0.8, freq: 50, emf: "2011" },
                    { turns: 1500, area: 0.008, field: 0.6, freq: 60, emf: "2714" }
                ]
            };

            return faradayData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                flux: 'flux' in item ? item.flux : undefined,
                time: 'time' in item ? item.time : undefined,
                turns: 'turns' in item ? item.turns : undefined,
                promptLatex: buildFaradayPrompt(item),
                expressionLatex: difficulty === "ELITE" ? 
                    `\\varepsilon = NAB\\omega` : `\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: t("gp3_03.labels.emf"),
                    placeholder: t("gp3_03.labels.type_value"),
                    expected: item.emf
                }],
                correctLatex: `\\text{EMF = } ${item.emf} \\text{ V}`,
                answer: item.emf as string
            }));
        }

        if (stage === "LENZS_LAW") {
            const lenzData = {
                BASIC: [
                    { scenario: "magnet_approaching", direction: "oppose" },
                    { scenario: "magnet_leaving", direction: "oppose" },
                    { scenario: "field_increasing", direction: "oppose" },
                    { scenario: "field_decreasing", direction: "oppose" },
                    { scenario: "coil_entering", direction: "oppose" }
                ],
                CORE: [
                    { scenario: "falling_magnet", direction: "slow" },
                    { scenario: "rotating_coil", direction: "alternating" },
                    { scenario: "moving_conductor", direction: "perpendicular" },
                    { scenario: "changing_current", direction: "oppose" },
                    { scenario: "transformer", direction: "transfer" }
                ],
                ADVANCED: [
                    { scenario: "eddy_currents", direction: "brake" },
                    { scenario: "self_inductance", direction: "oppose" },
                    { scenario: "mutual_inductance", direction: "induce" },
                    { scenario: "lenz_brake", direction: "slow" },
                    { scenario: "induction_heating", direction: "heat" }
                ],
                ELITE: [
                    { scenario: "maglev_train", direction: "levitate" },
                    { scenario: "induction_motor", direction: "rotate" },
                    { scenario: "wireless_charging", direction: "transfer" },
                    { scenario: "metal_detector", direction: "detect" },
                    { scenario: "regenerative_braking", direction: "generate" }
                ]
            };

            return lenzData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: t(`gp3_03.prompts.lenz_${item.scenario}`),
                expressionLatex: t("gp3_03.expressions.lenz_law"),
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: t("gp3_03.labels.direction_effect"),
                    placeholder: t("gp3_03.labels.type_answer"),
                    expected: item.direction
                }],
                correctLatex: `${t("common.answer_prefix")} ${item.direction}`,
                answer: item.direction as string
            }));
        }

        if (stage === "GENERATORS") {
            const generatorData = {
                BASIC: [
                    { type: "AC", output: "alternating" },
                    { type: "DC", output: "direct" },
                    { type: "frequency", output: "speed" },
                    { type: "voltage", output: "turns" },
                    { type: "power", output: "current" }
                ],
                CORE: [
                    { turns: 100, area: 0.1, field: 0.5, speed: 60, voltage: "188" },
                    { turns: 200, area: 0.05, field: 1, speed: 120, voltage: "377" },
                    { turns: 150, area: 0.08, field: 0.8, speed: 90, voltage: "339" },
                    { turns: 250, area: 0.04, field: 0.6, speed: 100, voltage: "377" },
                    { turns: 300, area: 0.03, field: 0.7, speed: 80, voltage: "396" }
                ],
                ADVANCED: [
                    { power: 1000, voltage: 220, current: "4.55" },
                    { power: 5000, voltage: 380, current: "13.16" },
                    { power: 2000, current: 10, voltage: "200" },
                    { voltage: 220, current: 20, power: "4400" },
                    { power: 10000, voltage: 400, current: "25" }
                ],
                ELITE: [
                    { type: "hydro", efficiency: 90, input: 10000, output: "9000" },
                    { type: "wind", efficiency: 85, input: 5000, output: "4250" },
                    { type: "thermal", efficiency: 40, input: 100000, output: "40000" },
                    { type: "solar", efficiency: 20, input: 1000, output: "200" },
                    { type: "nuclear", efficiency: 33, input: 3000000, output: "990000" }
                ]
            };

            return generatorData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: buildGeneratorPrompt(item),
                expressionLatex: difficulty === "BASIC" ? t("gp3_03.expressions.generator_principles") :
                               difficulty === "CORE" ? `\\varepsilon = NAB\\omega` :
                               difficulty === "ADVANCED" ? `P = VI` :
                               `\\eta = \\frac{P_{out}}{P_{in}}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: difficulty === "BASIC" ? t("gp3_03.labels.answer") :
                               difficulty === "CORE" ? t("gp3_03.labels.voltage") :
                               difficulty === "ADVANCED" ? t("gp3_03.labels.value") : t("gp3_03.labels.output_power"),
                    placeholder: t("gp3_03.labels.type_value"),
                    expected: ('output' in item ? item.output : undefined) || 
                             ('voltage' in item ? item.voltage : undefined) || 
                             ('current' in item ? item.current : undefined) || 
                             ('power' in item ? item.power : undefined) || "0"
                }],
                correctLatex: `${t("common.answer_prefix")} ${('output' in item ? item.output : undefined) || 
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
    }, [t]);

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
      requestAiFeedback,
    feedbackLevel,
    feedbackContent,
    feedbackAvailability,
    showHintLevel,
    showStepsLevel,
    showFullSolution,
    policy,
    } = useQuestManager<GP303Quest, Stage>({
    moduleCode: "gp3-03",
        buildPool: (d, s) => buildStagePool(gp3_03_t, d, s),
        initialStage: "FARADAYS_LAW",
    feedbackContentProvider,
    });

    const stages = useMemo(() => [
        { id: "FARADAYS_LAW" as Stage, label: gp3_03_t.stages.faradays_law },
        { id: "LENZS_LAW" as Stage, label: gp3_03_t.stages.lenzs_law },
        { id: "GENERATORS" as Stage, label: gp3_03_t.stages.generators },
    ], [gp3_03_t.stages]);

    const printSections = useMemo(() => buildQuestPrintSections<GP303Quest, Stage>({
        moduleTitle: gp3_03_t.title,
        stages,
        difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
        difficultyLabels: {
            BASIC: gp3_03_t.difficulty.basic,
            CORE: gp3_03_t.difficulty.core,
            ADVANCED: gp3_03_t.difficulty.advanced,
            ELITE: gp3_03_t.difficulty.elite,
        },
        buildPool: (d, s) => buildStagePool(gp3_03_t, d, s),
    }), [buildStagePool, gp3_03_t, stages]);

    if (!currentQuest) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">{t("gp3_03.labels.loading")}</div>
            </div>
        );
    }

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
            feedbackContent={feedbackContent}
            feedbackLevel={feedbackLevel}
            feedbackAvailability={feedbackAvailability}
            feedbackPolicy={policy}
            onShowHint={showHintLevel}
            onShowSteps={showStepsLevel}
            onShowFull={showFullSolution}
            title={gp3_03_t.title}
            moduleCode="GP3.03"
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
                            <div className="text-white/50 text-sm mb-2">
                                {t("gp3_03.labels.question_id", { id: currentQuest?.id || "" })}
                            </div>
                            <div className="text-white text-lg">{renderMixedText(currentQuest?.promptLatex || "")}</div>
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
