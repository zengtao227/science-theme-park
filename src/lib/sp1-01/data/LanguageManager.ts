/**
 * SP1.01 - Forces Basics Module
 * Language management and translation system
 */

import { MultiLangContent } from '../domain/types';
import enTranslations from './translations/en.json';
import cnTranslations from './translations/cn.json';
import deTranslations from './translations/de.json';

export type Language = 'en' | 'cn' | 'de';

const TRANSLATIONS = {
  en: enTranslations,
  cn: cnTranslations,
  de: deTranslations,
};

const STORAGE_KEY = 'sp1-01-language-preference';

/**
 * Language Manager for SP1.01 module
 */
export class LanguageManager {
  private currentLanguage: Language;
  private listeners: Set<(lang: Language) => void>;

  constructor(initialLanguage?: Language) {
    this.currentLanguage = initialLanguage || this.loadLanguagePreference();
    this.listeners = new Set();
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * Set language and notify listeners
   */
  setLanguage(lang: Language): void {
    if (lang !== this.currentLanguage) {
      this.currentLanguage = lang;
      this.saveLanguagePreference();
      this.notifyListeners();
    }
  }

  /**
   * Translate a key path (e.g., "ui.title")
   */
  translate(key: string): string {
    const keys = key.split('.');
    let value: any = TRANSLATIONS[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = this.getFallbackTranslation(key);
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  }

  /**
   * Get fallback translation from English
   */
  private getFallbackTranslation(key: string): string {
    const keys = key.split('.');
    let value: any = TRANSLATIONS.en;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }

    return typeof value === 'string' ? value : key;
  }

  /**
   * Translate multi-language content
   */
  translateContent(content: MultiLangContent): string {
    return content[this.currentLanguage] || content.en;
  }

  /**
   * Save language preference to localStorage
   */
  saveLanguagePreference(): void {
    try {
      localStorage.setItem(STORAGE_KEY, this.currentLanguage);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  }

  /**
   * Load language preference from localStorage
   */
  loadLanguagePreference(): Language {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'cn' || saved === 'de')) {
        return saved as Language;
      }
    } catch (error) {
      console.warn('Failed to load language preference:', error);
    }
    return 'en'; // Default to English
  }

  /**
   * Subscribe to language changes
   */
  subscribe(listener: (lang: Language) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of language change
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.currentLanguage));
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages(): Language[] {
    return ['en', 'cn', 'de'];
  }

  /**
   * Get language display name
   */
  getLanguageDisplayName(lang: Language): string {
    const names = {
      en: 'English',
      cn: '中文',
      de: 'Deutsch',
    };
    return names[lang];
  }
}

// Singleton instance
let languageManagerInstance: LanguageManager | null = null;

/**
 * Get or create the language manager instance
 */
export function getLanguageManager(): LanguageManager {
  if (!languageManagerInstance) {
    languageManagerInstance = new LanguageManager();
  }
  return languageManagerInstance;
}

/**
 * Reset the language manager instance (useful for testing)
 */
export function resetLanguageManager(): void {
  languageManagerInstance = null;
}
