"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MotorLabCanvas from "@/components/chamber/sp2-03/MotorLabCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "ASSEMBLE" | "POWER" | "REVERSE";
type MotorQuest = Quest & { stage: Stage };

export default function SP203Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const locale = translations[currentLanguage as keyof typeof translations] as typeof translations.EN;
  const t = locale.sp2_03 || translations.EN.sp2_03;
  const [polarity, setPolarity] = useState<"NS" | "SN">("NS");
  const [currentOn, setCurrentOn] = useState(false);

  const directionLabel = useMemo(() => {
    if (!currentOn) return t.labels.direction_stop;
    return polarity === "NS" ? t.labels.direction_cw : t.labels.direction_ccw;
  }, [currentOn, polarity, t.labels.direction_ccw, t.labels.direction_cw, t.labels.direction_stop]);

  const speed = currentOn ? 1.2 : 0;

  const buildPool = useCallback((difficulty: Difficulty, stage: Stage): MotorQuest[] => {
    const expected = stage === "ASSEMBLE" ? 0 : 1;
    const correctLatex = stage === "ASSEMBLE"
      ? "\\text{Open the switch before powering the motor.}"
      : stage === "POWER"
        ? "\\text{Close the switch to power the coil.}"
        : "\\text{Swap poles to reverse the rotation.}";
    return [
      {
        id: "M1",
        difficulty,
        stage,
        promptLatex: t.stages[stage.toLowerCase() as "assemble" | "power" | "reverse"],
        expressionLatex: "F=BIL",
        targetLatex: "state",
        slots: [
          {
            id: "status",
            labelLatex: "state",
            placeholder: "0/1",
            expected,
          },
        ],
        correctLatex,
      },
    ];
  }, [t.stages]);

  const {
    stage,
    setInputs,
    lastCheck,
    verify,
    next,
    handleStageChange,
    difficulty,
    handleDifficultyChange,
  } = useQuestManager<MotorQuest, Stage>({
    buildPool,
    initialStage: "ASSEMBLE",
    tolerance: 0.1,
  });

  useEffect(() => {
    const value = stage === "ASSEMBLE"
      ? currentOn ? "1" : "0"
      : stage === "POWER"
        ? currentOn ? "1" : "0"
        : currentOn && polarity === "SN" ? "1" : "0";
    setInputs({ status: value });
  }, [currentOn, polarity, setInputs, stage]);

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp2-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const handleNext = () => {
    if (stage === "ASSEMBLE") {
      handleStageChange("POWER");
      next();
      return;
    }
    if (stage === "POWER") {
      handleStageChange("REVERSE");
      next();
      return;
    }
    handleStageChange("ASSEMBLE");
    setCurrentOn(false);
    setPolarity("NS");
    next();
  };

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SP2.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "ASSEMBLE", label: t.stages.assemble },
        { id: "POWER", label: t.stages.power },
        { id: "REVERSE", label: t.stages.reverse },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={handleNext}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <MotorLabCanvas currentOn={currentOn} polarity={polarity} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t.target_title}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.labels.readout}
            </div>
            <div className="text-white font-black text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t.labels.direction}</span>
                <span>{directionLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t.labels.speed}</span>
                <span>{speed.toFixed(1)} rad/s</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t.mission.title}
          </h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "ASSEMBLE" && t.stages.assemble_desc}
            {stage === "POWER" && t.stages.power_desc}
            {stage === "REVERSE" && t.stages.reverse_desc}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t.labels.polarity}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPolarity("NS")}
                className={`min-h-[44px] px-4 border-2 ${polarity === "NS" ? "border-white text-white" : "border-white/30 text-white/60"}`}
              >
                N → S
              </button>
              <button
                onClick={() => setPolarity("SN")}
                className={`min-h-[44px] px-4 border-2 ${polarity === "SN" ? "border-white text-white" : "border-white/30 text-white/60"}`}
              >
                S → N
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t.labels.current}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentOn((v) => !v)}
                className={`min-h-[44px] px-6 border-2 ${currentOn ? "border-neon-green text-neon-green" : "border-white/30 text-white/60"}`}
              >
                {currentOn ? t.labels.current_on : t.labels.current_off}
              </button>
              <div className="text-white/60 font-mono text-xs">
                <InlineMath math="F = BIL" />
              </div>
            </div>
          </div>
          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "ASSEMBLE" && t.stages.assemble_hint}
              {stage === "POWER" && t.stages.power_hint}
              {stage === "REVERSE" && t.stages.reverse_hint}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
