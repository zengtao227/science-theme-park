"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BeakerCanvas from "@/components/chamber/sc2-04/BeakerCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "dissolve" | "saturate" | "crystallize" | "elite";

interface SC204Quest extends Quest {
  stage: Stage;
}

// Solubility curve data (g/100mL water)
function getSolubility(temperature: number): number {
  const a = 13.3;
  const b = 0.85;
  const c = 0.01;
  return a + b * temperature + c * temperature * temperature;
}

export default function SC204Page() {
  const { t: getT } = useLanguage();
  const t = getT("sc2_04");
  const { completeStage } = useAppStore();

  const [temperature, setTemperature] = useState(25); // °C
  const [soluteAmount, setSoluteAmount] = useState(20); // g

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SC204Quest[] => {
    const quests: SC204Quest[] = [];

    if (stage === "elite") {
      quests.push(
        {
          id: "ELITE-1", difficulty, stage,
          promptLatex: "Rhine Water Sample A: Mass before evaporation = 100g, after = 99.8g. Find dissolved solids in g/100g water.",
          expressionLatex: "S = \\frac{m_{solute}}{m_{water}} \\times 100",
          targetLatex: "S",
          slots: [{ id: "s", labelLatex: "S \\text{ (g)}", placeholder: "0.20", expected: 0.20 }],
          correctLatex: "0.20 \\text{ g/100g}",
          hintLatex: ["0.2g solute in 99.8g water"]
        },
        {
          id: "ELITE-2", difficulty, stage,
          promptLatex: "Solubility of O2 in Rhine at 15°C is 10mg/L. If water warms to 25°C, solubility drops by 1.7mg/L. New solubility?",
          expressionLatex: "S_{new} = S_{old} - \\Delta S",
          targetLatex: "S_{new}",
          slots: [{ id: "o2", labelLatex: "S_{new} \\text{ (mg/L)}", placeholder: "8.3", expected: 8.3 }],
          correctLatex: "8.3 \\text{ mg/L}",
          hintLatex: ["Subtract the drop"]
        },
        {
          id: "ELITE-3", difficulty, stage,
          promptLatex: "Basel waste water plant discharges 5kg of salt into 1000L of Rhine water. Concentration in g/L?",
          expressionLatex: "C = \\frac{m}{V}",
          targetLatex: "C",
          slots: [{ id: "c", labelLatex: "C \\text{ (g/L)}", placeholder: "5", expected: 5 }],
          correctLatex: "5 \\text{ g/L}",
          hintLatex: ["5000g / 1000L"]
        },
        {
          id: "ELITE-4", difficulty, stage,
          promptLatex: "Heavy metal precipitate PbCl2 (Ksp=1.6e-5) in Rhine. If [Cl-]=0.01M, find max [Pb2+] in M.",
          expressionLatex: "K_{sp} = [Pb^{2+}][Cl^-]^2",
          targetLatex: "[Pb^{2+}]",
          slots: [{ id: "pb", labelLatex: "[Pb^{2+}]", placeholder: "0.16", expected: 0.16 }],
          correctLatex: "0.16 \\text{ M}",
          hintLatex: ["1.6e-5 / (0.01)^2"]
        },
        {
          id: "ELITE-5", difficulty, stage,
          promptLatex: "A 500mL Rhine water sample contains 2.48g of nitrates (NO3-, 62 g/mol). Calculate Molarity.",
          expressionLatex: "M = \\frac{n}{V} = \\frac{m/MW}{V}",
          targetLatex: "M",
          slots: [{ id: "m", labelLatex: "M \\text{ (mol/L)}", placeholder: "0.08", expected: 0.08 }],
          correctLatex: "0.08 \\text{ M}",
          hintLatex: ["2.48/62 = 0.04 mol. V=0.5L"]
        }
      );
    } else {
      quests.push({
        id: `${stage}-1`, difficulty, stage,
        promptLatex: `Explore ${stage.toUpperCase()} characteristics in the simulation.`,
        expressionLatex: "Q_c \\text{ vs } K_{sp}",
        targetLatex: "Confirm",
        slots: [{ id: "chk", labelLatex: "Confirm (Type 1)", placeholder: "1", expected: 1 }],
        correctLatex: "1",
        hintLatex: ["Type 1"]
      });
    }
    return quests;
  }, []);

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
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SC204Quest, Stage>({
    moduleCode: "sc2-04",
    buildPool,
    initialStage: "dissolve",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sc2-04", stage);
    }
  }, [lastCheck, completeStage, stage]);

  useEffect(() => {
    if (stage === "dissolve") {
      setTemperature(25); setSoluteAmount(20);
    } else if (stage === "saturate") {
      setTemperature(50); setSoluteAmount(60);
    } else if (stage === "crystallize") {
      setTemperature(80); setSoluteAmount(100);
    }
  }, [stage]);

  const solubility = getSolubility(temperature);
  const isSaturated = soluteAmount > solubility;
  const precipitate = isSaturated ? soluteAmount - solubility : 0;

  const stagesProps = useMemo(() => [
    { id: "dissolve" as Stage, label: t.stages.dissolve },
    { id: "saturate" as Stage, label: t.stages.saturate },
    { id: "crystallize" as Stage, label: t.stages.crystallize },
    { id: "elite" as Stage, label: "ELITE" },
  ], [t]);

  if (!currentQuest) return null;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t.title}
      moduleCode="SC2.04"
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
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE"
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <BeakerCanvas
            temperature={temperature}
            soluteAmount={soluteAmount}
            solubility={solubility}
            isSaturated={isSaturated}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t.target_title}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.labels.solubility}
            </div>
            <div className="text-3xl text-neon-cyan font-black text-center">
              S = {solubility.toFixed(1)} g/100mL
            </div>
            <div className="text-xs text-center text-white/60 font-mono">
              {isSaturated ? t.labels.saturated : t.labels.unsaturated}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.labels.solution_data}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Temp:</span>
                <span className="text-neon-amber font-black">{temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Solute Added:</span>
                <span className="text-neon-purple font-black">{soluteAmount} g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Dissolved:</span>
                <span className="text-neon-green font-black">{Math.min(soluteAmount, solubility).toFixed(1)} g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Precipitate:</span>
                <span className="text-neon-pink font-black">{precipitate.toFixed(1)} g</span>
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
            {stage === "elite" ? "Rhine Water Quality Analysis" : currentQuest?.promptLatex}
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
          <div className="text-lg">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </div>

          <div className="text-neon-cyan">
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
                  placeholder={slot.placeholder}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  disabled={lastCheck?.ok}
                  onKeyDown={(e) => { if (e.key === 'Enter') verify(); }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Simulation Section */}
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {t.labels.temperature}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{temperature}°C</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {t.labels.solute_amount}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={soluteAmount}
                onChange={(e) => setSoluteAmount(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{soluteAmount} g</span>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/90 font-mono italic">
              {stage === "dissolve" && t.stages.dissolve_hint}
              {stage === "saturate" && t.stages.saturate_hint}
              {stage === "crystallize" && t.stages.crystallize_hint}
              {stage === "elite" && "Analyze the data rigorously."}
            </div>
          </div>
        </div>

        {/* Scenario Display */}
        <div className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full">
          <div className="flex items-start gap-4">
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-neon-purple/60 font-black">Regional Case Study // Basel Node</div>
              <p className="text-sm text-white/50 leading-relaxed italic">
                {stage === "dissolve" && t.scenarios.pharma_solubility}
                {stage === "saturate" && t.scenarios.rhine_pollution_monitoring}
                {stage === "crystallize" && t.scenarios.crystallization_purification}
                {stage === "elite" && "Rhine Water Quality Expert Analysis"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
