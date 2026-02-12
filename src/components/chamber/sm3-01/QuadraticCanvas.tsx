"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Line } from "@react-three/drei";
import * as THREE from "three";

export type CanvasQuest = {
  id: string;
  expressionLatex: string;
  stage: string;
  a?: number;
  b?: number;
  c?: number;
  vizMode?: "AREA" | "PARABOLA";
}

// ---------------------------------------------------------
// 1. AREA MODEL COMPONENT (Geometric factorization blocks)
// ---------------------------------------------------------
function AreaModel({ a = 1, b = 0, c = 0 }: { a: number; b: number; c: number }) {
  const absB = Math.min(Math.abs(Math.round(b)), 10);
  const absC = Math.min(Math.abs(Math.round(c)), 12);

  return (
    <group position={[-2.5, 0, 0]}>
      {/* x² block (large red square) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 0.3]} />
        <meshPhysicalMaterial color="#ff4444" emissive="#ff2222" emissiveIntensity={0.3} metalness={0.7} roughness={0.3} transparent opacity={0.9} />
      </mesh>
      <Text position={[0, 0, 0.2]} fontSize={0.5} color="white" anchorX="center" anchorY="middle" fontWeight="bold">
        {a === 1 ? '' : a}x²
      </Text>

      {/* bx strips (cyan bars stacked vertically) */}
      {absB > 0 && (
        <group position={[1.6, 0, 0]}>
          {Array.from({ length: absB }).map((_, i) => (
            <mesh key={`b-${i}`} position={[0, (i - absB / 2 + 0.5) * 0.35, 0]}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshPhysicalMaterial color={b > 0 ? "#00ddff" : "#ff8800"} emissive={b > 0 ? "#00bbdd" : "#cc6600"} emissiveIntensity={0.3} metalness={0.7} roughness={0.3} transparent opacity={0.85} />
            </mesh>
          ))}
          <Text position={[0, absB * 0.35 / 2 + 0.5, 0]} fontSize={0.3} color={b > 0 ? "#00ddff" : "#ff8800"} anchorX="center">
            {b > 0 ? '+' : ''}{b}x
          </Text>
        </group>
      )}

      {/* c unit blocks (green small cubes) */}
      {absC > 0 && (
        <group position={[2.6, 0, 0]}>
          {Array.from({ length: absC }).map((_, i) => (
            <mesh key={`c-${i}`} position={[0, (i - absC / 2 + 0.5) * 0.25, 0]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshPhysicalMaterial color={c > 0 ? "#00ff88" : "#ff4488"} emissive={c > 0 ? "#00dd66" : "#dd2266"} emissiveIntensity={0.3} metalness={0.7} roughness={0.3} transparent opacity={0.85} />
            </mesh>
          ))}
          <Text position={[0, absC * 0.25 / 2 + 0.5, 0]} fontSize={0.3} color={c > 0 ? "#00ff88" : "#ff4488"} anchorX="center">
            {c > 0 ? '+' : ''}{c}
          </Text>
        </group>
      )}

      {/* Title */}
      <Text position={[1, -2.2, 0]} fontSize={0.35} color="white" anchorX="center">
        Area Model: {a === 1 ? '' : a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c}
      </Text>
    </group>
  );
}

// ---------------------------------------------------------
// 2. PARABOLA VISUALIZER (Roots + Vertex)
// ---------------------------------------------------------
function ParabolaVisualizer({ a = 1, b = 0, c = 0 }: { a: number; b: number; c: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let x = -7; x <= 7; x += 0.08) {
      const y = a * x * x + b * x + c;
      if (y > -12 && y < 12) {
        pts.push(new THREE.Vector3(x, y, 0));
      }
    }
    return pts;
  }, [a, b, c]);

  const vertex = useMemo(() => {
    const vx = -b / (2 * a);
    const vy = a * vx * vx + b * vx + c;
    return new THREE.Vector3(vx, vy, 0);
  }, [a, b, c]);

  const discriminant = b * b - 4 * a * c;
  const roots = useMemo(() => {
    if (discriminant < 0) return [];
    const r1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const r2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    if (Math.abs(r1 - r2) < 0.01) return [r1];
    return [r1, r2];
  }, [a, b, c, discriminant]);

  return (
    <group>
      {/* Parabola curve */}
      {points.length > 2 && (
        <Line points={points} color="#00ffff" lineWidth={3} />
      )}

      {/* Vertex marker */}
      <group position={vertex}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#ff00ff" />
        </mesh>
        <pointLight color="#ff00ff" intensity={2} distance={3} />
        <Text position={[0, -0.6, 0.5]} fontSize={0.28} color="#ff00ff" anchorX="center">
          V({vertex.x.toFixed(1)}, {vertex.y.toFixed(1)})
        </Text>
      </group>

      {/* Root markers */}
      {roots.map((r, i) => (
        <group key={i} position={[r, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#39ff14" />
          </mesh>
          <pointLight color="#39ff14" intensity={1.5} distance={2} />
          <Text position={[0, 0.5, 0.5]} fontSize={0.25} color="#39ff14" anchorX="center">
            x={r.toFixed(1)}
          </Text>
        </group>
      ))}

      {/* Equation label at top */}
      <Text position={[0, 8, 0]} fontSize={0.45} color="white" anchorX="center">
        y = {a === 1 ? '' : a === -1 ? '-' : a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c}
      </Text>

      {/* No roots indicator */}
      {discriminant < 0 && (
        <Text position={[3, 3, 0]} fontSize={0.3} color="#ff4444" anchorX="center">
          Δ &lt; 0 (no real roots)
        </Text>
      )}
    </group>
  );
}

// ---------------------------------------------------------
// MAIN SCENE
// ---------------------------------------------------------
function QuadraticScene({ quest }: { quest: CanvasQuest }) {
  const a = quest.a ?? 1;
  const b = quest.b ?? 0;
  const c = quest.c ?? 0;
  const vizMode = quest.vizMode ?? "PARABOLA";

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-5, 5, 5]} intensity={0.6} color="#00ffff" />

      {/* Grid behind the parabola */}
      <Grid
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#222"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#00ffff"
        fadeDistance={25}
        position={[0, 0, -0.5]}
      />

      {/* Coordinate axes */}
      <Line points={[new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]} color="#ff4444" lineWidth={2} />
      <Line points={[new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]} color="#44ff44" lineWidth={2} />
      <Text position={[9.5, 0.5, 0]} fontSize={0.3} color="#ff4444" anchorX="center">x</Text>
      <Text position={[0.5, 9.5, 0]} fontSize={0.3} color="#44ff44" anchorX="center">y</Text>

      {/* VIZ MODE SWITCH */}
      {vizMode === "AREA" ? (
        <AreaModel a={a} b={b} c={c} />
      ) : (
        <ParabolaVisualizer a={a} b={b} c={c} />
      )}
    </group>
  );
}

