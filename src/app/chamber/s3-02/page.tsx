"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TrigonometryCanvas from "@/components/chamber/math/TrigonometryCanvas";

type Stage = "UNIT_CIRCLE" | "WAVE_FUNCTIONS" | "TRIANGLE_SOLVER";
type S302T = typeof translations.EN.s3_02;

interface S302Quest extends Quest {
  stage: Stage;
  angle: number; // in degrees
  mode: "circle" | "triangle" | "waves";
}

function buildStagePool(t: S302T, difficulty: Difficulty, stage: Stage): S302Quest[] {
  if (stage === "UNIT_CIRCLE") {
    const angles = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
    const all = angles.map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const sin = Math.round(Math.sin(rad) * 1000) / 1000;
      const cos = Math.round(Math.cos(rad) * 1000) / 1000;
      const tan = Math.abs(Math.cos(rad)) > 0.01 ? Math.round(Math.tan(rad) * 1000) / 1000 : null;
      
      return {
        id: `U${i + 1}`,
        difficulty,
        stage,
        angle,
        mode: "circle" as const,
        promptLatex: t.stages.unit_circle_prompt_latex,
        expressionLatex: `\\theta=${angle}^\\circ`,
        targetLatex: "\\sin\\theta,\\cos\\theta,\\tan\\theta",
        slots: [
          { id: "sin", labelLatex: "\\sin\\theta", placeholder: "sin", expected: sin },
          { id: "cos", labelLatex: "\\cos\\theta", placeholder: "cos", expected: cos },
          ...(tan !== null ? [{ id: "tan", labelLatex: "\\tan\\theta", placeholder: "tan", expected: tan }] : []),
        ],
        correctLatex: tan !== null 
          ? `\\sin=${sin},\\cos=${cos},\\tan=${tan}`
          : `\\sin=${sin},\\cos=${cos},\\tan=\\text{undefined}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 5);
    if (difficulty === "CORE") return all.slice(0, 10);
    return all;
  }

  if (stage === "WAVE_FUNCTIONS") {
    const angles = [0, 30, 45, 60, 90, 120, 135, 150, 180];
    const all = angles.map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const sin = Math.round(Math.sin(rad) * 1000) / 1000;
      const cos = Math.round(Math.cos(rad) * 1000) / 1000;
      
      return {
        id: `W${i + 1}`,
        difficulty,
        stage,
        angle,
        mode: "waves" as const,
        promptLatex: t.stages.wave_functions_prompt_latex,
        expressionLatex: `\\theta=${angle}^\\circ`,
        targetLatex: "\\sin\\theta,\\cos\\theta",
        slots: [
          { id: "sin", labelLatex: "\\sin\\theta", placeholder: "sin", expected: sin },
          { id: "cos", labelLatex: "\\cos\\theta", placeholder: "cos", expected: cos },
        ],
        correctLatex: `\\sin=${sin},\\cos=${cos}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    if (difficulty === "CORE") return all.slice(0, 7);
    return all;
  }

  // TRIANGLE_SOLVER
  const triangles = [
    { angle: 30, hyp: 2 },
    { angle: 45, hyp: 2 },
    { angle: 60, hyp: 2 },
    { angle: 37, hyp: 5 },
    { angle: 53, hyp: 5 },
    { angle: 25, hyp: 10 },
    { angle: 70, hyp: 8 },
  ];
  const all = triangles.map((item, i) => {
    const rad = (item.angle * Math.PI) / 180;
    const opp = Math.round(Math.sin(rad) * item.hyp * 100) / 100;
    const adj = Math.round(Math.cos(rad) * item.hyp * 100) / 100;
    
    return {
      id: `T${i + 1}`,
      difficulty,
      stage,
      angle: item.angle,
      mode: "triangle" as const,
      promptLatex: t.stages.triangle_solver_prompt_latex,
      expressionLatex: `\\theta=${item.angle}^\\circ,\\; \\text{hyp}=${item.hyp}`,
      targetLatex: "\\text{opp},\\text{adj}",
      slots: [
        { id: "opp", labelLatex: "\\text{opposite}", placeholder: "opp", expected: opp },
        { id: "adj", labelLatex: "\\text{adjacent}", placeholder: "adj", expected: adj },
      ],
      correctLatex: `\\text{opp}=${opp},\\text{adj}=${adj}`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 3);
  if (difficulty === "CORE") return all.slice(0, 5);
  return all;
}

export default function S302Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].s3_02;

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
  } = useQuestManager<S302Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "UNIT_CIRCLE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("s3-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="S3.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "UNIT_CIRCLE", label: t.stages.unit_circle },
        { id: "WAVE_FUNCTIONS", label: t.stages.wave_functions },
        { id: "TRIANGLE_SOLVER", label: t.stages.triangle_solver },
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
          <TrigonometryCanvas 
            angle={currentQuest?.angle || 45} 
            mode={currentQuest?.mode || "circle"}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
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
                  placeholder={slot.placeholder}
                />
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/40 font-mono italic text-center">
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat auf 2-3 Dezimalstellen gerundet an."
              : currentLanguage === 'CN'
                ? "提示：保留 2-3 位小数。"
                : "Tip: Enter result rounded to 2-3 decimal places."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
