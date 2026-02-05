"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useCallback, useEffect, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import VectorPilotHud from "@/components/chamber/g2-01/VectorPilotHud";

type Stage = "NAVIGATION" | "DOT_PRODUCT" | "MISSION";
type G201T = typeof translations.EN.g2_01;

interface G201Quest extends Quest {
  stage: Stage;
  from: [number, number, number];
  to: [number, number, number];
  wind?: [number, number, number];
  corridor?: [number, number, number];
}

const navigationData: Array<{ id: string; from: [number, number, number]; to: [number, number, number] }> = [
  { id: "N1", from: [0, 0, 0], to: [3, 4, 0] },
  { id: "N2", from: [1, 2, 1], to: [4, 2, 5] },
  { id: "N3", from: [-1, -1, 1], to: [1, 2, 7] },
  { id: "N4", from: [2, -1, 3], to: [2, 4, 3] },
  { id: "N5", from: [-2, 1, 2], to: [4, 9, 2] },
  { id: "N6", from: [0, -2, 5], to: [0, 1, 9] },
  { id: "N7", from: [2, 0, -1], to: [3, 2, 1] },
];

const dotData: Array<{ id: string; from: [number, number, number]; to: [number, number, number]; wind: [number, number, number] }> = [
  { id: "D1", from: [0, 0, 0], to: [3, 4, 0], wind: [2, -1, 1] },
  { id: "D2", from: [1, 2, 1], to: [4, 2, 5], wind: [-1, 2, 2] },
  { id: "D3", from: [-1, -1, 1], to: [1, 2, 7], wind: [1, 0, -1] },
  { id: "D4", from: [2, -1, 3], to: [2, 4, 3], wind: [0, 2, 3] },
  { id: "D5", from: [-2, 1, 2], to: [4, 9, 2], wind: [1, 1, 0] },
  { id: "D6", from: [0, -2, 5], to: [0, 1, 9], wind: [-2, 1, 2] },
  { id: "D7", from: [2, 0, -1], to: [3, 2, 1], wind: [3, 0, -1] },
];

const missionData: Array<{ id: string; from: [number, number, number]; to: [number, number, number]; corridor: [number, number, number] }> = [
  { id: "M1", from: [0, 0, 2], to: [4, 3, 2], corridor: [1, 1, 0] },
  { id: "M2", from: [-1, 2, 0], to: [1, 4, 1], corridor: [2, -1, 1] },
  { id: "M3", from: [3, -2, 1], to: [8, -2, 13], corridor: [1, 0, -1] },
  { id: "M4", from: [0, 1, -1], to: [0, 5, 2], corridor: [0, 2, 1] },
  { id: "M5", from: [-2, -1, 4], to: [4, 1, 7], corridor: [1, -1, 2] },
  { id: "M6", from: [2, 2, 0], to: [11, 2, 12], corridor: [-1, 0, 1] },
  { id: "M7", from: [-4, 3, 2], to: [4, 9, 2], corridor: [0, 1, 1] },
];

const vectorFromPoints = (from: [number, number, number], to: [number, number, number]) => [
  to[0] - from[0],
  to[1] - from[1],
  to[2] - from[2],
] as [number, number, number];

const magnitude = (v: [number, number, number]) => Number(Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2).toFixed(2));

