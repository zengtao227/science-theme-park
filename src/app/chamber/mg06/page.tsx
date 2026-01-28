"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Calculator, Sigma } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg06T = typeof translations.EN.mg06;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Mode = "FACTOR" | "FORMULA" | "COMPLETE_SQUARE";

type QuestBase = {
  id: string;
  difficulty: Difficulty;
  mode: Mode;
  a: number;
  b: number;
  c: number;
  prompt: string;
  equationLatex: string;
};

type FactorQuest = QuestBase & {
  answerType: "factor";
  A: number;
  B: number;
};

type RootsQuest = QuestBase & {
  answerType: "roots";
  roots: [string, string];
};

type VertexQuest = QuestBase & {
  answerType: "vertex";
  h: string;
  k: string;
};

type Quest = FactorQuest | RootsQuest | VertexQuest;

function normalizeSignedTerm(n: number, latex: string) {
  if (n === 0) return "";
  if (n > 0) return `+${latex}`;
  return `-${latex}`;
}

function latexCoeff(n: number, variable: string) {
  if (n === 0) return "";
  if (n === 1) return variable;
  if (n === -1) return `-${variable}`;
  return `${n}${variable}`;
}

function equationLatex(a: number, b: number, c: number) {
  const ax2 = a === 1 ? "x^2" : `${a}x^2`;
  const bx = b === 0 ? "" : normalizeSignedTerm(b, latexCoeff(Math.abs(b), "x"));
  const cc = c === 0 ? "" : normalizeSignedTerm(c, `${Math.abs(c)}`);
  const lhs = `${ax2}${bx}${cc}`;
  return `${lhs}=0`;
}

function discriminant(a: number, b: number, c: number) {
  return b * b - 4 * a * c;
}

function toRootStringsInteger(r1: number, r2: number): [string, string] {
  const s1 = `${r1}`;
  const s2 = `${r2}`;
  return s1 <= s2 ? [s1, s2] : [s2, s1];
}

function parseNumberLike(s: string) {
  const v = Number(s.trim());
  return Number.isFinite(v) ? v : null;
}

function normalizeRootInput(s: string) {
  return s.trim().replace(/\s+/g, "");
}

function sortPair(a: string, b: string) {
  const x = a <= b ? [a, b] : [b, a];
  return x as [string, string];
}

function buildFactorQuests(t: Mg06T, difficulty: Difficulty): Quest[] {
  const factorPool =
    difficulty === "BASIC"
      ? [[1, 2], [2, 3], [-1, 2], [-2, 3], [-1, -3], [4, 1], [0, 3], [0, -4], [5, -1], [-4, -2]]
      : difficulty === "CORE"
        ? [[1, 5], [2, 6], [3, 4], [-2, 5], [-3, 4], [-1, 6], [-4, 3], [-5, 2], [7, 1], [-6, -1]]
        : difficulty === "ADVANCED"
          ? [[-7, 2], [-8, 3], [9, -1], [8, -2], [6, -3], [-9, -1], [7, -2], [5, -4], [-6, 4], [-8, -2]]
          : [[-9, 4], [9, -4], [-8, 5], [8, -5], [-7, 6], [7, -6], [-6, 6], [10, -1], [-10, 1], [11, -2]];

  const quests: Quest[] = [];
  for (const [A, B] of factorPool) {
    const a = 1;
    const b = A + B;
    const c = A * B;
    const id = `F|${difficulty}|${A}|${B}`;
    quests.push({
      id,
      difficulty,
      mode: "FACTOR",
      a,
      b,
      c,
      prompt: t.modes.factor_prompt,
      equationLatex: equationLatex(a, b, c),
      answerType: "factor",
      A,
      B,
    });
  }
  return quests;
}

