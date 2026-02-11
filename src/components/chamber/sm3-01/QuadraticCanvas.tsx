"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Float, Line } from "@react-three/drei";
import * as THREE from "three";

export type CanvasQuest = {
  id: string;
  expressionLatex: string;
  promptLatex: string;
  hintLatex?: string[];
  a?: number;
  b?: number;
  c?: number;
  h?: number;
  k?: number;
}

export type CanvasLabels = {
  target: string;
  hints: string;
}

// Glow Ribbon - 3D Parabolic Curve
function GlowRibbon({ a, b, c }: { a: number; b: number; c: number }) {
  const ribbonRef = useRef<THREE.Mesh>(null);

  // Generate parabola points
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const range = 5;
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const x = -range + (i / steps) * range * 2;
      const y = a * x * x + b * x + c;
      pts.push(new THREE.Vector3(x, y, 0));
    }

    return pts;
  }, [a, b, c]);

  // Create tube geometry from curve
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  useFrame(({ clock }) => {
    if (!ribbonRef.current) return;
    const pulse = 0.7 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
    (ribbonRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
  });

  return (
    <group>
      {/* Main ribbon tube */}
      <mesh ref={ribbonRef}>
        <tubeGeometry args={[curve, 200, 0.08, 8, false]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <tubeGeometry args={[curve, 200, 0.15, 8, false]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Curve line for reference */}
      <Line
        points={points}
        color="#00ffff"
        lineWidth={2}
        transparent
        opacity={0.5}
      />
    </group>
  );
}

// Component Stacking - 3D Prisms for ax², bx, c
function ComponentStack({
  x,
  a,
  b,
  c
}: {
  x: number;
  a: number;
  b: number;
  c: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 2) * 0.05;
  });

  // Calculate component values
  const ax2 = a * x * x;
  const bx = b * x;
  const cVal = c;

  // Heights for each component (scaled for visibility)
  const heightScale = 0.5;
  const h1 = Math.abs(ax2) * heightScale;
  const h2 = Math.abs(bx) * heightScale;
  const h3 = Math.abs(cVal) * heightScale;

  // Stack positions
  const baseY = 0;
  const y1 = baseY + (ax2 >= 0 ? h1 / 2 : -h1 / 2);
  const y2 = y1 + (ax2 >= 0 ? h1 / 2 : -h1 / 2) + (bx >= 0 ? h2 / 2 : -h2 / 2);
  const y3 = y2 + (bx >= 0 ? h2 / 2 : -h2 / 2) + (cVal >= 0 ? h3 / 2 : -h3 / 2);

  return (
    <group ref={groupRef} position={[x, 0, 0]}>
      {/* ax² component (red/orange) */}
      <mesh position={[0, y1, 0]}>
        <boxGeometry args={[0.4, h1, 0.4]} />
        <meshPhysicalMaterial
          color="#ff4444"
          emissive="#ff6600"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Edge glow for ax² */}
      <lineSegments position={[0, y1, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.4, h1, 0.4)]} />
        <lineBasicMaterial color="#ff6600" transparent opacity={0.8} />
      </lineSegments>

      {/* bx component (cyan) */}
      <mesh position={[0, y2, 0]}>
        <boxGeometry args={[0.4, h2, 0.4]} />
        <meshPhysicalMaterial
          color="#00ddff"
          emissive="#00ddff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Edge glow for bx */}
      <lineSegments position={[0, y2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.4, h2, 0.4)]} />
        <lineBasicMaterial color="#00ddff" transparent opacity={0.8} />
      </lineSegments>

      {/* c component (green) */}
      <mesh position={[0, y3, 0]}>
        <boxGeometry args={[0.4, h3, 0.4]} />
        <meshPhysicalMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Edge glow for c */}
      <lineSegments position={[0, y3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.4, h3, 0.4)]} />
        <lineBasicMaterial color="#00ff88" transparent opacity={0.8} />
      </lineSegments>

      {/* Labels */}
      <Text position={[0.6, y1, 0]} fontSize={0.2} color="#ff4444" anchorX="left">
        ax²={ax2.toFixed(1)}
      </Text>
      <Text position={[0.6, y2, 0]} fontSize={0.2} color="#00ddff" anchorX="left">
        bx={bx.toFixed(1)}
      </Text>
      <Text position={[0.6, y3, 0]} fontSize={0.2} color="#00ff88" anchorX="left">
        c={cVal.toFixed(1)}
      </Text>

      {/* Vertical line showing total */}
      <Line
        points={[
          new THREE.Vector3(0, baseY, 0),
          new THREE.Vector3(0, y3 + (cVal >= 0 ? h3 / 2 : -h3 / 2), 0)
        ]}
        color="#ffffff"
        lineWidth={2}
        transparent
        opacity={0.3}
        dashed
        dashScale={2}
      />
    </group>
  );
}