// ---------------------------------------------------------
// EXPORTED COMPONENT
// ---------------------------------------------------------
export default function S301QuadraticCanvas({ quest }: { quest: CanvasQuest }) {
  if (!quest) {
    return (
      <div className="w-full aspect-[4/3] bg-[#020208] rounded-xl border border-white/10 flex items-center justify-center">
        <span className="text-white/60 font-mono text-sm">Loading Module...</span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/3] relative bg-[#000005] rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <Canvas camera={{ position: [0, 2, 14], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        <OrbitControls enablePan={false} maxDistance={25} minDistance={5} />
        <QuadraticScene quest={quest} />
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[9px] font-mono text-cyan-400/80 uppercase tracking-widest">
          {quest.vizMode === "AREA" ? "Algebraic Decomposition" : "Parabolic Analyzer"}
        </span>
      </div>

      {/* Coefficient Panel */}
      <div className="absolute bottom-3 left-3 p-3 rounded-lg border border-white/5 bg-black/50 backdrop-blur-md">
        <div className="text-[8px] font-mono text-white/30 uppercase mb-1.5 tracking-wider">Coefficients</div>
        <div className="flex gap-4">
          <div><span className="text-[8px] text-red-400 block">a</span><span className="text-sm font-black text-white">{quest.a ?? '–'}</span></div>
          <div><span className="text-[8px] text-cyan-400 block">b</span><span className="text-sm font-black text-white">{quest.b ?? '–'}</span></div>
          <div><span className="text-[8px] text-green-400 block">c</span><span className="text-sm font-black text-white">{quest.c ?? '–'}</span></div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[7px] font-mono text-white/30 text-right uppercase leading-relaxed tracking-wider">
        SM3.01 // {quest.stage}<br />ID: {quest.id}
      </div>
    </div>
  );
}
