import { HistoryEntry, DifficultyLevel } from '../store';
import { normalizeModuleCode } from '../moduleCode';

export interface DifficultyAdjustment {
    recommendedDifficulty: DifficultyLevel;
    confidence: number;
    reason: string;
}

const PROMOTION_WINDOW = 3;
const DIFFICULTY_ORDER: DifficultyLevel[] = ['BASIC', 'CORE', 'ADVANCED', 'ELITE'];

function nextDifficulty(current: DifficultyLevel): DifficultyLevel {
    const index = DIFFICULTY_ORDER.indexOf(current);
    if (index < 0 || index >= DIFFICULTY_ORDER.length - 1) return current;
    return DIFFICULTY_ORDER[index + 1];
}

function previousDifficulty(current: DifficultyLevel): DifficultyLevel {
    const index = DIFFICULTY_ORDER.indexOf(current);
    if (index <= 0) return current;
    return DIFFICULTY_ORDER[index - 1];
}

/**
 * Heuristic-based adaptive difficulty engine
 * (Phase 5.1.1 MVP)
 */
export function getAdaptiveDifficulty(history: HistoryEntry[], moduleCode: string): DifficultyAdjustment {
    const normalizedCode = normalizeModuleCode(moduleCode);
    const moduleHistory = (history ?? []).filter(h => normalizeModuleCode(h.moduleCode) === normalizedCode);

    // Default for new users
    if (moduleHistory.length < PROMOTION_WINDOW) {
        return {
            recommendedDifficulty: 'CORE',
            confidence: 0.5,
            reason: 'DEFAULT_CALIBRATION_PENDING',
        };
    }

    const recentHistory = moduleHistory.slice(0, PROMOTION_WINDOW);
    const recentSuccesses = recentHistory.filter(h => h.score >= 1).length;
    const currentDifficulty = recentHistory[0].difficulty;

    if (recentSuccesses === PROMOTION_WINDOW) {
        const promoted = nextDifficulty(currentDifficulty);
        if (promoted !== currentDifficulty) {
            return {
                recommendedDifficulty: promoted,
                confidence: 0.95,
                reason: currentDifficulty === 'ADVANCED' ? 'MASTERY_DETECTED' : 'HIGH_ACCURACY_DETECTED',
            };
        }
        return { recommendedDifficulty: currentDifficulty, confidence: 1.0, reason: 'MAINTAINING_MAX_LEVEL' };
    }

    if (recentSuccesses <= 1) {
        const demoted = previousDifficulty(currentDifficulty);
        if (demoted !== currentDifficulty) {
            return {
                recommendedDifficulty: demoted,
                confidence: currentDifficulty === 'CORE' ? 0.95 : 0.8,
                reason: currentDifficulty === 'CORE' ? 'REMEDIATION_REQUIRED' : 'RECALIBRATING_BASICS',
            };
        }
    }

    return {
        recommendedDifficulty: currentDifficulty,
        confidence: 0.6,
        reason: 'STABLE_PERFORMANCE',
    };
}
