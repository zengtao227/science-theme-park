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
