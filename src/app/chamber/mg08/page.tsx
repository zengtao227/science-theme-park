"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Sigma } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg08T = typeof translations.EN.mg08;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Stage = "SCALE_FACTOR" | "SIMILAR_TRIANGLES" | "MISSION";

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
  visual?: { kind: "rect-scale" | "tri-sim" | "shadow"; a: number; b: number; k?: number };
};

function parseNumberLike(s: string, locale: "DE" | "EN" | "CN") {
  const raw = s.trim();
  if (!raw) return null;
  const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
  const v = Number(normalized);
  return Number.isFinite(v) ? v : null;
}

function stageLabel(t: Mg08T, stage: Stage) {
  if (stage === "SCALE_FACTOR") return t.stages.scale_factor;
  if (stage === "SIMILAR_TRIANGLES") return t.stages.similar_triangles;
  return t.mission?.title || t.stages.application;
}

function buildStagePool(t: Mg08T, difficulty: Difficulty, stage: Stage): Quest[] {
  if (stage === "SCALE_FACTOR") {
    const all: Quest[] = [
      {
        id: "S1",
        difficulty,
        stage,
        promptLatex: t.stages.stages_prompt_latex,
        expressionLatex: `\\text{Old}=4,\\; k=\\frac{3}{2}`,
        targetLatex: `\\text{New}`,
        slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 6 }],
        correctLatex: `\\text{New}=4\\cdot \\frac{3}{2}=6`,
        hintLatex: [
          t.hints.rules.scale_factor_latex,
          `\\text{New}=k\\cdot \\text{Old}`,
          `6`,
        ],
        visual: { kind: "rect-scale", a: 4, b: 2, k: 1.5 },
      },
      {
        id: "S2",
        difficulty,
        stage,
        promptLatex: t.stages.stages_prompt_latex,
        expressionLatex: `\\text{Old}=8,\\; \\text{New}=12`,
        targetLatex: `k`,
        slots: [{ id: "k", labelLatex: `k`, placeholder: "k", expected: 1.5 }],
        correctLatex: `k=\\frac{12}{8}=\\frac{3}{2}=1.5`,
        hintLatex: [
          t.hints.rules.scale_factor_latex,
          `k=\\frac{\\text{New}}{\\text{Old}}`,
          `k=\\frac{3}{2}`,
        ],
        visual: { kind: "rect-scale", a: 8, b: 3, k: 1.5 },
      },
      {
        id: "S3",
        difficulty,
        stage,
        promptLatex: t.stages.stages_prompt_latex,
        expressionLatex: `\\text{Old}=5,\\; k=0.8`,
        targetLatex: `\\text{New}`,
        slots: [{ id: "n", labelLatex: `\\text{New}`, placeholder: "value", expected: 4 }],
        correctLatex: `\\text{New}=5\\cdot 0.8=4`,
        hintLatex: [`\\text{Multiply by }k.`, `4`],
        visual: { kind: "rect-scale", a: 5, b: 2, k: 0.8 },
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 1);
    if (difficulty === "CORE") return all.slice(0, 2);
    return all;
  }

  if (stage === "SIMILAR_TRIANGLES") {
    const all: Quest[] = [
      {
        id: "T1",
        difficulty,
        stage,
        promptLatex: t.stages.stages_prompt_latex,
        expressionLatex: `\\frac{6}{3}=\\frac{x}{4}=\\frac{10}{5}`,
        targetLatex: `x`,
        slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 8 }],
        correctLatex: `k=2\\Rightarrow x=2\\cdot 4=8`,
        hintLatex: [
          t.hints.rules.proportional_latex,
          t.hints.rules.cross_multiply_latex,
          `x=8`,
        ],
        visual: { kind: "tri-sim", a: 4, b: 8, k: 2 },
      },
      {
        id: "T2",
        difficulty,
        stage,
        promptLatex: t.stages.stages_prompt_latex,
        expressionLatex: `\\frac{15}{5}=\\frac{x}{7}`,
        targetLatex: `x`,
        slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 21 }],
        correctLatex: `x=7\\cdot 3=21`,
        hintLatex: [
          t.hints.rules.proportional_latex,
          `\\frac{15}{5}=3`,
          `x=21`,
        ],
        visual: { kind: "tri-sim", a: 7, b: 21, k: 3 },
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 1);
    return all;
  }

  if (stage === "MISSION") {
    const all: Quest[] = [
      {
        id: "M1",
        difficulty,
        stage,
        promptLatex: `\\text{${t.mission?.description}}`,
        expressionLatex: `\\text{Tower Shadow}=12\\text{ m},\\; \\text{Stick}(1.5\\text{ m})\\text{ Shadow}=2.4\\text{ m}`,
        targetLatex: `\\text{Tower Height}(H)`,
        slots: [{ id: "h", labelLatex: `H`, placeholder: "H", expected: 7.5 }],
        correctLatex: `\\frac{H}{12}=\\frac{1.5}{2.4}\\Rightarrow H=7.5`,
        hintLatex: [
          t.hints.rules.proportional_latex,
          `\\frac{H}{12}=0.625`,
          `H=7.5`,
        ],
        visual: { kind: "shadow", a: 7.5, b: 12, k: 0.625 },
      },
    ];
    return all;
  }

  return [];
}

