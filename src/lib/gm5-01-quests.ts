import { Difficulty, Quest } from "@/hooks/useQuestManager";

export type MatrixStage = "BASIC_TRANSFORMS" | "DETERMINANT" | "COMPOSITION";

interface MatrixQuestBase {
  type: "identify" | "calculate_det" | "calculate_matrix" | "predict";
  matrix?: number[][];
  matrixA?: number[][];
  matrixB?: number[][];
  question: string;
  options?: string[];
  answer: string | number;
  explanation: string;
}

export interface MatrixQuest extends Quest, MatrixQuestBase {}

export function buildMatrixPool(
  t: any,
  difficulty: Difficulty,
  stage: MatrixStage
): MatrixQuest[] {
  const basePool: MatrixQuestBase[] = [];
  
  // Fallback translations if not provided
  const questions = t?.questions || {};
  const options = t?.options || {};
  const explanations = t?.explanations || {};
  
  if (stage === "BASIC_TRANSFORMS") {
    if (difficulty === "BASIC") {
      // Pure scaling
      basePool.push({
        type: "identify",
        matrix: [[2, 0], [0, 2]],
        question: questions.identify_scaling || "What transformation does this matrix represent?",
        options: [
          options.square_area_4 || "Square with area 4",
          options.square_area_2 || "Square with area 2",
          options.rectangle || "Rectangle",
          options.parallelogram || "Parallelogram",
        ],
        answer: options.square_area_4 || "Square with area 4",
        explanation: explanations.uniform_scaling || "Uniform scaling by factor 2",
      });
      
      basePool.push({
        type: "identify",
        matrix: [[3, 0], [0, 1]],
        question: questions.identify_stretch,
        options: [
          options.horizontal_stretch,
          options.vertical_stretch,
          options.rotation,
          options.shear,
        ],
        answer: options.horizontal_stretch,
        explanation: explanations.horizontal_stretch,
      });
      
      basePool.push({
        type: "calculate_matrix",
        question: questions.scale_by_2,
        answer: "2,0,0,2",
        explanation: explanations.diagonal_scaling,
        matrix: [[2, 0], [0, 2]],
      });
      
      basePool.push({
        type: "identify",
        matrix: [[1, 0], [0, -1]],
        question: questions.identify_reflection,
        options: [
          options.reflect_x,
          options.reflect_y,
          options.reflect_origin,
          options.no_change,
        ],
        answer: options.reflect_x,
        explanation: explanations.x_reflection,
      });
    }
    
    if (difficulty === "CORE") {
      // Rotation matrices
      basePool.push({
        type: "calculate_matrix",
        question: questions.rotate_90,
        answer: "0,-1,1,0",
        explanation: explanations.rotation_90,
        matrix: [[0, -1], [1, 0]],
      });
      
      basePool.push({
        type: "identify",
        matrix: [[0, -1], [1, 0]],
        question: questions.identify_rotation,
        options: [
          options.rotate_90_ccw,
          options.rotate_90_cw,
          options.rotate_180,
          options.no_rotation,
        ],
        answer: options.rotate_90_ccw,
        explanation: explanations.ccw_rotation,
      });
      
      basePool.push({
        type: "calculate_matrix",
        question: questions.rotate_180,
        answer: "-1,0,0,-1",
        explanation: explanations.rotation_180,
        matrix: [[-1, 0], [0, -1]],
      });
      
      basePool.push({
        type: "predict",
        matrix: [[0.707, -0.707], [0.707, 0.707]],
        question: questions.predict_45,
        options: [
          options.rotate_45,
          options.rotate_30,
          options.shear_45,
          options.scale_45,
        ],
        answer: options.rotate_45,
        explanation: explanations.rotation_45,
      });
    }
    
    if (difficulty === "ADVANCED") {
      // Shear transformations
      basePool.push({
        type: "calculate_matrix",
        question: questions.shear_x,
        answer: "1,2,0,1",
        explanation: explanations.shear_explanation,
        matrix: [[1, 2], [0, 1]],
      });
      
      basePool.push({
        type: "identify",
        matrix: [[1, 0], [1.5, 1]],
        question: questions.identify_shear,
        options: [
          options.shear_y,
          options.shear_x,
          options.rotation,
          options.scaling,
        ],
        answer: options.shear_y,
        explanation: explanations.vertical_shear,
      });
      
      basePool.push({
        type: "predict",
        matrix: [[2, 1], [0, 2]],
        question: questions.combined_transform,
        options: [
          options.scale_and_shear,
          options.rotate_and_scale,
          options.two_shears,
          options.pure_rotation,
        ],
        answer: options.scale_and_shear,
        explanation: explanations.combined_explanation,
      });
      
      basePool.push({
        type: "calculate_matrix",
        question: questions.reflect_y_axis,
        answer: "-1,0,0,1",
        explanation: explanations.y_reflection,
        matrix: [[-1, 0], [0, 1]],
      });
    }
    
    if (difficulty === "ELITE") {
      // Complex combined transformations
      basePool.push({
        type: "calculate_matrix",
        question: questions.rotate_and_scale,
        answer: "0,-2,2,0",
        explanation: explanations.rotate_scale_combo,
        matrix: [[0, -2], [2, 0]],
      });
      
      basePool.push({
        type: "predict",
        matrix: [[1.5, -0.5], [0.5, 1.5]],
        question: questions.complex_transform,
        options: [
          options.rotate_scale_combo,
          options.pure_shear,
          options.pure_rotation,
          options.pure_scaling,
        ],
        answer: options.rotate_scale_combo,
        explanation: explanations.complex_analysis,
      });
      
      basePool.push({
        type: "calculate_matrix",
        question: questions.inverse_scaling,
        answer: "0.5,0,0,0.5",
        explanation: explanations.inverse_explanation,
        matrix: [[0.5, 0], [0, 0.5]],
      });
      
      basePool.push({
        type: "identify",
        matrix: [[0.6, 0.8], [0.8, -0.6]],
        question: questions.orthogonal_matrix,
        options: [
          options.rotation_matrix,
          options.shear_matrix,
          options.scaling_matrix,
          options.projection_matrix,
        ],
        answer: options.rotation_matrix,
        explanation: explanations.orthogonal_explanation,
      });
    }
  }
  
  if (stage === "DETERMINANT") {
    if (difficulty === "BASIC") {
      basePool.push({
        type: "calculate_det",
        matrix: [[2, 0], [0, 3]],
        question: questions.det_diagonal,
        answer: 6,
        explanation: explanations.det_diagonal,
      });
      
      basePool.push({
        type: "calculate_det",
        matrix: [[4, 0], [0, 4]],
        question: questions.det_uniform,
        answer: 16,
        explanation: explanations.det_uniform,
      });
      
      basePool.push({
        type: "calculate_det",
        matrix: [[1, 0], [0, 1]],
        question: questions.det_identity,
        answer: 1,
        explanation: explanations.det_identity,
      });
      
      basePool.push({
        type: "calculate_det",
        matrix: [[5, 0], [0, 2]],
        question: questions.det_simple,
        answer: 10,
        explanation: explanations.det_product,
      });
    }
    
    if (difficulty === "CORE") {
      basePool.push({
        type: "calculate_det",
        matrix: [[3, 1], [2, 4]],
        question: questions.det_general,
        answer: 10,
        explanation: explanations.det_formula,
      });
      
      basePool.push({
        type: "calculate_det",
        matrix: [[2, 3], [1, 4]],
        question: questions.det_calculate,
        answer: 5,
        explanation: explanations.det_calculation,
      });
      
      basePool.push({
        type: "calculate_det",
        matrix: [[0, -1], [1, 0]],
        question: questions.det_rotation,
        answer: 1,
        explanation: explanations.det_preserves,
      });
      
      basePool.push({
        type: "calculate_det",
        matrix: [[1, 2], [0, 1]],
        question: questions.det_shear,
        answer: 1,
        explanation: explanations.det_shear_preserves,
      });
    }
    
    if (difficulty === "ADVANCED") {
      basePool.push({
        type: "calculate_det",
        matrix: [[2, -3], [-4, 6]],
        question: questions.det_zero,
        answer: 0,
        explanation: explanations.det_singular,
      });
      
      basePool.push({
        type: "calculate_det",
        matrix: [[-2, 1], [3, -4]],
        question: questions.det_negative,
        answer: 5,
        explanation: explanations.det_orientation,
      });
      
      basePool.push({
        type: "calculate_matrix",
        question: questions.find_parameter,
        answer: "3,2,1,k",
        explanation: explanations.parameter_solution,
        matrix: [[3, 2], [1, 2]],
      });
      
      basePool.push({
        type: "predict",
        matrix: [[1, 2], [2, 4]],
        question: questions.singular_effect,
        options: [
          options.collapses_to_line,
          options.preserves_area,
          options.doubles_area,
          options.inverts_orientation,
        ],
        answer: options.collapses_to_line,
        explanation: explanations.singular_collapse,
      });
    }
    
    if (difficulty === "ELITE") {
      basePool.push({
        type: "calculate_det",
        matrix: [[0.8, 0.6], [-0.6, 0.8]],
        question: questions.det_rotation_verify,
        answer: 1,
        explanation: explanations.rotation_preserves_area,
      });
      
      basePool.push({
        type: "predict",
        question: questions.det_product_rule,
        options: [
          options.det_ab_equals_det_a_det_b,
          options.det_ab_equals_det_a_plus_det_b,
          options.det_ab_equals_det_ba,
          options.cannot_determine,
        ],
        answer: options.det_ab_equals_det_a_det_b,
        explanation: explanations.multiplicative_property,
      });
      
      basePool.push({
        type: "calculate_matrix",
        question: questions.inverse_from_det,
        answer: "4,-3,-2,2",
        explanation: explanations.inverse_formula,
        matrix: [[4, -3], [-2, 2]],
      });
      
      basePool.push({
        type: "calculate_det",
        matrix: [[3, -1], [-6, 2]],
        question: questions.det_dependent,
        answer: 0,
        explanation: explanations.linear_dependence,
      });
    }
  }
  
  if (stage === "COMPOSITION") {
    if (difficulty === "BASIC") {
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[2, 0], [0, 2]],
        matrixB: [[3, 0], [0, 3]],
        question: questions.multiply_scalings,
        answer: "6,0,0,6",
        explanation: explanations.scaling_composition,
      });
      
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[2, 0], [0, 1]],
        matrixB: [[1, 0], [0, 3]],
        question: questions.multiply_stretches,
        answer: "2,0,0,3",
        explanation: explanations.stretch_composition,
      });
      
      basePool.push({
        type: "predict",
        matrixA: [[1, 0], [0, 1]],
        matrixB: [[2, 0], [0, 2]],
        question: questions.identity_composition,
        options: [
          options.equals_b,
          options.equals_a,
          options.equals_zero,
          options.equals_identity,
        ],
        answer: options.equals_b,
        explanation: explanations.identity_property,
      });
      
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[0, -1], [1, 0]],
        matrixB: [[0, -1], [1, 0]],
        question: questions.rotate_twice,
        answer: "-1,0,0,-1",
        explanation: explanations.double_rotation,
      });
    }
    
    if (difficulty === "CORE") {
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[0, -1], [1, 0]],
        matrixB: [[2, 0], [0, 2]],
        question: questions.rotate_then_scale,
        answer: "0,-2,2,0",
        explanation: explanations.rotate_scale_order,
      });
      
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[2, 0], [0, 2]],
        matrixB: [[0, -1], [1, 0]],
        question: questions.scale_then_rotate,
        answer: "0,-2,2,0",
        explanation: explanations.commutative_case,
      });
      
      basePool.push({
        type: "predict",
        matrixA: [[1, 1], [0, 1]],
        matrixB: [[1, 0], [1, 1]],
        question: questions.shear_order,
        options: [
          options.ab_not_equal_ba,
          options.ab_equals_ba,
          options.both_identity,
          options.both_zero,
        ],
        answer: options.ab_not_equal_ba,
        explanation: explanations.non_commutative,
      });
      
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[1, 2], [0, 1]],
        matrixB: [[1, 0], [3, 1]],
        question: questions.shear_composition,
        answer: "7,2,3,1",
        explanation: explanations.shear_multiply,
      });
    }
    
    if (difficulty === "ADVANCED") {
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[2, 0], [0, 2]],
        question: questions.find_inverse,
        answer: "0.5,0,0,0.5",
        explanation: explanations.inverse_scaling,
      });
      
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[0, -1], [1, 0]],
        question: questions.inverse_rotation,
        answer: "0,1,-1,0",
        explanation: explanations.inverse_rotate,
      });
      
      basePool.push({
        type: "predict",
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[-2, 1], [1.5, -0.5]],
        question: questions.verify_inverse,
        options: [
          options.ab_is_identity,
          options.ab_is_zero,
          options.ab_is_a,
          options.ab_is_b,
        ],
        answer: options.ab_is_identity,
        explanation: explanations.inverse_verification,
      });
      
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[3, 1], [2, 4]],
        matrixB: [[1, 0], [0, 1]],
        question: questions.compose_with_identity,
        answer: "3,1,2,4",
        explanation: explanations.identity_neutral,
      });
    }
    
    if (difficulty === "ELITE") {
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[1, 2], [0, 1]],
        matrixB: [[0, -1], [1, 0]],
        question: questions.complex_composition,
        answer: "2,-1,1,0",
        explanation: explanations.matrix_multiplication,
      });
      
      basePool.push({
        type: "predict",
        question: questions.three_matrices,
        options: [
          options.abc_associative,
          options.must_compute_ab_first,
          options.must_compute_bc_first,
          options.order_matters,
        ],
        answer: options.abc_associative,
        explanation: explanations.associative_property,
      });
      
      basePool.push({
        type: "calculate_matrix",
        matrixA: [[2, 1], [1, 1]],
        question: questions.find_inverse_general,
        answer: "1,-1,-1,2",
        explanation: explanations.inverse_formula_general,
      });
      
      basePool.push({
        type: "predict",
        matrixA: [[1, 2], [2, 4]],
        question: questions.no_inverse,
        options: [
          options.det_zero_no_inverse,
          options.always_has_inverse,
          options.inverse_is_itself,
          options.inverse_is_transpose,
        ],
        answer: options.det_zero_no_inverse,
        explanation: explanations.singular_no_inverse,
      });
    }
  }
  
  // Convert base quests to full Quest objects
  return basePool.map((base, idx) => ({
    ...base,
    id: `gm5-01-${stage}-${difficulty}-${idx}`,
    difficulty,
    stage,
    promptLatex: base.question,
    expressionLatex: "",
    targetLatex: "",
    slots: [],
    correctLatex: String(base.answer),
  }));
}
