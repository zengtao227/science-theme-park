"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
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
  const questKeys = ["atoms_per_cell", "coord_num", "pack_eff", "void_id"];

  let indices: number[] = [];
  if (difficulty === "BASIC") indices = [0, 1];
  else if (difficulty === "CORE") indices = [1, 2];
  else if (difficulty === "ADVANCED") indices = [2, 3];
  else indices = [0, 1, 2, 3];

  return indices.map((idx) => {
    const key = questKeys[idx];
    const prompt = t.prompts[key];

    const config: CrystalQuest["simConfig"] = {
      latticeType: stage,
      showVoids: key === "void_id"
    };

    let expected: string | number = "1";
    if (idx === 0) { // atoms_per_cell
      expected = stage === "SC" ? 1 : stage === "BCC" ? 2 : 4;
    } else if (idx === 1) { // coord_num
      expected = stage === "SC" ? 6 : stage === "BCC" ? 8 : 12;
    } else if (idx === 2) { // pack_eff
      expected = stage === "SC" ? 52 : stage === "BCC" ? 68 : 74;
    } else if (idx === 3) { // void_id
      expected = stage === "FCC" ? "8" : "1";
    }

    return {
      id: `${stage}|${difficulty}|${key}`,
      difficulty,
      stage,
      promptLatex: `\\text{${prompt}}`,
      expressionLatex: "",
      targetLatex: "\\text{Conclusion}",
      slots: [{ id: "ans", labelLatex: "Answer", placeholder: "Result", expected }],
      correctLatex: expected.toString(),
      simConfig: config
    };
  });
}

export default function GC302Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].gc3_02 || translations.EN.gc3_02;

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
  } = useQuestManager<CrystalQuest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "SC",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gc3-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const activeScenario = useMemo(() => {
    if (!t?.scenarios) return null;
    if (stage === "SC") return t.scenarios.crystallography_center;
    if (stage === "BCC") return t.scenarios.solid_state_research;
    return t.scenarios.drug_polymorphism;
  }, [stage, t]);

  const stages = [
    { id: "SC", label: t?.stages?.sc || "SIMPLE CUBIC" },
    { id: "BCC", label: t?.stages?.bcc || "BODY-CENTERED" },
    { id: "FCC", label: t?.stages?.fcc || "FACE-CENTERED" },
  ];

  const config = currentQuest?.simConfig || {
    latticeType: stage,
    showVoids: false
  };

  return (
    <ChamberLayout
      title={t?.title || "GC3.02 // CRYSTAL PALACE"}
      moduleCode="GC3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t?.footer_left || "GC3.02_CRYSTAL_PALACE // NODE: BASEL"}
      translations={t}
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
              {t?.labels?.lattice_type || "LATTICE TYPE"}
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
            {t?.monitor_title || "CRYSTALLOGRAPHIC ANALYSIS"}
          </h3>
          <div className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </div>
        </div>

        <div className="p-6 bg-black/40 border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6 backdrop-blur-md">
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black text-center">
              {t?.labels?.input_answer || "Enter Value"}
            </div>
            <input
              value={inputs["ans"] || ""}
              onChange={(e) => setInputs({ ans: e.target.value })}
              className="w-full bg-black/50 border-2 border-neon-purple p-4 text-center outline-none focus:border-white placeholder:text-white/20 font-black text-2xl text-white transition-all shadow-[0_0_30px_rgba(255,0,255,0.05)]"
              placeholder="..."
            />
          </div>

          <div className="p-4 bg-white/[0.03] border border-white/10 rounded-3xl relative">
            <div className="text-[10px] text-white/40 uppercase font-black mb-4 tracking-widest text-center">{t.labels.formulas}</div>
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
