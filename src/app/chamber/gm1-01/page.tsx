"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import WaveCanvas from "@/components/chamber/gm1-01/WaveCanvas";

type Stage = "POWER_RULE" | "PRODUCT_RULE" | "CHAIN_RULE";
type G101T = typeof translations.EN.g1_01;

interface G101Quest extends Quest {
  stage: Stage;
  functionType: "power" | "product" | "chain";
  xPosition: number;
  coefficient?: number;
  exponent?: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// Power rule data: f(x) = ax^n => f'(x) = n·a·x^(n-1)
const powerData = [
  { id: "P1", a: 2, n: 2, x: 1 },
  { id: "P2", a: 3, n: 2, x: 2 },
  { id: "P3", a: 1, n: 3, x: 1 },
  { id: "P4", a: 2, n: 3, x: 2 },
  { id: "P5", a: 4, n: 2, x: 3 },
  { id: "P6", a: 1, n: 4, x: 2 },
  { id: "P7", a: 3, n: 3, x: 1 },
];

// Product rule data: f(x) = u(x)·v(x) => f'(x) = u'·v + u·v'
// Using f(x) = x·sin(x) => f'(x) = sin(x) + x·cos(x)
const productData = [
  { id: "PR1", x: 0 },
  { id: "PR2", x: Math.PI / 4 },
  { id: "PR3", x: Math.PI / 2 },
  { id: "PR4", x: Math.PI },
  { id: "PR5", x: 1 },
  { id: "PR6", x: 2 },
  { id: "PR7", x: 3 },
];

// Chain rule data: f(x) = sin(2x) => f'(x) = 2·cos(2x)
const chainData = [
  { id: "C1", x: 0 },
  { id: "C2", x: Math.PI / 4 },
  { id: "C3", x: Math.PI / 2 },
  { id: "C4", x: Math.PI },
  { id: "C5", x: 1 },
  { id: "C6", x: 2 },
  { id: "C7", x: 3 },
];

function buildStagePool(t: G101T, difficulty: Difficulty, stage: Stage): G101Quest[] {
  if (stage === "POWER_RULE") {
    const all = powerData.map((item) => {
      // f(x) = ax^n => f'(x) = n·a·x^(n-1)
      const derivative = round2(item.n * item.a * Math.pow(item.x, item.n - 1));
      
      return {
        id: item.id,
        difficulty,
        stage,
        functionType: "power" as const,
        xPosition: item.x,
        coefficient: item.a,
        exponent: item.n,
        promptLatex: t.stages.power_rule_prompt_latex,
        expressionLatex: `f(x)=${item.a}x^{${item.n}},\\; x=${item.x}`,
        targetLatex: "f'(x)",
        slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
        correctLatex: `f'(${item.x})=${derivative}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  if (stage === "PRODUCT_RULE") {
    const all = productData.map((item) => {
      // f(x) = x·sin(x) => f'(x) = sin(x) + x·cos(x)
      const derivative = round2(Math.sin(item.x) + item.x * Math.cos(item.x));
      
      return {
        id: item.id,
        difficulty,
        stage,
        functionType: "product" as const,
        xPosition: item.x,
        promptLatex: t.stages.product_rule_prompt_latex,
        expressionLatex: `f(x)=x\\cdot\\sin(x),\\; x=${round2(item.x)}`,
        targetLatex: "f'(x)",
        slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
        correctLatex: `f'(${round2(item.x)})=${derivative}`,
      };
    });
    if (difficulty === "BASIC") return all.slice(0, 4);
    return all;
  }

  // CHAIN_RULE
  const all = chainData.map((item) => {
    // f(x) = sin(2x) => f'(x) = 2·cos(2x)
    const derivative = round2(2 * Math.cos(2 * item.x));
    
    return {
      id: item.id,
      difficulty,
      stage,
      functionType: "chain" as const,
      xPosition: item.x,
      promptLatex: t.stages.chain_rule_prompt_latex,
      expressionLatex: `f(x)=\\sin(2x),\\; x=${round2(item.x)}`,
      targetLatex: "f'(x)",
      slots: [{ id: "derivative", labelLatex: "f'(x)", placeholder: "derivative", expected: derivative }],
      correctLatex: `f'(${round2(item.x)})=${derivative}`,
    };
  });
  if (difficulty === "BASIC") return all.slice(0, 4);
  return all;
}

export default function G101Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].g1_01;

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
  } = useQuestManager<G101Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "POWER_RULE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("g1-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="G1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "POWER_RULE", label: t.stages.power_rule },
        { id: "PRODUCT_RULE", label: t.stages.product_rule },
        { id: "CHAIN_RULE", label: t.stages.chain_rule },
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
          <WaveCanvas
            functionType={currentQuest?.functionType || "power"}
            xPosition={currentQuest?.xPosition || 2}
            derivative={parseFloat(inputs.derivative || "0")}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.target_title}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">{t.labels.hints}</div>
            <div className="text-white font-black text-lg">
              <InlineMath math={t.formulas[stage.toLowerCase() as keyof typeof t.formulas]} />
            </div>
            <div className="text-white/70 text-sm font-mono">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
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
          <div className="grid grid-cols-2 gap-4">
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
                    <div className="text-xl font-black text-white/80 min-w-[30px]">
                      <InlineMath math={slot.unit} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/40 font-mono italic text-center">
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat auf 2 Dezimalstellen gerundet an."
              : currentLanguage === 'CN'
                ? "提示：保留 2 位小数。"
                : "Tip: Enter result rounded to 2 decimal places."
            }
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
