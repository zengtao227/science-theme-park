"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface RlcConfig {
  R: number;
  L: number;
  C: number;
  sourceType: "step" | "sine" | "square";
  amplitude: number;
  frequency: number;
}

interface P202CircuitCanvasProps {
  scenario: "series" | "parallel" | "mixed" | "simple" | "rlc";
  voltage: number;
  resistance: number[];
  current?: number;
  isPowered?: boolean;
  showCurrent?: boolean;
  rlc?: RlcConfig;
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

function Inductor({ position, value, powered }: { position: [number, number, number]; value: number; powered: boolean }) {
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i += 1) {
      const t = i / 40;
      const angle = t * Math.PI * 10;
      pts.push(new THREE.Vector3(Math.cos(angle) * 0.25, (t - 0.5) * 1.8, Math.sin(angle) * 0.25));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 120, 0.06, 8, false), [curve]);
  const color = powered ? neon.purple : "#3d4a5d";
  return (
    <group position={position}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={powered ? 0.6 : 0.1} metalness={0.7} roughness={0.2} />
      </mesh>
      <Text position={[0, -1.2, 0.2]} fontSize={0.16} color={powered ? neon.purple : neon.muted} font="/fonts/Inter-Bold.woff">
        {`${value.toFixed(2)}H`}
      </Text>
    </group>
  );
}

function Capacitor({ position, value, powered }: { position: [number, number, number]; value: number; powered: boolean }) {
  const color = powered ? neon.cyan : "#3d4a5d";
  return (
    <group position={position}>
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.08, 0.9, 0.4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={powered ? 0.6 : 0.1} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.08, 0.9, 0.4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={powered ? 0.6 : 0.1} metalness={0.6} roughness={0.3} />
      </mesh>
      <Text position={[0, -0.8, 0.2]} fontSize={0.16} color={powered ? neon.cyan : neon.muted} font="/fonts/Inter-Bold.woff">
        {`${value.toFixed(2)}F`}
      </Text>
    </group>
  );
}

type MeterProbe = {
  id: string;
  position: THREE.Vector3;
  voltage: number;
  current: number;
};

type RlcState = {
  t: number;
  i: number;
  q: number;
  vSource: number;
  vR: number;
  vL: number;
  vC: number;
};

function WireSegment({
  points,
  powered,
  id,
  onPick,
}: {
  points: THREE.Vector3[];
  powered: boolean;
  id: string;
  onPick: (id: string, point: THREE.Vector3) => void;
}) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 40, 0.05, 8, false), [curve]);
  const color = powered ? neon.green : "#3b4a5e";
  return (
    <group>
      <mesh geometry={geometry} onPointerDown={(e) => {
        e.stopPropagation();
        onPick(id, e.point);
      }}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={powered ? 0.5 : 0.1} metalness={0.6} roughness={0.3} />
      </mesh>
      <Line points={points} color={color} lineWidth={2.5} transparent opacity={0.6} />
    </group>
  );
}

