// SM2.09 Inequalities Module - Solver Tests

import {
    solveLinearInequality,
    solveAbsoluteValueInequality,
    solveSystemOfInequalities,
    satisfiesInequality
} from '@/lib/sm2-09-solvers';

describe('SM2.09 Inequality Solvers', () => {
    describe('Linear Inequality Solver', () => {
        test('solves simple addition inequality: x + 3 < 7', () => {
            const result = solveLinearInequality('x + 3 < 7');
            expect(result.solutionType).toBe('INTERVAL');
            expect(result.solution.end).toBe(4);
            expect(result.solution.endInclusive).toBe(false);
            expect(result.steps.length).toBeGreaterThan(0);
        });

        test('solves simple multiplication inequality: 2x ≥ 10', () => {
            const result = solveLinearInequality('2x ≥ 10');
            expect(result.solutionType).toBe('INTERVAL');
            expect(result.solution.start).toBe(5);
            expect(result.solution.startInclusive).toBe(true);
        });

        test('solves inequality with negative coefficient: -x ≤ 4', () => {
            const result = solveLinearInequality('-x ≤ 4');
            expect(result.solutionType).toBe('INTERVAL');
            expect(result.solution.start).toBe(-4);
            expect(result.solution.startInclusive).toBe(true);
            
            // Check that inequality reversal is marked
            const reversalStep = result.steps.find(step => step.reversesInequality);
            expect(reversalStep).toBeDefined();
        });

        test('solves two-step inequality: 2x + 3 < 11', () => {
            const result = solveLinearInequality('2x + 3 < 11');
            expect(result.solutionType).toBe('INTERVAL');
            expect(result.solution.end).toBe(4);
            expect(result.solution.endInclusive).toBe(false);
        });

        test('solves inequality with negative coefficient: -2x + 5 ≤ 1', () => {
            const result = solveLinearInequality('-2x + 5 ≤ 1');
            expect(result.solutionType).toBe('INTERVAL');
            expect(result.solution.start).toBe(2);
            expect(result.solution.startInclusive).toBe(true);
            
            // Verify reversal is marked
            const reversalStep = result.steps.find(step => step.reversesInequality);
            expect(reversalStep).toBeDefined();
        });
    });

    describe('Absolute Value Inequality Solver', () => {
        test('solves |x| < 3', () => {
            const result = solveAbsoluteValueInequality('|x| < 3');
            expect(result.solutionType).toBe('INTERVAL');
            expect(Array.isArray(result.solution)).toBe(false);
            
            const solution = result.solution as any;
            expect(solution.start).toBe(-3);
            expect(solution.end).toBe(3);
            expect(solution.startInclusive).toBe(false);
            expect(solution.endInclusive).toBe(false);
        });

        test('solves |x| ≥ 2 (two intervals)', () => {
            const result = solveAbsoluteValueInequality('|x| ≥ 2');
            expect(result.solutionType).toBe('INTERVAL');
            expect(Array.isArray(result.solution)).toBe(true);
            
            const solutions = result.solution as any[];
            expect(solutions).toHaveLength(2);
            expect(solutions[0].end).toBe(-2);
            expect(solutions[1].start).toBe(2);
        });

        test('solves |x - 2| < 4', () => {
            const result = solveAbsoluteValueInequality('|x - 2| < 4');
            expect(result.solutionType).toBe('INTERVAL');
            
            const solution = result.solution as any;
            expect(solution.start).toBe(-2);
            expect(solution.end).toBe(6);
        });

        test('solves |x + 3| ≥ 5 (two intervals)', () => {
            const result = solveAbsoluteValueInequality('|x + 3| ≥ 5');
            expect(result.solutionType).toBe('INTERVAL');
            expect(Array.isArray(result.solution)).toBe(true);
            
            const solutions = result.solution as any[];
            expect(solutions).toHaveLength(2);
            expect(solutions[0].end).toBe(-8);
            expect(solutions[1].start).toBe(2);
        });

        test('detects no solution for |x| < -2', () => {
            const result = solveAbsoluteValueInequality('|x| < -2');
            expect(result.solutionType).toBe('EMPTY');
        });
    });

    describe('System of Inequalities Solver', () => {
        test('solves system: x > 2 AND x < 5', () => {
            const result = solveSystemOfInequalities(['x > 2', 'x < 5']);
            expect(result.solutionType).toBe('INTERVAL');
            expect(result.solution).not.toBeNull();
            
            if (result.solution) {
                expect(result.solution.start).toBe(2);
                expect(result.solution.end).toBe(5);
                expect(result.solution.startInclusive).toBe(false);
                expect(result.solution.endInclusive).toBe(false);
            }
        });

        test('solves system: x ≥ -1 AND x ≤ 3', () => {
            const result = solveSystemOfInequalities(['x ≥ -1', 'x ≤ 3']);
            expect(result.solutionType).toBe('INTERVAL');
            expect(result.solution).not.toBeNull();
            
            if (result.solution) {
                expect(result.solution.start).toBe(-1);
                expect(result.solution.end).toBe(3);
                expect(result.solution.startInclusive).toBe(true);
                expect(result.solution.endInclusive).toBe(true);
            }
        });

        test('detects empty solution: x > 5 AND x < 3', () => {
            const result = solveSystemOfInequalities(['x > 5', 'x < 3']);
            expect(result.solutionType).toBe('EMPTY');
            expect(result.solution).toBeNull();
        });

        test('solves compound inequality: 2x - 3 < 5 AND 3x + 1 > -8', () => {
            const result = solveSystemOfInequalities(['2x - 3 < 5', '3x + 1 > -8']);
            expect(result.solutionType).toBe('INTERVAL');
            expect(result.solution).not.toBeNull();
            
            if (result.solution) {
                expect(result.solution.start).toBeCloseTo(-3, 5);
                expect(result.solution.end).toBe(4);
            }
        });
    });

    describe('Inequality Satisfaction Helper', () => {
        test('checks if point satisfies y > x + 1', () => {
            expect(satisfiesInequality(0, 2, 'y > x + 1')).toBe(true);
            expect(satisfiesInequality(0, 1, 'y > x + 1')).toBe(false);
            expect(satisfiesInequality(0, 0, 'y > x + 1')).toBe(false);
        });

        test('checks if point satisfies y ≤ 2x - 1', () => {
            expect(satisfiesInequality(2, 3, 'y ≤ 2x - 1')).toBe(true);
            expect(satisfiesInequality(2, 4, 'y ≤ 2x - 1')).toBe(false);
        });
    });
});
