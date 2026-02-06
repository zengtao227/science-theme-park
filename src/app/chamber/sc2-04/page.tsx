"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
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
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].sc2_04 || translations.EN.sc2_04;

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
      title={t?.title || "SC2.04 // SOLUBILITY LAB"}
      moduleCode="SC2.04"
      difficulty="CORE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "dissolve", label: t?.stages?.dissolve || "DISSOLVE" },
        { id: "saturate", label: t?.stages?.saturate || "SATURATE" },
        { id: "crystallize", label: t?.stages?.crystallize || "CRYSTALLIZE" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "SC2.04_SOLUBILITY_LAB // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "SC2.04_SOLUBILITY_MONITOR",
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
            {t?.target_title || "SOLUTION STATUS"}
          </div>
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.solubility || "SOLUBILITY"}
            </div>
            <div className="text-3xl text-neon-cyan font-black text-center">
              S = {solubility.toFixed(1)} g/100mL
            </div>
            <div className="text-xs text-center text-white/60 font-mono">
              {isSaturated ? (t?.labels?.saturated || "SATURATED - Precipitate forming") : (t?.labels?.unsaturated || "UNSATURATED - Can dissolve more")}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.solution_data || "SOLUTION DATA"}
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
              {t?.labels?.formulas || "FORMULAS"}
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
            {t?.mission?.title || "MISSION: SOLUBILITY"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Explore solubility and temperature relationships. Observe crystallization."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "dissolve" && (t?.stages?.dissolve_desc || "Dissolve solute in water")}
            {stage === "saturate" && (t?.stages?.saturate_desc || "Reach saturation point")}
            {stage === "crystallize" && (t?.stages?.crystallize_desc || "Cool solution to crystallize")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.temperature || "TEMPERATURE (°C)"}
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
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.solute_amount || "SOLUTE AMOUNT (g)"}
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
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "dissolve" && (t?.stages?.dissolve_hint || "Most salts dissolve better at higher temperatures")}
              {stage === "saturate" && (t?.stages?.saturate_hint || "Saturation: maximum amount dissolved")}
              {stage === "crystallize" && (t?.stages?.crystallize_hint || "Cooling causes excess solute to crystallize")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
