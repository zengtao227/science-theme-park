"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Atom, Sigma, TriangleRight } from "lucide-react";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type ModuleTab = "PYTHAGORAS" | "SQRT";
type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";

type PythagorasMode = "SOLVE_HYP" | "SOLVE_LEG" | "CHECK_RIGHT" | "DISTANCE" | "ELITE_SPACE" | "MISSION";
type SqrtMode = "PERFECT" | "SIMPLIFY" | "ESTIMATE";
type Mode = PythagorasMode | SqrtMode;

type Radical = { k: number; m: number };

type Step =
  | { id: string; labelLatex: string; input: "number"; answer: number }
  | { id: string; labelLatex: string; input: "radical"; answer: Radical }
  | { id: string; labelLatex: string; input: "boolean"; answer: boolean };

type Visual =
  | { kind: "triangle"; a: number; b: number; c: number }
  | { kind: "distance"; p1: { x: number; y: number }; p2: { x: number; y: number } }
  | { kind: "space"; a: number; b: number; c: number };

type Quest = {
  id: string;
  tab: ModuleTab;
  mode: Mode;
  difficulty: Difficulty;
  promptLatex: string;
  targetLatex: string;
  steps: Step[];
  visual: Visual;
};

type Mg05T = typeof translations.EN.s2_02 & {
  yes: string;
  no: string;
  ready: string;
  monitor_title: string;
  footer_left: string;
  objective_title: string;
  target_title: string;
  check: string;
  next: string;
  difficulty: { basic: string; core: string; advanced: string; elite: string };
  tabs: { pythagoras: string; sqrt: string };
  pythagoras: { solve_hyp: string; solve_leg: string; check_right: string; distance: string; elite_space: string };
  sqrt: { perfect: string; simplify: string; estimate: string };
  mission: {
    title: string;
    protocol: string;
    cern_title: string;
    cern_desc: string;
    roof_title: string;
    roof_desc: string;
    ladder_title: string;
    ladder_desc: string;
    grid_title: string;
    grid_desc: string;
    chain_title: string;
    chain_desc: string;
  };
};

function simplifyRadical(n: number): Radical {
  if (n <= 0) return { k: 0, m: 0 };
  let k = 1;
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    while (m % (p * p) === 0) {
      m /= p * p;
      k *= p;
    }
  }
  return { k, m };
}

function isPerfectSquare(n: number) {
  const r = Math.floor(Math.sqrt(n));
  return r * r === n;
}

function formatRadicalLatex({ k, m }: Radical) {
  if (m === 1) return `${k}`;
  if (k === 1) return `\\sqrt{${m}}`;
  return `${k}\\sqrt{${m}}`;
}

