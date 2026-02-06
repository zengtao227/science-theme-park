"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars, Text } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface RelativityCanvasProps {
  velocityFraction?: number;
  properTimeSeconds?: number;
  restLength?: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function gammaFromBeta(beta: number) {
  const b = clamp(Math.abs(beta), 0, 0.999);
  return 1 / Math.sqrt(1 - b * b);
}

function Ring({ radius, color, progress }: { radius: number; color: string; progress: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const steps = 96;
    for (let i = 0; i <= steps; i += 1) {
      const a = (i / steps) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    }
    return pts;
  }, [radius]);

  const hand = useMemo(() => {
    const a = progress * Math.PI * 2;
    return [
      new THREE.Vector3(0, 0, 0.02),
      new THREE.Vector3(Math.cos(a) * radius * 0.9, Math.sin(a) * radius * 0.9, 0.02),
    ];
  }, [progress, radius]);

  return (
    <group>
      <Line points={points} color={color} lineWidth={3} transparent opacity={0.8} />
      <Line points={points} color={color} lineWidth={10} transparent opacity={0.14} />
      <Line points={hand} color={color} lineWidth={2} transparent opacity={0.9} />
      <mesh>
        <circleGeometry args={[radius * 0.9, 32]} />
        <meshStandardMaterial color="#070a12" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function WarpedGrid({ size = 12, divisions = 80 }: { size?: number; divisions?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseRef = useRef<Float32Array | null>(null);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const geometry = mesh.geometry as THREE.PlaneGeometry;
    const position = geometry.attributes.position as THREE.BufferAttribute;
    if (!baseRef.current) {
      baseRef.current = new Float32Array(position.array as Float32Array);
    }
    const base = baseRef.current;
    const t = clock.elapsedTime * 0.6;
    for (let i = 0; i < base.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const wave = Math.sin(x * 0.6 + t) * Math.cos(y * 0.5 - t) * 0.35;
      position.array[i + 2] = base[i + 2] + wave;
    }
    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[size, size, divisions, divisions]} />
      <meshStandardMaterial color="#08101a" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function PhotonClock({ beta, gamma }: { beta: number; gamma: number }) {
  const [linePoints, setLinePoints] = useState<THREE.Vector3[]>(() =>
    Array.from({ length: 8 }, (_, i) => new THREE.Vector3(i * 0.1, 0, 0))
  );
  const height = 2.4;
  const amplitude = 1.2 * beta;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.8;
    setLinePoints(
      Array.from({ length: 8 }, (_, i) => {
        const y = i % 2 === 0 ? -height / 2 : height / 2;
        const x = (i % 2 === 0 ? -amplitude : amplitude) + Math.sin(t + i) * 0.08;
        return new THREE.Vector3(x, y, 0);
      })
    );
  });

  return (
    <group position={[0, 0, 1.2]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.3]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.3]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} />
      </mesh>
      <Line points={linePoints} color="#39ff14" lineWidth={2} transparent opacity={0.9} />
      <Text position={[0, -height / 2 - 0.5, 0]} fontSize={0.16} color="#39ff14" font="/fonts/Inter-Bold.woff">
        {`Light path × γ=${gamma.toFixed(2)}`}
      </Text>
    </group>
  );
}

function Rocket({ restLength, gamma, beta }: { restLength: number; gamma: number; beta: number }) {
  const contracted = restLength / gamma;
  const pulse = 0.2 + beta * 0.8;
  return (
    <group position={[0, -0.8, 0]}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[restLength, 0.25, 0.25]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[contracted, 0.28, 0.28]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.35 + pulse * 0.3} />
      </mesh>
      <Text position={[-restLength * 0.5, 1.0, 0]} fontSize={0.14} color="#00e5ff" font="/fonts/Inter-Bold.woff">
        L₀
      </Text>
      <Text position={[-contracted * 0.5, 0.0, 0]} fontSize={0.14} color="#a855f7" font="/fonts/Inter-Bold.woff">
        L = L₀/γ
      </Text>
    </group>
  );
}

function Scene({
  velocityFraction = 0.99,
  properTimeSeconds = 10,
  restLength = 3,
}: RelativityCanvasProps) {
  const beta = clamp(velocityFraction, 0, 0.999);
  const gamma = gammaFromBeta(beta);
  const timeRef = useRef({ tau: 0, t: 0 });
  const [progress, setProgress] = useState({ tau: 0, t: 0 });

  useFrame((_s, delta) => {
    timeRef.current.tau += delta;
    timeRef.current.t += delta / gamma;
    setProgress({
      tau: (timeRef.current.tau % properTimeSeconds) / properTimeSeconds,
      t: (timeRef.current.t % properTimeSeconds) / properTimeSeconds,
    });
  });

  return (
    <group>
      <Stars radius={80} depth={40} count={2600} factor={3} fade speed={0.35} />
      <Float speed={0.6} rotationIntensity={0.06} floatIntensity={0.12}>
        <group position={[-2.6, 0, 0]}>
          <Ring radius={1.1} color="#00e5ff" progress={progress.tau} />
          <Text position={[0, -1.6, 0]} fontSize={0.18} color="#00e5ff" font="/fonts/Inter-Bold.woff">
            Proper Time τ
          </Text>
        </group>
        <group position={[2.6, 0, 0]}>
          <Ring radius={1.1} color="#a855f7" progress={progress.t} />
          <Text position={[0, -1.6, 0]} fontSize={0.18} color="#a855f7" font="/fonts/Inter-Bold.woff">
            Dilated Time t
          </Text>
        </group>
        <Rocket restLength={restLength} gamma={gamma} beta={beta} />
        <PhotonClock beta={beta} gamma={gamma} />
        <Text position={[-4.6, 2.5, 0]} fontSize={0.2} color="rgba(255,255,255,0.5)" font="/fonts/Inter-Bold.woff">
          {`β=${beta.toFixed(2)}  γ=${gamma.toFixed(2)}`}
        </Text>
      </Float>
      <WarpedGrid />
    </group>
  );
}

export default function RelativityCanvas(props: RelativityCanvasProps) {
  return (
    <div className="w-full h-[360px] rounded-xl border border-white/10 bg-black/70 overflow-hidden">
      <Canvas camera={{ position: [0, 0.8, 7], fov: 45 }}>
        <color attach="background" args={["#02030a"]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[6, 6, 6]} intensity={1.2} />
        <pointLight position={[-6, -4, 4]} intensity={0.8} color="#00e5ff" />
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
