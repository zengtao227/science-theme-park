"use client";

import { useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S203_FunctionCanvas from "@/components/chamber/S203_FunctionCanvas";

type Mg07T = typeof translations.EN.s2_03;
type Stage = "LINES" | "LINEAR_FUNCTION" | "GRAPH_MATCH" | "INTERSECTION";

interface S203Quest extends Quest {
  stage: Stage;
  visualMeta?: any;
}

function buildStagePool(t: Mg07T, difficulty: Difficulty, stage: Stage): S203Quest[] {
  if (stage === "LINES") {
    return [
      {
        id: "L1", difficulty, stage,
        promptLatex: t.stages.lines_prompt_latex,
        expressionLatex: `(0,3),\\; (2,7)`,
        targetLatex: `y=mx+b`,
        slots: [{ id: "m", labelLatex: `m`, placeholder: "m", expected: 2 }, { id: "b", labelLatex: `b`, placeholder: "b", expected: 3 }],
        correctLatex: `y=2x+3`,
        hintLatex: [t.hints.rules.slope_two_points_latex, `m=\\frac{7-3}{2-0}=2`, `b=3`],
        visualMeta: { points: [{ x: 0, y: 3 }, { x: 2, y: 7 }] }
      }
    ];
  }
  if (stage === "LINEAR_FUNCTION") {
    return [
      {
        id: "F1", difficulty, stage,
        promptLatex: t.stages.linear_prompt_latex,
        expressionLatex: `y=2x+3,\\; x=4`,
        targetLatex: `y`,
        slots: [{ id: "y", labelLatex: `y`, placeholder: "y", expected: 11 }],
        correctLatex: `y=2\\cdot 4+3=11`,
        hintLatex: [`y=2x+3`, `y=11`],
        visualMeta: { lines: [{ m: 2, b: 3, color: 'rgba(255,255,255,0.2)' }], points: [{ x: 4, y: 11, color: 'rgba(57, 255, 20, 1)' }] }
      }
    ];
  }
  // Simplified for demo, the prompt for AI will handle the rest
  return [
    {
      id: "G1", difficulty, stage: "GRAPH_MATCH",
      promptLatex: t.stages.graph_prompt_latex,
      expressionLatex: `P_1(0,2),\\; P_2(1,5)`,
      targetLatex: `m,\\; b`,
      slots: [{ id: "m", labelLatex: `m`, placeholder: "m", expected: 3 }, { id: "b", labelLatex: `b`, placeholder: "b", expected: 2 }],
      correctLatex: `m=3,\\; b=2`,
      visualMeta: { points: [{ x: 0, y: 2 }, { x: 1, y: 5 }] }
    }
  ];
}

export default function S203Page() {
  const { currentLanguage } = useAppStore();
  const t = (translations as any)[currentLanguage].s2_03;

  const {
    difficulty, stage, inputs, lastCheck, currentQuest,
    setInputs, verify, next, handleDifficultyChange, handleStageChange,
  } = useQuestManager<S203Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "LINES",
  });

  const locale = currentLanguage === "DE" ? "DE" : "EN";

  const parseNumber = (s: string) => {
    const raw = s.trim();
    if (!raw) return null;
    const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
    return Number.isFinite(Number(normalized)) ? Number(normalized) : null;
  };

  const visualProps = useMemo(() => {
    const pm = currentQuest?.visualMeta || {};
    const staticLines = pm.lines || [];
    const staticPoints = pm.points || [];
    const userLines = [];
    const userPoints = [];

    const m = parseNumber(inputs['m'] || '');
    const b = parseNumber(inputs['b'] || '');
    if (m !== null && b !== null) userLines.push({ m, b });

    const x = parseNumber(inputs['x'] || '');
    const y = parseNumber(inputs['y'] || '');
    if (x !== null && y !== null) userPoints.push({ x, y });

    return { staticLines, staticPoints, userLines, userPoints };
  }, [currentQuest, inputs, locale]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="S2.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "LINES", label: t.stages.lines },
        { id: "LINEAR_FUNCTION", label: t.stages.linear_function },
        { id: "GRAPH_MATCH", label: t.stages.graph_match },
        { id: "INTERSECTION", label: t.stages.intersection },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: t.back, check: t.check, next: t.next, correct: t.correct, incorrect: t.incorrect,
        ready: t.ready, monitor_title: t.monitor_title,
        difficulty: { basic: t.difficulty.basic, core: t.difficulty.core, advanced: t.difficulty.advanced, elite: t.difficulty.elite },
      }}
      monitorContent={
        <>
          <S203_FunctionCanvas {...visualProps} />
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
            <div className="text-white font-black text-xl overflow-x-auto py-1">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
            <div className="text-white/70 font-mono text-sm">
              <InlineMath math={currentQuest?.promptLatex || ""} />
            </div>
          </div>
        </>
      }
    >
      <div className="space-y-10">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-2xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <input
                  value={inputs[slot.id] ?? ""}
                  onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                  className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                  placeholder={slot.placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
