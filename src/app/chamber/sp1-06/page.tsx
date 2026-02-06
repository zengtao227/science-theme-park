"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PendulumCanvas from "@/components/chamber/sp1-06/PendulumCanvas";

type Stage = "EARTH" | "MOON" | "CUSTOM";

export default function SP106Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].sp1_06 || translations.EN.sp1_06;

  const [stage, setStage] = useState<Stage>("EARTH");
  const [length, setLength] = useState(1.0); // meters
  const [gravity, setGravity] = useState(9.81); // m/s^2
  const [initialAngle, setInitialAngle] = useState(15); // degrees
  const [kineticEnergy, setKineticEnergy] = useState(0);
  const [potentialEnergy, setPotentialEnergy] = useState(0);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
    if (newStage === "EARTH") {
      setGravity(9.81);
      setLength(1.0);
    } else if (newStage === "MOON") {
      setGravity(1.62);
      setLength(1.0);
    }
  };

  // Calculate period: T = 2π√(L/g)
  const period = 2 * Math.PI * Math.sqrt(length / gravity);
  const frequency = 1 / period;
  const omega = 2 * Math.PI * frequency;

  const handleEnergyUpdate = (kinetic: number, potential: number) => {
    setKineticEnergy(kinetic);
    setPotentialEnergy(potential);
  };

  const totalEnergy = kineticEnergy + potentialEnergy;
  const kineticPercent = totalEnergy > 0 ? (kineticEnergy / totalEnergy) * 100 : 0;
  const potentialPercent = totalEnergy > 0 ? (potentialEnergy / totalEnergy) * 100 : 0;

  return (
    <ChamberLayout
      title={t?.title || "SP1.06 // THE SWISS PENDULUM"}
      moduleCode="SP1.06"
      difficulty="CORE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "EARTH", label: t?.stages?.earth || "EARTH" },
        { id: "MOON", label: t?.stages?.moon || "MOON" },
        { id: "CUSTOM", label: t?.stages?.custom || "CUSTOM" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "SP1.06_PENDULUM // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "SP1.06_PENDULUM_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <PendulumCanvas
            length={length}
            gravity={gravity}
            initialAngle={initialAngle}
            onEnergyUpdate={handleEnergyUpdate}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "OSCILLATION PARAMETERS"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-base space-y-2">
              <div><InlineMath math="T = 2\pi\sqrt{\frac{L}{g}}" /></div>
              <div><InlineMath math="f = \frac{1}{T}" /></div>
              <div><InlineMath math="\omega = 2\pi f" /></div>
            </div>
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60 font-mono">Period (T):</span>
                <span className="text-neon-cyan font-black">{period.toFixed(3)} s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60 font-mono">Frequency (f):</span>
                <span className="text-neon-green font-black">{frequency.toFixed(3)} Hz</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60 font-mono">ω:</span>
                <span className="text-neon-purple font-black">{omega.toFixed(3)} rad/s</span>
              </div>
            </div>
          </div>

          {/* Energy Tracking */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.energy || "ENERGY TRACKING"}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/60 font-mono w-20">Kinetic:</span>
                <div className="flex-1 h-6 bg-black/50 rounded overflow-hidden">
                  <div
                    className="h-full bg-neon-green transition-all duration-300"
                    style={{ width: `${kineticPercent}%` }}
                  />
                </div>
                <span className="text-xs text-neon-green font-black w-12 text-right">
                  {kineticPercent.toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/60 font-mono w-20">Potential:</span>
                <div className="flex-1 h-6 bg-black/50 rounded overflow-hidden">
                  <div
                    className="h-full bg-neon-purple transition-all duration-300"
                    style={{ width: `${potentialPercent}%` }}
                  />
                </div>
                <span className="text-xs text-neon-purple font-black w-12 text-right">
                  {potentialPercent.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: BASEL CLOCKMAKER"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description || "Master pendulum oscillations. Control length and gravity to understand period relationships."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={`T = ${period.toFixed(2)}\\;s`} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.length || "PENDULUM LENGTH (L)"}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-mono">L =</span>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                className="flex-1"
                disabled={stage !== "CUSTOM"}
              />
              <span className="text-xl font-black text-white min-w-[80px]">
                {length.toFixed(1)} m
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.gravity || "GRAVITY (g)"}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-mono">g =</span>
              <input
                type="range"
                min="1.0"
                max="15.0"
                step="0.1"
                value={gravity}
                onChange={(e) => setGravity(parseFloat(e.target.value))}
                className="flex-1"
                disabled={stage !== "CUSTOM"}
              />
              <span className="text-xl font-black text-white min-w-[100px]">
                {gravity.toFixed(2)} m/s²
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.angle || "INITIAL ANGLE (θ)"}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-mono">θ =</span>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={initialAngle}
                onChange={(e) => setInitialAngle(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-xl font-black text-white min-w-[60px]">
                {initialAngle}°
              </span>
            </div>
            {initialAngle > 15 && (
              <div className="text-xs text-amber-400 font-mono italic">
                ⚠️ {t?.labels?.warning || "Warning: Large angles may deviate from simple harmonic motion"}
              </div>
            )}
          </div>
          
          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "EARTH" && (t?.stages?.earth_desc || "Earth gravity: g = 9.81 m/s²")}
              {stage === "MOON" && (t?.stages?.moon_desc || "Moon gravity: g = 1.62 m/s² (6x slower period)")}
              {stage === "CUSTOM" && (t?.stages?.custom_desc || "Custom parameters: Adjust length and gravity freely")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
