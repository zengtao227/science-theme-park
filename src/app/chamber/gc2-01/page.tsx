"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MoleculeAssembler from "@/components/chamber/gc2-01/MoleculeAssembler";

type Stage = "ALKANES" | "ALCOHOLS" | "CUSTOM";

export default function GC201Page() {
  const { currentLanguage } = useAppStore();
  const locale = translations[currentLanguage] as typeof translations.EN;
  const t = locale.gc2_01 || translations.EN.gc2_01;

  const [stage, setStage] = useState<Stage>("ALKANES");
  const [molecularFormula, setMolecularFormula] = useState("C");
  const [iupacName, setIupacName] = useState("methane");
  const [atomCount, setAtomCount] = useState({ C: 1, H: 0, O: 0, N: 0 });

  const handleMoleculeChange = (formula: string, atoms: { type: string }[], name: string) => {
    setMolecularFormula(formula);
    setIupacName(name);

    // Count atoms
    const counts = { C: 0, H: 0, O: 0, N: 0 };
    atoms.forEach((atom) => {
      if (atom.type in counts) {
        counts[atom.type as keyof typeof counts]++;
      }
    });
    setAtomCount(counts);
  };

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
  };

  // Calculate molecular mass
  const atomicMasses = { C: 12, H: 1, O: 16, N: 14 };
  const molecularMass =
    atomCount.C * atomicMasses.C +
    atomCount.H * atomicMasses.H +
    atomCount.O * atomicMasses.O +
    atomCount.N * atomicMasses.N;

  return (
    <ChamberLayout
      title={t?.title || "GC2.01 // CARBON KINGDOM"}
      moduleCode="GC2.01"
      difficulty="CORE"
      onDifficultyChange={() => { }}
      stages={[
        { id: "ALKANES", label: t?.stages?.alkanes || "ALKANES" },
        { id: "ALCOHOLS", label: t?.stages?.alcohols || "ALCOHOLS" },
        { id: "CUSTOM", label: t?.stages?.custom || "CUSTOM" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => { }}
      onNext={() => { }}
      checkStatus={null}
      footerLeft={t?.footer_left || "GC2.01_CARBON_KINGDOM // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GC2.01_MOLECULE_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "MOLECULAR STRUCTURE"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formula || "MOLECULAR FORMULA"}
            </div>
            <div className="text-3xl text-white font-black text-center">
              <InlineMath math={molecularFormula || "C"} />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.iupac_name || "IUPAC NAME"}
            </div>
            <div className="text-xl text-white font-black text-center uppercase tracking-[0.2em]">
              {iupacName}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.composition || "COMPOSITION"}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Carbon (C):</span>
                <span className="text-white font-black">{atomCount.C}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Hydrogen (H):</span>
                <span className="text-white font-black">{atomCount.H}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Oxygen (O):</span>
                <span className="text-white font-black">{atomCount.O}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Nitrogen (N):</span>
                <span className="text-white font-black">{atomCount.N}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-white/60 font-mono">
                  {t?.labels?.molecular_mass || "Molecular Mass"}:
                </span>
                <span className="text-neon-cyan font-black">{molecularMass} g/mol</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.hints || "HINTS"}
            </div>
            <div className="text-xs text-white/70 font-mono space-y-1">
              <div>• {t?.hints?.select_atom || "Click an atom to select it"}</div>
              <div>• {t?.hints?.add_atom || "Click atom tool to add new atom"}</div>
              <div>• {t?.hints?.bonds || "Atoms connect based on valence rules"}</div>
              <div>• {t?.hints?.delete || "Use DELETE to remove selected atom"}</div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: ORGANIC SYNTHESIS"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Build organic molecules atom by atom. Master carbon chains and functional groups."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "ALKANES" && (t?.stages?.alkanes_desc || "Build alkane chains (C-C-C)")}
            {stage === "ALCOHOLS" && (t?.stages?.alcohols_desc || "Add hydroxyl groups (C-OH)")}
            {stage === "CUSTOM" && (t?.stages?.custom_desc || "Free synthesis mode")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-5xl mx-auto w-full">
          <MoleculeAssembler onMoleculeChange={handleMoleculeChange} />
        </div>
      </div>
    </ChamberLayout>
  );
}