function buildFormulaQuests(t: Mg06T, difficulty: Difficulty): Quest[] {
  const templates =
    difficulty === "BASIC"
      ? [
        { a: 1, b: -6, c: 8 },
        { a: 1, b: -5, c: 6 },
        { a: 1, b: 1, c: -6 },
        { a: 1, b: -1, c: -12 },
        { a: 1, b: 4, c: 3 },
        { a: 1, b: -4, c: 0 },
        { a: 1, b: 0, c: -9 },
        { a: 1, b: -2, c: -3 },
        { a: 1, b: 7, c: 10 },
        { a: 1, b: -7, c: 10 },
      ]
      : difficulty === "CORE"
        ? [
          { a: 2, b: -6, c: 4 },
          { a: 2, b: 1, c: -3 },
          { a: 3, b: -6, c: 0 },
          { a: 2, b: -5, c: 2 },
          { a: 3, b: 3, c: -6 },
          { a: 2, b: 3, c: -2 },
          { a: 4, b: -4, c: -8 },
          { a: 3, b: -9, c: 6 },
          { a: 2, b: -8, c: 6 },
          { a: 2, b: 6, c: 4 },
        ]
        : difficulty === "ADVANCED"
          ? [
            { a: 2, b: -3, c: -2 },
            { a: 3, b: -5, c: -2 },
            { a: 2, b: 5, c: -3 },
            { a: 4, b: 1, c: -1 },
            { a: 3, b: 7, c: 2 },
            { a: 2, b: -9, c: 4 },
            { a: 5, b: -5, c: -10 },
            { a: 3, b: -12, c: 9 },
            { a: 4, b: 4, c: -3 },
            { a: 6, b: -9, c: 3 },
          ]
          : [
            { a: 1, b: 0, c: -2 },
            { a: 1, b: 2, c: -1 },
            { a: 1, b: -2, c: -1 },
            { a: 2, b: 0, c: -8 },
            { a: 1, b: 4, c: 1 },
            { a: 1, b: -4, c: 1 },
            { a: 2, b: 2, c: -3 },
            { a: 3, b: 0, c: -12 },
            { a: 1, b: 6, c: 2 },
            { a: 1, b: -6, c: 2 },
          ];

  const quests: Quest[] = [];
  for (const tpl of templates) {
    const D = discriminant(tpl.a, tpl.b, tpl.c);
    if (D < 0) continue;
    if (!Number.isFinite(D)) continue;

    if (difficulty !== "ELITE" && Math.floor(Math.sqrt(D)) ** 2 !== D) continue;

    const sqrtD = Math.sqrt(D);
    const r1 = (-tpl.b + sqrtD) / (2 * tpl.a);
    const r2 = (-tpl.b - sqrtD) / (2 * tpl.a);

    if (!Number.isFinite(r1) || !Number.isFinite(r2)) continue;
    if (difficulty !== "ELITE" && (!Number.isInteger(r1) || !Number.isInteger(r2))) continue;

    const roots =
      difficulty === "ELITE"
        ? sortPair(
          normalizeRootInput(`\\frac{${-tpl.b}+\\sqrt{${D}}}{${2 * tpl.a}}`),
          normalizeRootInput(`\\frac{${-tpl.b}-\\sqrt{${D}}}{${2 * tpl.a}}`)
        )
        : toRootStringsInteger(r1, r2);

    quests.push({
      id: `Q|${difficulty}|${tpl.a}|${tpl.b}|${tpl.c}`,
      difficulty,
      mode: "FORMULA",
      a: tpl.a,
      b: tpl.b,
      c: tpl.c,
      prompt: t.modes.formula_prompt,
      equationLatex: equationLatex(tpl.a, tpl.b, tpl.c),
      answerType: "roots",
      roots,
    });
  }

  return quests;
}

