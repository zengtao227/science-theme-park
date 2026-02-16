"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback, useState } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import dynamic from "next/dynamic";

const TrigCanvas = dynamic(() => import("@/components/chamber/sm3-02/TrigCanvas"), {
    ssr: false,
});

type S302T = typeof translations.EN.sm3_02;
type Stage = "UNIT_CIRCLE" | "PROJECTIONS" | "WAVES";

interface S302Quest extends Quest {
    stage: Stage;
    angle?: number;
    trigFunc?: "sin" | "cos" | "tan";
}

// ----------------------------------------------------------------------------
// HELPER: EXACT VALUES MAP
// ----------------------------------------------------------------------------
const EXACT_VALUES: Record<number, { sin: string; cos: string; tan: string }> = {
    0: { sin: "0", cos: "1", tan: "0" },
    30: { sin: "\\frac{1}{2}", cos: "\\frac{\\sqrt{3}}{2}", tan: "\\frac{\\sqrt{3}}{3}" },
    45: { sin: "\\frac{\\sqrt{2}}{2}", cos: "\\frac{\\sqrt{2}}{2}", tan: "1" },
    60: { sin: "\\frac{\\sqrt{3}}{2}", cos: "\\frac{1}{2}", tan: "\\sqrt{3}" },
    90: { sin: "1", cos: "0", tan: "\\infty" },
    120: { sin: "\\frac{\\sqrt{3}}{2}", cos: "-\\frac{1}{2}", tan: "-\\sqrt{3}" },
    135: { sin: "\\frac{\\sqrt{2}}{2}", cos: "-\\frac{\\sqrt{2}}{2}", tan: "-1" },
    150: { sin: "\\frac{1}{2}", cos: "-\\frac{\\sqrt{3}}{2}", tan: "-\\frac{\\sqrt{3}}{3}" },
    180: { sin: "0", cos: "-1", tan: "0" },
    210: { sin: "-\\frac{1}{2}", cos: "-\\frac{\\sqrt{3}}{2}", tan: "\\frac{\\sqrt{3}}{3}" },
    225: { sin: "-\\frac{\\sqrt{2}}{2}", cos: "-\\frac{\\sqrt{2}}{2}", tan: "1" },
    240: { sin: "-\\frac{\\sqrt{3}}{2}", cos: "-\\frac{1}{2}", tan: "\\sqrt{3}" },
    270: { sin: "-1", cos: "0", tan: "\\infty" },
    300: { sin: "-\\frac{\\sqrt{3}}{2}", cos: "\\frac{1}{2}", tan: "-\\sqrt{3}" },
    315: { sin: "-\\frac{\\sqrt{2}}{2}", cos: "\\frac{\\sqrt{2}}{2}", tan: "-1" },
    330: { sin: "-\\frac{1}{2}", cos: "\\frac{\\sqrt{3}}{2}", tan: "-\\frac{\\sqrt{3}}{3}" },
    360: { sin: "0", cos: "1", tan: "0" },
};

// ----------------------------------------------------------------------------
// HELPER: QUESTION BUILDER
// ----------------------------------------------------------------------------
function q(
    id: string,
    d: Difficulty,
    s: Stage,
    p: string,
    expr: string,
    target: string,
    slots: Array<{ id: string; l: string; e: number | string; p?: string }>,
    correct: string,
    extra?: { angle?: number; trigFunc?: "sin" | "cos" | "tan"; hintLatex?: string[] }
): S302Quest {
    return {
        id,
        difficulty: d,
        stage: s,
        promptLatex: p,
        expressionLatex: expr,
        targetLatex: target,
        slots: slots.map((sl) => ({
            id: sl.id,
            labelLatex: sl.l,
            placeholder: sl.p ?? "?",
            expected: sl.e,
        })),
        correctLatex: correct,
        ...extra,
    };
}

