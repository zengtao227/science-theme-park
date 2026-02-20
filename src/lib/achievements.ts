import { AchievementId, HistoryEntry, ModuleProgress } from "@/lib/store";

export interface AchievementDef {
    id: AchievementId;
    emoji: string;
    name: { EN: string; CN: string; DE: string };
    description: { EN: string; CN: string; DE: string };
    rarity: "common" | "rare" | "epic" | "legendary";
    color: string; // Tailwind / CSS color token
}

// Full achievement registry
export const ACHIEVEMENTS: AchievementDef[] = [
    {
        id: "first_launch",
        emoji: "🚀",
        name: { EN: "First Launch", CN: "初次启动", DE: "Erster Start" },
        description: { EN: "Submitted your first answer in the Nexus", CN: "第一次在Nexus中提交答案", DE: "Erste Antwort im Nexus eingereicht" },
        rarity: "common",
        color: "#00f2ff",
    },
    {
        id: "first_light",
        emoji: "💡",
        name: { EN: "First Light", CN: "初见光芒", DE: "Erstes Licht" },
        description: { EN: "Completed a Physics module for the first time", CN: "首次完成物理模块", DE: "Erstes Physikmodul abgeschlossen" },
        rarity: "common",
        color: "#ffd166",
    },
    {
        id: "mole_master",
        emoji: "⚗️",
        name: { EN: "Mole Master", CN: "摩尔大师", DE: "Mol-Meister" },
        description: { EN: "Perfected a Chemistry stoichiometry module", CN: "完美完成化学计量模块", DE: "Chemie-Stöchiometriemodul gemeistert" },
        rarity: "rare",
        color: "#06d6a0",
    },
    {
        id: "molecular_architect",
        emoji: "🧬",
        name: { EN: "Molecular Architect", CN: "分子建筑师", DE: "Molekular-Architekt" },
        description: { EN: "Built complex organic molecules in 3D", CN: "在3D中构建了复杂有机分子", DE: "Komplexe organische Moleküle in 3D gebaut" },
        rarity: "epic",
        color: "#a855f7",
    },
    {
        id: "time_traveler",
        emoji: "⏱️",
        name: { EN: "Time Traveler", CN: "时间旅行者", DE: "Zeitreisender" },
        description: { EN: "Mastered kinematics and motion analysis", CN: "精通运动学与运动分析", DE: "Kinematik und Bewegungsanalyse gemeistert" },
        rarity: "rare",
        color: "#ff6b6b",
    },
    {
        id: "calculus_god",
        emoji: "∞",
        name: { EN: "Calculus God", CN: "微积分之神", DE: "Kalkül-Gott" },
        description: { EN: "Conquered advanced calculus challenges", CN: "征服了高难度微积分挑战", DE: "Fortgeschrittene Kalkülaufgaben bezwungen" },
        rarity: "legendary",
        color: "#ff2d7d",
    },
];

// Compute aggregate stats from history
export function computeStats(history: HistoryEntry[], progress: ModuleProgress) {
    const totalAttempts = history.length;
    const uniqueModules = new Set(history.map((h) => h.moduleCode)).size;
    const correctAttempts = history.filter((h) => h.score >= 0.8).length;
    const accuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

    // Compute total study time (ms)
    const totalStudyMs = history.reduce((sum, h) => sum + (h.durationMs || 0), 0);

    // Best streak: consecutive correct answers
    let bestStreak = 0;
    let currentStreak = 0;
    for (const entry of [...history].reverse()) {
        if (entry.score >= 0.8) {
            currentStreak++;
            bestStreak = Math.max(bestStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    }

    // Per-domain progress
    const domains: Record<string, { code: string; attempts: number; correct: number; modules: Set<string> }> = {
        Math: { code: "SM/GM", attempts: 0, correct: 0, modules: new Set() },
        Physics: { code: "SP/GP", attempts: 0, correct: 0, modules: new Set() },
        Chemistry: { code: "SC/GC", attempts: 0, correct: 0, modules: new Set() },
        Biology: { code: "SB/GB", attempts: 0, correct: 0, modules: new Set() },
        Electro: { code: "EM", attempts: 0, correct: 0, modules: new Set() },
    };

    history.forEach((h) => {
        const prefix = h.moduleCode.substring(0, 2).toUpperCase();
        let domain: string;
        if (["SM", "GM"].includes(prefix)) domain = "Math";
        else if (["SP", "GP"].includes(prefix)) domain = "Physics";
        else if (["SC", "GC"].includes(prefix)) domain = "Chemistry";
        else if (["SB", "GB"].includes(prefix)) domain = "Biology";
        else if (["EM"].includes(prefix)) domain = "Electro";
        else return;

        domains[domain].attempts++;
        if (h.score >= 0.8) domains[domain].correct++;
        domains[domain].modules.add(h.moduleCode);
    });

    // Completed module count
    const completedModules = Object.values(progress).filter(
        (m) => Object.values(m.stages || {}).some(Boolean)
    ).length;

    return {
        totalAttempts,
        uniqueModules,
        accuracy,
        totalStudyMs,
        bestStreak,
        completedModules,
        domains,
    };
}

export function formatStudyTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${totalSeconds}s`;
}
