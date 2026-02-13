"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import DerivativeVisualization from "@/components/chamber/gm1-01/DerivativeVisualization";

type Challenge = "COMPOSITE" | "MODELING" | "OPTIMIZATION" | "ANALYSIS";
type G101AdvT = typeof translations.EN.gm1_01_advanced;

interface Problem {
  id: string;
  challenge: Challenge;
  scenario: string;
  functionLatex: string;
  question: string;
  answerSlots: { id: string; label: string; expected: number }[];
  hint?: string;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

export default function G101AdvancedPage() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].gm1_01_advanced;

  const [challenge, setChallenge] = useState<Challenge>("COMPOSITE");
  const [currentProblem, setCurrentProblem] = useState(0);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checkResult, setCheckResult] = useState<"correct" | "incorrect" | null>(null);

  // Composite function problems - combining multiple rules
  const compositeProblems: Problem[] = [
    {
      id: "C1",
      challenge: "COMPOSITE",
      scenario: t.scenarios.composite_1,
      functionLatex: "f(x) = (2x^2 + 3x) \\cdot \\sin(x)",
      question: t.questions.find_derivative,
      answerSlots: [
        { id: "derivative", label: "f'(2)", expected: round2((4*2 + 3) * Math.sin(2) + (2*4 + 6) * Math.cos(2)) }
      ],
      hint: t.hints.use_product_rule
    },
    {
      id: "C2",
      challenge: "COMPOSITE",
      scenario: t.scenarios.composite_2,
      functionLatex: "f(x) = \\frac{x^2 + 1}{\\sin(x)}",
      question: t.questions.find_derivative,
      answerSlots: [
        { id: "derivative", label: "f'(1)", expected: round2((2*1 * Math.sin(1) - (1 + 1) * Math.cos(1)) / (Math.sin(1) * Math.sin(1))) }
      ],
      hint: t.hints.use_quotient_rule
    }
  ];

  const problems = compositeProblems;

  const handleVerify = () => {
    const problem = problems[currentProblem];
    let allCorrect = true;

    for (const slot of problem.answerSlots) {
      const userValue = parseFloat(inputs[slot.id] || "0");
      if (Math.abs(userValue - slot.expected) > 0.2) {
        allCorrect = false;
        break;
      }
    }

    setCheckResult(allCorrect ? "correct" : "incorrect");
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setInputs({});
      setCheckResult(null);
    }
  };

  const problem = problems[currentProblem];

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="GM1.01-ADV"
      difficulty="ADVANCED"
      onDifficultyChange={() => {}}
      stages={[
        { id: "COMPOSITE", label: t.challenges.composite },
        { id: "MODELING", label: t.challenges.modeling },
        { id: "OPTIMIZATION", label: t.challenges.optimization },
        { id: "ANALYSIS", label: t.challenges.analysis },
      ]}
      currentStage={challenge}
      onStageChange={(s) => setChallenge(s as Challenge)}
      onVerify={handleVerify}
      onNext={handleNext}
      checkStatus={checkResult ? { ok: checkResult === "correct", correct: "" } : null}
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
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <DerivativeVisualization
            functionLatex={problem.functionLatex}
            xPosition={2}
            translations={{
              title: t.visualization.title,
              xLabel: t.visualization.x_label,
              yLabel: t.visualization.y_label,
              functionLabel: t.visualization.function_label,
              pointLabel: t.visualization.point_label,
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t.visualization_title}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t.hint_label}
            </div>
            <div className="text-white/70 text-sm font-mono">
              {problem.hint}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t.mission.title}
          </h3>
          <p className="text-base text-white/70 font-mono">{t.mission.description}</p>
        </div>

        {/* Scenario */}
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-cyan-400/90 leading-relaxed whitespace-pre-line">
            {problem.scenario}
          </div>
        </div>

        {/* Function Display */}
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t.function_label}
          </h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={problem.functionLatex} />
          </p>
        </div>

        {/* Question */}
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t.question_label}
          </h3>
          <p className="text-xl text-white/90 font-mono">{problem.question}</p>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {problem.answerSlots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  {slot.label}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {currentLanguage === 'DE'
              ? "Tipp: Gib das Resultat auf 2 Dezimalstellen gerundet an."
              : currentLanguage === 'CN'
                ? "提示：保留 2 位小数。"
                : "Tip: Enter result rounded to 2 decimal places."
            }
          </div>
        </div>

        {/* Progress */}
        <div className="text-center text-sm text-white/50 font-mono">
          {t.progress}: {currentProblem + 1} / {problems.length}
        </div>
      </div>
    </ChamberLayout>
  );
}
