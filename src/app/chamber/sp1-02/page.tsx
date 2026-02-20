"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";


import P102LawsCanvas from "@/components/chamber/sp1-02/LawsCanvas";
import {
    Stage,
    SP102Quest,
    generateFirstLawQuests,
    generateSecondLawQuests,
    generateThirdLawQuests,
} from "@/lib/sp1-02/quests";



export default function SP102NewtonsLaws() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [canvasScenario, setCanvasScenario] = useState<"friction" | "acceleration" | "collision">("acceleration");
    const [mass, setMass] = useState(10);
    const [friction, setFriction] = useState(0.3);
    const [forceX, setForceX] = useState(1.5);

    const sp1_02_t = useMemo(() => ({
        title: t("sp1_02.title"),
        back: t("sp1_02.back"),
        difficulty: {
            basic: t("sp1_02.difficulty.basic"),
            core: t("sp1_02.difficulty.core"),
            advanced: t("sp1_02.difficulty.advanced"),
            elite: t("sp1_02.difficulty.elite")
        },
        stages: {
            first_law: t("sp1_02.stages.first_law"),
            second_law: t("sp1_02.stages.second_law"),
            third_law: t("sp1_02.stages.third_law")
        },
        scenarios: {
            first_law: t("sp1_02.scenarios.first_law"),
            second_law: t("sp1_02.scenarios.second_law"),
            third_law: t("sp1_02.scenarios.third_law")
        },
        footer_left: t("sp1_02.footer_left"),
        check: t("sp1_02.check"),
        next: t("sp1_02.next"),
        correct: t("sp1_02.correct"),
        incorrect: t("sp1_02.incorrect")
    }), [t]);

    const buildPool = useCallback((d: Difficulty, s: Stage) => {
        if (s === "FIRST_LAW") return generateFirstLawQuests(t, d);
        if (s === "SECOND_LAW") return generateSecondLawQuests(t, d);
        if (s === "THIRD_LAW") return generateThirdLawQuests(t, d);
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
        requestAiFeedback
    } = useQuestManager<SP102Quest, Stage>({
        moduleCode: "sp1-02",
        buildPool,
        initialStage: "FIRST_LAW",
    });

    useEffect(() => {
        if (stage === "FIRST_LAW") {
            setCanvasScenario("friction");
            setMass(3);
            setFriction(0.2);
            setForceX(0.5);
        } else if (stage === "SECOND_LAW") {
            setCanvasScenario("acceleration");
            setMass(10);
            setFriction(0.3);
            setForceX(1.5);
        } else if (stage === "THIRD_LAW") {
            setCanvasScenario("collision");
            setMass(2);
            setFriction(0.2);
            setForceX(2);
        }
    }, [stage]);

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
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            title={sp1_02_t.title}
            moduleCode="SP1.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "FIRST_LAW", label: sp1_02_t.stages.first_law },
                { id: "SECOND_LAW", label: sp1_02_t.stages.second_law },
                { id: "THIRD_LAW", label: sp1_02_t.stages.third_law },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sp1_02_t.footer_left}
            translations={{
                back: sp1_02_t.back,
                difficulty: sp1_02_t.difficulty,
                check: sp1_02_t.check,
                next: sp1_02_t.next,
                correct: sp1_02_t.correct,
                incorrect: sp1_02_t.incorrect,
                ready: t("sp1_02.ready") || "SYSTEM_READY",
                monitor_title: t("sp1_02.monitor_title") || "NEWTON_PHYSICS_V1",
            }}
            monitorContent={
                <P102LawsCanvas
                    scenario={canvasScenario}
                    mass={mass}
                    friction={friction}
                    forceX={forceX}
                    initialVelocity={stage === "FIRST_LAW" ? 2 : 0}
                    gravity={1}
                />
            }
        >
            <div className="flex flex-col gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                        {stage === "FIRST_LAW" && sp1_02_t.stages.first_law}
                        {stage === "SECOND_LAW" && sp1_02_t.stages.second_law}
                        {stage === "THIRD_LAW" && sp1_02_t.stages.third_law}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {stage === "FIRST_LAW" && sp1_02_t.scenarios.first_law}
                        {stage === "SECOND_LAW" && sp1_02_t.scenarios.second_law}
                        {stage === "THIRD_LAW" && sp1_02_t.scenarios.third_law}
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
                                Question {currentQuest?.id}
                            </div>
                            <div className="text-white text-lg mb-2">
                                {currentQuest?.promptLatex}
                            </div>
                            {currentQuest?.expressionLatex && (
                                <div className="text-cyan-400 text-sm font-mono">
                                    {currentQuest?.expressionLatex}
                                </div>
                            )}
                        </div>

                        {currentQuest?.slots && currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-4 mb-3">
                                <label className="text-white/70 min-w-[120px]">
                                    {slot.labelLatex}:
                                </label>
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
                                {lastCheck.ok ? sp1_02_t.correct : sp1_02_t.incorrect}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
