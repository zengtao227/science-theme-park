"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Text, useCursor, OrthographicCamera, Grid } from "@react-three/drei";
import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { ArrowLeft, RefreshCcw, Lock, Unlock, Settings2, Info } from 'lucide-react';
import { clsx } from "clsx";

// --- COMPONENTS ---

interface BlockProps {
    id: string;
    width: number;
    height: number;
    color: string;
    label: string;
    locked: boolean;
    initialPos: [number, number, number];
    targetPos: [number, number, number];
    onSnap: (id: string, isSnapped: boolean) => void;
}

function DraggableBlock({ id, width, height, color, label, locked, initialPos, targetPos, onSnap }: BlockProps) {
    const [pos, setPos] = useState<[number, number, number]>(initialPos);
    const [isDragging, setIsDragging] = useState(false);
    const [hovered, setHover] = useState(false);
    const [snapped, setSnapped] = useState(false);

    useCursor(hovered && !locked, 'grab', 'auto');

    // Reset position when lengths change and not locked
    useEffect(() => {
        if (!locked) {
            setPos(initialPos);
            setSnapped(false);
        }
    }, [initialPos, locked]);

    const handlePointerDown = (e: any) => {
        if (locked) return;
        e.stopPropagation();
        e.target.setPointerCapture(e.pointerId);
        setIsDragging(true);
    };

    const handlePointerUp = (e: any) => {
        if (locked) return;
        setIsDragging(false);

        // Check for snapping
        const dist = new THREE.Vector3(pos[0], pos[1], 0).distanceTo(new THREE.Vector3(targetPos[0], targetPos[1], 0));
        if (dist < 0.5) {
            setPos(targetPos);
            setSnapped(true);
            onSnap(id, true);
        } else {
            setSnapped(false);
            onSnap(id, false);
        }
    };

    const handlePointerMove = (e: any) => {
        if (!isDragging || locked) return;
        // We are using Orthographic camera, mapping is direct
        setPos([e.point.x, e.point.y, 0.1]);
    };

    return (
        <mesh
            position={pos}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={isDragging ? 0.8 : (locked ? 0.9 : 0.7)}
                emissive={color}
                emissiveIntensity={hovered && !locked ? 0.5 : 0.2}
            />
            <Text position={[0, 0, 0.1]} fontSize={Math.min(width, height) * 0.3} color="white" font="/fonts/Rajdhani-Bold.ttf">
                {label}
            </Text>
            {/* Border */}
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
                <lineBasicMaterial color="white" transparent opacity={0.3} />
            </lineSegments>
        </mesh>
    );
}

// --- MAIN PAGE ---

