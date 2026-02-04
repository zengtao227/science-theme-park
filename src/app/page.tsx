"use client";

import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import EntryProtocol from '@/components/EntryProtocol';
import { clsx } from 'clsx';
import { Gamepad2, Database, Atom, Globe, Square, Sigma, Zap, Box, BarChart3 } from 'lucide-react';
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
    <main className="h-screen overflow-y-auto bg-black text-white selection:bg-neon-green/30">
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

        {/* Experiment Sections */}
        <div className="space-y-24">

          {/* SEK 1 Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h3 className="text-sm font-black tracking-[0.5em] text-white/40 uppercase whitespace-nowrap">
                {t.home.sek1_title}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* S1.01: Areas & Volumes */}
              <Link href="/chamber/s1-01" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-purple/50 group-hover:bg-neon-purple/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-purple transition-colors">
                        <Box className="w-6 h-6 text-white group-hover:text-neon-purple" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-purple">S1.01</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-purple transition-colors uppercase">
                      {t.home.s1_01_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s1_01_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>

              {/* S1.02: Data & Chance */}
              <Link href="/chamber/s1-02" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-green/50 group-hover:bg-neon-green/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-green transition-colors">
                        <BarChart3 className="w-6 h-6 text-white group-hover:text-neon-green" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-green">S1.02</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-green transition-colors uppercase">
                      {t.home.s1_02_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s1_02_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-green opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* SEK 2 Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h3 className="text-sm font-black tracking-[0.5em] text-white/40 uppercase whitespace-nowrap">
                {t.home.sek2_title}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* S2.01: Binomial Factory */}
              <Link href="/chamber/s2-01" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-green/50 group-hover:bg-neon-green/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-green transition-colors">
                        <Square className="w-6 h-6 text-white group-hover:text-neon-green" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-green">S2.01</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:neon-text-green transition-colors uppercase">
                      {t.home.s2_01_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s2_01_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-green opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>

              {/* S2.02: Pythagoras & Roots */}
              <Link href="/chamber/s2-02" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                        <Square className="w-6 h-6 text-white group-hover:text-neon-cyan" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-cyan">S2.02</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-cyan transition-colors uppercase">
                      {t.home.s2_02_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s2_02_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>

              {/* S2.03: Lines & Functions */}
              <Link href="/chamber/s2-03" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-green/50 group-hover:bg-neon-green/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-green transition-colors">
                        <Globe className="w-6 h-6 text-white group-hover:text-neon-green" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-green">S2.03</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:neon-text-green transition-colors uppercase">
                      {t.home.s2_03_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s2_03_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-green opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>

              {/* S2.04: Similarity & Scaling */}
              <Link href="/chamber/s2-04" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                        <Database className="w-6 h-6 text-white group-hover:text-neon-cyan" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-cyan">S2.04</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-cyan transition-colors uppercase">
                      {t.home.s2_04_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s2_04_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>

              {/* S2.05: Powers & Roots */}
              <Link href="/chamber/s2-05" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                        <Zap className="w-6 h-6 text-white group-hover:text-neon-cyan" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-cyan">S2.05</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-cyan transition-colors uppercase">
                      {t.home.s2_05_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s2_05_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>

              {/* S2.06: Linear Systems */}
              <Link href="/chamber/s2-06" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                        <Sigma className="w-6 h-6 text-white group-hover:text-neon-cyan" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-cyan">S2.06</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-cyan transition-colors uppercase">
                      {t.home.s2_06_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s2_06_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* SEK 3 Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h3 className="text-sm font-black tracking-[0.5em] text-white/40 uppercase whitespace-nowrap">
                {t.home.sek3_title}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* S3.01: Quadratic Equations */}
              <Link href="/chamber/s3-01" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-purple/50 group-hover:bg-neon-purple/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-purple transition-colors">
                        <Square className="w-6 h-6 text-white group-hover:text-neon-purple" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-purple">S3.01</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-purple transition-colors uppercase">
                      {t.home.s3_01_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.s3_01_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* GYMNASIUM Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h3 className="text-sm font-black tracking-[0.5em] text-white/40 uppercase whitespace-nowrap">
                {t.home.gym_title}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* G1.01: Calculus Intro */}
              <Link href="/chamber/g1-01" className="group">
                <div className="hud-panel p-8 h-full transition-all duration-500 border-white/5 group-hover:border-neon-purple/50 group-hover:bg-neon-purple/5 group-hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon-purple transition-colors">
                        <Sigma className="w-6 h-6 text-white group-hover:text-neon-purple" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-widest text-neon-purple">G1.01</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-purple transition-colors uppercase">
                      {t.home.g1_01_title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {t.home.g1_01_subtitle}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-bold text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    <span>{t.home.initiate_simulation}</span>
                    <span className="animate-bounce">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

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
