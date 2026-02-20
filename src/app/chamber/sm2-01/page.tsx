"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BinomialSquare2D from "@/components/chamber/sm2-01/BinomialSquare2D";
import { Lock, Unlock, Settings2, Info, Zap } from "lucide-react";
import { clsx } from "clsx";

type QuestMode = "EXPLORE" | "ARCHITECT" | "SCRAPPER" | "SPEEDSTER" | "ELITE" | "VOYAGER";

interface ArchitectQuest extends Quest {
  type: "EXPAND";
  stage: QuestMode;
  ca: number;
  vb: number;
  formula: string;
  isFactor?: boolean;
}

interface ScrapperQuest extends Quest {
  type: "SCRAPPER";
  stage: QuestMode;
  ca: number;
  vb: number;
  variant: "XY" | "X";
  isFactor?: boolean;
}

interface SpeedsterQuest extends Quest {
  type: "SPEEDSTER";
  stage: QuestMode;
  base: number;
  roundBase: number;
  offset: number;
  sign: "+" | "-";
  a2: number;
  middle: number;
  b2: number;
  target: number;
}

interface EliteQuest extends Quest {
  type: "ELITE";
  stage: QuestMode;
  C: number;
  V: number;
}

interface VoyagerQuest extends Quest {
  type: "DIFFERENCE";
  stage: QuestMode;
  ca: number;
  vb: number;
  expr: string;
  subType: "EXPAND" | "FACTOR";
}

type S201Quest = ArchitectQuest | ScrapperQuest | SpeedsterQuest | EliteQuest | VoyagerQuest;

