"use client";

import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import EntryProtocol from '@/components/EntryProtocol';
import ConceptIcon from '@/components/ConceptIcon';
import { clsx } from 'clsx';
import { Gamepad2, Atom, Globe, FlaskConical } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { hasAcceptedProtocol, currentLanguage, setLanguage, progress } = useAppStore();
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

  // Helper to check progress
  const getProgress = (moduleId: string) => {
    const mod = progress[moduleId];
    if (!mod) return { percent: 0, completed: false };
    const stages = Object.keys(mod.stages).length;
    // Simplified: assuming 3 stages per module usually. 
    // In a real app we'd know total stages. For now, just show "Active".
    return { percent: stages > 0 ? 100 : 0, completed: stages >= 3 };
  };

  return (
    <main className="h-screen overflow-y-auto bg-black text-white selection:bg-neon-green/30 pb-20">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 scanline opacity-20" />

      {/* HUD Header */}
      <header className="sticky top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm border border-neon-green flex items-center justify-center animate-pulse">
            <Gamepad2 className="w-5 h-5 text-neon-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter neon-text-green">{t.home.title}</h1>
            <div className="flex gap-4 text-[10px] text-neutral-300 font-mono tracking-widest leading-none mt-1 uppercase">
              <span>SYS.ONLINE</span>
              <span className="text-neon-green">●</span>
            </div>
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
      <div className="max-w-7xl mx-auto pt-12 px-6">

        {/* Intro Section */}
        <div className="mb-16 border-l-2 border-neon-green pl-6 py-2">
          <h2 className="text-5xl font-black tracking-tighter mb-2 max-w-2xl leading-[0.9]">
            {t.home.subtitle}
          </h2>
          <p className="text-white/50 font-mono text-sm tracking-widest uppercase">
            Interactive STEM Simulations // V2.1
          </p>
        </div>

        <div className="space-y-20">

          {/* MATHEMATICS SECTOR */}
          <Sector
            title="MATHEMATICS SECTOR"
            color="neon-cyan"
            icon={<ConceptIcon code="S1.01" className="w-5 h-5" />}
          >
            <ModuleCard code="S1.01" title={t.home.s1_01_title} desc={t.home.s1_01_subtitle} color="neon-purple" progress={getProgress('S1.01')} href="/chamber/s1-01" />
            <ModuleCard code="S1.02" title={t.home.s1_02_title} desc={t.home.s1_02_subtitle} color="neon-green" progress={getProgress('S1.02')} href="/chamber/s1-02" />

            <ModuleCard code="S2.01" title={t.home.s2_01_title} desc={t.home.s2_01_subtitle} color="neon-green" progress={getProgress('S2.01')} href="/chamber/s2-01" />
            <ModuleCard code="S2.02" title={t.home.s2_02_title} desc={t.home.s2_02_subtitle} color="neon-cyan" progress={getProgress('S2.02')} href="/chamber/s2-02" />
            <ModuleCard code="S2.03" title={t.home.s2_03_title} desc={t.home.s2_03_subtitle} color="neon-green" progress={getProgress('S2.03')} href="/chamber/s2-03" />
            <ModuleCard code="S2.04" title={t.home.s2_04_title} desc={t.home.s2_04_subtitle} color="neon-cyan" progress={getProgress('S2.04')} href="/chamber/s2-04" />
            <ModuleCard code="S2.05" title={t.home.s2_05_title} desc={t.home.s2_05_subtitle} color="neon-cyan" progress={getProgress('S2.05')} href="/chamber/s2-05" />
            <ModuleCard code="S2.06" title={t.home.s2_06_title} desc={t.home.s2_06_subtitle} color="neon-cyan" progress={getProgress('S2.06')} href="/chamber/s2-06" />

            <ModuleCard code="S3.01" title={t.home.s3_01_title} desc={t.home.s3_01_subtitle} color="neon-purple" progress={getProgress('S3.01')} href="/chamber/s3-01" />
            <ModuleCard code="G1.01" title={t.home.g1_01_title} desc={t.home.g1_01_subtitle} color="neon-purple" progress={getProgress('G1.01')} href="/chamber/g1-01" />
          </Sector>

          {/* PHYSICS SECTOR */}
          <Sector
            title="PHYSICS SECTOR"
            color="neon-green"
            icon={<Atom className="w-5 h-5" />}
          >
            <ModuleCard
              code="P1.02"
              title="Newton's Laws"
              desc="Mechanics, friction, acceleration, and collision dynamics"
              color="neon-green"
              progress={getProgress('P1.02')}
              href="/chamber/p1-02"
            />
            <ModuleCard
              code="P2.02"
              title="Circuit Sandbox"
              desc="Ohm's Law, series/parallel circuits, and electron flow"
              color="neon-cyan"
              progress={getProgress('P2.02')}
              href="/chamber/p2-02"
            />
            <ModuleCard
              code="P3.01"
              title="Geometrical Optics"
              desc="Ray tracing, reflection, refraction, and lenses"
              color="neon-purple"
              progress={getProgress('P3.01')}
              href="/chamber/p3-01"
            />
          </Sector>

          {/* CHEMISTRY SECTOR */}
          <Sector
            title="CHEMISTRY SECTOR"
            color="neon-purple"
            icon={<FlaskConical className="w-5 h-5" />}
          >
            <ModuleCard
              code="C1.01"
              title="Mystery Lab"
              desc="Substance identification via chemical reactions (Acid/Base/Iodine)"
              color="neon-purple"
              progress={getProgress('C1.01')}
              href="/chamber/c1-01"
            />
          </Sector>

        </div>
      </div>
    </main>
  );
}

function Sector({ title, color, icon, children }: { title: string, color: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-8 h-8 rounded border border-${color} flex items-center justify-center text-${color}`}>
          {icon}
        </div>
        <h3 className="text-sm font-black tracking-[0.3em] text-white/60 uppercase whitespace-nowrap">
          {title}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
}

function ModuleCard({ code, title, desc, color, progress, href }: { code: string, title: string, desc: string, color: string, progress: { percent: number, completed: boolean }, href: string }) {
  return (
    <Link href={href} className="group block h-full">
      <div className={clsx(
        "hud-panel p-6 h-full transition-all duration-300 border-white/5 flex flex-col justify-between relative overflow-hidden",
        "group-hover:border-opacity-50 group-hover:-translate-y-1",
        `group-hover:border-${color} group-hover:bg-${color}/5`
      )}>
        {/* Progress Bar */}
        {progress.percent > 0 && (
          <div className="absolute top-0 left-0 h-1 bg-neon-green/50 transition-all" style={{ width: `${progress.percent}%` }} />
        )}
        {progress.completed && (
          <div className="absolute top-2 right-2 text-neon-green text-xs font-bold">✓ COMPLETED</div>
        )}

        <div>
          <div className="flex justify-between items-start mb-6">
            <span className={clsx("text-xs font-mono font-bold tracking-widest opacity-70", `text-${color}`)}>{code}</span>
            <div className={clsx("w-2 h-2 rounded-full", progress.percent > 0 ? "bg-neon-green" : "bg-white/10")} />
          </div>
          <h3 className={clsx("text-xl font-bold tracking-tight mb-2 uppercase transition-colors", `group-hover:text-${color}`)}>
            {title}
          </h3>
          <p className="text-sm text-neutral-400 font-mono leading-relaxed">
            {desc}
          </p>
        </div>

        <div className={clsx("mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity", `text-${color}`)}>
          <span>Initiate</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
