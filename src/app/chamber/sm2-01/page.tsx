"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S201BinomialCanvas from "@/components/chamber/sm2-01/BinomialCanvas";
import BinomialSquareCanvas from "@/components/chamber/sm2-01/BinomialSquareCanvas";
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
}

interface ScrapperQuest extends Quest {
  type: "SCRAPPER";
  stage: QuestMode;
  ca: number;
  vb: number;
  variant: "XY" | "X";
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

  if (stage === "ARCHITECT") {
    const ca = Math.floor(Math.random() * 8) + 1;
    const vb = Math.floor(Math.random() * 15) + 1;
    return [
      {
        id: `ARCH${ca}${vb}`,
        difficulty,
        stage,
        type: "EXPAND",
        ca,
        vb,
        formula: `(${ca === 1 ? "" : ca}x + ${vb})²`,
        promptLatex: t.scenarios.architect_mission,
        expressionLatex: `(${ca === 1 ? "" : ca}x + ${vb})^2`,
        targetLatex: `${ca ** 2}x^2 + ${2 * ca * vb}x + ${vb ** 2}`,
        slots: [
          { id: "a2", labelLatex: "a^2", placeholder: "a²", expected: ca ** 2 },
          { id: "ab", labelLatex: "2ab", placeholder: "2ab", expected: 2 * ca * vb },
          { id: "b2", labelLatex: "b^2", placeholder: "b²", expected: vb ** 2 },
        ],
        correctLatex: `${ca ** 2}x^2 + ${2 * ca * vb}x + ${vb ** 2}`,
      },
    ];
  }

  if (stage === "SCRAPPER") {
    const choices = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ca = choices[Math.floor(Math.random() * choices.length)];
    const vb = choices[Math.floor(Math.random() * choices.length)];
    const variant: "XY" | "X" = Math.random() > 0.5 ? "XY" : "X";

    return [
      {
        id: `SCRAP${ca}${vb}${variant}`,
        difficulty,
        stage,
        type: "SCRAPPER",
        ca,
        vb,
        variant,
        promptLatex: t.scenarios.scrapper_mission,
        expressionLatex:
          variant === "XY"
            ? `${ca ** 2}x^2 + ${2 * ca * vb}xy + ${vb ** 2}y^2`
            : `${ca ** 2}x^2 + ${2 * ca * vb}x + ${vb ** 2}`,
        targetLatex: `(${ca}x + ${vb}${variant === "XY" ? "y" : ""})^2`,
        slots: [
          { id: "a", labelLatex: "a", placeholder: "a", expected: ca },
          { id: "b", labelLatex: "b", placeholder: "b", expected: vb },
        ],
        correctLatex: `(${ca}x + ${vb}${variant === "XY" ? "y" : ""})^2`,
      },
    ];
  }

  if (stage === "SPEEDSTER") {
    const roundBases = [100, 80, 70, 50, 40, 30];
    const offsets = [1, 2, 3];
    const friendlyBases = roundBases
      .flatMap((roundBase) =>
        offsets.flatMap((offset) => [
          { base: roundBase + offset, roundBase, offset, sign: "+" as const },
          { base: roundBase - offset, roundBase, offset, sign: "-" as const },
        ])
      )
      .filter((c) => c.base > 0);

    const combo = friendlyBases[Math.floor(Math.random() * friendlyBases.length)];
    const signedMiddle = (combo.sign === "-" ? -1 : 1) * 2 * combo.roundBase * combo.offset;

    return [
      {
        id: `SPEED${combo.roundBase}${combo.sign}${combo.offset}`,
        difficulty,
        stage,
        type: "SPEEDSTER",
        base: combo.base,
        roundBase: combo.roundBase,
        offset: combo.offset,
        sign: combo.sign,
        a2: combo.roundBase ** 2,
        middle: signedMiddle,
        b2: combo.offset ** 2,
        target: combo.base ** 2,
        promptLatex: t.scenarios.speedster_mission,
        expressionLatex: `${combo.base}^2`,
        targetLatex: `${combo.roundBase ** 2} + ${signedMiddle} + ${combo.offset ** 2}`,
        slots: [
          { id: "part1", labelLatex: "a^2", placeholder: "a²", expected: combo.roundBase ** 2 },
          { id: "part2", labelLatex: "2ab", placeholder: "2ab", expected: signedMiddle },
          { id: "part3", labelLatex: "b^2", placeholder: "b²", expected: combo.offset ** 2 },
        ],
        correctLatex: `${combo.roundBase ** 2} + ${signedMiddle} + ${combo.offset ** 2}`,
      },
    ];
  }

