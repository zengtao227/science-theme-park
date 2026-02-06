/**
 * Quantum Mechanics Physics Engine
 * 量子力学计算引擎
 */

/**
 * Calculate quantum tunneling transmission coefficient
 * 计算量子隧穿透射系数
 * 
 * @param E - Particle energy (eV)
 * @param V0 - Barrier height (eV)
 * @param a - Barrier width (nm)
 * @returns Transmission coefficient T (0-1)
 */
export function calculateTransmissionCoefficient(
  E: number,
  V0: number,
  a: number
): number {
  if (E >= V0) {
    // Classical case: particle has enough energy
    const k1 = Math.sqrt(E);
    const k2 = Math.sqrt(E - V0);
    const T = (4 * k1 * k2) / Math.pow(k1 + k2, 2);
    return Math.min(T, 1);
  } else {
    // Quantum tunneling case
    const kappa = Math.sqrt(V0 - E);
    const sinhTerm = Math.sinh(kappa * a);
    const T =
      1 / (1 + (Math.pow(V0, 2) * Math.pow(sinhTerm, 2)) / (4 * E * (V0 - E)));
    return Math.min(T, 1);
  }
}

/**
 * Calculate wave function amplitude at position x
 * 计算位置 x 处的波函数振幅
 * 
 * @param x - Position
 * @param E - Particle energy
 * @param V0 - Barrier height
 * @param a - Barrier width
 * @param time - Time parameter for animation
 * @returns Wave function amplitude
 */
export function calculateWaveFunction(
  x: number,
  E: number,
  V0: number,
  a: number,
  time: number
): number {
  const T = calculateTransmissionCoefficient(E, V0, a);
  const R = Math.sqrt(1 - T);

  // Region I: x < -a/2 (incident + reflected)
  if (x < -a / 2) {
    const k = Math.sqrt(E);
    const A = 1; // incident amplitude
    return A * Math.cos(k * x - time) + R * Math.cos(-k * x - time);
  }
  // Region II: -a/2 < x < a/2 (inside barrier)
  else if (x >= -a / 2 && x <= a / 2) {
    if (E < V0) {
      const kappa = Math.sqrt(V0 - E);
      const C = Math.exp(-kappa * (a / 2));
      return C * Math.exp(-kappa * (x + a / 2)) * Math.cos(time);
    } else {
      const k2 = Math.sqrt(E - V0);
      return 0.5 * Math.cos(k2 * x - time);
    }
  }
  // Region III: x > a/2 (transmitted)
  else {
    const k = Math.sqrt(E);
    const transmittedAmplitude = Math.sqrt(T);
    return transmittedAmplitude * Math.cos(k * x - time);
  }
}

/**
 * Calculate probability density |ψ|²
 * 计算概率密度
 */
export function calculateProbabilityDensity(
  x: number,
  E: number,
  V0: number,
  a: number,
  time: number
): number {
  const psi = calculateWaveFunction(x, E, V0, a, time);
  return psi * psi;
}

/**
 * Calculate de Broglie wavelength
 * 计算德布罗意波长
 * 
 * @param momentum - Particle momentum
 * @returns Wavelength in nm
 */
export function deBroglieWavelength(momentum: number): number {
  const h = 6.626e-34; // Planck constant (J·s)
  return h / momentum;
}

/**
 * Calculate Heisenberg uncertainty
 * 计算海森堡不确定性
 * 
 * @param deltaX - Position uncertainty
 * @returns Minimum momentum uncertainty
 */
export function heisenbergUncertainty(deltaX: number): number {
  const hbar = 1.055e-34; // Reduced Planck constant (J·s)
  return hbar / (2 * deltaX);
}
