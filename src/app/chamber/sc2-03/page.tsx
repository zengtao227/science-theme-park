"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GasTankCanvas from "@/components/chamber/sc2-03/GasTankCanvas";
import { idealGasPressure } from "@/lib/physics";

type Stage = "boyle" | "charles" | "combined";

export default function SC203Page() {
  const { t } = useLanguage();
  const sc2_03_t = {
    title: t("sc2_03.title"),
    footer_left: t("sc2_03.footer_left"),
    back: t("sc2_03.back"),
    check: t("sc2_03.check"),
    next: t("sc2_03.next"),
    correct: t("sc2_03.correct"),
    incorrect: t("sc2_03.incorrect"),
    ready: t("sc2_03.ready"),
    monitor_title: t("sc2_03.monitor_title"),
    stages: {
      boyle: t("sc2_03.stages.boyle"),
      charles: t("sc2_03.stages.charles"),
      combined: t("sc2_03.stages.combined"),
    },
    scenarios: {
      gas_compression: t("sc2_03.scenarios.gas_compression"),
      weather_balloons: t("sc2_03.scenarios.weather_balloons"),
      chemical_reactors: t("sc2_03.scenarios.chemical_reactors"),
    },
    difficulty: {
      basic: "BASIC",
      core: "CORE",
      advanced: "ADVANCED",
      elite: "ELITE",
    },
  };

  const [stage, setStage] = useState<Stage>("boyle");
  const [volume, setVolume] = useState(5); // L
  const [temperature, setTemperature] = useState(300); // K
  const [moles, setMoles] = useState(1); // mol

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);

    // Reset to default values for each stage
    if (newStage === "boyle") {
      setVolume(5);
      setTemperature(300);
      setMoles(1);
    } else if (newStage === "charles") {
      setVolume(5);
      setTemperature(300);
      setMoles(1);
    } else if (newStage === "combined") {
      setVolume(5);
      setTemperature(300);
      setMoles(1);
    }
  };

  const pressure = idealGasPressure(moles, temperature, volume);

  return (
    <ChamberLayout
      title={sc2_03_t.title}
      moduleCode="SC2.03"
      difficulty="CORE"
      onDifficultyChange={() => { }}
      stages={[
        { id: "boyle", label: sc2_03_t.stages.boyle },
        { id: "charles", label: sc2_03_t.stages.charles },
        { id: "combined", label: sc2_03_t.stages.combined },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => { }}
      onNext={() => { }}
      checkStatus={null}
      footerLeft={sc2_03_t.footer_left}
      translations={sc2_03_t}
      monitorContent={
        <div className="space-y-4">
          <GasTankCanvas
            volume={volume}
            temperature={temperature}
            moles={moles}
            particleCount={100}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "GAS PROPERTIES"}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.pressure || "PRESSURE"}
            </div>
            <div className="text-4xl text-neon-cyan font-black text-center">
              P = {pressure.toFixed(2)} atm
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.state_variables || "STATE VARIABLES"}
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

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="PV = nRT" /></div>
              {stage === "boyle" && <div><InlineMath math="P_1V_1 = P_2V_2 \text{ (constant T)}" /></div>}
              {stage === "charles" && <div><InlineMath math="\frac{V_1}{T_1} = \frac{V_2}{T_2} \text{ (constant P)}" /></div>}
              {stage === "combined" && <div><InlineMath math="\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}" /></div>}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: IDEAL GAS LAWS"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Explore the relationship between pressure, volume, and temperature in ideal gases."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "boyle" && (t?.stages?.boyle_desc || "Observe inverse relationship: P ∝ 1/V")}
            {stage === "charles" && (t?.stages?.charles_desc || "Observe direct relationship: V ∝ T")}
            {stage === "combined" && (t?.stages?.combined_desc || "Master the combined gas law")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {t?.labels?.volume || "VOLUME (V)"}
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
              {t?.labels?.temperature || "TEMPERATURE (T)"}
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
              {t?.labels?.moles || "MOLES (n)"}
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

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/90 font-mono italic">
              {stage === "boyle" && (t?.stages?.boyle_hint || "Boyle's Law: Decrease volume → Increase pressure")}
              {stage === "charles" && (t?.stages?.charles_hint || "Charles' Law: Increase temperature → Increase volume")}
              {stage === "combined" && (t?.stages?.combined_hint || "Combined: All three variables interact")}
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
                  {stage === "boyle" && sc2_03_t.scenarios.gas_compression}
                  {stage === "charles" && sc2_03_t.scenarios.weather_balloons}
                  {stage === "combined" && sc2_03_t.scenarios.chemical_reactors}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
