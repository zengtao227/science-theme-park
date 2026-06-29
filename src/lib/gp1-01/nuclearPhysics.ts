// SEMF coefficients (MeV)
const SEMF = {
    av: 15.8,
    as: 18.3,
    ac: 0.71,
    aa: 23.2,
};

export function calculateBindingEnergy(A: number, Z: number): number {
    if (A === 0) return 0;
    const N = A - Z;
    let delta = 0;
    if (Z % 2 === 0 && N % 2 === 0) delta = 12 / Math.sqrt(A);
    else if (Z % 2 === 1 && N % 2 === 1) delta = -12 / Math.sqrt(A);
    const volumeTerm = SEMF.av * A;
    const surfaceTerm = SEMF.as * Math.pow(A, 2 / 3);
    const coulombTerm = SEMF.ac * Z * (Z - 1) / Math.pow(A, 1 / 3);
    const asymmetryTerm = SEMF.aa * Math.pow(A - 2 * Z, 2) / A;
    return volumeTerm - surfaceTerm - coulombTerm - asymmetryTerm + delta;
}

export function calculateBEperNucleon(A: number, Z: number): number {
    if (A === 0) return 0;
    return calculateBindingEnergy(A, Z) / A;
}

export function isStable(Z: number, N: number): boolean {
    const A = Z + N;
    if (A === 0) return false;
    const idealN = Z * (1 + 0.015 * Math.pow(Z, 2 / 3));
    const deviation = Math.abs(N - idealN);
    const tolerance = 2 + A * 0.02;
    return deviation < tolerance && Z > 0 && N > 0;
}

export function getDecayMode(Z: number, N: number): "stable" | "alpha" | "beta-" | "beta+" {
    if (isStable(Z, N)) return "stable";
    const A = Z + N;
    if (A > 200 && Z > 82) return "alpha";
    const idealN = Z * (1 + 0.015 * Math.pow(Z, 2 / 3));
    if (N > idealN + 2) return "beta-";
    if (N < idealN - 2) return "beta+";
    return "stable";
}
