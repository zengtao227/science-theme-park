"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TunnellingCanvas from "@/components/chamber/p5-04/TunnellingCanvas";
import { calculateTransmissionCoefficient } from "@/lib/physics";

type Stage = "classical" | "tunneling" | "resonance";

export default function P504Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].p5_04 || translations.EN.p5_04;

  const [stage, setStage] = useState<Stage>("classical");
  const [particleEnergy, setParticleEnergy] = useState(3); // eV
  const [barrierHeight, setBarrierHeight] = useState(5); // eV
  const [barrierWidth, setBarrierWidth] = useState(2); // nm

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
    
    // Set default values for each stage
    if (newStage === "classical") {
      setParticleEnergy(3);
      setBarrierHeight(5);
      setBarrierWidth(2);
    } else if (newStage === "tunneling") {
      setParticleEnergy(4);
      setBarrierHeight(6);
      setBarrierWidth(1.5);
    } else if (newStage === "resonance") {
      setParticleEnergy(7);
      setBarrierHeight(8);
      setBarrierWidth(1);
    }
  };

  const transmissionCoefficient = calculateTransmissionCoefficient(particleEnergy, barrierHeight, barrierWidth);

  return (
    <ChamberLayout
      title={t?.title || "GP5.04 // QUANTUM TUNNEL"}
      moduleCode="GP5.04"
      difficulty="ELITE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "classical", label: t?.stages?.classical || "CLASSICAL LIMIT" },
        { id: "tunneling", label: t?.stages?.tunneling || "QUANTUM TUNNELING" },
        { id: "resonance", label: t?.stages?.resonance || "RESONANCE" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "GP5.04_QUANTUM_TUNNEL // NODE: CERN"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GP5.04_QUANTUM_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <TunnellingCanvas
            particleEnergy={particleEnergy}
            barrierHeight={barrierHeight}
            barrierWidth={barrierWidth}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "WAVE FUNCTION"}
          </div>
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.transmission || "TRANSMISSION COEFFICIENT"}
            </div>
            <div className="text-4xl text-neon-cyan font-black text-center">
              T = {(transmissionCoefficient * 100).toFixed(2)}%
            </div>
            <div className="text-xs text-white/60 text-center font-mono">
              {particleEnergy < barrierHeight
                ? t?.stages?.tunneling_hint || "Quantum tunneling: T > 0 even when E < V₀"
                : t?.stages?.classical_hint || "Classical: particle has enough energy"}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.wave_function || "WAVE FUNCTION"}
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-cyan mb-1"></div>
                <span className="text-white/60 font-mono text-xs">{t?.labels?.incident || "Incident"}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-pink mb-1"></div>
                <span className="text-white/60 font-mono text-xs">{t?.labels?.reflected || "Reflected"}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-green mb-1"></div>
                <span className="text-white/60 font-mono text-xs">{t?.labels?.transmitted || "Transmitted"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V(x)\psi = E\psi" /></div>
              <div><InlineMath math="T = \frac{1}{1 + \frac{V_0^2 \sinh^2(\kappa a)}{4E(V_0-E)}}" /></div>
              <div><InlineMath math="\kappa = \sqrt{\frac{2m(V_0-E)}{\hbar^2}}" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: QUANTUM TUNNELING"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Explore quantum tunneling through potential barriers. Observe wave function behavior."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "classical" && (t?.stages?.classical_desc || "Particle energy below barrier (E < V₀)")}
            {stage === "tunneling" && (t?.stages?.tunneling_desc || "Observe tunneling probability")}
            {stage === "resonance" && (t?.stages?.resonance_desc || "Find resonance conditions (T ≈ 1)")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.particle_energy || "PARTICLE ENERGY (E)"}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={particleEnergy}
                onChange={(e) => setParticleEnergy(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{particleEnergy.toFixed(1)} eV</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.barrier_height || "BARRIER HEIGHT (V₀)"}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="2"
                max="12"
                step="0.5"
                value={barrierHeight}
                onChange={(e) => setBarrierHeight(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{barrierHeight.toFixed(1)} eV</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.barrier_width || "BARRIER WIDTH (a)"}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={barrierWidth}
                onChange={(e) => setBarrierWidth(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-black w-20 text-right">{barrierWidth.toFixed(1)} nm</span>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "classical" && (t?.stages?.classical_hint || "Classical physics: T = 0 when E < V₀")}
              {stage === "tunneling" && (t?.stages?.tunneling_hint || "Quantum mechanics: T > 0 even when E < V₀")}
              {stage === "resonance" && (t?.stages?.resonance_hint || "Resonance occurs at specific E/V₀ ratios")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
