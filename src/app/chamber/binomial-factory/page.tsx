"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Text, useCursor, OrthographicCamera, Grid, Html } from "@react-three/drei";
import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { ArrowLeft, RefreshCcw, Lock, Unlock, Settings2, Info, Construction, Rocket, Zap, Database, Compass } from 'lucide-react';
import { clsx } from "clsx";

// --- HELPERS ---
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

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

    const dragOffset = useRef(new THREE.Vector3());
    const intersectionPoint = new THREE.Vector3();

    useCursor(hovered && !locked, 'grab', 'auto');

    useEffect(() => {
        if (!locked) {
            setPos(initialPos);
        }
    }, [initialPos, locked]);

    const handlePointerDown = (e: any) => {
        if (locked) return;
        e.stopPropagation();
        if (e.target && 'setPointerCapture' in e.target) (e.target as any).setPointerCapture(e.pointerId);
        dragOffset.current.set(pos[0] - e.point.x, pos[1] - e.point.y, 0);
        setIsDragging(true);
    };

    const handlePointerUp = (e: any) => {
        if (locked) return;
        setIsDragging(false);
        if (e.target && 'releasePointerCapture' in e.target) (e.target as any).releasePointerCapture(e.pointerId);

        const dist = new THREE.Vector2(pos[0], pos[1]).distanceTo(new THREE.Vector2(targetPos[0], targetPos[1]));
        if (dist < 2.5) { // Increased from 1.5 for much better magnetic snapping
            setPos(targetPos);
            onSnap(id, true);
        } else {
            onSnap(id, false);
            setPos([pos[0], pos[1], 0]);
        }
    };

    const handlePointerMove = (e: any) => {
        if (!isDragging || locked) return;
        e.ray.intersectPlane(dragPlane, intersectionPoint);
        setPos([intersectionPoint.x + dragOffset.current.x, intersectionPoint.y + dragOffset.current.y, 0.1]);
    };

    return (
        <mesh
            position={[pos[0], pos[1], isDragging ? 0.5 : (hovered ? 0.2 : pos[2])]}
            scale={hovered && !locked && !isDragging ? 1.05 : 1}
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
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
                emissiveIntensity={hovered && !locked ? 0.4 : 0.15}
            />
            <Text position={[0, 0, 0.1]} fontSize={Math.max(0.1, Math.min(width, height) * 0.2)} color="white">
                {label}
            </Text>
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
                <lineBasicMaterial color="white" transparent opacity={0.6} linewidth={2} />
            </lineSegments>
        </mesh>
    );
}

// --- MAIN PAGE ---

