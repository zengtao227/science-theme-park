"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useCallback, useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ExponentialChart from "@/components/chamber/sm3-03/ExponentialChart";
import { clsx } from "clsx";

type Stage = "EXPONENTIAL" | "LOGARITHM" | "APPLICATIONS";
type S303T = typeof translations.EN.sm3_03;

interface S303Quest extends Quest {
  stage: Stage;
  initialCount?: number;
  doublingTime?: number;
  time?: number;
  finalCount?: number;
  chartMode?: "exponential" | "logarithm" | "halflife" | "compound";
  scenarioKey?: keyof S303T["scenarios"];
}

// Helper to create quests concisely
function q(
  id: string,
  d: Difficulty,
  s: Stage,
  prompt: string,
  expr: string,
  target: string,
  slots: Array<{ id: string; l: string; e: number | string; p?: string; u?: string }>,
  correct: string,
  extra: Partial<S303Quest>
): S303Quest {
  return {
    id,
    difficulty: d,
    stage: s,
    promptLatex: prompt,
    expressionLatex: expr,
    targetLatex: target,
    slots: slots.map((sl) => ({
      id: sl.id,
      labelLatex: sl.l,
      expected: sl.e,
      placeholder: sl.p,
      unit: sl.u,
    })),
    correctLatex: correct,
    ...extra,
  } as S303Quest;
}

