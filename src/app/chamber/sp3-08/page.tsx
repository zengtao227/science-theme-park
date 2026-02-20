"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import P308OpticsCanvas from "@/components/chamber/sp3-08/OpticsCanvas";

type Stage = "REFLECTION" | "REFRACTION" | "LENSES";

interface P301Quest extends Quest {
  stage: Stage;
  scenario: "reflection" | "refraction" | "lens";
  angle: number;
  n1?: number;
  n2?: number;
  focalLength?: number;
  targetAngle: number;
}

function buildStagePool(difficulty: Difficulty, stage: Stage): P301Quest[] {
  const quests: P301Quest[] = [];

  // Stage 1: REFLECTION - Law of Reflection (5 questions per difficulty)
  if (stage === "REFLECTION") {
    let angles: number[] = [];
    
    switch (difficulty) {
      case "BASIC":
        angles = [30, 45, 60, 20, 50]; // Simple angles
        break;
      case "CORE":
        angles = [25, 35, 55, 65, 40]; // More variety
        break;
      case "ADVANCED":
        angles = [15, 22, 38, 52, 68]; // Irregular angles
        break;
      case "ELITE":
        angles = [12, 18, 33, 47, 73]; // Complex angles
        break;
    }

    for (const angle of angles) {
      const reflectedAngle = angle; // Law of Reflection: θᵢ = θᵣ

      quests.push({
        id: `REFLECTION_${difficulty}_${angle}`,
        difficulty,
        stage,
        scenario: "reflection",
        angle,
        targetAngle: reflectedAngle,
        promptLatex: `\\\\text{Law of Reflection}\\\\\\theta_i=${angle}^\\circ`,
        expressionLatex: `\\theta_i=\\theta_r`,
        targetLatex: `\\theta_r`,
        correctLatex: `\\theta_r=${reflectedAngle}^\\circ`,
        slots: [
          { id: "theta_r", labelLatex: "\\theta_r", placeholder: "θᵣ (degrees)", expected: reflectedAngle },
        ],
        hintLatex: [`\\\\text{Angle of incidence equals angle of reflection}`],
      });
    }
    return quests;
  }

  // Stage 2: REFRACTION - Snell's Law (5 questions per difficulty)
  if (stage === "REFRACTION") {
    const materials = [
      { name: "Air→Water", n1: 1.00, n2: 1.33 },
      { name: "Air→Glass", n1: 1.00, n2: 1.50 },
      { name: "Water→Glass", n1: 1.33, n2: 1.50 },
      { name: "Air→Diamond", n1: 1.00, n2: 2.42 },
      { name: "Glass→Water", n1: 1.50, n2: 1.33 },
    ];

    let configs: Array<{ mat: typeof materials[0]; angle: number }> = [];

    switch (difficulty) {
      case "BASIC":
        // Simple angles with air-water
        configs = [
          { mat: materials[0], angle: 30 },
          { mat: materials[0], angle: 45 },
          { mat: materials[0], angle: 60 },
          { mat: materials[1], angle: 30 },
          { mat: materials[1], angle: 45 },
        ];
        break;
      case "CORE":
        // More materials and angles
        configs = [
          { mat: materials[0], angle: 25 },
          { mat: materials[1], angle: 35 },
          { mat: materials[2], angle: 40 },
          { mat: materials[0], angle: 50 },
          { mat: materials[1], angle: 55 },
        ];
        break;
      case "ADVANCED":
        // Complex materials
        configs = [
          { mat: materials[2], angle: 20 },
          { mat: materials[3], angle: 15 },
          { mat: materials[4], angle: 35 },
          { mat: materials[0], angle: 65 },
          { mat: materials[1], angle: 70 },
        ];
        break;
      case "ELITE":
        // Challenging combinations
        configs = [
          { mat: materials[3], angle: 10 },
          { mat: materials[3], angle: 20 },
          { mat: materials[4], angle: 45 },
          { mat: materials[2], angle: 55 },
          { mat: materials[1], angle: 75 },
        ];
        break;
    }

    for (const { mat, angle: theta1 } of configs) {
      const theta1Rad = (theta1 * Math.PI) / 180;
      const sinTheta2 = (mat.n1 * Math.sin(theta1Rad)) / mat.n2;

      // Skip if total internal reflection would occur
      if (sinTheta2 > 1) continue;

      const theta2 = Math.asin(sinTheta2) * (180 / Math.PI);

      quests.push({
        id: `REFRACTION_${difficulty}_${mat.name}_${theta1}`,
        difficulty,
        stage,
        scenario: "refraction",
        angle: theta1,
        n1: mat.n1,
        n2: mat.n2,
        targetAngle: theta2,
        promptLatex: `\\text{Snell's Law: }${mat.name}\\\\n_1=${mat.n1},\\; n_2=${mat.n2},\\; \\theta_1=${theta1}^\\circ`,
        expressionLatex: `n_1\\sin\\theta_1=n_2\\sin\\theta_2`,
        targetLatex: `\\theta_2`,
        correctLatex: `\\theta_2=${theta2.toFixed(1)}^\\circ`,
        slots: [
          { id: "theta_2", labelLatex: "\\theta_2", placeholder: "θ_2 (degrees)", expected: parseFloat(theta2.toFixed(1)) },
        ],
        hintLatex: [`\\text{Use Snell's Law: } n_1\\sin\\theta_1=n_2\\sin\\theta_2`],
      });
    }
    
    // Ensure we have exactly 5 questions
    return quests.slice(0, 5);
  }

  // Stage 3: LENSES - Focal Length and Image Formation (5 questions per difficulty)
  if (stage === "LENSES") {
    let configs: Array<{ f: number; u: number }> = [];

    switch (difficulty) {
      case "BASIC":
        // Simple focal lengths and object distances
        configs = [
          { f: 50, u: 150 },
          { f: 50, u: 200 },
          { f: 75, u: 150 },
          { f: 75, u: 225 },
          { f: 100, u: 200 },
        ];
        break;
      case "CORE":
        // More variety
        configs = [
          { f: 60, u: 180 },
          { f: 80, u: 200 },
          { f: 100, u: 250 },
          { f: 50, u: 175 },
          { f: 90, u: 270 },
        ];
        break;
      case "ADVANCED":
        // Complex combinations
        configs = [
          { f: 40, u: 120 },
          { f: 65, u: 195 },
          { f: 85, u: 255 },
          { f: 110, u: 220 },
          { f: 55, u: 165 },
        ];
        break;
      case "ELITE":
        // Challenging calculations
        configs = [
          { f: 35, u: 140 },
          { f: 45, u: 180 },
          { f: 70, u: 280 },
          { f: 95, u: 285 },
          { f: 120, u: 240 },
        ];
        break;
    }

    for (const { f, u } of configs) {
      // Lens equation: 1/f = 1/u + 1/v
      const v = (f * u) / (u - f);

      // Skip if image is virtual or too far
      if (v < 0 || v > 500) continue;

      const magnification = -v / u;

      quests.push({
        id: `LENS_${difficulty}_${f}_${u}`,
        difficulty,
        stage,
        scenario: "lens",
        angle: 0,
        focalLength: f,
        targetAngle: v,
        promptLatex: `\\\\text{Converging Lens}\\\\f=${f}\\\\text{px},\\; u=${u}\\\\text{px}`,
        expressionLatex: `\\\\frac{1}{f}=\\\\frac{1}{u}+\\\\frac{1}{v}`,
        targetLatex: `v`,
        correctLatex: `v=${v.toFixed(1)}\\\\text{px}`,
        slots: [
          { id: "v", labelLatex: "v\\\\text{ (image distance)}", placeholder: "v (px)", expected: parseFloat(v.toFixed(1)) },
          { id: "m", labelLatex: "m\\\\text{ (magnification)}", placeholder: "m", expected: parseFloat(magnification.toFixed(2)) },
        ],
        hintLatex: [`\\\\text{Lens equation: } \\\\frac{1}{f}=\\\\frac{1}{u}+\\\\frac{1}{v}`],
      });
    }
    
    return quests;
  }

  return [];
}

