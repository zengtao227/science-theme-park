/**
 * i18n Main Entry Point
 * Imports and re-exports all translations from language-specific modules
 * 
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

import { useAppStore } from "@/lib/store";

// Import EN translations
import {
  enCommon,
  enMath,
  enPhysics,
  enChemistry,
  enBiology
} from './en';

// Import CN translations
import {
  cnCommon,
  cnMath,
  cnPhysics,
  cnChemistry,
  cnBiology
} from './cn';

// Import DE translations
import {
  deCommon,
  deMath,
  dePhysics,
  deChemistry,
  deBiology
} from './de';

// Export types
export type { Language, Translations, AllTranslations } from './types';
export type { Language as LanguageType } from './types';

function mergeCommonNamespaces(namespaces: Array<Record<string, any>>): Record<string, any> {
  return namespaces.reduce((acc, namespaceObj) => {
    const common = namespaceObj?.common;
    if (!common || typeof common !== "object") return acc;

    const merged = { ...acc, ...common };

    if (acc.labels || common.labels) {
      merged.labels = { ...(acc.labels || {}), ...(common.labels || {}) };
    }
    if (acc.achievements || common.achievements) {
      merged.achievements = { ...(acc.achievements || {}), ...(common.achievements || {}) };
    }

    return merged;
  }, {} as Record<string, any>);
}

/**
 * Main translations object
 * Combines all language-specific translations into a single structure
 */
export const translations: Record<string, any> = {
  EN: {
    ...enCommon,
    ...enMath,
    ...enPhysics,
    ...enChemistry,
    ...enBiology,
    common: mergeCommonNamespaces([enMath, enPhysics, enChemistry, enBiology, enCommon])
  },
  CN: {
    ...cnCommon,
    ...cnMath,
    ...cnPhysics,
    ...cnChemistry,
    ...cnBiology,
    common: mergeCommonNamespaces([cnMath, cnPhysics, cnChemistry, cnBiology, cnCommon])
  },
  DE: {
    ...deCommon,
    ...deMath,
    ...dePhysics,
    ...deChemistry,
    ...deBiology,
    common: mergeCommonNamespaces([deMath, dePhysics, deChemistry, deBiology, deCommon])
  }
};

/**
 * Hook to access language functionality
 * @returns Object with translation function, current language, and language setter
 */
export function useLanguage() {
  const { currentLanguage, setLanguage } = useAppStore();
  const t = (path: string, params?: Record<string, string | number>): any => {
    const segments = path.split(".");

    // SSR 安全: 确保 currentLanguage 有效，默认使用 EN
    const safeLang = (currentLanguage && currentLanguage in translations)
      ? currentLanguage
      : "EN";

    let node: unknown = translations[safeLang];

    for (const segment of segments) {
      if (!node || typeof node !== "object") {
        return path;
      }
      const record = node as Record<string, unknown>;
      if (!(segment in record)) {
        return path;
      }
      node = record[segment];
    }

    if (typeof node === "string") {
      let val = node;
      if (params) {
        const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        Object.entries(params).forEach(([key, value]) => {
          const safeKey = escapeRegex(key);
          const normalizedValue = String(value);
          val = val.replace(new RegExp(`\\{${safeKey}\\}`, "g"), normalizedValue);
          val = val.replace(new RegExp(`\\$\\{${safeKey}\\}`, "g"), normalizedValue);
        });
      }
      return val;
    }
    return node || path;
  };

  return { t, currentLanguage, setLanguage };
}

/**
 * Get translations for a specific language
 * @param lang - Language code (optional, defaults to current language)
 * @returns Translation object for the specified language
 */
export function getTranslations(lang?: string) {
  const currentLang = lang || useAppStore.getState().currentLanguage;
  return translations[currentLang] || translations.EN;
}

/**
 * Type definition for translation consumers
 */
export type TranslationKeys = typeof translations.EN;

// Default export for backward compatibility
export default translations;
