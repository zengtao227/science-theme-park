"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LawsCanvas from "@/components/chamber/sp1-02/LawsCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "NEWTON_1" | "NEWTON_2" | "FRICTION";

interface SP302Quest extends Quest {
  stage: Stage;
  mass?: number;
  force?: number;
  acceleration?: number;
  frictionCoeff?: number;
}

type SP302T = typeof translations.EN.sp3_02;

export default function SP302Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = (translations[currentLanguage]?.sp3_02 || translations.EN.sp3_02) as SP302T;

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP302Quest[] => {
    const quests: SP302Quest[] = [];

    if (stage === "NEWTON_1") {
      quests.push(
        {
          id: "N1-1", difficulty, stage,
          promptLatex: `\\text{An object is at rest. Net force = 0. What is its acceleration?}`,
          expressionLatex: `\\sum F = 0 \\Rightarrow a = ?`,
          targetLatex: `a`,
          slots: [{ id: "acc", labelLatex: `a \\text{ (m/s}^2)`, placeholder: "0", expected: 0 }],
          correctLatex: `a = 0 \\text{ m/s}^2`,
          hintLatex: [`\\text{Newton's First Law: No net force, no change in motion}`]
        }
      );
    }

    if (stage === "NEWTON_2") {
      quests.push(
        {
          id: "N2-1", difficulty, stage, mass: 5, force: 20,
          promptLatex: `F = ma. \\text{ If } m = 5 \\text{ kg, } F = 20 \\text{ N, find } a.`,
          expressionLatex: `a = F / m`,
          targetLatex: `a`,
          slots: [{ id: "acc", labelLatex: `a \\text{ (m/s}^2)`, placeholder: "4", expected: 4 }],
          correctLatex: `a = 4 \\text{ m/s}^2`,
          hintLatex: [`a = 20 / 5`]
        }
      );
    }

    if (stage === "FRICTION") {
      quests.push(
        {
          id: "FR-1", difficulty, stage, mass: 10, frictionCoeff: 0.2,
          promptLatex: `f = \\mu N. \\text{ If } m = 10 \\text{ kg (}g=9.8\\text{), } \\mu = 0.2, \\text{ find friction } f.`,
          expressionLatex: `f = 0.2 \\times (10 \\times 9.8)`,
          targetLatex: `f`,
          slots: [{ id: "f", labelLatex: `f \\text{ (N)}`, placeholder: "19.6", expected: 19.6 }],
          correctLatex: `f = 19.6 \\text{ N}`,
          hintLatex: [`\\text{Force = coefficient } \\times \\text{ Normal force (mg)}`]
        }
      );
    }

    return quests;
  }, []);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

  const {
    currentQuest,
    difficulty,
    stage,
    lastCheck,
    inputs,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<SP302Quest, Stage>({
    buildPool,
    initialStage: "NEWTON_1",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp3-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "NEWTON_1" as Stage, label: t.stages.newton_1 },
    { id: "NEWTON_2" as Stage, label: t.stages.newton_2 },
    { id: "FRICTION" as Stage, label: t.stages.friction },
  ], [t.stages]);

  if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SP3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        difficulty: t.difficulty,
      }}
      monitorContent={
        <LawsCanvas
          scenario={stage === "NEWTON_1" ? "acceleration" : (stage === "FRICTION" ? "friction" : "acceleration")}
          mass={currentQuest.mass || 1}
          friction={currentQuest.frictionCoeff || 0}
          forceX={currentQuest.force || 0}
        />
      }
    >
      <div className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
          <div className="text-lg">
            <InlineMath math={currentQuest.promptLatex} />
          </div>
          <div className="text-cyan-300">
            <InlineMath math={currentQuest.expressionLatex} />
          </div>
          <div className="space-y-3">
            {currentQuest.slots.map((slot) => (
              <div key={slot.id} className="flex items-center gap-3">
                <InlineMath math={slot.labelLatex} />
                <input
                  type="text"
                  value={inputs[slot.id] || ""}
                  onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
