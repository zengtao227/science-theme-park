"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import LawsCanvas from "@/components/chamber/sp1-02/LawsCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "NEWTON_1" | "NEWTON_2" | "FRICTION";

interface SP302Quest extends Quest {
  stage: Stage;
  mass?: number;
  force?: number;
  acceleration?: number;
  frictionCoeff?: number;
  theta?: number;
  velocity?: number;
}

// 数据类型定义
type SP302QuestData = {
  id: string;
  m: number;      // 质量 (kg)
  f?: number;     // 力 (N)
  mu?: number;    // 摩擦系数
  a?: number;     // 加速度 (m/s²)
  theta?: number; // 斜面角度 (度)
  v?: number;     // 速度 (m/s)
  scen: string;   // 场景描述键
  expect: number; // 预期答案
};

// 静态数据表 - 60题完整数据
const QUEST_DATA: Record<Stage, Record<Difficulty, SP302QuestData[]>> = {
  NEWTON_1: {
    BASIC: [
      { id: "Q1", m: 10, f: 0, scen: "rest", expect: 0 },
      { id: "Q2", m: 5, f: 20, v: 10, scen: "const_v", expect: 0 },
      { id: "Q3", m: 8, f: 16, scen: "equilibrium", expect: 16 },
      { id: "Q4", m: 12, f: 0, scen: "space", expect: 0 },
      { id: "Q5", m: 15, f: 30, scen: "inertia", expect: 0 },
    ],
    CORE: [
      { id: "Q1", m: 10, f: 20, scen: "2d_balance", expect: 20 },
      { id: "Q2", m: 8, f: 16, scen: "vector_add", expect: 16 },
      { id: "Q3", m: 12, f: 24, scen: "2d_balance", expect: 24 },
      { id: "Q4", m: 15, f: 30, scen: "vector_add", expect: 30 },
      { id: "Q5", m: 20, f: 40, scen: "2d_balance", expect: 40 },
    ],
    ADVANCED: [
      { id: "Q1", m: 10, mu: 0.3, theta: 30, scen: "slope", expect: 29.4 },
      { id: "Q2", m: 8, mu: 0.4, theta: 30, scen: "slope", expect: 23.52 },
      { id: "Q3", m: 12, mu: 0.2, scen: "space_friction", expect: 0 },
      { id: "Q4", m: 15, mu: 0.5, theta: 30, scen: "slope", expect: 44.1 },
      { id: "Q5", m: 20, mu: 0.3, theta: 30, scen: "slope", expect: 58.8 },
    ],
    ELITE: [
      { id: "Q1", m: 10, f: 50, mu: 0.3, scen: "complex", expect: 20.6 },
      { id: "Q2", m: 8, f: 40, mu: 0.4, scen: "complex", expect: 8.64 },
      { id: "Q3", m: 12, f: 60, mu: 0.2, scen: "complex", expect: 36.48 },
      { id: "Q4", m: 15, f: 75, mu: 0.5, scen: "complex", expect: 1.5 },
      { id: "Q5", m: 20, f: 100, mu: 0.3, scen: "complex", expect: 41.2 },
      // Cross-disciplinary ELITE questions with 3D vector equilibrium
      { id: "Q6", m: 12.5, f: 65, mu: 0.35, theta: 25, scen: "rhine_bridge_3d", expect: 22.89 },
      { id: "Q7", m: 18.3, f: 85, mu: 0.28, theta: 30, scen: "basel_tram_equilibrium", expect: 35.42 },
    ],
  },
  NEWTON_2: {
    BASIC: [
      { id: "Q1", m: 10, a: 2, scen: "find_f", expect: 20 },
      { id: "Q2", m: 5, f: 20, scen: "find_a", expect: 4 },
      { id: "Q3", m: 8, a: 3, scen: "find_f", expect: 24 },
      { id: "Q4", m: 12, f: 36, scen: "find_a", expect: 3 },
      { id: "Q5", m: 15, a: 2, scen: "find_f", expect: 30 },
    ],
    CORE: [
      { id: "Q1", m: 10, f: 100, scen: "gravity", expect: 98 },
      { id: "Q2", m: 8, f: 80, scen: "gravity", expect: 78.4 },
      { id: "Q3", m: 12, f: 120, scen: "net_force", expect: 2.4 },
      { id: "Q4", m: 15, f: 150, scen: "gravity", expect: 147 },
      { id: "Q5", m: 20, f: 200, scen: "net_force", expect: 4 },
    ],
    ADVANCED: [
      { id: "Q1", m: 10, f: 50, mu: 0.2, scen: "friction", expect: 3.04 },
      { id: "Q2", m: 8, f: 40, mu: 0.3, scen: "friction", expect: 2.06 },
      { id: "Q3", m: 12, f: 60, mu: 0.25, scen: "pulley", expect: 2.05 },
      { id: "Q4", m: 15, f: 75, mu: 0.2, scen: "friction", expect: 3.04 },
      { id: "Q5", m: 20, f: 100, mu: 0.15, scen: "pulley", expect: 3.56 },
    ],
    ELITE: [
      { id: "Q1", m: 10, f: 50, scen: "variable_mass", expect: 5 },
      { id: "Q2", m: 8, f: 40, scen: "coupled", expect: 2.5 },
      { id: "Q3", m: 12, f: 60, scen: "variable_mass", expect: 5 },
      { id: "Q4", m: 15, f: 75, scen: "coupled", expect: 2.5 },
      { id: "Q5", m: 20, f: 100, scen: "variable_mass", expect: 5 },
      // Cross-disciplinary ELITE questions with vector force decomposition
      { id: "Q6", m: 14.8, f: 92, mu: 0.32, theta: 35, scen: "roche_tower_structural", expect: 3.15 },
      { id: "Q7", m: 22.6, f: 125, mu: 0.25, theta: 28, scen: "basel_port_crane", expect: 3.68 },
    ],
  },
  FRICTION: {
    BASIC: [
      { id: "Q1", m: 10, mu: 0.3, scen: "static", expect: 29.4 },
      { id: "Q2", m: 8, mu: 0.4, scen: "static", expect: 31.36 },
      { id: "Q3", m: 12, mu: 0.2, scen: "kinetic", expect: 23.52 },
      { id: "Q4", m: 15, mu: 0.5, scen: "static", expect: 73.5 },
      { id: "Q5", m: 20, mu: 0.3, scen: "kinetic", expect: 58.8 },
    ],
    CORE: [
      { id: "Q1", m: 10, mu: 0.3, scen: "max_static", expect: 29.4 },
      { id: "Q2", m: 8, mu: 0.4, scen: "kinetic_vs_static", expect: 31.36 },
      { id: "Q3", m: 12, mu: 0.2, scen: "max_static", expect: 23.52 },
      { id: "Q4", m: 15, mu: 0.5, scen: "kinetic_vs_static", expect: 73.5 },
      { id: "Q5", m: 20, mu: 0.3, scen: "max_static", expect: 58.8 },
    ],
    ADVANCED: [
      { id: "Q1", m: 10, mu: 0.3, theta: 30, scen: "slope_friction", expect: 25.48 },
      { id: "Q2", m: 8, mu: 0.4, theta: 30, scen: "slope_friction", expect: 27.18 },
      { id: "Q3", m: 12, mu: 0.2, theta: 30, scen: "slope_friction", expect: 20.38 },
      { id: "Q4", m: 15, mu: 0.5, theta: 30, scen: "slope_friction", expect: 63.72 },
      { id: "Q5", m: 20, mu: 0.3, theta: 30, scen: "slope_friction", expect: 50.96 },
    ],
    ELITE: [
      { id: "Q1", m: 10, mu: 0.3, f: 50, scen: "critical", expect: 20.6 },
      { id: "Q2", m: 8, mu: 0.4, f: 40, scen: "critical", expect: 8.64 },
      { id: "Q3", m: 12, mu: 0.2, f: 60, scen: "critical", expect: 36.48 },
      { id: "Q4", m: 15, mu: 0.5, f: 75, scen: "critical", expect: 1.5 },
      { id: "Q5", m: 20, mu: 0.3, f: 100, scen: "critical", expect: 41.2 },
      // Cross-disciplinary ELITE question with 3D vector friction analysis
      { id: "Q6", m: 16.4, mu: 0.38, f: 95, theta: 32, scen: "hospital_equipment_3d", expect: 28.76 },
    ],
  },
};

