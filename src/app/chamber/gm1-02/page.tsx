"use client";

import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useCallback, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import IntegralVisualization from "@/components/chamber/gm1-02/IntegralVisualization";

type Stage = "ANTIDERIVATIVE" | "DEFINITE_INTEGRAL" | "APPLICATION";

interface GM102Quest extends Quest {
  stage: Stage;
  functionCoeffs: number[];
  lowerBound?: number;
  upperBound?: number;
  integrationConstant?: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

// ANTIDERIVATIVE (不定积分) 数据池
// BASIC: 基本幂函数 ∫x^n dx (n=1,2,3,4,5)
const antiderivativeDataBasic = [
  { id: "A_B1", coeffs: [0, 1], n: 1 }, // ∫x dx = x²/2 + C
  { id: "A_B2", coeffs: [0, 0, 1], n: 2 }, // ∫x² dx = x³/3 + C
  { id: "A_B3", coeffs: [0, 0, 0, 1], n: 3 }, // ∫x³ dx = x⁴/4 + C
  { id: "A_B4", coeffs: [0, 0, 0, 0, 1], n: 4 }, // ∫x⁴ dx = x⁵/5 + C
  { id: "A_B5", coeffs: [0, 0, 0, 0, 0, 1], n: 5 }, // ∫x⁵ dx = x⁶/6 + C
];

// CORE: 系数幂函数和多项式
const antiderivativeDataCore = [
  { id: "A_C1", coeffs: [0, 2], n: 1 }, // ∫2x dx = x² + C
  { id: "A_C2", coeffs: [0, 0, 3], n: 2 }, // ∫3x² dx = x³ + C
  { id: "A_C3", coeffs: [1, 3, 1], n: 2 }, // ∫(x²+3x+1) dx
  { id: "A_C4", coeffs: [2, 1, 2], n: 2 }, // ∫(2x²+x+2) dx
  { id: "A_C5", coeffs: [0, 4, 2], n: 2 }, // ∫(2x²+4x) dx
];

// ADVANCED: 更复杂的多项式
const antiderivativeDataAdvanced = [
  { id: "A_A1", coeffs: [1, -2, 3], n: 2 }, // ∫(3x²-2x+1) dx
  { id: "A_A2", coeffs: [0, 0, 2, 3], n: 3 }, // ∫(3x³+2x²) dx
  { id: "A_A3", coeffs: [-1, 2, 1], n: 2 }, // ∫(x²+2x-1) dx
  { id: "A_A4", coeffs: [3, -4, 2], n: 2 }, // ∫(2x²-4x+3) dx
  { id: "A_A5", coeffs: [0, 0, 0, 1, 2], n: 4 }, // ∫(2x⁴+x³) dx
];

// ELITE: 高次多项式
const antiderivativeDataElite = [
  { id: "A_E1", coeffs: [1, -3, 2, 1], n: 3 }, // ∫(x³+2x²-3x+1) dx
  { id: "A_E2", coeffs: [0, 0, 0, 0, 1, 3], n: 5 }, // ∫(3x⁵+x⁴) dx
  { id: "A_E3", coeffs: [2, -1, 3, -2], n: 3 }, // ∫(-2x³+3x²-x+2) dx
  { id: "A_E4", coeffs: [0, 0, 0, 2, -3, 1], n: 5 }, // ∫(x⁵-3x⁴+2x³) dx
  { id: "A_E5", coeffs: [-2, 4, -3, 2], n: 3 }, // ∫(2x³-3x²+4x-2) dx
];

// DEFINITE_INTEGRAL (定积分) 数据池
// BASIC: 简单区间
const definiteDataBasic = [
  { id: "D_B1", coeffs: [0, 1], a: 0, b: 1 }, // ∫₀¹ x dx
  { id: "D_B2", coeffs: [0, 0, 1], a: 0, b: 2 }, // ∫₀² x² dx
  { id: "D_B3", coeffs: [0, 1], a: 0, b: 2 }, // ∫₀² x dx
  { id: "D_B4", coeffs: [0, 0, 1], a: 0, b: 1 }, // ∫₀¹ x² dx
  { id: "D_B5", coeffs: [0, 0, 0, 1], a: 0, b: 1 }, // ∫₀¹ x³ dx
];

// CORE: 包含负区间和对称区间
const definiteDataCore = [
  { id: "D_C1", coeffs: [0, 0, 1], a: -1, b: 1 }, // ∫₋₁¹ x² dx
  { id: "D_C2", coeffs: [0, 2], a: 1, b: 3 }, // ∫₁³ 2x dx
  { id: "D_C3", coeffs: [1, 1], a: 0, b: 2 }, // ∫₀² (x+1) dx
  { id: "D_C4", coeffs: [0, 0, 1], a: 1, b: 2 }, // ∫₁² x² dx
  { id: "D_C5", coeffs: [0, 0, 2], a: 0, b: 2 }, // ∫₀² 2x² dx
];

// ADVANCED: 更复杂的函数和区间
const definiteDataAdvanced = [
  { id: "D_A1", coeffs: [1, 2, 1], a: 0, b: 1 }, // ∫₀¹ (x²+2x+1) dx
  { id: "D_A2", coeffs: [0, -1, 1], a: 0, b: 2 }, // ∫₀² (x²-x) dx
  { id: "D_A3", coeffs: [2, 1, 1], a: 1, b: 2 }, // ∫₁² (x²+x+2) dx
  { id: "D_A4", coeffs: [0, 0, 0, 1], a: -1, b: 1 }, // ∫₋₁¹ x³ dx
  { id: "D_A5", coeffs: [0, 0, 1, 2], a: 0, b: 1 }, // ∫₀¹ (2x³+x²) dx
];

// ELITE: 复杂区间和高次函数
const definiteDataElite = [
  { id: "D_E1", coeffs: [1, -2, 3], a: 0, b: 2 }, // ∫₀² (3x²-2x+1) dx
  { id: "D_E2", coeffs: [0, 0, 0, 1, 1], a: -1, b: 1 }, // ∫₋₁¹ (x⁴+x³) dx
  { id: "D_E3", coeffs: [-1, 3, -2, 1], a: 1, b: 3 }, // ∫₁³ (x³-2x²+3x-1) dx
  { id: "D_E4", coeffs: [0, 0, 2, -1], a: 0, b: 2 }, // ∫₀² (-x³+2x²) dx
  { id: "D_E5", coeffs: [2, -3, 1, 2], a: -1, b: 2 }, // ∫₋₁² (2x³+x²-3x+2) dx
];

// APPLICATION (应用) 数据池
// BASIC: 直线下面积
const applicationDataBasic = [
  { id: "AP_B1", coeffs: [0, 2], a: 0, b: 3, context: "line" as const }, // 直线 y=2x
  { id: "AP_B2", coeffs: [1, 1], a: 0, b: 2, context: "line" as const }, // 直线 y=x+1
  { id: "AP_B3", coeffs: [0, 3], a: 0, b: 2, context: "line" as const }, // 直线 y=3x
  { id: "AP_B4", coeffs: [2, 1], a: 0, b: 1, context: "line" as const }, // 直线 y=x+2
  { id: "AP_B5", coeffs: [0, 1], a: 0, b: 4, context: "line" as const }, // 直线 y=x
];

// CORE: 抛物线下面积
const applicationDataCore = [
  { id: "AP_C1", coeffs: [0, 0, 1], a: 0, b: 2, context: "parabola" as const }, // y=x²
  { id: "AP_C2", coeffs: [0, 0, 2], a: 0, b: 1, context: "parabola" as const }, // y=2x²
  { id: "AP_C3", coeffs: [1, 0, 1], a: 0, b: 1, context: "parabola" as const }, // y=x²+1
  { id: "AP_C4", coeffs: [0, 0, 1], a: 1, b: 3, context: "parabola" as const }, // y=x²
  { id: "AP_C5", coeffs: [0, 1, 1], a: 0, b: 2, context: "parabola" as const }, // y=x²+x
];

// ADVANCED: 两曲线间面积
const applicationDataAdvanced = [
  { id: "AP_A1", coeffs: [0, 0, 1], a: 0, b: 2, context: "between" as const, upper: [0, 4] }, // 4 - x²
  { id: "AP_A2", coeffs: [0, 0, 1], a: 0, b: 1, context: "between" as const, upper: [0, 2] }, // 2 - x²
  { id: "AP_A3", coeffs: [0, 0, 2], a: 0, b: 1, context: "between" as const, upper: [0, 3] }, // 3 - 2x²
  { id: "AP_A4", coeffs: [0, 1], a: 0, b: 2, context: "between" as const, upper: [0, 4] }, // 4 - x
  { id: "AP_A5", coeffs: [0, 0, 1], a: 1, b: 2, context: "between" as const, upper: [0, 5] }, // 5 - x²
];

// ELITE: 综合应用
const applicationDataElite = [
  { id: "AP_E1", coeffs: [0, 0, 1], a: 0, b: 3, context: "volume" as const }, // 旋转体体积
  { id: "AP_E2", coeffs: [0, 1], a: 0, b: 4, context: "volume" as const }, // 旋转体体积
  { id: "AP_E3", coeffs: [1, 1, 1], a: 0, b: 2, context: "work" as const }, // 功的计算
  { id: "AP_E4", coeffs: [0, 0, 2], a: 0, b: 2, context: "volume" as const }, // 旋转体体积
  { id: "AP_E5", coeffs: [0, 2], a: 1, b: 3, context: "work" as const }, // 功的计算
];

function buildStagePool(
  t: ReturnType<typeof useLanguage>["t"],
  difficulty: Difficulty,
  stage: Stage
): GM102Quest[] {
  if (stage === "ANTIDERIVATIVE") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = antiderivativeDataBasic; break;
      case "CORE": dataSet = antiderivativeDataCore; break;
      case "ADVANCED": dataSet = antiderivativeDataAdvanced; break;
      case "ELITE": dataSet = antiderivativeDataElite; break;
      default: dataSet = antiderivativeDataBasic;
    }

