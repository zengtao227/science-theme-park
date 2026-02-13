"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LogarithmicCanvas from "@/components/chamber/sm3-04/LogarithmicCanvas";

type Stage = "PH" | "DECIBEL" | "RICHTER";
type S304T = typeof translations.EN.sm3_04;

interface S304Quest extends Quest {
  stage: Stage;
  value?: number;
  concentration?: number;
  intensity?: number;
  amplitude?: number;
  scenarioKey?: keyof S304T["scenarios"];
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// pH data - redesigned with proper difficulty progression
const phData = {
  BASIC: [
    // Simple powers of 10
    { id: "P-B1", concentration: 1e-3, scenarioKey: "ph_basic" as const },
    { id: "P-B2", concentration: 1e-5, scenarioKey: "ph_basic" as const },
    { id: "P-B3", concentration: 1e-7, scenarioKey: "ph_basic" as const },
    { id: "P-B4", concentration: 1e-9, scenarioKey: "ph_basic" as const },
  ],
  CORE: [
    // Requires understanding neutral/acidic/basic
    { id: "P-C1", concentration: 1e-8, scenarioKey: "ph_core" as const },
    { id: "P-C2", concentration: 1e-2, scenarioKey: "ph_core" as const },
    { id: "P-C3", concentration: 1e-11, scenarioKey: "ph_core" as const },
    { id: "P-C4", concentration: 1e-4, scenarioKey: "ph_core" as const },
  ],
  ADVANCED: [
    // Non-integer exponents
    { id: "P-A1", concentration: 3.16e-5, scenarioKey: "ph_advanced" as const }, // pH ≈ 4.5
    { id: "P-A2", concentration: 1.58e-7, scenarioKey: "ph_advanced" as const }, // pH ≈ 6.8
    { id: "P-A3", concentration: 6.31e-3, scenarioKey: "ph_advanced" as const }, // pH ≈ 2.2
    { id: "P-A4", concentration: 2.51e-10, scenarioKey: "ph_advanced" as const }, // pH ≈ 9.6
  ],
  ELITE: [
    // Fractional exponents in scientific notation
    { id: "P-E1", concentration: Math.pow(10, -4.5), scenarioKey: "ph_elite" as const }, // 10^-4.5
    { id: "P-E2", concentration: Math.pow(10, -3.7), scenarioKey: "ph_elite" as const }, // 10^-3.7
    { id: "P-E3", concentration: Math.pow(10, -8.3), scenarioKey: "ph_elite" as const }, // 10^-8.3
    { id: "P-E4", concentration: Math.pow(10, -10.2), scenarioKey: "ph_elite" as const }, // 10^-10.2
  ],
};

// Decibel data - redesigned with proper difficulty progression
const decibelData = {
  BASIC: [
    // Simple powers of 10
    { id: "D-B1", intensity: 1e-10, scenarioKey: "decibel_basic" as const }, // 20 dB
    { id: "D-B2", intensity: 1e-8, scenarioKey: "decibel_basic" as const },  // 40 dB
    { id: "D-B3", intensity: 1e-6, scenarioKey: "decibel_basic" as const },  // 60 dB
    { id: "D-B4", intensity: 1e-9, scenarioKey: "decibel_basic" as const },  // 30 dB
  ],
  CORE: [
    // Understanding sound levels
    { id: "D-C1", intensity: 1e-4, scenarioKey: "decibel_core" as const },  // 80 dB
    { id: "D-C2", intensity: 1e-2, scenarioKey: "decibel_core" as const },  // 100 dB
    { id: "D-C3", intensity: 1e-5, scenarioKey: "decibel_core" as const },  // 70 dB
    { id: "D-C4", intensity: 1, scenarioKey: "decibel_core" as const },     // 120 dB
  ],
  ADVANCED: [
    // Non-integer results
    { id: "D-A1", intensity: 3.16e-7, scenarioKey: "decibel_advanced" as const }, // ≈ 55 dB
    { id: "D-A2", intensity: 1.58e-5, scenarioKey: "decibel_advanced" as const }, // ≈ 72 dB
    { id: "D-A3", intensity: 6.31e-3, scenarioKey: "decibel_advanced" as const }, // ≈ 98 dB
    { id: "D-A4", intensity: 2.51e-9, scenarioKey: "decibel_advanced" as const }, // ≈ 34 dB
  ],
  ELITE: [
    // Calculating decibel differences (requires subtraction)
    { id: "D-E1", intensity: 1e-3, intensity2: 1e-6 as number | undefined, scenarioKey: "decibel_elite" as const }, // 90 - 60 = 30 dB reduction
    { id: "D-E2", intensity: 1e-2, intensity2: 1e-5 as number | undefined, scenarioKey: "decibel_elite" as const }, // 100 - 70 = 30 dB reduction
    { id: "D-E3", intensity: 1e-4, intensity2: 1e-8 as number | undefined, scenarioKey: "decibel_elite" as const }, // 80 - 40 = 40 dB reduction
    { id: "D-E4", intensity: 1, intensity2: 1e-6 as number | undefined, scenarioKey: "decibel_elite" as const }, // 120 - 60 = 60 dB reduction
  ],
};

// Richter data - redesigned with proper difficulty progression
const richterData = {
  BASIC: [
    // Simple powers of 10
    { id: "R-B1", amplitude: 10, scenarioKey: "richter_basic" as const },      // M = 1
    { id: "R-B2", amplitude: 100, scenarioKey: "richter_basic" as const },     // M = 2
    { id: "R-B3", amplitude: 1000, scenarioKey: "richter_basic" as const },    // M = 3
    { id: "R-B4", amplitude: 10000, scenarioKey: "richter_basic" as const },   // M = 4
  ],
  CORE: [
    // Understanding earthquake severity
    { id: "R-C1", amplitude: 100000, scenarioKey: "richter_core" as const },   // M = 5
    { id: "R-C2", amplitude: 1000000, scenarioKey: "richter_core" as const },  // M = 6
    { id: "R-C3", amplitude: 10000000, scenarioKey: "richter_core" as const }, // M = 7
    { id: "R-C4", amplitude: 316, scenarioKey: "richter_core" as const },      // M ≈ 2.5
  ],
  ADVANCED: [
    // Non-integer magnitudes
    { id: "R-A1", amplitude: 31600, scenarioKey: "richter_advanced" as const },  // M ≈ 4.5
    { id: "R-A2", amplitude: 1000, scenarioKey: "richter_advanced" as const },   // M = 3.0
    { id: "R-A3", amplitude: 158000, scenarioKey: "richter_advanced" as const }, // M ≈ 5.2
    { id: "R-A4", amplitude: 501, scenarioKey: "richter_advanced" as const },    // M ≈ 2.7
  ],
  ELITE: [
    // Understanding energy relationships (conceptual)
    { id: "R-E1", amplitude: 100000, amplitude2: 1000 as number | undefined, scenarioKey: "richter_elite" as const }, // M 5.0 vs M 3.0
    { id: "R-E2", amplitude: 10000000, amplitude2: 100000 as number | undefined, scenarioKey: "richter_elite" as const }, // M 7.0 vs M 5.0
    { id: "R-E3", amplitude: 1000000, amplitude2: 10000 as number | undefined, scenarioKey: "richter_elite" as const }, // M 6.0 vs M 4.0
    { id: "R-E4", amplitude: 1000000000, amplitude2: 1000000 as number | undefined, scenarioKey: "richter_elite" as const }, // M 9.0 vs M 6.0
  ],
};

function buildStagePool(t: S304T, difficulty: Difficulty, stage: Stage): S304Quest[] {
  if (stage === "PH") {
    const data = phData[difficulty];
    return data.map((item) => {
      const pH = round2(-Math.log10(item.concentration));
      
      return {
        id: item.id,
        difficulty,
        stage,
        concentration: item.concentration,
        value: pH,
        scenarioKey: item.scenarioKey,
        promptLatex: t.stages.ph_prompt_latex,
        expressionLatex: `[H^+]=${item.concentration.toExponential(2)}\\;M`,
        targetLatex: "pH",
        slots: [{ id: "pH", labelLatex: "pH", placeholder: "pH value", expected: pH }],
        correctLatex: `pH=${pH}`,
      };
    });
  }

  if (stage === "DECIBEL") {
    const data = decibelData[difficulty];
    return data.map((item) => {
      const I0 = 1e-12;
      
      // ELITE level: calculate decibel reduction
      if (difficulty === "ELITE" && 'intensity2' in item && item.intensity2) {
        const dB1 = round2(10 * Math.log10(item.intensity / I0));
        const dB2 = round2(10 * Math.log10(item.intensity2 / I0));
        const reduction = round2(dB1 - dB2);
        
        return {
          id: item.id,
          difficulty,
          stage,
          intensity: item.intensity,
          value: reduction,
          scenarioKey: item.scenarioKey,
          promptLatex: "\\text{Calculate decibel reduction: }L_1 - L_2",
          expressionLatex: `I_1=${item.intensity.toExponential(0)}\\;W/m^2,\\; I_2=${item.intensity2.toExponential(0)}\\;W/m^2`,
          targetLatex: "\\Delta L",
          slots: [{ id: "dB", labelLatex: "\\Delta L", placeholder: "dB reduction", expected: reduction, unit: "dB" }],
          correctLatex: `\\Delta L=${reduction}\\;dB`,
        };
      }
      
      // BASIC/CORE/ADVANCED: calculate single decibel value
      const dB = round2(10 * Math.log10(item.intensity / I0));
      
      return {
        id: item.id,
        difficulty,
        stage,
        intensity: item.intensity,
        value: dB,
        scenarioKey: item.scenarioKey,
        promptLatex: t.stages.decibel_prompt_latex,
        expressionLatex: `I=${item.intensity.toExponential(0)}\\;W/m^2,\\; I_0=10^{-12}\\;W/m^2`,
        targetLatex: "L",
        slots: [{ id: "L", labelLatex: "L", placeholder: "decibels", expected: dB, unit: "dB" }],
        correctLatex: `L=${dB}\\;dB`,
      };
    });
  }

  // RICHTER
  const data = richterData[difficulty];
  return data.map((item) => {
    // ELITE level: compare two earthquakes (magnitude difference)
    if (difficulty === "ELITE" && 'amplitude2' in item && item.amplitude2) {
      const M1 = round2(Math.log10(item.amplitude));
      const M2 = round2(Math.log10(item.amplitude2));
      const diff = round2(M1 - M2);
      
      return {
        id: item.id,
        difficulty,
        stage,
        amplitude: item.amplitude,
        value: diff,
        scenarioKey: item.scenarioKey,
        promptLatex: "\\text{Calculate magnitude difference: }M_1 - M_2",
        expressionLatex: `A_1=${item.amplitude}\\;\\mu m,\\; A_2=${item.amplitude2}\\;\\mu m`,
        targetLatex: "\\Delta M",
        slots: [{ id: "M", labelLatex: "\\Delta M", placeholder: "magnitude diff", expected: diff }],
        correctLatex: `\\Delta M=${diff}`,
      };
    }
    
    // BASIC/CORE/ADVANCED: calculate single magnitude
    const magnitude = round2(Math.log10(item.amplitude));
    
    return {
      id: item.id,
      difficulty,
      stage,
      amplitude: item.amplitude,
      value: magnitude,
      scenarioKey: item.scenarioKey,
      promptLatex: t.stages.richter_prompt_latex,
      expressionLatex: `A=${item.amplitude}\\;\\mu m`,
      targetLatex: "M",
      slots: [{ id: "M", labelLatex: "M", placeholder: "magnitude", expected: magnitude }],
      correctLatex: `M=${magnitude}`,
    };
  });
}

export default function S304Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sm3_04;

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
  } = useQuestManager<S304Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "PH",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm3-04", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM3.04"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "PH", label: t.stages.ph },
        { id: "DECIBEL", label: t.stages.decibel },
        { id: "RICHTER", label: t.stages.richter },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <LogarithmicCanvas
            stage={stage}
            value={currentQuest?.value || 7}
            translations={t.canvas}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{t.labels.hints}</div>
            <div className="text-white font-black text-lg">
              <InlineMath math={t.formulas[stage.toLowerCase() as keyof typeof t.formulas]} />
            </div>
            <div className="text-white/70 text-sm font-mono">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        
        {/* Scenario description */}
        {currentQuest?.scenarioKey && t.scenarios && (
          <div className="max-w-4xl mx-auto p-6 bg-emerald-950/20 border-2 border-emerald-500/30 rounded-xl">
            <div className="text-sm font-medium text-emerald-300 leading-relaxed">
              {t.scenarios[currentQuest.scenarioKey]}
            </div>
          </div>
        )}
        
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                  {slot.unit && (
                    <div className="text-xl font-black text-white/80 min-w-[30px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat auf 2 Dezimalstellen gerundet an."
              : currentLanguage === 'CN'
                ? "提示：保留 2 位小数。"
                : "Tip: Enter result rounded to 2 decimal places."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
