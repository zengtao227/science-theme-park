"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import HydroCanvas from "@/components/chamber/sp1-03/HydroCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "POTENTIAL" | "KINETIC" | "POWER";

interface SP303Quest extends Quest {
  stage: Stage;
  mass?: number;
  height?: number;
  velocity?: number;
  force?: number;
  distance?: number;
  time?: number;
  power?: number;
}

// 数据类型定义
type SP303QuestData = {
  id: string;
  m?: number;      // 质量 (kg)
  h?: number;      // 高度 (m)
  v?: number;      // 速度 (m/s)
  f?: number;      // 力 (N)
  d?: number;      // 距离 (m)
  t?: number;      // 时间 (s)
  p?: number;      // 功率 (W)
  scen: string;    // 场景描述键
  expect: number;  // 预期答案
};

// 静态数据表 - 60题完整数据
const QUEST_DATA: Record<Stage, Record<Difficulty, SP303QuestData[]>> = {
  POTENTIAL: {
    BASIC: [
      { id: "Q1", m: 2, h: 10, scen: "basic_ep", expect: 196 },
      { id: "Q2", m: 5, h: 8, scen: "basic_ep", expect: 392 },
      { id: "Q3", m: 3, h: 15, scen: "basic_ep", expect: 441 },
      { id: "Q4", m: 10, h: 5, scen: "basic_ep", expect: 490 },
      { id: "Q5", m: 4, h: 12, scen: "basic_ep", expect: 470.4 },
    ],
    CORE: [
      { id: "Q1", m: 8, h: 20, scen: "rhine_hydro", expect: 1568 },
      { id: "Q2", m: 12, h: 15, scen: "rhine_hydro", expect: 1764 },
      { id: "Q3", m: 6, h: 25, scen: "rhine_hydro", expect: 1470 },
      { id: "Q4", m: 15, h: 10, scen: "rhine_hydro", expect: 1470 },
      { id: "Q5", m: 10, h: 18, scen: "rhine_hydro", expect: 1764 },
    ],
    ADVANCED: [
      { id: "Q1", m: 5, h: 30, v: 10, scen: "total_energy", expect: 1720 },
      { id: "Q2", m: 8, h: 20, v: 8, scen: "total_energy", expect: 1824 },
      { id: "Q3", m: 10, h: 15, v: 12, scen: "total_energy", expect: 2190 },
      { id: "Q4", m: 6, h: 25, v: 15, scen: "total_energy", expect: 2145 },
      { id: "Q5", m: 12, h: 10, v: 10, scen: "total_energy", expect: 1776 },
    ],
    ELITE: [
      { id: "Q1", m: 10, h: 50, v: 20, scen: "conservation", expect: 6900 },
      { id: "Q2", m: 15, h: 40, v: 15, scen: "conservation", expect: 7567.5 },
      { id: "Q3", m: 8, h: 60, v: 25, scen: "conservation", expect: 7208 },
      { id: "Q4", m: 20, h: 30, v: 18, scen: "conservation", expect: 9120 },
      { id: "Q5", m: 12, h: 45, v: 22, scen: "conservation", expect: 8190 },
    ],
  },
  KINETIC: {
    BASIC: [
      { id: "Q1", m: 4, v: 5, scen: "basic_ek", expect: 50 },
      { id: "Q2", m: 6, v: 8, scen: "basic_ek", expect: 192 },
      { id: "Q3", m: 2, v: 10, scen: "basic_ek", expect: 100 },
      { id: "Q4", m: 8, v: 6, scen: "basic_ek", expect: 144 },
      { id: "Q5", m: 5, v: 12, scen: "basic_ek", expect: 360 },
    ],
    CORE: [
      { id: "Q1", m: 10, v: 15, scen: "tram_braking", expect: 1125 },
      { id: "Q2", m: 12, v: 20, scen: "tram_braking", expect: 2400 },
      { id: "Q3", m: 8, v: 18, scen: "tram_braking", expect: 1296 },
      { id: "Q4", m: 15, v: 12, scen: "tram_braking", expect: 1080 },
      { id: "Q5", m: 20, v: 10, scen: "tram_braking", expect: 1000 },
    ],
    ADVANCED: [
      { id: "Q1", m: 5, v: 20, h: 10, scen: "velocity_at_bottom", expect: 22.14 },
      { id: "Q2", m: 8, v: 15, h: 15, scen: "velocity_at_bottom", expect: 21.21 },
      { id: "Q3", m: 10, v: 18, h: 12, scen: "velocity_at_bottom", expect: 22.76 },
      { id: "Q4", m: 6, v: 25, h: 20, scen: "velocity_at_bottom", expect: 29.83 },
      { id: "Q5", m: 12, v: 12, h: 18, scen: "velocity_at_bottom", expect: 21.63 },
    ],
    ELITE: [
      { id: "Q1", m: 10, v: 30, f: 50, d: 100, scen: "work_energy", expect: 9500 },
      { id: "Q2", m: 15, v: 25, f: 60, d: 80, scen: "work_energy", expect: 9487.5 },
      { id: "Q3", m: 8, v: 35, f: 40, d: 120, scen: "work_energy", expect: 9700 },
      { id: "Q4", m: 20, v: 20, f: 70, d: 90, scen: "work_energy", expect: 10300 },
      { id: "Q5", m: 12, v: 28, f: 55, d: 110, scen: "work_energy", expect: 10758 },
    ],
  },
  POWER: {
    BASIC: [
      { id: "Q1", f: 100, d: 5, scen: "basic_work", expect: 500 },
      { id: "Q2", f: 150, d: 8, scen: "basic_work", expect: 1200 },
      { id: "Q3", f: 80, d: 10, scen: "basic_work", expect: 800 },
      { id: "Q4", f: 200, d: 6, scen: "basic_work", expect: 1200 },
      { id: "Q5", f: 120, d: 12, scen: "basic_work", expect: 1440 },
    ],
    CORE: [
      { id: "Q1", f: 500, d: 20, t: 10, scen: "basic_power", expect: 1000 },
      { id: "Q2", f: 600, d: 15, t: 12, scen: "basic_power", expect: 750 },
      { id: "Q3", f: 400, d: 25, t: 8, scen: "basic_power", expect: 1250 },
      { id: "Q4", f: 800, d: 10, t: 5, scen: "basic_power", expect: 1600 },
      { id: "Q5", f: 300, d: 30, t: 15, scen: "basic_power", expect: 600 },
    ],
    ADVANCED: [
      { id: "Q1", m: 10, h: 20, t: 5, scen: "power_lifting", expect: 392 },
      { id: "Q2", m: 15, h: 15, t: 8, scen: "power_lifting", expect: 275.63 },
      { id: "Q3", m: 8, h: 25, t: 6, scen: "power_lifting", expect: 326.67 },
      { id: "Q4", m: 20, h: 12, t: 10, scen: "power_lifting", expect: 235.2 },
      { id: "Q5", m: 12, h: 18, t: 7, scen: "power_lifting", expect: 302.4 },
    ],
    ELITE: [
      { id: "Q1", m: 50, h: 30, t: 10, scen: "rhine_power_station", expect: 1470 },
      { id: "Q2", m: 60, h: 25, t: 12, scen: "rhine_power_station", expect: 1225 },
      { id: "Q3", m: 40, h: 35, t: 8, scen: "rhine_power_station", expect: 1715 },
      { id: "Q4", m: 80, h: 20, t: 15, scen: "rhine_power_station", expect: 1045.33 },
      { id: "Q5", m: 70, h: 28, t: 14, scen: "rhine_power_station", expect: 1372 },
    ],
  },
};

