"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Sigma } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg06T = typeof translations.EN.mg06;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Stage = "TERMS" | "FACTORIZE" | "FRACTIONS" | "EQUATIONS";

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
  slotGroups?: Array<{ titleLatex: string; slotIds: string[] }>;
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

function buildStagePool(t: Mg06T, difficulty: Difficulty, stage: Stage): Quest[] {
  if (stage === "TERMS") {
    const all: Quest[] = [
      {
        id: "T1",
        difficulty,
        stage,
        promptLatex: t.stages.terms_prompt_latex,
        expressionLatex: `3x+2y-4x+7y`,
        targetLatex: `ax+by`,
        slots: [
          { id: "ax", labelLatex: `a`, placeholder: "a", expected: -1 },
          { id: "by", labelLatex: `b`, placeholder: "b", expected: 9 },
        ],
        correctLatex: `-x+9y`,
      },
      {
        id: "T2",
        difficulty,
        stage,
        promptLatex: t.stages.terms_prompt_latex,
        expressionLatex: `5a-(2a-3b)+4b`,
        targetLatex: `pa+qb`,
        slots: [
          { id: "pa", labelLatex: `p`, placeholder: "p", expected: 3 },
          { id: "qb", labelLatex: `q`, placeholder: "q", expected: 7 },
        ],
        correctLatex: `3a+7b`,
      },
      {
        id: "T3",
        difficulty,
        stage,
        promptLatex: t.stages.terms_prompt_latex,
        expressionLatex: `6m+3n-(2m+5n)+m`,
        targetLatex: `rm+sn`,
        slots: [
          { id: "rm", labelLatex: `r`, placeholder: "r", expected: 5 },
          { id: "sn", labelLatex: `s`, placeholder: "s", expected: -2 },
        ],
        correctLatex: `5m-2n`,
      },
      {
        id: "T4",
        difficulty,
        stage,
        promptLatex: t.stages.terms_prompt_latex,
        expressionLatex: `4x(2y-x)+3x^2-5xy`,
        targetLatex: `ux^2+vxy`,
        slots: [
          { id: "ux2", labelLatex: `u`, placeholder: "u", expected: -1 },
          { id: "vxy", labelLatex: `v`, placeholder: "v", expected: 3 },
        ],
        correctLatex: `-x^2+3xy`,
      },
      {
        id: "T5",
        difficulty,
        stage,
        promptLatex: t.stages.terms_prompt_latex,
        expressionLatex: `7p-2(p-3q)+4q`,
        targetLatex: `up+vq`,
        slots: [
          { id: "up", labelLatex: `u`, placeholder: "u", expected: 5 },
          { id: "vq", labelLatex: `v`, placeholder: "v", expected: 10 },
        ],
        correctLatex: `5p+10q`,
      },
      {
        id: "T6",
        difficulty,
        stage,
        promptLatex: t.stages.terms_prompt_latex,
        expressionLatex: `2x-3(x-4)+5`,
        targetLatex: `ax+b`,
        slots: [
          { id: "ax", labelLatex: `a`, placeholder: "a", expected: -1 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: 17 },
        ],
        correctLatex: `-x+17`,
      },
      {
        id: "T7",
        difficulty,
        stage,
        promptLatex: t.stages.terms_prompt_latex,
        expressionLatex: `3(2x-1)-2(x+4)`,
        targetLatex: `ax+b`,
        slots: [
          { id: "ax", labelLatex: `a`, placeholder: "a", expected: 4 },
          { id: "b", labelLatex: `b`, placeholder: "b", expected: -11 },
        ],
        correctLatex: `4x-11`,
      },
      {
        id: "T8",
        difficulty,
        stage,
        promptLatex: t.stages.terms_prompt_latex,
        expressionLatex: `2a(3b-a)+a^2-4ab`,
        targetLatex: `ua^2+vab`,
        slots: [
          { id: "ua2", labelLatex: `u`, placeholder: "u", expected: -1 },
          { id: "vab", labelLatex: `v`, placeholder: "v", expected: 2 },
        ],
        correctLatex: `-a^2+2ab`,
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 3);
    if (difficulty === "CORE") return all.slice(0, 5);
    if (difficulty === "ADVANCED") return all.slice(0, 7);
    return all;
  }

  if (stage === "FACTORIZE") {
    const all: Quest[] = [
      {
        id: "F1",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `x^2+5x+6`,
        targetLatex: `(x+A)(x+B)`,
        slots: [
          { id: "A", labelLatex: `A`, placeholder: "A", expected: 2 },
          { id: "B", labelLatex: `B`, placeholder: "B", expected: 3 },
        ],
        correctLatex: `(x+2)(x+3)`,
        hintLatex: [
          t.hints.identities.trinomial_expand_latex,
          `A+B=5,\\; AB=6`,
          `\\text{Match: }A=2,\\; B=3\\text{ because }2+3=5\\text{ and }2\\times 3=6`,
        ],
      },
      {
        id: "F2",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `x^2-4x-12`,
        targetLatex: `(x+A)(x+B)`,
        slots: [
          { id: "A", labelLatex: `A`, placeholder: "A", expected: -6 },
          { id: "B", labelLatex: `B`, placeholder: "B", expected: 2 },
        ],
        correctLatex: `(x-6)(x+2)`,
        hintLatex: [
          t.hints.identities.trinomial_expand_latex,
          `A+B=-4,\\; AB=-12`,
          `\\text{Match: }A=-6,\\; B=2\\text{ because }(-6)+2=-4\\text{ and }(-6)\\times 2=-12`,
        ],
      },
      {
        id: "F3",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `9a^2-16`,
        targetLatex: `(3a-4)(3a+4)`,
        slots: [
          { id: "p", labelLatex: `p`, placeholder: "p", expected: 3 },
          { id: "q", labelLatex: `q`, placeholder: "q", expected: 4 },
        ],
        correctLatex: `(3a-4)(3a+4)`,
        hintLatex: [
          t.hints.identities.diff_squares_latex,
          `u=3a,\\; v=4`,
          `\\text{Therefore: }(3a)^2-4^2=(3a-4)(3a+4)`,
        ],
      },
      {
        id: "F4",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `4x^2+12x+9`,
        targetLatex: `(2x+3)^2`,
        slots: [
          { id: "p", labelLatex: `p`, placeholder: "p", expected: 2 },
          { id: "q", labelLatex: `q`, placeholder: "q", expected: 3 },
        ],
        correctLatex: `(2x+3)^2`,
        hintLatex: [
          `(px+q)^2=p^2x^2+2pqx+q^2`,
          `p^2=4,\\; 2pq=12,\\; q^2=9`,
          `\\text{Match: }p=2,\\; q=3\\text{ gives }(2x+3)^2`,
        ],
      },
      {
        id: "F5",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `6ab-9a`,
        targetLatex: `ka(mb+n)`,
        slots: [
          { id: "k", labelLatex: `k`, placeholder: "k", expected: 3 },
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 2 },
          { id: "n", labelLatex: `n`, placeholder: "n", expected: -3 },
        ],
        correctLatex: `3a(2b-3)`,
        hintLatex: [
          t.hints.rules.factor_common_latex,
          `6ab-9a=3a(2b-3)`,
        ],
      },
      {
        id: "F6",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `2x^2+8x+8`,
        targetLatex: `2(x+2)^2`,
        slots: [
          { id: "k", labelLatex: `k`, placeholder: "k", expected: 2 },
          { id: "A", labelLatex: `A`, placeholder: "A", expected: 2 },
        ],
        correctLatex: `2(x+2)^2`,
        hintLatex: [
          `2x^2+8x+8=2(x^2+4x+4)`,
          `x^2+4x+4=(x+2)^2`,
        ],
      },
      {
        id: "F7",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `5m^2n-10mn`,
        targetLatex: `kmn(m+c)`,
        slots: [
          { id: "k", labelLatex: `k`, placeholder: "k", expected: 5 },
          { id: "c", labelLatex: `c`, placeholder: "c", expected: -2 },
        ],
        correctLatex: `5mn(m-2)`,
      },
      {
        id: "F8",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `a^2-7a+10`,
        targetLatex: `(a+A)(a+B)`,
        slots: [
          { id: "A", labelLatex: `A`, placeholder: "A", expected: -5 },
          { id: "B", labelLatex: `B`, placeholder: "B", expected: -2 },
        ],
        correctLatex: `(a-5)(a-2)`,
        hintLatex: [
          `(a+A)(a+B)=a^2+(A+B)a+AB`,
          `A+B=-7,\\; AB=10`,
        ],
      },
      {
        id: "F9",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `12x^3y-6x^2y`,
        targetLatex: `kx^2y(mx+n)`,
        slots: [
          { id: "k", labelLatex: `k`, placeholder: "k", expected: 6 },
          { id: "m", labelLatex: `m`, placeholder: "m", expected: 2 },
          { id: "n", labelLatex: `n`, placeholder: "n", expected: -1 },
        ],
        correctLatex: `6x^2y(2x-1)`,
        hintLatex: [
          t.hints.rules.factor_common_latex,
          `\\text{GCD of }12x^3y\\text{ and }6x^2y\\text{ is }6x^2y`,
          `12x^3y-6x^2y=6x^2y(2x-1)`,
        ],
      },
      {
        id: "F10",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `x^2+6x+9`,
        targetLatex: `(x+A)^2`,
        slots: [
          { id: "A", labelLatex: `A`, placeholder: "A", expected: 3 },
        ],
        correctLatex: `(x+3)^2`,
        hintLatex: [
          `(x+A)^2=x^2+2Ax+A^2`,
          `\\text{Match: }2A=6\\text{ and }A^2=9`,
          `\\text{Therefore: }A=3`,
        ],
      },
      {
        id: "F11",
        difficulty,
        stage,
        promptLatex: t.stages.factor_prompt_latex,
        expressionLatex: `25x^2-49`,
        targetLatex: `(px-q)(px+q)`,
        slots: [
          { id: "p", labelLatex: `p`, placeholder: "p", expected: 5 },
          { id: "q", labelLatex: `q`, placeholder: "q", expected: 7 },
        ],
        correctLatex: `(5x-7)(5x+7)`,
        hintLatex: [
          t.hints.identities.diff_squares_latex,
          `25x^2=(5x)^2,\\; 49=7^2`,
          `\\text{Therefore: }(5x)^2-7^2=(5x-7)(5x+7)`,
        ],
      },
    ];

    if (difficulty === "BASIC") return all.slice(0, 4);
    if (difficulty === "CORE") return all.slice(0, 6);
    if (difficulty === "ADVANCED") return all;
    return all;
  }

  if (stage === "FRACTIONS") {
    const all: Quest[] = [
      {
        id: "R1",
        difficulty,
        stage,
        promptLatex: t.stages.fractions_prompt_latex,
        expressionLatex: `\\frac{x^2-9}{x^2+3x}`,
        targetLatex: `\\frac{x-3}{x}`,
        slots: [
          { id: "A", labelLatex: `A`, placeholder: "A", expected: 3 },
          { id: "B", labelLatex: `B`, placeholder: "B", expected: 3 },
        ],
        slotGroups: [
          { titleLatex: t.labels.numerator, slotIds: ["A"] },
          { titleLatex: t.labels.denominator, slotIds: ["B"] },
        ],
        correctLatex: `\\frac{x-3}{x}`,
        hintLatex: [
          t.hints.rules.cancel_common_latex,
          `x^2-9=(x-3)(x+3)`,
          `x^2+3x=x(x+3)`,
        ],
      },
      {
        id: "R2",
        difficulty,
        stage,
        promptLatex: t.stages.fractions_prompt_latex,
        expressionLatex: `\\frac{6x^2y}{9xy^2}`,
        targetLatex: `\\frac{2x}{3y}`,
        slots: [
          { id: "p", labelLatex: `p`, placeholder: "p", expected: 2 },
          { id: "q", labelLatex: `q`, placeholder: "q", expected: 3 },
        ],
        correctLatex: `\\frac{2x}{3y}`,
        hintLatex: [
          t.hints.rules.cancel_common_latex,
          `\\frac{6}{9}=\\frac{2}{3}`,
          `\\frac{x^2}{x}=x,\\; \\frac{y}{y^2}=\\frac{1}{y}`,
        ],
      },
      {
        id: "R3",
        difficulty,
        stage,
        promptLatex: t.stages.fractions_prompt_latex,
        expressionLatex: `\\frac{8x}{12}`,
        targetLatex: `\\frac{2x}{3}`,
        slots: [
          { id: "p", labelLatex: `p`, placeholder: "p", expected: 2 },
          { id: "q", labelLatex: `q`, placeholder: "q", expected: 3 },
        ],
        correctLatex: `\\frac{2x}{3}`,
        hintLatex: [
          `\\frac{8}{12}=\\frac{2}{3}`,
          `\\frac{8x}{12}=\\frac{2x}{3}`,
        ],
      },
      {
        id: "R4",
        difficulty,
        stage,
        promptLatex: t.stages.fractions_prompt_latex,
        expressionLatex: `\\frac{15a^2b}{6ab}`,
        targetLatex: `\\frac{5a}{2}`,
        slots: [
          { id: "p", labelLatex: `p`, placeholder: "p", expected: 5 },
          { id: "q", labelLatex: `q`, placeholder: "q", expected: 2 },
        ],
        correctLatex: `\\frac{5a}{2}`,
        hintLatex: [
          `\\frac{15}{6}=\\frac{5}{2}`,
          `\\frac{a^2}{a}=a,\\; \\frac{b}{b}=1`,
          `\\frac{15a^2b}{6ab}=\\frac{5a}{2}`,
        ],
      },
      {
        id: "R5",
        difficulty,
        stage,
        promptLatex: t.stages.fractions_prompt_latex,
        expressionLatex: `\\frac{x^2-16}{x^2+4x}`,
        targetLatex: `\\frac{x-4}{x}`,
        slots: [
          { id: "A", labelLatex: `A`, placeholder: "A", expected: 4 },
          { id: "B", labelLatex: `B`, placeholder: "B", expected: 4 },
        ],
        slotGroups: [
          { titleLatex: t.labels.numerator, slotIds: ["A"] },
          { titleLatex: t.labels.denominator, slotIds: ["B"] },
        ],
        correctLatex: `\\frac{x-4}{x}`,
        hintLatex: [
          t.hints.rules.cancel_common_latex,
          `x^2-16=(x-4)(x+4)`,
          `x^2+4x=x(x+4)`,
        ],
      },
    ];

    if (difficulty === "BASIC") return all.slice(1, 2);
    if (difficulty === "CORE") return all.slice(1, 4);
    if (difficulty === "ADVANCED") return all.slice(1, 5);
    return all;
  }

  const all: Quest[] = [
    {
      id: "E1",
      difficulty,
      stage,
      promptLatex: t.stages.equations_prompt_latex,
      expressionLatex: `(x+4)(x-6)=0`,
      targetLatex: `x_1,\\; x_2`,
      slots: [
        { id: "x1", labelLatex: `x_1`, placeholder: "x₁", expected: -4 },
        { id: "x2", labelLatex: `x_2`, placeholder: "x₂", expected: 6 },
      ],
      correctLatex: `x=-4,\\; 6`,
      hintLatex: [
        t.hints.rules.zero_product_latex,
        `x+4=0\\;\\text{or}\\; x-6=0`,
        `x=-4,\\; 6`,
      ],
    },
    {
      id: "E2",
      difficulty,
      stage,
      promptLatex: t.stages.equations_prompt_latex,
      expressionLatex: `x^2-7x+10=0`,
      targetLatex: `A,B\\;\\text{then}\\; x_1,x_2`,
      slots: [
        { id: "A", labelLatex: `A`, placeholder: "A", expected: -5 },
        { id: "B", labelLatex: `B`, placeholder: "B", expected: -2 },
        { id: "x1", labelLatex: `x_1`, placeholder: "x₁", expected: 2 },
        { id: "x2", labelLatex: `x_2`, placeholder: "x₂", expected: 5 },
      ],
      correctLatex: `(x-5)(x-2)=0\\;\\Rightarrow\\; x=2,5`,
      hintLatex: [
        t.hints.identities.trinomial_expand_latex,
        `A+B=-7,\\; AB=10`,
        `\\text{Match: }A=-5,\\; B=-2`,
        t.hints.rules.zero_product_latex,
      ],
    },
    {
      id: "E3",
      difficulty,
      stage,
      promptLatex: t.stages.equations_prompt_latex,
      expressionLatex: `(x-3)(x+2)=x^2-1`,
      targetLatex: `x`,
      slots: [
        { id: "c", labelLatex: `c`, placeholder: "coeff of x", expected: -1 },
        { id: "l", labelLatex: `L`, placeholder: "left const", expected: -6 },
        { id: "r", labelLatex: `R`, placeholder: "right const", expected: -1 },
        { id: "x", labelLatex: `x`, placeholder: "x", expected: -5 },
      ],
      correctLatex: `-x-6=-1\\;\\Rightarrow\\; x=-5`,
      hintLatex: [
        t.hints.rules.simplify_both_sides_latex,
        `(x-3)(x+2)=x^2-x-6`,
        `x^2-x-6=x^2-1`,
        `-x-6=-1\\;\\Rightarrow\\; x=-5`,
      ],
    },
    {
      id: "E4",
      difficulty,
      stage,
      promptLatex: t.stages.equations_prompt_latex,
      expressionLatex: `(2x-1)^2=9`,
      targetLatex: `x_1,\\; x_2`,
      slots: [
        { id: "x1", labelLatex: `x_1`, placeholder: "x₁", expected: -1 },
        { id: "x2", labelLatex: `x_2`, placeholder: "x₂", expected: 2 },
      ],
      correctLatex: `2x-1=\\pm 3\\;\\Rightarrow\\; x=-1,2`,
      hintLatex: [
        t.hints.rules.square_root_pm_latex,
        `2x-1=\\pm 3`,
        `x=-1,\\; 2`,
      ],
    },
    {
      id: "E5",
      difficulty,
      stage,
      promptLatex: t.stages.equations_prompt_latex,
      expressionLatex: `-3(x-2)=2x+4`,
      targetLatex: `\\frac{p}{q}`,
      slots: [
        { id: "p", labelLatex: `p`, placeholder: "p", expected: 2 },
        { id: "q", labelLatex: `q`, placeholder: "q", expected: 5 },
      ],
      correctLatex: `x=\\frac{2}{5}`,
      hintLatex: [
        t.hints.rules.simplify_both_sides_latex,
        `-3(x-2)=-3x+6`,
        `-3x+6=2x+4`,
        `-5x=-2\\;\\Rightarrow\\; x=\\frac{2}{5}`,
      ],
    },
    {
      id: "E6",
      difficulty,
      stage,
      promptLatex: t.stages.equations_prompt_latex,
      expressionLatex: `2(x-3)=x+5`,
      targetLatex: `x`,
      slots: [{ id: "x", labelLatex: `x`, placeholder: "x", expected: 11 }],
      correctLatex: `x=11`,
      hintLatex: [
        t.hints.rules.simplify_both_sides_latex,
        `2x-6=x+5`,
        `x=11`,
      ],
    },
  ];

  if (difficulty === "BASIC") return all.slice(0, 2);
  if (difficulty === "CORE") return all.slice(0, 4);
  if (difficulty === "ADVANCED") return all.slice(0, 5);
  return all;
}

