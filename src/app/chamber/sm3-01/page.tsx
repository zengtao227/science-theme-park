"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import S301QuadraticCanvas from "@/components/chamber/sm3-01/QuadraticCanvas";

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

// Helper to create a quest object concisely
function q(id: string, d: Difficulty, s: Stage, p: string, expr: string, target: string,
  slots: Array<{ id: string; l: string; e: number | string }>, correct: string,
  extra?: { a?: number; b?: number; c?: number; vizMode?: "AREA" | "PARABOLA"; hintLatex?: string[] }
): S301Quest {
  return {
    id, difficulty: d, stage: s, promptLatex: p, expressionLatex: expr, targetLatex: target,
    slots: slots.map(sl => ({ id: sl.id, labelLatex: sl.l, placeholder: "?", expected: sl.e })),
    correctLatex: correct, ...extra,
  };
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): S301Quest[] {
  const tp = t.stages.terms_prompt_latex;
  const fp = t.stages.factor_prompt_latex;
  const rp = t.stages.fractions_prompt_latex;
  const ep = t.stages.equations_prompt_latex;

  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const getSign = () => Math.random() > 0.5 ? 1 : -1;
  const fmt = (c: number, v: string, isFirst = false) => {
    if (c === 0) return "";
    let signs = c > 0 ? (isFirst ? "" : "+") : "-";
    let vals = Math.abs(c) === 1 && v ? "" : Math.abs(c).toString();
    return `${signs}${vals}${v}`;
  };
  const count = 30;

  // ===================== TERMS =====================
  if (stage === "TERMS") {
    return Array.from({ length: count }).map((_, i) => {
      const id = `T_${difficulty}_${i}`;
      if (difficulty === "BASIC") {
        const x1 = randInt(1, 5), x2 = randInt(1, 4);
        const y1 = randInt(1, 5), y2 = randInt(1, 4);
        return q(id, difficulty, stage, tp, `${x1}x + ${y1}y + ${x2}x + ${y2}y`, "ax+by", [
          { id: "a", l: "a", e: x1 + x2 }, { id: "b", l: "b", e: y1 + y2 }
        ], `${x1 + x2}x+${y1 + y2}y`);
      } else if (difficulty === "CORE") {
        const x1 = randInt(2, 6) * getSign(), x2 = randInt(2, 6) * getSign();
        const y1 = randInt(2, 6) * getSign(), y2 = randInt(2, 6) * getSign();
        const cx = x1 + x2, cy = y1 + y2;
        return q(id, difficulty, stage, tp, `${fmt(x1, "x", true)} ${fmt(y1, "y")} ${fmt(x2, "x")} ${fmt(y2, "y")}`, "ax+by", [
          { id: "a", l: "a", e: cx }, { id: "b", l: "b", e: cy }
        ], `${fmt(cx, "x", true)}${fmt(cy, "y")}`);
      } else if (difficulty === "ADVANCED") {
        const a1 = randInt(1, 4), b1 = randInt(-4, 4), c1 = randInt(-5, 5);
        const a2 = randInt(-3, 3), b2 = randInt(-4, 4), c2 = randInt(-5, 5);
        const rA = a1 + a2, rB = b1 + b2, rC = c1 + c2;
        return q(id, difficulty, stage, tp, `(${fmt(a1, "x^{2}", true)}${fmt(b1, "x")}${fmt(c1, "")}) + (${fmt(a2, "x^{2}", true)}${fmt(b2, "x")}${fmt(c2, "")})`, "ax^{2}+bx+c", [
          { id: "a", l: "a", e: rA }, { id: "b", l: "b", e: rB }, { id: "c", l: "c", e: rC }
        ], `${fmt(rA, "x^{2}", true)}${fmt(rB, "x")}${fmt(rC, "")}`, { a: rA, b: rB, c: rC });
      } else {
        const a = randInt(2, 4), b = randInt(1, 4), c = randInt(2, 5);
        const rA = a * a - c, rB = 2 * a * b, rC = b * b;
        return q(id, difficulty, stage, tp, `(${fmt(a, "x", true)}${fmt(b, "")})^{2} - ${c}x^{2}`, "ax^{2}+bx+c", [
          { id: "a", l: "a", e: rA }, { id: "b", l: "b", e: rB }, { id: "c", l: "c", e: rC }
        ], `${fmt(rA, "x^{2}", true)}${fmt(rB, "x")}${fmt(rC, "")}`, { a: rA, b: rB, c: rC });
      }
    });
  }

  // ===================== FACTORIZE =====================
  if (stage === "FACTORIZE") {
    return Array.from({ length: count }).map((_, i) => {
      const id = `F_${difficulty}_${i}`;
      if (difficulty === "BASIC") {
        const r1 = randInt(1, 5), r2 = randInt(1, 5);
        const b = r1 + r2, c = r1 * r2;
        return q(id, difficulty, stage, fp, `x^{2}+${b}x+${c}`, "(x+A)(x+B)", [
          { id: "A", l: "A", e: r1 }, { id: "B", l: "B", e: r2 }
        ], `(x+${r1})(x+${r2})`, { a: 1, b, c, vizMode: "AREA", hintLatex: [`A+B=${b}`, `A\\times B=${c}`] });
      } else if (difficulty === "CORE") {
        if (Math.random() > 0.5) {
          const r = randInt(2, 7);
          return q(id, difficulty, stage, fp, `x^{2}-${r * r}`, "(x+A)(x+B)", [
            { id: "A", l: "A", e: -r }, { id: "B", l: "B", e: r }
          ], `(x-${r})(x+${r})`, { a: 1, b: 0, c: -r * r, vizMode: "AREA", hintLatex: ["a^{2}-b^{2}=(a-b)(a+b)"] });
        } else {
          const r1 = randInt(1, 6) * getSign(), r2 = randInt(1, 6) * getSign();
          const b = r1 + r2, c = r1 * r2;
          return q(id, difficulty, stage, fp, `x^{2}${fmt(b, "x")}${fmt(c, "")}`, "(x+A)(x+B)", [
            { id: "A", l: "A", e: Math.min(r1, r2) }, { id: "B", l: "B", e: Math.max(r1, r2) }
          ], `(x${fmt(Math.min(r1, r2), "")})(x${fmt(Math.max(r1, r2), "")})`, { a: 1, b, c, vizMode: "AREA" });
        }
      } else if (difficulty === "ADVANCED") {
        const a = randInt(2, 5), r1 = randInt(1, 4) * getSign(), r2 = randInt(1, 4) * getSign();
        const b = a * r2 + r1, c = r1 * r2;
        return q(id, difficulty, stage, fp, `${a}x^{2}${fmt(b, "x")}${fmt(c, "")}`, "({a}x+A)(x+B)", [
          { id: "A", l: "A", e: r1 }, { id: "B", l: "B", e: r2 }
        ], `(${a}x${fmt(r1, "")})(x${fmt(r2, "")})`, { a, b, c });
      } else {
        if (Math.random() > 0.5) {
          const a = randInt(2, 5), b = randInt(1, 5) * getSign();
          return q(id, difficulty, stage, fp, `${a * a}x^{2}${fmt(2 * a * b, "x")}${fmt(b * b, "")}`, "(ax+b)^{2}", [
            { id: "a", l: "a", e: a }, { id: "b", l: "b", e: b }
          ], `(${a}x${fmt(b, "")})^{2}`, { a: a * a, b: 2 * a * b, c: b * b });
        } else {
          const a = randInt(2, 5), b = randInt(1, 5);
          return q(id, difficulty, stage, fp, `${a * a}x^{2}-${b * b}`, "(ax+b)(ax-b)", [
            { id: "a", l: "a", e: a }, { id: "b", l: "b", e: b }
          ], `(${a}x+${b})(${a}x-${b})`, { a: a * a, b: 0, c: -b * b });
        }
      }
    });
  }

  // ===================== FRACTIONS =====================
  if (stage === "FRACTIONS") {
    return Array.from({ length: count }).map((_, i) => {
      const id = `R_${difficulty}_${i}`;
      if (difficulty === "BASIC") {
        const a = randInt(2, 6);
        if (Math.random() > 0.5) {
          return q(id, difficulty, stage, rp, `\\frac{${a * 2}x}{${a}x^2}`, "\\frac{c}{ax}", [
            { id: "a", l: "a", e: 1 }
          ], `\\frac{2}{x}`);
        } else {
          return q(id, difficulty, stage, rp, `\\frac{${a * 2}x^2}{${a}x}`, "ax", [
            { id: "a", l: "a", e: 2 }
          ], `2x`);
        }
      } else if (difficulty === "CORE") {
        const b = randInt(2, 8) * getSign();
        return q(id, difficulty, stage, rp, `\\frac{x^{2}${fmt(b, "x")}}{x}`, "x+b", [
          { id: "b", l: "b", e: b }
        ], `x${fmt(b, "")}`);
      } else if (difficulty === "ADVANCED") {
        const r1 = randInt(1, 5) * getSign(), r2 = randInt(1, 5) * getSign();
        const b = r1 + r2, c = r1 * r2;
        return q(id, difficulty, stage, rp, `\\frac{x^{2}${fmt(b, "x")}${fmt(c, "")}}{x${fmt(r1, "")}}`, "x+b", [
          { id: "b", l: "b", e: r2 }
        ], `x${fmt(r2, "")}`);
      } else {
        const a = randInt(2, 4), r1 = randInt(1, 4) * getSign(), r2 = randInt(1, 4) * getSign();
        const b = a * r2 + r1, c = r1 * r2;
        return q(id, difficulty, stage, rp, `\\frac{${a}x^{2}${fmt(b, "x")}${fmt(c, "")}}{x${fmt(r2, "")}}`, "ax+b", [
          { id: "a", l: "a", e: a }, { id: "b", l: "b", e: r1 }
        ], `${a}x${fmt(r1, "")}`);
      }
    });
  }

  // ===================== EQUATIONS =====================
  if (stage === "EQUATIONS") {
    const P = "PARABOLA" as const;
    return Array.from({ length: count }).map((_, i) => {
      const id = `E_${difficulty}_${i}`;
      if (difficulty === "BASIC") {
        if (Math.random() > 0.5) {
          const r = randInt(1, 6);
          return q(id, difficulty, stage, ep, `x^{2}=${r * r}`, "x=\\pm k", [
            { id: "k", l: "k", e: r }
          ], `x=\\pm ${r}`, { a: 1, b: 0, c: -r * r, vizMode: P });
        } else {
          const r = randInt(1, 8) * getSign();
          return q(id, difficulty, stage, ep, `x(x${fmt(-r, "")})=0`, "x_1, x_2", [
            { id: "x1", l: "x_1", e: Math.min(0, r) }, { id: "x2", l: "x_2", e: Math.max(0, r) }
          ], `${Math.min(0, r)}, ${Math.max(0, r)}`, { a: 1, b: -r, c: 0, vizMode: P });
        }
      } else if (difficulty === "CORE") {
        const r1 = randInt(1, 5) * getSign(), r2 = randInt(1, 5) * getSign();
        const b = -(r1 + r2), c = r1 * r2;
        return q(id, difficulty, stage, ep, `x^{2}${fmt(b, "x")}${fmt(c, "")}=0`, "x_1, x_2", [
          { id: "x1", l: "x_1", e: Math.min(r1, r2) }, { id: "x2", l: "x_2", e: Math.max(r1, r2) }
        ], `${Math.min(r1, r2)}, ${Math.max(r1, r2)}`, { a: 1, b, c, vizMode: P });
      } else if (difficulty === "ADVANCED") {
        const a = randInt(1, 3);
        const r1 = randInt(1, 5) * getSign(), r2 = randInt(1, 5) * getSign();
        const b = -a * (r1 + r2), c = a * r1 * r2;
        return q(id, difficulty, stage, ep, `${a === 1 ? "" : a}x^{2}${fmt(b, "x")}${fmt(c, "")}=0`, "x_1, x_2", [
          { id: "x1", l: "x_1", e: Math.min(r1, r2) }, { id: "x2", l: "x_2", e: Math.max(r1, r2) }
        ], `${Math.min(r1, r2)}, ${Math.max(r1, r2)}`, { a, b, c, vizMode: P });
      } else {
        if (Math.random() > 0.5) {
          const r = randInt(1, 5) * getSign();
          const b = -2 * r, c = r * r;
          return q(id, difficulty, stage, ep, `x^{2}${fmt(b, "x")}+k=0,\\;x=${r}`, "k", [
            { id: "k", l: "k", e: c }
          ], `k=${c}`, { a: 1, b, c, vizMode: P });
        } else {
          const r = randInt(1, 5) * getSign();
          const b = -2 * r, c = r * r;
          return q(id, difficulty, stage, ep, `x^{2}${fmt(b, "x")}${fmt(c, "")}=0`, "x", [
            { id: "x", l: "x", e: r }
          ], `x=${r}`, { a: 1, b, c, vizMode: P });
        }
      }
    });
  }

  return [];
}

