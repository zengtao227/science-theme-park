"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Box } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { clsx } from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";

type Mg12T = typeof translations.EN.mg12;

type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";
type Stage = "FLAECHE" | "VOLUMEN" | "KOMPLEX" | "MISSION";

type Slot = {
    id: string;
    labelLatex: string;
    placeholder: string;
    expected: number;
    tolerance?: number;
};

type Quest = {
    id: string;
    difficulty: Difficulty;
    stage: Stage;
    promptLatex: string;
    descriptionLatex: string;
    slots: Slot[];
    correctLatex: string;
    hintLatex?: string[];
    visualType: "TRAPEZ" | "PRISMA" | "CYLINDER" | "CUBE";
    cube?: { size: number; diagonalVertices: [number, number] };
};

function parseValue(s: string, locale: "DE" | "EN" | "CN") {
    const raw = s.trim();
    if (!raw) return null;
    const normalized = locale === "DE" ? raw.replace(/,/g, ".") : raw;
    const v = Number(normalized);
    return Number.isFinite(v) ? v : null;
}

function stageLabel(t: Mg12T, stage: Stage) {
    if (stage === "FLAECHE") return t.stages.areas;
    if (stage === "VOLUMEN") return t.stages.volumes;
    if (stage === "MISSION") return t.mission?.title ?? "MISSION";
    return t.stages.complex;
}

function buildStagePool(t: Mg12T, difficulty: Difficulty, stage: Stage): Quest[] {
    if (stage === "FLAECHE") {
        const all: Quest[] = [
            {
                id: "A1",
                difficulty,
                stage,
                promptLatex: t.stages.areas_prompt_latex,
                descriptionLatex: `\\text{Parallelogramm: } a=12cm, h_a=5cm`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "Area", expected: 60 }],
                correctLatex: `60cm^2`,
                hintLatex: [`A = a \\cdot h_a`],
                visualType: "TRAPEZ",
            },
            {
                id: "A2",
                difficulty,
                stage,
                promptLatex: t.stages.areas_prompt_latex,
                descriptionLatex: `\\text{Trapez: } a=10cm, c=6cm, h=4cm`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "Area", expected: 32 }],
                correctLatex: `32cm^2`,
                hintLatex: [`A = \\frac{a+c}{2} \\cdot h`],
                visualType: "TRAPEZ",
            }
        ];
        return all;
    }

    if (stage === "VOLUMEN") {
        const all: Quest[] = [
            {
                id: "V1",
                difficulty,
                stage,
                promptLatex: t.stages.volumes_prompt_latex,
                descriptionLatex: `\\text{Prisma (Grundfläche } G=24cm^2, h=10cm)`,
                slots: [{ id: "V", labelLatex: `V`, placeholder: "Volume", expected: 240 }],
                correctLatex: `240cm^3`,
                hintLatex: [`V = G \\cdot h`],
                visualType: "PRISMA",
            },
            {
                id: "V2",
                difficulty,
                stage,
                promptLatex: t.stages.volumes_prompt_latex,
                descriptionLatex: `\\text{Würfel: } s=4cm`,
                slots: [
                    { id: "S", labelLatex: `O`, placeholder: "Surface", expected: 96 },
                    { id: "V", labelLatex: `V`, placeholder: "Volume", expected: 64 }
                ],
                correctLatex: `O=96cm^2, V=64cm^3`,
                hintLatex: [`V = s^3`, `O = 6s^2`],
                visualType: "PRISMA",
            }
        ];
        return all;
    }

    if (stage === "MISSION") {
        const all: Quest[] = [
            {
                id: "M1",
                difficulty,
                stage,
                promptLatex: `\\text{${t.mission?.protocol}}\\\\\\text{${t.mission?.title}}\\\\\\text{${t.mission?.description}}`,
                descriptionLatex: `\\text{Rhein-Floodgate: } a=8m,\\; c=14m,\\; h=4m`,
                slots: [{ id: "A", labelLatex: `A`, placeholder: "Area", expected: 44 }],
                correctLatex: `44m^2`,
                hintLatex: [`A=\\frac{a+c}{2}\\cdot h`],
                visualType: "TRAPEZ",
            },
            {
                id: "M2",
                difficulty,
                stage,
                promptLatex: `\\text{${t.mission?.protocol}}\\\\\\text{${t.mission?.cube_title}}\\\\\\text{${t.mission?.cube_desc}}`,
                descriptionLatex: `\\text{Cube: } s=6cm`,
                slots: [{ id: "d", labelLatex: `d`, placeholder: "Diagonal", expected: 6 * Math.sqrt(3), tolerance: 0.02 }],
                correctLatex: `d=6\\sqrt{3}cm`,
                hintLatex: [`d=\\sqrt{s^2+s^2+s^2}`],
                visualType: "CUBE",
                cube: { size: 6, diagonalVertices: [0, 6] },
            },
        ];
        return all;
    }

    return [];
}

