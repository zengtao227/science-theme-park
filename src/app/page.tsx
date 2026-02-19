"use client";

import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useLanguage } from '@/lib/i18n';
import EntryProtocol from '@/components/EntryProtocol';
import ModuleCard from '@/components/ui/ModuleCard';
import MasteryRadar from '@/components/ui/MasteryRadar';
import AchievementVault from '@/components/ui/AchievementVault';
import ModuleFilter from '@/components/ui/ModuleFilter';
import { clsx } from 'clsx';
import { Gamepad2, Atom, FlaskConical, Sigma, Medal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import UserSwitcher from '@/components/UserSwitcher';
import UserSetup from '@/components/UserSetup';

export default function Home() {
  const { hasAcceptedProtocol, currentLanguage, setLanguage, getModuleProgress, getSectorProgress, history, currentUser } = useAppStore();
  const { t } = useLanguage();
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
    { code: "SM1.01", title: t("home.sm1_01_title"), desc: t("home.sm1_01_subtitle"), color: "neon-purple", href: "/chamber/sm1-01", tags: ["math"] },
    { code: "SM1.02", title: t("home.sm1_02_title"), desc: t("home.sm1_02_subtitle"), color: "neon-purple", href: "/chamber/sm1-02", tags: ["math"] },
    { code: "SM1.03", title: t("home.sm1_03_title"), desc: t("home.sm1_03_subtitle"), color: "neon-cyan", href: "/chamber/sm1-03", tags: ["math"] },
    { code: "SM1.04", title: t("home.sm1_04_title"), desc: t("home.sm1_04_subtitle"), color: "neon-green", href: "/chamber/sm1-04", tags: ["math"] },
    { code: "SM1.05", title: t("home.sm1_05_title"), desc: t("home.sm1_05_subtitle"), color: "neon-cyan", href: "/chamber/sm1-05", tags: ["math"] },
    { code: "SM2.01", title: t("home.sm2_01_title"), desc: t("home.sm2_01_subtitle"), color: "neon-green", href: "/chamber/sm2-01", tags: ["math"] },
    { code: "SM2.02", title: t("home.sm2_02_title"), desc: t("home.sm2_02_subtitle"), color: "neon-cyan", href: "/chamber/sm2-02", tags: ["math"] },
    { code: "SM2.03", title: t("home.sm2_03_title"), desc: t("home.sm2_03_subtitle"), color: "neon-green", href: "/chamber/sm2-03", tags: ["math"] },
    { code: "SM2.04", title: t("home.sm2_04_title"), desc: t("home.sm2_04_subtitle"), color: "neon-cyan", href: "/chamber/sm2-04", tags: ["math"] },
    { code: "SM2.05", title: t("home.sm2_05_title"), desc: t("home.sm2_05_subtitle"), color: "neon-cyan", href: "/chamber/sm2-05", tags: ["math"] },
    { code: "SM2.06", title: t("home.sm2_06_title"), desc: t("home.sm2_06_subtitle"), color: "neon-cyan", href: "/chamber/sm2-06", tags: ["math"] },
    { code: "SM2.07", title: t("home.sm2_07_title"), desc: t("home.sm2_07_subtitle"), color: "neon-green", href: "/chamber/sm2-07", tags: ["math"] },
    { code: "SM2.08", title: t("home.sm2_08_title"), desc: t("home.sm2_08_subtitle"), color: "neon-purple", href: "/chamber/sm2-08", tags: ["math"] },
    { code: "SM2.10", title: t("home.sm2_10_title"), desc: t("home.sm2_10_subtitle"), color: "neon-cyan", href: "/chamber/sm2-10", tags: ["math"] },
    { code: "SM2.11", title: t("home.sm2_11_title"), desc: t("home.sm2_11_subtitle"), color: "neon-green", href: "/chamber/sm2-11", tags: ["math"] },
    { code: "SM2.12", title: t("home.sm2_12_title"), desc: t("home.sm2_12_subtitle"), color: "neon-purple", href: "/chamber/sm2-12", tags: ["math"] },
    { code: "SM3.01", title: t("home.sm3_01_title"), desc: t("home.sm3_01_subtitle"), color: "neon-purple", href: "/chamber/sm3-01", tags: ["math"] },
    { code: "SM3.02", title: t("home.sm3_02_title"), desc: t("home.sm3_02_subtitle"), color: "neon-cyan", href: "/chamber/sm3-02", tags: ["math"] },
    { code: "SM3.03", title: t("home.sm3_03_title"), desc: t("home.sm3_03_subtitle"), color: "neon-amber", href: "/chamber/sm3-03", tags: ["math", "biology"] },
    { code: "SM3.04", title: t("home.sm3_04_title"), desc: t("home.sm3_04_subtitle"), color: "neon-amber", href: "/chamber/sm3-04", tags: ["math"] },
    { code: "SM3.05", title: t("home.sm3_05_title"), desc: t("home.sm3_05_subtitle"), color: "neon-cyan", href: "/chamber/sm3-05", tags: ["math"] },
    { code: "GM1.01", title: t("home.gm1_01_title"), desc: t("home.gm1_01_subtitle"), color: "neon-purple", href: "/chamber/gm1-01", tags: ["math"] },
    { code: "GM1.01-ADV", title: t("home.gm1_01_title") + " Advanced", desc: "Advanced calculus with optimization and curve sketching", color: "neon-purple", href: "/chamber/gm1-01-advanced", tags: ["math"] },
    { code: "GM1.02", title: t("home.gm1_02_title"), desc: t("home.gm1_02_subtitle"), color: "neon-green", href: "/chamber/gm1-02", tags: ["math"] },
    { code: "GM2.01", title: t("home.gm2_01_title"), desc: t("home.gm2_01_subtitle"), color: "neon-cyan", href: "/chamber/gm2-01", tags: ["math"] },
    { code: "GM2.02", title: "GM2.02 // ANALYTICAL GEOMETRY", desc: "Lines, planes, and spatial relationships in 2D and 3D", color: "neon-green", href: "/chamber/gm2-02", tags: ["math"] },
    { code: "GM3.01", title: t("home.gm3_01_title"), desc: t("home.gm3_01_subtitle"), color: "neon-purple", href: "/chamber/gm3-01", tags: ["math"] },
    { code: "GM4.01", title: t("home.gm4_01_title"), desc: t("home.gm4_01_subtitle"), color: "neon-purple", href: "/chamber/gm4-01", tags: ["math"] },
  ]), [t]);

  const physicsModules = useMemo(() => ([
    { code: "SP1.02", title: t("home.sp1_02_title"), desc: t("home.sp1_02_subtitle"), color: "neon-cyan", href: "/chamber/sp1-02", tags: ["physics"] },
    { code: "SP3.01", title: t("home.sp3_01_title"), desc: t("home.sp3_01_subtitle"), color: "neon-green", href: "/chamber/sp3-01", tags: ["physics"] },
    { code: "SP3.02", title: t("home.sp3_02_title"), desc: t("home.sp3_02_subtitle"), color: "neon-cyan", href: "/chamber/sp3-02", tags: ["physics"] },
    { code: "SP3.03", title: t("home.sp3_03_title"), desc: t("home.sp3_03_subtitle"), color: "neon-amber", href: "/chamber/sp3-03", tags: ["physics"] },
    { code: "SP3.04", title: t("home.sp3_04_title"), desc: t("home.sp3_04_subtitle"), color: "neon-cyan", href: "/chamber/sp3-04", tags: ["physics"] },
    { code: "SP3.05", title: t("home.sp3_05_title"), desc: t("home.sp3_05_subtitle"), color: "neon-amber", href: "/chamber/sp3-05", tags: ["physics"] },
    { code: "SP3.06", title: t("home.sp3_06_title"), desc: t("home.sp3_06_subtitle"), color: "neon-green", href: "/chamber/sp3-06", tags: ["physics"] },
    { code: "SP3.07", title: t("home.sp3_07_title"), desc: t("home.sp3_07_subtitle"), color: "neon-cyan", href: "/chamber/sp3-07", tags: ["physics"] },
    { code: "SP3.08", title: t("home.sp3_08_title"), desc: t("home.sp3_08_subtitle"), color: "neon-purple", href: "/chamber/sp3-08", tags: ["physics"] },
    { code: "GP2.01", title: t("home.gp2_01_title"), desc: t("home.gp2_01_subtitle"), color: "neon-amber", href: "/chamber/gp2-01", tags: ["physics"] },
    { code: "GP2.02", title: t("home.gp2_02_title"), desc: t("home.gp2_02_subtitle"), color: "neon-green", href: "/chamber/gp2-02", tags: ["physics"] },
    { code: "GP3.01", title: t("home.gp3_01_title"), desc: t("home.gp3_01_subtitle"), color: "neon-cyan", href: "/chamber/gp3-01", tags: ["physics"] },
    { code: "GP1.01", title: t("home.gp1_01_title"), desc: t("home.gp1_01_subtitle"), color: "neon-cyan", href: "/chamber/gp1-01", tags: ["physics"] },
    { code: "GP1.02", title: t("home.gp1_02_title"), desc: t("home.gp1_02_subtitle"), color: "neon-purple", href: "/chamber/gp1-02", tags: ["physics"] },
    { code: "GP1.03", title: t("home.gp1_03_title"), desc: t("home.gp1_03_subtitle"), color: "neon-amber", href: "/chamber/gp1-03", tags: ["physics"] },
    { code: "GP1.04", title: t("home.gp1_04_title"), desc: t("home.gp1_04_subtitle"), color: "neon-purple", href: "/chamber/gp1-04", tags: ["physics"] },
  ]), [t]);

  const chemistryModules = useMemo(() => ([
    { code: "SC1.01", title: t("home.sc1_01_title"), desc: t("home.sc1_01_subtitle"), color: "neon-purple", href: "/chamber/sc1-01", tags: ["chemistry"] },
    { code: "SC1.02", title: t("home.sc1_02_title"), desc: t("home.sc1_02_subtitle"), color: "neon-purple", href: "/chamber/sc1-02", tags: ["chemistry"] },
    { code: "SC1.03", title: t("home.sc1_03_title") || "SC1.03 // ATOMS FORGE", desc: t("home.sc1_03_subtitle") || "Build isotopes and understand atomic orbitals in 3D.", color: "neon-purple", href: "/chamber/sc1-03", tags: ["chemistry"] },
    { code: "SC1.04", title: t("home.sc1_04_title"), desc: t("home.sc1_04_subtitle"), color: "neon-cyan", href: "/chamber/sc1-04", tags: ["chemistry"] },
    { code: "SC1.05", title: t("home.sc1_05_title"), desc: t("home.sc1_05_subtitle"), color: "neon-purple", href: "/chamber/sc1-05", tags: ["chemistry"] },
    { code: "SC2.01", title: t("home.sc2_01_title"), desc: t("home.sc2_01_subtitle"), color: "neon-cyan", href: "/chamber/sc2-01", tags: ["chemistry"] },
    { code: "SC2.02", title: t("home.sc2_02_title"), desc: t("home.sc2_02_subtitle"), color: "neon-amber", href: "/chamber/sc2-02", tags: ["chemistry"] },
    { code: "SC2.03", title: t("home.sc2_03_title"), desc: t("home.sc2_03_subtitle"), color: "neon-green", href: "/chamber/sc2-03", tags: ["chemistry"] },
    { code: "SC2.04", title: t("home.sc2_04_title"), desc: t("home.sc2_04_subtitle"), color: "neon-cyan", href: "/chamber/sc2-04", tags: ["chemistry"] },
    { code: "SC2.05", title: t("home.sc2_05_title"), desc: t("home.sc2_05_subtitle"), color: "neon-purple", href: "/chamber/sc2-05", tags: ["chemistry"] },
    { code: "SC2.06", title: t("home.sc2_06_title"), desc: t("home.sc2_06_subtitle"), color: "neon-amber", href: "/chamber/sc2-06", tags: ["chemistry"] },
    { code: "SC3.01", title: t("home.sc3_01_title"), desc: t("home.sc3_01_subtitle"), color: "neon-purple", href: "/chamber/sc3-01", tags: ["chemistry"] },
    { code: "SC3.02", title: t("home.sc3_02_title"), desc: t("home.sc3_02_subtitle"), color: "neon-purple", href: "/chamber/sc3-02", tags: ["chemistry"] },
    { code: "SC3.03", title: t("home.sc3_03_title"), desc: t("home.sc3_03_subtitle"), color: "neon-purple", href: "/chamber/sc3-03", tags: ["chemistry"] },
    { code: "SC3.04", title: t("home.sc3_04_title"), desc: t("home.sc3_04_subtitle"), color: "neon-purple", href: "/chamber/sc3-04", tags: ["chemistry"] },
    { code: "SC3.05", title: t("home.sc3_05_title"), desc: t("home.sc3_05_subtitle"), color: "neon-green", href: "/chamber/sc3-05", tags: ["chemistry"] },
    { code: "GC1.01", title: t("home.gc1_01_title"), desc: t("home.gc1_01_subtitle"), color: "neon-amber", href: "/chamber/gc1-01", tags: ["chemistry"] },
    { code: "GC1.02", title: t("home.gc1_02_title"), desc: t("home.gc1_02_subtitle"), color: "neon-amber", href: "/chamber/gc1-02", tags: ["chemistry"] },
    { code: "GC2.01", title: t("home.gc2_01_title"), desc: t("home.gc2_01_subtitle"), color: "neon-green", href: "/chamber/gc2-01", tags: ["chemistry"] },
    { code: "GC3.01", title: t("home.gc3_01_title"), desc: t("home.gc3_01_subtitle"), color: "neon-green", href: "/chamber/gc3-01", tags: ["chemistry"] },
    { code: "GC3.02", title: t("home.gc3_02_title"), desc: t("home.gc3_02_subtitle"), color: "neon-purple", href: "/chamber/gc3-02", tags: ["chemistry"] },
  ]), [t]);

  const enrichmentModules = useMemo(() => ([
    { code: "EM1.01", title: t("home.em1_01_title"), desc: t("home.em1_01_subtitle") + " (Advanced Geometry)", color: "neon-purple", href: "/chamber/em1-01", tags: ["math", "enrichment", "advanced"] },
    { code: "EM2.01", title: t("home.em2_01_title"), desc: t("home.em2_01_subtitle") + " (Matura Preparation)", color: "neon-amber", href: "/chamber/em2-01", tags: ["math", "enrichment", "advanced"] },
  ]), [t]);

  const biologyModules = useMemo(() => ([
    { code: "SB1.01", title: t("home.sb1_01_title"), desc: t("home.sb1_01_subtitle"), color: "neon-green", href: "/chamber/sb1-01", tags: ["biology"] },
    { code: "SB1.01-M", title: t("home.sb1_01_met_title"), desc: t("home.sb1_01_met_subtitle"), color: "neon-amber", href: "/chamber/sb1-01-metabolic", tags: ["biology"] },
    { code: "SB1.02", title: t("home.sb1_02_title"), desc: t("home.sb1_02_subtitle"), color: "neon-green", href: "/chamber/sb1-02", tags: ["biology"] },
    { code: "SB1.03", title: t("home.sb1_03_title"), desc: t("home.sb1_03_subtitle"), color: "neon-cyan", href: "/chamber/sb1-03", tags: ["biology"] },
    { code: "SB2.01", title: t("home.sb2_01_title"), desc: t("home.sb2_01_subtitle"), color: "neon-purple", href: "/chamber/sb2-01-tissues", tags: ["biology"] },
    { code: "SB2.02", title: t("home.sb2_02_title"), desc: t("home.sb2_02_subtitle"), color: "neon-cyan", href: "/chamber/sb2-02-body-systems", tags: ["biology"] },
    { code: "SB2.03", title: t("home.sb2_03_title"), desc: t("home.sb2_03_subtitle"), color: "neon-purple", href: "/chamber/sb2-03", tags: ["biology"] },
    { code: "GB2.01", title: t("home.gb2_01_title"), desc: t("home.gb2_01_subtitle"), color: "neon-purple", href: "/chamber/gb2-01", tags: ["biology"] },
    { code: "SB3.01", title: t("home.sb3_01_title"), desc: t("home.sb3_01_subtitle"), color: "neon-green", href: "/chamber/sb3-01", tags: ["biology"] },
    { code: "GB1.01", title: t("home.gb1_01_title"), desc: t("home.gb1_01_subtitle"), color: "neon-purple", href: "/chamber/gb1-01", tags: ["biology"] },
    { code: "GB3.01", title: t("home.gb3_01_title"), desc: t("home.gb3_01_subtitle"), color: "neon-cyan", href: "/chamber/gb3-01", tags: ["biology"] },
    { code: "GB3.02", title: t("home.gb3_02_title"), desc: t("home.gb3_02_subtitle"), color: "neon-amber", href: "/chamber/gb3-02", tags: ["biology"] },
  ]), [t]);

  const filterTags = useMemo(() => ([
    { id: "physics", label: t("home.filter_tags.physics") },
    { id: "math", label: t("home.filter_tags.math") },
    { id: "chemistry", label: t("home.filter_tags.chemistry") },
    { id: "biology", label: t("home.filter_tags.biology") },
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
  const filteredBiology = biologyModules.filter(matchesModule);
  const filteredEnrichment = enrichmentModules.filter(matchesModule);

  const totalFiltered = filteredMath.length + filteredPhysics.length + filteredChemistry.length + filteredBiology.length + filteredEnrichment.length;

  if (!hasAcceptedProtocol) {
    return <EntryProtocol />;
  }

  // Show user setup if no user is selected
  if (!currentUser) {
    return <UserSetup />;
  }

  return (
    <main className="h-screen overflow-y-auto bg-black text-white selection:bg-neon-green/30 pb-20">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 scanline opacity-20" />

      {/* HUD Header */}
      <header className="sticky top-0 left-0 w-full p-6 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm border border-neon-green flex items-center justify-center animate-pulse">
              <Gamepad2 className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter neon-text-green">{t("home.title")}</h1>
              <div className="flex gap-4 text-[10px] text-neutral-300 font-mono tracking-widest leading-none mt-1 uppercase">
                <span>SYS.ONLINE</span>
                <span className="text-neon-green">●</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-4 bg-black/50 border border-white/10 px-4 py-2 rounded-sm">
              <UserSwitcher />
              <button
                onClick={() => setVaultOpen(true)}
                className="min-h-[44px] flex items-center gap-2 px-3 py-2 text-[10px] font-black tracking-[0.3em] uppercase border border-neon-cyan/40 text-neon-cyan bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-all shadow-[0_0_18px_var(--color-neon-cyan)]"
              >
                <Medal className="w-4 h-4" />
                {t("common.achievements_title")}
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
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto pt-6 px-6">

        <div className="mb-4 flex items-start justify-between gap-8 relative">
          <div className="border-l-2 border-neon-green pl-6 py-2 flex-1 z-10">
            <h2 className="text-5xl font-black tracking-tighter mb-2 max-w-2xl leading-[0.9]">
              {t("home.subtitle")}
            </h2>
            <p className="text-white/50 font-mono text-sm tracking-widest uppercase">
              Interactive STEM Simulations // V2.2 (Scenario Update)
            </p>
          </div>

          {/* STEM Mastery Radar - Side by side with title */}
          <div className="flex-shrink-0 -mt-6 relative z-0">
            <MasteryRadar
              conceptual={masteryMetrics.conceptual}
              speed={masteryMetrics.speed}
              rigor={masteryMetrics.rigor}
              decay={masteryMetrics.decay}
              labels={{
                title: t("common.mastery_title"),
                conceptual: t("common.mastery_conceptual"),
                speed: t("common.mastery_speed"),
                rigor: t("common.mastery_rigor"),
                decay: t("common.mastery_decay"),
              }}
            />
          </div>
        </div>

        <div className="mb-8">
          <ModuleFilter
            label={t("home.search_label")}
            query={query}
            placeholder={t("home.search_placeholder")}
            tagsLabel={t("home.filter_tags_label")}
            tags={filterTags}
            selectedTags={selectedTags}
            onQueryChange={setQuery}
            onToggleTag={toggleTag}
            onClear={() => {
              setQuery('');
              setSelectedTags([]);
            }}
            clearLabel={t("home.filter_clear")}
          />
          {totalFiltered === 0 && (
            <div className="mt-6 border border-white/10 bg-white/[0.02] rounded-xl px-5 py-4 text-xs font-mono text-white/60">
              {t("home.filter_empty")}
            </div>
          )}
        </div>

        <div className="space-y-20">{filteredMath.length > 0 && (
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
                    actionLabel={t("home.initiate_simulation")}
                    completedLabel={t("home.completed_badge")}
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
                      actionLabel={t("home.initiate_simulation")}
                      completedLabel={t("home.completed_badge")}
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
                      actionLabel={t("home.initiate_simulation")}
                      completedLabel={t("home.completed_badge")}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Sector>
          )}

          {filteredEnrichment.length > 0 && (
            <Sector
              title="ENRICHMENT & ADVANCED TOPICS"
              color="neon-purple"
              progress={0}
              icon={<Sigma className="w-5 h-5 shadow-[0_0_10px_currentColor]" />}
              tagIcon="⭐"
            >
              <AnimatePresence mode="popLayout">
                {filteredEnrichment.map((module) => (
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
                      actionLabel={t("home.initiate_simulation")}
                      completedLabel={t("home.completed_badge")}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Sector>
          )}

          {filteredBiology.length > 0 && (
            <Sector
              title="BIOLOGY SECTOR"
              color="neon-green"
              progress={0}
              icon={<Atom className="w-5 h-5 shadow-[0_0_10px_currentColor]" />}
              tagIcon="🧬"
            >
              <AnimatePresence mode="popLayout">
                {filteredBiology.map((module) => (
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
                      actionLabel={t("home.initiate_simulation")}
                      completedLabel={t("home.completed_badge")}
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
