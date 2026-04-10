"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import RatioCanvas from "@/components/chamber/sm1-05/RatioCanvas";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { motion } from "framer-motion";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import type { S105Quest, SM105Stage } from "@/lib/sm1-05/types";
import { createSM105FeedbackProvider } from "@/lib/sm1-05/provider";

type Stage = SM105Stage;

export default function SM105Page() {
    const { completeStage, currentLanguage } = useAppStore();
    const { t } = useLanguage();
    const feedbackContentProvider = useMemo(() => createSM105FeedbackProvider(t), [t]);

    // Translation object for SM1.05
    const sm1_05_t = useMemo(() => ({
        title: t("sm1_05.title"),
        back: t("sm1_05.back"),
        check: t("sm1_05.check"),
        next: t("sm1_05.next"),
        correct: t("sm1_05.correct"),
        incorrect: t("sm1_05.incorrect"),
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
        labels: {
            ratio: t("sm1_05.labels.ratio"),
            proportion: t("sm1_05.labels.proportion"),
            percentage: t("sm1_05.labels.percentage"),
            concentration: t("sm1_05.labels.concentration"),
            solute: t("sm1_05.labels.solute"),
            solvent: t("sm1_05.labels.solvent"),
            eggs: t("sm1_05.labels.eggs"),
            flour: t("sm1_05.labels.flour"),
            sugar: t("sm1_05.labels.sugar"),
            milk: t("sm1_05.labels.milk"),
            cocoa: t("sm1_05.labels.cocoa"),
            dist: t("sm1_05.labels.dist"),
            cups: t("sm1_05.labels.cups"),
            cost: t("sm1_05.labels.cost"),
            share: t("sm1_05.labels.share"),
            result: t("sm1_05.labels.result"),
            hours: t("sm1_05.labels.hours"),
            spins: t("sm1_05.labels.spins"),
            base_batch: t("sm1_05.labels.base_batch"),
            target_batch: t("sm1_05.labels.target_batch"),
            water: t("sm1_05.labels.water"),
            capacity: t("sm1_05.labels.capacity"),
            logic_framework: t("sm1_05.labels.logic_framework")
        },
        prompts: {
            map_scale: t("sm1_05.prompts.map_scale"),
            total_ratio_share: t("sm1_05.prompts.total_ratio_share"),
            recipe_eggs: t("sm1_05.prompts.recipe_eggs"),
            recipe_flour: t("sm1_05.prompts.recipe_flour"),
            recipe_cost: t("sm1_05.prompts.recipe_cost"),
            recipe_ratio_ab: t("sm1_05.prompts.recipe_ratio_ab"),
            recipe_half: t("sm1_05.prompts.recipe_half"),
            recipe_ratio_23: t("sm1_05.prompts.recipe_ratio_23"),
            recipe_map_cm: t("sm1_05.prompts.recipe_map_cm"),
            recipe_sugar: t("sm1_05.prompts.recipe_sugar"),
            recipe_simplify: t("sm1_05.prompts.recipe_simplify"),
            recipe_speed: t("sm1_05.prompts.recipe_speed"),
            recipe_total_parts: t("sm1_05.prompts.recipe_total_parts"),
            recipe_unitary: t("sm1_05.prompts.recipe_unitary"),
            recipe_scale_factor: t("sm1_05.prompts.recipe_scale_factor"),
            recipe_chain_ratio: t("sm1_05.prompts.recipe_chain_ratio"),
            recipe_gears: t("sm1_05.prompts.recipe_gears"),
            recipe_chain_ratio_ABC: t("sm1_05.prompts.recipe_chain_ratio_ABC"),
            recipe_inverse_proportion: t("sm1_05.prompts.recipe_inverse_proportion"),
            recipe_pumps: t("sm1_05.prompts.recipe_pumps"),
            percent_50_100: t("sm1_05.prompts.percent_50_100"),
            percent_25_100: t("sm1_05.prompts.percent_25_100"),
            percent_frac_half: t("sm1_05.prompts.percent_frac_half"),
            percent_10_200: t("sm1_05.prompts.percent_10_200"),
            percent_dec_75: t("sm1_05.prompts.percent_dec_75"),
            percent_20_50: t("sm1_05.prompts.percent_20_50"),
            percent_find_pct: t("sm1_05.prompts.percent_find_pct"),
            percent_calc_15_200: t("sm1_05.prompts.percent_calc_15_200"),
            percent_frac_8_20: t("sm1_05.prompts.percent_frac_8_20"),
            percent_increase_50: t("sm1_05.prompts.percent_increase_50"),
            percent_decrease_80: t("sm1_05.prompts.percent_decrease_80"),
            percent_discount: t("sm1_05.prompts.percent_discount"),
            percent_calc_125: t("sm1_05.prompts.percent_calc_125"),
            percent_find_total: t("sm1_05.prompts.percent_find_total"),
            percent_increase_200: t("sm1_05.prompts.percent_increase_200"),
            percent_tax: t("sm1_05.prompts.percent_tax"),
            percent_compound: t("sm1_05.prompts.percent_compound"),
            percent_net_change: t("sm1_05.prompts.percent_net_change"),
            percent_time_pct: t("sm1_05.prompts.percent_time_pct"),
            percent_pop_increase: t("sm1_05.prompts.percent_pop_increase"),
            mix_syrup: t("sm1_05.prompts.mix_syrup"),
            mix_salt: t("sm1_05.prompts.mix_salt"),
            mix_juice: t("sm1_05.prompts.mix_juice"),
            mix_colors: t("sm1_05.prompts.mix_colors"),
            mix_zero: t("sm1_05.prompts.mix_zero"),
            mix_25g: t("sm1_05.prompts.mix_25g"),
            mix_20ml: t("sm1_05.prompts.mix_20ml"),
            mix_40ml: t("sm1_05.prompts.mix_40ml"),
            mix_find_solute: t("sm1_05.prompts.mix_find_solute"),
            mix_find_mass: t("sm1_05.prompts.mix_find_mass"),
            mix_add_10g: t("sm1_05.prompts.mix_add_10g"),
            mix_add_50ml: t("sm1_05.prompts.mix_add_50ml"),
            mix_dilute: t("sm1_05.prompts.mix_dilute"),
            mix_find_water: t("sm1_05.prompts.mix_find_water"),
            mix_avg: t("sm1_05.prompts.mix_avg"),
            mix_weighted: t("sm1_05.prompts.mix_weighted"),
            mix_evaporate: t("sm1_05.prompts.mix_evaporate"),
            mix_how_much_add: t("sm1_05.prompts.mix_how_much_add"),
            mix_inverse: t("sm1_05.prompts.mix_inverse"),
            mix_final_challenge: t("sm1_05.prompts.mix_final_challenge")
        },
        hints: {
            recipe_double: t("sm1_05.hints.recipe_double"),
            recipe_triple: t("sm1_05.hints.recipe_triple"),
            recipe_halve: t("sm1_05.hints.recipe_halve"),
            recipe_scale_factor: t("sm1_05.hints.recipe_scale_factor"),
            recipe_match_both_ratios: t("sm1_05.hints.recipe_match_both_ratios"),
            recipe_output_slower: t("sm1_05.hints.recipe_output_slower"),
            recipe_double_ab_to_match_b: t("sm1_05.hints.recipe_double_ab_to_match_b"),
            map_hundred_thousand_cm_km: t("sm1_05.hints.map_hundred_thousand_cm_km"),
            recipe_50g_person: t("sm1_05.hints.recipe_50g_person"),
            recipe_simplify: t("sm1_05.hints.recipe_simplify"),
            recipe_7_parts: t("sm1_05.hints.recipe_7_parts"),
            recipe_300g_person: t("sm1_05.hints.recipe_300g_person"),
            recipe_constant_product: t("sm1_05.hints.recipe_constant_product"),
            recipe_subtract_rates: t("sm1_05.hints.recipe_subtract_rates"),
            percent_half: t("sm1_05.hints.percent_half"),
            percent_quarter: t("sm1_05.hints.percent_quarter"),
            percent_decimal: t("sm1_05.hints.percent_decimal"),
            percent_multiply_by_100: t("sm1_05.hints.percent_multiply_by_100"),
            percent_ten_is_20_five_is_10: t("sm1_05.hints.percent_ten_is_20_five_is_10"),
            percent_multiply_to_100: t("sm1_05.hints.percent_multiply_to_100"),
            percent_subtract_80_12: t("sm1_05.hints.percent_subtract_80_12"),
            percent_discount_24: t("sm1_05.hints.percent_discount_24"),
            percent_one_eighth_of_value: t("sm1_05.hints.percent_one_eighth_of_value"),
            percent_divide_part_by_percent: t("sm1_05.hints.percent_divide_part_by_percent"),
            percent_one_is_2: t("sm1_05.hints.percent_one_is_2"),
            percent_divide_by_1_2: t("sm1_05.hints.percent_divide_by_1_2"),
            percent_break_even: t("sm1_05.hints.percent_break_even"),
            percent_diff_over_original: t("sm1_05.hints.percent_diff_over_original"),
            percent_comp_1year: t("sm1_05.hints.percent_comp_1year"),
            percent_sec: t("sm1_05.hints.percent_sec"),
            mix_total_100: t("sm1_05.hints.mix_total_100"),
            mix_total_mass_100g: t("sm1_05.hints.mix_total_mass_100g"),
            mix_30_out_of_100: t("sm1_05.hints.mix_30_out_of_100"),
            mix_pure_solvent: t("sm1_05.hints.mix_pure_solvent"),
            mix_total_100g: t("sm1_05.hints.mix_total_100g"),
            mix_total_200ml: t("sm1_05.hints.mix_total_200ml"),
            mix_double_percent_calculation: t("sm1_05.hints.mix_double_percent_calculation"),
            mix_500_times_0_1: t("sm1_05.hints.mix_500_times_0_1"),
            mix_200_times_0_05: t("sm1_05.hints.mix_200_times_0_05"),
            mix_total_50g: t("sm1_05.hints.mix_total_50g"),
            mix_total_200: t("sm1_05.hints.mix_total_200"),
            mix_total_200_minus_20: t("sm1_05.hints.mix_total_200_minus_20"),
            mix_total_solute_80_total_500: t("sm1_05.hints.mix_total_solute_80_total_500"),
            mix_solute_stays_20_total_100: t("sm1_05.hints.mix_solute_stays_20_total_100"),
            mix_need_total_200: t("sm1_05.hints.mix_need_total_200"),
            mix_dilute_by_half: t("sm1_05.hints.mix_dilute_by_half"),
            mix_original_solute_40_total_250: t("sm1_05.hints.mix_original_solute_40_total_250"),
            mix_dilute: t("sm1_05.hints.mix_dilute"),
            mix_avg: t("sm1_05.hints.mix_avg")
        }
    }), [t]);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): S105Quest[] => {
        const isBasic = difficulty === "BASIC";
        const isCore = difficulty === "CORE";
        const isAdv = difficulty === "ADVANCED";

        const quests: S105Quest[] = [];

        // --- STAGE 1: RECIPES ---
        if (stage === "RECIPES") {
            if (isBasic) {
                quests.push(
                    {
                        id: "R-B1", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_eggs,
                        expressionLatex: "2 \\to 4, \\; ? \\to 8", targetLatex: "4",
                        visualData: { ingredient: "eggs", baseAmount: 2, targetAmount: 4 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.eggs, placeholder: t("sm1_05.placeholders.question"), expected: 4 }],
                        correctLatex: "4", hintLatex: [sm1_05_t.hints.recipe_double]
                    },
                    {
                        id: "R-B2", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_flour,
                        expressionLatex: "1 \\times 3", targetLatex: "3",
                        visualData: { ingredient: "flour", baseAmount: 1, targetAmount: 3 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.cups, placeholder: t("sm1_05.placeholders.question"), expected: 3 }],
                        correctLatex: "3", hintLatex: [sm1_05_t.hints.recipe_triple]
                    },
                    {
                        id: "R-B3", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_cost,
                        expressionLatex: "3 \\to 2, \\; 6 \\to ?", targetLatex: "4",
                        visualData: { ingredient: "eggs", baseAmount: 3, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.cost, placeholder: t("sm1_05.placeholders.question"), expected: 4 }],
                        correctLatex: "4", hintLatex: [sm1_05_t.hints.recipe_double]
                    },
                    {
                        id: "R-B4", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_ratio_ab,
                        expressionLatex: "1:2 \\implies 5:?", targetLatex: "10",
                        visualData: { ingredient: "cocoa", baseAmount: 5, targetAmount: 10 },
                        slots: [{ id: "ans", labelLatex: "B", placeholder: t("sm1_05.placeholders.question"), expected: 10 }],
                        correctLatex: "10", hintLatex: [sm1_05_t.hints.recipe_double]
                    },
                    {
                        id: "R-B5", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_half,
                        expressionLatex: "4 \\div 2", targetLatex: "2",
                        visualData: { ingredient: "eggs", baseAmount: 4, targetAmount: 2 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.eggs, placeholder: t("sm1_05.placeholders.question"), expected: 2 }],
                        correctLatex: "2", hintLatex: [sm1_05_t.hints.recipe_halve]
                    }
                );
            } else if (isCore) {
                quests.push(
                    {
                        id: "R-C1", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_ratio_23,
                        expressionLatex: "2:3 = 4:x", targetLatex: "6",
                        visualData: { ingredient: "milk", baseAmount: 4, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: "B", placeholder: t("sm1_05.placeholders.question"), expected: 6 }],
                        correctLatex: "6", hintLatex: [sm1_05_t.hints.recipe_scale_factor]
                    },
                    {
                        id: "R-C2", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_map_cm,
                        expressionLatex: "1:5 \\implies 3:?", targetLatex: "15",
                        visualData: { ingredient: "flour", baseAmount: 3, targetAmount: 15 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.dist, placeholder: t("sm1_05.placeholders.question"), expected: 15 }],
                        correctLatex: "15", hintLatex: [sm1_05_t.hints.recipe_triple]
                    },
                    {
                        id: "R-C3", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_sugar,
                        expressionLatex: "\\frac{200}{4} \\times 6", targetLatex: "300",
                        visualData: { ingredient: "sugar", baseAmount: 4, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.sugar, placeholder: t("sm1_05.placeholders.question"), expected: 300 }],
                        correctLatex: "300", hintLatex: [sm1_05_t.hints.recipe_50g_person]
                    },
                    {
                        id: "R-C4", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_simplify,
                        expressionLatex: "4:6 = ?:3", targetLatex: "2",
                        visualData: { ingredient: "eggs", baseAmount: 4, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: "A", placeholder: t("sm1_05.placeholders.question"), expected: 2 }],
                        correctLatex: "2", hintLatex: [sm1_05_t.hints.recipe_simplify]
                    },
                    {
                        id: "R-C5", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_speed,
                        expressionLatex: "60 \\times 3", targetLatex: "180",
                        visualData: { ingredient: "cocoa", baseAmount: 1, targetAmount: 3 },
                        slots: [{ id: "ans", labelLatex: "km", placeholder: t("sm1_05.placeholders.question"), expected: 180 }],
                        correctLatex: "180", hintLatex: [sm1_05_t.hints.recipe_triple]
                    }
                );
            } else if (isAdv) {
                quests.push(
                    {
                        id: "R-A1", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_total_parts,
                        expressionLatex: "2x+5x=14", targetLatex: "A=4, B=10",
                        visualData: { ingredient: "milk", baseAmount: 2, targetAmount: 5 },
                        slots: [{ id: "a", labelLatex: "A", placeholder: t("sm1_05.placeholders.hash"), expected: 4 }, { id: "b", labelLatex: "B", placeholder: t("sm1_05.placeholders.hash"), expected: 10 }],
                        correctLatex: "4, 10", hintLatex: [sm1_05_t.hints.recipe_7_parts]
                    },
                    {
                        id: "R-A2", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_unitary,
                        expressionLatex: "\\frac{1.5}{5} \\times 3", targetLatex: "0.9",
                        visualData: { ingredient: "flour", baseAmount: 5, targetAmount: 3 },
                        slots: [{ id: "ans", labelLatex: "kg", placeholder: t("sm1_05.placeholders.question"), expected: 0.9 }],
                        correctLatex: "0.9", hintLatex: [sm1_05_t.hints.recipe_300g_person]
                    },
                    {
                        id: "R-A3", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_scale_factor,
                        expressionLatex: "4 \\times 2.5", targetLatex: "10",
                        visualData: { ingredient: "sugar", baseAmount: 4, targetAmount: 10 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 10 }],
                        correctLatex: "10", hintLatex: [sm1_05_t.hints.recipe_scale_factor]
                    },
                    {
                        id: "R-A4", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_chain_ratio,
                        expressionLatex: "3:5", targetLatex: "3:5",
                        visualData: { ingredient: "eggs", baseAmount: 3, targetAmount: 5 },
                        slots: [{ id: "a", labelLatex: "A", placeholder: t("sm1_05.placeholders.hash"), expected: 3 }, { id: "c", labelLatex: "C", placeholder: t("sm1_05.placeholders.hash"), expected: 5 }],
                        correctLatex: "3:5", hintLatex: [sm1_05_t.hints.recipe_match_both_ratios]
                    },
                    {
                        id: "R-A5", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_gears,
                        expressionLatex: "9 \\div 3", targetLatex: "3",
                        visualData: { ingredient: "cocoa", baseAmount: 9, targetAmount: 3 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.spins, placeholder: t("sm1_05.placeholders.question"), expected: 3 }],
                        correctLatex: "3", hintLatex: [sm1_05_t.hints.recipe_output_slower]
                    }
                );
            } else {
                // Elite
                quests.push(
                    {
                        id: "R-E1", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_chain_ratio_ABC,
                        expressionLatex: "4:6:5", targetLatex: "4:6:5",
                        visualData: { ingredient: "milk", baseAmount: 4, targetAmount: 5 },
                        slots: [{ id: "a", labelLatex: "A", placeholder: t("sm1_05.placeholders.hash"), expected: 4 }, { id: "b", labelLatex: "B", placeholder: t("sm1_05.placeholders.hash"), expected: 6 }, { id: "c", labelLatex: "C", placeholder: t("sm1_05.placeholders.hash"), expected: 5 }],
                        correctLatex: "4:6:5", hintLatex: [sm1_05_t.hints.recipe_double_ab_to_match_b]
                    },
                    {
                        id: "R-E2", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.map_scale,
                        expressionLatex: "4 \\times 25000", targetLatex: "1",
                        visualData: { ingredient: "flour", baseAmount: 1, targetAmount: 1 },
                        slots: [{ id: "ans", labelLatex: "km", placeholder: t("sm1_05.placeholders.question"), expected: 1 }],
                        correctLatex: "1", hintLatex: [sm1_05_t.hints.map_hundred_thousand_cm_km]
                    },
                    {
                        id: "R-E3", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.total_ratio_share,
                        expressionLatex: "\\frac{4}{9} \\times 360", targetLatex: "160",
                        visualData: { ingredient: "sugar", baseAmount: 2, targetAmount: 4 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.share, placeholder: t("sm1_05.placeholders.question"), expected: 160 }],
                        correctLatex: "160", hintLatex: [sm1_05_t.hints.recipe_7_parts]
                    },
                    {
                        id: "R-E4", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_inverse_proportion,
                        expressionLatex: "4 \\times 6 = 24h \\text{ total}", targetLatex: "8",
                        visualData: { ingredient: "eggs", baseAmount: 4, targetAmount: 6 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.hours, placeholder: t("sm1_05.placeholders.question"), expected: 8 }],
                        correctLatex: "8", hintLatex: [sm1_05_t.hints.recipe_constant_product]
                    },
                    {
                        id: "R-E5", difficulty, stage, visualMode: "RECIPES",
                        promptLatex: sm1_05_t.prompts.recipe_pumps,
                        expressionLatex: "\\frac{1}{6} - \\frac{1}{10}", targetLatex: "15",
                        visualData: { ingredient: "cocoa", baseAmount: 6, targetAmount: 10 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.hours, placeholder: t("sm1_05.placeholders.question"), expected: 15 }],
                        correctLatex: "15", hintLatex: [sm1_05_t.hints.recipe_subtract_rates]
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
                        promptLatex: sm1_05_t.prompts.percent_50_100,
                        expressionLatex: "0.5 \\times 100", targetLatex: "50",
                        visualData: { percentage: 50, totalValue: 100 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 50 }],
                        correctLatex: "50", hintLatex: [sm1_05_t.hints.percent_half]
                    },
                    {
                        id: "P-B2", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_25_100,
                        expressionLatex: "0.25 \\times 100", targetLatex: "25",
                        visualData: { percentage: 25, totalValue: 100 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 25 }],
                        correctLatex: "25", hintLatex: [sm1_05_t.hints.percent_quarter]
                    },
                    {
                        id: "P-B3", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_frac_half,
                        expressionLatex: "1 \\div 2", targetLatex: "50",
                        visualData: { percentage: 50, totalValue: 100 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 50 }],
                        correctLatex: "50", hintLatex: [sm1_05_t.hints.percent_half]
                    },
                    {
                        id: "P-B4", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_10_200,
                        expressionLatex: "0.1 \\times 200", targetLatex: "20",
                        visualData: { percentage: 10, totalValue: 200, partValue: 20 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 20 }],
                        correctLatex: "20", hintLatex: [sm1_05_t.hints.percent_decimal]
                    },
                    {
                        id: "P-B5", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_dec_75,
                        expressionLatex: "0.75 \\times 100", targetLatex: "75",
                        visualData: { percentage: 75, totalValue: 100 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 75 }],
                        correctLatex: "75", hintLatex: [sm1_05_t.hints.percent_multiply_by_100]
                    }
                );
            } else if (isCore) {
                quests.push(
                    {
                        id: "P-C1", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_20_50,
                        expressionLatex: "0.2 \\times 50", targetLatex: "10",
                        visualData: { percentage: 20, totalValue: 50, partValue: 10 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 10 }],
                        correctLatex: "10", hintLatex: [sm1_05_t.hints.percent_decimal]
                    },
                    {
                        id: "P-C2", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_find_pct,
                        expressionLatex: "30/60", targetLatex: "50",
                        visualData: { percentage: 50, totalValue: 60, partValue: 30 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 50 }],
                        correctLatex: "50", hintLatex: [sm1_05_t.hints.percent_half]
                    },
                    {
                        id: "P-C3", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_calc_15_200,
                        expressionLatex: "30", targetLatex: "30",
                        visualData: { percentage: 15, totalValue: 200, partValue: 30 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 30 }],
                        correctLatex: "30", hintLatex: [sm1_05_t.hints.percent_ten_is_20_five_is_10]
                    },
                    {
                        id: "P-C4", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_frac_8_20,
                        expressionLatex: "40", targetLatex: "40",
                        visualData: { percentage: 40, totalValue: 50, partValue: 20 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 40 }],
                        correctLatex: "40", hintLatex: [sm1_05_t.hints.percent_multiply_to_100]
                    },
                    {
                        id: "P-C5", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_increase_50,
                        expressionLatex: "50 + 5", targetLatex: "55",
                        visualData: { percentage: 10, totalValue: 50, partValue: 5 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 55 }],
                        correctLatex: "55", hintLatex: [sm1_05_t.hints.percent_decimal]
                    }
                );
            } else if (isAdv) {
                quests.push(
                    {
                        id: "P-A1", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_decrease_80,
                        expressionLatex: "15\\% = 12", targetLatex: "68",
                        visualData: { percentage: 15, totalValue: 80, partValue: 12 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 68 }],
                        correctLatex: "68", hintLatex: [sm1_05_t.hints.percent_subtract_80_12]
                    },
                    {
                        id: "P-A2", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_discount,
                        expressionLatex: "120 \\times 0.8", targetLatex: "96",
                        visualData: { percentage: 80, totalValue: 120, partValue: 96 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.cost, placeholder: t("sm1_05.placeholders.question"), expected: 96 }],
                        correctLatex: "96", hintLatex: [sm1_05_t.hints.percent_discount_24]
                    },
                    {
                        id: "P-A3", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_calc_125,
                        expressionLatex: "1/8 \\times 80", targetLatex: "10",
                        visualData: { percentage: 12.5, totalValue: 80, partValue: 10 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 10 }],
                        correctLatex: "10", hintLatex: [sm1_05_t.hints.percent_one_eighth_of_value]
                    },
                    {
                        id: "P-A4", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_find_total,
                        expressionLatex: "35 / 0.7", targetLatex: "50",
                        visualData: { percentage: 70, totalValue: 50, partValue: 35 },
                        slots: [{ id: "ans", labelLatex: "Total", placeholder: t("sm1_05.placeholders.question"), expected: 50 }],
                        correctLatex: "50", hintLatex: [sm1_05_t.hints.percent_divide_part_by_percent]
                    },
                    {
                        id: "P-A5", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_increase_200,
                        expressionLatex: "200 + 5", targetLatex: "205",
                        visualData: { percentage: 2.5, totalValue: 200, partValue: 5 },
                        slots: [{ id: "ans", labelLatex: sm1_05_t.labels.result, placeholder: t("sm1_05.placeholders.question"), expected: 205 }],
                        correctLatex: "205", hintLatex: [sm1_05_t.hints.percent_one_is_2]
                    }
                );
            } else {
                // Elite
                quests.push(
                    {
                        id: "P-E1", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_tax,
                        expressionLatex: "120 \\times 1.2 = 144", targetLatex: "120",
                        visualData: { percentage: 120, totalValue: 120, partValue: 144 },
                        slots: [{ id: "ans", labelLatex: "Orig", placeholder: t("sm1_05.placeholders.question"), expected: 120 }],
                        correctLatex: "120", hintLatex: [sm1_05_t.hints.percent_divide_by_1_2]
                    },
                    {
                        id: "P-E2", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_compound,
                        expressionLatex: "1000 \\times 1.1 \\times 1.1", targetLatex: "1210",
                        visualData: { percentage: 10, totalValue: 1000, partValue: 1210 },
                        slots: [{ id: "ans", labelLatex: "Final", placeholder: t("sm1_05.placeholders.question"), expected: 1210 }],
                        correctLatex: "1210", hintLatex: [sm1_05_t.hints.percent_comp_1year]
                    },
                    {
                        id: "P-E3", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_net_change,
                        expressionLatex: "100 \\times 0.8 \\times 1.25 = 100", targetLatex: "0",
                        visualData: { percentage: 0, totalValue: 100, partValue: 100 },
                        slots: [{ id: "ans", labelLatex: "\\% Change", placeholder: t("sm1_05.placeholders.question"), expected: 0 }],
                        correctLatex: "0", hintLatex: [sm1_05_t.hints.percent_break_even]
                    },
                    {
                        id: "P-E4", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_time_pct,
                        expressionLatex: "144s / 3600s", targetLatex: "4",
                        visualData: { percentage: 4, totalValue: 3600, partValue: 144 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 4 }],
                        correctLatex: "4", hintLatex: [sm1_05_t.hints.percent_sec]
                    },
                    {
                        id: "P-E5", difficulty, stage, visualMode: "PERCENT",
                        promptLatex: sm1_05_t.prompts.percent_pop_increase,
                        expressionLatex: "1000/5000", targetLatex: "20",
                        visualData: { percentage: 20, totalValue: 5000, partValue: 6000 },
                        slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 20 }],
                        correctLatex: "20", hintLatex: [sm1_05_t.hints.percent_diff_over_original]
                    }
                );
            }
        }

        // --- STAGE 3: MIXTURES ---
        if (stage === "MIXTURES") {
            if (isBasic) {
                quests.push(
                    { id: "M-B1", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_syrup, expressionLatex: "\\frac{20}{100}", targetLatex: "20", visualData: { solute: 20, solvent: 80, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 20 }], correctLatex: "20", hintLatex: [sm1_05_t.hints.mix_total_100] },
                    { id: "M-B2", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_salt, expressionLatex: "\\frac{10}{100}", targetLatex: "10", visualData: { solute: 10, solvent: 90, hideResult: true, soluteColor: "#f4f4f5", solventColor: "#3b82f6" }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 10 }], correctLatex: "10", hintLatex: [sm1_05_t.hints.mix_total_mass_100g] },
                    { id: "M-B3", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_juice, expressionLatex: "\\frac{50}{100}", targetLatex: "50", visualData: { solute: 50, solvent: 50, hideResult: true, soluteColor: "#eab308" }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 50 }], correctLatex: "50", hintLatex: [sm1_05_t.hints.percent_half] },
                    { id: "M-B4", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_colors, expressionLatex: "\\frac{30}{100}", targetLatex: "30", visualData: { solute: 30, solvent: 70, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 30 }], correctLatex: "30", hintLatex: [sm1_05_t.hints.mix_30_out_of_100] },
                    { id: "M-B5", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_zero, expressionLatex: "0", targetLatex: "0", visualData: { solute: 0, solvent: 100, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 0 }], correctLatex: "0", hintLatex: [sm1_05_t.hints.mix_pure_solvent] }
                );
            } else if (isCore) {
                quests.push(
                    { id: "M-C1", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_25g, expressionLatex: "\\frac{25}{100}", targetLatex: "25", visualData: { solute: 25, solvent: 75, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 25 }], correctLatex: "25", hintLatex: [sm1_05_t.hints.mix_total_100g] },
                    { id: "M-C2", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_20ml, expressionLatex: "\\frac{20}{200}", targetLatex: "10", visualData: { solute: 20, solvent: 180, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 10 }], correctLatex: "10", hintLatex: [sm1_05_t.hints.mix_total_200ml] },
                    { id: "M-C3", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_40ml, expressionLatex: "\\frac{40}{200}", targetLatex: "20", visualData: { solute: 40, solvent: 160, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 20 }], correctLatex: "20", hintLatex: [sm1_05_t.hints.mix_double_percent_calculation] },
                    { id: "M-C4", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_find_solute, expressionLatex: "50", targetLatex: "50", visualData: { solute: 50, solvent: 450, hideResult: false }, slots: [{ id: "ans", labelLatex: "ml", placeholder: t("sm1_05.placeholders.question"), expected: 50 }], correctLatex: "50", hintLatex: [sm1_05_t.hints.mix_500_times_0_1] },
                    { id: "M-C5", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_find_mass, expressionLatex: "10", targetLatex: "10", visualData: { solute: 10, solvent: 190, hideResult: false }, slots: [{ id: "ans", labelLatex: "g", placeholder: t("sm1_05.placeholders.question"), expected: 10 }], correctLatex: "10", hintLatex: [sm1_05_t.hints.mix_200_times_0_05] }
                );
            } else if (isAdv) {
                quests.push(
                    { id: "M-A1", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_add_10g, expressionLatex: "10/50", targetLatex: "20", visualData: { solute: 10, solvent: 40, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 20 }], correctLatex: "20", hintLatex: [sm1_05_t.hints.mix_total_50g] },
                    { id: "M-A2", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_add_50ml, expressionLatex: "50/200", targetLatex: "25", visualData: { solute: 50, solvent: 150, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 25 }], correctLatex: "25", hintLatex: [sm1_05_t.hints.percent_quarter] },
                    { id: "M-A3", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_dilute, expressionLatex: "50g / 200ml", targetLatex: "25", visualData: { solute: 50, solvent: 150, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 25 }], correctLatex: "25", hintLatex: [sm1_05_t.hints.mix_dilute] },
                    { id: "M-A4", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_find_water, expressionLatex: "20/Total=0.1", targetLatex: "180", visualData: { solute: 20, solvent: 180, hideResult: false }, slots: [{ id: "ans", labelLatex: sm1_05_t.labels.water, placeholder: t("sm1_05.placeholders.question"), expected: 180 }], correctLatex: "180", hintLatex: [sm1_05_t.hints.mix_total_200_minus_20] },
                    { id: "M-A5", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_avg, expressionLatex: "15", targetLatex: "15", visualData: { solute: 30, solvent: 170, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 15 }], correctLatex: "15", hintLatex: [sm1_05_t.hints.mix_avg] }
                );
            } else {
                // Elite
                quests.push(
                    { id: "M-E1", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_weighted, expressionLatex: "(20+60)/500", targetLatex: "16", visualData: { solute: 80, solvent: 420, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 16 }], correctLatex: "16", hintLatex: [sm1_05_t.hints.mix_total_solute_80_total_500] },
                    { id: "M-E2", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_evaporate, expressionLatex: "20/100", targetLatex: "20", visualData: { solute: 20, solvent: 80, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 20 }], correctLatex: "20", hintLatex: [sm1_05_t.hints.mix_solute_stays_20_total_100] },
                    { id: "M-E3", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_how_much_add, expressionLatex: "20/X = 0.1", targetLatex: "150", visualData: { solute: 20, solvent: 180, hideResult: true }, slots: [{ id: "ans", labelLatex: sm1_05_t.labels.share, placeholder: t("sm1_05.placeholders.question"), expected: 150 }], correctLatex: "150", hintLatex: [sm1_05_t.hints.mix_need_total_200] },
                    { id: "M-E4", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_inverse, expressionLatex: "20/(100+X)=0.1", targetLatex: "100", visualData: { solute: 20, solvent: 180, hideResult: true }, slots: [{ id: "ans", labelLatex: sm1_05_t.labels.share, placeholder: t("sm1_05.placeholders.question"), expected: 100 }], correctLatex: "100", hintLatex: [sm1_05_t.hints.mix_dilute_by_half] },
                    { id: "M-E5", difficulty, stage, visualMode: "MIXTURES", promptLatex: sm1_05_t.prompts.mix_final_challenge, expressionLatex: "(40+50)/250", targetLatex: "36", visualData: { solute: 90, solvent: 160, hideResult: true }, slots: [{ id: "ans", labelLatex: "%", placeholder: t("sm1_05.placeholders.question"), expected: 36 }], correctLatex: "36", hintLatex: [sm1_05_t.hints.mix_original_solute_40_total_250] }
                );
            }
        }

        return quests;
    }, [sm1_05_t, t]);

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
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback,
    feedbackLevel,
    feedbackContent,
    feedbackAvailability,
    showHintLevel,
    showStepsLevel,
    showFullSolution,
    policy,
    } = useQuestManager<S105Quest, Stage>({
        moduleCode: "sm1-05",
        buildPool,
        initialStage: "RECIPES",
        feedbackContentProvider,
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm1-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo<{ id: Stage; label: string }[]>(() => [
        { id: "RECIPES", label: sm1_05_t.stages.recipes },
        { id: "PERCENT", label: sm1_05_t.stages.percent },
        { id: "MIXTURES", label: sm1_05_t.stages.mixtures },
    ], [sm1_05_t]);
    const difficultyLabelMap = useMemo<Record<Difficulty, string>>(() => ({
        BASIC: sm1_05_t.difficulty.basic,
        CORE: sm1_05_t.difficulty.core,
        ADVANCED: sm1_05_t.difficulty.advanced,
        ELITE: sm1_05_t.difficulty.elite,
    }), [sm1_05_t]);
    const printSections = useMemo(() => () => buildQuestPrintSections<S105Quest, Stage>({
        moduleTitle: sm1_05_t.title,
        stages: stagesProps,
        difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
        difficultyLabels: difficultyLabelMap,
        buildPool,
        showHints: true,
        maxHints: 1,
    }), [buildPool, difficultyLabelMap, sm1_05_t.title, stagesProps]);

    const hint = getHint();

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            feedbackContent={feedbackContent}
            feedbackLevel={feedbackLevel}
            feedbackAvailability={feedbackAvailability}
            feedbackPolicy={policy}
            onShowHint={showHintLevel}
            onShowSteps={showStepsLevel}
            onShowFull={showFullSolution}
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
            printSectionsBuilder={printSections}
            translations={{
                back: sm1_05_t.back,
                check: sm1_05_t.check,
                next: sm1_05_t.next,
                correct: sm1_05_t.correct,
                incorrect: sm1_05_t.incorrect,
                monitor_title: sm1_05_t.monitor_title,
                difficulty: {
                    basic: difficultyLabelMap.BASIC,
                    core: difficultyLabelMap.CORE,
                    advanced: difficultyLabelMap.ADVANCED,
                    elite: difficultyLabelMap.ELITE,
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        {currentQuest ? (
                            <RatioCanvas
                                mode={currentQuest?.visualMode}
                                quest={currentQuest}
                                language={currentLanguage}
                                translations={sm1_05_t}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white/50 italic font-mono">
                                INITIALIZING LABORATORY...
                            </div>
                        )}
                    </div>
                </div>
            }
        >
            <div className="max-w-xl mx-auto space-y-8 py-10">
                {currentQuest && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        {/* Prompt as clear text/math */}
                        <div className="p-8 bg-black/40 border border-white/10 rounded-2xl text-center space-y-4 shadow-2xl">
                            <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black">
                                {sm1_05_t.monitor_title}
                            </div>
                            <div className="text-2xl text-white font-medium leading-relaxed">
                                {renderMixedText(currentQuest.promptLatex)}
                            </div>
                        </div>

                        {/* Expression display */}
                        <div className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-4">
                                {sm1_05_t.labels.logic_framework}
                            </div>
                            <div className="text-4xl text-white font-black">
                                <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
                            </div>
                        </div>

                        {/* Input Slots */}
                        <div className="space-y-6">
                            {currentQuest.slots.map((slot) => (
                                <div key={slot.id} className="space-y-3">
                                    <div className="px-2">
                                        <div className="text-xs uppercase font-black tracking-widest text-white/60">
                                            <InlineMath math={slot.labelLatex} />
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            value={inputs[slot.id] || ""}
                                            onChange={(e) => setInputs((prev) => ({ ...prev, [slot.id]: e.target.value }))}
                                            className="w-full bg-black border-2 border-white/10 group-focus-within:border-neon-cyan p-5 text-center outline-none transition-all font-black text-3xl text-white rounded-2xl shadow-2xl placeholder:text-white/35"
                                            placeholder={slot.placeholder}
                                            onKeyDown={(e) => e.key === "Enter" && verify()}
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/40 transition-all blur-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Status Feedback */}
                        {lastCheck && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-6 rounded-2xl border-2 flex flex-col gap-4 text-center ${lastCheck.ok ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-500"
                                    } shadow-xl`}
                            >
                                <div className="text-sm font-black uppercase tracking-[0.4em] italic">
                                    {lastCheck.ok ? sm1_05_t.correct : sm1_05_t.incorrect}
                                </div>
                                {lastCheck.ok ? (
                                    <button
                                        onClick={next}
                                        className="w-full py-4 bg-white text-black text-[10px] font-black tracking-[0.4em] uppercase rounded-xl hover:bg-neon-cyan hover:scale-[1.02] transition-all shadow-lg active:scale-95"
                                    >
                                        Execute Next Sequence
                                    </button>
                                ) : hint && (
                                    <div className="text-white/80 font-bold bg-black/20 p-4 rounded-xl border border-white/5">
                                        <InlineMath math={hint} />
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </ChamberLayout>
    );
}
