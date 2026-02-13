"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import VectorVisualization from "@/components/chamber/gm2-01/VectorVisualization";

type Stage = "NAVIGATION" | "DOT" | "MISSION";
type GM201T = typeof translations.EN.gm2_01;

interface GM201Quest extends Quest {
  stage: Stage;
  scenario: string;
  pointA?: [number, number, number];
  pointB?: [number, number, number];
  vectorW?: [number, number, number];
  vectorS?: [number, number, number];
  hint: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// NAVIGATION: Calculate vectors from points and their magnitudes
function buildNavigationProblems(t: GM201T, difficulty: Difficulty): GM201Quest[] {
  const basic = [
    {
      id: "N_B1",
      difficulty,
      stage: "NAVIGATION" as Stage,
      scenario: "🚁 巴塞尔无人机配送 — 你在巴塞尔市中心操作配送无人机。起点 A(2, 1, 0) 是仓库，终点 B(5, 4, 0) 是客户位置。计算位移向量和飞行距离。",
      pointA: [2, 1, 0],
      pointB: [5, 4, 0],
      promptLatex: "\\text{Calculate displacement vector } \\vec{v} = \\vec{AB} \\text{ and its magnitude}",
      expressionLatex: "A(2,1,0), \\; B(5,4,0)",
      targetLatex: "\\vec{v}, |\\vec{v}|",
      slots: [
        { id: "vx", labelLatex: "v_x", placeholder: "0", expected: 3 },
        { id: "vy", labelLatex: "v_y", placeholder: "0", expected: 3 },
        { id: "vz", labelLatex: "v_z", placeholder: "0", expected: 0 },
        { id: "magnitude", labelLatex: "|\\vec{v}|", placeholder: "0.00", expected: round2(Math.sqrt(18)) }
      ],
      correctLatex: "",
      hint: "向量 AB = B - A = (Bx-Ax, By-Ay, Bz-Az)，模长 |v| = √(vx² + vy² + vz²)"
    },
    {
      id: "N_B2",
      difficulty,
      stage: "NAVIGATION" as Stage,
      scenario: "🏔️ 阿尔卑斯登山路线 — 登山者从营地 A(1, 2, 3) 前往山顶 B(4, 5, 8)。计算攀登向量和直线距离（单位：百米）。",
      pointA: [1, 2, 3],
      pointB: [4, 5, 8],
      promptLatex: "\\text{Calculate climbing vector } \\vec{v} \\text{ and distance}",
      expressionLatex: "A(1,2,3), \\; B(4,5,8)",
      targetLatex: "\\vec{v}, |\\vec{v}|",
      slots: [
        { id: "vx", labelLatex: "v_x", placeholder: "0", expected: 3 },
        { id: "vy", labelLatex: "v_y", placeholder: "0", expected: 3 },
        { id: "vz", labelLatex: "v_z", placeholder: "0", expected: 5 },
        { id: "magnitude", labelLatex: "|\\vec{v}|", placeholder: "0.00", expected: round2(Math.sqrt(43)) }
      ],
      correctLatex: "",
      hint: "计算各分量差值，然后用勾股定理求模长"
    },
