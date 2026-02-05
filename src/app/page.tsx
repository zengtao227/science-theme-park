"use client";

import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import EntryProtocol from '@/components/EntryProtocol';
import ModuleCard from '@/components/ui/ModuleCard';
import MasteryRadar from '@/components/ui/MasteryRadar';
import AchievementVault from '@/components/ui/AchievementVault';
import ModuleFilter from '@/components/ui/ModuleFilter';
import { clsx } from 'clsx';
import { Gamepad2, Atom, FlaskConical, Sigma, Medal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { hasAcceptedProtocol, currentLanguage, setLanguage, getModuleProgress, getSectorProgress, history } = useAppStore();
  const t = translations[currentLanguage];
  const languages = ['DE', 'EN', 'CN'] as const;
  const languageLabel: Record<(typeof languages)[number], string> = {
    DE: '🇩🇪 DE',
    EN: '🇬🇧 EN',
    CN: '🇨🇳 CN',
  };

  const getProgress = (moduleId: string) => {
    const p = getModuleProgress(moduleId);
    return { percent: p, completed: p === 100 };
  };

  const mathProgress = getSectorProgress('math');
  const physicsProgress = getSectorProgress('physics');
  const chemistryProgress = getSectorProgress('chemistry');
  const [vaultOpen, setVaultOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const initial = window.setTimeout(update, 0);
    const handle = window.setInterval(update, 60000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(handle);
    };
  }, []);
  const masteryMetrics = useMemo(() => {
    if (!history.length) {
      return { conceptual: 0, speed: 0, rigor: 0, decay: 1 };
    }
    const totalScore = history.reduce((sum, entry) => sum + entry.score, 0);
    const conceptual = totalScore / history.length;
    const durations = history.map((entry) => entry.durationMs).filter((value) => Number.isFinite(value) && value > 0);
    const avgDuration = durations.length ? durations.reduce((sum, value) => sum + value, 0) / durations.length : 0;
    const speed = avgDuration ? Math.max(0, Math.min(1, 1 - avgDuration / 180000)) : 0;
    const rigorCount = history.filter((entry) => entry.rigor).length;
    const rigor = history.length ? rigorCount / history.length : 0;
    const lastAccessed = Math.max(...history.map((entry) => entry.timestamp));
    const effectiveNow = now || lastAccessed;
    const hoursSince = Math.max(0, (effectiveNow - lastAccessed) / 3600000);
    const decay = hoursSince <= 12 ? 1 : Math.max(0, 1 - (hoursSince - 12) * 0.01);
    return { conceptual, speed, rigor, decay };
  }, [history, now]);

  const normalizedQuery = query.trim().toLowerCase();
  const matches = (code: string, title: string, desc: string) => {
    if (!normalizedQuery) return true;
    return (
      code.toLowerCase().includes(normalizedQuery) ||
      title.toLowerCase().includes(normalizedQuery) ||
      desc.toLowerCase().includes(normalizedQuery)
    );
  };

  const mathModules = useMemo(() => ([
    { code: "S1.01", title: t.home.s1_01_title, desc: t.home.s1_01_subtitle, color: "neon-purple", href: "/chamber/s1-01", tags: ["math", "socratic"] },
    { code: "S1.02", title: t.home.s1_02_title, desc: t.home.s1_02_subtitle, color: "neon-green", href: "/chamber/s1-02", tags: ["math"] },
    { code: "S2.01", title: t.home.s2_01_title, desc: t.home.s2_01_subtitle, color: "neon-green", href: "/chamber/s2-01", tags: ["math", "socratic"] },
    { code: "S2.02", title: t.home.s2_02_title, desc: t.home.s2_02_subtitle, color: "neon-cyan", href: "/chamber/s2-02", tags: ["math"] },
    { code: "S2.03", title: t.home.s2_03_title, desc: t.home.s2_03_subtitle, color: "neon-green", href: "/chamber/s2-03", tags: ["math"] },
    { code: "S2.04", title: t.home.s2_04_title, desc: t.home.s2_04_subtitle, color: "neon-cyan", href: "/chamber/s2-04", tags: ["math", "socratic"] },
    { code: "S2.05", title: t.home.s2_05_title, desc: t.home.s2_05_subtitle, color: "neon-cyan", href: "/chamber/s2-05", tags: ["math"] },
    { code: "S2.06", title: t.home.s2_06_title, desc: t.home.s2_06_subtitle, color: "neon-cyan", href: "/chamber/s2-06", tags: ["math"] },
    { code: "S2.07", title: t.home.s2_07_title, desc: t.home.s2_07_subtitle, color: "neon-green", href: "/chamber/s2-07", tags: ["math"] },
    { code: "S3.01", title: t.home.s3_01_title, desc: t.home.s3_01_subtitle, color: "neon-purple", href: "/chamber/s3-01", tags: ["math", "socratic"] },
    { code: "S3.02", title: t.home.s3_02_title, desc: t.home.s3_02_subtitle, color: "neon-cyan", href: "/chamber/s3-02", tags: ["math"] },
    { code: "S3.03", title: t.home.s3_03_title, desc: t.home.s3_03_subtitle, color: "neon-amber", href: "/chamber/s3-03", tags: ["math", "biology"] },
    { code: "S3.04", title: t.home.s3_04_title, desc: t.home.s3_04_subtitle, color: "neon-amber", href: "/chamber/s3-04", tags: ["math"] },
    { code: "G1.01", title: t.home.g1_01_title, desc: t.home.g1_01_subtitle, color: "neon-purple", href: "/chamber/g1-01", tags: ["math", "socratic"] },
    { code: "G2.01", title: t.home.g2_01_title, desc: t.home.g2_01_subtitle, color: "neon-cyan", href: "/chamber/g2-01", tags: ["math"] },
    { code: "G3.01", title: t.home.g3_01_title, desc: t.home.g3_01_subtitle, color: "neon-purple", href: "/chamber/g3-01", tags: ["math", "socratic"] },
  ]), [t]);

  const physicsModules = useMemo(() => ([
    { code: "P1.02", title: t.home.p1_02_title, desc: t.home.p1_02_subtitle, color: "neon-green", href: "/chamber/p1-02", tags: ["physics"] },
    { code: "P1.03", title: t.home.p1_03_title, desc: t.home.p1_03_subtitle, color: "neon-green", href: "/chamber/p1-03", tags: ["physics"] },
    { code: "P1.04", title: t.home.p1_04_title, desc: t.home.p1_04_subtitle, color: "neon-green", href: "/chamber/p1-04", tags: ["physics"] },
    { code: "P1.05", title: t.home.p1_05_title, desc: t.home.p1_05_subtitle, color: "neon-green", href: "/chamber/p1-05", tags: ["physics"] },
    { code: "P2.01", title: t.home.p2_01_title, desc: t.home.p2_01_subtitle, color: "neon-purple", href: "/chamber/p2-01", tags: ["physics"] },
    { code: "P2.02", title: t.home.p2_02_title, desc: t.home.p2_02_subtitle, color: "neon-cyan", href: "/chamber/p2-02", tags: ["physics"] },
    { code: "P3.01", title: t.home.p3_01_title, desc: t.home.p3_01_subtitle, color: "neon-purple", href: "/chamber/p3-01", tags: ["physics"] },
    { code: "P3.02", title: t.home.p3_02_title, desc: t.home.p3_02_subtitle, color: "neon-cyan", href: "/chamber/p3-02", tags: ["physics"] },
    { code: "P5.01", title: t.home.p5_01_title, desc: t.home.p5_01_subtitle, color: "neon-cyan", href: "/chamber/p5-01", tags: ["physics"] },
    { code: "P5.02", title: t.home.p5_02_title, desc: t.home.p5_02_subtitle, color: "neon-purple", href: "/chamber/p5-02", tags: ["physics"] },
    { code: "P5.03", title: t.home.p5_03_title, desc: t.home.p5_03_subtitle, color: "neon-amber", href: "/chamber/p5-03", tags: ["physics"] },
  ]), [t]);

  const chemistryModules = useMemo(() => ([
    { code: "C1.01", title: "Mystery Lab", desc: "Substance identification via chemical reactions (Acid/Base/Iodine)", color: "neon-purple", href: "/chamber/c1-01", tags: ["chemistry"] },
    { code: "C1.02", title: t.home.c1_02_title, desc: t.home.c1_02_subtitle, color: "neon-purple", href: "/chamber/c1-02", tags: ["chemistry"] },
    { code: "C2.01", title: t.home.c2_01_title, desc: t.home.c2_01_subtitle, color: "neon-cyan", href: "/chamber/c2-01", tags: ["chemistry"] },
    { code: "C3.01", title: t.home.c3_01_title, desc: t.home.c3_01_subtitle, color: "neon-green", href: "/chamber/c3-01", tags: ["chemistry"] },
  ]), [t]);

  const advancedModules = useMemo(() => ([
    { code: "S3.02", title: t.home.s3_02_title, desc: t.home.s3_02_subtitle, color: "neon-amber", href: "/chamber/s3-02", tags: ["math"] },
    { code: "S3.03", title: t.home.s3_03_title, desc: t.home.s3_03_subtitle, color: "neon-amber", href: "/chamber/s3-03", tags: ["math", "biology"] },
    { code: "S3.04", title: t.home.s3_04_title, desc: t.home.s3_04_subtitle, color: "neon-amber", href: "/chamber/s3-04", tags: ["math"] },
  ]), [t]);

  const filterTags = useMemo(() => ([
    { id: "physics", label: t.home.filter_tags.physics },
    { id: "math", label: t.home.filter_tags.math },
    { id: "chemistry", label: t.home.filter_tags.chemistry },
    { id: "biology", label: t.home.filter_tags.biology },
    { id: "socratic", label: t.home.filter_tags.socratic },
  ]), [t]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => (
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    ));
  };

  const filterModules = (modules: { code: string; title: string; desc: string; tags: string[] }[]) => {
    return modules.filter((module) => {
      const matchesText = matches(module.code, module.title, module.desc);
      const matchesTags = selectedTags.length === 0 || module.tags.some((tag) => selectedTags.includes(tag));
      return matchesText && matchesTags;
    });
  };

  const filteredMath = useMemo(() => filterModules(mathModules), [mathModules, normalizedQuery, selectedTags]);
  const filteredPhysics = useMemo(() => filterModules(physicsModules), [physicsModules, normalizedQuery, selectedTags]);
  const filteredChemistry = useMemo(() => filterModules(chemistryModules), [chemistryModules, normalizedQuery, selectedTags]);
  const filteredAdvanced = useMemo(() => filterModules(advancedModules), [advancedModules, normalizedQuery, selectedTags]);

  const totalFiltered = filteredMath.length + filteredPhysics.length + filteredChemistry.length + filteredAdvanced.length;

  if (!hasAcceptedProtocol) {
    return <EntryProtocol />;
  }

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
          <button
            onClick={() => setVaultOpen(true)}
            className="min-h-[44px] flex items-center gap-2 px-3 py-2 text-[10px] font-black tracking-[0.3em] uppercase border border-neon-cyan/40 text-neon-cyan bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-all shadow-[0_0_18px_var(--color-neon-cyan)]"
          >
            <Medal className="w-4 h-4" />
            {t.common.achievements_title}
          </button>
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

        <div className="mb-10 border-l-2 border-neon-green pl-6 py-2">
          <h2 className="text-5xl font-black tracking-tighter mb-2 max-w-2xl leading-[0.9]">
            {t.home.subtitle}
          </h2>
          <p className="text-white/50 font-mono text-sm tracking-widest uppercase">
            Interactive STEM Simulations // V2.1
          </p>
        </div>

        <div className="mb-14">
          <ModuleFilter
            label={t.home.search_label}
            query={query}
            placeholder={t.home.search_placeholder}
            tagsLabel={t.home.filter_tags_label}
            tags={filterTags}
            selectedTags={selectedTags}
            onQueryChange={setQuery}
            onToggleTag={toggleTag}
            onClear={() => {
              setQuery('');
              setSelectedTags([]);
            }}
            clearLabel={t.home.filter_clear}
          />
          {totalFiltered === 0 && (
            <div className="mt-6 border border-white/10 bg-white/[0.02] rounded-xl px-5 py-4 text-xs font-mono text-white/60">
              {t.home.filter_empty}
            </div>
          )}
        </div>

        <div className="space-y-20">
          <MasteryRadar
            conceptual={masteryMetrics.conceptual}
            speed={masteryMetrics.speed}
            rigor={masteryMetrics.rigor}
            decay={masteryMetrics.decay}
            labels={{
              title: t.common.mastery_title,
              conceptual: t.common.mastery_conceptual,
              speed: t.common.mastery_speed,
              rigor: t.common.mastery_rigor,
              decay: t.common.mastery_decay,
            }}
          />

          {filteredMath.length > 0 && (
            <Sector
              title="MATHEMATICS SECTOR"
              color="neon-cyan"
              progress={mathProgress}
              icon={<Atom className="w-5 h-5 shadow-[0_0_10px_currentColor]" />}
              tagIcon="📐"
            >
              <AnimatePresence mode="popLayout">
                {filteredMath.map((module) => (
                  <motion.div
                    layout
                    key={module.code}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ModuleCard
                      code={module.code}
                      title={module.title}
                      desc={module.desc}
                      color={module.color}
                      progress={getProgress(module.code)}
                      href={module.href}
                      actionLabel={t.home.initiate_simulation}
                      completedLabel={t.home.completed_badge}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Sector>
          )}

          {filteredPhysics.length > 0 && (
            <Sector
              title="PHYSICS SECTOR"
              color="neon-green"
              progress={physicsProgress}
              icon={<Atom className="w-5 h-5 shadow-[0_0_10px_currentColor]" />}
              tagIcon="⚛️"
            >
              <AnimatePresence mode="popLayout">
                {filteredPhysics.map((module) => (
                  <motion.div
                    layout
                    key={module.code}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ModuleCard
                      code={module.code}
                      title={module.title}
                      desc={module.desc}
                      color={module.color}
                      progress={getProgress(module.code)}
                      href={module.href}
                      actionLabel={t.home.initiate_simulation}
                      completedLabel={t.home.completed_badge}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Sector>
          )}

          {filteredChemistry.length > 0 && (
            <Sector
              title="CHEMISTRY SECTOR"
              color="neon-purple"
              progress={chemistryProgress}
              icon={<FlaskConical className="w-5 h-5 shadow-[0_0_10px_currentColor]" />}
              tagIcon="🧪"
            >
              <AnimatePresence mode="popLayout">
                {filteredChemistry.map((module) => (
                  <motion.div
                    layout
                    key={module.code}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ModuleCard
                      code={module.code}
                      title={module.title}
                      desc={module.desc}
                      color={module.color}
                      progress={getProgress(module.code)}
                      href={module.href}
                      actionLabel={t.home.initiate_simulation}
                      completedLabel={t.home.completed_badge}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Sector>
          )}

          {filteredAdvanced.length > 0 && (
            <Sector
              title="ADVANCED MATH SECTOR"
              color="neon-amber"
              progress={0}
              icon={<Sigma className="w-5 h-5 shadow-[0_0_10px_currentColor]" />}
              tagIcon="∑"
            >
              <AnimatePresence mode="popLayout">
                {filteredAdvanced.map((module) => (
                  <motion.div
                    layout
                    key={module.code}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ModuleCard
                      code={module.code}
                      title={module.title}
                      desc={module.desc}
                      color={module.color}
                      progress={getProgress(module.code)}
                      href={module.href}
                      actionLabel={t.home.initiate_simulation}
                      completedLabel={t.home.completed_badge}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Sector>
          )}

        </div>
      </div>
      <AchievementVault open={vaultOpen} onClose={() => setVaultOpen(false)} />
    </main>
  );
}

function Sector({ title, color, icon, tagIcon, progress, children }: { title: string, color: string, icon: React.ReactNode, tagIcon: string, progress: number, children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className={clsx(`w-10 h-10 rounded-lg border border-${color}/30 flex items-center justify-center text-${color} bg-${color}/5 shadow-[0_0_15px_rgba(0,0,0,0.5)]`)}>
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-black tracking-[0.3em] text-white uppercase whitespace-nowrap">
            <span>{title}</span>
            <span className="ml-2 text-sm text-white/70">{tagIcon}</span>
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className={clsx("h-full transition-all duration-1000", `bg-${color}`)} style={{ width: `${progress}%` }} />
            </div>
            <span className={clsx("text-[9px] font-mono font-black opacity-60", `text-${color}`)}>{progress}%</span>
          </div>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent self-center mt-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
}
