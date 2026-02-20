"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ProbabilityVisualization from "@/components/chamber/gm3-01/ProbabilityVisualization";
import {
  Stage,
  G301Quest,
  generateBasicProbQuests,
  generateBinomialQuests,
  generateConditionalQuests,
  generateMissionQuests,
} from "@/lib/gm3-01/quests";




function buildStagePool(gm3_01_t: any, difficulty: Difficulty, stage: Stage): G301Quest[] {
  if (stage === "BASIC_PROB") return generateBasicProbQuests(gm3_01_t, difficulty);
  if (stage === "BINOMIAL") return generateBinomialQuests(gm3_01_t, difficulty);
  if (stage === "CONDITIONAL") return generateConditionalQuests(gm3_01_t, difficulty);
  if (stage === "MISSION") return generateMissionQuests(gm3_01_t, difficulty);
  return [];
}

export default function G301Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const gm3_01_t = {
    title: t("gm3_01.title"),
    back: t("gm3_01.back"),
    check: t("gm3_01.check"),
    next: t("gm3_01.next"),
    correct: t("gm3_01.correct"),
    incorrect: t("gm3_01.incorrect"),
    ready: t("gm3_01.ready"),
    monitor_title: t("gm3_01.monitor_title"),
    footer_left: t("gm3_01.footer_left"),
    objective_title: t("gm3_01.objective_title"),
    target_title: t("gm3_01.target_title"),
    stages: {
      basic_prob: t("gm3_01.stages.basic_prob"),
      binomial: t("gm3_01.stages.binomial"),
      conditional: t("gm3_01.stages.conditional"),
      mission: t("gm3_01.stages.mission"),
      basic_prob_prompt_latex: t("gm3_01.stages.basic_prob_prompt_latex"),
      binomial_prompt_latex: t("gm3_01.stages.binomial_prompt_latex"),
      conditional_prompt_latex: t("gm3_01.stages.conditional_prompt_latex"),
      mission_prompt_latex: t("gm3_01.stages.mission_prompt_latex"),
    },
    difficulty: {
      basic: t("gm3_01.difficulty.basic"),
      core: t("gm3_01.difficulty.core"),
      advanced: t("gm3_01.difficulty.advanced"),
      elite: t("gm3_01.difficulty.elite"),
    },
    labels: {
      input: t("gm3_01.labels.input"),
      hints: t("gm3_01.labels.hints"),
    },
    mission: {
      title: t("gm3_01.mission.title"),
      description: t("gm3_01.mission.description"),
    },
    scenarios: {
      basic_prob: t("gm3_01.scenarios.basic_prob"),
      binomial: t("gm3_01.scenarios.binomial"),
      conditional: t("gm3_01.scenarios.conditional"),
      mission: t("gm3_01.scenarios.mission"),
    },
    problems: t("gm3_01.problems"),
    input_tip_4dp: t("gm3_01.input_tip_4dp"),
  };

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
  } = useQuestManager<G301Quest, Stage>({
    moduleCode: "gm3-01",
    buildPool: (d, s) => buildStagePool(gm3_01_t, d, s),
    initialStage: "BASIC_PROB",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={gm3_01_t.title}
      moduleCode="GM3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "BASIC_PROB", label: gm3_01_t.stages.basic_prob },
        { id: "BINOMIAL", label: gm3_01_t.stages.binomial },
        { id: "CONDITIONAL", label: gm3_01_t.stages.conditional },
        { id: "MISSION", label: gm3_01_t.stages.mission },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={gm3_01_t.footer_left}
      translations={{
        back: gm3_01_t.back,
        check: gm3_01_t.check,
        next: gm3_01_t.next,
        correct: gm3_01_t.correct,
        incorrect: gm3_01_t.incorrect,
        ready: gm3_01_t.ready,
        monitor_title: gm3_01_t.monitor_title,
        difficulty: {
          basic: gm3_01_t.difficulty.basic,
          core: gm3_01_t.difficulty.core,
          advanced: gm3_01_t.difficulty.advanced,
          elite: gm3_01_t.difficulty.elite,
        },
      }}
      monitorContent={
        <ProbabilityVisualization
          stage={stage}
          favorable={currentQuest?.favorable}
          total={currentQuest?.total}
          n={currentQuest?.n}
          k={currentQuest?.k}
          p={currentQuest?.p}
          eventA={currentQuest?.eventA}
          eventB={currentQuest?.eventB}
          eventAB={currentQuest?.eventAB}
          translations={{
            title: gm3_01_t.monitor_title,
          }}
        />
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{gm3_01_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{gm3_01_t.mission.description}</p>
        </div>

        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {stage === "BASIC_PROB" && gm3_01_t.scenarios.basic_prob}
            {stage === "BINOMIAL" && gm3_01_t.scenarios.binomial}
            {stage === "CONDITIONAL" && gm3_01_t.scenarios.conditional}
            {stage === "MISSION" && gm3_01_t.scenarios.mission}
          </div>
        </div>

        {/* Problem Text */}
        {currentQuest?.problemText && (
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 max-w-4xl mx-auto">
            <div className="text-[10px] text-cyan-400/60 uppercase tracking-wider mb-3">PROBLEM</div>
            <div className="text-base text-cyan-300 leading-relaxed whitespace-pre-line">
              {currentQuest?.problemText}
            </div>
          </div>
        )}

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{gm3_01_t.objective_title}</h3>
          <p className="text-2xl text-white font-black italic mb-4">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
          <p className="text-lg text-white/70 font-mono">
            <InlineMath math={currentQuest?.expressionLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 gap-4">
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
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {gm3_01_t.input_tip_4dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
