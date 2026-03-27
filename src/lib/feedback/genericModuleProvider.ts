import type { FeedbackContent, PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export type GenericFeedbackQuest = Quest & {
  stage?: string | number | symbol;
  equation?: unknown;
  context?: unknown;
  scenario?: string | number | symbol;
  type?: string | number | symbol;
  dataType?: string | number | symbol;
  chartMode?: string | number | symbol;
  geometryType?: string | number | symbol;
  promptKey?: string | number | symbol;
  visual?: { kind?: string; mode?: string } | unknown;
  visualMeta?: { type?: string } | unknown;
};

export type StageRuleMap<T extends GenericFeedbackQuest> = Record<
  string,
  string | ((quest: T) => string | null)
>;

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((s) => `\\text{${s.justification}} \\implies ${s.expressionLatex}`).join(" \\\\ ");
}

function getGivenLatex<T extends GenericFeedbackQuest>(quest: T) {
  if (typeof quest.equation === "string" && quest.equation.trim()) return quest.equation.trim();
  if (typeof quest.expressionLatex === "string" && quest.expressionLatex.trim()) return quest.expressionLatex.trim();
  if (typeof quest.targetLatex === "string" && quest.targetLatex.trim()) return quest.targetLatex.trim();
  return "";
}

function resolveRuleLatex<T extends GenericFeedbackQuest>(quest: T, stageRules: StageRuleMap<T>) {
  const stageKey = String(quest.stage ?? "");
  const resolved = stageRules[stageKey];
  if (typeof resolved === "function") return resolved(quest);
  return resolved ?? null;
}

export function createGenericModuleFeedbackProvider<T extends GenericFeedbackQuest>(
  t: Translator,
  stageRules: StageRuleMap<T>
) {
  return (quest: T): Omit<FeedbackContent, "hint"> => {
    const givenLatex = getGivenLatex(quest);
    const ruleLatex = resolveRuleLatex(quest, stageRules);
    const finalLatex = quest.correctLatex?.trim();

    if (!givenLatex || !ruleLatex || !finalLatex) {
      return {
        steps: [],
        fullSolutionLatex: null,
        hasFullSolution: false,
      };
    }

    const workingLatex = quest.expressionLatex?.trim() || givenLatex;
    const steps: PlatformSolutionStep[] = [
      makeStep(1, t("common.feedback_reasons.identify_given_values"), givenLatex),
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), workingLatex),
      makeStep(4, t("common.feedback_reasons.state_final_result"), finalLatex, "key"),
    ];

    return {
      steps,
      fullSolutionLatex: buildFullSolution(steps),
      hasFullSolution: true,
    };
  };
}
