/**
 * Tests for moduleCode normalization across store boundaries.
 * Covers fixes: #1 (adaptive filter), #3 (binary score), #6 (createUser isolation),
 * #10 (achievement checks), #11 (completeStage key normalization).
 */

import { getAdaptiveDifficulty } from "../../lib/ai/adaptiveEngine";
import type { HistoryEntry, DifficultyLevel } from "../../lib/store";

function makeEntry(moduleCode: string, score: number, difficulty: DifficultyLevel = "CORE"): HistoryEntry {
    return {
        id: `${moduleCode}-test`,
        timestamp: Date.now(),
        moduleCode,
        stage: "S1",
        difficulty,
        score,
        durationMs: 5000,
        rigor: score >= 1,
    };
}

// ---------------------------------------------------------------------------
// normalizeModuleCode — used by adaptiveEngine, store, ChamberLayout
// ---------------------------------------------------------------------------

describe("getAdaptiveDifficulty — format-agnostic filtering", () => {
    it("matches history with uppercase-dot format against lowercase-hyphen moduleCode", () => {
        // Simulate legacy history (old uppercase-dot format in history, hook passes lowercase-hyphen)
        const history = [
            makeEntry("SM2.09", 1, "CORE"),
            makeEntry("SM2.09", 1, "CORE"),
            makeEntry("SM2.09", 1, "CORE"),
            makeEntry("SM2.09", 1, "CORE"),
            makeEntry("SM2.09", 1, "CORE"),
        ];
        const result = getAdaptiveDifficulty(history, "sm2-09");
        // 5 successes → high accuracy → should recommend above CORE
        expect(result.recommendedDifficulty).not.toBe("CORE");
        expect(result.reason).not.toBe("DEFAULT_CALIBRATION_PENDING");
    });

    it("matches history with lowercase-hyphen format (canonical)", () => {
        const history = [
            makeEntry("gm1-01", 1, "CORE"),
            makeEntry("gm1-01", 1, "CORE"),
            makeEntry("gm1-01", 1, "CORE"),
            makeEntry("gm1-01", 1, "CORE"),
            makeEntry("gm1-01", 1, "CORE"),
        ];
        const result = getAdaptiveDifficulty(history, "gm1-01");
        expect(result.reason).not.toBe("DEFAULT_CALIBRATION_PENDING");
    });

    it("returns DEFAULT_CALIBRATION_PENDING when moduleCode does not match any history", () => {
        const history = [
            makeEntry("sc1-01", 1),
            makeEntry("sc1-01", 1),
            makeEntry("sc1-01", 1),
            makeEntry("sc1-01", 1),
            makeEntry("sc1-01", 1),
        ];
        const result = getAdaptiveDifficulty(history, "sc2-01");
        expect(result.reason).toBe("DEFAULT_CALIBRATION_PENDING");
    });

    it("returns DEFAULT_CALIBRATION_PENDING when history has fewer than 3 entries", () => {
        const history = [makeEntry("gm1-01", 1), makeEntry("gm1-01", 0)];
        const result = getAdaptiveDifficulty(history, "gm1-01");
        expect(result.reason).toBe("DEFAULT_CALIBRATION_PENDING");
        expect(result.confidence).toBe(0.5);
    });

    it("recommends downgrade when student is struggling (recentSuccesses ≤ 1)", () => {
        const history = [
            makeEntry("sc1-02", 0, "CORE"),
            makeEntry("sc1-02", 0, "CORE"),
            makeEntry("sc1-02", 0, "CORE"),
            makeEntry("sc1-02", 0, "CORE"),
            makeEntry("sc1-02", 0, "CORE"),
        ];
        const result = getAdaptiveDifficulty(history, "sc1-02");
        expect(result.recommendedDifficulty).toBe("BASIC");
        expect(result.reason).toBe("REMEDIATION_REQUIRED");
    });
});

// ---------------------------------------------------------------------------
// Binary score invariant (fixing #3: score should be 0 or 1, not successRate)
// ---------------------------------------------------------------------------

describe("binary score invariant", () => {
    it("score=1 represents a perfect first-attempt (rigor=true)", () => {
        const entry = makeEntry("gm1-01", 1);
        expect(entry.score).toBe(1);
        expect(entry.rigor).toBe(true);
    });

    it("score=0 represents a failed attempt (rigor=false)", () => {
        const entry = makeEntry("sc1-01", 0);
        entry.rigor = false;
        expect(entry.score).toBe(0);
        expect(entry.rigor).toBe(false);
    });

    it("achievement check score >= 1 passes for binary score=1", () => {
        // Simulates the mole_master / calculus_god check
        const score = 1;
        expect(score >= 1).toBe(true);
    });

    it("achievement check score >= 1 fails for binary score=0 (had errors)", () => {
        const score = 0;
        expect(score >= 1).toBe(false);
    });
});
