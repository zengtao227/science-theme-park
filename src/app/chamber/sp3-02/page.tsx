"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import WaveOpticsCanvas from "@/components/chamber/sp3-02/WaveOpticsCanvas";

type Stage = "INTERFERENCE" | "DIFFRACTION" | "POLARIZATION";
type P302T = typeof translations.EN.sp3_02;

interface P302Quest extends Quest {
  stage: Stage;
  wavelength?: number; // nm
  slitSeparation?: number; // μm
  slitWidth?: number; // μm
  angle?: number; // degrees
  order?: number; // m or n
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// Interference data (double-slit)
const interferenceData = [
  { id: "I1", wavelength: 550, slitSeparation: 50, order: 1 },
  { id: "I2", wavelength: 650, slitSeparation: 40, order: 2 },
  { id: "I3", wavelength: 450, slitSeparation: 60, order: 1 },
  { id: "I4", wavelength: 600, slitSeparation: 30, order: 3 },
  { id: "I5", wavelength: 500, slitSeparation: 45, order: 2 },
  { id: "I6", wavelength: 700, slitSeparation: 55, order: 1 },
  { id: "I7", wavelength: 480, slitSeparation: 35, order: 2 },
];

// Diffraction data (single-slit)
const diffractionData = [
  { id: "D1", wavelength: 550, slitWidth: 20, order: 1 },
  { id: "D2", wavelength: 650, slitWidth: 25, order: 1 },
  { id: "D3", wavelength: 450, slitWidth: 15, order: 2 },
  { id: "D4", wavelength: 600, slitWidth: 30, order: 1 },
  { id: "D5", wavelength: 500, slitWidth: 18, order: 2 },
  { id: "D6", wavelength: 700, slitWidth: 22, order: 1 },
  { id: "D7", wavelength: 480, slitWidth: 28, order: 2 },
];

// Polarization data (Malus' law)
const polarizationData = [
  { id: "P1", angle: 30 },
  { id: "P2", angle: 45 },
  { id: "P3", angle: 60 },
  { id: "P4", angle: 90 },
  { id: "P5", angle: 0 },
  { id: "P6", angle: 75 },
  { id: "P7", angle: 15 },
];

function buildStagePool(t: P302T, difficulty: Difficulty, stage: Stage): P302Quest[] {
  if (stage === "INTERFERENCE") {
    const all = interferenceData.map((item) => {
      // d sin(θ) = mλ => sin(θ) = mλ/d
      const lambda = item.wavelength / 1000; // nm to μm
      const d = item.slitSeparation;
      const m = item.order;
      const sinTheta = (m * lambda) / d;
      const theta = round2((Math.asin(sinTheta) * 180) / Math.PI);
      
      return {
        id: item.id,
        difficulty,
        stage,
        wavelength: item.wavelength,
        slitSeparation: item.slitSeparation,
        order: m,
        promptLatex: t.stages.interference_prompt_latex,
        expressionLatex: `\\lambda=${item.wavelength}\\;nm,\\; d=${item.slitSeparation}\\;\\mu m,\\; m=${m}`,
        targetLatex: "\\theta",
        slots: [{ id: "theta", labelLatex: "\\theta", placeholder: "angle", expected: theta, unit: "^\\circ" }],
        correctLatex: `\\theta=${theta}^\\circ`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "DIFFRACTION") {
    const all = diffractionData.map((item) => {
      // a sin(θ) = mλ => sin(θ) = mλ/a
      const lambda = item.wavelength / 1000; // nm to μm
      const a = item.slitWidth;
      const m = item.order;
      const sinTheta = (m * lambda) / a;
      const theta = round2((Math.asin(sinTheta) * 180) / Math.PI);
      
      return {
        id: item.id,
        difficulty,
        stage,
        wavelength: item.wavelength,
        slitWidth: item.slitWidth,
        order: m,
        promptLatex: t.stages.diffraction_prompt_latex,
        expressionLatex: `\\lambda=${item.wavelength}\\;nm,\\; a=${item.slitWidth}\\;\\mu m,\\; m=${m}`,
        targetLatex: "\\theta",
        slots: [{ id: "theta", labelLatex: "\\theta", placeholder: "angle", expected: theta, unit: "^\\circ" }],
        correctLatex: `\\theta=${theta}^\\circ`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // POLARIZATION
  const all = polarizationData.map((item) => {
    // Malus' law: I = I₀ cos²(θ)
    const intensity = round2(Math.pow(Math.cos((item.angle * Math.PI) / 180), 2) * 100);
    
    return {
      id: item.id,
      difficulty,
      stage,
      angle: item.angle,
      promptLatex: t.stages.polarization_prompt_latex,
      expressionLatex: `\\theta=${item.angle}^\\circ,\\; I_0=100\\%`,
      targetLatex: "I",
      slots: [{ id: "I", labelLatex: "I", placeholder: "intensity", expected: intensity, unit: "\\%" }],
      correctLatex: `I=${intensity}\\%`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
}

export default function P302Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sp3_02;

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
  } = useQuestManager<P302Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "INTERFERENCE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp3-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SP3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "INTERFERENCE", label: t.stages.interference },
        { id: "DIFFRACTION", label: t.stages.diffraction },
        { id: "POLARIZATION", label: t.stages.polarization },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
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
          <WaveOpticsCanvas
            stage={stage}
            wavelength={currentQuest?.wavelength || 550}
            slitSeparation={currentQuest?.slitSeparation || 50}
            slitWidth={currentQuest?.slitWidth || 20}
            angle={currentQuest?.angle || 0}
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
