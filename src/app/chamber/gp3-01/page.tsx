"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import WaveVisualization from "@/components/chamber/gp3-01/WaveVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "WAVE_PROPERTIES" | "SUPERPOSITION" | "OPTICS";

interface GP301Quest extends Quest {
    stage: Stage;
    amplitude?: number;
    frequency?: number;
    wavelength?: number;
    velocity?: number;
    medium?: string;
    waveType?: string;
}

export default function GP301Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GP301Quest[] => {
        const quests: GP301Quest[] = [];

        if (stage === "WAVE_PROPERTIES") {
            if (difficulty === "BASIC") {
                // v = fλ 直接计算，已知两个求第三个
                quests.push(
                    {
                        id: "WP-B1", difficulty, stage,
                        frequency: 2, wavelength: 3, velocity: 6,
                        promptLatex: t("gp3_01.prompts.find_velocity", { f: "2", lambda: "3" }),
                        expressionLatex: `v = f \\times \\lambda`,
                        targetLatex: `v`,
                        slots: [{ id: "v", labelLatex: `v\\\\text{ (m/s)}`, placeholder: "6", expected: 6 }],
                        correctLatex: `6\\\\text{ m/s}`,
                        hintLatex: [t("gp3_01.hints.wave_equation")]
                    },
                    {
                        id: "WP-B2", difficulty, stage,
                        frequency: 5, wavelength: 2, velocity: 10,
                        promptLatex: t("gp3_01.prompts.find_wavelength", { f: "5", v: "10" }),
                        expressionLatex: `\\lambda = \\\\frac{v}{f}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "lambda", labelLatex: `\\lambda\\\\text{ (m)}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.wavelength_calc")]
                    },
                    {
                        id: "WP-B3", difficulty, stage,
                        frequency: 4, wavelength: 5, velocity: 20,
                        promptLatex: t("gp3_01.prompts.find_frequency", { v: "20", lambda: "5" }),
                        expressionLatex: `f = \\\\frac{v}{\\lambda}`,
                        targetLatex: `f`,
                        slots: [{ id: "f", labelLatex: `f\\\\text{ (Hz)}`, placeholder: "4", expected: 4 }],
                        correctLatex: `4\\\\text{ Hz}`,
                        hintLatex: [t("gp3_01.hints.frequency_calc")]
                    },
                    {
                        id: "WP-B4", difficulty, stage,
                        frequency: 10, wavelength: 3, velocity: 30,
                        promptLatex: t("gp3_01.prompts.verify_wave_eq", { f: "10", lambda: "3", v: "30" }),
                        expressionLatex: `v = f \\times \\lambda = 10 \\times 3`,
                        targetLatex: `v`,
                        slots: [{ id: "v", labelLatex: `v\\\\text{ (m/s)}`, placeholder: "30", expected: 30 }],
                        correctLatex: `30\\\\text{ m/s}`,
                        hintLatex: [t("gp3_01.hints.wave_equation")]
                    },
                    {
                        id: "WP-B5", difficulty, stage,
                        frequency: 8, wavelength: 4, velocity: 32,
                        promptLatex: t("gp3_01.prompts.water_wave", { f: "8", lambda: "4" }),
                        expressionLatex: `v = f \\times \\lambda`,
                        targetLatex: `v`,
                        slots: [{ id: "v", labelLatex: `v\\\\text{ (m/s)}`, placeholder: "32", expected: 32 }],
                        correctLatex: `32\\\\text{ m/s}`,
                        hintLatex: [t("gp3_01.hints.wave_equation")]
                    }
                );
            }
            if (difficulty === "CORE") {
                // 波的周期 T = 1/f，波在不同介质中的速度变化
                quests.push(
                    {
                        id: "WP-C1", difficulty, stage,
                        frequency: 2, wavelength: 0, velocity: 0,
                        promptLatex: t("gp3_01.prompts.find_period", { f: "2" }),
                        expressionLatex: `T = \\\\frac{1}{f}`,
                        targetLatex: `T`,
                        slots: [{ id: "T", labelLatex: `T\\\\text{ (s)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `0.5\\\\text{ s}`,
                        hintLatex: [t("gp3_01.hints.period_calc")]
                    },
                    {
                        id: "WP-C2", difficulty, stage,
                        frequency: 5, wavelength: 0, velocity: 0,
                        promptLatex: t("gp3_01.prompts.period_to_freq", { T: "0.2" }),
                        expressionLatex: `f = \\\\frac{1}{T}`,
                        targetLatex: `f`,
                        slots: [{ id: "f", labelLatex: `f\\\\text{ (Hz)}`, placeholder: "5", expected: 5 }],
                        correctLatex: `5\\\\text{ Hz}`,
                        hintLatex: [t("gp3_01.hints.frequency_from_period")]
                    },
                    {
                        id: "WP-C3", difficulty, stage,
                        frequency: 500, wavelength: 0.68, velocity: 340, medium: "air",
                        promptLatex: t("gp3_01.prompts.sound_in_air", { f: "500" }),
                        expressionLatex: `\\lambda = \\\\frac{v}{f} = \\\\frac{340}{500}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "lambda", labelLatex: `\\lambda\\\\text{ (m)}`, placeholder: "0.68", expected: 0.68 }],
                        correctLatex: `0.68\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.sound_speed_air")]
                    },
                    {
                        id: "WP-C4", difficulty, stage,
                        frequency: 500, wavelength: 3, velocity: 1500, medium: "water",
                        promptLatex: t("gp3_01.prompts.sound_in_water", { f: "500" }),
                        expressionLatex: `\\lambda = \\\\frac{v}{f} = \\\\frac{1500}{500}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "lambda", labelLatex: `\\lambda\\\\text{ (m)}`, placeholder: "3", expected: 3 }],
                        correctLatex: `3\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.sound_speed_water")]
                    },
                    {
                        id: "WP-C5", difficulty, stage,
                        frequency: 0, wavelength: 0, velocity: 0,
                        promptLatex: t("gp3_01.prompts.speed_ratio"),
                        expressionLatex: `\\\\frac{v_{\\\\text{water}}}{v_{\\\\text{air}}} = \\\\frac{1500}{340}`,
                        targetLatex: `\\\\text{ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\\\text{ratio}`, placeholder: "4.4", expected: 4.4 }],
                        correctLatex: `4.4`,
                        hintLatex: [t("gp3_01.hints.speed_comparison")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                // 多普勒效应，波的叠加
                quests.push(
                    {
                        id: "WP-A1", difficulty, stage,
                        frequency: 500, velocity: 340,
                        promptLatex: t("gp3_01.prompts.doppler_approach"),
                        expressionLatex: `f' = f \\times \\frac{v}{v - v_s}`,
                        targetLatex: `\\\\text{higher/lower}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Answer}`, placeholder: "higher", expected: "higher" }],
                        correctLatex: `\\\\text{Higher}`,
                        hintLatex: [t("gp3_01.hints.doppler_effect")]
                    },
                    {
                        id: "WP-A2", difficulty, stage,
                        frequency: 500, velocity: 340,
                        promptLatex: t("gp3_01.prompts.doppler_recede"),
                        expressionLatex: `f' = f \\times \\frac{v}{v + v_s}`,
                        targetLatex: `\\\\text{higher/lower}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Answer}`, placeholder: "lower", expected: "lower" }],
                        correctLatex: `\\\\text{Lower}`,
                        hintLatex: [t("gp3_01.hints.doppler_recede")]
                    },
                    {
                        id: "WP-A3", difficulty, stage,
                        amplitude: 2, frequency: 5,
                        promptLatex: t("gp3_01.prompts.constructive_interference"),
                        expressionLatex: `A_{\\\\text{total}} = A_1 + A_2`,
                        targetLatex: `A_{\\\\text{total}}`,
                        slots: [{ id: "A", labelLatex: `A\\\\text{ (m)}`, placeholder: "4", expected: 4 }],
                        correctLatex: `4\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.constructive")]
                    },
                    {
                        id: "WP-A4", difficulty, stage,
                        amplitude: 3, frequency: 5,
                        promptLatex: t("gp3_01.prompts.destructive_interference"),
                        expressionLatex: `A_{\\\\text{total}} = |A_1 - A_2|`,
                        targetLatex: `A_{\\\\text{total}}`,
                        slots: [{ id: "A", labelLatex: `A\\\\text{ (m)}`, placeholder: "0", expected: 0 }],
                        correctLatex: `0\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.destructive")]
                    },
                    {
                        id: "WP-A5", difficulty, stage,
                        frequency: 440, velocity: 340,
                        promptLatex: t("gp3_01.prompts.beat_frequency"),
                        expressionLatex: `f_{\\\\text{beat}} = |f_1 - f_2|`,
                        targetLatex: `f_{\\\\text{beat}}`,
                        slots: [{ id: "f", labelLatex: `f_{\\\\text{beat}}\\\\text{ (Hz)}`, placeholder: "4", expected: 4 }],
                        correctLatex: `4\\\\text{ Hz}`,
                        hintLatex: [t("gp3_01.hints.beats")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                // 德布罗意波长，波-粒二象性
                quests.push(
                    {
                        id: "WP-E1", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.de_broglie"),
                        expressionLatex: `\\lambda = \\\\frac{h}{p} = \\\\frac{h}{mv}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "lambda", labelLatex: `\\lambda\\\\text{ (m)}`, placeholder: "6.63e-34", expected: 6.63e-34 }],
                        correctLatex: `6.63 \\times 10^{-34}\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.de_broglie")]
                    },
                    {
                        id: "WP-E2", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.wave_particle_duality"),
                        expressionLatex: `E = h f = \\\\frac{hc}{\\lambda}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Answer}`, placeholder: "both", expected: "both" }],
                        correctLatex: `\\\\text{Both wave and particle}`,
                        hintLatex: [t("gp3_01.hints.duality")]
                    },
                    {
                        id: "WP-E3", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.photon_energy"),
                        expressionLatex: `E = hf`,
                        targetLatex: `E`,
                        slots: [{ id: "E", labelLatex: `E\\\\text{ (J)}`, placeholder: "3.31e-19", expected: 3.31e-19 }],
                        correctLatex: `3.31 \\times 10^{-19}\\\\text{ J}`,
                        hintLatex: [t("gp3_01.hints.photon_energy")]
                    },
                    {
                        id: "WP-E4", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.matter_wave"),
                        expressionLatex: `\\lambda = \\\\frac{h}{mv}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "lambda", labelLatex: `\\lambda\\\\text{ (m)}`, placeholder: "1e-10", expected: 1e-10 }],
                        correctLatex: `10^{-10}\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.matter_wave")]
                    },
                    {
                        id: "WP-E5", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.uncertainty"),
                        expressionLatex: `\\Delta x \\Delta p \\geq \\\\frac{h}{4\\pi}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Answer}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\\\text{Yes (Heisenberg)}`,
                        hintLatex: [t("gp3_01.hints.uncertainty")]
                    }
                );
            }
        }

        if (stage === "SUPERPOSITION") {
            if (difficulty === "BASIC") {
                // 相同频率波的叠加（相长干涉、相消干涉）
                quests.push(
                    {
                        id: "SP-B1", difficulty, stage,
                        amplitude: 2, frequency: 5,
                        promptLatex: t("gp3_01.prompts.same_phase_add"),
                        expressionLatex: `A_{\\\\text{total}} = A_1 + A_2 = 2 + 2`,
                        targetLatex: `A_{\\\\text{total}}`,
                        slots: [{ id: "A", labelLatex: `A\\\\text{ (m)}`, placeholder: "4", expected: 4 }],
                        correctLatex: `4\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.in_phase")]
                    },
                    {
                        id: "SP-B2", difficulty, stage,
                        amplitude: 3, frequency: 5,
                        promptLatex: t("gp3_01.prompts.opposite_phase_cancel"),
                        expressionLatex: `A_{\\\\text{total}} = |A_1 - A_2| = |3 - 3|`,
                        targetLatex: `A_{\\\\text{total}}`,
                        slots: [{ id: "A", labelLatex: `A\\\\text{ (m)}`, placeholder: "0", expected: 0 }],
                        correctLatex: `0\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.out_of_phase")]
                    },
                    {
                        id: "SP-B3", difficulty, stage,
                        amplitude: 1, frequency: 10,
                        promptLatex: t("gp3_01.prompts.constructive_max"),
                        expressionLatex: `A_{\\\\text{max}} = A_1 + A_2`,
                        targetLatex: `A_{\\\\text{max}}`,
                        slots: [{ id: "A", labelLatex: `A\\\\text{ (m)}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.max_amplitude")]
                    },
                    {
                        id: "SP-B4", difficulty, stage,
                        amplitude: 5, frequency: 8,
                        promptLatex: t("gp3_01.prompts.partial_destructive"),
                        expressionLatex: `A_{\\\\text{total}} = |A_1 - A_2| = |5 - 3|`,
                        targetLatex: `A_{\\\\text{total}}`,
                        slots: [{ id: "A", labelLatex: `A\\\\text{ (m)}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.partial_cancel")]
                    },
                    {
                        id: "SP-B5", difficulty, stage,
                        amplitude: 4, frequency: 6,
                        promptLatex: t("gp3_01.prompts.interference_type"),
                        expressionLatex: `\\\\text{Same phase} \\rightarrow \\\\text{constructive}`,
                        targetLatex: `\\\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\\\text{Type}`, placeholder: "constructive", expected: "constructive" }],
                        correctLatex: `\\\\text{Constructive}`,
                        hintLatex: [t("gp3_01.hints.interference_types")]
                    }
                );
            }
            if (difficulty === "CORE") {
                // 驻波节点和腹节点位置
                quests.push(
                    {
                        id: "SP-C1", difficulty, stage,
                        wavelength: 2, frequency: 5,
                        promptLatex: t("gp3_01.prompts.standing_wave_node"),
                        expressionLatex: `x_n = n \\times \\\\frac{\\lambda}{2}`,
                        targetLatex: `x_1`,
                        slots: [{ id: "x", labelLatex: `x_1\\\\text{ (m)}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.node_position")]
                    },
                    {
                        id: "SP-C2", difficulty, stage,
                        wavelength: 4, frequency: 3,
                        promptLatex: t("gp3_01.prompts.standing_wave_antinode"),
                        expressionLatex: `x_a = (n + \\\\frac{1}{2}) \\times \\\\frac{\\lambda}{2}`,
                        targetLatex: `x_1`,
                        slots: [{ id: "x", labelLatex: `x_1\\\\text{ (m)}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.antinode_position")]
                    },
                    {
                        id: "SP-C3", difficulty, stage,
                        wavelength: 2, frequency: 5,
                        promptLatex: t("gp3_01.prompts.node_count"),
                        expressionLatex: `n = \\\\frac{L}{\\lambda/2}`,
                        targetLatex: `n`,
                        slots: [{ id: "n", labelLatex: `n`, placeholder: "5", expected: 5 }],
                        correctLatex: `5`,
                        hintLatex: [t("gp3_01.hints.node_count")]
                    },
                    {
                        id: "SP-C4", difficulty, stage,
                        wavelength: 1, frequency: 10,
                        promptLatex: t("gp3_01.prompts.string_fundamental"),
                        expressionLatex: `L = \\\\frac{\\lambda}{2}`,
                        targetLatex: `L`,
                        slots: [{ id: "L", labelLatex: `L\\\\text{ (m)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `0.5\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.fundamental_mode")]
                    },
                    {
                        id: "SP-C5", difficulty, stage,
                        wavelength: 2, frequency: 5,
                        promptLatex: t("gp3_01.prompts.harmonic_wavelength"),
                        expressionLatex: `\\lambda_2 = \\\\frac{\\lambda_1}{2}`,
                        targetLatex: `\\lambda_2`,
                        slots: [{ id: "lambda", labelLatex: `\\lambda_2\\\\text{ (m)}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.second_harmonic")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                // 双缝干涉条纹间距 Δy = λL/d
                quests.push(
                    {
                        id: "SP-A1", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.double_slit_spacing"),
                        expressionLatex: `\\Delta y = \\\\frac{\\lambda L}{d}`,
                        targetLatex: `\\Delta y`,
                        slots: [{ id: "dy", labelLatex: `\\Delta y\\\\text{ (mm)}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\\\text{ mm}`,
                        hintLatex: [t("gp3_01.hints.double_slit")]
                    },
                    {
                        id: "SP-A2", difficulty, stage,
                        wavelength: 6e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.fringe_order"),
                        expressionLatex: `y_m = m \\times \\\\frac{\\lambda L}{d}`,
                        targetLatex: `y_3`,
                        slots: [{ id: "y", labelLatex: `y_3\\\\text{ (mm)}`, placeholder: "3", expected: 3 }],
                        correctLatex: `3\\\\text{ mm}`,
                        hintLatex: [t("gp3_01.hints.fringe_position")]
                    },
                    {
                        id: "SP-A3", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.slit_separation"),
                        expressionLatex: `d = \\\\frac{\\lambda L}{\\Delta y}`,
                        targetLatex: `d`,
                        slots: [{ id: "d", labelLatex: `d\\\\text{ (mm)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `0.5\\\\text{ mm}`,
                        hintLatex: [t("gp3_01.hints.slit_distance")]
                    },
                    {
                        id: "SP-A4", difficulty, stage,
                        wavelength: 4e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.wavelength_from_fringes"),
                        expressionLatex: `\\lambda = \\\\frac{\\Delta y \\times d}{L}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "lambda", labelLatex: `\\lambda\\\\text{ (nm)}`, placeholder: "400", expected: 400 }],
                        correctLatex: `400\\\\text{ nm}`,
                        hintLatex: [t("gp3_01.hints.wavelength_measurement")]
                    },
                    {
                        id: "SP-A5", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.central_maximum"),
                        expressionLatex: `m = 0 \\rightarrow y = 0`,
                        targetLatex: `y_0`,
                        slots: [{ id: "y", labelLatex: `y_0\\\\text{ (m)}`, placeholder: "0", expected: 0 }],
                        correctLatex: `0\\\\text{ m}`,
                        hintLatex: [t("gp3_01.hints.central_bright")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                // 薄膜干涉，牛顿环
                quests.push(
                    {
                        id: "SP-E1", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.thin_film_constructive"),
                        expressionLatex: `2nt = m\\lambda`,
                        targetLatex: `t`,
                        slots: [{ id: "t", labelLatex: `t\\\\text{ (nm)}`, placeholder: "250", expected: 250 }],
                        correctLatex: `250\\\\text{ nm}`,
                        hintLatex: [t("gp3_01.hints.thin_film")]
                    },
                    {
                        id: "SP-E2", difficulty, stage,
                        wavelength: 6e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.thin_film_destructive"),
                        expressionLatex: `2nt = (m + \\\\frac{1}{2})\\lambda`,
                        targetLatex: `t`,
                        slots: [{ id: "t", labelLatex: `t\\\\text{ (nm)}`, placeholder: "150", expected: 150 }],
                        correctLatex: `150\\\\text{ nm}`,
                        hintLatex: [t("gp3_01.hints.destructive_film")]
                    },
                    {
                        id: "SP-E3", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.newton_rings"),
                        expressionLatex: `r_m = \\\\sqrt{m\\lambda R}`,
                        targetLatex: `r_1`,
                        slots: [{ id: "r", labelLatex: `r_1\\\\text{ (mm)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `0.5\\\\text{ mm}`,
                        hintLatex: [t("gp3_01.hints.newton_rings")]
                    },
                    {
                        id: "SP-E4", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.soap_bubble"),
                        expressionLatex: `2nt = m\\lambda`,
                        targetLatex: `\\\\text{color}`,
                        slots: [{ id: "color", labelLatex: `\\\\text{Color}`, placeholder: "green", expected: "green" }],
                        correctLatex: `\\\\text{Green (500 nm)}`,
                        hintLatex: [t("gp3_01.hints.soap_colors")]
                    },
                    {
                        id: "SP-E5", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.anti_reflection"),
                        expressionLatex: `t = \\\\frac{\\lambda}{4n}`,
                        targetLatex: `t`,
                        slots: [{ id: "t", labelLatex: `t\\\\text{ (nm)}`, placeholder: "100", expected: 100 }],
                        correctLatex: `100\\\\text{ nm}`,
                        hintLatex: [t("gp3_01.hints.anti_reflection")]
                    }
                );
            }
        }

        if (stage === "OPTICS") {
            if (difficulty === "BASIC") {
                // 光的反射/折射定律 (n₁sinθ₁ = n₂sinθ₂)
                quests.push(
                    {
                        id: "OP-B1", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.reflection_angle"),
                        expressionLatex: `\\theta_r = \\theta_i`,
                        targetLatex: `\\theta_r`,
                        slots: [{ id: "theta", labelLatex: `\\theta_r\\\\text{ (°)}`, placeholder: "30", expected: 30 }],
                        correctLatex: `30°`,
                        hintLatex: [t("gp3_01.hints.law_of_reflection")]
                    },
                    {
                        id: "OP-B2", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.refraction_basic"),
                        expressionLatex: `n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2`,
                        targetLatex: `\\theta_2`,
                        slots: [{ id: "theta", labelLatex: `\\theta_2\\\\text{ (°)}`, placeholder: "22", expected: 22 }],
                        correctLatex: `22°`,
                        hintLatex: [t("gp3_01.hints.snells_law")]
                    },
                    {
                        id: "OP-B3", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.light_speed_medium"),
                        expressionLatex: `v = \\\\frac{c}{n}`,
                        targetLatex: `v`,
                        slots: [{ id: "v", labelLatex: `v\\\\text{ (m/s)}`, placeholder: "2e8", expected: 2e8 }],
                        correctLatex: `2 \\times 10^8\\\\text{ m/s}`,
                        hintLatex: [t("gp3_01.hints.light_speed")]
                    },
                    {
                        id: "OP-B4", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.refractive_index"),
                        expressionLatex: `n = \\\\frac{c}{v}`,
                        targetLatex: `n`,
                        slots: [{ id: "n", labelLatex: `n`, placeholder: "1.5", expected: 1.5 }],
                        correctLatex: `1.5`,
                        hintLatex: [t("gp3_01.hints.index_calc")]
                    },
                    {
                        id: "OP-B5", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.normal_incidence"),
                        expressionLatex: `\\theta_i = 0° \\rightarrow \\theta_r = 0°`,
                        targetLatex: `\\theta_r`,
                        slots: [{ id: "theta", labelLatex: `\\theta_r\\\\text{ (°)}`, placeholder: "0", expected: 0 }],
                        correctLatex: `0°`,
                        hintLatex: [t("gp3_01.hints.normal_ray")]
                    }
                );
            }
            if (difficulty === "CORE") {
                // 全内反射临界角
                quests.push(
                    {
                        id: "OP-C1", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.critical_angle"),
                        expressionLatex: `\\sin\\theta_c = \\\\frac{n_2}{n_1}`,
                        targetLatex: `\\theta_c`,
                        slots: [{ id: "theta", labelLatex: `\\theta_c\\\\text{ (°)}`, placeholder: "42", expected: 42 }],
                        correctLatex: `42°`,
                        hintLatex: [t("gp3_01.hints.critical_angle")]
                    },
                    {
                        id: "OP-C2", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.total_internal_reflection"),
                        expressionLatex: `\\theta > \\theta_c \\rightarrow \\\\text{TIR}`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Yes/No}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\\\text{Yes (TIR occurs)}`,
                        hintLatex: [t("gp3_01.hints.tir_condition")]
                    },
                    {
                        id: "OP-C3", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.fiber_optics"),
                        expressionLatex: `\\\\text{TIR} \\rightarrow \\\\text{light trapped}`,
                        targetLatex: `\\\\text{Principle}`,
                        slots: [{ id: "principle", labelLatex: `\\\\text{Principle}`, placeholder: "TIR", expected: "TIR" }],
                        correctLatex: `\\\\text{Total Internal Reflection}`,
                        hintLatex: [t("gp3_01.hints.fiber_principle")]
                    },
                    {
                        id: "OP-C4", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.prism_dispersion"),
                        expressionLatex: `n(\\lambda) \\rightarrow \\\\text{different angles}`,
                        targetLatex: `\\\\text{Effect}`,
                        slots: [{ id: "effect", labelLatex: `\\\\text{Effect}`, placeholder: "dispersion", expected: "dispersion" }],
                        correctLatex: `\\\\text{Dispersion}`,
                        hintLatex: [t("gp3_01.hints.dispersion")]
                    },
                    {
                        id: "OP-C5", difficulty, stage,
                        promptLatex: t("gp3_01.prompts.brewster_angle"),
                        expressionLatex: `\\tan\\theta_B = \\\\frac{n_2}{n_1}`,
                        targetLatex: `\\theta_B`,
                        slots: [{ id: "theta", labelLatex: `\\theta_B\\\\text{ (°)}`, placeholder: "53", expected: 53 }],
                        correctLatex: `53°`,
                        hintLatex: [t("gp3_01.hints.brewster")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                // 单缝衍射极小位置
                quests.push(
                    {
                        id: "OP-A1", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.single_slit_minima"),
                        expressionLatex: `a \\sin\\theta = m\\lambda`,
                        targetLatex: `\\theta_1`,
                        slots: [{ id: "theta", labelLatex: `\\theta_1\\\\text{ (°)}`, placeholder: "30", expected: 30 }],
                        correctLatex: `30°`,
                        hintLatex: [t("gp3_01.hints.single_slit")]
                    },
                    {
                        id: "OP-A2", difficulty, stage,
                        wavelength: 6e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.diffraction_width"),
                        expressionLatex: `w = \\\\frac{2\\lambda L}{a}`,
                        targetLatex: `w`,
                        slots: [{ id: "w", labelLatex: `w\\\\text{ (mm)}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\\\text{ mm}`,
                        hintLatex: [t("gp3_01.hints.central_width")]
                    },
                    {
                        id: "OP-A3", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.rayleigh_criterion"),
                        expressionLatex: `\\theta_{\\\\text{min}} = 1.22\\\\frac{\\lambda}{D}`,
                        targetLatex: `\\theta_{\\\\text{min}}`,
                        slots: [{ id: "theta", labelLatex: `\\theta\\\\text{ (rad)}`, placeholder: "1e-6", expected: 1e-6 }],
                        correctLatex: `10^{-6}\\\\text{ rad}`,
                        hintLatex: [t("gp3_01.hints.rayleigh")]
                    },
                    {
                        id: "OP-A4", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.circular_aperture"),
                        expressionLatex: `\\\\text{Airy disk radius} = 1.22\\\\frac{\\lambda f}{D}`,
                        targetLatex: `r`,
                        slots: [{ id: "r", labelLatex: `r\\\\text{ (μm)}`, placeholder: "6", expected: 6 }],
                        correctLatex: `6\\\\text{ μm}`,
                        hintLatex: [t("gp3_01.hints.airy_disk")]
                    },
                    {
                        id: "OP-A5", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.resolving_power"),
                        expressionLatex: `R = \\\\frac{D}{1.22\\lambda}`,
                        targetLatex: `R`,
                        slots: [{ id: "R", labelLatex: `R`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `1000`,
                        hintLatex: [t("gp3_01.hints.resolution")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                // 光栅方程 d·sinθ = mλ
                quests.push(
                    {
                        id: "OP-E1", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.grating_equation"),
                        expressionLatex: `d \\sin\\theta = m\\lambda`,
                        targetLatex: `\\theta_1`,
                        slots: [{ id: "theta", labelLatex: `\\theta_1\\\\text{ (°)}`, placeholder: "30", expected: 30 }],
                        correctLatex: `30°`,
                        hintLatex: [t("gp3_01.hints.grating")]
                    },
                    {
                        id: "OP-E2", difficulty, stage,
                        wavelength: 6e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.grating_order"),
                        expressionLatex: `m_{\\\\text{max}} = \\\\frac{d}{\\lambda}`,
                        targetLatex: `m_{\\\\text{max}}`,
                        slots: [{ id: "m", labelLatex: `m_{\\\\text{max}}`, placeholder: "3", expected: 3 }],
                        correctLatex: `3`,
                        hintLatex: [t("gp3_01.hints.max_order")]
                    },
                    {
                        id: "OP-E3", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.grating_spacing"),
                        expressionLatex: `d = \\\\frac{m\\lambda}{\\sin\\theta}`,
                        targetLatex: `d`,
                        slots: [{ id: "d", labelLatex: `d\\\\text{ (μm)}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\\\text{ μm}`,
                        hintLatex: [t("gp3_01.hints.line_spacing")]
                    },
                    {
                        id: "OP-E4", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.spectral_resolution"),
                        expressionLatex: `R = mN`,
                        targetLatex: `R`,
                        slots: [{ id: "R", labelLatex: `R`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `10000`,
                        hintLatex: [t("gp3_01.hints.grating_resolution")]
                    },
                    {
                        id: "OP-E5", difficulty, stage,
                        wavelength: 5e-7, frequency: 0,
                        promptLatex: t("gp3_01.prompts.blazed_grating"),
                        expressionLatex: `\\\\text{Blaze angle} \\rightarrow \\\\text{max efficiency}`,
                        targetLatex: `\\\\text{Purpose}`,
                        slots: [{ id: "purpose", labelLatex: `\\\\text{Purpose}`, placeholder: "efficiency", expected: "efficiency" }],
                        correctLatex: `\\\\text{Maximize efficiency}`,
                        hintLatex: [t("gp3_01.hints.blaze_angle")]
                    }
                );
            }
        }

        return quests;
    }, [t]);

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
    } = useQuestManager<GP301Quest, Stage>({
        buildPool,
        initialStage: "WAVE_PROPERTIES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gp3-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "WAVE_PROPERTIES" as Stage, label: t("gp3_01.stages.wave_properties") },
        { id: "SUPERPOSITION" as Stage, label: t("gp3_01.stages.superposition") },
        { id: "OPTICS" as Stage, label: t("gp3_01.stages.optics") },
    ], [t]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t("gp3_01.title")}
                moduleCode="GP3.01"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t("gp3_01.footer_left")}
                translations={{
                    back: t("gp3_01.back"),
                    check: t("gp3_01.check"),
                    next: t("gp3_01.next"),
                    correct: t("gp3_01.correct"),
                    incorrect: t("gp3_01.incorrect"),
                    difficulty: {
                        basic: t("gp3_01.difficulty.basic"),
                        core: t("gp3_01.difficulty.core"),
                        advanced: t("gp3_01.difficulty.advanced"),
                        elite: t("gp3_01.difficulty.elite"),
                    },
                }}
                monitorContent={<WaveVisualization quest={currentQuest} inputs={inputs} checkStatus={lastCheck} />}
            >
                <div className="text-center text-blue-400 text-xl">{t("gp3_01.complete")}</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t("gp3_01.title")}
            moduleCode="GP3.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("gp3_01.footer_left")}
            translations={{
                back: t("gp3_01.back"),
                check: t("gp3_01.check"),
                next: t("gp3_01.next"),
                correct: t("gp3_01.correct"),
                incorrect: t("gp3_01.incorrect"),
                difficulty: {
                    basic: t("gp3_01.difficulty.basic"),
                    core: t("gp3_01.difficulty.core"),
                    advanced: t("gp3_01.difficulty.advanced"),
                    elite: t("gp3_01.difficulty.elite"),
                },
            }}
            monitorContent={<WaveVisualization quest={currentQuest} inputs={inputs} checkStatus={lastCheck} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/30">
                    <h3 className="text-blue-400 font-bold mb-2">{t("gp3_01.objective_title")}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t(`gp3_01.scenarios.${stage.toLowerCase()}`)}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>
                    
                    <div className="text-blue-300">
                        <InlineMath math={currentQuest.expressionLatex} />
                    </div>

                    <div className="space-y-3">
                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3">
                                <InlineMath math={slot.labelLatex} />
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                    disabled={lastCheck?.ok}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
