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
