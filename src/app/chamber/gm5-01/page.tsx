"use client";

import { useLanguage, translations } from "@/lib/i18n";
import Link from "next/link";
import { useQuestManager, Difficulty } from "@/hooks/useQuestManager";
import { buildMatrixPool, MatrixQuest, MatrixStage } from "@/lib/gm5-01-quests";
import MatrixVisualization2D from "@/components/chamber/gm5-01/MatrixVisualization2D";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function GM5_01_MatrixGeometry() {
  const { t, currentLanguage } = useLanguage();
  const gm5 = (translations[currentLanguage] as any)?.gm5_01 || {};
  
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
  } = useQuestManager<MatrixQuest, MatrixStage>({
    buildPool: (d, s) => buildMatrixPool(gm5, d, s),
    initialStage: "BASIC_TRANSFORMS",
  });
  
  const quest = currentQuest;
  
  // Parse matrix input (format: "a,b,c,d" for [[a,b],[c,d]])
  const parseMatrixInput = (input: string): number[][] | null => {
    const parts = input.split(",").map(s => parseFloat(s.trim()));
    if (parts.length === 4 && parts.every(n => !isNaN(n))) {
      return [[parts[0], parts[1]], [parts[2], parts[3]]];
    }
    return null;
  };
  
  // Get display matrix for visualization
  const getDisplayMatrix = (): number[][] => {
    if (quest?.matrix) return quest.matrix;
    if (quest?.matrixA) return quest.matrixA;
    
    // Try to parse user input
    const parsed = parseMatrixInput(inputs.answer || "");
    if (parsed) return parsed;
    
    // Default identity
    return [[1, 0], [0, 1]];
  };
  
  const displayMatrix = getDisplayMatrix();
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6 border-2 border-cyan-500 p-4 bg-black/80">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-cyan-400">{gm5.title || "GM5.01 // MATRIX GEOMETRY"}</h1>
          <Link href="/" className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors">
            {gm5.back || "Back to Nexus"}
          </Link>
        </div>
        <div className="text-sm text-cyan-300/70">{gm5.footer_left || "GM5.01_MATRIX_GEOMETRY // NODE: BASEL"}</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Quest panel */}
        <div className="border-2 border-green-500 p-6 bg-black/80 space-y-6">
          {/* Difficulty selector */}
          <div className="border border-purple-500 p-4 space-y-3">
            <div className="text-sm text-purple-400 uppercase tracking-wider">
              {gm5.difficulty_label || "DIFFICULTY LEVEL"}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(["BASIC", "CORE", "ADVANCED", "ELITE"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => handleDifficultyChange(d)}
                  className={`px-3 py-2 border text-xs font-bold transition-colors ${
                    difficulty === d
                      ? "bg-purple-500 text-black border-purple-500"
                      : "border-purple-500 text-purple-400 hover:bg-purple-500/20"
                  }`}
                >
                  {gm5.difficulty?.[d.toLowerCase()] || d}
                </button>
              ))}
            </div>
          </div>

          {/* Stage selector */}
          <div className="border border-cyan-500 p-4 space-y-3">
            <div className="text-sm text-cyan-400 uppercase tracking-wider">
              {gm5.stage_label || "MISSION STAGE"}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["BASIC_TRANSFORMS", "DETERMINANT", "COMPOSITION"] as MatrixStage[]).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStageChange(s)}
                  className={`px-3 py-2 border text-xs font-bold transition-colors ${
                    stage === s
                      ? "bg-cyan-500 text-black border-cyan-500"
                      : "border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                  }`}
                >
                  {gm5.stages?.[s.toLowerCase()] || s.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario */}
          <div className="border border-yellow-500 p-4 bg-yellow-500/5">
            <div className="text-sm text-yellow-400 mb-2 uppercase tracking-wider">
              {gm5.scenario_title || "BASEL ENGINEERING MISSION"}
            </div>
            <p className="text-xs text-yellow-300/80 leading-relaxed">
              {stage === "BASIC_TRANSFORMS" && (gm5.scenarios?.basic_transforms || "[FALLBACK] Roche Pharmaceutical Molecular Analysis: You are working in Roche Basel's computational chemistry department, using linear transformations to analyze protein molecule symmetry. Each matrix represents a symmetry operation (rotation, reflection, scaling). Identifying transformation types is critical for predicting molecular optical properties.")}
              {stage === "DETERMINANT" && (gm5.scenarios?.determinant || "[FALLBACK] Novartis Crystal Structure: You are analyzing drug crystal unit cell structures at Novartis Basel. The determinant represents lattice volume change. det(A)=0 indicates crystal structure collapse, det(A)<0 indicates chirality inversion. Accurate determinant calculation is crucial for predicting drug bioactivity.")}
              {stage === "COMPOSITION" && (gm5.scenarios?.composition || "[FALLBACK] University of Basel Robotics: You are programming a robotic arm at Basel University robotics lab. Each joint's motion is represented by a transformation matrix. Composite transformation AB means executing joint A's motion first, then joint B's motion. Matrix multiplication order determines the robot arm's final position.")}
            </p>
          </div>

          {/* Question */}
          {quest && (
            <div className="border border-green-500 p-4 space-y-4">
              <div className="text-sm text-green-400 mb-2">
                {gm5.question_label || "MISSION OBJECTIVE"}
              </div>
              <div className="text-white/90 text-sm leading-relaxed">
                {quest.question}
              </div>

              {/* Matrix display if provided */}
              {quest.matrix && (
                <div className="bg-black/50 border border-cyan-500 p-3">
                  <BlockMath math={`A = \\begin{bmatrix} ${quest.matrix[0][0]} & ${quest.matrix[0][1]} \\\\ ${quest.matrix[1][0]} & ${quest.matrix[1][1]} \\end{bmatrix}`} />
                </div>
              )}

              {/* Two matrices for composition */}
              {quest.matrixA && quest.matrixB && (
                <div className="bg-black/50 border border-cyan-500 p-3 space-y-2">
                  <BlockMath math={`A = \\begin{bmatrix} ${quest.matrixA[0][0]} & ${quest.matrixA[0][1]} \\\\ ${quest.matrixA[1][0]} & ${quest.matrixA[1][1]} \\end{bmatrix}`} />
                  <BlockMath math={`B = \\begin{bmatrix} ${quest.matrixB[0][0]} & ${quest.matrixB[0][1]} \\\\ ${quest.matrixB[1][0]} & ${quest.matrixB[1][1]} \\end{bmatrix}`} />
                </div>
              )}

              {/* Input based on question type */}
              {quest.type === "identify" || quest.type === "predict" ? (
                <div className="space-y-2">
                  {quest.options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputs({ answer: option })}
                      className={`w-full px-4 py-3 border text-left text-sm transition-colors ${
                        inputs.answer === option
                          ? "bg-cyan-500 text-black border-cyan-500"
                          : "border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : quest.type === "calculate_det" ? (
                <div>
                  <div className="text-xs text-white/60 mb-2">
                    {gm5.input_hint_det || "Enter determinant value:"}
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.answer || ""}
                    onChange={(e) => setInputs({ answer: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-cyan-500 text-cyan-300 text-lg font-mono"
                    placeholder="det(A) = ?"
                  />
                </div>
              ) : (
                <div>
                  <div className="text-xs text-white/60 mb-2">
                    {gm5.input_hint_matrix || "Enter matrix as: a,b,c,d for [[a,b],[c,d]]"}
                  </div>
                  <input
                    type="text"
                    value={inputs.answer || ""}
                    onChange={(e) => setInputs({ answer: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-cyan-500 text-cyan-300 text-lg font-mono"
                    placeholder="e.g., 2,0,0,2"
                  />
                </div>
              )}

              {/* Verify button */}
              <button
                onClick={verify}
                className={`w-full px-6 py-3 border-2 font-bold transition-colors ${
                  lastCheck?.ok
                    ? "bg-green-500 text-black border-green-500"
                    : lastCheck && !lastCheck.ok
                    ? "bg-red-500 text-black border-red-500"
                    : "border-green-500 text-green-400 hover:bg-green-500/20"
                }`}
              >
                {lastCheck?.ok
                  ? gm5.correct || "✓ VERIFIED"
                  : lastCheck && !lastCheck.ok
                  ? gm5.incorrect || "✗ MISMATCH"
                  : gm5.check || "VERIFY"}
              </button>

              {/* Explanation after correct answer */}
              {lastCheck?.ok && quest.explanation && (
                <div className="border border-green-500 p-3 bg-green-500/10">
                  <div className="text-xs text-green-400 mb-1">
                    {gm5.explanation_label || "EXPLANATION"}
                  </div>
                  <div className="text-xs text-green-300/80">
                    {quest.explanation}
                  </div>
                </div>
              )}

              {/* Next button */}
              {lastCheck?.ok && (
                <button
                  onClick={next}
                  className="w-full px-6 py-3 border-2 border-cyan-500 text-cyan-400 font-bold hover:bg-cyan-500/20 transition-colors"
                >
                  {gm5.next || "NEXT MISSION →"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: Visualization */}
        <div className="border-2 border-purple-500 bg-black/80">
          <MatrixVisualization2D
            matrix={displayMatrix}
            stage={stage}
            language={currentLanguage}
          />
        </div>
      </div>
    </div>
  );
}
