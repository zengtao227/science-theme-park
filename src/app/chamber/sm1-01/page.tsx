"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { clsx } from "clsx";
import { useEffect, useCallback } from "react";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ResizableLayout from "@/components/layout/ResizableLayout";
import S101_GeometryCanvas, { GeometryMeta } from "@/components/chamber/sm1-01/GeometryCanvas";
import Cube3D from "@/components/chamber/sm1-01/Cube3D";

type Stage = "AREAS" | "VOLUMES" | "COMPLEX";

interface S101Quest extends Quest {
    stage: Stage;
    visualMeta?: GeometryMeta;
}

function buildStagePool(t: any, difficulty: Difficulty, stage: Stage): S101Quest[] {
    if (stage === "AREAS") {
        // BASIC: Direct observation, simple integers, single-step calculation
        if (difficulty === "BASIC") {
            return [
                {
                    id: "AB1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.ski}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=5\text{ m, }\\text{${t.labels.width} }b=8\text{ m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 40, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=5\\cdot 8=40`,
                    hintLatex: [`A=a\\cdot b`],
                    visualMeta: { type: 'rectangle', params: { a: 5, b: 8 } },
                },
                {
                    id: "AB2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.sail}}`,
                    expressionLatex: `\\text{${t.labels.base} }b=6\\text{m, }\\text{${t.labels.height} }h=4\\text{m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 12, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\\\frac{1}{2}\\cdot 6\\cdot 4=12`,
                    hintLatex: [`A=\\\\frac{1}{2}bh`],
                    visualMeta: { type: 'triangle', params: { b: 6, h: 4 } },
                },
                {
                    id: "AB3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.gate}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=4\\text{m, }\\text{${t.labels.base} }b=6\\text{m, }\\text{${t.labels.height} }h=5\\text{m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 25, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\\\frac{1}{2}(4+6)\\cdot 5=25`,
                    hintLatex: [`A=\\\\frac{1}{2}(a+b)h`],
                    visualMeta: { type: 'trapezoid', params: { a: 4, b: 6, h: 5 } },
                },
                {
                    id: "AB4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.cheese}}`,
                    expressionLatex: `\\text{${t.labels.radius} }r=3\text{ cm}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 28.3, unit: "\\text{cm}^{2}" }],
                    correctLatex: `A=\pi r^{2}\approx 28.3`,
                    hintLatex: [`A=\pi r^{2}`],
                    visualMeta: { type: 'circle', params: { r: 3 } },
                },
                {
                    id: "AB5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_park}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=10\\text{ m, }\\text{${t.labels.width} }b=6\\text{ m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 60, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=10\\cdot 6=60`,
                    hintLatex: [`A=a\\cdot b`],
                    visualMeta: { type: 'rectangle', params: { a: 10, b: 6 } },
                },
            ];
        }

        // CORE: Combined concepts, multi-step calculation
        if (difficulty === "CORE") {
            return [
                {
                    id: "AC1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.ski}}`,
                    expressionLatex: `\\text{${t.quests.rect_core.replace("${w}", "6").replace("${diff}", "4")}}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 60, unit: "\\text{m}^{2}" }],
                    correctLatex: `a=6+4=10 \\Rightarrow A=10\\cdot 6=60`,
                    hintLatex: [`A=a\\cdot b`, `a=w+4`],
                    visualMeta: { type: 'rectangle', params: { a: 10, b: 6 } },
                },
                {
                    id: "AC2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.sail}}`,
                    expressionLatex: `\\text{${t.labels.base} }b=12\\text{m, }\\text{${t.base_twice_height}}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 36, unit: "\\text{m}^{2}" }],
                    correctLatex: `h=12/2=6 \\Rightarrow A=\\\\frac{1}{2}\\cdot 12\\cdot 6=36`,
                    hintLatex: [`A=\\\\frac{1}{2}bh`, `b=2h`],
                    visualMeta: { type: 'triangle', params: { b: 12, h: 6 } },
                },
                {
                    id: "AC3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_rhine_trap}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=8\\text{m, }\\text{${t.labels.base} }b=14\\text{m, }\\text{${t.labels.height} }h=6\\text{m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 66, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\\\frac{1}{2}(8+14)\\cdot 6=66`,
                    hintLatex: [`A=\\\\frac{1}{2}(a+b)h`],
                    visualMeta: { type: 'trapezoid', params: { a: 8, b: 14, h: 6 } },
                },
                {
                    id: "AC4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_fountain}}`,
                    expressionLatex: `\\text{${t.labels.radius} }r=5\\text{m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 78.5, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\pi r^{2}\\approx 78.5`,
                    hintLatex: [`A=\\pi r^{2}`],
                    visualMeta: { type: 'circle', params: { r: 5 } },
                },
                {
                    id: "AC5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.roche_window}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=15\\text{m, }\\text{${t.labels.width} }b=9\\text{m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 135, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=15\\cdot 9=135`,
                    hintLatex: [`A=a\\cdot b`],
                    visualMeta: { type: 'rectangle', params: { a: 15, b: 9 } },
                },
            ];
        }

        // ADVANCED: Conditional problems, decimals/fractions
        if (difficulty === "ADVANCED") {
            return [
                {
                    id: "AA1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.ski}}`,
                    expressionLatex: `\\text{${t.quests.rect_advanced.replace("${l}", "20")}}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 200, unit: "\\text{m}^{2}" }],
                    correctLatex: `b=20/2=10 \\Rightarrow A=20\\cdot 10=200`,
                    hintLatex: [`A=a\\cdot b`, `b=a/2`],
                    visualMeta: { type: 'rectangle', params: { a: 20, b: 10 } },
                },
                {
                    id: "AA2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_cathedral_tri}}`,
                    expressionLatex: `b=18\\text{ m, }\\text{${t.labels.height_twice || 'height is 2/3 of base'}}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 108, unit: "\\text{m}^{2}" }],
                    correctLatex: `h=18\\cdot \\frac{2}{3}=12 \\Rightarrow A=\\frac{1}{2}\\cdot 18\\cdot 12=108`,
                    hintLatex: [`A=\\frac{1}{2}bh`, `h=\\frac{2}{3}b`],
                    visualMeta: { type: 'triangle', params: { b: 18, h: 12 } },
                },
                {
                    id: "AA3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.novartis_trap}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=12\\text{ m, }\\text{${t.labels.base} }b=20\\text{ m, }\\text{${t.labels.height} }h=8\\text{ m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 128, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\frac{1}{2}(12+20)\\cdot 8=128`,
                    hintLatex: [`A=\\frac{1}{2}(a+b)h`],
                    visualMeta: { type: 'trapezoid', params: { a: 12, b: 20, h: 8 } },
                },
                {
                    id: "AA4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_zoo_pond}}`,
                    expressionLatex: `\\text{${t.labels.diameter_given || 'diameter'} }d=14\\text{ m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 153.9, unit: "\\text{m}^{2}" }],
                    correctLatex: `r=14/2=7 \\Rightarrow A=\pi r^{2}\approx 153.9`,
                    hintLatex: [`A=\pi r^{2}`, `r=d/2`],
                    visualMeta: { type: 'circle', params: { r: 7 } },
                },
                {
                    id: "AA5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_uni_court}}`,
                    expressionLatex: `\\text{${t.labels.perimeter_given || 'perimeter'} }P=60\\text{ m, }\\text{${t.labels.length_twice || 'length is twice width'}}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 200, unit: "\\text{m}^{2}" }],
                    correctLatex: `2(w+2w)=60 \\Rightarrow w=10, l=20 \\Rightarrow A=200`,
                    hintLatex: [`P=2(a+b)`, `a=2b`],
                    visualMeta: { type: 'rectangle', params: { a: 20, b: 10 } },
                },
            ];
        }

        // ELITE: Comprehensive strategy, deep understanding
        if (difficulty === "ELITE") {
            return [
                {
                    id: "AE1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.ski}}`,
                    expressionLatex: `\\text{${t.quests.rect_elite.replace("${p}", "40").replace("${ratio}", "3")}}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 75, unit: "\\text{m}^{2}" }],
                    correctLatex: `2(w+3w)=40 \\Rightarrow 8w=40 \\Rightarrow w=5, l=15 \\Rightarrow A=75`,
                    hintLatex: [`P=2(a+b)`, `a=3b`, `A=ab`],
                    visualMeta: { type: 'rectangle', params: { a: 15, b: 5 } },
                },
                {
                    id: "AE2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.sail}}`,
                    expressionLatex: `\\text{${t.quests.tri_elite.replace("${c}", "14.14")}}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 50, unit: "\\text{m}^{2}" }],
                    correctLatex: `c^{2}=b^{2}+h^{2} \\Rightarrow 200=b^{2}+h^{2}, b=h=10 \\Rightarrow A=50`,
                    hintLatex: [`A=\\frac{1}{2}bh`, `c^{2}=b^{2}+h^{2}`, `b=h`],
                    visualMeta: { type: 'triangle', params: { b: 10, h: 10 } },
                },
                {
                    id: "AE3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_messe_trap}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=10\\text{ m, }\\text{${t.labels.base} }b=20\\text{ m, }\\text{${t.labels.height} }h=15\\text{ m}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 225, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\frac{1}{2}(10+20)\\cdot 15=225`,
                    hintLatex: [`A=\\frac{1}{2}(a+b)h`],
                    visualMeta: { type: 'trapezoid', params: { a: 10, b: 20, h: 15 } },
                },
                {
                    id: "AE4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.cheese}}`,
                    expressionLatex: `\\text{${t.quests.circle_elite.replace("${c}", "31.42")}}`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 78.5, unit: "\\text{cm}^{2}" }],
                    correctLatex: `C=2\\pi r \\Rightarrow r=5 \\Rightarrow A=\\pi r^{2}\approx 78.5`,
                    hintLatex: [`C=2\\pi r`, `A=\\pi r^{2}`],
                    visualMeta: { type: 'circle', params: { r: 5 } },
                },
                {
                    id: "AE5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_sbb_platform}}`,
                    expressionLatex: `A=300\\text{ m}^{2}, a=3b`,
                    targetLatex: `P`,
                    slots: [{ id: "P", labelLatex: `P`, placeholder: t.labels.perimeter_given || "perimeter", expected: 80, unit: "m" }],
                    correctLatex: `3w\\cdot w=300 \\Rightarrow w=10, l=30 \\Rightarrow P=2(10+30)=80`,
                    hintLatex: [`A=ab`, `a=3b`, `P=2(a+b)`],
                    visualMeta: { type: 'rectangle', params: { a: 30, b: 10 } },
                },
            ];
        }
    }

    if (stage === "VOLUMES") {
        // BASIC: Direct observation, simple integers
        if (difficulty === "BASIC") {
            return [
                {
                    id: "VB1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.attic}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=4\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 64, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=4^{3}=64`,
                    hintLatex: [`V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 4 } },
                },
                {
                    id: "VB2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.crate}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=3\\text{m, }\\text{${t.labels.width} }b=4\\text{m, }\\text{${t.labels.height} }h=5\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 60, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=3\\cdot 4\\cdot 5=60`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 3, b: 4, c: 5 } },
                },
                {
                    id: "VB3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.pylon}}`,
                    expressionLatex: `\\text{${t.labels.radius} }r=2\\text{ cm, }\\text{${t.labels.height} }h=5\\text{ cm}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 63, unit: "\\text{cm}^{2}" }],
                    correctLatex: `V=\\pi r^{2}h\\approx 63`,
                    hintLatex: [`V=\\pi r^{2}h`],
                    visualMeta: { type: 'cylinder', params: { r: 2, h: 5 } },
                },
                {
                    id: "VB4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_storage}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=3\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 27, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=3^{3}=27`,
                    hintLatex: [`V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 3 } },
                },
                {
                    id: "VB5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.novartis_box}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=5\\text{m, }\\text{${t.labels.width} }b=4\\text{m, }\\text{${t.labels.height} }h=3\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 60, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=5\\cdot 4\\cdot 3=60`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 5, b: 4, c: 3 } },
                },
            ];
        }

        // CORE: Multi-step calculation
        if (difficulty === "CORE") {
            return [
                {
                    id: "VC1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.attic}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=6\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 216, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=6^{3}=216\\text{ m}^{3}`,
                    hintLatex: [`V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 6 } },
                },
                {
                    id: "VC2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_warehouse}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=8\\text{m, }\\text{${t.labels.width} }b=6\\text{m, }\\text{${t.labels.height} }h=4\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 192, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=8\\cdot 6\\cdot 4=192\\text{ m}^{3}`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 8, b: 6, c: 4 } },
                },
                {
                    id: "VC3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_water_tank}}`,
                    expressionLatex: `\\text{${t.labels.radius} }r=4\\text{m, }\\text{${t.labels.height} }h=5\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 251, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=\\pi r^{2}h\\approx 251\\text{ m}^{3}`,
                    hintLatex: [`V=\\pi r^{2}h`],
                    visualMeta: { type: 'cylinder', params: { r: 4, h: 5 } },
                },
                {
                    id: "VC4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_museum}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=7\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 343, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=7^{3}=343`,
                    hintLatex: [`V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 7 } },
                },
                {
                    id: "VC5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_sbb_cargo}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=12\\text{m, }\\text{${t.labels.width} }b=8\\text{m, }\\text{${t.labels.height} }h=3\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 288, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=12\\cdot 8\\cdot 3=288`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 12, b: 8, c: 3 } },
                },
            ];
        }

        // ADVANCED: Conditional problems
        if (difficulty === "ADVANCED") {
            return [
                {
                    id: "VA1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_storage_sa}}`,
                    expressionLatex: `SA=150\\text{ m}^{2}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 125, unit: "\\text{m}^{3}" }],
                    correctLatex: `6a^{2}=150 \\Rightarrow a=5 \\Rightarrow V=125`,
                    hintLatex: [`SA=6a^{2}`, `V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 5 } },
                },
                {
                    id: "VA2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.novartis_lab}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=6\\text{m, }\\text{${t.labels.width} }b=8\\text{m, }\\text{${t.labels.height} }h=10\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 480, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=6\\cdot 8\\cdot 10=480`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 6, b: 8, c: 10 } },
                },
                {
                    id: "VA3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_rhine_pipe}}`,
                    expressionLatex: `\\text{${t.labels.diameter_given || 'diameter'} }d=8\\text{ m, }\\text{${t.labels.height} }h=12\\text{ m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 603, unit: "\\text{m}^{3}" }],
                    correctLatex: `r=4 \\Rightarrow V=\\pi r^{2}h\\approx 603`,
                    hintLatex: [`r=d/2`, `V=\\pi r^{2}h`],
                    visualMeta: { type: 'cylinder', params: { r: 4, h: 12 } },
                },
                {
                    id: "VA4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.roche_cube}}`,
                    expressionLatex: `\\text{${t.labels.side} }a=9\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 729, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=9^{3}=729`,
                    hintLatex: [`V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 9 } },
                },
                {
                    id: "VA5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_messe_hall}}`,
                    expressionLatex: `\\text{${t.labels.length} }a=20\\text{m, }\\text{${t.labels.width} }b=15\\text{m, }\\text{${t.labels.height} }h=8\\text{m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 2400, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=20\\cdot 15\\cdot 8=2400`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 20, b: 15, c: 8 } },
                },
            ];
        }

        // ELITE: Comprehensive strategy
        if (difficulty === "ELITE") {
            return [
                {
                    id: "VE1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.attic}}`,
                    expressionLatex: `\\text{${t.quests.cube_elite.replace("${sa}", "150")}}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 125, unit: "\\text{m}^{3}" }],
                    correctLatex: `6a^{2}=150 \\Rightarrow a=5 \\Rightarrow V=5^{3}=125`,
                    hintLatex: [`SA=6a^{2}`, `V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 5 } },
                },
                {
                    id: "VE2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.crate}}`,
                    expressionLatex: `\\text{${t.quests.prism_elite.replace("${p}", "20").replace("${h}", "12")}}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 300, unit: "\\text{m}^{3}" }],
                    correctLatex: `4w=20 \\Rightarrow w=5 \\Rightarrow V=5\\cdot 5\\cdot 12=300`,
                    hintLatex: [`P=4w`, `V=w\\cdot w\\cdot h`],
                    visualMeta: { type: 'prism', params: { a: 5, b: 5, c: 12 } },
                },
                {
                    id: "VE3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.pylon}}`,
                    expressionLatex: `\\text{${t.quests.cyl_elite.replace("${la}", "314.16").replace("${r}", "5")}}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 785, unit: "\\text{cm}^{3}" }],
                    correctLatex: `LA=2\\pi rh \\Rightarrow h=10 \\Rightarrow V=\\pi r^{2}h\\approx 785`,
                    hintLatex: [`LA=2\\pi rh`, `V=\\pi r^{2}h`],
                    visualMeta: { type: 'cylinder', params: { r: 5, h: 10 } },
                },
                {
                    id: "VE4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_uni_lab_vol}}`,
                    expressionLatex: `V=1000\\text{ m}^{3}`,
                    targetLatex: `SA`,
                    slots: [{ id: "SA", labelLatex: `SA`, placeholder: t.labels.surface_area_given, expected: 600, unit: "\\text{m}^{2}" }],
                    correctLatex: `a^{3}=1000 \\Rightarrow a=10 \\Rightarrow SA=6a^{2}=600`,
                    hintLatex: [`V=a^{3}`, `SA=6a^{2}`],
                    visualMeta: { type: 'cube', params: { a: 10 } },
                },
                {
                    id: "VE5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.novartis_tank_vol}}`,
                    expressionLatex: `\\text{${t.labels.radius} }r=6\\text{ m, }V=678.6\\text{ m}^{3}`,
                    targetLatex: `h`,
                    slots: [{ id: "h", labelLatex: `h`, placeholder: t.labels.height, expected: 6, unit: "m" }],
                    correctLatex: `V=\\pi r^{2}h \\Rightarrow h=V/(\\pi r^{2})\\approx 6`,
                    hintLatex: [`V=\\pi r^{2}h`, `h=V/(\\pi r^{2})`],
                    visualMeta: { type: 'cylinder', params: { r: 6, h: 6 } },
                },
            ];
        }
    }

    if (stage === "COMPLEX") {
        // BASIC: Simple combined shapes
        if (difficulty === "BASIC") {
            return [
                {
                    id: "CB1", difficulty, stage,
                    promptLatex: `\\text{${t.mission?.protocol}}\\text{${t.mission?.title}}\\text{${t.mission?.description}}`,
                    expressionLatex: `a=a=8,\\; b=12,\\; h=5`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 50, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\\\frac{1}{2}(8+12)\\cdot 5=50`,
                    hintLatex: [`A=\\\\frac{1}{2}(a+b)h`],
                    visualMeta: { type: 'trapezoid', params: { a: 8, b: 12, h: 5 } },
                },
                {
                    id: "CB2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_park_path}}`,
                    expressionLatex: `\\text{Rectangle: }a=10,\\; b=6`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 60, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=10\\cdot 6=60`,
                    hintLatex: [`A=a\\cdot b`],
                    visualMeta: { type: 'rectangle', params: { a: 10, b: 6 } },
                },
                {
                    id: "CB3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_cathedral_roof}}`,
                    expressionLatex: `\\text{Triangle: }b=8,\\; h=6`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 24, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\\\frac{1}{2}\\cdot 8\\cdot 6=24`,
                    hintLatex: [`A=\\\\frac{1}{2}bh`],
                    visualMeta: { type: 'triangle', params: { b: 8, h: 6 } },
                },
                {
                    id: "CB4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.novartis_logo}}`,
                    expressionLatex: `\\text{Circle: }r=4`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 50.3, unit: "\\text{cm}^{2}" }],
                    correctLatex: `A=\\pi r^{2}\\approx 50.3`,
                    hintLatex: [`A=\\pi r^{2}`],
                    visualMeta: { type: 'circle', params: { r: 4 } },
                },
                {
                    id: "CB5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_storage}}`,
                    expressionLatex: `a=a=5`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 125, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=5^{3}=125`,
                    hintLatex: [`V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 5 } },
                },
            ];
        }

        // CORE: Multi-step combined problems
        if (difficulty === "CORE") {
            return [
                {
                    id: "CC1", difficulty, stage,
                    promptLatex: `\\text{${t.mission?.protocol}}\\text{${t.mission?.cube_title}}\\text{${t.mission?.cube_desc}}`,
                    expressionLatex: `a=6\\text{ m}`,
                    targetLatex: `d`,
                    slots: [{ id: "d", labelLatex: `d`, placeholder: t.labels.space_diagonal || "diagonal", expected: 10.39, unit: "m" }],
                    correctLatex: `d=a\\sqrt{3}\\approx 10.39`,
                    hintLatex: [`d=a\\sqrt{3}`],
                    visualMeta: { type: 'cube', params: { a: 6 } },
                },
                {
                    id: "CC2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_rhine_trap}}`,
                    expressionLatex: `a=a=10,\\; b=16,\\; h=8`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 104, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\\\frac{1}{2}(10+16)\\cdot 8=104`,
                    hintLatex: [`A=\\\\frac{1}{2}(a+b)h`],
                    visualMeta: { type: 'trapezoid', params: { a: 10, b: 16, h: 8 } },
                },
                {
                    id: "CC3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.roche_prism_core}}`,
                    expressionLatex: `a=a=8,\\; b=6,\\; h=10`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 480, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=8\\cdot 6\\cdot 10=480`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 8, b: 6, c: 10 } },
                },
                {
                    id: "CC4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_water_cyl_complex}}`,
                    expressionLatex: `r=r=5,\\; h=8`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 628, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=\\pi r^{2}h\\approx 628`,
                    hintLatex: [`V=\\pi r^{2}h`],
                    visualMeta: { type: 'cylinder', params: { r: 5, h: 8 } },
                },
                {
                    id: "CC5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_messe_cube}}`,
                    expressionLatex: `a=a=8`,
                    targetLatex: `SA`,
                    slots: [{ id: "SA", labelLatex: `SA`, placeholder: t.labels.surface_area_given, expected: 384, unit: "\\text{m}^{2}" }],
                    correctLatex: `SA=6a^{2}=6\\cdot 64=384`,
                    hintLatex: [`SA=6a^{2}`],
                    visualMeta: { type: 'cube', params: { a: 8 } },
                },
            ];
        }

        // ADVANCED: Complex combined problems
        if (difficulty === "ADVANCED") {
            return [
                {
                    id: "CA1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_uni_lab}}`,
                    expressionLatex: `d=12\\text{ m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 192.5, unit: "\\text{m}^{3}" }],
                    correctLatex: `d=a\\sqrt{3} \\Rightarrow a=6.93 \\Rightarrow V\\approx 192.5`,
                    hintLatex: [`d=a\\sqrt{3}`, `V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 6.93 } },
                },
                {
                    id: "CA2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.novartis_plaza}}`,
                    expressionLatex: `a=8,\\; b=16,\\; h=10`,
                    targetLatex: `A`,
                    slots: [{ id: "A", labelLatex: `A`, placeholder: t.labels.area, expected: 120, unit: "\\text{m}^{2}" }],
                    correctLatex: `A=\\\\frac{1}{2}(8+16)\\cdot 10=120`,
                    hintLatex: [`A=\\\\frac{1}{2}(a+b)h`],
                    visualMeta: { type: 'trapezoid', params: { a: 8, b: 16, h: 10 } },
                },
                {
                    id: "CA3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_rhine_cyl}}`,
                    expressionLatex: `\\text{${t.labels.diameter_given || 'diameter'} }d=10\\text{ m, }\\text{${t.labels.height} }h=15\\text{ m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 1178, unit: "\\text{m}^{3}" }],
                    correctLatex: `r=5 \\Rightarrow V=\\pi r^{2}h\\approx 1178`,
                    hintLatex: [`r=d/2`, `V=\\pi r^{2}h`],
                    visualMeta: { type: 'cylinder', params: { r: 5, h: 15 } },
                },
                {
                    id: "CA4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.roche_prism}}`,
                    expressionLatex: `\\text{${t.labels.base} }12\\times 10\\text{ m, }\\text{${t.labels.height} }20\\text{ m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 2400, unit: "\\text{m}^{3}" }],
                    correctLatex: `V=12\\cdot 10\\cdot 20=2400`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 12, b: 10, c: 20 } },
                },
                {
                    id: "CA5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_sbb_storage}}`,
                    expressionLatex: `SA=294\\text{ m}^{2}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 343, unit: "\\text{m}^{3}" }],
                    correctLatex: `6a^{2}=294 \\Rightarrow a=7 \\Rightarrow V=343`,
                    hintLatex: [`SA=6a^{2}`, `V=a^{3}`],
                    visualMeta: { type: 'cube', params: { a: 7 } },
                },
            ];
        }

        // ELITE: Comprehensive strategy problems
        if (difficulty === "ELITE") {
            return [
                {
                    id: "CE1", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_museum_vol}}`,
                    expressionLatex: `V=512\\text{ m}^{3}`,
                    targetLatex: `d`,
                    slots: [{ id: "d", labelLatex: `d`, placeholder: t.labels.space_diagonal || "diagonal", expected: 13.86, unit: "m" }],
                    correctLatex: `a^{3}=512 \\Rightarrow a=8 \\Rightarrow d=8\\sqrt{3}\\approx 13.86`,
                    hintLatex: [`V=a^{3}`, `d=a\\sqrt{3}`],
                    visualMeta: { type: 'cube', params: { a: 8 } },
                },
                {
                    id: "CE2", difficulty, stage,
                    promptLatex: `\\text{${t.quests.novartis_tank}}`,
                    expressionLatex: `LA=314.16\\text{ m}^{2}, r=5\\text{ m}`,
                    targetLatex: `V`,
                    slots: [{ id: "V", labelLatex: `V`, placeholder: t.labels.volume, expected: 785, unit: "\\text{m}^{3}" }],
                    correctLatex: `LA=2\\pi rh \\Rightarrow h=10 \\Rightarrow V=\\pi r^{2}h\\approx 785`,
                    hintLatex: [`LA=2\\pi rh`, `V=\\pi r^{2}h`],
                    visualMeta: { type: 'cylinder', params: { r: 5, h: 10 } },
                },
                {
                    id: "CE3", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_bridge_area}}`,
                    expressionLatex: `A=180\\text{ m}^{2}, a=10, b=20`,
                    targetLatex: `h`,
                    slots: [{ id: "h", labelLatex: `h`, placeholder: t.labels.height, expected: 12, unit: "m" }],
                    correctLatex: `A=\\frac{1}{2}(a+b)h \\Rightarrow 180=15h \\Rightarrow h=12`,
                    hintLatex: [`A=\\frac{1}{2}(a+b)h`],
                    visualMeta: { type: 'trapezoid', params: { a: 10, b: 20, h: 12 } },
                },
                {
                    id: "CE4", difficulty, stage,
                    promptLatex: `\\text{${t.quests.roche_prism_vol}}`,
                    expressionLatex: `V=1200\\text{ m}^{3}, \\text{base }10\\times 8\\text{ m}`,
                    targetLatex: `h`,
                    slots: [{ id: "h", labelLatex: `h`, placeholder: t.labels.height, expected: 15, unit: "m" }],
                    correctLatex: `V=abc \\Rightarrow 1200=10\\cdot 8\\cdot h \\Rightarrow h=15`,
                    hintLatex: [`V=abc`],
                    visualMeta: { type: 'prism', params: { a: 10, b: 8, c: 15 } },
                },
                {
                    id: "CE5", difficulty, stage,
                    promptLatex: `\\text{${t.quests.basel_water_cyl}}`,
                    expressionLatex: `V=1570.8\\text{ m}^{3}, h=20\\text{ m}`,
                    targetLatex: `r`,
                    slots: [{ id: "r", labelLatex: `r`, placeholder: t.labels.radius, expected: 5, unit: "m" }],
                    correctLatex: `V=\\pi r^{2}h \\Rightarrow r^{2}=V/(\\pi h) \\Rightarrow r=5`,
                    hintLatex: [`V=\\pi r^{2}h`, `r=\\sqrt{V/(\\pi h)}`],
                    visualMeta: { type: 'cylinder', params: { r: 5, h: 20 } },
                },
            ];
        }
    }

    return [];
}

export default function S101Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const sm1_01_t = {
        title: t("sm1_01.title"),
        back: t("sm1_01.back"),
        check: t("sm1_01.check"),
        next: t("sm1_01.next"),
        correct: t("sm1_01.correct"),
        incorrect: t("sm1_01.incorrect"),
        ready: t("sm1_01.ready"),
        monitor_title: t("sm1_01.monitor_title"),
        target_title: t("sm1_01.target_title"),
        objective_title: t("sm1_01.objective_title"),
        footer_left: t("sm1_01.footer_left"),
        input_tip_2dp: t("sm1_01.input_tip_2dp"),
        difficulty: {
            basic: t("sm1_01.difficulty.basic"),
            core: t("sm1_01.difficulty.core"),
            advanced: t("sm1_01.difficulty.advanced"),
            elite: t("sm1_01.difficulty.elite"),
        },
        stages: {
            areas: t("sm1_01.stages.areas"),
            volumes: t("sm1_01.stages.volumes"),
            complex: t("sm1_01.stages.complex"),
        },
        labels: {
            length: t("sm1_01.labels.length"),
            width: t("sm1_01.labels.width"),
            height: t("sm1_01.labels.height"),
            base: t("sm1_01.labels.base"),
            side: t("sm1_01.labels.side"),
            radius: t("sm1_01.labels.radius"),
            input: t("sm1_01.labels.input"),
            hints: t("sm1_01.labels.hints"),
        },
        quests: {
            ski: t("sm1_01.quests.ski"),
            sail: t("sm1_01.quests.sail"),
            gate: t("sm1_01.quests.gate"),
            cheese: t("sm1_01.quests.cheese"),
            attic: t("sm1_01.quests.attic"),
            crate: t("sm1_01.quests.crate"),
            pylon: t("sm1_01.quests.pylon"),
            rect_core: t("sm1_01.quests.rect_core"),
            rect_advanced: t("sm1_01.quests.rect_advanced"),
            rect_elite: t("sm1_01.quests.rect_elite"),
            tri_elite: t("sm1_01.quests.tri_elite"),
            circle_elite: t("sm1_01.quests.circle_elite"),
            cube_elite: t("sm1_01.quests.cube_elite"),
            prism_elite: t("sm1_01.quests.prism_elite"),
            cyl_elite: t("sm1_01.quests.cyl_elite"),
            basel_park: t("sm1_01.quests.basel_park"),
            basel_cathedral_tri: t("sm1_01.quests.basel_cathedral_tri"),
            basel_rhine_trap: t("sm1_01.quests.basel_rhine_trap"),
            basel_fountain: t("sm1_01.quests.basel_fountain"),
            roche_window: t("sm1_01.quests.roche_window"),
            novartis_trap: t("sm1_01.quests.novartis_trap"),
            basel_zoo_pond: t("sm1_01.quests.basel_zoo_pond"),
            basel_uni_court: t("sm1_01.quests.basel_uni_court"),
            basel_sbb_platform: t("sm1_01.quests.basel_sbb_platform"),
            basel_storage: t("sm1_01.quests.basel_storage"),
            novartis_box: t("sm1_01.quests.novartis_box"),
            basel_water_tank: t("sm1_01.quests.basel_water_tank"),
            basel_museum: t("sm1_01.quests.basel_museum"),
            basel_sbb_cargo: t("sm1_01.quests.basel_sbb_cargo"),
            basel_storage_sa: t("sm1_01.quests.basel_storage_sa"),
            novartis_lab: t("sm1_01.quests.novartis_lab"),
            basel_rhine_pipe: t("sm1_01.quests.basel_rhine_pipe"),
            roche_cube: t("sm1_01.quests.roche_cube"),
            basel_messe_hall: t("sm1_01.quests.basel_messe_hall"),
            basel_uni_lab: t("sm1_01.quests.basel_uni_lab"),
            novartis_plaza: t("sm1_01.quests.novartis_plaza"),
            basel_rhine_cyl: t("sm1_01.quests.basel_rhine_cyl"),
            roche_prism: t("sm1_01.quests.roche_prism"),
            basel_sbb_storage: t("sm1_01.quests.basel_sbb_storage"),
            basel_museum_vol: t("sm1_01.quests.basel_museum_vol"),
            novartis_tank: t("sm1_01.quests.novartis_tank"),
            basel_bridge_area: t("sm1_01.quests.basel_bridge_area"),
            roche_prism_vol: t("sm1_01.quests.roche_prism_vol"),
            basel_water_cyl: t("sm1_01.quests.basel_water_cyl"),
            basel_park_path: t("sm1_01.quests.basel_park_path"),
            basel_cathedral_roof: t("sm1_01.quests.basel_cathedral_roof"),
            novartis_logo: t("sm1_01.quests.novartis_logo"),
            basel_warehouse: t("sm1_01.quests.basel_warehouse"),
            basel_messe_trap: t("sm1_01.quests.basel_messe_trap"),
            basel_uni_lab_vol: t("sm1_01.quests.basel_uni_lab_vol"),
            novartis_tank_vol: t("sm1_01.quests.novartis_tank_vol"),
            roche_prism_core: t("sm1_01.quests.roche_prism_core"),
            basel_water_cyl_complex: t("sm1_01.quests.basel_water_cyl_complex"),
            basel_messe_cube: t("sm1_01.quests.basel_messe_cube"),
            realtime_geo: t("sm1_01.quests.realtime_geo"),
        },
        base_twice_height: t("sm1_01.base_twice_height"),
        mission: {
            protocol: t("sm1_01.mission.protocol"),
            title: t("sm1_01.mission.title"),
            description: t("sm1_01.mission.description"),
            cube_title: t("sm1_01.mission.cube_title"),
            cube_desc: t("sm1_01.mission.cube_desc"),
        },
    };

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(sm1_01_t, d, s), [sm1_01_t]);

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
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback
    } = useQuestManager<S101Quest, Stage>({
        moduleCode: "sm1-01",
        buildPool,
        initialStage: "AREAS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm1-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = [
        { id: "AREAS", label: sm1_01_t.stages.areas },
        { id: "VOLUMES", label: sm1_01_t.stages.volumes },
        { id: "COMPLEX", label: sm1_01_t.stages.complex },
    ];

    const userAnswer = inputs['A'] || inputs['V'] || inputs['d'] || inputs['SA'] || inputs['h'] || inputs['r'] || inputs['P'];
    const parsedAnswer = userAnswer ? parseFloat(userAnswer) : undefined;

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            title={sm1_01_t.title}
            moduleCode="SM1.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            successRate={successRate}
            footerLeft={sm1_01_t.footer_left}
            checkStatus={lastCheck}
            translations={{
                back: sm1_01_t.back,
                check: sm1_01_t.check,
                next: sm1_01_t.next,
                correct: sm1_01_t.correct,
                incorrect: sm1_01_t.incorrect,
                ready: sm1_01_t.ready,
                monitor_title: sm1_01_t.monitor_title,
                difficulty: {
                    basic: sm1_01_t.difficulty.basic,
                    core: sm1_01_t.difficulty.core,
                    advanced: sm1_01_t.difficulty.advanced,
                    elite: sm1_01_t.difficulty.elite,
                },
            }}
            monitorContent={
                <>
                    <div className="relative w-full">
                        {/* Use 3D Cube for volume stage with cube geometry */}
                        {stage === 'VOLUMES' && currentQuest?.visualMeta?.type === 'cube' ? (
                            <Cube3D
                                sideLength={currentQuest?.visualMeta?.params?.a}
                                showDiagonal={false}
                            />
                        ) : (
                            <>
                                <S101_GeometryCanvas
                                    geometry={currentQuest?.visualMeta}
                                    userAnswer={parsedAnswer}
                                    isVolumeMode={stage === 'VOLUMES'}
                                />
                                <div className="absolute top-2 right-2 text-[9px] font-mono text-white/70 pointer-events-none">
                                    {sm1_01_t.quests.realtime_geo}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                            {sm1_01_t.target_title}
                        </div>
                        <div className="text-white font-black text-xl overflow-x-auto max-w-full py-1 whitespace-nowrap">
                            <span className="inline-block">
                                <InlineMath math={currentQuest?.expressionLatex || ""} />
                            </span>
                        </div>
                        <div className="text-white/70 font-mono text-sm break-words">
                            {(() => {
                                const latex = currentQuest?.promptLatex || "";
                                // If it's a simple text wrapper, we can strip it for better wrapping
                                if (latex && latex.startsWith("\\text{") && latex.endsWith("}") && !latex.includes("=")) {
                                    return <span className="whitespace-pre-wrap">{latex.replace(/^\\text\{/, "").replace(/\}$/, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ")}</span>;
                                }
                                return <InlineMath math={latex || ""} />;
                            })()}
                        </div>
                        {currentQuest?.hintLatex && currentQuest?.hintLatex.length > 0 && (
                            <div className="space-y-2 text-white font-black text-[10px] uppercase tracking-[0.25em]">
                                <div className="text-white/90">{sm1_01_t.labels.hints}</div>
                                {currentQuest?.hintLatex.slice(0, 3).map((h, idx) => (
                                    <div key={`${currentQuest?.id}|h|${idx}`} className="flex gap-2 items-start">
                                        <div className="text-white/70 w-6">{String(idx + 1).padStart(2, "0")}</div>
                                        <div className="flex-1">
                                            <InlineMath math={h} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="text-white/70 text-[10px] font-black tracking-[0.3em] uppercase">
                            {difficulty}{" // "}S1.01{" // "}{sm1_01_t.stages[stage.toLowerCase() as keyof typeof sm1_01_t.stages]}
                        </div>
                    </div>
                </>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
                        {sm1_01_t.objective_title}
                    </h3>
                    <p className="text-3xl text-white font-black max-w-3xl mx-auto leading-tight italic whitespace-normal break-words">
                        {(() => {
                            const latex = currentQuest?.promptLatex || "";
                            // Improved logic: only use plain text if it's strictly a container for localized text
                            // and translate it properly. Variables should stay in math mode.
                            if (latex && latex.startsWith("\\text{") && latex.endsWith("}")) {
                                const clean = latex
                                    .replace(/^\\text\{/, "")
                                    .replace(/\}$/, "")
                                    .replace(/\\\\/g, "\n")
                                    .replace(/\\;/g, " ")
                                    .replace(/\\,/g, " ")
                                    .replace(/\\quad/g, "  ")
                                    .replace(/\\!/g, "");
                                return <span className="whitespace-pre-wrap font-sans not-italic text-center block w-full">{clean}</span>;
                            }
                            return <InlineMath math={latex || ""} />;
                        })()}
                    </p>
                </div>

                <div className="flex justify-center overflow-x-auto w-full">
                    <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/60 rounded-2xl text-center relative w-fit max-w-[calc(100vw-3rem)] shadow-2xl">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                        <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">
                            {sm1_01_t.target_title}
                        </span>
                        <div className="space-y-4">
                            <div className="text-white font-black text-[clamp(1.2rem,3.8vw,3.3rem)] leading-[1.2] whitespace-normal break-words">
                                {(() => {
                                    const latex = currentQuest?.expressionLatex || "";
                                    // If it contains localized text AND math, keep it in InlineMath
                                    // only strip if it's pure descriptive text
                                    if (latex && latex.startsWith("\\text{") && latex.endsWith("}") && !latex.includes("=")) {
                                        return <span className="whitespace-pre-wrap">{latex.replace(/^\\text\{/, "").replace(/\}$/, "").replace(/\\\\/g, "\n").replace(/\\;/g, " ").replace(/\\,/g, " ")}</span>;
                                    }
                                    return <InlineMath math={latex} />;
                                })()}
                            </div>
                            <div className="text-white/60 font-black">
                                <InlineMath math={currentQuest?.targetLatex || ""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full">
                <div className="space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
                        {sm1_01_t.labels.input}
                    </div>
                    <div className={clsx("grid gap-4", ((currentQuest?.slots) || []).length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="space-y-2">
                                <div className="text-[10px] uppercase tracking-[0.35em] text-white font-black">
                                    <InlineMath math={slot.labelLatex} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        value={inputs[slot.id] ?? ""}
                                        onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                        className="flex-1 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/70 font-black text-2xl text-white"
                                        placeholder={slot.placeholder}
                                        inputMode="numeric"
                                    />
                                    {slot.unit && (
                                        <div className="text-xl font-black text-white/80 min-w-[50px]">
                                            <InlineMath math={slot.unit} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-[10px] text-white/90 font-mono italic text-center">
                    {sm1_01_t.input_tip_2dp}
                </div>

            </div>
        </ChamberLayout>
    );
}