function Visual({ v, t }: { v: Quest["visual"]; t: Mg08T }) {
  if (!v) return null;

  if (v.kind === "rect-scale") {
    const w1 = 160;
    const h1 = 80;
    const w2 = Math.max(60, Math.min(280, w1 * (v.k ?? 1)));
    const h2 = Math.max(40, Math.min(200, h1 * (v.k ?? 1)));
    return (
      <div className="w-full flex justify-center p-4">
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] border border-white/10 bg-black rounded-xl overflow-visible">
          <rect x={40} y={80} width={w1} height={h1} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
          <rect x={260} y={120 - h2 / 2} width={w2} height={h2} fill="rgba(255,255,255,0.06)" stroke="rgba(120,255,220,0.7)" />
          <text x={40 + w1 / 2} y={70} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace" fontWeight="bold">
            OLD
          </text>
          <text x={260 + w2 / 2} y={70} textAnchor="middle" fill="rgba(120,255,220,0.8)" fontSize="12" fontFamily="monospace" fontWeight="bold">
            NEW
          </text>
        </svg>
      </div>
    );
  }

  if (v.kind === "tri-sim") {
    return (
      <div className="w-full flex justify-center">
        <svg width={420} height={220} className="border border-white/10 bg-black rounded-xl">
          <polygon points="70,170 160,170 70,80" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
          <polygon points="250,180 380,180 250,40" fill="rgba(255,255,255,0.06)" stroke="rgba(180,120,255,0.8)" />
          <text x="115" y="195" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">
            small
          </text>
          <text x="315" y="205" textAnchor="middle" fill="rgba(180,120,255,0.8)" fontSize="10" fontFamily="monospace">
            large
          </text>
        </svg>
      </div>
    );
  }

  if (v.kind === "shadow") {
    return (
      <div className="w-full flex justify-center p-4">
        <svg viewBox="0 0 600 240" className="w-full max-w-[600px] border border-white/10 bg-black rounded-xl overflow-visible shadow-2xl">
          {/* Sky */}
          <rect x="0" y="0" width="600" height="200" fill="rgba(255,255,255,0.02)" />
          {/* Ground */}
          <rect x="0" y="200" width="600" height="40" fill="rgba(255,255,255,0.08)" />

          {/* Sun */}
          <circle cx="550" cy="40" r="15" fill="#fbbf24" className="animate-pulse" />
          <line x1="550" y1="40" x2="350" y2="200" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <line x1="550" y1="40" x2="150" y2="200" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

          {/* Clock Tower (Zurich Style Spire) */}
          <g transform="translate(100, 200)">
            {/* Tower Shadow */}
            <rect x="0" y="0" width="200" height="4" fill="rgba(255,255,255,0.2)" />
            {/* Tower Body */}
            <rect x="-40" y="-140" width="40" height="140" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="2" />
            <rect x="-40" y="-160" width="40" height="20" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" />
            <path d="M-40,-160 L-20,-190 L0,-160 Z" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="-20" cy="-145" r="5" fill="none" stroke="white" strokeWidth="1" />

            <text x="-40" y="-200" fill="white" fontSize="10" fontFamily="monospace" fontWeight="black" textAnchor="middle">{t.mission?.labels.tower || "TOWER"}</text>
            <text x="100" y="20" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" textAnchor="middle">{t.mission?.labels.tower_shadow || "SHADOW"}: 12m</text>
          </g>

          {/* Stick */}
          <g transform="translate(450, 200)">
            {/* Stick Shadow */}
            <rect x="0" y="0" width="40" height="4" fill="rgba(251,191,36,0.3)" />
            <line x1="0" y1="0" x2="0" y2="-25" stroke="#fbbf24" strokeWidth="4" />
            <text x="0" y="-40" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="black" textAnchor="middle">{t.mission?.labels.stick || "STICK"}: 1.5m</text>
            <text x="20" y="20" fill="rgba(251,191,36,0.8)" fontSize="9" fontFamily="monospace" textAnchor="middle">{t.mission?.labels.stick_shadow || "SHADOW"}: 2.4m</text>
          </g>

          {/* Similar Triangle Visualization */}
          <path d="M60,200 L100,200 L60,60 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
          <path d="M450,200 L490,200 L450,175 Z" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.3)" strokeDasharray="2 2" />
        </svg>
      </div>
    );
  }

  return null;
}