export default function BinomialFactoryPage() {
    const { currentLanguage } = useAppStore();
    const t = translations[currentLanguage].binomial;

    const [questMode, setQuestMode] = useState<'EXPLORE' | 'ARCHITECT' | 'SCRAPPER' | 'SPEEDSTER' | 'ELITE' | 'VOYAGER'>('EXPLORE');
    const [a, setA] = useState(3);
    const [b, setB] = useState(2);
    const [locked, setLocked] = useState(false);
    const [snappedBlocks, setSnappedBlocks] = useState<Record<string, boolean>>({});

    // Quest States
    const [questData, setQuestData] = useState<any>(null);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [isVerified, setIsVerified] = useState(false);

    const generateQuest = (mode: typeof questMode) => {
        setQuestMode(mode);
        setSnappedBlocks({});
        setLocked(false);
        setIsVerified(false);

        if (mode === 'ARCHITECT') {
            const ca = Math.floor(Math.random() * 8) + 1; // 1-8
            const vb = Math.floor(Math.random() * 15) + 1; // 1-15
            setQuestData({ type: 'EXPAND', ca, vb, formula: `(${ca === 1 ? '' : ca}x + ${vb})²` });
            setUserAnswers({ a2: '', ab: '', b2: '' });
            setA(ca * 0.4 + 1.2); setB(vb * 0.25 + 0.6);
        } else if (mode === 'SCRAPPER') {
            const variant = Math.random() > 0.5 ? 'XY' : 'X';
            const ca = Math.floor(Math.random() * 8) + 1; // 1-8
            const vb = Math.floor(Math.random() * 15) + 1; // 1-15
            const expr = variant === 'XY'
                ? `${ca ** 2 === 1 ? '' : ca ** 2}x² + ${2 * ca * vb}xy + ${vb ** 2}y²`
                : `${ca ** 2 === 1 ? '' : ca ** 2}x² + ${2 * ca * vb}x + ${vb ** 2}`;
            setQuestData({ type: 'FACTOR', ca, vb, variant, expr });
            setUserAnswers({ a: '', b: '' });
            setA(ca * 0.4 + 1.2); setB(vb * 0.25 + 0.6);
        } else if (mode === 'SPEEDSTER') {
            const base = [10, 20, 30, 40, 50, 60, 70, 80, 90, 110, 120][Math.floor(Math.random() * 11)];
            const add = Math.floor(Math.random() * 15) + 1; // 1-15
            setQuestData({ type: 'SPEED', base, add, target: (base + add) ** 2 });
            setUserAnswers({ base_input: '', add_input: '', part1: '', part2: '', part3: '' });
            setA(3.5); setB(add * 0.25);
        } else if (mode === 'ELITE') {
            const C = Math.floor(Math.random() * 10) + 1; // 1-10
            const V = Math.floor(Math.random() * 20) + 2; // 2-21
            const expr = `${C * C === 1 ? '' : C * C}x²y² - ${V * V}`;
            setQuestData({ type: 'ELITE', C, V, expr });
            setUserAnswers({ base: '', sub: '', add_term: '', const_term: '' });
            setA(C * 0.6 + 1.5); setB(V * 0.15 + 0.5);
        } else if (mode === 'VOYAGER') {
            const ca = Math.floor(Math.random() * 10) + 1; // 1-10
            const vb = Math.floor(Math.random() * 25) + 1; // 1-25
            const subType = Math.random() > 0.5 ? 'EXPAND' : 'FACTOR';
            const expr = subType === 'EXPAND'
                ? `(${ca === 1 ? '' : ca}x + ${vb})(${ca === 1 ? '' : ca}x - ${vb})`
                : `${ca * ca === 1 ? '' : ca * ca}x² - ${vb * vb}`;
            setQuestData({ type: 'DIFFERENCE', ca, vb, expr, subType });
            if (subType === 'EXPAND') {
                setUserAnswers({ part1: '', part2: '' });
            } else {
                setUserAnswers({ a: '', b: '' });
            }
            setA(ca * 0.4 + 1.2); setB(vb * 0.25 + 0.6);
        }
    };

    // Auto verification
    useEffect(() => {
        if (!questData) return;
        if (questMode === 'ARCHITECT') {
            const correctA2 = (questData.ca ** 2).toString();
            const correctAB = (2 * questData.ca * questData.vb).toString();
            const correctB2 = (questData.vb ** 2).toString();
            setIsVerified(userAnswers.a2 === correctA2 && userAnswers.ab === correctAB && userAnswers.b2 === correctB2);
        } else if (questMode === 'SCRAPPER') {
            setIsVerified(userAnswers.a === questData.ca.toString() && userAnswers.b === questData.vb.toString());
        } else if (questMode === 'SPEEDSTER') {
            const p1 = (questData.base ** 2).toString();
            const p2 = (2 * questData.base * questData.add).toString();
            const p3 = (questData.add ** 2).toString();
            const step2Ok = userAnswers.part1 === p1 && userAnswers.part2 === p2 && userAnswers.part3 === p3;
            setIsVerified(step2Ok);
        } else if (questMode === 'ELITE') {
            const correctBase = questData.C === 1 ? 'xy' : `${questData.C}xy`;
            const correctSub = questData.V.toString();
            const correctAdd = (2 * questData.C * questData.V).toString() + 'xy';
            const correctConst = (2 * questData.V ** 2).toString();

            const bOk = userAnswers.base.toLowerCase().replace(/\s/g, '') === correctBase;
            const sOk = userAnswers.sub === correctSub;
            const aOk = userAnswers.add_term.toLowerCase().replace(/\s/g, '') === correctAdd;
            const cOk = userAnswers.const_term === correctConst;
            setIsVerified(bOk && sOk && aOk && cOk);
        } else if (questMode === 'VOYAGER') {
            if (questData.subType === 'FACTOR') {
                setIsVerified(userAnswers.a === questData.ca.toString() && userAnswers.b === questData.vb.toString());
            } else {
                const correctP1 = (questData.ca ** 2).toString();
                const correctP2 = (questData.vb ** 2).toString();
                setIsVerified(userAnswers.part1 === correctP1 && userAnswers.part2 === correctP2);
            }
        }
    }, [userAnswers, questData, questMode]);

    const isSuccess = useMemo(() => {
        if (questMode === 'EXPLORE') return snappedBlocks['a2'] && snappedBlocks['b2'] && snappedBlocks['ab1'] && snappedBlocks['ab2'];
        return isVerified;
    }, [snappedBlocks, isVerified, questMode]);

    // Keyboard listener for Continue Operation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && isSuccess) {
                if (questMode !== 'EXPLORE') {
                    generateQuest(questMode);
                } else {
                    setSnappedBlocks({});
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSuccess, questMode]);

    const targetSize = a + b;
    const initialPositions = useMemo(() => ({
        a2: [-1.5, 2, 0] as [number, number, number],
        b2: [-1.5, -2, 0] as [number, number, number],
        ab1: [1.5, 2, 0] as [number, number, number],
        ab2: [1.5, -2, 0] as [number, number, number],
    }), []);
    const targetPositions = useMemo(() => ({
        a2: [-targetSize / 2 + a / 2, targetSize / 2 - a / 2, 0.01] as [number, number, number],
        b2: [targetSize / 2 - b / 2, -targetSize / 2 + b / 2, 0.02] as [number, number, number],
        ab1: [targetSize / 2 - b / 2, targetSize / 2 - a / 2, 0.03] as [number, number, number],
        ab2: [-targetSize / 2 + a / 2, -targetSize / 2 + b / 2, 0.04] as [number, number, number],
    }), [a, b, targetSize]);

    const handleSidebarKeyDown = (e: React.KeyboardEvent) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;

        const target = e.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;

        const inputs = Array.from(e.currentTarget.querySelectorAll('input'));
        const index = inputs.indexOf(target);

        if (index === -1) return;

        let nextIndex = index;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextIndex = Math.min(index + 1, inputs.length - 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            nextIndex = Math.max(index - 1, 0);
        }

        if (nextIndex !== index) {
            inputs[nextIndex].focus();
            inputs[nextIndex].select();
            e.preventDefault();
        }
    };

    return (
        <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
            {/* HUD Top */}
            <header className="p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl">
                <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">Back to Nexus</span>
                </Link>
                <div className="flex gap-4">
                    {[
                        { id: 'EXPLORE', icon: Settings2, color: 'emerald' },
                        { id: 'ARCHITECT', icon: Construction, color: 'emerald' },
                        { id: 'SCRAPPER', icon: Rocket, color: 'cyan' },
                        { id: 'SPEEDSTER', icon: Zap, color: 'purple' },
                        { id: 'VOYAGER', icon: Compass, color: 'red' },
                        { id: 'ELITE', icon: Database, color: 'orange' }
                    ].map(btn => (
                        <button
                            key={btn.id}
                            onClick={() => (btn.id === 'EXPLORE' ? setQuestMode('EXPLORE') : generateQuest(btn.id as any))}
                            className={clsx(
                                "flex flex-col items-center gap-2 px-6 py-3 border-2 transition-all font-black min-w-[120px] relative overflow-hidden",
                                questMode === btn.id
                                    ? `border-white text-white bg-white/20 shadow-[0_0_25px_rgba(255,255,255,0.2)] animate-pulse`
                                    : "border-white/10 text-white/90 hover:text-white hover:border-white/40"
                            )}
                        >
                            <btn.icon className="w-4 h-4" />
                            <span className="text-[10px] tracking-[0.3em] uppercase">{btn.id}</span>
                            {questMode === btn.id && (
                                <motion.div layoutId="nav-glow" className="absolute inset-0 bg-white/10 pointer-events-none" />
                            )}
                        </button>
                    ))}
                </div>
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-[10px] opacity-20">0</div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Logic Workstation */}
                <main
                    onKeyDown={handleSidebarKeyDown}
                    className="flex-1 border-r-2 border-white/10 p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center"
                >
                    <div className="w-full max-w-5xl space-y-12">
                        {questMode === 'EXPLORE' ? (
                            <div className="space-y-10">
                                <h3 className="text-xl text-white uppercase tracking-[0.4em] font-black flex items-center gap-4 border-l-4 border-white pl-6">00 // Parameters Configuration</h3>
                                <div className="grid grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="flex justify-between text-base mb-3 text-white uppercase tracking-widest font-black group-hover:text-white transition-colors"><span>{t.param_a}</span><span className="text-white">{a.toFixed(1)} UNITS</span></div>
                                        <input type="range" min="1" max="5" step="0.5" value={a} onChange={e => !locked && setA(parseFloat(e.target.value))} className="w-full accent-white h-2 bg-white/5 rounded-full appearance-none hover:bg-white/10 transition-all" />
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex justify-between text-base mb-3 text-white uppercase tracking-widest font-black group-hover:text-white transition-colors"><span>{t.param_b}</span><span className="text-white">{b.toFixed(1)} UNITS</span></div>
                                        <input type="range" min="1" max="5" step="0.5" value={b} onChange={e => !locked && setB(parseFloat(e.target.value))} className="w-full accent-white h-2 bg-white/5 rounded-full appearance-none hover:bg-white/10 transition-all" />
                                    </div>
                                </div>
                                <button onClick={() => setLocked(!locked)} className={clsx("w-64 mx-auto py-6 border-2 text-sm font-black tracking-[0.5em] transition-all uppercase shadow-2xl block", locked ? "border-white text-white bg-white/5" : "border-white text-white bg-white/5")}>
                                    {locked ? <Unlock className="inline w-5 h-5 mr-3 mb-1" /> : <Lock className="inline w-5 h-5 mr-3 mb-1" />} {locked ? t.unlock : t.lock}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">Active Mission Objective</h3>
                                        <p className="text-4xl text-white font-black max-w-2xl mx-auto leading-tight italic">
                                            {questMode === 'ARCHITECT' && "Factor the algebraic blueprint into a perfect structural assembly."}
                                            {questMode === 'SCRAPPER' && "Factor the debris cluster into a stable docking square."}
                                            {questMode === 'ELITE' && "Decrypt the orbital manifold through perfect binomial isolation."}
                                            {questMode === 'VOYAGER' && "Calibrate the expansion sequence to ensure manifold stability."}
                                        </p>
                                    </div>

                                    <div className="p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
                                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                                        <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">Target Identity Expression</span>
                                        <span className="text-8xl font-black italic tracking-tighter text-white block py-2 leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] whitespace-nowrap">
                                            {questMode === 'ARCHITECT' && questData?.formula}
                                            {questMode === 'SCRAPPER' && questData?.expr}
                                            {questMode === 'ELITE' && questData?.expr}
                                            {questMode === 'VOYAGER' && questData?.expr}
                                            {questMode === 'SPEEDSTER' && (
                                                <div className="text-7xl flex flex-col items-center gap-8">
                                                    <div className="text-white">{questData?.base + questData?.add}²</div>
                                                    <div className="flex items-center gap-4 text-2xl tracking-widest whitespace-nowrap">
                                                        <span>( [?] x + [?] y )²</span>
                                                    </div>
                                                </div>
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex justify-center gap-4 text-2xl text-white font-black italic opacity-40 tracking-[0.5em]">
                                        ( <input className="w-12 bg-transparent border-b border-white text-center" placeholder="?" /> x + <input className="w-12 bg-transparent border-b border-white text-center" placeholder="?" /> y )²
                                    </div>

                                    <div className="flex justify-center w-full mt-4">
                                        <button onClick={() => generateQuest(questMode as any)} className="w-64 py-6 border border-white text-sm tracking-[0.6em] text-white font-black hover:bg-white hover:text-black transition-all">EXECUTE NEXT SEQUENCE</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-8 justify-center max-w-xl mx-auto">
                                    {questMode === 'ARCHITECT' && (
                                        <>
                                            <div className="flex flex-col gap-4 text-center">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">Part 1 (a²)</span>
                                                <input value={userAnswers.a2} onChange={e => setUserAnswers(v => ({ ...v, a2: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white" placeholder="?" />
                                            </div>
                                            <div className="flex flex-col gap-4 text-center">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">Part 2 (2ab)</span>
                                                <input value={userAnswers.ab} onChange={e => setUserAnswers(v => ({ ...v, ab: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white" placeholder="?" />
                                            </div>
                                            <div className="flex flex-col gap-4 text-center">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">Part 3 (b²)</span>
                                                <input value={userAnswers.b2} onChange={e => setUserAnswers(v => ({ ...v, b2: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white" placeholder="?" />
                                            </div>
                                        </>
                                    )}
                                    {questMode === 'SCRAPPER' && (
                                        <>
                                            <div className="flex flex-col gap-4 text-center col-span-1">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">Identify Root a</span>
                                                <input value={userAnswers.a} onChange={e => setUserAnswers(v => ({ ...v, a: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 font-black text-2xl text-white" placeholder="?" />
                                            </div>
                                            <div className="flex items-end pb-4 justify-center text-4xl text-white font-black">+</div>
                                            <div className="flex flex-col gap-4 text-center col-span-1">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">Identify Root b</span>
                                                <input value={userAnswers.b} onChange={e => setUserAnswers(v => ({ ...v, b: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 font-black text-2xl text-white" placeholder="?" />
                                            </div>
                                        </>
                                    )}
                                    {questMode === 'SPEEDSTER' && (
                                        <div className="col-span-3">
                                            <div className="h-px bg-white/40 w-full mb-10" />
                                            <div className="flex items-center gap-6 justify-center">
                                                <input value={userAnswers.part1} onChange={e => setUserAnswers(v => ({ ...v, part1: e.target.value }))} className="bg-black border-2 border-white/60 p-6 text-center outline-none focus:border-white placeholder:text-white/40 text-3xl font-black text-white" placeholder="a²" />
                                                <span className="text-4xl font-black text-white">+</span>
                                                <input value={userAnswers.part2} onChange={e => setUserAnswers(v => ({ ...v, part2: e.target.value }))} className="bg-black border-2 border-white/60 p-6 text-center outline-none focus:border-white placeholder:text-white/40 text-3xl font-black text-white" placeholder="2ab" />
                                                <span className="text-4xl font-black text-white">+</span>
                                                <input value={userAnswers.part3} onChange={e => setUserAnswers(v => ({ ...v, part3: e.target.value }))} className="bg-black border-2 border-white/60 p-6 text-center outline-none focus:border-white placeholder:text-white/40 text-3xl font-black text-white" placeholder="b²" />
                                            </div>
                                        </div>
                                    )}
                                    {questMode === 'ELITE' && (
                                        <div className="col-span-3 space-y-12">
                                            <div className="flex items-center gap-4 justify-center bg-white/10 p-10 rounded-2xl border-2 border-white/40 mb-2">
                                                <span className="text-3xl text-white font-black">(</span>
                                                <input value={userAnswers.base} onChange={e => setUserAnswers(v => ({ ...v, base: e.target.value }))} className="w-32 bg-transparent border-b-4 border-white/60 p-2 text-center outline-none focus:border-white text-3xl text-white font-black" placeholder="XY" />
                                                <span className="text-3xl text-white font-black">-</span>
                                                <input value={userAnswers.sub} onChange={e => setUserAnswers(v => ({ ...v, sub: e.target.value }))} className="w-24 bg-transparent border-b-4 border-white/60 p-2 text-center outline-none focus:border-white text-3xl text-white font-black" placeholder="V" />
                                                <span className="text-3xl text-white font-black">)² +</span>
                                                <input value={userAnswers.add_term} onChange={e => setUserAnswers(v => ({ ...v, add_term: e.target.value }))} className="w-32 bg-black border-2 border-white/40 p-4 text-center outline-none focus:border-white text-2xl text-white font-black" placeholder="2CVxy" />
                                                <span className="text-3xl text-white font-black">-</span>
                                                <input value={userAnswers.const_term} onChange={e => setUserAnswers(v => ({ ...v, const_term: e.target.value }))} className="w-28 bg-black border-2 border-white/40 p-4 text-center outline-none focus:border-white text-2xl text-white font-black" placeholder="2V²" />
                                            </div>
                                        </div>
                                    )}
                                    {questMode === 'VOYAGER' && (
                                        <div className="col-span-3 space-y-12">
                                            {questData.subType === 'FACTOR' ? (
                                                <div className="flex items-center gap-4 font-black text-3xl justify-center bg-white/10 p-10 rounded-2xl border-2 border-white/40">
                                                    <span className="text-white">(</span>
                                                    <input value={userAnswers.a} onChange={e => setUserAnswers(v => ({ ...v, a: e.target.value }))} className="w-16 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black" placeholder="a" />
                                                    <span className="text-white">x +</span>
                                                    <input value={userAnswers.b} onChange={e => setUserAnswers(v => ({ ...v, b: e.target.value }))} className="w-16 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black" placeholder="b" />
                                                    <span className="text-white">)(</span>
                                                    <input value={userAnswers.a} disabled className="w-16 bg-white/20 border-b-4 border-white text-center text-white font-black cursor-not-allowed" placeholder="a" />
                                                    <span className="text-white">x -</span>
                                                    <input value={userAnswers.b} disabled className="w-16 bg-white/20 border-b-4 border-white text-center text-white font-black cursor-not-allowed" placeholder="b" />
                                                    <span className="text-white">)</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-6 font-black text-4xl justify-center bg-white/10 p-10 rounded-2xl border-2 border-white/40">
                                                    <input value={userAnswers.part1} onChange={e => setUserAnswers(v => ({ ...v, part1: e.target.value }))} className="w-24 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-3xl text-white" placeholder="a²" />
                                                    <span className="text-white">x² -</span>
                                                    <input value={userAnswers.part2} onChange={e => setUserAnswers(v => ({ ...v, part2: e.target.value }))} className="w-24 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-3xl text-white" placeholder="b²" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center w-full mt-8">
                                    <button onClick={() => generateQuest(questMode)} className="w-64 py-4 border-2 border-white text-sm text-white hover:bg-white hover:text-black tracking-[0.4em] uppercase font-black transition-all hover:scale-[1.01] active:scale-95 shadow-lg block">Execute Next Sequence</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-4 w-full max-w-4xl">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2"><Settings2 className="w-4 h-4 text-white" /><span className="text-[10px] uppercase tracking-[0.2em] font-black text-white underline underline-offset-[6px] decoration-white decoration-2">Logic Lattice // Decomposition</span></div>
                            <div className="p-5 bg-white/[0.03] border-2 border-white/10 rounded-lg font-mono text-xs space-y-3 hover:border-white/20 transition-all">
                                {questMode === 'ARCHITECT' && (
                                    <>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">STEP_01: Distribute outer terms</div>
                                        <div className="text-white font-black">{questData?.ca}x ({questData?.ca}x + {questData?.vb}) + {questData?.vb} ({questData?.ca}x + {questData?.vb})</div>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">STEP_02: Expand partial segments</div>
                                        <div className="text-white font-black">({questData?.ca * questData?.ca}x²) + ({questData?.ca * questData?.vb}x) + ({questData?.vb * questData?.ca}x) + ({questData?.vb * questData?.vb})</div>
                                    </>
                                )}
                                {questMode === 'SCRAPPER' && (
                                    <>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">STEP_01: Isolate root (a)</div>
                                        <div className="text-white font-black">√({questData?.ca * questData?.ca})x² = {questData?.ca}x</div>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">STEP_02: Verify linear (2ab)</div>
                                        <div className="text-white font-black">2 * ({questData?.ca}x) * ({questData?.vb}) = {2 * questData?.ca * questData?.vb}x</div>
                                    </>
                                )}
                                {questMode === 'VOYAGER' && (
                                    <>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">AXIOM: Conjugate Dualism</div>
                                        <div className="text-white font-black">Product of (A+B)(A-B) eliminates linear cross-terms (±AB).</div>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">DERIVATION:</div>
                                        <div className="text-white font-black">A² + AB - AB - B² ≡ A² - B²</div>
                                    </>
                                )}
                                {!['ARCHITECT', 'SCRAPPER', 'VOYAGER'].includes(questMode) && (
                                    <div className="text-white/20 italic text-[10px] py-8 text-center uppercase tracking-[0.3em] font-black">LINK_ESTABLISHED</div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2"><Info className="w-4 h-4 text-white" /><span className="text-[10px] uppercase tracking-[0.2em] font-black text-white underline underline-offset-[6px] decoration-white decoration-2">Axiomatic Constraints</span></div>
                            <p className="text-xs text-white/70 leading-relaxed font-mono italic font-black bg-white/[0.03] p-5 rounded-lg border-2 border-white/10">
                                {questMode === 'EXPLORE' && (locked ? t.instruction_solve : t.instruction_setup)}
                                {questMode === 'ARCHITECT' && "The corner 'b²' is the offset required to complete the major quadratic square. Its value is critical for blueprint precision."}
                                {questMode === 'SCRAPPER' && "Factoring decomposes global entropy back into ordered symbolic structures. Root isolation is the primary objective."}
                                {questMode === 'SPEEDSTER' && "Mental approximation relies on binary base decomposition. Shift the problem into a (Base+N)² framework."}
                                {questMode === 'ELITE' && "Advanced Refactoring handles multi-dimensional coefficients where C is a composite scaling factor."}
                                {questMode === 'VOYAGER' && "Identity symmetry requires strict sign adherence. The difference represents the net loss of area in 1D projection."}
                            </p>
                        </div>
                    </div>
                </main>

                {/* Visual Monitor Area */}
                <aside className="w-[600px] relative bg-black flex flex-col border-l border-white/10">
                    <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
                        <span>Visual_Reference_Position [FIX_REF.01]</span>
                        <div className="flex gap-2"><div className="w-1 h-1 bg-white" /><div className="w-1 h-1 bg-white/40" /></div>
                    </div>
                    <div className="flex-1 relative">
                        <Canvas>
                            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={32} />
                            <Suspense fallback={null}>
                                <ambientLight intensity={0.4} />
                                <pointLight position={[10, 10, 10]} />
                                <Grid infiniteGrid fadeDistance={40} cellColor="#111" sectionColor="#222" position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]} />

                                {/* The Ghost Blueprint */}
                                <mesh position={[0, 0, -0.05]} raycast={() => null}>
                                    <planeGeometry args={[targetSize, targetSize]} />
                                    <meshBasicMaterial color="white" transparent opacity={0.03} />
                                    <lineSegments>
                                        <edgesGeometry args={[new THREE.PlaneGeometry(targetSize, targetSize)]} />
                                        <lineBasicMaterial color="white" transparent opacity={0.6} />
                                    </lineSegments>
                                </mesh>

                                <Text position={[0, targetSize / 2 + 0.5, 0]} fontSize={0.35} color="white" fillOpacity={0.8}>
                                    {questMode === 'ARCHITECT' ? questData?.formula :
                                        questMode === 'SCRAPPER' ? questData?.expr :
                                            questMode === 'ELITE' ? questData?.expr :
                                                questMode === 'VOYAGER' ? questData?.expr : t.terms.target_plus}
                                </Text>

                                <DraggableBlock
                                    id="a2" width={a} height={a} color="#00ff9d"
                                    label={questMode === 'ARCHITECT' ? `${questData.ca ** 2}x²` : questMode === 'SCRAPPER' ? `${questData.ca ** 2 === 1 ? '' : questData.ca ** 2}x²` : questMode === 'ELITE' ? `${questData.C ** 2}x²y²` : questMode === 'VOYAGER' ? `${questData.ca ** 2}x²` : "a²"}
                                    initialPos={initialPositions.a2} targetPos={targetPositions.a2}
                                    locked={!locked && questMode === 'EXPLORE'} onSnap={(id, s) => setSnappedBlocks(p => ({ ...p, [id]: s }))}
                                />
                                <DraggableBlock
                                    id="b2" width={b} height={b} color="#00d2ff"
                                    label={questMode === 'ARCHITECT' ? `${questData.vb ** 2}` : questMode === 'SCRAPPER' ? `${questData.vb ** 2}${questData.variant === 'XY' ? 'y²' : ''}` : questMode === 'ELITE' ? `${questData.V ** 2}` : questMode === 'VOYAGER' ? `${questData.vb ** 2}` : "b²"}
                                    initialPos={initialPositions.b2} targetPos={targetPositions.b2}
                                    locked={!locked && questMode === 'EXPLORE'} onSnap={(id, s) => setSnappedBlocks(p => ({ ...p, [id]: s }))}
                                />
                                <DraggableBlock
                                    id="ab1" width={b} height={a} color="#ffa500"
                                    label={questMode === 'ARCHITECT' ? `${questData.ca * questData.vb}x` : questMode === 'SCRAPPER' ? `${questData.ca * questData.vb}${questData.variant === 'XY' ? 'xy' : 'x'}` : questMode === 'ELITE' ? `${questData.C * questData.V}xy` : questMode === 'VOYAGER' ? `${questData.ca * questData.vb}x` : "ab"}
                                    initialPos={initialPositions.ab1} targetPos={targetPositions.ab1}
                                    locked={!locked && questMode === 'EXPLORE'} onSnap={(id, s) => setSnappedBlocks(p => ({ ...p, [id]: s }))}
                                />
                                <DraggableBlock
                                    id="ab2" width={a} height={b} color="#ffa500"
                                    label={questMode === 'ARCHITECT' ? `${questData.ca * questData.vb}x` : questMode === 'SCRAPPER' ? `${questData.ca * questData.vb}${questData.variant === 'XY' ? 'xy' : 'x'}` : questMode === 'ELITE' ? `${questData.C * questData.V}xy` : questMode === 'VOYAGER' ? `${questData.ca * questData.vb}x` : "ab"}
                                    initialPos={initialPositions.ab2} targetPos={targetPositions.ab2}
                                    locked={!locked && questMode === 'EXPLORE'} onSnap={(id, s) => setSnappedBlocks(p => ({ ...p, [id]: s }))}
                                />
                            </Suspense>
                        </Canvas>

                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-x-0 bottom-0 top-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-8 z-40 border-l border-white/10">
                                    <div className="max-w-xs w-full p-8 bg-black border border-neon-green shadow-2xl text-center space-y-4">
                                        <div className="w-10 h-10 border border-neon-green mx-auto flex items-center justify-center animate-pulse"><Zap className="text-neon-green w-5 h-5" /></div>
                                        <h3 className="text-xl font-black neon-text-green tracking-tighter uppercase">{t.solve_success}</h3>
                                        <div className="h-px bg-white/10 w-full" />
                                        <button onClick={() => questMode !== 'EXPLORE' ? generateQuest(questMode) : setSnappedBlocks({})} className="w-full py-3 bg-neon-green/10 text-neon-green border border-neon-green hover:bg-neon-green text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-black">Continue Operation</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {questMode !== 'EXPLORE' && (
                        <div className="p-4 bg-white/[0.02] border-t-2 border-white/10 text-[9px] font-black text-white/40 uppercase tracking-[0.4em] flex justify-between items-center">
                            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_10px_#00ff9d]" /> STATUS: OPERATIONAL</div>
                            <div className="flex items-center gap-4">
                                <span>FPS: 60.0</span>
                                <span>LATENCY: 2ms</span>
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
                <span>Algebraic_Sync_V2.5 // Node: Zurich_Industrial_Sector</span>
                <span className="flex items-center gap-2"><div className={clsx("w-1 h-1 rounded-full animate-ping", isSuccess ? "bg-neon-green" : "bg-orange-500")} />{isSuccess ? 'Verified' : 'Simulating'}</span>
            </footer>
        </div>
    );
}
