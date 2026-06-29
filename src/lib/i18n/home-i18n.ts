import { enCommon } from './en/common';
import { cnCommon } from './cn/common';
import { deCommon } from './de/common';
import { useAppStore } from '@/lib/store';

const homeTranslations: Record<string, Record<string, unknown>> = {
  EN: { ...(enCommon as Record<string, unknown>) },
  CN: { ...(cnCommon as Record<string, unknown>) },
  DE: { ...(deCommon as Record<string, unknown>) },
};

export function useHomeLanguage() {
  const currentLanguage = useAppStore((s) => s.currentLanguage);
  const setLanguage = useAppStore((s) => s.setLanguage);

  const t = (path: string, params?: Record<string, string | number>): any => {
    const segments = path.split('.');
    const safeLang =
      currentLanguage && currentLanguage in homeTranslations
        ? currentLanguage
        : 'EN';
    let node: unknown = homeTranslations[safeLang];
    for (const segment of segments) {
      if (!node || typeof node !== 'object') return path;
      const record = node as Record<string, unknown>;
      if (!(segment in record)) return path;
      node = record[segment];
    }
    if (typeof node === 'string') {
      if (!params) return node;
      return Object.entries(params).reduce((val, [key, value]) => {
        return val.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
      }, node);
    }
    return node ?? path;
  };

  return { t, currentLanguage, setLanguage };
}