export default function MG08Page() {
  const { currentLanguage, setLanguage } = useAppStore();
  const t = translations[currentLanguage].mg08;

  const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
  const [stage, setStage] = useState<Stage>("SCALE_FACTOR");
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
      <header className="relative p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl h-20">
        {/* Left: Back */}
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black tracking-[0.2em] uppercase">{t.back}</span>
        </Link>

        {/* Center: Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-lg font-black tracking-[0.35em] uppercase text-white shadow-neon text-nowrap">
            {t.title}
          </div>
        </div>

        {/* Right: Difficulty & Language */}
        <div className="flex items-center gap-6 z-10">
          {/* Difficulty Tabs */}
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

          {/* Language Switcher */}
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
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {([
                { id: "SCALE_FACTOR", label: stageLabel(t, "SCALE_FACTOR") },
                { id: "SIMILAR_TRIANGLES", label: stageLabel(t, "SIMILAR_TRIANGLES") },
                { id: "MISSION", label: stageLabel(t, "MISSION") },
              ] as const).map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setStage(s.id);
                    setNonce(0);
                    clearInputs();
                  }}
                  className={clsx(
                    "px-4 py-2 border-2 text-[10px] font-black tracking-[0.35em] uppercase transition-all relative overflow-hidden",
                    stage === s.id
                      ? (s.id === 'MISSION' ? "border-amber-400 text-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.2)]" : "border-white bg-white text-black")
                      : (s.id === 'MISSION' ? "border-amber-600/40 text-amber-500/70 hover:border-amber-500 hover:text-amber-500" : "border-white/30 text-white hover:border-white/50")
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
                  <div className="text-white font-black text-[clamp(1.2rem,3.8vw,3.3rem)] leading-[0.95] whitespace-nowrap">
                    <InlineMath math={currentQuest.expressionLatex} />
                  </div>
                  <div className="text-white/60 font-black">
                    <InlineMath math={currentQuest.targetLatex} />
                  </div>
                </div>
              </div>
            </div>

            {currentQuest.visual && (
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                <Visual v={currentQuest.visual} t={t} />
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
                  <div className={clsx("text-xs font-black tracking-[0.4em] uppercase mb-2", lastCheck.ok ? "text-neon-green" : "text-orange-500")}>
                    {lastCheck.ok ? t.correct : t.incorrect}
                  </div>
                  {!lastCheck.ok && (
                    <div className="flex justify-center items-center gap-2 text-white/90 text-sm bg-white/5 py-3 px-4 rounded border border-white/10">
                      <span className="text-white/50 text-[10px] uppercase tracking-widest mr-2">CORRECT:</span>
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
                  {difficulty}{" // "}MG08{" // "}{stageName}
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
