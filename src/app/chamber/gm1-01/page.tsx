"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback, useMemo } from "react";
import { useLanguage, useNamespace } from "@/lib/i18n";
import dynamic from "next/dynamic";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";

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
import { normalizePlainMathNotation, renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createGM101FeedbackProvider } from "@/lib/gm1-01/provider";

const DerivativeCanvas = dynamic(() => import("@/components/chamber/gm1-01/DerivativeCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-white/[0.02] rounded-xl" />,
});

function getFunctionTypeFromStage(stage: Stage): "power" | "factor" | "sum" | "product" | "quotient" | "chain" {
  if (stage === "POWER_RULE") return "power";
  if (stage === "FACTOR_RULE") return "factor";
  if (stage === "SUM_RULE") return "sum";
  if (stage === "PRODUCT_RULE") return "product";
  if (stage === "QUOTIENT_RULE") return "quotient";
  return "chain";
}


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
  const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createGM101FeedbackProvider(t), [t]);
  
  const gm1_01_t = useNamespace("gm1_01");

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(gm1_01_t, d, s), [gm1_01_t]);

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
        chamberLayoutProps,
    } = useQuestManager<G101Quest, Stage>({
    moduleCode: "gm1-01",
    buildPool,
    initialStage: "POWER_RULE",
    feedbackContentProvider,
  });


  const currentScenario =
    stage === "POWER_RULE" ? gm1_01_t.scenarios.power_rule :
    stage === "FACTOR_RULE" ? gm1_01_t.scenarios.factor_rule :
    stage === "SUM_RULE" ? gm1_01_t.scenarios.sum_rule :
    stage === "PRODUCT_RULE" ? gm1_01_t.scenarios.product_rule :
    stage === "QUOTIENT_RULE" ? gm1_01_t.scenarios.quotient_rule :
    gm1_01_t.scenarios.chain_rule;

  const stages = useMemo(() => [
    { id: "POWER_RULE" as Stage, label: gm1_01_t.stages.power_rule },
    { id: "FACTOR_RULE" as Stage, label: gm1_01_t.stages.factor_rule },
    { id: "SUM_RULE" as Stage, label: gm1_01_t.stages.sum_rule },
    { id: "PRODUCT_RULE" as Stage, label: gm1_01_t.stages.product_rule },
    { id: "QUOTIENT_RULE" as Stage, label: gm1_01_t.stages.quotient_rule },
    { id: "CHAIN_RULE" as Stage, label: gm1_01_t.stages.chain_rule },
  ], [gm1_01_t.stages]);

  const printSections = useMemo(() => () => buildQuestPrintSections<G101Quest, Stage>({
    moduleTitle: gm1_01_t.title,
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: gm1_01_t.difficulty.basic,
      CORE: gm1_01_t.difficulty.core,
      ADVANCED: gm1_01_t.difficulty.advanced,
      ELITE: gm1_01_t.difficulty.elite,
    },
    buildPool,
  }), [buildPool, gm1_01_t.difficulty.advanced, gm1_01_t.difficulty.basic, gm1_01_t.difficulty.core, gm1_01_t.difficulty.elite, gm1_01_t.title, stages]);

  return (
    <ChamberLayout
      {...chamberLayoutProps}
      title={gm1_01_t.title}
      moduleCode="GM1.01"
      stages={stages}
      printSectionsBuilder={printSections}
      translations={{
        back: gm1_01_t.back,
        check: gm1_01_t.check,
        next: gm1_01_t.next,
        correct: gm1_01_t.correct,
        incorrect: gm1_01_t.incorrect,
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
            functionType={currentQuest?.functionType ?? getFunctionTypeFromStage(stage)}
            xPosition={currentQuest?.xPosition || 2}
            derivative={parseFloat(inputs.derivative || "0")}
            translations={{
              title: gm1_01_t.canvas.title,
              subtitle: normalizePlainMathNotation(
                stage === "POWER_RULE" ? gm1_01_t.canvas.subtitle_power :
                stage === "FACTOR_RULE" ? gm1_01_t.canvas.subtitle_factor :
                stage === "SUM_RULE" ? gm1_01_t.canvas.subtitle_sum :
                stage === "PRODUCT_RULE" ? gm1_01_t.canvas.subtitle_product :
                stage === "QUOTIENT_RULE" ? gm1_01_t.canvas.subtitle_quotient :
                gm1_01_t.canvas.subtitle_chain
              ),
              xLabel: gm1_01_t.canvas.x_label,
              yLabel: gm1_01_t.canvas.y_label,
              slopeLabel: gm1_01_t.canvas.slope_label,
              yourSlope: gm1_01_t.canvas.your_slope,
              correctSlope: gm1_01_t.canvas.correct_slope,
              correctAngle: gm1_01_t.canvas.correct_angle,
              adjustSlope: gm1_01_t.canvas.adjust_slope,
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
              <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
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
            {renderMixedText(currentScenario, "whitespace-pre-wrap")}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{gm1_01_t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            {renderMixedText(currentQuest?.promptLatex || "")}
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
            {gm1_01_t.input_tip_2dp}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
