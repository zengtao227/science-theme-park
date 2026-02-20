import { Difficulty } from "@/hooks/useQuestManager";
import { useLanguage } from "@/lib/i18n";

export type Stage = "UNIT_CIRCLE" | "PROJECTIONS" | "WAVES";

export interface S302Quest {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    promptLatex: string;
    expressionLatex: string;
    targetLatex: string;
    slots: Array<{
        id: string;
        labelLatex: string;
        placeholder: string;
        expected: string | number;
    }>;
    correctLatex: string;
    angle?: number;
    trigFunc?: "sin" | "cos" | "tan";
}

// Common function to pick a random integer between min and max inclusive
export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to choose a random element
export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateUnitCircleQuests(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty): S302Quest[] {
    const quests: S302Quest[] = [];
    
    for (let i = 0; i < 60; i++) {
        const id = `U-${difficulty.charAt(0)}-${i+1}`;
        
        if (difficulty === "BASIC") {
            const angle = pick([45, 135, 225, 315, 30, 60, 120, 150, 210, 240, 300, 330, randomInt(1, 89), randomInt(91, 179), randomInt(181, 269), randomInt(271, 359)]);
            let q = 1;
            if (angle > 90 && angle < 180) q = 2;
            else if (angle > 180 && angle < 270) q = 3;
            else if (angle > 270 && angle < 360) q = 4;
            
            quests.push({
                id,
                stage: "UNIT_CIRCLE",
                difficulty,
                promptLatex: t("sm3_02.stages.unit_circle_prompt_latex") || "\\text{Determine the quadrant}",
                expressionLatex: `${angle}^\\circ`,
                targetLatex: "\\text{Quadrant}",
                slots: [{ id: "q", labelLatex: "Q", placeholder: "?", expected: q }],
                correctLatex: `${q}`,
                angle
            });
        }
        else if (difficulty === "CORE") {
            const func = pick(["sin", "cos", "tan"]);
            const angle = pick([120, 150, 210, 240, 300, 330, 45, 135, 225, 315]);
            let sign = "+";
            if (func === "sin" && angle > 180) sign = "-";
            if (func === "cos" && (angle > 90 && angle < 270)) sign = "-";
            if (func === "tan" && ((angle > 90 && angle < 180) || (angle > 270 && angle < 360))) sign = "-";
            
            quests.push({
                id,
                stage: "UNIT_CIRCLE",
                difficulty,
                promptLatex: t("sm3_02.stages.unit_circle_prompt_latex") || "\\text{Sign (+/-)}",
                expressionLatex: `\\${func}(${angle}^\\circ)`,
                targetLatex: "\\text{Sign } (+/-)",
                slots: [{ id: "s", labelLatex: "+/-", placeholder: "+/-", expected: sign }],
                correctLatex: sign,
                angle,
                trigFunc: func as any
            });
        }
        else if (difficulty === "ADVANCED") {
            const baseAngles = [
                { d: 30, r: "pi/6", l: "\\pi/6" },
                { d: 45, r: "pi/4", l: "\\pi/4" },
                { d: 60, r: "pi/3", l: "\\pi/3" },
                { d: 90, r: "pi/2", l: "\\pi/2" },
                { d: 120, r: "2pi/3", l: "2\\pi/3" },
                { d: 135, r: "3pi/4", l: "3\\pi/4" },
                { d: 150, r: "5pi/6", l: "5\\pi/6" },
                { d: 180, r: "pi", l: "\\pi" },
                { d: 210, r: "7pi/6", l: "7\\pi/6" },
                { d: 225, r: "5pi/4", l: "5\\pi/4" },
                { d: 240, r: "4pi/3", l: "4\\pi/3" },
                { d: 270, r: "3pi/2", l: "3\\pi/2" },
                { d: 300, r: "5pi/3", l: "5\\pi/3" },
                { d: 315, r: "7pi/4", l: "7\\pi/4" },
                { d: 330, r: "11pi/6", l: "11\\pi/6" },
            ];
            const a = pick(baseAngles);
            // From Deg to Rad
            quests.push({
                id,
                stage: "UNIT_CIRCLE",
                difficulty,
                promptLatex: t("sm3_02.stages.unit_circle_prompt_latex") || "\\text{Convert to Radians}",
                expressionLatex: `${a.d}^\\circ`,
                targetLatex: "\\text{Radians}",
                slots: [{ id: "r", labelLatex: "rad", placeholder: "?", expected: a.r }],
                correctLatex: a.l,
                angle: a.d
            });
        }
        else { // ELITE
            const baseAngles = [
                { d: 30, r: "pi/6", l: "\\frac{\\pi}{6}" },
                { d: 45, r: "pi/4", l: "\\frac{\\pi}{4}" },
                { d: 60, r: "pi/3", l: "\\frac{\\pi}{3}" },
                { d: 90, r: "pi/2", l: "\\frac{\\pi}{2}" },
                { d: 120, r: "2pi/3", l: "\\frac{2\\pi}{3}" },
                { d: 135, r: "3pi/4", l: "\\frac{3\\pi}{4}" },
                { d: 150, r: "5pi/6", l: "\\frac{5\\pi}{6}" },
                { d: 180, r: "pi", l: "\\pi" },
                { d: 210, r: "7pi/6", l: "\\frac{7\\pi}{6}" },
                { d: 225, r: "5pi/4", l: "\\frac{5\\pi}{4}" },
                { d: 240, r: "4pi/3", l: "\\frac{4\\pi}{3}" },
                { d: 270, r: "3pi/2", l: "\\frac{3\\pi}{2}" },
                { d: 300, r: "5pi/3", l: "\\frac{5\\pi}{3}" },
                { d: 315, r: "7pi/4", l: "\\frac{7\\pi}{4}" },
                { d: 330, r: "11pi/6", l: "\\frac{11\\pi}{6}" },
            ];
            const a = pick(baseAngles);
            
            quests.push({
                id,
                stage: "UNIT_CIRCLE",
                difficulty,
                promptLatex: t("sm3_02.stages.unit_circle_prompt_latex") || "\\text{Convert to Degrees}",
                expressionLatex: a.l,
                targetLatex: "\\text{Degrees}",
                slots: [{ id: "d", labelLatex: "deg", placeholder: "?", expected: a.d }],
                correctLatex: `${a.d}^\\circ`,
                angle: a.d
            });
        }
    }
    return quests;
}

