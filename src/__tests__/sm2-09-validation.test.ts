// SM2.09 Inequalities Module - Validation Tests

import {
    parseInterval,
    parseSetBuilder,
    parseInequalityNotation,
    intervalsEqual,
    intervalArraysEqual,
    validateSolution,
    getValidationFeedback
} from '../lib/sm2-09-validation';
import { Interval } from '../lib/sm2-09-types';

describe('parseInterval', () => {
    it('should parse basic interval notation', () => {
        const result = parseInterval('(-∞, 5]') as Interval;
        expect(result.start).toBe(-Infinity);
        expect(result.end).toBe(5);
        expect(result.startInclusive).toBe(false);
        expect(result.endInclusive).toBe(true);
    });

    it('should parse interval with different infinity notation', () => {
        const result = parseInterval('(-infinity, 5]') as Interval;
        expect(result.start).toBe(-Infinity);
        expect(result.end).toBe(5);
    });

    it('should parse interval without spaces', () => {
        const result = parseInterval('[2,10)') as Interval;
        expect(result.start).toBe(2);
        expect(result.end).toBe(10);
        expect(result.startInclusive).toBe(true);
        expect(result.endInclusive).toBe(false);
    });

    it('should parse interval with spaces', () => {
        const result = parseInterval('[ 2 , 10 )') as Interval;
        expect(result.start).toBe(2);
        expect(result.end).toBe(10);
    });

    it('should parse union of intervals', () => {
        const result = parseInterval('(-∞, -3] ∪ [3, ∞)') as Interval[];
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(2);
        expect(result[0].start).toBe(-Infinity);
        expect(result[0].end).toBe(-3);
        expect(result[1].start).toBe(3);
        expect(result[1].end).toBe(Infinity);
    });

    it('should parse negative numbers', () => {
        const result = parseInterval('[-5, -2)') as Interval;
        expect(result.start).toBe(-5);
        expect(result.end).toBe(-2);
    });

    it('should parse decimal numbers', () => {
        const result = parseInterval('(2.5, 7.8]') as Interval;
        expect(result.start).toBe(2.5);
        expect(result.end).toBe(7.8);
    });
});

describe('parseSetBuilder', () => {
    it('should parse simple set-builder notation', () => {
        const result = parseSetBuilder('{x | x < 5}') as Interval;
        expect(result.start).toBe(-Infinity);
        expect(result.end).toBe(5);
        expect(result.endInclusive).toBe(false);
    });

    it('should parse set-builder with ≤', () => {
        const result = parseSetBuilder('{x | x ≤ 3}') as Interval;
        expect(result.end).toBe(3);
        expect(result.endInclusive).toBe(true);
    });

    it('should parse set-builder with compound condition', () => {
        const result = parseSetBuilder('{x | 2 < x and x < 10}') as Interval;
        expect(result.start).toBe(2);
        expect(result.end).toBe(10);
        expect(result.startInclusive).toBe(false);
        expect(result.endInclusive).toBe(false);
    });

    it('should parse set-builder with disjunction', () => {
        const result = parseSetBuilder('{x | x < -3 or x > 3}') as Interval[];
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(2);
    });
});

describe('parseInequalityNotation', () => {
    it('should parse simple inequality', () => {
        const result = parseInequalityNotation('x < 5') as Interval;
        expect(result.start).toBe(-Infinity);
        expect(result.end).toBe(5);
        expect(result.endInclusive).toBe(false);
    });

    it('should parse compound inequality', () => {
        const result = parseInequalityNotation('2 < x < 10') as Interval;
        expect(result.start).toBe(2);
        expect(result.end).toBe(10);
        expect(result.startInclusive).toBe(false);
        expect(result.endInclusive).toBe(false);
    });

    it('should parse compound inequality with ≤', () => {
        const result = parseInequalityNotation('-1 ≤ x ≤ 3') as Interval;
        expect(result.start).toBe(-1);
        expect(result.end).toBe(3);
        expect(result.startInclusive).toBe(true);
        expect(result.endInclusive).toBe(true);
    });

    it('should parse disjunction', () => {
        const result = parseInequalityNotation('x < 2 or x > 5') as Interval[];
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(2);
    });

    it('should parse conjunction', () => {
        const result = parseInequalityNotation('x > 2 and x < 5') as Interval;
        expect(result.start).toBe(2);
        expect(result.end).toBe(5);
    });
});

describe('intervalsEqual', () => {
    it('should return true for identical intervals', () => {
        const a: Interval = { start: 2, end: 5, startInclusive: false, endInclusive: true };
        const b: Interval = { start: 2, end: 5, startInclusive: false, endInclusive: true };
        expect(intervalsEqual(a, b)).toBe(true);
    });

    it('should return false for different bounds', () => {
        const a: Interval = { start: 2, end: 5, startInclusive: false, endInclusive: true };
        const b: Interval = { start: 2, end: 6, startInclusive: false, endInclusive: true };
        expect(intervalsEqual(a, b)).toBe(false);
    });

    it('should return false for different inclusivity', () => {
        const a: Interval = { start: 2, end: 5, startInclusive: false, endInclusive: true };
        const b: Interval = { start: 2, end: 5, startInclusive: true, endInclusive: true };
        expect(intervalsEqual(a, b)).toBe(false);
    });

    it('should handle infinity', () => {
        const a: Interval = { start: -Infinity, end: 5, startInclusive: false, endInclusive: true };
        const b: Interval = { start: -Infinity, end: 5, startInclusive: false, endInclusive: true };
        expect(intervalsEqual(a, b)).toBe(true);
    });
});

