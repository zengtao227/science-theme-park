"use client";

import { useState, useMemo } from "react";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { useAppStore } from "@/lib/store";
import { Difficulty } from "@/hooks/useQuestManager";
import { Stage, GM202Quest } from "@/lib/gm2-02-types";
import { buildStagePool } from "@/lib/gm2-02-quest-builder";
import { verifyAnswer } from "@/lib/gm2-02-verification";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// Import translation files
import enTranslations from "@/lib/i18n/gm2-02-en.json";
import cnTranslations from "@/lib/i18n/gm2-02-cn.json";
import deTranslations from "@/lib/i18n/gm2-02-de.json";

const translations = {
  EN: enTranslations.gm2_02,
  CN: cnTranslations.gm2_02,
  DE: deTranslations.gm2_02
};

export default function GM202AnalyticalGeometry() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage];

  const [difficulty, setDifficulty] = useState<Difficulty>("BASIC");
  const [currentStage, setCurrentStage] = useState<Stage>("LINE_EQUATIONS");
  const [questIndex, setQuestIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [checkStatus, setCheckStatus] = useState<{ ok: boolean; correct: string } | null>(null);

  // Build quest pool based on current difficulty and stage
  const questPool = useMemo(() => {
    return buildStagePool(t, difficulty, currentStage);
  }, [t, difficulty, currentStage]);

  const currentQuest = questPool[questIndex];

  // Stage definitions
  const stages = [
    { id: "LINE_EQUATIONS", label: t.line_equations },
    { id: "PLANE_GEOMETRY", label: t.plane_geometry },
    { id: "SPATIAL_RELATIONSHIPS", label: t.spatial_relationships }
  ];

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setQuestIndex(0);
    setUserInputs({});
    setCheckStatus(null);
  };

  // Handle stage change
  const handleStageChange = (newStage: string) => {
    setCurrentStage(newStage as Stage);
    setQuestIndex(0);
    setUserInputs({});
    setCheckStatus(null);
  };

  // Handle input change
  const handleInputChange = (slotId: string, value: string) => {
    setUserInputs(prev => ({ ...prev, [slotId]: value }));
  };

  // Handle verify
  const handleVerify = () => {
    if (!currentQuest) return;

    // Check all slots
    const allCorrect = currentQuest.slots.every(slot => {
      const userAnswer = userInputs[slot.id] || "";
      return verifyAnswer(userAnswer, slot.expected, slot.type);
    });

    setCheckStatus({
      ok: allCorrect,
      correct: currentQuest.correctLatex
    });
  };

  // Handle next
  const handleNext = () => {
    if (questIndex < questPool.length - 1) {
      setQuestIndex(prev => prev + 1);
      setUserInputs({});
      setCheckStatus(null);
    }
  };

  // Get scenario description based on stage
  const getScenarioDescription = () => {
    switch (currentStage) {
      case "LINE_EQUATIONS":
        return t.scenario_tram_desc;
      case "PLANE_GEOMETRY":
        return t.scenario_bridge_desc;
      case "SPATIAL_RELATIONSHIPS":
        return difficulty === "ELITE" ? t.scenario_airport_desc : t.scenario_university_desc;
      default:
        return "";
    }
  };

  if (!currentQuest) {
    return (
      <div className="w-full h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-black mb-4">NO QUESTS AVAILABLE</div>
          <div className="text-white/60">Please check the quest pool configuration.</div>
        </div>
      </div>
    );
  }

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="GM2.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={currentStage}
      onStageChange={handleStageChange}
      checkStatus={checkStatus}
      onVerify={handleVerify}
      onNext={checkStatus?.ok ? handleNext : undefined}
      footerLeft={`QUEST ${questIndex + 1}/${questPool.length}`}
      translations={{
        back: currentLanguage === "CN" ? "返回" : currentLanguage === "DE" ? "ZURÜCK" : "BACK",
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: "READY",
        monitor_title: currentLanguage === "CN" ? "场景描述" : currentLanguage === "DE" ? "SZENARIO" : "SCENARIO",
        difficulty: {
          basic: t.basic,
          core: t.core,
          advanced: t.advanced,
          elite: t.elite
        }
      }}
      monitorContent={
        <div className="space-y-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black mb-3">
              {currentStage === "LINE_EQUATIONS" ? t.scenario_tram :
               currentStage === "PLANE_GEOMETRY" ? t.scenario_bridge :
               difficulty === "ELITE" ? t.scenario_airport : t.scenario_university}
            </div>
            <div className="text-sm text-white/80 leading-relaxed">
              {getScenarioDescription()}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Quest Prompt */}
        <div className="border-2 border-white/10 rounded-xl p-6 bg-white/[0.02]">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black mb-4">
            {currentLanguage === "CN" ? "问题" : currentLanguage === "DE" ? "AUFGABE" : "QUEST"}
          </div>
          <div className="text-lg text-white mb-4">
            {currentQuest.promptLatex}
          </div>
          {currentQuest.expressionLatex && (
            <div className="mt-4 p-4 bg-white/[0.03] rounded border border-white/5">
              <BlockMath math={currentQuest.expressionLatex} />
            </div>
          )}
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {currentQuest.slots.map(slot => (
            <div key={slot.id} className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
              <label className="block text-[10px] uppercase tracking-[0.4em] text-white/60 font-black mb-3">
                {slot.labelLatex}
              </label>
              <input
                type="text"
                value={userInputs[slot.id] || ""}
                onChange={(e) => handleInputChange(slot.id, e.target.value)}
                placeholder={slot.placeholder}
                className="w-full min-h-[44px] px-4 py-3 bg-black border-2 border-white/20 text-white font-mono text-lg focus:border-white/50 focus:outline-none transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </ChamberLayout>
  );
}
