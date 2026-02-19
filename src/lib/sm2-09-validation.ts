// SM2.09 Inequalities Module - Answer Validation System

import { Interval } from "./sm2-09-types";

/**
 * Parse interval notation into an Interval object
 * Supports formats like:
 * - "(-∞, 5]" or "(-infinity, 5]"
 * - "[2, 10)" or "[2,10)"
 * - "(-∞, -3] ∪ [3, ∞)" (union of intervals)
 * - "(2, 5]" with various spacing
 */
export function parseInterval(notation: string): Interval | Interval[] {
    // Remove all whitespace for easier parsing
    const cleaned = notation.trim().replace(/\s+/g, '');
    
    // Check for union (∪ or U or 'union')
    const unionSymbols = ['∪', 'U', 'union'];
    let hasUnion = false;
    let unionSymbol = '';
    
    for (const symbol of unionSymbols) {
        if (cleaned.includes(symbol)) {
            hasUnion = true;
            unionSymbol = symbol;
            break;
        }
    }
    
    if (hasUnion) {
        // Split by union symbol and parse each interval
        const parts = cleaned.split(unionSymbol);
        return parts.map(part => parseSingleInterval(part.trim()));
    }
    
    return parseSingleInterval(cleaned);
}

/**
 * Parse a single interval notation like "(-∞, 5]" or "[2, 10)"
 */
function parseSingleInterval(notation: string): Interval {
    // Extract brackets
    const startBracket = notation[0];
    const endBracket = notation[notation.length - 1];
    
    if (!['(', '['].includes(startBracket) || ![')', ']'].includes(endBracket)) {
        throw new Error(`Invalid interval notation: ${notation}`);
    }
    
    // Remove brackets
    const content = notation.substring(1, notation.length - 1);
    
    // Split by comma
    const parts = content.split(',');
    if (parts.length !== 2) {
        throw new Error(`Invalid interval notation: ${notation}`);
    }
    
    const startStr = parts[0].trim();
    const endStr = parts[1].trim();
    
    // Parse start value
    let start: number;
    if (startStr === '-∞' || startStr === '-infinity' || startStr === '-Infinity') {
        start = -Infinity;
    } else {
        start = parseFloat(startStr);
        if (isNaN(start)) {
            throw new Error(`Invalid start value: ${startStr}`);
        }
    }
    
    // Parse end value
    let end: number;
    if (endStr === '∞' || endStr === 'infinity' || endStr === 'Infinity') {
        end = Infinity;
    } else {
        end = parseFloat(endStr);
        if (isNaN(end)) {
            throw new Error(`Invalid end value: ${endStr}`);
        }
    }
    
    return {
        start,
        end,
        startInclusive: startBracket === '[',
        endInclusive: endBracket === ']'
    };
}

/**
 * Parse set-builder notation like "{x | x < 5}" or "{x | 2 < x < 10}"
 */
export function parseSetBuilder(notation: string): Interval | Interval[] {
    // Remove whitespace
    const cleaned = notation.trim();
    
    // Extract content between braces
    const match = cleaned.match(/\{[^|]+\|([^}]+)\}/);
    if (!match) {
        throw new Error(`Invalid set-builder notation: ${notation}`);
    }
    
    const condition = match[1].trim();
    
    // Check for "or" (disjunction)
    if (condition.includes(' or ') || condition.includes(' OR ')) {
        const parts = condition.split(/ or | OR /);
        return parts.map(part => parseConditionToInterval(part.trim()));
    }
    
    // Check for "and" (conjunction)
    if (condition.includes(' and ') || condition.includes(' AND ')) {
        const parts = condition.split(/ and | AND /);
        return parseCompoundCondition(parts);
    }
    
    return parseConditionToInterval(condition);
}

/**
 * Parse a condition like "x < 5" or "x ≥ 2" into an Interval
 */