describe('intervalArraysEqual', () => {
    it('should return true for identical single intervals', () => {
        const a: Interval = { start: 2, end: 5, startInclusive: false, endInclusive: true };
        const b: Interval = { start: 2, end: 5, startInclusive: false, endInclusive: true };
        expect(intervalArraysEqual(a, b)).toBe(true);
    });

    it('should return true for identical interval arrays', () => {
        const a: Interval[] = [
            { start: -Infinity, end: -3, startInclusive: false, endInclusive: true },
            { start: 3, end: Infinity, startInclusive: true, endInclusive: false }
        ];
        const b: Interval[] = [
            { start: -Infinity, end: -3, startInclusive: false, endInclusive: true },
            { start: 3, end: Infinity, startInclusive: true, endInclusive: false }
        ];
        expect(intervalArraysEqual(a, b)).toBe(true);
    });

    it('should return true for interval arrays in different order', () => {
        const a: Interval[] = [
            { start: 3, end: Infinity, startInclusive: true, endInclusive: false },
            { start: -Infinity, end: -3, startInclusive: false, endInclusive: true }
        ];
        const b: Interval[] = [
            { start: -Infinity, end: -3, startInclusive: false, endInclusive: true },
            { start: 3, end: Infinity, startInclusive: true, endInclusive: false }
        ];
        expect(intervalArraysEqual(a, b)).toBe(true);
    });

    it('should return false for different length arrays', () => {
        const a: Interval[] = [
            { start: -Infinity, end: -3, startInclusive: false, endInclusive: true }
        ];
        const b: Interval[] = [
            { start: -Infinity, end: -3, startInclusive: false, endInclusive: true },
            { start: 3, end: Infinity, startInclusive: true, endInclusive: false }
        ];
        expect(intervalArraysEqual(a, b)).toBe(false);
    });
});

describe('validateSolution', () => {
    it('should accept correct interval notation', () => {
        const expected: Interval = { start: -Infinity, end: 4, startInclusive: false, endInclusive: false };
        expect(validateSolution('(-∞, 4)', expected)).toBe(true);
    });

    it('should accept equivalent notation with different spacing', () => {
        const expected: Interval = { start: 2, end: 10, startInclusive: true, endInclusive: false };
        expect(validateSolution('[2,10)', expected)).toBe(true);
        expect(validateSolution('[ 2 , 10 )', expected)).toBe(true);
    });

    it('should accept set-builder notation', () => {
        const expected: Interval = { start: -Infinity, end: 5, startInclusive: false, endInclusive: false };
        expect(validateSolution('{x | x < 5}', expected)).toBe(true);
    });

    it('should accept inequality notation', () => {
        const expected: Interval = { start: 2, end: 10, startInclusive: false, endInclusive: false };
        expect(validateSolution('2 < x < 10', expected)).toBe(true);
        expect(validateSolution('x > 2 and x < 10', expected)).toBe(true);
    });

    it('should accept union notation', () => {
        const expected: Interval[] = [
            { start: -Infinity, end: -3, startInclusive: false, endInclusive: true },
            { start: 3, end: Infinity, startInclusive: true, endInclusive: false }
        ];
        expect(validateSolution('(-∞, -3] ∪ [3, ∞)', expected)).toBe(true);
    });

    it('should reject incorrect bounds', () => {
        const expected: Interval = { start: -Infinity, end: 4, startInclusive: false, endInclusive: false };
        expect(validateSolution('(-∞, 5)', expected)).toBe(false);
    });

    it('should reject incorrect inclusivity', () => {
        const expected: Interval = { start: -Infinity, end: 4, startInclusive: false, endInclusive: false };
        expect(validateSolution('(-∞, 4]', expected)).toBe(false);
    });

    it('should handle empty set', () => {
        const expected: Interval = { start: 5, end: 3, startInclusive: false, endInclusive: false };
        expect(validateSolution('∅', expected)).toBe(true);
        expect(validateSolution('empty', expected)).toBe(true);
    });
});

describe('getValidationFeedback', () => {
    it('should provide feedback for empty input', () => {
        const expected: Interval = { start: -Infinity, end: 4, startInclusive: false, endInclusive: false };
        const feedback = getValidationFeedback('', expected);
        expect(feedback).toContain('enter a solution');
    });

    it('should provide feedback for invalid format', () => {
        const expected: Interval = { start: -Infinity, end: 4, startInclusive: false, endInclusive: false };
        const feedback = getValidationFeedback('invalid', expected);
        expect(feedback).toContain('Invalid format');
    });

    it('should provide feedback for wrong bound', () => {
        const expected: Interval = { start: -Infinity, end: 4, startInclusive: false, endInclusive: false };
        const feedback = getValidationFeedback('(-∞, 5)', expected);
        expect(feedback).toContain('bound');
    });

    it('should provide feedback for wrong inclusivity', () => {
        const expected: Interval = { start: -Infinity, end: 4, startInclusive: false, endInclusive: false };
        const feedback = getValidationFeedback('(-∞, 4]', expected);
        expect(feedback).toContain('included');
    });

    it('should provide feedback for union mismatch', () => {
        const expected: Interval[] = [
            { start: -Infinity, end: -3, startInclusive: false, endInclusive: true },
            { start: 3, end: Infinity, startInclusive: true, endInclusive: false }
        ];
        const feedback = getValidationFeedback('(-∞, 4)', expected);
        expect(feedback).toContain('union');
    });
});
