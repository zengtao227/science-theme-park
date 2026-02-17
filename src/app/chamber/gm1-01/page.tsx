"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import DerivativeCanvas from "@/components/chamber/gm1-01/DerivativeCanvas";

type Stage = "POWER_RULE" | "FACTOR_RULE" | "SUM_RULE" | "PRODUCT_RULE" | "QUOTIENT_RULE" | "CHAIN_RULE";

interface G101Quest extends Quest {
  stage: Stage;
  functionType: "power" | "factor" | "sum" | "product" | "quotient" | "chain";
  xPosition: number;
  coefficient?: number;
  exponent?: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// Power rule data: f(x) = x^n => f'(x) = n·x^(n-1)
// Pure power functions without coefficients (for learning the basic pattern)
const powerDataBasic = [
  { id: "P_B1", a: 1, n: 2, b: 0, c: 0, x: 1 }, // f(x) = x²
  { id: "P_B2", a: 1, n: 2, b: 0, c: 0, x: 2 }, // f(x) = x²
  { id: "P_B3", a: 1, n: 3, b: 0, c: 0, x: 1 }, // f(x) = x³
  { id: "P_B4", a: 1, n: 3, b: 0, c: 0, x: 2 }, // f(x) = x³
];

const powerDataCore = [
  { id: "P_C1", a: 1, n: 4, b: 0, c: 0, x: 1 }, // f(x) = x⁴
  { id: "P_C2", a: 1, n: 4, b: 0, c: 0, x: 2 }, // f(x) = x⁴
  { id: "P_C3", a: 1, n: 5, b: 0, c: 0, x: 1 }, // f(x) = x⁵
  { id: "P_C4", a: 1, n: 5, b: 0, c: 0, x: 2 }, // f(x) = x⁵
  { id: "P_C5", a: 1, n: 2, b: 0, c: 0, x: 3 }, // f(x) = x²
];

const powerDataAdvanced = [
  { id: "P_A1", a: 1, n: 6, b: 0, c: 0, x: 1 }, // f(x) = x⁶
  { id: "P_A2", a: 1, n: 6, b: 0, c: 0, x: 2 }, // f(x) = x⁶
  { id: "P_A3", a: 1, n: 7, b: 0, c: 0, x: 1 }, // f(x) = x⁷
  { id: "P_A4", a: 1, n: 3, b: 0, c: 0, x: 3 }, // f(x) = x³
  { id: "P_A5", a: 1, n: 4, b: 0, c: 0, x: 3 }, // f(x) = x⁴
];

const powerDataElite = [
  { id: "P_E1", a: 1, n: 8, b: 0, c: 0, x: 1.5 }, // f(x) = x⁸
  { id: "P_E2", a: 1, n: 5, b: 0, c: 0, x: 2.5 }, // f(x) = x⁵
  { id: "P_E3", a: 1, n: 6, b: 0, c: 0, x: 1.2 }, // f(x) = x⁶
  { id: "P_E4", a: 1, n: 7, b: 0, c: 0, x: 1.8 }, // f(x) = x⁷
  { id: "P_E5", a: 1, n: 4, b: 0, c: 0, x: 2.3 }, // f(x) = x⁴
];

// Factor rule data: f(x) = a·x^n => f'(x) = a·n·x^(n-1)
// Focus on constant factor multiplication
const factorDataBasic = [
  { id: "F_B1", a: 2, n: 2, b: 0, c: 0, x: 1 }, // f(x) = 2x²
  { id: "F_B2", a: 3, n: 2, b: 0, c: 0, x: 1 }, // f(x) = 3x²
  { id: "F_B3", a: 2, n: 3, b: 0, c: 0, x: 1 }, // f(x) = 2x³
  { id: "F_B4", a: 4, n: 2, b: 0, c: 0, x: 1 }, // f(x) = 4x²
];

const factorDataCore = [
  { id: "F_C1", a: 2, n: 2, b: 0, c: 0, x: 2 }, // f(x) = 2x²
  { id: "F_C2", a: 3, n: 2, b: 0, c: 0, x: 2 }, // f(x) = 3x²
  { id: "F_C3", a: 5, n: 2, b: 0, c: 0, x: 1 }, // f(x) = 5x²
  { id: "F_C4", a: 2, n: 3, b: 0, c: 0, x: 2 }, // f(x) = 2x³
  { id: "F_C5", a: 3, n: 3, b: 0, c: 0, x: 1 }, // f(x) = 3x³
];

const factorDataAdvanced = [
  { id: "F_A1", a: 4, n: 3, b: 0, c: 0, x: 2 }, // f(x) = 4x³
  { id: "F_A2", a: 5, n: 2, b: 0, c: 0, x: 3 }, // f(x) = 5x²
  { id: "F_A3", a: 6, n: 2, b: 0, c: 0, x: 2 }, // f(x) = 6x²
  { id: "F_A4", a: 3, n: 4, b: 0, c: 0, x: 1 }, // f(x) = 3x⁴
  { id: "F_A5", a: 2, n: 4, b: 0, c: 0, x: 2 }, // f(x) = 2x⁴
];

const factorDataElite = [
  { id: "F_E1", a: 4, n: 3, b: 0, c: 0, x: 1.5 }, // f(x) = 4x³
  { id: "F_E2", a: 5, n: 4, b: 0, c: 0, x: 1.2 }, // f(x) = 5x⁴
  { id: "F_E3", a: 3, n: 5, b: 0, c: 0, x: 1.5 }, // f(x) = 3x⁵
  { id: "F_E4", a: 6, n: 3, b: 0, c: 0, x: 2.5 }, // f(x) = 6x³
  { id: "F_E5", a: 7, n: 2, b: 0, c: 0, x: 1.8 }, // f(x) = 7x²
];

// Sum rule data: f(x) = g(x) + h(x) => f'(x) = g'(x) + h'(x)
// Polynomials with multiple terms
const sumDataBasic = [
  { id: "S_B1", a: 1, n: 2, b: 1, c: 0, x: 1 }, // f(x) = x² + x
  { id: "S_B2", a: 1, n: 2, b: 2, c: 0, x: 1 }, // f(x) = x² + 2x
  { id: "S_B3", a: 1, n: 3, b: 1, c: 0, x: 1 }, // f(x) = x³ + x
  { id: "S_B4", a: 1, n: 2, b: 3, c: 0, x: 1 }, // f(x) = x² + 3x
];

const sumDataCore = [
  { id: "S_C1", a: 2, n: 2, b: 3, c: 0, x: 1 }, // f(x) = 2x² + 3x
  { id: "S_C2", a: 1, n: 2, b: 4, c: 0, x: 2 }, // f(x) = x² + 4x
  { id: "S_C3", a: 3, n: 2, b: 2, c: 0, x: 1 }, // f(x) = 3x² + 2x
  { id: "S_C4", a: 1, n: 3, b: 2, c: 0, x: 1 }, // f(x) = x³ + 2x
  { id: "S_C5", a: 2, n: 2, b: 1, c: 0, x: 2 }, // f(x) = 2x² + x
];

const sumDataAdvanced = [
  { id: "S_A1", a: 2, n: 2, b: 3, c: 1, x: 1 }, // f(x) = 2x² + 3x + 1
  { id: "S_A2", a: 1, n: 2, b: -4, c: 2, x: 2 }, // f(x) = x² - 4x + 2
  { id: "S_A3", a: 3, n: 2, b: 2, c: -1, x: 1 }, // f(x) = 3x² + 2x - 1
  { id: "S_A4", a: 1, n: 3, b: -2, c: 3, x: 1 }, // f(x) = x³ - 2x + 3
  { id: "S_A5", a: 2, n: 3, b: 3, c: -2, x: 1 }, // f(x) = 2x³ + 3x - 2
];

const sumDataElite = [
  { id: "S_E1", a: 2, n: 2, b: 3, c: 1, x: 1.5 }, // f(x) = 2x² + 3x + 1
  { id: "S_E2", a: 1, n: 2, b: -4, c: 2, x: 2.5 }, // f(x) = x² - 4x + 2
  { id: "S_E3", a: 3, n: 2, b: 2, c: -1, x: 1.2 }, // f(x) = 3x² + 2x - 1
  { id: "S_E4", a: 1, n: 3, b: -2, c: 3, x: 1.5 }, // f(x) = x³ - 2x + 3
  { id: "S_E5", a: 2, n: 3, b: 3, c: -2, x: 0.8 }, // f(x) = 2x³ + 3x - 2
];

// Product rule data: f(x) = u(x)·v(x) => f'(x) = u'·v + u·v'
// Using f(x) = x·sin(x) => f'(x) = sin(x) + x·cos(x)
// Difficulty: varies by x value complexity
const productDataBasic = [
  { id: "PR_B1", x: 0 },
  { id: "PR_B2", x: Math.PI / 2 },
  { id: "PR_B3", x: Math.PI },
  { id: "PR_B4", x: 1 },
];

const productDataCore = [
  { id: "PR_C1", x: Math.PI / 4 },
  { id: "PR_C2", x: Math.PI / 3 },
  { id: "PR_C3", x: 2 },
  { id: "PR_C4", x: 3 },
  { id: "PR_C5", x: 1.5 },
];

const productDataAdvanced = [
  { id: "PR_A1", x: Math.PI / 6 },
  { id: "PR_A2", x: 2 * Math.PI / 3 },
  { id: "PR_A3", x: 2.5 },
  { id: "PR_A4", x: 3.5 },
  { id: "PR_A5", x: 0.5 },
];

const productDataElite = [
  { id: "PR_E1", x: 1.2 },
  { id: "PR_E2", x: 2.3 },
  { id: "PR_E3", x: 3.7 },
  { id: "PR_E4", x: 0.8 },
  { id: "PR_E5", x: 4.2 },
];

// Chain rule data: f(x) = sin(kx) => f'(x) = k·cos(kx)
// Difficulty: varies by k value and x position
const chainDataBasic = [
  { id: "C_B1", k: 2, x: 0 }, // f(x) = sin(2x)
  { id: "C_B2", k: 2, x: Math.PI / 2 },
  { id: "C_B3", k: 2, x: Math.PI },
  { id: "C_B4", k: 2, x: 1 },
];

const chainDataCore = [
  { id: "C_C1", k: 2, x: Math.PI / 4 },
  { id: "C_C2", k: 3, x: 0 }, // f(x) = sin(3x)
  { id: "C_C3", k: 3, x: Math.PI / 3 },
  { id: "C_C4", k: 2, x: 2 },
  { id: "C_C5", k: 3, x: 1 },
];

const chainDataAdvanced = [
  { id: "C_A1", k: 3, x: Math.PI / 6 },
  { id: "C_A2", k: 4, x: 0 }, // f(x) = sin(4x)
  { id: "C_A3", k: 4, x: Math.PI / 4 },
  { id: "C_A4", k: 3, x: 2 },
  { id: "C_A5", k: 4, x: 1 },
];

const chainDataElite = [
  { id: "C_E1", k: 4, x: Math.PI / 6 },
  { id: "C_E2", k: 5, x: 0.5 }, // f(x) = sin(5x)
  { id: "C_E3", k: 5, x: 1.2 },
  { id: "C_E4", k: 4, x: 2.3 },
  { id: "C_E5", k: 5, x: 1.8 },
];

// Quotient rule data: f(x) = u(x)/v(x) => f'(x) = [u'(x)·v(x) - u(x)·v'(x)] / [v(x)]²
// Using f(x) = x/sin(x) => f'(x) = [sin(x) - x·cos(x)] / sin²(x)
// Difficulty: varies by x position (avoid x where sin(x) ≈ 0)

const quotientDataBasic = [
  { id: "Q_B1", x: Math.PI / 2 }, // sin(x) = 1
  { id: "Q_B2", x: Math.PI / 4 },
  { id: "Q_B3", x: Math.PI / 3 },
  { id: "Q_B4", x: 1 },
];

const quotientDataCore = [
  { id: "Q_C1", x: Math.PI / 6 },
  { id: "Q_C2", x: 2 * Math.PI / 3 },
  { id: "Q_C3", x: 2 },
  { id: "Q_C4", x: 2.5 },
  { id: "Q_C5", x: 1.5 },
];

const quotientDataAdvanced = [
  { id: "Q_A1", x: 5 * Math.PI / 6 },
  { id: "Q_A2", x: 1.2 },
  { id: "Q_A3", x: 2.3 },
  { id: "Q_A4", x: 2.8 },
  { id: "Q_A5", x: 0.8 },
];

const quotientDataElite = [
  { id: "Q_E1", x: 1.1 },
  { id: "Q_E2", x: 1.7 },
  { id: "Q_E3", x: 2.2 },
  { id: "Q_E4", x: 2.6 },
  { id: "Q_E5", x: 0.9 },
];

function buildStagePool(gm1_01_t: any, difficulty: Difficulty, stage: Stage): G101Quest[] {
  if (stage === "POWER_RULE") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = powerDataBasic; break;
      case "CORE": dataSet = powerDataCore; break;
      case "ADVANCED": dataSet = powerDataAdvanced; break;
      case "ELITE": dataSet = powerDataElite; break;
      default: dataSet = powerDataBasic;
    }
    
