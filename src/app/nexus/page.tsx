"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { ACHIEVEMENTS, computeStats, formatStudyTime } from "@/lib/achievements";
import { clsx } from "clsx";
import { ArrowLeft, Zap, Target, Clock, TrendingUp, Award, BookOpen, Star } from "lucide-react";

const RARITY_STYLES = {
    common: { border: "border-cyan-500/40", glow: "shadow-[0_0_15px_rgba(0,242,255,0.15)]", badge: "bg-cyan-500/10 text-cyan-400" },
    rare: { border: "border-green-500/40", glow: "shadow-[0_0_15px_rgba(6,214,160,0.2)]", badge: "bg-green-500/10 text-green-400" },
    epic: { border: "border-purple-500/50", glow: "shadow-[0_0_20px_rgba(168,85,247,0.25)]", badge: "bg-purple-500/10 text-purple-400" },
    legendary: { border: "border-pink-500/60", glow: "shadow-[0_0_30px_rgba(255,45,125,0.3)]", badge: "bg-pink-500/10 text-pink-400" },
};

function AchievementCard({ def, unlocked, timestamp }: {
    def: typeof ACHIEVEMENTS[0];
    unlocked: boolean;
    timestamp?: number;
}) {
    const styles = RARITY_STYLES[def.rarity];
    const { currentLanguage } = useAppStore();
    const lang = currentLanguage as "EN" | "CN" | "DE";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "relative border rounded-2xl p-5 transition-all duration-300",
                unlocked ? [styles.border, styles.glow, "bg-black/60"] : "border-white/5 bg-white/[0.02] opacity-40 grayscale",
            )}
        >
            {/* Rarity badge */}
            <div className={clsx("absolute top-3 right-3 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded", styles.badge)}>
                {def.rarity}
            </div>

            <div className="flex items-start gap-4">
                <div
                    className={clsx("text-3xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0", unlocked ? "bg-white/5" : "bg-white/[0.02]")}
                    style={{ filter: unlocked ? `drop-shadow(0 0 8px ${def.color})` : undefined }}
                >
                    {unlocked ? def.emoji : "🔒"}
                </div>
                <div className="flex-1 min-w-0">
                    <div className={clsx("text-sm font-black tracking-[0.1em] uppercase mb-1", unlocked ? "text-white" : "text-white/40")}>
                        {def.name[lang]}
                    </div>
                    <div className="text-xs text-white/50 leading-relaxed">
                        {def.description[lang]}
                    </div>
                    {unlocked && timestamp && (
                        <div className="text-[9px] font-mono text-white/30 mt-2 uppercase tracking-widest">
                            Unlocked {new Date(timestamp).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function DomainRadar({ domains }: { domains: ReturnType<typeof computeStats>["domains"] }) {
    const entries = Object.entries(domains);
    const size = 200;
    const center = size / 2;
    const maxRadius = (size / 2) * 0.85;
    const numSides = entries.length;

    const points = entries.map((_, i) => {
        const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
        return { ax: Math.cos(angle), ay: Math.sin(angle) };
    });

    const getAccuracy = (d: typeof domains[string]) => d.attempts === 0 ? 0 : d.correct / d.attempts;

    const dataPoints = entries.map(([, d], i) => {
        const r = getAccuracy(d) * maxRadius;
        return {
            x: center + r * points[i].ax,
            y: center + r * points[i].ay,
        };
    });

    const bgPoints = entries.map((_, i) => ({
        x: center + maxRadius * points[i].ax,
        y: center + maxRadius * points[i].ay,
    }));

    const toPath = (pts: { x: number; y: number }[]) =>
        pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

    return (
        <svg width={size} height={size} className="mx-auto">
            {/* Grid rings */}
            {[0.25, 0.5, 0.75, 1].map((r) => (
                <polygon
                    key={r}
                    points={entries.map((_, i) => `${center + r * maxRadius * points[i].ax},${center + r * maxRadius * points[i].ay}`).join(" ")}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                />
            ))}

            {/* Axes */}
            {entries.map((_, i) => (
                <line key={i} x1={center} y1={center} x2={bgPoints[i].x} y2={bgPoints[i].y} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            ))}

            {/* Data polygon */}
            <path d={toPath(dataPoints)} fill="rgba(0,242,255,0.15)" stroke="#00f2ff" strokeWidth={2} />

            {/* Labels */}
            {entries.map(([name,], i) => {
                const labelR = maxRadius + 20;
                const lx = center + labelR * points[i].ax;
                const ly = center + labelR * points[i].ay;
                return (
                    <text
                        key={name}
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={9}
                        fontWeight="bold"
                        fill="rgba(255,255,255,0.6)"
                        fontFamily="monospace"
                    >
                        {name}
                    </text>
                );
            })}
        </svg>
    );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; label: string; value: string; color: string }) {
    return (
        <div className="border border-white/10 bg-white/[0.02] rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" style={{ color }} />
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">{label}</span>
            </div>
            <div className="text-2xl font-black text-white tracking-tight">{value}</div>
        </div>
    );
}

export default function NexusHubPage() {
    const { history, progress, achievements, currentLanguage } = useAppStore();
    const { t } = useLanguage();
    const lang = currentLanguage as "EN" | "CN" | "DE";

    const stats = useMemo(() => computeStats(history, progress), [history, progress]);

    const unlockedCount = Object.values(achievements).filter((a) => a.unlocked).length;
    const totalCount = ACHIEVEMENTS.length;

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl px-6 py-4 flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black tracking-[0.2em] uppercase">Nexus</span>
                </Link>
                <div className="flex-1 text-center">
                    <div className="text-xs font-black tracking-[0.5em] uppercase text-white/40">
                        ⬡ NEXUS HUB
                    </div>
                    <div className="text-xl font-black tracking-[0.2em] uppercase">Scientific Achievement Centre</div>
                </div>
                <div className="w-20" />
            </header>

            <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

                {/* ── HERO STATS ── */}
                <section>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        <StatCard icon={Zap} label="Attempts" value={String(stats.totalAttempts)} color="#00f2ff" />
                        <StatCard icon={Target} label="Accuracy" value={`${stats.accuracy.toFixed(0)}%`} color="#39ff14" />
                        <StatCard icon={BookOpen} label="Modules" value={String(stats.uniqueModules)} color="#ffd166" />
                        <StatCard icon={TrendingUp} label="Best Streak" value={String(stats.bestStreak)} color="#a855f7" />
                        <StatCard icon={Clock} label="Study Time" value={formatStudyTime(stats.totalStudyMs)} color="#ff6b6b" />
                        <StatCard icon={Award} label="Badges" value={`${unlockedCount}/${totalCount}`} color="#ff2d7d" />
                    </div>
                </section>

                {/* ── DOMAIN RADAR ── */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-6">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black mb-6">Domain Mastery Radar</div>
                        <DomainRadar domains={stats.domains} />
                    </div>

                    <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-6 flex flex-col gap-4">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black mb-2">Domain Breakdown</div>
                        {Object.entries(stats.domains).map(([name, d]) => {
                            const pct = d.attempts === 0 ? 0 : Math.round((d.correct / d.attempts) * 100);
                            return (
                                <div key={name} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-black text-white/80">{name}</span>
                                        <span className="text-white/50 font-mono">{d.modules.size} mod · {pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{ background: `linear-gradient(90deg, #00f2ff, #a855f7)` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── ACHIEVEMENTS ── */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">Achievement Vault</div>
                            <div className="text-lg font-black mt-1">{unlockedCount} / {totalCount} Unlocked</div>
                        </div>
                        <div className="flex gap-1">
                            {ACHIEVEMENTS.map((a) => (
                                <div
                                    key={a.id}
                                    className={clsx("w-2 h-6 rounded-full transition-all", achievements[a.id]?.unlocked ? "" : "bg-white/10")}
                                    style={achievements[a.id]?.unlocked ? { backgroundColor: a.color } : {}}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence>
                            {ACHIEVEMENTS.map((def) => (
                                <AchievementCard
                                    key={def.id}
                                    def={def}
                                    unlocked={achievements[def.id]?.unlocked ?? false}
                                    timestamp={achievements[def.id]?.timestamp}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* ── RECENT ACTIVITY ── */}
                {history.length > 0 && (
                    <section>
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black mb-4">Recent Activity</div>
                        <div className="border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden divide-y divide-white/5">
                            {history.slice(0, 8).map((entry) => (
                                <div key={entry.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.03] transition-colors">
                                    <div className={clsx("w-2 h-2 rounded-full flex-shrink-0", entry.score >= 0.8 ? "bg-green-400" : "bg-orange-400")} />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs font-black text-white/80 uppercase tracking-widest">{entry.moduleCode}</span>
                                        <span className="text-xs text-white/40 ml-3">{entry.stageLabel}</span>
                                    </div>
                                    <div className="text-xs font-mono text-white/40">{Math.round(entry.score * 100)}%</div>
                                    <div className="text-xs font-mono text-white/30">
                                        {new Date(entry.timestamp).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {history.length === 0 && (
                    <div className="text-center py-20 text-white/20">
                        <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <div className="text-sm font-black uppercase tracking-widest">No activity yet</div>
                        <div className="text-xs mt-2">Start solving quests to build your academic record</div>
                    </div>
                )}
            </div>
        </div>
    );
}