export default function S301Page() {
  const { completeStage, currentLanguage } = useAppStore();
  const { t } = useLanguage();

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t("sm3_01"), d, s), [t]);

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
    adaptiveRecommendation,
    aiFeedback,
    isRequestingAi,
    requestAiFeedback
  } = useQuestManager<S301Quest, Stage>({
    moduleCode: "sm3-01",
    buildPool,
    initialStage: "TERMS",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("sm3-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stages = [
    { id: "TERMS", label: t("sm3_01.stages.terms") },
    { id: "FACTORIZE", label: t("sm3_01.stages.factorize") },
    { id: "FRACTIONS", label: t("sm3_01.stages.fractions") },
    { id: "EQUATIONS", label: t("sm3_01.stages.equations") },
  ];

  if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sm3_01.title")}
      moduleCode="SM3.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      successRate={successRate}
      footerLeft={t("sm3_01.footer_left")}
      checkStatus={lastCheck}
      translations={{
        back: t("sm3_01.back"),
        check: t("sm3_01.check"),
        next: t("sm3_01.next"),
        correct: t("sm3_01.correct"),
        incorrect: t("sm3_01.incorrect"),
        ready: t("sm3_01.ready"),
        monitor_title: t("sm3_01.monitor_title"),
        difficulty: {
          basic: t("sm3_01.difficulty.basic"),
          core: t("sm3_01.difficulty.core"),
          advanced: t("sm3_01.difficulty.advanced"),
          elite: t("sm3_01.difficulty.elite"),
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
            <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t("sm3_01.objective_title")}</h3>
            <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic">
              <InlineMath math={currentQuest?.promptLatex || ""} />
            </p>
          </div>

          <div className="flex justify-center overflow-x-auto w-full">
            <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
              <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t("sm3_01.target_title")}</span>
              <div className="space-y-4">
                <div className="text-white font-black text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[0.95] whitespace-nowrap">
                  <InlineMath math={currentQuest?.expressionLatex || ""} />
                </div>
                <div className="text-white/60 font-black">
                  <InlineMath math={currentQuest?.targetLatex || ""} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t("sm3_01.labels.input")}</div>
            {currentQuest?.slotGroups ? (
              <div className="space-y-4">
                {currentQuest?.slotGroups.map((group) => (
                  <div key={group.titleLatex} className="space-y-3">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                      <InlineMath math={group.titleLatex} />
                    </div>
                    <div className={clsx("grid gap-4", group.slotIds.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                      {group.slotIds.map((slotId) => {
                        const slot = currentQuest?.slots.find((s) => s.id === slotId);
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
              <div className={clsx("grid gap-4", ((currentQuest?.slots) || []).length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                {currentQuest?.slots.map((slot) => (
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
              {t("sm3_01.labels.fraction_hint")}
            </div>

            {stage === "FACTORIZE" && currentQuest?.slots.some((s) => s.id === "A") && currentQuest?.slots.some((s) => s.id === "B") && (
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
