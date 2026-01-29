"use client";

import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { Text, useCursor, OrthographicCamera, Grid } from "@react-three/drei";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { ArrowLeft, Lock, Unlock, Settings2, Info, Construction, Rocket, Zap, Database, Compass } from 'lucide-react';
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
    containerSize: number;
    onSnap: (id: string, isSnapped: boolean) => void;
}

function DraggableBlock({ id, width, height, color, label, locked, initialPos, targetPos, containerSize, onSnap }: BlockProps) {
    const [pos, setPos] = useState<[number, number, number]>(initialPos);
    const [isDragging, setIsDragging] = useState(false);
    const [hovered, setHover] = useState(false);

    const dragOffset = useRef(new THREE.Vector3());
    const intersectionPoint = new THREE.Vector3();

    useCursor(hovered && !locked, 'grab', 'auto');

    useEffect(() => {
        if (locked) return;
        const raf = requestAnimationFrame(() => setPos(initialPos));
        return () => cancelAnimationFrame(raf);
    }, [initialPos, locked]);

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        if (locked) return;
        e.stopPropagation();
        const target = e.target as unknown as { setPointerCapture?: (pointerId: number) => void };
        target.setPointerCapture?.(e.pointerId);
        dragOffset.current.set(pos[0] - e.point.x, pos[1] - e.point.y, 0);
        setIsDragging(true);
    };

    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        if (locked) return;
        setIsDragging(false);
        const target = e.target as unknown as { releasePointerCapture?: (pointerId: number) => void };
        target.releasePointerCapture?.(e.pointerId);

        // Calculate all 4 possible corner positions based on the target area size (targetSize)
        // targetSize is passed as a prop or context, but here we can derive the boundary.
        // The container is centered at [0,0]. Its bounds are [-targetSize/2, -targetSize/2] to [targetSize/2, targetSize/2].
        // But we need 'targetSize' inside this component. Let's pass 'containerSize' prop.
        // WAIT: Modifying props requires parent update. Let's check available props.
        // 'targetPos' implies a single correct answer.
        // To support free-form placement, we need to know the container boundaries.
        // Let's modify the component signature first to accept 'containerSize'.
        // Actually, for now, let's look at how targetPos is calculated in parent:
        // a2: [-targetSize/2 + a/2, targetSize/2 - a/2] -> This is Top-Left.

        // We can infer the container bounds if we assume targetPos is one of the corners.
        // However, a cleaner way is to simply pass 'containerSize' from parent.
        // Let's update the props in the next step.
        // FOR NOW: Let's assume we update the parent to pass 'containerSize'.

        // ... Wait, to avoid multi-step diffs breaking, I will implement a robust local calculation 
        // by passing 'containerSize' in the PROPS first.

        // Actually, looking at the code structure, I should update the Interface first.
        // But 'replace_file_content' is for a contiguous block.
        // I will update the logic assuming 'containerSize' is available, and then I will update the parent usage.

        // Strategy:
        // 1. Define corners relative to container center (0,0).
        // TL: [-S/2 + w/2,  S/2 - h/2]
        // TR: [ S/2 - w/2,  S/2 - h/2]
        // BL: [-S/2 + w/2, -S/2 + h/2]
        // BR: [ S/2 - w/2, -S/2 + h/2]

        const S = containerSize;
        const w = width;
        const h = height;

        const corners = [
            new THREE.Vector2(-S / 2 + w / 2, S / 2 - h / 2), // TL
            new THREE.Vector2(S / 2 - w / 2, S / 2 - h / 2),  // TR
            new THREE.Vector2(-S / 2 + w / 2, -S / 2 + h / 2),// BL
            new THREE.Vector2(S / 2 - w / 2, -S / 2 + h / 2)  // BR
        ];

        let closestDist = Infinity;
        let snapPos = null;

        const currentVec = new THREE.Vector2(pos[0], pos[1]);

        for (const corner of corners) {
            const d = currentVec.distanceTo(corner);
            if (d < closestDist) {
                closestDist = d;
                snapPos = corner;
            }
        }

        if (closestDist < 3.5 && snapPos) {
            setPos([snapPos.x, snapPos.y, targetPos[2]]); // Keep original Z
            onSnap(id, true);
        } else {
            onSnap(id, false);
            setPos([pos[0], pos[1], 0]);
        }
    };

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
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

type QuestMode = 'EXPLORE' | 'ARCHITECT' | 'SCRAPPER' | 'SPEEDSTER' | 'ELITE' | 'VOYAGER';

type ArchitectQuest = { type: 'EXPAND'; ca: number; vb: number; formula: string };
type ScrapperQuest = { type: 'SCRAPPER'; ca: number; vb: number; variant: 'XY' | 'X' };
type SpeedsterQuest = { type: 'SPEEDSTER'; base: number; roundBase: number; offset: number; sign: '+' | '-'; a2: number; middle: number; b2: number; target: number };
type EliteQuest = { type: 'ELITE'; C: number; V: number };
type VoyagerQuest = { type: 'DIFFERENCE'; ca: number; vb: number; expr: string; subType: 'EXPAND' | 'FACTOR' };
type QuestData = ArchitectQuest | ScrapperQuest | SpeedsterQuest | EliteQuest | VoyagerQuest;

