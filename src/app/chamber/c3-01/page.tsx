"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MoleculeCanvas from "@/components/chamber/c3-01/MoleculeCanvas";

type Stage = "ASPIRIN" | "CAFFEINE";

export default function C301Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].c3_01 || translations.EN.c3_01;

  const [stage, setStage] = useState<Stage>("ASPIRIN");
  const [completed, setCompleted] = useState(false);

  return (
    <ChamberLayout
      title={t?.title || "C3.01 // MOLECULAR ARCHITECT"}
      moduleCode="C3.01"
      difficulty="CORE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "ASPIRIN", label: t?.stages?.aspirin || "ASPIRIN" },
        { id: "CAFFEINE", label: t?.stages?.caffeine || "CAFFEINE" },
      ]}
      currentStage={stage}
      onStageChange={(s) => setStage(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "C3.01_MOLECULAR_ARCHITECT // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "C3.01_MOLECULE_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <MoleculeCanvas
            target={stage}
            onComplete={() => setCompleted(true)}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "MOLECULAR STRUCTURE"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.hints || "HINTS"}
            </div>
            <div className="text-white/70 text-sm font-mono">
              {stage === "ASPIRIN" 
                ? "Aspirin contains a benzene ring, acetyl group, and carboxyl group."
                : "Caffeine contains a purine-derived bicyclic structure with methylxanthine."}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description || "Assemble pharmaceutical molecules using ball-and-stick models. Rotate and observe the 3D structure."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "ASPIRIN" ? "C₉H₈O₄" : "C₈H₁₀N₄O₂"}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="text-center space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              MOLECULAR FORMULA
            </div>
            <div className="text-2xl font-black text-white">
              {stage === "ASPIRIN" ? "Aspirin (Acetylsalicylic Acid)" : "Caffeine (Trimethylxanthine)"}
            </div>
            <div className="text-sm text-white/60 font-mono">
              {stage === "ASPIRIN" 
                ? "Used as analgesic and anti-inflammatory drug"
                : "Central nervous system stimulant"}
            </div>
          </div>
          {completed && (
            <div className="text-center text-green-400 font-black text-lg animate-pulse">
              ✓ STRUCTURE VERIFIED
            </div>
          )}
        </div>
      </div>
    </ChamberLayout>
  );
}
