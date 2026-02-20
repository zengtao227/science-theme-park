"use client";

import { useAppStore } from "@/lib/store";
import { useLanguage, TranslationKeys } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import MatrixVisualization2D from "@/components/chamber/em2-01/MatrixVisualization2D";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

type Stage = "BASIC_TRANSFORMS" | "DETERMINANT" | "COMPOSITION";

interface MatrixQuest extends Quest {
  stage: Stage;
  type: "identify" | "calculate_det" | "calculate_matrix" | "predict";
  matrix?: number[][];
  matrixA?: number[][];
  matrixB?: number[][];
  question: string;
  options?: string[];
  answer: string | number;
  explanation: string;
}

// Build quest pool
function buildMatrixPool(getT: any, tObj: TranslationKeys['em2_01'], difficulty: Difficulty, stage: Stage): MatrixQuest[] {
  const t = getT;
  const pool: MatrixQuest[] = [];
  let idCounter = 0;

  const createQuest = (
    type: MatrixQuest["type"],
    question: string,
    answer: string | number,
    explanation: string,
    matrix?: number[][],
    matrixA?: number[][],
    matrixB?: number[][],
    options?: string[]
  ): MatrixQuest => {
    const id = `em2-01-${stage}-${difficulty}-${idCounter++}`;

    // Create slots based on type
    let slots: MatrixQuest["slots"] = [];
    if (type === "calculate_det") {
      slots = [{
        id: "det",
        labelLatex: "det(A)",
        placeholder: "det",
        expected: answer as number,
      }];
    } else if (type === "calculate_matrix") {
      slots = [
        { id: "a11", labelLatex: "a_{11}", placeholder: "0", expected: 0 },
        { id: "a12", labelLatex: "a_{12}", placeholder: "0", expected: 0 },
        { id: "a21", labelLatex: "a_{21}", placeholder: "0", expected: 0 },
        { id: "a22", labelLatex: "a_{22}", placeholder: "0", expected: 0 },
      ];
    }

    return {
      id,
      difficulty,
      stage,
      promptLatex: question,
      expressionLatex: matrix ? `\\begin{bmatrix} ${matrix[0][0]} & ${matrix[0][1]} \\\\ ${matrix[1][0]} & ${matrix[1][1]} \\end{bmatrix}` : "",
      targetLatex: type === "calculate_det" ? "\\text{det}(A) = ?" : "",
      slots,
      correctLatex: String(answer),
      type,
      matrix,
      matrixA,
      matrixB,
      question,
      options,
      answer,
      explanation,
    };
  };

  if (stage === "BASIC_TRANSFORMS") {
    if (difficulty === "BASIC") {
      pool.push(createQuest("identify", t("em2_01.prompts.identify_trans"), "Scaling x2", "Uniform scaling", [[2, 0], [0, 2]], undefined, undefined, ["Scaling x2", "Rotation 90", "Shear", "Reflection"]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_trans"), "Stretch X x3", "Stretch X", [[3, 0], [0, 1]], undefined, undefined, ["Stretch X x3", "Stretch Y x3", "Rotation", "Shear"]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_scale", { k: 2 }), "2,0,0,2", "Diagonal 2,2", [[2, 0], [0, 2]]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_trans"), "Reflection X", "Flip Y", [[1, 0], [0, -1]], undefined, undefined, ["Reflection X", "Reflection Y", "Rotation", "Identity"]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_custom", { desc: "Identity" }), "1,0,0,1", "Identity", [[1, 0], [0, 1]]));
    } else if (difficulty === "CORE") {
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_rot", { deg: 90 }), "0,-1,1,0", "CCW 90", [[0, -1], [1, 0]]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_trans"), "Rotation 90 CCW", "Rot 90", [[0, -1], [1, 0]], undefined, undefined, ["Rotation 90 CCW", "Rotation 90 CW", "Scale", "Shear"]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_rot", { deg: 180 }), "-1,0,0,-1", "Rot 180", [[-1, 0], [0, -1]]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_trans"), "Rotation 180", "Flip X and Y", [[-1, 0], [0, -1]], undefined, undefined, ["Rotation 180", "Reflection", "Identity", "Shear"]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_scale", { k: 0.5 }), "0.5,0,0,0.5", "Shrink", [[0.5, 0], [0, 0.5]]));
    } else if (difficulty === "ADVANCED") {
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_shear", { k: 2 }), "1,2,0,1", "Shear X by 2Y", [[1, 2], [0, 1]]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_trans"), "Vertical Shear", "Shear Y", [[1, 0], [1.5, 1]], undefined, undefined, ["Vertical Shear", "Horizontal Shear", "Rotation", "Scale"]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_trans"), "Scale + Shear", "Mixed", [[2, 1], [0, 2]], undefined, undefined, ["Scale + Shear", "Rotation", "Reflection", "Identity"]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_reflect", { axis: "Y" }), "-1,0,0,1", "Flip X", [[-1, 0], [0, 1]]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_rot", { deg: 270 }), "0,1,-1,0", "CW 90", [[0, 1], [-1, 0]]));
    } else { // ELITE
      pool.push(createQuest("calculate_matrix", "Rot 90 then Scale 2", "0,-2,2,0", "Composite", [[0, -2], [2, 0]]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_trans"), "Rotation + Scale", "Mixed", [[1.5, -0.5], [0.5, 1.5]], undefined, undefined, ["Rotation + Scale", "Shear", "Reflection", "Project"]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.create_custom", { desc: "Inverse Scale 2" }), "0.5,0,0,0.5", "Inv", [[0.5, 0], [0, 0.5]]));
      pool.push(createQuest("identify", "Is Rotation?", "Yes", "Orthonormal", [[0.6, 0.8], [-0.8, 0.6]], undefined, undefined, ["Yes", "No"]));
      pool.push(createQuest("calculate_matrix", "Reflection y=x", "0,1,1,0", "Swap XY", [[0, 1], [1, 0]]));
    }
  }

  if (stage === "DETERMINANT") {
    if (difficulty === "BASIC") {
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 6, "2*3=6", [[2, 0], [0, 3]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 16, "4*4=16", [[4, 0], [0, 4]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 1, "Identity", [[1, 0], [0, 1]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 10, "5*2=10", [[5, 0], [0, 2]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 4, "2*2=4", [[2, 0], [0, 2]]));
    } else if (difficulty === "CORE") {
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 10, "3*4-1*2", [[3, 1], [2, 4]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 5, "2*4-3*1", [[2, 3], [1, 4]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 1, "Rot", [[0, -1], [1, 0]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 1, "Shear", [[1, 2], [0, 1]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), -2, "Flip", [[-2, 0], [0, 1]]));
    } else if (difficulty === "ADVANCED") {
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 0, "Singular", [[2, -3], [-4, 6]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 5, "Negatives", [[-2, 1], [3, -4]]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_prop", { desc: "det=0" }), "Line collapse", "Singular", [[1, 2], [2, 4]], undefined, undefined, ["Line collapse", "Preserve Area", "Double Area", "Invert"]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 0, "Prop rows", [[1, 2], [2, 4]]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), -1, "Reflection", [[0, 1], [1, 0]]));
    } else { // ELITE
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 1, "Rot", [[0.8, 0.6], [-0.6, 0.8]]));
      pool.push(createQuest("identify", t("em2_01.prompts.property_det"), "det(A)det(B)", "Product", undefined, [[2, 0], [0, 3]], [[1, 2], [0, 1]], ["det(A)det(B)", "Sum", "Diff", "None"]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 0, "Dep cols", [[3, -1], [-6, 2]]));
      pool.push(createQuest("identify", t("em2_01.prompts.identify_prop", { desc: "det(Inverse)" }), "1/det(A)", "Inverse", [[2, 1], [1, 3]], undefined, undefined, ["1/det(A)", "det(A)", "-det(A)", "0"]));
      pool.push(createQuest("calculate_det", t("em2_01.prompts.calc_det"), 1, "Complex Rot", [[0.6, -0.8], [0.8, 0.6]]));
    }
  }

  if (stage === "COMPOSITION") {
    if (difficulty === "BASIC") {
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.calc_prod"), "6,0,0,6", "Scale x Scale", undefined, [[2, 0], [0, 2]], [[3, 0], [0, 3]]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.calc_prod"), "2,0,0,3", "Stretch", undefined, [[2, 0], [0, 1]], [[1, 0], [0, 3]]));
      pool.push(createQuest("identify", "I x A = ?", "A", "Identity", undefined, [[1, 0], [0, 1]], [[2, 0], [0, 2]], ["A", "I", "0", "2A"]));
      pool.push(createQuest("calculate_matrix", "Rot 90 x Rot 90", "-1,0,0,-1", "180", undefined, [[0, -1], [1, 0]], [[0, -1], [1, 0]]));
      pool.push(createQuest("calculate_matrix", "Scale 2 x I", "2,0,0,2", "Scale", undefined, [[2, 0], [0, 2]], [[1, 0], [0, 1]]));
    } else if (difficulty === "CORE") {
      pool.push(createQuest("calculate_matrix", "Rot 90 x Scale 2", "0,-2,2,0", "Comp", undefined, [[0, -1], [1, 0]], [[2, 0], [0, 2]]));
      pool.push(createQuest("calculate_matrix", "Scale 2 x Rot 90", "0,-2,2,0", "Comp", undefined, [[2, 0], [0, 2]], [[0, -1], [1, 0]]));
      pool.push(createQuest("identify", "AB = BA?", "No", "Non-comm", undefined, [[1, 1], [0, 1]], [[1, 0], [1, 1]], ["No", "Yes", "Often", "Never"]));
      pool.push(createQuest("calculate_matrix", "A x B", "7,2,3,1", "Prod", undefined, [[1, 2], [0, 1]], [[1, 0], [3, 1]]));
      pool.push(createQuest("calculate_matrix", "S x S", "4,0,0,4", "Sq", undefined, [[2, 0], [0, 2]], [[2, 0], [0, 2]]));
    } else if (difficulty === "ADVANCED") {
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.calc_inv"), "0.5,0,0,0.5", "Inv Scale", [[0.5, 0], [0, 0.5]], [[2, 0], [0, 2]]));
      pool.push(createQuest("calculate_matrix", t("em2_01.prompts.calc_inv"), "0,1,-1,0", "Inv Rot", [[0, 1], [-1, 0]], [[0, -1], [1, 0]]));
      pool.push(createQuest("identify", "AB=I implies", "B=Inv(A)", "Inv", undefined, [[1, 2], [3, 4]], [[-2, 1], [1.5, -0.5]], ["B=Inv(A)", "B=A", "B=0", "B=I"]));
      pool.push(createQuest("calculate_matrix", "A x I", "3,1,2,4", "Id", [[3, 1], [2, 4]], [[3, 1], [2, 4]], [[1, 0], [0, 1]]));
      pool.push(createQuest("calculate_matrix", "Inv(Shear)", "1,-1,0,1", "Inv Shear", [[1, -1], [0, 1]], [[1, 1], [0, 1]]));
    } else { // ELITE
      pool.push(createQuest("calculate_matrix", "A x B", "2,-1,1,0", "Prod", undefined, [[1, 2], [0, 1]], [[0, -1], [1, 0]]));
      pool.push(createQuest("identify", "(AB)C = A(BC)?", "Yes", "Assoc", undefined, [[1, 0], [0, 1]], [[1, 0], [0, 1]], ["Yes", "No", "Sometimes", "Never"]));
      pool.push(createQuest("calculate_matrix", "Inv General", "1,-1,-1,2", "Formula", [[1, -1], [-1, 2]], [[2, 1], [1, 1]]));
      pool.push(createQuest("identify", "Invertible?", "No", "Singular", [[1, 2], [2, 4]], undefined, undefined, ["No", "Yes"]));
      pool.push(createQuest("calculate_matrix", "A^2", "1,2,0,1", "Power", undefined, [[1, 1], [0, 1]], [[1, 1], [0, 1]]));
    }
  }

  return pool;
}

