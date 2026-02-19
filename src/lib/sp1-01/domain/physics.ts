/**
 * SP1.01 - Forces Basics Module
 * Core force physics calculations and vector mathematics
 */

import {
  Vector,
  Force,
  CartesianVector,
  ForceUnit,
  FORCE_UNIT_CONVERSIONS,
  EquilibriumAnalysis,
} from './types';

// ============================================================================
// Vector Mathematics
// ============================================================================

/**
 * Add multiple vectors together
 * @param vectors Array of vectors to add
 * @returns Resultant vector
 */
export function addVectors(vectors: Vector[]): Vector {
  if (vectors.length === 0) {
    return { magnitude: 0, angle: 0, components: { x: 0, y: 0 } };
  }

  // Convert all vectors to Cartesian and sum
  let sumX = 0;
  let sumY = 0;

  for (const vector of vectors) {
    const components = decomposeVector(vector);
    sumX += components.x;
    sumY += components.y;
  }

  // Convert back to polar
  const magnitude = calculateMagnitude(sumX, sumY);
  const angle = calculateAngle(sumX, sumY);

  return {
    magnitude,
    angle,
    components: { x: sumX, y: sumY },
  };
}

/**
 * Decompose a vector into x and y components
 * @param vector Vector in polar form
 * @returns Cartesian components
 */
export function decomposeVector(vector: Vector): CartesianVector {
  // If components already exist, return them
  if (vector.components) {
    return vector.components;
  }

  // Convert angle to radians
  const angleRad = (vector.angle * Math.PI) / 180;

  // Calculate components
  const x = vector.magnitude * Math.cos(angleRad);
  const y = vector.magnitude * Math.sin(angleRad);

  return { x, y };
}

/**
 * Calculate magnitude from Cartesian components
 * @param x X component
 * @param y Y component
 * @returns Magnitude
 */
export function calculateMagnitude(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculate angle from Cartesian components
 * @param x X component
 * @param y Y component
 * @returns Angle in degrees (0-360)
 */
export function calculateAngle(x: number, y: number): number {
  // Handle zero vector
  if (x === 0 && y === 0) {
    return 0;
  }

  // Calculate angle in radians using atan2 (handles all quadrants)
  const angleRad = Math.atan2(y, x);

  // Convert to degrees
  let angleDeg = (angleRad * 180) / Math.PI;

  // Normalize to 0-360 range
  if (angleDeg < 0) {
    angleDeg += 360;
  }

  return angleDeg;
}

// ============================================================================
// Force-Specific Calculations
// ============================================================================

/**
 * Calculate the resultant force from multiple forces
 * @param forces Array of forces
 * @returns Resultant force
 */
export function calculateResultant(forces: Force[]): Force {
  const resultantVector = addVectors(forces);

  return {
    ...resultantVector,
    label: 'Resultant',
    units: forces[0]?.units || 'N',
  };
}

/**
 * Check if forces are in equilibrium
 * @param forces Array of forces
 * @param tolerance Tolerance for equilibrium check (default 0.01 = 1%)
 * @returns True if forces are in equilibrium
 */
export function checkEquilibrium(
  forces: Force[],
  tolerance: number = 0.01
): boolean {
  const resultant = addVectors(forces);

  // Calculate the sum of all force magnitudes to determine relative tolerance
  const totalMagnitude = forces.reduce(
    (sum, force) => sum + force.magnitude,
    0
  );

  // Absolute tolerance based on total magnitude
  const absoluteTolerance = totalMagnitude * tolerance;

  // Check if resultant magnitude is within tolerance
  return resultant.magnitude <= absoluteTolerance;
}

/**
 * Perform detailed equilibrium analysis
 * @param forces Array of forces
 * @param tolerance Tolerance for equilibrium check (default 0.01 = 1%)
 * @returns Detailed equilibrium analysis
 */
export function analyzeEquilibrium(
  forces: Force[],
  tolerance: number = 0.01
): EquilibriumAnalysis {
  const netForce = addVectors(forces);

  // Calculate sum of components
  const sumOfXComponents = forces.reduce((sum, force) => {
    const components = decomposeVector(force);
    return sum + components.x;
  }, 0);

  const sumOfYComponents = forces.reduce((sum, force) => {
    const components = decomposeVector(force);
    return sum + components.y;
  }, 0);

  const isInEquilibrium = checkEquilibrium(forces, tolerance);

  return {
    isInEquilibrium,
    netForce,
    netForceMagnitude: netForce.magnitude,
    sumOfXComponents,
    sumOfYComponents,
    tolerance,
  };
}

/**
 * Resolve force into parallel and perpendicular components relative to an angle
 * @param force Force to resolve
 * @param angle Angle in degrees
 * @returns Parallel and perpendicular components
 */
export function resolveForceComponents(
  force: Force,
  angle: number
): { parallel: number; perpendicular: number } {
  // Get force components
  const forceComponents = decomposeVector(force);

  // Convert reference angle to radians
  const angleRad = (angle * Math.PI) / 180;

  // Calculate parallel and perpendicular components
  const parallel =
    forceComponents.x * Math.cos(angleRad) +
    forceComponents.y * Math.sin(angleRad);
  const perpendicular =
    -forceComponents.x * Math.sin(angleRad) +
    forceComponents.y * Math.cos(angleRad);

  return { parallel, perpendicular };
}

// ============================================================================
// Unit Conversions
// ============================================================================

/**
 * Convert force units
 * @param value Force value
 * @param fromUnit Source unit
 * @param toUnit Target unit
 * @returns Converted value
 */
export function convertForceUnits(
  value: number,
  fromUnit: ForceUnit,
  toUnit: ForceUnit
): number {
  // Convert to base unit (N) first
  const valueInNewtons = value * FORCE_UNIT_CONVERSIONS[fromUnit];

  // Convert to target unit
  return valueInNewtons / FORCE_UNIT_CONVERSIONS[toUnit];
}

/**
 * Format force value with appropriate unit
 * @param value Force value in Newtons
 * @returns Formatted string with appropriate unit
 */
export function formatForceValue(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(2)} MN`;
  } else if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(2)} kN`;
  } else {
    return `${value.toFixed(2)} N`;
  }
}
