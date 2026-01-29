"use client";

import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import EntryProtocol from '@/components/EntryProtocol';
import { clsx } from 'clsx';
import { Gamepad2, Database, Atom, Globe, Square, Sigma } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { hasAcceptedProtocol, currentLanguage, setLanguage } = useAppStore();
  const t = translations[currentLanguage];
  const languages = ['DE', 'EN', 'CN'] as const;
  const languageLabel: Record<(typeof languages)[number], string> = {
    DE: '🇩🇪 DE',
    EN: '🇬🇧 EN',
    CN: '🇨🇳 CN',
  };

  if (!hasAcceptedProtocol) {
    return <EntryProtocol />;
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-neon-green/30">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 scanline opacity-20" />

      {/* HUD Header */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 border-b border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm border border-neon-green flex items-center justify-center animate-pulse">
            <Gamepad2 className="w-5 h-5 text-neon-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter neon-text-green">{t.home.title}</h1>
            <p className="text-[10px] text-neutral-300 font-mono tracking-widest leading-none mt-1 uppercase">
              {t.home.engine_line}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black/50 border border-white/10 px-4 py-2 rounded-sm schoolchildren">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={clsx(
                "text-xs font-bold transition-all px-2 py-1 rounded",
                currentLanguage === lang
                  ? "text-neon-green bg-neon-green/10"
                  : "text-neutral-300 hover:text-white"
              )}
            >
              {languageLabel[lang]}
            </button>
          ))}
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto pt-32 px-6 pb-20">

        {/* Intro Section */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-neon-green" />
            <span className="hud-text">{t.home.nexus}</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter mb-4 max-w-2xl leading-[0.9]">
            {t.home.subtitle}
          </h2>
        </div>

        {/* Experiment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* M-G04: Binomial Factory */}
          <Link href="/chamber/binomial-factory" className="group">
            <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-green/50 group-hover:bg-neon-green/5 group-hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-green transition-colors">
                    <Square className="w-6 h-6 text-white group-hover:text-neon-green" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 font-bold">M-G04</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:neon-text-green transition-colors">
                  {t.home.mg04_title}
                </h3>
                <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                  {t.home.mg04_subtitle}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-green opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                <span>{t.home.initiate_simulation}</span>
                <span className="animate-bounce">→</span>
              </div>
            </div>
          </Link>

          {/* M-G05: Pythagoras & Roots */}
          <Link href="/chamber/mg05" className="group">
            <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/5 group-hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                    <Square className="w-6 h-6 text-white group-hover:text-neon-cyan" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 font-bold">M-G05</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-cyan transition-colors">
                  {t.home.mg05_title}
                </h3>
                <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                  {t.home.mg05_subtitle}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                <span>{t.home.initiate_simulation}</span>
                <span className="animate-bounce">→</span>
              </div>
            </div>
          </Link>

          {/* M-G06: Quadratic Equations */}
          <Link href="/chamber/mg06" className="group">
            <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-purple/50 group-hover:bg-neon-purple/5 group-hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-purple transition-colors">
                    <Square className="w-6 h-6 text-white group-hover:text-neon-purple" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 font-bold">M-G06</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-purple transition-colors">
                  {t.home.mg06_title}
                </h3>
                <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                  {t.home.mg06_subtitle}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                <span>{t.home.initiate_simulation}</span>
                <span className="animate-bounce">→</span>
              </div>
            </div>
          </Link>

          {/* M-G07: Lines & Functions */}
          <Link href="/chamber/mg07" className="group">
            <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-green/50 group-hover:bg-neon-green/5 group-hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-green transition-colors">
                    <Globe className="w-6 h-6 text-white group-hover:text-neon-green" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 font-bold">M-G07</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:neon-text-green transition-colors">
                  {t.home.mg07_title}
                </h3>
                <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                  {t.home.mg07_subtitle}
                </p>
              </div>
              <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-green opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                <span>{t.home.initiate_simulation}</span>
                <span className="animate-bounce">→</span>
              </div>
            </div>
          </Link>

          {/* M-G08: Similarity & Scaling */}
          <Link href="/chamber/mg08" className="group">
            <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/5 group-hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                    <Database className="w-6 h-6 text-white group-hover:text-neon-cyan" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 font-bold">M-G08</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-cyan transition-colors">
                  {t.home.mg08_title}
                </h3>
                <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                  {t.home.mg08_subtitle}
                </p>
              </div>
              <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                <span>{t.home.initiate_simulation}</span>
                <span className="animate-bounce">→</span>
              </div>
            </div>
          </Link>

          {/* M-G09: Calculus Intro */}
          <Link href="/chamber/mg09" className="group">
            <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-purple/50 group-hover:bg-neon-purple/5 group-hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-purple transition-colors">
                    <Sigma className="w-6 h-6 text-white group-hover:text-neon-purple" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 font-bold">M-G09</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-purple transition-colors">
                  {t.home.mg09_title}
                </h3>
                <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                  {t.home.mg09_subtitle}
                </p>
              </div>
              <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                <span>{t.home.initiate_simulation}</span>
                <span className="animate-bounce">→</span>
              </div>
            </div>
          </Link>

        </div>

        {/* System Footer Metadata */}
        <section className="mt-32 pt-10 border-t border-white/5 flex flex-wrap gap-10">
          <div className="flex items-center gap-4">
            <Atom className="w-5 h-5 text-neon-cyan" />
            <div>
              <p className="text-[10px] text-neutral-300 font-mono uppercase">{t.home.engine_status_label}</p>
              <p className="text-xs font-bold text-neon-cyan antialiased">{t.home.engine_status_value}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-neon-purple" />
            <div>
              <p className="text-[10px] text-neutral-300 font-mono uppercase">{t.home.nodes_label}</p>
              <p className="text-xs font-bold text-neon-purple antialiased">{t.home.nodes_value}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
