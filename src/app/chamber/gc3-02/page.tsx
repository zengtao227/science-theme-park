"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import { motion, AnimatePresence } from "framer-motion";

const CrystalCanvas = dynamic(() => import("@/components/chamber/gc3-02/CrystalCanvas"), {
  ssr: false,
});

type Stage = "SC" | "BCC" | "FCC";

interface CrystalQuest extends Quest {
  stage: Stage;
  simConfig: {
    latticeType: "SC" | "BCC" | "FCC";
    showVoids: boolean;
    slicePosition?: number;
  };
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): CrystalQuest[] {
  const quests: CrystalQuest[] = [];

  // Each stage has 5 questions per difficulty (20 total per stage)
  const questData = {
    BASIC: [
      { key: "atoms_per_cell", expected: stage === "SC" ? "1" : stage === "BCC" ? "2" : "4" },
      { key: "coord_num", expected: stage === "SC" ? "6" : stage === "BCC" ? "8" : "12" },
      { key: "pack_eff", expected: stage === "SC" ? "52" : stage === "BCC" ? "68" : "74" },
      { key: "void_type", expected: stage === "FCC" ? "octahedral" : "cubic" },
      { key: "density_calc", expected: stage === "SC" ? "low" : stage === "BCC" ? "medium" : "high" }
    ],
    CORE: [
      { key: "coord_num", expected: stage === "SC" ? "6" : stage === "BCC" ? "8" : "12" },
      { key: "pack_eff", expected: stage === "SC" ? "52" : stage === "BCC" ? "68" : "74" },
      { key: "void_count", expected: stage === "FCC" ? "8" : "1" },
      { key: "lattice_param", expected: stage === "SC" ? "2r" : stage === "BCC" ? "4r/√3" : "4r/√2" },
      { key: "stability", expected: stage === "FCC" ? "high" : stage === "BCC" ? "medium" : "low" }
    ],
    ADVANCED: [
      { key: "pack_eff", expected: stage === "SC" ? "52" : stage === "BCC" ? "68" : "74" },
      { key: "void_id", expected: stage === "FCC" ? "8" : "1" },
      { key: "slip_systems", expected: stage === "FCC" ? "12" : stage === "BCC" ? "48" : "6" },
      { key: "anisotropy", expected: stage === "SC" ? "isotropic" : "anisotropic" },
      { key: "thermal_exp", expected: stage === "FCC" ? "low" : stage === "BCC" ? "medium" : "high" }
    ],
    ELITE: [
      { key: "void_id", expected: stage === "FCC" ? "8" : "1" },
      { key: "miller_indices", expected: stage === "FCC" ? "111" : stage === "BCC" ? "110" : "100" },
      { key: "stacking_fault", expected: stage === "FCC" ? "yes" : "no" },
      { key: "burgers_vector", expected: stage === "FCC" ? "a/2<110>" : stage === "BCC" ? "a/2<111>" : "a<100>" },
      { key: "elastic_modulus", expected: stage === "FCC" ? "high" : stage === "BCC" ? "medium" : "low" }
    ]
  };

  const dataList = questData[difficulty];
  dataList.forEach((data, idx) => {
    const config: CrystalQuest["simConfig"] = {
      latticeType: stage,
      showVoids: data.key.includes("void")
    };

    quests.push({
      id: `${stage}_${difficulty[0]}${idx + 1}`,
      difficulty,
      stage,
      promptLatex: `\\\\text{${t(`gc3_02.prompts.${data.key}`)}}`,
      expressionLatex: "",
      targetLatex: "\\\\text{Result}",
      slots: [{ id: "ans", labelLatex: "Answer", placeholder: "...", expected: data.expected }],
      correctLatex: data.expected,
      simConfig: config
    });
  });

  return quests;
}

export default function GC302Page() {
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
    } = useQuestManager<CrystalQuest, Stage>({
    moduleCode: "gc3-02",
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "SC",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gc3-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeScenario = useMemo(() => {
    if (stage === "SC") return t("gc3_02.scenarios.crystallography_center");
    if (stage === "BCC") return t("gc3_02.scenarios.solid_state_research");
    return t("gc3_02.scenarios.drug_polymorphism");
  }, [stage, t]);

  const stages = [
    { id: "SC", label: t("gc3_02.stages.sc") },
    { id: "BCC", label: t("gc3_02.stages.bcc") },
    { id: "FCC", label: t("gc3_02.stages.fcc") },
  ];

  const config = currentQuest?.simConfig || {
    latticeType: stage,
    showVoids: false
  };

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("gc3_02.title")}
      moduleCode="GC3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("gc3_02.footer_left")}
      translations={{
        back: t("gc3_02.back"),
        check: t("gc3_02.check"),
        next: t("gc3_02.next"),
        correct: t("gc3_02.correct"),
        incorrect: t("gc3_02.incorrect"),
        difficulty: {
          BASIC: t("gc3_02.difficulty.BASIC"),
          CORE: t("gc3_02.difficulty.CORE"),
          ADVANCED: t("gc3_02.difficulty.ADVANCED"),
          ELITE: t("gc3_02.difficulty.ELITE"),
        },
      }}
      monitorContent={
        <div className="flex flex-col h-full gap-4">
          <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
            <CrystalCanvas
              latticeType={config.latticeType}
              showVoids={config.showVoids}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3 font-mono">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t("gc3_02.labels.lattice_type")}
            </div>
            <div className="text-xl text-white font-black text-center">
              {stage === "SC" && "Simple Cubic (SC)"}
              {stage === "BCC" && "Body-Centered (BCC)"}
              {stage === "FCC" && "Face-Centered (FCC)"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg">
              <div className="text-[8px] text-white/40 uppercase font-black mb-1">ATOMS</div>
              <div className="text-lg font-black text-neon-cyan">
                {stage === "SC" ? 1 : stage === "BCC" ? 2 : 4}
              </div>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg">
              <div className="text-[8px] text-white/40 uppercase font-black mb-1">PACKING</div>
              <div className="text-lg font-black text-neon-green">
                {stage === "SC" ? "52%" : stage === "BCC" ? "68%" : "74%"}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-neon-purple uppercase tracking-[0.5em] font-black mb-4 italic">
            {t("gc3_02.monitor_title")}
          </h3>
          <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </div>
        </div>

        <div className="p-6 bg-black/40 border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 backdrop-blur-md">
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black text-center">
              {t("gc3_02.labels.input_answer")}
            </div>
            <input
              value={inputs["ans"] || ""}
              onChange={(e) => setInputs({ ans: e.target.value })}
              className="w-full bg-black/50 border-2 border-neon-purple p-4 text-center outline-none focus:border-white placeholder:text-white/20 font-black text-2xl text-white transition-all shadow-[0_0_30px_rgba(255,0,255,0.05)]"
              placeholder="..."
            />
          </div>

          <div className="p-4 bg-white/[0.03] border border-white/10 rounded-3xl relative">
            <div className="text-[10px] text-white/40 uppercase font-black mb-4 tracking-widest text-center">{t("gc3_02.labels.formulas")}</div>
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <div className="text-white font-mono text-sm opacity-60"><InlineMath math="\text{P.E.} = \frac{V_{atoms}}{V_{cell}} \times 100\%" /></div>
              <div className="text-white font-mono text-sm opacity-60"><InlineMath math="\text{CN} = \text{nearest neighbors}" /></div>
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
