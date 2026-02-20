"use client";

import { useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ElectrolysisCanvas from "@/components/chamber/gc1-02/ElectrolysisCanvas";
import CorrosionCanvas from "@/components/chamber/gc1-02/CorrosionCanvas";
import { useQuestManager } from "@/hooks/useQuestManager";
import {
    Stage,
    GC102Quest as GC102QuestType,
    generatePrinciplesQuests,
    generatePlatingQuests,
    generateCorrosionQuests,
} from "@/lib/gc1-02/quests";

export default function GC102Page() {
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
    } = useQuestManager<GC102QuestType, Stage>({
        moduleCode: "gc1-02",
        buildPool: (d, s) => {
            if (s === "PRINCIPLES") return generatePrinciplesQuests(t, d);
            if (s === "PLATING") return generatePlatingQuests(t, d);
            if (s === "CORROSION") return generateCorrosionQuests(t, d);
            return [];
        },
        initialStage: "PRINCIPLES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gc1-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "PRINCIPLES", label: t("gc1_02.stages.principles") },
        { id: "PLATING", label: t("gc1_02.stages.plating") },
        { id: "CORROSION", label: t("gc1_02.stages.corrosion") },
    ];

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            title={t("gc1_02.title")}
            moduleCode="GC1.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("gc1_02.footer_left")}
            translations={{
                back: t("gc1_02.back"),
                check: t("gc1_02.check"),
                next: t("gc1_02.next"),
                correct: t("gc1_02.correct"),
                incorrect: t("gc1_02.incorrect"),
                difficulty: {
                    BASIC: t("gc1_02.difficulty.basic"),
                    CORE: t("gc1_02.difficulty.core"),
                    ADVANCED: t("gc1_02.difficulty.advanced"),
                    ELITE: t("gc1_02.difficulty.elite"),
                },
                ready: t("gc1_02.ready"),
                monitor_title: t("gc1_02.monitor_title"),
            }}
            monitorContent={
                <div className="space-y-4">
                    <div className="flex-1 bg-black/50 rounded-xl border border-white/10 overflow-hidden relative min-h-[300px]">
                        {stage === "CORROSION" ? (
                            <CorrosionCanvas
                                protectMethod={currentQuest?.metal === "Magnesium" ? "sacrificial" : "none"}
                                isSalty={true}
                            />
                        ) : (
                            <ElectrolysisCanvas
                                voltage={2.0}
                                electrolyte={currentQuest?.solution || "CuSO4"}
                                activeStage={stage}
                                showIons={true}
                            />
                        )}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                        {t("gc1_02.target_title")}
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                        <div className="text-[11px] font-black tracking-[0.3em] text-white/60">SIMULATION_LOG</div>
                        <div className="text-xs font-mono text-white/80">
                            <div>METAL: {currentQuest?.metal}</div>
                            <div>CURRENT: {currentQuest?.current} A</div>
                            <div>TIME: {currentQuest?.time} s</div>
                            <div>SOLN: {currentQuest?.solution}</div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
                        {t("gc1_02.mission.title")}
                    </h3>
                    <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                        {currentQuest?.promptLatex}
                    </div>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {currentQuest?.slots.map(slot => (
                            <div key={slot.id} className="space-y-2">
                                <div className="text-center text-white/60 text-[10px] uppercase tracking-widest">{slot.labelLatex}</div>
                                <input
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs(v => ({ ...v, [slot.id]: e.target.value }))}
                                    className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                                    placeholder={slot.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