function buildStagePool(t: any, difficulty: Difficulty, stage: QuestMode): S201Quest[] {
  if (stage === "EXPLORE") return [];

  const isBasic = difficulty === "BASIC";
  const isCore = difficulty === "CORE";
  const isAdvanced = difficulty === "ADVANCED";
  const isElite = difficulty === "ELITE";
  const poolSize = 30;

  const getFullTerm = (coeff: number, variable: string) => {
    if (coeff === 1) return variable;
    return `${coeff}${variable}`;
  };

  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (stage === "ARCHITECT") {
    return Array.from({ length: poolSize }).map((_, i) => {
      if (isBasic) {
        const vb = randInt(2, 12);
        return {
          id: `ARCH_B_${i}`, difficulty, stage, type: "EXPAND", ca: 1, vb,
          formula: `(x + ${vb})^{2}`, promptLatex: t.scenarios.architect_mission,
          expressionLatex: `(x + ${vb})^2`, targetLatex: `x^2 + ${2 * vb}x + ${vb ** 2}`,
          slots: [
            { id: "a2", labelLatex: "x^{2}", placeholder: "1", expected: 1 },
            { id: "ab", labelLatex: "x", placeholder: "coeff", expected: 2 * vb },
            { id: "b2", labelLatex: "const", placeholder: "const", expected: vb ** 2 },
          ],
          correctLatex: `x^2 + ${2 * vb}x + ${vb ** 2}`,
        };
      } else if (isCore) {
        const ca = randInt(2, 6); const vb = randInt(3, 9);
        return {
          id: `ARCH_C_${i}`, difficulty, stage, type: "EXPAND", ca, vb,
          formula: `(${ca}x + ${vb})^{2}`, promptLatex: t.scenarios.architect_mission,
          expressionLatex: `(${ca}x + ${vb})^2`, targetLatex: `${ca ** 2}x^2 + ${2 * ca * vb}x + ${vb ** 2}`,
          slots: [
            { id: "a2", labelLatex: "x^2", placeholder: "coeff", expected: ca ** 2 },
            { id: "ab", labelLatex: "x", placeholder: "coeff", expected: 2 * ca * vb },
            { id: "b2", labelLatex: "const", placeholder: "const", expected: vb ** 2 },
          ],
          correctLatex: `${ca ** 2}x^2 + ${2 * ca * vb}x + ${vb ** 2}`,
        };
      } else if (isAdvanced) {
        const vb = randInt(4, 15);
        return {
          id: `ARCH_A_${i}`, difficulty, stage, type: "EXPAND", ca: 1, vb, isFactor: true,
          formula: `x^2 + ${2 * vb}x + ${vb ** 2}`, promptLatex: t.scenarios.architect_advanced_prompt,
          expressionLatex: `x^2 + ${2 * vb}x + ${vb ** 2}`,
          targetLatex: `(x)^{2} + 2(x)(${vb}) + (${vb})^{2}`,
          slots: [
            { id: "a_root", labelLatex: "a", placeholder: "x", expected: "x" },
            { id: "b_root", labelLatex: "b", placeholder: "b", expected: vb.toString() },
            { id: "a_mid", labelLatex: "a", placeholder: "x", expected: "x" },
            { id: "b_mid", labelLatex: "b", placeholder: "b", expected: vb.toString() },
          ],
          correctLatex: `x^2 + ${2 * vb}x + ${vb ** 2} = (x + ${vb})^2`,
        };
      } else {
        const ca = randInt(2, 8); const vb = randInt(3, 11); const aTerm = `${ca}x`; const bTerm = `${vb}y`;
        return {
          id: `ARCH_E_${i}`, difficulty, stage, type: "EXPAND", ca, vb, isFactor: true,
          formula: `${ca ** 2}x^2 + ${2 * ca * vb}xy + ${vb ** 2}y^2`, promptLatex: t.scenarios.architect_elite_prompt,
          expressionLatex: `${ca ** 2}x^2 + ${2 * ca * vb}xy + ${vb ** 2}y^2`,
          targetLatex: `(${aTerm})^{2} + 2(${aTerm})(${bTerm}) + (${bTerm})^{2}`,
          slots: [
            { id: "a_root", labelLatex: "a", placeholder: "ax", expected: aTerm },
            { id: "b_root", labelLatex: "b", placeholder: "by", expected: bTerm },
            { id: "a_mid", labelLatex: "a", placeholder: "ax", expected: aTerm },
            { id: "b_mid", labelLatex: "b", placeholder: "by", expected: bTerm },
          ],
          correctLatex: `${ca ** 2}x^2 + ${2 * ca * vb}xy + ${vb ** 2}y^2 = (${aTerm} + ${bTerm})^2`,
        };
      }
    });
  }

  if (stage === "SCRAPPER") {
    return Array.from({ length: poolSize }).map((_, i) => {
      let ca, vb, vA = "x", vB = "";
      let variant: "X" | "XY" = "X";
      if (isBasic) { ca = 1; vb = randInt(2, 9); }
      else if (isCore) { ca = randInt(2, 7); vb = randInt(2, 7); }
      else if (isAdvanced) { ca = randInt(2, 8); vb = randInt(3, 8); vB = "y"; variant = "XY"; }
      else { ca = randInt(3, 9); vb = randInt(2, 8); vA = "x^2"; vB = Math.random() > 0.5 ? "y^2" : ""; variant = vB ? "XY" : "X"; }

      const aTerm = getFullTerm(ca, vA);
      const bTerm = vB ? getFullTerm(vb, vB) : vb.toString();
      const expr = `${ca ** 2}${vA === "x^2" ? "x^4" : "x^2"} + ${2 * ca * vb}${vA.replace('^2', '')}${vB.replace('^2', '')} + ${vb ** 2}${vB === "y" ? "y^2" : (vB === "y^2" ? "y^4" : "")}`;

      return {
        id: `SCRAP_${difficulty}_${i}`, difficulty, stage, type: "SCRAPPER", ca, vb, variant, isFactor: true,
        promptLatex: t.scenarios.scrapper_mission, expressionLatex: expr,
        targetLatex: `(${aTerm} + ${bTerm})^{2}`,
        slots: [
          { id: "a", labelLatex: "root a", placeholder: vA === "x^{2}" ? "ax^{2}" : "ax", expected: aTerm },
          { id: "b", labelLatex: "root b", placeholder: vB ? (vB === "y^{2}" ? "by^{2}" : "by") : "b", expected: bTerm },
        ],
        correctLatex: `(${aTerm} + ${bTerm})^{2}`,
      };
    });
  }

  if (stage === "SPEEDSTER") {
    return Array.from({ length: poolSize }).map((_, i) => {
      let val, rb, off, sn: "+" | "-" = "+";
      if (isBasic) {
        const bases = [10, 20, 30];
        rb = bases[randInt(0, 2)];
        off = randInt(1, 3);
        val = rb + off;
        sn = "+";
      } else if (isCore) {
        const bases = [50, 100];
        rb = bases[randInt(0, 1)];
        off = randInt(1, 3);
        sn = Math.random() > 0.5 ? "+" : "-";
        val = sn === "+" ? rb + off : rb - off;
      } else if (isAdvanced) {
        const bases = [200, 300, 400, 500];
        rb = bases[randInt(0, 3)];
        off = randInt(1, 4);
        sn = Math.random() > 0.5 ? "+" : "-";
        val = sn === "+" ? rb + off : rb - off;
      } else {
        const bases = [5, 10, 20];
        rb = bases[randInt(0, 2)];
        const dec = randInt(1, 4) / 10;
        off = dec;
        sn = Math.random() > 0.5 ? "+" : "-";
        val = sn === "+" ? rb + off : rb - off;
      }

      const mid = (sn === "-" ? -1 : 1) * 2 * rb * off;
      return {
        id: `SPEED_${difficulty}_${i}`, difficulty, stage, type: "SPEEDSTER",
        base: val, roundBase: rb, offset: off, sign: sn,
        a2: parseFloat((rb ** 2).toFixed(2)), middle: parseFloat(mid.toFixed(2)), b2: parseFloat((off ** 2).toFixed(2)), target: parseFloat((val ** 2).toFixed(2)),
        promptLatex: t.scenarios.speedster_mission, expressionLatex: `${val}^{2}`,
        targetLatex: `${rb}^{2} ${sn} 2(${rb})(${off}) + ${off}^{2}`,
        slots: [
          { id: "part1", labelLatex: "a^2", placeholder: "a^2", expected: rb ** 2 },
          { id: "part2", labelLatex: "2ab", placeholder: "2ab", expected: mid },
          { id: "part3", labelLatex: "b^2", placeholder: "b^2", expected: parseFloat((off ** 2).toFixed(2)) },
        ],
        correctLatex: `${rb ** 2} ${sn === "-" ? "-" : "+"} ${Math.abs(mid)} + ${parseFloat((off ** 2).toFixed(2))} = ${parseFloat((val ** 2).toFixed(2))}`,
      };
    });
  }

  if (stage === "ELITE") {
    return Array.from({ length: poolSize }).map((_, i) => {
      let C, V, vA = "xy";
      if (isBasic) { C = 1; V = randInt(3, 8); }
      else if (isCore) { C = randInt(2, 5); V = randInt(4, 9); }
      else if (isAdvanced) { C = randInt(4, 8); V = randInt(8, 15); }
      else { C = randInt(8, 15); V = randInt(12, 25); vA = "xyz"; }

      const aTerm = getFullTerm(C, vA);
      return {
        id: `ELITE_${difficulty}_${i}`, difficulty, stage, type: "ELITE", C, V, isFactor: true,
        promptLatex: t.scenarios.elite_mission,
        expressionLatex: `${C ** 2}${vA === "xy" ? "x^2y^2" : "x^2y^2z^2"} - ${V ** 2}`,
        targetLatex: `(${aTerm} - ${V})^2 + ${2 * C * V}${vA} - ${2 * V ** 2}`,
        slots: [
          { id: "base", labelLatex: "root a", placeholder: vA.toUpperCase(), expected: aTerm },
          { id: "sub", labelLatex: "root b", placeholder: "V", expected: V.toString() },
          { id: "add_term", labelLatex: "2ab", placeholder: "linear", expected: `${2 * C * V}${vA}` },
          { id: "const_term", labelLatex: "2b^2", placeholder: "const", expected: (2 * V ** 2).toString() },
        ],
        correctLatex: `(${aTerm} - ${V})^2 + ${2 * C * V}${vA} - ${2 * V ** 2} = ${C ** 2}${vA === "xy" ? "x^2y^2" : "x^2y^2z^2"} - ${V ** 2}`,
      };
    });
  }

  if (stage === "VOYAGER") {
    return Array.from({ length: poolSize }).map((_, i) => {
      let ca, vb, vB = "";
      if (isBasic) { ca = 1; vb = randInt(3, 12); }
      else if (isCore) { ca = randInt(2, 6); vb = randInt(4, 11); }
      else if (isAdvanced) { ca = randInt(3, 9); vb = randInt(6, 15); }
      else { ca = randInt(6, 14); vb = randInt(10, 20); vB = "y"; }

      const aT = getFullTerm(ca, "x"); const bT = vB ? getFullTerm(vb, vB) : vb.toString();
      const isFact = isAdvanced || isElite;
      const subType: "EXPAND" | "FACTOR" = isFact ? "FACTOR" : "EXPAND";
      const expr = isFact ? `${ca ** 2}x^2 - ${vb ** 2}${vB ? "y^2" : ""}` : `(${aT} + ${bT})(${aT} - ${bT})`;

      return {
        id: `VOY_${difficulty}_${i}`, difficulty, stage, type: "DIFFERENCE", ca, vb, isFactor: isFact,
        expr, subType,
        promptLatex: t.scenarios.voyager_mission, expressionLatex: expr,
        targetLatex: isFact ? `(${aT} + ${bT})(${aT} - ${bT})` : `${ca ** 2}x^2 - ${vb ** 2}${vB ? "y^2" : ""}`,
        slots: isFact
          ? [{ id: "a", labelLatex: "root a", placeholder: "ax", expected: aT }, { id: "b", labelLatex: "root b", placeholder: vB ? "by" : "b", expected: bT }]
          : [{ id: "part1", labelLatex: "a^2", placeholder: "a^2", expected: ca ** 2 }, { id: "part2", labelLatex: "b^2", placeholder: "b^2", expected: vb ** 2 }],
        correctLatex: isFact ? `(${aT} + ${bT})(${aT} - ${bT})` : `${ca ** 2}x^2 - ${vb ** 2}${vB ? "y^2" : ""}`,
      };
    });
  }

  return [];
}

