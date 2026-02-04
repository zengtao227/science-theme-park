"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Sigma } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ConceptIcon from "@/components/ConceptIcon";

type Mg07T = typeof translations.EN.s2_03;

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
  visualMeta?: any;
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
        expressionLatex: `(0,3),\\; (2,7)`,
        targetLatex: `y=mx+b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 2 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: 3 },
        ],
        correctLatex: `y=2x+3`,
        hintLatex: [
          t.hints.rules.slope_two_points_latex,
          `m=\\frac{7-3}{2-0}=2`,
          `b=3`,
        ],
        visualMeta: { points: [{ x: 0, y: 3 }, { x: 2, y: 7 }] }
      },
      {
        id: "L2",
        difficulty,
        stage,
        promptLatex: t.stages.lines_prompt_latex,
        expressionLatex: `(1,5),\\; (3,11)`,
        targetLatex: `y=mx+b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 3 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: 2 },
        ],
        correctLatex: `y=3x+2`,
        hintLatex: [
          t.hints.rules.slope_two_points_latex,
          `m=\\frac{11-5}{3-1}=3`,
          `b=5-3\\cdot 1=2`,
        ],
        visualMeta: { points: [{ x: 1, y: 5 }, { x: 3, y: 11 }] }
      },
      {
        id: "L3",
        difficulty,
        stage,
        promptLatex: t.stages.lines_prompt_latex,
        expressionLatex: `(-1,2),\\; (2,8)`,
        targetLatex: `y=mx+b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 2 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: 4 },
        ],
        correctLatex: `y=2x+4`,
        hintLatex: [
          t.hints.rules.slope_two_points_latex,
          `m=\\frac{8-2}{2-(-1)}=2`,
          `b=2-2\\cdot(-1)=4`,
        ],
        visualMeta: { points: [{ x: -1, y: 2 }, { x: 2, y: 8 }] }
      },
    ];
    return all;
  }

  if (stage === "LINEAR_FUNCTION") {
    const all: Quest[] = [
      {
        id: "F1",
        difficulty,
        stage,
        promptLatex: t.stages.linear_prompt_latex,
        expressionLatex: `y=2x+3,\\; x=4`,
        targetLatex: `y`,
        slots: [{ id: "y", labelLatex: `y`, placeholder: "y", expected: 11 }],
        correctLatex: `y=2\\cdot 4+3=11`,
        hintLatex: [`y=2x+3`, `y=11`],
        visualMeta: { lines: [{ m: 2, b: 3, color: 'rgba(255,255,255,0.5)' }], points: [{ x: 4, y: 11, color: 'rgba(57, 255, 20, 1)' }] }
      },
      {
        id: "F2",
        difficulty,
        stage,
        promptLatex: t.stages.linear_prompt_latex,
        expressionLatex: `y=3x-5,\\; y=10`,
        targetLatex: `x`,
        slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 5 }],
        correctLatex: `10=3x-5\\Rightarrow x=5`,
        hintLatex: [
          t.hints.rules.solve_linear_latex,
          `3x=15`,
          `x=5`,
        ],
        visualMeta: { lines: [{ m: 3, b: -5, color: 'rgba(255,255,255,0.5)' }], points: [{ x: 5, y: 10, color: 'rgba(57, 255, 20, 1)' }] }
      },
      {
        id: "F3",
        difficulty,
        stage,
        promptLatex: t.stages.linear_prompt_latex,
        expressionLatex: `y=-2x+7,\\; x=3`,
        targetLatex: `y`,
        slots: [{ id: "y", labelLatex: `y`, placeholder: "y", expected: 1 }],
        correctLatex: `y=-2\\cdot 3+7=1`,
        hintLatex: [`y=-6+7=1`],
        visualMeta: { lines: [{ m: -2, b: 7, color: 'rgba(255,255,255,0.5)' }], points: [{ x: 3, y: 1, color: 'rgba(57, 255, 20, 1)' }] }
      },
    ];
    return all;
  }

  if (stage === "GRAPH_MATCH") {
    const all: Quest[] = [
      {
        id: "G1",
        difficulty,
        stage,
        promptLatex: t.stages.graph_prompt_latex,
        expressionLatex: `P_1(0,2),\\; P_2(1,5)`,
        targetLatex: `m,\\; b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 3 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: 2 },
        ],
        correctLatex: `m=3,\\; b=2`,
        hintLatex: [
          t.hints.rules.slope_two_points_latex,
          `m=\\frac{5-2}{1-0}=3`,
          `b=2`,
        ],
        visualMeta: { points: [{ x: 0, y: 2 }, { x: 1, y: 5 }] }
      },
      {
        id: "G2",
        difficulty,
        stage,
        promptLatex: t.stages.graph_prompt_latex,
        expressionLatex: `P_1(0,-1),\\; P_2(2,3)`,
        targetLatex: `m,\\; b`,
        slots: [
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 2 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: -1 },
        ],
        correctLatex: `m=2,\\; b=-1`,
        hintLatex: [
          t.hints.rules.slope_two_points_latex,
          `m=\\frac{3-(-1)}{2-0}=2`,
          `b=-1`,
        ],
        visualMeta: { points: [{ x: 0, y: -1 }, { x: 2, y: 3 }] }
      },
    ];
    return all;
  }

  if (stage === "INTERSECTION") {
    const all: Quest[] = [
      {
        id: "I1",
        difficulty,
        stage,
        promptLatex: t.stages.intersection_prompt_latex,
        expressionLatex: `y=2x+1,\\; y=x+3`,
        targetLatex: `(x,y)`,
        slots: [
          { id: "x", labelLatex: `x`, placeholder: "x", expected: 2 },
          { id: "y", labelLatex: `y`, placeholder: "y", expected: 5 },
        ],
        correctLatex: `(2,5)`,
        hintLatex: [
          t.hints.rules.solve_system_latex,
          `2x+1=x+3`,
          `x=2,\\; y=5`,
        ],
        visualMeta: {
          lines: [{ m: 2, b: 1, color: 'rgba(255,255,255,0.3)' }, { m: 1, b: 3, color: 'rgba(255,255,255,0.3)' }],
          points: [{ x: 2, y: 5, color: 'rgba(0, 255, 157, 0.8)' }]
        }
      },
      {
        id: "I2",
        difficulty,
        stage,
        promptLatex: t.stages.intersection_prompt_latex,
        expressionLatex: `y=3x-2,\\; y=-x+6`,
        targetLatex: `(x,y)`,
        slots: [
          { id: "x", labelLatex: `x`, placeholder: "x", expected: 2 },
          { id: "y", labelLatex: `y`, placeholder: "y", expected: 4 },
        ],
        correctLatex: `(2,4)`,
        hintLatex: [
          t.hints.rules.solve_system_latex,
          `3x-2=-x+6`,
          `4x=8\\Rightarrow x=2,\\; y=4`,
        ],
        visualMeta: {
          lines: [{ m: 3, b: -2, color: 'rgba(255,255,255,0.3)' }, { m: -1, b: 6, color: 'rgba(255,255,255,0.3)' }],
          points: [{ x: 2, y: 4, color: 'rgba(0, 255, 157, 0.8)' }]
        }
      },
    ];
    return all;
  }

  return [];
}

