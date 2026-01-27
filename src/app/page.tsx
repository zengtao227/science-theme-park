"use client";

import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import EntryProtocol from '@/components/EntryProtocol';
import Link from 'next/link';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Gamepad2, Database, Atom, Globe, Laptop2, Terminal } from 'lucide-react';

export default function Home() {
  const { hasAcceptedProtocol, currentLanguage, setLanguage } = useAppStore();
  const t = translations[currentLanguage].home;

  // Simulate "Protocol Check" before showing anything
  if (!hasAcceptedProtocol) {
    return <EntryProtocol />;
  }

  return (
    <main className="min-h-screen relative flex flex-col font-sans selection:bg-green-500 selection:text-black overflow-hidden bg-[url('/grid-bg.svg')] bg-cover">

      {/* --- HUD HEADER --- */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        {/* Left: Brand Identity */}
        <div className="pointer-events-auto flex items-center gap-4">
          <div className="w-10 h-10 border border-green-500/50 bg-green-500/10 flex items-center justify-center animate-pulse">
            <Gamepad2 className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter leading-none neon-text-green">{t.title}</h1>
            <p className="font-mono text-[10px] text-green-500/60 tracking-widest uppercase">{t.subtitle}</p>
          </div>
        </div>

        {/* Right: System Status & Nav */}
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Language Selector */}
          <div className="flex border border-white/10 rounded-sm overflow-hidden bg-black/50 backdrop-blur-sm">
            {['EN', 'CN', 'DE'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={clsx(
                  "px-3 py-1 text-xs font-bold transition-all hover:bg-white/5",
                  currentLanguage === lang ? "bg-green-500 text-black shadow-[0_0_15px_rgba(0,255,157,0.5)]" : "text-gray-500"
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="h-8 w-px bg-white/10 mx-2" />

          {/* Quick Nav Buttons */}
          <nav className="flex gap-2">
            <button className="btn-primary flex items-center gap-2 group px-4 py-2">
              <Database className="w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors" />
              <span className="text-xs font-bold tracking-widest text-gray-400 group-hover:text-green-400 transition-colors uppercase">{t.archive}</span>
            </button>
            <button className="btn-primary flex items-center gap-2 group px-4 py-2 border-l-4 border-l-green-500">
              <Globe className="w-4 h-4 text-green-500" />
              <span className="text-xs font-bold tracking-widest text-white uppercase">{t.nexus}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* --- MAIN CONTENT: THE ARCHIVE GRID --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 pt-24 z-10">

        {/* Filter Bar (Visual Only for MVP) */}
        <div className="w-full max-w-7xl mb-8 flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">ACCESS TERMINAL</h2>
            <div className="flex gap-4 text-xs font-mono text-gray-500">
              <span className="text-green-500">● SYSTEM ONLINE</span>
              <span>//</span>
              <span>LATENCY: 12ms</span>
              <span>//</span>
              <span>USER: GUEST_01</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-1 bg-green-500/10 border border-green-500 text-green-400 text-xs font-bold">ALL</button>
            <button className="px-4 py-1 border border-white/10 text-gray-600 hover:text-white hover:border-white/30 text-xs font-bold">PHYSICS</button>
            <button className="px-4 py-1 border border-white/10 text-gray-600 hover:text-white hover:border-white/30 text-xs font-bold">MATH</button>
          </div>
        </div>

        {/* Experiment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">

          {/* Card 1: Equilibrium Scale */}
          <Link href="/chamber/equilibrium-scale" className="group relative h-64 bg-black border border-white/10 hover:border-green-500/50 transition-all duration-500 overflow-hidden">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
              <div className="flex justify-between items-start mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono border border-green-500/30 text-green-500 px-1">M-A04</span>
                <Terminal className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{t.equilibrium_scale_title}</h3>
              <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors line-clamp-2">
                {t.equilibrium_scale_desc}
              </p>

              {/* Hover Action */}
              <div className="mt-4 h-0 overflow-hidden group-hover:h-8 transition-all duration-300">
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold tracking-widest uppercase">
                  <span>Initiate Simulation</span>
                  <div className="h-px flex-1 bg-green-500/50" />
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Decorative Tech Lines */}
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-60 transition-opacity">
              <div className="w-16 h-16 border-t border-r border-green-500" />
            </div>
          </Link>

          {/* Card 2: Inertia Skateboard (Locked) */}
          <div className="relative h-64 bg-black/50 border border-white/5 opacity-50 cursor-not-allowed overflow-hidden">
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 grayscale">
              <div className="flex justify-between items-start mb-2 opacity-30">
                <span className="text-[10px] font-mono border border-gray-700 text-gray-500 px-1">P-M01</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-500 mb-2">Inertia Skateboard</h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {t.coming_soon}
              </p>
            </div>
            {/* Locked Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="px-4 py-2 border border-red-900/30 bg-red-900/10 text-red-700 text-xs font-bold tracking-[0.2em] transform -rotate-12">
                LOCKED // LEVEL 2 REQUIRED
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent h-48 bottom-0" />
    </main>
  );
}
