"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid } from "@react-three/drei";
import * as THREE from "three";

interface S201BinomialCanvasProps {
  a: number;
  b: number;
  locked: boolean;
  targetSize: number;
  initialPositions: {
    a2: [number, number, number];
    b2: [number, number, number];
    ab1: [number, number, number];
    ab2: [number, number, number];
  };
  targetPositions: {
    a2: [number, number, number];
    b2: [number, number, number];
    ab1: [number, number, number];
    ab2: [number, number, number];
  };
  labels: {
    a2: string;
    b2: string;
    ab: string;
  };
  titleText: string;
  onSnap: (id: string, isSnapped: boolean) => void;
}

// Individual cube component with glassy material
function GlassCube({
  position,
  size,
  color,
  emissive,
  label,
  exploded = false,
  explosionOffset = [0, 0, 0]
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive: string;
  label: string;
  exploded: boolean;
  explosionOffset: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Breathing effect
    const breath = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
    meshRef.current.scale.setScalar(breath);

    // Gentle rotation when hovered
    if (hovered) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const finalPosition: [number, number, number] = exploded
    ? [
      position[0] + explosionOffset[0],
      position[1] + explosionOffset[1],
      position[2] + explosionOffset[2]
    ]
    : position;

  return (
    <group position={finalPosition}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={size} />
        <meshPhysicalMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={hovered ? 0.5 : 0.3}
          transparent
          opacity={0.7}
          metalness={0.9}
          roughness={0.1}
          transmission={0.5}
          thickness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Edge glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color={emissive} transparent opacity={0.6} linewidth={2} />
      </lineSegments>

      {/* Label */}
      <Text
        position={[0, 0, size[2] / 2 + 0.1]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Main 3D Binomial Cube Scene
function BinomialCube3D({ a, b, exploded }: { a: number; b: number; exploded: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current && !exploded) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Calculate positions for the 8 components
  // The cube (a+b)³ is divided into:
  // 1x a³ (green)
  // 3x a²b (cyan)
  // 3x ab² (orange)
  // 1x b³ (purple)

  const explosionFactor = exploded ? 2 : 0;

  // Component definitions
  const components = useMemo(() => {
    const offset = -(a + b) / 2; // Center the cube

    return [
      // a³ - bottom-left-back corner (green)
      {
        id: 'a3',
        position: [offset + a / 2, offset + a / 2, offset + a / 2] as [number, number, number],
        size: [a, a, a] as [number, number, number],
        color: '#00ff88',
        emissive: '#00ff88',
        label: 'a³',
        explosionOffset: [-explosionFactor, -explosionFactor, -explosionFactor] as [number, number, number]
      },

      // a²b - three pieces (cyan)
      {
        id: 'a2b_1',
        position: [offset + a / 2, offset + a / 2, offset + a + b / 2] as [number, number, number],
        size: [a, a, b] as [number, number, number],
        color: '#00ddff',
        emissive: '#00ddff',
        label: 'a²b',
        explosionOffset: [-explosionFactor * 0.8, -explosionFactor * 0.8, explosionFactor] as [number, number, number]
      },
      {
        id: 'a2b_2',
        position: [offset + a / 2, offset + a + b / 2, offset + a / 2] as [number, number, number],
        size: [a, b, a] as [number, number, number],
        color: '#00ddff',
        emissive: '#00ddff',
        label: 'a²b',
        explosionOffset: [-explosionFactor * 0.8, explosionFactor, -explosionFactor * 0.8] as [number, number, number]
      },
      {
        id: 'a2b_3',
        position: [offset + a + b / 2, offset + a / 2, offset + a / 2] as [number, number, number],
        size: [b, a, a] as [number, number, number],
        color: '#00ddff',
        emissive: '#00ddff',
        label: 'a²b',
        explosionOffset: [explosionFactor, -explosionFactor * 0.8, -explosionFactor * 0.8] as [number, number, number]
      },

      // ab² - three pieces (orange)
      {
        id: 'ab2_1',
        position: [offset + a + b / 2, offset + a + b / 2, offset + a / 2] as [number, number, number],
        size: [b, b, a] as [number, number, number],
        color: '#ffaa00',
        emissive: '#ffaa00',
        label: 'ab²',
        explosionOffset: [explosionFactor, explosionFactor, -explosionFactor * 0.8] as [number, number, number]
      },
      {
        id: 'ab2_2',
        position: [offset + a + b / 2, offset + a / 2, offset + a + b / 2] as [number, number, number],
        size: [b, a, b] as [number, number, number],
        color: '#ffaa00',
        emissive: '#ffaa00',
        label: 'ab²',
        explosionOffset: [explosionFactor, -explosionFactor * 0.8, explosionFactor] as [number, number, number]
      },
      {
        id: 'ab2_3',
        position: [offset + a / 2, offset + a + b / 2, offset + a + b / 2] as [number, number, number],
        size: [a, b, b] as [number, number, number],
        color: '#ffaa00',
        emissive: '#ffaa00',
        label: 'ab²',
        explosionOffset: [-explosionFactor * 0.8, explosionFactor, explosionFactor] as [number, number, number]
      },

      // b³ - top-right-front corner (purple)
      {
        id: 'b3',
        position: [offset + a + b / 2, offset + a + b / 2, offset + a + b / 2] as [number, number, number],
        size: [b, b, b] as [number, number, number],
        color: '#ff00ff',
        emissive: '#ff00ff',
        label: 'b³',
        explosionOffset: [explosionFactor, explosionFactor, explosionFactor] as [number, number, number]
      }
    ];
  }, [a, b, explosionFactor]);

  return (
    <group ref={groupRef}>
      {components.map((comp) => (
        <GlassCube
          key={comp.id}
          position={comp.position}
          size={comp.size}
          color={comp.color}
          emissive={comp.emissive}
          label={comp.label}
          exploded={exploded}
          explosionOffset={comp.explosionOffset}
        />
      ))}

      {/* Outer cube wireframe when assembled */}
      {!exploded && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(a + b, a + b, a + b)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.3} linewidth={3} />
        </lineSegments>
      )}
    </group>
  );
}

// Legend component
function Legend({ a, b }: { a: number; b: number }) {
  return (
    <group position={[-6, 0, 0]}>
      <Text position={[0, 3, 0]} fontSize={0.4} color="#ffffff" anchorX="left">
        (a+b)³ Decomposition
      </Text>

      <Text position={[0, 2, 0]} fontSize={0.25} color="#00ff88" anchorX="left">
        1× a³ = {a ** 3}
      </Text>

      <Text position={[0, 1.5, 0]} fontSize={0.25} color="#00ddff" anchorX="left">
        3× a²b = {3 * a * a * b}
      </Text>

      <Text position={[0, 1, 0]} fontSize={0.25} color="#ffaa00" anchorX="left">
        3× ab² = {3 * a * b * b}
      </Text>

      <Text position={[0, 0.5, 0]} fontSize={0.25} color="#ff00ff" anchorX="left">
        1× b³ = {b ** 3}
      </Text>

      <Text position={[0, -0.3, 0]} fontSize={0.2} color="#ffffff" anchorX="left">
        ───────────────
      </Text>

      <Text position={[0, -0.8, 0]} fontSize={0.3} color="#39ff14" anchorX="left">
        Total = {(a + b) ** 3}
      </Text>

      <Text position={[0, -1.5, 0]} fontSize={0.2} color="#ffffff" anchorX="left" fillOpacity={0.6}>
        a = {a}, b = {b}
      </Text>
    </group>
  );
}

// Animated formula display
function FormulaDisplay({ exploded }: { exploded: boolean }) {
  const textRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group ref={textRef} position={[0, 6, 0]}>
      <Text fontSize={0.5} color="#ffffff" anchorX="center">
        (a+b)³ = a³ + 3a²b + 3ab² + b³
      </Text>

      <Text position={[0, -0.8, 0]} fontSize={0.25} color="#00ffff" anchorX="center">
        {exploded ? "EXPLODED VIEW" : "ASSEMBLED VIEW"}
      </Text>
    </group>
  );
}

// Animation controller component
function AnimationController({ onExplodedChange }: { onExplodedChange: (exploded: boolean) => void }) {
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const shouldExplode = Math.floor(time / 6) % 2 === 1;
    onExplodedChange(shouldExplode);
  });
  return null;
}