const dot = (a: [number, number, number], b: [number, number, number]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function buildStagePool(t: G201T, difficulty: Difficulty, stage: Stage): G201Quest[] {
  if (stage === "NAVIGATION") {
    const all = navigationData.map((item) => {
      const v = vectorFromPoints(item.from, item.to);
      const mag = magnitude(v);
      return {
        id: item.id,
        difficulty,
        stage,
        from: item.from,
        to: item.to,
        promptLatex: t.stages.navigation_prompt_latex,
        expressionLatex: `A(${item.from.join(",")}),\\; B(${item.to.join(",")})`,
        targetLatex: `\\vec v,\\; |\\vec v|`,
        slots: [
          { id: "vx", labelLatex: "v_x", placeholder: "x", expected: v[0] },
          { id: "vy", labelLatex: "v_y", placeholder: "y", expected: v[1] },
          { id: "vz", labelLatex: "v_z", placeholder: "z", expected: v[2] },
          { id: "mag", labelLatex: "|\\vec v|", placeholder: "|v|", expected: mag },
        ],
        correctLatex: `\\vec v=[${v.join(",")}],\\; |\\vec v|=${mag}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "DOT_PRODUCT") {
    const all = dotData.map((item) => {
      const v = vectorFromPoints(item.from, item.to);
      const d = dot(v, item.wind as [number, number, number]);
      return {
        id: item.id,
        difficulty,
        stage,
        from: item.from,
        to: item.to,
        wind: item.wind,
        promptLatex: t.stages.dot_prompt_latex,
        expressionLatex: `A(${item.from.join(",")}),\\; B(${item.to.join(",")}),\\; \\vec w=[${(item.wind || []).join(",")}]`,
        targetLatex: `\\vec v,\\; \\vec v\\cdot\\vec w`,
        slots: [
          { id: "vx", labelLatex: "v_x", placeholder: "x", expected: v[0] },
          { id: "vy", labelLatex: "v_y", placeholder: "y", expected: v[1] },
          { id: "vz", labelLatex: "v_z", placeholder: "z", expected: v[2] },
          { id: "dot", labelLatex: "\\vec v\\cdot\\vec w", placeholder: "dot", expected: d },
        ],
        correctLatex: `\\vec v=[${v.join(",")}],\\; \\vec v\\cdot\\vec w=${d}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  const missionPrompt = `\\text{${t.mission.title}}\\\\\\text{${t.mission.description}}`;
  const all = missionData.map((item) => {
    const v = vectorFromPoints(item.from, item.to);
    const mag = magnitude(v);
    const d = dot(v, item.corridor as [number, number, number]);
    return {
      id: item.id,
      difficulty,
      stage,
      from: item.from,
      to: item.to,
      corridor: item.corridor,
      promptLatex: missionPrompt,
      expressionLatex: `A(${item.from.join(",")}),\\; B(${item.to.join(",")}),\\; \\vec s=[${(item.corridor || []).join(",")}]`,
      targetLatex: `\\vec v\\cdot\\vec s,\\; |\\vec v|`,
      slots: [
        { id: "vx", labelLatex: "v_x", placeholder: "x", expected: v[0] },
        { id: "vy", labelLatex: "v_y", placeholder: "y", expected: v[1] },
        { id: "vz", labelLatex: "v_z", placeholder: "z", expected: v[2] },
        { id: "dot", labelLatex: "\\vec v\\cdot\\vec s", placeholder: "dot", expected: d },
        { id: "mag", labelLatex: "|\\vec v|", placeholder: "|v|", expected: mag },
      ],
      correctLatex: `\\vec v=[${v.join(",")}],\\; \\vec v\\cdot\\vec s=${d},\\; |\\vec v|=${mag}`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
}

export default function G201Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].g2_01;

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
    locale,
  } = useQuestManager<G201Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "NAVIGATION",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("g2-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const parseNumber = useCallback((s: string) => {
    const raw = s.trim();
    if (!raw) return null;
    const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
    const v = Number(normalized);
    return Number.isFinite(v) ? v : null;
  }, [locale]);

  const inputVector = useMemo(() => {
    const x = parseNumber(inputs.vx || "");
    const y = parseNumber(inputs.vy || "");
    const z = parseNumber(inputs.vz || "");
    if (x === null || y === null || z === null) return null;
    return [x, y, z] as [number, number, number];
  }, [inputs, parseNumber]);

  const baseVector = useMemo(() => {
    if (!currentQuest) return [0, 0, 0] as [number, number, number];
    return vectorFromPoints(currentQuest.from, currentQuest.to);
  }, [currentQuest]);

  const displayVector = inputVector || baseVector;
  const assistVector = currentQuest?.wind || currentQuest?.corridor;

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="G2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "NAVIGATION", label: t.stages.navigation },
        { id: "DOT_PRODUCT", label: t.stages.dot },
        { id: "MISSION", label: t.stages.mission },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <VectorPilotHud
            stage={stage}
            from={currentQuest?.from ?? [0, 0, 0]}
            to={currentQuest?.to ?? [0, 0, 0]}
            vector={displayVector}
            assistVector={assistVector}
          />
          <div className="text-white/60 text-xs font-mono">
            <InlineMath math={currentQuest?.expressionLatex || ""} />
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.objective_title}</h3>
          <p className="text-2xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <input
                  value={inputs[slot.id] ?? ""}
                  onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                  className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