function buildStagePool(t: S302T, difficulty: Difficulty, stage: Stage): S302Quest[] {
    const pUnit = t.stages.unit_circle_prompt_latex;
    const pProj = t.stages.projections_prompt_latex;
    const pWave = t.stages.waves_prompt_latex;

    // --- STAGE: UNIT CIRCLE ---
    if (stage === "UNIT_CIRCLE") {
        if (difficulty === "BASIC") {
            return [
                q("U-B1", difficulty, stage, pUnit, "120^\\circ", "\\text{Quadrant}", [{ id: "q", l: "Q", e: 2 }], "2", { angle: 120 }),
                q("U-B2", difficulty, stage, pUnit, "300^\\circ", "\\text{Quadrant}", [{ id: "q", l: "Q", e: 4 }], "4", { angle: 300 }),
                q("U-B3", difficulty, stage, pUnit, "45^\\circ", "\\text{Quadrant}", [{ id: "q", l: "Q", e: 1 }], "1", { angle: 45 }),
                q("U-B4", difficulty, stage, pUnit, "200^\\circ", "\\text{Quadrant}", [{ id: "q", l: "Q", e: 3 }], "3", { angle: 200 }),
                q("U-B5", difficulty, stage, pUnit, "91^\\circ", "\\text{Quadrant}", [{ id: "q", l: "Q", e: 2 }], "2", { angle: 91 }),
                q("U-B6", difficulty, stage, pUnit, "271^\\circ", "\\text{Quadrant}", [{ id: "q", l: "Q", e: 4 }], "4", { angle: 271 }),
                q("U-B7", difficulty, stage, pUnit, "10^\\circ", "\\text{Quadrant}", [{ id: "q", l: "Q", e: 1 }], "1", { angle: 10 }),
                q("U-B8", difficulty, stage, pUnit, "190^\\circ", "\\text{Quadrant}", [{ id: "q", l: "Q", e: 3 }], "3", { angle: 190 }),
            ];
        }
        if (difficulty === "CORE") {
            return [
                q("U-C1", difficulty, stage, pUnit, "\\sin(150^\\circ)", "\\text{Sign } (+/-)", [{ id: "s", l: "+/-", e: "+", p: "+/-" }], "+", { angle: 150 }),
                q("U-C2", difficulty, stage, pUnit, "\\cos(120^\\circ)", "\\text{Sign } (+/-)", [{ id: "s", l: "+/-", e: "-", p: "+/-" }], "-", { angle: 120 }),
                q("U-C3", difficulty, stage, pUnit, "\\tan(200^\\circ)", "\\text{Sign } (+/-)", [{ id: "s", l: "+/-", e: "+", p: "+/-" }], "+", { angle: 200 }),
                q("U-C4", difficulty, stage, pUnit, "\\sin(300^\\circ)", "\\text{Sign } (+/-)", [{ id: "s", l: "+/-", e: "-", p: "+/-" }], "-", { angle: 300 }),
                q("U-C5", difficulty, stage, pUnit, "\\cos(45^\\circ)", "\\text{Sign } (+/-)", [{ id: "s", l: "+/-", e: "+", p: "+/-" }], "+", { angle: 45 }),
                q("U-C6", difficulty, stage, pUnit, "\\sin(270^\\circ)", "\\text{Value } (0/1/-1)", [{ id: "v", l: "v", e: -1 }], "-1", { angle: 270 }),
                q("U-C7", difficulty, stage, pUnit, "\\cos(180^\\circ)", "\\text{Value } (0/1/-1)", [{ id: "v", l: "v", e: -1 }], "-1", { angle: 180 }),
                q("U-C8", difficulty, stage, pUnit, "\\cos(90^\\circ)", "\\text{Value } (0/1/-1)", [{ id: "v", l: "v", e: 0 }], "0", { angle: 90 }),
            ];
        }
        if (difficulty === "ADVANCED") {
            return [
                q("U-A1", difficulty, stage, pUnit, "90^\\circ", "\\text{Radians}", [{ id: "r", l: "rad", e: "pi/2" }], "\\pi/2", { angle: 90 }),
                q("U-A2", difficulty, stage, pUnit, "180^\\circ", "\\text{Radians}", [{ id: "r", l: "rad", e: "pi" }], "\\pi", { angle: 180 }),
                q("U-A3", difficulty, stage, pUnit, "45^\\circ", "\\text{Radians}", [{ id: "r", l: "rad", e: "pi/4" }], "\\pi/4", { angle: 45 }),
                q("U-A4", difficulty, stage, pUnit, "60^\\circ", "\\text{Radians}", [{ id: "r", l: "rad", e: "pi/3" }], "\\pi/3", { angle: 60 }),
                q("U-A5", difficulty, stage, pUnit, "30^\\circ", "\\text{Radians}", [{ id: "r", l: "rad", e: "pi/6" }], "\\pi/6", { angle: 30 }),
                q("U-A6", difficulty, stage, pUnit, "270^\\circ", "\\text{Radians}", [{ id: "r", l: "rad", e: "3pi/2" }], "3\\pi/2", { angle: 270 }),
                q("U-A7", difficulty, stage, pUnit, "360^\\circ", "\\text{Radians}", [{ id: "r", l: "rad", e: "2pi" }], "2\\pi", { angle: 360 }),
                q("U-A8", difficulty, stage, pUnit, "120^\\circ", "\\text{Radians}", [{ id: "r", l: "rad", e: "2pi/3" }], "2\\pi/3", { angle: 120 }),
            ];
        }
        return [ // ELITE
            q("U-E1", difficulty, stage, pUnit, "\\frac{\\pi}{2}", "\\text{Degrees}", [{ id: "d", l: "deg", e: 90 }], "90^\\circ", { angle: 90 }),
            q("U-E2", difficulty, stage, pUnit, "\\frac{\\pi}{6}", "\\text{Degrees}", [{ id: "d", l: "deg", e: 30 }], "30^\\circ", { angle: 30 }),
            q("U-E3", difficulty, stage, pUnit, "\\frac{5\\pi}{6}", "\\text{Degrees}", [{ id: "d", l: "deg", e: 150 }], "150^\\circ", { angle: 150 }),
            q("U-E4", difficulty, stage, pUnit, "\\frac{3\\pi}{4}", "\\text{Degrees}", [{ id: "d", l: "deg", e: 135 }], "135^\\circ", { angle: 135 }),
            q("U-E5", difficulty, stage, pUnit, "\\frac{4\\pi}{3}", "\\text{Degrees}", [{ id: "d", l: "deg", e: 240 }], "240^\\circ", { angle: 240 }),
            q("U-E6", difficulty, stage, pUnit, "\\frac{7\\pi}{4}", "\\text{Degrees}", [{ id: "d", l: "deg", e: 315 }], "315^\\circ", { angle: 315 }),
            q("U-E7", difficulty, stage, pUnit, "\\pi", "\\text{Degrees}", [{ id: "d", l: "deg", e: 180 }], "180^\\circ", { angle: 180 }),
            q("U-E8", difficulty, stage, pUnit, "\\frac{11\\pi}{6}", "\\text{Degrees}", [{ id: "d", l: "deg", e: 330 }], "330^\\circ", { angle: 330 }),
        ];
    }

    // --- STAGE: PROJECTIONS ---
    if (stage === "PROJECTIONS") {
        if (difficulty === "BASIC") {
            return [
                q("P-B1", difficulty, stage, pProj, "\\sin(30^\\circ)", "v", [{ id: "v", l: "v", e: "1/2" }], "1/2", { angle: 30, trigFunc: "sin" }),
                q("P-B2", difficulty, stage, pProj, "\\cos(60^\\circ)", "v", [{ id: "v", l: "v", e: "1/2" }], "1/2", { angle: 60, trigFunc: "cos" }),
                q("P-B3", difficulty, stage, pProj, "\\sin(90^\\circ)", "v", [{ id: "v", l: "v", e: 1 }], "1", { angle: 90, trigFunc: "sin" }),
                q("P-B4", difficulty, stage, pProj, "\\cos(0^\\circ)", "v", [{ id: "v", l: "v", e: 1 }], "1", { angle: 0, trigFunc: "cos" }),
                q("P-B5", difficulty, stage, pProj, "\\sin(45^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(2)/2" }], "\\frac{\\sqrt{2}}{2}", { angle: 45, trigFunc: "sin" }),
                q("P-B6", difficulty, stage, pProj, "\\cos(45^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(2)/2" }], "\\frac{\\sqrt{2}}{2}", { angle: 45, trigFunc: "cos" }),
                q("P-B7", difficulty, stage, pProj, "\\sin(60^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(3)/2" }], "\\frac{\\sqrt{3}}{2}", { angle: 60, trigFunc: "sin" }),
                q("P-B8", difficulty, stage, pProj, "\\cos(30^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(3)/2" }], "\\frac{\\sqrt{3}}{2}", { angle: 30, trigFunc: "cos" }),
            ];
        }
        if (difficulty === "CORE") {
            return [
                q("P-C1", difficulty, stage, pProj, "\\sin(150^\\circ)", "v", [{ id: "v", l: "v", e: "1/2" }], "1/2", { angle: 150, trigFunc: "sin" }),
                q("P-C2", difficulty, stage, pProj, "\\cos(120^\\circ)", "v", [{ id: "v", l: "v", e: "-1/2" }], "-1/2", { angle: 120, trigFunc: "cos" }),
                q("P-C3", difficulty, stage, pProj, "\\cos(180^\\circ)", "v", [{ id: "v", l: "v", e: -1 }], "-1", { angle: 180, trigFunc: "cos" }),
                q("P-C4", difficulty, stage, pProj, "\\sin(120^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(3)/2" }], "\\frac{\\sqrt{3}}{2}", { angle: 120, trigFunc: "sin" }),
                q("P-C5", difficulty, stage, pProj, "\\cos(150^\\circ)", "v", [{ id: "v", l: "v", e: "-sqrt(3)/2" }], "-\\frac{\\sqrt{3}}{2}", { angle: 150, trigFunc: "cos" }),
                q("P-C6", difficulty, stage, pProj, "\\sin(135^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(2)/2" }], "\\frac{\\sqrt{2}}{2}", { angle: 135, trigFunc: "sin" }),
                q("P-C7", difficulty, stage, pProj, "\\cos(135^\\circ)", "v", [{ id: "v", l: "v", e: "-sqrt(2)/2" }], "-\\frac{\\sqrt{2}}{2}", { angle: 135, trigFunc: "cos" }),
                q("P-C8", difficulty, stage, pProj, "\\sin(180^\\circ)", "v", [{ id: "v", l: "v", e: 0 }], "0", { angle: 180, trigFunc: "sin" }),
            ];
        }
        if (difficulty === "ADVANCED") {
            return [
                q("P-A1", difficulty, stage, pProj, "\\sin(210^\\circ)", "v", [{ id: "v", l: "v", e: "-1/2" }], "-1/2", { angle: 210, trigFunc: "sin" }),
                q("P-A2", difficulty, stage, pProj, "\\cos(240^\\circ)", "v", [{ id: "v", l: "v", e: "-1/2" }], "-1/2", { angle: 240, trigFunc: "cos" }),
                q("P-A3", difficulty, stage, pProj, "\\sin(300^\\circ)", "v", [{ id: "v", l: "v", e: "-sqrt(3)/2" }], "-\\frac{\\sqrt{3}}{2}", { angle: 300, trigFunc: "sin" }),
                q("P-A4", difficulty, stage, pProj, "\\cos(330^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(3)/2" }], "\\frac{\\sqrt{3}}{2}", { angle: 330, trigFunc: "cos" }),
                q("P-A5", difficulty, stage, pProj, "\\sin(225^\\circ)", "v", [{ id: "v", l: "v", e: "-sqrt(2)/2" }], "-\\frac{\\sqrt{2}}{2}", { angle: 225, trigFunc: "sin" }),
                q("P-A6", difficulty, stage, pProj, "\\cos(315^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(2)/2" }], "\\frac{\\sqrt{2}}{2}", { angle: 315, trigFunc: "cos" }),
                q("P-A7", difficulty, stage, pProj, "\\sin(270^\\circ)", "v", [{ id: "v", l: "v", e: -1 }], "-1", { angle: 270, trigFunc: "sin" }),
                q("P-A8", difficulty, stage, pProj, "\\cos(270^\\circ)", "v", [{ id: "v", l: "v", e: 0 }], "0", { angle: 270, trigFunc: "cos" }),
            ];
        }
        return [ // ELITE
            q("P-E1", difficulty, stage, pProj, "\\tan(45^\\circ)", "v", [{ id: "v", l: "v", e: 1 }], "1", { angle: 45, trigFunc: "tan" }),
            q("P-E2", difficulty, stage, pProj, "\\tan(60^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(3)" }], "\\sqrt{3}", { angle: 60, trigFunc: "tan" }),
            q("P-E3", difficulty, stage, pProj, "\\tan(150^\\circ)", "v", [{ id: "v", l: "v", e: "-sqrt(3)/3" }], "-\\frac{\\sqrt{3}}{3}", { angle: 150, trigFunc: "tan" }),
            q("P-E4", difficulty, stage, pProj, "\\tan(135^\\circ)", "v", [{ id: "v", l: "v", e: -1 }], "-1", { angle: 135, trigFunc: "tan" }),
            q("P-E5", difficulty, stage, pProj, "\\tan(30^\\circ)", "v", [{ id: "v", l: "v", e: "sqrt(3)/3" }], "\\frac{\\sqrt{3}}{3}", { angle: 30, trigFunc: "tan" }),
            q("P-E6", difficulty, stage, pProj, "\\sin(x)=\\frac{1}{2}, x \\in [0,90]", "x", [{ id: "x", l: "x", e: 30 }], "30", { angle: 30, trigFunc: "sin" }),
            q("P-E7", difficulty, stage, pProj, "\\cos(x)=-\\frac{1}{2}, x \\in [90,180]", "x", [{ id: "x", l: "x", e: 120 }], "120", { angle: 120, trigFunc: "cos" }),
            q("P-E8", difficulty, stage, pProj, "\\tan(x)=1, x \\in [180,270]", "x", [{ id: "x", l: "x", e: 225 }], "225", { angle: 225, trigFunc: "tan" }),
        ];
    }

    // --- STAGE: WAVES ---
    if (stage === "WAVES") {
        if (difficulty === "BASIC") {
            return [
                q("W-B1", difficulty, stage, pWave, "y=2\\sin(x)", "\\text{Amplitude}", [{ id: "a", l: "A", e: 2 }], "2"),
                q("W-B2", difficulty, stage, pWave, "y=5\\cos(x)", "\\text{Amplitude}", [{ id: "a", l: "A", e: 5 }], "5"),
                q("W-B3", difficulty, stage, pWave, "y=-3\\sin(x)", "\\text{Amplitude}", [{ id: "a", l: "A", e: 3 }], "3"),
                q("W-B4", difficulty, stage, pWave, "y=\\frac{1}{2}\\cos(x)", "\\text{Amplitude}", [{ id: "a", l: "A", e: "1/2" }], "1/2"),
                q("W-B5", difficulty, stage, pWave, "y=4\\sin(3x)", "\\text{Amplitude}", [{ id: "a", l: "A", e: 4 }], "4"),
                q("W-B6", difficulty, stage, pWave, "y=\\sin(x)+2", "\\text{Amplitude}", [{ id: "a", l: "A", e: 1 }], "1"),
                q("W-B7", difficulty, stage, pWave, "y=10\\cos(2x)", "\\text{Amplitude}", [{ id: "a", l: "A", e: 10 }], "10"),
                q("W-B8", difficulty, stage, pWave, "y=-0.5\\sin(x)", "\\text{Amplitude}", [{ id: "a", l: "A", e: 0.5 }], "0.5"),
            ];
        }
        if (difficulty === "CORE") {
            return [
                q("W-C1", difficulty, stage, pWave, "y=\\sin(2x)", "\\text{Period (rad)}", [{ id: "p", l: "T", e: "pi" }], "\\pi"),
                q("W-C2", difficulty, stage, pWave, "y=\\cos(x/2)", "\\text{Period (rad)}", [{ id: "p", l: "T", e: "4pi" }], "4\\pi"),
                q("W-C3", difficulty, stage, pWave, "y=\\sin(4x)", "\\text{Period (rad)}", [{ id: "p", l: "T", e: "pi/2" }], "\\pi/2"),
                q("W-C4", difficulty, stage, pWave, "y=\\cos(3x)", "\\text{Period (rad)}", [{ id: "p", l: "T", e: "2pi/3" }], "2\\pi/3"),
                q("W-C5", difficulty, stage, pWave, "y=\\sin(\\pi x)", "\\text{Period}", [{ id: "p", l: "T", e: 2 }], "2"),
                q("W-C6", difficulty, stage, pWave, "y=\\cos(2\\pi x)", "\\text{Period}", [{ id: "p", l: "T", e: 1 }], "1"),
                q("W-C7", difficulty, stage, pWave, "y=3\\sin(x/3)", "\\text{Period (rad)}", [{ id: "p", l: "T", e: "6pi" }], "6\\pi"),
                q("W-C8", difficulty, stage, pWave, "y=\\sin(x)", "\\text{Period (rad)}", [{ id: "p", l: "T", e: "2pi" }], "2\\pi"),
            ];
        }
        if (difficulty === "ADVANCED") {
            return [
                q("W-A1", difficulty, stage, pWave, "y=3\\cos(x)+1", "\\text{Max Value}", [{ id: "m", l: "max", e: 4 }], "4"),
                q("W-A2", difficulty, stage, pWave, "y=3\\cos(x)+1", "\\text{Min Value}", [{ id: "m", l: "min", e: -2 }], "-2"),
                q("W-A3", difficulty, stage, pWave, "y=2\\sin(x)-3", "\\text{Max Value}", [{ id: "m", l: "max", e: -1 }], "-1"),
                q("W-A4", difficulty, stage, pWave, "y=2\\sin(x)-3", "\\text{Min Value}", [{ id: "m", l: "min", e: -5 }], "-5"),
                q("W-A5", difficulty, stage, pWave, "y=5-2\\cos(x)", "\\text{Max Value}", [{ id: "m", l: "max", e: 7 }], "7"),
                q("W-A6", difficulty, stage, pWave, "y=5-2\\cos(x)", "\\text{Min Value}", [{ id: "m", l: "min", e: 3 }], "3"),
                q("W-A7", difficulty, stage, pWave, "y=\\sin^2(x)+\\cos^2(x)", "\\text{Value}", [{ id: "v", l: "v", e: 1 }], "1"),
                q("W-A8", difficulty, stage, pWave, "y=\\sin(x)\\cos(x)", "\\text{Amplitude}", [{ id: "a", l: "A", e: 0.5 }], "0.5"),
            ];
        }
        return [ // ELITE
            q("W-E1", difficulty, stage, pWave, "y=\\sin(x)+\\cos(x), x=45^\\circ", "y", [{ id: "y", l: "y", e: "sqrt(2)" }], "\\sqrt{2}"),
            q("W-E2", difficulty, stage, pWave, "y=\\sin(x), x=30^\\circ", "y", [{ id: "y", l: "y", e: "1/2" }], "1/2"),
            q("W-E3", difficulty, stage, pWave, "y=\\cos(2x), x=15^\\circ", "y", [{ id: "y", l: "y", e: "sqrt(3)/2" }], "\\frac{\\sqrt{3}}{2}"),
            q("W-E4", difficulty, stage, pWave, "y=2\\sin(x/2), x=60^\\circ", "y", [{ id: "y", l: "y", e: 1 }], "1"),
            q("W-E5", difficulty, stage, pWave, "y=\\sin(x), y'=?", "\\text{Derivative}", [{ id: "d", l: "y'", e: "cos(x)" }], "\\cos(x)"),
            q("W-E6", difficulty, stage, pWave, "y=\\cos(x), y'=?", "\\text{Derivative}", [{ id: "d", l: "y'", e: "-sin(x)" }], "-\\sin(x)"),
            q("W-E7", difficulty, stage, pWave, "y=\\tan(x), y(0)", "y", [{ id: "y", l: "y", e: 0 }], "0"),
            q("W-E8", difficulty, stage, pWave, "y=\\sin(x)+1, x=270^\\circ", "y", [{ id: "y", l: "y", e: 0 }], "0"),
        ];
    }

    return [];
}

