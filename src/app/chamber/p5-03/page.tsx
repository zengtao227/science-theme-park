"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LhcCanvas from "@/components/chamber/p5-03/LhcCanvas";

type Stage = "CONSTANT_B" | "VARYING_V" | "MASS_SPEC";
type P503T = typeof translations.EN.p5_03;

interface P503Quest extends Quest {
  stage: Stage;
  velocity?: number; // m/s
  mass?: number; // kg
  charge?: number; // C
  targetRadius?: number; // m
  magneticField?: number; // T
}

const round3 = (v: number) => Math.round(v * 1000) / 1000;

// Physical constants
const PROTON_MASS = 1.67e-27; // kg
const ELECTRON_MASS = 9.11e-31; // kg
const ELEMENTARY_CHARGE = 1.6e-19; // C

// Stage 1: Constant B, varying particles
const constantBData = [
  { id: "B1", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 3e6, targetRadius: 5 },
  { id: "B2", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 5e6, targetRadius: 5 },
  { id: "B3", mass: ELECTRON_MASS, charge: -ELEMENTARY_CHARGE, velocity: 2e7, targetRadius: 5 },
  { id: "B4", mass: ELECTRON_MASS, charge: -ELEMENTARY_CHARGE, velocity: 3e7, targetRadius: 5 },
  { id: "B5", mass: 2 * PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 4e6, targetRadius: 5 },
  { id: "B6", mass: 4 * PROTON_MASS, charge: 2 * ELEMENTARY_CHARGE, velocity: 6e6, targetRadius: 5 },
  { id: "B7", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 1e7, targetRadius: 5 },
];

// Stage 2: Varying velocity
const varyingVData = [
  { id: "V1", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 2e6, B: 0.5 },
  { id: "V2", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 4e6, B: 0.5 },
  { id: "V3", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 6e6, B: 0.5 },
  { id: "V4", mass: ELECTRON_MASS, charge: -ELEMENTARY_CHARGE, velocity: 1e7, B: 0.3 },
  { id: "V5", mass: ELECTRON_MASS, charge: -ELEMENTARY_CHARGE, velocity: 2e7, B: 0.3 },
  { id: "V6", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 8e6, B: 0.6 },
  { id: "V7", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 1e7, B: 0.7 },
];

// Stage 3: Mass spectrometry
const massSpecData = [
  { id: "M1", mass: PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 5e6, B: 0.5 },
  { id: "M2", mass: 2 * PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 5e6, B: 0.5 },
  { id: "M3", mass: 4 * PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 5e6, B: 0.5 },
  { id: "M4", mass: ELECTRON_MASS, charge: -ELEMENTARY_CHARGE, velocity: 2e7, B: 0.4 },
  { id: "M5", mass: 3 * PROTON_MASS, charge: ELEMENTARY_CHARGE, velocity: 6e6, B: 0.6 },
  { id: "M6", mass: 4 * PROTON_MASS, charge: 2 * ELEMENTARY_CHARGE, velocity: 7e6, B: 0.7 },
  { id: "M7", mass: 6 * PROTON_MASS, charge: 2 * ELEMENTARY_CHARGE, velocity: 8e6, B: 0.8 },
];

function buildStagePool(t: P503T, difficulty: Difficulty, stage: Stage): P503Quest[] {
  if (stage === "CONSTANT_B") {
    const all = constantBData.map((item) => {
      // B = mv/(qR)
      const B = (item.mass * item.velocity) / (Math.abs(item.charge) * item.targetRadius);
      const B_sci = B.toExponential(2);
      
      return {
        id: item.id,
        difficulty,
        stage,
        velocity: item.velocity,
        mass: item.mass,
        charge: item.charge,
        targetRadius: item.targetRadius,
        promptLatex: t.stages.constant_b_prompt_latex,
        expressionLatex: `m=${item.mass.toExponential(2)}\\;kg,\\; v=${(item.velocity / 1e6).toFixed(0)}\\times10^6\\;m/s,\\; R=${item.targetRadius}\\;m`,
        targetLatex: "B",
        slots: [{ id: "B", labelLatex: "B", placeholder: "magnetic field", expected: parseFloat(B_sci), unit: "T" }],
        correctLatex: `B=${B_sci}\\;T`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "VARYING_V") {
    const all = varyingVData.map((item) => {
      // r = mv/(qB)
      const r = (item.mass * item.velocity) / (Math.abs(item.charge) * item.B);
      const r_rounded = round3(r);
      
      return {
        id: item.id,
        difficulty,
        stage,
        velocity: item.velocity,
        mass: item.mass,
        charge: item.charge,
        magneticField: item.B,
        promptLatex: t.stages.varying_v_prompt_latex,
        expressionLatex: `m=${item.mass.toExponential(2)}\\;kg,\\; v=${(item.velocity / 1e6).toFixed(0)}\\times10^6\\;m/s,\\; B=${item.B}\\;T`,
        targetLatex: "r",
        slots: [{ id: "r", labelLatex: "r", placeholder: "radius", expected: r_rounded, unit: "m" }],
        correctLatex: `r=${r_rounded}\\;m`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // MASS_SPEC
  const all = massSpecData.map((item) => {
    // r = mv/(qB), solve for m: m = rqB/v
    const r = (item.mass * item.velocity) / (Math.abs(item.charge) * item.B);
    const r_rounded = round3(r);
    const m_sci = item.mass.toExponential(2);
    
    return {
      id: item.id,
      difficulty,
      stage,
      velocity: item.velocity,
      mass: item.mass,
      charge: item.charge,
      magneticField: item.B,
      promptLatex: t.stages.mass_spec_prompt_latex,
      expressionLatex: `r=${r_rounded}\\;m,\\; v=${(item.velocity / 1e6).toFixed(0)}\\times10^6\\;m/s,\\; B=${item.B}\\;T`,
      targetLatex: "m",
      slots: [{ id: "m", labelLatex: "m", placeholder: "mass", expected: parseFloat(m_sci), unit: "kg" }],
      correctLatex: `m=${m_sci}\\;kg`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
}

export default function P503Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].p5_03;

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
  } = useQuestManager<P503Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "CONSTANT_B",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("p5-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="P5.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "CONSTANT_B", label: t.stages.constant_b },
        { id: "VARYING_V", label: t.stages.varying_v },
        { id: "MASS_SPEC", label: t.stages.mass_spec },
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
          <LhcCanvas
            stage={stage}
            magneticField={currentQuest?.magneticField || 1}
            velocity={currentQuest?.velocity || 1e7}
            mass={currentQuest?.mass || PROTON_MASS}
            charge={currentQuest?.charge || ELEMENTARY_CHARGE}
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
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
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
          <div className="text-[10px] text-white/40 font-mono italic text-center">
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat in wissenschaftlicher Notation an (z.B. 1.23e-5)."
              : currentLanguage === 'CN'
                ? "提示：使用科学计数法（如 1.23e-5）。"
                : "Tip: Enter result in scientific notation (e.g. 1.23e-5)."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
