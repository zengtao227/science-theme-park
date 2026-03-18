'use client';

import Link from 'next/link';
import { useLanguage } from "@/lib/i18n";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md border border-neon-green/30 bg-black p-8">
        <h2 className="text-2xl font-black mb-4 text-neon-green">{t("sm2_01.error.title")}</h2>
        <p className="text-white/70 mb-6 font-mono text-sm">
          {t("sm2_01.error.description")}
        </p>
        <p className="text-white mb-6 text-xs">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="w-full px-6 py-3 bg-neon-green text-black font-black hover:bg-neon-green/80 transition-all"
        >
          {t("common.try_again")}
        </button>
        <Link
          href="/"
          className="block w-full mt-3 px-6 py-3 border border-white/60 text-center text-white/70 hover:bg-white/5 transition-all"
        >
          {t("sm2_01.back_short")}
        </Link>
      </div>
    </div>
  );
}
