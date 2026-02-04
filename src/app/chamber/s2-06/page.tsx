"use client";

import { useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";

type Stage = "SUBSTITUTION" | "ELIMINATION" | "MISSION";
type Mg10T = typeof translations.EN.s2_06;

interface S206Quest extends Quest {
  stage: Stage;
}

function buildStagePool(t: Mg10T, difficulty: Difficulty, stage: Stage): S206Quest[] {
  // Simplified data for normalization
  return [
    {
      id: "S1", difficulty, stage: "SUBSTITUTION",
      promptLatex: t.stages.substitution_prompt_latex,
      expressionLatex: `x = 2y, \\; x + y = 6`,
      targetLatex: `x, y`,
      slots: [
        { id: "x", labelLatex: "x", placeholder: "x", expected: 4 },
        { id: "y", labelLatex: "y", placeholder: "y", expected: 2 }
      ],
      correctLatex: `x=4, y=2`,
    }
  ];
}

export default function S206Page() {
  const { currentLanguage } = useAppStore();
  const t = (translations as any)[currentLanguage].s2_06;

  const {
    difficulty, stage, inputs, lastCheck, currentQuest,
    setInputs, verify, next, handleDifficultyChange, handleStageChange,
  } = useQuestManager<S206Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "SUBSTITUTION",
  });

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="S2.06"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "SUBSTITUTION", label: t.stages.substitution },
        { id: "ELIMINATION", label: t.stages.elimination },
        { id: "MISSION", label: t.stages.mission },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: t.back, check: t.check, next: t.next, correct: t.correct, incorrect: t.incorrect,
        ready: "READY", monitor_title: t.monitor_title,
        difficulty: { basic: t.difficulty.basic, core: t.difficulty.core, advanced: t.difficulty.advanced, elite: t.difficulty.elite },
      }}
      monitorContent={
        <div className="space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="text-white font-black text-xl">
            <InlineMath math={currentQuest?.expressionLatex || ""} />
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-2xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <input
                  value={inputs[slot.id] ?? ""}
                  onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                  className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
