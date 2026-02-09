"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AlchemistCanvas, { type SystemsVisual } from "@/components/chamber/sm2-06/AlchemistCanvas";

type Stage = "SUBSTITUTION" | "ELIMINATION" | "MISSION";
type S206T = typeof translations.EN.sm2_06;

interface S206Quest extends Quest {
  stage: Stage;
  visual: SystemsVisual;
}

function buildStagePool(t: S206T, difficulty: Difficulty): S206Quest[] {
  return [
    {
      id: "S1", difficulty, stage: "SUBSTITUTION",
      promptLatex: t.stages.substitution_prompt_latex,
      expressionLatex: `\\begin{cases} x = 2y \\\\ x + y = 6 \\end{cases}`,
      targetLatex: `x, y`,
      visual: {
        eq1: { a: 1, b: -2, c: 0 },
        eq2: { a: 1, b: 1, c: 6 },
        intersect: { x: 4, y: 2 }
      },
      slots: [
        { id: "x", labelLatex: "x", placeholder: "x", expected: 4 },
        { id: "y", labelLatex: "y", placeholder: "y", expected: 2 }
      ],
      correctLatex: `x=4, y=2`,
    },
    {
      id: "S2", difficulty, stage: "SUBSTITUTION",
      promptLatex: t.stages.substitution_prompt_latex,
      expressionLatex: `\\begin{cases} y = 3x - 1 \\\\ x + y = 7 \\end{cases}`,
      targetLatex: `x, y`,
      visual: {
        eq1: { a: 3, b: -1, c: 1 },
        eq2: { a: 1, b: 1, c: 7 },
        intersect: { x: 2, y: 5 }
      },
      slots: [
        { id: "x", labelLatex: "x", placeholder: "x", expected: 2 },
        { id: "y", labelLatex: "y", placeholder: "y", expected: 5 }
      ],
      correctLatex: `x=2, y=5`,
    },
    {
      id: "E1", difficulty, stage: "ELIMINATION",
      promptLatex: t.stages.elimination_prompt_latex,
      expressionLatex: `\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}`,
      targetLatex: `x, y`,
      visual: {
        eq1: { a: 1, b: 1, c: 5 },
        eq2: { a: 1, b: -1, c: 1 },
        intersect: { x: 3, y: 2 }
      },
      slots: [
        { id: "x", labelLatex: "x", placeholder: "x", expected: 3 },
        { id: "y", labelLatex: "y", placeholder: "y", expected: 2 }
      ],
      correctLatex: `x=3, y=2`,
    }
  ];
}

export default function S206Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sm2_06;

  const {
    difficulty, stage, inputs, lastCheck, currentQuest,
    successRate,
    setInputs, verify, next, handleDifficultyChange, handleStageChange,
  } = useQuestManager<S206Quest, Stage>({
    buildPool: (d) => buildStagePool(t, d),
    initialStage: "SUBSTITUTION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm2-06", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM2.06"
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
      successRate={successRate}
      checkStatus={lastCheck}
      translations={{
        back: t.back, check: t.check, next: t.next, correct: t.correct, incorrect: t.incorrect,
        ready: "READY", monitor_title: t.monitor_title,
        difficulty: { basic: t.difficulty.basic, core: t.difficulty.core, advanced: t.difficulty.advanced, elite: t.difficulty.elite },
      }}
      monitorContent={
        <div className="w-full flex justify-center">
          <AlchemistCanvas visual={currentQuest?.visual} inputs={inputs} />
        </div>
      }
    >
      <div className="space-y-12">
        <div className="text-center group">
          <div className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-black mb-4 group-hover:text-neon-cyan transition-colors">
            {t.objective_title}
          </div>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
          <div className="mt-8 p-6 bg-white/[0.03] border border-white/10 rounded-2xl inline-block backdrop-blur-sm">
            <div className="text-4xl text-white font-black">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-6">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/50" />
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                    <InlineMath math={slot.labelLatex} />
                  </div>
                </div>
                <input
                  value={inputs[slot.id] ?? ""}
                  onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                  placeholder={slot.placeholder}
                  className="w-full bg-black/40 border-2 border-white/10 p-5 text-center outline-none focus:border-neon-cyan text-white font-black text-3xl rounded-xl transition-all focus:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Decoder Overlay Effect */}
        <div className="text-center opacity-20 pointer-events-none">
          <div className="text-[8px] font-mono text-white tracking-[0.5em] uppercase">
            Systems_Optimization_Algorithm_Running...
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
