"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Calculator, Sigma } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg07T = typeof translations.EN.mg07;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Stage = "LINES" | "LINEAR_FUNCTION" | "GRAPH_MATCH" | "INTERSECTION";

type Slot = {
  id: string;
  labelLatex: string;
  placeholder: string;
  expected: number;
};

type Quest = {
  id: string;
  difficulty: Difficulty;
  stage: Stage;
  promptLatex: string;
  expressionLatex: string;
  targetLatex: string;
  slots: Slot[];
  correctLatex: string;
  hintLatex?: string[];
  plot?: { m: number; b: number; domain: { minX: number; maxX: number; minY: number; maxY: number } };
};

function parseNumberLike(s: string, locale: "DE" | "EN" | "CN") {
  const raw = s.trim();
  if (!raw) return null;
  const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
  const v = Number(normalized);
  return Number.isFinite(v) ? v : null;
}

function stageLabel(t: Mg07T, stage: Stage) {
  if (stage === "LINES") return t.stages.lines;
  if (stage === "LINEAR_FUNCTION") return t.stages.linear_function;
  if (stage === "GRAPH_MATCH") return t.stages.graph_match;
  return t.stages.intersection;
}

function buildStagePool(t: Mg07T, difficulty: Difficulty, stage: Stage): Quest[] {
  if (stage === "LINES") {
    const all: Quest[] = [
      {
        id: "L1",
        difficulty,
        stage,
        promptLatex: t.stages.lines_prompt_latex,
        expressionLatex: `A(0,2),\\;B(4,6)`,
        targetLatex: `y=mx+b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 1 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: 2 },
        ],
        correctLatex: `y=x+2`,
        hintLatex: [
          t.hints.rules.slope_two_points_latex,
          `m=\\frac{6-2}{4-0}=1`,
          `b=2`,
        ],
      },
      {
        id: "L2",
        difficulty,
        stage,
        promptLatex: t.stages.lines_prompt_latex,
        expressionLatex: `A(-2,3),\\;B(2,1)`,
        targetLatex: `y=mx+b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: -0.5 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: 2 },
        ],
        correctLatex: `y=-\\frac{1}{2}x+2`,
        hintLatex: [
          t.hints.rules.slope_two_points_latex,
          `m=\\frac{1-3}{2-(-2)}=-\\frac{2}{4}=-\\frac{1}{2}`,
          `b=2`,
        ],
      },
      {
        id: "L3",
        difficulty,
        stage,
        promptLatex: t.stages.lines_prompt_latex,
        expressionLatex: `m=3,\\;P(1,-2)`,
        targetLatex: `y=mx+b`,
        slots: [{ id: "b", labelLatex: `b`, placeholder: "b", expected: -5 }],
        correctLatex: `y=3x-5`,
        hintLatex: [
          `-2=3\\cdot 1+b`,
          `b=-5`,
        ],
      },
      {
        id: "L4",
        difficulty,
        stage,
        promptLatex: t.stages.lines_prompt_latex,
        expressionLatex: `m=0,\\;P(-3,4)`,
        targetLatex: `y=b`,
        slots: [{ id: "b", labelLatex: `b`, placeholder: "b", expected: 4 }],
        correctLatex: `y=4`,
        hintLatex: [`\\text{Horizontal line: }m=0`, `y=4`],
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 2);
    if (difficulty === "CORE") return all.slice(0, 3);
    return all;
  }

  if (stage === "LINEAR_FUNCTION") {
    const all: Quest[] = [
      {
        id: "F1",
        difficulty,
        stage,
        promptLatex: t.stages.linear_prompt_latex,
        expressionLatex: `f(x)=2x-3,\\; x=4`,
        targetLatex: `f(4)`,
        slots: [{ id: "y", labelLatex: `f(4)`, placeholder: "value", expected: 5 }],
        correctLatex: `f(4)=2\\cdot 4-3=5`,
        hintLatex: [`f(4)=2\\cdot 4-3`, `f(4)=5`],
      },
      {
        id: "F2",
        difficulty,
        stage,
        promptLatex: t.stages.linear_prompt_latex,
        expressionLatex: `y=-\\frac{1}{2}x+2,\\; y=0`,
        targetLatex: `x`,
        slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 4 }],
        correctLatex: `0=-\\frac{1}{2}x+2\\Rightarrow x=4`,
        hintLatex: [
          t.hints.rules.solve_linear_latex,
          `0=-\\frac{1}{2}x+2`,
          `x=4`,
        ],
      },
      {
        id: "F3",
        difficulty,
        stage,
        promptLatex: t.stages.linear_prompt_latex,
        expressionLatex: `y=3x+b,\\; (x,y)=(2,1)`,
        targetLatex: `b`,
        slots: [{ id: "b", labelLatex: `b`, placeholder: "b", expected: -5 }],
        correctLatex: `1=3\\cdot 2+b\\Rightarrow b=-5`,
        hintLatex: [`1=6+b`, `b=-5`],
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 1);
    if (difficulty === "CORE") return all.slice(0, 2);
    return all;
  }

  if (stage === "GRAPH_MATCH") {
    const all: Quest[] = [
      {
        id: "G1",
        difficulty,
        stage,
        promptLatex: t.stages.graph_prompt_latex,
        expressionLatex: `\\text{Graph }y=mx+b`,
        targetLatex: `m,\\; b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 1 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: -1 },
        ],
        correctLatex: `y=x-1`,
        hintLatex: [
          `\\text{Look at }b: \\text{ where the line crosses the y-axis.}`,
          `\\text{Use rise/run for }m.`,
          `m=1,\\; b=-1`,
        ],
        plot: { m: 1, b: -1, domain: { minX: -5, maxX: 5, minY: -5, maxY: 5 } },
      },
      {
        id: "G2",
        difficulty,
        stage,
        promptLatex: t.stages.graph_prompt_latex,
        expressionLatex: `\\text{Graph }y=mx+b`,
        targetLatex: `m,\\; b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: -2 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: 3 },
        ],
        correctLatex: `y=-2x+3`,
        hintLatex: [
          `b=3`,
          `\\text{Down }2\\text{ when right }1`,
          `m=-2`,
        ],
        plot: { m: -2, b: 3, domain: { minX: -4, maxX: 4, minY: -5, maxY: 5 } },
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 1);
    return all;
  }

  const all: Quest[] = [
    {
      id: "I1",
      difficulty,
      stage,
      promptLatex: t.stages.intersection_prompt_latex,
      expressionLatex: `\\begin{cases}y=x+1\\\\y=-x+5\\end{cases}`,
      targetLatex: `(x,y)`,
      slots: [
        { id: "x", labelLatex: `x`, placeholder: "x", expected: 2 },
        { id: "y", labelLatex: `y`, placeholder: "y", expected: 3 },
      ],
      correctLatex: `(2,3)`,
      hintLatex: [
        t.hints.rules.solve_system_latex,
        `x+1=-x+5`,
        `x=2,\\; y=3`,
      ],
    },
    {
      id: "I2",
      difficulty,
      stage,
      promptLatex: t.stages.intersection_prompt_latex,
      expressionLatex: `\\begin{cases}y=2x-1\\\\y=\\frac{1}{2}x+2\\end{cases}`,
      targetLatex: `(x,y)`,
      slots: [
        { id: "x", labelLatex: `x`, placeholder: "x", expected: 2 },
        { id: "y", labelLatex: `y`, placeholder: "y", expected: 3 },
      ],
      correctLatex: `(2,3)`,
      hintLatex: [
        t.hints.rules.solve_system_latex,
        `2x-1=\\frac{1}{2}x+2`,
        `x=2,\\; y=3`,
      ],
    },
  ];

  if (difficulty === "BASIC") return all.slice(0, 1);
  if (difficulty === "CORE") return all.slice(0, 1);
  return all;
}

