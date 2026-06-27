import { canonicalizeFreeText } from "@/lib/i18n/freeTextLocale";

export type Locale = "EN" | "DE" | "CN";

export function parseNumberLike(s: string, locale: Locale): number | null {
    const raw = s.trim();
    if (!raw) return null;

    const normalized = (locale === "DE" ? raw.replace(/,/g, ".") : raw).replace(/\s+/g, "");

    if (normalized.includes("/")) {
        const parts = normalized.split("/");
        if (parts.length !== 2) return null;
        const [numStr, denStr] = parts;
        const num = Number(numStr);
        const den = Number(denStr);
        if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
            return num / den;
        }
        return null;
    }

    const v = Number(normalized);
    return Number.isFinite(v) ? v : null;
}

export function normalizeAnswer(s: string, locale: Locale): string {
    const canonical = canonicalizeFreeText(s, locale);
    return canonical.trim()
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/²/g, "^2")
        .replace(/³/g, "^3")
        .replace(/\^1(?![0-9])/g, "")
        .replace(/^1([a-z^])/, "$1")
        .replace(/([^0-9.])1([a-z^])/g, "$1$2");
}
