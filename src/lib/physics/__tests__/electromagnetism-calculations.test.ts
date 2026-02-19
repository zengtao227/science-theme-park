/**
 * Tests for electromagnetic calculation functions
 */

import { calculateElectricField, calculateElectricForce } from '../electricField';
import { calculateMagneticFieldStraightWire, calculateMagneticFieldCircularLoop, calculateMagneticForce } from '../magneticField';
import { calculateAcceleration, calculateCircularRadius, calculateVelocitySelector } from '../particleMotion';
import { k, mu0, e, me } from '../constants';

describe('Physical Constants', () => {
  test('Coulomb constant k should be 8.99e9', () => {
    expect(k).toBeCloseTo(8.99e9, -6);
  });

  test('Permeability mu0 should be 4π×10⁻⁷', () => {
    expect(mu0).toBeCloseTo(4 * Math.PI * 1e-7, -10);
  });

  test('Elementary charge e should be 1.60e-19', () => {
    expect(e).toBeCloseTo(1.60e-19, -22);
  });

  test('Electron mass me should be 9.11e-31', () => {
    expect(me).toBeCloseTo(9.11e-31, -34);
  });
});

describe('Electric Field Calculations', () => {
  test('calculateElectricField with Q=1μC, r=1m should give ~9000 N/C', () => {
    const field = calculateElectricField(1e-6, 1);
    expect(field).toBeCloseTo(8990, -2);
  });

  test('calculateElectricField with Q=2μC, r=2m should give ~4495 N/C', () => {
    const field = calculateElectricField(2e-6, 2);
    expect(field).toBeCloseTo(4495, -2);
  });

  test('calculateElectricForce with q=1.6e-19C, E=1000 N/C should give 1.6e-16 N', () => {
    const force = calculateElectricForce(1.6e-19, 1000);
    expect(force).toBeCloseTo(1.6e-16, -19);
  });
});

describe('Magnetic Field Calculations', () => {
  test('calculateMagneticFieldStraightWire with I=10A, r=0.1m should give 2e-5 T', () => {
    const field = calculateMagneticFieldStraightWire(10, 0.1);
    expect(field).toBeCloseTo(2e-5, -8);
  });

  test('calculateMagneticFieldCircularLoop with I=10A, R=0.1m should give ~6.28e-5 T', () => {
    const field = calculateMagneticFieldCircularLoop(10, 0.1);
    expect(field).toBeCloseTo(6.28e-5, -8);
  });

  test('calculateMagneticForce with B=0.1T, I=10A, L=1m, θ=90° should give 1 N', () => {
    const force = calculateMagneticForce(0.1, 10, 1, Math.PI / 2);
    expect(force).toBeCloseTo(1, 2);
  });
});

describe('Particle Motion Calculations', () => {
  test('calculateAcceleration for electron in 1000 N/C field', () => {
    const acc = calculateAcceleration(e, me, 1000);
    expect(acc).toBeCloseTo(1.756e14, -11);
  });

  test('calculateCircularRadius for electron at 1e6 m/s in 0.1T field', () => {
    const radius = calculateCircularRadius(me, 1e6, e, 0.1);
    expect(radius).toBeCloseTo(5.69e-5, -8);
  });

  test('calculateVelocitySelector with E=1000 N/C, B=0.01T should give 1e5 m/s', () => {
    const velocity = calculateVelocitySelector(1000, 0.01);
    expect(velocity).toBeCloseTo(1e5, -2);
  });
});
