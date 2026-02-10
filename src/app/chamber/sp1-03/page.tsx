"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import HydroCanvas from "@/components/chamber/sp1-03/HydroCanvas";

type Stage = "POTENTIAL" | "KINETIC" | "POWER";
type P103T = typeof translations.EN.sp1_03;

interface P103Quest extends Quest {
  stage: Stage;
  mass?: number;
  height?: number;
  velocity?: number;
  time?: number;
  efficiency?: number;
  work?: number;
}

const g = 9.81;
const round1 = (v: number) => Math.round(v * 10) / 10;

const potentialData = [
  { id: "P1", mass: 500, height: 12 },
  { id: "P2", mass: 1200, height: 6 },
  { id: "P3", mass: 250, height: 20 },
  { id: "P4", mass: 800, height: 4.5 },
  { id: "P5", mass: 1500, height: 3 },
  { id: "P6", mass: 60, height: 50 },
  { id: "P7", mass: 2000, height: 2.5 },
];

const kineticData = [
  { id: "K1", mass: 1200, velocity: 6 },
  { id: "K2", mass: 500, velocity: 10 },
  { id: "K3", mass: 300, velocity: 14 },
  { id: "K4", mass: 1500, velocity: 4 },
  { id: "K5", mass: 800, velocity: 9 },
  { id: "K6", mass: 200, velocity: 15 },
  { id: "K7", mass: 1000, velocity: 7 },
];

const powerData = [
  { id: "W1", mass: 5000, height: 8, time: 20 },
  { id: "W2", mass: 12000, height: 5, time: 30 },
  { id: "W3", work: 360000, time: 15, efficiency: 0.9 },
  { id: "W4", work: 50000, time: 8 },
  { id: "W5", mass: 8000, height: 6, time: 25, efficiency: 0.85 },
  { id: "W6", work: 1200000, time: 40 },
  { id: "W7", mass: 6000, height: 10, time: 18, efficiency: 0.9 },
];

function buildStagePool(t: P103T, difficulty: Difficulty, stage: Stage): P103Quest[] {
  if (stage === "POTENTIAL") {
    const all = potentialData.map((item) => {
      const energy = round1(item.mass * g * item.height);
      return {
        id: item.id,
        difficulty,
        stage,
        mass: item.mass,
        height: item.height,
        promptLatex: t.stages.potential_prompt_latex,
        expressionLatex: `m=${item.mass}\\;kg,\\; h=${item.height}\\;m,\\; g=9.81\\;m/s^2`,
        targetLatex: "E_p",
        slots: [{ id: "Ep", labelLatex: "E_p", placeholder: "potential energy", expected: energy, unit: "J" }],
        correctLatex: `E_p=${energy}\\;J`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "KINETIC") {
    const all = kineticData.map((item) => {
      const energy = round1(0.5 * item.mass * item.velocity ** 2);
      return {
        id: item.id,
        difficulty,
        stage,
        mass: item.mass,
        velocity: item.velocity,
        promptLatex: t.stages.kinetic_prompt_latex,
        expressionLatex: `m=${item.mass}\\;kg,\\; v=${item.velocity}\\;m/s`,
        targetLatex: "E_k",
        slots: [{ id: "Ek", labelLatex: "E_k", placeholder: "kinetic energy", expected: energy, unit: "J" }],
        correctLatex: `E_k=${energy}\\;J`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  const all = powerData.map((item) => {
    const work = item.work ?? item.mass * g * item.height;
    const rawPower = work / item.time;
    const power = round1(item.efficiency ? rawPower * item.efficiency : rawPower);
    const efficiencyText = item.efficiency ? `,\\; \\eta=${item.efficiency}` : "";
    const expression = item.work
      ? `W=${item.work}\\;J,\\; t=${item.time}\\;s${efficiencyText}`
      : `m=${item.mass}\\;kg,\\; h=${item.height}\\;m,\\; t=${item.time}\\;s${efficiencyText}`;
    return {
      id: item.id,
      difficulty,
      stage,
      mass: item.mass,
      height: item.height,
      time: item.time,
      efficiency: item.efficiency,
      work,
      promptLatex: t.stages.power_prompt_latex,
      expressionLatex: expression,
      targetLatex: "P",
      slots: [{ id: "P", labelLatex: "P", placeholder: "power", expected: power, unit: "W" }],
      correctLatex: `P=${power}\\;W`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
}

export default function P103Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sp1_03;

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
  } = useQuestManager<P103Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "POTENTIAL",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sp1-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SP1.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "POTENTIAL", label: t.stages.potential },
        { id: "KINETIC", label: t.stages.kinetic },
        { id: "POWER", label: t.stages.power },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
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
          <HydroCanvas
            stage={stage}
            mass={currentQuest?.mass}
            height={currentQuest?.height}
            velocity={currentQuest?.velocity}
            time={currentQuest?.time}
            efficiency={currentQuest?.efficiency}
            readoutLabel={currentQuest?.targetLatex}
            readoutValue={currentQuest?.slots?.[0]?.expected as number | undefined}
            readoutUnit={currentQuest?.slots?.[0]?.unit}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{t.labels.formula}</div>
            <div className="text-white font-black text-lg">
              <InlineMath math={t.formulas[stage.toLowerCase() as keyof typeof t.formulas]} />
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
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic whitespace-normal break-words">
            {(() => {
              const latex = currentQuest?.promptLatex || "";
              if (latex.includes("\\text{")) {
                return <span className="font-sans not-italic whitespace-pre-wrap">{latex.replace(/\\text\{/g, "").replace(/\}/g, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ")}</span>;
              }
              return <InlineMath math={latex} />;
            })()}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
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
          <div className="text-[10px] text-white/40 font-mono italic text-center">
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat als Bruch (z.B. 4/3) oder auf 1 Dezimalstelle gerundet an."
              : currentLanguage === 'CN'
                ? "提示：输入分数 (如 4/3) 或保留 1 位小数。"
                : "Tip: Enter result as a fraction (e.g. 4/3) or rounded to 1 decimal place."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
