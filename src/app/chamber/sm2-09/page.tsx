"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { InequalityVisualization } from "@/components/chamber/sm2-09/InequalityVisualization";
import { StepBySolver } from "@/components/chamber/sm2-09/StepBySolver";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { SM209Quest, Stage, SolutionStep } from "@/lib/sm2-09-types";
import { renderMixedText } from "@/lib/latex-utils";
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

const PRINT_STAGE_ORDER: Stage[] = ["INEQUALITY_BASICS", "SYSTEMS", "ABSOLUTE_VALUE"];
const PRINT_DIFFICULTY_ORDER: Difficulty[] = ["BASIC", "CORE", "ADVANCED", "ELITE"];

function normalizeExpressionSpacing(expression: string): string {
  return expression.replace(/\s+/g, " ").trim();
}

function formatExpressionForPrompt(expression: string, andConnector: string): string {
  return normalizeExpressionSpacing(
    expression.replace(/\s*AND\s*/gi, ` ${andConnector} `)
  );
}

function formatExpressionForLatex(expression: string): string {
  return normalizeExpressionSpacing(
    expression.replace(/\s*AND\s*/gi, " \\land ")
  );
}

function PrintableSM209Section({
  moduleTitle,
  stageLabel,
  groups,
  answerLabel,
}: {
  moduleTitle: string;
  stageLabel: string;
  groups: { difficultyLabel: string; quests: SM209Quest[] }[];
  answerLabel: string;
}) {
  return (
    <article className="text-black bg-white px-8 py-6 space-y-6">
      <header className="border-b-2 border-black pb-3">
        <h2 className="text-2xl font-black tracking-wide">{moduleTitle}</h2>
        <p className="text-sm font-semibold mt-1">{stageLabel}</p>
      </header>

      {groups.map((group) => (
        <section key={group.difficultyLabel} className="space-y-4">
          <h3 className="text-lg font-black border-l-4 border-black pl-3">{group.difficultyLabel}</h3>
          <div className="space-y-5">
            {group.quests.map((quest, index) => (
              <div key={quest.id} className="border border-black/30 p-4 space-y-3">
                <div className="text-sm font-bold">
                  {index + 1}. {renderMixedText(quest.promptLatex)}
                </div>
                <div className="text-black">
                  <BlockMath math={quest.expressionLatex} />
                </div>
                <div className="pt-2">
                  <div className="text-xs font-semibold mb-2">{answerLabel}</div>
                  <div className="h-7 border-b border-black" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}

export default function SM209Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
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
    monitor_title: t("sm2_09.monitor_title"),
    scenario_title: t("sm2_09.labels.scenario_title"),
    problem_title: t("sm2_09.labels.problem_title"),
    solution_title: t("sm2_09.labels.solution_title"),
    visualization_title: t("sm2_09.labels.visualization_title"),
    step_solver_title: t("sm2_09.labels.step_solver_title"),
    stages: {
      inequality_basics: t("sm2_09.stages.inequality_basics"),
      systems: t("sm2_09.stages.systems"),
      absolute_value: t("sm2_09.stages.absolute_value"),
    },
    basel_scenarios: {
      tram_context: t("sm2_09.basel_scenarios.tram_context"),
      roche_context: t("sm2_09.basel_scenarios.roche_context"),
      marathon_context: t("sm2_09.basel_scenarios.marathon_context"),
      university_context: t("sm2_09.basel_scenarios.university_context"),
    },
    step: t("sm2_09.labels.step"),
    justification: t("sm2_09.labels.justification"),
    final_solution: t("sm2_09.labels.final_solution"),
    number_line: t("sm2_09.labels.number_line"),
    graph: t("sm2_09.labels.graph"),
    solution_set: t("sm2_09.labels.solution_set"),
    inequality: t("sm2_09.labels.inequality"),
    system_of_inequalities: t("sm2_09.labels.system_of_inequalities"),
    absolute_value_expression: t("sm2_09.labels.absolute_value_expression"),
    inner_expression: t("sm2_09.labels.inner_expression"),
    solution_label: t("sm2_09.labels.solution"),
    enter_solution: t("sm2_09.labels.enter_solution"),
    placeholder_interval: t("sm2_09.labels.placeholder_interval"),
    and_connector: t("sm2_09.labels.and_connector"),
    feedback: {
      correct: t("sm2_09.feedback.correct"),
      incorrect: t("sm2_09.feedback.incorrect"),
      format_error: t("sm2_09.feedback.invalid_format"),
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
        const rawExpression = q.expression || "";
        const displayExpression = formatExpressionForPrompt(rawExpression, sm2_09_t.and_connector);
        const expressionLatex = formatExpressionForLatex(rawExpression);
        const inequalityType = q.inequalityType;
        const variable = q.variable;
        const solutionType = q.solutionType;

        if (!inequalityType || !variable || !solutionType) {
          throw new Error(`SM2.09 quest is missing structural fields: ${q.id ?? `${stage}_${difficulty}_${index + 1}`}`);
        }

        const quest: SM209Quest = {
          id: q.id || `${stage}_${difficulty}_${index + 1}`,
          difficulty: difficulty,
          stage: stage,
          inequalityType,
          expression: rawExpression,
          variable,
          coefficients: q.coefficients,
          constants: q.constants,
          systemInequalities: q.systemInequalities,
          absoluteValueExpression: q.absoluteValueExpression,
          promptLatex: t("sm2_09.prompts.solve_expression", { expression: displayExpression }),
          expressionLatex: expressionLatex,
          targetLatex: variable,
          solutionType,
          solutionInterval: q.solutionInterval,
          solutionSet: q.solutionSet,
          steps: q.steps || generateSteps(q),
          slots: q.slots || [
            {
              id: "solution",
              labelLatex: `\\text{${sm2_09_t.solution_label}}`,
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
    [sm2_09_t.solution_label, sm2_09_t.placeholder_interval, sm2_09_t.and_connector, t]
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
    lastCheck,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SM209Quest, Stage>({
    moduleCode: "sm2-09",
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
    const isCorrect = normalizeAnswer(userInput) === normalizeAnswer(currentQuest?.answer);
    
    if (isCorrect) {
      setFeedback(sm2_09_t.feedback.correct);
      // Update inputs for the hook's verify function
      setInputs({ solution: userInput });
      verify();
    } else {
      setFeedback(sm2_09_t.feedback.incorrect);
    }
  }, [userInput, currentQuest, setInputs, verify, sm2_09_t.feedback.empty_input, sm2_09_t.feedback.correct, sm2_09_t.feedback.incorrect]);

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

    switch (currentQuest.baselScenario) {
      case "tram_ticket":
        return sm2_09_t.basel_scenarios.tram_context;
      case "roche_dosage":
        return sm2_09_t.basel_scenarios.roche_context;
      case "basel_marathon":
        return sm2_09_t.basel_scenarios.marathon_context;
      case "university_basel":
        return sm2_09_t.basel_scenarios.university_context;
      default:
        return null;
    }
  }, [currentQuest, sm2_09_t.basel_scenarios]);

  const printableSections = useMemo(() => {
    const stageLabels: Record<Stage, string> = {
      INEQUALITY_BASICS: sm2_09_t.stages.inequality_basics,
      SYSTEMS: sm2_09_t.stages.systems,
      ABSOLUTE_VALUE: sm2_09_t.stages.absolute_value,
    };

    return PRINT_STAGE_ORDER.map((stageId) => {
      const groups = PRINT_DIFFICULTY_ORDER
        .map((diff) => {
          const key = diff.toLowerCase() as keyof typeof sm2_09_t.difficulty;
          return {
            difficultyLabel: sm2_09_t.difficulty[key],
            quests: buildStagePool(sm2_09_t, diff, stageId),
          };
        })
        .filter((group) => group.quests.length > 0);

      return {
        id: stageId,
        label: stageLabels[stageId],
        content: (
          <PrintableSM209Section
            moduleTitle={sm2_09_t.title}
            stageLabel={stageLabels[stageId]}
            groups={groups}
            answerLabel={sm2_09_t.solution_title}
          />
        ),
      };
    });
  }, [buildStagePool, sm2_09_t]);

  useEffect(() => {
    completeStage("sm2-09", currentStage);
  }, [completeStage, currentStage]);

  if (!currentQuest) {
    return (
      <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sm2_09_t.title}
        moduleCode="SM2.09"
        defaultLeftWidth={64}
        minLeftWidth={35}
        maxLeftWidth={85}
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
        translations={{
          back: sm2_09_t.back,
          check: sm2_09_t.check,
          next: sm2_09_t.next,
          correct: sm2_09_t.correct,
          incorrect: sm2_09_t.incorrect,
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
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sm2_09_t.title}
      moduleCode="SM2.09"
      defaultLeftWidth={64}
      minLeftWidth={35}
      maxLeftWidth={85}
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChangeLocal}
      stages={[
        { id: "INEQUALITY_BASICS", label: sm2_09_t.stages.inequality_basics },
        { id: "SYSTEMS", label: sm2_09_t.stages.systems },
        { id: "ABSOLUTE_VALUE", label: sm2_09_t.stages.absolute_value },
      ]}
      currentStage={currentStage}
      onStageChange={(s) => handleStageChangeLocal(s as Stage)}
      printSections={printableSections}
      translations={{
        back: sm2_09_t.back,
        check: sm2_09_t.check,
        next: sm2_09_t.next,
        correct: sm2_09_t.correct,
        incorrect: sm2_09_t.incorrect,
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
                  {renderMixedText(baselScenarioText, "whitespace-pre-wrap")}
                </p>
              </div>
            )}

            {/* Problem */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                {sm2_09_t.problem_title}
              </h3>
              {currentQuest?.promptLatex && (
                <div className="mb-4 text-gray-900 dark:text-gray-100">
                  {renderMixedText(currentQuest.promptLatex)}
                </div>
              )}
              <div className="mb-4">
                <BlockMath math={currentQuest?.expressionLatex || ""} />
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
                  inequality: sm2_09_t.inequality,
                  system_of_inequalities: sm2_09_t.system_of_inequalities,
                  absolute_value_expression: sm2_09_t.absolute_value_expression,
                  inner_expression: sm2_09_t.inner_expression,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