export default function BinomialFactoryPage() {
    const { currentLanguage, setLanguage } = useAppStore();
    const t = translations[currentLanguage].binomial;

    const [questMode, setQuestMode] = useState<QuestMode>('EXPLORE');
    const [a, setA] = useState(3);
    const [b, setB] = useState(2);
    const [locked, setLocked] = useState(false);
    const [snappedBlocks, setSnappedBlocks] = useState<Record<string, boolean>>({});

    // Quest States
    const [questData, setQuestData] = useState<QuestData | null>(null);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

    const usedQuestSignaturesRef = useRef(new Map<QuestMode, Set<string>>());

    const generateQuest = (mode: QuestMode) => {
        setQuestMode(mode);
        setSnappedBlocks({});
        setLocked(false);
        setUserAnswers({}); // Clear answers for new quest

        const usedByMode = (usedQuestSignaturesRef.current.get(mode) ?? new Set<string>());
        if (usedByMode.size >= 20) usedByMode.clear();

        if (mode === 'ARCHITECT') {
            let ca = 1;
            let vb = 1;
            for (let attempt = 0; attempt < 100; attempt++) {
                ca = Math.floor(Math.random() * 8) + 1;
                vb = Math.floor(Math.random() * 15) + 1;
                const signature = `ARCHITECT|${ca}|${vb}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            usedQuestSignaturesRef.current.set(mode, usedByMode);
            setQuestData({ type: 'EXPAND', ca, vb, formula: `(${ca === 1 ? '' : ca}x + ${vb})²` });
            setUserAnswers({ a2: '', ab: '', b2: '' });
            setA(ca * 0.4 + 1.2); setB(vb * 0.25 + 0.6);
        } else if (mode === 'SCRAPPER') {
            let ca = 2;
            let vb = 2;
            let variant: 'XY' | 'X' = 'X';
            const choices = [2, 3, 4, 5, 6, 7, 8, 9, 10];
            for (let attempt = 0; attempt < 100; attempt++) {
                ca = choices[Math.floor(Math.random() * choices.length)];
                vb = choices[Math.floor(Math.random() * choices.length)];
                variant = Math.random() > 0.5 ? 'XY' : 'X';
                const signature = `SCRAPPER|${variant}|${ca}|${vb}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            usedQuestSignaturesRef.current.set(mode, usedByMode);
            setQuestData({ type: 'SCRAPPER', ca, vb, variant });
            setUserAnswers({ a: '', b: '' });
            setA(ca * 0.4 + 1.2); setB(vb * 0.25 + 0.6);
        } else if (mode === 'SPEEDSTER') {
            const roundBases = [100, 80, 70, 50, 40, 30];
            const offsets = [1, 2, 3];
            const friendlyBases = roundBases.flatMap((roundBase) => (
                offsets.flatMap((offset) => ([
                    { base: roundBase + offset, roundBase, offset, sign: '+' as const },
                    { base: roundBase - offset, roundBase, offset, sign: '-' as const },
                ]))
            )).filter((c) => c.base > 0);

            let combo = friendlyBases[Math.floor(Math.random() * friendlyBases.length)];
            for (let attempt = 0; attempt < 100; attempt++) {
                combo = friendlyBases[Math.floor(Math.random() * friendlyBases.length)];
                const signature = `SPEEDSTER|${combo.roundBase}|${combo.sign}${combo.offset}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            usedQuestSignaturesRef.current.set(mode, usedByMode);

            const signedMiddle = (combo.sign === '-' ? -1 : 1) * 2 * combo.roundBase * combo.offset;
            setQuestData({
                type: 'SPEEDSTER',
                base: combo.base,
                roundBase: combo.roundBase,
                offset: combo.offset,
                sign: combo.sign,
                a2: combo.roundBase ** 2,
                middle: signedMiddle,
                b2: combo.offset ** 2,
                target: combo.base ** 2
            });
            setUserAnswers({ part1: '', part2: '', part3: '' });
            setA(3.5); setB(combo.offset * 0.25);
        } else if (mode === 'ELITE') {
            let C = 1;
            let V = 2;
            for (let attempt = 0; attempt < 100; attempt++) {
                C = Math.floor(Math.random() * 10) + 1;
                V = Math.floor(Math.random() * 20) + 2;
                const signature = `ELITE|${C}|${V}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            usedQuestSignaturesRef.current.set(mode, usedByMode);
            setQuestData({ type: 'ELITE', C, V });
            setUserAnswers({ base: '', sub: '', add_term: '', const_term: '' });
            setA(C * 0.6 + 1.5); setB(V * 0.15 + 0.5);
        } else if (mode === 'VOYAGER') {
            let ca = 1;
            let vb = 1;
            let subType: 'EXPAND' | 'FACTOR' = 'EXPAND';
            for (let attempt = 0; attempt < 100; attempt++) {
                ca = Math.floor(Math.random() * 10) + 1;
                vb = Math.floor(Math.random() * 25) + 1;
                subType = Math.random() > 0.5 ? 'EXPAND' : 'FACTOR';
                const signature = `VOYAGER|${subType}|${ca}|${vb}`;
                if (!usedByMode.has(signature)) {
                    usedByMode.add(signature);
                    break;
                }
            }
            usedQuestSignaturesRef.current.set(mode, usedByMode);

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

    const architectQuest = questData?.type === 'EXPAND' ? questData : null;
    const scrapperQuest = questData?.type === 'SCRAPPER' ? questData : null;
    const speedsterQuest = questData?.type === 'SPEEDSTER' ? questData : null;
    const eliteQuest = questData?.type === 'ELITE' ? questData : null;
    const voyagerQuest = questData?.type === 'DIFFERENCE' ? questData : null;

    const isVerified = useMemo(() => {
        if (!questData) return false;

        if (questMode === 'ARCHITECT' && architectQuest) {
            const correctA2 = (architectQuest.ca ** 2).toString();
            const correctAB = (2 * architectQuest.ca * architectQuest.vb).toString();
            const correctB2 = (architectQuest.vb ** 2).toString();
            return userAnswers.a2 === correctA2 && userAnswers.ab === correctAB && userAnswers.b2 === correctB2;
        }

        if (questMode === 'SCRAPPER' && scrapperQuest) {
            return userAnswers.a === scrapperQuest.ca.toString() && userAnswers.b === scrapperQuest.vb.toString();
        }

        if (questMode === 'SPEEDSTER' && speedsterQuest) {
            const p1 = (speedsterQuest.a2).toString();
            const p2 = (speedsterQuest.middle).toString();
            const p3 = (speedsterQuest.b2).toString();
            return userAnswers.part1 === p1 && userAnswers.part2 === p2 && userAnswers.part3 === p3;
        }

        if (questMode === 'ELITE' && eliteQuest) {
            const correctBase = eliteQuest.C === 1 ? 'xy' : `${eliteQuest.C}xy`;
            const correctSub = eliteQuest.V.toString();
            const correctAdd = (2 * eliteQuest.C * eliteQuest.V).toString() + 'xy';
            const correctConst = (2 * eliteQuest.V ** 2).toString();

            const bOk = (userAnswers.base ?? '').toLowerCase().replace(/\s/g, '') === correctBase;
            const sOk = userAnswers.sub === correctSub;
            const aOk = (userAnswers.add_term ?? '').toLowerCase().replace(/\s/g, '') === correctAdd;
            const cOk = userAnswers.const_term === correctConst;
            return bOk && sOk && aOk && cOk;
        }

        if (questMode === 'VOYAGER' && voyagerQuest) {
            if (voyagerQuest.subType === 'FACTOR') {
                return userAnswers.a === voyagerQuest.ca.toString() && userAnswers.b === voyagerQuest.vb.toString();
            }
            const correctP1 = (voyagerQuest.ca ** 2).toString();
            const correctP2 = (voyagerQuest.vb ** 2).toString();
            return userAnswers.part1 === correctP1 && userAnswers.part2 === correctP2;
        }

        return false;
    }, [architectQuest, eliteQuest, questData, questMode, scrapperQuest, speedsterQuest, userAnswers, voyagerQuest]);

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

            {/* Standard Header */}
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
                    {(['EN', 'CN', 'DE'] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={clsx(
                                "text-[10px] font-black w-6 h-6 flex items-center justify-center rounded transition-all",
                                currentLanguage === lang
                                    ? "bg-white text-black"
                                    : "text-white/40 hover:text-white bg-white/5"
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
                    { id: 'EXPLORE', icon: Settings2, color: 'emerald' },
                    { id: 'ARCHITECT', icon: Construction, color: 'emerald' },
                    { id: 'SCRAPPER', icon: Rocket, color: 'cyan' },
                    { id: 'SPEEDSTER', icon: Zap, color: 'purple' },
                    { id: 'VOYAGER', icon: Compass, color: 'red' },
                    { id: 'ELITE', icon: Database, color: 'orange' }
                ] as const).map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => (btn.id === 'EXPLORE' ? setQuestMode('EXPLORE') : generateQuest(btn.id))}
                        className={clsx(
                            "flex flex-col items-center gap-1 px-4 py-2 border transition-all font-black min-w-[80px] relative overflow-hidden rounded",
                            questMode === btn.id
                                ? `border-white text-white bg-white/20 shadow-[0_0_25px_rgba(255,255,255,0.2)] animate-pulse`
                                : "border-white/10 text-white/90 hover:text-white hover:border-white/40"
                        )}
                    >
                        <btn.icon className="w-4 h-4" />
                        <span className="text-[10px] tracking-[0.3em] uppercase">
                            {t.tabs?.[btn.id.toLowerCase() as keyof typeof t.tabs] ?? btn.id}
                        </span>
                        {questMode === btn.id && (
                            <motion.div layoutId="nav-glow" className="absolute inset-0 bg-white/10 pointer-events-none" />
                        )}
                    </button>
                ))}
            </div>


            <div className="flex-1 flex overflow-hidden">
                {/* Main Logic Workstation */}
                <main
                    onKeyDown={handleSidebarKeyDown}
                    className="flex-1 border-r-2 border-white/10 p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto items-center"
                >
                    <div className="w-full max-w-5xl space-y-12">
                        {questMode === 'EXPLORE' ? (
                            <div className="space-y-12 py-20 flex flex-col justify-center min-h-[60vh]">
                                <h3 className="text-xl text-white uppercase tracking-[0.4em] font-black flex items-center gap-4 border-l-4 border-white pl-6">{t.params_config}</h3>
                                <div className="grid grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="flex justify-between text-base mb-3 text-white uppercase tracking-widest font-black group-hover:text-white transition-colors"><span>{t.param_a}</span><span className="text-white">{a.toFixed(1)} {t.units}</span></div>
                                        <input type="range" min="1" max="5" step="0.5" value={a} onChange={e => !locked && setA(parseFloat(e.target.value))} className="w-full accent-white h-2 bg-white/5 rounded-full appearance-none hover:bg-white/10 transition-all" />
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex justify-between text-base mb-3 text-white uppercase tracking-widest font-black group-hover:text-white transition-colors"><span>{t.param_b}</span><span className="text-white">{b.toFixed(1)} {t.units}</span></div>
                                        <input type="range" min="1" max="5" step="0.5" value={b} onChange={e => !locked && setB(parseFloat(e.target.value))} className="w-full accent-white h-2 bg-white/5 rounded-full appearance-none hover:bg-white/10 transition-all" />
                                    </div>
                                </div>
                                <button onClick={() => setLocked(!locked)} className={clsx("w-64 mx-auto py-6 border-2 text-sm font-black tracking-[0.5em] transition-all uppercase shadow-2xl block", locked ? "border-white text-white bg-white/5" : "border-white text-white bg-white/5")}>
                                    {locked ? <Unlock className="inline w-5 h-5 mr-3 mb-1" /> : <Lock className="inline w-5 h-5 mr-3 mb-1" />} {locked ? t.unlock : t.lock}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in slide-in-from-bottom duration-700 min-h-[65vh] flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.active_objective}</h3>
                                        <p className="text-4xl text-white font-black max-w-2xl mx-auto leading-tight italic">
                                            {questMode === 'ARCHITECT' && t.scenarios.architect_mission}
                                            {questMode === 'SCRAPPER' && t.scenarios.scrapper_mission}
                                            {questMode === 'SPEEDSTER' && t.scenarios.speedster_mission}
                                            {questMode === 'ELITE' && t.scenarios.elite_mission}
                                            {questMode === 'VOYAGER' && t.scenarios.voyager_mission}
                                        </p>
                                    </div>

                                    <div className="p-4 sm:p-8 bg-white/[0.03] border border-white/20 rounded-2xl text-center relative max-w-5xl mx-auto shadow-2xl overflow-hidden">
                                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
                                        <span className="text-[10px] text-white/60 uppercase tracking-[0.8em] font-black block mb-4">{t.target_expression}</span>
                                        <div className={clsx(
                                            "font-black italic tracking-tighter text-white block py-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]",
                                            questMode === 'VOYAGER' && voyagerQuest?.subType !== 'FACTOR'
                                                ? "whitespace-nowrap text-[clamp(1.6rem,5.2vw,5.5rem)] leading-[0.95]"
                                                : "whitespace-normal text-[clamp(2.25rem,7vw,6rem)] leading-[0.95]"
                                        )}>
                                            {questMode === 'ARCHITECT' && <span className="break-words">{architectQuest?.formula}</span>}
                                            {questMode === 'SCRAPPER' && (
                                                <div className="text-[clamp(1.75rem,5vw,3.5rem)] break-words">
                                                    {scrapperQuest?.variant === 'XY'
                                                        ? `${scrapperQuest.ca ** 2 === 1 ? '' : scrapperQuest.ca ** 2}x² + ${2 * scrapperQuest.ca * scrapperQuest.vb}xy + ${scrapperQuest.vb ** 2}y²`
                                                        : `${scrapperQuest?.ca ? (scrapperQuest.ca ** 2 === 1 ? '' : scrapperQuest.ca ** 2) : ''}x² + ${scrapperQuest ? (2 * scrapperQuest.ca * scrapperQuest.vb) : ''}x + ${scrapperQuest ? (scrapperQuest.vb ** 2) : ''}`
                                                    }
                                                </div>
                                            )}
                                            {questMode === 'ELITE' && <span className="break-words">{eliteQuest ? `${eliteQuest.C ** 2}x²y² - ${eliteQuest.V ** 2}` : ''}</span>}
                                            {questMode === 'VOYAGER' && (
                                                voyagerQuest?.subType === 'FACTOR'
                                                    ? <span className="break-words">{voyagerQuest ? `${voyagerQuest.ca ** 2}x² - ${voyagerQuest.vb ** 2}` : ''}</span>
                                                    : (
                                                        <span className="inline-block whitespace-nowrap">
                                                            {voyagerQuest ? `(${voyagerQuest.ca}x + ${voyagerQuest.vb})(${voyagerQuest.ca}x - ${voyagerQuest.vb})` : ''}
                                                        </span>
                                                    )
                                            )}
                                            {questMode === 'SPEEDSTER' && (
                                                <div className="text-[clamp(2rem,6vw,4.5rem)] flex flex-col items-center gap-6">
                                                    <div className="text-white break-words">{speedsterQuest?.base}²</div>
                                                    <div className="text-xl text-white/50 font-normal tracking-wide">{t.speedster_hint}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                </div>

                                <div className="grid grid-cols-3 gap-8 justify-center max-w-xl mx-auto">
                                    {questMode === 'ARCHITECT' && (
                                        <>
                                            <div className="flex flex-col gap-4 text-center">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">{t.ui.part_1_a2}</span>
                                                <input value={userAnswers.a2} onChange={e => setUserAnswers(v => ({ ...v, a2: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white" placeholder="?" />
                                            </div>
                                            <div className="flex flex-col gap-4 text-center">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">{t.ui.part_2_2ab}</span>
                                                <input value={userAnswers.ab} onChange={e => setUserAnswers(v => ({ ...v, ab: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white" placeholder="?" />
                                            </div>
                                            <div className="flex flex-col gap-4 text-center">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">{t.ui.part_3_b2}</span>
                                                <input value={userAnswers.b2} onChange={e => setUserAnswers(v => ({ ...v, b2: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white" placeholder="?" />
                                            </div>
                                        </>
                                    )}
                                    {questMode === 'SCRAPPER' && (
                                        <>
                                            <div className="col-span-3 mb-6">
                                                <div className="bg-white/5 border border-white/20 rounded-xl p-6 max-w-2xl mx-auto">
                                                    <div className="text-white/60 text-xs font-mono uppercase tracking-widest mb-3">{t.scrapper_step01}</div>
                                                    <div className="text-white text-2xl font-black flex items-center justify-center gap-4">
                                                        <InlineMath math={scrapperQuest?.variant === 'XY' ? `\\sqrt{${scrapperQuest.ca ** 2}x^2} = ${scrapperQuest.ca}x` : `\\sqrt{${scrapperQuest?.ca ? (scrapperQuest.ca ** 2) : ''}x^2} = ${scrapperQuest?.ca ?? ''}x`} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4 text-center col-span-1">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">{t.ui.identify_root_a}</span>
                                                <input value={userAnswers.a} onChange={e => setUserAnswers(v => ({ ...v, a: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 font-black text-2xl text-white" placeholder="?" />
                                            </div>
                                            <div className="flex items-end pb-4 justify-center text-4xl text-white font-black">+</div>
                                            <div className="flex flex-col gap-4 text-center col-span-1">
                                                <span className="text-xs text-white uppercase font-black tracking-widest">{t.ui.identify_root_b}</span>
                                                <input value={userAnswers.b} onChange={e => setUserAnswers(v => ({ ...v, b: e.target.value }))} className="w-full bg-black border-2 border-white/60 p-3 text-center outline-none focus:border-white placeholder:text-white/40 font-black text-2xl text-white" placeholder="?" />
                                            </div>
                                        </>
                                    )}
                                    {questMode === 'SPEEDSTER' && (
                                        <div className="col-span-3">
                                            <div className="h-px bg-white/40 w-full mb-10" />
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 justify-center max-w-4xl mx-auto">
                                                <input value={userAnswers.part1} onChange={e => setUserAnswers(v => ({ ...v, part1: e.target.value }))} className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white flex-shrink-0" placeholder="a²" />
                                                <span className="text-3xl font-black text-white">+</span>
                                                <input value={userAnswers.part2} onChange={e => setUserAnswers(v => ({ ...v, part2: e.target.value }))} className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white flex-shrink-0" placeholder="2ab" />
                                                <span className="text-3xl font-black text-white">+</span>
                                                <input value={userAnswers.part3} onChange={e => setUserAnswers(v => ({ ...v, part3: e.target.value }))} className="w-28 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/40 text-2xl font-black text-white flex-shrink-0" placeholder="b²" />
                                            </div>
                                        </div>
                                    )}
                                    {questMode === 'ELITE' && (
                                        <div className="col-span-3 space-y-12">
                                            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-400/30 rounded-2xl p-6 max-w-3xl mx-auto">
                                                <div className="flex items-start gap-4">
                                                    <div className="text-4xl">💡</div>
                                                    <div className="flex-1">
                                                        <div className="text-white/80 text-sm font-mono uppercase tracking-widest mb-3">{t.elite_tips_title}</div>
                                                        <div className="text-white text-lg space-y-2">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-white/60">•</span>
                                                                <InlineMath math={eliteQuest ? `\\sqrt{${eliteQuest.C ** 2}} = ${eliteQuest.C}, \\quad \\sqrt{${eliteQuest.V ** 2}} = ${eliteQuest.V}` : ''} />
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-white/60">•</span>
                                                                <span>{t.elite_tips_target} <InlineMath math={`(${eliteQuest?.C ?? ''}xy - ${eliteQuest?.V ?? ''})^2`} /></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center gap-6">
                                                <div className="text-white/60 text-xs font-mono uppercase tracking-widest mb-2">{t.ui.elite_step_1}</div>
                                                <div className="flex items-center gap-4 justify-center bg-white/10 p-8 rounded-2xl border-2 border-white/40">
                                                    <span className="text-3xl text-white font-black">(</span>
                                                    <input value={userAnswers.base} onChange={e => setUserAnswers(v => ({ ...v, base: e.target.value }))} className="w-32 bg-transparent border-b-4 border-white/60 p-2 text-center outline-none focus:border-white text-3xl text-white font-black" placeholder="Cxy" />
                                                    <span className="text-3xl text-white font-black">-</span>
                                                    <input value={userAnswers.sub} onChange={e => setUserAnswers(v => ({ ...v, sub: e.target.value }))} className="w-24 bg-transparent border-b-4 border-white/60 p-2 text-center outline-none focus:border-white text-3xl text-white font-black" placeholder="V" />
                                                    <span className="text-3xl text-white font-black">)²</span>
                                                </div>

                                                <div className="text-white/60 text-xs font-mono uppercase tracking-widest mt-4 mb-2">{t.ui.elite_step_2}</div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl text-white font-black">+</span>
                                                    <input value={userAnswers.add_term} onChange={e => setUserAnswers(v => ({ ...v, add_term: e.target.value }))} className="w-40 bg-black border-2 border-white/40 p-3 text-center outline-none focus:border-white text-xl text-white font-black" placeholder="2CVxy" />
                                                    <span className="text-2xl text-white font-black">-</span>
                                                    <input value={userAnswers.const_term} onChange={e => setUserAnswers(v => ({ ...v, const_term: e.target.value }))} className="w-32 bg-black border-2 border-white/40 p-3 text-center outline-none focus:border-white text-xl text-white font-black" placeholder="V²" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {questMode === 'VOYAGER' && (
                                        <div className="col-span-3 space-y-12">
                                            {voyagerQuest?.subType === 'FACTOR' ? (
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-3 font-black text-xl justify-center bg-white/10 p-8 rounded-2xl border-2 border-white/40 max-w-6xl mx-auto">
                                                    <span className="text-white">(</span>
                                                    <input value={userAnswers.a} onChange={e => setUserAnswers(v => ({ ...v, a: e.target.value }))} className="w-16 sm:w-24 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black flex-shrink-0" placeholder="a" />
                                                    <span className="text-white">x +</span>
                                                    <input value={userAnswers.b} onChange={e => setUserAnswers(v => ({ ...v, b: e.target.value }))} className="w-16 sm:w-24 bg-transparent border-b-4 border-white/60 text-center outline-none focus:border-white text-white font-black flex-shrink-0" placeholder="b" />
                                                    <span className="text-white">) (</span>
                                                    <span className="text-white/70 min-w-[48px] text-center">{userAnswers.a || 'a'}</span>
                                                    <span className="text-white">x -</span>
                                                    <span className="text-white/70 min-w-[48px] text-center">{userAnswers.b || 'b'}</span>
                                                    <span className="text-white">)</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-black text-4xl justify-center bg-white/10 p-10 rounded-2xl border-2 border-white/40">
                                                    <div className="flex items-center">
                                                        <input value={userAnswers.part1} onChange={e => setUserAnswers(v => ({ ...v, part1: e.target.value }))} className="w-32 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-3xl text-white" placeholder="?" />
                                                        <span className="text-white ml-2">x²</span>
                                                    </div>
                                                    <span className="text-white">-</span>
                                                    <div className="flex items-center">
                                                        <input value={userAnswers.part2} onChange={e => setUserAnswers(v => ({ ...v, part2: e.target.value }))} className="w-32 bg-black border-2 border-white/60 p-4 text-center outline-none focus:border-white placeholder:text-white/30 font-black text-3xl text-white" placeholder="?" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center w-full mt-8">
                                    <button onClick={() => generateQuest(questMode)} className="w-64 py-4 border-2 border-white text-sm text-white hover:bg-white hover:text-black tracking-[0.4em] uppercase font-black transition-all hover:scale-[1.01] active:scale-95 shadow-lg block">{t.ui.execute_next_sequence}</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-4 w-full max-w-4xl">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2"><Settings2 className="w-4 h-4 text-white" /><span className="text-[10px] uppercase tracking-[0.2em] font-black text-white underline underline-offset-[6px] decoration-white decoration-2">{t.ui.logic_lattice_title}</span></div>
                            <div className="p-5 bg-white/[0.03] border-2 border-white/10 rounded-lg font-mono text-xs space-y-3 hover:border-white/20 transition-all">
                                {questMode === 'ARCHITECT' && (
                                    <>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">{t.ui.logic_architect_step_1}</div>
                                        <div className="text-white font-black">{architectQuest ? `${architectQuest.ca}x (${architectQuest.ca}x + ${architectQuest.vb}) + ${architectQuest.vb} (${architectQuest.ca}x + ${architectQuest.vb})` : ''}</div>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">{t.ui.logic_architect_step_2}</div>
                                        <div className="text-white font-black">{architectQuest ? `(${architectQuest.ca * architectQuest.ca}x²) + (${architectQuest.ca * architectQuest.vb}x) + (${architectQuest.vb * architectQuest.ca}x) + (${architectQuest.vb * architectQuest.vb})` : ''}</div>
                                    </>
                                )}
                                {questMode === 'SCRAPPER' && (
                                    <>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">{t.ui.logic_scrapper_step_1}</div>
                                        <div className="text-white font-black">{scrapperQuest ? `√(${scrapperQuest.ca * scrapperQuest.ca})x² = ${scrapperQuest.ca}x` : ''}</div>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">{t.ui.logic_scrapper_step_2}</div>
                                        <div className="text-white font-black">{scrapperQuest ? `2 * (${scrapperQuest.ca}x) * (${scrapperQuest.vb}) = ${2 * scrapperQuest.ca * scrapperQuest.vb}x` : ''}</div>
                                    </>
                                )}
                                {questMode === 'VOYAGER' && (
                                    <>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase">{t.ui.logic_voyager_axiom_title}</div>
                                        <div className="text-white font-black">{t.ui.logic_voyager_axiom_body}</div>
                                        <div className="text-white/40 text-[9px] tracking-[0.1em] font-black uppercase mt-1">{t.ui.logic_voyager_derivation_title}</div>
                                        <div className="text-white font-black">A² + AB - AB - B² ≡ A² - B²</div>
                                    </>
                                )}
                                {!['ARCHITECT', 'SCRAPPER', 'VOYAGER'].includes(questMode) && (
                                    <div className="text-white/20 italic text-[10px] py-8 text-center uppercase tracking-[0.3em] font-black">{t.ui.link_established}</div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2"><Info className="w-4 h-4 text-white" /><span className="text-[10px] uppercase tracking-[0.2em] font-black text-white underline underline-offset-[6px] decoration-white decoration-2">{t.ui.axiomatic_constraints_title}</span></div>
                            <p className="text-xs text-white/70 leading-relaxed font-mono italic font-black bg-white/[0.03] p-5 rounded-lg border-2 border-white/10">
                                {questMode === 'EXPLORE' && (locked ? t.instruction_solve : t.instruction_setup)}
                                {questMode === 'ARCHITECT' && t.ui.constraints_architect}
                                {questMode === 'SCRAPPER' && t.ui.constraints_scrapper}
                                {questMode === 'SPEEDSTER' && t.ui.constraints_speedster}
                                {questMode === 'ELITE' && t.ui.constraints_elite}
                                {questMode === 'VOYAGER' && t.ui.constraints_voyager}
                            </p>
                        </div>
                    </div>
                </main>

                {/* Visual Monitor Area */}
                <aside className="w-[600px] relative bg-black flex flex-col border-l border-white/10">
                    <div className="p-4 border-b border-white/10 text-[9px] uppercase tracking-[0.4em] text-white/50 font-black flex justify-between items-center">
                        <span>{t.ui.visual_reference_position}</span>
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
                                    {questMode === 'ARCHITECT' ? architectQuest?.formula :
                                        questMode === 'SCRAPPER' ? (scrapperQuest ? (scrapperQuest.variant === 'XY'
                                            ? `${scrapperQuest.ca ** 2 === 1 ? '' : scrapperQuest.ca ** 2}x² + ${2 * scrapperQuest.ca * scrapperQuest.vb}xy + ${scrapperQuest.vb ** 2}y²`
                                            : `${scrapperQuest.ca ** 2 === 1 ? '' : scrapperQuest.ca ** 2}x² + ${2 * scrapperQuest.ca * scrapperQuest.vb}x + ${scrapperQuest.vb ** 2}`) : '') :
                                            questMode === 'ELITE' ? (eliteQuest ? `${eliteQuest.C ** 2}x²y² - ${eliteQuest.V ** 2}` : '') :
                                                questMode === 'VOYAGER' ? voyagerQuest?.expr : t.terms.target_plus}
                                </Text>

                                <DraggableBlock
                                    id="a2" width={a} height={a} color="#00ff9d"
                                    label={questMode === 'ARCHITECT' ? (architectQuest ? `${architectQuest.ca ** 2}x²` : '') : questMode === 'SCRAPPER' ? (scrapperQuest ? `${scrapperQuest.ca ** 2 === 1 ? '' : scrapperQuest.ca ** 2}x²` : '') : questMode === 'ELITE' ? (eliteQuest ? `${eliteQuest.C ** 2}x²y²` : '') : questMode === 'VOYAGER' ? (voyagerQuest ? `${voyagerQuest.ca ** 2}x²` : '') : t.terms.a2}
                                    initialPos={initialPositions.a2} targetPos={targetPositions.a2} containerSize={targetSize}
                                    locked={!locked && questMode === 'EXPLORE'} onSnap={(id, s) => setSnappedBlocks(p => ({ ...p, [id]: s }))}
                                />
                                <DraggableBlock
                                    id="b2" width={b} height={b} color="#00d2ff"
                                    label={questMode === 'ARCHITECT' ? (architectQuest ? `${architectQuest.vb ** 2}` : '') : questMode === 'SCRAPPER' ? (scrapperQuest ? `${scrapperQuest.vb ** 2}${scrapperQuest.variant === 'XY' ? 'y²' : ''}` : '') : questMode === 'ELITE' ? (eliteQuest ? `${eliteQuest.V ** 2}` : '') : questMode === 'VOYAGER' ? (voyagerQuest ? `${voyagerQuest.vb ** 2}` : '') : t.terms.b2}
                                    initialPos={initialPositions.b2} targetPos={targetPositions.b2} containerSize={targetSize}
                                    locked={!locked && questMode === 'EXPLORE'} onSnap={(id, s) => setSnappedBlocks(p => ({ ...p, [id]: s }))}
                                />
                                <DraggableBlock
                                    id="ab1" width={b} height={a} color="#ffa500"
                                    label={questMode === 'ARCHITECT' ? (architectQuest ? `${architectQuest.ca * architectQuest.vb}x` : '') : questMode === 'SCRAPPER' ? (scrapperQuest ? `${scrapperQuest.ca * scrapperQuest.vb}${scrapperQuest.variant === 'XY' ? 'xy' : 'x'}` : '') : questMode === 'ELITE' ? (eliteQuest ? `${eliteQuest.C * eliteQuest.V}xy` : '') : questMode === 'VOYAGER' ? (voyagerQuest ? `${voyagerQuest.ca * voyagerQuest.vb}x` : '') : t.terms.ab}
                                    initialPos={initialPositions.ab1} targetPos={targetPositions.ab1} containerSize={targetSize}
                                    locked={!locked && questMode === 'EXPLORE'} onSnap={(id, s) => setSnappedBlocks(p => ({ ...p, [id]: s }))}
                                />
                                <DraggableBlock
                                    id="ab2" width={a} height={b} color="#ffa500"
                                    label={questMode === 'ARCHITECT' ? (architectQuest ? `${architectQuest.ca * architectQuest.vb}x` : '') : questMode === 'SCRAPPER' ? (scrapperQuest ? `${scrapperQuest.ca * scrapperQuest.vb}${scrapperQuest.variant === 'XY' ? 'xy' : 'x'}` : '') : questMode === 'ELITE' ? (eliteQuest ? `${eliteQuest.C * eliteQuest.V}xy` : '') : questMode === 'VOYAGER' ? (voyagerQuest ? `${voyagerQuest.ca * voyagerQuest.vb}x` : '') : t.terms.ab}
                                    initialPos={initialPositions.ab2} targetPos={targetPositions.ab2} containerSize={targetSize}
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
                                        <button onClick={() => questMode !== 'EXPLORE' ? generateQuest(questMode) : setSnappedBlocks({})} className="w-full py-3 bg-neon-green/10 text-neon-green border border-neon-green hover:bg-neon-green text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-black">{t.ui.continue_operation}</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {questMode !== 'EXPLORE' && (
                        <div className="p-4 bg-white/[0.02] border-t-2 border-white/10 text-[9px] font-black text-white/40 uppercase tracking-[0.4em] flex justify-between items-center">
                            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_10px_#00ff9d]" /> {t.ui.status_operational}</div>
                            <div className="flex items-center gap-4">
                                <span>{t.ui.fps}: 60.0</span>
                                <span>{t.ui.latency}: 2ms</span>
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
                <span>{t.ui.footer_left}</span>
                <span className="flex items-center gap-2"><div className={clsx("w-1 h-1 rounded-full animate-ping", isSuccess ? "bg-neon-green" : "bg-orange-500")} />{isSuccess ? t.ui.verified : t.ui.simulating}</span>
            </footer>
        </div >
    );
}
