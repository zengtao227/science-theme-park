"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { GB202Quest, Stage } from "@/lib/gb2-02-types";
import { buildStagePool } from "@/lib/gb2-02-quest-builder";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function GB202Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  // Load translations
  const gb2_02_t = {
    title: t("gb2_02.title") || "GB2.02 // ENDOCRINE SYSTEM",
    check: t("gb2_02.check") || "Verify",
    next: t("gb2_02.next") || "Next Quest",
    correct: t("gb2_02.correct") || "Correct",
    incorrect: t("gb2_02.incorrect") || "Incorrect",
    hormone_identification: t("gb2_02.stages.hormone_identification") || "HORMONE IDENTIFICATION",
    feedback_mechanisms: t("gb2_02.stages.feedback_mechanisms") || "FEEDBACK MECHANISMS",
    clinical_applications: t("gb2_02.stages.clinical_applications") || "CLINICAL APPLICATIONS",
    basic: t("gb2_02.difficulty.basic") || "BASIC",
    core: t("gb2_02.difficulty.core") || "CORE",
    advanced: t("gb2_02.difficulty.advanced") || "ADVANCED",
    elite: t("gb2_02.difficulty.elite") || "ELITE",
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
    } = useQuestManager<GB202Quest, Stage>({
    moduleCode: "gb2-02",
    buildPool: (d, s) => buildStagePool(gb2_02_t, d, s),
    initialStage: "HORMONE_IDENTIFICATION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gb2-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  // Get scenario content based on stage
  const getScenarioContent = () => {
    if (currentQuest?.baselContext) {
      return {
        title: `${stage} - ${difficulty}`,
        description: currentQuest?.baselContext
      };
    }
    
    return {
      title: "Basel Endocrinology Research",
      description: "Explore the endocrine system through Basel's pharmaceutical and medical research context."
    };
  };

  const scenario = getScenarioContent();

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={gb2_02_t.title}
      moduleCode="GB2.02"
      difficulty={difficulty}
      currentStage={stage}
      stages={[
        { id: "HORMONE_IDENTIFICATION", label: gb2_02_t.hormone_identification },
        { id: "FEEDBACK_MECHANISMS", label: gb2_02_t.feedback_mechanisms },
        { id: "CLINICAL_APPLICATIONS", label: gb2_02_t.clinical_applications },
      ]}
      onDifficultyChange={handleDifficultyChange}
      onStageChange={(s) => handleStageChange(s as Stage)}
      translations={{
        back: "Back to Nexus",
        check: gb2_02_t.check,
        next: gb2_02_t.next,
        correct: gb2_02_t.correct,
        incorrect: gb2_02_t.incorrect,
        difficulty: {
          BASIC: gb2_02_t.basic,
          CORE: gb2_02_t.core,
          ADVANCED: gb2_02_t.advanced,
          ELITE: gb2_02_t.elite
        }
      }}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={next}
    >
      {/* Scenario Description */}
      <div className="mb-6 bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
        <div className="text-cyan-400 font-mono text-sm mb-2">{scenario.title}</div>
        <div className="text-gray-300 text-sm">{scenario.description}</div>
      </div>

      {currentQuest && (
        <div className="space-y-6">
          {/* Quest Prompt */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
            <div className="text-cyan-400 font-mono text-sm mb-2">OBJECTIVE:</div>
            <div className="text-white">
              {currentQuest?.promptLatex}
            </div>
          </div>

          {/* Input Slots */}
          {currentQuest?.slots && currentQuest?.slots.map((slot) => (
            <div key={slot.id} className="space-y-2">
              <label className="text-cyan-400 font-mono text-sm">
                {slot.labelLatex}
              </label>
              
              {slot.type === "select" && slot.options && (
                <select
                  value={inputs[slot.id] || ""}
                  onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select...</option>
                  {slot.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              
              {slot.type === "input" && (
                <input
                  type="text"
                  value={inputs[slot.id] || ""}
                  onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Enter answer..."
                />
              )}
            </div>
          ))}

          {/* Feedback */}
          {lastCheck && (
            <div className={`p-4 rounded-lg border ${
              lastCheck.ok 
                ? "bg-green-900/20 border-green-500/50 text-green-400" 
                : "bg-red-900/20 border-red-500/50 text-red-400"
            }`}>
              <div className="font-mono text-sm">
                {lastCheck.ok ? gb2_02_t.correct : gb2_02_t.incorrect}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={verify}
              disabled={lastCheck?.ok}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-mono py-3 rounded-lg transition-colors"
            >
              {gb2_02_t.check}
            </button>
            
            {lastCheck?.ok && (
              <button
                onClick={next}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono py-3 rounded-lg transition-colors"
              >
                {gb2_02_t.next}
              </button>
            )}
          </div>
        </div>
      )}
    </ChamberLayout>
  );
}
