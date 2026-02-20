"use client";

import { useLanguage, TranslationKeys } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import ComplexVisualization from "@/components/chamber/gm4-01/ComplexVisualization";
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
  const t = getT("gm4_01");

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
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "BASICS",
  });

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t?.title || "GM4.01 // COMPLEX HORIZON"}
      moduleCode="GM4.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "BASICS", label: t?.stages?.basics || "BASICS" },
        { id: "OPERATIONS", label: t?.stages?.operations || "OPERATIONS" },
        { id: "POLAR", label: t?.stages?.polar || "POLAR" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t?.footer_left || "GM4.01_COMPLEX_HORIZON // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GM4.01_COMPLEX_MONITOR",
        difficulty: {
          basic: t?.difficulty?.basic || "BASIC",
          core: t?.difficulty?.core || "CORE",
          advanced: t?.difficulty?.advanced || "ADVANCED",
          elite: t?.difficulty?.elite || "ELITE",
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
              {t?.scenario_title || "MISSION"}
            </div>
            <p className="text-sm text-white/80 font-mono max-w-2xl mx-auto leading-relaxed">
              {stage === "BASICS" && (t?.scenarios?.basics || "[FALLBACK] Roche Pharmaceutical Signal Processing: You are calibrating medical imaging equipment at Roche Basel that uses complex number analysis for MRI signal processing. Each complex number z = a + bi represents a signal with real component (amplitude) and imaginary component (phase). Calculate the magnitude |z| to determine signal strength. Accurate magnitude calculation is critical for detecting tissue abnormalities in patient scans.")}
              {stage === "OPERATIONS" && (t?.scenarios?.operations || "[FALLBACK] Novartis Quantum Chemistry Simulation: You are running molecular orbital calculations at Novartis Basel using complex number arithmetic. Wave functions are represented as complex numbers, and their interactions require addition and multiplication in the complex plane. Calculate the result of complex operations to predict molecular behavior. These calculations determine drug binding efficiency.")}
              {stage === "POLAR" && (t?.scenarios?.polar || "[FALLBACK] University of Basel Electrical Engineering: You are analyzing AC circuit behavior in power systems for Basel's smart grid. Complex impedances are raised to powers when calculating resonance frequencies. Use polar form (r·e^(iθ)) to compute z^n efficiently. The result determines optimal power distribution across Basel's renewable energy network.")}
            </p>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-black">
                {currentQuest?.promptLatex}
              </div>
              <div className="text-3xl text-white font-black">
                <InlineMath math={currentQuest?.expressionLatex || ""} />
              </div>
              <div className="text-sm text-white/60 font-mono">
                <InlineMath math={currentQuest?.targetLatex || ""} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              {currentQuest?.slots.map((slot) => (
                <div key={slot.id} className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                    {slot.labelLatex}
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
