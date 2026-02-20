/**
 * Electric Field Calculations
 * 电场计算
 */

import { k } from './constants';

/**
 * Calculate electric field strength from a point charge
 * 计算点电荷的电场强度
 * 
 * Formula: E = kQ/r^2
 * 
 * @param charge - Charge in Coulombs (C)
 * @param distance - Distance from charge in meters (m)
 * @returns Electric field strength in N/C
 */
export function calculateElectricField(charge: number, distance: number): number {
  if (distance === 0) {
    throw new Error('Distance cannot be zero');
  }
  return (k * charge) / (distance * distance);
}

/**
 * Calculate electric force on a charge in an electric field
 * 计算电场中电荷受到的电场力
 * 
 * Formula: F = qE
 * 
 * @param charge - Charge in Coulombs (C)
 * @param field - Electric field strength in N/C
 * @returns Force in Newtons (N)
 */
export function calculateElectricForce(charge: number, field: number): number {
  return charge * field;
}

/**
 * Calculate electric field at a point due to multiple charges (superposition)
 * 计算多个电荷在某点产生的电场（叠加原理）
 * 
 * @param charges - Array of {charge: number, x: number, y: number}
 * @param point - Point {x: number, y: number}
 * @returns Electric field vector {Ex: number, Ey: number, magnitude: number}
 */
export function calculateFieldAtPoint(
  charges: Array<{ charge: number; x: number; y: number }>,
  point: { x: number; y: number }
): { Ex: number; Ey: number; magnitude: number } {
  let Ex = 0;
  let Ey = 0;

  for (const source of charges) {
    const dx = point.x - source.x;
    const dy = point.y - source.y;
    const r = Math.sqrt(dx * dx + dy * dy);

    if (r === 0) continue; // Skip if point is at charge location

    const E = calculateElectricField(source.charge, r);
    Ex += E * (dx / r); // x-component
    Ey += E * (dy / r); // y-component
  }

  const magnitude = Math.sqrt(Ex * Ex + Ey * Ey);
  return { Ex, Ey, magnitude };
}
