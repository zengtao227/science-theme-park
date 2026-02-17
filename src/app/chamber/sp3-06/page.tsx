"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AcousticsVisualization from "@/components/chamber/sp3-06/AcousticsVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

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
                        promptLatex: `\\text{Sound speed in air at 20°C is 343 m/s. A sound wave has frequency 686 Hz. Wavelength?}`,
                        expressionLatex: `v = f \\times \\lambda \\Rightarrow \\lambda = \\frac{v}{f}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "wavelength", labelLatex: `\\lambda\\text{ (m)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `0.5\\text{ m}`,
                        hintLatex: [`343 \\div 686 = 0.5`]
                    },
                    {
                        id: "SW-B2", difficulty, stage, soundType: "frequency",
                        promptLatex: `\\text{Sound wave: wavelength 0.5 m, speed 340 m/s. What is frequency?}`,
                        expressionLatex: `f = \\frac{v}{\\lambda}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "680", expected: 680 }],
                        correctLatex: `680\\text{ Hz}`,
                        hintLatex: [`340 \\div 0.5 = 680`]
                    },
                    {
                        id: "SW-B3", difficulty, stage, soundType: "medium",
                        promptLatex: `\\text{Sound travels faster in water (1480 m/s) than air (343 m/s). True or false?}`,
                        expressionLatex: `\\text{Denser medium} \\rightarrow \\text{faster sound}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{T/F}`, placeholder: "true", expected: "true" }],
                        correctLatex: `\\text{True}`,
                        hintLatex: [`\\text{Water is denser than air}`]
                    },
                    {
                        id: "SW-B4", difficulty, stage, soundType: "echo",
                        promptLatex: `\\text{Echo returns after 2 seconds. Wall is 343 m away. Sound speed?}`,
                        expressionLatex: `v = \\frac{2d}{t}`,
                        targetLatex: `v`,
                        slots: [{ id: "speed", labelLatex: `v\\text{ (m/s)}`, placeholder: "343", expected: 343 }],
                        correctLatex: `343\\text{ m/s}`,
                        hintLatex: [`\\text{Sound travels to wall and back: } 2 \\times 343 \\div 2 = 343`]
                    },
                    {
                        id: "SW-B5", difficulty, stage, soundType: "vacuum",
                        promptLatex: `\\text{Can sound travel through vacuum (empty space)?}`,
                        expressionLatex: `\\text{Sound needs medium}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{No (needs medium)}`,
                        hintLatex: [`\\text{Sound is mechanical wave}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "SW-C1", difficulty, stage, soundType: "wavelength_calc",
                        promptLatex: `\\text{Sound in water: speed 1480 m/s, frequency 740 Hz. Wavelength?}`,
                        expressionLatex: `\\lambda = \\frac{v}{f}`,
                        targetLatex: `\\lambda`,
                        slots: [{ id: "wavelength", labelLatex: `\\lambda\\text{ (m)}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\text{ m}`,
                        hintLatex: [`1480 \\div 740 = 2`]
                    },
                    {
                        id: "SW-C2", difficulty, stage, soundType: "distance",
                        promptLatex: `\\text{Thunder heard 3 seconds after lightning. How far is storm? (v = 343 m/s)}`,
                        expressionLatex: `d = v \\times t`,
                        targetLatex: `d`,
                        slots: [{ id: "dist", labelLatex: `d\\text{ (m)}`, placeholder: "1029", expected: 1029 }],
                        correctLatex: `1029\\text{ m} \\approx 1\\text{ km}`,
                        hintLatex: [`343 \\times 3 = 1029`]
                    },
                    {
                        id: "SW-C3", difficulty, stage, soundType: "steel",
                        promptLatex: `\\text{Sound in steel: speed 5960 m/s, wavelength 2 m. Frequency?}`,
                        expressionLatex: `f = \\frac{v}{\\lambda}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "2980", expected: 2980 }],
                        correctLatex: `2980\\text{ Hz}`,
                        hintLatex: [`5960 \\div 2 = 2980`]
                    },
                    {
                        id: "SW-C4", difficulty, stage, soundType: "reflection",
                        promptLatex: `\\text{Sound reflects off wall 171.5 m away. Echo time? (v = 343 m/s)}`,
                        expressionLatex: `t = \\frac{2d}{v}`,
                        targetLatex: `t`,
                        slots: [{ id: "time", labelLatex: `t\\text{ (s)}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\text{ s}`,
                        hintLatex: [`2 \\times 171.5 \\div 343 = 1`]
                    },
                    {
                        id: "SW-C5", difficulty, stage, soundType: "comparison",
                        promptLatex: `\\text{Sound travels 5960 m/s in steel, 343 m/s in air. How many times faster in steel?}`,
                        expressionLatex: `\\text{Ratio} = \\frac{v_{\\text{steel}}}{v_{\\text{air}}}`,
                        targetLatex: `\\text{Ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\text{Ratio}`, placeholder: "17", expected: 17 }],
                        correctLatex: `\\approx 17\\text{ times}`,
                        hintLatex: [`5960 \\div 343 \\approx 17.4`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "SW-A1", difficulty, stage, soundType: "doppler",
                        promptLatex: `\\text{Ambulance siren 500 Hz approaches at 30 m/s. Observed frequency higher or lower?}`,
                        expressionLatex: `\\text{Doppler effect: approaching} \\rightarrow \\text{higher}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{H/L}`, placeholder: "higher", expected: "higher" }],
                        correctLatex: `\\text{Higher (Doppler effect)}`,
                        hintLatex: [`\\text{Approaching source = compressed waves}`]
                    },
                    {
                        id: "SW-A2", difficulty, stage, soundType: "interference",
                        promptLatex: `\\text{Two speakers emit same frequency in phase. At some point waves cancel. What interference?}`,
                        expressionLatex: `\\text{Cancellation} = \\text{destructive interference}`,
                        targetLatex: `\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\text{Type}`, placeholder: "destructive", expected: "destructive" }],
                        correctLatex: `\\text{Destructive}`,
                        hintLatex: [`\\text{Waves cancel = destructive}`]
                    },
                    {
                        id: "SW-A3", difficulty, stage, soundType: "refraction",
                        promptLatex: `\\text{Sound bends when entering water from air. What is this called?}`,
                        expressionLatex: `\\text{Bending at boundary} = \\text{refraction}`,
                        targetLatex: `\\text{Phenomenon}`,
                        slots: [{ id: "phenom", labelLatex: `\\text{Name}`, placeholder: "refraction", expected: "refraction" }],
                        correctLatex: `\\text{Refraction}`,
                        hintLatex: [`\\text{Speed change causes bending}`]
                    },
                    {
                        id: "SW-A4", difficulty, stage, soundType: "diffraction",
                        promptLatex: `\\text{Sound bends around corners. What is this called?}`,
                        expressionLatex: `\\text{Bending around obstacles} = \\text{diffraction}`,
                        targetLatex: `\\text{Phenomenon}`,
                        slots: [{ id: "phenom", labelLatex: `\\text{Name}`, placeholder: "diffraction", expected: "diffraction" }],
                        correctLatex: `\\text{Diffraction}`,
                        hintLatex: [`\\text{Waves spread around obstacles}`]
                    },
                    {
                        id: "SW-A5", difficulty, stage, soundType: "resonance_freq",
                        promptLatex: `\\text{Tuning fork vibrates at 512 Hz near open tube. Tube resonates. What is tube's natural frequency?}`,
                        expressionLatex: `\\text{Resonance occurs at natural frequency}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "512", expected: 512 }],
                        correctLatex: `512\\text{ Hz}`,
                        hintLatex: [`\\text{Resonance = matching frequencies}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "SW-E1", difficulty, stage, soundType: "beat_frequency",
                        promptLatex: `\\text{Two tuning forks: 440 Hz and 444 Hz. Beat frequency?}`,
                        expressionLatex: `f_{\\text{beat}} = |f_1 - f_2|`,
                        targetLatex: `f_{\\text{beat}}`,
                        slots: [{ id: "beat", labelLatex: `f_{\\text{beat}}\\text{ (Hz)}`, placeholder: "4", expected: 4 }],
                        correctLatex: `4\\text{ Hz}`,
                        hintLatex: [`|440 - 444| = 4`]
                    },
                    {
                        id: "SW-E2", difficulty, stage, soundType: "standing_wave",
                        promptLatex: `\\text{Pipe length 0.5 m, closed at one end. Fundamental frequency? (v = 340 m/s)}`,
                        expressionLatex: `f = \\frac{v}{4L}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "170", expected: 170 }],
                        correctLatex: `170\\text{ Hz}`,
                        hintLatex: [`340 \\div (4 \\times 0.5) = 170`]
                    },
                    {
                        id: "SW-E3", difficulty, stage, soundType: "resonance",
                        promptLatex: `\\text{Open pipe 1 m long. Fundamental frequency? (v = 340 m/s)}`,
                        expressionLatex: `f = \\frac{v}{2L}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "170", expected: 170 }],
                        correctLatex: `170\\text{ Hz}`,
                        hintLatex: [`340 \\div (2 \\times 1) = 170`]
                    },
                    {
                        id: "SW-E4", difficulty, stage, soundType: "sonic_boom",
                        promptLatex: `\\text{Aircraft exceeds sound speed. What phenomenon occurs?}`,
                        expressionLatex: `v > v_{\\text{sound}} \\rightarrow \\text{shock wave}`,
                        targetLatex: `\\text{Phenomenon}`,
                        slots: [{ id: "phenom", labelLatex: `\\text{Name}`, placeholder: "sonic boom", expected: "sonic boom" }],
                        correctLatex: `\\text{Sonic boom}`,
                        hintLatex: [`\\text{Supersonic = shock wave}`]
                    },
                    {
                        id: "SW-E5", difficulty, stage, soundType: "acoustic_impedance",
                        promptLatex: `\\text{Sound reflects strongly at air-water boundary. Why?}`,
                        expressionLatex: `\\text{Large impedance mismatch} \\rightarrow \\text{strong reflection}`,
                        targetLatex: `\\text{Reason}`,
                        slots: [{ id: "reason", labelLatex: `\\text{Reason}`, placeholder: "impedance", expected: "impedance" }],
                        correctLatex: `\\text{Acoustic impedance mismatch}`,
                        hintLatex: [`\\text{Different densities = impedance difference}`]
                    }
                );
            }
        }

        if (stage === "FREQUENCY_PITCH") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "FP-B1", difficulty, stage, soundType: "hearing_range",
                        promptLatex: `\\text{Human hearing range is approximately 20 Hz to how many Hz?}`,
                        expressionLatex: `\\text{Upper limit of human hearing}`,
                        targetLatex: `f_{\\text{max}}`,
                        slots: [{ id: "freq", labelLatex: `f_{\\text{max}}\\text{ (Hz)}`, placeholder: "20000", expected: 20000 }],
                        correctLatex: `20{,}000\\text{ Hz}`,
                        hintLatex: [`\\text{20 Hz to 20 kHz}`]
                    },
                    {
                        id: "FP-B2", difficulty, stage, soundType: "pitch",
                        promptLatex: `\\text{Higher frequency sounds have higher or lower pitch?}`,
                        expressionLatex: `\\text{Frequency} \\uparrow \\Rightarrow \\text{Pitch} \\uparrow`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{H/L}`, placeholder: "higher", expected: "higher" }],
                        correctLatex: `\\text{Higher pitch}`,
                        hintLatex: [`\\text{More vibrations = higher pitch}`]
                    },
                    {
                        id: "FP-B3", difficulty, stage, soundType: "concert_pitch",
                        promptLatex: `\\text{Concert pitch A4 has frequency 440 Hz. A5 is one octave higher. Frequency of A5?}`,
                        expressionLatex: `\\text{Octave} \\rightarrow \\text{double frequency}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "880", expected: 880 }],
                        correctLatex: `880\\text{ Hz}`,
                        hintLatex: [`440 \\times 2 = 880`]
                    },
                    {
                        id: "FP-B4", difficulty, stage, soundType: "ultrasound",
                        promptLatex: `\\text{Ultrasound is sound above 20,000 Hz. Can humans hear it?}`,
                        expressionLatex: `\\text{Above hearing range}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{No}`,
                        hintLatex: [`\\text{Ultra = beyond human hearing}`]
                    },
                    {
                        id: "FP-B5", difficulty, stage, soundType: "infrasound",
                        promptLatex: `\\text{Infrasound is sound below 20 Hz. Can humans hear it?}`,
                        expressionLatex: `\\text{Below hearing range}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{No}`,
                        hintLatex: [`\\text{Infra = below human hearing}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "FP-C1", difficulty, stage, soundType: "octave",
                        promptLatex: `\\text{C4 is 262 Hz. C5 is one octave higher. Frequency of C5?}`,
                        expressionLatex: `f_{\\text{octave}} = 2f`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "524", expected: 524 }],
                        correctLatex: `524\\text{ Hz}`,
                        hintLatex: [`262 \\times 2 = 524`]
                    },
                    {
                        id: "FP-C2", difficulty, stage, soundType: "semitone",
                        promptLatex: `\\text{A4 is 440 Hz. A#4 (one semitone up) is 440 × 1.0595. What is A#4 frequency?}`,
                        expressionLatex: `f_{\\text{semitone}} = f \\times 2^{1/12}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "466", expected: 466 }],
                        correctLatex: `466\\text{ Hz}`,
                        hintLatex: [`440 \\times 1.0595 \\approx 466`]
                    },
                    {
                        id: "FP-C3", difficulty, stage, soundType: "harmonics",
                        promptLatex: `\\text{Violin plays A4 (440 Hz). Second harmonic frequency?}`,
                        expressionLatex: `f_2 = 2f_1`,
                        targetLatex: `f_2`,
                        slots: [{ id: "freq", labelLatex: `f_2\\text{ (Hz)}`, placeholder: "880", expected: 880 }],
                        correctLatex: `880\\text{ Hz}`,
                        hintLatex: [`\\text{2nd harmonic = 2 × fundamental}`]
                    },
                    {
                        id: "FP-C4", difficulty, stage, soundType: "bat_echolocation",
                        promptLatex: `\\text{Bats use ultrasound at 50,000 Hz for echolocation. Is this above human hearing?}`,
                        expressionLatex: `50{,}000 > 20{,}000`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{Yes (ultrasound)}`,
                        hintLatex: [`50{,}000 \\text{ Hz} > 20{,}000 \\text{ Hz}`]
                    },
                    {
                        id: "FP-C5", difficulty, stage, soundType: "third_harmonic",
                        promptLatex: `\\text{Guitar string fundamental 200 Hz. Third harmonic frequency?}`,
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
                        promptLatex: `\\text{Perfect fifth: frequency ratio 3:2. If C4 is 262 Hz, what is G4?}`,
                        expressionLatex: `f_G = \\frac{3}{2} \\times f_C`,
                        targetLatex: `f_G`,
                        slots: [{ id: "freq", labelLatex: `f_G\\text{ (Hz)}`, placeholder: "393", expected: 393 }],
                        correctLatex: `393\\text{ Hz}`,
                        hintLatex: [`262 \\times 1.5 = 393`]
                    },
                    {
                        id: "FP-A2", difficulty, stage, soundType: "timbre",
                        promptLatex: `\\text{Two instruments play same note (440 Hz) but sound different. What differs?}`,
                        expressionLatex: `\\text{Different harmonic content}`,
                        targetLatex: `\\text{Property}`,
                        slots: [{ id: "prop", labelLatex: `\\text{Property}`, placeholder: "timbre", expected: "timbre" }],
                        correctLatex: `\\text{Timbre (tone quality)}`,
                        hintLatex: [`\\text{Harmonic mix = timbre}`]
                    },
                    {
                        id: "FP-A3", difficulty, stage, soundType: "medical_ultrasound",
                        promptLatex: `\\text{Medical ultrasound uses 2-10 MHz. Is this above or below human hearing?}`,
                        expressionLatex: `\\text{MHz} = 10^6 \\text{ Hz} >> 20{,}000 \\text{ Hz}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Above/Below}`, placeholder: "above", expected: "above" }],
                        correctLatex: `\\text{Far above (ultrasound)}`,
                        hintLatex: [`2 \\text{ MHz} = 2{,}000{,}000 \\text{ Hz}`]
                    },
                    {
                        id: "FP-A4", difficulty, stage, soundType: "earthquake",
                        promptLatex: `\\text{Earthquake produces 5 Hz infrasound. Can humans hear it?}`,
                        expressionLatex: `5 < 20 \\text{ Hz}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{No (infrasound)}`,
                        hintLatex: [`5 \\text{ Hz} < 20 \\text{ Hz}`]
                    },
                    {
                        id: "FP-A5", difficulty, stage, soundType: "critical_bands",
                        promptLatex: `\\text{Two tones 100 Hz and 150 Hz played together. Can ear distinguish them?}`,
                        expressionLatex: `\\Delta f > \\text{critical bandwidth}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{Yes (beyond critical band)}`,
                        hintLatex: [`50 \\text{ Hz difference is distinguishable}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "FP-E1", difficulty, stage, soundType: "equal_temperament",
                        promptLatex: `\\text{Equal temperament: 12 semitones per octave. Frequency ratio per semitone?}`,
                        expressionLatex: `r = 2^{1/12}`,
                        targetLatex: `r`,
                        slots: [{ id: "ratio", labelLatex: `r`, placeholder: "1.06", expected: 1.06 }],
                        correctLatex: `1.0595`,
                        hintLatex: [`2^{1/12} \\approx 1.0595`]
                    },
                    {
                        id: "FP-E2", difficulty, stage, soundType: "just_intonation",
                        promptLatex: `\\text{Just intonation perfect fifth: frequency ratio 3:2. Equal temperament: } 2^{7/12}. \\text{Which is larger?}`,
                        expressionLatex: `\\frac{3}{2} = 1.5, \\quad 2^{7/12} \\approx 1.498`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Just/Equal}`, placeholder: "just", expected: "just" }],
                        correctLatex: `\\text{Just intonation (1.5 > 1.498)}`,
                        hintLatex: [`1.5 > 1.498`]
                    },
                    {
                        id: "FP-E3", difficulty, stage, soundType: "formants",
                        promptLatex: `\\text{Vowel sounds differ by resonant frequencies called what?}`,
                        expressionLatex: `\\text{Vocal tract resonances}`,
                        targetLatex: `\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\text{Term}`, placeholder: "formants", expected: "formants" }],
                        correctLatex: `\\text{Formants}`,
                        hintLatex: [`\\text{Resonant peaks = formants}`]
                    },
                    {
                        id: "FP-E4", difficulty, stage, soundType: "missing_fundamental",
                        promptLatex: `\\text{Harmonics at 400, 600, 800 Hz present. Brain perceives fundamental at what frequency?}`,
                        expressionLatex: `\\text{GCD of harmonics}`,
                        targetLatex: `f_0`,
                        slots: [{ id: "freq", labelLatex: `f_0\\text{ (Hz)}`, placeholder: "200", expected: 200 }],
                        correctLatex: `200\\text{ Hz (missing fundamental)}`,
                        hintLatex: [`\\text{GCD}(400, 600, 800) = 200`]
                    },
                    {
                        id: "FP-E5", difficulty, stage, soundType: "masking",
                        promptLatex: `\\text{Loud 1000 Hz tone masks nearby 1100 Hz tone. What is this effect called?}`,
                        expressionLatex: `\\text{Frequency masking}`,
                        targetLatex: `\\text{Effect}`,
                        slots: [{ id: "effect", labelLatex: `\\text{Effect}`, placeholder: "masking", expected: "masking" }],
                        correctLatex: `\\text{Auditory masking}`,
                        hintLatex: [`\\text{Loud tone hides nearby frequencies}`]
                    }
                );
            }
        }

        if (stage === "LOUDNESS_INTENSITY") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "LI-B1", difficulty, stage, soundType: "whisper",
                        promptLatex: `\\text{Whisper is about 30 dB. Normal conversation is 60 dB. How many times more intense?}`,
                        expressionLatex: `\\Delta L = 30 \\text{ dB} \\Rightarrow 10^3 = 1000\\times`,
                        targetLatex: `\\text{Ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\text{Ratio}`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `1000\\times`,
                        hintLatex: [`10 \\text{ dB} = 10\\times, \\quad 30 \\text{ dB} = 10^3 = 1000\\times`]
                    },
                    {
                        id: "LI-B2", difficulty, stage, soundType: "hearing_threshold",
                        promptLatex: `\\text{Threshold of hearing is 0 dB. What is the intensity?}`,
                        expressionLatex: `I_0 = 10^{-12} \\text{ W/m}^2`,
                        targetLatex: `I_0`,
                        slots: [{ id: "intensity", labelLatex: `I_0\\text{ (W/m}^2\\text{)}`, placeholder: "1e-12", expected: 1e-12 }],
                        correctLatex: `10^{-12}\\text{ W/m}^2`,
                        hintLatex: [`\\text{Reference intensity}`]
                    },
                    {
                        id: "LI-B3", difficulty, stage, soundType: "pain_threshold",
                        promptLatex: `\\text{Threshold of pain is about 140 dB. Is this safe for hearing?}`,
                        expressionLatex: `> 85 \\text{ dB} \\rightarrow \\text{damage risk}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Safe?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{No (causes pain and damage)}`,
                        hintLatex: [`140 \\text{ dB} >> 85 \\text{ dB}`]
                    },
                    {
                        id: "LI-B4", difficulty, stage, soundType: "distance_effect",
                        promptLatex: `\\text{Double distance from sound source. Intensity becomes 1/4. Loudness decreases by how many dB?}`,
                        expressionLatex: `\\Delta L = 10 \\log_{10}(1/4) \\approx -6 \\text{ dB}`,
                        targetLatex: `\\Delta L`,
                        slots: [{ id: "change", labelLatex: `\\Delta L\\text{ (dB)}`, placeholder: "-6", expected: -6 }],
                        correctLatex: `-6\\text{ dB}`,
                        hintLatex: [`\\text{Inverse square law: } 2\\times \\text{ distance} = -6 \\text{ dB}`]
                    },
                    {
                        id: "LI-B5", difficulty, stage, soundType: "safe_level",
                        promptLatex: `\\text{Prolonged exposure above 85 dB can cause hearing damage. True or false?}`,
                        expressionLatex: `> 85 \\text{ dB} \\rightarrow \\text{damage risk}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{T/F}`, placeholder: "true", expected: "true" }],
                        correctLatex: `\\text{True}`,
                        hintLatex: [`85 \\text{ dB is safety threshold}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "LI-C1", difficulty, stage, soundType: "decibel_calc",
                        promptLatex: `\\text{Sound A is 60 dB, sound B is 70 dB. How many times more intense is B?}`,
                        expressionLatex: `\\Delta L = 10 \\text{ dB} \\Rightarrow 10\\times`,
                        targetLatex: `\\text{Ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\text{Ratio}`, placeholder: "10", expected: 10 }],
                        correctLatex: `10\\times`,
                        hintLatex: [`10 \\text{ dB difference} = 10\\times \\text{ intensity}`]
                    },
                    {
                        id: "LI-C2", difficulty, stage, soundType: "intensity_to_db",
                        promptLatex: `\\text{Intensity } 10^{-10} \\text{ W/m}^2. \\text{ What is loudness in dB?}`,
                        expressionLatex: `L = 10 \\log_{10}(I/I_0)`,
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "20", expected: 20 }],
                        correctLatex: `20\\text{ dB}`,
                        hintLatex: [`10 \\log_{10}(10^{-10}/10^{-12}) = 10 \\log_{10}(100) = 20`]
                    },
                    {
                        id: "LI-C3", difficulty, stage, soundType: "distance_double",
                        promptLatex: `\\text{At 1 m: 80 dB. At 2 m: how many dB?}`,
                        expressionLatex: `2\\times \\text{ distance} \\Rightarrow -6 \\text{ dB}`,
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "74", expected: 74 }],
                        correctLatex: `74\\text{ dB}`,
                        hintLatex: [`80 - 6 = 74`]
                    },
                    {
                        id: "LI-C4", difficulty, stage, soundType: "rock_concert",
                        promptLatex: `\\text{Rock concert: 110 dB. Vacuum cleaner: 70 dB. How many times more intense is concert?}`,
                        expressionLatex: `\\Delta L = 40 \\text{ dB} \\Rightarrow 10^4 = 10{,}000\\times`,
                        targetLatex: `\\text{Ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\text{Ratio}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `10{,}000\\times`,
                        hintLatex: [`40 \\text{ dB} = 10^4 = 10{,}000\\times`]
                    },
                    {
                        id: "LI-C5", difficulty, stage, soundType: "db_to_intensity",
                        promptLatex: `\\text{Loudness 30 dB. What is intensity?}`,
                        expressionLatex: `I = I_0 \\times 10^{L/10}`,
                        targetLatex: `I`,
                        slots: [{ id: "intensity", labelLatex: `I\\text{ (W/m}^2\\text{)}`, placeholder: "1e-9", expected: 1e-9 }],
                        correctLatex: `10^{-9}\\text{ W/m}^2`,
                        hintLatex: [`10^{-12} \\times 10^{30/10} = 10^{-12} \\times 10^3 = 10^{-9}`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "LI-A1", difficulty, stage, soundType: "inverse_square",
                        promptLatex: `\\text{At 10 m: 60 dB. At 100 m: how many dB?}`,
                        expressionLatex: `10\\times \\text{ distance} \\Rightarrow -20 \\text{ dB}`,
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "40", expected: 40 }],
                        correctLatex: `40\\text{ dB}`,
                        hintLatex: [`10\\times \\text{ distance} = -20 \\text{ dB}, \\quad 60 - 20 = 40`]
                    },
                    {
                        id: "LI-A2", difficulty, stage, soundType: "combining_sources",
                        promptLatex: `\\text{Two identical 60 dB sources. Combined loudness?}`,
                        expressionLatex: `2\\times \\text{ intensity} \\Rightarrow +3 \\text{ dB}`,
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "63", expected: 63 }],
                        correctLatex: `63\\text{ dB}`,
                        hintLatex: [`10 \\log_{10}(2) \\approx 3 \\text{ dB}`]
                    },
                    {
                        id: "LI-A3", difficulty, stage, soundType: "absorption",
                        promptLatex: `\\text{Sound intensity halves due to air absorption. Loudness decreases by how many dB?}`,
                        expressionLatex: `\\Delta L = 10 \\log_{10}(1/2) \\approx -3 \\text{ dB}`,
                        targetLatex: `\\Delta L`,
                        slots: [{ id: "change", labelLatex: `\\Delta L\\text{ (dB)}`, placeholder: "-3", expected: -3 }],
                        correctLatex: `-3\\text{ dB}`,
                        hintLatex: [`10 \\log_{10}(0.5) \\approx -3`]
                    },
                    {
                        id: "LI-A4", difficulty, stage, soundType: "jet_engine",
                        promptLatex: `\\text{Jet engine at 100 m: 130 dB. At 1 km: how many dB?}`,
                        expressionLatex: `10\\times \\text{ distance} \\Rightarrow -20 \\text{ dB}`,
                        targetLatex: `L`,
                        slots: [{ id: "loudness", labelLatex: `L\\text{ (dB)}`, placeholder: "110", expected: 110 }],
                        correctLatex: `110\\text{ dB}`,
                        hintLatex: [`130 - 20 = 110`]
                    },
                    {
                        id: "LI-A5", difficulty, stage, soundType: "four_sources",
                        promptLatex: `\\text{Four identical 50 dB sources. Combined loudness?}`,
                        expressionLatex: `4\\times \\text{ intensity} \\Rightarrow +6 \\text{ dB}`,
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
                        promptLatex: `\\text{Equal loudness curves show perceived loudness varies with frequency. Unit of perceived loudness?}`,
                        expressionLatex: `\\text{Perceived loudness unit}`,
                        targetLatex: `\\text{Unit}`,
                        slots: [{ id: "unit", labelLatex: `\\text{Unit}`, placeholder: "phon", expected: "phon" }],
                        correctLatex: `\\text{Phon}`,
                        hintLatex: [`\\text{Phon = perceived loudness}`]
                    },
                    {
                        id: "LI-E2", difficulty, stage, soundType: "sone",
                        promptLatex: `\\text{Sone is unit of loudness where doubling sones doubles perceived loudness. 2 sones vs 1 sone?}`,
                        expressionLatex: `\\text{Linear loudness scale}`,
                        targetLatex: `\\text{Ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\text{Ratio}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\times \\text{ louder}`,
                        hintLatex: [`\\text{Sone is linear scale}`]
                    },
                    {
                        id: "LI-E3", difficulty, stage, soundType: "a_weighting",
                        promptLatex: `\\text{A-weighting adjusts dB measurements to match human hearing sensitivity. Symbol?}`,
                        expressionLatex: `\\text{Weighted decibel}`,
                        targetLatex: `\\text{Symbol}`,
                        slots: [{ id: "symbol", labelLatex: `\\text{Symbol}`, placeholder: "dBA", expected: "dBA" }],
                        correctLatex: `\\text{dB(A) or dBA}`,
                        hintLatex: [`\\text{A-weighted decibels}`]
                    },
                    {
                        id: "LI-E4", difficulty, stage, soundType: "noise_dose",
                        promptLatex: `\\text{85 dB for 8 hours = 100\\% noise dose. 88 dB for 4 hours = what \\% dose?}`,
                        expressionLatex: `+3 \\text{ dB} \\Rightarrow \\text{half time}`,
                        targetLatex: `\\text{Dose}`,
                        slots: [{ id: "dose", labelLatex: `\\text{Dose (\\%)}`, placeholder: "100", expected: 100 }],
                        correctLatex: `100\\%`,
                        hintLatex: [`+3 \\text{ dB doubles intensity, halves safe time}`]
                    },
                    {
                        id: "LI-E5", difficulty, stage, soundType: "itu_weighting",
                        promptLatex: `\\text{ITU-R 468 weighting emphasizes 6 kHz region. Used for measuring what?}`,
                        expressionLatex: `\\text{Noise measurement standard}`,
                        targetLatex: `\\text{Application}`,
                        slots: [{ id: "app", labelLatex: `\\text{Application}`, placeholder: "noise", expected: "noise" }],
                        correctLatex: `\\text{Audio noise/hiss}`,
                        hintLatex: [`\\text{Emphasizes ear's most sensitive region}`]
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
    } = useQuestManager<SP306Quest, Stage>({
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