function hashStringToUint32(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleDeterministic<T>(items: T[], seed: number) {
  const arr = [...items];
  const rnd = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function triangleTriples() {
  return [
    [3, 4, 5],
    [5, 12, 13],
    [8, 15, 17],
    [7, 24, 25],
    [12, 16, 20],
    [9, 40, 41],
    [20, 21, 29],
    [11, 60, 61],
    [28, 45, 53],
  ] as const;
}

function difficultyScale(d: Difficulty) {
  if (d === "BASIC") return [1, 2, 3, 4] as const;
  if (d === "CORE") return [2, 3, 4, 5] as const;
  if (d === "ADVANCED") return [3, 4, 5, 6] as const;
  return [4, 5, 6, 7] as const;
}

function buildCandidates(tab: ModuleTab, difficulty: Difficulty, mode: Mode) {
  if (tab === "PYTHAGORAS") {
    if (mode === "SOLVE_HYP" || mode === "SOLVE_LEG") {
      const triples = triangleTriples();
      const scales = difficultyScale(difficulty);
      const list: string[] = [];
      for (const [a, b, c] of triples) {
        for (const s of scales) list.push(`${a}|${b}|${c}|${s}`);
      }
      return list;
    }

    if (mode === "CHECK_RIGHT") {
      const triples = triangleTriples();
      const scales = difficultyScale(difficulty);
      const list: string[] = [];
      for (const [a, b, c] of triples) {
        for (const s of scales) {
          list.push(`${a * s}|${b * s}|${c * s}|1`);
          list.push(`${a * s}|${b * s}|${c * s + 1}|0`);
        }
      }
      return list;
    }

    if (mode === "MISSION") {
      const scale = difficulty === "BASIC" ? 2 : difficulty === "CORE" ? 3 : difficulty === "ADVANCED" ? 4 : 5;
      const list: string[] = [];
      const seed = hashStringToUint32(`MISSION|${difficulty}`);
      const rnd = mulberry32(seed);
      list.push(`CERN|${scale}`);
      list.push(`GRIND|${6 + scale}|${6}`);
      list.push(`LUCERNE|5|12`);
      for (let i = 0; i < 3; i++) {
        let x1 = Math.floor(rnd() * 11) - 5;
        let y1 = Math.floor(rnd() * 11) - 5;
        let x2 = Math.floor(rnd() * 11) - 5;
        let y2 = Math.floor(rnd() * 11) - 5;
        if (x1 === x2 && y1 === y2) x2 += 2;
        list.push(`GRID|${x1}|${y1}|${x2}|${y2}`);
      }
      const chainScale = difficulty === "BASIC" ? 1 : difficulty === "CORE" ? 2 : difficulty === "ADVANCED" ? 2 : 3;
      const baseTriples = triangleTriples();
      const [a, b, c] = baseTriples[(seed + 3) % baseTriples.length];
      list.push(`CHAIN|${a * chainScale}|${b * chainScale}|${c}`);
      return list;
    }

    if (mode === "DISTANCE") {
      const list: string[] = [];
      const seed = hashStringToUint32(`DIST|${difficulty}`);
      const rnd = mulberry32(seed);
      const range = difficulty === "ADVANCED" ? 9 : 12;
      for (let i = 0; i < 120; i++) {
        const x1 = Math.floor(rnd() * (range * 2 + 1)) - range;
        const y1 = Math.floor(rnd() * (range * 2 + 1)) - range;
        const x2 = Math.floor(rnd() * (range * 2 + 1)) - range;
        const y2 = Math.floor(rnd() * (range * 2 + 1)) - range;
        if (x1 === x2 && y1 === y2) continue;
        list.push(`${x1}|${y1}|${x2}|${y2}`);
      }
      return list;
    }

    const list: string[] = [];
    const seed = hashStringToUint32(`SPACE|${difficulty}`);
    const rnd = mulberry32(seed);
    const max = difficulty === "ELITE" ? 24 : 18;
    for (let i = 0; i < 120; i++) {
      const a = 2 + Math.floor(rnd() * (max - 1));
      const b = 2 + Math.floor(rnd() * (max - 1));
      const c = 2 + Math.floor(rnd() * (max - 1));
      list.push(`${a}|${b}|${c}`);
    }
    return list;
  }

  if (mode === "PERFECT") {
    const squares = [
      1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400,
      441, 484, 529, 576, 625, 676, 729, 784, 841, 900,
    ];
    const cap = difficulty === "BASIC" ? 20 : difficulty === "CORE" ? 25 : 30;
    return squares.slice(0, cap).map(String);
  }

  if (mode === "SIMPLIFY") {
    const ms = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30];
    const ks = difficulty === "BASIC" ? [2, 3, 4, 5, 6] : difficulty === "CORE" ? [2, 3, 4, 5, 6, 7, 8] : [3, 4, 5, 6, 7, 8, 9, 10, 12];
    const list: string[] = [];
    for (const k of ks) for (const m of ms) list.push(`${k}|${m}`);
    return list;
  }

  const pool = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22, 24, 26, 29, 31, 33, 34, 35, 37, 38, 39, 41, 43, 47];
  const list: string[] = [];
  for (const n of pool) {
    const lo = Math.floor(Math.sqrt(n));
    const hi = lo + 1;
    const isTrue = n % 2 === 1;
    const interval = isTrue ? [lo, hi] : [lo + 1, hi + 1];
    list.push(`${n}|${interval[0]}|${interval[1]}|${isTrue ? 1 : 0}`);
  }
  return list;
}

