"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
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
  const { t } = useLanguage();
  const sc1_04_t = {
    title: t("sc1_04.title"),
    stages: {
      build: t("sc1_04.stages.build"),
      periodic: t("sc1_04.stages.periodic"),
      groups: t("sc1_04.stages.groups"),
      build_desc: t("sc1_04.stages.build_desc"),
      periodic_desc: t("sc1_04.stages.periodic_desc"),
      groups_desc: t("sc1_04.stages.groups_desc"),
      build_hint: t("sc1_04.stages.build_hint"),
      periodic_hint: t("sc1_04.stages.periodic_hint"),
      groups_hint: t("sc1_04.stages.groups_hint"),
    },
    labels: {
      element_info: t("sc1_04.labels.element_info"),
      formulas: t("sc1_04.labels.formulas"),
      protons: t("sc1_04.labels.protons"),
      neutrons: t("sc1_04.labels.neutrons"),
      electrons: t("sc1_04.labels.electrons"),
      select_element: t("sc1_04.labels.select_element"),
    },
    mission: {
      title: t("sc1_04.mission.title"),
      description: t("sc1_04.mission.description"),
    },
    target_title: t("sc1_04.target_title"),
    objective_title: t("sc1_04.objective_title"),
    footer_left: t("sc1_04.footer_left"),
    back: t("sc1_04.back"),
    check: t("sc1_04.check"),
    next: t("sc1_04.next"),
    correct: t("sc1_04.correct"),
    incorrect: t("sc1_04.incorrect"),
    ready: t("sc1_04.ready"),
    monitor_title: t("sc1_04.monitor_title"),
  };

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
      title={sc1_04_t.title}
      moduleCode="SC1.04"
      difficulty="BASIC"
      onDifficultyChange={() => {}}
      stages={[
        { id: "build", label: sc1_04_t.stages.build },
        { id: "periodic", label: sc1_04_t.stages.periodic },
        { id: "groups", label: sc1_04_t.stages.groups },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={sc1_04_t.footer_left}
      translations={{
        back: sc1_04_t.back,
        check: sc1_04_t.check,
        next: sc1_04_t.next,
        correct: sc1_04_t.correct,
        incorrect: sc1_04_t.incorrect,
        ready: sc1_04_t.ready,
        monitor_title: sc1_04_t.monitor_title,
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
            {sc1_04_t.target_title}
          </div>
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {sc1_04_t.labels.element_info}
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
              {sc1_04_t.labels.formulas}
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
            {sc1_04_t.mission.title}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {sc1_04_t.mission.description}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {sc1_04_t.objective_title}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "build" && sc1_04_t.stages.build_desc}
            {stage === "periodic" && sc1_04_t.stages.periodic_desc}
            {stage === "groups" && sc1_04_t.stages.groups_desc}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {stage === "build" && (
            <>
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  {sc1_04_t.labels.protons}
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
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  {sc1_04_t.labels.neutrons}
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
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  {sc1_04_t.labels.electrons}
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
              <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                {sc1_04_t.labels.select_element}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {elements.map((element, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedElement(index)}
                    className={`p-3 border-2 rounded-lg font-black transition-all ${
                      selectedElement === index
                        ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                        : "border-white/60 bg-white/5 text-white hover:border-white/40"
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
            <div className="text-[10px] text-white/90 font-mono italic">
              {stage === "build" && sc1_04_t.stages.build_hint}
              {stage === "periodic" && sc1_04_t.stages.periodic_hint}
              {stage === "groups" && sc1_04_t.stages.groups_hint}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
