"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BinomialSquare2D from "@/components/chamber/sm2-01/BinomialSquare2D";
import { Lock, Unlock, Settings2, Info, Zap } from "lucide-react";
import { clsx } from "clsx";

type QuestMode = "EXPLORE" | "ARCHITECT" | "SCRAPPER" | "SPEEDSTER" | "ELITE" | "VOYAGER";
type S201T = typeof translations.EN.sm2_01;

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

function buildStagePool(t: S201T, difficulty: Difficulty, stage: QuestMode): S201Quest[] {
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

  if (stage === "ARCHITECT") {
    return Array.from({ length: poolSize }).map((_, i) => {
      if (isBasic) {
        const vb = (i % 8) + 2;
        return {
          id: `ARCH_B_${i}`, difficulty, stage, type: "EXPAND", ca: 1, vb,
          formula: `(x + ${vb})²`, promptLatex: t.scenarios.architect_mission,
          expressionLatex: `(x + ${vb})²`, targetLatex: `x² + ${2 * vb}x + ${vb ** 2}`,
          slots: [
            { id: "a2", labelLatex: "x²", placeholder: "1", expected: 1 },
            { id: "ab", labelLatex: "x", placeholder: "coeff", expected: 2 * vb },
            { id: "b2", labelLatex: "const", placeholder: "const", expected: vb ** 2 },
          ],
          correctLatex: `x² + ${2 * vb}x + ${vb ** 2}`,
        };
      } else if (isCore) {
        const ca = (i % 4) + 2; const vb = (i % 5) + 3;
        return {
          id: `ARCH_C_${i}`, difficulty, stage, type: "EXPAND", ca, vb,
          formula: `(${ca}x + ${vb})²`, promptLatex: t.scenarios.architect_mission,
          expressionLatex: `(${ca}x + ${vb})²`, targetLatex: `${ca ** 2}x² + ${2 * ca * vb}x + ${vb ** 2}`,
          slots: [
            { id: "a2", labelLatex: "x²", placeholder: "coeff", expected: ca ** 2 },
            { id: "ab", labelLatex: "x", placeholder: "coeff", expected: 2 * ca * vb },
            { id: "b2", labelLatex: "const", placeholder: "const", expected: vb ** 2 },
          ],
          correctLatex: `${ca ** 2}x² + ${2 * ca * vb}x + ${vb ** 2}`,
        };
      } else if (isAdvanced) {
        const vb = (i % 10) + 2;
        return {
          id: `ARCH_A_${i}`, difficulty, stage, type: "EXPAND", ca: 1, vb, isFactor: true,
          formula: `x² + ${2 * vb}x + ${vb ** 2}`, promptLatex: `项识别与因式分解练习`,
          expressionLatex: `x² + ${2 * vb}x + ${vb ** 2}`,
          targetLatex: `(x)² + 2(x)(${vb}) + (${vb})²`,
          slots: [
            { id: "a_root", labelLatex: "a", placeholder: "x", expected: "x" },
            { id: "b_root", labelLatex: "b", placeholder: "b", expected: vb.toString() },
            { id: "a_mid", labelLatex: "a", placeholder: "x", expected: "x" },
            { id: "b_mid", labelLatex: "b", placeholder: "b", expected: vb.toString() },
          ],
          correctLatex: `x² + ${2 * vb}x + ${vb ** 2} = (x + ${vb})²`,
        };
      } else {
        const ca = (i % 4) + 2; const vb = (i % 6) + 3; const aTerm = `${ca}x`; const bTerm = `${vb}y`;
        return {
          id: `ARCH_E_${i}`, difficulty, stage, type: "EXPAND", ca, vb, isFactor: true,
          formula: `${ca ** 2}x² + ${2 * ca * vb}xy + ${vb ** 2}y²`, promptLatex: `双变量因式分解挑战`,
          expressionLatex: `${ca ** 2}x² + ${2 * ca * vb}xy + ${vb ** 2}y²`,
          targetLatex: `(${aTerm})² + 2(${aTerm})(${bTerm}) + (${bTerm})²`,
          slots: [
            { id: "a_root", labelLatex: "a", placeholder: "ax", expected: aTerm },
            { id: "b_root", labelLatex: "b", placeholder: "by", expected: bTerm },
            { id: "a_mid", labelLatex: "a", placeholder: "ax", expected: aTerm },
            { id: "b_mid", labelLatex: "b", placeholder: "by", expected: bTerm },
          ],
          correctLatex: `${ca ** 2}x² + ${2 * ca * vb}xy + ${vb ** 2}y² = (${aTerm} + ${bTerm})²`,
        };
      }
    });
  }

  if (stage === "SCRAPPER") {
    return Array.from({ length: poolSize }).map((_, i) => {
      let ca, vb, vA = "x", vB = "";
      let variant: "X" | "XY" = "X";
      if (isBasic) { ca = 1; vb = (i % 6) + 2; }
      else if (isCore) { ca = (i % 5) + 2; vb = (i % 5) + 2; }
      else if (isAdvanced) { ca = (i % 4) + 2; vb = (i % 4) + 3; vB = "y"; variant = "XY"; }
      else { ca = ((i % 4) + 3) * 2; vb = (i % 4) + 2; vA = "x²"; vB = i % 2 === 0 ? "y²" : ""; variant = vB ? "XY" : "X"; }

      const aTerm = getFullTerm(ca, vA);
      const bTerm = vB ? getFullTerm(vb, vB) : vb.toString();
      const expr = `${ca ** 2}${vA === "x²" ? "x⁴" : "x²"} + ${2 * ca * vb}${vA}${vB} + ${vb ** 2}${vB === "y" ? "y²" : (vB === "y²" ? "y⁴" : "")}`;

      return {
        id: `SCRAP_${difficulty}_${i}`, difficulty, stage, type: "SCRAPPER", ca, vb, variant, isFactor: true,
        promptLatex: t.scenarios.scrapper_mission, expressionLatex: expr,
        targetLatex: `(${aTerm} + ${bTerm})²`,
        slots: [
          { id: "a", labelLatex: "root a", placeholder: vA === "x²" ? "ax²" : "ax", expected: aTerm },
          { id: "b", labelLatex: "root b", placeholder: vB ? (vB === "y²" ? "by²" : "by") : "b", expected: bTerm },
        ],
        correctLatex: `(${aTerm} + ${bTerm})²`,
      };
    });
  }

  if (stage === "SPEEDSTER") {
    return Array.from({ length: poolSize }).map((_, i) => {
      let val, rb, off, sn: "+" | "-" = "+";
      if (isBasic) { val = [11, 12, 15, 21][i % 4]; rb = val < 20 ? 10 : 20; off = val - rb; }
      else if (isCore) { val = [49, 51, 99, 101][i % 4]; rb = val < 90 ? 50 : 100; off = Math.abs(val - rb); sn = val < rb ? "-" : "+"; }
      else if (isAdvanced) { val = [103, 98, 43, 197][i % 4]; rb = Math.round(val / 10) * 10; off = Math.abs(val - rb); sn = val < rb ? "-" : "+"; }
      else { val = [5.1, 10.2, 4.9, 2.1][i % 4]; rb = Math.round(val); off = parseFloat(Math.abs(val - rb).toFixed(1)); sn = val < rb ? "-" : "+"; }

      const mid = (sn === "-" ? -1 : 1) * 2 * rb * off;
      return {
        id: `SPEED_${difficulty}_${i}`, difficulty, stage, type: "SPEEDSTER",
        base: val, roundBase: rb, offset: off, sign: sn,
        a2: parseFloat((rb ** 2).toFixed(2)), middle: parseFloat(mid.toFixed(2)), b2: parseFloat((off ** 2).toFixed(2)), target: parseFloat((val ** 2).toFixed(2)),
        promptLatex: t.scenarios.speedster_mission, expressionLatex: `${val}²`,
        targetLatex: `${rb}² ${sn} 2(${rb})(${off}) + ${off}²`,
        slots: [
          { id: "part1", labelLatex: "a²", placeholder: "a²", expected: rb ** 2 },
          { id: "part2", labelLatex: "2ab", placeholder: "2ab", expected: mid },
          { id: "part3", labelLatex: "b²", placeholder: "b²", expected: parseFloat((off ** 2).toFixed(2)) },
        ],
        correctLatex: `${rb ** 2} ${sn === "-" ? "-" : "+"} ${Math.abs(mid)} + ${parseFloat((off ** 2).toFixed(2))} = ${parseFloat((val ** 2).toFixed(2))}`,
      };
    });
  }

  if (stage === "ELITE") {
    return Array.from({ length: poolSize }).map((_, i) => {
      let C, V, vA = "xy";
      if (isBasic) { C = 1; V = (i % 5) + 2; }
      else if (isCore) { C = (i % 3) + 2; V = (i % 4) + 4; }
      else if (isAdvanced) { C = (i % 4) + 4; V = (i % 5) + 10; }
      else { C = (i % 3) + 10; V = (i % 3) + 20; vA = "xyz"; }

      const aTerm = getFullTerm(C, vA);
      return {
        id: `ELITE_${difficulty}_${i}`, difficulty, stage, type: "ELITE", C, V, isFactor: true,
        promptLatex: t.scenarios.elite_mission,
        expressionLatex: `${C ** 2}${vA === "xy" ? "x²y²" : "x²y²z²"} - ${V ** 2}`,
        targetLatex: `(${aTerm} - ${V})² + ${2 * C * V}${vA} - ${2 * V ** 2}`,
        slots: [
          { id: "base", labelLatex: "root a", placeholder: vA.toUpperCase(), expected: aTerm },
          { id: "sub", labelLatex: "root b", placeholder: "V", expected: V.toString() },
          { id: "add_term", labelLatex: "2ab", placeholder: "linear", expected: `${2 * C * V}${vA}` },
          { id: "const_term", labelLatex: "2b²", placeholder: "const", expected: (2 * V ** 2).toString() },
        ],
        correctLatex: `(${aTerm} - ${V})² + ${2 * C * V}${vA} - ${2 * V ** 2} = ${C ** 2}${vA === "xy" ? "x²y²" : "x²y²z²"} - ${V ** 2}`,
      };
    });
  }

  if (stage === "VOYAGER") {
    return Array.from({ length: poolSize }).map((_, i) => {
      let ca, vb, vB = "";
      if (isBasic) { ca = 1; vb = (i % 8) + 2; }
      else if (isCore) { ca = (i % 5) + 2; vb = (i % 5) + 5; }
      else if (isAdvanced) { ca = (i % 6) + 3; vb = (i % 6) + 10; }
      else { ca = (i % 5) + 10; vb = (i % 5) + 15; vB = "y"; }

      const aT = getFullTerm(ca, "x"); const bT = vB ? getFullTerm(vb, vB) : vb.toString();
      const isFact = isAdvanced || isElite;
      const subType: "EXPAND" | "FACTOR" = isFact ? "FACTOR" : "EXPAND";
      const expr = isFact ? `${ca ** 2}x² - ${vb ** 2}${vB ? "y²" : ""}` : `(${aT} + ${bT})(${aT} - ${bT})`;

      return {
        id: `VOY_${difficulty}_${i}`, difficulty, stage, type: "DIFFERENCE", ca, vb, isFactor: isFact,
        expr, subType,
        promptLatex: t.scenarios.voyager_mission, expressionLatex: expr,
        targetLatex: isFact ? `(${aT} + ${bT})(${aT} - ${bT})` : `${ca ** 2}x² - ${vb ** 2}${vB ? "y²" : ""}`,
        slots: isFact
          ? [{ id: "a", labelLatex: "root a", placeholder: "ax", expected: aT }, { id: "b", labelLatex: "root b", placeholder: vB ? "by" : "b", expected: bT }]
          : [{ id: "part1", labelLatex: "a²", placeholder: "a²", expected: ca ** 2 }, { id: "part2", labelLatex: "b²", placeholder: "b²", expected: vb ** 2 }],
        correctLatex: isFact ? `(${aT} + ${bT})(${aT} - ${bT})` : `${ca ** 2}x² - ${vb ** 2}${vB ? "y²" : ""}`,
      };
    });
  }

  return [];
}

