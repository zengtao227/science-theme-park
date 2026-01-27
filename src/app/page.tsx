"use client";

import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import EntryProtocol from '@/components/EntryProtocol';
import Link from 'next/link';
import { clsx } from 'clsx';

export default function Home() {
  const { hasAcceptedProtocol, currentLanguage, setLanguage } = useAppStore();
  const t = translations[currentLanguage].home;

  if (!hasAcceptedProtocol) {
    return <EntryProtocol />;
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Header */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-gradient-to-b from-black to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-xl font-bold tracking-tighter">{t.title}</h1>
          <p className="text-xs text-gray-500">{t.subtitle}</p>
        </div>
        <div className="flex gap-4 pointer-events-auto items-center">
          {['EN', 'CN', 'DE'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang as any)}
              className={clsx(
                "text-xs font-bold transition-colors",
                currentLanguage === lang ? "text-green-500 underline" : "text-gray-600 hover:text-gray-400"
              )}
            >
              {lang}
            </button>
          ))}
          <div className="w-px h-4 bg-gray-800 mx-2" />
          <button className="text-xs uppercase tracking-widest hover:text-green-500 transition-colors">{t.archive}</button>
          <button className="text-xs uppercase tracking-widest hover:text-green-500 transition-colors">{t.nexus}</button>
        </div>
      </header>

      {/* Hero Section / Dashboard */}
      <div className="relative h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {/* Card 1: Equilibrium Scale (Featured) */}
          <Link href="/chamber/equilibrium-scale" className="group relative block aspect-video bg-gray-900 border border-gray-800 hover:border-green-500 transition-all overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/80 z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <div className="text-xs font-mono text-green-500 mb-2">M-A04 // MATHEMATICS</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">{t.equilibrium_scale_title}</h2>
              <p className="text-sm text-gray-400 line-clamp-2">
                {t.equilibrium_scale_desc}
              </p>
            </div>
            {/* Simulation Preview Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-800 font-mono text-4xl font-bold opacity-20 rotate-12 group-hover:opacity-30 group-hover:scale-110 transition-transform duration-700">
              F = ma
            </div>
          </Link>

          {/* Card 2: Inertia Skateboard (Placeholder) */}
          <div className="group relative block aspect-video bg-gray-900 border border-gray-800 opacity-50 cursor-not-allowed">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <div className="text-xs font-mono text-gray-500 mb-2">P-M01 // PHYSICS</div>
              <h2 className="text-2xl font-bold mb-2 text-gray-600">Inertia Skateboard</h2>
              <p className="text-sm text-gray-600">
                {t.coming_soon}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
    </main>
  );
}
