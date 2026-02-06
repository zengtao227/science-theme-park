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
    { code: "SM1.01", title: t.home.sm1_01_title, desc: t.home.sm1_01_subtitle, color: "neon-purple", href: "/chamber/sm1-01", tags: ["math", "socratic"] },
    { code: "SM1.02", title: t.home.sm1_02_title, desc: t.home.sm1_02_subtitle, color: "neon-green", href: "/chamber/sm1-02", tags: ["math"] },
    { code: "SM2.01", title: t.home.sm2_01_title, desc: t.home.sm2_01_subtitle, color: "neon-green", href: "/chamber/sm2-01", tags: ["math", "socratic"] },
    { code: "SM2.02", title: t.home.sm2_02_title, desc: t.home.sm2_02_subtitle, color: "neon-cyan", href: "/chamber/sm2-02", tags: ["math"] },
    { code: "SM2.03", title: t.home.sm2_03_title, desc: t.home.sm2_03_subtitle, color: "neon-green", href: "/chamber/sm2-03", tags: ["math"] },
    { code: "SM2.04", title: t.home.sm2_04_title, desc: t.home.sm2_04_subtitle, color: "neon-cyan", href: "/chamber/sm2-04", tags: ["math", "socratic"] },
    { code: "SM2.05", title: t.home.sm2_05_title, desc: t.home.sm2_05_subtitle, color: "neon-cyan", href: "/chamber/sm2-05", tags: ["math"] },
    { code: "SM2.06", title: t.home.sm2_06_title, desc: t.home.sm2_06_subtitle, color: "neon-cyan", href: "/chamber/sm2-06", tags: ["math"] },
    { code: "SM2.07", title: t.home.sm2_07_title, desc: t.home.sm2_07_subtitle, color: "neon-green", href: "/chamber/sm2-07", tags: ["math"] },
    { code: "SM3.01", title: t.home.sm3_01_title, desc: t.home.sm3_01_subtitle, color: "neon-purple", href: "/chamber/sm3-01", tags: ["math", "socratic"] },
    { code: "SM3.02", title: t.home.sm3_02_title, desc: t.home.sm3_02_subtitle, color: "neon-cyan", href: "/chamber/sm3-02", tags: ["math"] },
    { code: "SM3.03", title: t.home.sm3_03_title, desc: t.home.sm3_03_subtitle, color: "neon-amber", href: "/chamber/sm3-03", tags: ["math", "biology"] },
    { code: "SM3.04", title: t.home.sm3_04_title, desc: t.home.sm3_04_subtitle, color: "neon-amber", href: "/chamber/sm3-04", tags: ["math"] },
    { code: "GM1.01", title: t.home.gm1_01_title, desc: t.home.gm1_01_subtitle, color: "neon-purple", href: "/chamber/gm1-01", tags: ["math", "socratic"] },
    { code: "GM2.01", title: t.home.gm2_01_title, desc: t.home.gm2_01_subtitle, color: "neon-cyan", href: "/chamber/gm2-01", tags: ["math"] },
    { code: "GM3.01", title: t.home.gm3_01_title, desc: t.home.gm3_01_subtitle, color: "neon-purple", href: "/chamber/gm3-01", tags: ["math", "socratic"] },
  ]), [t]);

  const physicsModules = useMemo(() => ([
    { code: "SP1.02", title: t.home.sp1_02_title, desc: t.home.sp1_02_subtitle, color: "neon-purple", href: "/chamber/sp1-02", tags: ["physics"] },
    { code: "SP1.03", title: t.home.sp1_03_title, desc: t.home.sp1_03_subtitle, color: "neon-green", href: "/chamber/sp1-03", tags: ["physics"] },
    { code: "SP1.04", title: t.home.sp1_04_title, desc: t.home.sp1_04_subtitle, color: "neon-cyan", href: "/chamber/sp1-04", tags: ["physics"] },
    { code: "SP1.05", title: t.home.sp1_05_title, desc: t.home.sp1_05_subtitle, color: "neon-cyan", href: "/chamber/sp1-05", tags: ["physics"] },
    { code: "SP1.06", title: t.home.sp1_06_title, desc: t.home.sp1_06_subtitle, color: "neon-amber", href: "/chamber/sp1-06", tags: ["physics"] },
    { code: "SP2.01", title: t.home.sp2_01_title, desc: t.home.sp2_01_subtitle, color: "neon-amber", href: "/chamber/sp2-01", tags: ["physics"] },
    { code: "SP2.02", title: t.home.sp2_02_title, desc: t.home.sp2_02_subtitle, color: "neon-cyan", href: "/chamber/sp2-02", tags: ["physics"] },
    { code: "SP3.01", title: t.home.sp3_01_title, desc: t.home.sp3_01_subtitle, color: "neon-purple", href: "/chamber/sp3-01", tags: ["physics"] },
    { code: "SP3.02", title: t.home.sp3_02_title, desc: t.home.sp3_02_subtitle, color: "neon-cyan", href: "/chamber/sp3-02", tags: ["physics"] },
    { code: "GP5.01", title: t.home.gp5_01_title, desc: t.home.gp5_01_subtitle, color: "neon-cyan", href: "/chamber/gp5-01", tags: ["physics"] },
    { code: "GP5.02", title: t.home.gp5_02_title, desc: t.home.gp5_02_subtitle, color: "neon-purple", href: "/chamber/gp5-02", tags: ["physics"] },
    { code: "GP5.03", title: t.home.gp5_03_title, desc: t.home.gp5_03_subtitle, color: "neon-amber", href: "/chamber/gp5-03", tags: ["physics"] },
  ]), [t]);

  const chemistryModules = useMemo(() => ([
    { code: "SC1.01", title: t.home.sc1_01_title, desc: t.home.sc1_01_subtitle, color: "neon-purple", href: "/chamber/sc1-01", tags: ["chemistry"] },
    { code: "SC1.02", title: t.home.sc1_02_title, desc: t.home.sc1_02_subtitle, color: "neon-purple", href: "/chamber/sc1-02", tags: ["chemistry"] },
    { code: "SC2.01", title: t.home.sc2_01_title, desc: t.home.sc2_01_subtitle, color: "neon-cyan", href: "/chamber/sc2-01", tags: ["chemistry"] },
    { code: "SC2.02", title: t.home.sc2_02_title, desc: t.home.sc2_02_subtitle, color: "neon-amber", href: "/chamber/sc2-02", tags: ["chemistry"] },
    { code: "SC1.03", title: t.home.sc1_03_title || "SC1.03 // ATOMS FORGE", desc: t.home.sc1_03_subtitle || "Build isotopes and understand atomic orbitals in 3D.", color: "neon-purple", href: "/chamber/sc1-03", tags: ["chemistry"] },
    { code: "GC3.01", title: t.home.gc3_01_title, desc: t.home.gc3_01_subtitle, color: "neon-green", href: "/chamber/gc3-01", tags: ["chemistry"] },
  ]), [t]);

  const advancedModules = useMemo(() => ([
    { code: "GM4.01", title: "GM4.01 // COMPLEX HORIZON", desc: "Visualize the complex plane and Euler's formula in 3D space.", color: "neon-purple", href: "/chamber/gm4-01", tags: ["math"] },
    { code: "GM5.01", title: "GM5.01 // MATRIX TRANSFORM", desc: "Linear transformations and eigenvectors mapped to the Basel grid.", color: "neon-amber", href: "/chamber/gm5-01", tags: ["math"] },
  ]), []);

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

  const matchesModule = (module: { code: string; title: string; desc: string; color: string; href: string; tags: string[] }) => {
    const matchesText = matches(module.code, module.title, module.desc);
    const matchesTags = selectedTags.length === 0 || module.tags.some((tag) => selectedTags.includes(tag));
    return matchesText && matchesTags;
  };

  const filteredMath = mathModules.filter(matchesModule);
  const filteredPhysics = physicsModules.filter(matchesModule);
  const filteredChemistry = chemistryModules.filter(matchesModule);
  const filteredAdvanced = advancedModules.filter(matchesModule);

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
