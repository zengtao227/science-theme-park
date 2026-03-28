"use client";

import { useState, useEffect, useMemo } from "react";
import { useGP203Store } from "@/lib/gp2-03-store";
import type { StageId, Language, Difficulty } from "@/lib/gp2-03-types";
import { ALL_QUESTS } from "@/lib/gp2-03-quest-data";
import { BASEL_SCENARIOS } from "@/lib/gp2-03-scenarios";
import { QuestValidator } from "@/lib/gp2-03-quest-validator";
import { QuestProgressTracker } from "@/lib/gp2-03-progress-tracker";
import ChamberLayout from "@/components/layout/ChamberLayout";
import type { FeedbackContent, FeedbackLevel, FeedbackPolicy } from "@/hooks/useQuestManager";
import ScenarioCard from "./ScenarioCard";
import GasLawSimulator from "./GasLawSimulator";
import PVDiagram from "./PVDiagram";
import PartialPressureCalculator from "./PartialPressureCalculator";
import ContentRenderer from "./ContentRenderer";
import { escapeLatexText } from "@/lib/feedback/solverSupport";

interface ModuleContainerProps {
  moduleCode?: string;
  initialLanguage?: Language;
}

export default function ModuleContainer({
  moduleCode = "GP2.03",
  initialLanguage = "en",
}: ModuleContainerProps) {
  const {
    currentStage,
    currentLanguage,
    questProgress,
    setStage,
    setLanguage,
    completeQuest,
  } = useGP203Store();

  const [difficulty, setDifficulty] = useState<Difficulty>("BASIC");
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [lastValidation, setLastValidation] = useState<any>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedbackLevel, setFeedbackLevel] = useState<FeedbackLevel>("NONE");

  const ui = useMemo(() => ({
    title: {
      en: "GP2.03 Gas Laws",
      cn: "GP2.03 气体定律",
      de: "GP2.03 Gasgesetze",
    }[currentLanguage],
    back: {
      en: "Back",
      cn: "返回",
      de: "Zurück",
    }[currentLanguage],
    check: {
      en: "Check",
      cn: "检查",
      de: "Prüfen",
    }[currentLanguage],
    next: {
      en: "Next",
      cn: "下一个",
      de: "Weiter",
    }[currentLanguage],
    correct: {
      en: "Correct!",
      cn: "正确！",
      de: "Richtig!",
    }[currentLanguage],
    incorrect: {
      en: "Incorrect",
      cn: "不正确",
      de: "Falsch",
    }[currentLanguage],
    stageComplete: {
      en: "Stage Complete! Select another difficulty or stage.",
      cn: "阶段完成！请选择其他难度或阶段。",
      de: "Stufe abgeschlossen! Wählen Sie eine andere Schwierigkeit oder Stufe.",
    }[currentLanguage],
    baselScenarios: {
      en: "Basel Scenarios",
      cn: "巴塞尔场景",
      de: "Basler Szenarien",
    }[currentLanguage],
    answerLabel: {
      en: "Your Answer:",
      cn: "你的答案：",
      de: "Ihre Antwort:",
    }[currentLanguage],
    answerPlaceholder: {
      en: "Enter your answer...",
      cn: "输入你的答案...",
      de: "Geben Sie Ihre Antwort ein...",
    }[currentLanguage],
    checkAnswer: {
      en: "Check Answer",
      cn: "检查答案",
      de: "Antwort prüfen",
    }[currentLanguage],
    nextQuest: {
      en: "Next Quest",
      cn: "下一题",
      de: "Nächste Aufgabe",
    }[currentLanguage],
    hints: {
      en: "Hints:",
      cn: "提示：",
      de: "Hinweise:",
    }[currentLanguage],
    stageLabels: {
      BASIC_GAS_LAWS: {
        en: "Basic Gas Laws",
        cn: "基础气体定律",
        de: "Grundlegende Gasgesetze",
      },
      IDEAL_GAS_EQUATION: {
        en: "Ideal Gas Equation",
        cn: "理想气体方程",
        de: "Ideale Gasgleichung",
      },
      GAS_MIXTURES: {
        en: "Gas Mixtures",
        cn: "气体混合",
        de: "Gasmischungen",
      },
    },
    difficulty: {
      BASIC: {
        en: "Basic",
        cn: "基础",
        de: "Grundlagen",
      },
      CORE: {
        en: "Core",
        cn: "核心",
        de: "Kern",
      },
      ADVANCED: {
        en: "Advanced",
        cn: "进阶",
        de: "Fortgeschritten",
      },
      ELITE: {
        en: "Elite",
        cn: "精英",
        de: "Elite",
      },
    },
  }), [currentLanguage]);

  // Initialize language
  useEffect(() => {
    if (initialLanguage && initialLanguage !== currentLanguage) {
      setLanguage(initialLanguage);
    }
  }, [initialLanguage, currentLanguage, setLanguage]);

  // Get quests for current stage and difficulty
  const stageQuests = ALL_QUESTS.filter(
    (q) => q.stageId === currentStage && q.difficulty === difficulty
  );

  const currentQuest = stageQuests[currentQuestIndex];
  const validator = new QuestValidator(currentLanguage);
  const progressTracker = new QuestProgressTracker(ALL_QUESTS, questProgress);
  void progressTracker;
  const feedbackPolicy: FeedbackPolicy = useMemo(() => ({
    hintThreshold: 1,
    stepsThreshold: 2,
    fullThreshold: 3,
    showAfterCorrect: true,
    confirmFullSolution: true,
  }), []);

  const feedbackAvailability = useMemo(() => ({
    canShowHint: wrongAttempts >= feedbackPolicy.hintThreshold,
    canShowSteps: wrongAttempts >= feedbackPolicy.stepsThreshold,
    canShowFull: wrongAttempts >= feedbackPolicy.fullThreshold,
  }), [wrongAttempts, feedbackPolicy]);

  const feedbackContent = useMemo<FeedbackContent>(() => {
    const toText = (text: string) => `\\text{${escapeLatexText(text)}}`;
    const localizedHints = currentQuest?.hints.map((hint) => hint[currentLanguage]) ?? [];
    const explanation = currentQuest?.solution.explanation[currentLanguage] ?? "";

    return {
      hint: localizedHints[0] ? toText(localizedHints[0]) : "",
      steps: localizedHints.map((hint, index) => ({
        stepNumber: index + 1,
        expressionLatex: toText(hint),
        justification: currentQuest?.title[currentLanguage] ?? "Gas law guidance",
        emphasis: index === localizedHints.length - 1 ? "key" : undefined,
      })),
      fullSolutionLatex: explanation ? toText(explanation) : null,
      hasFullSolution: !!explanation,
    };
  }, [currentLanguage, currentQuest]);

  const handleStageChange = (newStage: string) => {
    setStage(newStage as StageId);
    setCurrentQuestIndex(0);
    setLastValidation(null);
    setWrongAttempts(0);
    setFeedbackLevel("NONE");
  };

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty as Difficulty);
    setCurrentQuestIndex(0);
    setLastValidation(null);
    setWrongAttempts(0);
    setFeedbackLevel("NONE");
  };

  const handleVerify = () => {
    if (!currentQuest) return;

    const result = validator.validate(currentQuest, studentAnswer);
    setLastValidation(result);

    if (result.isCorrect) {
      completeQuest(currentQuest.id);
    } else {
      setWrongAttempts((value) => value + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestIndex < stageQuests.length - 1) {
      setCurrentQuestIndex(currentQuestIndex + 1);
      setStudentAnswer("");
      setLastValidation(null);
      setWrongAttempts(0);
      setFeedbackLevel("NONE");
    }
  };

  // Stage configuration
  const stages = [
    { id: "BASIC_GAS_LAWS" as StageId, label: ui.stageLabels.BASIC_GAS_LAWS[currentLanguage] },
    { id: "IDEAL_GAS_EQUATION" as StageId, label: ui.stageLabels.IDEAL_GAS_EQUATION[currentLanguage] },
    { id: "GAS_MIXTURES" as StageId, label: ui.stageLabels.GAS_MIXTURES[currentLanguage] },
  ];

  // Get visualization based on stage
  const getVisualization = () => {
    if (currentStage === "BASIC_GAS_LAWS") {
      return <GasLawSimulator law="boyle" language={currentLanguage} />;
    } else if (currentStage === "IDEAL_GAS_EQUATION") {
      return (
        <PVDiagram
          processes={[
            {
              type: "isothermal",
              startState: { pressure: 200000, volume: 0.01, temperature: 300, moles: 1 },
              endState: { pressure: 100000, volume: 0.02, temperature: 300, moles: 1 },
              color: "#ff6b6b",
            },
          ]}
          language={currentLanguage}
        />
      );
    } else {
      return <PartialPressureCalculator language={currentLanguage} />;
    }
  };

  if (!currentQuest) {
    return (
      <ChamberLayout
        title={ui.title}
        moduleCode={moduleCode}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        stages={stages}
        currentStage={currentStage}
        onStageChange={handleStageChange}
        translations={{
          back: ui.back,
          check: ui.check,
          next: ui.next,
          correct: ui.correct,
          incorrect: ui.incorrect,
          difficulty: {
            BASIC: ui.difficulty.BASIC[currentLanguage],
            CORE: ui.difficulty.CORE[currentLanguage],
            ADVANCED: ui.difficulty.ADVANCED[currentLanguage],
            ELITE: ui.difficulty.ELITE[currentLanguage],
          },
        }}
        monitorContent={getVisualization()}
      >
        <div className="text-center text-green-400 text-xl">
          {ui.stageComplete}
        </div>
      </ChamberLayout>
    );
  }

  return (
    <ChamberLayout
      title={ui.title}
      moduleCode={moduleCode}
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={currentStage}
      onStageChange={handleStageChange}
      translations={{
        back: ui.back,
        check: ui.check,
        next: ui.next,
        correct: ui.correct,
        incorrect: ui.incorrect,
        difficulty: {
          BASIC: ui.difficulty.BASIC[currentLanguage],
          CORE: ui.difficulty.CORE[currentLanguage],
          ADVANCED: ui.difficulty.ADVANCED[currentLanguage],
          ELITE: ui.difficulty.ELITE[currentLanguage],
        },
      }}
      monitorContent={getVisualization()}
      checkStatus={lastValidation ? { ok: lastValidation.isCorrect, correct: "" } : null}
      feedbackContent={feedbackContent}
      feedbackLevel={feedbackLevel}
      feedbackAvailability={feedbackAvailability}
      feedbackPolicy={feedbackPolicy}
      onShowHint={() => setFeedbackLevel((level) => (level === "NONE" ? "HINT" : level))}
      onShowSteps={() => setFeedbackLevel("STEPS")}
      onShowFull={() => setFeedbackLevel("FULL")}
    >
      <div className="space-y-6">
        {/* Scenarios (show on first quest) */}
        {currentQuestIndex === 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">{ui.baselScenarios}</h3>
            {BASEL_SCENARIOS.filter((s) => {
              // Show relevant scenarios for current stage
              if (currentStage === "BASIC_GAS_LAWS") return s.relatedConcepts.includes("boyle") || s.relatedConcepts.includes("charles");
              if (currentStage === "IDEAL_GAS_EQUATION") return s.relatedConcepts.includes("ideal-gas");
              if (currentStage === "GAS_MIXTURES") return s.relatedConcepts.includes("dalton") || s.relatedConcepts.includes("partial-pressure");
              return false;
            }).map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                language={currentLanguage}
              />
            ))}
          </div>
        )}

        {/* Quest */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            <ContentRenderer content={currentQuest.title} language={currentLanguage} />
          </h3>

          <div className="mb-4">
            <ContentRenderer content={currentQuest.description} language={currentLanguage} className="text-gray-300" />
          </div>

          <div className="mb-4">
            <ContentRenderer content={currentQuest.problem} language={currentLanguage} className="text-cyan-300 font-semibold" />
          </div>

          {/* Answer Input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">{ui.answerLabel}</label>
            <input
              type="text"
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              aria-label={ui.answerLabel}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
              placeholder={ui.answerPlaceholder}
            />
          </div>

          {/* Validation Feedback */}
          {lastValidation && (
            <div className={`p-4 rounded-lg mb-4 ${lastValidation.isCorrect ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"}`}>
              <p className={lastValidation.isCorrect ? "text-green-300" : "text-red-300"}>
                <ContentRenderer content={lastValidation.feedback} language={currentLanguage} />
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleVerify}
              aria-label={ui.checkAnswer}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              {ui.checkAnswer}
            </button>
            {lastValidation?.isCorrect && (
              <button
                onClick={handleNext}
                aria-label={ui.nextQuest}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {ui.nextQuest}
              </button>
            )}
          </div>

        </div>
      </div>
    </ChamberLayout>
  );
}
