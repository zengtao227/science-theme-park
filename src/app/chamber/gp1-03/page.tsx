"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ColliderCanvas from "@/components/chamber/gp1-03/ColliderCanvas";

type Stage = "acceleration" | "collision" | "detection";

export default function P103Page() {
  const { currentLanguage } = useAppStore();
  const { t } = useLanguage();
  
  const gp1_03_t = {
    title: t("gp1_03.title"),
    back: t("gp1_03.back"),
    check: t("gp1_03.check"),
    next: t("gp1_03.next"),
    correct: t("gp1_03.correct"),
    incorrect: t("gp1_03.incorrect"),
    ready: t("gp1_03.ready"),
    monitor_title: t("gp1_03.monitor_title"),
    footer_left: t("gp1_03.footer_left"),
    objective_title: t("gp1_03.objective_title"),
    target_title: t("gp1_03.target_title"),
    difficulty: {
      basic: "BASIC",
      core: "CORE",
      advanced: "ADVANCED",
      elite: "ELITE"
    },
    stages: {
      acceleration: t("gp1_03.stages.acceleration"),
      collision: t("gp1_03.stages.collision"),
      detection: t("gp1_03.stages.detection"),
      acceleration_desc: t("gp1_03.stages.acceleration_desc"),
      collision_desc: t("gp1_03.stages.collision_desc"),
      detection_desc: t("gp1_03.stages.detection_desc"),
      acceleration_hint: t("gp1_03.stages.acceleration_hint"),
      collision_hint: t("gp1_03.stages.collision_hint"),
      detection_hint: t("gp1_03.stages.detection_hint")
    },
    labels: {
      beam_energy: t("gp1_03.labels.beam_energy"),
      relativistic_effects: t("gp1_03.labels.relativistic_effects"),
      formulas: t("gp1_03.labels.formulas"),
      magnetic_field: t("gp1_03.labels.magnetic_field"),
      colliding: t("gp1_03.labels.colliding"),
      initiate_collision: t("gp1_03.labels.initiate_collision")
    },
    mission: {
      title: t("gp1_03.mission.title"),
      description: t("gp1_03.mission.description")
    }
  };

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
  const restMass = 0.938; // GeV/c^{2} (proton rest mass)
  const gamma = energy * 1000 / restMass; // Lorentz factor
  const relativisticMass = gamma * restMass;

  return (
    <ChamberLayout
      title={gp1_03_t.title}
      moduleCode="GP1.03"
      difficulty="ELITE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "acceleration", label: gp1_03_t.stages?.acceleration },
        { id: "collision", label: gp1_03_t.stages?.collision },
        { id: "detection", label: gp1_03_t.stages?.detection },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={gp1_03_t.footer_left}
      translations={{
        back: gp1_03_t.back,
        check: gp1_03_t.check,
        next: gp1_03_t.next,
        correct: gp1_03_t.correct,
        incorrect: gp1_03_t.incorrect,
        ready: gp1_03_t.ready,
        monitor_title: gp1_03_t.monitor_title,
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
            {gp1_03_t.target_title}
          </div>
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {gp1_03_t.labels?.beam_energy}
            </div>
            <div className="text-4xl text-neon-cyan font-black text-center">
              E = {energy.toFixed(1)} TeV
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {gp1_03_t.labels?.relativistic_effects}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">γ (Lorentz):</span>
                <span className="text-neon-purple font-black">{gamma.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">m (effective):</span>
                <span className="text-neon-amber font-black">{relativisticMass.toFixed(1)} GeV/c^{2}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {gp1_03_t.labels?.formulas}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="E = \gamma mc^{2}" /></div>
              <div><InlineMath math="\gamma = \frac{1}{\sqrt{1 - v^{2}/c^2}}" /></div>
              <div><InlineMath math="F = qvB \text{ (Lorentz force)}" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {gp1_03_t.mission?.title}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {gp1_03_t.mission?.description ||
              "Explore particle collisions at CERN's Large Hadron Collider. Discover the Higgs boson."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {gp1_03_t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "acceleration" && (gp1_03_t.stages?.acceleration_desc)}
            {stage === "collision" && (gp1_03_t.stages?.collision_desc)}
            {stage === "detection" && (gp1_03_t.stages?.detection_desc)}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {gp1_03_t.labels?.beam_energy}
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
                {gp1_03_t.labels?.magnetic_field}
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCollide}
              disabled={isColliding}
              className="px-8 py-4 bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan text-lg font-black rounded-lg hover:bg-neon-cyan/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isColliding ? (gp1_03_t.labels?.colliding) : (gp1_03_t.labels?.initiate_collision)}
            </button>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/90 font-mono italic">
              {stage === "acceleration" && (gp1_03_t.stages?.acceleration_hint)}
              {stage === "collision" && (gp1_03_t.stages?.collision_hint)}
              {stage === "detection" && (gp1_03_t.stages?.detection_hint)}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
