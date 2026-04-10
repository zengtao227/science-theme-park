"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useCallback, useEffect, useMemo } from "react";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import P308OpticsCanvas from "@/components/chamber/sp3-08/OpticsCanvas";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createSP308FeedbackProvider } from "@/lib/sp3-08/provider";
import {
  Stage,
  SP308Quest,
  generateReflectionQuests,
  generateRefractionQuests,
  generateLensQuests,
} from "@/lib/sp3-08/quests";





export default function P301Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createSP308FeedbackProvider(t), [t]);

  const buildPool = useCallback((d: Difficulty, s: Stage) => {
    if (s === "REFLECTION") return generateReflectionQuests(t, d);
    if (s === "REFRACTION") return generateRefractionQuests(t, d);
    if (s === "LENSES") return generateLensQuests(t, d);
    return [];
  }, [t]);

  const stages = useMemo(() => [
    { id: "REFLECTION" as Stage, label: t("sp3_08.stages.reflection") },
    { id: "REFRACTION" as Stage, label: t("sp3_08.stages.refraction") },
    { id: "LENSES" as Stage, label: t("sp3_08.stages.lenses") },
  ], [t]);

  const printSections = useMemo(() => () => buildQuestPrintSections<SP308Quest, Stage>({
    moduleTitle: t("sp3_08.title"),
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: t("sp3_08.difficulty.basic"),
      CORE: t("sp3_08.difficulty.core"),
      ADVANCED: t("sp3_08.difficulty.advanced"),
      ELITE: t("sp3_08.difficulty.elite"),
    },
    buildPool,
  }), [buildPool, stages, t]);

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    successRate,
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
    } = useQuestManager<SP308Quest, Stage>({
    moduleCode: "sp3-08",
    buildPool,
    initialStage: "REFLECTION",
    feedbackContentProvider,
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp3-08", stage);
    }
  }, [lastCheck, completeStage, stage]);

  if (!currentQuest) return null;

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
      title={t("sp3_08.title")}
      moduleCode="SP3.08"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      printSectionsBuilder={printSections}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      translations={{
        back: t("sp3_08.back"),
        check: t("sp3_08.check"),
        next: t("sp3_08.next"),
        correct: t("sp3_08.correct"),
        incorrect: t("sp3_08.incorrect"),
        difficulty: {
          basic: t("sp3_08.difficulty.basic"),
          core: t("sp3_08.difficulty.core"),
          advanced: t("sp3_08.difficulty.advanced"),
          elite: t("sp3_08.difficulty.elite"),
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <P308OpticsCanvas
            scenario={currentQuest?.scenario}
            angle={currentQuest?.angle}
            n1={currentQuest?.n1}
            n2={currentQuest?.n2}
            focalLength={currentQuest?.focalLength}
            showAnswer={lastCheck?.ok === true}
            targetAngle={currentQuest?.targetAngle}
          />
          <div className="text-white text-xs font-mono text-center space-y-1">
            {currentQuest?.scenario === "reflection" && (
              <div>{t("sp3_08.labels.incident_angle")}: {currentQuest?.angle}°</div>
            )}
            {currentQuest?.scenario === "refraction" && (
              <>
                <div>n_1 = {currentQuest?.n1?.toFixed(2)} → n_2 = {currentQuest?.n2?.toFixed(2)}</div>
                <div>{t("sp3_08.labels.incident_angle")}: {currentQuest?.angle}°</div>
              </>
            )}
            {currentQuest?.scenario === "lens" && (
              <div>{t("sp3_08.labels.focal_length")}: {currentQuest?.focalLength}px</div>
            )}
            {lastCheck?.ok && <div className="text-neon-green">✓ {t("sp3_08.labels.light_path_correct")}</div>}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t("sp3_08.objective_title")}
          </h3>
          <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            {renderMixedText(currentQuest?.promptLatex || "")}
          </p>
        </div>

        <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
            {t("sp3_08.target_title")}
          </span>
          <div className="font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95]">
            <InlineMath math={currentQuest?.targetLatex || ""} />
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {currentQuest?.slots.map((slot) => (
            <div key={slot.id} className="space-y-3">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                <InlineMath math={slot.labelLatex} />
              </div>
              <input
                value={inputs[slot.id] || ""}
                onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                placeholder={slot.placeholder}
                inputMode="decimal"
              />
            </div>
          ))}

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/90 font-black mb-2">{t("sp3_08.labels.formula")}</div>
            <div className="text-sm text-white/60 font-mono">
              <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>

          {currentQuest?.scenario === "refraction" && (
            <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
              <div className="text-[9px] uppercase tracking-[0.3em] text-neon-cyan/60 font-black mb-2">{t("sp3_08.labels.hint")}</div>
              <div className="text-xs text-neon-cyan/80 font-mono">
                {t("sp3_08.hints.refraction")}
              </div>
            </div>
          )}
        </div>
      </div>
    </ChamberLayout>
  );
}