function buildCompleteSquareQuests(t: Mg06T, difficulty: Difficulty): Quest[] {
  const templates =
    difficulty === "BASIC"
      ? [
        { a: 1, b: 4, c: 1 },
        { a: 1, b: -6, c: 5 },
        { a: 1, b: 2, c: 0 },
        { a: 1, b: -2, c: -3 },
        { a: 1, b: 8, c: 7 },
        { a: 1, b: -8, c: 7 },
        { a: 1, b: 6, c: 10 },
        { a: 1, b: -4, c: 6 },
        { a: 1, b: 10, c: 21 },
        { a: 1, b: -10, c: 21 },
      ]
      : difficulty === "CORE"
        ? [
          { a: 1, b: 6, c: 5 },
          { a: 1, b: -6, c: 8 },
          { a: 1, b: 12, c: 20 },
          { a: 1, b: -12, c: 20 },
          { a: 2, b: 8, c: 3 },
          { a: 2, b: -8, c: 3 },
          { a: 3, b: 12, c: 9 },
          { a: 2, b: 6, c: 1 },
          { a: 2, b: -6, c: 1 },
          { a: 4, b: 8, c: 1 },
        ]
        : difficulty === "ADVANCED"
          ? [
            { a: 2, b: 10, c: 9 },
            { a: 2, b: -10, c: 9 },
            { a: 3, b: 6, c: 1 },
            { a: 3, b: -6, c: 1 },
            { a: 4, b: 12, c: 5 },
            { a: 4, b: -12, c: 5 },
            { a: 5, b: 20, c: 19 },
            { a: 5, b: -20, c: 19 },
            { a: 6, b: 12, c: 3 },
            { a: 6, b: -12, c: 3 },
          ]
          : [
            { a: 2, b: 12, c: 7 },
            { a: 2, b: -12, c: 7 },
            { a: 3, b: 18, c: 11 },
            { a: 3, b: -18, c: 11 },
            { a: 4, b: 16, c: 2 },
            { a: 4, b: -16, c: 2 },
            { a: 5, b: 10, c: 1 },
            { a: 5, b: -10, c: 1 },
            { a: 6, b: 24, c: 19 },
            { a: 6, b: -24, c: 19 },
          ];

  const quests: Quest[] = [];
  for (const tpl of templates) {
    const a = tpl.a;
    const b = tpl.b;
    const c = tpl.c;
    const h = -b / (2 * a);

    const hStr = Number.isInteger(h) ? `${h}` : `\\frac{${-b}}{${2 * a}}`;
    const kNum = c * 4 * a - b * b;
    const kDen = 4 * a;
    const d = Math.abs(gcd(kNum, kDen));
    const kn = kNum / d;
    const kd = kDen / d;
    const kStr = kd === 1 ? `${kn}` : `\\frac{${kn}}{${kd}}`;

    quests.push({
      id: `CS|${difficulty}|${a}|${b}|${c}`,
      difficulty,
      mode: "COMPLETE_SQUARE",
      a,
      b,
      c,
      prompt: t.modes.complete_square_prompt,
      equationLatex: equationLatex(a, b, c),
      answerType: "vertex",
      h: normalizeRootInput(hStr),
      k: normalizeRootInput(kStr),
    });
  }
  return quests;
}

function gcd(a: number, b: number) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

