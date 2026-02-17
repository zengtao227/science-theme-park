"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S301QuadraticCanvas from "@/components/chamber/sm3-01/QuadraticCanvas";

type Stage = "TERMS" | "FACTORIZE" | "FRACTIONS" | "EQUATIONS";

interface S301Quest extends Quest {
  stage: Stage;
  slotGroups?: Array<{ titleLatex: string; slotIds: string[] }>;
  // Pass coefficients to the canvas for relevant visualization
  a?: number;
  b?: number;
  c?: number;
  vizMode?: "AREA" | "PARABOLA";
}

// Helper to create a quest object concisely
function q(id: string, d: Difficulty, s: Stage, p: string, expr: string, target: string,
  slots: Array<{ id: string; l: string; e: number | string }>, correct: string,
  extra?: { a?: number; b?: number; c?: number; vizMode?: "AREA" | "PARABOLA"; hintLatex?: string[] }
): S301Quest {
  return {
    id, difficulty: d, stage: s, promptLatex: p, expressionLatex: expr, targetLatex: target,
    slots: slots.map(sl => ({ id: sl.id, labelLatex: sl.l, placeholder: "?", expected: sl.e })),
    correctLatex: correct, ...extra,
  };
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): S301Quest[] {
  const tp = t.stages.terms_prompt_latex;
  const fp = t.stages.factor_prompt_latex;
  const rp = t.stages.fractions_prompt_latex;
  const ep = t.stages.equations_prompt_latex;

  // ===================== TERMS =====================
  if (stage === "TERMS") {
    if (difficulty === "BASIC") return [
      q("T-B1", difficulty, stage, tp, "2x + 3x + 5y", "ax+by", [{ id: "a", l: "a", e: 5 }, { id: "b", l: "b", e: 5 }], "5x+5y"),
      q("T-B2", difficulty, stage, tp, "4a + 2b + a", "pa+qb", [{ id: "p", l: "p", e: 5 }, { id: "q", l: "q", e: 2 }], "5a+2b"),
      q("T-B3", difficulty, stage, tp, "6x + x + 3y", "ax+by", [{ id: "a", l: "a", e: 7 }, { id: "b", l: "b", e: 3 }], "7x+3y"),
      q("T-B4", difficulty, stage, tp, "3m + 2n + 4m + n", "pm+qn", [{ id: "p", l: "p", e: 7 }, { id: "q", l: "q", e: 3 }], "7m+3n"),
      q("T-B5", difficulty, stage, tp, "5x + 2x + y + 3y", "ax+by", [{ id: "a", l: "a", e: 7 }, { id: "b", l: "b", e: 4 }], "7x+4y"),
      q("T-B6", difficulty, stage, tp, "a + 3b + 2a + b", "pa+qb", [{ id: "p", l: "p", e: 3 }, { id: "q", l: "q", e: 4 }], "3a+4b"),
      q("T-B7", difficulty, stage, tp, "x + x + x + 2y", "ax+by", [{ id: "a", l: "a", e: 3 }, { id: "b", l: "b", e: 2 }], "3x+2y"),
      q("T-B8", difficulty, stage, tp, "2p + 3q + 4p + q", "ap+bq", [{ id: "a", l: "a", e: 6 }, { id: "b", l: "b", e: 4 }], "6p+4q"),
    ];
    if (difficulty === "CORE") return [
      q("T-C1", difficulty, stage, tp, "7x - 2y + 3x - 5y", "ax+by", [{ id: "a", l: "a", e: 10 }, { id: "b", l: "b", e: -7 }], "10x-7y"),
      q("T-C2", difficulty, stage, tp, "3(x+2) + 4x", "ax+b", [{ id: "a", l: "a", e: 7 }, { id: "b", l: "b", e: 6 }], "7x+6"),
      q("T-C3", difficulty, stage, tp, "5x - 3x + 2y - 6y", "ax+by", [{ id: "a", l: "a", e: 2 }, { id: "b", l: "b", e: -4 }], "2x-4y"),
      q("T-C4", difficulty, stage, tp, "2(a+3) - a + 5", "pa+c", [{ id: "p", l: "p", e: 1 }, { id: "c", l: "c", e: 11 }], "a+11"),
      q("T-C5", difficulty, stage, tp, "4(x-1) + 2(x+3)", "ax+b", [{ id: "a", l: "a", e: 6 }, { id: "b", l: "b", e: 2 }], "6x+2"),
      q("T-C6", difficulty, stage, tp, "-3x + 8x - 2y + y", "ax+by", [{ id: "a", l: "a", e: 5 }, { id: "b", l: "b", e: -1 }], "5x-y"),
      q("T-C7", difficulty, stage, tp, "6m - 2(m-3)", "pm+c", [{ id: "p", l: "p", e: 4 }, { id: "c", l: "c", e: 6 }], "4m+6"),
      q("T-C8", difficulty, stage, tp, "3(2x+1) - 5x", "ax+b", [{ id: "a", l: "a", e: 1 }, { id: "b", l: "b", e: 3 }], "x+3"),
    ];
    if (difficulty === "ADVANCED") return [
      q("T-A1", difficulty, stage, tp, "2x^2+3x-x^2+5", "ax^2+bx+c", [{ id: "a", l: "a", e: 1 }, { id: "b", l: "b", e: 3 }, { id: "c", l: "c", e: 5 }], "x^2+3x+5", { a: 1, b: 3, c: 5 }),
      q("T-A2", difficulty, stage, tp, "4x(x-2)+3x+2", "ax^2+bx+c", [{ id: "a", l: "a", e: 4 }, { id: "b", l: "b", e: -5 }, { id: "c", l: "c", e: 2 }], "4x^2-5x+2", { a: 4, b: -5, c: 2 }),
      q("T-A3", difficulty, stage, tp, "5x^2-x^2+2x-3", "ax^2+bx+c", [{ id: "a", l: "a", e: 4 }, { id: "b", l: "b", e: 2 }, { id: "c", l: "c", e: -3 }], "4x^2+2x-3", { a: 4, b: 2, c: -3 }),
      q("T-A4", difficulty, stage, tp, "x(x+6)-2x+1", "ax^2+bx+c", [{ id: "a", l: "a", e: 1 }, { id: "b", l: "b", e: 4 }, { id: "c", l: "c", e: 1 }], "x^2+4x+1", { a: 1, b: 4, c: 1 }),
      q("T-A5", difficulty, stage, tp, "3x^2+2x(1-x)+7", "ax^2+bx+c", [{ id: "a", l: "a", e: 1 }, { id: "b", l: "b", e: 2 }, { id: "c", l: "c", e: 7 }], "x^2+2x+7", { a: 1, b: 2, c: 7 }),
      q("T-A6", difficulty, stage, tp, "2(x^2+x)-x^2+3", "ax^2+bx+c", [{ id: "a", l: "a", e: 1 }, { id: "b", l: "b", e: 2 }, { id: "c", l: "c", e: 3 }], "x^2+2x+3", { a: 1, b: 2, c: 3 }),
      q("T-A7", difficulty, stage, tp, "x(3x-1)+2x^2-5", "ax^2+bx+c", [{ id: "a", l: "a", e: 5 }, { id: "b", l: "b", e: -1 }, { id: "c", l: "c", e: -5 }], "5x^2-x-5", { a: 5, b: -1, c: -5 }),
      q("T-A8", difficulty, stage, tp, "(x+2)(x+3)-x^2", "ax+c", [{ id: "a", l: "a", e: 5 }, { id: "c", l: "c", e: 6 }], "5x+6"),
    ];
    return [ // ELITE
      q("T-E1", difficulty, stage, tp, "3x^2-2x(x-4)+5", "ax^2+bx+c", [{ id: "a", l: "a", e: 1 }, { id: "b", l: "b", e: 8 }, { id: "c", l: "c", e: 5 }], "x^2+8x+5", { a: 1, b: 8, c: 5 }),
      q("T-E2", difficulty, stage, tp, "(2x+1)^2 - 4x^2", "ax+c", [{ id: "a", l: "a", e: 4 }, { id: "c", l: "c", e: 1 }], "4x+1"),
      q("T-E3", difficulty, stage, tp, "x(x+1)+2x(x-1)-3x^2", "ax+c", [{ id: "a", l: "a", e: -1 }, { id: "c", l: "c", e: 0 }], "-x"),
      q("T-E4", difficulty, stage, tp, "(x+3)^2 - (x-3)^2", "ax", [{ id: "a", l: "a", e: 12 }], "12x"),
      q("T-E5", difficulty, stage, tp, "2(x+1)^2-2x^2-4x", "c", [{ id: "c", l: "c", e: 2 }], "2"),
      q("T-E6", difficulty, stage, tp, "(3x-2)(x+1)-3x^2", "ax+c", [{ id: "a", l: "a", e: 1 }, { id: "c", l: "c", e: -2 }], "x-2"),
      q("T-E7", difficulty, stage, tp, "x^3+2x^2-x(x^2+x)", "ax^2", [{ id: "a", l: "a", e: 1 }], "x^2"),
      q("T-E8", difficulty, stage, tp, "(x+4)(x-4)+16", "ax^2", [{ id: "a", l: "a", e: 1 }], "x^2"),
    ];
  }

  // ===================== FACTORIZE =====================
  if (stage === "FACTORIZE") {
    if (difficulty === "BASIC") return [
      q("F-B1", difficulty, stage, fp, "x^2+3x+2", "(x+A)(x+B)", [{ id: "A", l: "A", e: 1 }, { id: "B", l: "B", e: 2 }], "(x+1)(x+2)", { a: 1, b: 3, c: 2, vizMode: "AREA", hintLatex: ["A+B=3", "A×B=2"] }),
      q("F-B2", difficulty, stage, fp, "x^2+5x+6", "(x+A)(x+B)", [{ id: "A", l: "A", e: 2 }, { id: "B", l: "B", e: 3 }], "(x+2)(x+3)", { a: 1, b: 5, c: 6, vizMode: "AREA", hintLatex: ["A+B=5", "A×B=6"] }),
      q("F-B3", difficulty, stage, fp, "x^2+7x+12", "(x+A)(x+B)", [{ id: "A", l: "A", e: 3 }, { id: "B", l: "B", e: 4 }], "(x+3)(x+4)", { a: 1, b: 7, c: 12, vizMode: "AREA", hintLatex: ["A+B=7", "A×B=12"] }),
      q("F-B4", difficulty, stage, fp, "x^2+7x+10", "(x+A)(x+B)", [{ id: "A", l: "A", e: 2 }, { id: "B", l: "B", e: 5 }], "(x+2)(x+5)", { a: 1, b: 7, c: 10, vizMode: "AREA", hintLatex: ["A+B=7", "A×B=10"] }),
      q("F-B5", difficulty, stage, fp, "x^2+6x+8", "(x+A)(x+B)", [{ id: "A", l: "A", e: 2 }, { id: "B", l: "B", e: 4 }], "(x+2)(x+4)", { a: 1, b: 6, c: 8, vizMode: "AREA", hintLatex: ["A+B=6", "A×B=8"] }),
      q("F-B6", difficulty, stage, fp, "x^2+8x+15", "(x+A)(x+B)", [{ id: "A", l: "A", e: 3 }, { id: "B", l: "B", e: 5 }], "(x+3)(x+5)", { a: 1, b: 8, c: 15, vizMode: "AREA", hintLatex: ["A+B=8", "A×B=15"] }),
      q("F-B7", difficulty, stage, fp, "x^2+9x+20", "(x+A)(x+B)", [{ id: "A", l: "A", e: 4 }, { id: "B", l: "B", e: 5 }], "(x+4)(x+5)", { a: 1, b: 9, c: 20, vizMode: "AREA", hintLatex: ["A+B=9", "A×B=20"] }),
      q("F-B8", difficulty, stage, fp, "x^2+4x+3", "(x+A)(x+B)", [{ id: "A", l: "A", e: 1 }, { id: "B", l: "B", e: 3 }], "(x+1)(x+3)", { a: 1, b: 4, c: 3, vizMode: "AREA", hintLatex: ["A+B=4", "A×B=3"] }),
    ];
    if (difficulty === "CORE") return [
      q("F-C1", difficulty, stage, fp, "x^2-4", "(x+A)(x+B)", [{ id: "A", l: "A", e: -2 }, { id: "B", l: "B", e: 2 }], "(x-2)(x+2)", { a: 1, b: 0, c: -4, vizMode: "AREA", hintLatex: ["a²−b²=(a−b)(a+b)"] }),
      q("F-C2", difficulty, stage, fp, "x^2-x-6", "(x+A)(x+B)", [{ id: "A", l: "A", e: -3 }, { id: "B", l: "B", e: 2 }], "(x-3)(x+2)", { a: 1, b: -1, c: -6, vizMode: "AREA", hintLatex: ["A+B=−1", "A×B=−6"] }),
      q("F-C3", difficulty, stage, fp, "x^2-9", "(x+A)(x+B)", [{ id: "A", l: "A", e: -3 }, { id: "B", l: "B", e: 3 }], "(x-3)(x+3)", { a: 1, b: 0, c: -9, vizMode: "AREA", hintLatex: ["a²−b²=(a−b)(a+b)"] }),
      q("F-C4", difficulty, stage, fp, "x^2+2x-8", "(x+A)(x+B)", [{ id: "A", l: "A", e: 4 }, { id: "B", l: "B", e: -2 }], "(x+4)(x-2)", { a: 1, b: 2, c: -8, vizMode: "AREA", hintLatex: ["A+B=2", "A×B=−8"] }),
      q("F-C5", difficulty, stage, fp, "x^2-3x-10", "(x+A)(x+B)", [{ id: "A", l: "A", e: -5 }, { id: "B", l: "B", e: 2 }], "(x-5)(x+2)", { a: 1, b: -3, c: -10, vizMode: "AREA", hintLatex: ["A+B=−3", "A×B=−10"] }),
      q("F-C6", difficulty, stage, fp, "x^2-25", "(x+A)(x+B)", [{ id: "A", l: "A", e: -5 }, { id: "B", l: "B", e: 5 }], "(x-5)(x+5)", { a: 1, b: 0, c: -25, vizMode: "AREA", hintLatex: ["a²−b²=(a−b)(a+b)"] }),
      q("F-C7", difficulty, stage, fp, "x^2-5x+6", "(x+A)(x+B)", [{ id: "A", l: "A", e: -2 }, { id: "B", l: "B", e: -3 }], "(x-2)(x-3)", { a: 1, b: -5, c: 6, vizMode: "AREA", hintLatex: ["A+B=−5", "A×B=6"] }),
      q("F-C8", difficulty, stage, fp, "x^2+x-12", "(x+A)(x+B)", [{ id: "A", l: "A", e: 4 }, { id: "B", l: "B", e: -3 }], "(x+4)(x-3)", { a: 1, b: 1, c: -12, vizMode: "AREA", hintLatex: ["A+B=1", "A×B=−12"] }),
    ];
    if (difficulty === "ADVANCED") return [
      q("F-A1", difficulty, stage, fp, "2x^2+5x+3", "(2x+A)(x+B)", [{ id: "A", l: "A", e: 3 }, { id: "B", l: "B", e: 1 }], "(2x+3)(x+1)", { a: 2, b: 5, c: 3, vizMode: "AREA" }),
      q("F-A2", difficulty, stage, fp, "3x^2-10x+3", "(3x+A)(x+B)", [{ id: "A", l: "A", e: -1 }, { id: "B", l: "B", e: -3 }], "(3x-1)(x-3)", { a: 3, b: -10, c: 3 }),
      q("F-A3", difficulty, stage, fp, "2x^2+7x+3", "(2x+A)(x+B)", [{ id: "A", l: "A", e: 1 }, { id: "B", l: "B", e: 3 }], "(2x+1)(x+3)", { a: 2, b: 7, c: 3 }),
      q("F-A4", difficulty, stage, fp, "2x^2-7x+3", "(2x+A)(x+B)", [{ id: "A", l: "A", e: -1 }, { id: "B", l: "B", e: -3 }], "(2x-1)(x-3)", { a: 2, b: -7, c: 3 }),
      q("F-A5", difficulty, stage, fp, "3x^2+7x+2", "(3x+A)(x+B)", [{ id: "A", l: "A", e: 1 }, { id: "B", l: "B", e: 2 }], "(3x+1)(x+2)", { a: 3, b: 7, c: 2 }),
      q("F-A6", difficulty, stage, fp, "2x^2-x-3", "(2x+A)(x+B)", [{ id: "A", l: "A", e: -3 }, { id: "B", l: "B", e: 1 }], "(2x-3)(x+1)", { a: 2, b: -1, c: -3 }),
      q("F-A7", difficulty, stage, fp, "5x^2+7x+2", "(5x+A)(x+B)", [{ id: "A", l: "A", e: 2 }, { id: "B", l: "B", e: 1 }], "(5x+2)(x+1)", { a: 5, b: 7, c: 2 }),
      q("F-A8", difficulty, stage, fp, "2x^2+3x-2", "(2x+A)(x+B)", [{ id: "A", l: "A", e: -1 }, { id: "B", l: "B", e: 2 }], "(2x-1)(x+2)", { a: 2, b: 3, c: -2 }),
    ];
    return [ // ELITE
      q("F-E1", difficulty, stage, fp, "4x^2-12x+9", "(ax-b)^2", [{ id: "a", l: "a", e: 2 }, { id: "b", l: "b", e: 3 }], "(2x-3)^2", { a: 4, b: -12, c: 9 }),
      q("F-E2", difficulty, stage, fp, "9x^2+6x+1", "(ax+b)^2", [{ id: "a", l: "a", e: 3 }, { id: "b", l: "b", e: 1 }], "(3x+1)^2", { a: 9, b: 6, c: 1 }),
      q("F-E3", difficulty, stage, fp, "x^2-16", "(x+A)(x+B)", [{ id: "A", l: "A", e: -4 }, { id: "B", l: "B", e: 4 }], "(x-4)(x+4)", { a: 1, b: 0, c: -16 }),
      q("F-E4", difficulty, stage, fp, "4x^2-1", "(ax+b)(ax-b)", [{ id: "a", l: "a", e: 2 }, { id: "b", l: "b", e: 1 }], "(2x+1)(2x-1)", { a: 4, b: 0, c: -1 }),
      q("F-E5", difficulty, stage, fp, "x^2+10x+25", "(x+a)^2", [{ id: "a", l: "a", e: 5 }], "(x+5)^2", { a: 1, b: 10, c: 25 }),
      q("F-E6", difficulty, stage, fp, "9x^2-12x+4", "(ax-b)^2", [{ id: "a", l: "a", e: 3 }, { id: "b", l: "b", e: 2 }], "(3x-2)^2", { a: 9, b: -12, c: 4 }),
      q("F-E7", difficulty, stage, fp, "16x^2-9", "(ax+b)(ax-b)", [{ id: "a", l: "a", e: 4 }, { id: "b", l: "b", e: 3 }], "(4x+3)(4x-3)", { a: 16, b: 0, c: -9 }),
      q("F-E8", difficulty, stage, fp, "x^2-6x+9", "(x-a)^2", [{ id: "a", l: "a", e: 3 }], "(x-3)^2", { a: 1, b: -6, c: 9 }),
    ];
  }

  // ===================== FRACTIONS =====================
  if (stage === "FRACTIONS") {
    if (difficulty === "BASIC") return [
      q("R-B1", difficulty, stage, rp, "\\frac{2x}{4x^2}", "\\frac{1}{ax}", [{ id: "a", l: "a", e: 2 }], "\\frac{1}{2x}"),
      q("R-B2", difficulty, stage, rp, "\\frac{6x}{3}", "ax", [{ id: "a", l: "a", e: 2 }], "2x"),
      q("R-B3", difficulty, stage, rp, "\\frac{4x^2}{2x}", "ax", [{ id: "a", l: "a", e: 2 }], "2x"),
      q("R-B4", difficulty, stage, rp, "\\frac{10x}{5x}", "a", [{ id: "a", l: "a", e: 2 }], "2"),
      q("R-B5", difficulty, stage, rp, "\\frac{3x}{9x^2}", "\\frac{1}{ax}", [{ id: "a", l: "a", e: 3 }], "\\frac{1}{3x}"),
      q("R-B6", difficulty, stage, rp, "\\frac{8x^3}{4x}", "ax^2", [{ id: "a", l: "a", e: 2 }], "2x^2"),
      q("R-B7", difficulty, stage, rp, "\\frac{12x}{4}", "ax", [{ id: "a", l: "a", e: 3 }], "3x"),
      q("R-B8", difficulty, stage, rp, "\\frac{5x^2}{x}", "ax", [{ id: "a", l: "a", e: 5 }], "5x"),
    ];
    if (difficulty === "CORE") return [
      q("R-C1", difficulty, stage, rp, "\\frac{x^2+2x}{x}", "x+b", [{ id: "b", l: "b", e: 2 }], "x+2"),
      q("R-C2", difficulty, stage, rp, "\\frac{x^2+5x}{x}", "x+b", [{ id: "b", l: "b", e: 5 }], "x+5"),
      q("R-C3", difficulty, stage, rp, "\\frac{3x^2+6x}{3x}", "x+b", [{ id: "b", l: "b", e: 2 }], "x+2"),
      q("R-C4", difficulty, stage, rp, "\\frac{x^2-3x}{x}", "x+b", [{ id: "b", l: "b", e: -3 }], "x-3"),
      q("R-C5", difficulty, stage, rp, "\\frac{2x^2+4x}{2x}", "x+b", [{ id: "b", l: "b", e: 2 }], "x+2"),
      q("R-C6", difficulty, stage, rp, "\\frac{x^2+x}{x}", "x+b", [{ id: "b", l: "b", e: 1 }], "x+1"),
      q("R-C7", difficulty, stage, rp, "\\frac{4x^2-8x}{4x}", "x+b", [{ id: "b", l: "b", e: -2 }], "x-2"),
      q("R-C8", difficulty, stage, rp, "\\frac{x^2+7x}{x}", "x+b", [{ id: "b", l: "b", e: 7 }], "x+7"),
    ];
    if (difficulty === "ADVANCED") return [
      q("R-A1", difficulty, stage, rp, "\\frac{x^2-9}{x+3}", "x+b", [{ id: "b", l: "b", e: -3 }], "x-3"),
      q("R-A2", difficulty, stage, rp, "\\frac{x^2-4}{x+2}", "x+b", [{ id: "b", l: "b", e: -2 }], "x-2"),
      q("R-A3", difficulty, stage, rp, "\\frac{x^2-1}{x+1}", "x+b", [{ id: "b", l: "b", e: -1 }], "x-1"),
      q("R-A4", difficulty, stage, rp, "\\frac{x^2-25}{x+5}", "x+b", [{ id: "b", l: "b", e: -5 }], "x-5"),
      q("R-A5", difficulty, stage, rp, "\\frac{x^2-16}{x-4}", "x+b", [{ id: "b", l: "b", e: 4 }], "x+4"),
      q("R-A6", difficulty, stage, rp, "\\frac{x^2+4x+3}{x+1}", "x+b", [{ id: "b", l: "b", e: 3 }], "x+3"),
      q("R-A7", difficulty, stage, rp, "\\frac{x^2+3x+2}{x+2}", "x+b", [{ id: "b", l: "b", e: 1 }], "x+1"),
      q("R-A8", difficulty, stage, rp, "\\frac{x^2-x-6}{x-3}", "x+b", [{ id: "b", l: "b", e: 2 }], "x+2"),
    ];
    return [ // ELITE
      q("R-E1", difficulty, stage, rp, "\\frac{x^2+5x+6}{x+2}", "x+b", [{ id: "b", l: "b", e: 3 }], "x+3"),
      q("R-E2", difficulty, stage, rp, "\\frac{x^2+7x+12}{x+3}", "x+b", [{ id: "b", l: "b", e: 4 }], "x+4"),
      q("R-E3", difficulty, stage, rp, "\\frac{2x^2+6x}{x^2+3x}", "a", [{ id: "a", l: "a", e: 2 }], "2"),
      q("R-E4", difficulty, stage, rp, "\\frac{x^2-4x+3}{x-1}", "x+b", [{ id: "b", l: "b", e: -3 }], "x-3"),
      q("R-E5", difficulty, stage, rp, "\\frac{x^2-6x+8}{x-2}", "x+b", [{ id: "b", l: "b", e: -4 }], "x-4"),
      q("R-E6", difficulty, stage, rp, "\\frac{x^2+2x-3}{x-1}", "x+b", [{ id: "b", l: "b", e: 3 }], "x+3"),
      q("R-E7", difficulty, stage, rp, "\\frac{x^2-2x-8}{x+2}", "x+b", [{ id: "b", l: "b", e: -4 }], "x-4"),
      q("R-E8", difficulty, stage, rp, "\\frac{x^2+x-12}{x-3}", "x+b", [{ id: "b", l: "b", e: 4 }], "x+4"),
    ];
  }

  // ===================== EQUATIONS =====================
  if (stage === "EQUATIONS") {
    const P = "PARABOLA" as const;
    if (difficulty === "BASIC") return [
      q("E-B1", difficulty, stage, ep, "x^2=9", "x=\\pm k", [{ id: "k", l: "k", e: 3 }], "x=\\pm 3", { a: 1, b: 0, c: -9, vizMode: P }),
      q("E-B2", difficulty, stage, ep, "x(x-4)=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 0 }, { id: "x2", l: "x_2", e: 4 }], "0, 4", { a: 1, b: -4, c: 0, vizMode: P }),
      q("E-B3", difficulty, stage, ep, "x^2=16", "x=\\pm k", [{ id: "k", l: "k", e: 4 }], "x=\\pm 4", { a: 1, b: 0, c: -16, vizMode: P }),
      q("E-B4", difficulty, stage, ep, "x^2=25", "x=\\pm k", [{ id: "k", l: "k", e: 5 }], "x=\\pm 5", { a: 1, b: 0, c: -25, vizMode: P }),
      q("E-B5", difficulty, stage, ep, "x(x-6)=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 0 }, { id: "x2", l: "x_2", e: 6 }], "0, 6", { a: 1, b: -6, c: 0, vizMode: P }),
      q("E-B6", difficulty, stage, ep, "x^2=1", "x=\\pm k", [{ id: "k", l: "k", e: 1 }], "x=\\pm 1", { a: 1, b: 0, c: -1, vizMode: P }),
      q("E-B7", difficulty, stage, ep, "x(x+3)=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -3 }, { id: "x2", l: "x_2", e: 0 }], "-3, 0", { a: 1, b: 3, c: 0, vizMode: P }),
      q("E-B8", difficulty, stage, ep, "x^2=4", "x=\\pm k", [{ id: "k", l: "k", e: 2 }], "x=\\pm 2", { a: 1, b: 0, c: -4, vizMode: P }),
    ];
    if (difficulty === "CORE") return [
      q("E-C1", difficulty, stage, ep, "x^2+5x+6=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -3 }, { id: "x2", l: "x_2", e: -2 }], "-3, -2", { a: 1, b: 5, c: 6, vizMode: P }),
      q("E-C2", difficulty, stage, ep, "x^2-3x+2=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 1 }, { id: "x2", l: "x_2", e: 2 }], "1, 2", { a: 1, b: -3, c: 2, vizMode: P }),
      q("E-C3", difficulty, stage, ep, "x^2+x-6=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -3 }, { id: "x2", l: "x_2", e: 2 }], "-3, 2", { a: 1, b: 1, c: -6, vizMode: P }),
      q("E-C4", difficulty, stage, ep, "x^2-7x+12=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 3 }, { id: "x2", l: "x_2", e: 4 }], "3, 4", { a: 1, b: -7, c: 12, vizMode: P }),
      q("E-C5", difficulty, stage, ep, "x^2-x-12=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -3 }, { id: "x2", l: "x_2", e: 4 }], "-3, 4", { a: 1, b: -1, c: -12, vizMode: P }),
      q("E-C6", difficulty, stage, ep, "x^2+4x+3=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -3 }, { id: "x2", l: "x_2", e: -1 }], "-3, -1", { a: 1, b: 4, c: 3, vizMode: P }),
      q("E-C7", difficulty, stage, ep, "x^2-5x+6=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 2 }, { id: "x2", l: "x_2", e: 3 }], "2, 3", { a: 1, b: -5, c: 6, vizMode: P }),
      q("E-C8", difficulty, stage, ep, "x^2+2x-8=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -4 }, { id: "x2", l: "x_2", e: 2 }], "-4, 2", { a: 1, b: 2, c: -8, vizMode: P }),
    ];
    if (difficulty === "ADVANCED") return [
      q("E-A1", difficulty, stage, ep, "x^2-4x=5", "x_1, x_2", [{ id: "x1", l: "x_1", e: -1 }, { id: "x2", l: "x_2", e: 5 }], "-1, 5", { a: 1, b: -4, c: -5, vizMode: P }),
      q("E-A2", difficulty, stage, ep, "x^2+2x=3", "x_1, x_2", [{ id: "x1", l: "x_1", e: -3 }, { id: "x2", l: "x_2", e: 1 }], "-3, 1", { a: 1, b: 2, c: -3, vizMode: P }),
      q("E-A3", difficulty, stage, ep, "x^2-6x+5=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 1 }, { id: "x2", l: "x_2", e: 5 }], "1, 5", { a: 1, b: -6, c: 5, vizMode: P }),
      q("E-A4", difficulty, stage, ep, "2x^2-6x+4=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 1 }, { id: "x2", l: "x_2", e: 2 }], "1, 2", { a: 2, b: -6, c: 4, vizMode: P }),
      q("E-A5", difficulty, stage, ep, "x^2+3x-10=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -5 }, { id: "x2", l: "x_2", e: 2 }], "-5, 2", { a: 1, b: 3, c: -10, vizMode: P }),
      q("E-A6", difficulty, stage, ep, "x^2-2x-15=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -3 }, { id: "x2", l: "x_2", e: 5 }], "-3, 5", { a: 1, b: -2, c: -15, vizMode: P }),
      q("E-A7", difficulty, stage, ep, "x^2=x+6", "x_1, x_2", [{ id: "x1", l: "x_1", e: -2 }, { id: "x2", l: "x_2", e: 3 }], "-2, 3", { a: 1, b: -1, c: -6, vizMode: P }),
      q("E-A8", difficulty, stage, ep, "x^2-8x+15=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 3 }, { id: "x2", l: "x_2", e: 5 }], "3, 5", { a: 1, b: -8, c: 15, vizMode: P }),
    ];
    return [ // ELITE
      q("E-E1", difficulty, stage, ep, "x^2-6x+k=0,\\;x=2", "k", [{ id: "k", l: "k", e: 8 }], "k=8", { a: 1, b: -6, c: 8, vizMode: P }),
      q("E-E2", difficulty, stage, ep, "x^2+bx+5=0,\\;x=1", "b", [{ id: "b", l: "b", e: -6 }], "b=-6", { a: 1, b: -6, c: 5, vizMode: P }),
      q("E-E3", difficulty, stage, ep, "3x^2-12x+9=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: 1 }, { id: "x2", l: "x_2", e: 3 }], "1, 3", { a: 3, b: -12, c: 9, vizMode: P }),
      q("E-E4", difficulty, stage, ep, "x^2-10x+25=0", "x", [{ id: "x", l: "x", e: 5 }], "x=5", { a: 1, b: -10, c: 25, vizMode: P }),
      q("E-E5", difficulty, stage, ep, "2x^2+x-3=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -3 / 2 }, { id: "x2", l: "x_2", e: 1 }], "-3/2, 1", { a: 2, b: 1, c: -3, vizMode: P }),
      q("E-E6", difficulty, stage, ep, "x^2+kx+9=0,\\;x=3", "k", [{ id: "k", l: "k", e: -6 }], "k=-6", { a: 1, b: -6, c: 9, vizMode: P }),
      q("E-E7", difficulty, stage, ep, "4x^2-4x+1=0", "x", [{ id: "x", l: "x", e: "1/2" }], "x=1/2", { a: 4, b: -4, c: 1, vizMode: P }),
      q("E-E8", difficulty, stage, ep, "x^2-2x-3=0", "x_1, x_2", [{ id: "x1", l: "x_1", e: -1 }, { id: "x2", l: "x_2", e: 3 }], "-1, 3", { a: 1, b: -2, c: -3, vizMode: P }),
    ];
  }

  return [];
}

export default function S301Page() {
  const { completeStage, currentLanguage } = useAppStore();
  const { t } = useLanguage();

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t("sm3_01"), d, s), [t]);

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
    parseNumberLike,
  } = useQuestManager<S301Quest, Stage>({
    buildPool,
    initialStage: "TERMS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stages = [
    { id: "TERMS", label: t("sm3_01.stages.terms") },
    { id: "FACTORIZE", label: t("sm3_01.stages.factorize") },
    { id: "FRACTIONS", label: t("sm3_01.stages.fractions") },
    { id: "EQUATIONS", label: t("sm3_01.stages.equations") },
  ];

  return (
    <ChamberLayout
      title={t("sm3_01.title")}
      moduleCode="SM3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      footerLeft={t("sm3_01.footer_left")}
      checkStatus={lastCheck}
      translations={{
        back: t("sm3_01.back"),
        check: t("sm3_01.check"),
        next: t("sm3_01.next"),
        correct: t("sm3_01.correct"),
        incorrect: t("sm3_01.incorrect"),
        ready: t("sm3_01.ready"),
        monitor_title: t("sm3_01.monitor_title"),
        difficulty: {
          basic: t("sm3_01.difficulty.basic"),
          core: t("sm3_01.difficulty.core"),
          advanced: t("sm3_01.difficulty.advanced"),
          elite: t("sm3_01.difficulty.elite"),
        },
      }}
      monitorContent={
        <S301QuadraticCanvas
          quest={currentQuest}
          lang={currentLanguage}
        />
      }
    >
      <div className="w-full max-w-5xl space-y-10">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t("sm3_01.objective_title")}</h3>
            <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
              <InlineMath math={currentQuest.promptLatex} />
            </p>
          </div>

          <div className="flex justify-center overflow-x-auto w-full">
            <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
              <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t("sm3_01.target_title")}</span>
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
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t("sm3_01.labels.input")}</div>
            {currentQuest.slotGroups ? (
              <div className="space-y-4">
                {currentQuest.slotGroups.map((group) => (
                  <div key={group.titleLatex} className="space-y-3">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                      <InlineMath math={group.titleLatex} />
                    </div>
                    <div className={clsx("grid gap-4", group.slotIds.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                      {group.slotIds.map((slotId) => {
                        const slot = currentQuest.slots.find((s) => s.id === slotId);
                        if (!slot) return null;
                        return (
                          <div key={slot.id} className="space-y-2">
                            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                              <InlineMath math={slot.labelLatex} />
                            </div>
                            <input
                              value={inputs[slot.id] ?? ""}
                              onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                              className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                              placeholder={slot.placeholder}
                              inputMode="text"
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
                    <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                      <InlineMath math={slot.labelLatex} />
                    </div>
                    <input
                      value={inputs[slot.id] ?? ""}
                      onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                      className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                      placeholder={slot.placeholder}
                      inputMode="text"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="text-[10px] text-white/90 font-mono italic text-center mt-6">
              {t("sm3_01.labels.fraction_hint")}
            </div>

            {stage === "FACTORIZE" && currentQuest.slots.some((s) => s.id === "A") && currentQuest.slots.some((s) => s.id === "B") && (
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/90 font-black">
                <InlineMath
                  math={`\\text{Preview: }(x${parseNumberLike(inputs.A ?? "") !== null && Number((inputs.A ?? "").replace(/,/g, ".")) >= 0 ? "+" : ""}${(inputs.A ?? "").trim() || "A"})(x${parseNumberLike(inputs.B ?? "") !== null && Number((inputs.B ?? "").replace(/,/g, ".")) >= 0 ? "+" : ""}${(inputs.B ?? "").trim() || "B"})`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