// Vertex Flux Core - High-intensity marker at (h, k)
function VertexFluxCore({ h, k }: { h: number; k: number }) {
  const coreRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current || !ringsRef.current) return;

    const time = clock.getElapsedTime();

    // Pulsing core
    const pulse = 1 + Math.sin(time * 4) * 0.2;
    coreRef.current.scale.setScalar(pulse);

    // Rotating rings
    ringsRef.current.rotation.z = time * 2;

    // Expanding rings
    ringsRef.current.children.forEach((ring, i) => {
      const offset = i * 0.5;
      const scale = 1 + ((time * 2 + offset) % 2);
      const opacity = 1 - ((time * 2 + offset) % 2) / 2;
      ring.scale.setScalar(scale);
      (ring as THREE.Mesh).material = new THREE.MeshBasicMaterial({
        color: "#ff00ff",
        transparent: true,
        opacity: opacity * 0.4,
        side: THREE.DoubleSide
      });
    });
  });

  return (
    <group position={[h, k, 0]}>
      {/* Core sphere */}
      <Float speed={3} rotationIntensity={0} floatIntensity={0.3}>
        <group ref={coreRef}>
          <mesh>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshPhysicalMaterial
              color="#ff00ff"
              emissive="#ff00ff"
              emissiveIntensity={2}
              metalness={0.9}
              roughness={0.1}
            />
            <pointLight color="#ff00ff" intensity={3} distance={5} />
          </mesh>

          {/* Inner glow */}
          <mesh>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshBasicMaterial
              color="#ff00ff"
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* Rotating particle ring */}
      <group ref={ringsRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 0.6;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            >
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color="#ff00ff" />
            </mesh>
          );
        })}
      </group>

      {/* Expanding rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.45, 32]} />
            <meshBasicMaterial
              color="#ff00ff"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Vertex label */}
      <Text position={[0, -0.8, 0]} fontSize={0.25} color="#ff00ff" anchorX="center">
        Vertex ({h.toFixed(1)}, {k.toFixed(1)})
      </Text>

      {/* Crosshair */}
      <Line
        points={[
          new THREE.Vector3(-1, 0, 0),
          new THREE.Vector3(1, 0, 0)
        ]}
        color="#ff00ff"
        lineWidth={1}
        transparent
        opacity={0.3}
        dashed
      />
      <Line
        points={[
          new THREE.Vector3(0, -1, 0),
          new THREE.Vector3(0, 1, 0)
        ]}
        color="#ff00ff"
        lineWidth={1}
        transparent
        opacity={0.3}
        dashed
      />
    </group>
  );
}

// Animated scanner position
function ScannerController({
  onPositionChange
}: {
  onPositionChange: (x: number) => void
}) {
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const x = Math.sin(time * 0.5) * 3;
    onPositionChange(x);
  });
  return null;
}

