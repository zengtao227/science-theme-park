// SM2.09 Inequalities Module - Solving Algorithms

import { Interval, SolutionStep, SolutionType } from "./sm2-09-types";

/**
 * Represents a parsed linear inequality in the form: ax + b [op] c
 * where [op] is one of: <, >, ≤, ≥
 */
interface ParsedLinearInequality {
    coefficient: number;  // a
    constant: number;     // b
    rightSide: number;    // c
    operator: '<' | '>' | '≤' | '≥';
    variable: string;
}

/**
 * Parse a linear inequality expression like "2x + 3 < 11" or "-x ≤ 4"
 */
function parseLinearInequality(expression: string): ParsedLinearInequality {
    // Remove spaces
    const expr = expression.replace(/\s+/g, '');
    
    // Find the operator
    let operator: '<' | '>' | '≤' | '≥';
    let operatorIndex: number;
    
    if (expr.includes('≤')) {
        operator = '≤';
        operatorIndex = expr.indexOf('≤');
    } else if (expr.includes('≥')) {
        operator = '≥';
        operatorIndex = expr.indexOf('≥');
    } else if (expr.includes('<')) {
        operator = '<';
        operatorIndex = expr.indexOf('<');
    } else if (expr.includes('>')) {
        operator = '>';
        operatorIndex = expr.indexOf('>');
    } else {
        throw new Error(`No inequality operator found in: ${expression}`);
    }
    
    // Split into left and right sides
    const leftSide = expr.substring(0, operatorIndex);
    const rightSide = parseFloat(expr.substring(operatorIndex + 1));
    
    // Parse left side (ax + b format)
    // Handle cases like: "2x+3", "-x", "x-5", "x/2+1"
    const variable = 'x'; // Default variable
    
    // Extract coefficient and constant from left side
    let coefficient = 0;
    let constant = 0;
    
    // Match patterns like: 2x, -x, x, x/2
    const coeffMatch = leftSide.match(/([+-]?\d*\.?\d*)\*?x/);
    if (coeffMatch) {
        const coeffStr = coeffMatch[1];
        if (coeffStr === '' || coeffStr === '+') {
            coefficient = 1;
        } else if (coeffStr === '-') {
            coefficient = -1;
        } else {
            coefficient = parseFloat(coeffStr);
        }
    }
    
    // Check for division (like x/2)
    const divMatch = leftSide.match(/x\/(\d+\.?\d*)/);
    if (divMatch) {
        coefficient = coefficient / parseFloat(divMatch[1]);
    }
    
    // Extract constant term
    const constMatch = leftSide.match(/([+-]\d+\.?\d*)(?!.*x)/);
    if (constMatch) {
        constant = parseFloat(constMatch[1]);
    }
    
    return {
        coefficient,
        constant,
        rightSide,
        operator,
        variable
    };
}

/**
 * Solve a linear inequality and generate step-by-step solution
 * Handles inequalities in the form: ax + b [op] c
 */