    return dataSet.map((item) => {
      // f(x) = x^n => f'(x) = n·x^(n-1)
      const derivative = round2(item.n * Math.pow(item.x, item.n - 1));
      
      let expr = `f(x)=x^{${item.n}},\\; x=${item.x}`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        functionType: "power" as const,
        xPosition: item.x,
        coefficient: item.a,
        exponent: item.n,
        promptLatex: gm1_01_t.stages.power_rule_prompt_latex,
        expressionLatex: expr,
        targetLatex: "f'(x)",
        slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
        correctLatex: `f'(${item.x})=${derivative}`,
      };
    });
  }

  if (stage === "FACTOR_RULE") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = factorDataBasic; break;
      case "CORE": dataSet = factorDataCore; break;
      case "ADVANCED": dataSet = factorDataAdvanced; break;
      case "ELITE": dataSet = factorDataElite; break;
      default: dataSet = factorDataBasic;
    }
    
    return dataSet.map((item) => {
      // f(x) = a·x^n => f'(x) = a·n·x^(n-1)
      const derivative = round2(item.a * item.n * Math.pow(item.x, item.n - 1));
      
      let expr = `f(x)=${item.a}x^{${item.n}},\\; x=${item.x}`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        functionType: "factor" as const,
        xPosition: item.x,
        coefficient: item.a,
        exponent: item.n,
        promptLatex: gm1_01_t.stages.factor_rule_prompt_latex,
        expressionLatex: expr,
        targetLatex: "f'(x)",
        slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
        correctLatex: `f'(${item.x})=${derivative}`,
      };
    });
  }

  if (stage === "SUM_RULE") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = sumDataBasic; break;
      case "CORE": dataSet = sumDataCore; break;
      case "ADVANCED": dataSet = sumDataAdvanced; break;
      case "ELITE": dataSet = sumDataElite; break;
      default: dataSet = sumDataBasic;
    }
    
    return dataSet.map((item) => {
      // f(x) = ax^n + bx + c => f'(x) = n·a·x^(n-1) + b
      const derivative = round2(item.n * item.a * Math.pow(item.x, item.n - 1) + item.b);
      
      // Build expression string
      let expr = `f(x)=`;
      if (item.a !== 1 || item.n === 1) expr += `${item.a}`;
      if (item.n > 1) expr += `x^{${item.n}}`;
      else if (item.n === 1) expr += `x`;
      
      if (item.b !== 0) {
        expr += item.b > 0 ? `+${item.b}x` : `${item.b}x`;
      }
      if (item.c !== 0) {
        expr += item.c > 0 ? `+${item.c}` : `${item.c}`;
      }
      expr += `,\\; x=${item.x}`;
      
      return {
        id: item.id,
        difficulty,
        stage,
        functionType: "sum" as const,
        xPosition: item.x,
        coefficient: item.a,
        exponent: item.n,
        promptLatex: gm1_01_t.stages.sum_rule_prompt_latex,
        expressionLatex: expr,
        targetLatex: "f'(x)",
        slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
        correctLatex: `f'(${item.x})=${derivative}`,
      };
    });
  }

  if (stage === "PRODUCT_RULE") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = productDataBasic; break;
      case "CORE": dataSet = productDataCore; break;
      case "ADVANCED": dataSet = productDataAdvanced; break;
      case "ELITE": dataSet = productDataElite; break;
      default: dataSet = productDataBasic;
    }
    
    return dataSet.map((item) => {
      // f(x) = x·sin(x) => f'(x) = sin(x) + x·cos(x)
      const derivative = round2(Math.sin(item.x) + item.x * Math.cos(item.x));
      
      return {
        id: item.id,
        difficulty,
        stage,
        functionType: "product" as const,
        xPosition: item.x,
        promptLatex: gm1_01_t.stages.product_rule_prompt_latex,
        expressionLatex: `f(x)=x\\cdot\\sin(x),\\; x=${round2(item.x)}`,
        targetLatex: "f'(x)",
        slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
        correctLatex: `f'(${round2(item.x)})=${derivative}`,
      };
    });
  }

  if (stage === "QUOTIENT_RULE") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = quotientDataBasic; break;
      case "CORE": dataSet = quotientDataCore; break;
      case "ADVANCED": dataSet = quotientDataAdvanced; break;
      case "ELITE": dataSet = quotientDataElite; break;
      default: dataSet = quotientDataBasic;
    }
    
    return dataSet.map((item) => {
      // f(x) = x/sin(x) => f'(x) = [sin(x) - x·cos(x)] / sin²(x)
      const sinX = Math.sin(item.x);
      const cosX = Math.cos(item.x);
      const derivative = round2((sinX - item.x * cosX) / (sinX * sinX));
      
      return {
        id: item.id,
        difficulty,
        stage,
        functionType: "quotient" as const,
        xPosition: item.x,
        promptLatex: gm1_01_t.stages.quotient_rule_prompt_latex,
        expressionLatex: `f(x)=\\frac{x}{\\sin(x)},\\; x=${round2(item.x)}`,
        targetLatex: "f'(x)",
        slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
        correctLatex: `f'(${round2(item.x)})=${derivative}`,
      };
    });
  }

  // CHAIN_RULE
  let dataSet;
  switch (difficulty) {
    case "BASIC": dataSet = chainDataBasic; break;
    case "CORE": dataSet = chainDataCore; break;
    case "ADVANCED": dataSet = chainDataAdvanced; break;
    case "ELITE": dataSet = chainDataElite; break;
    default: dataSet = chainDataBasic;
  }
  
  return dataSet.map((item) => {
    // f(x) = sin(kx) => f'(x) = k·cos(kx)
    const derivative = round2(item.k * Math.cos(item.k * item.x));
    
    return {
      id: item.id,
      difficulty,
      stage,
      functionType: "chain" as const,
      xPosition: item.x,
      promptLatex: gm1_01_t.stages.chain_rule_prompt_latex,
      expressionLatex: `f(x)=\\sin(${item.k}x),\\; x=${round2(item.x)}`,
      targetLatex: "f'(x)",
      slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
      correctLatex: `f'(${round2(item.x)})=${derivative}`,
    };
  });
}