export default function MG06Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].mg06;

  const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
  const [mode, setMode] = useState<Mode>("FACTOR");
  const [nonce, setNonce] = useState(0);

  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");
  const [h, setH] = useState("");
  const [k, setK] = useState("");
  const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correct: string }>(null);

  const questBank = useMemo(() => {
    const fact = buildFactorQuests(t, difficulty);
    const formula = buildFormulaQuests(t, difficulty);
    const cs = buildCompleteSquareQuests(t, difficulty);
    return [...fact, ...formula, ...cs];
  }, [difficulty, t]);

  const filtered = useMemo(() => questBank.filter((q) => q.mode === mode), [mode, questBank]);

  const currentQuest = useMemo(() => {
    const pool = filtered.length > 0 ? filtered : questBank;
    const sorted = [...pool].sort((a, b) => a.id.localeCompare(b.id));
    return sorted[nonce % sorted.length];
  }, [filtered, nonce, questBank]);

  const clearInputs = () => {
    setA("");
    setB("");
    setX1("");
    setX2("");
    setH("");
    setK("");
    setLastCheck(null);
  };

  const next = () => {
    clearInputs();
    setNonce((v) => v + 1);
  };

  const verify = () => {
    if (currentQuest.answerType === "factor") {
      const aIn = parseNumberLike(A);
      const bIn = parseNumberLike(B);
      const ok =
        aIn !== null &&
        bIn !== null &&
        ((aIn === currentQuest.A && bIn === currentQuest.B) || (aIn === currentQuest.B && bIn === currentQuest.A));

      const correct = `(x${currentQuest.A >= 0 ? "+" : ""}${currentQuest.A})(x${currentQuest.B >= 0 ? "+" : ""}${currentQuest.B})=0`;
      setLastCheck({ ok, correct });
      return;
    }

    if (currentQuest.answerType === "roots") {
      const a = normalizeRootInput(x1);
      const b = normalizeRootInput(x2);
      const [s1, s2] = sortPair(a, b);
      const [c1, c2] = currentQuest.roots;

      const asNum1 = parseNumberLike(a);
      const asNum2 = parseNumberLike(b);
      if (asNum1 !== null && asNum2 !== null && currentQuest.difficulty !== "ELITE") {
        const [n1, n2] = sortPair(String(asNum1), String(asNum2));
        const [e1, e2] = currentQuest.roots;
        const ok = n1 === e1 && n2 === e2;
        setLastCheck({ ok, correct: `${e1}, ${e2}` });
        return;
      }

      const ok = s1 === c1 && s2 === c2;
      setLastCheck({ ok, correct: `${c1}, ${c2}` });
      return;
    }

    const hh = normalizeRootInput(h);
    const kk = normalizeRootInput(k);
    const ok = hh === currentQuest.h && kk === currentQuest.k;
    setLastCheck({ ok, correct: `h=${currentQuest.h}, k=${currentQuest.k}` });
  };

  const title = t.title;

  const showFactor = currentQuest.answerType === "factor";
  const showRoots = currentQuest.answerType === "roots";
  const showVertex = currentQuest.answerType === "vertex";

  const latex = currentQuest.equationLatex;
  const headerLatex =
    currentQuest.mode === "FORMULA"
      ? `\\textbf{${t.labels.formula}}:\\quad x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}`
      : currentQuest.mode === "COMPLETE_SQUARE"
        ? `\\textbf{${t.labels.complete_square}}`
        : `\\textbf{${t.labels.factor}}`;

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
      <header className="p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl">
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">{t.back}</span>
        </Link>
        <div className="text-[10px] font-black tracking-[0.35em] uppercase text-white/80">{title}</div>
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
                "px-3 py-2 border text-[10px] font-black tracking-[0.25em] uppercase transition-all",
                difficulty === d.id ? "border-white bg-white/10" : "border-white/10 text-white/80 hover:border-white/40 hover:text-white"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 border-r-2 border-white/10 p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center">
          <div className="w-full max-w-5xl space-y-10">
            <div className="flex flex-wrap gap-3 justify-center">
              {([
                { id: "FACTOR", label: t.modes.factor },
                { id: "FORMULA", label: t.modes.formula },
                { id: "COMPLETE_SQUARE", label: t.modes.complete_square },
              ] as const).map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setNonce(0);
                    clearInputs();
                  }}
                  className={clsx(
                    "px-4 py-2 border text-[10px] font-black tracking-[0.25em] uppercase transition-all",
                    mode === m.id ? "border-white bg-white/10" : "border-white/10 text-white/80 hover:border-white/40 hover:text-white"
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
                  {currentQuest.prompt}
                </p>
              </div>

              <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t.target_title}</span>
                <div className="space-y-4">
                  <div className="text-white/80 font-black">
                    <InlineMath math={headerLatex} />
                  </div>
                  <div className="text-white font-black text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95] whitespace-nowrap">
                    <InlineMath math={latex} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
              {showFactor && (
                <div className="space-y-4">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.labels.factor_slots}</div>
                  <div className="text-white/70 font-black">
                    <InlineMath math={`(x+A)(x+B)=0`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      value={A}
                      onChange={(e) => setA(e.target.value)}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                      placeholder="A"
                      inputMode="numeric"
                    />
                    <input
                      value={B}
                      onChange={(e) => setB(e.target.value)}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                      placeholder="B"
                      inputMode="numeric"
                    />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-black">
                    <InlineMath math={`\\text{Preview: }(x${parseNumberLike(A) !== null && Number(A) >= 0 ? "+" : ""}${normalizeRootInput(A) || "A"})(x${parseNumberLike(B) !== null && Number(B) >= 0 ? "+" : ""}${normalizeRootInput(B) || "B"})=0`} />
                  </div>
                </div>
              )}
              {showRoots && (
                <div className="space-y-4">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.labels.roots}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      value={x1}
                      onChange={(e) => setX1(e.target.value)}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                      placeholder="x₁"
                    />
                    <input
                      value={x2}
                      onChange={(e) => setX2(e.target.value)}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                      placeholder="x₂"
                    />
                  </div>
                  {difficulty === "ELITE" && (
                    <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-black">
                      <InlineMath math={t.labels.elite_hint_latex} />
                    </div>
                  )}
                </div>
              )}

              {showVertex && (
                <div className="space-y-4">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.labels.vertex}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      value={h}
                      onChange={(e) => setH(e.target.value)}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                      placeholder="h"
                    />
                    <input
                      value={k}
                      onChange={(e) => setK(e.target.value)}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                      placeholder="k"
                    />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                    <InlineMath math={`y=a(x-h)^2+k`} />
                  </div>
                </div>
              )}

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
                      {lastCheck.correct}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="w-[520px] relative bg-black flex flex-col border-l border-white/10">
          <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
            <span>{t.monitor_title}</span>
            <div className="flex gap-2"><div className="w-1 h-1 bg-white" /><div className="w-1 h-1 bg-white/40" /></div>
          </div>
          <div className="flex-1 p-6">
            <div className="border-2 border-white/10 rounded-xl p-6 bg-white/[0.02] h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
                <div className="text-white font-black text-xl">
                  <InlineMath math={latex} />
                </div>
                <div className="text-white/70 font-mono text-sm break-words">{currentQuest.prompt}</div>
              </div>
              <div className="space-y-2">
                <div className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">
                  {difficulty}{" // "}MG06{" // "}{mode}
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
