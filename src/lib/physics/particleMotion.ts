/**
 * Particle Motion in Electromagnetic Fields
 * 电磁场中的粒子运动
 */

/**
 * Calculate acceleration of a charged particle in an electric field
 * 计算带电粒子在电场中的加速度
 * 
 * Formula: a = qE/m
 * 
 * @param charge - Charge in Coulombs (C)
 * @param mass - Mass in kilograms (kg)
 * @param field - Electric field strength in N/C
 * @returns Acceleration in m/s^2
 */
export function calculateAcceleration(
  charge: number,
  mass: number,
  field: number
): number {
  if (mass === 0) {
    throw new Error('Mass cannot be zero');
  }
  return (charge * field) / mass;
}

/**
 * Calculate radius of circular motion for a charged particle in a magnetic field
 * 计算带电粒子在磁场中做圆周运动的半径
 * 
 * Formula: r = mv/(qB)
 * 
 * @param mass - Mass in kilograms (kg)
 * @param velocity - Velocity in m/s
 * @param charge - Charge in Coulombs (C)
 * @param field - Magnetic field strength in Tesla (T)
 * @returns Radius in meters (m)
 */
export function calculateCircularRadius(
  mass: number,
  velocity: number,
  charge: number,
  field: number
): number {
  if (charge === 0 || field === 0) {
    throw new Error('Charge and field cannot be zero');
  }
  return (mass * velocity) / (charge * field);
}

/**
 * Calculate velocity for a velocity selector (crossed E and B fields)
 * 计算速度选择器中的速度（正交电场和磁场）
 * 
 * Formula: v = E/B
 * 
 * @param electricField - Electric field strength in N/C
 * @param magneticField - Magnetic field strength in Tesla (T)
 * @returns Velocity in m/s
 */
export function calculateVelocitySelector(
  electricField: number,
  magneticField: number
): number {
  if (magneticField === 0) {
    throw new Error('Magnetic field cannot be zero');
  }
  return electricField / magneticField;
}
