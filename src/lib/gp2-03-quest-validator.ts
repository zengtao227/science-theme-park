/**
 * GP2.03 Gas Laws Module - Quest Validator
 * 
 * Validates student answers with appropriate tolerance and unit checking.
 * Implements 2% relative error tolerance for numerical answers.
 */

import type { Quest, ValidationResult, LocalizedString, Language } from "./gp2-03-types";

// ============================================================================
// Quest Validator Class
// ============================================================================

export class QuestValidator {
  private language: Language;

  constructor(language: Language = "en") {
    this.language = language;
  }

  /**
   * Set the language for feedback messages
   */
  setLanguage(language: Language): void {
    this.language = language;
  }

  /**
   * Validate a student's answer against the quest solution
   */
  validate(
    quest: Quest,
    studentAnswer: string | number,
    studentUnit?: string
  ): ValidationResult {
    const { solution } = quest;

    switch (solution.type) {
      case "numerical":
        return this.validateNumerical(
          quest,
          studentAnswer,
          studentUnit
        );

      case "multiple-choice":
        return this.validateMultipleChoice(
          quest,
          studentAnswer
        );

      case "expression":
        return this.validateExpression(
          quest,
          studentAnswer
        );

      default:
        return {
          isCorrect: false,
          feedback: this.createFeedback("Invalid question type"),
        };
    }
  }

  /**
   * Validate numerical answer with tolerance and unit checking
   */
  private validateNumerical(
    quest: Quest,
    studentAnswer: string | number,
    studentUnit?: string
  ): ValidationResult {
    const { solution } = quest;
    const correctAnswer = solution.correctAnswer as number;
    const tolerance = solution.tolerance || 0.02; // Default 2%
    const requiredUnit = solution.unit;

    // Parse student answer to number
    const studentValue = typeof studentAnswer === "string" 
      ? parseFloat(studentAnswer) 
      : studentAnswer;

    // Check if parsing failed
    if (isNaN(studentValue)) {
      return {
        isCorrect: false,
        feedback: this.createFeedback("Please enter a valid number"),
      };
    }

    // Check units if required
    if (requiredUnit && studentUnit !== requiredUnit) {
      return {
        isCorrect: false,
        feedback: this.createFeedback(
          `Incorrect units. Expected: ${requiredUnit}, Got: ${studentUnit || "none"}`
        ),
        correctAnswer,
      };
    }

    // Calculate relative error
    const relativeError = Math.abs((studentValue - correctAnswer) / correctAnswer);

    // Check if within tolerance
    const isCorrect = relativeError <= tolerance;

    if (isCorrect) {
      return {
        isCorrect: true,
        feedback: solution.explanation,
        relativeError,
      };
    } else {
      const percentError = (relativeError * 100).toFixed(1);
      return {
        isCorrect: false,
        feedback: this.createFeedback(
          `Your answer is ${percentError}% off. Try again!`
        ),
        correctAnswer,
        relativeError,
      };
    }
  }

  /**
   * Validate multiple choice answer
   */
  private validateMultipleChoice(
    quest: Quest,
    studentAnswer: string | number
  ): ValidationResult {
    const { solution } = quest;
    const correctAnswer = solution.correctAnswer;

    // Normalize answers for comparison
    const studentStr = String(studentAnswer).trim().toLowerCase();
    const correctStr = String(correctAnswer).trim().toLowerCase();

    const isCorrect = studentStr === correctStr;

    return {
      isCorrect,
      feedback: isCorrect 
        ? solution.explanation 
        : this.createFeedback("Incorrect. Try again!"),
      correctAnswer: isCorrect ? undefined : String(correctAnswer),
    };
  }

  /**
   * Validate expression answer (for symbolic/formula answers)
   */
  private validateExpression(
    quest: Quest,
    studentAnswer: string | number
  ): ValidationResult {
    const { solution } = quest;
    const correctAnswer = solution.correctAnswer;

    // Normalize expressions for comparison
    const studentStr = String(studentAnswer).trim().replace(/\s+/g, "");
    const correctStr = String(correctAnswer).trim().replace(/\s+/g, "");

    const isCorrect = studentStr === correctStr;

    return {
      isCorrect,
      feedback: isCorrect 
        ? solution.explanation 
        : this.createFeedback("Incorrect expression. Check your formula!"),
      correctAnswer: isCorrect ? undefined : String(correctAnswer),
    };
  }

  /**
   * Create localized feedback message
   */
  private createFeedback(message: string): LocalizedString {
    // For now, return same message in all languages
    // In production, this would use proper translation
    return {
      en: message,
      cn: message, // Would be translated
      de: message, // Would be translated
    };
  }
}

// ============================================================================
// Validation Helper Functions
// ============================================================================

/**
 * Validate numerical answer with tolerance
 * @param correct - Correct answer
 * @param student - Student's answer
 * @param tolerance - Relative error tolerance (default 0.02 = 2%)
 * @returns true if within tolerance
 */
export function validateNumerical(
  correct: number,
  student: number,
  tolerance: number = 0.02
): boolean {
  if (correct === 0) {
    // Special case: if correct answer is 0, use absolute tolerance
    return Math.abs(student) <= tolerance;
  }
  
  const relativeError = Math.abs((student - correct) / correct);
  return relativeError <= tolerance;
}

/**
 * Calculate relative error between two values
 * @param correct - Correct value
 * @param student - Student's value
 * @returns Relative error as a decimal (e.g., 0.05 = 5%)
 */
export function calculateRelativeError(correct: number, student: number): number {
  if (correct === 0) {
    return student === 0 ? 0 : Infinity;
  }
  
  return Math.abs((student - correct) / correct);
}

/**
 * Validate that units match
 * @param required - Required unit
 * @param provided - Provided unit
 * @returns true if units match (case-insensitive)
 */
export function validateUnit(required: string, provided: string): boolean {
  return required.trim().toLowerCase() === provided.trim().toLowerCase();
}

/**
 * Parse a numerical answer from string, handling various formats
 * @param answer - Answer string
 * @returns Parsed number or NaN if invalid
 */
export function parseNumericalAnswer(answer: string): number {
  // Remove whitespace
  const cleaned = answer.trim();
  
  // Handle scientific notation (e.g., "1.5e3", "1.5×10³")
  const scientificMatch = cleaned.match(/^([+-]?\d+\.?\d*)[eE×]([+-]?\d+)$/);
  if (scientificMatch) {
    const base = parseFloat(scientificMatch[1]);
    const exponent = parseInt(scientificMatch[2], 10);
    return base * Math.pow(10, exponent);
  }
  
  // Standard parsing
  return parseFloat(cleaned);
}

/**
 * Format a number for display with appropriate precision
 * @param value - Number to format
 * @param precision - Number of significant figures (default 4)
 * @returns Formatted string
 */
export function formatNumber(value: number, precision: number = 4): string {
  // Handle special cases
  if (!isFinite(value)) return String(value);
  if (value === 0) return "0";
  
  // Use scientific notation for very large or very small numbers
  const absValue = Math.abs(value);
  if (absValue >= 1e6 || absValue < 1e-3) {
    return value.toExponential(precision - 1);
  }
  
  // Use fixed decimal places for normal numbers
  return value.toPrecision(precision);
}
