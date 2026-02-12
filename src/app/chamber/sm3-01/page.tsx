"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S301QuadraticCanvas from "@/components/chamber/sm3-01/QuadraticCanvas";

type S301T = typeof translations.EN.sm3_01;

type Stage = "TERMS" | "FACTORIZE" | "FRACTIONS" | "EQUATIONS";

interface S301Quest extends Quest {
  stage: Stage;
  slotGroups?: Array<{ titleLatex: string; slotIds: string[] }>;
  // Pass coefficients to the canvas for relevant visualization
  a?: number;
  b?: number;
  c?: number;
  vizMode?: "AREA" | "PARABOLA";
}

function buildStagePool(t: S301T, difficulty: Difficulty, stage: Stage): S301Quest[] {
  // --- STAGE: TERMS (Simplifying algebraic expressions) ---
  if (stage === "TERMS") {
    if (difficulty === "BASIC") {
      return [
        { id: "T-B1", difficulty, stage, promptLatex: t.stages.terms_prompt_latex, expressionLatex: "2x + 3x + 5y", targetLatex: "ax+by", slots: [{ id: "ax", labelLatex: "a", placeholder: "a", expected: 5 }, { id: "by", labelLatex: "b", placeholder: "b", expected: 5 }], correctLatex: "5x+5y" },
        { id: "T-B2", difficulty, stage, promptLatex: t.stages.terms_prompt_latex, expressionLatex: "4a + 2b + a", targetLatex: "pa+qb", slots: [{ id: "pa", labelLatex: "p", placeholder: "p", expected: 5 }, { id: "qb", labelLatex: "q", placeholder: "q", expected: 2 }], correctLatex: "5a+2b" }
      ];
    }
    if (difficulty === "CORE") {
      return [
        { id: "T-C1", difficulty, stage, promptLatex: t.stages.terms_prompt_latex, expressionLatex: "7x - 2y + 3x - 5y", targetLatex: "ax+by", slots: [{ id: "ax", labelLatex: "a", placeholder: "a", expected: 10 }, { id: "by", labelLatex: "b", placeholder: "b", expected: -7 }], correctLatex: "10x-7y" },
        { id: "T-C2", difficulty, stage, promptLatex: t.stages.terms_prompt_latex, expressionLatex: "3(x + 2) + 4x", targetLatex: "ax+b", slots: [{ id: "ax", labelLatex: "a", placeholder: "a", expected: 7 }, { id: "b", labelLatex: "b", placeholder: "b", expected: 6 }], correctLatex: "7x+6" }
      ];
    }
    if (difficulty === "ADVANCED") {
      return [
        { id: "T-A1", difficulty, stage, promptLatex: t.stages.terms_prompt_latex, expressionLatex: "2x^2 + 3x - x^2 + 5", targetLatex: "ax^2+bx+c", slots: [{ id: "ax2", labelLatex: "a", placeholder: "?", expected: 1 }, { id: "bx", labelLatex: "b", placeholder: "?", expected: 3 }, { id: "c", labelLatex: "c", placeholder: "?", expected: 5 }], correctLatex: "x^2+3x+5", a: 1, b: 3, c: 5, vizMode: "PARABOLA" },
        { id: "T-A2", difficulty, stage, promptLatex: t.stages.terms_prompt_latex, expressionLatex: "4x(x - 2) + 3x + 2", targetLatex: "ax^2+bx+c", slots: [{ id: "ax2", labelLatex: "a", placeholder: "?", expected: 4 }, { id: "bx", labelLatex: "b", placeholder: "?", expected: -5 }, { id: "c", labelLatex: "c", placeholder: "?", expected: 2 }], correctLatex: "4x^2-5x+2", a: 4, b: -5, c: 2, vizMode: "PARABOLA" }
      ];
    }
    // ELITE: Complex multi-variable and high powers
    return [
      { id: "T-E1", difficulty, stage, promptLatex: t.stages.terms_prompt_latex, expressionLatex: "3x^2 - 2x(x - 4) + 5", targetLatex: "ax^2+bx+c", slots: [{ id: "ax2", labelLatex: "a", placeholder: "?", expected: 1 }, { id: "bx", labelLatex: "b", placeholder: "?", expected: 8 }, { id: "c", labelLatex: "c", placeholder: "?", expected: 5 }], correctLatex: "x^2+8x+5", a: 1, b: 8, c: 5 }
    ];
  }

  // --- STAGE: FACTORIZE (Quadratic factorizing) ---
  if (stage === "FACTORIZE") {
    if (difficulty === "BASIC") {
      return [
        { id: "F-B1", difficulty, stage, promptLatex: t.stages.factor_prompt_latex, expressionLatex: "x^2 + 3x + 2", targetLatex: "(x+A)(x+B)", slots: [{ id: "A", labelLatex: "A", placeholder: "?", expected: 1 }, { id: "B", labelLatex: "B", placeholder: "?", expected: 2 }], correctLatex: "(x+1)(x+2)", a: 1, b: 3, c: 2, vizMode: "AREA", hintLatex: ["A+B = 3", "A×B = 2", "Try: 1+2=3, 1×2=2 ✓"] },
        { id: "F-B2", difficulty, stage, promptLatex: t.stages.factor_prompt_latex, expressionLatex: "x^2 + 5x + 6", targetLatex: "(x+A)(x+B)", slots: [{ id: "A", labelLatex: "A", placeholder: "?", expected: 2 }, { id: "B", labelLatex: "B", placeholder: "?", expected: 3 }], correctLatex: "(x+2)(x+3)", a: 1, b: 5, c: 6, vizMode: "AREA", hintLatex: ["A+B = 5", "A×B = 6", "Try: 2+3=5, 2×3=6 ✓"] }
      ];
    }
    if (difficulty === "CORE") {
      return [
        { id: "F-C1", difficulty, stage, promptLatex: t.stages.factor_prompt_latex, expressionLatex: "x^2 - 4", targetLatex: "(x+A)(x+B)", slots: [{ id: "A", labelLatex: "A", placeholder: "?", expected: -2 }, { id: "B", labelLatex: "B", placeholder: "?", expected: 2 }], correctLatex: "(x-2)(x+2)", a: 1, b: 0, c: -4, vizMode: "AREA", hintLatex: ["Difference of squares: a²−b² = (a−b)(a+b)", "x²−4 = x²−2²", "= (x−2)(x+2)"] },
        { id: "F-C2", difficulty, stage, promptLatex: t.stages.factor_prompt_latex, expressionLatex: "x^2 - x - 6", targetLatex: "(x+A)(x+B)", slots: [{ id: "A", labelLatex: "A", placeholder: "?", expected: -3 }, { id: "B", labelLatex: "B", placeholder: "?", expected: 2 }], correctLatex: "(x-3)(x+2)", a: 1, b: -1, c: -6, vizMode: "AREA", hintLatex: ["A+B = −1", "A×B = −6", "Try: (−3)+2 = −1, (−3)×2 = −6 ✓"] }
      ];
    }
    if (difficulty === "ADVANCED") {
      // Non-unitary a
      return [
        { id: "F-A1", difficulty, stage, promptLatex: t.stages.factor_prompt_latex, expressionLatex: "2x^2 + 5x + 3", targetLatex: "(2x+A)(x+B)", slots: [{ id: "A", labelLatex: "A", placeholder: "?", expected: 3 }, { id: "B", labelLatex: "B", placeholder: "?", expected: 1 }], correctLatex: "(2x+3)(x+1)", a: 2, b: 5, c: 3, vizMode: "AREA" },
        { id: "F-A2", difficulty, stage, promptLatex: t.stages.factor_prompt_latex, expressionLatex: "3x^2 - 10x + 3", targetLatex: "(3x+A)(x+B)", slots: [{ id: "A", labelLatex: "A", placeholder: "?", expected: -1 }, { id: "B", labelLatex: "B", placeholder: "?", expected: -3 }], correctLatex: "(3x-1)(x-3)", a: 3, b: -10, c: 3 }
      ];
    }
    // ELITE: Complex combinations
    return [
      { id: "F-E1", difficulty, stage, promptLatex: t.stages.factor_prompt_latex, expressionLatex: "4x^2 - 12x + 9", targetLatex: "(ax-b)^2", slots: [{ id: "a", labelLatex: "a", placeholder: "?", expected: 2 }, { id: "b", labelLatex: "b", placeholder: "?", expected: 3 }], correctLatex: "(2x-3)^2", a: 4, b: -12, c: 9 }
    ];
  }

  // --- STAGE: FRACTIONS (Simplifying algebraic fractions) ---
  if (stage === "FRACTIONS") {
    if (difficulty === "BASIC") {
      return [
        { id: "R-B1", difficulty, stage, promptLatex: t.stages.fractions_prompt_latex, expressionLatex: "\\frac{2x}{4x^2}", targetLatex: "\\frac{1}{ax}", slots: [{ id: "a", labelLatex: "a", placeholder: "?", expected: 2 }], correctLatex: "\\frac{1}{2x}" }
      ];
    }
    if (difficulty === "CORE") {
      return [
        { id: "R-C1", difficulty, stage, promptLatex: t.stages.fractions_prompt_latex, expressionLatex: "\\frac{x^2+2x}{x}", targetLatex: "x+b", slots: [{ id: "b", labelLatex: "b", placeholder: "?", expected: 2 }], correctLatex: "x+2" }
      ];
    }
    if (difficulty === "ADVANCED") {
      return [
        { id: "R-A1", difficulty, stage, promptLatex: t.stages.fractions_prompt_latex, expressionLatex: "\\frac{x^2-9}{x+3}", targetLatex: "x+b", slots: [{ id: "b", labelLatex: "b", placeholder: "?", expected: -3 }], correctLatex: "x-3" }
      ];
    }
    return [
      { id: "R-E1", difficulty, stage, promptLatex: t.stages.fractions_prompt_latex, expressionLatex: "\\frac{x^2+5x+6}{x+2}", targetLatex: "x+b", slots: [{ id: "b", labelLatex: "b", placeholder: "?", expected: 3 }], correctLatex: "x+3" }
    ];
  }

  // --- STAGE: EQUATIONS (Solving quadratic equations) ---
  if (stage === "EQUATIONS") {
    if (difficulty === "BASIC") {
      return [
        { id: "E-B1", difficulty, stage, promptLatex: t.stages.equations_prompt_latex, expressionLatex: "x^2 = 9", targetLatex: "x = \\pm k", slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 3 }], correctLatex: "x=\\pm 3", a: 1, b: 0, c: -9, vizMode: "PARABOLA", hintLatex: ["Take square root of both sides", "x = ±√9 = ±3"] },
        { id: "E-B2", difficulty, stage, promptLatex: t.stages.equations_prompt_latex, expressionLatex: "x(x - 4) = 0", targetLatex: "x_1, x_2", slots: [{ id: "x1", labelLatex: "x_1", placeholder: "?", expected: 0 }, { id: "x2", labelLatex: "x_2", placeholder: "?", expected: 4 }], correctLatex: "0, 4", a: 1, b: -4, c: 0, vizMode: "PARABOLA", hintLatex: ["Zero Product Property: if ab=0, a=0 or b=0", "x=0 or x−4=0"] }
      ];
    }
    if (difficulty === "CORE") {
      return [
        { id: "E-C1", difficulty, stage, promptLatex: t.stages.equations_prompt_latex, expressionLatex: "x^2 + 5x + 6 = 0", targetLatex: "x_1, x_2", slots: [{ id: "x1", labelLatex: "x_1", placeholder: "?", expected: -3 }, { id: "x2", labelLatex: "x_2", placeholder: "?", expected: -2 }], correctLatex: "-3, -2", a: 1, b: 5, c: 6, vizMode: "PARABOLA", hintLatex: ["Factor: (x+2)(x+3) = 0", "x+2=0 → x=−2", "x+3=0 → x=−3"] }
      ];
    }
    if (difficulty === "ADVANCED") {
      return [
        { id: "E-A1", difficulty, stage, promptLatex: t.stages.equations_prompt_latex, expressionLatex: "x^2 - 4x = 5", targetLatex: "x_1, x_2", slots: [{ id: "x1", labelLatex: "x_1", placeholder: "?", expected: -1 }, { id: "x2", labelLatex: "x_2", placeholder: "?", expected: 5 }], correctLatex: "-1, 5", a: 1, b: -4, c: -5, vizMode: "PARABOLA" }
      ];
    }
    // ELITE: Completing the square or complex roots
    return [
      { id: "E-E1", difficulty, stage, promptLatex: "Find k if one root of x^2 - 6x + k = 0 is 2", expressionLatex: "x^2 - 6x + k = 0", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 8 }], correctLatex: "k=8", a: 1, b: -6, c: 8, vizMode: "PARABOLA" }
    ];
  }

  return [];
}

