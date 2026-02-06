"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface WaveCanvasProps {
    amplitude: number;
    frequency: number;
    waveSpeed: number;
    showParticles: boolean;
    waveType: "transverse" | "longitudinal";
}

function TransverseWave({
    amplitude,
    frequency,
    waveSpeed,
    showParticles,
}: Omit<WaveCanvasProps, "waveType">) {
    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const [time, setTime] = useState(0);

    const particleCount = 50;
    const waveLength = 2 * Math.PI;
    const k = (2 * Math.PI) / waveLength; // wave number
    const omega = 2 * Math.PI * frequency; // angular frequency

    // Wave line points
    const wavePoints = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const x = (i / 100) * 10 - 5;
            points.push(new THREE.Vector3(x, 0, 0));
        }
        return points;
    }, []);

    useFrame((state, delta) => {
        setTime((prev) => prev + delta * waveSpeed);

        if (particlesRef.current) {
            const dummy = new THREE.Object3D();
            for (let i = 0; i < particleCount; i++) {
                const x = (i / particleCount) * 10 - 5;
                const y = amplitude * Math.sin(k * x - omega * time);
                dummy.position.set(x, y, 0);
                dummy.updateMatrix();
                particlesRef.current.setMatrixAt(i, dummy.matrix);
            }
            particlesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    // Calculate current wave shape for line
    const currentWavePoints = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const x = (i / 100) * 10 - 5;
            const y = amplitude * Math.sin(k * x - omega * time);
            points.push(new THREE.Vector3(x, y, 0));
        }
        return points;
    }, [amplitude, k, omega, time]);

    return (
        <group>
            <Line points={wavePoints} color="#444444" lineWidth={1} dashed dashScale={20} />
            <Line points={currentWavePoints} color="#00e5ff" lineWidth={2} />

            {showParticles && (
                <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} />
                </instancedMesh>
            )}

            <Line
                points={[new THREE.Vector3(-5.5, amplitude, 0), new THREE.Vector3(-5.5, -amplitude, 0)]}
                color="#ffd166"
                lineWidth={2}
            />
            <Text position={[-6, amplitude / 2, 0]} fontSize={0.2} color="#ffd166" anchorX="right">
                A
            </Text>

            <Line
                points={[
                    new THREE.Vector3(-4, -amplitude - 0.5, 0),
                    new THREE.Vector3(-4 + waveLength, -amplitude - 0.5, 0),
                ]}
                color="#a855f7"
                lineWidth={2}
            />
            <Text
                position={[-4 + waveLength / 2, -amplitude - 0.7, 0]}
                fontSize={0.2}
                color="#a855f7"
                anchorX="center"
            >
                λ
            </Text>
        </group>
    );
}

function LongitudinalWave({
    amplitude,
    frequency,
    waveSpeed,
}: Omit<WaveCanvasProps, "waveType" | "showParticles">) {
    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const timeRef = useRef(0);

    const particleCount = 80;
    const k = 1; // wave number
    const omega = 2 * Math.PI * frequency;

    useFrame((state, delta) => {
        timeRef.current += delta * waveSpeed;

        if (particlesRef.current) {
            const dummy = new THREE.Object3D();
            for (let i = 0; i < particleCount; i++) {
                const x0 = (i / particleCount) * 10 - 5;
                const displacement = amplitude * Math.sin(k * x0 - omega * timeRef.current);
                const x = x0 + displacement;
                dummy.position.set(x, 0, 0);
                dummy.scale.setScalar(0.8 + Math.abs(displacement) * 0.5);
                dummy.updateMatrix();
                particlesRef.current.setMatrixAt(i, dummy.matrix);
            }
            particlesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* Reference line */}
            <Line
                points={[new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)]}
                color="#444444"
                lineWidth={1}
                dashed
                dashScale={20}
            />

            {/* Particles */}
            <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.5} />
            </instancedMesh>

            {/* Compression/Rarefaction labels */}
            <Text position={[-3, 0.8, 0]} fontSize={0.15} color="#39ff14" anchorX="center">
                Compression
            </Text>
            <Text position={[0, 0.8, 0]} fontSize={0.15} color="#39ff14" anchorX="center">
                Rarefaction
            </Text>
        </group>
    );
}

function Scene(props: WaveCanvasProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />

            {props.waveType === "transverse" ? (
                <TransverseWave
                    amplitude={props.amplitude}
                    frequency={props.frequency}
                    waveSpeed={props.waveSpeed}
                    showParticles={props.showParticles}
                />
            ) : (
                <LongitudinalWave
                    amplitude={props.amplitude}
                    frequency={props.frequency}
                    waveSpeed={props.waveSpeed}
                />
            )}

            <OrbitControls enableRotate={false} enablePan={false} />
        </>
    );
}

export default function WaveCanvas(props: WaveCanvasProps) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Scene {...props} />
            </Canvas>
        </div>
    );
}
