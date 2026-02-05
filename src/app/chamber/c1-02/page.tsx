"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";

type Stage = "MOLAR_MASS" | "STOICHIOMETRY" | "YIELD";
type C102T = typeof translations.EN.c1_02;

interface ReagentInfo {
  label: string;
  value: string;
}

interface C102Quest extends Quest {
  stage: Stage;
  reactionLatex?: string;
  reagents: ReagentInfo[];
  scaleReading: string;
}

const molarMassData = [
  { id: "M1", formula: "H_2O", atoms: "H=1,\\; O=16", molarMass: 18 },
  { id: "M2", formula: "CO_2", atoms: "C=12,\\; O=16", molarMass: 44 },
  { id: "M3", formula: "NaCl", atoms: "Na=23,\\; Cl=35.5", molarMass: 58.5 },
  { id: "M4", formula: "CaCO_3", atoms: "Ca=40,\\; C=12,\\; O=16", molarMass: 100 },
  { id: "M5", formula: "NH_3", atoms: "N=14,\\; H=1", molarMass: 17 },
  { id: "M6", formula: "H_2SO_4", atoms: "H=1,\\; S=32,\\; O=16", molarMass: 98 },
  { id: "M7", formula: "C_6H_{12}O_6", atoms: "C=12,\\; H=1,\\; O=16", molarMass: 180 },
];

const stoichiometryData = [
  { id: "S1", reaction: "2H_2+O_2\\rightarrow 2H_2O", given: "n(H_2)=3\\;mol", target: "n(H_2O)", answer: 3 },
  { id: "S2", reaction: "N_2+3H_2\\rightarrow 2NH_3", given: "n(H_2)=4.5\\;mol", target: "n(NH_3)", answer: 3 },
  { id: "S3", reaction: "2Na+Cl_2\\rightarrow 2NaCl", given: "n(Na)=5\\;mol", target: "n(NaCl)", answer: 5 },
  { id: "S4", reaction: "CaCO_3\\rightarrow CaO+CO_2", given: "n(CaCO_3)=2.5\\;mol", target: "n(CO_2)", answer: 2.5 },
  { id: "S5", reaction: "2Al+3Cl_2\\rightarrow 2AlCl_3", given: "n(Cl_2)=6\\;mol", target: "n(AlCl_3)", answer: 4 },
  { id: "S6", reaction: "2H_2O_2\\rightarrow 2H_2O+O_2", given: "n(H_2O_2)=1.2\\;mol", target: "n(O_2)", answer: 0.6 },
  { id: "S7", reaction: "4Fe+3O_2\\rightarrow 2Fe_2O_3", given: "n(Fe)=6\\;mol", target: "n(Fe_2O_3)", answer: 3 },
];

const yieldData = [
  { id: "Y1", reaction: "2H_2+O_2\\rightarrow 2H_2O", given: "m(H_2)=8g,\\; m(O_2)=32g", target: "m(H_2O)", answer: 36 },
  { id: "Y2", reaction: "N_2+3H_2\\rightarrow 2NH_3", given: "m(N_2)=28g,\\; m(H_2)=6g", target: "m(NH_3)", answer: 34 },
  { id: "Y3", reaction: "CaCO_3\\rightarrow CaO+CO_2", given: "m(CaCO_3)=50g", target: "m(CO_2)", answer: 22 },
  { id: "Y4", reaction: "2Al+3Cl_2\\rightarrow 2AlCl_3", given: "m(Al)=5.4g,\\; m(Cl_2)=21.3g", target: "m(AlCl_3)", answer: 26.7 },
  { id: "Y5", reaction: "4Fe+3O_2\\rightarrow 2Fe_2O_3", given: "m(Fe)=11.2g,\\; m(O_2)=9.6g", target: "m(Fe_2O_3)", answer: 16 },
  { id: "Y6", reaction: "C_3H_8+5O_2\\rightarrow 3CO_2+4H_2O", given: "m(C_3H_8)=22g,\\; m(O_2)=80g", target: "m(CO_2)", answer: 66 },
  { id: "Y7", reaction: "2KClO_3\\rightarrow 2KCl+3O_2", given: "m(KClO_3)=24.5g", target: "m(O_2)", answer: 9.6 },
];

