"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TunnellingCanvas from "@/components/chamber/gp1-04/TunnellingCanvas";
import { calculateTransmissionCoefficient } from "@/lib/physics";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";

type Stage = "classical" | "tunneling" | "resonance";
type TunnelQuest = Quest & { stage: Stage };

export default function P104Page() {
  const { t } = useLanguage();
  const { completeStage } = useAppStore();
  const gp1_04_prompts = useMemo(() => ({
    cl_transmission_basic: t("gp1_04.prompts.cl_transmission_basic"),
    cl_reflection_core: t("gp1_04.prompts.cl_reflection_core"),
    cl_wave_number_advanced: t("gp1_04.prompts.cl_wave_number_advanced"),
    cl_de_broglie_elite: t("gp1_04.prompts.cl_de_broglie_elite"),
    tu_transmission_basic: t("gp1_04.prompts.tu_transmission_basic"),
    tu_kappa_core: t("gp1_04.prompts.tu_kappa_core"),
    tu_transmission_advanced: t("gp1_04.prompts.tu_transmission_advanced"),
    tu_barrier_width_elite: t("gp1_04.prompts.tu_barrier_width_elite"),
    re_mode_basic: t("gp1_04.prompts.re_mode_basic"),
    re_energy_level_core: t("gp1_04.prompts.re_energy_level_core"),
    re_delta_energy_advanced: t("gp1_04.prompts.re_delta_energy_advanced"),
    re_frequency_elite: t("gp1_04.prompts.re_frequency_elite"),
  }), [t]);

  const gp1_04_t = {
    title: t("gp1_04.title"),
    back: t("gp1_04.back"),
    check: t("gp1_04.check"),
    next: t("gp1_04.next"),
    correct: t("gp1_04.correct"),
    incorrect: t("gp1_04.incorrect"),
    monitor_title: t("gp1_04.monitor_title"),
    objective_title: t("gp1_04.objective_title"),
    target_title: t("gp1_04.target_title"),
    difficulty: {
      basic: t("gp1_04.difficulty.basic"),
      core: t("gp1_04.difficulty.core"),
      advanced: t("gp1_04.difficulty.advanced"),
      elite: t("gp1_04.difficulty.elite"),
    },
    stages: {
      classical: t("gp1_04.stages.classical"),
      tunneling: t("gp1_04.stages.tunneling"),
      resonance: t("gp1_04.stages.resonance"),
      classical_desc: t("gp1_04.stages.classical_desc"),
      tunneling_desc: t("gp1_04.stages.tunneling_desc"),
      resonance_desc: t("gp1_04.stages.resonance_desc"),
      classical_hint: t("gp1_04.stages.classical_hint"),
      tunneling_hint: t("gp1_04.stages.tunneling_hint"),
      resonance_hint: t("gp1_04.stages.resonance_hint"),
    },
    labels: {
      transmission: t("gp1_04.labels.transmission"),
      wave_function: t("gp1_04.labels.wave_function"),
      incident: t("gp1_04.labels.incident"),
      reflected: t("gp1_04.labels.reflected"),
      transmitted: t("gp1_04.labels.transmitted"),
      formulas: t("gp1_04.labels.formulas"),
      particle_energy: t("gp1_04.labels.particle_energy"),
      barrier_height: t("gp1_04.labels.barrier_height"),
      barrier_width: t("gp1_04.labels.barrier_width"),
    },
    mission: {
      title: t("gp1_04.mission.title"),
      description: t("gp1_04.mission.description"),
    },
  };

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): TunnelQuest[] => {
    const bank: Record<Stage, Record<Difficulty, TunnelQuest[]>> = {
      classical: {
        BASIC: [
          {
            id: "CL-B-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.cl_transmission_basic,
            expressionLatex: "E=7\\,eV,\\;V_0=5\\,eV",
            targetLatex: "T",
            slots: [{ id: "T", labelLatex: "T", placeholder: t("gp1_04.placeholders.v_1"), expected: 1 }],
            correctLatex: "T=1",
          },
        ],
        CORE: [
          {
            id: "CL-C-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.cl_reflection_core,
            expressionLatex: "E>V_0\\Rightarrow T=1,\\;R=1-T",
            targetLatex: "R",
            slots: [{ id: "R", labelLatex: "R", placeholder: t("gp1_04.placeholders.v_0"), expected: 0 }],
            correctLatex: "R=0",
          },
        ],
        ADVANCED: [
          {
            id: "CL-A-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.cl_wave_number_advanced,
            expressionLatex: "E=6\\,eV,\\;k=\\sqrt{E}",
            targetLatex: "k",
            slots: [{ id: "k", labelLatex: "k", placeholder: t("gp1_04.placeholders.x_dot_xx"), expected: 2.45 }],
            correctLatex: "k\\approx 2.45",
          },
        ],
        ELITE: [
          {
            id: "CL-E-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.cl_de_broglie_elite,
            expressionLatex: "p=3\\,GeV/c,\\;\\lambda=\\frac{hc}{pc^2},\\;hc=1.24\\times10^{-6}\\,eV\\cdot m",
            targetLatex: "\\lambda",
            slots: [{ id: "lam", labelLatex: "\\lambda(m)", placeholder: t("gp1_04.placeholders.x_dot_xe_minus_16"), expected: 4.13e-16 }],
            correctLatex: "\\lambda\\approx 4.13\\times10^{-16}\\,m",
          },
        ],
      },
      tunneling: {
        BASIC: [
          {
            id: "TU-B-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.tu_transmission_basic,
            expressionLatex: "T=e^{-2\\kappa a},\\;\\kappa=1\\,nm^{-1},\\;a=1\\,nm",
            targetLatex: "T",
            slots: [{ id: "T", labelLatex: "T", placeholder: t("gp1_04.placeholders.v_0_dot_xxx"), expected: 0.135 }],
            correctLatex: "T=e^{-2}\\approx 0.135",
          },
        ],
        CORE: [
          {
            id: "TU-C-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.tu_kappa_core,
            expressionLatex: "\\kappa=\\sqrt{V_0-E},\\;V_0=9\\,eV,\\;E=5\\,eV",
            targetLatex: "\\kappa",
            slots: [{ id: "kappa", labelLatex: "\\kappa", placeholder: t("gp1_04.placeholders.x_dot_xx"), expected: 2 }],
            correctLatex: "\\kappa=2",
          },
        ],
        ADVANCED: [
          {
            id: "TU-A-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.tu_transmission_advanced,
            expressionLatex: "\\kappa=2\\,nm^{-1},\\;a=1.5\\,nm,\\;T=e^{-2\\kappa a}",
            targetLatex: "T",
            slots: [{ id: "T", labelLatex: "T", placeholder: t("gp1_04.placeholders.v_0_dot_xxx"), expected: 0.0025 }],
            correctLatex: "T=e^{-6}\\approx 0.0025",
          },
        ],
        ELITE: [
          {
            id: "TU-E-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.tu_barrier_width_elite,
            expressionLatex: "T=e^{-2\\kappa a},\\;T=0.01,\\;\\kappa=1.5\\,nm^{-1}",
            targetLatex: "a",
            slots: [{ id: "a", labelLatex: "a(nm)", placeholder: t("gp1_04.placeholders.x_dot_xx"), expected: 1.54 }],
            correctLatex: "a=\\frac{-\\ln(0.01)}{2\\times 1.5}\\approx 1.54\\,nm",
          },
        ],
      },
      resonance: {
        BASIC: [
          {
            id: "RE-B-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.re_mode_basic,
            expressionLatex: "2a=n\\lambda,\\;a=1\\,nm,\\;\\lambda=1\\,nm",
            targetLatex: "n",
            slots: [{ id: "n", labelLatex: "n", placeholder: t("gp1_04.placeholders.v_2"), expected: 2 }],
            correctLatex: "n=2",
          },
        ],
        CORE: [
          {
            id: "RE-C-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.re_energy_level_core,
            expressionLatex: "E_n=n^2E_1,\\;E_1=0.5\\,eV,\\;n=3",
            targetLatex: "E_3",
            slots: [{ id: "E3", labelLatex: "E_3(eV)", placeholder: t("gp1_04.placeholders.x_dot_x"), expected: 4.5 }],
            correctLatex: "E_3=9\\times 0.5=4.5\\,eV",
          },
        ],
        ADVANCED: [
          {
            id: "RE-A-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.re_delta_energy_advanced,
            expressionLatex: "E_2=2.0\\,eV,\\;E_1=0.5\\,eV",
            targetLatex: "\\Delta E",
            slots: [{ id: "dE", labelLatex: "\\Delta E(eV)", placeholder: t("gp1_04.placeholders.x_dot_x"), expected: 1.5 }],
            correctLatex: "\\Delta E=1.5\\,eV",
          },
        ],
        ELITE: [
          {
            id: "RE-E-1",
            difficulty,
            stage,
            promptLatex: gp1_04_prompts.re_frequency_elite,
            expressionLatex: "\\Delta E=2.4\\,eV,\\;f=\\frac{\\Delta E}{h},\\;h=4.136\\times10^{-15}\\,eV\\cdot s",
            targetLatex: "f",
            slots: [{ id: "f", labelLatex: "f(Hz)", placeholder: t("gp1_04.placeholders.x_dot_xe14"), expected: 5.80e14 }],
            correctLatex: "f\\approx 5.80\\times10^{14}\\,Hz",
          },
        ],
      },
    };

    return bank[stage][difficulty] ?? [];
  }, [gp1_04_prompts]);

  const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => {
    return buildStagePool(difficulty, stage);
  }, [buildStagePool]);

  const {
    currentQuest: quest,
    stage,
    inputs,
    setInputs,
    lastCheck,
    verify,
    next,
    handleStageChange,
    difficulty,
    handleDifficultyChange,
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback,
  feedbackLevel,
  feedbackContent,
  feedbackAvailability,
  showHintLevel,
  showStepsLevel,
  showFullSolution,
  policy,
  } = useQuestManager<TunnelQuest, Stage>({
    moduleCode: "gp1-04",
    buildPool,
    initialStage: "classical",
    tolerance: 0.02,
  });

  const [particleEnergy, setParticleEnergy] = useState(3);
  const [barrierHeight, setBarrierHeight] = useState(5);
  const [barrierWidth, setBarrierWidth] = useState(2);

  useEffect(() => {
    if (stage === "classical") {
      setParticleEnergy(3);
      setBarrierHeight(5);
      setBarrierWidth(2);
    } else if (stage === "tunneling") {
      setParticleEnergy(4);
      setBarrierHeight(6);
      setBarrierWidth(1.5);
    } else {
      setParticleEnergy(7);
      setBarrierHeight(8);
      setBarrierWidth(1);
    }
  }, [stage]);

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gp1-04", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const transmissionCoefficient = calculateTransmissionCoefficient(particleEnergy, barrierHeight, barrierWidth);

  const stages = useMemo(() => [
    { id: "classical" as Stage, label: gp1_04_t.stages.classical },
    { id: "tunneling" as Stage, label: gp1_04_t.stages.tunneling },
    { id: "resonance" as Stage, label: gp1_04_t.stages.resonance },
  ], [gp1_04_t.stages]);

  const printSections = useMemo(() => buildQuestPrintSections<TunnelQuest, Stage>({
    moduleTitle: gp1_04_t.title,
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: gp1_04_t.difficulty.basic,
      CORE: gp1_04_t.difficulty.core,
      ADVANCED: gp1_04_t.difficulty.advanced,
      ELITE: gp1_04_t.difficulty.elite,
    },
    buildPool,
  }), [buildPool, gp1_04_t.difficulty.advanced, gp1_04_t.difficulty.basic, gp1_04_t.difficulty.core, gp1_04_t.difficulty.elite, gp1_04_t.title, stages]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      feedbackContent={feedbackContent}
      feedbackLevel={feedbackLevel}
      feedbackAvailability={feedbackAvailability}
      feedbackPolicy={policy}
      onShowHint={showHintLevel}
      onShowSteps={showStepsLevel}
      onShowFull={showFullSolution}
      title={gp1_04_t.title}
      moduleCode="GP1.04"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      printSections={printSections}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: gp1_04_t.back,
        check: gp1_04_t.check,
        next: gp1_04_t.next,
        correct: gp1_04_t.correct,
        incorrect: gp1_04_t.incorrect,
        monitor_title: gp1_04_t.monitor_title,
        difficulty: gp1_04_t.difficulty,
      }}
      monitorContent={
        <div className="space-y-4">
          <TunnellingCanvas particleEnergy={particleEnergy} barrierHeight={barrierHeight} barrierWidth={barrierWidth} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{gp1_04_t.target_title}</div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{gp1_04_t.labels.transmission}</div>
            <div className="text-4xl text-neon-cyan font-black text-center">T = {(transmissionCoefficient * 100).toFixed(2)}%</div>
            <div className="text-xs text-white/60 text-center font-mono">
              {particleEnergy < barrierHeight ? gp1_04_t.stages.tunneling_hint : gp1_04_t.stages.classical_hint}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{gp1_04_t.labels.wave_function}</div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-cyan mb-1" />
                <span className="text-white/60 font-mono text-xs">{gp1_04_t.labels.incident}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-pink mb-1" />
                <span className="text-white/60 font-mono text-xs">{gp1_04_t.labels.reflected}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-green mb-1" />
                <span className="text-white/60 font-mono text-xs">{gp1_04_t.labels.transmitted}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{gp1_04_t.labels.formulas}</div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="-\\frac{\\hbar^2}{2m}\\frac{d^{2}\\psi}{dx^2} + V(x)\\psi = E\\psi" /></div>
              <div><InlineMath math="T = \\frac{1}{1 + \\frac{V_0^{2} \\sinh^{2}(\\kappa a)}{4E(V_0-E)}}" /></div>
              <div><InlineMath math="\\kappa = \\sqrt{\\frac{2m(V_0-E)}{\\hbar^2}}" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{gp1_04_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{gp1_04_t.mission.description}</p>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] text-white font-black mb-4">{gp1_04_t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "classical" && gp1_04_t.stages.classical_desc}
            {stage === "tunneling" && gp1_04_t.stages.tunneling_desc}
            {stage === "resonance" && gp1_04_t.stages.resonance_desc}
          </p>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">{gp1_04_t.labels.particle_energy}</div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={particleEnergy}
                onChange={(e) => setParticleEnergy(parseFloat(e.target.value))}
                aria-label={gp1_04_t.labels.particle_energy}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{particleEnergy.toFixed(1)} eV</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">{gp1_04_t.labels.barrier_height}</div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="2"
                max="12"
                step="0.5"
                value={barrierHeight}
                onChange={(e) => setBarrierHeight(parseFloat(e.target.value))}
                aria-label={gp1_04_t.labels.barrier_height}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{barrierHeight.toFixed(1)} eV</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">{gp1_04_t.labels.barrier_width}</div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={barrierWidth}
                onChange={(e) => setBarrierWidth(parseFloat(e.target.value))}
                aria-label={gp1_04_t.labels.barrier_width}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{barrierWidth.toFixed(1)} nm</span>
            </div>
          </div>

          {quest && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black text-center">{gp1_04_t.check}</div>
              <div className="text-center text-2xl text-white font-black">{renderMixedText(quest.promptLatex)}</div>
              <div className="text-center p-3 bg-white/5 border border-white/10 rounded-xl">
                <KatexTextWrap math={quest.expressionLatex || ""} />
              </div>
              {quest.slots.map((slot) => (
                <div key={slot.id} className="space-y-2">
                  <label className="text-sm text-white/70 font-mono">
                    <InlineMath math={slot.labelLatex} />
                  </label>
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [slot.id]: e.target.value }))}
                    aria-label={slot.id}
                    className="w-full bg-black border-2 border-cyan-500/50 p-4 text-center outline-none focus:border-cyan-400 placeholder:text-white/40 font-black text-2xl text-white rounded-lg"
                    placeholder={slot.placeholder}
                  />
                </div>
              ))}
              {lastCheck?.ok && (
                <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <InlineMath math={quest.correctLatex} />
                </div>
              )}
            </div>
          )}

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/90 font-mono italic">
              {stage === "classical" && gp1_04_t.stages.classical_hint}
              {stage === "tunneling" && gp1_04_t.stages.tunneling_hint}
              {stage === "resonance" && gp1_04_t.stages.resonance_hint}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
