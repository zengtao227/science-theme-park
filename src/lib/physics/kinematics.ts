/**
 * Kinematics Physics Engine
 * 运动学计算引擎
 */

import * as THREE from "three";

/**
 * Calculate velocity from acceleration
 * 从加速度计算速度
 * 
 * @param v0 - Initial velocity (m/s)
 * @param a - Acceleration (m/s²)
 * @param t - Time (s)
 * @returns Final velocity (m/s)
 */
export function velocityFromAcceleration(
  v0: number,
  a: number,
  t: number
): number {
  return v0 + a * t;
}

/**
 * Calculate position from velocity
 * 从速度计算位置
 * 
 * @param x0 - Initial position (m)
 * @param v0 - Initial velocity (m/s)
 * @param a - Acceleration (m/s²)
 * @param t - Time (s)
 * @returns Final position (m)
 */
export function positionFromVelocity(
  x0: number,
  v0: number,
  a: number,
  t: number
): number {
  return x0 + v0 * t + 0.5 * a * t * t;
}

/**
 * Calculate kinetic energy
 * 计算动能
 * 
 * @param m - Mass (kg)
 * @param v - Velocity (m/s)
 * @returns Kinetic energy (J)
 */
export function kineticEnergy(m: number, v: number): number {
  return 0.5 * m * v * v;
}

/**
 * Calculate potential energy
 * 计算势能
 * 
 * @param m - Mass (kg)
 * @param h - Height (m)
 * @param g - Gravitational acceleration (m/s²), default 9.81
 * @returns Potential energy (J)
 */
export function potentialEnergy(m: number, h: number, g: number = 9.81): number {
  return m * g * h;
}

/**
 * Calculate momentum
 * 计算动量
 * 
 * @param m - Mass (kg)
 * @param v - Velocity (m/s)
 * @returns Momentum (kg·m/s)
 */
export function momentum(m: number, v: number): number {
  return m * v;
}

/**
 * Calculate centripetal acceleration
 * 计算向心加速度
 * 
 * @param v - Velocity (m/s)
 * @param r - Radius (m)
 * @returns Centripetal acceleration (m/s²)
 */
export function centripetalAcceleration(v: number, r: number): number {
  return (v * v) / r;
}

/**
 * Calculate projectile motion trajectory
 * 计算抛体运动轨迹
 * 
 * @param v0 - Initial velocity (m/s)
 * @param angle - Launch angle (radians)
 * @param t - Time (s)
 * @param g - Gravitational acceleration (m/s²), default 9.81
 * @returns Position {x, y} (m)
 */
export function projectileMotion(
  v0: number,
  angle: number,
  t: number,
  g: number = 9.81
): { x: number; y: number } {
  const vx = v0 * Math.cos(angle);
  const vy = v0 * Math.sin(angle);
  
  return {
    x: vx * t,
    y: vy * t - 0.5 * g * t * t,
  };
}

/**
 * Calculate elastic collision velocities (1D)
 * 计算弹性碰撞后的速度（一维）
 * 
 * @param m1 - Mass of object 1 (kg)
 * @param v1 - Velocity of object 1 (m/s)
 * @param m2 - Mass of object 2 (kg)
 * @param v2 - Velocity of object 2 (m/s)
 * @returns Final velocities {v1f, v2f} (m/s)
 */
export function elasticCollision(
  m1: number,
  v1: number,
  m2: number,
  v2: number
): { v1f: number; v2f: number } {
  const v1f = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
  const v2f = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
  
  return { v1f, v2f };
}

/**
 * Calculate friction force
 * 计算摩擦力
 * 
 * @param mu - Coefficient of friction
 * @param N - Normal force (N)
 * @returns Friction force (N)
 */
export function frictionForce(mu: number, N: number): number {
  return mu * N;
}

/**
 * Calculate pendulum period
 * 计算单摆周期
 * 
 * @param L - Length (m)
 * @param g - Gravitational acceleration (m/s²), default 9.81
 * @returns Period (s)
 */
export function pendulumPeriod(L: number, g: number = 9.81): number {
  return 2 * Math.PI * Math.sqrt(L / g);
}

/**
 * Calculate spring force (Hooke's Law)
 * 计算弹簧力（胡克定律）
 * 
 * @param k - Spring constant (N/m)
 * @param x - Displacement (m)
 * @returns Spring force (N)
 */
export function springForce(k: number, x: number): number {
  return -k * x;
}

/**
 * Update particle position using Verlet integration
 * 使用 Verlet 积分更新粒子位置
 * 
 * @param position - Current position
 * @param previousPosition - Previous position
 * @param acceleration - Current acceleration
 * @param dt - Time step
 * @returns New position
 */
export function verletIntegration(
  position: THREE.Vector3,
  previousPosition: THREE.Vector3,
  acceleration: THREE.Vector3,
  dt: number
): THREE.Vector3 {
  const newPosition = position
    .clone()
    .multiplyScalar(2)
    .sub(previousPosition)
    .add(acceleration.clone().multiplyScalar(dt * dt));
  
  return newPosition;
}
