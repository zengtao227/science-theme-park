"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface TitrationCanvasProps {
    acidType: "strong" | "weak";
    baseType: "strong" | "weak";
    acidConcentration: number;
    baseConcentration: number;
    volumeAdded: number;
    indicator: "phenolphthalein" | "methyl_orange" | "universal";
}

// Calculate pH for titration
function calculatePH(
    acidType: "strong" | "weak",
    baseType: "strong" | "weak",
    acidConc: number,
    baseConc: number,
    volumeAdded: number,
    initialVolume: number = 50
): number {
    const nAcid = acidConc * initialVolume / 1000; // moles
    const nBase = baseConc * volumeAdded / 1000; // moles
    const totalVolume = (initialVolume + volumeAdded) / 1000; // L

    if (acidType === "strong" && baseType === "strong") {
        // Strong acid + strong base
        if (nBase < nAcid) {
            // Excess acid
            const excessH = (nAcid - nBase) / totalVolume;
            return -Math.log10(excessH);
        } else if (nBase > nAcid) {
            // Excess base
            const excessOH = (nBase - nAcid) / totalVolume;
            const pOH = -Math.log10(excessOH);
            return 14 - pOH;
        } else {
            // Equivalence point
            return 7;
        }
    } else if (acidType === "weak" && baseType === "strong") {
        // Weak acid + strong base
        const Ka = 1.8e-5; // Acetic acid

        if (nBase < nAcid) {
            // Buffer region
            const nA = nAcid - nBase; // Remaining acid
            const nConjBase = nBase; // Conjugate base formed
            const pH = -Math.log10(Ka) + Math.log10(nConjBase / nA);
            return pH;
        } else if (nBase > nAcid) {
            // Excess base
            const excessOH = (nBase - nAcid) / totalVolume;
            const pOH = -Math.log10(excessOH);
            return 14 - pOH;
        } else {
            // Equivalence point (pH > 7 due to conjugate base)
            const conjBaseConc = nAcid / totalVolume;
            const Kb = 1e-14 / Ka;
            const OH = Math.sqrt(Kb * conjBaseConc);
            const pOH = -Math.log10(OH);
            return 14 - pOH;
        }
    }

    // Default fallback
    return 7;
}

// Get indicator color based on pH
function getIndicatorColor(pH: number, indicator: string): string {
    if (indicator === "phenolphthalein") {
        // Colorless below pH 8.2, pink above pH 10
        if (pH < 8.2) return "#ffffff";
        if (pH > 10) return "#ff2d7d";
        const t = (pH - 8.2) / (10 - 8.2);
        return new THREE.Color().lerpColors(
            new THREE.Color("#ffffff"),
            new THREE.Color("#ff2d7d"),
            t
        ).getStyle();
    } else if (indicator === "methyl_orange") {
        // Red below pH 3.1, yellow above pH 4.4
        if (pH < 3.1) return "#ff0000";
        if (pH > 4.4) return "#ffff00";
        const t = (pH - 3.1) / (4.4 - 3.1);
        return new THREE.Color().lerpColors(
            new THREE.Color("#ff0000"),
            new THREE.Color("#ffff00"),
            t
        ).getStyle();
    } else {
        // Universal indicator (full spectrum)
        if (pH < 3) return "#ff0000";
        if (pH < 5) return "#ff6600";
        if (pH < 7) return "#ffff00";
        if (pH < 9) return "#00ff00";
        if (pH < 11) return "#0000ff";
        return "#a855f7";
    }
}

// Beaker with solution
function Beaker({ pH, indicator, volumeAdded }: { pH: number; indicator: string; volumeAdded: number }) {
    const solutionColor = getIndicatorColor(pH, indicator);
    const fillLevel = Math.min(50 + volumeAdded, 100) / 100;

    return (
        <group position={[0, 0, 0]}>
            {/* Beaker glass */}
            <mesh>
                <cylinderGeometry args={[1.5, 1.5, 4, 32, 1, true]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.2}
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.9}
                    thickness={0.5}
                />
            </mesh>

            {/* Solution */}
            <mesh position={[0, -2 + fillLevel * 2, 0]}>
                <cylinderGeometry args={[1.4, 1.4, fillLevel * 4, 32]} />
                <meshPhysicalMaterial
                    color={solutionColor}
                    transparent
                    opacity={0.7}
                    emissive={solutionColor}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Bottom */}
            <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.5, 32]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>
        </group>
    );
}

