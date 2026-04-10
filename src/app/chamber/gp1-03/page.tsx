"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ColliderCanvas from "@/components/chamber/gp1-03/ColliderCanvas";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createGP103FeedbackProvider } from "@/lib/gp1-03/provider";
import type { ColliderQuest, Stage } from "@/lib/gp1-03/types";

export default function P103Page() {
  const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createGP103FeedbackProvider(t), [t]);
  const { completeStage } = useAppStore();
  const gp1_03_prompts = useMemo(() => ({
    acc_gamma_basic: t("gp1_03.prompts.acc_gamma_basic"),
    acc_beam_energy_core: t("gp1_03.prompts.acc_beam_energy_core"),
    acc_gamma_advanced: t("gp1_03.prompts.acc_gamma_advanced"),
    acc_momentum_elite: t("gp1_03.prompts.acc_momentum_elite"),
    col_sqrts_basic: t("gp1_03.prompts.col_sqrts_basic"),
    col_event_core: t("gp1_03.prompts.col_event_core"),
    col_ecm_advanced: t("gp1_03.prompts.col_ecm_advanced"),
    col_beta_elite: t("gp1_03.prompts.col_beta_elite"),
    det_radius_basic: t("gp1_03.prompts.det_radius_basic"),
    det_mass_core: t("gp1_03.prompts.det_mass_core"),
    det_eta_advanced: t("gp1_03.prompts.det_eta_advanced"),
    det_delta_m_elite: t("gp1_03.prompts.det_delta_m_elite"),
  }), [t]);

  const gp1_03_t = {
    title: t("gp1_03.title"),
    back: t("gp1_03.back"),
    check: t("gp1_03.check"),
    next: t("gp1_03.next"),
    correct: t("gp1_03.correct"),
    incorrect: t("gp1_03.incorrect"),
    monitor_title: t("gp1_03.monitor_title"),
    objective_title: t("gp1_03.objective_title"),
    target_title: t("gp1_03.target_title"),
    difficulty: {
      basic: t("gp1_03.difficulty.basic"),
      core: t("gp1_03.difficulty.core"),
      advanced: t("gp1_03.difficulty.advanced"),
      elite: t("gp1_03.difficulty.elite"),
    },
    stages: {
      acceleration: t("gp1_03.stages.acceleration"),
      collision: t("gp1_03.stages.collision"),
      detection: t("gp1_03.stages.detection"),
      acceleration_desc: t("gp1_03.stages.acceleration_desc"),
      collision_desc: t("gp1_03.stages.collision_desc"),
      detection_desc: t("gp1_03.stages.detection_desc"),
      acceleration_hint: t("gp1_03.stages.acceleration_hint"),
      collision_hint: t("gp1_03.stages.collision_hint"),
      detection_hint: t("gp1_03.stages.detection_hint"),
    },
    labels: {
      beam_energy: t("gp1_03.labels.beam_energy"),
      relativistic_effects: t("gp1_03.labels.relativistic_effects"),
      formulas: t("gp1_03.labels.formulas"),
      magnetic_field: t("gp1_03.labels.magnetic_field"),
      colliding: t("gp1_03.labels.colliding"),
      initiate_collision: t("gp1_03.labels.initiate_collision"),
    },
    mission: {
      title: t("gp1_03.mission.title"),
      description: t("gp1_03.mission.description"),
    },
  };

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): ColliderQuest[] => {
    const bank: Record<Stage, Record<Difficulty, ColliderQuest[]>> = {
      acceleration: {
        BASIC: [
          {
            id: "A-B-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.acc_gamma_basic,
            expressionLatex: "v=0.60c,\\;\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}",
            targetLatex: "\\gamma",
            slots: [{ id: "gamma", labelLatex: "\\gamma", placeholder: t("gp1_03.placeholders.x_dot_xx"), expected: 1.25 }],
            correctLatex: "\\gamma=1.25",
          },
        ],
        CORE: [
          {
            id: "A-C-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.acc_beam_energy_core,
            expressionLatex: "E=\\gamma mc^2,\\;m_pc^2=0.938\\,GeV,\\;\\gamma=7000",
            targetLatex: "E",
            slots: [{ id: "E", labelLatex: "E(GeV)", placeholder: t("gp1_03.placeholders.xxxx"), expected: 6566 }],
            correctLatex: "E\\approx 6566\\,GeV",
          },
        ],
        ADVANCED: [
          {
            id: "A-A-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.acc_gamma_advanced,
            expressionLatex: "v=0.99c,\\;\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}",
            targetLatex: "\\gamma",
            slots: [{ id: "gamma", labelLatex: "\\gamma", placeholder: t("gp1_03.placeholders.xx_dot_x"), expected: 7.09 }],
            correctLatex: "\\gamma\\approx 7.09",
          },
        ],
        ELITE: [
          {
            id: "A-E-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.acc_momentum_elite,
            expressionLatex: "p\\approx\\gamma m v,\\;\\gamma=7461,\\;m_pc^2=0.938\\,GeV,\\;v\\approx c",
            targetLatex: "p",
            slots: [{ id: "p", labelLatex: "p(GeV/c)", placeholder: t("gp1_03.placeholders.xxxx"), expected: 7000 }],
            correctLatex: "p\\approx 7000\\,GeV/c",
          },
        ],
      },
      collision: {
        BASIC: [
          {
            id: "C-B-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.col_sqrts_basic,
            expressionLatex: "E_1=6.5\\,TeV,\\;E_2=6.5\\,TeV,\\;\\sqrt{s}=E_1+E_2",
            targetLatex: "\\sqrt{s}",
            slots: [{ id: "s", labelLatex: "\\sqrt{s}(TeV)", placeholder: t("gp1_03.placeholders.xx_dot_x"), expected: 13 }],
            correctLatex: "\\sqrt{s}=13\\,TeV",
          },
        ],
        CORE: [
          {
            id: "C-C-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.col_event_core,
            expressionLatex: "L=2\\times 10^{34}\\,cm^{-2}s^{-1},\\;\\sigma=5\\times 10^{-36}\\,cm^2,\\;t=10^7\\,s,\\;N=L\\sigma t",
            targetLatex: "N",
            slots: [{ id: "N", labelLatex: "N", placeholder: t("gp1_03.placeholders.xxxx"), expected: 1000000 }],
            correctLatex: "N=10^6",
          },
        ],
        ADVANCED: [
          {
            id: "C-A-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.col_ecm_advanced,
            expressionLatex: "p_1=-p_2=6.5\\,TeV/c,\\;m\\ll p/c,\\;E_{cm}\\approx 2pc",
            targetLatex: "E_{cm}",
            slots: [{ id: "Ecm", labelLatex: "E_{cm}(TeV)", placeholder: t("gp1_03.placeholders.xx_dot_x"), expected: 13 }],
            correctLatex: "E_{cm}\\approx 13\\,TeV",
          },
        ],
        ELITE: [
          {
            id: "C-E-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.col_beta_elite,
            expressionLatex: "\\gamma=6930,\\;\\beta=\\sqrt{1-1/\\gamma^2}",
            targetLatex: "\\beta",
            slots: [{ id: "beta", labelLatex: "\\beta=v/c", placeholder: t("gp1_03.placeholders.v_0_dot_xxxxx"), expected: 0.99999999 }],
            correctLatex: "\\beta\\approx 0.99999999",
          },
        ],
      },
      detection: {
        BASIC: [
          {
            id: "D-B-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.det_radius_basic,
            expressionLatex: "p=2\\,GeV/c,\\;B=2\\,T,\\;r=\\frac{p}{0.3B}",
            targetLatex: "r",
            slots: [{ id: "r", labelLatex: "r(m)", placeholder: t("gp1_03.placeholders.x_dot_xx"), expected: 3.33 }],
            correctLatex: "r\\approx 3.33\\,m",
          },
        ],
        CORE: [
          {
            id: "D-C-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.det_mass_core,
            expressionLatex: "E=125\\,GeV,\\;p=40\\,GeV/c,\\;m=\\sqrt{E^2-p^2}",
            targetLatex: "m",
            slots: [{ id: "m", labelLatex: "m(GeV/c^2)", placeholder: t("gp1_03.placeholders.xxx"), expected: 118 }],
            correctLatex: "m\\approx 118\\,GeV/c^2",
          },
        ],
        ADVANCED: [
          {
            id: "D-A-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.det_eta_advanced,
            expressionLatex: "\\theta=10^\\circ,\\;\\eta=-\\ln(\\tan(\\theta/2))",
            targetLatex: "\\eta",
            slots: [{ id: "eta", labelLatex: "\\eta", placeholder: t("gp1_03.placeholders.x_dot_xx"), expected: 2.44 }],
            correctLatex: "\\eta\\approx 2.44",
          },
        ],
        ELITE: [
          {
            id: "D-E-1",
            difficulty,
            stage,
            promptLatex: gp1_03_prompts.det_delta_m_elite,
            expressionLatex: "m_{reco}=124.7\\,GeV,\\;m_H=125.0\\,GeV,\\;\\Delta m=m_{reco}-m_H",
            targetLatex: "\\Delta m",
            slots: [{ id: "dm", labelLatex: "\\Delta m(GeV)", placeholder: t("gp1_03.placeholders.minus_x_dot_x"), expected: -0.3 }],
            correctLatex: "\\Delta m=-0.3\\,GeV",
          },
        ],
      },
    };

    return bank[stage][difficulty] ?? [];
  }, [gp1_03_prompts, t]);

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
  } = useQuestManager<ColliderQuest, Stage>({
    moduleCode: "gp1-03",
    buildPool,
    initialStage: "acceleration",
    feedbackContentProvider,
    tolerance: 0.02,
  });

  useEffect(() => {
    if (stage === "acceleration") {
      setEnergy(7);
      setMagneticField(true);
      setIsColliding(false);
    } else if (stage === "collision") {
      setEnergy(13);
      setMagneticField(true);
      setIsColliding(false);
    } else {
      setEnergy(13);
      setMagneticField(true);
      setIsColliding(false);
    }
  }, [stage]);

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gp1-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const [energy, setEnergy] = useState(7);
  const [magneticField, setMagneticField] = useState(true);
  const [isColliding, setIsColliding] = useState(false);

  const handleCollide = () => {
    setIsColliding(true);
    setTimeout(() => setIsColliding(false), 2000);
  };

  const restMass = 0.938;
  const gamma = energy * 1000 / restMass;
  const relativisticMass = gamma * restMass;

  const stages = useMemo(() => [
    { id: "acceleration" as Stage, label: gp1_03_t.stages.acceleration },
    { id: "collision" as Stage, label: gp1_03_t.stages.collision },
    { id: "detection" as Stage, label: gp1_03_t.stages.detection },
  ], [gp1_03_t.stages]);

  const printSections = useMemo(() => () => buildQuestPrintSections<ColliderQuest, Stage>({
    moduleTitle: gp1_03_t.title,
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: gp1_03_t.difficulty.basic,
      CORE: gp1_03_t.difficulty.core,
      ADVANCED: gp1_03_t.difficulty.advanced,
      ELITE: gp1_03_t.difficulty.elite,
    },
    buildPool,
  }), [buildPool, gp1_03_t.difficulty.advanced, gp1_03_t.difficulty.basic, gp1_03_t.difficulty.core, gp1_03_t.difficulty.elite, gp1_03_t.title, stages]);

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
      title={gp1_03_t.title}
      moduleCode="GP1.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      printSectionsBuilder={printSections}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: gp1_03_t.back,
        check: gp1_03_t.check,
        next: gp1_03_t.next,
        correct: gp1_03_t.correct,
        incorrect: gp1_03_t.incorrect,
        monitor_title: gp1_03_t.monitor_title,
        difficulty: gp1_03_t.difficulty,
      }}
      monitorContent={
        <div className="space-y-4">
          <ColliderCanvas energy={energy} magneticField={magneticField} isColliding={isColliding} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{gp1_03_t.target_title}</div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{gp1_03_t.labels.beam_energy}</div>
            <div className="text-4xl text-neon-cyan font-black text-center">E = {energy.toFixed(1)} TeV</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{gp1_03_t.labels.relativistic_effects}</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">γ (Lorentz):</span>
                <span className="text-neon-purple font-black">{gamma.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">m (effective):</span>
                <span className="text-neon-amber font-black">{relativisticMass.toFixed(1)} GeV/c^2</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{gp1_03_t.labels.formulas}</div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="E = \\gamma mc^{2}" /></div>
              <div><InlineMath math="\\gamma = \\frac{1}{\\sqrt{1 - v^{2}/c^2}}" /></div>
              <div><InlineMath math="F = qvB" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{gp1_03_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{gp1_03_t.mission.description}</p>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{gp1_03_t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "acceleration" && gp1_03_t.stages.acceleration_desc}
            {stage === "collision" && gp1_03_t.stages.collision_desc}
            {stage === "detection" && gp1_03_t.stages.detection_desc}
          </p>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">{gp1_03_t.labels.beam_energy}</div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="14"
                step="0.5"
                value={energy}
                onChange={(e) => setEnergy(parseFloat(e.target.value))}
                aria-label={gp1_03_t.labels.beam_energy}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{energy.toFixed(1)} TeV</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="magneticField"
                checked={magneticField}
                onChange={(e) => setMagneticField(e.target.checked)}
                aria-label={gp1_03_t.labels.magnetic_field}
                className="w-5 h-5"
              />
              <label htmlFor="magneticField" className="text-sm text-white font-black cursor-pointer">
                {gp1_03_t.labels.magnetic_field}
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCollide}
              disabled={isColliding}
              aria-label={isColliding ? gp1_03_t.labels.colliding : gp1_03_t.labels.initiate_collision}
              className="px-8 py-4 bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan text-lg font-black rounded-lg hover:bg-neon-cyan/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isColliding ? gp1_03_t.labels.colliding : gp1_03_t.labels.initiate_collision}
            </button>
          </div>

          {quest && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black text-center">
                {gp1_03_t.check}
              </div>
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

          <div className="text-center text-[10px] text-white/90 font-mono italic">
            {stage === "acceleration" && gp1_03_t.stages.acceleration_hint}
            {stage === "collision" && gp1_03_t.stages.collision_hint}
            {stage === "detection" && gp1_03_t.stages.detection_hint}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
