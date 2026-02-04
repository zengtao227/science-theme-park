"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Sigma } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg13T = typeof translations.EN.mg13;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Stage = "STATISTICS" | "PROBABILITY" | "COMBINATORICS";

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
};

function parseNumberLike(s: string, locale: "DE" | "EN" | "CN") {
  const raw = s.trim();
  if (!raw) return null;
  const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
  const v = Number(normalized);
  return Number.isFinite(v) ? v : null;
}

function stageLabel(t: Mg13T, stage: Stage) {
  if (stage === "STATISTICS") return t.stages.statistics;
  if (stage === "PROBABILITY") return t.stages.probability;
  return t.stages.combinatorics;
}

function buildStagePool(t: Mg13T, difficulty: Difficulty, stage: Stage): Quest[] {
  if (stage === "STATISTICS") {
    const all: Quest[] = [
      {
        id: "S1",
        difficulty,
        stage,
        promptLatex: t.stages.statistics_prompt_latex,
        expressionLatex: `\\text{Data: }2,4,6,8,10`,
        targetLatex: `\\text{Mean},\\; \\text{Median}`,
        slots: [
          { id: "mean", labelLatex: `\\text{Mean}`, placeholder: "mean", expected: 6 },
          { id: "median", labelLatex: `\\text{Median}`, placeholder: "median", expected: 6 },
        ],
        correctLatex: `\\text{Mean}=6,\\; \\text{Median}=6`,
        hintLatex: [
          `\\text{Mean}=\\frac{2+4+6+8+10}{5}=6`,
          `\\text{Median}=6`,
        ],
      },
      {
        id: "S2",
        difficulty,
        stage,
        promptLatex: t.stages.statistics_prompt_latex,
        expressionLatex: `\\text{Data: }3,5,7,9,11,13`,
        targetLatex: `\\text{Mean},\\; \\text{Median}`,
        slots: [
          { id: "mean", labelLatex: `\\text{Mean}`, placeholder: "mean", expected: 8 },
          { id: "median", labelLatex: `\\text{Median}`, placeholder: "median", expected: 8 },
        ],
        correctLatex: `\\text{Mean}=8,\\; \\text{Median}=8`,
        hintLatex: [
          `\\text{Mean}=\\frac{3+5+7+9+11+13}{6}=8`,
          `\\text{Median}=\\frac{7+9}{2}=8`,
        ],
      },
      {
        id: "S3",
        difficulty,
        stage,
        promptLatex: `\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
        expressionLatex: `\\text{Delays (min): }2,3,5,7,8`,
        targetLatex: `\\text{Mean},\\; \\text{Median}`,
        slots: [
          { id: "mean", labelLatex: `\\text{Mean}`, placeholder: "mean", expected: 5 },
          { id: "median", labelLatex: `\\text{Median}`, placeholder: "median", expected: 5 },
        ],
        correctLatex: `\\text{Mean}=5,\\; \\text{Median}=5`,
        hintLatex: [
          `\\text{Mean}=\\frac{2+3+5+7+8}{5}=5`,
          `\\text{Median}=5`,
        ],
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 2);
    return all;
  }

  if (stage === "PROBABILITY") {
    const all: Quest[] = [
      {
        id: "P1",
        difficulty,
        stage,
        promptLatex: t.stages.probability_prompt_latex,
        expressionLatex: `\\text{Coin flip: }P(\\text{Heads})`,
        targetLatex: `P`,
        slots: [{ id: "p", labelLatex: `P`, placeholder: "probability", expected: 0.5 }],
        correctLatex: `P=0.5`,
        hintLatex: [`P=\\frac{1}{2}=0.5`],
      },
      {
        id: "P2",
        difficulty,
        stage,
        promptLatex: t.stages.probability_prompt_latex,
        expressionLatex: `\\text{Die roll: }P(\\text{Even})`,
        targetLatex: `P`,
        slots: [{ id: "p", labelLatex: `P`, placeholder: "probability", expected: 0.5 }],
        correctLatex: `P=\\frac{3}{6}=0.5`,
        hintLatex: [`\\text{Even: }2,4,6`, `P=\\frac{3}{6}=0.5`],
      },
      {
        id: "P3",
        difficulty,
        stage,
        promptLatex: t.stages.probability_prompt_latex,
        expressionLatex: `\\text{Two dice: }P(\\text{Sum}=7)`,
        targetLatex: `P`,
        slots: [{ id: "p", labelLatex: `P`, placeholder: "probability", expected: 0.167 }],
        correctLatex: `P=\\frac{6}{36}\\approx 0.167`,
        hintLatex: [
          `\\text{Outcomes: }(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)`,
          `P=\\frac{6}{36}\\approx 0.167`,
        ],
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 2);
    return all;
  }

  if (stage === "COMBINATORICS") {
    const all: Quest[] = [
      {
        id: "C1",
        difficulty,
        stage,
        promptLatex: `\\text{Permutations: }n=5,\\; r=3`,
        targetLatex: `P(n,r)`,
        slots: [{ id: "p", labelLatex: `P`, placeholder: "permutations", expected: 60 }],
        correctLatex: `P(5,3)=5\\cdot 4\\cdot 3=60`,
        hintLatex: [`P(n,r)=\\frac{n!}{(n-r)!}`, `P(5,3)=60`],
      },
      {
        id: "C2",
        difficulty,
        stage,
        promptLatex: `\\text{Combinations: }n=6,\\; r=2`,
        targetLatex: `C(n,r)`,
        slots: [{ id: "c", labelLatex: `C`, placeholder: "combinations", expected: 15 }],
        correctLatex: `C(6,2)=\\frac{6!}{2!4!}=15`,
        hintLatex: [`C(n,r)=\\frac{n!}{r!(n-r)!}`, `C(6,2)=15`],
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 1);
    return all;
  }

  return [];
}

export default function MG13Page() {
  const { currentLanguage, setLanguage } = useAppStore();
  const t = translations[currentLanguage].mg13;

  const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
  const [stage, setStage] = useState<Stage>("STATISTICS");
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
      if (v === null || Math.abs(v - slot.expected) > 0.01) {
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
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black tracking-[0.2em] uppercase">{t.back}</span>
        </Link>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
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
                { id: "STATISTICS", label: stageLabel(t, "STATISTICS") },
                { id: "PROBABILITY", label: stageLabel(t, "PROBABILITY") },
                { id: "COMBINATORICS", label: stageLabel(t, "COMBINATORICS") },
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
                    <div className="text-white font-black text-[clamp(1.2rem,3.8vw,3.3rem)] leading-[0.95] whitespace-nowrap">
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

        <aside className="w-[520px] relative bg-black flex flex-col border-l border-white/10">
          <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
            <span>{t.monitor_title}</span>
            <div className="flex gap-2"><div className="w-1 h-1 bg-white" /><div className="w-1 h-1 bg-white/40" /></div>
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
                  {difficulty}{" // "}MG13{" // "}{stageName}
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
