"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import RelativityCanvas from "@/components/chamber/p5-02/RelativityCanvas";

type Stage = "TIME_DILATION" | "LENGTH_CONTRACTION" | "DOPPLER";

export default function P502Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].p5_02 || translations.EN.p5_02;

  const [stage, setStage] = useState<Stage>("TIME_DILATION");
  const [velocity, setVelocity] = useState(0.5); // fraction of c

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
  };

  // Lorentz factor: γ = 1/√(1 - v²/c²)
  const gamma = 1 / Math.sqrt(1 - velocity * velocity);
  
  // Time dilation: Δt = γ * Δt₀
  const properTime = 1; // seconds
  const dilatedTime = gamma * properTime;
  
  // Length contraction: L = L₀/γ
  const restLength = 100; // meters
  const contractedLength = restLength / gamma;
  
  // Relativistic Doppler shift
  const dopplerFactor = Math.sqrt((1 + velocity) / (1 - velocity));

  return (
    <ChamberLayout
      title={t?.title || "GP5.02 // RELATIVITY LAB"}
      moduleCode="GP5.02"
      difficulty="ELITE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "TIME_DILATION", label: t?.stages?.time_dilation || "TIME DILATION" },
        { id: "LENGTH_CONTRACTION", label: t?.stages?.length_contraction || "LENGTH CONTRACTION" },
        { id: "DOPPLER", label: t?.stages?.doppler || "DOPPLER EFFECT" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "GP5.02_RELATIVITY_LAB // NODE: CERN"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GP5.02_RELATIVITY_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <RelativityCanvas velocity={velocity} showPhotonClock={stage === "TIME_DILATION"} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "LORENTZ TRANSFORMATION"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.velocity || "VELOCITY"}
            </div>
            <div className="text-2xl text-white font-black text-center">
              <InlineMath math={`v = ${(velocity * 100).toFixed(1)}\\% \\, c`} />
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.lorentz_factor || "Lorentz Factor (γ)"}:</span>
                <span className="text-neon-cyan font-black">{gamma.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {stage === "TIME_DILATION" && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t?.labels?.time_dilation || "TIME DILATION"}
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60 font-mono">{t?.labels?.proper_time || "Proper Time (Δt₀)"}:</span>
                  <span className="text-neon-green font-black">{properTime.toFixed(2)} s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 font-mono">{t?.labels?.dilated_time || "Dilated Time (Δt)"}:</span>
                  <span className="text-neon-purple font-black">{dilatedTime.toFixed(3)} s</span>
                </div>
              </div>
            </div>
          )}

          {stage === "LENGTH_CONTRACTION" && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t?.labels?.length_contraction || "LENGTH CONTRACTION"}
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60 font-mono">{t?.labels?.rest_length || "Rest Length (L₀)"}:</span>
                  <span className="text-neon-green font-black">{restLength.toFixed(1)} m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 font-mono">{t?.labels?.contracted_length || "Contracted Length (L)"}:</span>
                  <span className="text-neon-purple font-black">{contractedLength.toFixed(2)} m</span>
                </div>
              </div>
            </div>
          )}

          {stage === "DOPPLER" && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t?.labels?.doppler_effect || "RELATIVISTIC DOPPLER"}
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60 font-mono">{t?.labels?.doppler_factor || "Doppler Factor"}:</span>
                  <span className="text-neon-amber font-black">{dopplerFactor.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 font-mono">{t?.labels?.shift_type || "Shift Type"}:</span>
                  <span className={velocity > 0.5 ? "text-neon-pink font-black" : "text-neon-cyan font-black"}>
                    {velocity > 0.5 ? (t?.labels?.red_shift || "Red Shift") : (t?.labels?.blue_shift || "Blue Shift")}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}" /></div>
              {stage === "TIME_DILATION" && <div><InlineMath math="\Delta t = \gamma \Delta t_0" /></div>}
              {stage === "LENGTH_CONTRACTION" && <div><InlineMath math="L = \frac{L_0}{\gamma}" /></div>}
              {stage === "DOPPLER" && <div><InlineMath math="f_{obs} = f_0 \sqrt{\frac{1 + \beta}{1 - \beta}}" /></div>}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: SPECIAL RELATIVITY"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Explore Einstein's special relativity at CERN. Observe time dilation and length contraction."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "TIME_DILATION" && (t?.stages?.time_dilation_desc || "Observe photon clocks at relativistic speeds")}
            {stage === "LENGTH_CONTRACTION" && (t?.stages?.length_contraction_desc || "Measure particle length contraction")}
            {stage === "DOPPLER" && (t?.stages?.doppler_desc || "Analyze relativistic Doppler shift")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.particle_velocity || "PARTICLE VELOCITY (v/c)"}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-mono">v/c =</span>
              <input
                type="range"
                min="0"
                max="0.99"
                step="0.01"
                value={velocity}
                onChange={(e) => setVelocity(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xl font-black text-white min-w-[80px]">
                {(velocity * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "TIME_DILATION" && (t?.stages?.time_dilation_hint || "Moving clocks run slower: Δt = γΔt₀")}
              {stage === "LENGTH_CONTRACTION" && (t?.stages?.length_contraction_hint || "Moving objects contract: L = L₀/γ")}
              {stage === "DOPPLER" && (t?.stages?.doppler_hint || "Light shifts red (receding) or blue (approaching)")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
