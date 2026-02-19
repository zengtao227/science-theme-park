/**
 * Physical Constants for Electromagnetism
 * 电磁学物理常数
 */

/**
 * Physical constants used in electromagnetic calculations
 */
export const PHYSICAL_CONSTANTS = {
  /** Coulomb's constant (N·m²/C²) */
  k: 8.99e9,
  
  /** Permeability of free space (T·m/A) */
  mu0: 4 * Math.PI * 1e-7,
  
  /** Elementary charge (C) */
  e: 1.60e-19,
  
  /** Electron mass (kg) */
  me: 9.11e-31,
  
  /** Proton mass (kg) */
  mp: 1.67e-27,
} as const;

/**
 * Get a physical constant by name
 * 
 * @param name - Name of the constant (k, mu0, e, me, mp)
 * @returns The value of the constant
 * @throws Error if constant name is not recognized
 */
export function getConstant(name: keyof typeof PHYSICAL_CONSTANTS): number {
  const value = PHYSICAL_CONSTANTS[name];
  if (value === undefined) {
    throw new Error(`Unknown physical constant: ${name}`);
  }
  return value;
}

/**
 * Export individual constants for convenience
 */
export const { k, mu0, e, me, mp } = PHYSICAL_CONSTANTS;