export function solveLinearInequality(expression: string): {
    solution: Interval;
    solutionType: SolutionType;
    steps: SolutionStep[];
} {
    const parsed = parseLinearInequality(expression);
    const steps: SolutionStep[] = [];
    let stepNumber = 1;
    
    let currentCoeff = parsed.coefficient;
    let currentConst = parsed.constant;
    let currentRight = parsed.rightSide;
    let currentOp = parsed.operator;
    
    // Step 1: Show original inequality
    steps.push({
        stepNumber: stepNumber++,
        expression: expression,
        expressionLatex: expressionToLatex(expression),
        justification: "Original inequality",
        reversesInequality: false
    });
    
    // Step 2: Subtract/add constant to isolate variable term
    if (currentConst !== 0) {
        currentRight = currentRight - currentConst;
        const operation = currentConst > 0 ? "Subtract" : "Add";
        const value = Math.abs(currentConst);
        
        const newExpr = `${currentCoeff}${parsed.variable} ${currentOp} ${currentRight}`;
        steps.push({
            stepNumber: stepNumber++,
            expression: newExpr,
            expressionLatex: expressionToLatex(newExpr),
            justification: `${operation} ${value} from both sides`,
            reversesInequality: false
        });
        
        currentConst = 0;
    }
    
    // Step 3: Divide by coefficient to solve for variable
    let solution: Interval;
    
    if (currentCoeff !== 1) {
        const reversesInequality = currentCoeff < 0;
        currentRight = currentRight / currentCoeff;
        
        if (reversesInequality) {
            // Reverse the inequality operator
            if (currentOp === '<') currentOp = '>';
            else if (currentOp === '>') currentOp = '<';
            else if (currentOp === '≤') currentOp = '≥';
            else if (currentOp === '≥') currentOp = '≤';
        }
        
        const newExpr = `${parsed.variable} ${currentOp} ${currentRight}`;
        steps.push({
            stepNumber: stepNumber++,
            expression: newExpr,
            expressionLatex: expressionToLatex(newExpr),
            justification: `Divide both sides by ${currentCoeff}${reversesInequality ? ' and reverse inequality' : ''}`,
            reversesInequality
        });
    }
    
    // Determine solution interval based on final operator
    if (currentOp === '<') {
        solution = {
            start: -Infinity,
            end: currentRight,
            startInclusive: false,
            endInclusive: false
        };
    } else if (currentOp === '>') {
        solution = {
            start: currentRight,
            end: Infinity,
            startInclusive: false,
            endInclusive: false
        };
    } else if (currentOp === '≤') {
        solution = {
            start: -Infinity,
            end: currentRight,
            startInclusive: false,
            endInclusive: true
        };
    } else { // ≥
        solution = {
            start: currentRight,
            end: Infinity,
            startInclusive: true,
            endInclusive: false
        };
    }
    
    // Add final solution step
    const intervalNotation = intervalToString(solution);
    steps.push({
        stepNumber: stepNumber++,
        expression: intervalNotation,
        expressionLatex: intervalToLatex(solution),
        justification: "Final solution in interval notation",
        reversesInequality: false
    });
    
    return {
        solution,
        solutionType: "INTERVAL",
        steps
    };
}

/**
 * Convert an expression to LaTeX format
 */
function expressionToLatex(expression: string): string {
    return expression
        .replace(/≤/g, '\\leq')
        .replace(/≥/g, '\\geq')
        .replace(/∞/g, '\\infty')
        .replace(/x/g, 'x');
}

/**
 * Convert an interval to string notation
 */
function intervalToString(interval: Interval): string {
    const start = interval.start === -Infinity ? '-∞' : interval.start;
    const end = interval.end === Infinity ? '∞' : interval.end;
    const startBracket = interval.startInclusive ? '[' : '(';
    const endBracket = interval.endInclusive ? ']' : ')';
    
    return `${startBracket}${start}, ${end}${endBracket}`;
}

/**
 * Convert an interval to LaTeX notation
 */
function intervalToLatex(interval: Interval): string {
    const start = interval.start === -Infinity ? '-\\infty' : interval.start;
    const end = interval.end === Infinity ? '\\infty' : interval.end;
    const startBracket = interval.startInclusive ? '[' : '(';
    const endBracket = interval.endInclusive ? ']' : ')';
    
    return `${startBracket}${start}, ${end}${endBracket}`;
}

/**
 * Parse an absolute value inequality like "|x - 2| < 4" or "|2x + 1| ≥ 3"
 */
interface ParsedAbsoluteValueInequality {
    innerExpression: string;  // The expression inside absolute value (e.g., "x - 2")
    innerCoefficient: number; // Coefficient of x in inner expression
    innerConstant: number;    // Constant in inner expression
    rightSide: number;        // Right side value
    operator: '<' | '>' | '≤' | '≥';
    variable: string;
}

