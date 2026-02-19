/**
 * Magnetic Field Calculations
 * 磁场计算
 */

import { mu0 } from './constants';

/**
 * Calculate magnetic field from a straight current-carrying wire
 * 计算直导线产生的磁场
 * 
 * Formula: B = μ₀I/(2πr)
 * 
 * @param current - Current in Amperes (A)
 * @param distance - Distance from wire in meters (m)
 * @returns Magnetic field strength in Tesla (T)
 */
export function calculateMagneticFieldStraightWire(
  current: number,
  distance: number
): number {
  if (distance === 0) {
    throw new Error('Distance cannot be zero');
  }
  return (mu0 * current) / (2 * Math.PI * distance);
}

/**
 * Calculate magnetic field at the center of a circular current loop
 * 计算圆形电流环中心的磁场
 * 
 * Formula: B = μ₀I/(2R)
 * 
 * @param current - Current in Amperes (A)
 * @param radius - Radius of the loop in meters (m)
 * @returns Magnetic field strength in Tesla (T)
 */
export function calculateMagneticFieldCircularLoop(
  current: number,
  radius: number
): number {
  if (radius === 0) {
    throw new Error('Radius cannot be zero');
  }
  return (mu0 * current) / (2 * radius);
}

/**
 * Calculate magnetic force on a current-carrying wire
 * 计算载流导线受到的磁场力
 * 
 * Formula: F/L = BIsinθ
 * 
 * @param field - Magnetic field strength in Tesla (T)
 * @param current - Current in Amperes (A)
 * @param length - Length of wire in meters (m)
 * @param angle - Angle between current and field in radians
 * @returns Force in Newtons (N)
 */
export function calculateMagneticForce(
  field: number,
  current: number,
  length: number,
  angle: number
): number {
  return field * current * length * Math.sin(angle);
}
