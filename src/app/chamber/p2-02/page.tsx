"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import P202CircuitCanvas from "@/components/chamber/P202_CircuitCanvas";

type Stage = "LOOP" | "RESISTANCE" | "SERIES" | "PARALLEL";

interface P202Quest extends Quest {
  stage: Stage;
  scenario: "simple" | "series" | "parallel" | "mixed";
  voltage: number;
  resistance: number[];
  current: number;
  isPowered: boolean;
}

function buildStagePool(difficulty: Difficulty, stage: Stage): P202Quest[] {
  const quests: P202Quest[] = [];
  
  // Stage 1: THE LOOP - Basic circuit understanding
  if (stage === "LOOP") {
    const voltages = difficulty === "BASIC" ? [3, 6, 9] : difficulty === "CORE" ? [6, 9, 12] : [9, 12, 15];
    const resistances = difficulty === "BASIC" ? [3, 6, 9] : difficulty === "CORE" ? [4, 8, 12] : [5, 10, 15];
    
    for (const V of voltages) {
      for (const R of resistances) {
        const I = V / R; // Ohm's Law: I = V/R
        
        quests.push({
          id: `LOOP|${difficulty}|${V}|${R}`,
          difficulty,
          stage,
          scenario: "simple",
          voltage: V,
          resistance: [R],
          current: I,
          isPowered: true,
          promptLatex: `\\text{Calculate current in circuit}\\\\V=${V}\\text{V},\\; R=${R}\\Omega`,
          expressionLatex: `I=\\frac{V}{R}`,
          targetLatex: `I`,
          correctLatex: `I=${I.toFixed(2)}\\text{ A}`,
          slots: [
            { id: "I", labelLatex: "I=\\frac{V}{R}", placeholder: "I (A)", expected: parseFloat(I.toFixed(2)) },
          ],
        });
      }
    }
    return quests;
  }

  // Stage 2: RESISTANCE - Calculate required resistance
  if (stage === "RESISTANCE") {
    const voltages = difficulty === "BASIC" ? [6, 9, 12] : difficulty === "CORE" ? [9, 12, 15] : [12, 15, 18];
    const currents = difficulty === "BASIC" ? [0.5, 1, 1.5] : difficulty === "CORE" ? [1, 1.5, 2] : [1.5, 2, 2.5];
    
    for (const V of voltages) {
      for (const I of currents) {
        const R = V / I; // R = V/I
        
        quests.push({
          id: `RESISTANCE|${difficulty}|${V}|${I}`,
          difficulty,
          stage,
          scenario: "simple",
          voltage: V,
          resistance: [R],
          current: I,
          isPowered: true,
          promptLatex: `\\text{Calculate required resistance}\\\\V=${V}\\text{V},\\; I=${I}\\text{A}`,
          expressionLatex: `R=\\frac{V}{I}`,
          targetLatex: `R`,
          correctLatex: `R=${R.toFixed(1)}\\Omega`,
          slots: [
            { id: "R", labelLatex: "R=\\frac{V}{I}", placeholder: "R (Ω)", expected: parseFloat(R.toFixed(1)) },
          ],
        });
      }
    }
    return quests;
  }

  // Stage 3: SERIES - Calculate total resistance in series
  if (stage === "SERIES") {
    const resistanceSets = difficulty === "BASIC" 
      ? [[2, 3], [3, 4], [4, 5]]
      : difficulty === "CORE"
      ? [[2, 3, 4], [3, 4, 5], [4, 5, 6]]
      : [[3, 4, 5, 6], [5, 6, 7, 8], [4, 6, 8, 10]];
    
    const voltages = difficulty === "BASIC" ? [9, 12] : difficulty === "CORE" ? [12, 15] : [15, 18];
    
    for (const V of voltages) {
      for (const resistances of resistanceSets) {
        const Rtotal = resistances.reduce((sum, r) => sum + r, 0);
        const I = V / Rtotal;
        
        quests.push({
          id: `SERIES|${difficulty}|${V}|${resistances.join('-')}`,
          difficulty,
          stage,
          scenario: "series",
          voltage: V,
          resistance: resistances,
          current: I,
          isPowered: true,
          promptLatex: `\\text{Series circuit: }R_1=${resistances[0]}\\Omega${resistances.slice(1).map((r, i) => `,\\; R_${i+2}=${r}\\Omega`).join('')}`,
          expressionLatex: `R_{total}=${resistances.map((_, i) => `R_${i+1}`).join('+')}`,
          targetLatex: `R_{total}`,
          correctLatex: `R_{total}=${Rtotal}\\Omega`,
          slots: [
            { id: "Rtotal", labelLatex: "R_{total}", placeholder: "R_total (Ω)", expected: Rtotal },
            { id: "I", labelLatex: "I=\\frac{V}{R_{total}}", placeholder: "I (A)", expected: parseFloat(I.toFixed(2)) },
          ],
        });
      }
    }
    return quests;
  }

  // Stage 4: PARALLEL - Calculate total resistance in parallel
  if (stage === "PARALLEL") {
    const resistanceSets = difficulty === "BASIC"
      ? [[6, 6], [4, 4], [3, 6]]
      : difficulty === "CORE"
      ? [[6, 6, 6], [4, 4, 4], [3, 6, 6]]
      : [[4, 4, 4, 4], [6, 6, 6, 6], [3, 6, 9, 18]];
    
    const voltages = difficulty === "BASIC" ? [6, 9] : difficulty === "CORE" ? [9, 12] : [12, 15];
    
    for (const V of voltages) {
      for (const resistances of resistanceSets) {
        // 1/Rtotal = 1/R1 + 1/R2 + ...
        const invRtotal = resistances.reduce((sum, r) => sum + 1/r, 0);
        const Rtotal = 1 / invRtotal;
        const I = V / Rtotal;
        
        quests.push({
          id: `PARALLEL|${difficulty}|${V}|${resistances.join('-')}`,
          difficulty,
          stage,
          scenario: "parallel",
          voltage: V,
          resistance: resistances,
          current: I,
          isPowered: true,
          promptLatex: `\\text{Parallel circuit: }R_1=${resistances[0]}\\Omega${resistances.slice(1).map((r, i) => `,\\; R_${i+2}=${r}\\Omega`).join('')}`,
          expressionLatex: `\\frac{1}{R_{total}}=${resistances.map((_, i) => `\\frac{1}{R_${i+1}}`).join('+')}`,
          targetLatex: `R_{total}`,
          correctLatex: `R_{total}=${Rtotal.toFixed(2)}\\Omega`,
          slots: [
            { id: "Rtotal", labelLatex: "R_{total}", placeholder: "R_total (Ω)", expected: parseFloat(Rtotal.toFixed(2)) },
            { id: "I", labelLatex: "I=\\frac{V}{R_{total}}", placeholder: "I (A)", expected: parseFloat(I.toFixed(2)) },
          ],
        });
      }
    }
    return quests;
  }

  return [];
}

