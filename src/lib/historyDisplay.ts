type Translator = (path: string, params?: Record<string, string | number>) => any;

const MODULE_TITLE_KEY_OVERRIDES: Record<string, string> = {
  "EM3.01": "home.em3_01_title",
};

export function getDefaultHistoryModuleId(moduleCode: string): string {
  return moduleCode.toLowerCase().replace(/\./g, "-");
}

export function getHistoryModuleTitle(
  t: Translator,
  moduleCode: string,
  moduleId?: string,
): string {
  const candidates: string[] = [];

  if (moduleId) {
    candidates.push(`${moduleId.replace(/-/g, "_")}.title`);
  }

  const override = MODULE_TITLE_KEY_OVERRIDES[moduleCode];
  if (override) {
    candidates.push(override);
  }

  candidates.push(`${moduleCode.toLowerCase().replace(/[.-]/g, "_")}.title`);

  for (const key of candidates) {
    const translated = t(key);
    if (typeof translated === "string" && translated !== key) {
      return translated;
    }
  }

  return moduleCode;
}

export function getHistoryStageLabel(
  t: Translator,
  moduleCode: string,
  stage: string,
  moduleId?: string,
): string {
  const candidates: string[] = [];
  const normalizedStage = stage.toLowerCase();

  if (moduleId) {
    candidates.push(`${moduleId.replace(/-/g, "_")}.stages.${normalizedStage}`);
  }

  const override = MODULE_TITLE_KEY_OVERRIDES[moduleCode];
  if (override) {
    const namespace = override.replace(/\.title$/, "");
    candidates.push(`${namespace}.stages.${normalizedStage}`);
  }

  candidates.push(`${moduleCode.toLowerCase().replace(/[.-]/g, "_")}.stages.${normalizedStage}`);

  for (const key of candidates) {
    const translated = t(key);
    if (typeof translated === "string" && translated !== key) {
      return translated;
    }
  }

  return stage;
}
