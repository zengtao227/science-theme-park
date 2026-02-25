"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useState, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S202PythagorasCanvas from "@/components/chamber/sm2-02/PythagorasCanvas";
import PythagorasSimple2D from "@/components/chamber/sm2-02/PythagorasSimple2D";
import PythagorasFluidCanvas from "@/components/chamber/sm2-02/PythagorasFluidCanvas";
import RadicalSlotInput, { Radical } from "@/components/chamber/sm2-02/RadicalInput";
import { formatRadicalLatex, simplifyRadical as sharedSimplifyRadical } from "@/lib/math";

type Stage =
  | "EXPLORER"
  | "SOLVE_HYP" | "SOLVE_LEG" | "CHECK_RIGHT"
  | "DISTANCE" | "ELITE_SPACE" | "MISSION"
  | "MENTAL" | "CHAIN"
  | "PERFECT" | "SIMPLIFY" | "ESTIMATE";

const renderMixedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("$") && p.endsWith("$")) {
          return <InlineMath key={i} math={p.slice(1, -1)} />;
        }
        return <span key={i} className="font-sans font-black whitespace-pre-wrap">{p}</span>;
      })}
    </>
  );
};

interface S202Slot {
  id: string;
  labelLatex: string;
  placeholder: string;
  expected: string | number;
  input: "number" | "radical" | "boolean";
}

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
  slots: S202Slot[];
}

// Utility functions
function simplifyRadical(n: number): Radical {
  if (n <= 0) return { k: 0, m: 0 };
  return sharedSimplifyRadical(n);
}