function LinePlot({ m, b, domain }: { m: number; b: number; domain: { minX: number; maxX: number; minY: number; maxY: number } }) {
  const width = 420;
  const height = 260;

  const toSvg = (x: number, y: number) => {
    const sx = ((x - domain.minX) / (domain.maxX - domain.minX)) * width;
    const sy = height - ((y - domain.minY) / (domain.maxY - domain.minY)) * height;
    return { sx, sy };
  };

  const x1 = domain.minX;
  const x2 = domain.maxX;
  const y1 = m * x1 + b;
  const y2 = m * x2 + b;
  const p1 = toSvg(x1, y1);
  const p2 = toSvg(x2, y2);

  const axisX = toSvg(0, domain.minY).sx;
  const axisY = toSvg(domain.minX, 0).sy;

  const ticksX = [];
  for (let x = Math.ceil(domain.minX); x <= Math.floor(domain.maxX); x++) ticksX.push(x);
  const ticksY = [];
  for (let y = Math.ceil(domain.minY); y <= Math.floor(domain.maxY); y++) ticksY.push(y);

  return (
    <div className="w-full flex justify-center">
      <svg width={width} height={height} className="border border-white/10 bg-black rounded-xl">
        {ticksX.map((x) => {
          const { sx } = toSvg(x, 0);
          return <line key={`gx-${x}`} x1={sx} y1={0} x2={sx} y2={height} stroke="rgba(255,255,255,0.06)" />;
        })}
        {ticksY.map((y) => {
          const { sy } = toSvg(0, y);
          return <line key={`gy-${y}`} x1={0} y1={sy} x2={width} y2={sy} stroke="rgba(255,255,255,0.06)" />;
        })}
        <line x1={axisX} y1={0} x2={axisX} y2={height} stroke="rgba(255,255,255,0.18)" />
        <line x1={0} y1={axisY} x2={width} y2={axisY} stroke="rgba(255,255,255,0.18)" />
        <line x1={p1.sx} y1={p1.sy} x2={p2.sx} y2={p2.sy} stroke="rgba(180,120,255,0.95)" strokeWidth={3} />
      </svg>
    </div>
  );
}