    return dataSet.map((item) => {
      // 构建函数表达式
      const buildExpr = (coeffs: number[]) => {
        const terms: string[] = [];
        for (let i = coeffs.length - 1; i >= 0; i--) {
          const coeff = coeffs[i];
          if (coeff === 0) continue;
          
          let term = "";
          if (i === 0) {
            term = `${coeff}`;
          } else if (i === 1) {
            term = coeff === 1 ? "x" : `${coeff}x`;
          } else {
            term = coeff === 1 ? `x^{${i}}` : `${coeff}x^{${i}}`;
          }
          
          if (terms.length > 0 && coeff > 0) {
            terms.push(`+${term}`);
          } else {
            terms.push(term);
          }
        }
        return terms.join("");
      };

      // 计算不定积分（在 x=1 处的值作为验证）
      const antiderivative = (x: number) => {
        let sum = 0;
        for (let i = 0; i < item.coeffs.length; i++) {
          sum += (item.coeffs[i] * Math.pow(x, i + 1)) / (i + 1);
        }
        return sum;
      };

      const answer = round2(antiderivative(1));
      const expr = buildExpr(item.coeffs);

      return {
        id: item.id,
        difficulty,
        stage,
        functionCoeffs: item.coeffs,
        promptLatex: t("gm1_02.prompts.find_antiderivative", { expr }),
        expressionLatex: `\\int (${expr}) dx`,
        targetLatex: "F(1)",
        slots: [
          {
            id: "answer",
            labelLatex: "F(1)",
            placeholder: "value",
            expected: answer,
          },
        ],
        correctLatex: `F(1) = ${answer}`,
      };
    });
  }

  if (stage === "DEFINITE_INTEGRAL") {
    let dataSet;
    switch (difficulty) {
      case "BASIC": dataSet = definiteDataBasic; break;
      case "CORE": dataSet = definiteDataCore; break;
      case "ADVANCED": dataSet = definiteDataAdvanced; break;
      case "ELITE": dataSet = definiteDataElite; break;
      default: dataSet = definiteDataBasic;
    }

    return dataSet.map((item) => {
      const buildExpr = (coeffs: number[]) => {
        const terms: string[] = [];
        for (let i = coeffs.length - 1; i >= 0; i--) {
          const coeff = coeffs[i];
          if (coeff === 0) continue;
          
          let term = "";
          if (i === 0) {
            term = `${coeff}`;
          } else if (i === 1) {
            term = coeff === 1 ? "x" : `${coeff}x`;
          } else {
            term = coeff === 1 ? `x^{${i}}` : `${coeff}x^{${i}}`;
          }
          
          if (terms.length > 0 && coeff > 0) {
            terms.push(`+${term}`);
          } else {
            terms.push(term);
          }
        }
        return terms.join("");
      };

      const antiderivative = (x: number) => {
        let sum = 0;
        for (let i = 0; i < item.coeffs.length; i++) {
          sum += (item.coeffs[i] * Math.pow(x, i + 1)) / (i + 1);
        }
        return sum;
      };

      const answer = round2(antiderivative(item.b) - antiderivative(item.a));
      const expr = buildExpr(item.coeffs);

      return {
        id: item.id,
        difficulty,
        stage,
        functionCoeffs: item.coeffs,
        lowerBound: item.a,
        upperBound: item.b,
        promptLatex: t("gm1_02.prompts.evaluate_integral", { expr, a: item.a, b: item.b }),
        expressionLatex: `\\int_{${item.a}}^{${item.b}} (${expr}) dx`,
        targetLatex: "\\\\text{Area}",
        slots: [
          {
            id: "answer",
            labelLatex: "\\\\text{Result}",
            placeholder: "value",
            expected: answer,
          },
        ],
        correctLatex: `\\int_{${item.a}}^{${item.b}} = ${answer}`,
      };
    });
  }

  // APPLICATION stage
  let dataSet;
  switch (difficulty) {
    case "BASIC": dataSet = applicationDataBasic; break;
    case "CORE": dataSet = applicationDataCore; break;
    case "ADVANCED": dataSet = applicationDataAdvanced; break;
    case "ELITE": dataSet = applicationDataElite; break;
    default: dataSet = applicationDataBasic;
  }

  return dataSet.map((item) => {
    const buildExpr = (coeffs: number[]) => {
      const terms: string[] = [];
      for (let i = coeffs.length - 1; i >= 0; i--) {
        const coeff = coeffs[i];
        if (coeff === 0) continue;
        
        let term = "";
        if (i === 0) {
          term = `${coeff}`;
        } else if (i === 1) {
          term = coeff === 1 ? "x" : `${coeff}x`;
        } else {
          term = coeff === 1 ? `x^{${i}}` : `${coeff}x^{${i}}`;
        }
        
        if (terms.length > 0 && coeff > 0) {
          terms.push(`+${term}`);
        } else {
          terms.push(term);
        }
      }
      return terms.join("");
    };

    const antiderivative = (x: number, coeffs: number[]) => {
      let sum = 0;
      for (let i = 0; i < coeffs.length; i++) {
        sum += (coeffs[i] * Math.pow(x, i + 1)) / (i + 1);
      }
      return sum;
    };

    let answer: number;
    const expr = buildExpr(item.coeffs);

    if (item.context === "between" && item.upper) {
      // 两曲线间面积
      const area1 = antiderivative(item.b, item.upper) - antiderivative(item.a, item.upper);
      const area2 = antiderivative(item.b, item.coeffs) - antiderivative(item.a, item.coeffs);
      answer = round2(area1 - area2);
    } else if (item.context === "volume") {
      // 旋转体体积 V = π∫[a,b] f²(x) dx
      const integrand = item.coeffs.map((c, i) => {
        const newCoeffs = new Array(2 * i + 1).fill(0);
        newCoeffs[2 * i] = c * c;
        return newCoeffs;
      });
      const combined = integrand.reduce((acc, curr) => {
        const result = [...acc];
        curr.forEach((val, idx) => {
          result[idx] = (result[idx] || 0) + val;
        });
        return result;
      }, []);
      const integral = antiderivative(item.b, combined) - antiderivative(item.a, combined);
      answer = round2(Math.PI * integral);
    } else {
      // 普通面积
      answer = round2(antiderivative(item.b, item.coeffs) - antiderivative(item.a, item.coeffs));
    }

    return {
      id: item.id,
      difficulty,
      stage,
      functionCoeffs: item.coeffs,
      lowerBound: item.a,
      upperBound: item.b,
      promptLatex: t("gm1_02.prompts.find_area", { expr, a: item.a, b: item.b }),
      expressionLatex: `f(x) = ${expr}`,
      targetLatex: "\\\\text{Area}",
      slots: [
        {
          id: "answer",
          labelLatex: "\\\\text{Area}",
          placeholder: "value",
          expected: answer,
        },
      ],
      correctLatex: `\\\\text{Area} = ${answer}`,
    };
  });
}

