"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AtomBuilder from "@/components/chamber/sc1-04/AtomBuilder";

type Stage = "build" | "periodic" | "groups";

// Element data (first 20 elements)
const elements = [
  { symbol: "H", name: "Hydrogen", protons: 1, neutrons: 0, electrons: 1, group: 1, period: 1 },
  { symbol: "He", name: "Helium", protons: 2, neutrons: 2, electrons: 2, group: 18, period: 1 },
  { symbol: "Li", name: "Lithium", protons: 3, neutrons: 4, electrons: 3, group: 1, period: 2 },
  { symbol: "Be", name: "Beryllium", protons: 4, neutrons: 5, electrons: 4, group: 2, period: 2 },
  { symbol: "B", name: "Boron", protons: 5, neutrons: 6, electrons: 5, group: 13, period: 2 },
  { symbol: "C", name: "Carbon", protons: 6, neutrons: 6, electrons: 6, group: 14, period: 2 },
  { symbol: "N", name: "Nitrogen", protons: 7, neutrons: 7, electrons: 7, group: 15, period: 2 },
  { symbol: "O", name: "Oxygen", protons: 8, neutrons: 8, electrons: 8, group: 16, period: 2 },
  { symbol: "F", name: "Fluorine", protons: 9, neutrons: 10, electrons: 9, group: 17, period: 2 },
  { symbol: "Ne", name: "Neon", protons: 10, neutrons: 10, electrons: 10, group: 18, period: 2 },
  { symbol: "Na", name: "Sodium", protons: 11, neutrons: 12, electrons: 11, group: 1, period: 3 },
  { symbol: "Mg", name: "Magnesium", protons: 12, neutrons: 12, electrons: 12, group: 2, period: 3 },
  { symbol: "Al", name: "Aluminum", protons: 13, neutrons: 14, electrons: 13, group: 13, period: 3 },
  { symbol: "Si", name: "Silicon", protons: 14, neutrons: 14, electrons: 14, group: 14, period: 3 },
  { symbol: "P", name: "Phosphorus", protons: 15, neutrons: 16, electrons: 15, group: 15, period: 3 },
  { symbol: "S", name: "Sulfur", protons: 16, neutrons: 16, electrons: 16, group: 16, period: 3 },
  { symbol: "Cl", name: "Chlorine", protons: 17, neutrons: 18, electrons: 17, group: 17, period: 3 },
  { symbol: "Ar", name: "Argon", protons: 18, neutrons: 22, electrons: 18, group: 18, period: 3 },
  { symbol: "K", name: "Potassium", protons: 19, neutrons: 20, electrons: 19, group: 1, period: 4 },
  { symbol: "Ca", name: "Calcium", protons: 20, neutrons: 20, electrons: 20, group: 2, period: 4 },
];

export default function SC104Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].sc1_04 || translations.EN.sc1_04;

  const [stage, setStage] = useState<Stage>("build");
  const [selectedElement, setSelectedElement] = useState(0); // Index in elements array
  const [customProtons, setCustomProtons] = useState(1);
  const [customNeutrons, setCustomNeutrons] = useState(0);
  const [customElectrons, setCustomElectrons] = useState(1);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
    if (newStage === "build") {
      setCustomProtons(1);
      setCustomNeutrons(0);
      setCustomElectrons(1);
    } else if (newStage === "periodic") {
      setSelectedElement(0);
    }
  };

  const currentElement = stage === "build" 
    ? { protons: customProtons, neutrons: customNeutrons, electrons: customElectrons }
    : elements[selectedElement];

  const atomicNumber = currentElement.protons;
  const massNumber = currentElement.protons + currentElement.neutrons;

  return (
    <ChamberLayout
      title={t?.title || "SC1.04 // PERIODIC PUZZLE"}
      moduleCode="SC1.04"
      difficulty="BASIC"
      onDifficultyChange={() => {}}
      stages={[
        { id: "build", label: t?.stages?.build || "BUILD ATOM" },
        { id: "periodic", label: t?.stages?.periodic || "PERIODIC TABLE" },
        { id: "groups", label: t?.stages?.groups || "ELEMENT GROUPS" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "SC1.04_PERIODIC_PUZZLE // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "SC1.04_ATOM_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <AtomBuilder
            protons={currentElement.protons}
            neutrons={currentElement.neutrons}
            electrons={currentElement.electrons}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "ATOM STRUCTURE"}
          </div>
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.element_info || "ELEMENT INFO"}
            </div>
            {stage !== "build" && (
              <div className="text-2xl text-white font-black text-center">
                {elements[selectedElement].symbol} - {elements[selectedElement].name}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Z (Atomic #):</span>
                <span className="text-neon-pink font-black">{atomicNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">A (Mass #):</span>
                <span className="text-neon-purple font-black">{massNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Protons:</span>
                <span className="text-neon-pink font-black">{currentElement.protons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Neutrons:</span>
                <span className="text-neon-purple font-black">{currentElement.neutrons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">Electrons:</span>
                <span className="text-neon-cyan font-black">{currentElement.electrons}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="Z = \text{protons}" /></div>
              <div><InlineMath math="A = \text{protons} + \text{neutrons}" /></div>
              <div><InlineMath math="\text{Electron shells: } 2, 8, 8, 18..." /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: PERIODIC TABLE"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Build atoms and discover the periodic table. Master electron configuration."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "build" && (t?.stages?.build_desc || "Build atoms by adding protons, neutrons, and electrons")}
            {stage === "periodic" && (t?.stages?.periodic_desc || "Explore the first 20 elements")}
            {stage === "groups" && (t?.stages?.groups_desc || "Understand element groups and periods")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {stage === "build" && (
            <>
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  {t?.labels?.protons || "PROTONS"}
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={customProtons}
                    onChange={(e) => setCustomProtons(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-white font-black w-12 text-right">{customProtons}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  {t?.labels?.neutrons || "NEUTRONS"}
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={customNeutrons}
                    onChange={(e) => setCustomNeutrons(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-white font-black w-12 text-right">{customNeutrons}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  {t?.labels?.electrons || "ELECTRONS"}
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={customElectrons}
                    onChange={(e) => setCustomElectrons(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-white font-black w-12 text-right">{customElectrons}</span>
                </div>
              </div>
            </>
          )}

          {stage === "periodic" && (
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                {t?.labels?.select_element || "SELECT ELEMENT"}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {elements.map((element, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedElement(index)}
                    className={`p-3 border-2 rounded-lg font-black transition-all ${
                      selectedElement === index
                        ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                        : "border-white/20 bg-white/5 text-white hover:border-white/40"
                    }`}
                  >
                    <div className="text-xs">{element.protons}</div>
                    <div className="text-lg">{element.symbol}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "build" && (t?.stages?.build_hint || "Proton number determines the element")}
              {stage === "periodic" && (t?.stages?.periodic_hint || "Elements are arranged by atomic number")}
              {stage === "groups" && (t?.stages?.groups_hint || "Same group = same valence electrons")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