export function generateProjectionsQuests(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty): S302Quest[] {
    const quests: S302Quest[] = [];
    
    for (let i = 0; i < 60; i++) {
        const id = `P-${difficulty.charAt(0)}-${i+1}`;
        
        if (difficulty === "BASIC") {
            const map = [
                { f: "sin", a: 30, ans: "1/2", cl: "1/2" },
                { f: "sin", a: 45, ans: "\\sqrt{2}/2", cl: "\\frac{\\sqrt{2}}{2}" },
                { f: "sin", a: 60, ans: "\\sqrt{3}/2", cl: "\\frac{\\sqrt{3}}{2}" },
                { f: "cos", a: 30, ans: "\\sqrt{3}/2", cl: "\\frac{\\sqrt{3}}{2}" },
                { f: "cos", a: 45, ans: "\\sqrt{2}/2", cl: "\\frac{\\sqrt{2}}{2}" },
                { f: "cos", a: 60, ans: "1/2", cl: "1/2" },
                { f: "sin", a: 0, ans: "0", cl: "0" },
                { f: "cos", a: 0, ans: "1", cl: "1" },
                { f: "sin", a: 90, ans: "1", cl: "1" },
                { f: "cos", a: 90, ans: "0", cl: "0" },
            ];
            const q = pick(map);
            quests.push({
                id, stage: "PROJECTIONS", difficulty,
                promptLatex: t("sm3_02.stages.projections_prompt_latex") || "\\text{Calculate exact value}",
                expressionLatex: `\\${q.f}(${q.a}^\\circ)`,
                targetLatex: "v",
                slots: [{ id: "v", labelLatex: "v", placeholder: "?", expected: q.ans }],
                correctLatex: q.cl,
                angle: q.a, trigFunc: q.f as any
            });
        }
        else if (difficulty === "CORE") {
            // Quadrant II exact values
            const map = [
                { f: "sin", a: 120, ans: "\\sqrt{3}/2", cl: "\\frac{\\sqrt{3}}{2}" },
                { f: "sin", a: 135, ans: "\\sqrt{2}/2", cl: "\\frac{\\sqrt{2}}{2}" },
                { f: "sin", a: 150, ans: "1/2", cl: "1/2" },
                { f: "cos", a: 120, ans: "-1/2", cl: "-\\frac{1}{2}" },
                { f: "cos", a: 135, ans: "-\\sqrt{2}/2", cl: "-\\frac{\\sqrt{2}}{2}" },
                { f: "cos", a: 150, ans: "-\\sqrt{3}/2", cl: "-\\frac{\\sqrt{3}}{2}" },
                { f: "sin", a: 180, ans: "0", cl: "0" },
                { f: "cos", a: 180, ans: "-1", cl: "-1" },
            ];
            const q = pick(map);
            quests.push({
                id, stage: "PROJECTIONS", difficulty,
                promptLatex: t("sm3_02.stages.projections_prompt_latex") || "\\text{Calculate exact value}",
                expressionLatex: `\\${q.f}(${q.a}^\\circ)`,
                targetLatex: "v",
                slots: [{ id: "v", labelLatex: "v", placeholder: "?", expected: q.ans }],
                correctLatex: q.cl,
                angle: q.a, trigFunc: q.f as any
            });
        }
        else if (difficulty === "ADVANCED") {
            // Quadrant III & IV
            const map = [
                { f: "sin", a: 210, ans: "-1/2", cl: "-\\frac{1}{2}" },
                { f: "sin", a: 225, ans: "-\\sqrt{2}/2", cl: "-\\frac{\\sqrt{2}}{2}" },
                { f: "sin", a: 240, ans: "-\\sqrt{3}/2", cl: "-\\frac{\\sqrt{3}}{2}" },
                { f: "cos", a: 210, ans: "-\\sqrt{3}/2", cl: "-\\frac{\\sqrt{3}}{2}" },
                { f: "cos", a: 225, ans: "-\\sqrt{2}/2", cl: "-\\frac{\\sqrt{2}}{2}" },
                { f: "cos", a: 240, ans: "-1/2", cl: "-\\frac{1}{2}" },
                { f: "sin", a: 300, ans: "-\\sqrt{3}/2", cl: "-\\frac{\\sqrt{3}}{2}" },
                { f: "sin", a: 315, ans: "-\\sqrt{2}/2", cl: "-\\frac{\\sqrt{2}}{2}" },
                { f: "sin", a: 330, ans: "-1/2", cl: "-\\frac{1}{2}" },
                { f: "cos", a: 300, ans: "1/2", cl: "\\frac{1}{2}" },
                { f: "cos", a: 315, ans: "\\sqrt{2}/2", cl: "\\frac{\\sqrt{2}}{2}" },
                { f: "cos", a: 330, ans: "\\sqrt{3}/2", cl: "\\frac{\\sqrt{3}}{2}" },
                { f: "sin", a: 270, ans: "-1", cl: "-1" },
                { f: "cos", a: 270, ans: "0", cl: "0" },
                { f: "sin", a: 360, ans: "0", cl: "0" },
                { f: "cos", a: 360, ans: "1", cl: "1" },
            ];
            const q = pick(map);
            quests.push({
                id, stage: "PROJECTIONS", difficulty,
                promptLatex: t("sm3_02.stages.projections_prompt_latex") || "\\text{Calculate exact value}",
                expressionLatex: `\\${q.f}(${q.a}^\\circ)`,
                targetLatex: "v",
                slots: [{ id: "v", labelLatex: "v", placeholder: "?", expected: q.ans }],
                correctLatex: q.cl,
                angle: q.a, trigFunc: q.f as any
            });
        }
        else {
            // Tangent over all quadrants
            const map = [
                { a: 30, ans: "\\sqrt{3}/3", cl: "\\frac{\\sqrt{3}}{3}" },
                { a: 45, ans: "1", cl: "1" },
                { a: 60, ans: "\\sqrt{3}", cl: "\\sqrt{3}" },
                { a: 120, ans: "-\\sqrt{3}", cl: "-\\sqrt{3}" },
                { a: 135, ans: "-1", cl: "-1" },
                { a: 150, ans: "-\\sqrt{3}/3", cl: "-\\frac{\\sqrt{3}}{3}" },
                { a: 210, ans: "\\sqrt{3}/3", cl: "\\frac{\\sqrt{3}}{3}" },
                { a: 225, ans: "1", cl: "1" },
                { a: 240, ans: "\\sqrt{3}", cl: "\\sqrt{3}" },
                { a: 300, ans: "-\\sqrt{3}", cl: "-\\sqrt{3}" },
                { a: 315, ans: "-1", cl: "-1" },
                { a: 330, ans: "-\\sqrt{3}/3", cl: "-\\frac{\\sqrt{3}}{3}" },
                { a: 0, ans: "0", cl: "0" },
                { a: 180, ans: "0", cl: "0" },
                { a: 360, ans: "0", cl: "0" },
            ];
            const q = pick(map);
            quests.push({
                id, stage: "PROJECTIONS", difficulty,
                promptLatex: t("sm3_02.stages.projections_prompt_latex") || "\\text{Calculate exact value}",
                expressionLatex: `\\tan(${q.a}^\\circ)`,
                targetLatex: "v",
                slots: [{ id: "v", labelLatex: "v", placeholder: "?", expected: q.ans }],
                correctLatex: q.cl,
                angle: q.a, trigFunc: "tan"
            });
        }
    }
    return quests;
}