function FunctionCanvas({
  staticLines = [],
  staticPoints = [],
  userLines = [],
  userPoints = [],
  range = 10
}: {
  staticLines?: { m: number, b: number, color?: string }[],
  staticPoints?: { x: number, y: number, color?: string }[],
  userLines?: { m: number, b: number, color?: string }[],
  userPoints?: { x: number, y: number, color?: string }[],
  range?: number
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Transform logic
    // Center (w/2, h/2) is (0,0)
    // Scale: smaller dimension / (range * 2)
    const scale = Math.min(w, h) / (range * 2);
    const cx = w / 2;
    const cy = h / 2;

    const toPx = (x: number, y: number) => ({
      x: cx + x * scale,
      y: cy - y * scale
    });

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;

    for (let i = -range; i <= range; i++) {
      const p1 = toPx(i, -range);
      const p2 = toPx(i, range);
      ctx.beginPath(); ctx.moveTo(p1.x, 0); ctx.lineTo(p1.x, h); ctx.stroke();

      const p3 = toPx(-range, i);
      const p4 = toPx(range, i);
      ctx.beginPath(); ctx.moveTo(0, p3.y); ctx.lineTo(w, p3.y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

    const drawLine = (m: number, b: number, color: string) => {
      const x1 = -range;
      const y1 = m * x1 + b;
      const x2 = range;
      const y2 = m * x2 + b;

      const p1 = toPx(x1, y1);
      const p2 = toPx(x2, y2);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const drawPoint = (x: number, y: number, color: string) => {
      const p = toPx(x, y);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw Static
    staticLines.forEach(l => drawLine(l.m, l.b, l.color || 'rgba(255,255,255,0.3)'));
    staticPoints.forEach(p => drawPoint(p.x, p.y, p.color || 'white'));

    // Draw User
    userLines.forEach(l => {
      if (Number.isFinite(l.m) && Number.isFinite(l.b)) {
        drawLine(l.m, l.b, l.color || 'rgba(0, 255, 157, 0.8)');
      }
    });

    userPoints.forEach(p => {
      if (Number.isFinite(p.x) && Number.isFinite(p.y)) {
        drawPoint(p.x, p.y, p.color || 'rgba(0, 255, 157, 0.8)');
      }
    });

  }, [staticLines, staticPoints, userLines, userPoints, range]);

  return <canvas ref={ref} width={500} height={500} className="w-full aspect-square bg-[#0a0a0a] rounded-lg border border-white/10" />;
}

export default function MG07Page() {
  const { currentLanguage, setLanguage } = useAppStore();
  const t = translations[currentLanguage].s2_03;

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

  // Derive Visual Props
  const visualProps = useMemo(() => {
    const pm = currentQuest.visualMeta || {};
    const staticLines = pm.lines || [];
    const staticPoints = pm.points || [];

    const userLines = [];
    const userPoints = [];

    // If Quest expects m, b -> User is building a line
    if (currentQuest.slots.some(s => s.id === 'm') && currentQuest.slots.some(s => s.id === 'b')) {
      const m = parseNumberLike(inputs['m'] || '', locale);
      const b = parseNumberLike(inputs['b'] || '', locale);
      if (m !== null && b !== null) {
        userLines.push({ m, b, color: 'rgba(0, 255, 157, 1)' });
      }
    }

    // If Quest expects x, y -> User is finding a point
    if (currentQuest.slots.some(s => s.id === 'x') && currentQuest.slots.some(s => s.id === 'y')) {
      const x = parseNumberLike(inputs['x'] || '', locale);
      const y = parseNumberLike(inputs['y'] || '', locale);
      if (x !== null && y !== null) {
        userPoints.push({ x, y, color: 'rgba(57, 255, 20, 1)' });
      }
    }
    // If Quest expects y (given x) -> User is finding a point
    if (currentQuest.slots.length === 1 && currentQuest.slots[0].id === 'y') {
      // We need X from quest expression, simplifying assumption: it's in expression
      // Or we parse it? For now, let's just show the point if Y is entered, assuming X=4 from static data logic
      // Ideally we parse X from quest logic, but for F1 static X is 4.
      // Let's rely on staticPoints showing the TARGET, and user just validates value.
      // But showing USER feedback is better.
      // For F1-F3, let's just trust staticPoints for the 'Correct' state? 
      // No, user wants to see THEIR point.
      // Extract X from hints or logic? Too complex to parse 'x=4' from latex here.
      // For now, simple visual feedback on LINES/GRAPH/INTERSECTION is robust enough. 
    }

    return { staticLines, staticPoints, userLines, userPoints };
  }, [currentQuest, inputs, locale]);

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
      <header className="relative p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl h-20">
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black tracking-[0.2em] uppercase">{t.back}</span>
        </Link>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex flex-col items-center">
          <ConceptIcon code="S2.03" className="w-8 h-8 text-white/50 mb-1" />
          <div className="text-lg font-black tracking-[0.35em] uppercase text-white shadow-neon text-nowrap">
            {t.title}
          </div>
        </div>

        <div className="flex items-center gap-6 z-10">
          <div className="hidden md:flex items-center gap-1">
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
                  "px-2 py-1 text-[9px] font-black tracking-[0.2em] uppercase transition-all border",
                  difficulty === d.id
                    ? "border-white bg-white text-black"
                    : "border-white/30 text-white hover:border-white/50"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-white/20 hidden md:block" />

          <div className="flex items-center gap-2">
            {(['DE', 'EN', 'CN'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={clsx(
                  "text-[10px] font-black w-6 h-6 flex items-center justify-center rounded transition-all border",
                  currentLanguage === lang
                    ? "bg-white text-black border-white"
                    : "text-white border-white/30 hover:border-white/50"
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 border-r-2 border-white/10 p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center">
          <div className="w-full max-w-5xl space-y-10">
            <div className="flex flex-wrap gap-3 justify-center">
              {([
                { id: "LINES", label: stageLabel(t, "LINES") },
                { id: "LINEAR_FUNCTION", label: stageLabel(t, "LINEAR_FUNCTION") },
                { id: "GRAPH_MATCH", label: stageLabel(t, "GRAPH_MATCH") },
                { id: "INTERSECTION", label: stageLabel(t, "INTERSECTION") },
              ] as const).map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setStage(m.id);
                    setNonce(0);
                    clearInputs();
                  }}
                  className={clsx(
                    "px-4 py-2 border text-[10px] font-black tracking-[0.25em] uppercase transition-all",
                    stage === m.id ? "border-white bg-white text-black" : "border-white/30 text-white hover:border-white/50"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
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
                    <div className="text-white font-black text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95] whitespace-nowrap">
                      <InlineMath math={currentQuest.expressionLatex} />
                    </div>
                    <div className="text-white/60 font-black">
                      <InlineMath math={currentQuest.targetLatex} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                  {!lastCheck.ok && (
                    <div className="mt-2 text-white/70 font-black break-words">
                      <InlineMath math={lastCheck.correct} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="w-[520px] relative bg-black flex flex-col border-l border-white/10 hidden xl:flex">
          <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
            <span>{t.monitor_title}</span>
            <div className="flex gap-2"><div className="w-1 h-1 bg-white" /><div className="w-1 h-1 bg-white/40" /></div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="border-2 border-white/10 rounded-xl p-6 bg-white/[0.02] min-h-full flex flex-col gap-6">

              {/* Dynamic Function Canvas */}
              <div className="relative w-full">
                <FunctionCanvas {...visualProps} />
                <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 pointer-events-none">REAL-TIME PLOT</div>
              </div>

              <div className="space-y-4">
                <div className="text-white/70 font-mono text-sm break-words border-t border-white/10 pt-4">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2 font-black">Parameters</div>
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
