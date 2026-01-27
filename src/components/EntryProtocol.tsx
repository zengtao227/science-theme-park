"use client";

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { clsx } from 'clsx';

export default function EntryProtocol() {
    const { acceptProtocol, currentLanguage, setLanguage } = useAppStore();
    const t = translations[currentLanguage].protocol;

    const [textIndex, setTextIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);

    const fullText = t.warning_text;

    useEffect(() => {
        setTextIndex(0);
        setShowButton(false);
    }, [currentLanguage]);

    useEffect(() => {
        if (textIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setTextIndex(prev => prev + 1);
            }, 30);
            return () => clearTimeout(timeout);
        } else {
            setTimeout(() => setShowButton(true), 500);
        }
    }, [textIndex, fullText]);

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono text-green-500 p-8 z-50 select-none">
            <div className="absolute top-8 right-8 flex gap-4 text-xs">
                {(['EN', 'CN', 'DE'] as const).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={clsx(
                            "border px-2 py-1 transition-colors",
                            currentLanguage === lang ? "border-green-500 bg-green-900/30 text-green-500" : "border-gray-800 text-gray-600 hover:text-gray-400"
                        )}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            <div className="max-w-2xl w-full">
                <div className="mb-4 text-sm text-gray-500">{t.system_name}</div>
                <div className="text-xl md:text-3xl leading-relaxed min-h-[120px]">
                    {fullText.slice(0, textIndex)}
                    <span className="animate-pulse">_</span>
                </div>

                {showButton && (
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <button
                            onClick={acceptProtocol}
                            className="relative group overflow-hidden border border-green-500 bg-black hover:bg-green-500/10 px-8 py-4 transition-colors"
                        >
                            <span className="relative z-10 font-bold tracking-widest text-green-500 group-hover:text-green-400">
                                {t.hold_button}
                            </span>
                        </button>
                    </div>
                )}
            </div>

            <div className="fixed bottom-4 right-4 text-xs text-gray-800">
                {t.secure_connection}
            </div>
        </div>
    );
}
