import { translations } from "@/lib/i18n";

type LangCode = "EN" | "CN" | "DE";

type LocaleMaps = {
    toLocaleExact: Map<string, string>;
    toLocaleLower: Map<string, string>;
    toEnglishExact: Map<string, string>;
    toEnglishLower: Map<string, string>;
};

const mapCache = new Map<LangCode, LocaleMaps>();

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function collectPairs(enNode: unknown, localeNode: unknown, pairs: Array<[string, string]>) {
    if (typeof enNode === "string" && typeof localeNode === "string") {
        const enValue = enNode.trim();
        const localeValue = localeNode.trim();
        if (enValue && localeValue) {
            pairs.push([enValue, localeValue]);
        }
        return;
    }

    if (!isRecord(enNode) || !isRecord(localeNode)) return;

    for (const key of Object.keys(enNode)) {
        if (!(key in localeNode)) continue;
        collectPairs(enNode[key], localeNode[key], pairs);
    }
}

function buildLocaleMaps(locale: LangCode): LocaleMaps {
    if (mapCache.has(locale)) {
        return mapCache.get(locale)!;
    }

    const toLocaleExact = new Map<string, string>();
    const toLocaleLower = new Map<string, string>();
    const toEnglishExact = new Map<string, string>();
    const toEnglishLower = new Map<string, string>();

    if (locale !== "EN") {
        const pairs: Array<[string, string]> = [];
        collectPairs(translations.EN, translations[locale], pairs);

        for (const [enValue, localeValue] of pairs) {
            toLocaleExact.set(enValue, localeValue);
            toLocaleLower.set(enValue.toLowerCase(), localeValue);

            toEnglishExact.set(localeValue, enValue);
            toEnglishLower.set(localeValue.toLowerCase(), enValue);
        }
    }

    const maps: LocaleMaps = { toLocaleExact, toLocaleLower, toEnglishExact, toEnglishLower };
    mapCache.set(locale, maps);
    return maps;
}

export function localizeFreeText(value: string | null | undefined, locale: LangCode): string {
    if (typeof value !== "string") return "";
    if (locale === "EN") return value;
    const raw = value.trim();
    if (!raw) return value;
    const lowerRaw = raw.toLowerCase();

    const maps = buildLocaleMaps(locale);
    const exact = maps.toLocaleExact.get(raw);
    if (exact) return exact;

    const lower = maps.toLocaleLower.get(lowerRaw);
    if (lower) return lower;

    // Common direct-placeholder phrases used in several modules.
    if (lowerRaw === "type value") {
        return locale === "CN" ? "输入数值" : "Wert eingeben";
    }
    if (lowerRaw === "type answer" || lowerRaw === "enter answer..." || lowerRaw === "enter answer") {
        return locale === "CN" ? "输入答案" : "Antwort eingeben";
    }

    // Fallback for plain English placeholder text not covered by translation keys.
    // Keep symbolic/unit placeholders unchanged (e.g., "x", "m/s", "CO2").
    const plainEnglishPhrase = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    const variableMask = /^[xyzXYZ]{1,5}$/;
    if (raw.length >= 3 && plainEnglishPhrase.test(raw) && !variableMask.test(raw)) {
        return locale === "CN" ? "输入答案" : "Antwort eingeben";
    }

    return value;
}

export function canonicalizeFreeText(value: string | null | undefined, locale: LangCode): string {
    if (typeof value !== "string") return "";
    const raw = value.trim();
    if (!raw) return value;
    if (locale === "EN") return value;

    const maps = buildLocaleMaps(locale);
    const exact = maps.toEnglishExact.get(raw);
    if (exact) return exact;

    const lower = maps.toEnglishLower.get(raw.toLowerCase());
    if (lower) return lower;

    return value;
}
