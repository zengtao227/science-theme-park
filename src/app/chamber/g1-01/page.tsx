"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import G101_DerivativeCanvas from "@/components/chamber/g1-01/DerivativeCanvas";

type Stage = "EXPLORE" | "SLOPE" | "TANGENT" | "RATE" | "ELITE";
type G101T = typeof translations.EN.g1_01;

interface G101Quest extends Quest {
  stage: Stage;
  type?: string;
  x1?: number; y1?: number; x2?: number; y2?: number; correctSlope?: number;
  x0?: number; y0?: number; func?: string;
  targetSlope?: number; correctX?: number;
}

function buildStagePool(t: G101T, difficulty: Difficulty, stage: Stage): G101Quest[] {
  if (stage === "SLOPE") {
    const all: G101Quest[] = [
      {
        id: "Q1", difficulty, stage, type: 'SLOPE',
        promptLatex: `\\text{Calculate secant slope between } A(1,1) \\text{ and } B(3,9) \\text{ on } y=x^2.`,
        expressionLatex: `A(1,1), B(3,9)`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: 4 }],
        correctLatex: `m = \\frac{9-1}{3-1} = 4`,
        x1: 1, y1: 1, x2: 3, y2: 9, correctSlope: 4
      },
      {
        id: "Q2", difficulty, stage, type: 'SLOPE',
        promptLatex: `\\text{Calculate secant slope between } A(0,0) \\text{ and } B(2,4) \\text{ on } y=x^2.`,
        expressionLatex: `A(0,0), B(2,4)`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: 2 }],
        correctLatex: `m = \\frac{4-0}{2-0} = 2`,
        x1: 0, y1: 0, x2: 2, y2: 4, correctSlope: 2
      },
      {
        id: "Q3", difficulty, stage, type: 'SLOPE',
        promptLatex: `\\text{Calculate secant slope between } A(-1,1) \\text{ and } B(2,4) \\text{ on } y=x^2.`,
        expressionLatex: `A(-1,1), B(2,4)`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: 1 }],
        correctLatex: `m = \\frac{4-1}{2-(-1)} = 1`,
        x1: -1, y1: 1, x2: 2, y2: 4, correctSlope: 1
      }
    ];
    return all;
  }

  if (stage === "TANGENT") {
    const all: G101Quest[] = [
      {
        id: "T1", difficulty, stage, type: 'TANGENT',
        promptLatex: `\\text{Find tangent slope of } y=x^2 \\text{ at } x=1.`,
        expressionLatex: `f'(x) = 2x, \\; x=1`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: 2 }],
        correctLatex: `m = f'(1) = 2(1) = 2`,
        x0: 1, y0: 1, func: 'x2', correctSlope: 2
      },
      {
        id: "T2", difficulty, stage, type: 'TANGENT',
        promptLatex: `\\text{Find tangent slope of } y=x^2 \\text{ at } x=2.`,
        expressionLatex: `f'(x) = 2x, \\; x=2`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: 4 }],
        correctLatex: `m = f'(2) = 2(2) = 4`,
        x0: 2, y0: 4, func: 'x2', correctSlope: 4
      },
      {
        id: "T3", difficulty, stage, type: 'TANGENT',
        promptLatex: `\\text{Find tangent slope of } y=2x^2 \\text{ at } x=1.5.`,
        expressionLatex: `f'(x) = 4x, \\; x=1.5`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: 6 }],
        correctLatex: `m = f'(1.5) = 4(1.5) = 6`,
        x0: 1.5, y0: 4.5, func: '2x2', correctSlope: 6
      }
    ];
    return all;
  }

  if (stage === "RATE") {
    const all: G101Quest[] = [
      {
        id: "R1", difficulty, stage, type: 'TANGENT',
        promptLatex: `\\text{Derivative of } f(x) = x^3 \\text{ is } f'(x) = 3x^2. \\text{ Find slope at } x=1.`,
        expressionLatex: `f'(1) = 3(1)^2`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: 3 }],
        correctLatex: `f'(1) = 3`,
        x0: 1, y0: 1, func: 'x3', correctSlope: 3
      },
      {
        id: "R2", difficulty, stage, type: 'TANGENT',
        promptLatex: `\\text{Derivative of } f(x) = x^3 \\text{ is } f'(x) = 3x^2. \\text{ Find slope at } x=2.`,
        expressionLatex: `f'(2) = 3(2)^2`,
        targetLatex: `m`,
        slots: [{ id: "m", labelLatex: "m", placeholder: "slope", expected: 12 }],
        correctLatex: `f'(2) = 12`,
        x0: 2, y0: 8, func: 'x3', correctSlope: 12
      }
    ];
    return all;
  }

  if (stage === "ELITE") {
    const all: G101Quest[] = [
      {
        id: "E1", difficulty, stage, type: 'TANGENT',
        promptLatex: `\\text{Find } x \\text{ where tangent of } y=x^2 \\text{ has slope } m=6.`,
        expressionLatex: `2x = 6`,
        targetLatex: `x`,
        slots: [{ id: "x", labelLatex: "x", placeholder: "x-value", expected: 3 }],
        correctLatex: `2x = 6 \\implies x = 3`,
        x0: 3, y0: 9, func: 'x2', correctSlope: 6
      },
      {
        id: "E2", difficulty, stage, type: 'TANGENT',
        promptLatex: `\\text{Find } x \\text{ where tangent of } y=x^2 \\text{ has slope } m=-2.`,
        expressionLatex: `2x = -2`,
        targetLatex: `x`,
        slots: [{ id: "x", labelLatex: "x", placeholder: "x-value", expected: -1 }],
        correctLatex: `2x = -2 \\implies x = -1`,
        x0: -1, y0: 1, func: 'x2', correctSlope: -2
      }
    ];
    return all;
  }

  return [];
}

