"use client";

import { useEffect, useCallback, useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { InequalityVisualization } from "@/components/chamber/sm2-09/InequalityVisualization";
import { StepBySolver } from "@/components/chamber/sm2-09/StepBySolver";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { SM209Quest, Stage, SolutionStep } from "@/lib/sm2-09-types";
import { baselScenarios } from "@/lib/sm2-09-basel-scenarios";
import {
  inequalityBasicsBasic,
  inequalityBasicsCore,
  inequalityBasicsAdvanced,
  inequalityBasicsElite,
  systemsBasic,
  systemsCore,
  systemsAdvanced,
  systemsElite,
  absoluteValueBasic,
  absoluteValueCore,
  absoluteValueAdvanced,
  absoluteValueElite
} from "@/lib/sm2-09-quests";
import { solveLinearInequality, solveAbsoluteValueInequality } from "@/lib/sm2-09-solvers";

export default function SM209Page() {
  const { completeStage } = useAppStore();
  const { t, currentLanguage } = useLanguage();
  const [showSteps, setShowSteps] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const sm2_09_t = {
    back: t("sm2_09.back"),
    title: t("sm2_09.title"),
    difficulty: {
      basic: t("sm2_09.difficulty.basic"),
      core: t("sm2_09.difficulty.core"),
      advanced: t("sm2_09.difficulty.advanced"),
      elite: t("sm2_09.difficulty.elite"),
    },
    next: t("sm2_09.next"),
    check: t("sm2_09.check"),
    show_steps: t("sm2_09.show_steps"),
    hide_steps: t("sm2_09.hide_steps"),
    correct: t("sm2_09.correct"),
    incorrect: t("sm2_09.incorrect"),
    ready: t("sm2_09.ready"),
    monitor_title: t("sm2_09.monitor_title"),
    footer_left: t("sm2_09.footer_left"),
    scenario_title: t("sm2_09.scenario_title"),
    problem_title: t("sm2_09.problem_title"),
    solution_title: t("sm2_09.solution_title"),
    visualization_title: t("sm2_09.visualization_title"),
    step_solver_title: t("sm2_09.step_solver_title"),
    stages: {
      inequality_basics: t("sm2_09.stages.inequality_basics"),
      systems: t("sm2_09.stages.systems"),
      absolute_value: t("sm2_09.stages.absolute_value"),
    },
    step: t("sm2_09.step"),
    justification: t("sm2_09.justification"),
    final_solution: t("sm2_09.final_solution"),
    number_line: t("sm2_09.number_line"),
    graph: t("sm2_09.graph"),
    solution_set: t("sm2_09.solution_set"),
    enter_solution: t("sm2_09.enter_solution"),
    placeholder_interval: t("sm2_09.placeholder_interval"),
    feedback: {
      correct: t("sm2_09.feedback.correct"),
      incorrect: t("sm2_09.feedback.incorrect"),
      format_error: t("sm2_09.feedback.format_error"),
      empty_input: t("sm2_09.feedback.empty_input"),
    }
  };

  const buildStagePool = useCallback(
    (tObj: typeof sm2_09_t, difficulty: Difficulty, stage: Stage): SM209Quest[] => {
      let rawQuests: Partial<SM209Quest>[] = [];

      // Select quests based on stage and difficulty
      if (stage === "INEQUALITY_BASICS") {
        if (difficulty === "BASIC") rawQuests = inequalityBasicsBasic;
        else if (difficulty === "CORE") rawQuests = inequalityBasicsCore;
        else if (difficulty === "ADVANCED") rawQuests = inequalityBasicsAdvanced;
        else if (difficulty === "ELITE") rawQuests = inequalityBasicsElite;
      } else if (stage === "SYSTEMS") {
        if (difficulty === "BASIC") rawQuests = systemsBasic;
        else if (difficulty === "CORE") rawQuests = systemsCore;
        else if (difficulty === "ADVANCED") rawQuests = systemsAdvanced;
        else if (difficulty === "ELITE") rawQuests = systemsElite;
      } else if (stage === "ABSOLUTE_VALUE") {
        if (difficulty === "BASIC") rawQuests = absoluteValueBasic;
        else if (difficulty === "CORE") rawQuests = absoluteValueCore;
        else if (difficulty === "ADVANCED") rawQuests = absoluteValueAdvanced;
        else if (difficulty === "ELITE") rawQuests = absoluteValueElite;
      }

      // Convert to full SM209Quest objects with LaTeX and steps
      return rawQuests.map((q, index) => {
        const quest: SM209Quest = {
          id: q.id || `${stage}_${difficulty}_${index + 1}`,
          difficulty: difficulty,
          stage: stage,
          inequalityType: q.inequalityType || "LINEAR",
          expression: q.expression || "",
          variable: q.variable || "x",
          coefficients: q.coefficients,
          constants: q.constants,
          systemInequalities: q.systemInequalities,
          absoluteValueExpression: q.absoluteValueExpression,
          promptLatex: `\\\\text{Solve: } ${q.expression}`,
          expressionLatex: q.expression || "",
          targetLatex: q.variable || "x",
          solutionType: q.solutionType || "INTERVAL",
          solutionInterval: q.solutionInterval,
          solutionSet: q.solutionSet,
          steps: q.steps || generateSteps(q),
          slots: q.slots || [
            {
              id: "solution",
              labelLatex: "\\\\text{Solution}",
              placeholder: sm2_09_t.placeholder_interval,
              expected: q.answer || "",
              acceptedFormats: ["interval", "inequality"]
            }
          ],
          correctLatex: q.answer || "",
          answer: q.answer || "",
          baselScenario: q.baselScenario
        };
        return quest;
      });
    },
    [sm2_09_t]
  );

  // Generate solution steps for a quest
  function generateSteps(q: Partial<SM209Quest>): SolutionStep[] {
    if (!q.expression) return [];
    
    try {
      if (q.inequalityType === "ABSOLUTE_VALUE") {
        const result = solveAbsoluteValueInequality(q.expression);
        return result.steps || [];
      } else {
        const result = solveLinearInequality(q.expression);
        return result.steps || [];
      }
    } catch (error) {
      console.error("Error generating steps:", error);
      return [];
    }
  }

  const {
    currentQuest,
    difficulty,
    stage,
    inputs,
    lastCheck,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<SM209Quest, Stage>({
    buildPool: (diff, stg) => buildStagePool(sm2_09_t, diff, stg),
    initialStage: "INEQUALITY_BASICS",
  });

  const [currentStage, setCurrentStage] = useState<Stage>(stage as Stage);

  // Handle stage change
  const handleStageChangeLocal = useCallback(
    (newStage: Stage) => {
      setCurrentStage(newStage);
      handleStageChange(newStage);
      setShowSteps(false);
      setUserInput("");
      setFeedback(null);
    },
    [handleStageChange]
  );

  // Handle difficulty change
  const handleDifficultyChangeLocal = useCallback(
    (newDifficulty: Difficulty) => {
      handleDifficultyChange(newDifficulty);
      setShowSteps(false);
      setUserInput("");
      setFeedback(null);
    },
    [handleDifficultyChange]
  );

  // Handle answer verification
  const handleVerify = useCallback(() => {
    if (!userInput.trim()) {
      setFeedback(sm2_09_t.feedback.empty_input);
      return;
    }

    if (!currentQuest) return;

    // Simple string comparison for now
    const normalizeAnswer = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '').replace(/infinity/g, '∞');
    const isCorrect = normalizeAnswer(userInput) === normalizeAnswer(currentQuest.answer);
    
    if (isCorrect) {
      setFeedback(sm2_09_t.feedback.correct);
      // Update inputs for the hook's verify function
      setInputs({ solution: userInput });
      verify();
    } else {
      setFeedback(sm2_09_t.feedback.incorrect);
    }
  }, [userInput, currentQuest, sm2_09_t, setInputs, verify]);

  // Handle next quest
  const handleNext = useCallback(() => {
    next();
    setUserInput("");
    setFeedback(null);
    setShowSteps(false);
  }, [next]);

  // Toggle step-by-step solver
  const toggleSteps = useCallback(() => {
    setShowSteps(prev => !prev);
  }, []);

  // Get Basel scenario text
  const getBaselScenarioText = useCallback(() => {
    if (!currentQuest?.baselScenario) return null;
    
    const scenario = baselScenarios[currentQuest.baselScenario];
    if (!scenario) return null;

    if (currentLanguage === "CN") return scenario.cn;
    if (currentLanguage === "DE") return scenario.de;
    return scenario.en;
  }, [currentQuest, currentLanguage]);

  useEffect(() => {
    completeStage("sm2-09", currentStage);
  }, [completeStage, currentStage]);

  if (!currentQuest) {
    return (
      <ChamberLayout
        title={sm2_09_t.title}
        moduleCode="SM2.09"
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChangeLocal}
        stages={[
          { id: "INEQUALITY_BASICS", label: sm2_09_t.stages.inequality_basics },
          { id: "SYSTEMS", label: sm2_09_t.stages.systems },
          { id: "ABSOLUTE_VALUE", label: sm2_09_t.stages.absolute_value },
        ]}
        currentStage={currentStage}
        onStageChange={(s) => handleStageChangeLocal(s as Stage)}
        checkStatus={lastCheck}
        onVerify={handleVerify}
        onNext={handleNext}
        footerLeft={sm2_09_t.footer_left}
        translations={{
          back: sm2_09_t.back,
          check: sm2_09_t.check,
          next: sm2_09_t.next,
          correct: sm2_09_t.correct,
          incorrect: sm2_09_t.incorrect,
          ready: sm2_09_t.ready,
          difficulty: sm2_09_t.difficulty,
        }}
      >
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Loading quests...
          </p>
        </div>
      </ChamberLayout>
    );
  }

  const baselScenarioText = getBaselScenarioText();

  return (
    <ChamberLayout
      title={sm2_09_t.title}
      moduleCode="SM2.09"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChangeLocal}
      stages={[
        { id: "INEQUALITY_BASICS", label: sm2_09_t.stages.inequality_basics },
        { id: "SYSTEMS", label: sm2_09_t.stages.systems },
        { id: "ABSOLUTE_VALUE", label: sm2_09_t.stages.absolute_value },
      ]}
      currentStage={currentStage}
      onStageChange={(s) => handleStageChangeLocal(s as Stage)}
      footerLeft={sm2_09_t.footer_left}
      translations={{
        back: sm2_09_t.back,
        check: sm2_09_t.check,
        next: sm2_09_t.next,
        correct: sm2_09_t.correct,
        incorrect: sm2_09_t.incorrect,
        ready: sm2_09_t.ready,
        difficulty: sm2_09_t.difficulty,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Quest Content */}
          <div className="space-y-6">
            {/* Basel Scenario */}
            {baselScenarioText && (
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-2 border-amber-300 dark:border-amber-700">
                <h3 className="text-lg font-bold mb-3 text-amber-900 dark:text-amber-300">
                  {sm2_09_t.scenario_title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {baselScenarioText}
                </p>
              </div>
            )}

            {/* Problem */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                {sm2_09_t.problem_title}
              </h3>
              <div className="mb-4">
                <BlockMath math={currentQuest.expressionLatex} />
              </div>

              {/* Input Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {sm2_09_t.enter_solution}
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={sm2_09_t.placeholder_interval}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleVerify();
                  }}
                />
              </div>

              {/* Feedback */}
              {feedback && (
                <div
                  className={`p-3 rounded mb-4 ${
                    feedback === sm2_09_t.feedback.correct
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                  }`}
                >
                  {feedback}
                </div>
              )}

              {/* Show Steps Button */}
              <div className="mt-4">
                <button
                  onClick={toggleSteps}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono transition-colors"
                >
                  {showSteps ? sm2_09_t.hide_steps : sm2_09_t.show_steps}
                </button>
              </div>
            </div>

            {/* Step-by-Step Solver */}
            <StepBySolver
              quest={currentQuest}
              visible={showSteps}
              translations={{
                step: sm2_09_t.step,
                justification: sm2_09_t.justification,
                final_solution: sm2_09_t.final_solution,
              }}
            />
          </div>

          {/* Right Panel - Visualization */}
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                {sm2_09_t.visualization_title}
              </h3>
              <InequalityVisualization
                quest={currentQuest}
                stage={currentStage}
                translations={{
                  number_line: sm2_09_t.number_line,
                  graph: sm2_09_t.graph,
                  solution_set: sm2_09_t.solution_set,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