function parseAbsoluteValueInequality(expression: string): ParsedAbsoluteValueInequality {
    // Remove spaces
    const expr = expression.replace(/\s+/g, '');
    
    // Find the operator
    let operator: '<' | '>' | '≤' | '≥';
    let operatorIndex: number;
    
    if (expr.includes('≤')) {
        operator = '≤';
        operatorIndex = expr.indexOf('≤');
    } else if (expr.includes('≥')) {
        operator = '≥';
        operatorIndex = expr.indexOf('≥');
    } else if (expr.includes('<')) {
        operator = '<';
        operatorIndex = expr.indexOf('<');
    } else if (expr.includes('>')) {
        operator = '>';
        operatorIndex = expr.indexOf('>');
    } else {
        throw new Error(`No inequality operator found in: ${expression}`);
    }
    
    // Extract the absolute value expression
    const leftSide = expr.substring(0, operatorIndex);
    const rightSide = parseFloat(expr.substring(operatorIndex + 1));
    
    // Extract inner expression from |...|
    const absMatch = leftSide.match(/\|([^|]+)\|/);
    if (!absMatch) {
        throw new Error(`No absolute value found in: ${expression}`);
    }
    
    const innerExpression = absMatch[1];
    const variable = 'x';
    
    // Parse inner expression (ax + b format)
    let innerCoefficient = 0;
    let innerConstant = 0;
    
    // Match coefficient
    const coeffMatch = innerExpression.match(/([+-]?\d*\.?\d*)\*?x/);
    if (coeffMatch) {
        const coeffStr = coeffMatch[1];
        if (coeffStr === '' || coeffStr === '+') {
            innerCoefficient = 1;
        } else if (coeffStr === '-') {
            innerCoefficient = -1;
        } else {
            innerCoefficient = parseFloat(coeffStr);
        }
    } else if (innerExpression === 'x') {
        innerCoefficient = 1;
    }
    
    // Match constant
    const constMatch = innerExpression.match(/([+-]\d+\.?\d*)(?!.*x)/);
    if (constMatch) {
        innerConstant = parseFloat(constMatch[1]);
    }
    
    return {
        innerExpression,
        innerCoefficient,
        innerConstant,
        rightSide,
        operator,
        variable
    };
}

/**
 * Solve an absolute value inequality and generate step-by-step solution
 * Handles inequalities like: |ax + b| < c or |ax + b| > c
 * 
 * For |f(x)| < a: splits into -a < f(x) < a
 * For |f(x)| > a: splits into f(x) < -a OR f(x) > a
 */
