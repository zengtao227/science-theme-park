"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface P202CircuitCanvasProps {
  scenario: "series" | "parallel" | "mixed" | "simple";
  voltage: number;
  resistance: number[];
  current?: number;
  isPowered?: boolean;
  showCurrent?: boolean;
}

type PathData = {
  points: THREE.Vector3[];
  lengths: number[];
  total: number;
};

const neon = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  muted: "#7b8ca3",
};

const pseudo = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function buildPathData(points: THREE.Vector3[]) {
  const lengths: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i += 1) {
    const l = points[i].distanceTo(points[i + 1]);
    lengths.push(l);
    total += l;
  }
  return { points, lengths, total };
}

function pointOnPath(path: PathData, distance: number) {
  let d = distance;
  for (let i = 0; i < path.lengths.length; i += 1) {
    const seg = path.lengths[i];
    if (d <= seg) {
      const start = path.points[i];
      const end = path.points[i + 1];
      const t = seg === 0 ? 0 : d / seg;
      return new THREE.Vector3(
        start.x + (end.x - start.x) * t,
        start.y + (end.y - start.y) * t,
        start.z + (end.z - start.z) * t
      );
    }
    d -= seg;
  }
  return path.points[path.points.length - 1].clone();
}

function Wire({ points, powered }: { points: THREE.Vector3[]; powered: boolean }) {
  const color = powered ? neon.green : "rgba(255,255,255,0.25)";
  return (
    <group>
      <Line points={points} color={color} lineWidth={2.5} transparent opacity={0.8} />
      <Line points={points} color={color} lineWidth={6} transparent opacity={0.12} />
    </group>
  );
}

function Resistor({ position, value, powered }: { position: [number, number, number]; value: number; powered: boolean }) {
  const bodyColor = powered ? neon.cyan : "#3d4a5d";
  const bandColor = powered ? neon.purple : "#526076";
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 1.2, 18]} />
        <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={powered ? 0.4 : 0.1} metalness={0.6} roughness={0.3} />
      </mesh>
      {[-0.25, 0, 0.25].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.2, 0.04, 8, 16]} />
          <meshStandardMaterial color={bandColor} emissive={bandColor} emissiveIntensity={powered ? 0.8 : 0.2} metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
      <Text position={[0, -0.45, 0.2]} fontSize={0.18} color={powered ? neon.cyan : neon.muted} font="/fonts/Inter-Bold.woff">
        {`${value.toFixed(1)}Ω`}
      </Text>
    </group>
  );
}

function Battery({ position, voltage, powered }: { position: [number, number, number]; voltage: number; powered: boolean }) {
  const bodyColor = powered ? neon.purple : "#39404b";
  const glowColor = powered ? neon.cyan : "#5c6b7a";
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 1.6, 24]} />
        <meshStandardMaterial color={bodyColor} emissive={glowColor} emissiveIntensity={powered ? 0.7 : 0.1} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0.85, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={powered ? 1 : 0.1} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.85, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={powered ? 1 : 0.1} metalness={0.8} roughness={0.2} />
      </mesh>
      <Text position={[0, -0.6, 0.2]} fontSize={0.18} color={powered ? neon.purple : neon.muted} font="/fonts/Inter-Bold.woff">
        {`${voltage}V`}
      </Text>
    </group>
  );
}

function Led({ position, powered }: { position: [number, number, number]; powered: boolean }) {
  const glowColor = powered ? neon.green : "#3b3f45";
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshPhysicalMaterial
          color="#b5f3ff"
          transmission={0.7}
          thickness={0.5}
          roughness={0.15}
          metalness={0.2}
          emissive={glowColor}
          emissiveIntensity={powered ? 1.2 : 0.1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={powered ? 2.2 : 0.2} />
      </mesh>
      {powered && <pointLight color={glowColor} intensity={1.5} distance={3} />}
      <Text position={[0, -0.45, 0.2]} fontSize={0.16} color={powered ? neon.green : neon.muted} font="/fonts/Inter-Bold.woff">
        LED
      </Text>
    </group>
  );
}

function FlowParticles({
  paths,
  current,
  powered,
}: {
  paths: THREE.Vector3[][];
  current: number;
  powered: boolean;
}) {
  const data = useMemo(() => paths.map(buildPathData), [paths]);
  const particlesPerPath = 12;
  const totalInstances = data.length * particlesPerPath;
  const offsets = useMemo(() => Array.from({ length: totalInstances }, (_, i) => pseudo(i + 1)), [totalInstances]);
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const speed = powered && current > 0 ? Math.min(3, current) * 0.6 : 0;
    mesh.visible = speed > 0;
    if (speed === 0) return;
    let idx = 0;
    const t = clock.elapsedTime * speed;
    for (let p = 0; p < data.length; p += 1) {
      const path = data[p];
      for (let i = 0; i < particlesPerPath; i += 1) {
        const offset = offsets[idx];
        const dist = ((t + offset) % 1) * path.total;
        const pos = pointOnPath(path, dist);
        dummy.position.set(pos.x, pos.y, pos.z);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);
        idx += 1;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, totalInstances]}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial color="#ffe66d" emissive="#ffe66d" emissiveIntensity={1.6} transparent opacity={0.9} />
    </instancedMesh>
  );
}

