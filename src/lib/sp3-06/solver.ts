import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP306Quest } from "./types";

function buildReasoningLatex(quest: SP306Quest, t: Translator) {
  switch (quest.soundType) {
    case "speed":
      return "\\lambda = \\frac{v}{f} = \\frac{343}{686} = 0.5\\text{ m}";
    case "frequency":
      return "f = \\frac{v}{\\lambda} = \\frac{340}{0.5} = 680\\text{ Hz}";
    case "medium":
      return `\\text{${t("physics.sp3_06.solver.medium_reason")}}`;
    case "echo":
      return "v = \\frac{2d}{t} = \\frac{2\\cdot 343}{2} = 343\\text{ m/s}";
    case "vacuum":
      return `\\text{${t("physics.sp3_06.solver.vacuum_reason")}}`;
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
      return `\\text{${t("physics.sp3_06.solver.doppler_reason")}}`;
    case "interference":
      return `\\text{${t("physics.sp3_06.solver.interference_reason")}}`;
    case "refraction":
      return `\\text{${t("physics.sp3_06.solver.refraction_reason")}}`;
    case "diffraction":
      return `\\text{${t("physics.sp3_06.solver.diffraction_reason")}}`;
    case "resonance_freq":
      return `\\text{${t("physics.sp3_06.solver.resonance_freq_reason")}}\\; f=512\\text{ Hz}`;
    case "beat_frequency":
      return "f_{beat} = |440-444| = 4\\text{ Hz}";
    case "standing_wave":
      return "f = \\frac{v}{4L} = \\frac{340}{4\\cdot 0.5} = 170\\text{ Hz}";
    case "resonance":
      return "f = \\frac{v}{2L} = \\frac{340}{2\\cdot 1} = 170\\text{ Hz}";
    case "hearing_range":
      return `\\text{${t("physics.sp3_06.solver.hearing_range_reason")}}`;
    case "pitch":
      return `\\text{${t("physics.sp3_06.solver.pitch_reason")}}`;
    case "concert_pitch":
      return "f_{A5} = 2\\cdot 440 = 880\\text{ Hz}";
    case "ultrasound":
    case "medical_ultrasound":
      return `\\text{${t("physics.sp3_06.solver.ultrasound_reason")}}`;
    case "infrasound":
      return `\\text{${t("physics.sp3_06.solver.infrasound_reason")}}`;
    case "octave":
      return "f_{C5} = 2\\cdot 262 = 524\\text{ Hz}";
    case "semitone":
      return "f = 440\\cdot 1.0595 \\approx 466.2\\text{ Hz}";
    case "harmonics":
      return "f_2 = 2\\cdot 440 = 880\\text{ Hz}";
    case "bat_echolocation":
      return `\\text{${t("physics.sp3_06.solver.bat_echolocation_reason")}}`;
    case "third_harmonic":
      return "f_3 = 3\\cdot 200 = 600\\text{ Hz}";
    case "interval":
      return "f_{G4} = 262\\cdot \\frac{3}{2} = 393\\text{ Hz}";
    case "timbre":
      return `\\text{${t("physics.sp3_06.solver.timbre_reason")}}`;
    case "earthquake":
      return `\\text{${t("physics.sp3_06.solver.earthquake_reason")}}`;
    case "critical_bands":
      return `\\text{${t("physics.sp3_06.solver.critical_bands_reason")}}`;
    case "equal_temperament":
      return "r = 2^{1/12} \\approx 1.059";
    case "just_intonation":
      return `\\frac{3}{2}=1.5,\\; 2^{7/12}\\approx 1.498\\; \\Rightarrow \\; \\text{${t("physics.sp3_06.solver.just_intonation_reason")}}`;
    case "formants":
      return `\\text{${t("physics.sp3_06.solver.formants_reason")}}`;
    case "missing_fundamental":
      return `\\text{${t("physics.sp3_06.solver.missing_fundamental_reason")}}`;
    case "masking":
      return `\\text{${t("physics.sp3_06.solver.masking_reason")}}`;
    case "whisper":
      return "10^{\\frac{60-30}{10}} = 10^3 = 1000";
    case "hearing_threshold":
      return "I_0 = 10^{-12}\\text{ W/m}^2";
    case "pain_threshold":
      return `\\text{${t("physics.sp3_06.solver.pain_threshold_reason")}}`;
    case "distance_effect":
      return `\\text{${t("physics.sp3_06.solver.distance_effect_reason")}}`;
    case "safe_level":
      return `\\text{${t("physics.sp3_06.solver.safe_level_reason")}}`;
    case "decibel_calc":
      return "\\frac{I_B}{I_A} = 10^{\\frac{70-60}{10}} = 10";
    case "intensity_to_db":
      return "L = 10\\log_{10}\\left(\\frac{10^{-10}}{10^{-12}}\\right) = 20\\text{ dB}";
    case "distance_double":
      return `\\text{${t("physics.sp3_06.solver.distance_double_reason")}}`;
    case "rock_concert":
      return "10^{\\frac{110-70}{10}} = 10^4 = 10000";
    case "db_to_intensity":
      return "I = 10^{-12}\\cdot 10^{30/10} = 10^{-9}\\text{ W/m}^2";
    case "inverse_square":
      return `\\text{${t("physics.sp3_06.solver.inverse_square_reason")}}`;
    case "combining_sources":
      return `\\text{${t("physics.sp3_06.solver.combining_sources_reason")}}`;
    case "absorption":
      return `\\text{${t("physics.sp3_06.solver.absorption_reason")}}`;
    case "jet_engine":
      return `\\text{${t("physics.sp3_06.solver.jet_engine_reason")}}`;
    case "four_sources":
      return `\\text{${t("physics.sp3_06.solver.four_sources_reason")}}`;
    case "phon":
      return `\\text{${t("physics.sp3_06.solver.phon_reason")}}`;
    case "sone":
      return `\\text{${t("physics.sp3_06.solver.sone_reason")}}`;
    case "a_weighting":
      return `\\text{${t("physics.sp3_06.solver.a_weighting_reason")}}`;
    case "noise_dose":
      return `\\text{${t("physics.sp3_06.solver.noise_dose_reason")}}`;
    case "itu_weighting":
      return `\\text{${t("physics.sp3_06.solver.itu_weighting_reason")}}`;
    case "sonic_boom":
      return `\\text{${t("physics.sp3_06.solver.sonic_boom_reason")}}`;
    case "acoustic_impedance":
      return `\\text{${t("physics.sp3_06.solver.acoustic_impedance_reason")}}`;
    default:
      return quest.expressionLatex;
  }
}