function buildTriangleQuest(t: Mg05T, difficulty: Difficulty, mode: PythagorasMode, signature: string): Quest {
  const parts = signature.split("|").map(Number);
  if (mode === "SOLVE_HYP" || mode === "SOLVE_LEG") {
    const [baseA, baseB, baseC, scale] = parts;
    const a = baseA * scale;
    const b = baseB * scale;
    const c = baseC * scale;

    if (mode === "SOLVE_HYP") {
      const c2 = a * a + b * b;
      return {
        id: `PYT|SOLVE_HYP|${difficulty}|${a}|${b}`,
        tab: "PYTHAGORAS",
        mode,
        difficulty,
        promptLatex: `${t.pythagoras.solve_hyp}:\\; a=${a},\\; b=${b}`,
        targetLatex: `c`,
        steps: [
          { id: "c2", labelLatex: `c^2=a^2+b^2`, input: "number", answer: c2 },
          { id: "c", labelLatex: `c=\\sqrt{c^2}`, input: "number", answer: c },
        ],
        visual: { kind: "triangle", a, b, c },
      };
    }

    const knownIsA = (a + b + c) % 2 === 0;
    const known = knownIsA ? a : b;
    const missing = knownIsA ? b : a;
    const missing2 = c * c - known * known;
    return {
      id: `PYT|SOLVE_LEG|${difficulty}|${c}|${known}|${knownIsA ? "A" : "B"}`,
      tab: "PYTHAGORAS",
      mode,
      difficulty,
      promptLatex: `${t.pythagoras.solve_leg}:\\; c=${c},\\; ${knownIsA ? "a" : "b"}=${known}`,
      targetLatex: `${knownIsA ? "b" : "a"}`,
      steps: [
        { id: "c2", labelLatex: `${knownIsA ? "b^2" : "a^2"}=c^2-${knownIsA ? "a^2" : "b^2"}`, input: "number", answer: missing2 },
        { id: "c", labelLatex: `${knownIsA ? "b" : "a"}=\\sqrt{${knownIsA ? "b^2" : "a^2"}}`, input: "number", answer: missing },
      ],
      visual: { kind: "triangle", a, b, c },
    };
  }

  const [x, y, z, isRightFlag] = parts;
  const isRight = isRightFlag === 1;
  const sides = [x, y, z].sort((p, q) => p - q);
  const a = sides[0];
  const b = sides[1];
  const c = sides[2];
  return {
    id: `PYT|CHECK_RIGHT|${difficulty}|${a}|${b}|${c}|${isRight ? "T" : "F"}`,
    tab: "PYTHAGORAS",
    mode: "CHECK_RIGHT",
    difficulty,
    promptLatex: `${t.pythagoras.check_right}:\\; ${a},\\; ${b},\\; ${c}`,
    targetLatex: `\\text{right triangle?}`,
    steps: [{ id: "judge", labelLatex: `${a}^2+${b}^2\\stackrel{?}{=}${c}^2`, input: "boolean", answer: isRight }],
    visual: { kind: "triangle", a, b, c },
  };
}

function buildDistanceQuest(t: Mg05T, difficulty: Difficulty, signature: string): Quest {
  const [x1, y1, x2, y2] = signature.split("|").map(Number);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d2 = dx * dx + dy * dy;
  const simplified = simplifyRadical(d2);
  const exact: Radical = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplified;
  return {
    id: `PYT|DIST|${difficulty}|${x1}|${y1}|${x2}|${y2}`,
    tab: "PYTHAGORAS",
    mode: "DISTANCE",
    difficulty,
    promptLatex: `${t.pythagoras.distance}:\\; (${x1},${y1})\\to(${x2},${y2})`,
    targetLatex: `d`,
    steps: [
      { id: "d2", labelLatex: `d^2=(\\Delta x)^2+(\\Delta y)^2`, input: "number", answer: d2 },
      { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: exact },
    ],
    visual: { kind: "distance", p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } },
  };
}

function buildSpaceQuest(t: Mg05T, difficulty: Difficulty, signature: string): Quest {
  const [a, b, c] = signature.split("|").map(Number);
  const d2 = a * a + b * b + c * c;
  const simplified = simplifyRadical(d2);
  const exact: Radical = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplified;
  return {
    id: `PYT|SPACE|${difficulty}|${a}|${b}|${c}`,
    tab: "PYTHAGORAS",
    mode: "ELITE_SPACE",
    difficulty,
    promptLatex: `${t.pythagoras.elite_space}:\\; ${a}\\times${b}\\times${c}`,
    targetLatex: `d`,
    steps: [
      { id: "d2", labelLatex: `d^2=a^2+b^2+c^2`, input: "number", answer: d2 },
      { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: exact },
    ],
    visual: { kind: "space", a, b, c },
  };
}