export function solveAbsoluteValueInequality(expression: string): {
    solution: Interval | Interval[];
    solutionType: SolutionType;
    steps: SolutionStep[];
} {
    const parsed = parseAbsoluteValueInequality(expression);
    const steps: SolutionStep[] = [];
    let stepNumber = 1;
    
    // Step 1: Show original inequality
    steps.push({
        stepNumber: stepNumber++,
        expression: expression,
        expressionLatex: expressionToLatex(expression).replace(/\|/g, '|'),
        justification: "Original absolute value inequality",
        reversesInequality: false
    });
    
    // Check for no solution case (|x| < negative number)
    if ((parsed.operator === '<' || parsed.operator === '≤') && parsed.rightSide < 0) {
        steps.push({
            stepNumber: stepNumber++,
            expression: "∅",
            expressionLatex: "\\emptyset",
            justification: "Absolute value cannot be less than a negative number",
            reversesInequality: false
        });
        
        return {
            solution: { start: 0, end: 0, startInclusive: false, endInclusive: false },
            solutionType: "EMPTY",
            steps
        };
    }
    
    // Step 2: Split into cases based on operator
    const isLessThan = parsed.operator === '<' || parsed.operator === '≤';
    
    if (isLessThan) {
        // |f(x)| < a  =>  -a < f(x) < a
        const compoundOp = parsed.operator === '<' ? '<' : '≤';
        const compoundExpr = `-${parsed.rightSide} ${compoundOp} ${parsed.innerExpression} ${compoundOp} ${parsed.rightSide}`;
        
        steps.push({
            stepNumber: stepNumber++,
            expression: compoundExpr,
            expressionLatex: expressionToLatex(compoundExpr),
            justification: `Split absolute value: |f(x)| ${parsed.operator} a means -a ${compoundOp} f(x) ${compoundOp} a`,
            reversesInequality: false
        });
        
        // Solve the compound inequality
        // Left part: -a < ax + b  =>  -a - b < ax  =>  (-a - b)/a < x
        const leftBound = (-parsed.rightSide - parsed.innerConstant) / parsed.innerCoefficient;
        // Right part: ax + b < a  =>  ax < a - b  =>  x < (a - b)/a
        const rightBound = (parsed.rightSide - parsed.innerConstant) / parsed.innerCoefficient;
        
        // Handle coefficient sign (affects inequality direction)
        let finalLeft = leftBound;
        let finalRight = rightBound;
        
        if (parsed.innerCoefficient < 0) {
            // Swap bounds when coefficient is negative
            [finalLeft, finalRight] = [finalRight, finalLeft];
        }
        
        const solutionExpr = `${finalLeft} ${compoundOp} x ${compoundOp} ${finalRight}`;
        steps.push({
            stepNumber: stepNumber++,
            expression: solutionExpr,
            expressionLatex: expressionToLatex(solutionExpr),
            justification: "Solve for x",
            reversesInequality: parsed.innerCoefficient < 0
        });
        
        const solution: Interval = {
            start: finalLeft,
            end: finalRight,
            startInclusive: parsed.operator === '≤',
            endInclusive: parsed.operator === '≤'
        };
        
        const intervalNotation = intervalToString(solution);
        steps.push({
            stepNumber: stepNumber++,
            expression: intervalNotation,
            expressionLatex: intervalToLatex(solution),
            justification: "Final solution in interval notation",
            reversesInequality: false
        });
        
        return {
            solution,
            solutionType: "INTERVAL",
            steps
        };
        
    } else {
        // |f(x)| > a  =>  f(x) < -a OR f(x) > a
        const disjunctionOp = parsed.operator === '>' ? '>' : '≥';
        const oppositeOp = parsed.operator === '>' ? '<' : '≤';
        const disjunctionExpr = `${parsed.innerExpression} ${oppositeOp} -${parsed.rightSide} OR ${parsed.innerExpression} ${disjunctionOp} ${parsed.rightSide}`;
        
        steps.push({
            stepNumber: stepNumber++,
            expression: disjunctionExpr,
            expressionLatex: expressionToLatex(disjunctionExpr).replace(/OR/g, '\\text{ or }'),
            justification: `Split absolute value: |f(x)| ${parsed.operator} a means f(x) ${oppositeOp} -a or f(x) ${disjunctionOp} a`,
            reversesInequality: false
        });
        
        // Solve both parts
        // Left part: ax + b < -a  =>  ax < -a - b  =>  x < (-a - b)/a
        const leftBound = (-parsed.rightSide - parsed.innerConstant) / parsed.innerCoefficient;
        // Right part: ax + b > a  =>  ax > a - b  =>  x > (a - b)/a
        const rightBound = (parsed.rightSide - parsed.innerConstant) / parsed.innerCoefficient;
        
        // Handle coefficient sign
        let finalLeftBound = leftBound;
        let finalRightBound = rightBound;
        let leftOp = oppositeOp;
        let rightOp = disjunctionOp;
        
        if (parsed.innerCoefficient < 0) {
            // Swap operators when coefficient is negative
            [finalLeftBound, finalRightBound] = [finalRightBound, finalLeftBound];
            [leftOp, rightOp] = [rightOp, leftOp];
        }
        
        const solutionExpr = `x ${leftOp} ${finalLeftBound} OR x ${rightOp} ${finalRightBound}`;
        steps.push({
            stepNumber: stepNumber++,
            expression: solutionExpr,
            expressionLatex: expressionToLatex(solutionExpr).replace(/OR/g, '\\text{ or }'),
            justification: "Solve for x",
            reversesInequality: parsed.innerCoefficient < 0
        });
        
        const solution: Interval[] = [
            {
                start: -Infinity,
                end: finalLeftBound,
                startInclusive: false,
                endInclusive: leftOp === '≤'
            },
            {
                start: finalRightBound,
                end: Infinity,
                startInclusive: rightOp === '≥',
                endInclusive: false
            }
        ];
        
        const intervalNotation = `${intervalToString(solution[0])} ∪ ${intervalToString(solution[1])}`;
        steps.push({
            stepNumber: stepNumber++,
            expression: intervalNotation,
            expressionLatex: `${intervalToLatex(solution[0])} \\cup ${intervalToLatex(solution[1])}`,
            justification: "Final solution in interval notation",
            reversesInequality: false
        });
        
        return {
            solution,
            solutionType: "INTERVAL",
            steps
        };
    }
}