export default function P202Page() {
  const { currentLanguage } = useAppStore();

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
  } = useQuestManager<P202Quest, Stage>({
    buildPool: (d, s) => buildStagePool(d, s),
    initialStage: "LOOP",
  });

  if (!currentQuest) return null;

  const stages = [
    { id: "LOOP", label: "The Loop" },
    { id: "RESISTANCE", label: "Resistance" },
    { id: "SERIES", label: "Series" },
    { id: "PARALLEL", label: "Parallel" },
  ];

  return (
    <ChamberLayout
      title="P2.02 // CIRCUIT SANDBOX"
      moduleCode="P2.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={next}
      translations={{
        back: "Back",
        check: "Verify",
        next: "Next",
        correct: "Correct",
        incorrect: "Incorrect",
        difficulty: {
          basic: "Basic",
          core: "Core",
          advanced: "Advanced",
          elite: "Elite",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <P202CircuitCanvas
            scenario={currentQuest.scenario}
            voltage={currentQuest.voltage}
            resistance={currentQuest.resistance}
            current={currentQuest.current}
            isPowered={currentQuest.isPowered && lastCheck?.ok === true}
            showCurrent={lastCheck?.ok === true}
          />
          <div className="text-white/50 text-xs font-mono text-center space-y-1">
            <div>Voltage: {currentQuest.voltage}V</div>
            <div>Resistance: {currentQuest.resistance.join(', ')}Ω</div>
            {lastCheck?.ok && <div className="text-neon-green">✓ Circuit Powered!</div>}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            Objective
          </h3>
          <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest.promptLatex} />
          </p>
        </div>

        <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
            Target
          </span>
          <div className="font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95]">
            <InlineMath math={currentQuest.targetLatex} />
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {currentQuest.slots.map((slot) => (
            <div key={slot.id} className="space-y-3">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                <InlineMath math={slot.labelLatex} />
              </div>
              <input
                value={inputs[slot.id] || ""}
                onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                placeholder={slot.placeholder}
                inputMode="decimal"
              />
            </div>
          ))}

          <div className="mt-6 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black mb-2">Formula</div>
            <div className="text-sm text-white/60 font-mono">
              <InlineMath math={currentQuest.expressionLatex} />
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
