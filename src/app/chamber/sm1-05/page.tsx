"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import RatioCanvas from "@/components/chamber/sm1-05/RatioCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "RECIPES" | "PERCENT" | "MIXTURES";

interface S106Quest extends Quest {
    stage: Stage;
    visualMode: "RECIPES" | "PERCENT" | "MIXTURES";
    visualData: any;
}

export default function SM106Page() {
    const { completeStage, currentLanguage } = useAppStore();
    const { t } = useLanguage();
    
    const sm1_05_t = {
        title: t("sm1_05.title"),
        back: t("sm1_05.back"),
        check: t("sm1_05.check"),
        next: t("sm1_05.next"),
        correct: t("sm1_05.correct"),
        incorrect: t("sm1_05.incorrect"),
        ready: t("sm1_05.ready"),
        footer_left: t("sm1_05.footer_left"),
        monitor_title: t("sm1_05.monitor_title"),
        difficulty: {
            basic: t("sm1_05.difficulty.basic"),
            core: t("sm1_05.difficulty.core"),
            advanced: t("sm1_05.difficulty.advanced"),
            elite: t("sm1_05.difficulty.elite")
        },
        stages: {
            recipes: t("sm1_05.stages.recipes"),
            percent: t("sm1_05.stages.percent"),
            mixtures: t("sm1_05.stages.mixtures")
        },
        scenarios: {
            recipes: t("sm1_05.scenarios.recipes"),
            percent: t("sm1_05.scenarios.percent"),
            mixtures: t("sm1_05.scenarios.mixtures")
        },
        prompts: {
            map_scale: t("sm1_05.prompts.map_scale"),
            total_ratio_share: t("sm1_05.prompts.total_ratio_share")
        }
    };

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): S106Quest[] => {
        const isBasic = difficulty === "BASIC";
        const isCore = difficulty === "CORE";
        const isAdv = difficulty === "ADVANCED";
        const isElite = difficulty === "ELITE";

        const quests: S106Quest[] = [];

        // --- STAGE 1: RECIPES ---
        if (stage === "RECIPES") {
            if (isBasic) {
                quests.push(
                    {
                        id: "R-B1", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Recipe: 2 eggs for 4 people. How many for 8 people?}",
                        expressionLatex: "2 \\to 4, ? \\to 8", targetLatex: "4",
                        visualData: { ingredient: "eggs", baseAmount: 2, targetAmount: 4 },
                        slots: [{ id: "ans", labelLatex: "Eggs", placeholder: "?", expected: 4 }],
                        correctLatex: "4", hintLatex: ["Double the people, double the eggs."]
                    },
                    {
                        id: "R-B2", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Recipe: 1 cup flour per cake. Needs for 3 cakes?}",
                        expressionLatex: "1 \\times 3", targetLatex: "3",
                        visualData: { ingredient: "flour", baseAmount: 1, targetAmount: 3 },
                        slots: [{ id: "ans", labelLatex: "Cups", placeholder: "?", expected: 3 }],
                        correctLatex: "3", hintLatex: ["Multiply by 3."]
                    },
                    {
                        id: "R-B3", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{3 apples cost 2 CHF. Cost of 6 apples?}",
                        expressionLatex: "3 \\to 2, 6 \\to ?", targetLatex: "4",
                        visualData: { ingredient: "eggs", baseAmount: 3, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: "Cost", placeholder: "?", expected: 4 }],
                        correctLatex: "4", hintLatex: ["Double the quantity, double the cost."]
                    },
                    {
                        id: "R-B4", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Ratio 1:2. If there are 5 of A, how many B?}",
                        expressionLatex: "1:2 \\implies 5:?", targetLatex: "10",
                        visualData: { ingredient: "cocoa", baseAmount: 5, targetAmount: 10 },
                        slots: [{ id: "ans", labelLatex: "B", placeholder: "?", expected: 10 }],
                        correctLatex: "10", hintLatex: ["Multiply by 2."]
                    },
                    {
                        id: "R-B5", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Half batch: 4 eggs usually. How many now?}",
                        expressionLatex: "4 \\div 2", targetLatex: "2",
                        visualData: { ingredient: "eggs", baseAmount: 4, targetAmount: 2 },
                        slots: [{ id: "ans", labelLatex: "Eggs", placeholder: "?", expected: 2 }],
                        correctLatex: "2", hintLatex: ["Divide by 2."]
                    }
                );
            } else if (isCore) {
                quests.push(
                    {
                        id: "R-C1", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Ratio 2:3. If A=4, what is B?}",
                        expressionLatex: "2:3 = 4:x", targetLatex: "6",
                        visualData: { ingredient: "milk", baseAmount: 4, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: "B", placeholder: "?", expected: 6 }],
                        correctLatex: "6", hintLatex: ["Scale factor is 2."]
                    },
                    {
                        id: "R-C2", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Scale 1:5. Map distance 3cm. Real distance?}",
                        expressionLatex: "1:5 \\implies 3:?", targetLatex: "15",
                        visualData: { ingredient: "flour", baseAmount: 3, targetAmount: 15 },
                        slots: [{ id: "ans", labelLatex: "Dist", placeholder: "?", expected: 15 }],
                        correctLatex: "15", hintLatex: ["Multiply by 5."]
                    },
                    {
                        id: "R-C3", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Recipe: 200g sugar for 4 people. For 6 people?}",
                        expressionLatex: "\\frac{200}{4} \\times 6", targetLatex: "300",
                        visualData: { ingredient: "sugar", baseAmount: 4, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: "Sugar", placeholder: "?", expected: 300 }],
                        correctLatex: "300", hintLatex: ["50g per person."]
                    },
                    {
                        id: "R-C4", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Simplify ratio 4:6}",
                        expressionLatex: "4:6 = ?:3", targetLatex: "2",
                        visualData: { ingredient: "eggs", baseAmount: 4, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: "A", placeholder: "?", expected: 2 }],
                        correctLatex: "2", hintLatex: ["Divide both by 2."]
                    },
                    {
                        id: "R-C5", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{A car travels 60km in 1 hour. In 3 hours?}",
                        expressionLatex: "60 \\times 3", targetLatex: "180",
                        visualData: { ingredient: "cocoa", baseAmount: 1, targetAmount: 3 },
                        slots: [{ id: "ans", labelLatex: "km", placeholder: "?", expected: 180 }],
                        correctLatex: "180", hintLatex: ["Speed is constant."]
                    }
                );
            } else if (isAdv) {
                quests.push(
                    {
                        id: "R-A1", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Ratio 2:5. If total is 14, find parts.}",
                        expressionLatex: "2x+5x=14", targetLatex: "A=4, B=10",
                        visualData: { ingredient: "milk", baseAmount: 2, targetAmount: 5 },
                        slots: [{ id: "a", labelLatex: "A", placeholder: "#", expected: 4 }, { id: "b", labelLatex: "B", placeholder: "#", expected: 10 }],
                        correctLatex: "4, 10", hintLatex: ["7 parts total. Each part is 2."]
                    },
                    {
                        id: "R-A2", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{1.5kg for 5 people. How much for 3?}",
                        expressionLatex: "\\frac{1.5}{5} \\times 3", targetLatex: "0.9",
                        visualData: { ingredient: "flour", baseAmount: 5, targetAmount: 3 },
                        slots: [{ id: "ans", labelLatex: "kg", placeholder: "?", expected: 0.9 }],
                        correctLatex: "0.9", hintLatex: ["0.3kg per person."]
                    },
                    {
                        id: "R-A3", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Scale factor 2.5. Original 4. New?}",
                        expressionLatex: "4 \\times 2.5", targetLatex: "10",
                        visualData: { ingredient: "sugar", baseAmount: 4, targetAmount: 10 },
                        slots: [{ id: "ans", labelLatex: "New", placeholder: "?", expected: 10 }],
                        correctLatex: "10", hintLatex: ["4 * 2 + 4 * 0.5"]
                    },
                    {
                        id: "R-A4", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{A:B = 3:4. B:C = 4:5. Find A:C}",
                        expressionLatex: "3:5", targetLatex: "3:5",
                        visualData: { ingredient: "eggs", baseAmount: 3, targetAmount: 5 },
                        slots: [{ id: "a", labelLatex: "A", placeholder: "#", expected: 3 }, { id: "c", labelLatex: "C", placeholder: "#", expected: 5 }],
                        correctLatex: "3:5", hintLatex: ["B matches in both ratios."]
                    },
                    {
                        id: "R-A5", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Gear Ratio 3:1. Input spins 9 times. Output?}",
                        expressionLatex: "9 \\div 3", targetLatex: "3",
                        visualData: { ingredient: "cocoa", baseAmount: 9, targetAmount: 3 },
                        slots: [{ id: "ans", labelLatex: "Spins", placeholder: "?", expected: 3 }],
                        correctLatex: "3", hintLatex: ["Output is slower."]
                    }
                );
            } else {
                // Elite
                quests.push(
                    {
                        id: "R-E1", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{A:B = 2:3. B:C = 6:5. Find A:B:C}",
                        expressionLatex: "4:6:5", targetLatex: "4:6:5",
                        visualData: { ingredient: "milk", baseAmount: 4, targetAmount: 5 },
                        slots: [{ id: "a", labelLatex: "A", placeholder: "#", expected: 4 }, { id: "b", labelLatex: "B", placeholder: "#", expected: 6 }, { id: "c", labelLatex: "C", placeholder: "#", expected: 5 }],
                        correctLatex: "4:6:5", hintLatex: ["Multiply A:B by 2 to match B."]
                    },
                    {
                        id: "R-E2", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: `\\text{${sm1_05_t.prompts.map_scale}}`,
                        expressionLatex: "4 \\times 25000", targetLatex: "1",
                        visualData: { ingredient: "flour", baseAmount: 1, targetAmount: 1 },
                        slots: [{ id: "ans", labelLatex: "km", placeholder: "?", expected: 1 }],
                        correctLatex: "1", hintLatex: ["100,000cm = 1km."]
                    },
                    {
                        id: "R-E3", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: `\\text{${sm1_05_t.prompts.total_ratio_share}}`,
                        expressionLatex: "\\frac{4}{9} \\times 360", targetLatex: "160",
                        visualData: { ingredient: "sugar", baseAmount: 2, targetAmount: 4 },
                        slots: [{ id: "ans", labelLatex: "Share", placeholder: "?", expected: 160 }],
                        correctLatex: "160", hintLatex: ["Total parts = 9. 360/9 = 40."]
                    },
                    {
                        id: "R-E4", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Inverse proportion. 4 workers take 6h. 3 workers take?}",
                        expressionLatex: "4 \\times 6 = 24h \\text{ total}", targetLatex: "8",
                        visualData: { ingredient: "eggs", baseAmount: 4, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: "Hours", placeholder: "?", expected: 8 }],
                        correctLatex: "8", hintLatex: ["Constant product."]
                    },
                    {
                        id: "R-E5", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: "\\text{Pumps A, B fill tank in 6h. A alone in 10h. B alone?}",
                        expressionLatex: "\\frac{1}{6} - \\frac{1}{10}", targetLatex: "15",
                        visualData: { ingredient: "cocoa", baseAmount: 6, targetAmount: 10 },
                        slots: [{ id: "ans", labelLatex: "Hours", placeholder: "?", expected: 15 }],
                        correctLatex: "15", hintLatex: ["Subtract rates."]
                    }
                );
            }
        }

        // --- STAGE 2: PERCENT ---
        if (stage === "PERCENT") {
            if (isBasic) {
                quests.push(
                    {
                        id: "P-B1", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{What is } 50\\% \\text{ of } 100?",
                        expressionLatex: "0.5 \\times 100", targetLatex: "50",
                        visualData: { percentage: 50, totalValue: 100 },
                        slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 50 }],
                        correctLatex: "50", hintLatex: ["Half of 100."]
                    },
                    {
                        id: "P-B2", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{What is } 25\\% \\text{ of } 100?",
                        expressionLatex: "0.25 \\times 100", targetLatex: "25",
                        visualData: { percentage: 25, totalValue: 100 },
                        slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 25 }],
                        correctLatex: "25", hintLatex: ["Quarter of 100."]
                    },
                    {
                        id: "P-B3", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Convert } \\frac{1}{2} \\text{ to } \\%",
                        expressionLatex: "1 \\div 2", targetLatex: "50",
                        visualData: { percentage: 50, totalValue: 100 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 50 }],
                        correctLatex: "50", hintLatex: ["Half is 50 percent."]
                    },
                    {
                        id: "P-B4", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{What is } 10\\% \\text{ of } 200?",
                        expressionLatex: "0.1 \\times 200", targetLatex: "20",
                        visualData: { percentage: 10, totalValue: 200, partValue: 20 },
                        slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 20 }],
                        correctLatex: "20", hintLatex: ["Move decimal one left."]
                    },
                    {
                        id: "P-B5", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Convert } 0.75 \\text{ to } \\%",
                        expressionLatex: "0.75 \\times 100", targetLatex: "75",
                        visualData: { percentage: 75, totalValue: 100 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 75 }],
                        correctLatex: "75", hintLatex: ["Multiply by 100."]
                    }
                );
            } else if (isCore) {
                quests.push(
                    {
                        id: "P-C1", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{What is } 20\\% \\text{ of } 50?",
                        expressionLatex: "0.2 \\times 50", targetLatex: "10",
                        visualData: { percentage: 20, totalValue: 50, partValue: 10 },
                        slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 10 }],
                        correctLatex: "10", hintLatex: ["10% is 5. Double it."]
                    },
                    {
                        id: "P-C2", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{30 is what } \\% \\text{ of } 60?",
                        expressionLatex: "30/60", targetLatex: "50",
                        visualData: { percentage: 50, totalValue: 60, partValue: 30 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 50 }],
                        correctLatex: "50", hintLatex: ["It is half."]
                    },
                    {
                        id: "P-C3", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Find } 15\\% \\text{ of } 200",
                        expressionLatex: "30", targetLatex: "30",
                        visualData: { percentage: 15, totalValue: 200, partValue: 30 },
                        slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 30 }],
                        correctLatex: "30", hintLatex: ["10% is 20, 5% is 10."]
                    },
                    {
                        id: "P-C4", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Simplify } \\frac{8}{20} \\text{ to } \\%",
                        expressionLatex: "40", targetLatex: "40",
                        visualData: { percentage: 40, totalValue: 50, partValue: 20 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 40 }],
                        correctLatex: "40", hintLatex: ["Multiply denominator to 100."]
                    },
                    {
                        id: "P-C5", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Increase 50 by } 10\\%",
                        expressionLatex: "50 + 5", targetLatex: "55",
                        visualData: { percentage: 10, totalValue: 50, partValue: 5 },
                        slots: [{ id: "ans", labelLatex: "New Value", placeholder: "?", expected: 55 }],
                        correctLatex: "55", hintLatex: ["Find 10% first."]
                    }
                );
            } else if (isAdv) {
                quests.push(
                    {
                        id: "P-A1", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Decrease 80 by } 15\\%",
                        expressionLatex: "15\\% = 12", targetLatex: "68",
                        visualData: { percentage: 15, totalValue: 80, partValue: 12 },
                        slots: [{ id: "ans", labelLatex: "Result", placeholder: "?", expected: 68 }],
                        correctLatex: "68", hintLatex: ["80 - 12"]
                    },
                    {
                        id: "P-A2", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Price is 120 CHF. 20\\% Discount.}",
                        expressionLatex: "120 \\times 0.8", targetLatex: "96",
                        visualData: { percentage: 80, totalValue: 120, partValue: 96 },
                        slots: [{ id: "ans", labelLatex: "Price", placeholder: "?", expected: 96 }],
                        correctLatex: "96", hintLatex: ["Discount is 24."]
                    },
                    {
                        id: "P-A3", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Find } 12.5\\% \\text{ of } 80",
                        expressionLatex: "1/8 \\times 80", targetLatex: "10",
                        visualData: { percentage: 12.5, totalValue: 80, partValue: 10 },
                        slots: [{ id: "ans", labelLatex: "Value", placeholder: "?", expected: 10 }],
                        correctLatex: "10", hintLatex: ["1/8th."]
                    },
                    {
                        id: "P-A4", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{35 is } 70\\% \\text{ of what?}",
                        expressionLatex: "35 / 0.7", targetLatex: "50",
                        visualData: { percentage: 70, totalValue: 50, partValue: 35 },
                        slots: [{ id: "ans", labelLatex: "Total", placeholder: "?", expected: 50 }],
                        correctLatex: "50", hintLatex: ["Divide part by percent."]
                    },
                    {
                        id: "P-A5", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Increase 200 by } 2.5\\%",
                        expressionLatex: "200 + 5", targetLatex: "205",
                        visualData: { percentage: 2.5, totalValue: 200, partValue: 5 },
                        slots: [{ id: "ans", labelLatex: "Result", placeholder: "?", expected: 205 }],
                        correctLatex: "205", hintLatex: ["1% is 2."]
                    }
                );
            } else {
                // Elite
                quests.push(
                    {
                        id: "P-E1", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Price after +20\\% tax is 144. Original price?}",
                        expressionLatex: "120 \\times 1.2 = 144", targetLatex: "120",
                        visualData: { percentage: 120, totalValue: 120, partValue: 144 },
                        slots: [{ id: "ans", labelLatex: "Orig", placeholder: "?", expected: 120 }],
                        correctLatex: "120", hintLatex: ["Divide by 1.2."]
                    },
                    {
                        id: "P-E2", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Compound Interest: 1000 at 10\\% for 2 years (simple comp).}",
                        expressionLatex: "1000 \\times 1.1 \\times 1.1", targetLatex: "1210",
                        visualData: { percentage: 10, totalValue: 1000, partValue: 1210 },
                        slots: [{ id: "ans", labelLatex: "Final", placeholder: "?", expected: 1210 }],
                        correctLatex: "1210", hintLatex: ["1100 after 1 year."]
                    },
                    {
                        id: "P-E3", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Stock drops 20\\% then rises 25\\%. Net change?}",
                        expressionLatex: "100 \\times 0.8 \\times 1.25 = 100", targetLatex: "0",
                        visualData: { percentage: 0, totalValue: 100, partValue: 100 },
                        slots: [{ id: "ans", labelLatex: "% Change", placeholder: "?", expected: 0 }],
                        correctLatex: "0", hintLatex: ["It breaks even."]
                    },
                    {
                        id: "P-E4", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{What \\% of 1 hour is 2 mins 24 secs?}",
                        expressionLatex: "144s / 3600s", targetLatex: "4",
                        visualData: { percentage: 4, totalValue: 3600, partValue: 144 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 4 }],
                        correctLatex: "4", hintLatex: ["Convert all to seconds."]
                    },
                    {
                        id: "P-E5", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: "\\text{Population 5000 increases to 6000. % Increase?}",
                        expressionLatex: "1000/5000", targetLatex: "20",
                        visualData: { percentage: 20, totalValue: 5000, partValue: 6000 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 20 }],
                        correctLatex: "20", hintLatex: ["Difference / Original"]
                    }
                );
            }
        }

        // --- STAGE 3: MIXTURES ---
        if (stage === "MIXTURES") {
            if (isBasic) {
                quests.push(
                    { id: "M-B1", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{20ml Syrup + 80ml Water. Concentration?}", expressionLatex: "\\frac{20}{100}", targetLatex: "20", visualData: { solute: 20, solvent: 80, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 20 }], correctLatex: "20", hintLatex: ["Total volume 100ml."] },
                    { id: "M-B2", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{10g Salt in 90g Water. %?}", expressionLatex: "\\frac{10}{100}", targetLatex: "10", visualData: { solute: 10, solvent: 90, hideResult: true, soluteColor: "#f4f4f5", solventColor: "#3b82f6" }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 10 }], correctLatex: "10", hintLatex: ["Total mass 100g."] },
                    { id: "M-B3", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{50ml Juice + 50ml Water. %?}", expressionLatex: "\\frac{50}{100}", targetLatex: "50", visualData: { solute: 50, solvent: 50, hideResult: true, soluteColor: "#eab308" }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 50 }], correctLatex: "50", hintLatex: ["Half and half."] },
                    { id: "M-B4", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{30ml Red + 70ml Blue. % Red?}", expressionLatex: "\\frac{30}{100}", targetLatex: "30", visualData: { solute: 30, solvent: 70, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 30 }], correctLatex: "30", hintLatex: ["30 out of 100."] },
                    { id: "M-B5", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{0ml Solute + 100ml Water. %?}", expressionLatex: "0", targetLatex: "0", visualData: { solute: 0, solvent: 100, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 0 }], correctLatex: "0", hintLatex: ["Pure solvent."] }
                );
            } else if (isCore) {
                quests.push(
                    { id: "M-C1", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{25g Solute in 75g Solvent. %?}", expressionLatex: "\\frac{25}{100}", targetLatex: "25", visualData: { solute: 25, solvent: 75, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 25 }], correctLatex: "25", hintLatex: ["Total 100g."] },
                    { id: "M-C2", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{20ml in 180ml Water. %?}", expressionLatex: "\\frac{20}{200}", targetLatex: "10", visualData: { solute: 20, solvent: 180, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 10 }], correctLatex: "10", hintLatex: ["Total 200ml."] },
                    { id: "M-C3", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{40ml in 160ml Water. %?}", expressionLatex: "\\frac{40}{200}", targetLatex: "20", visualData: { solute: 40, solvent: 160, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 20 }], correctLatex: "20", hintLatex: ["Double the percent calculation."] },
                    { id: "M-C4", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Total 500ml. 10\\% is Solute. Solute Volume?}", expressionLatex: "50", targetLatex: "50", visualData: { solute: 50, solvent: 450, hideResult: false }, slots: [{ id: "ans", labelLatex: "ml", placeholder: "?", expected: 50 }], correctLatex: "50", hintLatex: ["500 * 0.1"] },
                    { id: "M-C5", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Total 200g. 5\\% Concentration. Solute Mass?}", expressionLatex: "10", targetLatex: "10", visualData: { solute: 10, solvent: 190, hideResult: false }, slots: [{ id: "ans", labelLatex: "g", placeholder: "?", expected: 10 }], correctLatex: "10", hintLatex: ["200 * 0.05"] }
                );
            } else if (isAdv) {
                quests.push(
                    { id: "M-A1", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Add 10g Salt to 40g Water. %?}", expressionLatex: "10/50", targetLatex: "20", visualData: { solute: 10, solvent: 40, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 20 }], correctLatex: "20", hintLatex: ["Total 50g."] },
                    { id: "M-A2", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Add 50ml to 150ml. %?}", expressionLatex: "50/200", targetLatex: "25", visualData: { solute: 50, solvent: 150, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 25 }], correctLatex: "25", hintLatex: ["Quarter."] },
                    { id: "M-A3", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Dilute 100ml (50\\%) with 100ml Water. New %?}", expressionLatex: "50g / 200ml", targetLatex: "25", visualData: { solute: 50, solvent: 150, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 25 }], correctLatex: "25", hintLatex: ["Volume doubles, concentration halves."] },
                    { id: "M-A4", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Need 10\\% solution. Have 20g solute. How much water?}", expressionLatex: "20/Total=0.1", targetLatex: "180", visualData: { solute: 20, solvent: 180, hideResult: false }, slots: [{ id: "ans", labelLatex: "Water", placeholder: "?", expected: 180 }], correctLatex: "180", hintLatex: ["Total must be 200. 200-20=180."] },
                    { id: "M-A5", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Mix 100g (10\\%) and 100g (20\\%). New %?}", expressionLatex: "15", targetLatex: "15", visualData: { solute: 30, solvent: 170, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 15 }], correctLatex: "15", hintLatex: ["Average of 10 and 20."] }
                );
            } else {
                // Elite
                quests.push(
                    { id: "M-E1", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Mix 200g (10\\%) and 300g (20\\%). New %?}", expressionLatex: "(20+60)/500", targetLatex: "16", visualData: { solute: 80, solvent: 420, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 16 }], correctLatex: "16", hintLatex: ["Total solute 80g. Total mass 500g."] },
                    { id: "M-E2", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Evaporate 100g water from 200g (10\\%) solution. New %?}", expressionLatex: "20/100", targetLatex: "20", visualData: { solute: 20, solvent: 80, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 20 }], correctLatex: "20", hintLatex: ["Solute stays 20g. Total becomes 100g."] },
                    { id: "M-E3", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{How much water to add to 50g (40\\%) to get 10\\%?}", expressionLatex: "20/X = 0.1", targetLatex: "150", visualData: { solute: 20, solvent: 180, hideResult: true }, slots: [{ id: "ans", labelLatex: "Add", placeholder: "?", expected: 150 }], correctLatex: "150", hintLatex: ["Solute 20g. Need total 200g. Current 50g."] },
                    { id: "M-E4", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Mix X g (0\\%) with 100g (20\\%) to get 10\\%}", expressionLatex: "20/(100+X)=0.1", targetLatex: "100", visualData: { solute: 20, solvent: 180, hideResult: true }, slots: [{ id: "ans", labelLatex: "Add", placeholder: "?", expected: 100 }], correctLatex: "100", hintLatex: ["Dilute by half."] },
                    { id: "M-E5", difficulty, stage, visualMode: "MIXTURES", promptLatex: "\\text{Concentration C=20\\%. Add 50g solute to 200g. New C%?}", expressionLatex: "(40+50)/250", targetLatex: "36", visualData: { solute: 90, solvent: 160, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: "?", expected: 36 }], correctLatex: "36", hintLatex: ["Orig solute 40g. New solute 90g. Total 250g."] }
                );
            }
        }

        return quests;
    }, []);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

    const {
        currentQuest,
        difficulty,
        stage,
        lastCheck,
        inputs,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        getHint,
        currentStageStats,
    } = useQuestManager<S106Quest, Stage>({
        buildPool,
        initialStage: "RECIPES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm1-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "RECIPES", label: sm1_05_t.stages.recipes },
        { id: "PERCENT", label: sm1_05_t.stages.percent },
        { id: "MIXTURES", label: sm1_05_t.stages.mixtures },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SM1.05"
            title={sm1_05_t.title}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sm1_05_t.footer_left}
            translations={{
                back: sm1_05_t.back,
                check: sm1_05_t.check,
                next: sm1_05_t.next,
                correct: sm1_05_t.correct,
                incorrect: sm1_05_t.incorrect,
                ready: sm1_05_t.ready,
                monitor_title: sm1_05_t.monitor_title,
                difficulty: {
                    basic: sm1_05_t.difficulty.basic,
                    core: sm1_05_t.difficulty.core,
                    advanced: sm1_05_t.difficulty.advanced,
                    elite: sm1_05_t.difficulty.elite,
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        {currentQuest ? (
                            <RatioCanvas
                                mode={currentQuest.visualMode}
                                quest={currentQuest}
                                language={currentLanguage}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white/50 italic">
                                Initializing laboratory...
                            </div>
                        )}
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>Sequence Progress</span>
                            <span>{currentStageStats?.correct % 6} / 5</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-neon-cyan shadow-[0_0_5px_cyan]" : "bg-transparent"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                                Laboratory Objective
                            </h3>
                            <div className="text-4xl text-white font-black leading-tight">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    Mathematical Expression
                                </span>
                                <div className="text-5xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    Data Input Terminals
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-xs space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">NODE_{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/20 transition-all blur-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {lastCheck && (
                                        <motion.div
                                            key={lastCheck.ok ? "correct" : "incorrect"}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${lastCheck.ok
                                                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                                                    }`}>
                                                    {lastCheck.ok ? "✓" : "✗"}
                                                </div>
                                                <div>
                                                    <div className="font-black text-lg tracking-widest uppercase italic">
                                                        {lastCheck.ok ? "Verification Successful" : "Data Mismatch"}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? "Identity confirmed. Proceeding to next node." : "Please recalibrate input parameters."}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Hint:</span>
                                                    <div className="text-white font-bold">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    Execute Next Sequence
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ChamberLayout>
    );
}
