"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GrowthCanvas from "@/components/chamber/sm3-03/GrowthCanvas";

type Stage = "EXPONENTIAL" | "LOGARITHM" | "APPLICATIONS";
type S303T = typeof translations.EN.sm3_03;

interface S303Quest extends Quest {
  stage: Stage;
  initialCount: number;
  doublingTime: number;
  time?: number;
  finalCount?: number;
}

const round1 = (v: number) => Math.round(v * 10) / 10;
const round0 = (v: number) => Math.round(v);

const exponentialData = [
  { id: "E1", initialCount: 100, doublingTime: 2, time: 4 },
  { id: "E2", initialCount: 50, doublingTime: 3, time: 6 },
  { id: "E3", initialCount: 200, doublingTime: 1.5, time: 3 },
  { id: "E4", initialCount: 10, doublingTime: 4, time: 8 },
  { id: "E5", initialCount: 500, doublingTime: 2.5, time: 5 },
  { id: "E6", initialCount: 25, doublingTime: 1, time: 5 },
  { id: "E7", initialCount: 150, doublingTime: 3.5, time: 7 },
];

const logarithmData = [
  { id: "L1", initialCount: 100, doublingTime: 2, finalCount: 400 },
  { id: "L2", initialCount: 50, doublingTime: 3, finalCount: 800 },
  { id: "L3", initialCount: 200, doublingTime: 1.5, finalCount: 1600 },
  { id: "L4", initialCount: 10, doublingTime: 4, finalCount: 160 },
  { id: "L5", initialCount: 500, doublingTime: 2.5, finalCount: 2000 },
  { id: "L6", initialCount: 25, doublingTime: 1, finalCount: 800 },
  { id: "L7", initialCount: 150, doublingTime: 3.5, finalCount: 1200 },
];

const applicationsData = [
  { id: "A1", initialCount: 1000, doublingTime: 20, time: 60 },
  { id: "A2", initialCount: 5000, doublingTime: 30, time: 90 },
  { id: "A3", initialCount: 250, doublingTime: 15, time: 45 },
  { id: "A4", initialCount: 10000, doublingTime: 25, time: 50 },
];

function buildStagePool(t: S303T, difficulty: Difficulty, stage: Stage): S303Quest[] {
  if (stage === "EXPONENTIAL") {
    const all = exponentialData.map((item) => {
      const N = round0(item.initialCount * Math.pow(2, item.time / item.doublingTime));
      return {
        id: item.id,
        difficulty,
        stage,
        initialCount: item.initialCount,
        doublingTime: item.doublingTime,
        time: item.time,
        promptLatex: t.stages.exponential_prompt_latex,
        expressionLatex: `N_0=${item.initialCount},\\; d=${item.doublingTime}\\;h,\\; t=${item.time}\\;h`,
        targetLatex: "N(t)",
        slots: [{ id: "N", labelLatex: "N(t)", placeholder: "population", expected: N }],
        correctLatex: `N(${item.time})=${N}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "LOGARITHM") {
    const all = logarithmData.map((item) => {
      const calculatedTime = round1(item.doublingTime * Math.log2(item.finalCount / item.initialCount));
      return {
        id: item.id,
        difficulty,
        stage,
        initialCount: item.initialCount,
        doublingTime: item.doublingTime,
        finalCount: item.finalCount,
        promptLatex: t.stages.logarithm_prompt_latex,
        expressionLatex: `N_0=${item.initialCount},\\; N=${item.finalCount},\\; d=${item.doublingTime}\\;h`,
        targetLatex: "t",
        slots: [{ id: "t", labelLatex: "t", placeholder: "time", expected: calculatedTime, unit: "h" }],
        correctLatex: `t=${calculatedTime}\\;h`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // APPLICATIONS
  const all = applicationsData.map((item) => {
    const N = round0(item.initialCount * Math.pow(2, item.time / item.doublingTime));
    return {
      id: item.id,
      difficulty,
      stage,
      initialCount: item.initialCount,
      doublingTime: item.doublingTime,
      time: item.time,
      promptLatex: t.stages.applications_prompt_latex,
      expressionLatex: `N_0=${item.initialCount},\\; d=${item.doublingTime}\\;min,\\; t=${item.time}\\;min`,
      targetLatex: "N(t)",
      slots: [{ id: "N", labelLatex: "N(t)", placeholder: "population", expected: N }],
      correctLatex: `N(${item.time})=${N}`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 3);
  return all;
}

export default function S303Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sm3_03;

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
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "EXPONENTIAL",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm3-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM3.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "EXPONENTIAL", label: t.stages.exponential },
        { id: "LOGARITHM", label: t.stages.logarithm },
        { id: "APPLICATIONS", label: t.stages.applications },
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
          <GrowthCanvas
            doublingTime={currentQuest?.doublingTime || 2}
            initialCount={currentQuest?.initialCount || 10}
            currentTime={currentQuest?.time || 0}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{t.labels.hints}</div>
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
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
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
              ? "Tipp: Gib das Resultat als Ganzzahl oder auf 1 Dezimalstelle gerundet an."
              : currentLanguage === 'CN'
                ? "提示：输入整数或保留 1 位小数。"
                : "Tip: Enter result as integer or rounded to 1 decimal place."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