function isPerfectSquare(n: number) {
  const r = Math.floor(Math.sqrt(n));
  return r * r === n;
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
function buildStagePool(sm2_02_t: any, difficulty: Difficulty, stage: Stage): S202Quest[] {
  const tab: "PYTHAGORAS" | "SQRT" =
    ["EXPLORER", "SOLVE_HYP", "SOLVE_LEG", "CHECK_RIGHT", "DISTANCE", "ELITE_SPACE", "MISSION", "MENTAL", "CHAIN"].includes(stage)
      ? "PYTHAGORAS"
      : "SQRT";

  if (stage === "EXPLORER") {
    return [{
      id: "EXPLORER",
      difficulty, stage, tab,
      promptLatex: sm2_02_t.pythagoras.explorer_mission || "Pythagorean Explorer: Adjust scale and witness constants.",
      expressionLatex: "a^{2} + b^{2} = c^{2}",
      targetLatex: "(k a)^{2} + (k b)^{2} = (k c)^{2}",
      correctLatex: "",
      slots: [],
      visual: { kind: "triangle", a: 3, b: 4, c: 5 },
    }];
  }

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
          promptLatex: `${sm2_02_t.pythagoras.solve_hyp}: $a=${a}, \\, b=${b}$`,
          expressionLatex: `c^{2} = a^{2} + b^{2}`,
          targetLatex: `c`,
          correctLatex: `c = ${c}`,
          slots: [
            { id: "c2", labelLatex: `c^{2}=a^{2}+b^{2}`, input: "number", expected: c2, placeholder: "?" },
            { id: "c", labelLatex: `c=\\sqrt{c^2}`, input: "number", expected: c, placeholder: "?" },
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

        const knownLabel = knownIsA ? sm2_02_t.pythagoras.known_horizontal : sm2_02_t.pythagoras.known_given;
        const knownVar = knownIsA ? "a" : "b";

        quests.push({
          id: `PYT|SOLVE_LEG|${difficulty}|${c}|${known}|${knownIsA ? "A" : "B"}`,
          difficulty, stage, tab,
          promptLatex: `${sm2_02_t.pythagoras.solve_leg}: $c=${c}, \\, ${knownVar}=${known}$`,
          expressionLatex: `${knownIsA ? "b^{2}" : "a^{2}"} = c^{2} - ${knownIsA ? "a^{2}" : "b^{2}"}`,
          targetLatex: `${knownIsA ? "b" : "a"}`,
          correctLatex: `${knownIsA ? "b" : "a"} = ${missing}`,
          slots: [
            { id: "leg2", labelLatex: `${knownIsA ? "b^{2}" : "a^{2}"}=c^{2}-${knownIsA ? "a^{2}" : "b^{2}"}`, input: "number", expected: missing2, placeholder: "?" },
            { id: "leg", labelLatex: `${knownIsA ? "b" : "a"}=\\sqrt{${knownIsA ? "b^{2}" : "a^{2}"}}`, input: "number", expected: missing, placeholder: "?" },
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
          promptLatex: `${sm2_02_t.pythagoras.check_right}: $${a}, \\, ${b}, \\, ${c}$`,
          expressionLatex: `${a}^{2} + ${b}^{2} \\stackrel{?}{=} ${c}^{2}`,
          targetLatex: `\\text{Rechtwinkliges Dreieck?}`,
          correctLatex: `${sm2_02_t.yes}`,
          slots: [{ id: "judge", labelLatex: `${a}^{2}+${b}^{2}\\stackrel{?}{=}${c}^{2}`, input: "boolean", expected: "true", placeholder: "?" }],
          visual: { kind: "triangle", a, b, c, highlightRightAngle: false },
        });

        // Not right triangle (false)
        quests.push({
          id: `PYT|CHECK_RIGHT|${difficulty}|${a}|${b}|${c + 1}|F`,
          difficulty, stage, tab,
          promptLatex: `${sm2_02_t.pythagoras.check_right}: $${a}, \\, ${b}, \\, ${c + 1}$`,
          expressionLatex: `${a}^{2} + ${b}^{2} \\stackrel{?}{=} ${c + 1}^{2}`,
          targetLatex: `\\text{Rechtwinkliges Dreieck?}`,
          correctLatex: `${sm2_02_t.no}`,
          slots: [{ id: "judge", labelLatex: `${a}^{2}+${b}^{2}\\stackrel{?}{=}${c + 1}^{2}`, input: "boolean", expected: "false", placeholder: "?" }],
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
        promptLatex: `${sm2_02_t.pythagoras.distance}: $({${x1}}, {${y1}}) \\rightarrow ({${x2}}, {${y2}})$`,
        expressionLatex: `d^{2} = (\\Delta x)^{2} + (\\Delta y)^{2}`,
        targetLatex: `d`,
        correctLatex: `d=${formatRadicalLatex(exact)}`,
        slots: [
          { id: "d2", labelLatex: `d^{2}=(\\Delta x)^{2}+(\\Delta y)^{2}`, input: "number", expected: d2, placeholder: "?" },
          { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", expected: JSON.stringify(exact), placeholder: "?" },
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
        promptLatex: `${sm2_02_t.pythagoras.elite_space}: $a = ${a}, \\, b = ${b}, \\, c = ${c}$`,
        expressionLatex: `d^{2} = a^{2} + b^{2} + c^{2}`,
        targetLatex: `d`,
        correctLatex: `d=${formatRadicalLatex(exact)}`,
        slots: [
          { id: "d2", labelLatex: `d^{2}=a^{2}+b^{2}+c^{2}`, input: "number", expected: d2, placeholder: "?" },
          { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", expected: JSON.stringify(exact), placeholder: "?" },
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
      promptLatex: `${sm2_02_t.mission.cern_title} — ${sm2_02_t.mission.cern_desc}`,
      expressionLatex: `d^{2}=w^{2}+h^{2}`,
      targetLatex: `d`,
      correctLatex: `d=${formatRadicalLatex(exact_cern)}`,
      slots: [
        { id: "d2", labelLatex: `d^{2}=w^{2}+h^{2}`, input: "number", expected: d2_cern, placeholder: "?" },
        { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", expected: JSON.stringify(exact_cern), placeholder: "?" },
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
      promptLatex: `${sm2_02_t.mission.roof_title} — ${sm2_02_t.mission.roof_desc}`,
      expressionLatex: `r^{2}=a^{2}+b^{2}`,
      targetLatex: `r`,
      correctLatex: `r=${formatRadicalLatex(exact_grind)}`,
      slots: [
        { id: "r2", labelLatex: `r^{2}=a^{2}+b^{2}`, input: "number", expected: d2_grind, placeholder: "?" },
        { id: "r", labelLatex: `r=\\sqrt{r^2}`, input: "radical", expected: JSON.stringify(exact_grind), placeholder: "?" },
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
      promptLatex: `${sm2_02_t.mission.ladder_title} — ${sm2_02_t.mission.ladder_desc}`,
      expressionLatex: `c^{2}=a^{2}+b^{2}`,
      targetLatex: `c`,
      correctLatex: `c=${Math.sqrt(d2_lucerne)}`,
      slots: [
        { id: "c2", labelLatex: `c^{2}=a^{2}+b^{2}`, input: "number", expected: d2_lucerne, placeholder: "?" },
        { id: "c", labelLatex: `c=\\sqrt{c^2}`, input: "number", expected: Math.sqrt(d2_lucerne), placeholder: "?" },
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
        promptLatex: `${sm2_02_t.mission.grid_title} — ${sm2_02_t.mission.grid_desc}`,
        expressionLatex: `d^{2}=(\\Delta x)^{2}+(\\Delta y)^{2}`,
        targetLatex: `d`,
        correctLatex: `d=${formatRadicalLatex(exact)}`,
        slots: [
          { id: "d2", labelLatex: `d^{2}=(\\Delta x)^{2}+(\\Delta y)^{2}`, input: "number", expected: d2, placeholder: "?" },
          { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", expected: JSON.stringify(exact), placeholder: "?" },
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
      promptLatex: `${sm2_02_t.mission.chain_title} — ${sm2_02_t.mission.chain_desc}`,
      expressionLatex: `d^{2}=s^{2}+c^{2}`,
      targetLatex: `d`,
      correctLatex: `d=${formatRadicalLatex(dExact)}`,
      slots: [
        { id: "s2", labelLatex: `s^{2}=a^{2}+b^{2}`, input: "number", expected: s2, placeholder: "?" },
        { id: "s", labelLatex: `s=\\sqrt{s^2}`, input: "radical", expected: JSON.stringify(sExact), placeholder: "?" },
        { id: "d2", labelLatex: `d^{2}=s^{2}+c^{2}`, input: "number", expected: d2, placeholder: "?" },
        { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", expected: JSON.stringify(dExact), placeholder: "?" },
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
        id: `MENT_B_${i}`, difficulty, stage, tab,
        promptLatex: isHyp ? `$a=${a}, \\, b=${b}$` : `$c=${c}, \\, a=${a}$`,
        expressionLatex: isHyp ? `c = \\sqrt{a^2 + b^2}` : `b = \\sqrt{c^2 - a^2}`,
        targetLatex: isHyp ? `c` : `b`,
        correctLatex: isHyp ? `c=${c}` : `b=${b}`,
        slots: [{ id: "ans", labelLatex: isHyp ? `c` : `b`, input: "number", expected: isHyp ? c : b, placeholder: "?" }],
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
        id: `MENT_C_${i}`, difficulty, stage, tab,
        promptLatex: `${sm2_02_t.mental.chain}: $a=${a}, \\, b=${b}, \\, c=${c}$`,
        expressionLatex: `d = \\sqrt{a^2 + b^2 + c^2}`,
        targetLatex: `d`,
        correctLatex: `d=${formatRadicalLatex(dExact)}`,
        slots: [
          { id: "s2", labelLatex: `s^{2}=a^{2}+b^{2}`, input: "number", expected: s2, placeholder: "?" },
          { id: "s", labelLatex: `s=\\sqrt{s^2}`, input: "radical", expected: JSON.stringify(sExact), placeholder: "?" },
          { id: "d2", labelLatex: `d^{2}=s^{2}+c^{2}`, input: "number", expected: d2, placeholder: "?" },
          { id: "d", labelLatex: `d=\\sqrt{d^2}`, input: "radical", expected: JSON.stringify(dExact), placeholder: "?" },
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
        promptLatex: `${sm2_02_t.sqrt.perfect}: $\\sqrt{${n}}$`,
        expressionLatex: `\\sqrt{${n}}`,
        targetLatex: `\\sqrt{${n}}`,
        correctLatex: `${r}`,
        slots: [{ id: "sqrt", labelLatex: `\\sqrt{${n}}`, input: "number", expected: r, placeholder: "?" }],
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
          promptLatex: `${sm2_02_t.sqrt.simplify}: $\\sqrt{${n}}$`,
          expressionLatex: `\\sqrt{${n}} = k\\sqrt{m}`,
          targetLatex: `k\\sqrt{m}`,
          correctLatex: `${formatRadicalLatex({ k, m })}`,
          slots: [{ id: "simplify", labelLatex: `\\sqrt{${n}}=k\\sqrt{m}`, input: "radical", expected: JSON.stringify({ k, m }), placeholder: "?" }],
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
        promptLatex: `${sm2_02_t.sqrt.estimate}: $\\sqrt{${n}} \\in [${interval[0]}, ${interval[1]}]$ ?`,
        expressionLatex: `\\sqrt{${n}}`,
        targetLatex: `\\sqrt{${n}} \\in [${interval[0]}, ${interval[1]}]`,
        correctLatex: isTrue ? sm2_02_t.yes : sm2_02_t.no,
        slots: [{ id: "judge", labelLatex: `\\sqrt{${n}}\\in[${interval[0]},${interval[1]}]`, input: "boolean", expected: isTrue ? "true" : "false", placeholder: "?" }],
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
  const { t } = useLanguage();

  const sm2_02_t = {
    title: t("sm2_02.title"),
    back: t("sm2_02.back"),
    check: t("sm2_02.check"),
    next: t("sm2_02.next"),
    correct: t("sm2_02.correct"),
    incorrect: t("sm2_02.incorrect"),
    ready: t("sm2_02.ready"),
    yes: t("sm2_02.yes"),
    no: t("sm2_02.no"),
    monitor_title: t("sm2_02.monitor_title"),
    objective_title: t("sm2_02.objective_title"),
    target_title: t("sm2_02.target_title"),
    input_k: t("sm2_02.input_k"),
    input_m: t("sm2_02.input_m"),
    difficulty: {
      basic: t("sm2_02.difficulty.basic"),
      core: t("sm2_02.difficulty.core"),
      advanced: t("sm2_02.difficulty.advanced"),
      elite: t("sm2_02.difficulty.elite")
    },
    tabs: {
      pythagoras: t("sm2_02.tabs.pythagoras"),
      sqrt: t("sm2_02.tabs.sqrt"),
      explorer: t("sm2_02.tabs.explorer"),
      quest_mode: t("sm2_02.tabs.quest_mode")
    },
    pythagoras: {
      solve_hyp: t("sm2_02.pythagoras.solve_hyp"),
      solve_hyp_params: t("sm2_02.pythagoras.solve_hyp_params"),
      solve_leg: t("sm2_02.pythagoras.solve_leg"),
      solve_leg_params: t("sm2_02.pythagoras.solve_leg_params"),
      known_horizontal: t("sm2_02.pythagoras.known_horizontal"),
      known_given: t("sm2_02.pythagoras.known_given"),
      check_right: t("sm2_02.pythagoras.check_right"),
      distance: t("sm2_02.pythagoras.distance"),
      elite_space: t("sm2_02.pythagoras.elite_space"),
      explorer_mission: t("sm2_02.pythagoras.explorer_mission")
    },
    mission: {
      title: t("sm2_02.mission.title"),
      protocol: t("sm2_02.mission.protocol"),
      cern_title: t("sm2_02.mission.cern_title"),
      cern_desc: t("sm2_02.mission.cern_desc"),
      roof_title: t("sm2_02.mission.roof_title"),
      roof_desc: t("sm2_02.mission.roof_desc"),
      ladder_title: t("sm2_02.mission.ladder_title"),
      ladder_desc: t("sm2_02.mission.ladder_desc"),
      grid_title: t("sm2_02.mission.grid_title"),
      grid_desc: t("sm2_02.mission.grid_desc"),
      chain_title: t("sm2_02.mission.chain_title"),
      chain_desc: t("sm2_02.mission.chain_desc")
    },
    mental: {
      title: t("sm2_02.mental.title"),
      chain: t("sm2_02.mental.chain")
    },
    sqrt: {
      perfect: t("sm2_02.sqrt.perfect"),
      simplify: t("sm2_02.sqrt.simplify"),
      estimate: t("sm2_02.sqrt.estimate")
    },
    explorer: {
      base_config: t("sm2_02.explorer.base_config"),
      leg_a: t("sm2_02.explorer.leg_a"),
      leg_b: t("sm2_02.explorer.leg_b"),
      scaling_title: t("sm2_02.explorer.scaling_title"),
      multiplier: t("sm2_02.explorer.multiplier"),
      ratio: t("sm2_02.explorer.ratio"),
      similarity_title: t("sm2_02.explorer.similarity_title"),
      similarity_desc: t("sm2_02.explorer.similarity_desc"),
      engine_title: t("sm2_02.explorer.engine_title"),
      hyp_label: t("sm2_02.explorer.hyp_label"),
    },
    labels: {
      side_a: t("sm2_02.labels.side_a"),
      side_b: t("sm2_02.labels.side_b"),
      hypotenuse: t("sm2_02.labels.hypotenuse"),
    },
    placeholders: {
      question: "?"
    }
  };

  const [useFluidViz, setUseFluidViz] = useState(false);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(sm2_02_t, d, s), [sm2_02_t]);

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
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback
  } = useQuestManager<S202Quest, Stage>({
    moduleCode: "sm2-02",
    buildPool,
    initialStage: "SOLVE_HYP",
  });

  const [explorerA, setExplorerA] = useState(3);
  const [explorerB, setExplorerB] = useState(4);
  const [explorerK, setExplorerK] = useState(1);

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm2-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  if (!currentQuest) return null;

  const isPythagorasTab = currentQuest?.tab === "PYTHAGORAS";
  const isSqrtTab = currentQuest?.tab === "SQRT";

  // Stage definitions
  const pythagorasStages = [
    { id: "SOLVE_HYP", label: sm2_02_t.pythagoras.solve_hyp },
    { id: "SOLVE_LEG", label: sm2_02_t.pythagoras.solve_leg },
    { id: "CHECK_RIGHT", label: sm2_02_t.pythagoras.check_right },
    { id: "MISSION", label: sm2_02_t.mission.title },
    { id: "MENTAL", label: sm2_02_t.mental.title },
    ...(difficulty === "ADVANCED" || difficulty === "ELITE" ? [
      { id: "CHAIN", label: sm2_02_t.mental.chain },
      { id: "DISTANCE", label: sm2_02_t.pythagoras.distance },
    ] : []),
    ...(difficulty === "ELITE" ? [{ id: "ELITE_SPACE", label: sm2_02_t.pythagoras.elite_space }] : []),
  ];

  const sqrtStages = [
    { id: "PERFECT", label: sm2_02_t.sqrt.perfect },
    { id: "SIMPLIFY", label: sm2_02_t.sqrt.simplify },
    ...(difficulty !== "BASIC" ? [{ id: "ESTIMATE", label: sm2_02_t.sqrt.estimate }] : []),
  ];

  const currentStages = isPythagorasTab ? pythagorasStages : sqrtStages;

  // Tab switching
  const handleTabChange = (newTab: "PYTHAGORAS" | "SQRT") => {
    const newStage = newTab === "PYTHAGORAS" ? "SOLVE_HYP" : "PERFECT";
    handleStageChange(newStage as Stage);
  };

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sm2_02_t.title}
      moduleCode="SM2.02"
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
        back: sm2_02_t.back,
        check: sm2_02_t.check,
        next: sm2_02_t.next,
        correct: sm2_02_t.correct,
        incorrect: sm2_02_t.incorrect,
        ready: sm2_02_t.ready,
        monitor_title: sm2_02_t.monitor_title,
        difficulty: {
          basic: sm2_02_t.difficulty.basic,
          core: sm2_02_t.difficulty.core,
          advanced: sm2_02_t.difficulty.advanced,
          elite: sm2_02_t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
              {isPythagorasTab ? sm2_02_t.tabs.pythagoras : sm2_02_t.tabs.sqrt}
            </div>
            {/* Toggle for testing fluid visualization */}
            <button
              onClick={() => setUseFluidViz(!useFluidViz)}
              className="px-3 py-1 text-[8px] uppercase tracking-wider border border-white/70 text-white/70 hover:border-white/60 hover:text-white transition-all"
            >
              {useFluidViz ? "2D View" : "Fluid View"}
            </button>
          </div>
          {stage === "EXPLORER" ? (
            useFluidViz ? (
              <PythagorasFluidCanvas
                a={explorerA * explorerK}
                b={explorerB * explorerK}
                c={Math.sqrt(Math.pow(explorerA * explorerK, 2) + Math.pow(explorerB * explorerK, 2))}
              />
            ) : (
              <PythagorasSimple2D
                a={explorerA * explorerK}
                b={explorerB * explorerK}
                c={Math.sqrt(Math.pow(explorerA * explorerK, 2) + Math.pow(explorerB * explorerK, 2))}
                highlightRightAngle={true}
              />
            )
          ) : (
            currentQuest?.visual.kind === "triangle" && currentQuest?.visual.a && currentQuest?.visual.b && currentQuest?.visual.c ? (
              useFluidViz ? (
                <PythagorasFluidCanvas
                  a={currentQuest?.visual.a}
                  b={currentQuest?.visual.b}
                  c={currentQuest?.visual.c}
                />
              ) : (
                <PythagorasSimple2D
                  a={currentQuest?.visual.a}
                  b={currentQuest?.visual.b}
                  c={currentQuest?.visual.c}
                  highlightRightAngle={currentQuest?.visual.highlightRightAngle}
                />
              )
            ) : (
              <S202PythagorasCanvas visual={currentQuest?.visual} />
            )
          )}
          {currentQuest?.visual.kind === "space" && (
            <div className="text-white/60 text-sm font-mono text-center">
              <InlineMath math={`d^{2}=a^{2}+b^{2}+c^{2}`} />
            </div>
          )}
        </div>
      }
    >

      {/* Tab Switcher */}
      <div className="flex gap-3 justify-center mb-8">
        <button
          onClick={() => handleStageChange("EXPLORER")}
          className={clsx(
            "px-6 py-3 border-2 text-[10px] font-black tracking-[0.3em] uppercase transition-all",
            stage === "EXPLORER"
              ? "border-white bg-white text-black"
              : "border-white/70 text-white hover:border-white/50"
          )}
        >
          {sm2_02_t.tabs.explorer}
        </button>
        <button
          onClick={() => { if (stage === "EXPLORER") handleStageChange("SOLVE_HYP"); }}
          className={clsx(
            "px-6 py-3 border-2 text-[10px] font-black tracking-[0.3em] uppercase transition-all",
            stage !== "EXPLORER"
              ? "border-white bg-white text-black"
              : "border-white/70 text-white hover:border-white/50"
          )}
        >
          {sm2_02_t.tabs.quest_mode}
        </button>
      </div>

      {stage === "EXPLORER" ? (
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 space-y-8 max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-neon-cyan font-bold uppercase tracking-widest text-[10px]">{sm2_02_t.explorer.base_config}</h4>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[10px] text-white/90 mb-2 font-mono uppercase tracking-widest">
                    <span>{sm2_02_t.explorer.leg_a}: {explorerA}</span>
                    <span className="text-neon-cyan">a^{"{2}"} = {explorerA * explorerA}</span>
                  </div>
                  <input
                    type="range" min="1" max="25" step="1"
                    value={explorerA} onChange={(e) => setExplorerA(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-white/90 mb-2 font-mono uppercase tracking-widest">
                    <span>{sm2_02_t.explorer.leg_b}: {explorerB}</span>
                    <span className="text-neon-blue">b^{"{2}"} = {explorerB * explorerB}</span>
                  </div>
                  <input
                    type="range" min="1" max="25" step="1"
                    value={explorerB} onChange={(e) => setExplorerB(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-blue"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 flex-wrap">
                {[[3, 4], [5, 12], [8, 15], [7, 24], [20, 21]].map(([ba, bb]) => (
                  <button
                    key={`${ba}-${bb}`}
                    onClick={() => { setExplorerA(ba); setExplorerB(bb); }}
                    className={clsx(
                      "px-3 py-2 bg-white/5 border border-white/10 rounded text-[10px] font-mono hover:bg-white/10 transition-all text-white/80",
                      explorerA === ba && explorerB === bb && "border-neon-cyan bg-white/10 text-white"
                    )}
                  >
                    {ba}:{bb}:{Math.sqrt(ba * ba + bb * bb)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-neon-purple font-bold uppercase tracking-widest text-[10px]">{sm2_02_t.explorer.scaling_title}</h4>
              <div>
                <div className="flex justify-between text-[10px] text-white/90 mb-2 font-mono uppercase tracking-widest">
                  <span>{sm2_02_t.explorer.multiplier}: {explorerK}</span>
                  <span className="text-neon-purple">{sm2_02_t.explorer.ratio}</span>
                </div>
                <input
                  type="range" min="0.5" max="20" step="0.1"
                  value={explorerK} onChange={(e) => setExplorerK(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[1, 2, 5, 10].map((k) => (
                  <button
                    key={k}
                    onClick={() => setExplorerK(k)}
                    className={clsx(
                      "py-2 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-white/60 hover:text-white transition-all",
                      explorerK === k && "border-neon-purple bg-white/10 text-white"
                    )}
                  >
                    k = {k}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                <div className="text-[9px] text-white/90 uppercase font-mono tracking-widest">{sm2_02_t.explorer.similarity_title}</div>
                <p className="text-[11px] text-white/70 leading-relaxed italic">
                  {renderMixedText(sm2_02_t.explorer.similarity_desc)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8 border-t border-white/5">
            <div className="text-center group">
              <div className="text-white/60 text-[9px] mb-3 uppercase tracking-[0.4em] font-black group-hover:text-white/90 transition-all font-mono">
                {sm2_02_t.explorer.engine_title}
              </div>
              <div className="text-3xl font-black text-white tracking-tighter">
                <span className="text-neon-cyan">{(explorerA * explorerK).toFixed(1)}^{"{2}"}</span>
                <span className="mx-3 opacity-30">+</span>
                <span className="text-neon-blue">{(explorerB * explorerK).toFixed(1)}^{"{2}"}</span>
                <span className="mx-3 opacity-30">=</span>
                <span className="text-neon-green">{(explorerA * explorerA * explorerK * explorerK + explorerB * explorerB * explorerK * explorerK).toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="h-px w-8 bg-white/10" />
                <div className="text-neon-green text-sm font-bold font-mono px-4 border border-neon-green/20 py-1 rounded-full bg-neon-green/5">
                  {sm2_02_t.explorer.hyp_label} = {Math.sqrt(Math.pow(explorerA * explorerK, 2) + Math.pow(explorerB * explorerK, 2)).toFixed(2)}
                </div>
                <div className="h-px w-8 bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
              {sm2_02_t.objective_title}
            </h3>
            <div className="text-xl md:text-2xl text-white font-black max-w-3xl mx-auto leading-tight italic drop-shadow-md pb-4 [&_span]:!leading-relaxed text-center">
              {renderMixedText(currentQuest?.promptLatex || "")}
            </div>
          </div>

          {/* Target Display */}
          <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-x-auto">
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
            <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
              {sm2_02_t.target_title}
            </span>
            <div className="font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95] whitespace-normal break-words">
              <InlineMath math={currentQuest?.targetLatex || ""} />
            </div>
          </div>

          {/* Input Section */}
          <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
            {currentQuest?.slots.map((slot: any) => (
              <div key={slot.id} className="space-y-3">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>

                {slot.input === "number" && (
                  <input
                    value={inputs[slot.id] || ""}
                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                    className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                    placeholder={sm2_02_t.placeholders?.question ?? "?"}
                    inputMode="numeric"
                  />
                )}

                {slot.input === "radical" && (
                  <RadicalSlotInput
                    value={(() => { try { return JSON.parse(inputs[slot.id] || "{}"); } catch { return { k: 1, m: 1 }; } })()}
                    onChange={(v) => setInputs({ ...inputs, [slot.id]: JSON.stringify(v) })}
                    labelK={sm2_02_t.input_k}
                    labelM={sm2_02_t.input_m}
                  />
                )}

                {slot.input === "boolean" && (
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setInputs({ ...inputs, [slot.id]: "true" })}
                      className={clsx(
                        "px-6 py-3 border-2 text-[10px] font-black tracking-[0.4em] uppercase transition-all",
                        inputs[slot.id] === "true"
                          ? "border-white bg-white/10"
                          : "border-white/10 text-white/80 hover:border-white/40 hover:text-white"
                      )}
                    >
                      {sm2_02_t.yes}
                    </button>
                    <button
                      onClick={() => setInputs({ ...inputs, [slot.id]: "false" })}
                      className={clsx(
                        "px-6 py-3 border-2 text-[10px] font-black tracking-[0.4em] uppercase transition-all",
                        inputs[slot.id] === "false"
                          ? "border-white bg-white/10"
                          : "border-white/10 text-white/80 hover:border-white/40 hover:text-white"
                      )}
                    >
                      {sm2_02_t.no}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </ChamberLayout>
  );
}