  if (stage === "ELITE") {
    const C = Math.floor(Math.random() * 10) + 1;
    const V = Math.floor(Math.random() * 20) + 2;

    return [
      {
        id: `ELITE${C}${V}`,
        difficulty,
        stage,
        type: "ELITE",
        C,
        V,
        promptLatex: t.scenarios.elite_mission,
        expressionLatex: `${C ** 2}x^2y^2 - ${V ** 2}`,
        targetLatex: `(${C}xy - ${V})^2 + ${2 * C * V}xy - ${2 * V ** 2}`,
        slots: [
          { id: "base", labelLatex: "Cxy", placeholder: "Cxy", expected: `${C === 1 ? "" : C}xy` },
          { id: "sub", labelLatex: "V", placeholder: "V", expected: V.toString() },
          { id: "add_term", labelLatex: "2CVxy", placeholder: "2CVxy", expected: `${2 * C * V}xy` },
          { id: "const_term", labelLatex: "2V^2", placeholder: "2V²", expected: (2 * V ** 2).toString() },
        ],
        correctLatex: `(${C}xy - ${V})^2 + ${2 * C * V}xy - ${2 * V ** 2}`,
      },
    ];
  }

  if (stage === "VOYAGER") {
    const ca = Math.floor(Math.random() * 10) + 1;
    const vb = Math.floor(Math.random() * 25) + 1;
    const subType: "EXPAND" | "FACTOR" = Math.random() > 0.5 ? "EXPAND" : "FACTOR";

    const expr =
      subType === "EXPAND"
        ? `(${ca === 1 ? "" : ca}x + ${vb})(${ca === 1 ? "" : ca}x - ${vb})`
        : `${ca * ca === 1 ? "" : ca * ca}x² - ${vb * vb}`;

    return [
      {
        id: `VOY${ca}${vb}${subType}`,
        difficulty,
        stage,
        type: "DIFFERENCE",
        ca,
        vb,
        expr,
        subType,
        promptLatex: t.scenarios.voyager_mission,
        expressionLatex: expr,
        targetLatex: subType === "EXPAND" ? `${ca ** 2}x^2 - ${vb ** 2}` : `(${ca}x + ${vb})(${ca}x - ${vb})`,
        slots:
          subType === "FACTOR"
            ? [
              { id: "a", labelLatex: "a", placeholder: "a", expected: ca },
              { id: "b", labelLatex: "b", placeholder: "b", expected: vb },
            ]
            : [
              { id: "part1", labelLatex: "a^2", placeholder: "a²", expected: ca ** 2 },
              { id: "part2", labelLatex: "b^2", placeholder: "b²", expected: vb ** 2 },
            ],
        correctLatex: subType === "EXPAND" ? `${ca ** 2}x^2 - ${vb ** 2}` : `(${ca}x + ${vb})(${ca}x - ${vb})`,
      },
    ];
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
  } = useQuestManager<S201Quest, QuestMode>({
    buildPool: (d, s) => buildStagePool(t, d, s),
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

  const isVerified = useMemo(() => {
    if (!currentQuest || questMode === "EXPLORE") return false;

    if (questMode === "ARCHITECT" && architectQuest) {
      return (
        inputs.a2 === (architectQuest.ca ** 2).toString() &&
        inputs.ab === (2 * architectQuest.ca * architectQuest.vb).toString() &&
        inputs.b2 === (architectQuest.vb ** 2).toString()
      );
    }

    if (questMode === "SCRAPPER" && scrapperQuest) {
      return inputs.a === scrapperQuest.ca.toString() && inputs.b === scrapperQuest.vb.toString();
    }

    if (questMode === "SPEEDSTER" && speedsterQuest) {
      return (
        inputs.part1 === speedsterQuest.a2.toString() &&
        inputs.part2 === speedsterQuest.middle.toString() &&
        inputs.part3 === speedsterQuest.b2.toString()
      );
    }

    if (questMode === "ELITE" && eliteQuest) {
      const correctBase = eliteQuest.C === 1 ? "xy" : `${eliteQuest.C}xy`;
      const bOk = (inputs.base ?? "").toLowerCase().replace(/\s/g, "") === correctBase;
      const sOk = inputs.sub === eliteQuest.V.toString();
      const aOk = (inputs.add_term ?? "").toLowerCase().replace(/\s/g, "") === `${2 * eliteQuest.C * eliteQuest.V}xy`;
      const cOk = inputs.const_term === (2 * eliteQuest.V ** 2).toString();
      return bOk && sOk && aOk && cOk;
    }

    if (questMode === "VOYAGER" && voyagerQuest) {
      if (voyagerQuest.subType === "FACTOR") {
        return inputs.a === voyagerQuest.ca.toString() && inputs.b === voyagerQuest.vb.toString();
      }
      return inputs.part1 === (voyagerQuest.ca ** 2).toString() && inputs.part2 === (voyagerQuest.vb ** 2).toString();
    }

    return false;
  }, [currentQuest, inputs, questMode, architectQuest, scrapperQuest, speedsterQuest, eliteQuest, voyagerQuest]);

  const isSuccess = useMemo(() => {
    if (questMode === "EXPLORE")
      return snappedBlocks["a2"] && snappedBlocks["b2"] && snappedBlocks["ab1"] && snappedBlocks["ab2"];
    return isVerified;
  }, [snappedBlocks, isVerified, questMode]);

  useEffect(() => {
    if (questMode !== "EXPLORE" && isSuccess) {
      completeStage("sm2-01", questMode);
    }
  }, [completeStage, isSuccess, questMode]);

  const targetSize = a + b;
  const initialPositions = useMemo(
    () => ({
      a2: [-1.5, 2, 0] as [number, number, number],
      b2: [-1.5, -2, 0] as [number, number, number],
      ab1: [1.5, 2, 0] as [number, number, number],
      ab2: [1.5, -2, 0] as [number, number, number],
    }),
    []
  );
  const targetPositions = useMemo(
    () => ({
      a2: [-targetSize / 2 + a / 2, targetSize / 2 - a / 2, 0.01] as [number, number, number],
      b2: [targetSize / 2 - b / 2, -targetSize / 2 + b / 2, 0.02] as [number, number, number],
      ab1: [targetSize / 2 - b / 2, targetSize / 2 - a / 2, 0.03] as [number, number, number],
      ab2: [-targetSize / 2 + a / 2, -targetSize / 2 + b / 2, 0.04] as [number, number, number],
    }),
    [a, b, targetSize]
  );

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
      successRate={successRate}
      translations={{
        back: t.back,
        check: "VERIFY",
        next: t.ui?.execute_next_sequence ?? "NEXT",
        correct: t.solve_success ?? "VERIFIED",
        incorrect: "INCORRECT",
        ready: "READY",
        monitor_title: t.ui?.visual_reference_position ?? "VISUAL_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <>
          <div className="flex-1 relative">
            {/* 使用新的二项式平方可视化 */}
            <BinomialSquareCanvas a={a} b={b} />

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
            <div className="p-4 bg-white/[0.02] border-t-2 border-white/10 text-[9px] font-black text-white/40 uppercase tracking-[0.4em] flex justify-between items-center">
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
          <div className="space-y-8 animate-in slide-in-from-bottom duration-700 min-h-[65vh] flex flex-col justify-center">
            <div className="space-y-6">
              {/* 场景背景 */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 max-w-3xl mx-auto">
                <div className="text-white/80 text-sm font-mono leading-relaxed">
                  {questMode === "ARCHITECT" && t.scenarios.architect_context}
                  {questMode === "SCRAPPER" && t.scenarios.scrapper_context}
                  {questMode === "SPEEDSTER" && t.scenarios.speedster_context}
                  {questMode === "VOYAGER" && t.scenarios.voyager_context}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
                  {t.active_objective}
                </h3>
                <p className="text-4xl text-white font-black max-w-2xl mx-auto leading-tight italic">
                  {currentQuest?.promptLatex}
                </p>
              </div>

              <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-x-auto">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
                  {t.target_expression}
                </span>
                <div
                  className={clsx(
                    "font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]",
                    questMode === "VOYAGER" && voyagerQuest?.subType !== "FACTOR"
                      ? "whitespace-normal break-words text-[clamp(1.6rem,5.2vw,5.5rem)] leading-[1.1]"
                      : "whitespace-normal text-[clamp(2.25rem,7vw,6rem)] leading-[0.95]"
                  )}
                >
                  {questMode === "ARCHITECT" && <span className="break-words">{architectQuest?.formula}</span>}
                  {questMode === "SCRAPPER" && (
                    <div className="text-[clamp(1.75rem,5vw,3.5rem)] break-words">
                      {scrapperQuest?.variant === "XY"
                        ? `${scrapperQuest.ca ** 2 === 1 ? "" : scrapperQuest.ca ** 2}x² + ${2 * scrapperQuest.ca * scrapperQuest.vb
                        }xy + ${scrapperQuest.vb ** 2}y²`
                        : `${scrapperQuest?.ca ? (scrapperQuest.ca ** 2 === 1 ? "" : scrapperQuest.ca ** 2) : ""}x² + ${scrapperQuest ? 2 * scrapperQuest.ca * scrapperQuest.vb : ""
                        }x + ${scrapperQuest ? scrapperQuest.vb ** 2 : ""}`}
                    </div>
                  )}
                  {questMode === "ELITE" && (
                    <span className="break-words">{eliteQuest ? `${eliteQuest.C ** 2}x²y² - ${eliteQuest.V ** 2}` : ""}</span>
                  )}
                  {questMode === "VOYAGER" &&
                    (voyagerQuest?.subType === "FACTOR" ? (
                      <span className="break-words">
                        {voyagerQuest ? `${voyagerQuest.ca ** 2}x² - ${voyagerQuest.vb ** 2}` : ""}
                      </span>
                    ) : (
                      <span className="inline-block whitespace-nowrap">
                        {voyagerQuest ? `(${voyagerQuest.ca}x + ${voyagerQuest.vb})(${voyagerQuest.ca}x - ${voyagerQuest.vb})` : ""}
                      </span>
                    ))}
                  {questMode === "SPEEDSTER" && (
                    <div className="text-[clamp(2rem,6vw,4.5rem)] flex flex-col items-center gap-6">
                      <div className="text-white break-words">{speedsterQuest?.base}²</div>
                      <div className="text-xl text-white/50 font-normal tracking-wide">{t.speedster_hint}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 justify-center max-w-xl mx-auto">
              {questMode === "ARCHITECT" && (
                <>
                  <div className="flex flex-col gap-4 text-center">
                    <span className="text-xs text-white uppercase font-black tracking-widest">{t.ui?.part_1_a2 ?? "a²"}</span>
                    <input
                      value={inputs.a2 || ""}
                      onChange={(e) => setInputs({ ...inputs, a2: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white"
                      placeholder="?"
                    />
                  </div>
                  <div className="flex flex-col gap-4 text-center">
                    <span className="text-xs text-white uppercase font-black tracking-widest">{t.ui?.part_2_2ab ?? "2ab"}</span>
                    <input
                      value={inputs.ab || ""}
                      onChange={(e) => setInputs({ ...inputs, ab: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white"
                      placeholder="?"
                    />
                  </div>
                  <div className="flex flex-col gap-4 text-center">
                    <span className="text-xs text-white uppercase font-black tracking-widest">{t.ui?.part_3_b2 ?? "b²"}</span>
                    <input
                      value={inputs.b2 || ""}
                      onChange={(e) => setInputs({ ...inputs, b2: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white"
                      placeholder="?"
                    />
                  </div>
                </>
              )}
              {questMode === "SCRAPPER" && (
                <>
                  <div className="col-span-3 mb-6">
                    <div className="bg-white/5 border border-white/20 rounded-xl p-6 max-w-2xl mx-auto">
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
                      {t.ui?.identify_root_a ?? "a"}
                    </span>
                    <input
                      value={inputs.a || ""}
                      onChange={(e) => setInputs({ ...inputs, a: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 font-black text-2xl text-white"
                      placeholder="?"
                    />
                  </div>
                  <div className="flex items-end pb-4 justify-center text-4xl text-white font-black">+</div>
                  <div className="flex flex-col gap-4 text-center col-span-1">
                    <span className="text-xs text-white uppercase font-black tracking-widest">
                      {t.ui?.identify_root_b ?? "b"}
                    </span>
                    <input
                      value={inputs.b || ""}
                      onChange={(e) => setInputs({ ...inputs, b: e.target.value })}
                      className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 font-black text-2xl text-white"
                      placeholder="?"
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
                      className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white flex-shrink-0"
                      placeholder="a²"
                    />
                    <span className="text-3xl font-black text-white">+</span>
                    <input
                      value={inputs.part2 || ""}
                      onChange={(e) => setInputs({ ...inputs, part2: e.target.value })}
                      className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white flex-shrink-0"
                      placeholder="2ab"
                    />
                    <span className="text-3xl font-black text-white">+</span>
                    <input
                      value={inputs.part3 || ""}
                      onChange={(e) => setInputs({ ...inputs, part3: e.target.value })}
                      className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white flex-shrink-0"
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
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-3 font-black text-xl justify-center bg-white/10 p-8 rounded-2xl border-2 border-white/40 max-w-6xl mx-auto">
                      <span className="text-white">(</span>
                      <input
                        value={inputs.a || ""}
                        onChange={(e) => setInputs({ ...inputs, a: e.target.value })}
                        className="w-16 sm:w-24 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black flex-shrink-0"
                        placeholder="a"
                      />
                      <span className="text-white">x +</span>
                      <input
                        value={inputs.b || ""}
                        onChange={(e) => setInputs({ ...inputs, b: e.target.value })}
                        className="w-16 sm:w-24 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black flex-shrink-0"
                        placeholder="b"
                      />
                      <span className="text-white">) (</span>
                      <span className="text-white/70 min-w-[48px] text-center">{inputs.a || "a"}</span>
                      <span className="text-white">x -</span>
                      <span className="text-white/70 min-w-[48px] text-center">{inputs.b || "b"}</span>
                      <span className="text-white">)</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-black text-4xl justify-center bg-white/10 p-10 rounded-2xl border-2 border-white/40">
                      <div className="flex items-center">
                        <input
                          value={inputs.part1 || ""}
                          onChange={(e) => setInputs({ ...inputs, part1: e.target.value })}
                          className="w-32 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-3xl text-white"
                          placeholder="?"
                        />
                        <span className="text-white ml-2">x²</span>
                      </div>
                      <span className="text-white">-</span>
                      <div className="flex items-center">
                        <input
                          value={inputs.part2 || ""}
                          onChange={(e) => setInputs({ ...inputs, part2: e.target.value })}
                          className="w-32 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-3xl text-white"
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
            <div className="p-5 bg-white/[0.03] border-2 border-white/10 rounded-lg font-mono text-xs space-y-3 hover:border-white/20 transition-all">
              {questMode === "ARCHITECT" && (
                <>
                  <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">
                    {t.ui?.logic_architect_step_1 ?? "STEP 1"}
                  </div>
                  <div className="text-white font-black">
                    {architectQuest
                      ? `${architectQuest.ca}x (${architectQuest.ca}x + ${architectQuest.vb}) + ${architectQuest.vb} (${architectQuest.ca}x + ${architectQuest.vb})`
                      : ""}
                  </div>
                  <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
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
                  <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">
                    {t.ui?.logic_scrapper_step_1 ?? "STEP 1"}
                  </div>
                  <div className="text-white font-black">
                    {scrapperQuest ? `√(${scrapperQuest.ca * scrapperQuest.ca})x² = ${scrapperQuest.ca}x` : ""}
                  </div>
                  <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
                    {t.ui?.logic_scrapper_step_2 ?? "STEP 2"}
                  </div>
                  <div className="text-white font-black">
                    {scrapperQuest ? `2 * (${scrapperQuest.ca}x) * (${scrapperQuest.vb}) = ${2 * scrapperQuest.ca * scrapperQuest.vb}x` : ""}
                  </div>
                </>
              )}
              {questMode === "VOYAGER" && (
                <>
                  <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">
                    {t.ui?.logic_voyager_axiom_title ?? "AXIOM"}
                  </div>
                  <div className="text-white font-black">{t.ui?.logic_voyager_axiom_body ?? "(A+B)(A-B) = A² - B²"}</div>
                  <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">
                    {t.ui?.logic_voyager_derivation_title ?? "DERIVATION"}
                  </div>
                  <div className="text-white font-black">A² + AB - AB - B² ≡ A² - B²</div>
                </>
              )}
              {!["ARCHITECT", "SCRAPPER", "VOYAGER"].includes(questMode) && (
                <div className="text-white/20 italic text-[10px] py-8 text-center uppercase tracking-[0.3em] font-black">
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
    </ChamberLayout>
  );
}