/**
 * Represents a system of inequalities solution
 */
export interface SystemSolution {
    solution: Interval | null;
    solutionType: SolutionType;
    steps: SolutionStep[];
    graphData?: {
        inequalities: Array<{
            expression: string;
            boundaryLine: string;
            shadeAbove: boolean;
            inclusive: boolean;
        }>;
        intersectionRegion: string;
    };
}

/**
 * Solve a system of inequalities (one-variable)
 * Handles systems like: ["x > 2", "x < 5"] or ["x ≥ -1", "x ≤ 3"]
 */
export function solveSystemOfInequalities(inequalities: string[]): SystemSolution {
    const steps: SolutionStep[] = [];
    let stepNumber = 1;
    
    // Step 1: Show original system
    const systemExpr = inequalities.join(' AND ');
    steps.push({
        stepNumber: stepNumber++,
        expression: systemExpr,
        expressionLatex: inequalities.map(expressionToLatex).join(' \\text{ and } '),
        justification: "Original system of inequalities",
        reversesInequality: false
    });
    
    // Solve each inequality individually
    const solutions: Array<{ interval: Interval; expression: string }> = [];
    
    for (const inequality of inequalities) {
        try {
            const result = solveLinearInequality(inequality);
            solutions.push({
                interval: result.solution,
                expression: inequality
            });
            
            steps.push({
                stepNumber: stepNumber++,
                expression: `${inequality} => ${intervalToString(result.solution)}`,
                expressionLatex: `${expressionToLatex(inequality)} \\Rightarrow ${intervalToLatex(result.solution)}`,
                justification: `Solve: ${inequality}`,
                reversesInequality: false
            });
        } catch (error) {
            // If parsing fails, skip this inequality
            console.error(`Failed to parse inequality: ${inequality}`, error);
        }
    }
    
    // Find intersection of all solution intervals
    if (solutions.length === 0) {
        return {
            solution: null,
            solutionType: "EMPTY",
            steps
        };
    }
    
    // Calculate intersection
    let intersectionStart = -Infinity;
    let intersectionEnd = Infinity;
    let startInclusive = false;
    let endInclusive = false;
    
    for (const sol of solutions) {
        const interval = sol.interval;
        
        // Update start bound (take the maximum of all lower bounds)
        if (interval.start > intersectionStart) {
            intersectionStart = interval.start;
            startInclusive = interval.startInclusive;
        } else if (interval.start === intersectionStart) {
            // If equal, use AND logic for inclusivity (both must be inclusive)
            startInclusive = startInclusive && interval.startInclusive;
        }
        
        // Update end bound (take the minimum of all upper bounds)
        if (interval.end < intersectionEnd) {
            intersectionEnd = interval.end;
            endInclusive = interval.endInclusive;
        } else if (interval.end === intersectionEnd) {
            // If equal, use AND logic for inclusivity
            endInclusive = endInclusive && interval.endInclusive;
        }
    }
    
    // Check if intersection is empty
    if (intersectionStart > intersectionEnd || 
        (intersectionStart === intersectionEnd && (!startInclusive || !endInclusive))) {
        steps.push({
            stepNumber: stepNumber++,
            expression: "∅",
            expressionLatex: "\\emptyset",
            justification: "No intersection - the system has no solution",
            reversesInequality: false
        });
        
        return {
            solution: null,
            solutionType: "EMPTY",
            steps
        };
    }
    
    const intersection: Interval = {
        start: intersectionStart,
        end: intersectionEnd,
        startInclusive,
        endInclusive
    };
    
    const intervalNotation = intervalToString(intersection);
    steps.push({
        stepNumber: stepNumber++,
        expression: intervalNotation,
        expressionLatex: intervalToLatex(intersection),
        justification: "Intersection of all solution sets",
        reversesInequality: false
    });
    
    return {
        solution: intersection,
        solutionType: "INTERVAL",
        steps
    };
}

