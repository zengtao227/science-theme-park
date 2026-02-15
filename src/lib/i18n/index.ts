import { useAppStore } from "@/lib/store";
import { en } from "./en";
import { cn } from "./cn";
import { de } from "./de";
import { Language } from "./types";

export type { Language };

export const translations: Record<Language, any> = {
    EN: en,
    CN: cn,
    DE: de
};

export function useLanguage() {
    const { currentLanguage, setLanguage } = useAppStore();

    const t = (path: string) => {
        const segments = path.split(".");
        let node: any = translations[currentLanguage];
        // Special case: if path starts with root key like 'protocol', search in root
        // But our object structure is translations -> EN -> protocol
        // Original logic:
        /*
        const t = (path: string) => {
            const segments = path.split(".");
            let node = (translations as any)[currentLanguage];
            for (const segment of segments) {
                if (!node || typeof node !== "object") {
                    return path;
                }
                const record = node as Record<string, any>;
                if (!(segment in record)) {
                    return path;
                }
                node = record[segment];
            }
            return typeof node === "string" ? node : path;
        };
        */

        for (const segment of segments) {
            if (!node || typeof node !== "object") {
                return path;
            }
            if (!(segment in node)) {
                return path;
            }
            node = node[segment];
        }
        return typeof node === "string" ? node : path;
    };

    return { t, currentLanguage, setLanguage };
}

export interface Translations {
    EN: typeof en;
    CN: typeof cn;
    DE: typeof de;
}