function buildStagePool(t: S303T, d: Difficulty, s: Stage): S303Quest[] {
  const quests: S303Quest[] = [];

  // ----------------------------------------------------------------------
  // STAGE 1: EXPONENTIAL
  // ----------------------------------------------------------------------
  if (s === "EXPONENTIAL") {
    const pBasic = t.stages.exp_basic_prompt;
    const pAdv = t.stages.exp_advanced_prompt;
    const pElite = t.stages.exp_elite_prompt;

    if (d === "BASIC") {
      quests.push(
        q("E-B1", "BASIC", "EXPONENTIAL", pBasic, "N_0=100,\\; d=2\\;h,\\; t=4\\;h", "N(t)", [{ id: "N", l: "N(4)", e: 400 }], "N(4)=400", { initialCount: 100, doublingTime: 2, time: 4 }),
        q("E-B2", "BASIC", "EXPONENTIAL", pBasic, "N_0=10,\\; d=3\\;h,\\; t=6\\;h", "N(t)", [{ id: "N", l: "N(6)", e: 40 }], "N(6)=40", { initialCount: 10, doublingTime: 3, time: 6 }),
        q("E-B3", "BASIC", "EXPONENTIAL", pBasic, "N_0=50,\\; d=1\\;h,\\; t=3\\;h", "N(t)", [{ id: "N", l: "N(3)", e: 400 }], "N(3)=400", { initialCount: 50, doublingTime: 1, time: 3 }),
        q("E-B4", "BASIC", "EXPONENTIAL", pBasic, "N_0=25,\\; d=2\\;h,\\; t=6\\;h", "N(t)", [{ id: "N", l: "N(6)", e: 200 }], "N(6)=200", { initialCount: 25, doublingTime: 2, time: 6 }),
        q("E-B5", "BASIC", "EXPONENTIAL", pBasic, "N_0=200,\\; d=4\\;h,\\; t=4\\;h", "N(t)", [{ id: "N", l: "N(4)", e: 400 }], "N(4)=400", { initialCount: 200, doublingTime: 4, time: 4 }),
        q("E-B6", "BASIC", "EXPONENTIAL", pBasic, "N_0=1000,\\; d=10\\;h,\\; t=20\\;h", "N(t)", [{ id: "N", l: "N(20)", e: 4000 }], "N(20)=4000", { initialCount: 1000, doublingTime: 10, time: 20 }),
        q("E-B7", "BASIC", "EXPONENTIAL", pBasic, "N_0=5,\\; d=1\\;h,\\; t=5\\;h", "N(t)", [{ id: "N", l: "N(5)", e: 160 }], "N(5)=160", { initialCount: 5, doublingTime: 1, time: 5 }),
        q("E-B8", "BASIC", "EXPONENTIAL", pBasic, "N_0=1,\\; d=1\\;h,\\; t=10\\;h", "N(t)", [{ id: "N", l: "N(10)", e: 1024 }], "N(10)=1024", { initialCount: 1, doublingTime: 1, time: 10 })
      );
    } else if (d === "CORE") {
      quests.push(
        q("E-C1", "CORE", "EXPONENTIAL", pBasic, "N_0=100,\\; d=2\\;h,\\; t=1\\;h", "N(t)", [{ id: "N", l: "N(1)", e: 141.4, p: "1 dec" }], "N(1) \\approx 141.4", { initialCount: 100, doublingTime: 2, time: 1 }),
        q("E-C2", "CORE", "EXPONENTIAL", pBasic, "N_0=50,\\; d=4\\;h,\\; t=6\\;h", "N(t)", [{ id: "N", l: "N(6)", e: 141.4 }], "50 \\cdot 2^{1.5} \\approx 141.4", { initialCount: 50, doublingTime: 4, time: 6 }),
        q("E-C3", "CORE", "EXPONENTIAL", pBasic, "N_0=100,\\; d=3\\;h,\\; t=4.5\\;h", "N(t)", [{ id: "N", l: "N(4.5)", e: 282.8 }], "N \\approx 282.8", { initialCount: 100, doublingTime: 3, time: 4.5 }),
        q("E-C4", "CORE", "EXPONENTIAL", pBasic, "N_0=20,\\; d=2\\;h,\\; t=7\\;h", "N(t)", [{ id: "N", l: "N(7)", e: 226.3 }], "20 \\cdot 2^{3.5} \\approx 226.3", { initialCount: 20, doublingTime: 2, time: 7 }),
        q("E-C5", "CORE", "EXPONENTIAL", pBasic, "N_0=1000,\\; d=5\\;h,\\; t=2.5\\;h", "N(t)", [{ id: "N", l: "N(2.5)", e: 1414.2 }], "N \\approx 1414.2", { initialCount: 1000, doublingTime: 5, time: 2.5 }),
        q("E-C6", "CORE", "EXPONENTIAL", pBasic, "N_0=10,\\; d=1.5\\;h,\\; t=3\\;h", "N(t)", [{ id: "N", l: "N(3)", e: 40 }], "N(3)=40", { initialCount: 10, doublingTime: 1.5, time: 3 }),
        q("E-C7", "CORE", "EXPONENTIAL", pBasic, "N_0=64,\\; d=2\\;h,\\; t=-2\\;h", "N(t)", [{ id: "N", l: "N(-2)", e: 32 }], "64 \\cdot 2^{-1} = 32", { initialCount: 64, doublingTime: 2, time: -2 }), // Decay scenario in growth context
        q("E-C8", "CORE", "EXPONENTIAL", pBasic, "N_0=80,\\; d=4\\;h,\\; t=-2\\;h", "N(t)", [{ id: "N", l: "N(-2)", e: 56.6 }], "80 \\cdot 2^{-0.5} \\approx 56.6", { initialCount: 80, doublingTime: 4, time: -2 })
      );
    } else if (d === "ADVANCED") {
      quests.push(
        q("E-A1", "ADVANCED", "EXPONENTIAL", pAdv, "N_0=100,\\; t=6\\;h,\\; d=2\\;h", "n", [{ id: "n", l: "n", e: 3 }], "n=t/d=3", { initialCount: 100, doublingTime: 2, time: 6 }),
        q("E-A2", "ADVANCED", "EXPONENTIAL", pAdv, "N(t)=400,\\; N_0=50", "n", [{ id: "n", l: "n", e: 3 }], "2^n=8 \\implies n=3", { initialCount: 50, doublingTime: 2, time: 6, finalCount: 400 }), // time inferred
        q("E-A3", "ADVANCED", "EXPONENTIAL", pAdv, "N(t)=1000,\\; N_0=1000", "n", [{ id: "n", l: "n", e: 0 }], "n=0", { initialCount: 1000, doublingTime: 5, time: 0 }),
        q("E-A4", "ADVANCED", "EXPONENTIAL", pAdv, "N(t)=1280,\\; N_0=10", "n", [{ id: "n", l: "n", e: 7 }], "2^7=128 \\implies n=7", { initialCount: 10, doublingTime: 2, time: 14 }),
        q("E-A5", "ADVANCED", "EXPONENTIAL", pAdv, "N_0=100,\\; N(t)=25", "n", [{ id: "n", l: "n", e: -2 }], "2^n=0.25 \\implies n=-2", { initialCount: 100, doublingTime: 2, time: -4 }),
        q("E-A6", "ADVANCED", "EXPONENTIAL", pAdv, "N_0=500,\\; N(t)=125", "n", [{ id: "n", l: "n", e: -2 }], "n=-2", { initialCount: 500, doublingTime: 3, time: -6 }),
        q("E-A7", "ADVANCED", "EXPONENTIAL", pAdv, "N(t)=200,\\; N_0=50,\\; t=4\\;h", "d", [{ id: "d", l: "d", e: 2, u: "h" }], "2^2=4 \\implies n=2, d=4/2=2", { initialCount: 50, doublingTime: 2, time: 4 }), // Solve for d
        q("E-A8", "ADVANCED", "EXPONENTIAL", pAdv, "N(t)=80,\\; N_0=10,\\; d=3\\;h", "t", [{ id: "t", l: "t", e: 9, u: "h" }], "2^n=8 \\implies n=3, t=3d=9", { initialCount: 10, doublingTime: 3, time: 9 })
      );
    } else { // ELITE
      quests.push(
        q("E-E1", "ELITE", "EXPONENTIAL", pElite, "N_0=100,\\; t=d=1\\;h", "k", [{ id: "k", l: "k", e: 0.69 }], "k=\\ln(2)/1 \\approx 0.69", { initialCount: 100, doublingTime: 1, time: 1 }),
        q("E-E2", "ELITE", "EXPONENTIAL", pElite, "d=2\\;h", "k", [{ id: "k", l: "k", e: 0.35 }], "k=\\ln(2)/2 \\approx 0.35", { initialCount: 100, doublingTime: 2 }),
        q("E-E3", "ELITE", "EXPONENTIAL", pElite, "d=10\\;h", "k", [{ id: "k", l: "k", e: 0.07 }], "k \\approx 0.069", { initialCount: 100, doublingTime: 10 }),
        q("E-E4", "ELITE", "EXPONENTIAL", pElite, "N(t)=100e^{0.693t},\\; t=1", "N(1)", [{ id: "N", l: "N", e: 200 }], "e^{0.693} \\approx 2", { initialCount: 100, doublingTime: 1, time: 1 }),
        q("E-E5", "ELITE", "EXPONENTIAL", pElite, "N(t)=N_0 e^{kt},\\; k=0.1", "d", [{ id: "d", l: "d", e: 6.9 }], "d=\\ln(2)/0.1 \\approx 6.9", { initialCount: 100, doublingTime: 6.9 }),
        q("E-E6", "ELITE", "EXPONENTIAL", pElite, "N_0=50,\\; N(2)=200", "k", [{ id: "k", l: "k", e: 0.69 }], "4=e^{2k} \\implies k=\\ln(4)/2 \\approx 0.69", { initialCount: 50, doublingTime: 1 }),
        q("E-E7", "ELITE", "EXPONENTIAL", pElite, "2^{t/d} = e^{kt}", "kd", [{ id: "kd", l: "k \\cdot d", e: 0.69 }], "\\ln(2) \\approx 0.69", { initialCount: 1, doublingTime: 1 }),
        q("E-E8", "ELITE", "EXPONENTIAL", pElite, "\\text{Rate } 10\\% \\implies e^{0.1t}", "d", [{ id: "d", l: "d", e: 6.9 }], "d \\approx 6.9", { initialCount: 100, doublingTime: 6.9 })
      );
    }
  }

  // ----------------------------------------------------------------------
  // STAGE 2: LOGARITHM
  // ----------------------------------------------------------------------
  if (s === "LOGARITHM") {
    const pBasic = t.stages.log_basic_prompt;
    const pCore = t.stages.log_core_prompt;
    const pAdv = t.stages.log_advanced_prompt;
    const pElite = t.stages.log_elite_prompt;

    if (d === "BASIC") {
      quests.push(
        q("L-B1", "BASIC", "LOGARITHM", pBasic, "N_0=100,\\; N=800,\\; d=2\\;h", "t", [{ id: "t", l: "t", e: 6, u: "h" }], "t=2 \\cdot 3 = 6", { initialCount: 100, finalCount: 800, doublingTime: 2, chartMode: "logarithm" }),
        q("L-B2", "BASIC", "LOGARITHM", pBasic, "N_0=10,\\; N=320,\\; d=1\\;h", "t", [{ id: "t", l: "t", e: 5, u: "h" }], "320/10=32=2^5 \\implies t=5", { initialCount: 10, finalCount: 320, doublingTime: 1, chartMode: "logarithm" }),
        q("L-B3", "BASIC", "LOGARITHM", pBasic, "N_0=50,\\; N=200,\\; d=0.5\\;h", "t", [{ id: "t", l: "t", e: 1, u: "h" }], "200/50=4=2^2 \\implies t=1", { initialCount: 50, finalCount: 200, doublingTime: 0.5, chartMode: "logarithm" }),
        q("L-B4", "BASIC", "LOGARITHM", pBasic, "N_0=1,\\; N=1024,\\; d=1\\;min", "t", [{ id: "t", l: "t", e: 10, u: "min" }], "2^{10}=1024", { initialCount: 1, finalCount: 1024, doublingTime: 1, chartMode: "logarithm" }),
        q("L-B5", "BASIC", "LOGARITHM", pBasic, "N_0=1000,\\; N=8000,\\; d=10\\;h", "t", [{ id: "t", l: "t", e: 30, u: "h" }], "8=2^3 \\implies t=30", { initialCount: 1000, finalCount: 8000, doublingTime: 10, chartMode: "logarithm" }),
        q("L-B6", "BASIC", "LOGARITHM", pBasic, "N_0=64,\\; N=16,\\; d=2\\;h", "t", [{ id: "t", l: "t", e: -4, u: "h" }], "16/64=1/4=2^{-2} \\implies n=-2, t=-4", { initialCount: 64, finalCount: 16, doublingTime: 2, chartMode: "logarithm" }),
        q("L-B7", "BASIC", "LOGARITHM", pBasic, "N_0=25,\\; N=25,\\; d=5\\;h", "t", [{ id: "t", l: "t", e: 0, u: "h" }], "t=0", { initialCount: 25, finalCount: 25, doublingTime: 5, chartMode: "logarithm" }),
        q("L-B8", "BASIC", "LOGARITHM", pBasic, "N_0=12.5,\\; N=100,\\; d=4\\;h", "t", [{ id: "t", l: "t", e: 12, u: "h" }], "8=2^3 \\implies t=12", { initialCount: 12.5, finalCount: 100, doublingTime: 4, chartMode: "logarithm" })
      );
    } else if (d === "CORE") {
      quests.push(
        q("L-C1", "CORE", "LOGARITHM", pCore, "\\log_2(64)", "v", [{ id: "v", l: "v", e: 6 }], "2^6=64", { initialCount: 1, finalCount: 64, doublingTime: 1, chartMode: "logarithm" }),
        q("L-C2", "CORE", "LOGARITHM", pCore, "\\log_2(128)", "v", [{ id: "v", l: "v", e: 7 }], "2^7=128", { initialCount: 1, finalCount: 128, doublingTime: 1, chartMode: "logarithm" }),
        q("L-C3", "CORE", "LOGARITHM", pCore, "\\log_2(0.5)", "v", [{ id: "v", l: "v", e: -1 }], "2^{-1}=0.5", { initialCount: 1, finalCount: 0.5, doublingTime: 1, chartMode: "logarithm" }),
        q("L-C4", "CORE", "LOGARITHM", pCore, "\\log_2(1/16)", "v", [{ id: "v", l: "v", e: -4 }], "2^{-4}=1/16", { initialCount: 16, finalCount: 1, doublingTime: 1, chartMode: "logarithm" }),
        q("L-C5", "CORE", "LOGARITHM", pCore, "\\log_{10}(1000)", "v", [{ id: "v", l: "v", e: 3 }], "10^3=1000", { initialCount: 1, finalCount: 8, doublingTime: 1, chartMode: "logarithm" }), // Visual is binary but q works
        q("L-C6", "CORE", "LOGARITHM", pCore, "\\log_{10}(0.01)", "v", [{ id: "v", l: "v", e: -2 }], "10^{-2}=0.01", { initialCount: 1, finalCount: 4, doublingTime: 1, chartMode: "logarithm" }),
        q("L-C7", "CORE", "LOGARITHM", pCore, "\\log_2(\\sqrt{2})", "v", [{ id: "v", l: "v", e: 0.5 }], "2^{0.5}=\\sqrt{2}", { initialCount: 1, finalCount: 1.41, doublingTime: 1, chartMode: "logarithm" }),
        q("L-C8", "CORE", "LOGARITHM", pCore, "\\log_3(27)", "v", [{ id: "v", l: "v", e: 3 }], "3^3=27", { initialCount: 1, finalCount: 8, doublingTime: 1, chartMode: "logarithm" })
      );
    } else if (d === "ADVANCED") {
      quests.push(
        q("L-A1", "ADVANCED", "LOGARITHM", pAdv, "\\log_3(81)", "v", [{ id: "v", l: "v", e: 4 }], "\\log_3(81)=4", { initialCount: 1, doublingTime: 1 }),
        q("L-A2", "ADVANCED", "LOGARITHM", pAdv, "\\log_5(125)", "v", [{ id: "v", l: "v", e: 3 }], "5^3=125", { initialCount: 1, doublingTime: 1 }),
        q("L-A3", "ADVANCED", "LOGARITHM", pAdv, "\\log_4(2)", "v", [{ id: "v", l: "v", e: 0.5 }], "\\sqrt{4}=2", { initialCount: 1, doublingTime: 1 }),
        q("L-A4", "ADVANCED", "LOGARITHM", pAdv, "\\log_8(4)", "v", [{ id: "v", l: "v", e: 0.67 }], "2/3 \\approx 0.67", { initialCount: 1, doublingTime: 1 }),
        q("L-A5", "ADVANCED", "LOGARITHM", pAdv, "\\ln(e^5)", "v", [{ id: "v", l: "v", e: 5 }], "5", { initialCount: 1, doublingTime: 1 }),
        q("L-A6", "ADVANCED", "LOGARITHM", pAdv, "\\log_9(3)", "v", [{ id: "v", l: "v", e: 0.5 }], "0.5", { initialCount: 1, doublingTime: 1 }),
        q("L-A7", "ADVANCED", "LOGARITHM", pAdv, "\\log_{0.5}(4)", "v", [{ id: "v", l: "v", e: -2 }], "-2", { initialCount: 1, doublingTime: 1 }),
        q("L-A8", "ADVANCED", "LOGARITHM", pAdv, "\\ln(\\sqrt{e})", "v", [{ id: "v", l: "v", e: 0.5 }], "0.5", { initialCount: 1, doublingTime: 1 })
      );
    } else { // ELITE
      quests.push(
        q("L-E1", "ELITE", "LOGARITHM", pElite, "\\log_2(x) + \\log_2(4) = 5", "x", [{ id: "x", l: "x", e: 8 }], "x=8", { initialCount: 1, doublingTime: 1 }),
        q("L-E2", "ELITE", "LOGARITHM", pElite, "\\log_2(x) = 3", "x", [{ id: "x", l: "x", e: 8 }], "x=8", { initialCount: 1, doublingTime: 1 }),
        q("L-E3", "ELITE", "LOGARITHM", pElite, "\\log_x(16)=2", "x", [{ id: "x", l: "x", e: 4 }], "x=4", { initialCount: 1, doublingTime: 1 }),
        q("L-E4", "ELITE", "LOGARITHM", pElite, "\\ln(x)=0", "x", [{ id: "x", l: "x", e: 1 }], "x=1", { initialCount: 1, doublingTime: 1 }),
        q("L-E5", "ELITE", "LOGARITHM", pElite, "2\\log_2(x)=6", "x", [{ id: "x", l: "x", e: 8 }], "x=8", { initialCount: 1, doublingTime: 1 }),
        q("L-E6", "ELITE", "LOGARITHM", pElite, "\\log_2(x+2)=3", "x", [{ id: "x", l: "x", e: 6 }], "x=6", { initialCount: 1, doublingTime: 1 }),
        q("L-E7", "ELITE", "LOGARITHM", pElite, "e^{2x}=1", "x", [{ id: "x", l: "x", e: 0 }], "x=0", { initialCount: 1, doublingTime: 1 }),
        q("L-E8", "ELITE", "LOGARITHM", pElite, "\\log_{10}(x)=-1", "x", [{ id: "x", l: "x", e: 0.1 }], "0.1", { initialCount: 1, doublingTime: 1 })
      );
    }
  }

  // ----------------------------------------------------------------------
  // STAGE 3: APPLICATIONS
  // ----------------------------------------------------------------------
  if (s === "APPLICATIONS") {
    const pHalf = t.stages.app_half_prompt;
    const pComp = t.stages.app_compound_prompt;
    const pRate = t.stages.app_rate_prompt;
    const pPH = t.stages.app_ph_prompt;

    if (d === "BASIC") { // Half-life
      quests.push(
        q("A-B1", "BASIC", "APPLICATIONS", pHalf, "N_0=1000,\\; t_{1/2}=5\\;yr,\\; t=10\\;yr", "N(t)", [{ id: "N", l: "N", e: 250 }], "N=250", { initialCount: 1000, doublingTime: 5, time: 10, chartMode: "halflife" }),
        q("A-B2", "BASIC", "APPLICATIONS", pHalf, "N_0=100,\\; h=2\\;h,\\; t=6\\;h", "N(t)", [{ id: "N", l: "N", e: 12.5 }], "N=12.5", { initialCount: 100, doublingTime: 2, time: 6, chartMode: "halflife" }),
        q("A-B3", "BASIC", "APPLICATIONS", pHalf, "N_0=500,\\; h=10\\;min,\\; t=20\\;min", "N(t)", [{ id: "N", l: "N", e: 125 }], "N=125", { initialCount: 500, doublingTime: 10, time: 20, chartMode: "halflife" }),
        q("A-B4", "BASIC", "APPLICATIONS", pHalf, "N_0=64,\\; h=1\\;d,\\; t=3\\;d", "N(t)", [{ id: "N", l: "N", e: 8 }], "N=8", { initialCount: 64, doublingTime: 1, time: 3, chartMode: "halflife" }),
        q("A-B5", "BASIC", "APPLICATIONS", pHalf, "N_0=200,\\; h=4\\;h,\\; t=2\\;h", "N(t)", [{ id: "N", l: "N", e: 141.4 }], "N \\approx 141.4", { initialCount: 200, doublingTime: 4, time: 2, chartMode: "halflife" }),
        q("A-B6", "BASIC", "APPLICATIONS", pHalf, "N_0=10,\\; h=100\\;y,\\; t=50\\;y", "N(t)", [{ id: "N", l: "N", e: 7.1 }], "N \\approx 7.1", { initialCount: 10, doublingTime: 100, time: 50, chartMode: "halflife" }),
        q("A-B7", "BASIC", "APPLICATIONS", pHalf, "N_0=100,\\; N(t)=25,\\; h=5\\;d", "t", [{ id: "t", l: "t", e: 10, u: "d" }], "t=10", { initialCount: 100, doublingTime: 5, finalCount: 25, chartMode: "halflife" }), // Inverse
        q("A-B8", "BASIC", "APPLICATIONS", pHalf, "N_0=80,\\; N(t)=10,\\; t=9\\;h", "h", [{ id: "h", l: "h", e: 3, u: "h" }], "h=3", { initialCount: 80, doublingTime: 3, time: 9, chartMode: "halflife" }) // Inverse h
      );
    } else if (d === "CORE") { // Compound Interest
      quests.push(
        q("A-C1", "CORE", "APPLICATIONS", pComp, "P=1000,\\; r=5\\%,\\; t=10", "A", [{ id: "A", l: "A", e: 1629 }], "1.05^{10} \\approx 1.629", { initialCount: 1000, doublingTime: 14, time: 10, chartMode: "compound" }), // doubling time approx 70/5 = 14
        q("A-C2", "CORE", "APPLICATIONS", pComp, "P=100,\\; r=10\\%,\\; t=2", "A", [{ id: "A", l: "A", e: 121 }], "121", { initialCount: 100, doublingTime: 7.2, time: 2, chartMode: "compound" }),
        q("A-C3", "CORE", "APPLICATIONS", pComp, "P=500,\\; r=100\\%,\\; t=3", "A", [{ id: "A", l: "A", e: 4000 }], "2^3 \\cdot 500", { initialCount: 500, doublingTime: 1, time: 3, chartMode: "compound" }),
        q("A-C4", "CORE", "APPLICATIONS", pComp, "P=200,\\; r=20\\%,\\; t=5", "A", [{ id: "A", l: "A", e: 497.7 }], "497.7", { initialCount: 200, doublingTime: 3.8, time: 5, chartMode: "compound" }),
        q("A-C5", "CORE", "APPLICATIONS", pComp, "P=1,\\; r=3\\%,\\; t=24", "A", [{ id: "A", l: "A", e: 2 }], "Doubling!", { initialCount: 1, doublingTime: 23.4, time: 24, chartMode: "compound" }), // rule of 72
        q("A-C6", "CORE", "APPLICATIONS", pComp, "P=1000,\\; A=2000,\\; r=7\\%", "t", [{ id: "t", l: "t", e: 10.2 }], "t \\approx 10", { initialCount: 1000, doublingTime: 10, finalCount: 2000, chartMode: "compound" }),
        q("A-C7", "CORE", "APPLICATIONS", pComp, "P=1000,\\; r=100\\%,\\; t=0.5", "A", [{ id: "A", l: "A", e: 1414 }], "sqrt(2)*1000", { initialCount: 1000, doublingTime: 1, time: 0.5, chartMode: "compound" }),
        q("A-C8", "CORE", "APPLICATIONS", pComp, "P=50,\\; r=4\\%,\\; t=18", "A", [{ id: "A", l: "A", e: 101 }], "A \\approx 100", { initialCount: 50, doublingTime: 17.6, time: 18, chartMode: "compound" })
      );
    } else if (d === "ADVANCED") { // Growth Rates
      quests.push(
        q("A-A1", "ADVANCED", "APPLICATIONS", pRate, "P_0=100,\\; P=200,\\; t=10", "r\\%", [{ id: "r", l: "r", e: 7.2 }], "7.2\\%", { initialCount: 100, doublingTime: 10, time: 10, chartMode: "exponential" }),
        q("A-A2", "ADVANCED", "APPLICATIONS", pRate, "P_0=1000,\\; P=2000,\\; t=7", "r\\%", [{ id: "r", l: "r", e: 10.4 }], "r \\approx 10\\%", { initialCount: 1000, doublingTime: 7, time: 7, chartMode: "exponential" }),
        q("A-A3", "ADVANCED", "APPLICATIONS", pRate, "N_0=50,\\; N=400,\\; t=6", "d", [{ id: "d", l: "d", e: 2 }], "d=2", { initialCount: 50, doublingTime: 2, time: 6 }),
        q("A-A4", "ADVANCED", "APPLICATIONS", pRate, "N_0=10,\\; N=1000,\\; t=3", "d", [{ id: "d", l: "d", e: 0.45 }], "d \\approx 0.45", { initialCount: 10, doublingTime: 0.45, time: 3 }),
        q("A-A5", "ADVANCED", "APPLICATIONS", pRate, "P_0=100,\\; r=5\\%", "t_{double}", [{ id: "t", l: "t", e: 14.2 }], "t \\approx 14", { initialCount: 100, doublingTime: 14.2 }),
        q("A-A6", "ADVANCED", "APPLICATIONS", pRate, "P_0=1,\\; r=2\\%", "t_{double}", [{ id: "t", l: "t", e: 35 }], "t \\approx 35", { initialCount: 1, doublingTime: 35 }),
        q("A-A7", "ADVANCED", "APPLICATIONS", pRate, "N_0=100,\\; N=50,\\; t=5", "h", [{ id: "h", l: "h", e: 5 }], "h=5", { initialCount: 100, doublingTime: 5, chartMode: "halflife" }),
        q("A-A8", "ADVANCED", "APPLICATIONS", pRate, "N_0=100,\\; N=25,\\; t=10", "h", [{ id: "h", l: "h", e: 5 }], "h=5", { initialCount: 100, doublingTime: 5, chartMode: "halflife" })
      );
    } else { // ELITE - pH and Carbon Dating
      quests.push(
        q("A-E1", "ELITE", "APPLICATIONS", pPH, "[H^+]=10^{-3}", "pH", [{ id: "pH", l: "pH", e: 3 }], "pH=3", { initialCount: 10, doublingTime: 3.3, finalCount: 1000, chartMode: "logarithm" }), // visual abstract
        q("A-E2", "ELITE", "APPLICATIONS", pPH, "[H^+]=10^{-7}", "pH", [{ id: "pH", l: "pH", e: 7 }], "pH=7", { initialCount: 1, doublingTime: 1, finalCount: 128, chartMode: "logarithm" }),
        q("A-E3", "ELITE", "APPLICATIONS", pPH, "pH=4", "[H^+]", [{ id: "H", l: "10^x", e: -4 }], "10^{-4}", { initialCount: 10000, doublingTime: 1, chartMode: "logarithm" }),
        q("A-E4", "ELITE", "APPLICATIONS", pPH, "[H^+]=0.01", "pH", [{ id: "pH", l: "pH", e: 2 }], "pH=2", { initialCount: 100, doublingTime: 1, chartMode: "logarithm" }),
        q("A-E5", "ELITE", "APPLICATIONS", pPH, "\\text{Half-life } 5730y,\\; 12.5\\% \\text{ left}", "t", [{ id: "t", l: "t", e: 17190 }], "5730 \\cdot 3", { initialCount: 100, doublingTime: 5730, time: 17190, chartMode: "halflife" }),
        q("A-E6", "ELITE", "APPLICATIONS", pPH, "\\text{Half-life } 5730y,\\; 50\\% \\text{ left}", "t", [{ id: "t", l: "t", e: 5730 }], "5730", { initialCount: 100, doublingTime: 5730, time: 5730, chartMode: "halflife" }),
        q("A-E7", "ELITE", "APPLICATIONS", pPH, "N=N_0 e^{-0.1t},\\; t=10", "N/N_0", [{ id: "r", l: "ratio", e: 0.37 }], "e^{-1} \\approx 0.37", { initialCount: 1, doublingTime: 6.9, time: 10, chartMode: "halflife" }),
        q("A-E8", "ELITE", "APPLICATIONS", pPH, "\\log_{10}(I/I_0)=2", "I/I_0", [{ id: "r", l: "ratio", e: 100 }], "100", { initialCount: 1, doublingTime: 1, finalCount: 100, chartMode: "logarithm" })
      );
    }
  }

  return quests;
}