/**
 * Solve a system of two-variable linear inequalities
 * Returns graphical representation data for visualization
 */
export function solveSystemOfLinearInequalities2D(inequalities: string[]): SystemSolution {
    const steps: SolutionStep[] = [];
    let stepNumber = 1;
    
    // Step 1: Show original system
    const systemExpr = inequalities.join(' AND ');
    steps.push({
        stepNumber: stepNumber++,
        expression: systemExpr,
        expressionLatex: inequalities.map(expressionToLatex).join(' \\text{ and } '),
        justification: "Original system of inequalities",
        reversesInequality: false
    });
    
    // Parse each inequality to extract boundary line information
    const graphData = {
        inequalities: inequalities.map(ineq => {
            // Determine if we shade above or below the line
            const hasGreater = ineq.includes('>') || ineq.includes('≥');
            const hasLessEqual = ineq.includes('≤');
            const hasGreaterEqual = ineq.includes('≥');
            const inclusive = hasLessEqual || hasGreaterEqual;
            
            return {
                expression: ineq,
                boundaryLine: ineq.replace(/[<>≤≥]/g, '='),
                shadeAbove: hasGreater,
                inclusive
            };
        }),
        intersectionRegion: "Region where all inequalities are satisfied"
    };
    
    steps.push({
        stepNumber: stepNumber++,
        expression: "See graphical representation",
        expressionLatex: "\\text{See graphical representation}",
        justification: "The solution is the intersection region on the coordinate plane",
        reversesInequality: false
    });
    
    return {
        solution: null, // 2D systems don't have a simple interval solution
        solutionType: "INTERVAL",
        steps,
        graphData
    };
}

/**
 * Helper function to determine if a point (x, y) satisfies a linear inequality
 */
export function satisfiesInequality(x: number, y: number, inequality: string): boolean {
    try {
        // Split by operator first to avoid replacement issues
        const operators = ['≤', '≥', '<', '>'];
        let operator = '';
        let operatorIndex = -1;
        
        for (const op of operators) {
            const idx = inequality.indexOf(op);
            if (idx !== -1) {
                operator = op;
                operatorIndex = idx;
                break;
            }
        }
        
        if (operatorIndex === -1) return false;
        
        const leftSide = inequality.substring(0, operatorIndex).trim();
        const rightSide = inequality.substring(operatorIndex + operator.length).trim();
        
        // Replace variables with values (be careful with order - replace y before x to avoid conflicts)
        // Also add explicit multiplication where needed (e.g., "2x" -> "2*(x)")
        const leftEval = leftSide
            .replace(/(\d)([xy])/g, '$1*$2')  // Add * between number and variable
            .replace(/y/g, `(${y})`)
            .replace(/x/g, `(${x})`);
        const rightEval = rightSide
            .replace(/(\d)([xy])/g, '$1*$2')  // Add * between number and variable
            .replace(/y/g, `(${y})`)
            .replace(/x/g, `(${x})`);
        
        const left = eval(leftEval);
        const right = eval(rightEval);
        
        switch (operator) {
            case '<': return left < right;
            case '>': return left > right;
            case '≤': return left <= right;
            case '≥': return left >= right;
            default: return false;
        }
    } catch (error) {
        console.error('Error evaluating inequality:', error);
        return false;
    }
}