function buildRuleLatex(quest: SP306Quest) {
  switch (quest.soundType) {
    case "speed":
    case "wavelength_calc":
      return "\\lambda = \\frac{v}{f}";
    case "frequency":
    case "steel":
      return "f = \\frac{v}{\\lambda}";
    case "distance":
      return "d = vt";
    case "echo":
      return "v = \\frac{2d}{t}";
    case "reflection":
      return "t = \\frac{2d}{v}";
    case "beat_frequency":
      return "f_{beat} = |f_1 - f_2|";
    case "standing_wave":
      return "f = \\frac{v}{4L}";
    case "resonance":
      return "f = \\frac{v}{2L}";
    case "concert_pitch":
    case "octave":
    case "harmonics":
    case "third_harmonic":
      return "f_n = n f_1";
    case "semitone":
    case "equal_temperament":
      return "r = 2^{1/12}";
    case "decibel_calc":
    case "intensity_to_db":
      return "L = 10\\log_{10}\\left(\\frac{I}{I_0}\\right)";
    case "db_to_intensity":
      return "I = I_0\\cdot 10^{L/10}";
    case "whisper":
    case "rock_concert":
      return "\\frac{I_2}{I_1} = 10^{\\Delta L / 10}";
    default:
      return quest.expressionLatex;
  }
}

export function solveSP306(quest: SP306Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), buildRuleLatex(quest)),
  ];

  steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), buildReasoningLatex(quest, t)));

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
