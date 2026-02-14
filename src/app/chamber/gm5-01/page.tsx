"use client";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import MatrixVisualization2D from "@/components/chamber/gm5-01/MatrixVisualization2D";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

type Stage = "BASIC_TRANSFORMS" | "DETERMINANT" | "COMPOSITION";

interface MatrixQuest {
  id: string;
  difficulty: Difficulty;
  stage: Stage;
  promptLatex: string;
  expressionLatex: string;
  targetLatex: string;
  slots: Array<{
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number | string;
    unit?: string;
  }>;
  correctLatex: string;
  // Matrix data
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
function buildMatrixPool(t: any, difficulty: Difficulty, stage: Stage): MatrixQuest[] {
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
    const id = `gm5-01-${stage}-${difficulty}-${idCounter++}`;
    
    // Create slots based on type
    let slots: MatrixQuest["slots"] = [];
    if (type === "calculate_det") {
      slots = [{
        id: "det",
        labelLatex: "det(A)",
        placeholder: "Enter determinant",
        expected: answer as number,
      }];
    } else if (type === "calculate_matrix") {
      slots = [
        { id: "a11", labelLatex: "a₁₁", placeholder: "0", expected: 0 },
        { id: "a12", labelLatex: "a₁₂", placeholder: "0", expected: 0 },
        { id: "a21", labelLatex: "a₂₁", placeholder: "0", expected: 0 },
        { id: "a22", labelLatex: "a₂₂", placeholder: "0", expected: 0 },
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
      pool.push(createQuest("identify", "What transformation does this matrix represent?", "Uniform scaling by 2", "This is uniform scaling: both x and y are scaled by 2, so area becomes 4", [[2, 0], [0, 2]], undefined, undefined, ["Uniform scaling by 2", "Rotation by 90°", "Shear transformation", "Reflection"]));
      pool.push(createQuest("identify", "What transformation does this matrix represent?", "Horizontal stretch by 3", "This stretches x-axis by 3, y-axis unchanged", [[3, 0], [0, 1]], undefined, undefined, ["Horizontal stretch by 3", "Vertical stretch by 3", "Rotation", "Shear"]));
      pool.push(createQuest("calculate_matrix", "Create a matrix that scales uniformly by 2", "2,0,0,2", "Diagonal matrix with 2 on diagonal", [[2, 0], [0, 2]]));
      pool.push(createQuest("identify", "What transformation does this matrix represent?", "Reflection over x-axis", "Flips y-coordinate: (x,y) → (x,-y)", [[1, 0], [0, -1]], undefined, undefined, ["Reflection over x-axis", "Reflection over y-axis", "Reflection over origin", "No change"]));
    }
    
    if (difficulty === "CORE") {
      pool.push(createQuest("calculate_matrix", "Create a matrix that rotates 90° counterclockwise", "0,-1,1,0", "90° CCW rotation: (x,y) → (-y,x)", [[0, -1], [1, 0]]));
      pool.push(createQuest("identify", "What transformation does this matrix represent?", "90° counterclockwise rotation", "Rotates vectors 90° counterclockwise", [[0, -1], [1, 0]], undefined, undefined, ["90° counterclockwise rotation", "90° clockwise rotation", "180° rotation", "No rotation"]));
      pool.push(createQuest("calculate_matrix", "Create a matrix that rotates 180°", "-1,0,0,-1", "180° rotation: (x,y) → (-x,-y)", [[-1, 0], [0, -1]]));
      pool.push(createQuest("identify", "What angle of rotation does this matrix represent?", "45° counterclockwise", "cos(45°) ≈ 0.707, sin(45°) ≈ 0.707", [[0.707, -0.707], [0.707, 0.707]], undefined, undefined, ["45° counterclockwise", "30° counterclockwise", "45° shear", "45° scaling"]));
    }
    
    if (difficulty === "ADVANCED") {
      pool.push(createQuest("calculate_matrix", "Create a shear matrix that shifts x by 2y", "1,2,0,1", "Shear: (x,y) → (x+2y, y)", [[1, 2], [0, 1]]));
      pool.push(createQuest("identify", "What transformation does this matrix represent?", "Vertical shear", "Shifts y by 1.5x: (x,y) → (x, y+1.5x)", [[1, 0], [1.5, 1]], undefined, undefined, ["Vertical shear", "Horizontal shear", "Rotation", "Scaling"]));
      pool.push(createQuest("identify", "What transformation does this matrix represent?", "Scaling + shear", "Scales by 2 and shears", [[2, 1], [0, 2]], undefined, undefined, ["Scaling + shear", "Rotation + scaling", "Two shears", "Pure rotation"]));
      pool.push(createQuest("calculate_matrix", "Create a matrix that reflects over y-axis", "-1,0,0,1", "Flips x-coordinate: (x,y) → (-x,y)", [[-1, 0], [0, 1]]));
    }
    
    if (difficulty === "ELITE") {
      pool.push(createQuest("calculate_matrix", "Create a matrix that rotates 90° CCW and scales by 2", "0,-2,2,0", "First rotate, then scale (or vice versa, they commute)", [[0, -2], [2, 0]]));
      pool.push(createQuest("identify", "What transformation does this matrix represent?", "Rotation + scaling", "Combination of rotation and scaling", [[1.5, -0.5], [0.5, 1.5]], undefined, undefined, ["Rotation + scaling", "Pure shear", "Pure rotation", "Pure scaling"]));
      pool.push(createQuest("calculate_matrix", "Create a matrix that scales by 0.5 (shrinks)", "0.5,0,0,0.5", "Inverse of scaling by 2", [[0.5, 0], [0, 0.5]]));
      pool.push(createQuest("identify", "Is this matrix a rotation matrix?", "Yes, it's a rotation", "Columns are orthonormal, det=1", [[0.6, 0.8], [0.8, -0.6]], undefined, undefined, ["Yes, it's a rotation", "No, it's a shear", "No, it's a scaling", "No, it's a projection"]));
    }
  }

  if (stage === "DETERMINANT") {
    if (difficulty === "BASIC") {
      pool.push(createQuest("calculate_det", "Calculate the determinant", 6, "det = 2×3 = 6", [[2, 0], [0, 3]]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 16, "det = 4×4 = 16", [[4, 0], [0, 4]]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 1, "Identity matrix has det = 1", [[1, 0], [0, 1]]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 10, "det = 5×2 = 10", [[5, 0], [0, 2]]));
    }
    
    if (difficulty === "CORE") {
      pool.push(createQuest("calculate_det", "Calculate the determinant", 10, "det = 3×4 - 1×2 = 12 - 2 = 10", [[3, 1], [2, 4]]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 5, "det = 2×4 - 3×1 = 8 - 3 = 5", [[2, 3], [1, 4]]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 1, "Rotation preserves area, det = 1", [[0, -1], [1, 0]]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 1, "Shear preserves area, det = 1", [[1, 2], [0, 1]]));
    }
    
    if (difficulty === "ADVANCED") {
      pool.push(createQuest("calculate_det", "Calculate the determinant", 0, "det = 2×6 - (-3)×(-4) = 12 - 12 = 0 (singular!)", [[2, -3], [-4, 6]]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 5, "det = (-2)×(-4) - 1×3 = 8 - 3 = 5", [[-2, 1], [3, -4]]));
      pool.push(createQuest("identify", "What happens when det(A) = 0?", "Collapses to a line", "Singular matrix collapses 2D to 1D", [[1, 2], [2, 4]], undefined, undefined, ["Collapses to a line", "Preserves area", "Doubles area", "Inverts orientation"]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 0, "Rows are proportional: det = 0", [[1, 2], [2, 4]]));
    }
    
    if (difficulty === "ELITE") {
      pool.push(createQuest("calculate_det", "Calculate the determinant", 1, "Rotation matrix: det = 0.8² + 0.6² = 1", [[0.8, 0.6], [-0.6, 0.8]]));
      pool.push(createQuest("identify", "What is det(AB)?", "det(A) × det(B)", "Multiplicative property of determinants", undefined, [[2, 0], [0, 3]], [[1, 2], [0, 1]], ["det(A) × det(B)", "det(A) + det(B)", "det(B) × det(A)", "Cannot determine"]));
      pool.push(createQuest("calculate_det", "Calculate the determinant", 0, "Columns are linearly dependent", [[3, -1], [-6, 2]]));
      pool.push(createQuest("identify", "If det(A) = 5, what is det(A⁻¹)?", "1/5", "det(A⁻¹) = 1/det(A)", [[2, 1], [1, 3]], undefined, undefined, ["1/5", "5", "-5", "0"]));
    }
  }

  if (stage === "COMPOSITION") {
    if (difficulty === "BASIC") {
      pool.push(createQuest("calculate_matrix", "Calculate AB", "6,0,0,6", "Scaling by 2 then by 3 = scaling by 6", undefined, [[2, 0], [0, 2]], [[3, 0], [0, 3]]));
      pool.push(createQuest("calculate_matrix", "Calculate AB", "2,0,0,3", "Horizontal stretch by 2, vertical by 3", undefined, [[2, 0], [0, 1]], [[1, 0], [0, 3]]));
      pool.push(createQuest("identify", "What is I×A?", "Equals A", "Identity is neutral element", undefined, [[1, 0], [0, 1]], [[2, 0], [0, 2]], ["Equals A", "Equals I", "Equals zero", "Equals 2I"]));
      pool.push(createQuest("calculate_matrix", "Calculate A×A (rotate 90° twice)", "-1,0,0,-1", "90° + 90° = 180° rotation", undefined, [[0, -1], [1, 0]], [[0, -1], [1, 0]]));
    }
    
    if (difficulty === "CORE") {
      pool.push(createQuest("calculate_matrix", "Calculate AB (rotate then scale)", "0,-2,2,0", "First rotate 90°, then scale by 2", undefined, [[0, -1], [1, 0]], [[2, 0], [0, 2]]));
      pool.push(createQuest("calculate_matrix", "Calculate BA (scale then rotate)", "0,-2,2,0", "First scale by 2, then rotate 90°. Same result!", undefined, [[2, 0], [0, 2]], [[0, -1], [1, 0]]));
      pool.push(createQuest("identify", "Does AB = BA for these shear matrices?", "No, AB ≠ BA", "Matrix multiplication is not commutative", undefined, [[1, 1], [0, 1]], [[1, 0], [1, 1]], ["No, AB ≠ BA", "Yes, AB = BA", "Both equal I", "Both equal zero"]));
      pool.push(createQuest("calculate_matrix", "Calculate AB", "7,2,3,1", "Multiply: [1,2;0,1] × [1,0;3,1]", undefined, [[1, 2], [0, 1]], [[1, 0], [3, 1]]));
    }
    
    if (difficulty === "ADVANCED") {
      pool.push(createQuest("calculate_matrix", "Find A⁻¹ (inverse of scaling by 2)", "0.5,0,0,0.5", "Inverse of scaling by 2 is scaling by 0.5", [[0.5, 0], [0, 0.5]], [[2, 0], [0, 2]]));
      pool.push(createQuest("calculate_matrix", "Find A⁻¹ (inverse of 90° CCW rotation)", "0,1,-1,0", "Inverse of 90° CCW is 90° CW", [[0, 1], [-1, 0]], [[0, -1], [1, 0]]));
      pool.push(createQuest("identify", "If AB = I, what is B?", "B is the inverse of A", "AB = I means B = A⁻¹", undefined, [[1, 2], [3, 4]], [[-2, 1], [1.5, -0.5]], ["B is the inverse of A", "B is zero", "B equals A", "B equals I"]));
      pool.push(createQuest("calculate_matrix", "Calculate A×I", "3,1,2,4", "Multiplying by identity doesn't change A", [[3, 1], [2, 4]], [[3, 1], [2, 4]], [[1, 0], [0, 1]]));
    }
    
    if (difficulty === "ELITE") {
      pool.push(createQuest("calculate_matrix", "Calculate AB", "2,-1,1,0", "Matrix multiplication: [1,2;0,1] × [0,-1;1,0]", undefined, [[1, 2], [0, 1]], [[0, -1], [1, 0]]));
      pool.push(createQuest("identify", "Is (AB)C = A(BC)?", "Yes, associative", "Matrix multiplication is associative", undefined, [[1, 0], [0, 1]], [[1, 0], [0, 1]], ["Yes, associative", "No, must compute AB first", "No, must compute BC first", "Order matters"]));
      pool.push(createQuest("calculate_matrix", "Find A⁻¹", "1,-1,-1,2", "Use formula: A⁻¹ = (1/det)×[d,-b;-c,a]", [[1, -1], [-1, 2]], [[2, 1], [1, 1]]));
      pool.push(createQuest("identify", "Can this matrix be inverted?", "No, det = 0", "Singular matrix (det=0) has no inverse", [[1, 2], [2, 4]], undefined, undefined, ["No, det = 0", "Yes, always invertible", "Yes, inverse is itself", "Yes, inverse is transpose"]));
    }
  }

  return pool;
}

export default function GM5_01_MatrixGeometry() {
  const { currentLanguage } = useAppStore();
  const t = (translations[currentLanguage] as any)?.gm5_01;

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
  } = useQuestManager<MatrixQuest, Stage>({
    buildPool: (d, s) => buildMatrixPool(t, d, s),
    initialStage: "BASIC_TRANSFORMS",
  });