export default function P301Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    successRate,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<P301Quest, Stage>({
    moduleCode: "sp3-08",
    buildPool: (d, s) => buildStagePool(d, s),
    initialStage: "REFLECTION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp3-08", stage);
    }
  }, [lastCheck, completeStage, stage]);

  if (!currentQuest) return null;

  const stages = [
    { id: "REFLECTION", label: t("sp3_08.stages.reflection") },
    { id: "REFRACTION", label: t("sp3_08.stages.refraction") },
    { id: "LENSES", label: t("sp3_08.stages.lenses") },
  ];

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sp3_08.title")}
      moduleCode="SP3.08"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      translations={{
        back: t("sp3_08.back"),
        check: t("sp3_08.check"),
        next: t("sp3_08.next"),
        correct: t("sp3_08.correct"),
        incorrect: t("sp3_08.incorrect"),
        difficulty: {
          basic: t("sp3_08.difficulty.basic"),
          core: t("sp3_08.difficulty.core"),
          advanced: t("sp3_08.difficulty.advanced"),
          elite: t("sp3_08.difficulty.elite"),
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <P308OpticsCanvas
            scenario={currentQuest?.scenario}
            angle={currentQuest?.angle}
            n1={currentQuest?.n1}
            n2={currentQuest?.n2}
            focalLength={currentQuest?.focalLength}
            showAnswer={lastCheck?.ok === true}
            targetAngle={currentQuest?.targetAngle}
          />
          <div className="text-white text-xs font-mono text-center space-y-1">
            {currentQuest?.scenario === "reflection" && (
              <div>{t("sp3_08.labels.incident_angle")}: {currentQuest?.angle}°</div>
            )}
            {currentQuest?.scenario === "refraction" && (
              <>
                <div>n_1 = {currentQuest?.n1?.toFixed(2)} → n_2 = {currentQuest?.n2?.toFixed(2)}</div>
                <div>{t("sp3_08.labels.incident_angle")}: {currentQuest?.angle}°</div>
              </>
            )}
            {currentQuest?.scenario === "lens" && (
              <div>{t("sp3_08.labels.focal_length")}: {currentQuest?.focalLength}px</div>
            )}
            {lastCheck?.ok && <div className="text-neon-green">✓ {t("sp3_08.labels.light_path_correct")}</div>}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t("sp3_08.objective_title")}
          </h3>
          <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>

        <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
            {t("sp3_08.target_title")}
          </span>
          <div className="font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95]">
            <InlineMath math={currentQuest?.targetLatex || ""} />
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {currentQuest?.slots.map((slot) => (
            <div key={slot.id} className="space-y-3">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                <InlineMath math={slot.labelLatex} />
              </div>
              <input
                value={inputs[slot.id] || ""}
                onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                placeholder={slot.placeholder}
                inputMode="decimal"
              />
            </div>
          ))}

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/90 font-black mb-2">{t("sp3_08.labels.formula")}</div>
            <div className="text-sm text-white/60 font-mono">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>

          {currentQuest?.scenario === "refraction" && (
            <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
              <div className="text-[9px] uppercase tracking-[0.3em] text-neon-cyan/60 font-black mb-2">{t("sp3_08.labels.hint")}</div>
              <div className="text-xs text-neon-cyan/80 font-mono">
                {t("sp3_08.hints.refraction")}
              </div>
            </div>
          )}
        </div>
      </div>
    </ChamberLayout>
  );
}