export default function S301Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].sm3_01;

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    successRate,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    parseNumberLike,
  } = useQuestManager<S301Quest, Stage>({
    buildPool,
    initialStage: "TERMS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stages = [
    { id: "TERMS", label: t.stages.terms },
    { id: "FACTORIZE", label: t.stages.factorize },
    { id: "FRACTIONS", label: t.stages.fractions },
    { id: "EQUATIONS", label: t.stages.equations },
  ];

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="SM3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      footerLeft={t.footer_left}
      checkStatus={lastCheck}
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
        <S301QuadraticCanvas
          quest={currentQuest}
          lang={currentLanguage}
        />
      }
    >
      <div className="w-full max-w-5xl space-y-10">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
            <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
              <InlineMath math={currentQuest.promptLatex} />
            </p>
          </div>

          <div className="flex justify-center overflow-x-auto w-full">
            <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
              <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t.target_title}</span>
              <div className="space-y-4">
                <div className="text-white font-black text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95] whitespace-nowrap">
                  <InlineMath math={currentQuest.expressionLatex} />
                </div>
                <div className="text-white/60 font-black">
                  <InlineMath math={currentQuest.targetLatex} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.labels.input}</div>
            {currentQuest.slotGroups ? (
              <div className="space-y-4">
                {currentQuest.slotGroups.map((group) => (
                  <div key={group.titleLatex} className="space-y-3">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                      <InlineMath math={group.titleLatex} />
                    </div>
                    <div className={clsx("grid gap-4", group.slotIds.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                      {group.slotIds.map((slotId) => {
                        const slot = currentQuest.slots.find((s) => s.id === slotId);
                        if (!slot) return null;
                        return (
                          <div key={slot.id} className="space-y-2">
                            <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                              <InlineMath math={slot.labelLatex} />
                            </div>
                            <input
                              value={inputs[slot.id] ?? ""}
                              onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                              className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                              placeholder={slot.placeholder}
                              inputMode="text"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={clsx("grid gap-4", currentQuest.slots.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                {currentQuest.slots.map((slot) => (
                  <div key={slot.id} className="space-y-2">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                      <InlineMath math={slot.labelLatex} />
                    </div>
                    <input
                      value={inputs[slot.id] ?? ""}
                      onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                      className="w-full bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                      placeholder={slot.placeholder}
                      inputMode="text"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="text-[10px] text-white/90 font-mono italic text-center mt-6">
              {t.labels.fraction_hint}
            </div>

            {stage === "FACTORIZE" && currentQuest.slots.some((s) => s.id === "A") && currentQuest.slots.some((s) => s.id === "B") && (
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/90 font-black">
                <InlineMath
                  math={`\\text{Preview: }(x${parseNumberLike(inputs.A ?? "") !== null && Number((inputs.A ?? "").replace(/,/g, ".")) >= 0 ? "+" : ""}${(inputs.A ?? "").trim() || "A"})(x${parseNumberLike(inputs.B ?? "") !== null && Number((inputs.B ?? "").replace(/,/g, ".")) >= 0 ? "+" : ""}${(inputs.B ?? "").trim() || "B"})`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