function OscilloscopeTrace({ stateRef }: { stateRef: React.MutableRefObject<RlcState> }) {
  const lineRef = useRef<THREE.Line>(null);
  const sampleCount = 160;
  const samples = useRef<Float32Array>(new Float32Array(sampleCount));
  const cursor = useRef(0);
  const positions = useMemo(() => new Float32Array(sampleCount * 3), [sampleCount]);

  useFrame(() => {
    const v = stateRef.current.vC;
    samples.current[cursor.current] = v;
    cursor.current = (cursor.current + 1) % sampleCount;

    const scale = 0.25;
    const xStart = -2.8;
    const dx = 5.6 / (sampleCount - 1);
    for (let i = 0; i < sampleCount; i += 1) {
      const idx = (cursor.current + i) % sampleCount;
      positions[i * 3] = xStart + i * dx;
      positions[i * 3 + 1] = samples.current[idx] * scale;
      positions[i * 3 + 2] = 0;
    }
    const geometry = lineRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (geometry) {
      geometry.attributes.position.array = positions;
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 2.3, 0]}>
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={sampleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={neon.cyan} />
      </line>
      <Line points={[new THREE.Vector3(-2.9, 0, 0), new THREE.Vector3(2.9, 0, 0)]} color="#1b2a44" lineWidth={1} />
      <Line points={[new THREE.Vector3(0, -0.8, 0), new THREE.Vector3(0, 0.8, 0)]} color="#1b2a44" lineWidth={1} />
      <Text position={[-2.8, 0.9, 0]} fontSize={0.18} color={neon.muted} font="/fonts/Inter-Bold.woff">
        V(t)
      </Text>
    </group>
  );
}

function RlcCircuit({
  config,
  powered,
  stateRef,
  onProbePick,
}: {
  config: RlcConfig;
  powered: boolean;
  stateRef: React.MutableRefObject<RlcState>;
  onProbePick: (probe: MeterProbe) => void;
}) {
  const safeL = Math.max(0.05, config.L);
  const safeC = Math.max(0.05, config.C);
  const resetRef = useRef(0);

  useEffect(() => {
    stateRef.current = { t: 0, i: 0, q: 0, vSource: 0, vR: 0, vL: 0, vC: 0 };
    resetRef.current += 1;
  }, [config.R, config.L, config.C, config.sourceType, config.amplitude, config.frequency, stateRef]);

  const getSource = useCallback((t: number) => {
    if (!powered) return 0;
    if (config.sourceType === "sine") {
      return config.amplitude * Math.sin(2 * Math.PI * config.frequency * t);
    }
    if (config.sourceType === "square") {
      return config.amplitude * (Math.sin(2 * Math.PI * config.frequency * t) >= 0 ? 1 : -1);
    }
    return config.amplitude;
  }, [config, powered]);

  useFrame((_, delta) => {
    const dt = Math.min(0.02, delta);
    const steps = 4;
    const step = dt / steps;
    for (let s = 0; s < steps; s += 1) {
      const t = stateRef.current.t + step;
      const vSource = getSource(t);
      const i = stateRef.current.i;
      const q = stateRef.current.q;
      const di = (vSource - config.R * i - q / safeC) / safeL;
      const nextI = i + di * step;
      const nextQ = q + nextI * step;
      stateRef.current = {
        t,
        i: powered ? nextI : nextI * 0.98,
        q: powered ? nextQ : nextQ * 0.98,
        vSource,
        vR: config.R * nextI,
        vL: safeL * di,
        vC: nextQ / safeC,
      };
    }
  });

  const leftX = -3.5;
  const rightX = 3.5;
  const topY = 1.8;
  const bottomY = -1.8;

  const segments = [
    { id: "source", points: [new THREE.Vector3(leftX, 0.9, 0), new THREE.Vector3(leftX, topY, 0)] },
    { id: "source", points: [new THREE.Vector3(leftX, topY, 0), new THREE.Vector3(-1.4, topY, 0)] },
    { id: "afterR", points: [new THREE.Vector3(1.4, topY, 0), new THREE.Vector3(rightX, topY, 0)] },
    { id: "afterR", points: [new THREE.Vector3(rightX, topY, 0), new THREE.Vector3(rightX, 0.9, 0)] },
    { id: "afterL", points: [new THREE.Vector3(rightX, -0.9, 0), new THREE.Vector3(rightX, bottomY, 0)] },
    { id: "afterL", points: [new THREE.Vector3(rightX, bottomY, 0), new THREE.Vector3(1.0, bottomY, 0)] },
    { id: "ground", points: [new THREE.Vector3(-1.0, bottomY, 0), new THREE.Vector3(leftX, bottomY, 0)] },
    { id: "ground", points: [new THREE.Vector3(leftX, bottomY, 0), new THREE.Vector3(leftX, -0.9, 0)] },
  ];

  const getVoltageAt = useCallback((id: string) => {
    const state = stateRef.current;
    if (id === "source") return state.vSource;
    if (id === "afterR") return state.vSource - state.vR;
    if (id === "afterL") return state.vSource - state.vR - state.vL;
    return state.vSource - state.vR - state.vL - state.vC;
  }, [stateRef]);

  const handlePick = useCallback((id: string, point: THREE.Vector3) => {
    const state = stateRef.current;
    onProbePick({
      id,
      position: point.clone(),
      voltage: getVoltageAt(id),
      current: state.i,
    });
  }, [getVoltageAt, onProbePick, stateRef]);

  return (
    <group>
      {segments.map((segment, i) => (
        <WireSegment key={`${segment.id}-${i}`} points={segment.points} powered={powered} id={segment.id} onPick={handlePick} />
      ))}
      <Battery position={[leftX, 0, 0]} voltage={config.amplitude} powered={powered} />
      <Resistor position={[0, topY, 0]} value={config.R} powered={powered} />
      <Inductor position={[rightX, 0, 0]} value={config.L} powered={powered} />
      <Capacitor position={[0, bottomY, 0]} value={config.C} powered={powered} />
      <OscilloscopeTrace stateRef={stateRef} />
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
  rlc,
}: P202CircuitCanvasProps) {
  const isRlc = scenario === "rlc";
  const powered = isRlc ? isPowered : isPowered && current > 0;
  const label = showCurrent ? `I = ${current.toFixed(2)} A` : "";
  const rlcStateRef = useRef<RlcState>({ t: 0, i: 0, q: 0, vSource: 0, vR: 0, vL: 0, vC: 0 });
  const [probeA, setProbeA] = useState<MeterProbe | null>(null);
  const [probeB, setProbeB] = useState<MeterProbe | null>(null);
  const [meterMode, setMeterMode] = useState<"voltage" | "current">("voltage");

  const handleProbePick = useCallback((probe: MeterProbe) => {
    if (!probeA || probeB) {
      setProbeA(probe);
      setProbeB(null);
      return;
    }
    setProbeB(probe);
  }, [probeA, probeB]);

  const meterValue = useMemo(() => {
    if (!probeA || !probeB) return null;
    if (meterMode === "current") return probeA.current;
    return probeA.voltage - probeB.voltage;
  }, [meterMode, probeA, probeB]);

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
          {scenario === "rlc" && rlc && (
            <RlcCircuit config={rlc} powered={powered} stateRef={rlcStateRef} onProbePick={handleProbePick} />
          )}
        </Float>
        {showCurrent && (
          <Text position={[-3.6, 2.3, 0]} fontSize={0.2} color={powered ? neon.green : neon.muted} font="/fonts/Inter-Bold.woff">
            {label}
          </Text>
        )}
        {scenario === "rlc" && probeA && (
          <mesh position={[probeA.position.x, probeA.position.y, probeA.position.z + 0.1]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={neon.green} emissive={neon.green} emissiveIntensity={1.4} />
          </mesh>
        )}
        {scenario === "rlc" && probeB && (
          <mesh position={[probeB.position.x, probeB.position.y, probeB.position.z + 0.1]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={neon.purple} emissive={neon.purple} emissiveIntensity={1.4} />
          </mesh>
        )}
      </Canvas>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 uppercase tracking-wider">
        Circuit Simulator
      </div>
      {scenario === "rlc" && (
        <div className="absolute bottom-2 left-2 space-y-2 text-[9px] font-mono text-white/70">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMeterMode((v) => v === "voltage" ? "current" : "voltage")}
              className="px-2 py-1 border border-white/30 hover:border-white/60 transition-colors uppercase tracking-wider"
            >
              {meterMode === "voltage" ? "Voltage" : "Current"}
            </button>
            <button
              onClick={() => {
                setProbeA(null);
                setProbeB(null);
              }}
              className="px-2 py-1 border border-white/20 text-white/50 hover:text-white/80 transition-colors uppercase tracking-wider"
            >
              Reset
            </button>
          </div>
          <div>
            {meterValue === null
              ? "Pick two wires to measure"
              : meterMode === "voltage"
                ? `ΔV = ${meterValue.toFixed(3)} V`
                : `I = ${meterValue.toFixed(3)} A`}
          </div>
          <div>
            {`V_R = ${rlcStateRef.current.vR.toFixed(2)}  V_L = ${rlcStateRef.current.vL.toFixed(2)}  V_C = ${rlcStateRef.current.vC.toFixed(2)}`}
          </div>
        </div>
      )}
    </div>
  );
}