export default function S201BinomialCanvas({
  a,
  b,
  locked: _locked,
}: S201BinomialCanvasProps) {
  const [exploded, setExploded] = useState(false);

  return (
    <div className="w-full h-full relative bg-[#020208] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <Canvas camera={{ position: [12, 10, 12], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, 10]} intensity={0.6} color="#00ffff" />
        <pointLight position={[10, -10, -10]} intensity={0.5} color="#ff00ff" />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={30}
          autoRotate={!exploded}
          autoRotateSpeed={1}
        />

        {/* Grid floor */}
        <Grid
          args={[30, 30]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#ffffff"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#00ffff"
          fadeDistance={35}
          fadeStrength={1}
          position={[0, -(a + b) / 2 - 2, 0]}
        />

        {/* Animation controller */}
        <AnimationController onExplodedChange={setExploded} />

        {/* Main cube */}
        <BinomialCube3D a={a} b={b} exploded={exploded} />

        {/* Formula display */}
        <FormulaDisplay exploded={exploded} />

        {/* Legend */}
        <Legend a={a} b={b} />

        {/* Coordinate axes */}
        <group>
          <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 5, "#ff4444"]} />
          <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 5, "#44ff44"]} />
          <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 5, "#4444ff"]} />
        </group>
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">
          Binomial_Cube_Lab v3.0
        </span>
      </div>

      <div className="absolute bottom-4 left-4 space-y-1 font-mono text-[9px] text-white/50">
        <div className="text-green-400">a³: {a ** 3} units³</div>
        <div className="text-cyan-400">3a²b: {3 * a * a * b} units³</div>
        <div className="text-orange-400">3ab²: {3 * a * b * b} units³</div>
        <div className="text-purple-400">b³: {b ** 3} units³</div>
        <div className="text-white font-bold mt-2">
          Total: {(a + b) ** 3} units³
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // S2.01<br />
        3D_VOLUME_PROOF<br />
        MODE: {exploded ? 'EXPLODED' : 'ASSEMBLED'}
      </div>

      <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
        Binomial Cube 3D
      </div>

      {/* Volume conservation indicator */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 space-y-2">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider text-right">
          Volume Conservation
        </div>
        <div className="text-2xl font-black text-green-400 text-right">
          ✓
        </div>
        <div className="text-[9px] font-mono text-white/40 text-right">
          {(a + b) ** 3} = {(a + b) ** 3}
        </div>
      </div>
    </div>
  );
}
