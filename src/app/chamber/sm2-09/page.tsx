"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { InequalityVisualization } from "@/components/chamber/sm2-09/InequalityVisualization";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { SM209Quest, Stage, SolutionStep } from "@/lib/sm2-09-types";
import { renderMixedText } from "@/lib/latex-utils";
import { buildQuestPrintSections } from "@/components/print/QuestPrintSections";
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
const CHOICE_LABELS = ["A", "B", "C", "D"] as const;
const REGION_CHOICES = [
  "Intersection region",
  "Triangular region",
  "Bounded region",
  "Unbounded region",
  "V-shaped region",
  "Semicircular region",
  "Polygonal region",
  "Feasible region for optimization",
];

// Convert module-specific SolutionStep to platform-level PlatformSolutionStep
function toPlatformStep(step: SolutionStep): PlatformSolutionStep {
  return {
    stepNumber: step.stepNumber,
    expressionLatex: step.expressionLatex,
    justification: step.justification,
    emphasis: step.reversesInequality ? "warning" : undefined,
  };
}

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

function flipBracket(bracket: string): string {
  if (bracket === "(") return "[";
  if (bracket === "[") return "(";
  if (bracket === ")") return "]";
  return ")";
}

function toggleIntervalInclusivity(answer: string): string {
  return answer.replace(/[()[\]]/g, (char) => flipBracket(char));
}

function shiftFirstNumericToken(answer: string, delta: number): string {
  return answer.replace(/-?\d+(?:\.\d+)?(?!\/)/, (token) => {
    const parsed = Number(token);
    if (!Number.isFinite(parsed)) return token;
    const shifted = parsed + delta;
    return Number.isInteger(shifted) ? String(shifted) : shifted.toFixed(1).replace(/\.0$/, "");
  });
}

function mirrorIntervalAnswer(answer: string): string | null {
  const leftInfinite = answer.match(/^([\(\[])-∞,\s*([^\]\)]+)([\)\]])$/);
  if (leftInfinite) {
    const [, , bound, endBracket] = leftInfinite;
    const startBracket = endBracket === "]" ? "[" : "(";
    return `${startBracket}${bound}, ∞)`;
  }

  const rightInfinite = answer.match(/^([\(\[])([^,]+),\s*∞([\)\]])$/);
  if (rightInfinite) {
    const [, startBracket, bound] = rightInfinite;
    const endBracket = startBracket === "[" ? "]" : ")";
    return `(-∞, ${bound}${endBracket}`;
  }

  const bounded = answer.match(/^([\(\[])([^,]+),\s*([^\]\)]+)([\)\]])$/);
  if (bounded) {
    const [, startBracket, start, end, endBracket] = bounded;
    const leftClose = startBracket === "[" ? ")" : "]";
    const rightOpen = endBracket === "]" ? "(" : "[";
    return `(-∞, ${start}${leftClose} ∪ ${rightOpen}${end}, ∞)`;
  }

  return null;
}

function buildUnionDistractor(answer: string): string | null {
  const unionMatch = answer.match(/^([\(\[])-∞,\s*([^)\]]+)([\)\]])\s*∪\s*([\(\[])([^,\]]+),\s*∞([\)\]])$/);
  if (!unionMatch) return null;

  const [, , leftBound, leftBracket, rightBracket, rightBound] = unionMatch;
  return `${rightBracket === "[" ? "[" : "("}${leftBound}, ${rightBound}${leftBracket === "]" ? "]" : ")"}`;
}

function deterministicRotate<T>(values: T[], seed: string): T[] {
  if (values.length <= 1) return values;
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const offset = hash % values.length;
  return [...values.slice(offset), ...values.slice(0, offset)];
}

function buildAnswerChoices(answer: string, questId: string): string[] {
  const trimmed = answer.trim();

  if (trimmed === "ℝ") {
    return deterministicRotate(["ℝ", "∅", "(-∞, 0)", "[0, ∞)"], questId);
  }

  if (trimmed === "∅") {
    return deterministicRotate(["∅", "ℝ", "(-∞, 0)", "[0, ∞)"], questId);
  }

  if (trimmed === "(a - b, a + b)") {
    return deterministicRotate(
      [
        trimmed,
        "[a - b, a + b]",
        "(-∞, a - b) ∪ (a + b, ∞)",
        "[a + b, ∞)",
      ],
      questId
    );
  }

  if (REGION_CHOICES.includes(trimmed)) {
    return deterministicRotate(
      [trimmed, ...REGION_CHOICES.filter((choice) => choice !== trimmed).slice(0, 3)],
      questId
    );
  }

  const candidates = [
    trimmed,
    toggleIntervalInclusivity(trimmed),
    mirrorIntervalAnswer(trimmed),
    buildUnionDistractor(trimmed),
    shiftFirstNumericToken(trimmed, 1),
    shiftFirstNumericToken(trimmed, -1),
  ].filter((choice): choice is string => Boolean(choice));

  const uniqueChoices = Array.from(new Set(candidates)).slice(0, 4);
  if (uniqueChoices.length < 4) {
    const fallbacks = ["ℝ", "∅", "(-∞, 0)", "[0, ∞)"];
    for (const fallback of fallbacks) {
      if (!uniqueChoices.includes(fallback)) uniqueChoices.push(fallback);
      if (uniqueChoices.length === 4) break;
    }
  }

  return deterministicRotate(uniqueChoices.slice(0, 4), questId);
}

