/**
 * SP1.01 - Forces Basics Module
 * Answer validation engine with feedback generation
 */

import {
  Answer,
  ValidationConfig,
  ValidationResult,
  Vector,
  MultiLangContent,
  Force,
} from './types';
import { checkEquilibrium, calculateMagnitude } from './physics';

// ============================================================================
// Main Validation Function
// ============================================================================

/**
 * Validate an answer against the validation configuration
 * @param userAnswer User's submitted answer
 * @param config Validation configuration
 * @param language Current language for feedback
 * @returns Validation result with feedback
 */
export function validateAnswer(
  userAnswer: Answer,
  config: ValidationConfig,
  language: 'en' | 'cn' | 'de' = 'en'
): ValidationResult {
  switch (config.type) {
    case 'exact':
      return validateExactAnswer(userAnswer, config, language);
    case 'tolerance':
      return validateNumericalAnswer(userAnswer, config, language);
    case 'vector':
      return validateVectorAnswer(userAnswer, config, language);
    case 'equilibrium':
      return validateEquilibriumAnswer(userAnswer, config, language);
    default:
      return {
        isCorrect: false,
        feedback: {
          en: 'Invalid validation type',
          cn: '无效的验证类型',
          de: 'Ungültiger Validierungstyp',
        },
      };
  }
}

// ============================================================================
// Exact Answer Validation
// ============================================================================

function validateExactAnswer(
  userAnswer: Answer,
  config: ValidationConfig,
  language: 'en' | 'cn' | 'de'
): ValidationResult {
  const correct = config.correctAnswer;

  // Check if values match exactly
  const isCorrect =
    userAnswer.value === correct.value &&
    (!config.units || userAnswer.units === correct.units);

  if (isCorrect) {
    return {
      isCorrect: true,
      feedback: generateCorrectFeedback(),
    };
  } else {
    return {
      isCorrect: false,
      feedback: generateIncorrectFeedback('exact'),
      correctAnswer: correct,
    };
  }
}

// ============================================================================
// Numerical Answer Validation (with tolerance)
// ============================================================================

/**
 * Validate numerical answer with tolerance
 * @param userAnswer User's answer
 * @param config Validation configuration
 * @param language Current language
 * @returns Validation result
 */
export function validateNumericalAnswer(
  userAnswer: Answer,
  config: ValidationConfig,
  language: 'en' | 'cn' | 'de'
): ValidationResult {
  const correct = config.correctAnswer;
  const tolerance = config.tolerance || 0.01; // Default 1%

  // Check if both are numbers
  if (typeof userAnswer.value !== 'number' || typeof correct.value !== 'number') {
    return {
      isCorrect: false,
      feedback: {
        en: 'Please enter a numerical value',
        cn: '请输入数值',
        de: 'Bitte geben Sie einen numerischen Wert ein',
      },
    };
  }

  // Check units if required
  if (config.units && userAnswer.units !== correct.units) {
    return {
      isCorrect: false,
      feedback: {
        en: `Incorrect units. Expected ${correct.units}`,
        cn: `单位错误。应为 ${correct.units}`,
        de: `Falsche Einheit. Erwartet ${correct.units}`,
      },
      correctAnswer: correct,
    };
  }

  // Check if value is within tolerance
  const difference = Math.abs(userAnswer.value - correct.value);
  const allowedDifference = Math.abs(correct.value * tolerance);

  const isCorrect = difference <= allowedDifference;

  if (isCorrect) {
    return {
      isCorrect: true,
      feedback: generateCorrectFeedback(),
    };
  } else {
    const percentageOff = ((difference / Math.abs(correct.value)) * 100).toFixed(1);
    return {
      isCorrect: false,
      feedback: {
        en: `Your answer is ${percentageOff}% off from the correct value`,
        cn: `您的答案与正确值相差 ${percentageOff}%`,
        de: `Ihre Antwort weicht um ${percentageOff}% vom korrekten Wert ab`,
      },
      correctAnswer: correct,
    };
  }
}

// ============================================================================
// Vector Answer Validation
// ============================================================================

/**
 * Validate vector answer (magnitude and direction)
 * @param userAnswer User's answer
 * @param config Validation configuration
 * @param language Current language
 * @returns Validation result
 */
