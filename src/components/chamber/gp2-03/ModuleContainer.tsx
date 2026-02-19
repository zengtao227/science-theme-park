"use client";

import { useState, useEffect } from "react";
import { useGP203Store } from "@/lib/gp2-03-store";
import type { StageId, Language, Difficulty } from "@/lib/gp2-03-types";
import { ALL_QUESTS } from "@/lib/gp2-03-quest-data";
import { BASEL_SCENARIOS } from "@/lib/gp2-03-scenarios";
import { QuestValidator } from "@/lib/gp2-03-quest-validator";
import { QuestProgressTracker } from "@/lib/gp2-03-progress-tracker";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ScenarioCard from "./ScenarioCard";
import GasLawSimulator from "./GasLawSimulator";
import PVDiagram from "./PVDiagram";
import PartialPressureCalculator from "./PartialPressureCalculator";
import ContentRenderer from "./ContentRenderer";

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
    getStageProgress,
  } = useGP203Store();

  const [difficulty, setDifficulty] = useState<Difficulty>("BASIC");
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [lastValidation, setLastValidation] = useState<any>(null);

  // Initialize language
  useEffect(() => {
    if (initialLanguage && initialLanguage !== currentLanguage) {
      setLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  // Get quests for current stage and difficulty
  const stageQuests = ALL_QUESTS.filter(
    (q) => q.stageId === currentStage && q.difficulty === difficulty
  );

  const currentQuest = stageQuests[currentQuestIndex];
  const validator = new QuestValidator(currentLanguage);
  const progressTracker = new QuestProgressTracker(ALL_QUESTS, questProgress);

  const handleStageChange = (newStage: string) => {
    setStage(newStage as StageId);
    setCurrentQuestIndex(0);
    setLastValidation(null);
  };

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty as Difficulty);
    setCurrentQuestIndex(0);
    setLastValidation(null);
  };

  const handleVerify = () => {
    if (!currentQuest) return;

    const result = validator.validate(currentQuest, studentAnswer);
    setLastValidation(result);

    if (result.isCorrect) {
      completeQuest(currentQuest.id);
    }
  };

  const handleNext = () => {
    if (currentQuestIndex < stageQuests.length - 1) {
      setCurrentQuestIndex(currentQuestIndex + 1);
      setStudentAnswer("");
      setLastValidation(null);
    }
  };

  // Stage configuration
  const stages = [
    { id: "BASIC_GAS_LAWS" as StageId, label: "Basic Gas Laws" },
    { id: "IDEAL_GAS_EQUATION" as StageId, label: "Ideal Gas Equation" },
    { id: "GAS_MIXTURES" as StageId, label: "Gas Mixtures" },
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
        title="GP2.03 Gas Laws"
        moduleCode={moduleCode}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        stages={stages}
        currentStage={currentStage}
        onStageChange={handleStageChange}
        footerLeft="Master the fundamental gas laws"
        translations={{
          back: "Back",
          check: "Check",
          next: "Next",
          correct: "Correct!",
          incorrect: "Incorrect",
          difficulty: {
            BASIC: "Basic",
            CORE: "Core",
            ADVANCED: "Advanced",
            ELITE: "Elite"
          },
        }}
        monitorContent={getVisualization()}
      >
        <div className="text-center text-green-400 text-xl">
          Stage Complete! Select another difficulty or stage.
        </div>
      </ChamberLayout>
    );
  }

  return (
    <ChamberLayout
      title="GP2.03 Gas Laws"
      moduleCode={moduleCode}
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={currentStage}
      onStageChange={handleStageChange}
      footerLeft={`Quest ${currentQuestIndex + 1} of ${stageQuests.length}`}
      translations={{
        back: "Back",
        check: "Check",
        next: "Next",
        correct: "Correct!",
        incorrect: "Incorrect",
        difficulty: {
          BASIC: "Basic",
          CORE: "Core",
          ADVANCED: "Advanced",
          ELITE: "Elite"
        },
      }}
      monitorContent={getVisualization()}
    >
      <div className="space-y-6">
        {/* Scenarios (show on first quest) */}
        {currentQuestIndex === 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">Basel Scenarios</h3>
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
            <label className="block text-sm text-gray-400 mb-2">Your Answer:</label>
            <input
              type="text"
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
              placeholder="Enter your answer..."
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
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Check Answer
            </button>
            {lastValidation?.isCorrect && (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Next Quest
              </button>
            )}
          </div>

          {/* Hints */}
          {currentQuest.hints.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-300 font-semibold mb-2">Hints:</p>
              {currentQuest.hints.map((hint, idx) => (
                <p key={idx} className="text-yellow-200 text-sm">
                  • <ContentRenderer content={hint} language={currentLanguage} />
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </ChamberLayout>
  );
}