export default function G101Page() {
  const { completeStage, currentLanguage } = useAppStore();
  const { t } = useLanguage();
  
  const gm1_01_t = {
    title: t("gm1_01.title"),
    description: t("gm1_01.description"),
    back: t("gm1_01.back"),
    check: t("gm1_01.check"),
    next: t("gm1_01.next"),
    correct: t("gm1_01.correct"),
    incorrect: t("gm1_01.incorrect"),
    ready: t("gm1_01.ready"),
    monitor_title: t("gm1_01.monitor_title"),
    footer_left: t("gm1_01.footer_left"),
    target_title: t("gm1_01.target_title"),
    objective_title: t("gm1_01.objective_title"),
    input_tip_2dp: t("gm1_01.input_tip_2dp"),
    stages: {
      POWER_RULE: t("gm1_01.stages.POWER_RULE"),
      FACTOR_RULE: t("gm1_01.stages.FACTOR_RULE"),
      SUM_RULE: t("gm1_01.stages.SUM_RULE"),
      PRODUCT_RULE: t("gm1_01.stages.PRODUCT_RULE"),
      QUOTIENT_RULE: t("gm1_01.stages.QUOTIENT_RULE"),
      CHAIN_RULE: t("gm1_01.stages.CHAIN_RULE"),
      power_rule: t("gm1_01.stages.power_rule"),
      factor_rule: t("gm1_01.stages.factor_rule"),
      sum_rule: t("gm1_01.stages.sum_rule"),
      product_rule: t("gm1_01.stages.product_rule"),
      quotient_rule: t("gm1_01.stages.quotient_rule"),
      chain_rule: t("gm1_01.stages.chain_rule"),
      power_rule_prompt_latex: t("gm1_01.stages.power_rule_prompt_latex"),
      factor_rule_prompt_latex: t("gm1_01.stages.factor_rule_prompt_latex"),
      sum_rule_prompt_latex: t("gm1_01.stages.sum_rule_prompt_latex"),
      product_rule_prompt_latex: t("gm1_01.stages.product_rule_prompt_latex"),
      quotient_rule_prompt_latex: t("gm1_01.stages.quotient_rule_prompt_latex"),
      chain_rule_prompt_latex: t("gm1_01.stages.chain_rule_prompt_latex"),
    },
    difficulty: {
      basic: t("gm1_01.difficulty.basic"),
      core: t("gm1_01.difficulty.core"),
      advanced: t("gm1_01.difficulty.advanced"),
      elite: t("gm1_01.difficulty.elite"),
    },
    labels: {
      hints: t("gm1_01.labels.hints"),
    },
    formulas: {
      power_rule: t("gm1_01.formulas.power_rule"),
      factor_rule: t("gm1_01.formulas.factor_rule"),
      sum_rule: t("gm1_01.formulas.sum_rule"),
      product_rule: t("gm1_01.formulas.product_rule"),
      quotient_rule: t("gm1_01.formulas.quotient_rule"),
      chain_rule: t("gm1_01.formulas.chain_rule"),
    },
    mission: {
      title: t("gm1_01.mission.title"),
      description: t("gm1_01.mission.description"),
    },
    scenarios: {
      power_rule: t("gm1_01.scenarios.power_rule"),
      factor_rule: t("gm1_01.scenarios.factor_rule"),
      sum_rule: t("gm1_01.scenarios.sum_rule"),
      product_rule: t("gm1_01.scenarios.product_rule"),
      quotient_rule: t("gm1_01.scenarios.quotient_rule"),
      chain_rule: t("gm1_01.scenarios.chain_rule"),
    },
    canvas: {
      title: t("gm1_01.canvas.title"),
      subtitle_power: t("gm1_01.canvas.subtitle_power"),
      subtitle_factor: t("gm1_01.canvas.subtitle_factor"),
      subtitle_sum: t("gm1_01.canvas.subtitle_sum"),
      subtitle_product: t("gm1_01.canvas.subtitle_product"),
      subtitle_quotient: t("gm1_01.canvas.subtitle_quotient"),
      subtitle_chain: t("gm1_01.canvas.subtitle_chain"),
      x_label: t("gm1_01.canvas.x_label"),
      y_label: t("gm1_01.canvas.y_label"),
      slope_label: t("gm1_01.canvas.slope_label"),
      your_slope: t("gm1_01.canvas.your_slope"),
      correct_slope: t("gm1_01.canvas.correct_slope"),
      status_chamber: t("gm1_01.canvas.status_chamber"),
      status_sim: t("gm1_01.canvas.status_sim"),
      status_mode: t("gm1_01.canvas.status_mode"),
    },
  };

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<G101Quest, Stage>({
    buildPool: (d, s) => buildStagePool(gm1_01_t, d, s),
    initialStage: "POWER_RULE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm1-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={gm1_01_t.title}
      moduleCode="GM1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "POWER_RULE", label: gm1_01_t.stages.power_rule },
        { id: "FACTOR_RULE", label: gm1_01_t.stages.factor_rule },
        { id: "SUM_RULE", label: gm1_01_t.stages.sum_rule },
        { id: "PRODUCT_RULE", label: gm1_01_t.stages.product_rule },
        { id: "QUOTIENT_RULE", label: gm1_01_t.stages.quotient_rule },
        { id: "CHAIN_RULE", label: gm1_01_t.stages.chain_rule },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={gm1_01_t.footer_left}
      translations={{
        back: gm1_01_t.back,
        check: gm1_01_t.check,
        next: gm1_01_t.next,
        correct: gm1_01_t.correct,
        incorrect: gm1_01_t.incorrect,
        ready: gm1_01_t.ready,
        monitor_title: gm1_01_t.monitor_title,
        difficulty: {
          basic: gm1_01_t.difficulty.basic,
          core: gm1_01_t.difficulty.core,
          advanced: gm1_01_t.difficulty.advanced,
          elite: gm1_01_t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <DerivativeCanvas
            functionType={currentQuest?.functionType || "power"}
            xPosition={currentQuest?.xPosition || 2}
            derivative={parseFloat(inputs.derivative || "0")}
            translations={{
              title: gm1_01_t.canvas.title,
              subtitle: stage === "POWER_RULE" ? gm1_01_t.canvas.subtitle_power :
                       stage === "FACTOR_RULE" ? gm1_01_t.canvas.subtitle_factor :
                       stage === "SUM_RULE" ? gm1_01_t.canvas.subtitle_sum :
                       stage === "PRODUCT_RULE" ? gm1_01_t.canvas.subtitle_product :
                       stage === "QUOTIENT_RULE" ? gm1_01_t.canvas.subtitle_quotient :
                       gm1_01_t.canvas.subtitle_chain,
              xLabel: gm1_01_t.canvas.x_label,
              yLabel: gm1_01_t.canvas.y_label,
              slopeLabel: gm1_01_t.canvas.slope_label,
              yourSlope: gm1_01_t.canvas.your_slope,
              correctSlope: gm1_01_t.canvas.correct_slope,
              status_chamber: gm1_01_t.canvas.status_chamber,
              status_sim: gm1_01_t.canvas.status_sim,
              status_mode: gm1_01_t.canvas.status_mode,
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{gm1_01_t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{gm1_01_t.labels.hints}</div>
            <div className="text-white font-black text-lg">
              <InlineMath math={gm1_01_t.formulas[stage.toLowerCase() as keyof typeof gm1_01_t.formulas]} />
            </div>
            <div className="text-white/70 text-sm font-mono">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{gm1_01_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{gm1_01_t.mission.description}</p>
        </div>
        
        {/* Scenario Description */}
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {stage === "POWER_RULE" && gm1_01_t.scenarios.power_rule}
            {stage === "FACTOR_RULE" && gm1_01_t.scenarios.factor_rule}
            {stage === "SUM_RULE" && gm1_01_t.scenarios.sum_rule}
            {stage === "PRODUCT_RULE" && gm1_01_t.scenarios.product_rule}
            {stage === "QUOTIENT_RULE" && gm1_01_t.scenarios.quotient_rule}
            {stage === "CHAIN_RULE" && gm1_01_t.scenarios.chain_rule}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{gm1_01_t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                  {slot.unit && (
                    <div className="text-xl font-black text-white/80 min-w-[30px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {currentLanguage === 'DE'
              ? gm1_01_t.input_tip_2dp
              : currentLanguage === 'CN'
                ? "提示：保留 2 位小数。"
                : "Tip: Enter result rounded to 2 decimal places."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
