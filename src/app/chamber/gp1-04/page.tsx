"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TunnellingCanvas from "@/components/chamber/gp1-04/TunnellingCanvas";
import { calculateTransmissionCoefficient } from "@/lib/physics";

type Stage = "classical" | "tunneling" | "resonance";

export default function P104Page() {
  const { currentLanguage } = useAppStore();
  const { t } = useLanguage();
  
  const gp1_04_t = {
    title: t("gp1_04.title"),
    back: t("gp1_04.back"),
    check: t("gp1_04.check"),
    next: t("gp1_04.next"),
    correct: t("gp1_04.correct"),
    incorrect: t("gp1_04.incorrect"),
    ready: t("gp1_04.ready"),
    monitor_title: t("gp1_04.monitor_title"),
    footer_left: t("gp1_04.footer_left"),
    objective_title: t("gp1_04.objective_title"),
    target_title: t("gp1_04.target_title"),
    difficulty: {
      basic: "BASIC",
      core: "CORE",
      advanced: "ADVANCED",
      elite: "ELITE"
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
      resonance_hint: t("gp1_04.stages.resonance_hint")
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
      barrier_width: t("gp1_04.labels.barrier_width")
    },
    mission: {
      title: t("gp1_04.mission.title"),
      description: t("gp1_04.mission.description")
    }
  };

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
      title={gp1_04_t.title}
      moduleCode="GP1.04"
      difficulty="ELITE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "classical", label: gp1_04_t.stages?.classical },
        { id: "tunneling", label: gp1_04_t.stages?.tunneling },
        { id: "resonance", label: gp1_04_t.stages?.resonance },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={gp1_04_t.footer_left}
      translations={{
        back: gp1_04_t.back,
        check: gp1_04_t.check,
        next: gp1_04_t.next,
        correct: gp1_04_t.correct,
        incorrect: gp1_04_t.incorrect,
        ready: gp1_04_t.ready,
        monitor_title: gp1_04_t.monitor_title,
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
            {gp1_04_t.target_title}
          </div>
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {gp1_04_t.labels?.transmission}
            </div>
            <div className="text-4xl text-neon-cyan font-black text-center">
              T = {(transmissionCoefficient * 100).toFixed(2)}%
            </div>
            <div className="text-xs text-white/60 text-center font-mono">
              {particleEnergy < barrierHeight
                ? gp1_04_t.stages?.tunneling_hint
                : gp1_04_t.stages?.classical_hint}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {gp1_04_t.labels?.wave_function}
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-cyan mb-1"></div>
                <span className="text-white/60 font-mono text-xs">{gp1_04_t.labels?.incident}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-pink mb-1"></div>
                <span className="text-white/60 font-mono text-xs">{gp1_04_t.labels?.reflected}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neon-green mb-1"></div>
                <span className="text-white/60 font-mono text-xs">{gp1_04_t.labels?.transmitted}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {gp1_04_t.labels?.formulas}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="-\frac{\hbar^2}{2m}\frac{d^{2}\psi}{dx^2} + V(x)\psi = E\psi" /></div>
              <div><InlineMath math="T = \frac{1}{1 + \frac{V_0^{2} \sinh^{2}(\kappa a)}{4E(V_0-E)}}" /></div>
              <div><InlineMath math="\kappa = \sqrt{\frac{2m(V_0-E)}{\hbar^2}}" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {gp1_04_t.mission?.title}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {gp1_04_t.mission?.description ||
              "Explore quantum tunneling through potential barriers. Observe wave function behavior."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {gp1_04_t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "classical" && (gp1_04_t.stages?.classical_desc)}
            {stage === "tunneling" && (gp1_04_t.stages?.tunneling_desc)}
            {stage === "resonance" && (gp1_04_t.stages?.resonance_desc)}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {gp1_04_t.labels?.particle_energy}
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
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {gp1_04_t.labels?.barrier_height}
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
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {gp1_04_t.labels?.barrier_width}
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
            <div className="text-[10px] text-white/90 font-mono italic">
              {stage === "classical" && (gp1_04_t.stages?.classical_hint)}
              {stage === "tunneling" && (gp1_04_t.stages?.tunneling_hint)}
              {stage === "resonance" && (gp1_04_t.stages?.resonance_hint)}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