export default function MG07Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].mg07;

  const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
  const [stage, setStage] = useState<Stage>("LINES");
  const [nonce, setNonce] = useState(0);

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correct: string }>(null);

  const locale = currentLanguage === "DE" ? "DE" : currentLanguage === "CN" ? "CN" : "EN";

  const pool = useMemo(() => buildStagePool(t, difficulty, stage), [difficulty, stage, t]);
  const currentQuest = useMemo(() => {
    const sorted = [...pool].sort((a, b) => a.id.localeCompare(b.id));
    return sorted[nonce % Math.max(1, sorted.length)];
  }, [nonce, pool]);

  const clearInputs = () => {
    setInputs({});
    setLastCheck(null);
  };

  const next = () => {
    clearInputs();
    setNonce((v) => v + 1);
  };

  const verify = () => {
    for (const slot of currentQuest.slots) {
      const raw = inputs[slot.id] ?? "";
      const v = parseNumberLike(raw, locale);
      if (v === null || v !== slot.expected) {
        setLastCheck({ ok: false, correct: currentQuest.correctLatex });
        return;
      }
    }
    setLastCheck({ ok: true, correct: currentQuest.correctLatex });
  };

  const stageName = stageLabel(t, stage);

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
      <header className="p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl">
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">{t.back}</span>
        </Link>
        <div className="text-[10px] font-black tracking-[0.35em] uppercase text-white/80">{t.title}</div>
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-white/40" />
          {([
            { id: "BASIC", label: t.difficulty.basic },
            { id: "CORE", label: t.difficulty.core },
            { id: "ADVANCED", label: t.difficulty.advanced },
            { id: "ELITE", label: t.difficulty.elite },
          ] as const).map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setDifficulty(d.id);
                setNonce(0);
                clearInputs();
              }}
              className={clsx(
                "px-3 py-1.5 border-2 text-[9px] font-black tracking-[0.3em] uppercase transition-all",
                difficulty === d.id ? "border-white text-white bg-white/10" : "border-white/30 text-white/50 hover:border-white hover:text-white"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {([
                { id: "LINES", label: stageLabel(t, "LINES") },
                { id: "LINEAR_FUNCTION", label: stageLabel(t, "LINEAR_FUNCTION") },
                { id: "GRAPH_MATCH", label: stageLabel(t, "GRAPH_MATCH") },
                { id: "INTERSECTION", label: stageLabel(t, "INTERSECTION") },
              ] as const).map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setStage(s.id);
                    setNonce(0);
                    clearInputs();
                  }}
                  className={clsx(
                    "px-4 py-2 border-2 text-[10px] font-black tracking-[0.35em] uppercase transition-all",
                    stage === s.id ? "border-white bg-white/10" : "border-white/20 text-white/60 hover:border-white hover:text-white"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
              <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
                <InlineMath math={currentQuest.promptLatex} />
              </p>
            </div>

            <div className="flex justify-center overflow-x-auto w-full">
              <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t.target_title}</span>
                <div className="space-y-4">
                  <div className="text-white font-black text-[clamp(1.4rem,4.4vw,4.2rem)] leading-[0.95] whitespace-nowrap">
                    <InlineMath math={currentQuest.expressionLatex} />
                  </div>
                  <div className="text-white/60 font-black">
                    <InlineMath math={currentQuest.targetLatex} />
                  </div>
                </div>
              </div>
            </div>

            {currentQuest.plot && (
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                <LinePlot m={currentQuest.plot.m} b={currentQuest.plot.b} domain={currentQuest.plot.domain} />
              </div>
            )}

            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.labels.input}</div>
                <div className={clsx("grid gap-4", currentQuest.slots.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                  {currentQuest.slots.map((slot) => (
                    <div key={slot.id} className="space-y-2">
                      <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                        <InlineMath math={slot.labelLatex} />
                      </div>
                      <input
                        value={inputs[slot.id] ?? ""}
                        onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                        className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                        placeholder={slot.placeholder}
                        inputMode="numeric"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={verify}
                  className="px-6 py-3 border-2 border-white text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:bg-white hover:text-black"
                >
                  {t.check}
                </button>
                <button
                  onClick={next}
                  className="px-6 py-3 border-2 border-white/30 text-[10px] font-black tracking-[0.4em] uppercase transition-all hover:border-white hover:text-white"
                >
                  {t.next}
                </button>
              </div>

              {lastCheck && (
                <div className="mt-6 text-center">
                  <div className={clsx("text-[10px] font-black tracking-[0.4em] uppercase", lastCheck.ok ? "text-neon-green" : "text-orange-400")}>
                    {lastCheck.ok ? t.correct : t.incorrect}
                  </div>
                  {!lastCheck.ok && <div className="mt-2 text-white/70 font-black break-words">{lastCheck.correct}</div>}
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="w-[520px] relative bg-black flex flex-col border-l border-white/10">
          <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
            <span>{t.monitor_title}</span>
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-white" />
              <div className="w-1 h-1 bg-white/40" />
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="border-2 border-white/10 rounded-xl p-6 bg-white/[0.02] h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
                <div className="text-white font-black text-xl overflow-x-auto max-w-full py-1 whitespace-nowrap">
                  <span className="inline-block">
                    <InlineMath math={currentQuest.expressionLatex} />
                  </span>
                </div>
                <div className="text-white/70 font-mono text-sm break-words">
                  <InlineMath math={currentQuest.promptLatex} />
                </div>
                {currentQuest.hintLatex && currentQuest.hintLatex.length > 0 && (
                  <div className="space-y-2 text-white/50 font-black text-[10px] uppercase tracking-[0.25em]">
                    <div className="text-white/40">{t.labels.hints}</div>
                    {currentQuest.hintLatex.slice(0, 3).map((h, idx) => (
                      <div key={`${currentQuest.id}|h|${idx}`} className="flex gap-2 items-start">
                        <div className="text-white/30 w-6">{String(idx + 1).padStart(2, "0")}</div>
                        <div className="flex-1">
                          <InlineMath math={h} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">
                  {difficulty}{" // "}MG07{" // "}{stageName}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
        <span>{t.footer_left}</span>
        <span className="flex items-center gap-2">
          <Sigma className="w-3 h-3 text-white/50" />
          {lastCheck ? (lastCheck.ok ? t.correct : t.incorrect) : t.ready}
        </span>
      </footer>
    </div>
  );
}

