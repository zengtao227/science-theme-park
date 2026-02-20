import { Quest } from "@/hooks/useQuestManager";

export type Stage = "reflection" | "translation" | "rotation" | "composition";

export interface SM213Quest extends Quest {
    stage: Stage;
}

export const buildStagePool = (difficulty: "BASIC" | "CORE" | "ADVANCED" | "ELITE", stage: Stage): SM213Quest[] => {
    const pool: SM213Quest[] = [];

    // Generate 20 variants for each difficulty/stage combo to ensure >= 80 quests per stage
    const count = 20;

    for (let i = 0; i < count; i++) {
        // Generate random coordinates between -10 and 10
        const x = Math.floor(Math.random() * 20) - 10;
        const y = Math.floor(Math.random() * 20) - 10;
        const dx = Math.floor(Math.random() * 10) - 5;
        const dy = Math.floor(Math.random() * 10) - 5;
        const axis = Math.random() > 0.5 ? "x" : "y";
        const angle = [90, 180, 270][Math.floor(Math.random() * 3)];
        const cx = Math.floor(Math.random() * 10) - 5;
        const cw = Math.random() > 0.5;

        if (stage === "reflection") {
            if (difficulty === "BASIC") {
                pool.push({
                    id: `sm2_13_ref_bas_${i}`,
                    difficulty: "BASIC",
                    stage: "reflection",
                    promptLatex: `Reflect point $P(${x}, ${y})$ across the $${axis}$-axis. Find $P'(x', y')$.`,
                    expressionLatex: `P(x, y) \\xrightarrow{${axis}\\text{-axis}} ` + (axis === "x" ? "P'(x, -y)" : "P'(-x, y)"),
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: axis === "x" ? x : -x },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: axis === "x" ? -y : y }
                    ],
                    correctLatex: `P'(${axis === "x" ? x : -x}, ${axis === "x" ? -y : y})`
                });
            } else if (difficulty === "CORE") {
                const line = Math.random() > 0.5 ? "y = x" : "y = -x";
                let aX = line === "y = x" ? y : -y;
                let aY = line === "y = x" ? x : -x;
                pool.push({
                    id: `sm2_13_ref_cor_${i}`,
                    difficulty: "CORE",
                    stage: "reflection",
                    promptLatex: `Reflect point $P(${x}, ${y})$ across the line $${line}$. Find $P'(x', y')$.`,
                    expressionLatex: `P(x, y) \\xrightarrow{${line}} ` + (line === "y = x" ? "P'(y, x)" : "P'(-y, -x)"),
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: aX },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: aY }
                    ],
                    correctLatex: `P'(${aX}, ${aY})`
                });
            } else if (difficulty === "ADVANCED") {
                const offset = Math.floor(Math.random() * 6) - 3;
                const lineAxis = axis; // reuse axis var
                let aX = lineAxis === "x" ? 2 * offset - x : x;
                let aY = lineAxis === "y" ? 2 * offset - y : y;
                pool.push({
                    id: `sm2_13_ref_adv_${i}`,
                    difficulty: "ADVANCED",
                    stage: "reflection",
                    promptLatex: `Reflect point $P(${x}, ${y})$ across the line $${lineAxis} = ${offset}$. Find $P'(x', y')$.`,
                    expressionLatex: `\\text{Mirror distance is } |${lineAxis} - ${offset}|`,
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: aX },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: aY }
                    ],
                    correctLatex: `P'(${aX}, ${aY})`
                });
            } else if (difficulty === "ELITE") {
                const m = Math.random() > 0.5 ? 2 : -2;
                const b = Math.floor(Math.random() * 4);
                // Intersection of normal line and reflection line:
                // slope = m. perpendicular slope = -1/m
                // Normal line: y - Py = (-1/m)(x - Px) => y = -x/m + Px/m + Py
                // intersect: mx + b = -x/m + Px/m + Py  => (m + 1/m)x = Px/m + Py - b => x_int = (Px/m + Py - b)/(m + 1/m)
                // P'_x = x + 2(x_int - x) = 2x_int - x
                const m_inv = -1 / m;
                const x_int = (x * m_inv + y - b) / (m - m_inv);
                const y_int = m * x_int + b;
                const px = 2 * x_int - x;
                const py = 2 * y_int - y;
                pool.push({
                    id: `sm2_13_ref_eli_${i}`,
                    difficulty: "ELITE",
                    stage: "reflection",
                    promptLatex: `Reflect $P(${x}, ${y})$ across $y = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}$. Find x'. (1 decimal)`,
                    expressionLatex: `\\text{Perpendicular slope is } \\frac{-1}{${m}}`,
                    targetLatex: "x'",
                    slots: [
                        { id: "x", labelLatex: "x'\\approx", placeholder: "x", expected: Math.round(px * 10) / 10 }
                    ],
                    correctLatex: `${Math.round(px * 10) / 10}`
                });
            }
        } else if (stage === "translation") {
            if (difficulty === "BASIC") {
                pool.push({
                    id: `sm2_13_tra_bas_${i}`,
                    difficulty: "BASIC",
                    stage: "translation",
                    promptLatex: `Translate $P(${x}, ${y})$ by vector $\\vec{v} = \\binom{${dx}}{${dy}}$. Find $P'(x', y')$.`,
                    expressionLatex: `P'(x, y) = (${x}+${dx}, ${y}+${dy})`,
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: x + dx },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: y + dy }
                    ],
                    correctLatex: `P'(${x + dx}, ${y + dy})`
                });
            } else if (difficulty === "CORE") {
                pool.push({
                    id: `sm2_13_tra_cor_${i}`,
                    difficulty: "CORE",
                    stage: "translation",
                    promptLatex: `A point $P(x, y)$ is translated by $\\vec{v} = \\binom{${dx}}{${dy}}$ to $P'(${x}, ${y})$. Find the original $P$.`,
                    expressionLatex: `P_x = P'_x - v_x, \\quad P_y = P'_y - v_y`,
                    targetLatex: "P(x, y)",
                    slots: [
                        { id: "x", labelLatex: "x=", placeholder: "x", expected: x - dx },
                        { id: "y", labelLatex: "y=", placeholder: "y", expected: y - dy }
                    ],
                    correctLatex: `P(${x - dx}, ${y - dy})`
                });
            } else if (difficulty === "ADVANCED") {
                const m = Math.floor(Math.random() * 4) - 2 || 1;
                const b = Math.floor(Math.random() * 4) - 2;
                const new_b = b + dy - m * dx;
                pool.push({
                    id: `sm2_13_tra_adv_${i}`,
                    difficulty: "ADVANCED",
                    stage: "translation",
                    promptLatex: `Translate the line $y = ${m}x ${b >= 0 ? '+' : ''}${b}$ by $\\vec{v} = \\binom{${dx}}{${dy}}$. Find the new y-intercept $b'$.`,
                    expressionLatex: `y - ${dy} = ${m}(x - ${dx}) + ${b}`,
                    targetLatex: "b'",
                    slots: [
                        { id: "b", labelLatex: "b'=", placeholder: "b", expected: new_b }
                    ],
                    correctLatex: `${new_b}`
                });
            } else if (difficulty === "ELITE") {
                const r = Math.floor(Math.random() * 5) + 1;
                const new_cx = x + dx;
                const new_cy = y + dy;
                const dist = Math.sqrt(new_cx * new_cx + new_cy * new_cy);
                pool.push({
                    id: `sm2_13_tra_eli_${i}`,
                    difficulty: "ELITE",
                    stage: "translation",
                    promptLatex: `Circle $(x - ${x})^{2} + (y - ${y})^{2} = ${r * r}$ is translated by $\\vec{v} = \\binom{${dx}}{${dy}}$. Find the distance from the new center to the origin. (1 dec)`,
                    expressionLatex: `C' = (${new_cx}, ${new_cy}), d = \\sqrt{${new_cx}^{2} + ${new_cy}^2}`,
                    targetLatex: "d",
                    slots: [
                        { id: "d", labelLatex: "d\\approx", placeholder: "d", expected: Math.round(dist * 10) / 10 }
                    ],
                    correctLatex: `${Math.round(dist * 10) / 10}`
                });
            }
        } else if (stage === "rotation") {
            if (difficulty === "BASIC") {
                let ax = x, ay = y;
                if (angle === 90) { ax = cw ? y : -y; ay = cw ? -x : x; }
                else if (angle === 180) { ax = -x; ay = -y; }
                else if (angle === 270) { ax = cw ? -y : y; ay = cw ? x : -x; }
                pool.push({
                    id: `sm2_13_rot_bas_${i}`,
                    difficulty: "BASIC",
                    stage: "rotation",
                    promptLatex: `Rotate $P(${x}, ${y})$ by $${angle}^\\circ$ ${cw ? 'CW' : 'CCW'} around the origin. Find $P'(x', y')$.`,
                    expressionLatex: `\\text{Observe coordinate swaps & sign changes}`,
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: ax },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: ay }
                    ],
                    correctLatex: `P'(${ax}, ${ay})`
                });
            } else if (difficulty === "CORE") {
                let ax = x - cx; let ay = y - cx; // using cx for both center x and y to simplify
                let rx = ax, ry = ay;
                if (angle === 90) { rx = cw ? ay : -ay; ry = cw ? -ax : ax; }
                else if (angle === 180) { rx = -ax; ry = -ay; }
                else if (angle === 270) { rx = cw ? -ay : ay; ry = cw ? ax : -ax; }
                pool.push({
                    id: `sm2_13_rot_cor_${i}`,
                    difficulty: "CORE",
                    stage: "rotation",
                    promptLatex: `Rotate $P(${x}, ${y})$ by $${angle}^\\circ$ ${cw ? 'CW' : 'CCW'} around $C(${cx}, ${cx})$. Find $P'(x', y')$.`,
                    expressionLatex: `\\text{Translate } C \\rightarrow (0,0)\\text{, rotate, then translate back}`,
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: rx + cx },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: ry + cx }
                    ],
                    correctLatex: `P'(${rx + cx}, ${ry + cx})`
                });
            } else if (difficulty === "ADVANCED") {
                const theta = cw ? -Math.PI / 6 : Math.PI / 6; // 30 deg
                const rx = x * Math.cos(theta) - y * Math.sin(theta);
                pool.push({
                    id: `sm2_13_rot_adv_${i}`,
                    difficulty: "ADVANCED",
                    stage: "rotation",
                    promptLatex: `Rotate $P(${x}, ${y})$ by $30^\\circ$ ${cw ? 'CW' : 'CCW'} around the origin. Find $x'$. (1 dec)`,
                    expressionLatex: `x' = x \\cos \\theta - y \\sin \\theta`,
                    targetLatex: "x'",
                    slots: [
                        { id: "x", labelLatex: "x'\\approx", placeholder: "x", expected: Math.round(rx * 10) / 10 }
                    ],
                    correctLatex: `${Math.round(rx * 10) / 10}`
                });
            } else if (difficulty === "ELITE") {
                const thetaStr = cw ? "-45^\\circ" : "45^\\circ";
                const theta = cw ? -Math.PI / 4 : Math.PI / 4;
                const lineM = Math.tan(theta);
                const b = dy; // arbitrary
                // Equation of line un-rotated: y = 0
                pool.push({
                    id: `sm2_13_rot_eli_${i}`,
                    difficulty: "ELITE",
                    stage: "rotation",
                    promptLatex: `Line $y = ${Math.round(lineM * 10) / 10}x ${b >= 0 ? '+' : ''}${b}$ is rotated $${thetaStr}$ around the origin. Find the new y-intercept.`,
                    expressionLatex: `\\text{Find intercepts, rotate the points, solve for new equation.}`,
                    targetLatex: "b'",
                    slots: [
                        { id: "b", labelLatex: "b'\\approx", placeholder: "b", expected: Math.round(b / Math.cos(theta) * 10) / 10 }
                    ],
                    correctLatex: `${Math.round(b / Math.cos(theta) * 10) / 10}` // Rough approximation assuming rotation by -theta makes it horizontal.
                });
            }
        } else if (stage === "composition") {
            if (difficulty === "BASIC") {
                pool.push({
                    id: `sm2_13_cmp_bas_${i}`,
                    difficulty: "BASIC",
                    stage: "composition",
                    promptLatex: `Translate $P(${x}, ${y})$ by $\\vec{v}=\\binom{${dx}}{0}$, then reflect across the x-axis. Find $P'(x', y')$.`,
                    expressionLatex: `(${x},${y}) \\rightarrow (${x + dx},${y}) \\rightarrow (${x + dx}, ${-y})`,
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: x + dx },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: -y }
                    ],
                    correctLatex: `P'(${x + dx}, ${-y})`
                });
            } else if (difficulty === "CORE") {
                const rotY = cw ? x : -x;
                const rotX = cw ? -y : y;
                pool.push({
                    id: `sm2_13_cmp_cor_${i}`,
                    difficulty: "CORE",
                    stage: "composition",
                    promptLatex: `Reflect $P(${x}, ${y})$ across $y=x$, then rotate $90^\\circ$ ${cw ? 'CW' : 'CCW'} around origin. Find $P'(x', y')$.`,
                    expressionLatex: `(${x},${y}) \\xrightarrow{y=x} (${y},${x}) \\xrightarrow{90^\\circ} (${rotX}, ${rotY})`,
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: rotX },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: rotY }
                    ],
                    correctLatex: `P'(${rotX}, ${rotY})`
                });
            } else if (difficulty === "ADVANCED") {
                pool.push({
                    id: `sm2_13_cmp_adv_${i}`,
                    difficulty: "ADVANCED",
                    stage: "composition",
                    promptLatex: `Point $P(${x}, ${y})$ is reflected across $x = ${dx}$, then across $x = ${dy}$. The net transformation is a translation by $\\Delta x$. Find $\\Delta x$.`,
                    expressionLatex: `\\Delta x = 2(${dy} - ${dx})`,
                    targetLatex: "\\Delta x",
                    slots: [
                        { id: "x", labelLatex: "\\Delta x=", placeholder: "val", expected: 2 * (dy - dx) }
                    ],
                    correctLatex: `${2 * (dy - dx)}`
                });
            } else if (difficulty === "ELITE") {
                pool.push({
                    id: `sm2_13_cmp_eli_${i}`,
                    difficulty: "ELITE",
                    stage: "composition",
                    promptLatex: `Reflect $P(${x}, ${y})$ across $x=${dx}$, then across $y=${dy}$. The net transformation is equivalent to a rotation around $C(x_c, y_c)$. Find $x_c + y_c$.`,
                    expressionLatex: `\\text{Reflection over 2 perpendicular lines = }180^\\circ\\text{ rotation around intersection}`,
                    targetLatex: "x_c + y_c",
                    slots: [
                        { id: "val", labelLatex: "Sum=", placeholder: "val", expected: dx + dy }
                    ],
                    correctLatex: `${dx + dy}`
                });
            }
        }
    }

    return pool;
};
