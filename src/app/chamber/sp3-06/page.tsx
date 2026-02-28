"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AcousticsVisualization from "@/components/chamber/sp3-06/AcousticsVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { renderMixedText } from "@/lib/latex-utils";

type Stage = "SOUND_WAVES" | "FREQUENCY_PITCH" | "LOUDNESS_INTENSITY";

interface SP306Quest extends Quest {
    stage: Stage;
    soundType?: string;
}

export default function SP306Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP306Quest[] => {
        const quests: SP306Quest[] = [];

        if (stage === "SOUND_WAVES") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "SW-B1", difficulty, stage, soundType: "speed",
                        promptLatex: t("sp3_06.prompts.sound_waves_b1"),
                        expressionLatex: `v = f \\times \\lambda \\Rightarrow \\lambda = \\frac{v}{f}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "wavelength", labelLatex: `\\lambda\\text{ (m)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `0.5\\text{ m}`,
                        hintLatex: [`343 \\div 686 = 0.5`]
                    },
                    {
                        id: "SW-B2", difficulty, stage, soundType: "frequency",
                        promptLatex: t("sp3_06.prompts.sound_waves_b2"),
                        expressionLatex: `f = \\frac{v}{\\lambda}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "680", expected: 680 }],
                        correctLatex: `680\\text{ Hz}`,
                        hintLatex: [`340 \\div 0.5 = 680`]
                    },
                    {
                        id: "SW-B3", difficulty, stage, soundType: "medium",
                        promptLatex: t("sp3_06.prompts.sound_waves_b3"),
                        expressionLatex: t("sp3_06.expressions.sw_b3"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_tf"), placeholder: "true", expected: "true" }],
                        correctLatex: t("sp3_06.corrects.correct_true"),
                        hintLatex: [t("sp3_06.hints.sw_b3")]
                    },
                    {
                        id: "SW-B4", difficulty, stage, soundType: "echo",
                        promptLatex: t("sp3_06.prompts.sound_waves_b4"),
                        expressionLatex: `v = \\frac{2d}{t}`,
                        targetLatex: `v`,
                        slots: [{ id: "speed", labelLatex: `v\\text{ (m/s)}`, placeholder: "343", expected: 343 }],
                        correctLatex: `343\\text{ m/s}`,
                        hintLatex: [t("sp3_06.hints.sw_b4")]
                    },
                    {
                        id: "SW-B5", difficulty, stage, soundType: "vacuum",
                        promptLatex: t("sp3_06.prompts.sound_waves_b5"),
                        expressionLatex: t("sp3_06.expressions.sw_b5"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_yes_no"), placeholder: "no", expected: "no" }],
                        correctLatex: t("sp3_06.corrects.sw_b5"),
                        hintLatex: [t("sp3_06.hints.sw_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "SW-C1", difficulty, stage, soundType: "wavelength_calc",
                        promptLatex: t("sp3_06.prompts.sound_waves_c1"),
                        expressionLatex: `\\lambda = \\frac{v}{f}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "wavelength", labelLatex: `\\lambda\\text{ (m)}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\text{ m}`,
                        hintLatex: [`1480 \\div 740 = 2`]
                    },
                    {
                        id: "SW-C2", difficulty, stage, soundType: "distance",
                        promptLatex: t("sp3_06.prompts.sound_waves_c2"),
                        expressionLatex: `d = v \\times t`,
                        targetLatex: `d`,
                        slots: [{ id: "dist", labelLatex: `d\\text{ (m)}`, placeholder: "1029", expected: 1029 }],
                        correctLatex: `1029\\text{ m} \\approx 1\\text{ km}`,
                        hintLatex: [`343 \\times 3 = 1029`]
                    },
                    {
                        id: "SW-C3", difficulty, stage, soundType: "steel",
                        promptLatex: t("sp3_06.prompts.sound_waves_c3"),
                        expressionLatex: `f = \\frac{v}{\\lambda}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "2980", expected: 2980 }],
                        correctLatex: `2980\\text{ Hz}`,
                        hintLatex: [`5960 \\div 2 = 2980`]
                    },
                    {
                        id: "SW-C4", difficulty, stage, soundType: "reflection",
                        promptLatex: t("sp3_06.prompts.sound_waves_c4"),
                        expressionLatex: `t = \\frac{2d}{v}`,
                        targetLatex: `t`,
                        slots: [{ id: "time", labelLatex: `t\\text{ (s)}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\text{ s}`,
                        hintLatex: [`2 \\times 171.5 \\div 343 = 1`]
                    },
                    {
                        id: "SW-C5", difficulty, stage, soundType: "comparison",
                        promptLatex: t("sp3_06.prompts.sound_waves_c5"),
                        expressionLatex: t("sp3_06.expressions.sw_c5"),
                        targetLatex: t("sp3_06.labels.label_ratio"),
                        slots: [{ id: "ratio", labelLatex: t("sp3_06.labels.label_ratio"), placeholder: "17", expected: 17 }],
                        correctLatex: t("sp3_06.corrects.sw_c5"),
                        hintLatex: [`5960 \\div 343 \\approx 17.4`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "SW-A1", difficulty, stage, soundType: "doppler",
                        promptLatex: t("sp3_06.prompts.sound_waves_a1"),
                        expressionLatex: t("sp3_06.expressions.sw_a1"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_hl"), placeholder: "higher", expected: "higher" }],
                        correctLatex: t("sp3_06.corrects.sw_a1"),
                        hintLatex: [t("sp3_06.hints.sw_a1")]
                    },
                    {
                        id: "SW-A2", difficulty, stage, soundType: "interference",
                        promptLatex: t("sp3_06.prompts.sound_waves_a2"),
                        expressionLatex: t("sp3_06.expressions.sw_a2"),
                        targetLatex: t("sp3_06.labels.label_type"),
                        slots: [{ id: "type", labelLatex: t("sp3_06.labels.label_type"), placeholder: "destructive", expected: "destructive" }],
                        correctLatex: t("sp3_06.corrects.sw_a2"),
                        hintLatex: [t("sp3_06.hints.sw_a2")]
                    },
                    {
                        id: "SW-A3", difficulty, stage, soundType: "refraction",
                        promptLatex: t("sp3_06.prompts.sound_waves_a3"),
                        expressionLatex: t("sp3_06.expressions.sw_a3"),
                        targetLatex: t("sp3_06.targets.phenomenon"),
                        slots: [{ id: "phenom", labelLatex: t("sp3_06.labels.label_name"), placeholder: "refraction", expected: "refraction" }],
                        correctLatex: t("sp3_06.corrects.sw_a3"),
                        hintLatex: [t("sp3_06.hints.sw_a3")]
                    },
                    {
                        id: "SW-A4", difficulty, stage, soundType: "diffraction",
                        promptLatex: t("sp3_06.prompts.sound_waves_a4"),
                        expressionLatex: t("sp3_06.expressions.sw_a4"),
                        targetLatex: t("sp3_06.targets.phenomenon"),
                        slots: [{ id: "phenom", labelLatex: t("sp3_06.labels.label_name"), placeholder: "diffraction", expected: "diffraction" }],
                        correctLatex: t("sp3_06.corrects.sw_a4"),
                        hintLatex: [t("sp3_06.hints.sw_a4")]
                    },
                    {
                        id: "SW-A5", difficulty, stage, soundType: "resonance_freq",
                        promptLatex: t("sp3_06.prompts.sound_waves_a5"),
                        expressionLatex: t("sp3_06.expressions.sw_a5"),
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "512", expected: 512 }],
                        correctLatex: `512\\text{ Hz}`,
                        hintLatex: [t("sp3_06.hints.sw_a5")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "SW-E1", difficulty, stage, soundType: "beat_frequency",
                        promptLatex: t("sp3_06.prompts.sound_waves_e1"),
                        expressionLatex: `f_{\\text{beat}} = |f_1 - f_2|`,
                        targetLatex: `f_{\\text{beat}}`,
                        slots: [{ id: "beat", labelLatex: `f_{\\text{beat}}\\text{ (Hz)}`, placeholder: "4", expected: 4 }],
                        correctLatex: `4\\text{ Hz}`,
                        hintLatex: [`|440 - 444| = 4`]
                    },
                    {
                        id: "SW-E2", difficulty, stage, soundType: "standing_wave",
                        promptLatex: t("sp3_06.prompts.sound_waves_e2"),
                        expressionLatex: `f = \\frac{v}{4L}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "170", expected: 170 }],
                        correctLatex: `170\\text{ Hz}`,
                        hintLatex: [`340 \\div (4 \\times 0.5) = 170`]
                    },
                    {
                        id: "SW-E3", difficulty, stage, soundType: "resonance",
                        promptLatex: t("sp3_06.prompts.sound_waves_e3"),
                        expressionLatex: `f = \\frac{v}{2L}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "170", expected: 170 }],
                        correctLatex: `170\\text{ Hz}`,
                        hintLatex: [`340 \\div (2 \\times 1) = 170`]
                    },
                    {
                        id: "SW-E4", difficulty, stage, soundType: "sonic_boom",
                        promptLatex: t("sp3_06.prompts.sound_waves_e4"),
                        expressionLatex: t("sp3_06.expressions.sw_e4"),
                        targetLatex: t("sp3_06.targets.phenomenon"),
                        slots: [{ id: "phenom", labelLatex: t("sp3_06.labels.label_name"), placeholder: "sonic boom", expected: "sonic boom" }],
                        correctLatex: t("sp3_06.corrects.sw_e4"),
                        hintLatex: [t("sp3_06.hints.sw_e4")]
                    },
                    {
                        id: "SW-E5", difficulty, stage, soundType: "acoustic_impedance",
                        promptLatex: t("sp3_06.prompts.sound_waves_e5"),
                        expressionLatex: t("sp3_06.expressions.sw_e5"),
                        targetLatex: t("sp3_06.labels.label_reason"),
                        slots: [{ id: "reason", labelLatex: t("sp3_06.labels.label_reason"), placeholder: "impedance", expected: "impedance" }],
                        correctLatex: t("sp3_06.corrects.sw_e5"),
                        hintLatex: [t("sp3_06.hints.sw_e5")]
                    }
                );
            }
        }

        if (stage === "FREQUENCY_PITCH") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "FP-B1", difficulty, stage, soundType: "hearing_range",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_b1"),
                        expressionLatex: t("sp3_06.expressions.fp_b1"),
                        targetLatex: `f_{\\text{max}}`,
                        slots: [{ id: "freq", labelLatex: `f_{\\text{max}}\\text{ (Hz)}`, placeholder: "20000", expected: 20000 }],
                        correctLatex: `20{,}000\\text{ Hz}`,
                        hintLatex: [t("sp3_06.hints.fp_b1")]
                    },
                    {
                        id: "FP-B2", difficulty, stage, soundType: "pitch",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_b2"),
                        expressionLatex: t("sp3_06.expressions.fp_b2"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_hl"), placeholder: "higher", expected: "higher" }],
                        correctLatex: t("sp3_06.corrects.fp_b2"),
                        hintLatex: [t("sp3_06.hints.fp_b2")]
                    },
                    {
                        id: "FP-B3", difficulty, stage, soundType: "concert_pitch",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_b3"),
                        expressionLatex: t("sp3_06.expressions.fp_b3"),
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "880", expected: 880 }],
                        correctLatex: `880\\text{ Hz}`,
                        hintLatex: [`440 \\times 2 = 880`]
                    },
                    {
                        id: "FP-B4", difficulty, stage, soundType: "ultrasound",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_b4"),
                        expressionLatex: t("sp3_06.expressions.fp_b4"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_yes_no"), placeholder: "no", expected: "no" }],
                        correctLatex: t("sp3_06.corrects.correct_no"),
                        hintLatex: [t("sp3_06.hints.fp_b4")]
                    },
                    {
                        id: "FP-B5", difficulty, stage, soundType: "infrasound",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_b5"),
                        expressionLatex: t("sp3_06.expressions.fp_b5"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_yes_no"), placeholder: "no", expected: "no" }],
                        correctLatex: t("sp3_06.corrects.correct_no"),
                        hintLatex: [t("sp3_06.hints.fp_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "FP-C1", difficulty, stage, soundType: "octave",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_c1"),
                        expressionLatex: `f_{\\text{octave}} = 2f`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "524", expected: 524 }],
                        correctLatex: `524\\text{ Hz}`,
                        hintLatex: [`262 \\times 2 = 524`]
                    },
                    {
                        id: "FP-C2", difficulty, stage, soundType: "semitone",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_c2"),
                        expressionLatex: `f_{\\text{semitone}} = f \\times 2^{1/12}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "466", expected: 466 }],
                        correctLatex: `466\\text{ Hz}`,
                        hintLatex: [`440 \\times 1.0595 \\approx 466`]
                    },
                    {
                        id: "FP-C3", difficulty, stage, soundType: "harmonics",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_c3"),
                        expressionLatex: `f_2 = 2f_1`,
                        targetLatex: `f_2`,
                        slots: [{ id: "freq", labelLatex: `f_2\\text{ (Hz)}`, placeholder: "880", expected: 880 }],
                        correctLatex: `880\\text{ Hz}`,
                        hintLatex: [t("sp3_06.hints.fp_c3")]
                    },
                    {
                        id: "FP-C4", difficulty, stage, soundType: "bat_echolocation",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_c4"),
                        expressionLatex: `50{,}000 > 20{,}000`,
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_yes_no"), placeholder: "yes", expected: "yes" }],
                        correctLatex: t("sp3_06.corrects.fp_c4"),
                        hintLatex: [`50{,}000 \\text{ Hz} > 20{,}000 \\text{ Hz}`]
                    },
                    {
                        id: "FP-C5", difficulty, stage, soundType: "third_harmonic",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_c5"),
                        expressionLatex: `f_3 = 3f_1`,
                        targetLatex: `f_3`,
                        slots: [{ id: "freq", labelLatex: `f_3\\text{ (Hz)}`, placeholder: "600", expected: 600 }],
                        correctLatex: `600\\text{ Hz}`,
                        hintLatex: [`200 \\times 3 = 600`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "FP-A1", difficulty, stage, soundType: "interval",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_a1"),
                        expressionLatex: `f_G = \\frac{3}{2} \\times f_C`,
                        targetLatex: `f_G`,
                        slots: [{ id: "freq", labelLatex: `f_G\\text{ (Hz)}`, placeholder: "393", expected: 393 }],
                        correctLatex: `393\\text{ Hz}`,
                        hintLatex: [`262 \\times 1.5 = 393`]
                    },
                    {
                        id: "FP-A2", difficulty, stage, soundType: "timbre",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_a2"),
                        expressionLatex: t("sp3_06.expressions.fp_a2"),
                        targetLatex: t("sp3_06.labels.label_property"),
                        slots: [{ id: "prop", labelLatex: t("sp3_06.labels.label_property"), placeholder: "timbre", expected: "timbre" }],
                        correctLatex: t("sp3_06.corrects.fp_a2"),
                        hintLatex: [t("sp3_06.hints.fp_a2")]
                    },
                    {
                        id: "FP-A3", difficulty, stage, soundType: "medical_ultrasound",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_a3"),
                        expressionLatex: `\\text{MHz} = 10^6 \\text{ Hz} >> 20{,}000 \\text{ Hz}`,
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_above_below"), placeholder: "above", expected: "above" }],
                        correctLatex: t("sp3_06.corrects.fp_a3"),
                        hintLatex: [`2 \\text{ MHz} = 2{,}000{,}000 \\text{ Hz}`]
                    },
                    {
                        id: "FP-A4", difficulty, stage, soundType: "earthquake",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_a4"),
                        expressionLatex: `5 < 20 \\text{ Hz}`,
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_yes_no"), placeholder: "no", expected: "no" }],
                        correctLatex: t("sp3_06.corrects.fp_a4"),
                        hintLatex: [`5 \\text{ Hz} < 20 \\text{ Hz}`]
                    },
                    {
                        id: "FP-A5", difficulty, stage, soundType: "critical_bands",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_a5"),
                        expressionLatex: t("sp3_06.expressions.fp_a5"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_yes_no"), placeholder: "yes", expected: "yes" }],
                        correctLatex: t("sp3_06.corrects.fp_a5"),
                        hintLatex: [t("sp3_06.hints.fp_a5")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "FP-E1", difficulty, stage, soundType: "equal_temperament",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_e1"),
                        expressionLatex: `r = 2^{1/12}`,
                        targetLatex: `r`,
                        slots: [{ id: "ratio", labelLatex: `r`, placeholder: "1.06", expected: 1.06 }],
                        correctLatex: `1.0595`,
                        hintLatex: [`2^{1/12} \\approx 1.0595`]
                    },
                    {
                        id: "FP-E2", difficulty, stage, soundType: "just_intonation",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_e2"),
                        expressionLatex: `\\frac{3}{2} = 1.5, \\quad 2^{7/12} \\approx 1.498`,
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_just_equal"), placeholder: "just", expected: "just" }],
                        correctLatex: t("sp3_06.corrects.fp_e2"),
                        hintLatex: [`1.5 > 1.498`]
                    },
                    {
                        id: "FP-E3", difficulty, stage, soundType: "formants",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_e3"),
                        expressionLatex: t("sp3_06.expressions.fp_e3"),
                        targetLatex: t("sp3_06.labels.label_term"),
                        slots: [{ id: "term", labelLatex: t("sp3_06.labels.label_term"), placeholder: "formants", expected: "formants" }],
                        correctLatex: t("sp3_06.corrects.fp_e3"),
                        hintLatex: [t("sp3_06.hints.fp_e3")]
                    },
                    {
                        id: "FP-E4", difficulty, stage, soundType: "missing_fundamental",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_e4"),
                        expressionLatex: t("sp3_06.expressions.fp_e4"),
                        targetLatex: `f_0`,
                        slots: [{ id: "freq", labelLatex: `f_0\\text{ (Hz)}`, placeholder: "200", expected: 200 }],
                        correctLatex: t("sp3_06.corrects.fp_e4"),
                        hintLatex: [`\\text{GCD}(400, 600, 800) = 200`]
                    },
                    {
                        id: "FP-E5", difficulty, stage, soundType: "masking",
                        promptLatex: t("sp3_06.prompts.frequency_pitch_e5"),
                        expressionLatex: t("sp3_06.expressions.fp_e5"),
                        targetLatex: t("sp3_06.labels.label_effect"),
                        slots: [{ id: "effect", labelLatex: t("sp3_06.labels.label_effect"), placeholder: "masking", expected: "masking" }],
                        correctLatex: t("sp3_06.corrects.fp_e5"),
                        hintLatex: [t("sp3_06.hints.fp_e5")]
                    }
                );
            }
        }

        if (stage === "LOUDNESS_INTENSITY") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "LI-B1", difficulty, stage, soundType: "whisper",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_b1"),
                        expressionLatex: `\\Delta L = 30 \\text{ dB} \\Rightarrow 10^{3} = 1000\\times`,
                        targetLatex: t("sp3_06.labels.label_ratio"),
                        slots: [{ id: "ratio", labelLatex: t("sp3_06.labels.label_ratio"), placeholder: "1000", expected: 1000 }],
                        correctLatex: `1000\\times`,
                        hintLatex: [`10 \\text{ dB} = 10\\times, \\quad 30 \\text{ dB} = 10^{3} = 1000\\times`]
                    },
                    {
                        id: "LI-B2", difficulty, stage, soundType: "hearing_threshold",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_b2"),
                        expressionLatex: `I_0 = 10^{-12} \\text{ W/m}^{2}`,
                        targetLatex: `I_0`,
                        slots: [{ id: "intensity", labelLatex: `I_0\\text{ (W/m}^{2}\\text{)}`, placeholder: "1e-12", expected: 1e-12 }],
                        correctLatex: `10^{-12}\\text{ W/m}^{2}`,
                        hintLatex: [t("sp3_06.hints.li_b2")]
                    },
                    {
                        id: "LI-B3", difficulty, stage, soundType: "pain_threshold",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_b3"),
                        expressionLatex: t("sp3_06.expressions.li_b3"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_safe"), placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{No (causes pain and damage)}`,
                        hintLatex: [`140 \\text{ dB} >> 85 \\text{ dB}`]
                    },
                    {
                        id: "LI-B4", difficulty, stage, soundType: "distance_effect",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_b4"),
                        expressionLatex: `\\Delta L = 10 \\log_{10}(1/4) \\approx -6 \\text{ dB}`,
                        targetLatex: `\\Delta L`,
                        slots: [{ id: "change", labelLatex: `\\Delta L\\text{ (dB)}`, placeholder: "-6", expected: -6 }],
                        correctLatex: `-6\\text{ dB}`,
                        hintLatex: [t("sp3_06.hints.li_b4")]
                    },
                    {
                        id: "LI-B5", difficulty, stage, soundType: "safe_level",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_b5"),
                        expressionLatex: t("sp3_06.expressions.li_b3"),
                        targetLatex: t("sp3_06.targets.answer"),
                        slots: [{ id: "ans", labelLatex: t("sp3_06.labels.label_tf"), placeholder: "true", expected: "true" }],
                        correctLatex: `\\text{True}`,
                        hintLatex: [t("sp3_06.hints.li_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "LI-C1", difficulty, stage, soundType: "decibel_calc",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_c1"),
                        expressionLatex: `\\Delta L = 10 \\text{ dB} \\Rightarrow 10\\times`,
                        targetLatex: t("sp3_06.labels.label_ratio"),
                        slots: [{ id: "ratio", labelLatex: t("sp3_06.labels.label_ratio"), placeholder: "10", expected: 10 }],
                        correctLatex: `10\\times`,
                        hintLatex: [t("sp3_06.hints.li_c1")]
                    },
                    {
                        id: "LI-C2", difficulty, stage, soundType: "intensity_to_db",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_c2"),
                        expressionLatex: `L = 10 \\log_{10}(I/I_0)`,
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "20", expected: 20 }],
                        correctLatex: `20\\text{ dB}`,
                        hintLatex: [`10 \\log_{10}(10^{-10}/10^{-12}) = 10 \\log_{10}(100) = 20`]
                    },
                    {
                        id: "LI-C3", difficulty, stage, soundType: "distance_double",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_c3"),
                        expressionLatex: t("sp3_06.expressions.li_c3"),
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "74", expected: 74 }],
                        correctLatex: `74\\text{ dB}`,
                        hintLatex: [`80 - 6 = 74`]
                    },
                    {
                        id: "LI-C4", difficulty, stage, soundType: "rock_concert",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_c4"),
                        expressionLatex: `\\Delta L = 40 \\text{ dB} \\Rightarrow 10^{4} = 10{,}000\\times`,
                        targetLatex: t("sp3_06.labels.label_ratio"),
                        slots: [{ id: "ratio", labelLatex: t("sp3_06.labels.label_ratio"), placeholder: "10000", expected: 10000 }],
                        correctLatex: `10{,}000\\times`,
                        hintLatex: [`40 \\text{ dB} = 10^{4} = 10{,}000\\times`]
                    },
                    {
                        id: "LI-C5", difficulty, stage, soundType: "db_to_intensity",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_c5"),
                        expressionLatex: `I = I_0 \\times 10^{L/10}`,
                        targetLatex: `I`,
                        slots: [{ id: "intensity", labelLatex: `I\\text{ (W/m}^{2}\\text{)}`, placeholder: "1e-9", expected: 1e-9 }],
                        correctLatex: `10^{-9}\\text{ W/m}^{2}`,
                        hintLatex: [`10^{-12} \\times 10^{30/10} = 10^{-12} \\times 10^{3} = 10^{-9}`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "LI-A1", difficulty, stage, soundType: "inverse_square",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_a1"),
                        expressionLatex: t("sp3_06.expressions.li_a1"),
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "40", expected: 40 }],
                        correctLatex: `40\\text{ dB}`,
                        hintLatex: [t("sp3_06.hints.li_a1")]
                    },
                    {
                        id: "LI-A2", difficulty, stage, soundType: "combining_sources",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_a2"),
                        expressionLatex: t("sp3_06.expressions.li_a2"),
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "63", expected: 63 }],
                        correctLatex: `63\\text{ dB}`,
                        hintLatex: [`10 \\log_{10}(2) \\approx 3 \\text{ dB}`]
                    },
                    {
                        id: "LI-A3", difficulty, stage, soundType: "absorption",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_a3"),
                        expressionLatex: `\\Delta L = 10 \\log_{10}(1/2) \\approx -3 \\text{ dB}`,
                        targetLatex: `\\Delta L`,
                        slots: [{ id: "change", labelLatex: `\\Delta L\\text{ (dB)}`, placeholder: "-3", expected: -3 }],
                        correctLatex: `-3\\text{ dB}`,
                        hintLatex: [`10 \\log_{10}(0.5) \\approx -3`]
                    },
                    {
                        id: "LI-A4", difficulty, stage, soundType: "jet_engine",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_a4"),
                        expressionLatex: t("sp3_06.expressions.li_a1"),
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "110", expected: 110 }],
                        correctLatex: `110\\text{ dB}`,
                        hintLatex: [`130 - 20 = 110`]
                    },
                    {
                        id: "LI-A5", difficulty, stage, soundType: "four_sources",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_a5"),
                        expressionLatex: t("sp3_06.expressions.li_a5"),
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "56", expected: 56 }],
                        correctLatex: `56\\text{ dB}`,
                        hintLatex: [`10 \\log_{10}(4) \\approx 6 \\text{ dB}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "LI-E1", difficulty, stage, soundType: "phon",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_e1"),
                        expressionLatex: t("sp3_06.expressions.li_e1"),
                        targetLatex: t("sp3_06.labels.label_unit"),
                        slots: [{ id: "unit", labelLatex: t("sp3_06.labels.label_unit"), placeholder: "phon", expected: "phon" }],
                        correctLatex: `\\text{Phon}`,
                        hintLatex: [t("sp3_06.hints.li_e1")]
                    },
                    {
                        id: "LI-E2", difficulty, stage, soundType: "sone",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_e2"),
                        expressionLatex: t("sp3_06.expressions.li_e2"),
                        targetLatex: t("sp3_06.labels.label_ratio"),
                        slots: [{ id: "ratio", labelLatex: t("sp3_06.labels.label_ratio"), placeholder: "2", expected: 2 }],
                        correctLatex: `2\\times \\text{ louder}`,
                        hintLatex: [t("sp3_06.hints.li_e2")]
                    },
                    {
                        id: "LI-E3", difficulty, stage, soundType: "a_weighting",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_e3"),
                        expressionLatex: t("sp3_06.expressions.li_e3"),
                        targetLatex: t("sp3_06.labels.label_symbol"),
                        slots: [{ id: "symbol", labelLatex: t("sp3_06.labels.label_symbol"), placeholder: "dBA", expected: "dBA" }],
                        correctLatex: `\\text{dB(A) or dBA}`,
                        hintLatex: [t("sp3_06.hints.li_e3")]
                    },
                    {
                        id: "LI-E4", difficulty, stage, soundType: "noise_dose",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_e4"),
                        expressionLatex: t("sp3_06.expressions.li_e4"),
                        targetLatex: t("sp3_06.labels.label_dose"),
                        slots: [{ id: "dose", labelLatex: t("sp3_06.labels.label_dose"), placeholder: "100", expected: 100 }],
                        correctLatex: `100\\%`,
                        hintLatex: [t("sp3_06.hints.li_e4")]
                    },
                    {
                        id: "LI-E5", difficulty, stage, soundType: "itu_weighting",
                        promptLatex: t("sp3_06.prompts.loudness_intensity_e5"),
                        expressionLatex: t("sp3_06.expressions.li_e5"),
                        targetLatex: t("sp3_06.labels.label_application"),
                        slots: [{ id: "app", labelLatex: t("sp3_06.labels.label_application"), placeholder: "noise", expected: "noise" }],
                        correctLatex: `\\text{Audio noise/hiss}`,
                        hintLatex: [t("sp3_06.hints.li_e5")]
                    }
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
      adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SP306Quest, Stage>({
    moduleCode: "sp3-06",
        buildPool,
        initialStage: "SOUND_WAVES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-06", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "SOUND_WAVES" as Stage, label: t("sp3_06.stages.sound_waves") },
        { id: "FREQUENCY_PITCH" as Stage, label: t("sp3_06.stages.frequency_pitch") },
        { id: "LOUDNESS_INTENSITY" as Stage, label: t("sp3_06.stages.loudness_intensity") },
    ], [t]);

    if (!currentQuest) {
        return (
            <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sp3_06.title")}
                moduleCode="SP3.06"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t("sp3_06.footer_left")}
                translations={{
                    back: t("sp3_06.back"),
                    check: t("sp3_06.check"),
                    next: t("sp3_06.next"),
                    correct: t("sp3_06.correct"),
                    incorrect: t("sp3_06.incorrect"),
                    difficulty: t("sp3_06.difficulty"),
                }}
                monitorContent={<AcousticsVisualization stage={stage} />}
            >
                <div className="text-center text-blue-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sp3_06.title")}
            moduleCode="SP3.06"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sp3_06.footer_left")}
            translations={{
                back: t("sp3_06.back"),
                check: t("sp3_06.check"),
                next: t("sp3_06.next"),
                correct: t("sp3_06.correct"),
                incorrect: t("sp3_06.incorrect"),
                difficulty: t("sp3_06.difficulty"),
            }}
            monitorContent={<AcousticsVisualization stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/30">
                    <h3 className="text-blue-400 font-bold mb-2">{t("sp3_06.objective_title")}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t(`sp3_06.scenarios.${stage.toLowerCase()}`)}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        {renderMixedText(currentQuest?.promptLatex || "")}
                    </div>
                    
                    <div className="text-blue-300">
                        <InlineMath math={currentQuest?.expressionLatex || ""} />
                    </div>

                    <div className="space-y-3">
                        {currentQuest?.slots.map((slot) => (
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
