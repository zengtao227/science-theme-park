"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BeakerCanvas from "@/components/chamber/sc2-04/BeakerCanvas";

type Stage = "dissolve" | "saturate" | "crystallize";

// Solubility curve data (g/100mL water)
function getSolubility(temperature: number): number {
  // Simplified solubility curve for KNO3
  // S = a + b*T + c*T^2
  const a = 13.3;
  const b = 0.85;
  const c = 0.01;
  return a + b * temperature + c * temperature * temperature;
}

export default function SC204Page() {
  const { t } = useLanguage();
  const sc2_04_t = {
    title: t("sc2_04.title"),
    footer_left: t("sc2_04.footer_left"),
    stages: {
      dissolve: t("sc2_04.stages.dissolve"),
      saturate: t("sc2_04.stages.saturate"),
      crystallize: t("sc2_04.stages.crystallize"),
      dissolve_desc: t("sc2_04.stages.dissolve_desc"),
      saturate_desc: t("sc2_04.stages.saturate_desc"),
      crystallize_desc: t("sc2_04.stages.crystallize_desc"),
      dissolve_hint: t("sc2_04.stages.dissolve_hint"),
      saturate_hint: t("sc2_04.stages.saturate_hint"),
      crystallize_hint: t("sc2_04.stages.crystallize_hint"),
    },
    labels: {
      solubility: t("sc2_04.labels.solubility"),
      saturated: t("sc2_04.labels.saturated"),
      unsaturated: t("sc2_04.labels.unsaturated"),
      solution_data: t("sc2_04.labels.solution_data"),
      formulas: t("sc2_04.labels.formulas"),
      temperature: t("sc2_04.labels.temperature"),
      solute_amount: t("sc2_04.labels.solute_amount"),
    },
    mission: {
      title: t("sc2_04.mission.title"),
      description: t("sc2_04.mission.description"),
    },
    scenarios: {
      pharma_solubility: t("sc2_04.scenarios.pharma_solubility"),
      rhine_pollution_monitoring: t("sc2_04.scenarios.rhine_pollution_monitoring"),
      crystallization_purification: t("sc2_04.scenarios.crystallization_purification"),
    },
    target_title: t("sc2_04.target_title"),
    objective_title: t("sc2_04.objective_title"),
    back: t("sc2_04.back"),
    check: t("sc2_04.check"),
    next: t("sc2_04.next"),
    correct: t("sc2_04.correct"),
    incorrect: t("sc2_04.incorrect"),
    ready: t("sc2_04.ready"),
    monitor_title: t("sc2_04.monitor_title"),
  };

  const [stage, setStage] = useState<Stage>("dissolve");
  const [temperature, setTemperature] = useState(25); // °C
  const [soluteAmount, setSoluteAmount] = useState(20); // g

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);

    if (newStage === "dissolve") {
      setTemperature(25);
      setSoluteAmount(20);
    } else if (newStage === "saturate") {
      setTemperature(50);
      setSoluteAmount(60);
    } else if (newStage === "crystallize") {
      setTemperature(80);
      setSoluteAmount(100);
    }
  };

  const solubility = getSolubility(temperature);
  const isSaturated = soluteAmount > solubility;
  const precipitate = isSaturated ? soluteAmount - solubility : 0;

  return (
    <ChamberLayout
      title={sc2_04_t.title}
      moduleCode="SC2.04"
      difficulty="CORE"
      onDifficultyChange={() => { }}
      stages={[
        { id: "dissolve", label: sc2_04_t.stages.dissolve },
        { id: "saturate", label: sc2_04_t.stages.saturate },
        { id: "crystallize", label: sc2_04_t.stages.crystallize },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => { }}
      onNext={() => { }}
      checkStatus={null}
      footerLeft={sc2_04_t.footer_left}
      translations={{
        back: sc2_04_t.back,
        check: sc2_04_t.check,
        next: sc2_04_t.next,
        correct: sc2_04_t.correct,
        incorrect: sc2_04_t.incorrect,
        ready: sc2_04_t.ready,
        monitor_title: sc2_04_t.monitor_title,
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
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
            {sc2_04_t.target_title}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {sc2_04_t.labels.solubility}
            </div>
            <div className="text-3xl text-neon-cyan font-black text-center">
              S = {solubility.toFixed(1)} g/100mL
            </div>
            <div className="text-xs text-center text-white/60 font-mono">
              {isSaturated ? sc2_04_t.labels.saturated : sc2_04_t.labels.unsaturated}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {sc2_04_t.labels.solution_data}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Temperature:</span>
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

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {sc2_04_t.labels.formulas}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="S = f(T)" /></div>
              <div><InlineMath math="Q > K_{sp} \Rightarrow \text{Precipitate}" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {sc2_04_t.mission.title}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {sc2_04_t.mission.description}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {sc2_04_t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "dissolve" && sc2_04_t.stages.dissolve_desc}
            {stage === "saturate" && sc2_04_t.stages.saturate_desc}
            {stage === "crystallize" && sc2_04_t.stages.crystallize_desc}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {sc2_04_t.labels.temperature}
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
              {sc2_04_t.labels.solute_amount}
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
              {stage === "dissolve" && sc2_04_t.stages.dissolve_hint}
              {stage === "saturate" && sc2_04_t.stages.saturate_hint}
              {stage === "crystallize" && sc2_04_t.stages.crystallize_hint}
            </div>
          </div>
        </div>

        {/* Scenario Display */}
        {t?.scenarios && (
          <div className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm max-w-3xl mx-auto w-full">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-neon-purple/60 font-black">Regional Case Study // Basel Node</div>
                <p className="text-sm text-white/50 leading-relaxed italic">
                  {stage === "dissolve" && sc2_04_t.scenarios.pharma_solubility}
                  {stage === "saturate" && sc2_04_t.scenarios.rhine_pollution_monitoring}
                  {stage === "crystallize" && sc2_04_t.scenarios.crystallization_purification}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
