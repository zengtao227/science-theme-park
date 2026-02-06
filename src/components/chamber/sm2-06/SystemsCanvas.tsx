"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Float } from "@react-three/drei";
import * as THREE from "three";

export interface SystemsVisual {
  eq1: { a: number, b: number, c: number }; // ax + by = c
  eq2: { a: number, b: number, c: number };
  intersect?: { x: number, y: number };
}

// Quantum pulse effect at intersection point
function QuantumPulse({ position, active }: { position: [number, number, number]; active: boolean }) {
  const pulseRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!active || !pulseRef.current || !ringsRef.current) return;

    const time = clock.getElapsedTime();

    // Rotating pulse
    pulseRef.current.rotation.z = time * 2;

    // Expanding rings
    ringsRef.current.children.forEach((ring, i) => {
      const offset = i * 0.3;
      const scale = 1 + ((time * 2 + offset) % 2);
      const opacity = Math.max(0, (1 - ((time * 2 + offset) % 2) / 2) * 0.3);
      ring.scale.setScalar(scale);
      const mat = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = opacity;
    });
  });

  if (!active) return null;

  return (
    <group position={position}>
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Pulsing sphere */}
      <Float speed={4} rotationIntensity={0} floatIntensity={0.2}>
        <mesh>
          <sphereGeometry args={[0.25, 24, 24]} />
          <meshPhysicalMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.8}
          />
          <pointLight color="#ffffff" intensity={2} distance={3} />
        </mesh>
      </Float>

      {/* Rotating particles */}
      <group ref={pulseRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 0.5;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            >
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshBasicMaterial color="#00ffff" />
            </mesh>
          );
        })}
      </group>

      {/* Expanding rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.35, 32]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Glowing intersection line using TubeGeometry
function IntersectionLine({
  start,
  end,
  color
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
}) {
  const tubeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!tubeRef.current) return;
    const pulse = 0.7 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
    (tubeRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
  });

  const curve = useMemo(() => new THREE.LineCurve3(start, end), [start, end]);

  return (
    <group>
      {/* Main tube */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[curve, 64, 0.08, 8, false]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.15, 8, false]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

// Glassy plane with equation
function GlassyPlane({
  equation,
  color,
  emissive,
  label,
  size = 10
}: {
  equation: { a: number; b: number; c: number };
  color: string;
  emissive: string;
  label: string;
  size?: number;
}) {
  const planeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!planeRef.current) return;
    // Subtle breathing effect
    const breath = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.02;
    planeRef.current.scale.setScalar(breath);
  });

  // Calculate plane orientation from equation ax + by = c
  // Normal vector is (a, b, 0) in 2D, we extend to 3D as (a, b, 0)
  const normal = new THREE.Vector3(equation.a, equation.b, 0).normalize();

  // Calculate rotation to align plane with normal
  const up = new THREE.Vector3(0, 0, 1);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal);
  const euler = new THREE.Euler().setFromQuaternion(quaternion);

  // Calculate position: plane passes through point on line
  // If b != 0: when x=0, y=c/b, so point is (0, c/b, 0)
  // If b == 0: when y=0, x=c/a, so point is (c/a, 0, 0)
  let position: [number, number, number];
  if (Math.abs(equation.b) > 0.0001) {
    position = [0, equation.c / equation.b, 0];
  } else {
    position = [equation.c / equation.a, 0, 0];
  }

  return (
    <group position={position}>
      <mesh ref={planeRef} rotation={[euler.x, euler.y, euler.z]}>
        <planeGeometry args={[size, size, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.2}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          metalness={0.9}
          roughness={0.1}
          transmission={0.7}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Plane border glow */}
      <mesh rotation={[euler.x, euler.y, euler.z]}>
        <ringGeometry args={[size / 2 - 0.1, size / 2, 64]} />
        <meshBasicMaterial
          color={emissive}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Equation label */}
      <Text
        position={[0, 0, 0.1]}
        rotation={[euler.x, euler.y, euler.z]}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Coordinate grid scanner effect
