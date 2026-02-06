"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AtomCanvas from "@/components/chamber/sc1-03/AtomCanvas";

type Stage = "BUILD" | "ELEMENTS" | "ISOTOPES";

// Periodic table data (first 20 elements)
const elements = [
  { z: 1, symbol: "H", name: "Hydrogen", neutrons: 0 },
  { z: 2, symbol: "He", name: "Helium", neutrons: 2 },
  { z: 3, symbol: "Li", name: "Lithium", neutrons: 4 },
  { z: 4, symbol: "Be", name: "Beryllium", neutrons: 5 },
  { z: 5, symbol: "B", name: "Boron", neutrons: 6 },
  { z: 6, symbol: "C", name: "Carbon", neutrons: 6 },
  { z: 7, symbol: "N", name: "Nitrogen", neutrons: 7 },
  { z: 8, symbol: "O", name: "Oxygen", neutrons: 8 },
  { z: 9, symbol: "F", name: "Fluorine", neutrons: 10 },
  { z: 10, symbol: "Ne", name: "Neon", neutrons: 10 },
  { z: 11, symbol: "Na", name: "Sodium", neutrons: 12 },
  { z: 12, symbol: "Mg", name: "Magnesium", neutrons: 12 },
  { z: 13, symbol: "Al", name: "Aluminum", neutrons: 14 },
  { z: 14, symbol: "Si", name: "Silicon", neutrons: 14 },
  { z: 15, symbol: "P", name: "Phosphorus", neutrons: 16 },
  { z: 16, symbol: "S", name: "Sulfur", neutrons: 16 },
  { z: 17, symbol: "Cl", name: "Chlorine", neutrons: 18 },
  { z: 18, symbol: "Ar", name: "Argon", neutrons: 22 },
  { z: 19, symbol: "K", name: "Potassium", neutrons: 20 },
  { z: 20, symbol: "Ca", name: "Calcium", neutrons: 20 },
];

export default function SC103Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].sc1_03 || translations.EN.sc1_03;

  const [stage, setStage] = useState<Stage>("BUILD");
  const [protons, setProtons] = useState(6);
  const [neutrons, setNeutrons] = useState(6);
  const [electrons, setElectrons] = useState(6);

  const atomicNumber = protons; // Z
  const massNumber = protons + neutrons; // A
  const charge = protons - electrons;

  const currentElement = elements.find((el) => el.z === protons);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
    if (newStage === "ELEMENTS") {
      // Carbon by default
      setProtons(6);
      setNeutrons(6);
      setElectrons(6);
    } else if (newStage === "ISOTOPES") {
      // Carbon-14 isotope
      setProtons(6);
      setNeutrons(8);
      setElectrons(6);
    }
  };

  const loadElement = (element: typeof elements[0]) => {
    setProtons(element.z);
    setNeutrons(element.neutrons);
    setElectrons(element.z);
  };

  return (
    <ChamberLayout
      title={t?.title || "SC1.03 // ATOMS FORGE"}
      moduleCode="SC1.03"
      difficulty="CORE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "BUILD", label: t?.stages?.build || "BUILD" },
        { id: "ELEMENTS", label: t?.stages?.elements || "ELEMENTS" },
        { id: "ISOTOPES", label: t?.stages?.isotopes || "ISOTOPES" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "SC1.03_ATOMS_FORGE // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "SC1.03_ATOM_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <AtomCanvas protons={protons} neutrons={neutrons} electrons={electrons} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "ATOMIC STRUCTURE"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.properties || "PROPERTIES"}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.element || "Element"}:</span>
                <span className="text-neon-cyan font-black">
                  {currentElement ? `${currentElement.symbol} (${currentElement.name})` : "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.atomic_number || "Atomic Number (Z)"}:</span>
                <span className="text-neon-green font-black">{atomicNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.mass_number || "Mass Number (A)"}:</span>
                <span className="text-neon-purple font-black">{massNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.charge || "Charge"}:</span>
                <span className={`font-black ${charge === 0 ? "text-white" : charge > 0 ? "text-neon-pink" : "text-neon-cyan"}`}>
                  {charge > 0 ? `+${charge}` : charge}
                </span>
              </div>
            </div>
          </div>

          {stage === "ELEMENTS" && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3 max-h-[200px] overflow-y-auto">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t?.labels?.periodic_table || "PERIODIC TABLE"}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {elements.slice(0, 20).map((el) => (
                  <button
                    key={el.z}
                    onClick={() => loadElement(el)}
                    className={`p-2 rounded border transition-all ${
                      protons === el.z
                        ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                    }`}
                  >
                    <div className="text-xs font-black">{el.symbol}</div>
                    <div className="text-[8px] font-mono">{el.z}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: CYBER FORGE"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description || "Build atoms from subatomic particles. Master the Bohr model and periodic table."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {currentElement ? (
              <InlineMath math={`^{${massNumber}}_{${atomicNumber}}\\text{${currentElement.symbol}}`} />
            ) : (
              <InlineMath math={`^{${massNumber}}_{${atomicNumber}}\\text{?}`} />
            )}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.protons || "PROTONS (p⁺)"}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setProtons(Math.max(1, protons - 1))}
                className="px-4 py-2 bg-neon-pink/20 border border-neon-pink/40 text-neon-pink font-black rounded hover:bg-neon-pink/30 transition-all"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-black text-neon-pink">{protons}</span>
              </div>
              <button
                onClick={() => setProtons(Math.min(20, protons + 1))}
                className="px-4 py-2 bg-neon-pink/20 border border-neon-pink/40 text-neon-pink font-black rounded hover:bg-neon-pink/30 transition-all"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.neutrons || "NEUTRONS (n⁰)"}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setNeutrons(Math.max(0, neutrons - 1))}
                className="px-4 py-2 bg-neon-purple/20 border border-neon-purple/40 text-neon-purple font-black rounded hover:bg-neon-purple/30 transition-all"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-black text-neon-purple">{neutrons}</span>
              </div>
              <button
                onClick={() => setNeutrons(Math.min(30, neutrons + 1))}
                className="px-4 py-2 bg-neon-purple/20 border border-neon-purple/40 text-neon-purple font-black rounded hover:bg-neon-purple/30 transition-all"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.electrons || "ELECTRONS (e⁻)"}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setElectrons(Math.max(0, electrons - 1))}
                className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan font-black rounded hover:bg-neon-cyan/30 transition-all"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-black text-neon-cyan">{electrons}</span>
              </div>
              <button
                onClick={() => setElectrons(Math.min(28, electrons + 1))}
                className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan font-black rounded hover:bg-neon-cyan/30 transition-all"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "BUILD" && (t?.stages?.build_desc || "Free mode: Build any atom configuration")}
              {stage === "ELEMENTS" && (t?.stages?.elements_desc || "Explore the first 20 elements of the periodic table")}
              {stage === "ISOTOPES" && (t?.stages?.isotopes_desc || "Study isotopes: same protons, different neutrons")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
