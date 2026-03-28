import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP306Quest } from "./types";

function describeScenario(quest: SP306Quest) {
  return [quest.stage, quest.soundType].filter(Boolean).join(" \\to ");
}

function buildReasoningLatex(quest: SP306Quest) {
  switch (quest.soundType) {
    case "speed":
      return "\\lambda = \\frac{v}{f} = \\frac{343}{686} = 0.5\\text{ m}";
    case "frequency":
      return "f = \\frac{v}{\\lambda} = \\frac{340}{0.5} = 680\\text{ Hz}";
    case "medium":
      return "\\text{Sound travels faster in water because the particles are closer together and pass vibrations on more efficiently.}";
    case "echo":
      return "v = \\frac{2d}{t} = \\frac{2\\cdot 343}{2} = 343\\text{ m/s}";
    case "vacuum":
      return "\\text{A vacuum contains no particles, so sound has no medium through which to travel.}";
    case "wavelength_calc":
      return "\\lambda = \\frac{1480}{740} = 2\\text{ m}";
    case "distance":
      return "d = vt = 343\\cdot 3 = 1029\\text{ m}";
    case "steel":
      return "f = \\frac{5960}{2} = 2980\\text{ Hz}";
    case "reflection":
      return "t = \\frac{2d}{v} = \\frac{2\\cdot 171.5}{343} = 1\\text{ s}";
    case "comparison":
      return "\\frac{5960}{343} \\approx 17.4";
    case "doppler":
      return "\\text{When the source approaches, the wavefronts are compressed and the observed frequency becomes higher.}";
    case "interference":
      return "\\text{If two in-phase waves cancel at a point, that point shows destructive interference.}";
    case "refraction":
      return "\\text{A change of medium changes sound speed and bends the wave, which is refraction.}";
    case "diffraction":
      return "\\text{Bending around edges or openings is diffraction.}";
    case "resonance_freq":
      return "\\text{Resonance occurs when the driving frequency matches the natural frequency, so }f=512\\text{ Hz}.";
    case "beat_frequency":
      return "f_{beat} = |440-444| = 4\\text{ Hz}";
    case "standing_wave":
      return "f = \\frac{v}{4L} = \\frac{340}{4\\cdot 0.5} = 170\\text{ Hz}";
    case "resonance":
      return "f = \\frac{v}{2L} = \\frac{340}{2\\cdot 1} = 170\\text{ Hz}";
    case "hearing_range":
      return "\\text{Human hearing extends from about }20\\text{ Hz to }20000\\text{ Hz}.";
    case "pitch":
      return "\\text{Pitch increases when frequency increases.}";
    case "concert_pitch":
      return "f_{A5} = 2\\cdot 440 = 880\\text{ Hz}";
    case "ultrasound":
    case "medical_ultrasound":
      return "\\text{Ultrasound is above 20 kHz, so it lies above the human hearing range.}";
    case "infrasound":
      return "\\text{Infrasound is below 20 Hz, which is below the human hearing range.}";
    case "octave":
      return "f_{C5} = 2\\cdot 262 = 524\\text{ Hz}";
    case "semitone":
      return "f = 440\\cdot 1.0595 \\approx 466.2\\text{ Hz}";
    case "harmonics":
      return "f_2 = 2\\cdot 440 = 880\\text{ Hz}";
    case "bat_echolocation":
      return "\\text{A frequency of }50000\\text{ Hz is well above the human hearing range.}";
    case "third_harmonic":
      return "f_3 = 3\\cdot 200 = 600\\text{ Hz}";
    case "interval":
      return "f_{G4} = 262\\cdot \\frac{3}{2} = 393\\text{ Hz}";
    case "timbre":
      return "\\text{If two instruments share the same fundamental frequency but sound different, the differing property is timbre.}";
    case "earthquake":
      return "\\text{A frequency of }5\\text{ Hz lies below }20\\text{ Hz, so humans cannot hear it.}";
    case "critical_bands":
      return "\\text{These tones are far enough apart in frequency that the ear can distinguish them.}";
    case "equal_temperament":
      return "r = 2^{1/12} \\approx 1.059";
    case "just_intonation":
      return "\\frac{3}{2}=1.5\\text{ and }2^{7/12}\\approx 1.498\\text{, so the just fifth is slightly larger.}";
    case "formants":
      return "\\text{The resonant frequency bands that define vowel quality are called formants.}";
    case "missing_fundamental":
      return "\\text{The harmonic spacing is }200\\text{ Hz, so the perceived missing fundamental is }200\\text{ Hz}.";
    case "masking":
      return "\\text{A strong tone making a nearby frequency harder to hear is the masking effect.}";
    case "whisper":
      return "10^{\\frac{60-30}{10}} = 10^3 = 1000";
    case "hearing_threshold":
      return "I_0 = 10^{-12}\\text{ W/m}^2";
    case "pain_threshold":
      return "\\text{A level near }140\\text{ dB is not safe for hearing.}";
    case "distance_effect":
      return "\\text{Doubling the distance quarters intensity, so the level drops by about }6\\text{ dB}.";
    case "safe_level":
      return "\\text{Prolonged exposure above }85\\text{ dB can cause hearing damage.}";
    case "decibel_calc":
      return "\\frac{I_B}{I_A} = 10^{\\frac{70-60}{10}} = 10";
    case "intensity_to_db":
      return "L = 10\\log_{10}\\left(\\frac{10^{-10}}{10^{-12}}\\right) = 20\\text{ dB}";
    case "distance_double":
      return "\\text{Doubling distance reduces intensity by }6\\text{ dB, so }80\\text{ dB}\\to 74\\text{ dB}.";
    case "rock_concert":
      return "10^{\\frac{110-70}{10}} = 10^4 = 10000";
    case "db_to_intensity":
      return "I = 10^{-12}\\cdot 10^{30/10} = 10^{-9}\\text{ W/m}^2";
    case "inverse_square":
      return "\\text{Going from }10\\text{ m to }100\\text{ m reduces intensity by }100,\\text{ so the level drops by }20\\text{ dB to }40\\text{ dB}.";
    case "combining_sources":
      return "\\text{Two identical sources add about }3\\text{ dB, so }60\\text{ dB}\\to 63\\text{ dB}.";
    case "absorption":
      return "\\text{Halving intensity changes the level by }10\\log_{10}(1/2)\\approx -3\\text{ dB}.";
    case "jet_engine":
      return "\\text{Increasing distance by a factor of }10\\text{ lowers level by }20\\text{ dB, so }130\\text{ dB}\\to 110\\text{ dB}.";
    case "four_sources":
      return "\\text{Four identical sources add }10\\log_{10}(4)\\approx 6\\text{ dB, so }50\\text{ dB}\\to 56\\text{ dB}.";
    case "phon":
      return "\\text{Perceived loudness level is measured in phons.}";
    case "sone":
      return "\\text{Doubling sones means doubling perceived loudness.}";
    case "a_weighting":
      return "\\text{A-weighted sound levels are written as dB(A).}";
    case "noise_dose":
      return "\\text{A 3 dB increase halves the safe exposure time, so }88\\text{ dB for }4\\text{ h is still }100\\%\\text{ dose}.";
    case "itu_weighting":
      return "\\text{ITU-R 468 weighting is used for perceived noise measurements, especially in audio systems.}";
    case "sonic_boom":
      return "\\text{Breaking the sound barrier creates a shock wave heard as a sonic boom.}";
    case "acoustic_impedance":
      return "\\text{A large impedance mismatch reflects most sound energy at the boundary.}";
    default:
      return quest.expressionLatex;
  }
}

export function solveSP306(quest: SP306Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), describeScenario(quest)),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), quest.expressionLatex),
  ];

  steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), buildReasoningLatex(quest)));

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
