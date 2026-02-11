"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ThermalCanvas from "@/components/chamber/sp2-01/ThermalCanvas";

type Stage = "HEAT_CAPACITY" | "PHASE_CHANGE" | "MIXED";
type P201T = typeof translations.EN.sp2_01;

interface P201Quest extends Quest {
  stage: Stage;
  mass?: number;
  specificHeat?: number;
  deltaT?: number;
  latentHeat?: number;
  temperature?: number;
  phase?: "solid" | "liquid" | "gas";
}

const round1 = (v: number) => Math.round(v * 10) / 10;

// Specific heat capacities (J/kg·K)
const c_water = 4186;
const c_ice = 2100;
const c_aluminum = 900;
const c_copper = 385;

// Latent heats (J/kg)
const L_fusion = 334000; // ice to water
const L_vaporization = 2260000; // water to steam

const heatCapacityData = [
  { id: "H1", mass: 2, specificHeat: c_water, deltaT: 20 },
  { id: "H2", mass: 0.5, specificHeat: c_aluminum, deltaT: 50 },
  { id: "H3", mass: 1.5, specificHeat: c_water, deltaT: 30 },
  { id: "H4", mass: 0.3, specificHeat: c_copper, deltaT: 100 },
  { id: "H5", mass: 5, specificHeat: c_water, deltaT: 15 },
  { id: "H6", mass: 1, specificHeat: c_ice, deltaT: 10 },
  { id: "H7", mass: 0.8, specificHeat: c_aluminum, deltaT: 75 },
];

const phaseChangeData = [
  { id: "P1", mass: 0.5, latentHeat: L_fusion, phase: "melting" },
  { id: "P2", mass: 0.2, latentHeat: L_vaporization, phase: "boiling" },
  { id: "P3", mass: 1, latentHeat: L_fusion, phase: "melting" },
  { id: "P4", mass: 0.1, latentHeat: L_vaporization, phase: "boiling" },
  { id: "P5", mass: 2, latentHeat: L_fusion, phase: "melting" },
  { id: "P6", mass: 0.05, latentHeat: L_vaporization, phase: "boiling" },
  { id: "P7", mass: 1.5, latentHeat: L_fusion, phase: "melting" },
];

const mixedData = [
  { id: "M1", mass: 1, specificHeat: c_ice, deltaT: 10, latentHeat: L_fusion },
  { id: "M2", mass: 0.5, specificHeat: c_water, deltaT: 100, latentHeat: L_vaporization },
  { id: "M3", mass: 2, specificHeat: c_ice, deltaT: 20, latentHeat: L_fusion },
  { id: "M4", mass: 0.3, specificHeat: c_water, deltaT: 50, latentHeat: L_vaporization },
];

function buildStagePool(t: P201T, difficulty: Difficulty, stage: Stage): P201Quest[] {
  if (stage === "HEAT_CAPACITY") {
    const all = heatCapacityData.map((item) => {
      const Q = round1((item.mass * item.specificHeat * item.deltaT) / 1000); // in kJ
      return {
        id: item.id,
        difficulty,
        stage,
        mass: item.mass,
        specificHeat: item.specificHeat,
        deltaT: item.deltaT,
        temperature: 25,
        phase: "liquid" as const,
        promptLatex: t.stages.heat_capacity_prompt_latex,
        expressionLatex: `m=${item.mass}\\;kg,\\; c=${item.specificHeat}\\;J/(kg\\cdot K),\\; \\Delta T=${item.deltaT}\\;K`,
        targetLatex: "Q",
        slots: [{ id: "Q", labelLatex: "Q", placeholder: "heat", expected: Q, unit: "kJ" }],
        correctLatex: `Q=${Q}\\;kJ`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "PHASE_CHANGE") {
    const all = phaseChangeData.map((item) => {
      const Q = round1((item.mass * item.latentHeat) / 1000); // in kJ
      return {
        id: item.id,
        difficulty,
        stage,
        mass: item.mass,
        latentHeat: item.latentHeat,
        temperature: item.phase === "melting" ? 0 : 100,
        phase: item.phase === "melting" ? ("solid" as const) : ("liquid" as const),
        promptLatex: t.stages.phase_change_prompt_latex,
        expressionLatex: `m=${item.mass}\\;kg,\\; L=${item.latentHeat / 1000}\\;kJ/kg`,
        targetLatex: "Q",
        slots: [{ id: "Q", labelLatex: "Q", placeholder: "heat", expected: Q, unit: "kJ" }],
        correctLatex: `Q=${Q}\\;kJ`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // MIXED
  const all = mixedData.map((item) => {
    const Q1 = (item.mass * item.specificHeat * item.deltaT) / 1000;
    const Q2 = (item.mass * item.latentHeat) / 1000;
    const Q_total = round1(Q1 + Q2);
    return {
      id: item.id,
      difficulty,
      stage,
      mass: item.mass,
      specificHeat: item.specificHeat,
      deltaT: item.deltaT,
      latentHeat: item.latentHeat,
      temperature: item.specificHeat === c_ice ? -10 : 50,
      phase: item.specificHeat === c_ice ? ("solid" as const) : ("liquid" as const),
      promptLatex: t.stages.mixed_prompt_latex,
      expressionLatex: `m=${item.mass}\\;kg,\\; c=${item.specificHeat}\\;J/(kg\\cdot K),\\; \\Delta T=${item.deltaT}\\;K,\\; L=${item.latentHeat / 1000}\\;kJ/kg`,
      targetLatex: "Q_{\\text{total}}",
      slots: [{ id: "Q", labelLatex: "Q_{\\text{total}}", placeholder: "total heat", expected: Q_total, unit: "kJ" }],
      correctLatex: `Q_{\\text{total}}=${Q_total}\\;kJ`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 3);
  return all;
}

export default function P201Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sp2_01;

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
  } = useQuestManager<P201Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "HEAT_CAPACITY",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp2-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SP2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "HEAT_CAPACITY", label: t.stages.heat_capacity },
        { id: "PHASE_CHANGE", label: t.stages.phase_change },
        { id: "MIXED", label: t.stages.mixed },
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
          <ThermalCanvas
            temperature={currentQuest?.temperature || 25}
            phase={currentQuest?.phase || "liquid"}
            mass={currentQuest?.mass || 1}
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
          <p className="text-3xl text-white font-black italic whitespace-normal break-words">
            {(() => {
              const latex = currentQuest?.promptLatex || "";
              if (latex.includes("\\text{")) {
                return <span className="font-sans not-italic whitespace-pre-wrap">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ")}</span>;
              }
              return <InlineMath math={latex} />;
            })()}
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
              ? "Tipp: Gib das Resultat auf 1 Dezimalstelle gerundet an."
              : currentLanguage === 'CN'
                ? "提示：保留 1 位小数。"
                : "Tip: Enter result rounded to 1 decimal place."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