function parseConditionToInterval(condition: string): Interval {
    const cleaned = condition.trim();
    
    // Match patterns like "x < 5", "x ≥ 2", "2 < x", etc.
    const patterns = [
        /x\s*<\s*([+-]?\d+\.?\d*)/,   // x < 5
        /x\s*>\s*([+-]?\d+\.?\d*)/,   // x > 2
        /x\s*≤\s*([+-]?\d+\.?\d*)/,   // x ≤ 5
        /x\s*≥\s*([+-]?\d+\.?\d*)/,   // x ≥ 2
        /([+-]?\d+\.?\d*)\s*<\s*x/,   // 2 < x
        /([+-]?\d+\.?\d*)\s*>\s*x/,   // 5 > x
        /([+-]?\d+\.?\d*)\s*≤\s*x/,   // 2 ≤ x
        /([+-]?\d+\.?\d*)\s*≥\s*x/    // 5 ≥ x
    ];
    
    // Try x < value or x ≤ value
    let match = cleaned.match(/x\s*(<|≤)\s*([+-]?\d+\.?\d*)/);
    if (match) {
        const operator = match[1];
        const value = parseFloat(match[2]);
        return {
            start: -Infinity,
            end: value,
            startInclusive: false,
            endInclusive: operator === '≤'
        };
    }
    
    // Try x > value or x ≥ value
    match = cleaned.match(/x\s*(>|≥)\s*([+-]?\d+\.?\d*)/);
    if (match) {
        const operator = match[1];
        const value = parseFloat(match[2]);
        return {
            start: value,
            end: Infinity,
            startInclusive: operator === '≥',
            endInclusive: false
        };
    }
    
    // Try value < x or value ≤ x
    match = cleaned.match(/([+-]?\d+\.?\d*)\s*(<|≤)\s*x/);
    if (match) {
        const value = parseFloat(match[1]);
        const operator = match[2];
        return {
            start: value,
            end: Infinity,
            startInclusive: operator === '≤',
            endInclusive: false
        };
    }
    
    // Try value > x or value ≥ x
    match = cleaned.match(/([+-]?\d+\.?\d*)\s*(>|≥)\s*x/);
    if (match) {
        const value = parseFloat(match[1]);
        const operator = match[2];
        return {
            start: -Infinity,
            end: value,
            startInclusive: false,
            endInclusive: operator === '≥'
        };
    }
    
    throw new Error(`Unable to parse condition: ${condition}`);
}

/**
 * Parse compound condition like ["2 < x", "x < 10"] into a single Interval
 */
function parseCompoundCondition(conditions: string[]): Interval {
    const intervals = conditions.map(c => parseConditionToInterval(c));
    
    // Find intersection
    let start = -Infinity;
    let end = Infinity;
    let startInclusive = false;
    let endInclusive = false;
    
    for (const interval of intervals) {
        if (interval.start > start) {
            start = interval.start;
            startInclusive = interval.startInclusive;
        } else if (interval.start === start) {
            startInclusive = startInclusive && interval.startInclusive;
        }
        
        if (interval.end < end) {
            end = interval.end;
            endInclusive = interval.endInclusive;
        } else if (interval.end === end) {
            endInclusive = endInclusive && interval.endInclusive;
        }
    }
    
    return { start, end, startInclusive, endInclusive };
}

/**
 * Parse inequality notation like "x < 5" or "2 < x < 10"
 */
export function parseInequalityNotation(notation: string): Interval | Interval[] {
    const cleaned = notation.trim();
    
    // Check for compound inequality like "2 < x < 10"
    const compoundMatch = cleaned.match(/([+-]?\d+\.?\d*)\s*(<|≤)\s*x\s*(<|≤)\s*([+-]?\d+\.?\d*)/);
    if (compoundMatch) {
        const start = parseFloat(compoundMatch[1]);
        const startOp = compoundMatch[2];
        const endOp = compoundMatch[3];
        const end = parseFloat(compoundMatch[4]);
        
        return {
            start,
            end,
            startInclusive: startOp === '≤',
            endInclusive: endOp === '≤'
        };
    }
    
    // Check for disjunction like "x < 2 or x > 5"
    if (cleaned.includes(' or ') || cleaned.includes(' OR ')) {
        const parts = cleaned.split(/ or | OR /);
        return parts.map(part => parseConditionToInterval(part.trim()));
    }
    
    // Check for conjunction like "x > 2 and x < 5"
    if (cleaned.includes(' and ') || cleaned.includes(' AND ')) {
        const parts = cleaned.split(/ and | AND /);
        return parseCompoundCondition(parts);
    }
    
    // Single inequality
    return parseConditionToInterval(cleaned);
}

/**
 * Check if two intervals are equivalent
 */
export function intervalsEqual(a: Interval, b: Interval, tolerance: number = 1e-10): boolean {
    // Handle infinity cases
    const startEqual = (a.start === b.start) || 
                      (Math.abs(a.start as number - (b.start as number)) < tolerance);
    const endEqual = (a.end === b.end) || 
                    (Math.abs(a.end as number - (b.end as number)) < tolerance);
    
    return startEqual && 
           endEqual && 
           a.startInclusive === b.startInclusive && 
           a.endInclusive === b.endInclusive;
}

/**
 * Check if two interval arrays (unions) are equivalent
 */
