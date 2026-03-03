"use client";

import { useState, useCallback, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { renderMixedText } from "@/lib/latex-utils";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AtomBuilder from "@/components/chamber/sc1-04/AtomBuilder";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "build" | "periodic" | "groups";
type PeriodicQuest = Quest & { stage: Stage };

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
  const { completeStage } = useAppStore();

  const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): PeriodicQuest[] => {
    const bank: Record<Stage, Record<Difficulty, PeriodicQuest[]>> = {
      build: {
        BASIC: [{ id: "B-B-1", difficulty, stage, promptLatex: t("sc1_04.prompts.build_mass_number"), expressionLatex: "p=6,\\;n=6,\\;A=p+n", targetLatex: "A", slots: [{ id: "A", labelLatex: "A", placeholder: "xx", expected: 12 }], correctLatex: "A=12" }],
        CORE: [{ id: "B-C-1", difficulty, stage, promptLatex: t("sc1_04.prompts.build_charge"), expressionLatex: "p=12,\\;e=10,\\;q=p-e", targetLatex: "q", slots: [{ id: "q", labelLatex: "q", placeholder: "x", expected: 2 }], correctLatex: "q=+2" }],
        ADVANCED: [{ id: "B-A-1", difficulty, stage, promptLatex: t("sc1_04.prompts.build_electrons"), expressionLatex: "Z=17", targetLatex: "e", slots: [{ id: "e", labelLatex: "e", placeholder: "xx", expected: 17 }], correctLatex: "e=17" }],
        ELITE: [{ id: "B-E-1", difficulty, stage, promptLatex: t("sc1_04.prompts.build_neutrons"), expressionLatex: "A=40,\\;Z=20,\\;n=A-Z", targetLatex: "n", slots: [{ id: "n", labelLatex: "n", placeholder: "xx", expected: 20 }], correctLatex: "n=20" }],
      },
      periodic: {
        BASIC: [{ id: "P-B-1", difficulty, stage, promptLatex: t("sc1_04.prompts.periodic_atomic_number"), expressionLatex: "\\mathrm{Na}", targetLatex: "Z", slots: [{ id: "Z", labelLatex: "Z", placeholder: "xx", expected: 11 }], correctLatex: "Z=11" }],
        CORE: [{ id: "P-C-1", difficulty, stage, promptLatex: t("sc1_04.prompts.periodic_period"), expressionLatex: "\\mathrm{Cl}", targetLatex: "P", slots: [{ id: "period", labelLatex: "P", placeholder: "x", expected: 3 }], correctLatex: "P=3" }],
        ADVANCED: [{ id: "P-A-1", difficulty, stage, promptLatex: t("sc1_04.prompts.periodic_group"), expressionLatex: "\\mathrm{O}", targetLatex: "G", slots: [{ id: "group", labelLatex: "G", placeholder: "xx", expected: 16 }], correctLatex: "G=16" }],
        ELITE: [{ id: "P-E-1", difficulty, stage, promptLatex: t("sc1_04.prompts.periodic_valence"), expressionLatex: "\\mathrm{Ar}", targetLatex: "v", slots: [{ id: "v", labelLatex: "v", placeholder: "x", expected: 8 }], correctLatex: "v=8" }],
      },
      groups: {
        BASIC: [{ id: "G-B-1", difficulty, stage, promptLatex: t("sc1_04.prompts.groups_group_number"), expressionLatex: "\\mathrm{Li}", targetLatex: "g", slots: [{ id: "g", labelLatex: "g", placeholder: "x", expected: 1 }], correctLatex: "g=1" }],
        CORE: [{ id: "G-C-1", difficulty, stage, promptLatex: t("sc1_04.prompts.groups_same_group"), expressionLatex: "\\mathrm{Na},\\;\\mathrm{K}", targetLatex: "1", slots: [{ id: "sg", labelLatex: "1/0", placeholder: "1", expected: 1 }], correctLatex: "1" }],
        ADVANCED: [{ id: "G-A-1", difficulty, stage, promptLatex: t("sc1_04.prompts.groups_delta_z"), expressionLatex: "\\mathrm{Ne}(Z=10)\\rightarrow\\mathrm{Ar}(Z=18)", targetLatex: "\\Delta Z", slots: [{ id: "dz", labelLatex: "\\Delta Z", placeholder: "x", expected: 8 }], correctLatex: "\\Delta Z=8" }],
        ELITE: [{ id: "G-E-1", difficulty, stage, promptLatex: t("sc1_04.prompts.groups_delta_period"), expressionLatex: "\\mathrm{Mg}(P2)\\rightarrow\\mathrm{Ca}(P4)", targetLatex: "\\Delta P", slots: [{ id: "dp", labelLatex: "\\Delta P", placeholder: "x", expected: 2 }], correctLatex: "\\Delta P=2" }],
      },
    };

    return bank[stage][difficulty] ?? [];
  }, [t]);

  const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => {
    return buildStagePool(difficulty, stage);
  }, [buildStagePool]);

  const {
    currentQuest: quest,
    stage,
    inputs,
    setInputs,
    lastCheck,
    verify,
    next,
    handleStageChange,
    difficulty,
    handleDifficultyChange,
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback,
  } = useQuestManager<PeriodicQuest, Stage>({
    moduleCode: "sc1-04",
    buildPool,
    initialStage: "build",
    tolerance: 0.02,
  });

  const [selectedElement, setSelectedElement] = useState(0);
  const [customProtons, setCustomProtons] = useState(1);
  const [customNeutrons, setCustomNeutrons] = useState(0);
  const [customElectrons, setCustomElectrons] = useState(1);

  useEffect(() => {
    if (stage === "build") {
      setCustomProtons(1);
      setCustomNeutrons(0);
      setCustomElectrons(1);
    } else if (stage === "periodic") {
      setSelectedElement(0);
    }
  }, [stage]);

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sc1-04", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const currentElement = stage === "build"
    ? { protons: customProtons, neutrons: customNeutrons, electrons: customElectrons }
    : elements[selectedElement];

  const atomicNumber = currentElement.protons;
  const massNumber = currentElement.protons + currentElement.neutrons;

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
    difficulty: {
      basic: t("sc1_04.difficulty.basic"),
      core: t("sc1_04.difficulty.core"),
      advanced: t("sc1_04.difficulty.advanced"),
      elite: t("sc1_04.difficulty.elite"),
    },
  };

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sc1_04_t.title}
      moduleCode="SC1.04"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "build", label: sc1_04_t.stages.build },
        { id: "periodic", label: sc1_04_t.stages.periodic },
        { id: "groups", label: sc1_04_t.stages.groups },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={sc1_04_t.footer_left}
      translations={{
        back: sc1_04_t.back,
        check: sc1_04_t.check,
        next: sc1_04_t.next,
        correct: sc1_04_t.correct,
        incorrect: sc1_04_t.incorrect,
        ready: sc1_04_t.ready,
        monitor_title: sc1_04_t.monitor_title,
        difficulty: sc1_04_t.difficulty,
      }}
      monitorContent={
        <div className="space-y-4">
          <AtomBuilder
            protons={currentElement.protons}
            neutrons={currentElement.neutrons}
            electrons={currentElement.electrons}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{sc1_04_t.target_title}</div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{sc1_04_t.labels.element_info}</div>
            {stage !== "build" && (
              <div className="text-2xl text-white font-black text-center">
                {elements[selectedElement].symbol} - {elements[selectedElement].name}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between"><span className="text-white/60 font-mono">Z:</span><span className="text-neon-pink font-black">{atomicNumber}</span></div>
              <div className="flex justify-between"><span className="text-white/60 font-mono">A:</span><span className="text-neon-purple font-black">{massNumber}</span></div>
              <div className="flex justify-between"><span className="text-white/60 font-mono">{sc1_04_t.labels.protons}:</span><span className="text-neon-pink font-black">{currentElement.protons}</span></div>
              <div className="flex justify-between"><span className="text-white/60 font-mono">{sc1_04_t.labels.neutrons}:</span><span className="text-neon-purple font-black">{currentElement.neutrons}</span></div>
              <div className="flex justify-between"><span className="text-white/60 font-mono">{sc1_04_t.labels.electrons}:</span><span className="text-neon-cyan font-black">{currentElement.electrons}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{sc1_04_t.labels.formulas}</div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="Z=p" /></div>
              <div><InlineMath math="A=p+n" /></div>
              <div><InlineMath math="2,8,8,18" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{sc1_04_t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{sc1_04_t.mission.description}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{sc1_04_t.objective_title}</h3>
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
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">{sc1_04_t.labels.protons}</div>
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="20" step="1" value={customProtons} onChange={(e) => setCustomProtons(parseInt(e.target.value))} aria-label={sc1_04_t.labels.protons} className="flex-1" />
                  <span className="text-white font-black w-12 text-right">{customProtons}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">{sc1_04_t.labels.neutrons}</div>
                <div className="flex items-center gap-4">
                  <input type="range" min="0" max="30" step="1" value={customNeutrons} onChange={(e) => setCustomNeutrons(parseInt(e.target.value))} aria-label={sc1_04_t.labels.neutrons} className="flex-1" />
                  <span className="text-white font-black w-12 text-right">{customNeutrons}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">{sc1_04_t.labels.electrons}</div>
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="20" step="1" value={customElectrons} onChange={(e) => setCustomElectrons(parseInt(e.target.value))} aria-label={sc1_04_t.labels.electrons} className="flex-1" />
                  <span className="text-white font-black w-12 text-right">{customElectrons}</span>
                </div>
              </div>
            </>
          )}

          {stage === "periodic" && (
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">{sc1_04_t.labels.select_element}</div>
              <div className="grid grid-cols-5 gap-2">
                {elements.map((element, index) => (
                  <button
                    key={element.symbol}
                    onClick={() => setSelectedElement(index)}
                    aria-label={`${sc1_04_t.labels.select_element} ${element.symbol}`}
                    className={`p-3 border-2 rounded-lg font-black transition-all ${selectedElement === index
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

          {quest && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black text-center">{sc1_04_t.check}</div>
              <div className="text-center text-2xl text-white font-black">{renderMixedText(quest.promptLatex)}</div>
              <div className="text-center p-3 bg-white/5 border border-white/10 rounded-xl">
                <InlineMath math={quest.expressionLatex} />
              </div>
              {quest.slots.map((slot) => (
                <div key={slot.id} className="space-y-2">
                  <label className="text-sm text-white/70 font-mono">
                    <InlineMath math={slot.labelLatex} />
                  </label>
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [slot.id]: e.target.value }))}
                    aria-label={slot.id}
                    className="w-full bg-black border-2 border-cyan-500/50 p-4 text-center outline-none focus:border-cyan-400 placeholder:text-white/40 font-black text-2xl text-white rounded-lg"
                    placeholder={slot.placeholder}
                  />
                </div>
              ))}
              {lastCheck?.ok && (
                <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <InlineMath math={quest.correctLatex} />
                </div>
              )}
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
