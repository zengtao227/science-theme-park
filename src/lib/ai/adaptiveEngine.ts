import { HistoryEntry, DifficultyLevel } from '../store';

export interface PerformanceMetrics {
    averageScore: number;
    averageDurationMs: number;
    rigorRate: number; // 0-1
    successCount: number;
    failureCount: number;
    moduleVelocity: number; // Correct answers per unit of time
}

export interface DifficultyAdjustment {
    recommendedDifficulty: DifficultyLevel;
    confidence: number;
    reason: string;
}

/**
 * Analyzes previous performances for a specific module
 */
export function analyzePerformance(history: HistoryEntry[], moduleCode: string): PerformanceMetrics {
    const moduleHistory = history.filter(h => h.moduleCode === moduleCode);

    if (moduleHistory.length === 0) {
        return {
            averageScore: 0,
            averageDurationMs: 0,
            rigorRate: 0,
            successCount: 0,
            failureCount: 0,
            moduleVelocity: 0,
        };
    }

    const scores = moduleHistory.map(h => h.score);
    const durations = moduleHistory.map(h => h.durationMs);
    const rigorCount = moduleHistory.filter(h => h.rigor).length;
    const successes = moduleHistory.filter(h => h.score >= 1).length;

    return {
        averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
        averageDurationMs: durations.reduce((a, b) => a + b, 0) / durations.length,
        rigorRate: rigorCount / moduleHistory.length,
        successCount: successes,
        failureCount: moduleHistory.length - successes,
        moduleVelocity: successes / (durations.reduce((a, b) => a + b, 0) / 1000 / 60 || 1), // successes per minute
    };
}

/**
 * Heuristic-based adaptive difficulty engine
 * (Phase 5.1.1 MVP)
 */
export function getAdaptiveDifficulty(history: HistoryEntry[], moduleCode: string): DifficultyAdjustment {
    const metrics = analyzePerformance(history, moduleCode);
    const moduleHistory = history.filter(h => h.moduleCode === moduleCode);

    // Default for new users
    if (moduleHistory.length < 3) {
        return {
            recommendedDifficulty: 'CORE',
            confidence: 0.5,
            reason: 'DEFAULT_CALIBRATION_PENDING',
        };
    }

    const recentHistory = moduleHistory.slice(0, 5);
    const recentSuccesses = recentHistory.filter(h => h.score >= 1).length;

    // Logic:
    // 1. If 100% success in last 3 ELITE-ready attempts -> Recommend ELITE
    // 2. If < 50% success in CORE -> Recommend BASIC
    // 3. If High Accuracy but High Duration -> Keep current, maybe recommend hints
    // 4. If High Accuracy and Low Duration -> Up difficulty

    if (recentSuccesses >= 4) {
        // High performance
        const currentMax = recentHistory[0].difficulty;
        if (currentMax === 'CORE') return { recommendedDifficulty: 'ADVANCED', confidence: 0.8, reason: 'HIGH_ACCURACY_DETECTED' };
        if (currentMax === 'ADVANCED') return { recommendedDifficulty: 'ELITE', confidence: 0.9, reason: 'MASTERY_DETECTED' };
        return { recommendedDifficulty: currentMax, confidence: 1.0, reason: 'MAINTAINING_MAX_LEVEL' };
    }

    if (recentSuccesses <= 1) {
        // Struggling
        const currentMin = recentHistory[0].difficulty;
        if (currentMin === 'ELITE') return { recommendedDifficulty: 'ADVANCED', confidence: 0.7, reason: 'DIFFICULTY_SPIKE_DETECTED' };
        if (currentMin === 'ADVANCED') return { recommendedDifficulty: 'CORE', confidence: 0.8, reason: 'RECALIBRATING_BASICS' };
        if (currentMin === 'CORE') return { recommendedDifficulty: 'BASIC', confidence: 0.9, reason: 'REMEDIATION_REQUIRED' };
    }

    return {
        recommendedDifficulty: recentHistory[0].difficulty,
        confidence: 0.6,
        reason: 'STABLE_PERFORMANCE',
    };
}