function buildMissionQuest(t: Mg05T, difficulty: Difficulty, signature: string): Quest {
  const [kind, aRaw, bRaw] = signature.split("|");
  if (kind === "CERN") {
    const scale = Number(aRaw);
    const w = 16 * scale;
    const h = 9 * scale;
    const d2 = w * w + h * h;
    const exact: Radical = { k: scale, m: 337 };
    return {
      id: `PYT|MISSION|${difficulty}|CERN|${scale}`,
      tab: "PYTHAGORAS",
      mode: "MISSION",
      difficulty,
      promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.cern_title}}\\\\\\text{${t.mission.cern_desc}}`,
      targetLatex: `d`,
      steps: [
        { id: "d2", labelLatex: `d^2=w^2+h^2`, input: "number", answer: d2 },
        { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: exact },
      ],
      visual: { kind: "triangle", a: w, b: h, c: Math.sqrt(d2) },
    };
  }

  if (kind === "GRIND") {
    const a = Number(aRaw);
    const b = Number(bRaw);
    const d2 = a * a + b * b;
    const exact = simplifyRadical(d2);
    return {
      id: `PYT|MISSION|${difficulty}|GRIND|${a}|${b}`,
      tab: "PYTHAGORAS",
      mode: "MISSION",
      difficulty,
      promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.roof_title}}\\\\\\text{${t.mission.roof_desc}}`,
      targetLatex: `r`,
      steps: [
        { id: "r2", labelLatex: `r^2=a^2+b^2`, input: "number", answer: d2 },
        { id: "r", labelLatex: `r=\\sqrt{r^2}`, input: "radical", answer: exact },
      ],
      visual: { kind: "triangle", a, b, c: Math.sqrt(d2) },
    };
  }

  if (kind === "GRID") {
    const [x1, y1, x2, y2] = [Number(aRaw), Number(bRaw), Number(signature.split("|")[3]), Number(signature.split("|")[4])];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const d2 = dx * dx + dy * dy;
    const exact = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplifyRadical(d2);
    return {
      id: `PYT|MISSION|${difficulty}|GRID|${x1}|${y1}|${x2}|${y2}`,
      tab: "PYTHAGORAS",
      mode: "MISSION",
      difficulty,
      promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.grid_title}}\\\\\\text{${t.mission.grid_desc}}`,
      targetLatex: `d`,
      steps: [
        { id: "d2", labelLatex: `d^2=(\\Delta x)^2+(\\Delta y)^2`, input: "number", answer: d2 },
        { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: exact },
      ],
      visual: { kind: "distance", p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } },
    };
  }

  if (kind === "CHAIN") {
    const c = Number(signature.split("|")[3]);
    const a = Number(aRaw);
    const b = Number(bRaw);
    const s2 = a * a + b * b;
    const sExact = isPerfectSquare(s2) ? { k: Math.sqrt(s2), m: 1 } : simplifyRadical(s2);
    const d2 = s2 + c * c;
    const dExact = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplifyRadical(d2);
    return {
      id: `PYT|MISSION|${difficulty}|CHAIN|${a}|${b}|${c}`,
      tab: "PYTHAGORAS",
      mode: "MISSION",
      difficulty,
      promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.chain_title}}\\\\\\text{${t.mission.chain_desc}}`,
      targetLatex: `d`,
      steps: [
        { id: "s2", labelLatex: `s^2=a^2+b^2`, input: "number", answer: s2 },
        { id: "s", labelLatex: `s=\\sqrt{s^2}`, input: "radical", answer: sExact },
        { id: "d2", labelLatex: `d^2=s^2+c^2`, input: "number", answer: d2 },
        { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: dExact },
      ],
      visual: { kind: "space", a, b, c },
    };
  }

  const base = Number(aRaw);
  const height = Number(bRaw);
  const d2 = base * base + height * height;
  return {
    id: `PYT|MISSION|${difficulty}|LUCERNE|${base}|${height}`,
    tab: "PYTHAGORAS",
    mode: "MISSION",
    difficulty,
    promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.ladder_title}}\\\\\\text{${t.mission.ladder_desc}}`,
    targetLatex: `c`,
    steps: [
      { id: "c2", labelLatex: `c^2=a^2+b^2`, input: "number", answer: d2 },
      { id: "c", labelLatex: `c=\\sqrt{c^2}`, input: "number", answer: Math.sqrt(d2) },
    ],
    visual: { kind: "triangle", a: base, b: height, c: Math.sqrt(d2) },
  };
}

function buildSqrtQuest(t: Mg05T, difficulty: Difficulty, mode: SqrtMode, signature: string): Quest {
  if (mode === "PERFECT") {
    const n = Number(signature);
    const r = Math.sqrt(n);
    return {
      id: `SQRT|PERFECT|${difficulty}|${n}`,
      tab: "SQRT",
      mode,
      difficulty,
      promptLatex: `${t.sqrt.perfect}:\\; \\sqrt{${n}}`,
      targetLatex: `\\sqrt{${n}}`,
      steps: [{ id: "sqrt", labelLatex: `\\sqrt{${n}}`, input: "number", answer: r }],
      visual: { kind: "triangle", a: 3, b: 4, c: 5 },
    };
  }

  if (mode === "SIMPLIFY") {
    const [k, m] = signature.split("|").map(Number);
    const n = k * k * m;
    return {
      id: `SQRT|SIMPLIFY|${difficulty}|${k}|${m}`,
      tab: "SQRT",
      mode,
      difficulty,
      promptLatex: `${t.sqrt.simplify}:\\; \\sqrt{${n}}`,
      targetLatex: `\\sqrt{${n}}`,
      steps: [{ id: "simplify", labelLatex: `\\sqrt{${n}}=k\\sqrt{m}`, input: "radical", answer: { k, m } }],
      visual: { kind: "triangle", a: 3, b: 4, c: 5 },
    };
  }

  const [n, lo, hi, ans] = signature.split("|").map(Number);
  return {
    id: `SQRT|ESTIMATE|${difficulty}|${n}|${lo}|${hi}|${ans}`,
    tab: "SQRT",
    mode,
    difficulty,
    promptLatex: `${t.sqrt.estimate}:\\; \\sqrt{${n}}\\in[${lo},${hi}]\\,?`,
    targetLatex: `\\sqrt{${n}}`,
    steps: [{ id: "judge", labelLatex: `\\sqrt{${n}}\\in[${lo},${hi}]`, input: "boolean", answer: ans === 1 }],
    visual: { kind: "triangle", a: 3, b: 4, c: 5 },
  };
}

function makeQuest(t: Mg05T, tab: ModuleTab, difficulty: Difficulty, mode: Mode, signature: string) {
  if (tab === "PYTHAGORAS") {
    if (mode === "SOLVE_HYP" || mode === "SOLVE_LEG" || mode === "CHECK_RIGHT") {
      return buildTriangleQuest(t, difficulty, mode as PythagorasMode, signature);
    }
    if (mode === "DISTANCE") return buildDistanceQuest(t, difficulty, signature);
    if (mode === "MISSION") return buildMissionQuest(t, difficulty, signature);
    return buildSpaceQuest(t, difficulty, signature);
  }
  return buildSqrtQuest(t, difficulty, mode as SqrtMode, signature);
}

function TriangleCanvas({ a, b, c, highlightRightAngle }: { a: number; b: number; c: number; highlightRightAngle: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = 48;
    const maxLeg = Math.max(a, b);
    const scale = (Math.min(w, h) - pad * 2) / maxLeg;
    const ax = a * scale;
    const by = b * scale;

    const origin = { x: pad, y: h - pad };
    const pA = origin;
    const pB = { x: origin.x + ax, y: origin.y };
    const pC = { x: origin.x, y: origin.y - by };

    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.lineTo(pC.x, pC.y);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = highlightRightAngle ? "rgba(57,255,20,0.9)" : "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pA.x + 22, pA.y);
    ctx.lineTo(pA.x + 22, pA.y - 22);
    ctx.lineTo(pA.x, pA.y - 22);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillText(`a=${a}`, (pA.x + pB.x) / 2 - 20, pA.y + 24);
    ctx.fillText(`b=${b}`, pA.x - 44, (pA.y + pC.y) / 2 + 8);
    ctx.fillText(`c=${c}`, (pB.x + pC.x) / 2 + 10, (pB.y + pC.y) / 2 - 8);
  }, [a, b, c, highlightRightAngle]);

  return <canvas ref={ref} width={480} height={480} className="w-full h-auto block" />;
}

function DistanceCanvas({ p1, p2 }: { p1: { x: number; y: number }; p2: { x: number; y: number } }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = 36;
    const range = 12;
    const gridSize = (Math.min(w, h) - pad * 2) / (range * 2);
    const origin = { x: w / 2, y: h / 2 };

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    for (let i = -range; i <= range; i++) {
      ctx.beginPath();
      ctx.moveTo(origin.x + i * gridSize, pad);
      ctx.lineTo(origin.x + i * gridSize, h - pad);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pad, origin.y + i * gridSize);
      ctx.lineTo(w - pad, origin.y + i * gridSize);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad, origin.y);
    ctx.lineTo(w - pad, origin.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(origin.x, pad);
    ctx.lineTo(origin.x, h - pad);
    ctx.stroke();

    const toPx = (p: { x: number; y: number }) => ({
      x: origin.x + p.x * gridSize,
      y: origin.y - p.y * gridSize,
    });

    const P1 = toPx(p1);
    const P2 = toPx(p2);
    const corner = toPx({ x: p2.x, y: p1.y });

    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(P1.x, P1.y);
    ctx.lineTo(corner.x, corner.y);
    ctx.lineTo(P2.x, P2.y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = "rgba(57,255,20,0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(P1.x, P1.y);
    ctx.lineTo(P2.x, P2.y);
    ctx.stroke();

    const dot = (p: { x: number; y: number }, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
    };

    dot(P1, "rgba(255,255,255,0.95)");
    dot(P2, "rgba(255,255,255,0.95)");

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillText(`(${p1.x},${p1.y})`, P1.x + 10, P1.y - 10);
    ctx.fillText(`(${p2.x},${p2.y})`, P2.x + 10, P2.y - 10);
  }, [p1, p2]);

  return <canvas ref={ref} width={520} height={520} className="w-full h-auto block" />;
}

function RadicalSlotInput({
  value,
  onChange,
  labelK,
  labelM,
}: {
  value: Radical;
  onChange: (v: Radical) => void;
  labelK: string;
  labelM: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2 rounded-xl border border-neon-cyan/40 bg-white/5 px-3 py-2 shadow-[0_0_18px_rgba(0,255,200,0.2)]">
        <div className="text-[10px] font-black tracking-[0.4em] text-neon-cyan">{labelK}</div>
        <input
          value={value.k === 0 ? "" : String(value.k)}
          onChange={(e) => {
            const kk = Number(e.target.value.trim());
            onChange({ k: Number.isFinite(kk) ? kk : 0, m: value.m });
          }}
          className="w-20 bg-black border-2 border-neon-cyan/40 p-3 text-center outline-none focus:border-neon-cyan placeholder:text-white/30 font-black text-2xl text-white"
          inputMode="numeric"
          placeholder="?"
        />
      </div>
      <div className="text-4xl font-black text-white/80">√</div>
      <div className="flex items-center gap-2 rounded-xl border border-neon-green/40 bg-white/5 px-3 py-2 shadow-[0_0_18px_rgba(57,255,20,0.2)]">
        <div className="text-[10px] font-black tracking-[0.4em] text-neon-green">{labelM}</div>
        <input
          value={value.m === 0 ? "" : String(value.m)}
          onChange={(e) => {
            const mm = Number(e.target.value.trim());
            onChange({ k: value.k, m: Number.isFinite(mm) ? mm : 0 });
          }}
          className="w-20 bg-black border-2 border-neon-green/40 p-3 text-center outline-none focus:border-neon-green placeholder:text-white/30 font-black text-2xl text-white"
          inputMode="numeric"
          placeholder="?"
        />
      </div>
    </div>
  );
}

export default function MG05Page() {
  const { currentLanguage, setLanguage } = useAppStore();
  const t = translations[currentLanguage].s2_02 as Mg05T;

  const [tab, setTab] = useState<ModuleTab>("PYTHAGORAS");
  const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
  const [mode, setMode] = useState<Mode>("SOLVE_HYP");
  const [seq, setSeq] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [radicalAnswers, setRadicalAnswers] = useState<Record<string, Radical>>({});
  const [boolAnswer, setBoolAnswer] = useState<boolean | null>(null);
  const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correctLatex: string }>(null);

  const difficultyButtons = useMemo(
    () => ([
      { id: "BASIC", label: t.difficulty.basic },
      { id: "CORE", label: t.difficulty.core },
      { id: "ADVANCED", label: t.difficulty.advanced },
      { id: "ELITE", label: t.difficulty.elite },
    ] as const),
    [t.difficulty.advanced, t.difficulty.basic, t.difficulty.core, t.difficulty.elite]
  );

  const pModes = useMemo(
    () => ([
      { id: "SOLVE_HYP", label: t.pythagoras.solve_hyp, visible: true },
      { id: "SOLVE_LEG", label: t.pythagoras.solve_leg, visible: true },
      { id: "CHECK_RIGHT", label: t.pythagoras.check_right, visible: true },
      { id: "MISSION", label: t.mission.title, visible: true },
      { id: "DISTANCE", label: t.pythagoras.distance, visible: difficulty === "ADVANCED" || difficulty === "ELITE" },
      { id: "ELITE_SPACE", label: t.pythagoras.elite_space, visible: difficulty === "ELITE" },
    ] as const),
    [difficulty, t.mission.title, t.pythagoras.check_right, t.pythagoras.distance, t.pythagoras.elite_space, t.pythagoras.solve_hyp, t.pythagoras.solve_leg]
  );

  const sModes = useMemo(
    () => ([
      { id: "PERFECT", label: t.sqrt.perfect, visible: true },
      { id: "SIMPLIFY", label: t.sqrt.simplify, visible: true },
      { id: "ESTIMATE", label: t.sqrt.estimate, visible: difficulty !== "BASIC" },
    ] as const),
    [difficulty, t.sqrt.estimate, t.sqrt.perfect, t.sqrt.simplify]
  );

  const resetAll = () => {
    setAnswers({});
    setRadicalAnswers({});
    setBoolAnswer(null);
    setLastCheck(null);
  };

  const ensureModeValidity = (nextDifficulty: Difficulty, nextTab: ModuleTab, nextMode: Mode) => {
    if (nextTab === "PYTHAGORAS") {
      if (nextMode === "ELITE_SPACE" && nextDifficulty !== "ELITE") return "SOLVE_HYP";
      if (nextMode === "DISTANCE" && nextDifficulty !== "ADVANCED" && nextDifficulty !== "ELITE") return "SOLVE_HYP";
      return nextMode;
    }
    if (nextMode === "ESTIMATE" && nextDifficulty === "BASIC") return "PERFECT";
    return nextMode;
  };

  const candidates = useMemo(() => {
    const list = buildCandidates(tab, difficulty, mode);
    const seed = hashStringToUint32(`${tab}|${difficulty}|${mode}`);
    return shuffleDeterministic(list, seed);
  }, [difficulty, mode, tab]);

  const signature = useMemo(() => {
    if (candidates.length === 0) return "";
    return candidates[seq % candidates.length];
  }, [candidates, seq]);

  const quest = useMemo(() => {
    if (!signature) return null;
    return makeQuest(t, tab, difficulty, mode, signature);
  }, [difficulty, mode, signature, t, tab]);

  if (!quest) return null;

  const isBooleanQuest = quest.steps.some((s) => s.input === "boolean");

  const verify = () => {
    let ok = true;
    let correctLatex = "";

    for (const step of quest.steps) {
      if (step.input === "number") {
        const v = Number((answers[step.id] ?? "").trim());
        if (!Number.isFinite(v) || v !== step.answer) ok = false;
        if (!ok) correctLatex = `${step.labelLatex}:\\; ${step.answer}`;
      } else if (step.input === "radical") {
        const v = radicalAnswers[step.id] ?? { k: 0, m: 0 };
        if (v.k !== step.answer.k || v.m !== step.answer.m) ok = false;
        if (!ok) correctLatex = `${step.labelLatex}:\\; ${formatRadicalLatex(step.answer)}`;
      } else if (step.input === "boolean") {
        if (boolAnswer === null || boolAnswer !== step.answer) ok = false;
        if (!ok) correctLatex = `${step.labelLatex}:\\; ${step.answer ? t.yes : t.no}`;
      }
      if (!ok) break;
    }

    setLastCheck({ ok, correctLatex });
  };

  const next = () => {
    resetAll();
    setSeq((v) => v + 1);
  };

  const rightTitle = tab === "PYTHAGORAS" ? t.tabs.pythagoras : t.tabs.sqrt;

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

        <div className="flex items-center gap-2 z-10">
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
      </header>

      <div className="border-b border-white/10 bg-white/5 p-4 flex flex-col md:flex-row justify-center items-center gap-6 z-20 relative">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const nextTab: ModuleTab = "PYTHAGORAS";
              const nextMode = ensureModeValidity(difficulty, nextTab, "SOLVE_HYP");
              setTab(nextTab);
              setMode(nextMode);
              setSeq(0);
              resetAll();
            }}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 border-2 transition-all font-black",
              tab === "PYTHAGORAS" ? "border-white bg-white text-black" : "border-white/30 text-white hover:border-white/50"
            )}
          >
            <TriangleRight className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase">{t.tabs.pythagoras}</span>
          </button>
          <button
            onClick={() => {
              const nextTab: ModuleTab = "SQRT";
              const nextMode = ensureModeValidity(difficulty, nextTab, "PERFECT");
              setTab(nextTab);
              setMode(nextMode);
              setSeq(0);
              resetAll();
            }}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 border-2 transition-all font-black",
              tab === "SQRT" ? "border-white bg-white text-black" : "border-white/30 text-white hover:border-white/50"
            )}
          >
            <Sigma className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase">{t.tabs.sqrt}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {difficultyButtons.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                const nextDifficulty = d.id;
                const nextMode = ensureModeValidity(nextDifficulty, tab, mode);
                setDifficulty(nextDifficulty);
                setMode(nextMode);
                setSeq(0);
                resetAll();
              }}
              className={clsx(
                "px-3 py-2 border text-[10px] font-black tracking-[0.25em] uppercase transition-all",
                difficulty === d.id ? "border-white bg-white text-black" : "border-white/30 text-white hover:border-white/50"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 border-r-2 border-white/10 p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center">
          <div className="w-full max-w-5xl space-y-10">
            <div className="flex flex-wrap gap-3 justify-center">
              {(tab === "PYTHAGORAS" ? pModes : sModes)
                .filter((m) => m.visible)
                .map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      const nextMode = ensureModeValidity(difficulty, tab, m.id);
                      setMode(nextMode);
                      setSeq(0);
                      resetAll();
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
                  <InlineMath math={quest.promptLatex} />
                </p>
              </div>

              <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t.target_title}</span>
                <div className="font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95] whitespace-nowrap">
                  <InlineMath math={quest.targetLatex} />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
              {quest.steps.map((step) => (
                <div key={step.id} className="space-y-3">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                    <InlineMath math={step.labelLatex} />
                  </div>

                  {step.input === "number" && (
                    <input
                      value={answers[step.id] ?? ""}
                      onChange={(e) => setAnswers((v) => ({ ...v, [step.id]: e.target.value }))}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                      placeholder="?"
                      inputMode="numeric"
                    />
                  )}

                  {step.input === "radical" && (
                    <RadicalSlotInput
                      value={radicalAnswers[step.id] ?? { k: 0, m: 0 }}
                      onChange={(nextVal) => setRadicalAnswers((v) => ({ ...v, [step.id]: nextVal }))}
                      labelK={t.input_k}
                      labelM={t.input_m}
                    />
                  )}

                  {step.input === "boolean" && (
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setBoolAnswer(true)}
                        className={clsx(
                          "px-6 py-3 border-2 text-[10px] font-black tracking-[0.4em] uppercase transition-all",
                          boolAnswer === true ? "border-white bg-white/10" : "border-white/10 text-white/80 hover:border-white/40 hover:text-white"
                        )}
                      >
                        {t.yes}
                      </button>
                      <button
                        onClick={() => setBoolAnswer(false)}
                        className={clsx(
                          "px-6 py-3 border-2 text-[10px] font-black tracking-[0.4em] uppercase transition-all",
                          boolAnswer === false ? "border-white bg-white/10" : "border-white/10 text-white/80 hover:border-white/40 hover:text-white"
                        )}
                      >
                        {t.no}
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex flex-wrap items-center justify-center gap-4">
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
                <div className="text-center">
                  <div className={clsx("text-[10px] font-black tracking-[0.4em] uppercase", lastCheck.ok ? "text-neon-green" : "text-orange-400")}>
                    {lastCheck.ok ? t.correct : t.incorrect}
                  </div>
                  {!lastCheck.ok && (
                    <div className="mt-2 text-white/70 font-black">
                      <InlineMath math={lastCheck.correctLatex} />
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
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="border-2 border-white/10 rounded-xl p-6 bg-white/[0.02] space-y-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{rightTitle}</div>
              {quest.visual.kind === "triangle" && (
                <TriangleCanvas a={quest.visual.a} b={quest.visual.b} c={quest.visual.c} highlightRightAngle={!isBooleanQuest || mode === "CHECK_RIGHT"} />
              )}
              {quest.visual.kind === "distance" && (
                <DistanceCanvas p1={quest.visual.p1} p2={quest.visual.p2} />
              )}
              {quest.visual.kind === "space" && (
                <div className="space-y-4">
                  <div className="text-white font-black text-xl">
                    <InlineMath math={`a=${quest.visual.a},\\; b=${quest.visual.b},\\; c=${quest.visual.c}`} />
                  </div>
                  <div className="text-white/60 text-sm font-mono">
                    <InlineMath math={`d^2=a^2+b^2+c^2`} />
                  </div>
                </div>
              )}
              <div className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase flex items-center justify-between">
                <span>{difficulty}{" // "}MG05</span>
                <span className="flex items-center gap-2">
                  <Atom className="w-3 h-3" />
                  {lastCheck ? (lastCheck.ok ? t.correct : t.incorrect) : t.ready}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
        <span>{t.footer_left}</span>
        <span className="flex items-center gap-2">
          <div className={clsx("w-1 h-1 rounded-full animate-ping", lastCheck ? (lastCheck.ok ? "bg-neon-green" : "bg-orange-500") : "bg-white/20")} />
          {lastCheck ? (lastCheck.ok ? t.correct : t.incorrect) : t.ready}
        </span>
      </footer>
    </div>
  );
}