export function generateWavesQuests(t: ReturnType<typeof useLanguage>["t"], difficulty: Difficulty): S302Quest[] {
    const quests: S302Quest[] = [];
    
    for (let i = 0; i < 60; i++) {
        const id = `W-${difficulty.charAt(0)}-${i+1}`;
        
        if (difficulty === "BASIC") {
            // y = [A]sin(x) --> Amplitude
            const A = pick([2, 3, 4, 5, 6, 7, 10, "1/2", "1/3", "3/4"]);
            const f = pick(["sin", "cos"]);
            const sign = pick(["", "-"]);
            const aStr = A.toString();
            // Expected amplitude is always positive
            const expectedAmp = A.toString();
            
            quests.push({
                id, stage: "WAVES", difficulty,
                promptLatex: t("sm3_02.stages.waves_prompt_latex") || "\\text{Amplitude}",
                expressionLatex: `y=${sign}${typeof A === "string" ? `\\frac{${A.split('/')[0]}}{${A.split('/')[1]}}` : A}\\${f}(x)`,
                targetLatex: "\\text{Amplitude}",
                slots: [{ id: "a", labelLatex: "A", placeholder: "?", expected: expectedAmp }],
                correctLatex: expectedAmp
            });
        }
        else if (difficulty === "CORE") {
            // y = sin([B]x) --> Period
            // T = 2pi / B
            const map = [
                { B: "2", tex: "2x", ans: "pi", cl: "\\pi" },
                { B: "3", tex: "3x", ans: "2pi/3", cl: "2\\pi/3" },
                { B: "4", tex: "4x", ans: "pi/2", cl: "\\pi/2" },
                { B: "1/2", tex: "x/2", ans: "4pi", cl: "4\\pi" },
                { B: "1/3", tex: "x/3", ans: "6pi", cl: "6\\pi" },
                { B: "pi", tex: "\\pi x", ans: "2", cl: "2" },
                { B: "2pi", tex: "2\\pi x", ans: "1", cl: "1" },
            ];
            const q = pick(map);
            const f = pick(["sin", "cos"]);
            
             quests.push({
                id, stage: "WAVES", difficulty,
                promptLatex: t("sm3_02.stages.waves_prompt_latex") || "\\text{Period}",
                expressionLatex: `y=\\${f}(${q.tex})`,
                targetLatex: "\\text{Period (rad)}",
                slots: [{ id: "p", labelLatex: "T", placeholder: "?", expected: q.ans }],
                correctLatex: q.cl
            });
        }
        else if (difficulty === "ADVANCED") {
            // y = A sin(x) + D --> Max / Min
            const A = randomInt(2, 6);
            const D = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
            const sign = pick(["", "-"]);
            const f = pick(["sin", "cos"]);
            const isMax = Math.random() > 0.5;
            
            const max = A + D;
            const min = -A + D;
            
            quests.push({
                id, stage: "WAVES", difficulty,
                promptLatex: t("sm3_02.stages.waves_prompt_latex") || (isMax ? "\\text{Max Value}" : "\\text{Min Value}"),
                expressionLatex: `y=${sign}${A}\\${f}(x)${D > 0 ? `+${D}` : D}`,
                targetLatex: isMax ? "\\text{Max}" : "\\text{Min}",
                slots: [{ id: "m", labelLatex: isMax ? "max" : "min", placeholder: "?", expected: isMax ? max : min }],
                correctLatex: isMax ? `${max}` : `${min}`
            });
        }
        else {
            // Mixed Evaluation / Derivatives
            const r = Math.random();
            if (r < 0.6) {
                // y = A sin(Bx) at x=?
                const xAngle = pick([30, 45, 60, 90]);
                const B = pick([1, 2]);
                const f = pick(["sin", "cos"]);
                
                const rad = (xAngle * Math.PI) / 180;
                let valMath = f === "sin" ? Math.sin(B * rad) : Math.cos(B * rad);
                valMath = Math.round(valMath * 1000) / 1000;
                
                let ans = "0"; let cl = "0";
                if (Math.abs(valMath - 0.5) < 0.01) { ans = "1/2"; cl = "1/2"; }
                else if (Math.abs(valMath - (-0.5)) < 0.01) { ans = "-1/2"; cl = "-1/2"; }
                else if (Math.abs(valMath - (0.866)) < 0.01) { ans = "\\sqrt{3}/2"; cl = "\\frac{\\sqrt{3}}{2}"; }
                else if (Math.abs(valMath - (-0.866)) < 0.01) { ans = "-\\sqrt{3}/2"; cl = "-\\frac{\\sqrt{3}}{2}"; }
                else if (Math.abs(valMath - (0.707)) < 0.01) { ans = "\\sqrt{2}/2"; cl = "\\frac{\\sqrt{2}}{2}"; }
                else if (Math.abs(valMath - (-0.707)) < 0.01) { ans = "-\\sqrt{2}/2"; cl = "-\\frac{\\sqrt{2}}{2}"; }
                else if (Math.abs(valMath - 1) < 0.01) { ans = "1"; cl = "1"; }
                else if (Math.abs(valMath - (-1)) < 0.01) { ans = "-1"; cl = "-1"; }
                
                 quests.push({
                    id, stage: "WAVES", difficulty,
                    promptLatex: t("sm3_02.stages.waves_prompt_latex") || "\\text{Evaluate}",
                    expressionLatex: `y=\\${f}(${B === 1 ? 'x' : B + 'x'}), x=${xAngle}^\\circ`,
                    targetLatex: "y",
                    slots: [{ id: "y", labelLatex: "y", placeholder: "?", expected: ans }],
                    correctLatex: cl
                });
            } else {
                // Derivatives
                const map = [
                    { eq: "\\sin(x)", ans: "cos(x)", cl: "\\cos(x)" },
                    { eq: "\\cos(x)", ans: "-sin(x)", cl: "-\\sin(x)" },
                    { eq: "2\\sin(x)", ans: "2cos(x)", cl: "2\\cos(x)" },
                    { eq: "3\\cos(x)", ans: "-3sin(x)", cl: "-3\\sin(x)" },
                ];
                const q = pick(map);
                quests.push({
                    id, stage: "WAVES", difficulty,
                    promptLatex: t("sm3_02.stages.waves_prompt_latex") || "\\text{Derivative}",
                    expressionLatex: `y=${q.eq}, y'=?`,
                    targetLatex: "\\text{Derivative}",
                    slots: [{ id: "d", labelLatex: "y'", placeholder: "?", expected: q.ans }],
                    correctLatex: q.cl
                });
            }
        }
    }
    return quests;
}