export default function GM102Page() {
  const { t } = useLanguage();
  const { completeStage } = useAppStore();

  const buildPoolCallback = useCallback(
    (d: Difficulty, s: Stage) => buildStagePool(t, d, s),
    [t]
  );

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
  } = useQuestManager<GM102Quest, Stage>({
    buildPool: buildPoolCallback,
    initialStage: "ANTIDERIVATIVE",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("gm1-02", stage);
    }
  }, [lastCheck, completeStage, stage]);

  return (
    <ChamberLayout
      title={t("gm1_02.title")}
      moduleCode="GM1.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "ANTIDERIVATIVE", label: t("gm1_02.stages.antiderivative") },
        { id: "DEFINITE_INTEGRAL", label: t("gm1_02.stages.definite_integral") },
        { id: "APPLICATION", label: t("gm1_02.stages.application") },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("gm1_02.footer_left")}
      translations={{
        back: t("gm1_02.back"),
        check: t("gm1_02.check"),
        next: t("gm1_02.next"),
        correct: t("gm1_02.correct"),
        incorrect: t("gm1_02.incorrect"),
        ready: t("gm1_02.ready"),
        monitor_title: t("gm1_02.monitor_title"),
        difficulty: {
          basic: t("gm1_02.difficulty.basic"),
          core: t("gm1_02.difficulty.core"),
          advanced: t("gm1_02.difficulty.advanced"),
          elite: t("gm1_02.difficulty.elite"),
        },
      }}
      monitorContent={
        <div className="space-y-4 h-full flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t("gm1_02.monitor_title")}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t("gm1_02.target_title")}
            </div>
            <div className="text-white font-black text-lg">
              <InlineMath math={currentQuest?.expressionLatex || ""} />
            </div>
            {stage === "ANTIDERIVATIVE" && (
              <div className="text-white/70 text-sm">
                <InlineMath math={t("gm1_02.prompts.hint_power")} />
              </div>
            )}
            {stage === "DEFINITE_INTEGRAL" && (
              <div className="text-white/70 text-sm">
                <InlineMath math={t("gm1_02.prompts.hint_definite")} />
              </div>
            )}
            {stage === "APPLICATION" && (
              <div className="text-white/70 text-sm">
                <InlineMath math={t("gm1_02.prompts.hint_area")} />
              </div>
            )}
          </div>
          <div className="flex-1 min-h-0">
            <IntegralVisualization
              quest={currentQuest}
              inputs={inputs}
              checkStatus={lastCheck}
            />
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t("gm1_02.mission.title")}
          </h3>
          <p className="text-base text-white/70 font-mono">{t("gm1_02.mission.description")}</p>
        </div>

        {/* Scenario Description */}
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 max-w-4xl mx-auto">
          <div className="text-sm text-green-400/90 leading-relaxed whitespace-pre-line">
            {stage === "ANTIDERIVATIVE" && t("gm1_02.scenarios.antiderivative")}
            {stage === "DEFINITE_INTEGRAL" && t("gm1_02.scenarios.definite_integral")}
            {stage === "APPLICATION" && t("gm1_02.scenarios.application")}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t("gm1_02.objective_title")}
          </h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={currentQuest?.promptLatex || ""} />
          </p>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                  <InlineMath math={slot.labelLatex} />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={inputs[slot.id] ?? ""}
                    onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                    className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white text-white font-black text-2xl"
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
          <div className="text-[10px] text-white/90 font-mono italic text-center">
            {t("gm1_02.input_tip_2dp")}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