function GridScanner({ position, active }: { position: [number, number, number]; active: boolean }) {
  const scannerRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!active || !scannerRef.current) return;
    scannerRef.current.rotation.z = clock.getElapsedTime() * 0.5;
  });

  if (!active) return null;

  return (
    <group ref={scannerRef} position={position}>
      {/* Scanning grid lines */}
      {[-1, 0, 1].map((offset) => (
        <mesh key={`h-${offset}`} position={[0, offset * 0.5, 0]}>
          <planeGeometry args={[3, 0.02]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
      {[-1, 0, 1].map((offset) => (
        <mesh key={`v-${offset}`} position={[offset * 0.5, 0, 0]}>
          <planeGeometry args={[0.02, 3]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D Scene
function SystemsScene({ visual }: { visual: SystemsVisual }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  const hasIntersection = visual.intersect !== undefined;
  const intersectionPos: [number, number, number] = hasIntersection
    ? [visual.intersect!.x, visual.intersect!.y, 0]
    : [0, 0, 0];

  // Calculate intersection line (vertical line through intersection point)
  const lineStart = new THREE.Vector3(intersectionPos[0], intersectionPos[1], -5);
  const lineEnd = new THREE.Vector3(intersectionPos[0], intersectionPos[1], 5);

  return (
    <group ref={groupRef}>
      {/* Glassy Planes */}
      <GlassyPlane
        equation={visual.eq1}
        color="#00e5ff"
        emissive="#00e5ff"
        label={`${visual.eq1.a}x + ${visual.eq1.b}y = ${visual.eq1.c}`}
        size={12}
      />

      <GlassyPlane
        equation={visual.eq2}
        color="#ff0080"
        emissive="#ff0080"
        label={`${visual.eq2.a}x + ${visual.eq2.b}y = ${visual.eq2.c}`}
        size={12}
      />

      {/* Intersection line */}
      {hasIntersection && (
        <IntersectionLine
          start={lineStart}
          end={lineEnd}
          color="#ffffff"
        />
      )}

      {/* Quantum pulse at intersection */}
      {hasIntersection && (
        <QuantumPulse position={intersectionPos} active={true} />
      )}

      {/* Grid scanner */}
      {hasIntersection && (
        <GridScanner position={intersectionPos} active={true} />
      )}

      {/* Coordinate axes */}
      <group>
        <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 8, "#ff4444"]} />
        <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 8, "#44ff44"]} />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 8, "#4444ff"]} />

        <Text position={[8.5, 0, 0]} fontSize={0.4} color="#ff4444">X</Text>
        <Text position={[0, 8.5, 0]} fontSize={0.4} color="#44ff44">Y</Text>
        <Text position={[0, 0, 8.5]} fontSize={0.4} color="#4444ff">Z</Text>
      </group>
    </group>
  );
}

export default function S206SystemsCanvas({ visual }: { visual?: SystemsVisual }) {
  if (!visual) {
    return (
      <div className="relative w-full aspect-square max-w-[500px] bg-[#020208] rounded-2xl border border-white/10 flex items-center justify-center">
        <div className="text-white/40 text-center p-8">No system data</div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square max-w-[500px] bg-[#020208] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [10, 8, 10], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#00ffff" />
        <pointLight position={[0, 0, 10]} intensity={0.6} color="#ff0080" />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={25}
          autoRotate
          autoRotateSpeed={0.5}
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
          fadeDistance={30}
          fadeStrength={1}
          position={[0, 0, -0.1]}
        />

        {/* Main scene */}
        <SystemsScene visual={visual} />
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">
          Matrix_Scanner v3.0
        </span>
      </div>

      <div className="absolute bottom-4 left-4 space-y-1 font-mono text-[9px] text-white/50">
        <div className="text-cyan-400">L1: {visual.eq1.a}x + {visual.eq1.b}y = {visual.eq1.c}</div>
        <div className="text-pink-400">L2: {visual.eq2.a}x + {visual.eq2.b}y = {visual.eq2.c}</div>
        {visual.intersect && (
          <div className="text-green-400 font-bold">
            ∩ ({visual.intersect.x.toFixed(2)}, {visual.intersect.y.toFixed(2)})
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // S2.06<br />
        3D_MATRIX_SPACE<br />
        SCAN_STATUS: {visual.intersect ? 'LOCKED' : 'SEARCHING'}
      </div>

      <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
        Linear Systems 3D
      </div>
    </div>
  );
}
