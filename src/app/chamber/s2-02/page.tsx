"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S202PythagorasCanvas from "@/components/chamber/s2-02/PythagorasCanvas";
import RadicalSlotInput, { Radical } from "@/components/chamber/s2-02/RadicalInput";

type Mg05T = typeof translations.EN.s2_02;

type Stage =
  | "SOLVE_HYP" | "SOLVE_LEG" | "CHECK_RIGHT"
  | "DISTANCE" | "ELITE_SPACE" | "MISSION"
  | "MENTAL" | "CHAIN"
  | "PERFECT" | "SIMPLIFY" | "ESTIMATE";

interface S202Quest extends Quest {
  stage: Stage;
  tab: "PYTHAGORAS" | "SQRT";
  visual: {
    kind: "triangle" | "space" | "distance";
    a?: number;
    b?: number;
    c?: number;
    highlightRightAngle?: boolean;
    p1?: { x: number; y: number };
    p2?: { x: number; y: number };
  };
  steps: Array<
    | { id: string; labelLatex: string; input: "number"; answer: number }
    | { id: string; labelLatex: string; input: "radical"; answer: Radical }
    | { id: string; labelLatex: string; input: "boolean"; answer: boolean }
  >;
}

// Utility functions
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

function triangleTriples() {
  return [
    [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25],
    [12, 16, 20], [9, 40, 41], [20, 21, 29], [11, 60, 61], [28, 45, 53],
  ] as const;
}

function difficultyScale(d: Difficulty) {
  if (d === "BASIC") return [1, 2, 3, 4] as const;
  if (d === "CORE") return [2, 3, 4, 5] as const;
  if (d === "ADVANCED") return [3, 4, 5, 6] as const;
  return [4, 5, 6, 7] as const;
}

