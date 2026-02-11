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
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// pH data
const phData = [
  { id: "P1", concentration: 1e-3 },
  { id: "P2", concentration: 1e-5 },
  { id: "P3", concentration: 1e-7 },
  { id: "P4", concentration: 1e-9 },
  { id: "P5", concentration: 1e-11 },
  { id: "P6", concentration: 1e-2 },
  { id: "P7", concentration: 1e-4 },
];

// Decibel data
const decibelData = [
  { id: "D1", intensity: 1e-10 }, // 20 dB
  { id: "D2", intensity: 1e-8 },  // 40 dB
  { id: "D3", intensity: 1e-6 },  // 60 dB
  { id: "D4", intensity: 1e-4 },  // 80 dB
  { id: "D5", intensity: 1e-2 },  // 100 dB
  { id: "D6", intensity: 1 },     // 120 dB
  { id: "D7", intensity: 1e-9 },  // 30 dB
];

// Richter data
const richterData = [
  { id: "R1", amplitude: 10 },
  { id: "R2", amplitude: 100 },
  { id: "R3", amplitude: 1000 },
  { id: "R4", amplitude: 10000 },
  { id: "R5", amplitude: 100000 },
  { id: "R6", amplitude: 31.6 },
  { id: "R7", amplitude: 316 },
];

function buildStagePool(t: S304T, difficulty: Difficulty, stage: Stage): S304Quest[] {
  if (stage === "PH") {
    const all = phData.map((item) => {
      // pH = -log10([H+])
      const pH = round2(-Math.log10(item.concentration));
      
      return {
        id: item.id,
        difficulty,
        stage,
        concentration: item.concentration,
        value: pH,
        promptLatex: t.stages.ph_prompt_latex,
        expressionLatex: `[H^+]=${item.concentration.toExponential(0)}\\;M`,
        targetLatex: "pH",
        slots: [{ id: "pH", labelLatex: "pH", placeholder: "pH value", expected: pH }],
        correctLatex: `pH=${pH}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "DECIBEL") {
    const all = decibelData.map((item) => {
      // L = 10 * log10(I/I0), where I0 = 1e-12 W/m²
      const I0 = 1e-12;
      const dB = round2(10 * Math.log10(item.intensity / I0));
      
      return {
        id: item.id,
        difficulty,
        stage,
        intensity: item.intensity,
        value: dB,
        promptLatex: t.stages.decibel_prompt_latex,
        expressionLatex: `I=${item.intensity.toExponential(0)}\\;W/m^2,\\; I_0=10^{-12}\\;W/m^2`,
        targetLatex: "L",
        slots: [{ id: "L", labelLatex: "L", placeholder: "decibels", expected: dB, unit: "dB" }],
        correctLatex: `L=${dB}\\;dB`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // RICHTER
  const all = richterData.map((item) => {
    // M = log10(A)
    const magnitude = round2(Math.log10(item.amplitude));
    
    return {
      id: item.id,
      difficulty,
      stage,
      amplitude: item.amplitude,
      value: magnitude,
      promptLatex: t.stages.richter_prompt_latex,
      expressionLatex: `A=${item.amplitude}\\;\\mu m`,
      targetLatex: "M",
      slots: [{ id: "M", labelLatex: "M", placeholder: "magnitude", expected: magnitude }],
      correctLatex: `M=${magnitude}`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
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
