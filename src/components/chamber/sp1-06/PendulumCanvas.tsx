"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface PendulumCanvasProps {
    length: number; // in meters
    initialAngle: number; // in radians
    gravity: number; // m/s^2
    damping: number; // damping coefficient
    showPhaseSpace: boolean;
    showEnergy: boolean;
}

function Pendulum({ length, initialAngle, gravity, damping, onUpdate }: PendulumCanvasProps & { onUpdate: (theta: number, omega: number, time: number) => void }) {
    const bobRef = useRef<THREE.Mesh>(null);
    const rodRef = useRef<THREE.Line>(null!);
    const [theta, setTheta] = useState(initialAngle);
    const [omega, setOmega] = useState(0); // angular velocity
    const [time, setTime] = useState(0);

    useFrame((_, delta) => {
        // Nonlinear pendulum equation: d^2θ/dt^2 = -(g/L)sin(θ) - γ(dθ/dt)
        // Using Runge-Kutta 4th order for accuracy
        const dt = Math.min(delta, 0.016); // Cap at 60 FPS

        const f = (th: number, om: number) => {
            const alpha = -(gravity / length) * Math.sin(th) - damping * om;
            return alpha;
        };

        // RK4 integration
        const k1_theta = omega;
        const k1_omega = f(theta, omega);

        const k2_theta = omega + 0.5 * dt * k1_omega;
        const k2_omega = f(theta + 0.5 * dt * k1_theta, omega + 0.5 * dt * k1_omega);

        const k3_theta = omega + 0.5 * dt * k2_omega;
        const k3_omega = f(theta + 0.5 * dt * k2_theta, omega + 0.5 * dt * k2_omega);

        const k4_theta = omega + dt * k3_omega;
        const k4_omega = f(theta + dt * k3_theta, omega + dt * k3_omega);

        const newTheta = theta + (dt / 6) * (k1_theta + 2 * k2_theta + 2 * k3_theta + k4_theta);
        const newOmega = omega + (dt / 6) * (k1_omega + 2 * k2_omega + 2 * k3_omega + k4_omega);

        setTheta(newTheta);
        setOmega(newOmega);
        setTime((t) => t + dt);

        // Update 3D visualization
        if (bobRef.current && rodRef.current) {
            const x = length * Math.sin(newTheta);
            const y = -length * Math.cos(newTheta);

            bobRef.current.position.set(x, y, 0);

            // Update rod
            const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, 0)];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            rodRef.current.geometry.dispose();
            rodRef.current.geometry = geometry;
        }

        onUpdate(newTheta, newOmega, time);
    });

    // Initial position
    const x = length * Math.sin(theta);
    const y = -length * Math.cos(theta);

    return (
        <group>
            {/* Pivot point */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshPhysicalMaterial color="#ffd166" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Rod */}
            <line ref={rodRef as any}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        args={[new Float32Array([0, 0, 0, x, y, 0]), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#00e5ff" linewidth={2} />
            </line>

            {/* Bob */}
            <mesh ref={bobRef} position={[x, y, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshPhysicalMaterial
                    color="#ff2d7d"
                    emissive="#ff2d7d"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Arc showing initial angle */}
            <mesh position={[0, 0, -0.1]}>
                <ringGeometry args={[length * 0.8, length * 0.85, 32, 1, -Math.PI / 2, initialAngle]} />
                <meshBasicMaterial color="#39ff14" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

function PendulumScene(props: PendulumCanvasProps & { onUpdate: (theta: number, omega: number, time: number) => void }) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />

            <Pendulum {...props} />

            {/* Reference line (vertical) */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        args={[new Float32Array([0, 0, 0, 0, -props.length * 1.2, 0]), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#ffffff" opacity={0.3} transparent linewidth={1} />
            </line>

            {/* Grid */}
            <gridHelper args={[10, 10, "#00e5ff", "#003344"]} position={[0, -props.length - 1, 0]} />
        </>
    );
}

export default function PendulumCanvas(props: PendulumCanvasProps) {
    const [theta, setTheta] = useState(props.initialAngle);
    const [omega, setOmega] = useState(0);
    const [time, setTime] = useState(0);

    // Responsive canvas state
    const [phaseSize, setPhaseSize] = useState({ width: 800, height: 192 });
    const [energySize, setEnergySize] = useState({ width: 800, height: 128 });
    const phaseContainerRef = useRef<HTMLDivElement>(null);
    const energyContainerRef = useRef<HTMLDivElement>(null);

    const phaseCanvasRef = useRef<HTMLCanvasElement>(null);
    const energyCanvasRef = useRef<HTMLCanvasElement>(null);
    const phaseHistory = useRef<Array<[number, number]>>([]);
    const energyHistory = useRef<Array<{ t: number; ke: number; pe: number }>>([]);

    // Resize Observers
    useEffect(() => {
        const observers: ResizeObserver[] = [];

        if (phaseContainerRef.current) {
            const obs = new ResizeObserver(entries => {
                const { width, height } = entries[0].contentRect;
                setPhaseSize({ width, height });
            });
            obs.observe(phaseContainerRef.current);
            observers.push(obs);
        }

        if (energyContainerRef.current) {
            const obs = new ResizeObserver(entries => {
                const { width, height } = entries[0].contentRect;
                setEnergySize({ width, height });
            });
            obs.observe(energyContainerRef.current);
            observers.push(obs);
        }

        return () => observers.forEach(o => o.disconnect());
    }, [props.showPhaseSpace, props.showEnergy]);

    const handleUpdate = (newTheta: number, newOmega: number, newTime: number) => {
        setTheta(newTheta);
        setOmega(newOmega);
        setTime(newTime);

        // Store phase space data
        phaseHistory.current.push([newTheta, newOmega]);
        if (phaseHistory.current.length > 500) {
            phaseHistory.current.shift();
        }

        // Calculate energies
        const mass = 1; // kg
        const ke = 0.5 * mass * props.length * props.length * newOmega * newOmega;
        const pe = mass * props.gravity * props.length * (1 - Math.cos(newTheta));

        energyHistory.current.push({ t: newTime, ke, pe });
        if (energyHistory.current.length > 200) {
            energyHistory.current.shift();
        }
    };

    // Draw phase space diagram
    useEffect(() => {
        if (!props.showPhaseSpace || !phaseCanvasRef.current) return;

        const canvas = phaseCanvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = "#003344";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * canvas.width;
            const y = (i / 10) * canvas.height;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = "#00e5ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Draw phase trajectory
        if (phaseHistory.current.length > 1) {
            ctx.strokeStyle = "#39ff14";
            ctx.lineWidth = 2;
            ctx.beginPath();

            phaseHistory.current.forEach(([th, om], i) => {
                const x = canvas.width / 2 + (th / Math.PI) * (canvas.width / 2);
                const y = canvas.height / 2 - (om / 5) * (canvas.height / 2);

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();

            // Draw current point
            const [lastTheta, lastOmega] = phaseHistory.current[phaseHistory.current.length - 1];
            const x = canvas.width / 2 + (lastTheta / Math.PI) * (canvas.width / 2);
            const y = canvas.height / 2 - (lastOmega / 5) * (canvas.height / 2);

            ctx.fillStyle = "#ff2d7d";
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Labels
        ctx.fillStyle = "#00e5ff";
        ctx.font = "12px monospace";
        ctx.fillText("θ", canvas.width - 20, canvas.height / 2 - 10);
        ctx.fillText("ω", canvas.width / 2 + 10, 20);
    }, [theta, omega, props.showPhaseSpace, phaseSize]);

    // Draw energy diagram
    useEffect(() => {
        if (!props.showEnergy || !energyCanvasRef.current) return;

        const canvas = energyCanvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = "#003344";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * canvas.height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        if (energyHistory.current.length > 1) {
            const maxEnergy = Math.max(...energyHistory.current.map((e) => e.ke + e.pe)) * 1.2;

            // Draw KE
            ctx.strokeStyle = "#ff2d7d";
            ctx.lineWidth = 2;
            ctx.beginPath();
            energyHistory.current.forEach((e, i) => {
                const x = (i / energyHistory.current.length) * canvas.width;
                const y = canvas.height - (e.ke / maxEnergy) * canvas.height;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Draw PE
            ctx.strokeStyle = "#00e5ff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            energyHistory.current.forEach((e, i) => {
                const x = (i / energyHistory.current.length) * canvas.width;
                const y = canvas.height - (e.pe / maxEnergy) * canvas.height;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Draw total
            ctx.strokeStyle = "#39ff14";
            ctx.lineWidth = 2;
            ctx.beginPath();
            energyHistory.current.forEach((e, i) => {
                const x = (i / energyHistory.current.length) * canvas.width;
                const y = canvas.height - ((e.ke + e.pe) / maxEnergy) * canvas.height;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
        }

        // Labels
        ctx.fillStyle = "#ff2d7d";
        ctx.font = "12px monospace";
        ctx.fillText("KE", 10, 20);
        ctx.fillStyle = "#00e5ff";
        ctx.fillText("PE", 10, 40);
        ctx.fillStyle = "#39ff14";
        ctx.fillText("Total", 10, 60);
    }, [time, props.showEnergy, energySize]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <color attach="background" args={["#000000"]} />
                    <PendulumScene {...props} onUpdate={handleUpdate} />
                    <OrbitControls enablePan={false} enableZoom={true} enableRotate={false} />
                </Canvas>
            </div>

            {props.showPhaseSpace && (
                <div className="h-48 border-t border-cyan-500" ref={phaseContainerRef}>
                    <canvas ref={phaseCanvasRef} width={phaseSize.width} height={phaseSize.height} className="w-full h-full block" />
                </div>
            )}

            {props.showEnergy && (
                <div className="h-32 border-t border-green-500" ref={energyContainerRef}>
                    <canvas ref={energyCanvasRef} width={energySize.width} height={energySize.height} className="w-full h-full block" />
                </div>
            )}
        </div>
    );
}
