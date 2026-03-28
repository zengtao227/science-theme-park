import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP306Quest } from "./types";

function describeScenario(quest: SP306Quest) {
  return [quest.stage, quest.soundType].filter(Boolean).join(" \\to ");
}

function buildReasoningLatex(quest: SP306Quest) {
  switch (quest.soundType) {
    case "medium":
      return "\\text{Sound travels faster in water because the particles are closer together and pass vibrations on more efficiently.}";
    case "vacuum":
      return "\\text{A vacuum contains no particles, so sound has no medium through which to travel.}";
    case "doppler":
      return "\\text{When the source approaches, the wavefronts are compressed and the observed frequency becomes higher.}";
    case "interference":
      return "\\text{If two in-phase waves cancel at a point, that point shows destructive interference.}";
    case "refraction":
      return "\\text{A change of medium changes sound speed and bends the wave, which is refraction.}";
    case "diffraction":
      return "\\text{Bending around edges or openings is diffraction.}";
    case "pitch":
      return "\\text{Pitch increases when frequency increases.}";
    case "ultrasound":
    case "medical_ultrasound":
      return "\\text{Ultrasound is above 20 kHz, so it lies above the human hearing range.}";
    case "infrasound":
      return "\\text{Infrasound is below 20 Hz, which is below the human hearing range.}";
    case "timbre":
      return "\\text{If two instruments share the same fundamental frequency but sound different, the differing property is timbre.}";
    case "masking":
      return "\\text{A strong tone making a nearby frequency harder to hear is the masking effect.}";
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