// Build quest pool for each stage
function buildStagePool(t: Mg05T, difficulty: Difficulty, stage: Stage): S202Quest[] {
  const tab: "PYTHAGORAS" | "SQRT" =
    ["SOLVE_HYP", "SOLVE_LEG", "CHECK_RIGHT", "DISTANCE", "ELITE_SPACE", "MISSION", "MENTAL", "CHAIN"].includes(stage)
      ? "PYTHAGORAS"
      : "SQRT";

  // PYTHAGORAS TAB - SOLVE_HYP
  if (stage === "SOLVE_HYP") {
    const triples = triangleTriples();
    const scales = difficultyScale(difficulty);
    const quests: S202Quest[] = [];

    for (const [baseA, baseB, baseC] of triples) {
      for (const scale of scales) {
        const a = baseA * scale;
        const b = baseB * scale;
        const c = baseC * scale;
        const c2 = a * a + b * b;

        quests.push({
          id: `PYT|SOLVE_HYP|${difficulty}|${a}|${b}`,
          difficulty, stage, tab,
          promptLatex: `${t.pythagoras.solve_hyp}:\\; a=${a},\\; b=${b}`,
          expressionLatex: `c^2=a^2+b^2`,
          targetLatex: `c`,
          correctLatex: `c=${c}`,
          slots: [],
          steps: [
            { id: "c2", labelLatex: `c^2=a^2+b^2`, input: "number", answer: c2 },
            { id: "c", labelLatex: `c=\\sqrt{c^2}`, input: "number", answer: c },
          ],
          visual: { kind: "triangle", a, b, c, highlightRightAngle: true },
        });
      }
    }
    return quests;
  }

  // PYTHAGORAS TAB - SOLVE_LEG
  if (stage === "SOLVE_LEG") {
    const triples = triangleTriples();
    const scales = difficultyScale(difficulty);
    const quests: S202Quest[] = [];

    for (const [baseA, baseB, baseC] of triples) {
      for (const scale of scales) {
        const a = baseA * scale;
        const b = baseB * scale;
        const c = baseC * scale;
        const knownIsA = (a + b + c) % 2 === 0;
        const known = knownIsA ? a : b;
        const missing = knownIsA ? b : a;
        const missing2 = c * c - known * known;

        quests.push({
          id: `PYT|SOLVE_LEG|${difficulty}|${c}|${known}|${knownIsA ? "A" : "B"}`,
          difficulty, stage, tab,
          promptLatex: `${t.pythagoras.solve_leg}:\\; c=${c},\\; ${knownIsA ? "a" : "b"}=${known}`,
          expressionLatex: `${knownIsA ? "b^2" : "a^2"}=c^2-${knownIsA ? "a^2" : "b^2"}`,
          targetLatex: `${knownIsA ? "b" : "a"}`,
          correctLatex: `${knownIsA ? "b" : "a"}=${missing}`,
          slots: [],
          steps: [
            { id: "leg2", labelLatex: `${knownIsA ? "b^2" : "a^2"}=c^2-${knownIsA ? "a^2" : "b^2"}`, input: "number", answer: missing2 },
            { id: "leg", labelLatex: `${knownIsA ? "b" : "a"}=\\sqrt{${knownIsA ? "b^2" : "a^2"}}`, input: "number", answer: missing },
          ],
          visual: { kind: "triangle", a, b, c, highlightRightAngle: true },
        });
      }
    }
    return quests;
  }

  // PYTHAGORAS TAB - CHECK_RIGHT
  if (stage === "CHECK_RIGHT") {
    const triples = triangleTriples();
    const scales = difficultyScale(difficulty);
    const quests: S202Quest[] = [];

    for (const [baseA, baseB, baseC] of triples) {
      for (const scale of scales) {
        const a = baseA * scale;
        const b = baseB * scale;
        const c = baseC * scale;

        // Right triangle (true)
        quests.push({
          id: `PYT|CHECK_RIGHT|${difficulty}|${a}|${b}|${c}|T`,
          difficulty, stage, tab,
          promptLatex: `${t.pythagoras.check_right}:\\; ${a},\\; ${b},\\; ${c}`,
          expressionLatex: `${a}^2+${b}^2\\stackrel{?}{=}${c}^2`,
          targetLatex: `\\text{right triangle?}`,
          correctLatex: `${t.yes}`,
          slots: [],
          steps: [{ id: "judge", labelLatex: `${a}^2+${b}^2\\stackrel{?}{=}${c}^2`, input: "boolean", answer: true }],
          visual: { kind: "triangle", a, b, c, highlightRightAngle: false },
        });

        // Not right triangle (false)
        quests.push({
          id: `PYT|CHECK_RIGHT|${difficulty}|${a}|${b}|${c + 1}|F`,
          difficulty, stage, tab,
          promptLatex: `${t.pythagoras.check_right}:\\; ${a},\\; ${b},\\; ${c + 1}`,
          expressionLatex: `${a}^2+${b}^2\\stackrel{?}{=}${c + 1}^2`,
          targetLatex: `\\text{right triangle?}`,
          correctLatex: `${t.no}`,
          slots: [],
          steps: [{ id: "judge", labelLatex: `${a}^2+${b}^2\\stackrel{?}{=}${c + 1}^2`, input: "boolean", answer: false }],
          visual: { kind: "triangle", a, b, c: c + 1, highlightRightAngle: false },
        });
      }
    }
    return quests;
  }

  // PYTHAGORAS TAB - DISTANCE
  if (stage === "DISTANCE") {
    const quests: S202Quest[] = [];
    const seed = hashStringToUint32(`DIST|${difficulty}`);
    const rnd = mulberry32(seed);
    const range = difficulty === "ADVANCED" ? 9 : 12;

    for (let i = 0; i < 120; i++) {
      const x1 = Math.floor(rnd() * (range * 2 + 1)) - range;
      const y1 = Math.floor(rnd() * (range * 2 + 1)) - range;
      const x2 = Math.floor(rnd() * (range * 2 + 1)) - range;
      const y2 = Math.floor(rnd() * (range * 2 + 1)) - range;
      if (x1 === x2 && y1 === y2) continue;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const d2 = dx * dx + dy * dy;
      const exact: Radical = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplifyRadical(d2);

      quests.push({
        id: `PYT|DIST|${difficulty}|${x1}|${y1}|${x2}|${y2}`,
        difficulty, stage, tab,
        promptLatex: `${t.pythagoras.distance}:\\; (${x1},${y1})\\to(${x2},${y2})`,
        expressionLatex: `d^2=(\\Delta x)^2+(\\Delta y)^2`,
        targetLatex: `d`,
        correctLatex: `d=${formatRadicalLatex(exact)}`,
        slots: [],
        steps: [
          { id: "d2", labelLatex: `d^2=(\\Delta x)^2+(\\Delta y)^2`, input: "number", answer: d2 },
          { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: exact },
        ],
        visual: { kind: "distance", p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } },
      });
    }
    return quests;
  }

  // PYTHAGORAS TAB - ELITE_SPACE
  if (stage === "ELITE_SPACE") {
    const quests: S202Quest[] = [];
    const seed = hashStringToUint32(`SPACE|${difficulty}`);
    const rnd = mulberry32(seed);
    const max = difficulty === "ELITE" ? 24 : 18;

    for (let i = 0; i < 120; i++) {
      const a = 2 + Math.floor(rnd() * (max - 1));
      const b = 2 + Math.floor(rnd() * (max - 1));
      const c = 2 + Math.floor(rnd() * (max - 1));
      const d2 = a * a + b * b + c * c;
      const exact: Radical = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplifyRadical(d2);

      quests.push({
        id: `PYT|SPACE|${difficulty}|${a}|${b}|${c}`,
        difficulty, stage, tab,
        promptLatex: `${t.pythagoras.elite_space}:\\; ${a}\\times${b}\\times${c}`,
        expressionLatex: `d^2=a^2+b^2+c^2`,
        targetLatex: `d`,
        correctLatex: `d=${formatRadicalLatex(exact)}`,
        slots: [],
        steps: [
          { id: "d2", labelLatex: `d^2=a^2+b^2+c^2`, input: "number", answer: d2 },
          { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: exact },
        ],
        visual: { kind: "space", a, b, c },
      });
    }
    return quests;
  }

  // PYTHAGORAS TAB - MISSION
  if (stage === "MISSION") {
    const quests: S202Quest[] = [];
    const scale = difficulty === "BASIC" ? 2 : difficulty === "CORE" ? 3 : difficulty === "ADVANCED" ? 4 : 5;
    const seed = hashStringToUint32(`MISSION|${difficulty}`);
    const rnd = mulberry32(seed);

    // CERN Mission
    const w = 16 * scale;
    const h = 9 * scale;
    const d2_cern = w * w + h * h;
    const exact_cern: Radical = { k: scale, m: 337 };
    quests.push({
      id: `PYT|MISSION|${difficulty}|CERN|${scale}`,
      difficulty, stage, tab,
      promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.cern_title}}\\\\\\text{${t.mission.cern_desc}}`,
      expressionLatex: `d^2=w^2+h^2`,
      targetLatex: `d`,
      correctLatex: `d=${formatRadicalLatex(exact_cern)}`,
      slots: [],
      steps: [
        { id: "d2", labelLatex: `d^2=w^2+h^2`, input: "number", answer: d2_cern },
        { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: exact_cern },
      ],
      visual: { kind: "triangle", a: w, b: h, c: Math.sqrt(d2_cern) },
    });

    // GRIND Mission
    const a_grind = 6 + scale;
    const b_grind = 6;
    const d2_grind = a_grind * a_grind + b_grind * b_grind;
    const exact_grind = simplifyRadical(d2_grind);
    quests.push({
      id: `PYT|MISSION|${difficulty}|GRIND|${a_grind}|${b_grind}`,
      difficulty, stage, tab,
      promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.roof_title}}\\\\\\text{${t.mission.roof_desc}}`,
      expressionLatex: `r^2=a^2+b^2`,
      targetLatex: `r`,
      correctLatex: `r=${formatRadicalLatex(exact_grind)}`,
      slots: [],
      steps: [
        { id: "r2", labelLatex: `r^2=a^2+b^2`, input: "number", answer: d2_grind },
        { id: "r", labelLatex: `r=\\sqrt{r^2}`, input: "radical", answer: exact_grind },
      ],
      visual: { kind: "triangle", a: a_grind, b: b_grind, c: Math.sqrt(d2_grind) },
    });

    // LUCERNE Mission
    const base_lucerne = 5;
    const height_lucerne = 12;
    const d2_lucerne = base_lucerne * base_lucerne + height_lucerne * height_lucerne;
    quests.push({
      id: `PYT|MISSION|${difficulty}|LUCERNE|${base_lucerne}|${height_lucerne}`,
      difficulty, stage, tab,
      promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.ladder_title}}\\\\\\text{${t.mission.ladder_desc}}`,
      expressionLatex: `c^2=a^2+b^2`,
      targetLatex: `c`,
      correctLatex: `c=${Math.sqrt(d2_lucerne)}`,
      slots: [],
      steps: [
        { id: "c2", labelLatex: `c^2=a^2+b^2`, input: "number", answer: d2_lucerne },
        { id: "c", labelLatex: `c=\\sqrt{c^2}`, input: "number", answer: Math.sqrt(d2_lucerne) },
      ],
      visual: { kind: "triangle", a: base_lucerne, b: height_lucerne, c: Math.sqrt(d2_lucerne) },
    });

    // GRID Missions (3 random)
    for (let i = 0; i < 3; i++) {
      const x1 = Math.floor(rnd() * 11) - 5;
      const y1 = Math.floor(rnd() * 11) - 5;
      let x2 = Math.floor(rnd() * 11) - 5;
      const y2 = Math.floor(rnd() * 11) - 5;
      if (x1 === x2 && y1 === y2) x2 += 2;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const d2 = dx * dx + dy * dy;
      const exact = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplifyRadical(d2);

      quests.push({
        id: `PYT|MISSION|${difficulty}|GRID|${x1}|${y1}|${x2}|${y2}`,
        difficulty, stage, tab,
        promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.grid_title}}\\\\\\text{${t.mission.grid_desc}}`,
        expressionLatex: `d^2=(\\Delta x)^2+(\\Delta y)^2`,
        targetLatex: `d`,
        correctLatex: `d=${formatRadicalLatex(exact)}`,
        slots: [],
        steps: [
          { id: "d2", labelLatex: `d^2=(\\Delta x)^2+(\\Delta y)^2`, input: "number", answer: d2 },
          { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: exact },
        ],
        visual: { kind: "distance", p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } },
      });
    }

    // CHAIN Mission
    const chainScale = difficulty === "BASIC" ? 1 : difficulty === "CORE" ? 2 : difficulty === "ADVANCED" ? 2 : 3;
    const baseTriples = triangleTriples();
    const [a_chain, b_chain, c_chain_base] = baseTriples[(seed + 3) % baseTriples.length];
    const a = a_chain * chainScale;
    const b = b_chain * chainScale;
    const c = c_chain_base;
    const s2 = a * a + b * b;
    const sExact = isPerfectSquare(s2) ? { k: Math.sqrt(s2), m: 1 } : simplifyRadical(s2);
    const d2 = s2 + c * c;
    const dExact = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplifyRadical(d2);

    quests.push({
      id: `PYT|MISSION|${difficulty}|CHAIN|${a}|${b}|${c}`,
      difficulty, stage, tab,
      promptLatex: `\\text{${t.mission.protocol}}\\\\\\text{${t.mission.chain_title}}\\\\\\text{${t.mission.chain_desc}}`,
      expressionLatex: `d^2=s^2+c^2`,
      targetLatex: `d`,
      correctLatex: `d=${formatRadicalLatex(dExact)}`,
      slots: [],
      steps: [
        { id: "s2", labelLatex: `s^2=a^2+b^2`, input: "number", answer: s2 },
        { id: "s", labelLatex: `s=\\sqrt{s^2}`, input: "radical", answer: sExact },
        { id: "d2", labelLatex: `d^2=s^2+c^2`, input: "number", answer: d2 },
        { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: dExact },
      ],
      visual: { kind: "space", a, b, c },
    });

    return quests;
  }

  // PYTHAGORAS TAB - MENTAL
  if (stage === "MENTAL") {
    const triples = triangleTriples();
    const quests: S202Quest[] = [];
    const seed = hashStringToUint32(`MENTAL|${difficulty}`);
    const rnd = mulberry32(seed);

    for (let i = 0; i < 20; i++) {
      const t_triple = triples[Math.floor(rnd() * 5)]; // Use first 5 simplest triples
      const scale = difficulty === "BASIC" ? 1 : Math.floor(rnd() * 3) + 1;
      const isHyp = rnd() > 0.5;
      const a = t_triple[0] * scale;
      const b = t_triple[1] * scale;
      const c = t_triple[2] * scale;

      quests.push({
        id: `PYT|MENTAL|${difficulty}|${a}|${b}|${c}|${isHyp ? 'H' : 'L'}`,
        difficulty, stage, tab,
        promptLatex: isHyp ? `a=${a},\\; b=${b}` : `c=${c},\\; a=${a}`,
        expressionLatex: isHyp ? `c^2=a^2+b^2` : `b^2=c^2-a^2`,
        targetLatex: isHyp ? `c` : `b`,
        correctLatex: isHyp ? `c=${c}` : `b=${b}`,
        slots: [],
        steps: [{ id: "ans", labelLatex: isHyp ? `c` : `b`, input: "number", answer: isHyp ? c : b }],
        visual: { kind: "triangle", a, b, c, highlightRightAngle: true },
      });
    }
    return quests;
  }

  // PYTHAGORAS TAB - CHAIN
  if (stage === "CHAIN") {
    const baseTriples = triangleTriples();
    const quests: S202Quest[] = [];
    const seed = hashStringToUint32(`CHAIN|${difficulty}`);
    const rnd = mulberry32(seed);

    for (let i = 0; i < 10; i++) {
      const t1 = baseTriples[Math.floor(rnd() * baseTriples.length)];
      const scale = difficulty === "BASIC" ? 1 : 2;
      const a = t1[0] * scale;
      const b = t1[1] * scale;
      const c = Math.floor(rnd() * 10) + 1;

      const s2 = a * a + b * b;
      const sExact = isPerfectSquare(s2) ? { k: Math.sqrt(s2), m: 1 } : simplifyRadical(s2);
      const d2 = s2 + c * c;
      const dExact = isPerfectSquare(d2) ? { k: Math.sqrt(d2), m: 1 } : simplifyRadical(d2);

      quests.push({
        id: `PYT|CHAIN|${difficulty}|${a}|${b}|${c}`,
        difficulty, stage, tab,
        promptLatex: `${t.mental.chain}:\\; a=${a},\\; b=${b},\\; c=${c}`,
        expressionLatex: `d^2=s^2+c^2`,
        targetLatex: `d`,
        correctLatex: `d=${formatRadicalLatex(dExact)}`,
        slots: [],
        steps: [
          { id: "s2", labelLatex: `s^2=a^2+b^2`, input: "number", answer: s2 },
          { id: "s", labelLatex: `s=\\sqrt{s^2}`, input: "radical", answer: sExact },
          { id: "d2", labelLatex: `d^2=s^2+c^2`, input: "number", answer: d2 },
          { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", answer: dExact },
        ],
        visual: { kind: "space", a, b, c },
      });
    }
    return quests;
  }

  // SQRT TAB - PERFECT
  if (stage === "PERFECT") {
    const squares = [
      1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400,
      441, 484, 529, 576, 625, 676, 729, 784, 841, 900,
    ];
    const cap = difficulty === "BASIC" ? 20 : difficulty === "CORE" ? 25 : 30;
    const quests: S202Quest[] = [];

    for (const n of squares.slice(0, cap)) {
      const r = Math.sqrt(n);
      quests.push({
        id: `SQRT|PERFECT|${difficulty}|${n}`,
        difficulty, stage, tab,
        promptLatex: `${t.sqrt.perfect}:\\; \\sqrt{${n}}`,
        expressionLatex: `\\sqrt{${n}}`,
        targetLatex: `\\sqrt{${n}}`,
        correctLatex: `${r}`,
        slots: [],
        steps: [{ id: "sqrt", labelLatex: `\\sqrt{${n}}`, input: "number", answer: r }],
        visual: { kind: "triangle", a: 3, b: 4, c: 5 },
      });
    }
    return quests;
  }

  // SQRT TAB - SIMPLIFY
  if (stage === "SIMPLIFY") {
    const ms = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30];
    const ks = difficulty === "BASIC" ? [2, 3, 4, 5, 6] : difficulty === "CORE" ? [2, 3, 4, 5, 6, 7, 8] : [3, 4, 5, 6, 7, 8, 9, 10, 12];
    const quests: S202Quest[] = [];

    for (const k of ks) {
      for (const m of ms) {
        const n = k * k * m;
        quests.push({
          id: `SQRT|SIMPLIFY|${difficulty}|${k}|${m}`,
          difficulty, stage, tab,
          promptLatex: `${t.sqrt.simplify}:\\; \\sqrt{${n}}`,
          expressionLatex: `\\sqrt{${n}}=k\\sqrt{m}`,
          targetLatex: `k\\sqrt{m}`,
          correctLatex: `${formatRadicalLatex({ k, m })}`,
          slots: [],
          steps: [{ id: "simplify", labelLatex: `\\sqrt{${n}}=k\\sqrt{m}`, input: "radical", answer: { k, m } }],
          visual: { kind: "triangle", a: 3, b: 4, c: 5 },
        });
      }
    }
    return quests;
  }

  // SQRT TAB - ESTIMATE
  if (stage === "ESTIMATE") {
    const pool = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22, 24, 26, 29, 31, 33, 34, 35, 37, 38, 39, 41, 43, 47];
    const quests: S202Quest[] = [];

    for (const n of pool) {
      const lo = Math.floor(Math.sqrt(n));
      const hi = lo + 1;
      const isTrue = n % 2 === 1;
      const interval = isTrue ? [lo, hi] : [lo + 1, hi + 1];

      quests.push({
        id: `SQRT|ESTIMATE|${difficulty}|${n}|${interval[0]}|${interval[1]}|${isTrue ? 1 : 0}`,
        difficulty, stage, tab,
        promptLatex: `${t.sqrt.estimate}:\\; \\sqrt{${n}}\\in[${interval[0]},${interval[1]}]\\,?`,
        expressionLatex: `\\sqrt{${n}}`,
        targetLatex: `\\sqrt{${n}}\\in[${interval[0]},${interval[1]}]`,
        correctLatex: isTrue ? t.yes : t.no,
        slots: [],
        steps: [{ id: "judge", labelLatex: `\\sqrt{${n}}\\in[${interval[0]},${interval[1]}]`, input: "boolean", answer: isTrue }],
        visual: { kind: "triangle", a: 3, b: 4, c: 5 },
      });
    }
    return quests;
  }

  return [];
}

