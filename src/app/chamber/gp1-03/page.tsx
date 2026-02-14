"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ColliderCanvas from "@/components/chamber/gp1-03/ColliderCanvas";

type Stage = "acceleration" | "collision" | "detection";

export default function P103Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].gp1_03 || translations.EN.gp1_03;

  const [stage, setStage] = useState<Stage>("acceleration");
  const [energy, setEnergy] = useState(7); // TeV
  const [magneticField, setMagneticField] = useState(true);
  const [isColliding, setIsColliding] = useState(false);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
    setIsColliding(false);
    
    if (newStage === "acceleration") {
      setEnergy(7);
      setMagneticField(true);
    } else if (newStage === "collision") {
      setEnergy(13);
      setMagneticField(true);
    } else if (newStage === "detection") {
      setEnergy(13);
      setMagneticField(true);
    }
  };

  const handleCollide = () => {
    setIsColliding(true);
    setTimeout(() => setIsColliding(false), 2000);
  };

  // Calculate relativistic mass increase
  const restMass = 0.938; // GeV/c² (proton rest mass)
  const gamma = energy * 1000 / restMass; // Lorentz factor
  const relativisticMass = gamma * restMass;

  return (
    <ChamberLayout
      title={t?.title || "GP1.03 // PARTICLE COLLIDER"}
      moduleCode="GP1.03"
      difficulty="ELITE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "acceleration", label: t?.stages?.acceleration || "ACCELERATION" },
        { id: "collision", label: t?.stages?.collision || "COLLISION" },
        { id: "detection", label: t?.stages?.detection || "DETECTION" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "GP1.03_PARTICLE_COLLIDER // NODE: CERN"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GP1.03_LHC_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <ColliderCanvas
            energy={energy}
            magneticField={magneticField}
            isColliding={isColliding}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "LHC ATLAS DETECTOR"}
          </div>
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.beam_energy || "BEAM ENERGY"}
            </div>
            <div className="text-4xl text-neon-cyan font-black text-center">
              E = {energy.toFixed(1)} TeV
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.relativistic_effects || "RELATIVISTIC EFFECTS"}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">γ (Lorentz):</span>
                <span className="text-neon-purple font-black">{gamma.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">m (effective):</span>
                <span className="text-neon-amber font-black">{relativisticMass.toFixed(1)} GeV/c²</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="E = \gamma mc^2" /></div>
              <div><InlineMath math="\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}" /></div>
              <div><InlineMath math="F = qvB \text{ (Lorentz force)}" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: PARTICLE PHYSICS"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Explore particle collisions at CERN's Large Hadron Collider. Discover the Higgs boson."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "acceleration" && (t?.stages?.acceleration_desc || "Accelerate protons to near light speed")}
            {stage === "collision" && (t?.stages?.collision_desc || "Collide proton beams at 13 TeV")}
            {stage === "detection" && (t?.stages?.detection_desc || "Detect particle jets and tracks")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {t?.labels?.beam_energy || "BEAM ENERGY (TeV)"}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="14"
                step="0.5"
                value={energy}
                onChange={(e) => setEnergy(parseFloat(e.target.value))}
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
                className="w-5 h-5"
              />
              <label htmlFor="magneticField" className="text-sm text-white font-black cursor-pointer">
                {t?.labels?.magnetic_field || "Enable Magnetic Field (Bending Magnets)"}
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCollide}
              disabled={isColliding}
              className="px-8 py-4 bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan text-lg font-black rounded-lg hover:bg-neon-cyan/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isColliding ? (t?.labels?.colliding || "COLLIDING...") : (t?.labels?.initiate_collision || "INITIATE COLLISION")}
            </button>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/90 font-mono italic">
              {stage === "acceleration" && (t?.stages?.acceleration_hint || "Protons reach 99.9999991% speed of light")}
              {stage === "collision" && (t?.stages?.collision_hint || "Collision energy: 13 TeV = 13,000 GeV")}
              {stage === "detection" && (t?.stages?.detection_hint || "Magnetic field bends charged particle tracks")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