function stageLabel(t: Mg06T, stage: Stage) {
  if (stage === "TERMS") return t.stages.terms;
  if (stage === "FACTORIZE") return t.stages.factorize;
  if (stage === "FRACTIONS") return t.stages.fractions;
  return t.stages.equations;
}

export default function MG06Page() {
  const { currentLanguage, setLanguage } = useAppStore();
  const t = translations[currentLanguage].mg06;

  const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
  const [stage, setStage] = useState<Stage>("TERMS");
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
  const expressionLatex = currentQuest.expressionLatex;

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
                { id: "TERMS", label: t.stages.terms },
                { id: "FACTORIZE", label: t.stages.factorize },
                { id: "FRACTIONS", label: t.stages.fractions },
                { id: "EQUATIONS", label: t.stages.equations },
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
                      <InlineMath math={expressionLatex} />
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
                {currentQuest.slotGroups ? (
                  <div className="space-y-4">
                    {currentQuest.slotGroups.map((group) => (
                      <div key={group.titleLatex} className="space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                          <InlineMath math={group.titleLatex} />
                        </div>
                        <div className={clsx("grid gap-4", group.slotIds.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                          {group.slotIds.map((slotId) => {
                            const slot = currentQuest.slots.find((s) => s.id === slotId);
                            if (!slot) return null;
                            return (
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
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
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
                )}

                {stage === "FACTORIZE" && currentQuest.slots.some((s) => s.id === "A") && currentQuest.slots.some((s) => s.id === "B") && (
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-black">
                    <InlineMath
                      math={`\\text{Preview: }(x${parseNumberLike(inputs.A ?? "", locale) !== null && Number((inputs.A ?? "").replace(/,/g, ".")) >= 0 ? "+" : ""}${(inputs.A ?? "").trim() || "A"})(x${parseNumberLike(inputs.B ?? "", locale) !== null && Number((inputs.B ?? "").replace(/,/g, ".")) >= 0 ? "+" : ""}${(inputs.B ?? "").trim() || "B"})`}
                    />
                  </div>
                )}

                {stage === "EQUATIONS" && currentQuest.id === "E5" && (
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-black">
                    <InlineMath math={`\\text{Preview: }x=\\frac{${(inputs.p ?? "").trim() || "p"}}{${(inputs.q ?? "").trim() || "q"}}`} />
                  </div>
                )}
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
                <div className="text-white font-black text-xl overflow-x-auto max-w-full py-1 whitespace-nowrap">
                  <span className="inline-block">
                    <InlineMath math={expressionLatex} />
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
                  {difficulty}{" // "}MG06{" // "}{stageName}
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