function buildStagePool(t: C102T, difficulty: Difficulty, stage: Stage): C102Quest[] {
  if (stage === "MOLAR_MASS") {
    const all = molarMassData.map((item) => ({
      id: item.id,
      difficulty,
      stage,
      reactionLatex: item.formula,
      promptLatex: t.stages.molar_mass_prompt_latex,
      expressionLatex: `\\text{${item.formula}},\\; ${item.atoms}`,
      targetLatex: "M",
      slots: [{ id: "M", labelLatex: "M", placeholder: "molar mass", expected: item.molarMass, unit: "g/mol" }],
      correctLatex: `M=${item.molarMass}\\;\\text{g/mol}`,
      reagents: [
        { label: "FORMULA", value: item.formula },
        { label: "ATOMS", value: item.atoms },
      ],
      scaleReading: `${item.molarMass}\\;g/mol`,
    }));
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "STOICHIOMETRY") {
    const all = stoichiometryData.map((item) => ({
      id: item.id,
      difficulty,
      stage,
      reactionLatex: item.reaction,
      promptLatex: t.stages.stoichiometry_prompt_latex,
      expressionLatex: `${item.reaction},\\; ${item.given}`,
      targetLatex: item.target,
      slots: [{ id: "n", labelLatex: item.target, placeholder: "amount", expected: item.answer, unit: "mol" }],
      correctLatex: `${item.target}=${item.answer}\\;mol`,
      reagents: [
        { label: "REACTION", value: item.reaction },
        { label: "GIVEN", value: item.given },
      ],
      scaleReading: `${item.answer}\\;mol`,
    }));
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  const all = yieldData.map((item) => ({
    id: item.id,
    difficulty,
    stage,
    reactionLatex: item.reaction,
    promptLatex: t.stages.yield_prompt_latex,
    expressionLatex: `${item.reaction},\\; ${item.given}`,
    targetLatex: item.target,
    slots: [{ id: "m", labelLatex: item.target, placeholder: "mass", expected: item.answer, unit: "g" }],
    correctLatex: `${item.target}=${item.answer}\\;g`,
    reagents: [
      { label: "REACTION", value: item.reaction },
      { label: "GIVEN", value: item.given },
    ],
    scaleReading: `${item.answer}\\;g`,
  }));
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
}

export default function C102Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].c1_02;

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<C102Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "MOLAR_MASS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("c1-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="C1.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "MOLAR_MASS", label: t.stages.molar_mass },
        { id: "STOICHIOMETRY", label: t.stages.stoichiometry },
        { id: "YIELD", label: t.stages.yield },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[11px] font-black tracking-[0.3em] text-white/60">{t.labels.scale}</div>
            <div className="text-white font-black text-xl">
              <InlineMath math={currentQuest?.scaleReading || ""} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {currentQuest?.reagents.map((item) => (
              <div key={item.label} className="flex items-center justify-between border border-white/10 bg-black/40 px-3 py-2 text-xs font-mono">
                <span className="text-white/60">{item.label}</span>
                <span className="text-white">
                  <InlineMath math={item.value} />
                </span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder={slot.placeholder}
                  />
                  {slot.unit && (
                    <div className="text-xl font-black text-white/80 min-w-[60px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/40 font-mono italic text-center">
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat als Bruch (z.B. 4/3) oder auf 1 Dezimalstelle gerundet an."
              : currentLanguage === 'CN'
                ? "提示：输入分数 (如 4/3) 或保留 1 位小数。"
                : "Tip: Enter result as a fraction (e.g. 4/3) or rounded to 1 decimal place."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