export default function SP303Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP303Quest[] => {
    const quests: SP303Quest[] = [];
    const dataList = QUEST_DATA[stage]?.[difficulty] || [];

    dataList.forEach((item, idx) => {
      const promptKey = `sp3_03.prompts.${item.scen}`;
      const hintKey = `sp3_03.hints.${item.scen}`;

      quests.push({
        id: `${stage}_${difficulty[0]}${idx + 1}`,
        difficulty,
        stage,
        mass: item.m,
        height: item.h,
        velocity: item.v,
        force: item.f,
        distance: item.d,
        time: item.t,
        power: item.p,
        promptLatex: t(promptKey, {
          m: item.m ?? 0,
          h: item.h ?? 0,
          v: item.v ?? 0,
          f: item.f ?? 0,
          d: item.d ?? 0,
          t: item.t ?? 0,
          g: 9.8
        }),
        expressionLatex: stage === "POTENTIAL" ? `E_p = mgh` :
          stage === "KINETIC" ? `E_k = \\frac{1}{2}mv^2` :
            `W = Fs, P = \\frac{W}{t}`,
        targetLatex: item.expect.toFixed(2),
        slots: [{
          id: "ans",
          labelLatex: stage === "POTENTIAL" ? `E_p \\text{ (J)}` :
            stage === "KINETIC" ? `E_k \\text{ (J)}` :
              `P \\text{ (W)}`,
          placeholder: "...",
          expected: item.expect.toFixed(2)
        }],
        correctLatex: `${item.expect.toFixed(2)}`,
        hintLatex: [t(hintKey, { m: item.m ?? 0, h: item.h ?? 0, v: item.v ?? 0 })]
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
  } = useQuestManager<SP303Quest, Stage>({
    buildPool,
    initialStage: "POTENTIAL",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp3-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "POTENTIAL" as Stage, label: t("sp3_03.stages.potential") },
    { id: "KINETIC" as Stage, label: t("sp3_03.stages.kinetic") },
    { id: "POWER" as Stage, label: t("sp3_03.stages.work") },
  ], [t]);

  if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

  return (
    <ChamberLayout
      title={t("sp3_03.title")}
      moduleCode="SP3.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sp3_03.footer_left")}
      translations={{
        back: t("sp3_03.back"),
        check: t("sp3_03.check"),
        next: t("sp3_03.next"),
        correct: t("sp3_03.correct"),
        incorrect: t("sp3_03.incorrect"),
        difficulty: t("sp3_03.difficulty"),
      }}
      monitorContent={<HydroCanvas stage={stage} />}
    >
      <div className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
          <div className="text-lg">
            <InlineMath math={currentQuest.promptLatex} />
          </div>
          <div className="text-cyan-300">
            <InlineMath math={currentQuest.expressionLatex} />
          </div>
          <div className="space-y-3">
            {currentQuest.slots.map((slot) => (
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
