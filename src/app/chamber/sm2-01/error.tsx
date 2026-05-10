'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();
  const moduleNavLabels: {
    home: string;
    homeAria: string;
    nexus: string;
    nexusAria: string;
  } = {
    home: t("common.module_nav.home"),
    homeAria: t("common.module_nav.home_aria"),
    nexus: t("common.module_nav.nexus"),
    nexusAria: t("common.module_nav.nexus_aria"),
  };

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
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Link
            href="/"
            aria-label={moduleNavLabels.homeAria}
            title={moduleNavLabels.homeAria}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-white px-4 py-3 text-center font-black text-black transition-all hover:bg-white/90"
          >
            <Home className="h-4 w-4" />
            <span className="text-[10px] uppercase tracking-[0.2em]">{moduleNavLabels.home}</span>
          </Link>
          <Link
            href="/nexus"
            aria-label={moduleNavLabels.nexusAria}
            title={moduleNavLabels.nexusAria}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-white/60 px-4 py-3 text-center text-white/70 transition-all hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-[10px] uppercase tracking-[0.2em]">{moduleNavLabels.nexus}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
