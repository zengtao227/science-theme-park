"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GasTankCanvas from "@/components/chamber/sc2-03/GasTankCanvas";
import { idealGasPressure } from "@/lib/physics";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "boyle" | "charles" | "combined" | "elite";

interface SC203Quest extends Quest {
  stage: Stage;
}

export default function SC203Page() {
  const { t: getT } = useLanguage();
  const t = getT("sc2_03");
  const { completeStage } = useAppStore();

  const [volume, setVolume] = useState(5); // L
  const [temperature, setTemperature] = useState(300); // K
  const [moles, setMoles] = useState(1); // mol

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SC203Quest[] => {
    const quests: SC203Quest[] = [];

    if (stage === "elite") {
      quests.push(
        {
          id: "ELITE-1", difficulty, stage,
          promptLatex: getT("sc2_03.prompts.bvb_brake", { V: 100, P: 1, V2: 20 }),
          expressionLatex: "P_1 V_1 = P_2 V_2",
          targetLatex: "P_2",
          slots: [{ id: "p2", labelLatex: "P_2 \\\\text{ (bar)}", placeholder: "5", expected: 5 }],
          correctLatex: "5 \\\\text{ bar}",
          hintLatex: ["Boyle's Law"]
        },
        {
          id: "ELITE-2", difficulty, stage,
          promptLatex: getT("sc2_03.prompts.euroairport", { t1: 300, p1: 100, t2: 270, p2: 50 }),
          expressionLatex: "\\\\frac{P_1 V_1}{T_1} = \\\\frac{P_2 V_2}{T_2}",
          targetLatex: "\\\\frac{V_2}{V_1}",
          slots: [{ id: "ratio", labelLatex: "Ratio", placeholder: "1.8", expected: 1.8 }],
          correctLatex: "1.8",
          hintLatex: ["V2/V1 = (P1/P2) * (T2/T1)"]
        },
        {
          id: "ELITE-3", difficulty, stage,
          promptLatex: getT("sc2_03.prompts.wickelfisch", { v1: 20, t1: 300, t2: 285 }),
          expressionLatex: "\\\\frac{V_1}{T_1} = \\\\frac{V_2}{T_2}",
          targetLatex: "V_2",
          slots: [{ id: "v2", labelLatex: "V_2 \\\\text{ (L)}", placeholder: "19", expected: 19 }],
          correctLatex: "19 \\\\text{ L}",
          hintLatex: ["Charles Law"]
        },
        {
          id: "ELITE-4", difficulty, stage,
          promptLatex: getT("sc2_03.prompts.fire_dept", { V: 10, P: 200, r: 50 }),
          expressionLatex: "\\\\text{Total Vol} = V \\times P", // approx
          targetLatex: "t",
          slots: [{ id: "t", labelLatex: "t \\\\text{ (min)}", placeholder: "40", expected: 40 }],
          correctLatex: "40 \\\\text{ min}",
          hintLatex: ["Total Liters = 200 * 10 = 2000L"]
        },
        {
          id: "ELITE-5", difficulty, stage,
          promptLatex: getT("sc2_03.prompts.geothermal", { p1: 500, t1: 400, t2: 300 }),
          expressionLatex: "\\\\frac{P_1 V_1}{T_1} = \\\\frac{P_2 V_2}{T_2}",
          targetLatex: "\\\\frac{V_2}{V_1}",
          slots: [{ id: "f", labelLatex: "Factor", placeholder: "375", expected: 375 }],
          correctLatex: "375",
          hintLatex: ["(500/1) * (300/400)"]
        }
      );
    } else {
      // Basic placeholder for other stages to avoid empty state
      quests.push({
        id: `${stage}-1`, difficulty, stage,
        promptLatex: `${stage.toUpperCase()} Law Exploration`,
        expressionLatex: "PV=nRT",
        targetLatex: "Check",
        slots: [{ id: "check", labelLatex: "Type 1", placeholder: "1", expected: 1 }],
        correctLatex: "1",
        hintLatex: ["Just type 1"]
      });
    }

    return quests;
  }, [getT]);

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
  } = useQuestManager<SC203Quest, Stage>({
    buildPool,
    initialStage: "boyle",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sc2-03", stage);
    }
  }, [lastCheck, completeStage, stage]);

  useEffect(() => {
    // Reset simulation on stage change
    if (stage === "boyle") {
      setVolume(5); setTemperature(300); setMoles(1);
    } else if (stage === "charles") {
      setVolume(5); setTemperature(300); setMoles(1);
    } else if (stage === "combined") {
      setVolume(5); setTemperature(300); setMoles(1);
    }
  }, [stage]);

  const pressure = idealGasPressure(moles, temperature, volume);

  const stagesProps = useMemo(() => [
    { id: "boyle" as Stage, label: t.stages.boyle },
    { id: "charles" as Stage, label: t.stages.charles },
    { id: "combined" as Stage, label: t.stages.combined },
    { id: "elite" as Stage, label: t.difficulty.elite },
  ], [t]);

  if (!currentQuest) return null;

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SC2.03"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
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
        difficulty: t.difficulty,
      }}
      monitorContent={
        <div className="space-y-4">
          <GasTankCanvas
            volume={volume}
            temperature={temperature}
            moles={moles}
            particleCount={100}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t.target_title}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.labels.pressure}
            </div>
            <div className="text-4xl text-neon-cyan font-black text-center">
              P = {pressure.toFixed(2)} atm
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.labels.state_variables}
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-white/60 font-mono text-xs">V</span>
                <span className="text-neon-purple font-black">{volume.toFixed(1)} L</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white/60 font-mono text-xs">T</span>
                <span className="text-neon-amber font-black">{temperature.toFixed(0)} K</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white/60 font-mono text-xs">n</span>
                <span className="text-neon-green font-black">{moles.toFixed(1)} mol</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t.mission.title}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {currentQuest.promptLatex || t.mission.description}
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
          <div className="text-lg">
            <InlineMath math={currentQuest.promptLatex} />
          </div>

          <div className="text-neon-cyan">
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
                  placeholder={slot.placeholder}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  disabled={lastCheck?.ok}
                  onKeyDown={(e) => { if (e.key === 'Enter') verify(); }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Simulation Controls - Still active for visualization */}
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Simulation Control</div>
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {t.labels.volume}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="2"
                max="10"
                step="0.5"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1"
                disabled={stage === "charles"}
              />
              <span className="text-white font-black w-20 text-right">{volume.toFixed(1)} L</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {t.labels.temperature}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="200"
                max="500"
                step="10"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="flex-1"
                disabled={stage === "boyle"}
              />
              <span className="text-white font-black w-20 text-right">{temperature.toFixed(0)} K</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {t.labels.moles}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={moles}
                onChange={(e) => setMoles(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{moles.toFixed(1)} mol</span>
            </div>
          </div>
        </div>

        {/* Scenario Display */}
        <div className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full">
          <div className="flex items-start gap-4">
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-neon-purple/60 font-black">Regional Case Study // Basel Node</div>
              <p className="text-sm text-white/50 leading-relaxed italic">
                {stage === "boyle" && t.scenarios.gas_compression}
                {stage === "charles" && t.scenarios.weather_balloons}
                {stage === "combined" && t.scenarios.chemical_reactors}
                {stage === "elite" && "Basel Elite Physics/Chemistry Integration"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
