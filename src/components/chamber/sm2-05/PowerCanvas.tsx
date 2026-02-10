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

// 4. SCIENTIFIC SCENE (Zoom Concept)
// Instead of blocks, maybe just text that zooms?
// Or 1 block -> 10 blocks -> 100 blocks?
// Let's stick to exponent concept if possible.
// Scientific notation is typically m * 10^n. 
// Show a number, and 'User' zooms in/out.
function ScientificScene({ base, m, n }: { base: string, m: number, n: number }) {
  // n is the exponent of 10.
  // m is the coefficient (Wait, m in visual prop corresponds to what? 
  // In Scientific, we might map coeff -> m, exp -> n? 
  // Actually the interface says m: number, n: number.
  // Let's assume m = coeff, n = exponent?
  // But m is number.

  // Let's just show a simple zoom animation.
  const textRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!textRef.current) return;
    const t = clock.getElapsedTime();
    const cycle = t % 4;
    let scale = 1;
    if (n > 0) {
      // Zoom out (number gets bigger components?) 
      // 4.2 * 10^3 = 4200.
      // Animation: 4.2 -> x10 -> 42 -> x10 -> 420 ...
      scale = 1 + (cycle / 4) * n; // Simple scaling
    } else {
      // Zoom in
      scale = 1 / (1 + (cycle / 4) * Math.abs(n));
    }
    // textRef.current.scale.setScalar(scale);
  });

  return (
    <Center>
      <Text fontSize={1} color={BASE_COLOR}>
        {`${m} × 10^${n}`}
      </Text>
      <Text position={[0, -1.5, 0]} fontSize={0.5} color="white">
        {`Scientific Notation`}
      </Text>
    </Center>
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
          {mode === 'SCIENTIFIC' && <ScientificScene base={String(base)} m={m} n={n} />}
          {mode === 'NEGATIVE' && <DivideScene base={String(base)} m={0} n={-n} />} {/* Reuse divide? */}
        </Center>

        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/30 text-right uppercase">
        VISUAL_MODE: {mode}<br />
        BASE: {base} // M: {m} // N: {n}
      </div>
    </div>
  );
}
