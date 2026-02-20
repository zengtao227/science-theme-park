"use client";

import { useState, useMemo, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EquilibriumCanvas from "@/components/chamber/gc3-01/EquilibriumCanvas";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import { motion, AnimatePresence } from "framer-motion";

type Stage = "CONCENTRATION" | "TEMPERATURE" | "PRESSURE";

interface GC301Quest extends Quest {
  stage: Stage;
  simConfig: {
    temp: number;
    pressure: number;
    concA: number;
  };
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): GC301Quest[] {
  const quests: GC301Quest[] = [];

  // Each stage × difficulty = 5 questions (60 total)
  const questData = {
    BASIC: [
      { key: "shift_right", expected: "right", temp: 50, pressure: 50, concA: 80 },
      { key: "shift_left", expected: "left", temp: 50, pressure: 50, concA: 20 },
      { key: "temp_effect", expected: "increase", temp: 80, pressure: 50, concA: 50 },
      { key: "pressure_effect", expected: "increase", temp: 50, pressure: 80, concA: 50 },
      { key: "catalyst_effect", expected: "no", temp: 50, pressure: 50, concA: 50 }
    ],
    CORE: [
      { key: "kc_value", expected: "2.5", temp: 50, pressure: 50, concA: 60 },
      { key: "temp_exothermic", expected: "left", temp: 80, pressure: 50, concA: 50 },
      { key: "pressure_moles", expected: "right", temp: 50, pressure: 80, concA: 50 },
      { key: "inert_gas", expected: "no", temp: 50, pressure: 50, concA: 50 },
      { key: "conc_change", expected: "right", temp: 50, pressure: 50, concA: 80 }
    ],
    ADVANCED: [
      { key: "kc_calculation", expected: "4.0", temp: 60, pressure: 60, concA: 60 },
      { key: "endothermic_kc", expected: "increase", temp: 80, pressure: 50, concA: 50 },
      { key: "haber_temp", expected: "compromise", temp: 70, pressure: 80, concA: 50 },
      { key: "volume_decrease", expected: "right", temp: 50, pressure: 80, concA: 50 },
      { key: "partial_pressure", expected: "3.2", temp: 50, pressure: 70, concA: 60 }
    ],
    ELITE: [
      { key: "kp_calculation", expected: "1.8", temp: 60, pressure: 70, concA: 60 },
      { key: "gibbs_equilibrium", expected: "zero", temp: 50, pressure: 50, concA: 50 },
      { key: "vant_hoff", expected: "5.2", temp: 80, pressure: 50, concA: 50 },
      { key: "activity_coefficient", expected: "0.85", temp: 60, pressure: 60, concA: 70 },
      { key: "heterogeneous_eq", expected: "independent", temp: 50, pressure: 80, concA: 50 }
    ]
  };

  const dataList = questData[difficulty];
  dataList.forEach((data, idx) => {
    quests.push({
      id: `${stage}_${difficulty[0]}${idx + 1}`,
      difficulty,
      stage,
      promptLatex: `\\\\text{${t(`gc3_01.prompts.${data.key}`)}}`,
      expressionLatex: "",
      targetLatex: `\\\\text{${t("gc3_01.labels.input_answer")}}`,
      slots: [{ id: "ans", labelLatex: `\\\\text{${t("gc3_01.labels.input_answer")}}`, placeholder: t("gc3_01.labels.placeholder"), expected: data.expected }],
      correctLatex: `\\\\text{${data.expected}}`,
      simConfig: { temp: data.temp, pressure: data.pressure, concA: data.concA }
    });
  });

  return quests;
}

export default function GC301Page() {
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
    } = useQuestManager<GC301Quest, Stage>({
    moduleCode: "gc3-01",
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "CONCENTRATION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gc3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeScenario = useMemo(() => {
    if (stage === "CONCENTRATION") return t("gc3_01.scenarios.basel_synthesis");
    if (stage === "TEMPERATURE") return t("gc3_01.scenarios.catalysis_innovation");
    return t("gc3_01.scenarios.haber_process");
  }, [stage, t]);

  const stages = [
    { id: "CONCENTRATION", label: t("gc3_01.stages.concentration") },
    { id: "TEMPERATURE", label: t("gc3_01.stages.temperature") },
    { id: "PRESSURE", label: t("gc3_01.stages.pressure") },
  ];

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("gc3_01.title")}
      moduleCode="GC3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("gc3_01.footer_left")}
      translations={{
        back: t("gc3_01.back"),
        check: t("gc3_01.check"),
        next: t("gc3_01.next"),
        correct: t("gc3_01.correct"),
        incorrect: t("gc3_01.incorrect"),
        difficulty: {
          BASIC: t("gc3_01.difficulty.basic"),
          CORE: t("gc3_01.difficulty.core"),
          ADVANCED: t("gc3_01.difficulty.advanced"),
          ELITE: t("gc3_01.difficulty.elite"),
        },
        ready: t("gc3_01.ready"),
        monitor_title: t("gc3_01.monitor_title"),
      }}
      monitorContent={
        <div className="space-y-4">
          <EquilibriumCanvas
            temperature={currentQuest?.simConfig.temp ?? 50}
            pressure={currentQuest?.simConfig.pressure ?? 50}
            concentrationA={currentQuest?.simConfig.concA ?? 50}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t("gc3_01.target_title")}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t("gc3_01.labels.reaction")}
            </div>
            <div className="text-xl text-white font-black text-center">
              <InlineMath math="A + B \rightleftharpoons C + D" />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-neon-cyan font-black mb-1">
              {t("gc3_01.labels.conditions")}
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
              <div className="text-white/40">T: <span className="text-white">{(currentQuest?.simConfig.temp ?? 50)}%</span></div>
              <div className="text-white/40">P: <span className="text-white">{(currentQuest?.simConfig.pressure ?? 50)}%</span></div>
              <div className="text-white/40">[A]: <span className="text-white">{(currentQuest?.simConfig.concA ?? 50)}%</span></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t("gc3_01.mission.title")}
          </h3>
          <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
              {t("gc3_01.labels.input_answer")}
            </div>
            <input
              value={inputs["ans"] || ""}
              onChange={(e) => setInputs({ ans: e.target.value })}
              className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
              placeholder={t("gc3_01.labels.placeholder")}
            />
          </div>

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/90 font-black mb-2">
              {t("gc3_01.labels.principle")}
            </div>
            <div className="text-xs text-white/60 font-mono space-y-1">
              <div>{t("gc3_01.labels.principle_1")}</div>
              <div>{t("gc3_01.labels.principle_2")}</div>
              <div>{t("gc3_01.labels.principle_3")}</div>
            </div>
          </div>
        </div>

        {activeScenario && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${stage}-${difficulty}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-neon-purple/60 font-black">Regional Case Study // Basel Node</div>
                  <p className="text-sm text-white/50 leading-relaxed italic">
                    {activeScenario}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </ChamberLayout>
  );
}
