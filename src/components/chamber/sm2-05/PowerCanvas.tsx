"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Float, Center, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

export interface PowerVisual {
  mode: 'MULTIPLY' | 'DIVIDE' | 'POWER' | 'NEGATIVE' | 'SCIENTIFIC';
  base: string | number;
  m: number;
  n: number; // For single operand laws, n might be 0 or ignored
}

const BLOOM_COLOR = "#a855f7"; // Neon Purple
const BASE_COLOR = "#00e5ff"; // Cyan

function EnergyBlock({
  position,
  label,
  color = BASE_COLOR,
  opacity = 1,
  scale = 1
}: {
  position: [number, number, number],
  label: string,
  color?: string,
  opacity?: number,
  scale?: number
}) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8 * opacity}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.8, 0.8)]} />
        <lineBasicMaterial color="white" transparent opacity={0.5 * opacity} />
      </lineSegments>
      <Text position={[0, 0, 0.41]} fontSize={0.4} color="white">
        {label}
      </Text>
    </group>
  );
}

function Stack({
  count,
  baseLabel,
  position = [0, 0, 0],
  color = BASE_COLOR,
  gap = 0.1
}: {
  count: number,
  baseLabel: string,
  position?: [number, number, number],
  color?: string,
  gap?: number
}) {
  const blocks = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      offset: i * (0.8 + gap)
    }));
  }, [count, gap]);

  return (
    <group position={position}>
      {blocks.map((b) => (
        <EnergyBlock
          key={b.id}
          position={[0, b.offset, 0]}
          label={baseLabel}
          color={color}
        />
      ))}
    </group>
  );
}

// Visualizes a^m * a^n = a^(m+n)
function MultiplyScene({ base, m, n }: { base: string, m: number, n: number }) {
  // Initial state: Two stacks side by side
  // Animation: Right stack moves on top of Left stack
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const t = (Math.sin(time) + 1) / 2; // 0 to 1 cycle

    // Right stack position interpolation
    // Start: x = 2, y = 0
    // End: x = 0, y = m * (0.9)

    const stackHeight = 0.9;

    // We want a clear 3-phase animation:
    // 1. Pause (separate)
    // 2. Move
    // 3. Pause (combined)

    const cycle = time % 4;
    let progress = 0;
    if (cycle < 1) progress = 0;
    else if (cycle < 2) progress = cycle - 1; // 0 -> 1
    else progress = 1;

    // Ease
    const ease = 1 - Math.pow(1 - progress, 3);

    const rightStack = groupRef.current.children[1];
    if (rightStack) {
      rightStack.position.x = THREE.MathUtils.lerp(2.5, 0, ease);
      rightStack.position.y = THREE.MathUtils.lerp(0, m * stackHeight, ease);
    }

    // Camera auto-fit? 
    // Maybe just center the whole group
    const totalH = (m + n) * stackHeight;
    groupRef.current.position.y = -totalH / 3;
  });

  return (
    <group ref={groupRef}>
      {/* Left Stack (m) */}
      <Stack count={m} baseLabel={String(base)} position={[-1, 0, 0]} color={BASE_COLOR} />

      {/* Right Stack (n) */}
      <Stack count={n} baseLabel={String(base)} position={[1.5, 0, 0]} color={BLOOM_COLOR} />

      {/* Labels */}
      <Text position={[-1, -1, 0]} fontSize={0.5} color="white">{`m=${m}`}</Text>
      <Text position={[2.5, -1, 0]} fontSize={0.5} color="white">{`n=${n}`}</Text>
    </group>
  );
}

