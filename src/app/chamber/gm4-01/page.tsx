"use client";

import { useLanguage, TranslationKeys } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import ComplexVisualization from "@/components/chamber/gm4-01/ComplexVisualization";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import {
  Stage,
  G401Quest,
  generateBasicsQuests,
  generateOperationsQuests,
  generatePolarQuests,
} from "@/lib/gm4-01/quests";


import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";



function buildStagePool(
  t: TranslationKeys['gm4_01'],
  difficulty: Difficulty,
  stage: Stage
): G401Quest[] {
  if (stage === "BASICS") return generateBasicsQuests(t, difficulty);
  if (stage === "OPERATIONS") return generateOperationsQuests(t, difficulty);
  if (stage === "POLAR") return generatePolarQuests(t, difficulty);
  return [];
}

export default function GM401Page() {
  const { t: getT, currentLanguage } = useLanguage();
  const gm4_01_t = getT("gm4_01");

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
    } = useQuestManager<G401Quest, Stage>({
    moduleCode: "gm4-01",
    buildPool: (d, s) => buildStagePool(gm4_01_t, d, s),
    initialStage: "BASICS",
  });

  const currentScenario =
    stage === "BASICS"
      ? gm4_01_t.scenarios.basics
      : stage === "OPERATIONS"
        ? gm4_01_t.scenarios.operations
        : gm4_01_t.scenarios.polar;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={gm4_01_t.title}
      moduleCode="GM4.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "BASICS", label: gm4_01_t.stages.basics },
        { id: "OPERATIONS", label: gm4_01_t.stages.operations },
        { id: "POLAR", label: gm4_01_t.stages.polar },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={gm4_01_t.footer_left}
      translations={{
        back: gm4_01_t.back,
        check: gm4_01_t.check,
        next: gm4_01_t.next,
        correct: gm4_01_t.correct,
        incorrect: gm4_01_t.incorrect,
        ready: gm4_01_t.ready,
        monitor_title: gm4_01_t.monitor_title,
        difficulty: {
          basic: gm4_01_t.difficulty.basic,
          core: gm4_01_t.difficulty.core,
          advanced: gm4_01_t.difficulty.advanced,
          elite: gm4_01_t.difficulty.elite,
        },
      }}
      monitorContent={
        <ComplexVisualization
          quest={currentQuest}
          checkStatus={lastCheck?.ok ? "correct" : lastCheck ? "incorrect" : null}
          language={currentLanguage}
        />
      }
    >
      {currentQuest && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
              {gm4_01_t.scenario_title}
            </div>
            <p className="text-sm text-white/80 font-mono max-w-2xl mx-auto leading-relaxed">
              {renderMixedText(currentScenario, "whitespace-pre-wrap")}
            </p>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-black">
                {renderMixedText(currentQuest?.promptLatex || "")}
              </div>
              <div className="text-3xl text-white font-black">
                <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
              </div>
              <div className="text-sm text-white/60 font-mono">
                <InlineMath math={currentQuest?.targetLatex || ""} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              {currentQuest?.slots.map((slot) => (
                <div key={slot.id} className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                    <InlineMath math={slot.labelLatex} />
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, [slot.id]: e.target.value })
                    }
                    placeholder={slot.placeholder}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white font-mono text-lg focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ChamberLayout>
  );
}
