/**
 * Thermodynamics Physics Engine
 * 热力学计算引擎
 */

/**
 * Calculate ideal gas pressure using PV = nRT
 * 使用理想气体方程计算压力
 * 
 * @param n - Number of moles
 * @param T - Temperature (K)
 * @param V - Volume (L)
 * @returns Pressure (atm)
 */
export function idealGasPressure(n: number, T: number, V: number): number {
  const R = 0.0821; // Gas constant (L·atm/(mol·K))
  return (n * R * T) / V;
}

/**
 * Calculate particle kinetic energy from temperature
 * 从温度计算粒子动能
 * 
 * @param T - Temperature (K)
 * @returns Average kinetic energy (J)
 */
export function kineticEnergyFromTemperature(T: number): number {
  const kB = 1.381e-23; // Boltzmann constant (J/K)
  return (3 / 2) * kB * T;
}

/**
 * Calculate particle velocity from temperature (Maxwell-Boltzmann)
 * 从温度计算粒子速度（麦克斯韦-玻尔兹曼分布）
 * 
 * @param T - Temperature (K)
 * @param m - Particle mass (kg)
 * @returns RMS velocity (m/s)
 */
export function rmsVelocity(T: number, m: number): number {
  const kB = 1.381e-23; // Boltzmann constant (J/K)
  return Math.sqrt((3 * kB * T) / m);
}

/**
 * Calculate equilibrium constant from Gibbs free energy
 * 从吉布斯自由能计算平衡常数
 * 
 * @param deltaG - Gibbs free energy change (kJ/mol)
 * @param T - Temperature (K)
 * @returns Equilibrium constant K
 */
export function equilibriumConstant(deltaG: number, T: number): number {
  const R = 8.314; // Gas constant (J/(mol·K))
  const deltaG_J = deltaG * 1000; // Convert kJ to J
  return Math.exp(-deltaG_J / (R * T));
}

/**
 * Calculate Le Chatelier shift direction
 * 计算勒夏特列原理的平衡移动方向
 * 
 * @param stress - Type of stress: 'concentration', 'temperature', 'pressure'
 * @param change - Change direction: 'increase' or 'decrease'
 * @param isExothermic - Whether reaction is exothermic
 * @param reactantMoles - Number of moles of reactants
 * @param productMoles - Number of moles of products
 * @returns Shift direction: 'right' (forward) or 'left' (backward)
 */
export function leChatelierShift(
  stress: 'concentration' | 'temperature' | 'pressure',
  change: 'increase' | 'decrease',
  isExothermic: boolean = true,
  reactantMoles: number = 2,
  productMoles: number = 2
): 'right' | 'left' {
  if (stress === 'concentration') {
    // Adding reactant shifts right, adding product shifts left
    return change === 'increase' ? 'right' : 'left';
  } else if (stress === 'temperature') {
    // Increasing temperature shifts toward endothermic direction
    if (change === 'increase') {
      return isExothermic ? 'left' : 'right';
    } else {
      return isExothermic ? 'right' : 'left';
    }
  } else if (stress === 'pressure') {
    // Increasing pressure shifts toward fewer moles
    if (change === 'increase') {
      return productMoles < reactantMoles ? 'right' : 'left';
    } else {
      return productMoles < reactantMoles ? 'left' : 'right';
    }
  }
  return 'right';
}

/**
 * Calculate heat transfer Q = mcΔT
 * 计算热量传递
 * 
 * @param m - Mass (kg)
 * @param c - Specific heat capacity (J/(kg·K))
 * @param deltaT - Temperature change (K)
 * @returns Heat transferred (J)
 */
export function heatTransfer(m: number, c: number, deltaT: number): number {
  return m * c * deltaT;
}

/**
 * Calculate entropy change
 * 计算熵变
 * 
 * @param Q - Heat transferred (J)
 * @param T - Temperature (K)
 * @returns Entropy change (J/K)
 */
export function entropyChange(Q: number, T: number): number {
  return Q / T;
}