// Visualizes (a^m)^n = a^(m*n)
function PowerRuleScene({ base, m, n }: { base: string, m: number, n: number }) {
  // Show n stacks of m
  // Animation: They stack up vertically
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const cycle = time % 5;
    // 1. Spread out horizontally (0-1s)
    // 2. Stack up (1-2s)
    // 3. Hold (2-4s)

    let progress = 0;
    if (cycle < 1) progress = 0;
    else if (cycle < 2) progress = cycle - 1;
    else progress = 1;

    const ease = 1 - Math.pow(1 - progress, 3);
    const stackHeight = m * 0.9;

    // Children are the stacks
    groupRef.current.children.forEach((child, idx) => {
      if (idx >= n) return; // Skip labels if any
      // Target X: 0
      // Target Y: idx * stackHeight
      // Start X: (idx - (n-1)/2) * 2
      // Start Y: 0

      const startX = (idx - (n - 1) / 2) * 1.5;
      child.position.x = THREE.MathUtils.lerp(startX, 0, ease);
      child.position.y = THREE.MathUtils.lerp(0, idx * stackHeight, ease);
    });

    const finalTotalHeight = m * n * 0.9;
    groupRef.current.position.y = -finalTotalHeight / 3;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: n }).map((_, i) => (
        <Stack key={i} count={m} baseLabel={String(base)} position={[0, 0, 0]} color={i % 2 === 0 ? BASE_COLOR : BLOOM_COLOR} />
      ))}
    </group>
  );
}

// Visualizes a^m / a^n = a^(m-n)
function DivideScene({ base, m, n }: { base: string, m: number, n: number }) {
  // Show Stack m
  // Show Stack n (Anti-particles)
  // Animation: n moves to m, and both disappear
  const mRef = useRef<THREE.Group>(null);
  const nRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!mRef.current || !nRef.current) return;
    const time = state.clock.getElapsedTime();
    const cycle = time % 4;

    let progress = 0;
    if (cycle < 1) progress = 0;
    else if (cycle < 2) progress = cycle - 1;
    else progress = 1;

    const ease = 1 - Math.pow(1 - progress, 3);

    // Assume n stack starts at right, moves to overwrite top n blocks of m
    // M stack is at left

    // Move N stack to overlap with top of M stack
    const targetX = -1;
    const targetY = (m - n) * 0.9; // Top part

    nRef.current.position.x = THREE.MathUtils.lerp(2, targetX, ease);
    nRef.current.position.y = THREE.MathUtils.lerp(0, targetY, ease);

    // Opacity fade when overlapped (simulated by distance check or just time)
    if (progress > 0.8) {
      // Fade out the top n blocks of M and the N stack
      const fade = 1 - (progress - 0.8) * 5; // 0.8->1.0 maps to 1->0
      nRef.current.scale.setScalar(Math.max(0, fade));
      // Ideally we'd fade specific blocks in M, but that requires more complex state.
      // For now, let's just make the interacting parts flash red
    } else {
      nRef.current.scale.setScalar(1);
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Main Stack m */}
      <Stack count={m} baseLabel={String(base)} position={[-1, 0, 0]} color={BASE_COLOR} />

      {/* Anti Stack n */}
      <group ref={nRef} position={[2, 0, 0]}>
        <Stack count={n} baseLabel={`-${base}`} color="#ef4444" />{/* Red for subtract */}
      </group>

      <Text position={[0, -1, 0]} fontSize={0.5} color="white">Division = Cancellation</Text>
    </group>
  );
}

// Visualizes a^-n = 1 / a^n
function NegativeScene({ base, n }: { base: string, n: number }) {
  // Left: Red Stack (Negative) representing a^-n
  // Right: Fraction structure 1 / a^n (Blue Stack)
  // Animation: Transformation arrow

  return (
    <group>
      {/* Left Side: a^-n */}
      <group position={[-2.5, 0, 0]}>
        <Stack count={n} baseLabel={`-${base}`} color="#ef4444" />
        <Text position={[0, -n * 0.9 - 0.5, 0]} fontSize={0.4} color="#ef4444">
          {`${base}^-${n}`}
        </Text>
      </group>

      {/* Arrow */}
      <Text position={[0, 0, 0]} fontSize={0.8} color="white">→</Text>
      <Text position={[0, -0.6, 0]} fontSize={0.3} color="white">Reciprocal</Text>

      {/* Right Side: 1 / a^n */}
      <group position={[2.5, 0.5, 0]}>
        {/* Numerator: 1 */}
        <Text position={[0, 1.2, 0]} fontSize={0.8} color="white">1</Text>

        {/* Fraction Bar */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2, 0.05, 0.05]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Denominator: a^n (Blue Stack) */}
        <group position={[0, -1, 0]} scale={0.8}>
          {/* We need to scale the stack down slightly to fit? Or just position it lower */}
          <Stack count={n} baseLabel={String(base)} position={[0, 0, 0]} color={BASE_COLOR} gap={0.05} />
        </group>

        <Text position={[1.5, 0, 0]} fontSize={0.4} color={BASE_COLOR}>
          {`${base}^${n}`}
        </Text>
      </group>
    </group>
  );
}

