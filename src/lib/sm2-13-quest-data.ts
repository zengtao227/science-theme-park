import { Quest } from "@/hooks/useQuestManager";

export type Stage = "reflection" | "translation" | "rotation" | "composition";

export interface SM213Quest extends Quest {
    stage: Stage;
}

type TranslationFn = (key: string, params?: Record<string, string | number>) => string;

export const buildStagePool = (
    difficulty: "BASIC" | "CORE" | "ADVANCED" | "ELITE",
    stage: Stage,
    t: TranslationFn
): SM213Quest[] => {
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
        const direction = cw ? t("sm2_13.labels.cw") : t("sm2_13.labels.ccw");

        if (stage === "reflection") {
            if (difficulty === "BASIC") {
                pool.push({
                    id: `sm2_13_ref_bas_${i}`,
                    difficulty: "BASIC",
                    stage: "reflection",
                    promptLatex: t("sm2_13.prompts.reflection_basic_axis", { x, y, axis }),
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
                const aX = line === "y = x" ? y : -y;
                const aY = line === "y = x" ? x : -x;
                pool.push({
                    id: `sm2_13_ref_cor_${i}`,
                    difficulty: "CORE",
                    stage: "reflection",
                    promptLatex: t("sm2_13.prompts.reflection_core_line", { x, y, line }),
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
                const aX = lineAxis === "x" ? 2 * offset - x : x;
                const aY = lineAxis === "y" ? 2 * offset - y : y;
                pool.push({
                    id: `sm2_13_ref_adv_${i}`,
                    difficulty: "ADVANCED",
                    stage: "reflection",
                    promptLatex: t("sm2_13.prompts.reflection_advanced_line_offset", { x, y, lineAxis, offset }),
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
                const px = 2 * x_int - x;
                const lineEquation = `y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
                pool.push({
                    id: `sm2_13_ref_eli_${i}`,
                    difficulty: "ELITE",
                    stage: "reflection",
                    promptLatex: t("sm2_13.prompts.reflection_elite_line", { x, y, lineEquation }),
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
                    promptLatex: t("sm2_13.prompts.translation_basic_vector", { x, y, dx, dy }),
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
                    promptLatex: t("sm2_13.prompts.translation_core_reverse", { dx, dy, x, y }),
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
                const equation = `y = ${m}x ${b >= 0 ? "+" : ""}${b}`;
                pool.push({
                    id: `sm2_13_tra_adv_${i}`,
                    difficulty: "ADVANCED",
                    stage: "translation",
                    promptLatex: t("sm2_13.prompts.translation_advanced_line", { equation, dx, dy }),
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
                    promptLatex: t("sm2_13.prompts.translation_elite_circle", { x, y, r2: r * r, dx, dy }),
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
                    promptLatex: t("sm2_13.prompts.rotation_basic_origin", {
                        x,
                        y,
                        angle,
                        direction
                    }),
                    expressionLatex: `\\text{Observe coordinate swaps & sign changes}`,
                    targetLatex: "P'(x', y')",
                    slots: [
                        { id: "x", labelLatex: "x'=", placeholder: "x", expected: ax },
                        { id: "y", labelLatex: "y'=", placeholder: "y", expected: ay }
                    ],
                    correctLatex: `P'(${ax}, ${ay})`
                });
            } else if (difficulty === "CORE") {
                const ax = x - cx; const ay = y - cx; // using cx for both center x and y to simplify
                let rx = ax, ry = ay;
                if (angle === 90) { rx = cw ? ay : -ay; ry = cw ? -ax : ax; }
                else if (angle === 180) { rx = -ax; ry = -ay; }
                else if (angle === 270) { rx = cw ? -ay : ay; ry = cw ? ax : -ax; }
                pool.push({
                    id: `sm2_13_rot_cor_${i}`,
                    difficulty: "CORE",
                    stage: "rotation",
                    promptLatex: t("sm2_13.prompts.rotation_core_center", {
                        x,
                        y,
                        angle,
                        direction,
                        cx
                    }),
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
                    promptLatex: t("sm2_13.prompts.rotation_advanced_xprime", {
                        x,
                        y,
                        direction
                    }),
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
                const equation = `y = ${Math.round(lineM * 10) / 10}x ${b >= 0 ? "+" : ""}${b}`;
                pool.push({
                    id: `sm2_13_rot_eli_${i}`,
                    difficulty: "ELITE",
                    stage: "rotation",
                    promptLatex: t("sm2_13.prompts.rotation_elite_line", { equation, thetaStr }),
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
                    promptLatex: t("sm2_13.prompts.composition_basic", { x, y, dx }),
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
                    promptLatex: t("sm2_13.prompts.composition_core", {
                        x,
                        y,
                        direction
                    }),
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
                    promptLatex: t("sm2_13.prompts.composition_advanced", { x, y, dx, dy }),
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
                    promptLatex: t("sm2_13.prompts.composition_elite", { x, y, dx, dy }),
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
