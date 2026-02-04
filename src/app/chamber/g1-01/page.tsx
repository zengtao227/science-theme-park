"use client";

import { Canvas } from "@react-three/fiber";
import { Text, OrthographicCamera, Line, Grid } from "@react-three/drei";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { ArrowLeft, Eye, TrendingUp, Target, Gauge, Database, Zap } from 'lucide-react';
import { clsx } from "clsx";

// --- TYPES ---
type QuestMode = 'EXPLORE' | 'SLOPE' | 'TANGENT' | 'RATE' | 'ELITE';

interface SlopeQuest {
    type: 'SLOPE';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    correctSlope: number;
}

interface TangentQuest {
    type: 'TANGENT';
    x0: number;
    y0: number;
    correctSlope: number;
    func: 'x2' | '2x2' | '3x2' | 'x3';
}

interface RateQuest {
    type: 'RATE';
    t0: number;
    s_t0: number;
    correctVelocity: number;
    funcLabel: string;
}

interface EliteQuest {
    type: 'ELITE';
    targetSlope: number;
    correctX: number;
    func: 'x2' | '2x2';
}

type QuestData = SlopeQuest | TangentQuest | RateQuest | EliteQuest;

// --- 3D COMPONENTS ---
interface ParabolaProps {
    func: (x: number) => number;
    color: string;
    xRange?: [number, number];
}

function Parabola({ func, color, xRange = [-5, 5] }: ParabolaProps) {
    const points = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (let x = xRange[0]; x <= xRange[1]; x += 0.1) {
            pts.push(new THREE.Vector3(x, func(x), 0));
        }
        return pts;
    }, [func, xRange]);

    return <Line points={points} color={color} lineWidth={3} />;
}

interface TangentLineProps {
    x0: number;
    slope: number;
    func: (x: number) => number;
    color: string;
}

function TangentLine({ x0, slope, func, color }: TangentLineProps) {
    const y0 = func(x0);
    const points = useMemo(() => {
        const length = 4;
        return [
            new THREE.Vector3(x0 - length / 2, y0 - (slope * length) / 2, 0.1),
            new THREE.Vector3(x0 + length / 2, y0 + (slope * length) / 2, 0.1),
        ];
    }, [x0, y0, slope]);

    return <Line points={points} color={color} lineWidth={2} dashed dashScale={0.5} />;
}

interface DraggablePointProps {
    x: number;
    y: number;
    onDrag: (newX: number) => void;
    color: string;
    xRange: [number, number];
}

