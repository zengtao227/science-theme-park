/** Canonical lowercase-hyphen form: "GM1.01" → "gm1-01", "sc2-03" → "sc2-03" */
export function normalizeModuleCode(code: string | undefined | null): string {
  if (!code) return '';
  return code.toLowerCase().replace(/\./g, '-');
}
