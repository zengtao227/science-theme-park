"use client";

import { useState, useMemo, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import RedoxCanvas from "@/components/chamber/gc1-01/RedoxCanvas";
import { useQuestManager } from "@/hooks/useQuestManager";
import {
    Stage,
    GC101Quest as GC101QuestType,
    generateRedoxQuests,
} from "@/lib/gc1-01/quests";

export default function GC101Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

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
    } = useQuestManager<GC101QuestType, Stage>({
        moduleCode: "gc1-01",
        buildPool: (d, s) => generateRedoxQuests(t, d, s),
        initialStage: "BUILD",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gc1-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const activeScenario = useMemo(() => {
        if (stage === "BUILD") return t("gc1_01.scenarios.battery_storage");
        if (stage === "MEASURE") return t("gc1_01.scenarios.corrosion_protection");
        return t("gc1_01.scenarios.analytical_electrochem");
    }, [stage, t]);

    const stages = [
        { id: "BUILD", label: t("gc1_01.stages.build") },
        { id: "MEASURE", label: t("gc1_01.stages.measure") },
        { id: "ANALYZE", label: t("gc1_01.stages.analyze") },
    ];

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            title={t("gc1_01.title")}
            moduleCode="GC1.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("gc1_01.footer_left")}
            translations={{
                back: t("gc1_01.back"),
                check: t("gc1_01.check"),
                next: t("gc1_01.next"),
                correct: t("gc1_01.correct"),
                incorrect: t("gc1_01.incorrect"),
                difficulty: {
                    BASIC: t("gc1_01.difficulty.basic"),
                    CORE: t("gc1_01.difficulty.core"),
                    ADVANCED: t("gc1_01.difficulty.advanced"),
                    ELITE: t("gc1_01.difficulty.elite"),
                },
                ready: t("gc1_01.ready"),
                monitor_title: t("gc1_01.monitor_title"),
            }}
            monitorContent={
                <div className="space-y-4">
                    <RedoxCanvas
                        znConcentration={currentQuest?.simConfig.znConc ?? 1.0}
                        cuConcentration={currentQuest?.simConfig.cuConc ?? 1.0}
                        temperature={currentQuest?.simConfig.temp ?? 298}
                        showElectrons={true}
                        showIons={true}
                    />
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                        {t("gc1_01.target_title")}
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                            {t("gc1_01.labels.cell_potential")}
                        </div>
                        <div className="text-3xl text-neon-cyan font-black text-center">
                            E = 1.10 V
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
                        {t("gc1_01.mission.title")}
                    </h3>
                    <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </div>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 text-center">
                    <input
                        value={inputs["ans"] || ""}
                        onChange={(e) => setInputs({ ans: e.target.value })}
                        className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                        placeholder="..."
                    />
                </div>

                <div className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full">
                    <p className="text-sm text-white/50 leading-relaxed italic">
                        {activeScenario}
                    </p>
                </div>
            </div>
        </ChamberLayout>
    );
}