export default function SP302Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP302Quest[] => {
    const quests: SP302Quest[] = [];
    const dataList = QUEST_DATA[stage]?.[difficulty] || [];

    dataList.forEach((item, idx) => {
      const promptKey = `sp3_02.prompts.${item.scen}`;
      const hintKey = `sp3_02.hints.${item.scen}`;

      quests.push({
        id: `${stage}_${difficulty[0]}${idx + 1}`,
        difficulty,
        stage,
        mass: item.m,
        force: item.f,
        acceleration: item.a,
        frictionCoeff: item.mu,
        theta: item.theta,
        velocity: item.v,
        promptLatex: `\\\\text{${t(promptKey, {
          m: item.m,
          f: item.f ?? 0,
          mu: item.mu ?? 0,
          a: item.a ?? 0,
          v: item.v ?? 0,
          theta: item.theta ?? 0,
          f1: item.f ?? 0,
          f2: item.f ? item.f - 4 : 0,
          fr: item.mu ? (item.m * 9.8 * item.mu).toFixed(2) : 0,
          t: 5,
          g: 9.8
        })}}`,
        expressionLatex: stage === "NEWTON_1" ? `\\sum F = 0` :
          stage === "NEWTON_2" ? `F = ma` :
            `f = \\mu N`,
        targetLatex: `\\\\text{${item.expect.toFixed(2)}}`,
        slots: [{
          id: "ans",
          labelLatex: `\\\\text{${t("sp3_02.labels.force")}}`,
          placeholder: t("sp3_02.labels.input"),
          expected: item.expect.toFixed(2)
        }],
        correctLatex: `\\\\text{${item.expect.toFixed(2)}}`,
        hintLatex: [`\\\\text{${t(hintKey, { m: item.m, f: item.f ?? 0, mu: item.mu ?? 0 })}}`]
      });
    });

    return quests;
  }, [t]);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

  const {
    currentQuest,
    difficulty,
    stage,
    lastCheck,
    inputs,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    adaptiveRecommendation,
  } = useQuestManager<SP302Quest, Stage>({
    moduleCode: "sp3-02",
    buildPool,
    initialStage: "NEWTON_1",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp3-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "NEWTON_1" as Stage, label: t("sp3_02.stages.newton_1") },
    { id: "NEWTON_2" as Stage, label: t("sp3_02.stages.newton_2") },
    { id: "FRICTION" as Stage, label: t("sp3_02.stages.friction") },
  ], [t]);

  if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      title={t("sp3_02.title")}
      moduleCode="SP3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sp3_02.footer_left")}
      translations={{
        back: t("sp3_02.back"),
        check: t("sp3_02.check"),
        next: t("sp3_02.next"),
        correct: t("sp3_02.correct"),
        incorrect: t("sp3_02.incorrect"),
        difficulty: {
          basic: t("sp3_02.difficulty.basic"),
          core: t("sp3_02.difficulty.core"),
          advanced: t("sp3_02.difficulty.advanced"),
          elite: t("sp3_02.difficulty.elite"),
        },
        monitor_title: t("sp3_02.monitor_title"),
      }}
      monitorContent={
        <LawsCanvas
          scenario={stage === "NEWTON_1" ? "acceleration" : (stage === "FRICTION" ? "friction" : "acceleration")}
          mass={currentQuest?.mass || 1}
          friction={currentQuest?.frictionCoeff || 0}
          forceX={currentQuest?.force || 0}
        />
      }
    >
      <div className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
          <div className="text-lg">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </div>
          <div className="text-cyan-300">
            <InlineMath math={currentQuest?.expressionLatex || ""} />
          </div>
          <div className="space-y-3">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="flex items-center gap-3">
                <InlineMath math={slot.labelLatex} />
                <input
                  type="text"
                  value={inputs[slot.id] || ""}
                  onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
