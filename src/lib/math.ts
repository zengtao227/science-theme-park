/**
 * Deterministic pseudo-random generator for React purity compliance.
 * Returns a value between 0 and 1 based on the provided seed.
 */
export function pseudoRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

/**
 * Returns a random-ish value for 3D noise/variance.
 */
export function pseudoRandomVec(seed: number): [number, number, number] {
    return [
        pseudoRandom(seed * 12.9898),
        pseudoRandom(seed * 78.233),
        pseudoRandom(seed * 43.758)
    ];
}

export type Complex = {
    re: number;
    im: number;
};

export function complexPow(base: Complex, power: number) {
    const r = Math.hypot(base.re, base.im);
    const theta = Math.atan2(base.im, base.re);
    const newR = Math.pow(r, power);
    const newTheta = theta * power;
    return {
        re: newR * Math.cos(newTheta),
        im: newR * Math.sin(newTheta),
        r: newR,
        theta: newTheta
    };
}

export function complexPowSteps(base: Complex, power: number, steps: number) {
    const points = [];
    for (let i = 0; i <= steps; i += 1) {
        const t = (i / steps) * power;
        points.push(complexPow(base, t));
    }
    return points;
}

// --- Radical utilities (shared across SM2.02, SM2.04, etc.) ---

export interface Radical {
    k: number;
    m: number;
}

/**
 * Simplifies √n into k√m where m has no perfect square factors.
 * Example: simplifyRadical(72) → { k: 6, m: 2 } since √72 = 6√2
 */
export function simplifyRadical(n: number): Radical {
    let k = 1;
    let m = n;
    for (let i = 2; i * i <= m; i++) {
        while (m % (i * i) === 0) {
            k *= i;
            m /= i * i;
        }
    }
    return { k, m };
}

/**
 * Formats a Radical as a LaTeX string for use in expressionLatex / correctLatex.
 * Uses 2 backslashes in JS source → 1 backslash in memory → KaTeX renders √ correctly.
 */
export function formatRadicalLatex({ k, m }: Radical): string {
    if (m === 1) return `${k}`;
    if (k === 1) return `\\sqrt{${m}}`;
    return `${k}\\sqrt{${m}}`;
}