function DraggablePoint({ x, y, onDrag, color, xRange }: DraggablePointProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (e: { stopPropagation: () => void; pointerId: number; target: EventTarget | null }) => {
        e.stopPropagation();
        setIsDragging(true);
        (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const handlePointerMove = (e: { point: THREE.Vector3 }) => {
        if (!isDragging) return;
        const newX = Math.max(xRange[0], Math.min(xRange[1], e.point.x));
        onDrag(newX);
    };

    return (
        <mesh
            ref={meshRef}
            position={[x, y, 0.2]}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isDragging ? 0.8 : 0.4}
            />
        </mesh>
    );
}

// --- EXPLORE SCENE ---
interface ExploreSceneProps {
    pointX: number;
    onPointChange: (x: number) => void;
}

function ExploreScene({ pointX, onPointChange }: ExploreSceneProps) {
    const func = (x: number) => x * x;
    const derivative = (x: number) => 2 * x;
    const y = func(pointX);
    const slope = derivative(pointX);

    return (
        <>
            <Parabola func={func} color="#00ff9d" />
            <TangentLine x0={pointX} slope={slope} func={func} color="#ffa500" />
            <DraggablePoint
                x={pointX}
                y={y}
                onDrag={onPointChange}
                color="#00d2ff"
                xRange={[-3, 3]}
            />
            <Text position={[pointX + 0.5, y + 0.8, 0]} fontSize={0.3} color="white">
                {`P(${pointX.toFixed(1)}, ${y.toFixed(1)})`}
            </Text>
            <Text position={[pointX + 1.5, y + 0.3, 0]} fontSize={0.25} color="#ffa500">
                {`m = ${slope.toFixed(2)}`}
            </Text>
        </>
    );
}

// --- MAIN PAGE ---
export default function CalculusIntroPage() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = translations[currentLanguage]?.g1_01 ?? translations['EN'].g1_01;

    const [questMode, setQuestMode] = useState<QuestMode>('EXPLORE');
    const [questData, setQuestData] = useState<QuestData | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [exploreX, setExploreX] = useState(1);

    const usedQuestSignaturesRef = useRef(new Map<QuestMode, Set<string>>());

    const generateQuest = (mode: QuestMode) => {
        setQuestMode(mode);
        setUserAnswer('');

        const usedByMode = usedQuestSignaturesRef.current.get(mode) ?? new Set<string>();
        if (usedByMode.size >= 15) usedByMode.clear();

        if (mode === 'SLOPE') {
            let x1 = 1, x2 = 3;
            for (let attempt = 0; attempt < 50; attempt++) {
                x1 = Math.floor(Math.random() * 5) - 2;
                x2 = x1 + 1 + Math.floor(Math.random() * 3);
                const signature = `SLOPE|${x1}|${x2}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            const y1 = x1 * x1;
            const y2 = x2 * x2;
            const correctSlope = (y2 - y1) / (x2 - x1);
            usedQuestSignaturesRef.current.set(mode, usedByMode);
            setQuestData({ type: 'SLOPE', x1, y1, x2, y2, correctSlope });
        } else if (mode === 'TANGENT') {
            let x0 = 1;
            // Expanded function pool: x², 2x², 3x², x³
            const funcs = ['x2', '2x2', '3x2', 'x3'] as const;
            let func: 'x2' | '2x2' | '3x2' | 'x3' = 'x2';
            for (let attempt = 0; attempt < 50; attempt++) {
                // x³ needs smaller x values to keep results manageable
                const isX3 = Math.random() > 0.7;
                if (isX3) {
                    func = 'x3';
                    x0 = Math.floor(Math.random() * 3) - 1; // -1, 0, 1, 2
                } else {
                    func = funcs.filter(f => f !== 'x3')[Math.floor(Math.random() * 3)] as 'x2' | '2x2' | '3x2';
                    x0 = Math.floor(Math.random() * 5) - 2;
                }
                const signature = `TANGENT|${func}|${x0}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            const getFuncValue = (x: number) => {
                if (func === 'x2') return x * x;
                if (func === '2x2') return 2 * x * x;
                if (func === '3x2') return 3 * x * x;
                return x * x * x; // x³
            };
            const getDerivative = (x: number) => {
                if (func === 'x2') return 2 * x;
                if (func === '2x2') return 4 * x;
                if (func === '3x2') return 6 * x;
                return 3 * x * x; // 3x²
            };
            const y0 = getFuncValue(x0);
            const correctSlope = getDerivative(x0);
            usedQuestSignaturesRef.current.set(mode, usedByMode);
            setQuestData({ type: 'TANGENT', x0, y0, correctSlope, func });
        } else if (mode === 'RATE') {
            // Expanded motion functions: t², 2t², ½t², 3t
            const motionFuncs = [
                { label: 's(t) = t²', coeff: 1, power: 2 },
                { label: 's(t) = 2t²', coeff: 2, power: 2 },
                { label: 's(t) = ½t²', coeff: 0.5, power: 2 },
                { label: 's(t) = 3t', coeff: 3, power: 1 }, // Linear motion
            ];
            let t0 = 2;
            let motion = motionFuncs[0];
            for (let attempt = 0; attempt < 50; attempt++) {
                t0 = Math.floor(Math.random() * 5) + 1;
                motion = motionFuncs[Math.floor(Math.random() * motionFuncs.length)];
                const signature = `RATE|${motion.label}|${t0}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            // Calculate s(t₀) and v(t₀) = s'(t₀)
            const s_t0 = motion.power === 2 ? motion.coeff * t0 * t0 : motion.coeff * t0;
            const correctVelocity = motion.power === 2 ? 2 * motion.coeff * t0 : motion.coeff;
            usedQuestSignaturesRef.current.set(mode, usedByMode);
            setQuestData({ type: 'RATE', t0, s_t0, correctVelocity, funcLabel: motion.label });
        } else if (mode === 'ELITE') {
            let targetSlope = 4;
            for (let attempt = 0; attempt < 50; attempt++) {
                targetSlope = (Math.floor(Math.random() * 8) + 1) * 2; // Even slopes for y=x²
                const signature = `ELITE|${targetSlope}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            const correctX = targetSlope / 2; // For y=x², m=2x => x=m/2
            usedQuestSignaturesRef.current.set(mode, usedByMode);
            setQuestData({ type: 'ELITE', targetSlope, correctX, func: 'x2' });
        }
    };

    const slopeQuest = questData?.type === 'SLOPE' ? questData : null;
    const tangentQuest = questData?.type === 'TANGENT' ? questData : null;
    const rateQuest = questData?.type === 'RATE' ? questData : null;
    const eliteQuest = questData?.type === 'ELITE' ? questData : null;

    const isVerified = useMemo(() => {
        if (!questData) return false;
        const numAnswer = parseFloat(userAnswer);
        if (isNaN(numAnswer)) return false;

        if (slopeQuest) return Math.abs(numAnswer - slopeQuest.correctSlope) < 0.01;
        if (tangentQuest) return Math.abs(numAnswer - tangentQuest.correctSlope) < 0.01;
        if (rateQuest) return Math.abs(numAnswer - rateQuest.correctVelocity) < 0.01;
        if (eliteQuest) return Math.abs(numAnswer - eliteQuest.correctX) < 0.01;

        return false;
    }, [questData, userAnswer, slopeQuest, tangentQuest, rateQuest, eliteQuest]);

    const isSuccess = questMode === 'EXPLORE' ? false : isVerified;

    // Keyboard listener for Continue Operation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && isSuccess) {
                generateQuest(questMode);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSuccess, questMode]);

    const getFuncForCanvas = () => {
        if (tangentQuest) {
            if (tangentQuest.func === 'x2') return (x: number) => x * x;
            if (tangentQuest.func === '2x2') return (x: number) => 2 * x * x;
            if (tangentQuest.func === '3x2') return (x: number) => 3 * x * x;
            if (tangentQuest.func === 'x3') return (x: number) => x * x * x;
        }
        return (x: number) => x * x;
    };

    const getFuncLabel = (func: string) => {
        if (func === 'x2') return 'x^2';
        if (func === '2x2') return '2x^2';
        if (func === '3x2') return '3x^2';
        if (func === 'x3') return 'x^3';
        return 'x^2';
    };

    return (
        <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
            {/* HUD Top */}
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

                <div className="flex items-center gap-2 z-10">
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
            </header>

            {/* Mode Tabs (Sub-Header) */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-center gap-2 overflow-x-auto relative z-20">
                {([
                    { id: 'EXPLORE', icon: Eye, color: 'emerald' },
                    { id: 'SLOPE', icon: TrendingUp, color: 'cyan' },
                    { id: 'TANGENT', icon: Target, color: 'purple' },
                    { id: 'RATE', icon: Gauge, color: 'orange' },
                    { id: 'ELITE', icon: Database, color: 'red' }
                ] as const).map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => (btn.id === 'EXPLORE' ? setQuestMode('EXPLORE') : generateQuest(btn.id))}
                        className={clsx(
                            "flex flex-col items-center gap-1 px-4 py-2 border transition-all font-black min-w-[80px] relative overflow-hidden rounded",
                            questMode === btn.id
                                ? `border-white text-white bg-white/20 shadow-[0_0_25px_rgba(255,255,255,0.2)] animate-pulse`
                                : "border-white/30 text-white hover:border-white/50"
                        )}
                    >
                        <btn.icon className="w-4 h-4" />
                        <span className="text-[10px] tracking-[0.3em] uppercase">
                            {t.tabs?.[btn.id.toLowerCase() as keyof typeof t.tabs] ?? btn.id}
                        </span>
                        {questMode === btn.id && (
                            <motion.div layoutId="nav-glow-g1_01" className="absolute inset-0 bg-white/10 pointer-events-none" />
                        )}
                    </button>
                ))}
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Logic Workstation */}
                <main className="flex-1 border-r-2 border-white/10 p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center">
                    <div className="w-full max-w-3xl space-y-8">
                        {questMode === 'EXPLORE' ? (
                            <div className="space-y-8 py-10 flex flex-col justify-center min-h-[50vh]">
                                <h3 className="text-xl text-white uppercase tracking-[0.4em] font-black flex items-center gap-4 border-l-4 border-white pl-6">
                                    {t.explore_title}
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed max-w-xl">
                                    {t.explore_instruction}
                                </p>
                                <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                                    <div className="text-white/60 text-xs font-mono uppercase tracking-widest mb-3">{t.current_point}</div>
                                    <div className="text-white text-3xl font-black">
                                        P({exploreX.toFixed(1)}, {(exploreX * exploreX).toFixed(1)})
                                    </div>
                                    <div className="text-neon-green text-xl font-bold mt-2">
                                        {t.slope_label}: m = {(2 * exploreX).toFixed(2)}
                                    </div>
                                </div>
                                <div className="text-center text-white/40 text-xs uppercase tracking-widest">
                                    {t.explore_hint}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in slide-in-from-bottom duration-700 min-h-[50vh] flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
                                        <p className="text-2xl text-white font-black max-w-2xl mx-auto leading-tight">
                                            {questMode === 'SLOPE' && t.stages.slope_prompt}
                                            {questMode === 'TANGENT' && t.stages.tangent_prompt}
                                            {questMode === 'RATE' && t.stages.rate_prompt}
                                            {questMode === 'ELITE' && t.stages.elite_prompt}
                                        </p>
                                    </div>

                                    <div className="p-6 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-3xl mx-auto">
                                        <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t.target_title}</span>
                                        <div className="text-4xl font-black text-white">
                                            {slopeQuest && (
                                                <InlineMath math={`A(${slopeQuest.x1}, ${slopeQuest.y1}), \\; B(${slopeQuest.x2}, ${slopeQuest.y2})`} />
                                            )}
                                            {tangentQuest && (
                                                <InlineMath math={`f(x) = ${getFuncLabel(tangentQuest.func)}, \\; P(${tangentQuest.x0}, ${tangentQuest.y0})`} />
                                            )}
                                            {rateQuest && (
                                                <InlineMath math={`${rateQuest.funcLabel}, \\; t_0 = ${rateQuest.t0}`} />
                                            )}
                                            {eliteQuest && (
                                                <InlineMath math={`f(x) = x^2, \\; m = ${eliteQuest.targetSlope}`} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <label className="text-xs text-white/60 uppercase tracking-widest font-black">
                                        {slopeQuest && t.labels.secant_slope}
                                        {tangentQuest && t.labels.tangent_slope}
                                        {rateQuest && t.labels.velocity}
                                        {eliteQuest && t.labels.x_coordinate}
                                    </label>
                                    <input
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        className="w-40 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/40 text-3xl font-black text-white"
                                        placeholder="?"
                                    />
                                </div>

                                <div className="flex justify-center w-full mt-4">
                                    <button
                                        onClick={() => generateQuest(questMode)}
                                        className="w-64 py-4 border-2 border-white text-sm text-white hover:bg-white hover:text-black tracking-[0.4em] uppercase font-black transition-all hover:scale-[1.01] active:scale-95 shadow-lg block"
                                    >
                                        {t.next}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Hint Box */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mt-8">
                            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">{t.hints_title}</div>
                            <div className="text-white/70 text-sm">
                                {questMode === 'EXPLORE' && <InlineMath math="m = f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}" />}
                                {questMode === 'SLOPE' && <InlineMath math="m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\Delta y}{\Delta x}" />}
                                {questMode === 'TANGENT' && <InlineMath math="f(x) = x^2 \Rightarrow f'(x) = 2x" />}
                                {questMode === 'RATE' && <InlineMath math="v(t) = s'(t) = \lim_{\Delta t \to 0} \frac{s(t + \Delta t) - s(t)}{\Delta t}" />}
                                {questMode === 'ELITE' && <InlineMath math="m = f'(x_0) \Rightarrow x_0 = \frac{m}{2}" />}
                            </div>
                        </div>

                        {/* Integral Preview Teaser */}
                        <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-lg p-5 mt-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                <span className="text-[10px] text-purple-400 uppercase tracking-widest font-black">
                                    {t.integral_preview_title ?? 'COMING SOON: INTEGRALRECHNUNG'}
                                </span>
                            </div>
                            <div className="text-white/60 text-sm mb-3">
                                {t.integral_preview_desc ?? 'Master the inverse operation of differentiation. Calculate areas under curves.'}
                            </div>
                            <div className="text-purple-300/80 text-lg font-mono">
                                <InlineMath math="\int_a^b f(x) \, dx = F(b) - F(a)" />
                            </div>
                            <div className="mt-4 text-[9px] text-white/30 uppercase tracking-widest">
                                {t.integral_preview_hint ?? 'Unlock after mastering derivatives →'}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Visual Monitor Area */}
                <aside className="w-[550px] relative bg-black flex flex-col border-l border-white/10">
                    <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
                        <span>{t.monitor_title}</span>
                        <div className="flex gap-2"><div className="w-1 h-1 bg-white" /><div className="w-1 h-1 bg-white/40" /></div>
                    </div>
                    <div className="flex-1 relative">
                        <Canvas>
                            <OrthographicCamera makeDefault position={[0, 2, 10]} zoom={40} />
                            <Suspense fallback={null}>
                                <ambientLight intensity={0.4} />
                                <pointLight position={[10, 10, 10]} />
                                <Grid infiniteGrid fadeDistance={30} cellColor="#111" sectionColor="#222" position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]} />

                                {questMode === 'EXPLORE' && (
                                    <ExploreScene pointX={exploreX} onPointChange={setExploreX} />
                                )}

                                {(slopeQuest || tangentQuest) && (
                                    <>
                                        <Parabola func={getFuncForCanvas()} color="#00ff9d" />
                                        {slopeQuest && (
                                            <>
                                                <mesh position={[slopeQuest.x1, slopeQuest.y1, 0.1]}>
                                                    <sphereGeometry args={[0.12, 16, 16]} />
                                                    <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={0.5} />
                                                </mesh>
                                                <mesh position={[slopeQuest.x2, slopeQuest.y2, 0.1]}>
                                                    <sphereGeometry args={[0.12, 16, 16]} />
                                                    <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={0.5} />
                                                </mesh>
                                                <Line
                                                    points={[
                                                        new THREE.Vector3(slopeQuest.x1 - 1, slopeQuest.y1 - slopeQuest.correctSlope, 0.05),
                                                        new THREE.Vector3(slopeQuest.x2 + 1, slopeQuest.y2 + slopeQuest.correctSlope, 0.05)
                                                    ]}
                                                    color="#ffa500"
                                                    lineWidth={2}
                                                />
                                                <Text position={[slopeQuest.x1 + 0.3, slopeQuest.y1 + 0.5, 0]} fontSize={0.25} color="white">A</Text>
                                                <Text position={[slopeQuest.x2 + 0.3, slopeQuest.y2 + 0.5, 0]} fontSize={0.25} color="white">B</Text>
                                            </>
                                        )}
                                        {tangentQuest && (
                                            <>
                                                <mesh position={[tangentQuest.x0, tangentQuest.y0, 0.1]}>
                                                    <sphereGeometry args={[0.12, 16, 16]} />
                                                    <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={0.5} />
                                                </mesh>
                                                <TangentLine x0={tangentQuest.x0} slope={tangentQuest.correctSlope} func={getFuncForCanvas()} color="#ffa500" />
                                                <Text position={[tangentQuest.x0 + 0.4, tangentQuest.y0 + 0.6, 0]} fontSize={0.25} color="white">P</Text>
                                            </>
                                        )}
                                    </>
                                )}

                                {eliteQuest && (
                                    <>
                                        <Parabola func={(x) => x * x} color="#00ff9d" />
                                        <TangentLine x0={eliteQuest.correctX} slope={eliteQuest.targetSlope} func={(x) => x * x} color="#ffa500" />
                                        <Text position={[0, 6, 0]} fontSize={0.3} color="#ffa500">
                                            {`m = ${eliteQuest.targetSlope}`}
                                        </Text>
                                    </>
                                )}
                            </Suspense>
                        </Canvas>

                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-8 z-40">
                                    <div className="max-w-xs w-full p-8 bg-black border border-neon-green shadow-2xl text-center space-y-4">
                                        <div className="w-10 h-10 border border-neon-green mx-auto flex items-center justify-center animate-pulse"><Zap className="text-neon-green w-5 h-5" /></div>
                                        <h3 className="text-xl font-black neon-text-green tracking-tighter uppercase">{t.correct}</h3>
                                        <div className="h-px bg-white/10 w-full" />
                                        <button onClick={() => generateQuest(questMode)} className="w-full py-3 bg-neon-green/10 text-neon-green border border-neon-green hover:bg-neon-green text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-black">{t.next}</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="p-4 bg-white/[0.02] border-t-2 border-white/10 text-[9px] font-black text-white/40 uppercase tracking-[0.4em] flex justify-between items-center">
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_10px_#00ff9d]" /> {t.status}</div>
                        <div className="flex items-center gap-4">
                            <span>FPS: 60.0</span>
                            <span>LATENZ: 2ms</span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Footer */}
            <footer className="p-3 border-t-2 border-white/10 text-[9px] text-white/30 uppercase tracking-[0.4em] font-black flex justify-between">
                <span>{t.footer_left}</span>
                <span>{t.footer_right}</span>
            </footer>
        </div>
    );
}