  // Get display matrix for visualization
  const getDisplayMatrix = (): number[][] => {
    if (!currentQuest) return [[1, 0], [0, 1]];
    if (currentQuest.matrix) return currentQuest.matrix;
    if (currentQuest.matrixA) return currentQuest.matrixA;
    
    // Try to parse user input for calculate_matrix type
    if (currentQuest.type === "calculate_matrix") {
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

  return (
    <ChamberLayout
      title={t?.title || "GM5.01 // MATRIX GEOMETRY"}
      moduleCode="GM5.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "BASIC_TRANSFORMS", label: t?.stages?.basic_transforms || "TRANSFORMS" },
        { id: "DETERMINANT", label: t?.stages?.determinant || "DETERMINANT" },
        { id: "COMPOSITION", label: t?.stages?.composition || "COMPOSITION" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t?.footer_left || "GM5.01_MATRIX_GEOMETRY // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "GM5.01_MATRIX_MONITOR",
        difficulty: {
          basic: t?.difficulty?.basic || "BASIC",
          core: t?.difficulty?.core || "CORE",
          advanced: t?.difficulty?.advanced || "ADVANCED",
          elite: t?.difficulty?.elite || "ELITE",
        },
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
              {t?.scenario_title || "BASEL ENGINEERING MISSION"}
            </div>
            <p className="text-sm text-white/80 font-mono max-w-2xl mx-auto leading-relaxed">
              {stage === "BASIC_TRANSFORMS" && (t?.scenarios?.basic_transforms || "Roche Pharmaceutical Molecular Analysis: You are working in Roche Basel's computational chemistry department, using linear transformations to analyze protein molecule symmetry. Each matrix represents a symmetry operation (rotation, reflection, scaling). Identifying transformation types is critical for predicting molecular optical properties.")}
              {stage === "DETERMINANT" && (t?.scenarios?.determinant || "Novartis Crystal Structure: You are analyzing drug crystal unit cell structures at Novartis Basel. The determinant represents lattice volume change. det(A)=0 indicates crystal structure collapse, det(A)<0 indicates chirality inversion. Accurate determinant calculation is crucial for predicting drug bioactivity.")}
              {stage === "COMPOSITION" && (t?.scenarios?.composition || "University of Basel Robotics: You are programming a robotic arm at Basel University robotics lab. Each joint's motion is represented by a transformation matrix. Composite transformation AB means executing joint A's motion first, then joint B's motion. Matrix multiplication order determines the robot arm's final position.")}
            </p>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-black">
                {currentQuest.question}
              </div>
              {currentQuest.expressionLatex && (
                <div className="text-2xl text-white font-black">
                  <BlockMath math={currentQuest.expressionLatex} />
                </div>
              )}
              {currentQuest.matrixA && currentQuest.matrixB && (
                <div className="space-y-2">
                  <BlockMath math={`A = \\begin{bmatrix} ${currentQuest.matrixA[0][0]} & ${currentQuest.matrixA[0][1]} \\\\ ${currentQuest.matrixA[1][0]} & ${currentQuest.matrixA[1][1]} \\end{bmatrix}`} />
                  <BlockMath math={`B = \\begin{bmatrix} ${currentQuest.matrixB[0][0]} & ${currentQuest.matrixB[0][1]} \\\\ ${currentQuest.matrixB[1][0]} & ${currentQuest.matrixB[1][1]} \\end{bmatrix}`} />
                </div>
              )}
            </div>

            {/* Input based on question type */}
            {(currentQuest.type === "identify" || currentQuest.type === "predict") && currentQuest.options ? (
              <div className="space-y-3">
                {currentQuest.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputs({ answer: option })}
                    className={`w-full px-6 py-4 border rounded-lg text-left text-sm transition-all ${
                      inputs.answer === option
                        ? "bg-neon-cyan/20 border-neon-cyan text-white"
                        : "border-white/20 text-white/80 hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 pt-4">
                {currentQuest.slots.map((slot) => (
                  <div key={slot.id} className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                      {slot.labelLatex}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={inputs[slot.id] ?? ""}
                      onChange={(e) =>
                        setInputs({ ...inputs, [slot.id]: e.target.value })
                      }
                      placeholder={slot.placeholder}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white font-mono text-lg focus:outline-none focus:border-neon-cyan transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Explanation after correct answer */}
            {lastCheck?.ok && currentQuest.explanation && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="text-xs text-green-400 mb-2 uppercase tracking-wider">
                  {t?.explanation_label || "EXPLANATION"}
                </div>
                <div className="text-sm text-green-300/90">
                  {currentQuest.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </ChamberLayout>
  );
}
