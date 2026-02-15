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
  },
  CN: {
    ...cnCommon,
    ...cnMath,
    ...cnPhysics,
    ...cnChemistry,
    ...cnBiology,
  },
  DE: {
    ...deCommon,
    ...deMath,
    ...dePhysics,
    ...deChemistry,
    ...deBiology,
  },
};

/**
 * Hook to access language functionality
 * @returns Object with translation function, current language, and language setter
 */
export function useLanguage() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = (path: string) => {
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
        return typeof node === "string" ? node : path;
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