export default function BinomialFactoryPage() {
    const { currentLanguage } = useAppStore();
    const t = translations[currentLanguage].binomial;

    // Parameters
    const [a, setA] = useState(3);
    const [b, setB] = useState(2);
    const [locked, setLocked] = useState(false);
    const [snappedBlocks, setSnappedBlocks] = useState<Record<string, boolean>>({});
    const [mode, setMode] = useState<'PLUS' | 'MINUS'>('PLUS');

    const isSuccess = useMemo(() => {
        if (mode === 'PLUS') {
            return snappedBlocks['a2'] && snappedBlocks['b2'] && snappedBlocks['ab1'] && snappedBlocks['ab2'];
        }
        return false; // Minus mode TBD
    }, [snappedBlocks, mode]);

    const handleSnap = (id: string, isSnapped: boolean) => {
        setSnappedBlocks(prev => ({ ...prev, [id]: isSnapped }));
    };

    const reset = () => {
        setLocked(false);
        setSnappedBlocks({});
    };

    // Calculate layout based on a and b
    // Target is centered at [0,0]
    // (a+b) x (a+b)
    const targetSize = a + b;

    // Components (Initial positions are scattered)
    const initialPositions = {
        a2: [-5, 2, 0] as [number, number, number],
        b2: [-5, -2, 0] as [number, number, number],
        ab1: [5, 2, 0] as [number, number, number],
        ab2: [5, -2, 0] as [number, number, number],
    };

    // Target Sub-positions relative to [0,0] center of (a+b)^2 square
    // Top-left origin: [-targetSize/2, targetSize/2]
    const targetPositions = {
        a2: [-targetSize / 2 + a / 2, targetSize / 2 - a / 2, 0] as [number, number, number],
        b2: [targetSize / 2 - b / 2, -targetSize / 2 + b / 2, 0] as [number, number, number],
        ab1: [targetSize / 2 - b / 2, targetSize / 2 - a / 2, 0] as [number, number, number],
        ab2: [-targetSize / 2 + a / 2, -targetSize / 2 + b / 2, 0] as [number, number, number],
    };

    return (
        <div className="w-full h-screen bg-[#050505] text-white overflow-hidden font-sans flex flex-col">

            {/* Header HUD */}
            <div className="p-6 flex justify-between items-center z-20 border-b border-white/5 bg-black/40 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neon-green transition-colors uppercase tracking-widest group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t.back}
                </Link>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-black tracking-widest neon-text-green">{t.title}</h2>
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={() => { setMode('PLUS'); reset(); }}
                            className={clsx("text-[10px] uppercase tracking-widest px-3 py-1 border transition-all", mode === 'PLUS' ? "border-neon-green text-neon-green bg-neon-green/10" : "border-white/10 text-neutral-500")}
                        >
                            {t.mode_1}
                        </button>
                        <button
                            onClick={() => { setMode('MINUS'); reset(); }}
                            className={clsx("text-[10px] uppercase tracking-widest px-3 py-1 border transition-all cursor-not-allowed opacity-50", mode === 'MINUS' ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10" : "border-white/10 text-neutral-500")}
                            disabled
                        >
                            {t.mode_2} (LOCKED)
                        </button>
                    </div>
                </div>
                <button onClick={reset} className="flex items-center gap-2 text-[10px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">
                    <RefreshCcw className="w-3 h-3" />
                    RESET
                </button>
            </div>

            {/* Main Interactive Stage */}
            <div className="flex-1 relative flex">

                {/* Left Controls Panel */}
                <div className="w-80 h-full border-r border-white/5 p-8 flex flex-col gap-10 bg-black/20 z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Settings2 className="w-4 h-4 text-neon-green" />
                            <span className="hud-text text-neon-green">Control Input</span>
                        </div>

                        {/* Slider a */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <label className="text-[10px] text-neutral-400 uppercase tracking-widest">{t.param_a}</label>
                                <span className="text-xs font-mono text-neon-green">{a.toFixed(1)}u</span>
                            </div>
                            <input
                                type="range" min="1" max="5" step="0.5" value={a}
                                onChange={(e) => !locked && setA(parseFloat(e.target.value))}
                                disabled={locked}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-green disabled:opacity-30"
                            />
                        </div>

                        {/* Slider b */}
                        <div className="mb-12">
                            <div className="flex justify-between mb-2">
                                <label className="text-[10px] text-neutral-400 uppercase tracking-widest">{t.param_b}</label>
                                <span className="text-xs font-mono text-neon-cyan">{b.toFixed(1)}u</span>
                            </div>
                            <input
                                type="range" min="1" max="5" step="0.5" value={b}
                                onChange={(e) => !locked && setB(parseFloat(e.target.value))}
                                disabled={locked}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan disabled:opacity-30"
                            />
                        </div>

                        <button
                            onClick={() => setLocked(!locked)}
                            className={clsx(
                                "w-full py-4 flex items-center justify-center gap-3 font-bold tracking-[0.2em] transition-all border",
                                locked
                                    ? "bg-neon-purple/10 border-neon-purple text-neon-purple hover:bg-neon-purple/20"
                                    : "bg-neon-green/10 border-neon-green text-neon-green hover:bg-neon-green/20"
                            )}
                        >
                            {locked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                            {locked ? t.unlock : t.lock}
                        </button>
                    </div>

                    <div className="mt-auto p-4 bg-white/5 border border-white/5 rounded text-neutral-400">
                        <div className="flex gap-2 mb-2 items-center">
                            <Info className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-widest font-bold">Protocol</span>
                        </div>
                        <p className="text-[10px] leading-relaxed italic font-mono uppercase tracking-tight">
                            {locked ? t.instruction_solve : t.instruction_setup}
                        </p>
                    </div>
                </div>

                {/* 3D Visualizer */}
                <div className="flex-1 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)] relative">
                    <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={40} />
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />

                            {/* The Grid */}
                            <Grid infiniteGrid fadeDistance={20} cellColor="#222" sectionColor="#444" position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]} />

                            {/* The Ghost Box (Target) */}
                            <mesh position={[0, 0, -0.05]}>
                                <planeGeometry args={[targetSize, targetSize]} />
                                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
                                <lineSegments>
                                    <edgesGeometry args={[new THREE.PlaneGeometry(targetSize, targetSize)]} />
                                    <lineBasicMaterial color="white" transparent opacity={0.2} />
                                </lineSegments>
                            </mesh>

                            {/* Central Label for Ghost Box */}
                            <Text position={[0, targetSize / 2 + 0.5, 0]} fontSize={0.4} color="white" fillOpacity={0.5} font="/fonts/Rajdhani-Bold.ttf">
                                {t.terms.target_plus}
                            </Text>

                            {/* Component Blocks */}
                            <DraggableBlock
                                id="a2" width={a} height={a} color="#00ff9d" label={t.terms.a2}
                                initialPos={initialPositions.a2} targetPos={targetPositions.a2}
                                locked={!locked} onSnap={handleSnap}
                            />
                            <DraggableBlock
                                id="b2" width={b} height={b} color="#00d2ff" label={t.terms.b2}
                                initialPos={initialPositions.b2} targetPos={targetPositions.b2}
                                locked={!locked} onSnap={handleSnap}
                            />
                            <DraggableBlock
                                id="ab1" width={b} height={a} color="#ffa500" label={t.terms.ab}
                                initialPos={initialPositions.ab1} targetPos={targetPositions.ab1}
                                locked={!locked} onSnap={handleSnap}
                            />
                            <DraggableBlock
                                id="ab2" width={a} height={b} color="#ffa500" label={t.terms.ab}
                                initialPos={initialPositions.ab2} targetPos={targetPositions.ab2}
                                locked={!locked} onSnap={handleSnap}
                            />

                        </Suspense>
                    </Canvas>

                    {/* Success Overlay */}
                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-green-500/10 backdrop-blur-sm"
                            >
                                <div className="p-12 border-2 border-neon-green bg-black rounded shadow-[0_0_100px_rgba(0,255,157,0.3)] text-center">
                                    <h3 className="text-4xl font-black text-white neon-text-green tracking-tighter mb-4">{t.solve_success}</h3>
                                    <div className="h-px bg-neon-green/30 w-full mb-6" />
                                    <p className="font-mono text-neon-green text-3xl italic tracking-widest">(a + b)² = a² + 2ab + b²</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="p-2 border-t border-white/5 flex justify-between bg-black text-[9px] font-mono tracking-[0.3em] text-neutral-600 uppercase">
                <div>Module: Algebra_Geom_Synchro // Node: ETH_ZURICH_SERVER</div>
                <div>Status: {isSuccess ? 'Verified' : 'Simulating...'}</div>
            </div>
        </div>
    );
}