export default function S303Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sm3_03;

  // Canvas State
  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

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
  } = useQuestManager<S303Quest, Stage>({
    buildPool,
    initialStage: "EXPONENTIAL",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm3-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stages = [
    { id: "EXPONENTIAL", label: t.stages.exponential },
    { id: "LOGARITHM", label: t.stages.logarithm },
    { id: "APPLICATIONS", label: t.stages.applications },
  ];

  const chartMode = useMemo(() => {
    if (currentQuest?.chartMode) return currentQuest.chartMode;
    if (stage === "EXPONENTIAL") return "exponential";
    if (stage === "LOGARITHM") return "logarithm";
    if (stage === "APPLICATIONS") return "exponential"; // Default
    return "exponential";
  }, [currentQuest, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM3.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={handleStageChange as (s: string) => void}
      successRate={successRate}
      onNext={next}
      onVerify={verify}
      checkStatus={lastCheck}
      translations={t}
      footerLeft={t.footer_left}
      monitorContent={
        <div className="space-y-6">
          {/* SVG Chart */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
            <ExponentialChart
              mode={chartMode}
              initialCount={currentQuest?.initialCount || 100}
              doublingTime={currentQuest?.doublingTime || 2}
              time={currentQuest?.time}
              finalCount={currentQuest?.finalCount}
              labels={{
                xAxis: t.labels.time,
                yAxis: t.labels.population,
              }}
            />
          </div>

          {/* Formula Ref */}
          <div className="space-y-2">
            <div className="text-[9px] uppercase tracking-[0.3em] font-black text-green-400/70">
              {t.labels.formula_ref}
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-lg text-center text-white">
                <InlineMath math={t.formulas[stage.toLowerCase() as keyof typeof t.formulas] || ""} />
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div className="space-y-2">
            <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
              {t.labels.parameters}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {currentQuest?.initialCount !== undefined && (
                <div className="bg-white/5 rounded p-2 border border-white/10 flex flex-col justify-between">
                  <div className="text-[9px] text-white/40">N₀</div>
                  <div className="text-sm font-mono text-cyan-300 font-bold">
                    {currentQuest.initialCount}
                  </div>
                </div>
              )}
              {currentQuest?.doublingTime !== undefined && (
                <div className="bg-white/5 rounded p-2 border border-white/10 flex flex-col justify-between">
                  <div className="text-[9px] text-white/40">d / h</div>
                  <div className="text-sm font-mono text-green-300 font-bold">
                    {currentQuest.doublingTime}
                  </div>
                </div>
              )}
              {currentQuest?.time !== undefined && (
                <div className="bg-white/5 rounded p-2 border border-white/10 flex flex-col justify-between">
                  <div className="text-[9px] text-white/40">t</div>
                  <div className="text-sm font-mono text-white font-bold">
                    {currentQuest.time}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-5xl space-y-10">
        {/* Quest Section */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest opacity-60">
              {t.objective_title}
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              <InlineMath math={currentQuest?.promptLatex || ""} />
            </h2>
            {currentQuest?.expressionLatex && (
              <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 inline-block min-w-[300px]">
                <span className="text-4xl text-cyan-300 font-serif">
                  <InlineMath math={currentQuest.expressionLatex} />
                </span>
              </div>
            )}
          </div>

          {/* Input Slots */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {currentQuest?.slots.map((slot) => {
              const isCorrect = lastCheck?.ok;
              const value = inputs[slot.id] || "";
              return (
                <div key={slot.id} className="relative group">
                  <div className="absolute -top-3 left-3 px-1 bg-[#0a0a0a] text-[9px] text-gray-500 uppercase tracking-widest font-bold z-10 group-focus-within:text-cyan-400 transition-colors">
                    <InlineMath math={slot.labelLatex} />
                  </div>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                    placeholder={slot.placeholder || "?"}
                    disabled={isCorrect}
                    className={clsx(
                      "w-32 h-14 bg-white/5 border-2 rounded-xl text-center text-xl font-bold font-mono transition-all outline-none",
                      isCorrect
                        ? "border-green-500/50 text-green-400 bg-green-500/10"
                        : lastCheck && !lastCheck.ok
                          ? "border-red-500/50 text-white focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-white/10 text-white focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-white/20"
                    )}
                  />
                  {slot.unit && (
                    <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-white/50 font-bold font-mono">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback Message */}
          {lastCheck && (
            <div className={clsx(
              "text-center font-mono text-sm tracking-widest uppercase transition-all duration-500",
              lastCheck.ok ? "text-green-400 opacity-100 scale-100" : "text-red-400 opacity-100"
            )}>
              {lastCheck.ok ? t.correct : `${t.incorrect}: ${lastCheck.correct}`}
            </div>
          )}
        </div>

        <div className="text-center text-[10px] text-white/30 font-mono">
          {t.input_tip}
        </div>
      </div>
    </ChamberLayout>
  );
}
