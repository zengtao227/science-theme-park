"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EquilibriumCanvas from "@/components/chamber/gc3-01/EquilibriumCanvas";

type Stage = "CONCENTRATION" | "TEMPERATURE" | "PRESSURE";

export default function GC301Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].gc3_01 || translations.EN.gc3_01;

  const [stage, setStage] = useState<Stage>("CONCENTRATION");
  const [temperature, setTemperature] = useState(50);
  const [pressure, setPressure] = useState(50);
  const [concentrationA, setConcentrationA] = useState(50);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
  };

  // Calculate particle counts based on equilibrium
  const equilibriumShift = concentrationA / 100;
  const countA = Math.floor(20 * (1 - equilibriumShift * 0.5));
  const countB = Math.floor(20 * (1 - equilibriumShift * 0.5));
  const countC = Math.floor(15 * (1 + equilibriumShift * 0.7));
  const countD = Math.floor(15 * (1 + equilibriumShift * 0.7));

  return (
    <ChamberLayout
      title={t?.title || "GC3.01 // EQUILIBRIUM MASTER"}
      moduleCode="GC3.01"
      difficulty="ELITE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "CONCENTRATION", label: t?.stages?.concentration || "CONCENTRATION" },
        { id: "TEMPERATURE", label: t?.stages?.temperature || "TEMPERATURE" },
        { id: "PRESSURE", label: t?.stages?.pressure || "PRESSURE" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "GC3.01_EQUILIBRIUM_MASTER // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GC3.01_EQUILIBRIUM_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <EquilibriumCanvas
            temperature={temperature}
            pressure={pressure}
            concentrationA={concentrationA}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "CHEMICAL EQUILIBRIUM"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.reaction || "REVERSIBLE REACTION"}
            </div>
            <div className="text-xl text-white font-black text-center">
              <InlineMath math="A + B \rightleftharpoons C + D" />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.particle_count || "PARTICLE COUNT"}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">A (cyan):</span>
                <span className="text-neon-cyan font-black">{countA}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">B (purple):</span>
                <span className="text-neon-purple font-black">{countB}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">C (green):</span>
                <span className="text-neon-green font-black">{countC}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">D (pink):</span>
                <span className="text-neon-pink font-black">{countD}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.conditions || "CONDITIONS"}
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.temperature || "Temperature"}:</span>
                <span className="text-neon-amber font-black">{temperature}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.pressure || "Pressure"}:</span>
                <span className="text-neon-cyan font-black">{pressure}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.concentration || "[A]"}:</span>
                <span className="text-neon-purple font-black">{concentrationA}%</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.principle || "LE CHATELIER'S PRINCIPLE"}
            </div>
            <div className="text-white font-black text-xs space-y-1">
              <div>{t?.labels?.principle_1 || "• Add reactant → shifts right (more products)"}</div>
              <div>{t?.labels?.principle_2 || "• Increase pressure → shifts to fewer molecules"}</div>
              <div>{t?.labels?.principle_3 || "• Increase temperature → shifts endothermic direction"}</div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: CHEMICAL EQUILIBRIUM"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Master Le Chatelier's Principle. Observe how systems respond to stress."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "CONCENTRATION" && (t?.stages?.concentration_desc || "Add reactant A and watch equilibrium shift")}
            {stage === "TEMPERATURE" && (t?.stages?.temperature_desc || "Increase temperature and observe particle speed")}
            {stage === "PRESSURE" && (t?.stages?.pressure_desc || "Change pressure and see volume effects")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {stage === "CONCENTRATION" && (
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                {t?.labels?.add_reactant || "ADD REACTANT A"}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/60 font-mono">[A] =</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={concentrationA}
                  onChange={(e) => setConcentrationA(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xl font-black text-white min-w-[60px]">
                  {concentrationA}%
                </span>
              </div>
            </div>
          )}

          {stage === "TEMPERATURE" && (
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                {t?.labels?.system_temperature || "SYSTEM TEMPERATURE"}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/60 font-mono">T =</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xl font-black text-white min-w-[60px]">
                  {temperature}%
                </span>
              </div>
            </div>
          )}

          {stage === "PRESSURE" && (
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                {t?.labels?.system_pressure || "SYSTEM PRESSURE"}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/60 font-mono">P =</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xl font-black text-white min-w-[60px]">
                  {pressure}%
                </span>
              </div>
            </div>
          )}

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "CONCENTRATION" && (t?.stages?.concentration_hint || "Higher [A] shifts equilibrium right → more C and D")}
              {stage === "TEMPERATURE" && (t?.stages?.temperature_hint || "Higher temperature increases particle kinetic energy")}
              {stage === "PRESSURE" && (t?.stages?.pressure_hint || "Higher pressure decreases container volume")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