// Main component
export default function S202Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].s2_02 as Mg05T;

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    successRate,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<S202Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "SOLVE_HYP",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("s2-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  if (!currentQuest) return null;

  const isPythagorasTab = currentQuest.tab === "PYTHAGORAS";
  const isSqrtTab = currentQuest.tab === "SQRT";

  // Stage definitions
  const pythagorasStages = [
    { id: "SOLVE_HYP", label: t.pythagoras.solve_hyp },
    { id: "SOLVE_LEG", label: t.pythagoras.solve_leg },
    { id: "CHECK_RIGHT", label: t.pythagoras.check_right },
    { id: "MISSION", label: t.mission.title },
    { id: "MENTAL", label: t.mental.title },
    ...(difficulty === "ADVANCED" || difficulty === "ELITE" ? [
      { id: "CHAIN", label: t.mental.chain },
      { id: "DISTANCE", label: t.pythagoras.distance },
    ] : []),
    ...(difficulty === "ELITE" ? [{ id: "ELITE_SPACE", label: t.pythagoras.elite_space }] : []),
  ];

  const sqrtStages = [
    { id: "PERFECT", label: t.sqrt.perfect },
    { id: "SIMPLIFY", label: t.sqrt.simplify },
    ...(difficulty !== "BASIC" ? [{ id: "ESTIMATE", label: t.sqrt.estimate }] : []),
  ];

  const currentStages = isPythagorasTab ? pythagorasStages : sqrtStages;

  // Tab switching
  const handleTabChange = (newTab: "PYTHAGORAS" | "SQRT") => {
    const newStage = newTab === "PYTHAGORAS" ? "SOLVE_HYP" : "PERFECT";
    handleStageChange(newStage as Stage);
  };

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="S2.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={currentStages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {isPythagorasTab ? t.tabs.pythagoras : t.tabs.sqrt}
          </div>
          <S202PythagorasCanvas visual={currentQuest.visual} />
          {currentQuest.visual.kind === "space" && (
            <div className="text-white/60 text-sm font-mono text-center">
              <InlineMath math={`d^2=a^2+b^2+c^2`} />
            </div>
          )}
        </div>
      }
    >

      {/* Tab Switcher */}
      <div className="flex gap-3 justify-center mb-8">
        <button
          onClick={() => handleTabChange("PYTHAGORAS")}
          className={clsx(
            "px-6 py-3 border-2 text-[10px] font-black tracking-[0.3em] uppercase transition-all",
            isPythagorasTab
              ? "border-white bg-white text-black"
              : "border-white/30 text-white hover:border-white/50"
          )}
        >
          {t.tabs.pythagoras}
        </button>
        <button
          onClick={() => handleTabChange("SQRT")}
          className={clsx(
            "px-6 py-3 border-2 text-[10px] font-black tracking-[0.3em] uppercase transition-all",
            isSqrtTab
              ? "border-white bg-white text-black"
              : "border-white/30 text-white hover:border-white/50"
          )}
        >
          {t.tabs.sqrt}
        </button>
      </div>

      {/* Quest Content */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
            <InlineMath math={currentQuest.promptLatex} />
          </p>
        </div>

        <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
          <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
            {t.target_title}
          </span>
          <div className="font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95] whitespace-nowrap">
            <InlineMath math={currentQuest.targetLatex} />
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
        {currentQuest.steps.map((step) => (
          <div key={step.id} className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
              <InlineMath math={step.labelLatex} />
            </div>

            {step.input === "number" && (
              <input
                value={inputs[step.id] || ""}
                onChange={(e) => setInputs({ ...inputs, [step.id]: e.target.value })}
                className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                placeholder="?"
                inputMode="numeric"
              />
            )}

            {step.input === "radical" && (
              <RadicalSlotInput
                value={(() => { try { return JSON.parse(inputs[step.id] || "{}"); } catch { return { k: 0, m: 0 }; } })()}
                onChange={(v) => setInputs({ ...inputs, [step.id]: JSON.stringify(v) })}
                labelK={t.input_k}
                labelM={t.input_m}
              />
            )}

            {step.input === "boolean" && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setInputs({ ...inputs, [step.id]: "true" })}
                  className={clsx(
                    "px-6 py-3 border-2 text-[10px] font-black tracking-[0.4em] uppercase transition-all",
                    inputs[step.id] === "true"
                      ? "border-white bg-white/10"
                      : "border-white/10 text-white/80 hover:border-white/40 hover:text-white"
                  )}
                >
                  {t.yes}
                </button>
                <button
                  onClick={() => setInputs({ ...inputs, [step.id]: "false" })}
                  className={clsx(
                    "px-6 py-3 border-2 text-[10px] font-black tracking-[0.4em] uppercase transition-all",
                    inputs[step.id] === "false"
                      ? "border-white bg-white/10"
                      : "border-white/10 text-white/80 hover:border-white/40 hover:text-white"
                  )}
                >
                  {t.no}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ChamberLayout>
  );
}
