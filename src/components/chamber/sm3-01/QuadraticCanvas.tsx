"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Float, Line, QuadraticBezierLine } from "@react-three/drei";
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
// 1. AREA MODEL COMPONENT (Geometric interpretation of factorization)
// Shows x*x square, x*1 rectangles, and 1*1 squares
// ---------------------------------------------------------
function AreaModel({ a = 1, b = 0, c = 0 }: { a: number; b: number; c: number }) {
  // Logic: For x^2 + (p+q)x + pq, we show a rectangle of sides (x+p) and (x+q)
  // Simplified for viz: show the "blocks" that make up the expression
  const group = useRef<THREE.Group>(null);

  return (
    <group ref={group} position={[-2, 0, 0]}>
      {/* Big x^2 square */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 0.2]} />
        <meshPhysicalMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.2} metalness={0.8} roughness={0.2} transparent opacity={0.9} />
        <Text position={[0, 0, 0.15]} fontSize={0.4} color="white">x²</Text>
      </mesh>

      {/* b*x strips */}
      {Array.from({ length: Math.abs(Math.round(b)) }).map((_, i) => (
        <mesh key={`b-${i}`} position={[2 + 0.3, (i * 0.5) - 0.75, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.2]} />
          <meshPhysicalMaterial color="#00ddff" emissive="#00ddff" emissiveIntensity={0.2} metalness={0.8} roughness={0.2} transparent opacity={0.8} />
        </mesh>
      ))}
      <Text position={[2.3, 1.2, 0]} fontSize={0.25} color="#00ddff">{b}x</Text>

      {/* c units */}
      {Array.from({ length: Math.min(Math.abs(Math.round(c)), 12) }).map((_, i) => (
        <mesh key={`c-${i}`} position={[3.2, (i * 0.3) - 0.75, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshPhysicalMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.2} metalness={0.8} roughness={0.2} transparent opacity={0.8} />
        </mesh>
      ))}
      <Text position={[3.2, 1.2, 0]} fontSize={0.25} color="#00ff88">const: {c}</Text>
    </group>
  );
}

// ---------------------------------------------------------
// 2. PARABOLA VISUALIZER (Precise root and vertex highlighting)
// ---------------------------------------------------------
function ParabolaVisualizer({ a = 1, b = 0, c = 0 }: { a: number; b: number; c: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let x = -6; x <= 6; x += 0.1) {
      const y = a * x * x + b * x + c;
      if (Math.abs(y) < 20) { // Keep in view
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

  // Calculate roots if real
  const discriminant = b * b - 4 * a * c;
  const roots = useMemo(() => {
    if (discriminant < 0) return [];
    const r1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const r2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    return [r1, r2];
  }, [a, b, c, discriminant]);

  return (
    <group>
      {/* Path */}
      <Line points={points} color="#00ffff" lineWidth={3} />

      {/* Vertex marker */}
      <group position={vertex}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#ff00ff" />
        </mesh>
        <Text position={[0, -0.5, 0.5]} fontSize={0.3} color="#ff00ff" anchorX="center">
          Vertex ({vertex.x.toFixed(1)}, {vertex.y.toFixed(1)})
        </Text>
      </group>

      {/* Root markers */}
      {roots.map((r, i) => (
        <group key={i} position={[r, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#00ff00" />
          </mesh>
          <Text position={[0, 0.5, 0.5]} fontSize={0.25} color="#00ff00" anchorX="center">
            Root: {r.toFixed(1)}
          </Text>
        </group>
      )}

      {/* Parabola Equation Label */}
      <Text position={[0, 7, 0]} fontSize={0.5} color="white">
        y = {a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c}
      </Text>
    </group>
  );
}

// ---------------------------------------------------------
// MAIN SCENE CONTROLLER
// ---------------------------------------------------------
function QuadraticScene({ quest }: { quest: CanvasQuest }) {
  const { a = 0, b = 0, c = 0, vizMode = "PARABOLA" } = quest;

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      {/* Dynamic Grid */}
      <Grid
        args={[20, 20]}
        cellSize={1}
        cellThickness={1}
        cellColor="#333"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#00ffff"
        fadeDistance={30}
        position={[0, -0.01, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Axes */}
      <Line points={[new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]} color="#ff4444" lineWidth={1} />
      <Line points={[new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]} color="#44ff44" lineWidth={1} />

      {/* Content based on quest mode */}
      {vizMode === "AREA" ? (
        <AreaModel a={a} b={b} c={c} />
      ) : (
        <ParabolaVisualizer a={a} b={b} c={c} />
      )}
    </group>
  );
}

export default function S301QuadraticCanvas({ quest }: { quest: CanvasQuest }) {
  if (!quest) return <div className="w-full h-full bg-[#020208] flex items-center justify-center text-white">Initializing Quantum Processor...</div>;

  return (
    <div className="w-full h-full relative bg-[#000005] rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <color attach="background" args={["#000005"]} />
        <OrbitControls enablePan={false} maxDistance={25} minDistance={5} />
        <QuadraticScene quest={quest} />
      </Canvas>

      {/* HUD Labels */}
      <div className="absolute top-4 left-4 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Orbital Analysis</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 p-4 rounded-lg border border-white/5 bg-black/40 backdrop-blur-md">
        <div className="text-[9px] font-mono text-white/40 uppercase mb-2">Parameters</div>
        <div className="grid grid-cols-3 gap-4">
          <div><div className="text-[8px] text-red-400 uppercase">a (Quadratic)</div><div className="text-sm font-bold text-white">{quest.a ?? 0}</div></div>
          <div><div className="text-[8px] text-cyan-400 uppercase">b (Linear)</div><div className="text-sm font-bold text-white">{quest.b ?? 0}</div></div>
          <div><div className="text-[8px] text-green-400 uppercase">c (Constant)</div><div className="text-sm font-bold text-white">{quest.c ?? 0}</div></div>
        </div>
      </div>

      <div className="absolute top-4 right-4 text-right">
        <div className="text-[8px] font-mono text-white/30 uppercase leading-relaxed">
          CHAMBER SM3.01<br />
          MATH_CORE_V4.0<br />
          STAGE: {quest.stage}<br />
          ID: {quest.id}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-end gap-3 pointer-events-none opacity-60">
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-white/70 uppercase">Vertex</span>
          <div className="w-2 h-2 bg-[#ff00ff] rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-white/70 uppercase">Roots</span>
          <div className="w-2 h-2 bg-[#00ff00] rounded-full" />
        </div>
      </div>
    </div>
  );
}
