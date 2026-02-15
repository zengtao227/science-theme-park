"use client";

import { useState, useMemo, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
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
  const questKeys = [
    "shift_dir", "temp_exothermic", "pressure_moles", "catalyst_yield",
    "kc_calculation", "inert_gas", "haber_temp", "endothermic_kc"
  ];

  // Each difficulty gets a unique set of 4-5 problems from the pool
  let indices: number[] = [];
  if (difficulty === "BASIC") indices = [0, 1, 3, 5];
  else if (difficulty === "CORE") indices = [0, 2, 4, 6];
  else if (difficulty === "ADVANCED") indices = [1, 2, 5, 7];
  else indices = [2, 4, 6, 7];

  return indices.map((idx) => {
    const key = questKeys[idx];
    const prompt = t.prompts[key];

    // Default config per stage for visualization
    const baseConfig = { temp: 50, pressure: 50, concA: 50 };
    if (stage === "CONCENTRATION") baseConfig.concA = idx % 2 === 0 ? 80 : 20;
    if (stage === "TEMPERATURE") baseConfig.temp = idx % 2 === 0 ? 80 : 20;
    if (stage === "PRESSURE") baseConfig.pressure = idx % 2 === 0 ? 80 : 20;

    return {
      id: `${stage}|${difficulty}|${key}`,
      difficulty,
      stage,
      promptLatex: `\\text{${prompt}}`,
      expressionLatex: "",
      targetLatex: "\\text{Select Option}",
      slots: [{ id: "ans", labelLatex: "Answer", placeholder: "1 or 2", expected: idx % 2 === 0 ? 1 : 2 }],
      correctLatex: idx % 2 === 0 ? "1" : "2",
      simConfig: baseConfig
    };
  });
}

export default function GC301Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].gc3_01 || translations.EN.gc3_01;

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
  } = useQuestManager<GC301Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "CONCENTRATION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gc3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeScenario = useMemo(() => {
    if (!t?.scenarios) return null;
    if (stage === "CONCENTRATION") return t.scenarios.basel_synthesis;
    if (stage === "TEMPERATURE") return t.scenarios.catalysis_innovation;
    if (stage === "PRESSURE") return t.scenarios.haber_process;
    return t.scenarios.buffer_systems;
  }, [stage, t]);

  const stages = [
    { id: "CONCENTRATION", label: t?.stages?.concentration || "CONCENTRATION" },
    { id: "TEMPERATURE", label: t?.stages?.temperature || "TEMPERATURE" },
    { id: "PRESSURE", label: t?.stages?.pressure || "PRESSURE" },
  ];

  return (
    <ChamberLayout
      title={t?.title || "GC3.01 // EQUILIBRIUM MASTER"}
      moduleCode="GC3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t?.footer_left || "GC3.01_EQUILIBRIUM_MASTER // NODE: BASEL"}
      translations={t}
      monitorContent={
        <div className="space-y-4">
          <EquilibriumCanvas
            temperature={currentQuest?.simConfig.temp ?? 50}
            pressure={currentQuest?.simConfig.pressure ?? 50}
            concentrationA={currentQuest?.simConfig.concA ?? 50}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "CHEMICAL EQUILIBRIUM"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.reaction || "REVERSIBLE REACTION"}
            </div>
            <div className="text-xl text-white font-black text-center">
              <InlineMath math="A + B \rightleftharpoons C + D" />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-neon-cyan font-black mb-1">
              {t?.labels?.conditions || "SIMULATION STATUS"}
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
            {t?.mission?.title || "MISSION: CHEMICAL EQUILIBRIUM"}
          </h3>
          <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
              {t?.labels?.input_answer || "Input Conclusion (1 or 2)"}
            </div>
            <input
              value={inputs["ans"] || ""}
              onChange={(e) => setInputs({ ans: e.target.value })}
              className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
              placeholder="1 / 2"
            />
          </div>

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/90 font-black mb-2">
              {t?.labels?.principle || "LE CHATELIER'S PRINCIPLE"}
            </div>
            <div className="text-xs text-white/60 font-mono space-y-1">
              <div>{t?.labels?.principle_1}</div>
              <div>{t?.labels?.principle_2}</div>
              <div>{t?.labels?.principle_3}</div>
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