export default function SM209Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  const [selectedChoice, setSelectedChoice] = useState("");
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
    answer_options: t("sm2_09.labels.answer_options"),
    correct_notation: t("sm2_09.labels.correct_notation"),
    and_connector: t("sm2_09.labels.and_connector"),
    feedback: {
      correct: t("sm2_09.feedback.correct"),
      incorrect: t("sm2_09.feedback.incorrect"),
      empty_choice: t("sm2_09.feedback.empty_choice"),
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
              placeholder: q.answer || "",
              expected: q.answer || "",
            }
          ],
          correctLatex: q.answer || "",
          answer: q.answer || "",
          baselScenario: q.baselScenario
        };
        return quest;
      });
    },
    [sm2_09_t.solution_label, sm2_09_t.and_connector, t]
  );

  // Generate solution steps for a quest (used by feedbackContentProvider)
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

  // feedbackContentProvider: derives feedback content from quest WITHOUT mutating it
  const sm209FeedbackProvider = useCallback((quest: SM209Quest) => {
    const steps = quest.steps || generateSteps(quest);
    return {
      steps: steps.map(toPlatformStep),
      fullSolutionLatex: quest.answer || null,
      hasFullSolution: true,
    };
  }, []);

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
      requestAiFeedback,
      feedbackLevel,
      feedbackContent,
      feedbackAvailability,
      showHintLevel,
      showStepsLevel,
      showFullSolution,
      policy,
    } = useQuestManager<SM209Quest, Stage>({
    moduleCode: "sm2-09",
    buildPool: (diff, stg) => buildStagePool(sm2_09_t, diff, stg),
    initialStage: "INEQUALITY_BASICS",
    feedbackContentProvider: sm209FeedbackProvider,
  });

  const [currentStage, setCurrentStage] = useState<Stage>(stage as Stage);

  // Handle stage change
  const handleStageChangeLocal = useCallback(
    (newStage: Stage) => {
      setCurrentStage(newStage);
      handleStageChange(newStage);
      setSelectedChoice("");
      setFeedback(null);
    },
    [handleStageChange]
  );

  // Handle difficulty change
  const handleDifficultyChangeLocal = useCallback(
    (newDifficulty: Difficulty) => {
      handleDifficultyChange(newDifficulty);
      setSelectedChoice("");
      setFeedback(null);
    },
    [handleDifficultyChange]
  );

  const answerChoices = useMemo(
    () => (currentQuest ? buildAnswerChoices(currentQuest.answer, currentQuest.id) : []),
    [currentQuest]
  );

  const handleChoiceSelect = useCallback(
    (choice: string) => {
      setSelectedChoice(choice);
      setInputs({ solution: choice });
      setFeedback(null);
    },
    [setInputs]
  );

  // Handle answer verification
  const handleVerify = useCallback(() => {
    if (!selectedChoice.trim()) {
      setFeedback(sm2_09_t.feedback.empty_choice);
      return;
    }
    verify();
  }, [selectedChoice, sm2_09_t.feedback.empty_choice, verify]);

  // Handle next quest
  const handleNext = useCallback(() => {
    next();
    setSelectedChoice("");
    setFeedback(null);
  }, [next]);

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
    const difficultyLabels: Record<Difficulty, string> = {
      BASIC: sm2_09_t.difficulty.basic,
      CORE: sm2_09_t.difficulty.core,
      ADVANCED: sm2_09_t.difficulty.advanced,
      ELITE: sm2_09_t.difficulty.elite,
    };

    return buildQuestPrintSections<SM209Quest, Stage>({
      moduleTitle: sm2_09_t.title,
      stages: [
        { id: "INEQUALITY_BASICS", label: sm2_09_t.stages.inequality_basics },
        { id: "SYSTEMS", label: sm2_09_t.stages.systems },
        { id: "ABSOLUTE_VALUE", label: sm2_09_t.stages.absolute_value },
      ],
      difficultyOrder: PRINT_DIFFICULTY_ORDER,
      difficultyLabels,
      buildPool: (difficulty, stageId) => buildStagePool(sm2_09_t, difficulty, stageId),
    });
  }, [buildStagePool, sm2_09_t]);

  useEffect(() => {
    completeStage("sm2-09", currentStage);
  }, [completeStage, currentStage]);

  useEffect(() => {
    if (!lastCheck) return;
    setFeedback(lastCheck.ok ? sm2_09_t.feedback.correct : sm2_09_t.feedback.incorrect);
  }, [lastCheck, sm2_09_t.feedback.correct, sm2_09_t.feedback.incorrect]);

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
      feedbackContent={feedbackContent}
      feedbackLevel={feedbackLevel}
      feedbackAvailability={feedbackAvailability}
      feedbackPolicy={policy}
      onShowHint={showHintLevel}
      onShowSteps={showStepsLevel}
      onShowFull={showFullSolution}
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

              {/* Answer Options */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  {sm2_09_t.answer_options}
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {answerChoices.map((choice, index) => {
                    const selected = selectedChoice === choice;
                    return (
                      <button
                        key={`${currentQuest.id}-${choice}`}
                        type="button"
                        onClick={() => handleChoiceSelect(choice)}
                        className={`w-full rounded-lg border-2 px-4 py-3 text-left transition-all ${
                          selected
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:border-blue-400"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current text-sm font-black">
                            {CHOICE_LABELS[index] ?? String(index + 1)}
                          </div>
                          <div className="min-w-0 break-words font-mono text-base">
                            {choice}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
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
            </div>
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
