"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ReactionCanvas from "@/components/chamber/c2-01/ReactionCanvas";

type Stage = "ARRHENIUS" | "CONCENTRATION" | "COLLISION";
type C201T = typeof translations.EN.c2_01;

interface C201Quest extends Quest {
  stage: Stage;
  temperature?: number; // K
  concentrationA?: number;
  concentrationB?: number;
  activationEnergy?: number; // kJ/mol
  preExponential?: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;
const R = 8.314; // J/(mol·K)

// Arrhenius data
const arrheniusData = [
  { id: "A1", temperature: 300, Ea: 50, A: 1e10 },
  { id: "A2", temperature: 350, Ea: 50, A: 1e10 },
  { id: "A3", temperature: 400, Ea: 50, A: 1e10 },
  { id: "A4", temperature: 300, Ea: 75, A: 1e10 },
  { id: "A5", temperature: 350, Ea: 75, A: 1e10 },
  { id: "A6", temperature: 300, Ea: 100, A: 1e10 },
  { id: "A7", temperature: 400, Ea: 100, A: 1e10 },
];

// Concentration data
const concentrationData = [
  { id: "C1", concA: 0.5, concB: 0.5, k: 0.01 },
  { id: "C2", concA: 1.0, concB: 0.5, k: 0.01 },
  { id: "C3", concA: 0.5, concB: 1.0, k: 0.01 },
  { id: "C4", concA: 1.0, concB: 1.0, k: 0.01 },
  { id: "C5", concA: 0.3, concB: 0.7, k: 0.02 },
  { id: "C6", concA: 0.8, concB: 0.4, k: 0.015 },
  { id: "C7", concA: 0.6, concB: 0.6, k: 0.012 },
];

// Collision data
const collisionData = [
  { id: "K1", temperature: 300, Ea: 50 },
  { id: "K2", temperature: 350, Ea: 60 },
  { id: "K3", temperature: 400, Ea: 70 },
  { id: "K4", temperature: 320, Ea: 55 },
  { id: "K5", temperature: 380, Ea: 65 },
  { id: "K6", temperature: 360, Ea: 58 },
  { id: "K7", temperature: 340, Ea: 62 },
];

function buildStagePool(t: C201T, difficulty: Difficulty, stage: Stage): C201Quest[] {
  if (stage === "ARRHENIUS") {
    const all = arrheniusData.map((item) => {
      // k = A * exp(-Ea/RT)
      const Ea_J = item.Ea * 1000; // kJ to J
      const k = item.A * Math.exp(-Ea_J / (R * item.temperature));
      const k_sci = k.toExponential(2);
      
      return {
        id: item.id,
        difficulty,
        stage,
        temperature: item.temperature,
        activationEnergy: item.Ea,
        preExponential: item.A,
        promptLatex: t.stages.arrhenius_prompt_latex,
        expressionLatex: `T=${item.temperature}\\;K,\\; E_a=${item.Ea}\\;kJ/mol,\\; A=${item.A.toExponential(0)}`,
        targetLatex: "k",
        slots: [{ id: "k", labelLatex: "k", placeholder: "rate constant", expected: parseFloat(k_sci), unit: "s^{-1}" }],
        correctLatex: `k=${k_sci}\\;s^{-1}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "CONCENTRATION") {
    const all = concentrationData.map((item) => {
      // rate = k[A][B]
      const rate = round2(item.k * item.concA * item.concB);
      
      return {
        id: item.id,
        difficulty,
        stage,
        concentrationA: item.concA,
        concentrationB: item.concB,
        promptLatex: t.stages.concentration_prompt_latex,
        expressionLatex: `[A]=${item.concA}\\;M,\\; [B]=${item.concB}\\;M,\\; k=${item.k}\\;M^{-1}s^{-1}`,
        targetLatex: "\\text{rate}",
        slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "reaction rate", expected: rate, unit: "M/s" }],
        correctLatex: `\\text{rate}=${rate}\\;M/s`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // COLLISION
  const all = collisionData.map((item) => {
    // Fraction of molecules with E >= Ea: f = exp(-Ea/RT)
    const Ea_J = item.Ea * 1000;
    const fraction = Math.exp(-Ea_J / (R * item.temperature));
    const percent = round2(fraction * 100);
    
    return {
      id: item.id,
      difficulty,
      stage,
      temperature: item.temperature,
      activationEnergy: item.Ea,
      promptLatex: t.stages.collision_prompt_latex,
      expressionLatex: `T=${item.temperature}\\;K,\\; E_a=${item.Ea}\\;kJ/mol`,
      targetLatex: "f",
      slots: [{ id: "f", labelLatex: "f", placeholder: "fraction", expected: percent, unit: "\\%" }],
      correctLatex: `f=${percent}\\%`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
}

export default function C201Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].c2_01;

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
  } = useQuestManager<C201Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "ARRHENIUS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("c2-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="C2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "ARRHENIUS", label: t.stages.arrhenius },
        { id: "CONCENTRATION", label: t.stages.concentration },
        { id: "COLLISION", label: t.stages.collision },
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
          <ReactionCanvas
            temperature={currentQuest?.temperature || 300}
            concentrationA={currentQuest?.concentrationA || 0.5}
            concentrationB={currentQuest?.concentrationB || 0.5}
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