export default function G101Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].g1_01;

  const [exploreX, setExploreX] = useState(1);

  const {
    difficulty, stage, inputs, lastCheck, currentQuest,
    setInputs, verify, next, handleDifficultyChange, handleStageChange,
  } = useQuestManager<G101Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "EXPLORE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("g1-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="G1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "EXPLORE", label: t.tabs.explore },
        { id: "SLOPE", label: t.tabs.slope },
        { id: "TANGENT", label: t.tabs.tangent },
        { id: "RATE", label: t.tabs.rate },
        { id: "ELITE", label: t.tabs.elite },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: t.difficulty,
      }}
      monitorContent={
        <G101_DerivativeCanvas
          mode={stage}
          exploreX={exploreX}
          _onExploreXChange={setExploreX}
          questData={currentQuest}
        />
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">{t.spotlight.title}</div>
            <div className="text-lg font-black text-white">{t.spotlight.euler_name}</div>
            <p className="text-xs text-white/60 font-mono leading-relaxed">{t.spotlight.euler_bio}</p>
          </div>
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">{t.spotlight.title}</div>
            <div className="text-lg font-black text-white">{t.spotlight.bernoulli_name}</div>
            <p className="text-xs text-white/60 font-mono leading-relaxed">{t.spotlight.bernoulli_bio}</p>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-2xl text-white font-black italic">
            {stage === 'EXPLORE' ? t.explore_instruction : <InlineMath math={currentQuest?.promptLatex || ""} />}
          </p>
        </div>

        {stage !== 'EXPLORE' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="grid grid-cols-1 gap-6">
                {currentQuest?.slots.map((slot) => (
                  <div key={slot.id} className="space-y-2">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                      <InlineMath math={slot.labelLatex} />
                    </div>
                    <input
                      value={inputs[slot.id] ?? ""}
                      onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Derivative Matrix HUD */}
            <div className="p-6 bg-neon-purple/5 border border-neon-purple/20 rounded-2xl space-y-4">
              <h4 className="text-[10px] text-neon-purple font-black tracking-widest uppercase">Derivative Matrix</h4>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/40">Power Rule:</span>
                  <span className="text-white"><InlineMath math="\frac{d}{dx}x^n = nx^{n-1}" /></span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/40">Constant:</span>
                  <span className="text-white"><InlineMath math="\frac{d}{dx}c = 0" /></span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/40">Scale:</span>
                  <span className="text-white"><InlineMath math="\frac{d}{dx}cf(x) = cf'(x)" /></span>
                </div>
              </div>

              {/* Scientist Spotlight Side Card */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-lg">🖋️</div>
                  <div>
                    <div className="text-[9px] text-white/30 uppercase tracking-widest font-black">{t.spotlight.title}</div>
                    <div className="text-[11px] text-white font-black uppercase tracking-tight">{t.spotlight.euler_name}</div>
                  </div>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed italic">
                  {t.spotlight.euler_bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