export default function EM201Page() {
  const { currentLanguage } = useAppStore();
  const { t: getT } = useLanguage();
  const t = getT("em2_01");

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
    adaptiveRecommendation,
  } = useQuestManager<MatrixQuest, Stage>({
    moduleCode: "em2-01",
    buildPool: (d, s) => buildMatrixPool(getT, t, d, s),
    initialStage: "BASIC_TRANSFORMS",
  });

  const stagesProps = useMemo(() => [
    { id: "BASIC_TRANSFORMS" as Stage, label: t.stages.basic_transforms },
    { id: "DETERMINANT" as Stage, label: t.stages.determinant },
    { id: "COMPOSITION" as Stage, label: t.stages.composition },
  ], [t.stages]);

  // Get display matrix for visualization
  const getDisplayMatrix = (): number[][] => {
    if (!currentQuest) return [[1, 0], [0, 1]];
    if (currentQuest?.matrix) return currentQuest?.matrix;
    if (currentQuest?.matrixA) return currentQuest?.matrixA;

    // Try to parse user input for calculate_matrix type
    if (currentQuest?.type === "calculate_matrix") {
      const a11 = parseFloat(inputs.a11 || "1");
      const a12 = parseFloat(inputs.a12 || "0");
      const a21 = parseFloat(inputs.a21 || "0");
      const a22 = parseFloat(inputs.a22 || "1");
      if (!isNaN(a11) && !isNaN(a12) && !isNaN(a21) && !isNaN(a22)) {
        return [[a11, a12], [a21, a22]];
      }
    }

    return [[1, 0], [0, 1]];
  };

  const displayMatrix = getDisplayMatrix();

  if (!t || !t.stages) return null;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      title={t.title}
      moduleCode="EM2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
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
        difficulty: t.difficulty,
      }}
      monitorContent={
        <MatrixVisualization2D
          matrix={displayMatrix}
          stage={stage}
          language={currentLanguage}
        />
      }
    >
      {currentQuest && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
              {t.scenario_title}
            </div>
            <p className="text-sm text-white/80 font-mono max-w-2xl mx-auto leading-relaxed">
              {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
            </p>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-black">
                {currentQuest?.question}
              </div>
              {currentQuest?.expressionLatex && (
                <div className="text-2xl text-white font-black">
                  <BlockMath math={currentQuest?.expressionLatex || ""} />
                </div>
              )}
              {currentQuest?.matrixA && currentQuest?.matrixB && (
                <div className="space-y-2">
                  <BlockMath math={`A = \\begin{bmatrix} ${currentQuest?.matrixA[0][0]} & ${currentQuest?.matrixA[0][1]} \\\\ ${currentQuest?.matrixA[1][0]} & ${currentQuest?.matrixA[1][1]} \\end{bmatrix}`} />
                  <BlockMath math={`B = \\begin{bmatrix} ${currentQuest?.matrixB[0][0]} & ${currentQuest?.matrixB[0][1]} \\\\ ${currentQuest?.matrixB[1][0]} & ${currentQuest?.matrixB[1][1]} \\end{bmatrix}`} />
                </div>
              )}
            </div>

            {/* Input based on question type */}
            {(currentQuest?.type === "identify" || currentQuest?.type === "predict") && currentQuest?.options ? (
              <div className="space-y-3">
                {currentQuest?.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputs({ answer: option })}
                    className={`w-full px-6 py-4 border rounded-lg text-left text-sm transition-all ${inputs.answer === option
                        ? "bg-cyan-500/20 border-cyan-500 text-white"
                        : "border-white/20 text-white/80 hover:border-white/40 hover:bg-white/5"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 pt-4">
                {currentQuest?.slots.map((slot) => (
                  <div key={slot.id} className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                      <InlineMath math={slot.labelLatex} />
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={inputs[slot.id] ?? ""}
                      onChange={(e) =>
                        setInputs({ ...inputs, [slot.id]: e.target.value })
                      }
                      placeholder={slot.placeholder}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white font-mono text-lg focus:outline-none focus:border-cyan-500 transition-colors"
                      disabled={lastCheck?.ok}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Explanation after correct answer */}
            {lastCheck?.ok && currentQuest?.explanation && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="text-xs text-green-400 mb-2 uppercase tracking-wider">
                  {t.explanation_label}
                </div>
                <div className="text-sm text-green-300/90">
                  {currentQuest?.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </ChamberLayout>
  );
}