// Main 3D Scene
function QuadraticScene({ quest }: { quest: CanvasQuest }) {
  const groupRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Group>(null);

  // Extract coefficients (with defaults)
  const a = quest.a ?? 1;
  const b = quest.b ?? 0;
  const c = quest.c ?? 0;

  // Calculate vertex
  const h = quest.h ?? -b / (2 * a);
  const k = quest.k ?? a * h * h + b * h + c;

  // Scanner position state
  const scannerX = useRef(0);

  const handleScannerPosition = (x: number) => {
    scannerX.current = x;
    if (scannerRef.current) {
      scannerRef.current.position.x = x;
    }
  };

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ScannerController onPositionChange={handleScannerPosition} />

      {/* Glow Ribbon - Parabola */}
      <GlowRibbon a={a} b={b} c={c} />

      {/* Component Stack at scanner position */}
      <group ref={scannerRef}>
        <ComponentStack x={0} a={a} b={b} c={c} />

        {/* Scanner beam */}
        <Line
          points={[
            new THREE.Vector3(0, -5, 0),
            new THREE.Vector3(0, 5, 0)
          ]}
          color="#ffffff"
          lineWidth={1}
          transparent
          opacity={0.2}
          dashed
          dashScale={3}
        />
      </group>

      {/* Vertex Flux Core */}
      <VertexFluxCore h={h} k={k} />

      {/* Coordinate axes */}
      <group>
        <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 6, "#ff4444"]} />
        <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 6, "#44ff44"]} />

        <Text position={[6.5, 0, 0]} fontSize={0.3} color="#ff4444">x</Text>
        <Text position={[0, 6.5, 0]} fontSize={0.3} color="#44ff44">y</Text>
      </group>

      {/* Equation display */}
      <Text position={[0, 5, 0]} fontSize={0.4} color="#ffffff" anchorX="center">
        y = {a}x² + {b}x + {c}
      </Text>
    </group>
  );
}

export default function S301QuadraticCanvas({ quest }: { quest: CanvasQuest }) {
  if (!quest) {
    return (
      <div className="w-full h-full relative flex items-center justify-center bg-[#020208] rounded-xl border border-white/10">
        <div className="text-white/90 text-center p-8">No quadratic data</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [8, 6, 8], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 5]} intensity={0.6} color="#00ffff" />
        <pointLight position={[0, 10, -10]} intensity={0.5} color="#ff00ff" />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={20}
        />

        {/* Grid floor */}
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#ffffff"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#00ffff"
          fadeDistance={25}
          fadeStrength={1}
          position={[0, -3, 0]}
        />

        {/* Main scene */}
        <QuadraticScene quest={quest} />
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-[8px] font-mono text-white/90 tracking-[0.3em] uppercase">
          Parabolic_Scanner v3.0
        </span>
      </div>

      <div className="absolute bottom-4 left-4 space-y-1 font-mono text-[9px] text-white">
        <div className="text-red-400">ax²: coefficient = {quest.a ?? 1}</div>
        <div className="text-cyan-400">bx: coefficient = {quest.b ?? 0}</div>
        <div className="text-green-400">c: constant = {quest.c ?? 0}</div>
        <div className="text-purple-400 font-bold mt-2">
          Vertex: ({((quest.h ?? -(quest.b ?? 0) / (2 * (quest.a ?? 1)))).toFixed(2)}, {(quest.k ?? 0).toFixed(2)})
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // S3.01<br />
        3D_QUADRATIC_SPACE<br />
        SCAN_MODE: ACTIVE
      </div>

      <div className="absolute top-4 right-4 text-[9px] font-mono text-white/60 uppercase tracking-wider">
        Quadratic Functions 3D
      </div>

      {/* Component legend */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 space-y-2">
        <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider text-right">
          Components
        </div>
        <div className="space-y-1 text-right">
          <div className="text-[9px] font-mono text-red-400">■ ax²</div>
          <div className="text-[9px] font-mono text-cyan-400">■ bx</div>
          <div className="text-[9px] font-mono text-green-400">■ c</div>
          <div className="text-[9px] font-mono text-purple-400 mt-2">★ Vertex</div>
        </div>
      </div>
    </div>
  );
}