// Burette
function Burette({ volumeAdded }: { volumeAdded: number }) {
    const maxVolume = 50;
    const fillLevel = 1 - (volumeAdded / maxVolume);

    return (
        <group position={[3, 2, 0]}>
            {/* Burette tube */}
            <mesh>
                <cylinderGeometry args={[0.3, 0.3, 5, 16, 1, true]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>

            {/* Base solution */}
            <mesh position={[0, -2.5 + fillLevel * 2.5, 0]}>
                <cylinderGeometry args={[0.28, 0.28, fillLevel * 5, 16]} />
                <meshPhysicalMaterial
                    color="#00e5ff"
                    transparent
                    opacity={0.6}
                    emissive="#00e5ff"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Stopcock */}
            <mesh position={[0, -2.5, 0]}>
                <boxGeometry args={[0.2, 0.4, 0.2]} />
                <meshPhysicalMaterial color="#ffd166" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Drip */}
            {volumeAdded > 0 && volumeAdded < maxVolume && (
                <mesh position={[0, -2.8, 0]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#00e5ff" />
                </mesh>
            )}
        </group>
    );
}

function TitrationScene(props: TitrationCanvasProps) {
    const pH = calculatePH(
        props.acidType,
        props.baseType,
        props.acidConcentration,
        props.baseConcentration,
        props.volumeAdded
    );

    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />

            <Beaker pH={pH} indicator={props.indicator} volumeAdded={props.volumeAdded} />
            <Burette volumeAdded={props.volumeAdded} />

            {/* Grid */}
            <gridHelper args={[10, 10, "#00e5ff", "#003344"]} position={[0, -2.5, 0]} />
        </>
    );
}

export default function TitrationCanvas(props: TitrationCanvasProps) {
    const curveCanvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const phHistoryRef = useRef<Array<{ volume: number; pH: number }>>([]);
    const [dimensions, setDimensions] = useState({ width: 800, height: 192 });

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const pH = calculatePH(
            props.acidType,
            props.baseType,
            props.acidConcentration,
            props.baseConcentration,
            props.volumeAdded
        );

        const newHistory = [...phHistoryRef.current, { volume: props.volumeAdded, pH }];
        const uniqueHistory = newHistory.filter((item, index, self) =>
            index === self.findIndex((t) => Math.abs(t.volume - item.volume) < 0.1)
        );
        phHistoryRef.current = uniqueHistory.slice(-100); // Keep last 100 points history

        const canvas = curveCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure accurate sizing
        const { width, height } = dimensions;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = "#003344";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * width;
            const y = (i / 10) * height;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = "#00e5ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.stroke();

        // Draw pH curve
        const phHistory = phHistoryRef.current;
        if (phHistory.length > 1) {
            ctx.strokeStyle = "#39ff14";
            ctx.lineWidth = 3;
            ctx.beginPath();

            phHistory.forEach((point, i) => {
                const x = (Math.max(0, Math.min(point.volume, 100)) / 100) * width;
                const y = height - (Math.max(0, Math.min(point.pH, 14)) / 14) * height;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();

            // Draw equivalence point marker
            const equivalenceVolume = 50; // Simplified
            const eqX = (equivalenceVolume / 100) * width;
            ctx.strokeStyle = "#ff2d7d";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(eqX, 0);
            ctx.lineTo(eqX, height);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Labels
        ctx.fillStyle = "#00e5ff";
        ctx.font = "12px monospace";
        ctx.fillText("pH", 10, 20);
        ctx.fillText("14", 10, 30);
        ctx.fillText("7", 10, height / 2);
        ctx.fillText("0", 10, height - 10);
        ctx.fillText("Volume (mL)", width - 100, height - 10);
    }, [props.volumeAdded, props.acidType, props.baseType, props.acidConcentration, props.baseConcentration, dimensions]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 min-h-0">
                <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                    <color attach="background" args={["#000000"]} />
                    <TitrationScene {...props} />
                    <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
                </Canvas>
            </div>

            <div className="h-48 border-t border-cyan-500" ref={containerRef}>
                <canvas
                    ref={curveCanvasRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    className="w-full h-full block"
                />
            </div>
        </div>
    );
}