export default function S201Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sm2_01;

  const [questMode, setQuestMode] = useState<QuestMode>("EXPLORE");
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [locked, setLocked] = useState(false);
  const [snappedBlocks, setSnappedBlocks] = useState<Record<string, boolean>>({});

  const buildPool = useCallback((d: Difficulty, s: QuestMode) => buildStagePool(t, d, s), [t]);

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
  } = useQuestManager<S201Quest, QuestMode>({
    buildPool,
    initialStage: questMode,
  });

  const stages = [
    { id: "EXPLORE", label: t.tabs?.explore ?? "EXPLORE" },
    { id: "ARCHITECT", label: t.tabs?.architect ?? "ARCHITECT" },
    { id: "SCRAPPER", label: t.tabs?.scrapper ?? "SCRAPPER" },
    { id: "SPEEDSTER", label: t.tabs?.speedster ?? "SPEEDSTER" },
    { id: "VOYAGER", label: t.tabs?.voyager ?? "VOYAGER" },
    { id: "ELITE", label: t.tabs?.elite ?? "ELITE" },
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
        a2: `${architectQuest.ca ** 2}x²`,
        b2: `${architectQuest.vb ** 2}`,
        ab: `${architectQuest.ca * architectQuest.vb}x`,
      };
    }
    if (questMode === "SCRAPPER" && scrapperQuest) {
      return {
        a2: `${scrapperQuest.ca ** 2 === 1 ? "" : scrapperQuest.ca ** 2}x²`,
        b2: `${scrapperQuest.vb ** 2}${scrapperQuest.variant === "XY" ? "y²" : ""}`,
        ab: `${scrapperQuest.ca * scrapperQuest.vb}${scrapperQuest.variant === "XY" ? "xy" : "x"}`,
      };
    }
    if (questMode === "ELITE" && eliteQuest) {
      return {
        a2: `${eliteQuest.C ** 2}x²y²`,
        b2: `${eliteQuest.V ** 2}`,
        ab: `${eliteQuest.C * eliteQuest.V}xy`,
      };
    }
    if (questMode === "VOYAGER" && voyagerQuest) {
      return {
        a2: `${voyagerQuest.ca ** 2}x²`,
        b2: `${voyagerQuest.vb ** 2}`,
        ab: `${voyagerQuest.ca * voyagerQuest.vb}x`,
      };
    }
    return { a2: t.terms?.a2 ?? "a²", b2: t.terms?.b2 ?? "b²", ab: t.terms?.ab ?? "ab" };
  };

  const getCanvasTitleText = () => {
    if (questMode === "ARCHITECT" && architectQuest) return architectQuest.formula;
    if (questMode === "SCRAPPER" && scrapperQuest) {
      return scrapperQuest.variant === "XY"
        ? `${scrapperQuest.ca ** 2}x² + ${2 * scrapperQuest.ca * scrapperQuest.vb}xy + ${scrapperQuest.vb ** 2}y²`
        : `${scrapperQuest.ca ** 2}x² + ${2 * scrapperQuest.ca * scrapperQuest.vb}x + ${scrapperQuest.vb ** 2}`;
    }
    if (questMode === "ELITE" && eliteQuest) return `${eliteQuest.C ** 2}x²y² - ${eliteQuest.V ** 2}`;
    if (questMode === "VOYAGER" && voyagerQuest) return voyagerQuest.expr;
    return t.terms?.target_plus ?? "(a + b)²";
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
      title={t.title}
      moduleCode="SM2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={questMode}
      onStageChange={handleModeChange}
      footerLeft={t.ui?.footer_left ?? "S2.01_BINOMIAL_FACTORY"}
      checkStatus={lastCheck}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      translations={{
        back: t.back,
        check: t.check || "VERIFY",
        next: t.ui?.execute_next_sequence ?? "NEXT",
        correct: t.solve_success ?? "VERIFIED",
        incorrect: t.solve_fail || "INCORRECT",
        ready: "READY",
        monitor_title: t.ui?.visual_reference_position ?? "VISUAL_MONITOR",
        difficulty: {
          basic: t.difficulty?.basic ?? "BASIC",
          core: t.difficulty?.core ?? "CORE",
          advanced: t.difficulty?.advanced ?? "ADVANCED",
          elite: t.difficulty?.elite ?? "ELITE",
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
                      {t.solve_success ?? "VERIFIED"}
                    </h3>
                    <div className="h-px bg-white/10 w-full" />
                    <button
                      onClick={() => (questMode !== "EXPLORE" ? next() : setSnappedBlocks({}))}
                      className="w-full py-3 bg-neon-green/10 text-neon-green border border-neon-green hover:bg-neon-green text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-black"
                    >
                      {t.ui?.continue_operation ?? "CONTINUE"}
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
                {t.ui?.status_operational ?? "OPERATIONAL"}
              </div>
              <div className="flex items-center gap-4">
                <span>{t.ui?.fps ?? "FPS"}: 60.0</span>
                <span>{t.ui?.latency ?? "LATENCY"}: 2ms</span>
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
              {t.params_config}
            </h3>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex justify-between text-base mb-3 text-white uppercase tracking-widest font-black">
                  <span>{t.param_a}</span>
                  <span className="text-white">
                    {a.toFixed(1)} {t.units}
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
                  <span>{t.param_b}</span>
                  <span className="text-white">
                    {b.toFixed(1)} {t.units}
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
              {locked ? t.unlock : t.lock}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-700 min-h-[50vh] flex flex-col justify-start pt-4">
            <div className="space-y-4">
              {/* Scenario Context Box - SHIFTED UP AND REFINED */}
              <div className="bg-white/[0.04] border-l-4 border-neon-green/50 rounded-r-xl p-5 max-w-3xl mx-auto backdrop-blur-sm">
                <div className="text-white/70 text-xs font-mono leading-relaxed">
                  {questMode === "ARCHITECT" && t.scenarios.architect_context}
                  {questMode === "SCRAPPER" && t.scenarios.scrapper_context}
                  {questMode === "SPEEDSTER" && t.scenarios.speedster_context}
                  {questMode === "VOYAGER" && t.scenarios.voyager_context}
                </div>
              </div>

              {/* MISSION CONTEXT / PROMPT */}
              <div className="text-center">
                <h3 className="text-[9px] text-white uppercase tracking-[0.4em] font-black mb-2">
                  {t.active_objective}
                </h3>
                <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic drop-shadow-md">
                  {currentQuest?.promptLatex?.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ")}
                </p>
              </div>

              {/* TARGET EXPRESSION - STABILIZED */}
              <div className="p-4 sm:p-6 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative max-w-4xl mx-auto shadow-xl overflow-x-auto">
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="text-[9px] text-white/90 uppercase tracking-[0.6em] font-black block mb-3">
                  {t.target_expression}
                </span>
                <div className="font-black italic tracking-tighter text-white block py-1 drop-shadow-lg text-[clamp(1.5rem,5vw,4.5rem)] leading-tight whitespace-normal break-words">
                  {currentQuest?.expressionLatex}
                </div>
                {questMode === "SPEEDSTER" && (
                  <div className="text-sm text-white/90 font-normal tracking-wide mt-2">{t.speedster_hint}</div>
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
                          placeholder="ax"
                        />
                        <span className="text-white/80">)²</span>

                        <span className="text-neon-cyan mx-2">+</span>

                        <span className="text-white/90 text-3xl">2</span>
                        <span className="text-white/90">(</span>
                        <input
                          value={inputs.a_mid || ""}
                          onChange={(e) => setInputs({ ...inputs, a_mid: e.target.value })}
                          className="w-20 sm:w-24 bg-black border-2 border-neon-cyan/50 p-2 text-center outline-none focus:border-neon-cyan text-white rounded-lg"
                          placeholder="ax"
                        />
                        <span className="text-white/80">)(</span>
                        <input
                          value={inputs.b_mid || ""}
                          onChange={(e) => setInputs({ ...inputs, b_mid: e.target.value })}
                          className="w-16 sm:w-20 bg-black border-2 border-neon-cyan/50 p-2 text-center outline-none focus:border-neon-cyan text-white rounded-lg"
                          placeholder="b"
                        />
                        <span className="text-white/90">)</span>

                        <span className="text-neon-cyan mx-2">+</span>

                        <span className="text-white/90">(</span>
                        <input
                          value={inputs.b_root || ""}
                          onChange={(e) => setInputs({ ...inputs, b_root: e.target.value })}
                          className="w-16 sm:w-20 bg-black border-2 border-neon-cyan/50 p-2 text-center outline-none focus:border-neon-cyan text-white rounded-lg"
                          placeholder="b"
                        />
                        <span className="text-white/80">)²</span>
                      </div>
                      <div className="h-px bg-white/10 w-full max-w-lg" />
                      <div className="text-white/90 text-sm uppercase tracking-widest font-mono">
                        Decomposition Pattern: a² + 2ab + b²
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-3">
                        <input
                          value={inputs.a2 || ""}
                          onChange={(e) => setInputs({ ...inputs, a2: e.target.value })}
                          className="w-24 sm:w-32 bg-black border-2 border-neon-cyan/50 p-4 text-center outline-none focus:border-neon-cyan text-3xl font-black text-white rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                          placeholder="?"
                        />
                        <span className="text-[10px] text-white/90 uppercase tracking-[0.2em] font-black text-center">{t.ui?.coeff ?? "Coefficient"}</span>
                      </div>
                      <span className="text-4xl font-black text-white/80">x²</span>
                      <span className="text-4xl font-black text-neon-cyan">+</span>
                      <div className="flex flex-col gap-3">
                        <input
                          value={inputs.ab || ""}
                          onChange={(e) => setInputs({ ...inputs, ab: e.target.value })}
                          className="w-24 sm:w-32 bg-black border-2 border-neon-cyan/50 p-4 text-center outline-none focus:border-neon-cyan text-3xl font-black text-white rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                          placeholder="?"
                        />
                        <span className="text-[10px] text-white/90 uppercase tracking-[0.2em] font-black text-center">{t.ui?.coeff ?? "Coefficient"}</span>
                      </div>
                      <span className="text-4xl font-black text-white/80">x</span>
                      <span className="text-4xl font-black text-neon-cyan">+</span>
                      <div className="flex flex-col gap-3">
                        <input
                          value={inputs.b2 || ""}
                          onChange={(e) => setInputs({ ...inputs, b2: e.target.value })}
                          className="w-24 sm:w-32 bg-black border-2 border-neon-cyan/50 p-4 text-center outline-none focus:border-neon-cyan text-3xl font-black text-white rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                          placeholder="?"
                        />
                        <span className="text-[10px] text-white/90 uppercase tracking-[0.2em] font-black text-center">{t.ui?.const ?? "Constant"}</span>
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
                        {t.scrapper_step01}
                      </div>
                      <div className="text-white text-2xl font-black flex items-center justify-center gap-4">
                        <InlineMath
                          math={
                            scrapperQuest?.variant === "XY"
                              ? `\\sqrt{${scrapperQuest.ca ** 2}x^2} = ${scrapperQuest.ca}x`
                              : `\\sqrt{${scrapperQuest?.ca ? scrapperQuest.ca ** 2 : ""}x^2} = ${scrapperQuest?.ca ?? ""}x`
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 text-center col-span-1">
                    <span className="text-xs text-white uppercase font-black tracking-widest">
                      {t.ui?.identify_root_a ?? "ROOT A"}
                    </span>
                    <input
                      value={inputs.a || ""}
                      onChange={(e) => setInputs({ ...inputs, a: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/90 font-black text-2xl text-white"
                      placeholder="ax"
                    />
                  </div>
                  <div className="flex items-end pb-4 justify-center text-4xl text-white font-black">+</div>
                  <div className="flex flex-col gap-4 text-center col-span-1">
                    <span className="text-xs text-white uppercase font-black tracking-widest">
                      {t.ui?.identify_root_b ?? "ROOT B"}
                    </span>
                    <input
                      value={inputs.b || ""}
                      onChange={(e) => setInputs({ ...inputs, b: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/90 font-black text-2xl text-white"
                      placeholder={scrapperQuest?.variant === "XY" ? "by" : "b"}
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
                      placeholder="a²"
                    />
                    <span className="text-3xl font-black text-white">+</span>
                    <input
                      value={inputs.part2 || ""}
                      onChange={(e) => setInputs({ ...inputs, part2: e.target.value })}
                      className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/90 text-2xl font-black text-white flex-shrink-0"
                      placeholder="2ab"
                    />
                    <span className="text-3xl font-black text-white">+</span>
                    <input
                      value={inputs.part3 || ""}
                      onChange={(e) => setInputs({ ...inputs, part3: e.target.value })}
                      className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/90 text-2xl font-black text-white flex-shrink-0"
                      placeholder="b²"
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
                          {t.elite_tips_title}
                        </div>
                        <div className="text-white text-lg space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-white/60">•</span>
                            <InlineMath
                              math={
                                eliteQuest
                                  ? `\\sqrt{${eliteQuest.C ** 2}} = ${eliteQuest.C}, \\quad \\sqrt{${eliteQuest.V ** 2}} = ${eliteQuest.V
                                  }`
                                  : ""
                              }
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white/60">•</span>
                            <span>
                              {t.elite_tips_target}{" "}
                              <InlineMath math={`(${eliteQuest?.C ?? ""}xy - ${eliteQuest?.V ?? ""})^2`} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-6">
                    <div className="text-white/60 text-xs font-mono uppercase tracking-widest mb-2">
                      {t.ui?.elite_step_1 ?? "STEP 1"}
                    </div>
                    <div className="flex items-center gap-4 justify-center bg-white/10 p-8 rounded-2xl border-2 border-white/40">
                      <span className="text-3xl text-white font-black">(</span>
                      <input
                        value={inputs.base || ""}
                        onChange={(e) => setInputs({ ...inputs, base: e.target.value })}
                        className="w-32 bg-transparent border-b-4 border-white/60 p-2 text-center outline-none focus:border-white text-3xl text-white font-black"
                        placeholder="Cxy"
                      />
                      <span className="text-3xl text-white font-black">-</span>
                      <input
                        value={inputs.sub || ""}
                        onChange={(e) => setInputs({ ...inputs, sub: e.target.value })}
                        className="w-24 bg-transparent border-b-4 border-white/60 p-2 text-center outline-none focus:border-white text-3xl text-white font-black"
                        placeholder="V"
                      />
                      <span className="text-3xl text-white font-black">)²</span>
                    </div>

                    <div className="text-white/60 text-xs font-mono uppercase tracking-widest mt-4 mb-2">
                      {t.ui?.elite_step_2 ?? "STEP 2"}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl text-white font-black">+</span>
                      <input
                        value={inputs.add_term || ""}
                        onChange={(e) => setInputs({ ...inputs, add_term: e.target.value })}
                        className="w-40 bg-black border-2 border-white/40 p-3 text-center outline-none focus:border-white text-xl text-white font-black"
                        placeholder="2CVxy"
                      />
                      <span className="text-2xl text-white font-black">-</span>
                      <input
                        value={inputs.const_term || ""}
                        onChange={(e) => setInputs({ ...inputs, const_term: e.target.value })}
                        className="w-32 bg-black border-2 border-white/40 p-3 text-center outline-none focus:border-white text-xl text-white font-black"
                        placeholder="V²"
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
                        placeholder="ax"
                      />
                      <span className="text-white">+</span>
                      <input
                        value={inputs.b || ""}
                        onChange={(e) => setInputs({ ...inputs, b: e.target.value })}
                        className="w-20 sm:w-28 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black flex-shrink-0"
                        placeholder="b"
                      />
                      <span className="text-white">) (</span>
                      <span className="text-white/70 min-w-[60px] text-center">{inputs.a || "ax"}</span>
                      <span className="text-white">-</span>
                      <span className="text-white/70 min-w-[60px] text-center">{inputs.b || "b"}</span>
                      <span className="text-white">)</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-black text-4xl justify-center bg-white/10 p-10 rounded-2xl border-2 border-white/40">
                      <div className="flex items-center">
                        <input
                          value={inputs.part1 || ""}
                          onChange={(e) => setInputs({ ...inputs, part1: e.target.value })}
                          className="w-32 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-3xl text-white"
                          placeholder="?"
                        />
                        <span className="text-white ml-2">x²</span>
                      </div>
                      <span className="text-white">-</span>
                      <div className="flex items-center">
                        <input
                          value={inputs.part2 || ""}
                          onChange={(e) => setInputs({ ...inputs, part2: e.target.value })}
                          className="w-32 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-3xl text-white"
                          placeholder="?"
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
                {t.ui?.logic_lattice_title ?? "LOGIC"}
              </span>
            </div>
            <div className="p-5 bg-white/[0.03] border-2 border-white/10 rounded-lg font-mono text-xs space-y-3 hover:border-white/60 transition-all">
              {questMode === "ARCHITECT" && (
                <>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase">
                    {t.ui?.logic_architect_step_1 ?? "STEP 1"}
                  </div>
                  <div className="text-white font-black">
                    {architectQuest
                      ? `${architectQuest.ca}x (${architectQuest.ca}x + ${architectQuest.vb}) + ${architectQuest.vb} (${architectQuest.ca}x + ${architectQuest.vb})`
                      : ""}
                  </div>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
                    {t.ui?.logic_architect_step_2 ?? "STEP 2"}
                  </div>
                  <div className="text-white font-black">
                    {architectQuest
                      ? `(${architectQuest.ca * architectQuest.ca}x²) + (${architectQuest.ca * architectQuest.vb}x) + (${architectQuest.vb * architectQuest.ca
                      }x) + (${architectQuest.vb * architectQuest.vb})`
                      : ""}
                  </div>
                </>
              )}
              {questMode === "SCRAPPER" && (
                <>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase">
                    {t.ui?.logic_scrapper_step_1 ?? "STEP 1"}
                  </div>
                  <div className="text-white font-black">
                    {scrapperQuest ? `√(${scrapperQuest.ca * scrapperQuest.ca})x² = ${scrapperQuest.ca}x` : ""}
                  </div>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
                    {t.ui?.logic_scrapper_step_2 ?? "STEP 2"}
                  </div>
                  <div className="text-white font-black">
                    {scrapperQuest ? `2 * (${scrapperQuest.ca}x) * (${scrapperQuest.vb}) = ${2 * scrapperQuest.ca * scrapperQuest.vb}x` : ""}
                  </div>
                </>
              )}
              {questMode === "VOYAGER" && (
                <>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase">
                    {t.ui?.logic_voyager_axiom_title ?? "AXIOM"}
                  </div>
                  <div className="text-white font-black">{t.ui?.logic_voyager_axiom_body ?? "(A+B)(A-B) = A² - B²"}</div>
                  <div className="text-white/90 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
                    {t.ui?.logic_voyager_derivation_title ?? "DERIVATION"}
                  </div>
                  <div className="text-white font-black">A² + AB - AB - B² ≡ A² - B²</div>
                </>
              )}
              {!["ARCHITECT", "SCRAPPER", "VOYAGER"].includes(questMode) && (
                <div className="text-white/60 italic text-[10px] py-8 text-center uppercase tracking-[0.3em] font-black">
                  {t.ui?.link_established ?? "LINK ESTABLISHED"}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-white" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white underline underline-offset-[6px] decoration-white decoration-2">
                {t.ui?.axiomatic_constraints_title ?? "CONSTRAINTS"}
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-mono italic font-black bg-white/[0.03] p-5 rounded-lg border-2 border-white/10">
              {questMode === "EXPLORE" && (locked ? t.instruction_solve : t.instruction_setup)}
              {questMode === "ARCHITECT" && t.ui?.constraints_architect}
              {questMode === "SCRAPPER" && t.ui?.constraints_scrapper}
              {questMode === "SPEEDSTER" && t.ui?.constraints_speedster}
              {questMode === "ELITE" && t.ui?.constraints_elite}
              {questMode === "VOYAGER" && t.ui?.constraints_voyager}
            </p>
          </div>
        </div>
      </div>
    </ChamberLayout >
  );
}