export default function S201Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const sm2_01_t = {
    title: t("sm2_01.title"),
    back: t("sm2_01.back"),
    check: t("sm2_01.check"),
    solve_success: t("sm2_01.solve_success"),
    solve_fail: t("sm2_01.solve_fail"),
    params_config: t("sm2_01.params_config"),
    param_a: t("sm2_01.param_a"),
    param_b: t("sm2_01.param_b"),
    units: t("sm2_01.units"),
    lock: t("sm2_01.lock"),
    unlock: t("sm2_01.unlock"),
    active_objective: t("sm2_01.active_objective"),
    target_expression: t("sm2_01.target_expression"),
    speedster_hint: t("sm2_01.speedster_hint"),
    elite_tips_title: t("sm2_01.elite_tips_title"),
    elite_tips_target: t("sm2_01.elite_tips_target"),
    decomposition_pattern: t("sm2_01.decomposition_pattern"),
    scrapper_step01: t("sm2_01.scrapper_step01"),
    instruction_solve: t("sm2_01.instruction_solve"),
    instruction_setup: t("sm2_01.instruction_setup"),
    tabs: {
      explore: t("sm2_01.tabs.explore"),
      architect: t("sm2_01.tabs.architect"),
      scrapper: t("sm2_01.tabs.scrapper"),
      speedster: t("sm2_01.tabs.speedster"),
      voyager: t("sm2_01.tabs.voyager"),
      elite: t("sm2_01.tabs.elite"),
    },
    difficulty: {
      basic: t("sm2_01.difficulty.basic"),
      core: t("sm2_01.difficulty.core"),
      advanced: t("sm2_01.difficulty.advanced"),
      elite: t("sm2_01.difficulty.elite"),
    },
    scenarios: {
      architect_mission: t("sm2_01.scenarios.architect_mission"),
      architect_context: t("sm2_01.scenarios.architect_context"),
      architect_advanced_prompt: t("sm2_01.scenarios.architect_advanced_prompt"),
      architect_elite_prompt: t("sm2_01.scenarios.architect_elite_prompt"),
      scrapper_mission: t("sm2_01.scenarios.scrapper_mission"),
      scrapper_context: t("sm2_01.scenarios.scrapper_context"),
      speedster_mission: t("sm2_01.scenarios.speedster_mission"),
      speedster_context: t("sm2_01.scenarios.speedster_context"),
      elite_mission: t("sm2_01.scenarios.elite_mission"),
      voyager_mission: t("sm2_01.scenarios.voyager_mission"),
      voyager_context: t("sm2_01.scenarios.voyager_context"),
    },
    terms: {
      a2: t("sm2_01.terms.a2"),
      b2: t("sm2_01.terms.b2"),
      ab: t("sm2_01.terms.ab"),
      target_plus: t("sm2_01.terms.target_plus"),
    },
    placeholders: {
      question: t("sm2_01.placeholders.question"),
      ax: t("sm2_01.placeholders.ax"),
      b: t("sm2_01.placeholders.b"),
      by: t("sm2_01.placeholders.by"),
      a_squared: t("sm2_01.placeholders.a_squared"),
      two_ab: t("sm2_01.placeholders.two_ab"),
      b_squared: t("sm2_01.placeholders.b_squared"),
      cxy: t("sm2_01.placeholders.cxy"),
      v: t("sm2_01.placeholders.v"),
      two_cvxy: t("sm2_01.placeholders.two_cvxy"),
      v_squared: t("sm2_01.placeholders.v_squared"),
    },
    ui: {
      footer_left: t("sm2_01.ui.footer_left"),
      execute_next_sequence: t("sm2_01.ui.execute_next_sequence"),
      visual_reference_position: t("sm2_01.ui.visual_reference_position"),
      status_operational: t("sm2_01.ui.status_operational"),
      fps: t("sm2_01.ui.fps"),
      latency: t("sm2_01.ui.latency"),
      continue_operation: t("sm2_01.ui.continue_operation"),
      coeff: t("sm2_01.ui.coeff"),
      const: t("sm2_01.ui.const"),
      identify_root_a: t("sm2_01.ui.identify_root_a"),
      identify_root_b: t("sm2_01.ui.identify_root_b"),
      elite_step_1: t("sm2_01.ui.elite_step_1"),
      elite_step_2: t("sm2_01.ui.elite_step_2"),
      logic_lattice_title: t("sm2_01.ui.logic_lattice_title"),
      logic_architect_step_1: t("sm2_01.ui.logic_architect_step_1"),
      logic_architect_step_2: t("sm2_01.ui.logic_architect_step_2"),
      logic_scrapper_step_1: t("sm2_01.ui.logic_scrapper_step_1"),
      logic_scrapper_step_2: t("sm2_01.ui.logic_scrapper_step_2"),
      logic_voyager_axiom_title: t("sm2_01.ui.logic_voyager_axiom_title"),
      logic_voyager_axiom_body: t("sm2_01.ui.logic_voyager_axiom_body"),
      logic_voyager_derivation_title: t("sm2_01.ui.logic_voyager_derivation_title"),
      link_established: t("sm2_01.ui.link_established"),
      axiomatic_constraints_title: t("sm2_01.ui.axiomatic_constraints_title"),
      constraints_architect: t("sm2_01.ui.constraints_architect"),
      constraints_scrapper: t("sm2_01.ui.constraints_scrapper"),
      constraints_speedster: t("sm2_01.ui.constraints_speedster"),
      constraints_elite: t("sm2_01.ui.constraints_elite"),
      constraints_voyager: t("sm2_01.ui.constraints_voyager"),
    },
  };

  const [questMode, setQuestMode] = useState<QuestMode>("EXPLORE");
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [locked, setLocked] = useState(false);
  const [snappedBlocks, setSnappedBlocks] = useState<Record<string, boolean>>({});

  const buildPool = useCallback((d: Difficulty, s: QuestMode) => buildStagePool(sm2_01_t, d, s), [sm2_01_t]);

  const {
    difficulty,
    inputs,
    lastCheck,
    currentQuest,
    successRate,
    setInputs,
    next,
    handleDifficultyChange,
    handleStageChange,
    verify,
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback
  } = useQuestManager<S201Quest, QuestMode>({
    moduleCode: "sm2-01",
    buildPool,
    initialStage: questMode,
  });

  const stages = [
    { id: "EXPLORE", label: sm2_01_t.tabs?.explore ?? "EXPLORE" },
    { id: "ARCHITECT", label: sm2_01_t.tabs?.architect ?? "ARCHITECT" },
    { id: "SCRAPPER", label: sm2_01_t.tabs?.scrapper ?? "SCRAPPER" },
    { id: "SPEEDSTER", label: sm2_01_t.tabs?.speedster ?? "SPEEDSTER" },
    { id: "VOYAGER", label: sm2_01_t.tabs?.voyager ?? "VOYAGER" },
    { id: "ELITE", label: sm2_01_t.tabs?.elite ?? "ELITE" },
  ];

  const handleModeChange = (mode: string) => {
    setQuestMode(mode as QuestMode);
    handleStageChange(mode as QuestMode);
    setSnappedBlocks({});
    setLocked(false);
  };

  const architectQuest = currentQuest?.type === "EXPAND" ? (currentQuest as ArchitectQuest) : null;
  const scrapperQuest = currentQuest?.type === "SCRAPPER" ? (currentQuest as ScrapperQuest) : null;
  const speedsterQuest = currentQuest?.type === "SPEEDSTER" ? (currentQuest as SpeedsterQuest) : null;
  const eliteQuest = currentQuest?.type === "ELITE" ? (currentQuest as EliteQuest) : null;
  const voyagerQuest = currentQuest?.type === "DIFFERENCE" ? (currentQuest as VoyagerQuest) : null;

  // Compute Canvas Parameters dynamically based on current quest
  const { canvasA, canvasB } = useMemo(() => {
    if (questMode === "EXPLORE") return { canvasA: a, canvasB: b };
    if (questMode === "ARCHITECT" && architectQuest) return { canvasA: architectQuest.ca, canvasB: architectQuest.vb };
    if (questMode === "SCRAPPER" && scrapperQuest) return { canvasA: scrapperQuest.ca, canvasB: scrapperQuest.vb };
    if (questMode === "VOYAGER" && voyagerQuest) return { canvasA: voyagerQuest.ca, canvasB: voyagerQuest.vb };
    // For Speedster/Elite, we use normalized visual values to avoid huge/tiny squares
    if (questMode === "SPEEDSTER") return { canvasA: 4, canvasB: 1 };
    if (questMode === "ELITE") return { canvasA: 3, canvasB: 2 };
    return { canvasA: 3, canvasB: 2 };
  }, [questMode, a, b, architectQuest, scrapperQuest, voyagerQuest]);

  const isSuccess = useMemo(() => {
    if (questMode === "EXPLORE")
      return snappedBlocks["a2"] && snappedBlocks["b2"] && snappedBlocks["ab1"] && snappedBlocks["ab2"];
    return lastCheck?.ok ?? false;
  }, [snappedBlocks, lastCheck, questMode]);

  // Removed auto-complete useEffect. Now relying on explicit User Check button -> verify() -> lastCheck update -> Success Overlay.

  const targetSize = canvasA + canvasB;
  const initialPositions = useMemo(
    () => ({
      a2: [-1.5, 2, 0] as [number, number, number],
      b2: [-1.5, -2, 0] as [number, number, number],
      ab1: [1.5, 2, 0] as [number, number, number],
      ab2: [1.5, -2, 0] as [number, number, number],
    }),
    []
  );
  // .. (omitted unchanged code logic, but verify is destructured above)

  // ... (Update getCanvasLabels etc - unchanged) ...

  const getCanvasLabels = () => {
    if (questMode === "ARCHITECT" && architectQuest) {
      return {
        a2: `${architectQuest.ca ** 2}x^2`,
        b2: `${architectQuest.vb ** 2}`,
        ab: `${architectQuest.ca * architectQuest.vb}x`,
      };
    }
    if (questMode === "SCRAPPER" && scrapperQuest) {
      return {
        a2: `${scrapperQuest.ca ** 2 === 1 ? "" : scrapperQuest.ca ** 2}x^2`,
        b2: `${scrapperQuest.vb ** 2}${scrapperQuest.variant === "XY" ? "y^2" : ""}`,
        ab: `${scrapperQuest.ca * scrapperQuest.vb}${scrapperQuest.variant === "XY" ? "xy" : "x"}`,
      };
    }
    if (questMode === "ELITE" && eliteQuest) {
      return {
        a2: `${eliteQuest.C ** 2}x^2y^2`,
        b2: `${eliteQuest.V ** 2}`,
        ab: `${eliteQuest.C * eliteQuest.V}xy`,
      };
    }
    if (questMode === "VOYAGER" && voyagerQuest) {
      return {
        a2: `${voyagerQuest.ca ** 2}x^2`,
        b2: `${voyagerQuest.vb ** 2}`,
        ab: `${voyagerQuest.ca * voyagerQuest.vb}x`,
      };
    }
    return { a2: sm2_01_t.terms?.a2 ?? "a^{2}", b2: sm2_01_t.terms?.b2 ?? "b^{2}", ab: sm2_01_t.terms?.ab ?? "ab" };
  };

  const getCanvasTitleText = () => {
    if (questMode === "ARCHITECT" && architectQuest) return architectQuest.formula;
    if (questMode === "SCRAPPER" && scrapperQuest) {
      return scrapperQuest.variant === "XY"
        ? `${scrapperQuest.ca ** 2}x^2 + ${2 * scrapperQuest.ca * scrapperQuest.vb}xy + ${scrapperQuest.vb ** 2}y^2`
        : `${scrapperQuest.ca ** 2}x^2 + ${2 * scrapperQuest.ca * scrapperQuest.vb}x + ${scrapperQuest.vb ** 2}`;
    }
    if (questMode === "ELITE" && eliteQuest) return `${eliteQuest.C ** 2}x^2y^2 - ${eliteQuest.V ** 2}`;
    if (questMode === "VOYAGER" && voyagerQuest) return voyagerQuest.expr;
    return sm2_01_t.terms?.target_plus ?? "(a + b)^{2}";
  };

  const handleSidebarKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;

    const target = e.target as HTMLInputElement;
    if (target.tagName !== "INPUT") return;

    const inputs = Array.from(e.currentTarget.querySelectorAll("input"));
    const index = inputs.indexOf(target);

    if (index === -1) return;

    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = Math.min(index + 1, inputs.length - 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = Math.max(index - 1, 0);
    }

    if (nextIndex !== index) {
      inputs[nextIndex].focus();
      inputs[nextIndex].select();
      e.preventDefault();
    }
  };

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sm2_01_t.title}
      moduleCode="SM2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={questMode}
      onStageChange={handleModeChange}
      footerLeft={sm2_01_t.ui?.footer_left ?? "S2.01_BINOMIAL_FACTORY"}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      translations={{
        back: sm2_01_t.back,
        check: sm2_01_t.check || "VERIFY",
        next: sm2_01_t.ui?.execute_next_sequence ?? "NEXT",
        correct: sm2_01_t.solve_success ?? "VERIFIED",
        incorrect: sm2_01_t.solve_fail || "INCORRECT",
        ready: "READY",
        monitor_title: sm2_01_t.ui?.visual_reference_position ?? "VISUAL_MONITOR",
        difficulty: {
          basic: sm2_01_t.difficulty?.basic ?? "BASIC",
          core: sm2_01_t.difficulty?.core ?? "CORE",
          advanced: sm2_01_t.difficulty?.advanced ?? "ADVANCED",
          elite: sm2_01_t.difficulty?.elite ?? "ELITE",
        },
      }}
      monitorContent={
        <>
          <div className="flex-1 relative flex items-center justify-center p-8">
            <BinomialSquare2D
              a={canvasA}
              b={canvasB}
              hideRoots={!!(currentQuest as any)?.isFactor || questMode === "ELITE"}
            />

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-8 z-40"
                >
                  <div className="max-w-xs w-full p-8 bg-black border border-neon-green shadow-2xl text-center space-y-4">
                    <div className="w-10 h-10 border border-neon-green mx-auto flex items-center justify-center animate-pulse">
                      <Zap className="text-neon-green w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black neon-text-green tracking-tighter uppercase">
                      {sm2_01_t.solve_success ?? "VERIFIED"}
                    </h3>
                    <div className="h-px bg-white/10 w-full" />
                    <button
                      onClick={() => (questMode !== "EXPLORE" ? next() : setSnappedBlocks({}))}
                      className="w-full py-3 bg-neon-green/10 text-neon-green border border-neon-green hover:bg-neon-green text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-black"
                    >
                      {sm2_01_t.ui?.continue_operation ?? "CONTINUE"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {questMode !== "EXPLORE" && (
            <div className="p-4 bg-white/[0.02] border-t-2 border-white/10 text-[9px] font-black text-white/90 uppercase tracking-[0.4em] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_10px_#00ff9d]" />{" "}
                {sm2_01_t.ui?.status_operational ?? "OPERATIONAL"}
              </div>
              <div className="flex items-center gap-4">
                <span>{sm2_01_t.ui?.fps ?? "FPS"}: 60.0</span>
                <span>{sm2_01_t.ui?.latency ?? "LATENCY"}: 2ms</span>
              </div>
            </div>
          )}
        </>
      }
    >
      <div className="w-full max-w-5xl space-y-12" onKeyDown={handleSidebarKeyDown}>
        {questMode === "EXPLORE" ? (
          <div className="space-y-12 py-20 flex flex-col justify-center min-h-[60vh]">
            <h3 className="text-xl text-white uppercase tracking-[0.4em] font-black flex items-center gap-4 border-l-4 border-white pl-6">
              {sm2_01_t.params_config}
            </h3>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex justify-between text-base mb-3 text-white uppercase tracking-widest font-black">
                  <span>{sm2_01_t.param_a}</span>
                  <span className="text-white">
                    {a.toFixed(1)} {sm2_01_t.units}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={a}
                  onChange={(e) => !locked && setA(parseFloat(e.target.value))}
                  className="w-full accent-white h-2 bg-white/5 rounded-full appearance-none hover:bg-white/10 transition-all"
                />
              </div>
              <div className="space-y-6">
                <div className="flex justify-between text-base mb-3 text-white uppercase tracking-widest font-black">
                  <span>{sm2_01_t.param_b}</span>
                  <span className="text-white">
                    {b.toFixed(1)} {sm2_01_t.units}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={b}
                  onChange={(e) => !locked && setB(parseFloat(e.target.value))}
                  className="w-full accent-white h-2 bg-white/5 rounded-full appearance-none hover:bg-white/10 transition-all"
                />
              </div>
            </div>
            <button
              onClick={() => setLocked(!locked)}
              className={clsx(
                "w-64 mx-auto py-6 border-2 text-sm font-black tracking-[0.5em] transition-all uppercase shadow-2xl block",
                locked ? "border-white text-white bg-white/5" : "border-white text-white bg-white/5"
              )}
            >
              {locked ? <Unlock className="inline w-5 h-5 mr-3 mb-1" /> : <Lock className="inline w-5 h-5 mr-3 mb-1" />}{" "}
              {locked ? sm2_01_t.unlock : sm2_01_t.lock}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-700 min-h-[50vh] flex flex-col justify-start pt-4">
            <div className="space-y-4">
              {/* Scenario Context Box - SHIFTED UP AND REFINED */}
              <div className="bg-white/[0.04] border-l-4 border-neon-green/50 rounded-r-xl p-5 max-w-3xl mx-auto backdrop-blur-sm">
                <div className="text-white/70 text-xs font-mono leading-relaxed">
                  {questMode === "ARCHITECT" && sm2_01_t.scenarios.architect_context}
                  {questMode === "SCRAPPER" && sm2_01_t.scenarios.scrapper_context}
                  {questMode === "SPEEDSTER" && sm2_01_t.scenarios.speedster_context}
                  {questMode === "VOYAGER" && sm2_01_t.scenarios.voyager_context}
                </div>
              </div>

              {/* MISSION CONTEXT / PROMPT */}
              <div className="text-center">
                <h3 className="text-[9px] text-white uppercase tracking-[0.4em] font-black mb-2">
                  {sm2_01_t.active_objective}
                </h3>
                <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic drop-shadow-md">
                  <InlineMath math={currentQuest?.promptLatex || ""} />
                </p>
              </div>

              {/* TARGET EXPRESSION - STABILIZED */}
              <div className="p-4 sm:p-6 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative max-w-4xl mx-auto shadow-xl overflow-x-auto">
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="text-[9px] text-white/90 uppercase tracking-[0.6em] font-black block mb-3">
                  {sm2_01_t.target_expression}
                </span>
                <div className="font-black italic tracking-tighter text-white block py-1 drop-shadow-lg text-[clamp(1.5rem,5vw,4.5rem)] leading-tight whitespace-normal break-words">
                  {currentQuest?.expressionLatex}
                </div>
                {questMode === "SPEEDSTER" && (
                  <div className="text-sm text-white/90 font-normal tracking-wide mt-2">{sm2_01_t.speedster_hint}</div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-10 max-w-4xl mx-auto">
              {questMode === "ARCHITECT" && (
                <div className="flex flex-wrap items-center justify-center gap-4 bg-white/5 p-10 rounded-3xl border border-white/10 shadow-inner">
                  {architectQuest?.isFactor ? (
                    <div className="flex flex-col items-center gap-8 w-full">
                      <div className="flex flex-wrap items-center justify-center gap-2 text-2xl font-black">
                        <span className="text-white/90">(</span>
                        <input
                          value={inputs.a_root || ""}
                          onChange={(e) => setInputs({ ...inputs, a_root: e.target.value })}
                          className="w-20 sm:w-24 bg-black border-2 border-neon-cyan/50 p-2 text-center outline-none focus:border-neon-cyan text-white rounded-lg"
                          placeholder={sm2_01_t.placeholders?.ax ?? "ax"}
                        />
                        <span className="text-white/80">)^{2}</span>

                        <span className="text-neon-cyan mx-2">+</span>

                        <span className="text-white/90 text-3xl">2</span>
                        <span className="text-white/90">(</span>
                        <input
                          value={inputs.a_mid || ""}
                          onChange={(e) => setInputs({ ...inputs, a_mid: e.target.value })}
                          className="w-20 sm:w-24 bg-black border-2 border-neon-cyan/50 p-2 text-center outline-none focus:border-neon-cyan text-white rounded-lg"
                          placeholder={sm2_01_t.placeholders?.ax ?? "ax"}
                        />
                        <span className="text-white/80">)(</span>
                        <input
                          value={inputs.b_mid || ""}
                          onChange={(e) => setInputs({ ...inputs, b_mid: e.target.value })}
                          className="w-16 sm:w-20 bg-black border-2 border-neon-cyan/50 p-2 text-center outline-none focus:border-neon-cyan text-white rounded-lg"
                          placeholder={sm2_01_t.placeholders?.b ?? "b"}
                        />
                        <span className="text-white/90">)</span>

                        <span className="text-neon-cyan mx-2">+</span>

                        <span className="text-white/90">(</span>
                        <input
                          value={inputs.b_root || ""}
                          onChange={(e) => setInputs({ ...inputs, b_root: e.target.value })}
                          className="w-16 sm:w-20 bg-black border-2 border-neon-cyan/50 p-2 text-center outline-none focus:border-neon-cyan text-white rounded-lg"
                          placeholder={sm2_01_t.placeholders?.b ?? "b"}
                        />
                        <span className="text-white/80">)^{2}</span>
                      </div>
                      <div className="h-px bg-white/10 w-full max-w-lg" />
                      <div className="text-white/90 text-sm uppercase tracking-widest font-mono">
                        {sm2_01_t.decomposition_pattern ?? "Decomposition Pattern: a^{2} + 2ab + b^{2}"}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-3">
                        <input
                          value={inputs.a2 || ""}
                          onChange={(e) => setInputs({ ...inputs, a2: e.target.value })}
                          className="w-24 sm:w-32 bg-black border-2 border-neon-cyan/50 p-4 text-center outline-none focus:border-neon-cyan text-3xl font-black text-white rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                          placeholder={sm2_01_t.placeholders?.question ?? "?"}
                        />
                        <span className="text-[10px] text-white/90 uppercase tracking-[0.2em] font-black text-center">{sm2_01_t.ui?.coeff ?? "Coefficient"}</span>
                      </div>
                      <InlineMath math="x^{2}" />
                      <span className="text-4xl font-black text-neon-cyan">+</span>
                      <div className="flex flex-col gap-3">
                        <input
                          value={inputs.ab || ""}
                          onChange={(e) => setInputs({ ...inputs, ab: e.target.value })}
                          className="w-24 sm:w-32 bg-black border-2 border-neon-cyan/50 p-4 text-center outline-none focus:border-neon-cyan text-3xl font-black text-white rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                          placeholder={sm2_01_t.placeholders?.question ?? "?"}
                        />
                        <span className="text-[10px] text-white/90 uppercase tracking-[0.2em] font-black text-center">{sm2_01_t.ui?.coeff ?? "Coefficient"}</span>
                      </div>
                      <span className="text-4xl font-black text-white/80">x</span>
                      <span className="text-4xl font-black text-neon-cyan">+</span>
                      <div className="flex flex-col gap-3">
                        <input
                          value={inputs.b2 || ""}
                          onChange={(e) => setInputs({ ...inputs, b2: e.target.value })}
                          className="w-24 sm:w-32 bg-black border-2 border-neon-cyan/50 p-4 text-center outline-none focus:border-neon-cyan text-3xl font-black text-white rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                          placeholder={sm2_01_t.placeholders?.question ?? "?"}
                        />
                        <span className="text-[10px] text-white/90 uppercase tracking-[0.2em] font-black text-center">{sm2_01_t.ui?.const ?? "Constant"}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
              {questMode === "SCRAPPER" && (
                <>
                  <div className="col-span-3 mb-6">
                    <div className="bg-white/5 border border-white/60 rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="text-white/60 text-xs font-mono uppercase tracking-widest mb-3">
                        {sm2_01_t.scrapper_step01}
                      </div>
                      <div className="text-white text-2xl font-black flex items-center justify-center gap-4">
                        <InlineMath
                          math={
                            scrapperQuest?.variant === "XY"
                              ? `\\\\sqrt{${scrapperQuest.ca ** 2}x^{2}} = ${scrapperQuest.ca}x`
                              : `\\\\sqrt{${scrapperQuest?.ca ? scrapperQuest.ca ** 2 : ""}x^{2}} = ${scrapperQuest?.ca ?? ""}x`
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 text-center col-span-1">
                    <span className="text-xs text-white uppercase font-black tracking-widest">
                      {sm2_01_t.ui?.identify_root_a ?? "ROOT A"}
                    </span>
                    <input
                      value={inputs.a || ""}
                      onChange={(e) => setInputs({ ...inputs, a: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/90 font-black text-2xl text-white"
                      placeholder={sm2_01_t.placeholders?.ax ?? "ax"}
                    />
                  </div>
                  <div className="flex items-end pb-4 justify-center text-4xl text-white font-black">+</div>
                  <div className="flex flex-col gap-4 text-center col-span-1">
                    <span className="text-xs text-white uppercase font-black tracking-widest">
                      {sm2_01_t.ui?.identify_root_b ?? "ROOT B"}
                    </span>
                    <input
                      value={inputs.b || ""}
                      onChange={(e) => setInputs({ ...inputs, b: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/90 font-black text-2xl text-white"
                      placeholder={scrapperQuest?.variant === "XY" ? (sm2_01_t.placeholders?.by ?? "by") : (sm2_01_t.placeholders?.b ?? "b")}
                    />
                  </div>
                </>
              )}
              {questMode === "SPEEDSTER" && (
                <div className="col-span-3">
                  <div className="h-px bg-white/40 w-full mb-10" />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3 justify-center max-w-4xl mx-auto">
                    <input
                      value={inputs.part1 || ""}
                      onChange={(e) => setInputs({ ...inputs, part1: e.target.value })}
                      className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/90 text-2xl font-black text-white flex-shrink-0"
                      placeholder="a^{2}"
                    />
                    <span className="text-3xl font-black text-white">+</span>
                    <input
                      value={inputs.part2 || ""}
                      onChange={(e) => setInputs({ ...inputs, part2: e.target.value })}
                      className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/90 text-2xl font-black text-white flex-shrink-0"
                      placeholder={sm2_01_t.placeholders?.two_ab ?? "2ab"}
                    />
                    <span className="text-3xl font-black text-white">+</span>
                    <input
                      value={inputs.part3 || ""}
                      onChange={(e) => setInputs({ ...inputs, part3: e.target.value })}
                      className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/90 text-2xl font-black text-white flex-shrink-0"
                      placeholder={sm2_01_t.placeholders?.b_squared ?? "b^{2}"}
                    />
                  </div>
                </div>
              )}
              {questMode === "ELITE" && (
                <div className="col-span-3 space-y-12">
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-400/30 rounded-2xl p-6 max-w-3xl mx-auto">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">💡</div>
                      <div className="flex-1">
                        <div className="text-white/80 text-sm font-mono uppercase tracking-widest mb-3">
                          {sm2_01_t.elite_tips_title}
                        </div>
                        <div className="text-white text-lg space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-white/60">•</span>
                            <InlineMath
                              math={
                                eliteQuest
                                  ? `\\\\sqrt{${eliteQuest.C ** 2}} = ${eliteQuest.C}, \\\\quad \\\\sqrt{${eliteQuest.V ** 2}} = ${eliteQuest.V
                                  }`
                                  : ""
                              }
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white/60">•</span>
                            <span>
                              {sm2_01_t.elite_tips_target}{" "}
                              <InlineMath math={`(${eliteQuest?.C ?? ""}xy - ${eliteQuest?.V ?? ""})^{2}`} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-6">
                    <div className="text-white/60 text-xs font-mono uppercase tracking-widest mb-2">
                      {sm2_01_t.ui?.elite_step_1 ?? "STEP 1"}
                    </div>
                    <div className="flex items-center gap-4 justify-center bg-white/10 p-8 rounded-2xl border-2 border-white/40">
                      <span className="text-3xl text-white font-black">(</span>
                      <input
                        value={inputs.base || ""}
                        onChange={(e) => setInputs({ ...inputs, base: e.target.value })}
                        className="w-32 bg-transparent border-b-4 border-white/60 p-2 text-center outline-none focus:border-white text-3xl text-white font-black"
                        placeholder={sm2_01_t.placeholders?.cxy ?? "Cxy"}
                      />
                      <span className="text-3xl text-white font-black">-</span>
                      <input
                        value={inputs.sub || ""}
                        onChange={(e) => setInputs({ ...inputs, sub: e.target.value })}
                        className="w-24 bg-transparent border-b-4 border-white/60 p-2 text-center outline-none focus:border-white text-3xl text-white font-black"
                        placeholder={sm2_01_t.placeholders?.v ?? "V"}
                      />
                      <span className="text-3xl text-white font-black"><InlineMath math=")^{2}" /></span>
                    </div>

                    <div className="text-white/60 text-xs font-mono uppercase tracking-widest mt-4 mb-2">
                      {sm2_01_t.ui?.elite_step_2 ?? "STEP 2"}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl text-white font-black">+</span>
                      <input
                        value={inputs.add_term || ""}
                        onChange={(e) => setInputs({ ...inputs, add_term: e.target.value })}
                        className="w-40 bg-black border-2 border-white/40 p-3 text-center outline-none focus:border-white text-xl text-white font-black"
                        placeholder={sm2_01_t.placeholders?.two_cvxy ?? "2CVxy"}
                      />
                      <span className="text-2xl text-white font-black">-</span>
                      <input
                        value={inputs.const_term || ""}
                        onChange={(e) => setInputs({ ...inputs, const_term: e.target.value })}
                        className="w-32 bg-black border-2 border-white/40 p-3 text-center outline-none focus:border-white text-xl text-white font-black"
                        placeholder="V^{2}"
                      />
                    </div>
                  </div>
                </div>
              )}
              {questMode === "VOYAGER" && (
                <div className="col-span-3 space-y-12">
                  {voyagerQuest?.subType === "FACTOR" ? (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-3 font-black text-xl justify-center bg-white/10 p-8 rounded-2xl border-2 border-white/40 max-w-6xl mx-auto text-3xl">
                      <span className="text-white">(</span>
                      <input
                        value={inputs.a || ""}
                        onChange={(e) => setInputs({ ...inputs, a: e.target.value })}
                        className="w-24 sm:w-32 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black flex-shrink-0"
                        placeholder={sm2_01_t.placeholders?.ax ?? "ax"}
                      />
                      <span className="text-white">+</span>
                      <input
                        value={inputs.b || ""}
                        onChange={(e) => setInputs({ ...inputs, b: e.target.value })}
                        className="w-20 sm:w-28 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black flex-shrink-0"
                        placeholder={sm2_01_t.placeholders?.b ?? "b"}
                      />
                      <span className="text-white">) (</span>
                      <span className="text-white/70 min-w-[60px] text-center">{inputs.a || (sm2_01_t.placeholders?.ax ?? "ax")}</span>
                      <span className="text-white">-</span>
                      <span className="text-white/70 min-w-[60px] text-center">{inputs.b || (sm2_01_t.placeholders?.b ?? "b")}</span>
                      <span className="text-white">)</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-black text-4xl justify-center bg-white/10 p-10 rounded-2xl border-2 border-white/40">
                      <div className="flex items-center">
                        <input
                          value={inputs.part1 || ""}
                          onChange={(e) => setInputs({ ...inputs, part1: e.target.value })}
                          className="w-32 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-3xl text-white"
                          placeholder={sm2_01_t.placeholders?.question ?? "?"}
                        />
                        <span className="text-white ml-2"><InlineMath math="x^{2}" /></span>
                      </div>
                      <span className="text-white">-</span>
                      <div className="flex items-center">
                        <input
                          value={inputs.part2 || ""}
                          onChange={(e) => setInputs({ ...inputs, part2: e.target.value })}
                          className="w-32 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-3xl text-white"
                          placeholder={sm2_01_t.placeholders?.question ?? "?"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 mt-4 w-full max-w-4xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings2 className="w-4 h-4 text-white" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white underline underline-offset-[6px] decoration-white decoration-2">
                {sm2_01_t.ui?.logic_lattice_title ?? "LOGIC"}
              </span>
            </div>
            <div className="p-5 bg-white/[0.03] border-2 border-white/10 rounded-lg font-mono text-xs space-y-3 hover:border-white/60 transition-all">
              {questMode === "ARCHITECT" && (
                <>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase">
                    {sm2_01_t.ui?.logic_architect_step_1 ?? "STEP 1"}
                  </div>
                  <div className="text-white font-black">
                    {architectQuest
                      ? `${architectQuest.ca}x (${architectQuest.ca}x + ${architectQuest.vb}) + ${architectQuest.vb} (${architectQuest.ca}x + ${architectQuest.vb})`
                      : ""}
                  </div>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
                    {sm2_01_t.ui?.logic_architect_step_2 ?? "STEP 2"}
                  </div>
                  <div className="text-white font-black">
                    {architectQuest
                      ? `(${architectQuest.ca * architectQuest.ca}x^{2}) + (${architectQuest.ca * architectQuest.vb}x) + (${architectQuest.vb * architectQuest.ca
                      }x) + (${architectQuest.vb * architectQuest.vb})`
                      : ""}
                  </div>
                </>
              )}
              {questMode === "SCRAPPER" && (
                <>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase">
                    {sm2_01_t.ui?.logic_scrapper_step_1 ?? "STEP 1"}
                  </div>
                  <div className="text-white font-black">
                    <InlineMath math={scrapperQuest ? `\\\\sqrt{${scrapperQuest.ca * scrapperQuest.ca}x^{2}} = ${scrapperQuest.ca}x` : ""} />
                  </div>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
                    {sm2_01_t.ui?.logic_scrapper_step_2 ?? "STEP 2"}
                  </div>
                  <div className="text-white font-black">
                    {scrapperQuest ? `2 * (${scrapperQuest.ca}x) * (${scrapperQuest.vb}) = ${2 * scrapperQuest.ca * scrapperQuest.vb}x` : ""}
                  </div>
                </>
              )}
              {questMode === "VOYAGER" && (
                <>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase">
                    {sm2_01_t.ui?.logic_voyager_axiom_title ?? "AXIOM"}
                  </div>
                  <div className="text-white font-black flex items-center h-6">
                    <InlineMath math={sm2_01_t.ui?.logic_voyager_axiom_body ?? "(A+B)(A-B) = A^{2} - B^{2}"} />
                  </div>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
                    {sm2_01_t.ui?.logic_voyager_derivation_title ?? "DERIVATION"}
                  </div>
                  <div className="text-white font-black flex items-center h-6">
                    <InlineMath math={`A^{2} + AB - AB - B^{2} \\\\equiv A^{2} - B^{2}`} />
                  </div>
                </>
              )}
              {!["ARCHITECT", "SCRAPPER", "VOYAGER"].includes(questMode) && (
                <div className="text-white/60 italic text-[10px] py-8 text-center uppercase tracking-[0.3em] font-black">
                  {sm2_01_t.ui?.link_established ?? "LINK ESTABLISHED"}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-white" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white underline underline-offset-[6px] decoration-white decoration-2">
                {sm2_01_t.ui?.axiomatic_constraints_title ?? "CONSTRAINTS"}
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-mono italic font-black bg-white/[0.03] p-5 rounded-lg border-2 border-white/10">
              {questMode === "EXPLORE" && (locked ? sm2_01_t.instruction_solve : sm2_01_t.instruction_setup)}
              {questMode === "ARCHITECT" && sm2_01_t.ui?.constraints_architect}
              {questMode === "SCRAPPER" && sm2_01_t.ui?.constraints_scrapper}
              {questMode === "SPEEDSTER" && sm2_01_t.ui?.constraints_speedster}
              {questMode === "ELITE" && sm2_01_t.ui?.constraints_elite}
              {questMode === "VOYAGER" && sm2_01_t.ui?.constraints_voyager}
            </p>
          </div>
        </div>
      </div>
    </ChamberLayout >
  );
}
