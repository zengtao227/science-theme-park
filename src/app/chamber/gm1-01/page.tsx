"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import DerivativeCanvas from "@/components/chamber/gm1-01/DerivativeCanvas";
import {
  Stage,
  G101Quest,
  generatePowerRuleQuests,
  generateFactorRuleQuests,
  generateSumRuleQuests,
  generateProductRuleQuests,
  generateQuotientRuleQuests,
  generateChainRuleQuests
} from "@/lib/gm1-01/quests";



function buildStagePool(gm1_01_t: any, difficulty: Difficulty, stage: Stage): G101Quest[] {
  if (stage === "POWER_RULE") return generatePowerRuleQuests(gm1_01_t, difficulty);
  if (stage === "FACTOR_RULE") return generateFactorRuleQuests(gm1_01_t, difficulty);
  if (stage === "SUM_RULE") return generateSumRuleQuests(gm1_01_t, difficulty);
  if (stage === "PRODUCT_RULE") return generateProductRuleQuests(gm1_01_t, difficulty);
  if (stage === "QUOTIENT_RULE") return generateQuotientRuleQuests(gm1_01_t, difficulty);
  if (stage === "CHAIN_RULE") return generateChainRuleQuests(gm1_01_t, difficulty);
  return [];
}

export default function G101Page() {
  const { completeStage, currentLanguage } = useAppStore();
  const { t } = useLanguage();
  
  const gm1_01_t = {
    title: t("gm1_01.title"),
    description: t("gm1_01.description"),
    back: t("gm1_01.back"),
    check: t("gm1_01.check"),
    next: t("gm1_01.next"),
    correct: t("gm1_01.correct"),
    incorrect: t("gm1_01.incorrect"),
    ready: t("gm1_01.ready"),
    monitor_title: t("gm1_01.monitor_title"),
    footer_left: t("gm1_01.footer_left"),
    target_title: t("gm1_01.target_title"),
    objective_title: t("gm1_01.objective_title"),
    input_tip_2dp: t("gm1_01.input_tip_2dp"),
    stages: {
      POWER_RULE: t("gm1_01.stages.POWER_RULE"),
      FACTOR_RULE: t("gm1_01.stages.FACTOR_RULE"),
      SUM_RULE: t("gm1_01.stages.SUM_RULE"),
      PRODUCT_RULE: t("gm1_01.stages.PRODUCT_RULE"),
      QUOTIENT_RULE: t("gm1_01.stages.QUOTIENT_RULE"),
      CHAIN_RULE: t("gm1_01.stages.CHAIN_RULE"),
      power_rule: t("gm1_01.stages.power_rule"),
      factor_rule: t("gm1_01.stages.factor_rule"),
      sum_rule: t("gm1_01.stages.sum_rule"),
      product_rule: t("gm1_01.stages.product_rule"),
      quotient_rule: t("gm1_01.stages.quotient_rule"),
      chain_rule: t("gm1_01.stages.chain_rule"),
      power_rule_prompt_latex: t("gm1_01.stages.power_rule_prompt_latex"),
      factor_rule_prompt_latex: t("gm1_01.stages.factor_rule_prompt_latex"),
      sum_rule_prompt_latex: t("gm1_01.stages.sum_rule_prompt_latex"),
      product_rule_prompt_latex: t("gm1_01.stages.product_rule_prompt_latex"),
      quotient_rule_prompt_latex: t("gm1_01.stages.quotient_rule_prompt_latex"),
      chain_rule_prompt_latex: t("gm1_01.stages.chain_rule_prompt_latex"),
    },
    difficulty: {
      basic: t("gm1_01.difficulty.basic"),
      core: t("gm1_01.difficulty.core"),
      advanced: t("gm1_01.difficulty.advanced"),
      elite: t("gm1_01.difficulty.elite"),
    },
    labels: {
      hints: t("gm1_01.labels.hints"),
    },
    formulas: {
      power_rule: t("gm1_01.formulas.power_rule"),
      factor_rule: t("gm1_01.formulas.factor_rule"),
      sum_rule: t("gm1_01.formulas.sum_rule"),
      product_rule: t("gm1_01.formulas.product_rule"),
      quotient_rule: t("gm1_01.formulas.quotient_rule"),
      chain_rule: t("gm1_01.formulas.chain_rule"),
    },
    mission: {
      title: t("gm1_01.mission.title"),
      description: t("gm1_01.mission.description"),
    },
    scenarios: {
      power_rule: t("gm1_01.scenarios.power_rule"),
      factor_rule: t("gm1_01.scenarios.factor_rule"),
      sum_rule: t("gm1_01.scenarios.sum_rule"),
      product_rule: t("gm1_01.scenarios.product_rule"),
      quotient_rule: t("gm1_01.scenarios.quotient_rule"),
      chain_rule: t("gm1_01.scenarios.chain_rule"),
    },
    canvas: {
      title: t("gm1_01.canvas.title"),
      subtitle_power: t("gm1_01.canvas.subtitle_power"),
      subtitle_factor: t("gm1_01.canvas.subtitle_factor"),
      subtitle_sum: t("gm1_01.canvas.subtitle_sum"),
      subtitle_product: t("gm1_01.canvas.subtitle_product"),
      subtitle_quotient: t("gm1_01.canvas.subtitle_quotient"),
      subtitle_chain: t("gm1_01.canvas.subtitle_chain"),
      x_label: t("gm1_01.canvas.x_label"),
      y_label: t("gm1_01.canvas.y_label"),
      slope_label: t("gm1_01.canvas.slope_label"),
      your_slope: t("gm1_01.canvas.your_slope"),
      correct_slope: t("gm1_01.canvas.correct_slope"),
      status_chamber: t("gm1_01.canvas.status_chamber"),
      status_sim: t("gm1_01.canvas.status_sim"),
      status_mode: t("gm1_01.canvas.status_mode"),
    },
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
    } = useQuestManager<G101Quest, Stage>({
    moduleCode: "gm1-01",
    buildPool: (d, s) => buildStagePool(gm1_01_t, d, s),
    initialStage: "POWER_RULE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm1-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={gm1_01_t.title}
      moduleCode="GM1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "POWER_RULE", label: gm1_01_t.stages.power_rule },
        { id: "FACTOR_RULE", label: gm1_01_t.stages.factor_rule },
        { id: "SUM_RULE", label: gm1_01_t.stages.sum_rule },
        { id: "PRODUCT_RULE", label: gm1_01_t.stages.product_rule },
        { id: "QUOTIENT_RULE", label: gm1_01_t.stages.quotient_rule },
        { id: "CHAIN_RULE", label: gm1_01_t.stages.chain_rule },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={gm1_01_t.footer_left}
      translations={{
        back: gm1_01_t.back,
        check: gm1_01_t.check,
        next: gm1_01_t.next,
        correct: gm1_01_t.correct,
        incorrect: gm1_01_t.incorrect,
        ready: gm1_01_t.ready,
        monitor_title: gm1_01_t.monitor_title,
        difficulty: {
          basic: gm1_01_t.difficulty.basic,
          core: gm1_01_t.difficulty.core,
          advanced: gm1_01_t.difficulty.advanced,
          elite: gm1_01_t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <DerivativeCanvas
            functionType={currentQuest?.functionType || "power"}
            xPosition={currentQuest?.xPosition || 2}
            derivative={parseFloat(inputs.derivative || "0")}
            translations={{
              title: gm1_01_t.canvas.title,
              subtitle: stage === "POWER_RULE" ? gm1_01_t.canvas.subtitle_power :
                       stage === "FACTOR_RULE" ? gm1_01_t.canvas.subtitle_factor :
                       stage === "SUM_RULE" ? gm1_01_t.canvas.subtitle_sum :
                       stage === "PRODUCT_RULE" ? gm1_01_t.canvas.subtitle_product :
                       stage === "QUOTIENT_RULE" ? gm1_01_t.canvas.subtitle_quotient :
                       gm1_01_t.canvas.subtitle_chain,
              xLabel: gm1_01_t.canvas.x_label,
              yLabel: gm1_01_t.canvas.y_label,
              slopeLabel: gm1_01_t.canvas.slope_label,
              yourSlope: gm1_01_t.canvas.your_slope,
              correctSlope: gm1_01_t.canvas.correct_slope,
              status_chamber: gm1_01_t.canvas.status_chamber,
              status_sim: gm1_01_t.canvas.status_sim,
              status_mode: gm1_01_t.canvas.status_mode,
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{gm1_01_t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{gm1_01_t.labels.hints}</div>
            <div className="text-white font-black text-lg">
              <InlineMath math={gm1_01_t.formulas[stage.toLowerCase() as keyof typeof gm1_01_t.formulas]} />
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
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{gm1_01_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{gm1_01_t.mission.description}</p>
        </div>
        
        {/* Scenario Description */}
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {stage === "POWER_RULE" && gm1_01_t.scenarios.power_rule}
            {stage === "FACTOR_RULE" && gm1_01_t.scenarios.factor_rule}
            {stage === "SUM_RULE" && gm1_01_t.scenarios.sum_rule}
            {stage === "PRODUCT_RULE" && gm1_01_t.scenarios.product_rule}
            {stage === "QUOTIENT_RULE" && gm1_01_t.scenarios.quotient_rule}
            {stage === "CHAIN_RULE" && gm1_01_t.scenarios.chain_rule}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{gm1_01_t.objective_title}</h3>
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
            {currentLanguage === 'DE'
              ? gm1_01_t.input_tip_2dp
              : currentLanguage === 'CN'
                ? "提示：保留 2 位小数。"
                : "Tip: Enter result rounded to 2 decimal places."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