// Visualizes Scientific Notation: Decimal Shift
function ScientificScene({ m, n }: { m: number, n: number }) {
  // Show the number m.
  // Show the decimal point moving n times.
  // For n=3, m=4.2 -> 4.200 -> 4200.

  // Deconstruct m into string
  const originalStr = m.toString(); // "4.2"

  const steps = n > 0 ? n : Math.abs(n);
  const [cycle, setCycle] = useState(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Cycle from 0 to steps + 1
    const speed = 1.5; // seconds per step
    const c = Math.floor(t / speed) % (steps + 2);
    setCycle(c);
  });

  // Calculate current value string based on cycle
  const currentValue = useMemo(() => {
    if (cycle === 0) return m.toString();
    if (cycle > steps) return (m * Math.pow(10, n)).toString(); // Final result

    // Intermediate steps simulation
    // This logic is tricky for generalized m.
    // Let's try simple multiplication for display
    const p = n > 0 ? cycle : -cycle;
    const val = m * Math.pow(10, p);
    // Fix precision issues
    return parseFloat(val.toFixed(6)).toString();
  }, [m, n, cycle, steps]);

  return (
    <group>
      <Center>
        <Text fontSize={1.2} color="white">
          {currentValue}
        </Text>
      </Center>

      <group position={[0, -1.5, 0]}>
        <Text fontSize={0.4} color={BLOOM_COLOR}>
          {`× 10^${n}`}
        </Text>
        <Text position={[0, -0.6, 0]} fontSize={0.3} color="white">
          {n > 0 ? `Move Right ${cycle > steps ? steps : cycle}/${steps}` : `Move Left ${cycle > steps ? steps : cycle}/${steps}`}
        </Text>
      </group>

      {/* Visual Dots for Placeholders */}
      <group position={[0, 1, 0]}>
        {Array.from({ length: steps }).map((_, i) => (
          <mesh key={i} position={[(i - steps / 2) * 0.5, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={i < cycle ? BASE_COLOR : "#333"} emissive={i < cycle ? BASE_COLOR : "black"} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function S205_PowerCanvas({ visual }: { visual?: PowerVisual }) {
  if (!visual) return null;

  const { mode, base, m, n } = visual;

  // Camera setup based on mode/size
  const camPos: [number, number, number] = [0, 2, 12];

  return (
    <div className="relative w-full aspect-square max-w-[500px] min-h-[300px] bg-[#020208] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={["#020208"]} />
        <PerspectiveCamera makeDefault position={camPos} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} color={BLOOM_COLOR} />

        <Center>
          {mode === 'MULTIPLY' && <MultiplyScene base={String(base)} m={m} n={n} />}
          {mode === 'POWER' && <PowerRuleScene base={String(base)} m={m} n={n} />}
          {mode === 'DIVIDE' && <DivideScene base={String(base)} m={m} n={n} />}
          {mode === 'SCIENTIFIC' && <ScientificScene m={Number(m)} n={n} />}
          {mode === 'NEGATIVE' && <NegativeScene base={String(base)} n={n} />}
        </Center>

        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/70 text-right uppercase">
        VISUAL_MODE: {mode}<br />
        BASE: {base} {/* M: {m} N: {n} */}
      </div>
    </div>
  );
}
