/**
 * Electromagnetism Physics Engine
 * 电磁学计算引擎
 */

/**
 * Calculate electric field from point charge
 * 计算点电荷的电场
 * 
 * @param q - Charge (C)
 * @param r - Distance (m)
 * @returns Electric field (N/C)
 */
export function electricField(q: number, r: number): number {
  const k = 8.99e9; // Coulomb constant (N·m^{2}/C^{2})
  return (k * q) / (r * r);
}

/**
 * Calculate electric potential
 * 计算电势
 * 
 * @param q - Charge (C)
 * @param r - Distance (m)
 * @returns Electric potential (V)
 */
export function electricPotential(q: number, r: number): number {
  const k = 8.99e9; // Coulomb constant (N·m^{2}/C^{2})
  return (k * q) / r;
}

/**
 * Calculate Coulomb force between two charges
 * 计算两个电荷之间的库仑力
 * 
 * @param q1 - Charge 1 (C)
 * @param q2 - Charge 2 (C)
 * @param r - Distance (m)
 * @returns Force (N)
 */
export function coulombForce(q1: number, q2: number, r: number): number {
  const k = 8.99e9; // Coulomb constant (N·m^{2}/C^{2})
  return (k * q1 * q2) / (r * r);
}

/**
 * Calculate current from Ohm's Law
 * 使用欧姆定律计算电流
 * 
 * @param V - Voltage (V)
 * @param R - Resistance (Ω)
 * @returns Current (A)
 */
export function ohmLawCurrent(V: number, R: number): number {
  return V / R;
}

/**
 * Calculate power dissipation
 * 计算功率耗散
 * 
 * @param V - Voltage (V)
 * @param I - Current (A)
 * @returns Power (W)
 */
export function powerDissipation(V: number, I: number): number {
  return V * I;
}

/**
 * Calculate series resistance
 * 计算串联电阻
 * 
 * @param resistances - Array of resistances (Ω)
 * @returns Total resistance (Ω)
 */
export function seriesResistance(resistances: number[]): number {
  return resistances.reduce((sum, R) => sum + R, 0);
}

/**
 * Calculate parallel resistance
 * 计算并联电阻
 * 
 * @param resistances - Array of resistances (Ω)
 * @returns Total resistance (Ω)
 */
export function parallelResistance(resistances: number[]): number {
  const reciprocalSum = resistances.reduce((sum, R) => sum + 1 / R, 0);
  return 1 / reciprocalSum;
}

/**
 * Calculate magnetic force on moving charge (Lorentz force)
 * 计算运动电荷的磁力（洛伦兹力）
 * 
 * @param q - Charge (C)
 * @param v - Velocity (m/s)
 * @param B - Magnetic field (T)
 * @param theta - Angle between v and B (radians)
 * @returns Force (N)
 */
export function lorentzForce(
  q: number,
  v: number,
  B: number,
  theta: number
): number {
  return q * v * B * Math.sin(theta);
}

/**
 * Calculate magnetic field from current-carrying wire
 * 计算载流导线的磁场
 * 
 * @param I - Current (A)
 * @param r - Distance from wire (m)
 * @returns Magnetic field (T)
 */
export function magneticFieldFromWire(I: number, r: number): number {
  const mu0 = 4 * Math.PI * 1e-7; // Permeability of free space (T·m/A)
  return (mu0 * I) / (2 * Math.PI * r);
}

/**
 * Calculate induced EMF (Faraday's Law)
 * 计算感应电动势（法拉第定律）
 * 
 * @param N - Number of turns
 * @param dPhi - Change in magnetic flux (Wb)
 * @param dt - Time interval (s)
 * @returns Induced EMF (V)
 */
export function inducedEMF(N: number, dPhi: number, dt: number): number {
  return -N * (dPhi / dt);
}

/**
 * Calculate capacitance
 * 计算电容
 * 
 * @param Q - Charge (C)
 * @param V - Voltage (V)
 * @returns Capacitance (F)
 */
export function capacitance(Q: number, V: number): number {
  return Q / V;
}

/**
 * Calculate energy stored in capacitor
 * 计算电容器储存的能量
 * 
 * @param C - Capacitance (F)
 * @param V - Voltage (V)
 * @returns Energy (J)
 */
export function capacitorEnergy(C: number, V: number): number {
  return 0.5 * C * V * V;
}

/**
 * Calculate Nernst potential for electrochemical cell
 * 计算电化学电池的能斯特电势
 * 
 * @param E0 - Standard potential (V)
 * @param n - Number of electrons transferred
 * @param Q - Reaction quotient
 * @param T - Temperature (K), default 298
 * @returns Cell potential (V)
 */
export function nernstEquation(
  E0: number,
  n: number,
  Q: number,
  T: number = 298
): number {
  const R = 8.314; // Gas constant (J/(mol·K))
  const F = 96485; // Faraday constant (C/mol)
  return E0 - (R * T) / (n * F) * Math.log(Q);
}

/**
 * Calculate standard cell potential from reduction potentials
 * 从还原电势计算标准电池电势
 * 
 * @param E_cathode - Cathode reduction potential (V)
 * @param E_anode - Anode reduction potential (V)
 * @returns Standard cell potential (V)
 */
export function standardCellPotential(
  E_cathode: number,
  E_anode: number
): number {
  return E_cathode - E_anode;
}
