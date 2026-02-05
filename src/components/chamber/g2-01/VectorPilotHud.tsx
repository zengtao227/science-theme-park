"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Line, Text } from "@react-three/drei";
import * as THREE from "three";

type Stage = "NAVIGATION" | "DOT_PRODUCT" | "MISSION";

interface VectorPilotHudProps {
  stage: Stage;
  from: [number, number, number];
  to: [number, number, number];
  vector: [number, number, number];
  assistVector?: [number, number, number];
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  amber: "#ffd166",
  muted: "#3a4658",
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function vectorMagnitude(v: [number, number, number]) {
  return Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
}

function Arrow({
  start,
  end,
  color,
  glow,
  headSize = 0.35,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  glow: string;
  headSize?: number;
}) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const headRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!headRef.current) return;
    const dir = direction.clone().normalize();
    const axis = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(axis, dir);
    headRef.current.setRotationFromQuaternion(quat);
  });

  return (
    <group>
      <Line points={[start, end]} color={color} lineWidth={3} transparent opacity={0.9} />
      <Line points={[start, end]} color={glow} lineWidth={8} transparent opacity={0.18} />
      <mesh ref={headRef} position={end}>
        <coneGeometry args={[headSize * 0.5, headSize, 16]} />
        <meshStandardMaterial color={color} emissive={glow} emissiveIntensity={0.9} metalness={0.4} roughness={0.3} />
      </mesh>
      <Text position={start.clone().add(end).multiplyScalar(0.5)} fontSize={0.16} color={color} font="/fonts/Inter-Bold.woff">
        {length.toFixed(2)}
      </Text>
    </group>
  );
}

function Drone({ vector, stage }: { vector: THREE.Vector3; stage: Stage }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = 0.5 + Math.sin(clock.elapsedTime * 0.8) * 0.15;
    const pos = vector.clone().multiplyScalar(t);
    ref.current.position.lerp(pos, 0.08);
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 1.2) * 0.1;
    ref.current.rotation.x = Math.cos(clock.elapsedTime * 1.1) * 0.06;
  });

  const color = stage === "NAVIGATION" ? palette.green : palette.cyan;
  return (
    <group ref={ref} position={vector.clone().multiplyScalar(0.5)}>
      <mesh>
        <boxGeometry args={[0.5, 0.2, 0.3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.12, 0.1, 0.12]} />
        <meshStandardMaterial color={palette.purple} emissive={palette.purple} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.35, 0, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.4]} />
        <meshStandardMaterial color={palette.muted} emissive={palette.purple} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.35, 0, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.4]} />
        <meshStandardMaterial color={palette.muted} emissive={palette.purple} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export default function VectorPilotHud({
  stage,
  from,
  to,
  vector,
  assistVector,
}: VectorPilotHudProps) {
  const scaled = useMemo(() => {
    const scale = 0.35;
    return new THREE.Vector3(vector[0] * scale, vector[1] * scale, vector[2] * scale);
  }, [vector]);

  const assist = useMemo(() => {
    if (!assistVector) return null;
    const scale = 0.35;
    return new THREE.Vector3(assistVector[0] * scale, assistVector[1] * scale, assistVector[2] * scale);
  }, [assistVector]);

  const projection = useMemo(() => {
    if (!assistVector) return null;
    const base = new THREE.Vector3(vector[0], vector[1], vector[2]);
    const baseLen = base.length();
    if (baseLen < 0.001) return new THREE.Vector3(0, 0, 0);
    const assistVec = new THREE.Vector3(assistVector[0], assistVector[1], assistVector[2]);
    const baseNorm = base.clone().divideScalar(baseLen);
    const scalar = assistVec.dot(baseNorm);
    const scale = 0.35;
    return baseNorm.multiplyScalar(scalar * scale);
  }, [assistVector, vector]);

  const corridorGlow = stage === "MISSION" ? palette.amber : palette.cyan;
  const intensity = clamp(vectorMagnitude(vector) / 10, 0.2, 1);

  return (
    <div className="relative w-full aspect-square md:aspect-video bg-[#050505] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <Canvas camera={{ position: [6, 6, 8], fov: 45 }}>
        <color attach="background" args={["#04070d"]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 8, 6]} intensity={1.1} />
        <pointLight position={[-6, -4, 4]} intensity={0.6} color={palette.cyan} />
        <Grid infiniteGrid cellSize={1} sectionSize={4} cellColor="#0d1a2a" sectionColor="#24334a" fadeDistance={18} fadeStrength={1.2} />
        <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.1}>
          <Line points={[new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]} color={palette.muted} lineWidth={1} />
          <Line points={[new THREE.Vector3(0, -6, 0), new THREE.Vector3(0, 6, 0)]} color={palette.muted} lineWidth={1} />
          <Line points={[new THREE.Vector3(0, 0, -6), new THREE.Vector3(0, 0, 6)]} color={palette.muted} lineWidth={1} />
          <Arrow start={new THREE.Vector3(0, 0, 0)} end={scaled} color={palette.green} glow={palette.cyan} />
          {assist && (
            <Arrow start={new THREE.Vector3(0, 0, 0)} end={assist} color={palette.purple} glow={palette.cyan} headSize={0.3} />
          )}
          {projection && assist && (
            <>
              <Arrow start={new THREE.Vector3(0, 0, 0)} end={projection} color={corridorGlow} glow={palette.amber} headSize={0.26} />
              <Line points={[assist, projection]} color={palette.amber} lineWidth={2} transparent opacity={0.4} />
            </>
          )}
          <mesh position={[0, -0.2, -0.6]}>
            <boxGeometry args={[6.5, 0.1, 3]} />
            <meshStandardMaterial color="#0b1220" emissive={palette.cyan} emissiveIntensity={0.08 + intensity * 0.2} />
          </mesh>
          <Drone vector={scaled} stage={stage} />
        </Float>
        <Text position={[-4.8, 3.2, 0]} fontSize={0.22} color={palette.cyan} font="/fonts/Inter-Bold.woff">
          VECTOR PILOT HUD
        </Text>
      </Canvas>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/50 space-y-1">
        <div>FROM: [{from.join(", ")}]</div>
        <div>TO: [{to.join(", ")}]</div>
        <div>VEC: [{vector.join(", ")}]</div>
        {assistVector && <div>ASSIST: [{assistVector.join(", ")}]</div>}
      </div>
      <div className="absolute top-3 right-3 text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">
        {stage}
      </div>
    </div>
  );
}