function CubeVisual({
    size,
    selectedVertices,
    onSelect,
    diagonalVertices,
}: {
    size: number;
    selectedVertices: number[];
    onSelect: (next: number[] | ((prev: number[]) => number[])) => void;
    diagonalVertices?: [number, number];
}) {
    const vertices = useMemo(() => {
        const s = size / 2;
        return [
            new THREE.Vector3(-s, -s, -s),
            new THREE.Vector3(s, -s, -s),
            new THREE.Vector3(s, s, -s),
            new THREE.Vector3(-s, s, -s),
            new THREE.Vector3(-s, -s, s),
            new THREE.Vector3(s, -s, s),
            new THREE.Vector3(s, s, s),
            new THREE.Vector3(-s, s, s),
        ];
    }, [size]);

    const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
    ];

    const [hoveredVertex, setHoveredVertex] = useState<number | null>(null);
    const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
    const selectedLine = selectedVertices.length === 2 ? selectedVertices : null;
    const isCorrectDiagonal =
        diagonalVertices &&
        selectedLine &&
        selectedLine.includes(diagonalVertices[0]) &&
        selectedLine.includes(diagonalVertices[1]);

    return (
        <div className="w-full h-[320px] border border-white/10 rounded-2xl overflow-hidden bg-black/60">
            <Canvas camera={{ position: [5, 5, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[6, 6, 6]} intensity={1.2} />
                <OrbitControls enablePan={false} />
                {edges.map(([a, b], idx) => (
                    <Line
                        key={`${a}-${b}`}
                        points={[vertices[a], vertices[b]]}
                        color={hoveredEdge === idx ? "#39ff14" : "rgba(255,255,255,0.35)"}
                        lineWidth={hoveredEdge === idx ? 2.2 : 1.2}
                        onPointerOver={() => setHoveredEdge(idx)}
                        onPointerOut={() => setHoveredEdge(null)}
                    />
                ))}
                {selectedLine && (
                    <Line
                        points={[vertices[selectedLine[0]], vertices[selectedLine[1]]]}
                        color={isCorrectDiagonal ? "#39ff14" : "#00d2ff"}
                        lineWidth={3}
                    />
                )}
                {vertices.map((v, idx) => (
                    <mesh
                        key={`v-${idx}`}
                        position={v}
                        onPointerOver={() => setHoveredVertex(idx)}
                        onPointerOut={() => setHoveredVertex(null)}
                        onClick={() =>
                            onSelect((prev) => {
                                if (prev.length === 0) return [idx];
                                if (prev.length === 1) {
                                    if (prev[0] === idx) return [];
                                    return [prev[0], idx];
                                }
                                return [idx];
                            })
                        }
                    >
                        <sphereGeometry args={[0.12, 24, 24]} />
                        <meshStandardMaterial
                            color={selectedVertices.includes(idx) ? "#39ff14" : "#ffffff"}
                            emissive={hoveredVertex === idx ? "#39ff14" : "#0aa"}
                            emissiveIntensity={hoveredVertex === idx ? 1.2 : 0.3}
                        />
                    </mesh>
                ))}
            </Canvas>
        </div>
    );
}

export default function MG12Page() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = translations[currentLanguage].mg12;

    const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
    const [stage, setStage] = useState<Stage>("FLAECHE");
    const [nonce, setNonce] = useState(0);

    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [lastCheck, setLastCheck] = useState<null | { ok: boolean; correct: string }>(null);
    const [selectedVertices, setSelectedVertices] = useState<number[]>([]);

    const locale = currentLanguage === "DE" ? "DE" : currentLanguage === "CN" ? "CN" : "EN";

    const pool = useMemo(() => buildStagePool(t, difficulty, stage), [difficulty, stage, t]);
    const currentQuest = useMemo(() => {
        const sorted = [...pool].sort((a, b) => a.id.localeCompare(b.id));
        return sorted[nonce % Math.max(1, sorted.length)];
    }, [nonce, pool]);

    const clearInputs = () => {
        setInputs({});
        setLastCheck(null);
        setSelectedVertices([]);
    };

    const next = () => {
        clearInputs();
        setNonce((v) => v + 1);
    };

    const verify = () => {
        if (currentQuest.visualType === "CUBE" && currentQuest.cube?.diagonalVertices) {
            const [a, b] = currentQuest.cube.diagonalVertices;
            const diagonalOk = selectedVertices.length === 2 && selectedVertices.includes(a) && selectedVertices.includes(b);
            if (!diagonalOk) {
                setLastCheck({ ok: false, correct: currentQuest.correctLatex });
                return;
            }
        }
        for (const slot of currentQuest.slots) {
            const raw = inputs[slot.id] ?? "";
            const v = parseValue(raw, locale);
            const tolerance = slot.tolerance ?? 1e-6;
            if (v === null || Math.abs(v - slot.expected) > tolerance) {
                setLastCheck({ ok: false, correct: currentQuest.correctLatex });
                return;
            }
        }
        setLastCheck({ ok: true, correct: currentQuest.correctLatex });
    };

    return (
        <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
            <header className="relative p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl h-20">
                <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black tracking-[0.2em] uppercase">{t.back}</span>
                </Link>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-lg font-black tracking-[0.35em] uppercase text-white shadow-neon text-nowrap">
                        {t.title}
                    </div>
                </div>

                <div className="flex items-center gap-6 z-10">
                    <div className="hidden md:flex items-center gap-1">
                        {([
                            { id: "BASIC", label: t.difficulty.basic },
                            { id: "CORE", label: t.difficulty.core },
                            { id: "ADVANCED", label: t.difficulty.advanced },
                            { id: "ELITE", label: t.difficulty.elite },
                        ] as const).map((d) => (
                            <button
                                key={d.id}
                                onClick={() => {
                                    setDifficulty(d.id);
                                    setNonce(0);
                                    clearInputs();
                                }}
                                className={clsx(
                                    "px-2 py-1 text-[9px] font-black tracking-[0.2em] uppercase transition-all border",
                                    difficulty === d.id
                                        ? "border-white bg-white text-black"
                                        : "border-white/30 text-white hover:border-white/50"
                                )}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                    <div className="w-px h-4 bg-white/20 hidden md:block" />
                    <div className="flex items-center gap-2">
                        {(['DE', 'EN', 'CN'] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={clsx(
                                    "text-[10px] font-black w-6 h-6 flex items-center justify-center rounded transition-all border",
                                    currentLanguage === lang
                                        ? "bg-white text-black border-white"
                                        : "text-white border-white/30 hover:border-white/50"
                                )}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="flex justify-center gap-2">
                            {([
                                { id: "FLAECHE", label: stageLabel(t, "FLAECHE") },
                                { id: "VOLUMEN", label: stageLabel(t, "VOLUMEN") },
                                { id: "MISSION", label: stageLabel(t, "MISSION") },
                            ] as const).map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => {
                                        setStage(s.id);
                                        setNonce(0);
                                        clearInputs();
                                    }}
                                    className={clsx(
                                        "px-4 py-2 border-2 text-[10px] font-black tracking-[0.35em] uppercase transition-all",
                                        stage === s.id ? "border-white bg-white text-black" : "border-white/30 text-white"
                                    )}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        <div className="text-center">
                            <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
                            <p className="text-2xl text-white font-black whitespace-pre-wrap italic">
                                <InlineMath math={currentQuest.promptLatex} />
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative w-full max-w-lg shadow-2xl space-y-6">
                                <div className="text-white font-black text-3xl">
                                    <InlineMath math={currentQuest.descriptionLatex} />
                                </div>

                                {currentQuest.visualType === "CUBE" && currentQuest.cube ? (
                                    <CubeVisual
                                        size={currentQuest.cube.size}
                                        selectedVertices={selectedVertices}
                                        onSelect={setSelectedVertices}
                                        diagonalVertices={currentQuest.cube.diagonalVertices}
                                    />
                                ) : (
                                    <div className="aspect-square w-48 mx-auto flex items-center justify-center border border-white/10 rounded-lg">
                                        {currentQuest.visualType === "PRISMA" ? (
                                            <Box className="w-24 h-24 text-white/20 animate-pulse" />
                                        ) : (
                                            <div className="w-24 h-16 border-2 border-white/20 bg-white/5 skew-x-12" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-xl mx-auto w-full">
                            <div className="space-y-6">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">{t.labels.input}</div>
                                <div className="grid gap-4 grid-cols-1">
                                    {currentQuest.slots.map((slot) => (
                                        <div key={slot.id} className="space-y-2">
                                            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                                                <InlineMath math={slot.labelLatex} />
                                            </div>
                                            <input
                                                value={inputs[slot.id] ?? ""}
                                                onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                                                className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-2xl text-white"
                                                placeholder={slot.placeholder}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={verify} className="flex-1 py-4 border-2 border-white text-xs font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                                        {t.check}
                                    </button>
                                    <button onClick={next} className="flex-1 py-4 border-2 border-white/30 text-xs font-black tracking-widest uppercase hover:border-white transition-all">
                                        {t.next}
                                    </button>
                                </div>

                                {lastCheck && (
                                    <div className={clsx("text-center font-black text-sm tracking-widest uppercase py-3 rounded", lastCheck.ok ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10")}>
                                        {lastCheck.ok ? t.correct : `${t.incorrect}: ${lastCheck.correct}`}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
