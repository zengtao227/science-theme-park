"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CrystalCanvas from "@/components/chamber/gc3-02/CrystalCanvas";

type Stage = "SC" | "BCC" | "FCC";
type LatticeType = "SC" | "BCC" | "FCC";

export default function GC302Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].gc3_02 || translations.EN.gc3_02;

  const [stage, setStage] = useState<Stage>("SC");
  const [showVoids, setShowVoids] = useState(false);
  const [slicePosition, setSlicePosition] = useState<number | undefined>(undefined);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
    setShowVoids(false);
    setSlicePosition(undefined);
  };

  // Crystal structure data
  const structureData: Record<LatticeType, { 
    atomsPerCell: number; 
    coordinationNumber: number; 
    packingEfficiency: number;
    tetrahedralVoids: number;
    octahedralVoids: number;
  }> = {
    "SC": { 
      atomsPerCell: 1, 
      coordinationNumber: 6, 
      packingEfficiency: 52,
      tetrahedralVoids: 0,
      octahedralVoids: 1
    },
    "BCC": { 
      atomsPerCell: 2, 
      coordinationNumber: 8, 
      packingEfficiency: 68,
      tetrahedralVoids: 0,
      octahedralVoids: 4
    },
    "FCC": { 
      atomsPerCell: 4, 
      coordinationNumber: 12, 
      packingEfficiency: 74,
      tetrahedralVoids: 8,
      octahedralVoids: 4
    },
  };

  const currentData = structureData[stage];

  return (
    <ChamberLayout
      title={t?.title || "GC3.02 // CRYSTAL PALACE"}
      moduleCode="GC3.02"
      difficulty="ELITE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "SC", label: t?.stages?.sc || "SIMPLE CUBIC" },
        { id: "BCC", label: t?.stages?.bcc || "BODY-CENTERED" },
        { id: "FCC", label: t?.stages?.fcc || "FACE-CENTERED" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "GC3.02_CRYSTAL_PALACE // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GC3.02_CRYSTAL_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <CrystalCanvas
            latticeType={stage}
            showVoids={showVoids}
            slicePosition={slicePosition}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "CRYSTAL STRUCTURE"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.lattice_type || "LATTICE TYPE"}
            </div>
            <div className="text-2xl text-white font-black text-center">
              {stage === "SC" && "Simple Cubic (SC)"}
              {stage === "BCC" && "Body-Centered Cubic (BCC)"}
              {stage === "FCC" && "Face-Centered Cubic (FCC)"}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.properties || "PROPERTIES"}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.atoms_per_cell || "Atoms/Cell"}:</span>
                <span className="text-neon-cyan font-black">{currentData.atomsPerCell}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.coordination || "Coordination"}:</span>
                <span className="text-neon-purple font-black">{currentData.coordinationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.packing || "Packing"}:</span>
                <span className="text-neon-green font-black">{currentData.packingEfficiency}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.tet_voids || "Tet. Voids"}:</span>
                <span className="text-neon-amber font-black">{currentData.tetrahedralVoids}</span>
              </div>
            </div>
          </div>

          {showVoids && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t?.labels?.voids || "INTERSTITIAL VOIDS"}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-amber"></div>
                  <span className="text-white/60 font-mono">{t?.labels?.tetrahedral || "Tetrahedral"}:</span>
                  <span className="text-white font-black">{currentData.tetrahedralVoids}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-pink"></div>
                  <span className="text-white/60 font-mono">{t?.labels?.octahedral || "Octahedral"}:</span>
                  <span className="text-white font-black">{currentData.octahedralVoids}</span>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="\text{Packing Efficiency} = \frac{V_{atoms}}{V_{cell}} \times 100\%" /></div>
              <div><InlineMath math="\text{Coordination Number} = \text{nearest neighbors}" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: SOLID STATE PHYSICS"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Explore crystal structures and Bravais lattices. Understand atomic packing and coordination."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "SC" && (t?.stages?.sc_desc || "Study simple cubic lattice (6 coordination)")}
            {stage === "BCC" && (t?.stages?.bcc_desc || "Analyze body-centered cubic (8 coordination)")}
            {stage === "FCC" && (t?.stages?.fcc_desc || "Master face-centered cubic (12 coordination)")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="showVoids"
                checked={showVoids}
                onChange={(e) => setShowVoids(e.target.checked)}
                className="w-5 h-5"
              />
              <label htmlFor="showVoids" className="text-sm text-white font-black cursor-pointer">
                {t?.labels?.show_voids || "Show Interstitial Voids"}
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
              {t?.labels?.slice_plane || "SLICE PLANE (Y-AXIS)"}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={slicePosition ?? 0.5}
                onChange={(e) => setSlicePosition(parseFloat(e.target.value))}
                className="flex-1"
              />
              <button
                onClick={() => setSlicePosition(undefined)}
                className="px-4 py-2 bg-white/10 border border-white/60 text-white text-sm font-black rounded hover:bg-white/60"
              >
                {t?.labels?.reset_slice || "Reset"}
              </button>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/90 font-mono italic">
              {stage === "SC" && (t?.stages?.sc_hint || "Lowest packing efficiency (52%)")}
              {stage === "BCC" && (t?.stages?.bcc_hint || "Moderate packing (68%), metals like Fe, Cr")}
              {stage === "FCC" && (t?.stages?.fcc_hint || "Highest packing (74%), metals like Cu, Al, Au")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