function SeriesCircuit({ voltage, resistance, current, powered }: { voltage: number; resistance: number[]; current: number; powered: boolean }) {
  const leftX = -3.2;
  const rightX = 3.2;
  const topY = 1.7;
  const bottomY = -1.7;
  const wirePath = [
    new THREE.Vector3(leftX, topY, 0),
    new THREE.Vector3(rightX, topY, 0),
    new THREE.Vector3(rightX, bottomY, 0),
    new THREE.Vector3(leftX, bottomY, 0),
    new THREE.Vector3(leftX, topY, 0),
  ];
  const resistorSpacing = (rightX - leftX) / (resistance.length + 1);
  return (
    <group>
      <Wire points={wirePath} powered={powered} />
      <Battery position={[leftX, 0, 0]} voltage={voltage} powered={powered} />
      <Led position={[0, topY, 0]} powered={powered} />
      {resistance.map((r, i) => (
        <Resistor key={`${r}-${i}`} position={[leftX + resistorSpacing * (i + 1), topY, 0]} value={r} powered={powered} />
      ))}
      <FlowParticles paths={[wirePath]} current={current} powered={powered} />
    </group>
  );
}

function SimpleCircuit({ voltage, resistance, current, powered }: { voltage: number; resistance: number; current: number; powered: boolean }) {
  return <SeriesCircuit voltage={voltage} resistance={[resistance]} current={current} powered={powered} />;
}

function ParallelCircuit({ voltage, resistance, current, powered }: { voltage: number; resistance: number[]; current: number; powered: boolean }) {
  const leftX = -3.4;
  const rightX = 3.4;
  const nodeLeft = -1.3;
  const nodeRight = 1.3;
  const baseY = 0;
  const spacing = 1.2;
  const startY = baseY - (resistance.length - 1) * spacing * 0.5;
  const branches = resistance.map((r, i) => {
    const y = startY + i * spacing;
    return {
      y,
      value: r,
      path: [
        new THREE.Vector3(leftX, baseY, 0),
        new THREE.Vector3(nodeLeft, baseY, 0),
        new THREE.Vector3(nodeLeft, y, 0),
        new THREE.Vector3(nodeRight, y, 0),
        new THREE.Vector3(nodeRight, baseY, 0),
        new THREE.Vector3(leftX, baseY, 0),
      ],
    };
  });

  return (
    <group>
      <Wire points={[new THREE.Vector3(leftX, baseY, 0), new THREE.Vector3(rightX, baseY, 0)]} powered={powered} />
      {branches.map((branch, i) => (
        <Wire key={`branch-${i}`} points={branch.path} powered={powered} />
      ))}
      <Battery position={[leftX - 0.3, baseY, 0]} voltage={voltage} powered={powered} />
      <Led position={[rightX, baseY, 0]} powered={powered} />
      {branches.map((branch, i) => (
        <Resistor key={`r-${i}`} position={[0, branch.y, 0]} value={branch.value} powered={powered} />
      ))}
      <FlowParticles paths={branches.map((b) => b.path)} current={current} powered={powered} />
    </group>
  );
}

export default function P202CircuitCanvas({
  scenario,
  voltage,
  resistance,
  current = 0,
  isPowered = false,
  showCurrent = true,
}: P202CircuitCanvasProps) {
  const powered = isPowered && current > 0;
  const label = showCurrent ? `I = ${current.toFixed(2)} A` : "";

  return (
    <div className="relative w-full h-[420px] border border-white/10 rounded-lg bg-black/60 overflow-hidden">
      <Canvas camera={{ position: [0, 2.8, 7.6], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={["#04060b"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-4, -3, 4]} intensity={0.6} color={neon.cyan} />
        <Grid infiniteGrid cellSize={1} sectionSize={4} cellColor="#0d1a2a" sectionColor="#1b2a44" fadeDistance={15} fadeStrength={1.2} />
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          {scenario === "parallel" && (
            <ParallelCircuit voltage={voltage} resistance={resistance} current={current} powered={powered} />
          )}
          {scenario === "series" && (
            <SeriesCircuit voltage={voltage} resistance={resistance} current={current} powered={powered} />
          )}
          {scenario === "mixed" && (
            <SeriesCircuit voltage={voltage} resistance={resistance} current={current} powered={powered} />
          )}
          {scenario === "simple" && (
            <SimpleCircuit voltage={voltage} resistance={resistance[0] ?? 1} current={current} powered={powered} />
          )}
        </Float>
        {showCurrent && (
          <Text position={[-3.6, 2.3, 0]} fontSize={0.2} color={powered ? neon.green : neon.muted} font="/fonts/Inter-Bold.woff">
            {label}
          </Text>
        )}
      </Canvas>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 uppercase tracking-wider">
        Circuit Simulator
      </div>
    </div>
  );
}
