"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LogarithmicCanvas from "@/components/chamber/sm3-04/LogarithmicCanvas";
import {
    S304Quest,
    Stage,
    generatePhQuests,
    generateDecibelQuests,
    generateRichterQuests,
} from "@/lib/sm3-04/quests";



const round2 = (v: number) => Math.round(v * 100) / 100;

function buildStagePool(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty, stage: Stage): S304Quest[] {
    if (stage === "PH") return generatePhQuests(t, difficulty);
    if (stage === "DECIBEL") return generateDecibelQuests(t, difficulty);
    if (stage === "RICHTER") return generateRichterQuests(t, difficulty);
    return [];
}

export default function S304Page() {
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
      requestAiFeedback
    } = useQuestManager<S304Quest, Stage>({
    moduleCode: "sm3-04",
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "PH",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm3-04", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sm3_04.title")}
      moduleCode="SM3.04"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "PH", label: t("sm3_04.stages.ph") },
        { id: "DECIBEL", label: t("sm3_04.stages.decibel") },
        { id: "RICHTER", label: t("sm3_04.stages.richter") },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sm3_04.footer_left")}
      translations={{
        back: t("sm3_04.back"),
        check: t("sm3_04.check"),
        next: t("sm3_04.next"),
        correct: t("sm3_04.correct"),
        incorrect: t("sm3_04.incorrect"),
        ready: t("sm3_04.ready"),
        monitor_title: t("sm3_04.monitor_title"),
        difficulty: {
          basic: t("sm3_04.difficulty.basic"),
          core: t("sm3_04.difficulty.core"),
          advanced: t("sm3_04.difficulty.advanced"),
          elite: t("sm3_04.difficulty.elite"),
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <LogarithmicCanvas
            stage={stage}
            value={currentQuest?.value || 7}
            translations={t("sm3_04.canvas")}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t("sm3_04.target_title")}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{t("sm3_04.labels.hints")}</div>
            <div className="text-white font-black text-lg">
              <InlineMath math={t(`sm3_04.formulas.${stage.toLowerCase()}`)} />
            </div>
            <div className="text-white/70 text-sm font-mono">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t("sm3_04.mission.title")}</h3>
          <p className="text-base text-white/70 font-mono">{t("sm3_04.mission.description")}</p>
        </div>
        
        {/* Scenario description */}
        {currentQuest?.scenarioKey && (
          <div className="max-w-4xl mx-auto p-6 bg-emerald-950/20 border-2 border-emerald-500/30 rounded-xl">
            <div className="text-sm font-medium text-emerald-300 leading-relaxed">
              {t(`sm3_04.scenarios.${currentQuest?.scenarioKey}`)}
            </div>
          </div>
        )}
        
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t("sm3_04.objective_title")}</h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                  {slot.unit && (
                    <div className="text-xl font-black text-white/80 min-w-[30px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {t("sm3_04.input_tip_2dp")}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