export function intervalArraysEqual(
    a: Interval | Interval[], 
    b: Interval | Interval[], 
    tolerance: number = 1e-10
): boolean {
    // Normalize to arrays
    const arrA = Array.isArray(a) ? a : [a];
    const arrB = Array.isArray(b) ? b : [b];
    
    if (arrA.length !== arrB.length) {
        return false;
    }
    
    // Sort intervals by start value for comparison
    const sortedA = [...arrA].sort((x, y) => (x.start as number) - (y.start as number));
    const sortedB = [...arrB].sort((x, y) => (x.start as number) - (y.start as number));
    
    // Compare each interval
    for (let i = 0; i < sortedA.length; i++) {
        if (!intervalsEqual(sortedA[i], sortedB[i], tolerance)) {
            return false;
        }
    }
    
    return true;
}

/**
 * Validate a submitted answer against the expected solution
 * Accepts multiple formats: interval notation, set-builder notation, inequality notation
 */
export function validateSolution(
    submitted: string, 
    expected: Interval | Interval[]
): boolean {
    try {
        let parsedSubmitted: Interval | Interval[];
        
        // Try to detect format and parse accordingly
        const cleaned = submitted.trim();
        
        // Check for interval notation (starts with ( or [)
        if (cleaned.startsWith('(') || cleaned.startsWith('[')) {
            parsedSubmitted = parseInterval(cleaned);
        }
        // Check for set-builder notation (starts with {)
        else if (cleaned.startsWith('{')) {
            parsedSubmitted = parseSetBuilder(cleaned);
        }
        // Check for empty set
        else if (cleaned === '∅' || cleaned === 'empty' || cleaned === '{}') {
            // Empty set should match an interval with start > end
            const expectedArr = Array.isArray(expected) ? expected : [expected];
            return expectedArr.length === 0 || 
                   (expectedArr.length === 1 && expectedArr[0].start > expectedArr[0].end);
        }
        // Check for all reals
        else if (cleaned === 'ℝ' || cleaned === 'R' || cleaned === 'all reals') {
            const expectedArr = Array.isArray(expected) ? expected : [expected];
            return expectedArr.length === 1 && 
                   expectedArr[0].start === -Infinity && 
                   expectedArr[0].end === Infinity;
        }
        // Otherwise assume inequality notation
        else {
            parsedSubmitted = parseInequalityNotation(cleaned);
        }
        
        // Compare parsed submitted with expected
        return intervalArraysEqual(parsedSubmitted, expected);
        
    } catch (error) {
        console.error('Error validating solution:', error);
        return false;
    }
}

/**
 * Get specific error feedback for incorrect answers
 */
export function getValidationFeedback(
    submitted: string,
    expected: Interval | Interval[]
): string {
    try {
        const cleaned = submitted.trim();
        
        // Check for empty input
        if (!cleaned) {
            return "Please enter a solution.";
        }
        
        // Try to parse the submitted answer
        let parsedSubmitted: Interval | Interval[];
        
        try {
            if (cleaned.startsWith('(') || cleaned.startsWith('[')) {
                parsedSubmitted = parseInterval(cleaned);
            } else if (cleaned.startsWith('{')) {
                parsedSubmitted = parseSetBuilder(cleaned);
            } else if (cleaned === '∅' || cleaned === 'empty' || cleaned === '{}') {
                return "Your answer indicates no solution. Please check if the inequality has a solution.";
            } else if (cleaned === 'ℝ' || cleaned === 'R' || cleaned === 'all reals') {
                return "Your answer indicates all real numbers. Please check the inequality constraints.";
            } else {
                parsedSubmitted = parseInequalityNotation(cleaned);
            }
        } catch (parseError) {
            return "Invalid format. Please use interval notation like (-∞, 5] or [2, 10).";
        }
        
        // Compare with expected
        const expectedArr = Array.isArray(expected) ? expected : [expected];
        const submittedArr = Array.isArray(parsedSubmitted) ? parsedSubmitted : [parsedSubmitted];
        
        // Check if number of intervals matches
        if (submittedArr.length !== expectedArr.length) {
            if (expectedArr.length > 1) {
                return "The solution should be a union of multiple intervals.";
            } else {
                return "The solution should be a single interval, not a union.";
            }
        }
        
        // Check boundary values
        const submitted0 = submittedArr[0];
        const expected0 = expectedArr[0];
        
        if (Math.abs((submitted0.start as number) - (expected0.start as number)) > 1e-6) {
            return "Check the lower bound of your interval.";
        }
        
        if (Math.abs((submitted0.end as number) - (expected0.end as number)) > 1e-6) {
            return "Check the upper bound of your interval.";
        }
        
        if (submitted0.startInclusive !== expected0.startInclusive) {
            return "Check whether the lower bound should be included (use [ or ().";
        }
        
        if (submitted0.endInclusive !== expected0.endInclusive) {
            return "Check whether the upper bound should be included (use ] or ).";
        }
        
        return "Your answer is incorrect. Please review the solution steps.";
        
    } catch (error) {
        return "Unable to validate your answer. Please check the format.";
    }
}