// ----------------------------------------------------------------------------
// COMPONENT: MONITOR PANEL
// ----------------------------------------------------------------------------
function TrigMonitorPanel({
    angle,
    setAngle,
    showSin,
    setShowSin,
    showCos,
    setShowCos,
    showTan,
    setShowTan,
    showWaves,
    setShowWaves,
    t,
}: {
    angle: number;
    setAngle: (a: number) => void;
    showSin: boolean;
    setShowSin: (v: boolean) => void;
    showCos: boolean;
    setShowCos: (v: boolean) => void;
    showTan: boolean;
    setShowTan: (v: boolean) => void;
    showWaves: boolean;
    setShowWaves: (v: boolean) => void;
    t: S302T;
}) {
    const rad = (angle * Math.PI) / 180;
    const sinValue = Math.sin(rad);
    const cosValue = Math.cos(rad);
    const tanValue = Math.tan(rad);

    const specialAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
    const keyAngles = [0, 90, 180, 270, 360];

    const exact = EXACT_VALUES[angle];

    return (
        <div className="space-y-6">
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40">
                <TrigCanvas
                    angle={angle}
                    showSin={showSin}
                    showCos={showCos}
                    showTan={showTan}
                    showWaves={showWaves}
                />
            </div>

            {/* SPECIAL ANGLES */}
            <div className="space-y-2">
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
                    {t.labels.special_angles}
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {specialAngles.map((a) => (
                        <button
                            key={a}
                            onClick={() => setAngle(a)}
                            className={clsx(
                                "px-2 py-1 rounded text-xs font-mono border transition-all",
                                angle === a
                                    ? "bg-cyan-500 text-black border-cyan-400 font-bold"
                                    : keyAngles.includes(a)
                                        ? "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                                        : "border-white/10 text-white/40 hover:border-white/30"
                            )}
                        >
                            {a}°
                        </button>
                    ))}
                </div>
            </div>

            {/* ANGLE SLIDER */}
            <div className="space-y-2">
                <label className="text-[10px] text-cyan-400/60 uppercase tracking-widest">{t.labels.angle}</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between font-mono text-xs">
                    <span className="text-cyan-300">{angle}°</span>
                    <span className="text-cyan-300/50">{rad.toFixed(2)} rad</span>
                </div>
            </div>

            {/* VALUES DISPLAY */}
            <div className="space-y-2">
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
                    {exact ? t.labels.exact_value : t.labels.decimal_value}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded p-2 border border-white/10">
                        <div className="text-[9px] text-yellow-400/70 mb-1">SIN</div>
                        <div className="font-mono text-sm text-yellow-300 font-bold flex items-center h-6 overflow-hidden">
                            {exact ? <InlineMath math={exact.sin} /> : sinValue.toFixed(4)}
                        </div>
                    </div>
                    <div className="bg-white/5 rounded p-2 border border-white/10">
                        <div className="text-[9px] text-green-400/70 mb-1">COS</div>
                        <div className="font-mono text-sm text-green-300 font-bold flex items-center h-6 overflow-hidden">
                            {exact ? <InlineMath math={exact.cos} /> : cosValue.toFixed(4)}
                        </div>
                    </div>
                    <div className="bg-white/5 rounded p-2 border border-white/10">
                        <div className="text-[9px] text-pink-400/70 mb-1">TAN</div>
                        <div className="font-mono text-sm text-pink-300 font-bold flex items-center h-6 overflow-hidden">
                            {exact ? <InlineMath math={exact.tan} /> : Math.abs(cosValue) < 0.001 ? "∞" : tanValue.toFixed(4)}
                        </div>
                    </div>
                </div>
            </div>

            {/* DISPLAY OPTIONS */}
            <div className="space-y-2">
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-cyan-400/70">
                    {t.labels.display}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={showSin} onChange={(e) => setShowSin(e.target.checked)} className="accent-yellow-400" />
                        <span className="text-xs text-yellow-400 font-mono">sin(θ)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={showCos} onChange={(e) => setShowCos(e.target.checked)} className="accent-green-400" />
                        <span className="text-xs text-green-400 font-mono">cos(θ)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={showTan} onChange={(e) => setShowTan(e.target.checked)} className="accent-pink-400" />
                        <span className="text-xs text-pink-400 font-mono">tan(θ)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={showWaves} onChange={(e) => setShowWaves(e.target.checked)} className="accent-purple-400" />
                        <span className="text-xs text-purple-400 font-mono">Waves</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------------
export default function S302Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage].sm3_02;

    // Canvas State
    const [angle, setAngle] = useState(45);
    const [showSin, setShowSin] = useState(true);
    const [showCos, setShowCos] = useState(true);
    const [showTan, setShowTan] = useState(false);
    const [showWaves, setShowWaves] = useState(false);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(t, d, s), [t]);

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        successRate,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        parseNumberLike,
    } = useQuestManager<S302Quest, Stage>({
        buildPool,
        initialStage: "UNIT_CIRCLE",
    });

    // Sync angle from quest - using the "adjust state during render" pattern to satisfy React Compiler
    const [prevQuestId, setPrevQuestId] = useState<string | undefined>();
    if (currentQuest?.id !== prevQuestId) {
        setPrevQuestId(currentQuest?.id);
        if (currentQuest?.angle != null) {
            setAngle(currentQuest.angle);
            // Auto toggle relevant visuals based on quest type
            if (currentQuest.trigFunc === "sin") { setShowSin(true); setShowCos(false); setShowTan(false); }
            if (currentQuest.trigFunc === "cos") { setShowSin(false); setShowCos(true); setShowTan(false); }
            if (currentQuest.trigFunc === "tan") { setShowSin(false); setShowCos(false); setShowTan(true); }
        }
    }

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm3-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "UNIT_CIRCLE", label: t.stages.unit_circle },
        { id: "PROJECTIONS", label: t.stages.projections },
        { id: "WAVES", label: t.stages.waves },
    ];

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SM3.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={handleStageChange as (s: string) => void}
            successRate={successRate}
            onNext={next}
            onVerify={verify}
            checkStatus={lastCheck}
            translations={t}
            footerLeft={t.footer_left}
            monitorContent={
                <TrigMonitorPanel
                    angle={angle}
                    setAngle={setAngle}
                    showSin={showSin}
                    setShowSin={setShowSin}
                    showCos={showCos}
                    setShowCos={setShowCos}
                    showTan={showTan}
                    setShowTan={setShowTan}
                    showWaves={showWaves}
                    setShowWaves={setShowWaves}
                    t={t}
                />
            }
        >
            <div className="w-full max-w-5xl space-y-10">
                {/* Quest Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest opacity-60">
                            {t.objective_title}
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            <InlineMath math={currentQuest?.promptLatex || ""} />
                        </h2>
                        {currentQuest?.expressionLatex && (
                            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 inline-block min-w-[300px]">
                                <span className="text-4xl text-cyan-300 font-serif">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Input Slots */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {currentQuest?.slots.map((slot) => {
                            const isCorrect = lastCheck?.ok;
                            const value = inputs[slot.id] || "";
                            return (
                                <div key={slot.id} className="relative group">
                                    <div className="absolute -top-3 left-3 px-1 bg-[#0a0a0a] text-[9px] text-gray-500 uppercase tracking-widest font-bold z-10 group-focus-within:text-cyan-400 transition-colors">
                                        <InlineMath math={slot.labelLatex} />
                                    </div>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                        placeholder={slot.placeholder}
                                        disabled={isCorrect}
                                        className={clsx(
                                            "w-32 h-14 bg-white/5 border-2 rounded-xl text-center text-xl font-bold font-mono transition-all outline-none",
                                            isCorrect
                                                ? "border-green-500/50 text-green-400 bg-green-500/10"
                                                : lastCheck && !lastCheck.ok
                                                    ? "border-red-500/50 text-white focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                                    : "border-white/10 text-white focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-white/20"
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Feedback Message */}
                    {lastCheck && (
                        <div className={clsx(
                            "text-center font-mono text-sm tracking-widest uppercase transition-all duration-500",
                            lastCheck.ok ? "text-green-400 opacity-100 scale-100" : "text-red-400 opacity-100"
                        )}>
                            {lastCheck.ok ? t.correct : `${t.incorrect}: ${lastCheck.correct}`}
                        </div>
                    )}
                </div>
            </div>
        </ChamberLayout>
    );
}