export function validateVectorAnswer(
  userAnswer: Answer,
  config: ValidationConfig,
  language: 'en' | 'cn' | 'de'
): ValidationResult {
  const correct = config.correctAnswer;

  // Check if both are vectors
  if (!isVector(userAnswer.value) || !isVector(correct.value)) {
    return {
      isCorrect: false,
      feedback: {
        en: 'Please enter a valid vector (magnitude and angle)',
        cn: '请输入有效的矢量（大小和角度）',
        de: 'Bitte geben Sie einen gültigen Vektor ein (Betrag und Winkel)',
      },
    };
  }

  const userVector = userAnswer.value as Vector;
  const correctVector = correct.value as Vector;

  // Get tolerances
  const magnitudeTolerance = config.vectorTolerance?.magnitude || 0.01; // Default 1%
  const angleTolerance = config.vectorTolerance?.angle || 2; // Default 2 degrees

  // Check magnitude
  const magnitudeDiff = Math.abs(userVector.magnitude - correctVector.magnitude);
  const allowedMagnitudeDiff = correctVector.magnitude * magnitudeTolerance;
  const magnitudeCorrect = magnitudeDiff <= allowedMagnitudeDiff;

  // Check angle (handle wraparound at 360 degrees)
  const angleDiff = Math.min(
    Math.abs(userVector.angle - correctVector.angle),
    360 - Math.abs(userVector.angle - correctVector.angle)
  );
  const angleCorrect = angleDiff <= angleTolerance;

  // Both must be correct
  const isCorrect = magnitudeCorrect && angleCorrect;

  if (isCorrect) {
    return {
      isCorrect: true,
      feedback: generateCorrectFeedback(),
    };
  } else {
    // Generate specific feedback
    let feedbackEn = '';
    let feedbackCn = '';
    let feedbackDe = '';

    if (!magnitudeCorrect && !angleCorrect) {
      feedbackEn = 'Both magnitude and direction are incorrect';
      feedbackCn = '大小和方向都不正确';
      feedbackDe = 'Sowohl Betrag als auch Richtung sind falsch';
    } else if (!magnitudeCorrect) {
      feedbackEn = 'Magnitude is incorrect. Check your calculation';
      feedbackCn = '大小不正确。请检查您的计算';
      feedbackDe = 'Der Betrag ist falsch. Überprüfen Sie Ihre Berechnung';
    } else {
      feedbackEn = 'Direction is incorrect. Check your angle';
      feedbackCn = '方向不正确。请检查您的角度';
      feedbackDe = 'Die Richtung ist falsch. Überprüfen Sie Ihren Winkel';
    }

    return {
      isCorrect: false,
      feedback: {
        en: feedbackEn,
        cn: feedbackCn,
        de: feedbackDe,
      },
      correctAnswer: correct,
    };
  }
}

// ============================================================================
// Equilibrium Answer Validation
// ============================================================================

function validateEquilibriumAnswer(
  userAnswer: Answer,
  config: ValidationConfig,
  language: 'en' | 'cn' | 'de'
): ValidationResult {
  // For equilibrium problems, the user typically provides force values
  // that should result in equilibrium
  const correct = config.correctAnswer;

  // If the answer is a vector, check if it creates equilibrium
  if (isVector(userAnswer.value) && isVector(correct.value)) {
    const userVector = userAnswer.value as Vector;
    const existingForce = correct.value as Vector;

    // Check if the two forces create equilibrium
    const allForces = [existingForce, userVector];
    const tolerance = config.tolerance || 0.02; // Default 2% for equilibrium

    const isInEquilibrium = checkEquilibrium(allForces as Force[], tolerance);

    if (isInEquilibrium) {
      return {
        isCorrect: true,
        feedback: generateCorrectFeedback(),
      };
    } else {
      return {
        isCorrect: false,
        feedback: {
          en: 'The forces are not in equilibrium. Check your calculation',
          cn: '力不平衡。请检查您的计算',
          de: 'Die Kräfte sind nicht im Gleichgewicht. Überprüfen Sie Ihre Berechnung',
        },
        correctAnswer: correct,
      };
    }
  }

  // Default case: compare values
  return validateNumericalAnswer(userAnswer, config, language);
}

// ============================================================================
// Helper Functions
// ============================================================================

function isVector(value: any): value is Vector {
  return (
    typeof value === 'object' &&
    value !== null &&
    'magnitude' in value &&
    'angle' in value
  );
}

// ============================================================================
// Feedback Generation
// ============================================================================

function generateCorrectFeedback(): MultiLangContent {
  return {
    en: 'Correct! Well done!',
    cn: '正确！做得好！',
    de: 'Richtig! Gut gemacht!',
  };
}

function generateIncorrectFeedback(type: string): MultiLangContent {
  return {
    en: 'Incorrect. Please try again',
    cn: '不正确。请再试一次',
    de: 'Falsch. Bitte versuchen Sie es erneut',
  };
}

/**
 * Generate detailed feedback for incorrect answers
 * @param userAnswer User's answer
 * @param correctAnswer Correct answer
 * @param type Type of error
 * @returns Detailed feedback
 */
export function generateDetailedFeedback(
  userAnswer: Answer,
  correctAnswer: Answer,
  type: 'magnitude' | 'angle' | 'units' | 'both'
): MultiLangContent {
  switch (type) {
    case 'magnitude':
      return {
        en: 'The magnitude is incorrect. Review your vector addition',
        cn: '大小不正确。请复习矢量加法',
        de: 'Der Betrag ist falsch. Überprüfen Sie Ihre Vektoraddition',
      };
    case 'angle':
      return {
        en: 'The angle is incorrect. Check your trigonometry',
        cn: '角度不正确。请检查您的三角函数',
        de: 'Der Winkel ist falsch. Überprüfen Sie Ihre Trigonometrie',
      };
    case 'units':
      return {
        en: 'Check your units. Make sure they match the required format',
        cn: '检查您的单位。确保它们符合要求的格式',
        de: 'Überprüfen Sie Ihre Einheiten. Stellen Sie sicher, dass sie dem erforderlichen Format entsprechen',
      };
    case 'both':
      return {
        en: 'Both magnitude and direction need correction',
        cn: '大小和方向都需要修正',
        de: 'Sowohl Betrag als auch Richtung müssen korrigiert werden',
      };
    default:
      return generateIncorrectFeedback('general');
  }
}
