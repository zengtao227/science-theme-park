"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Text } from "@react-three/drei";
import * as THREE from "three";

type Stage = "POTENTIAL" | "KINETIC" | "POWER";

interface HydroCanvasProps {
  stage: Stage;
  mass?: number;
  height?: number;
  velocity?: number;
  time?: number;
  efficiency?: number;
  readoutLabel?: string;
  readoutValue?: number;
  readoutUnit?: string;
}

const palette = {
  water: "#00e5ff",
  glow: "#39ff14",
  steel: "#1d2633",
  purple: "#a855f7",
  text: "#dbe7ff"
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const pseudo = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function PressureArrow({
  origin,
  direction,
  magnitude,
  color
}: {
  origin: THREE.Vector3;
  direction: THREE.Vector3;
  magnitude: number;
  color: string;
}) {
  if (magnitude <= 0) return null;
  const length = clamp(magnitude * 0.0006, 0.2, 1.2);
  const end = origin.clone().add(direction.clone().normalize().multiplyScalar(length));
  return (
    <group>
      <Line points={[origin, end]} color={color} lineWidth={4} transparent opacity={0.8} />
      <Line points={[origin, end]} color={color} lineWidth={10} transparent opacity={0.18} />
      <mesh position={end}>
        <coneGeometry args={[0.06, 0.16, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function Sediment({ bounds }: { bounds: { x: number; y: number; z: number } }) {
  const count = 120;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => pseudo(i + 3)), [count]);
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => pseudo(i + 31)), [count]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i += 1) {
      const x = (offsets[i] - 0.5) * bounds.x * 1.6;
      const y = -bounds.y * 0.5 + (seeds[i] * bounds.y);
      const z = (pseudo(i + 80) - 0.5) * bounds.z * 1.4;
      const drift = Math.sin(t * 0.6 + i) * 0.08;
      dummy.position.set(x + drift, y + Math.sin(t * 0.4 + i) * 0.05, z);
      dummy.updateMatrix();
      ref.current?.setMatrixAt(i, dummy.matrix);
    }
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial color="#9fb3c8" emissive="#567089" emissiveIntensity={0.2} transparent opacity={0.5} />
    </instancedMesh>
  );
}

export default function HydroCanvas({ stage }: HydroCanvasProps) {
  const tank = { x: 4.6, y: 3.2, z: 2.4 };
  const waterSurfaceY = 0.6;
  const rho = 1000;
  const g = 9.81;
  const [probePos, setProbePos] = useState(new THREE.Vector3(0.4, 0.2, 0));
  const dragRef = useRef(false);

  const pressure = useMemo(() => {
    const depth = Math.max(0, waterSurfaceY - probePos.y);
    return rho * g * depth;
  }, [probePos.y, rho, g, waterSurfaceY]);

  const arrows = useMemo(() => {
    const size = 0.22;
    return [
      { origin: probePos.clone().add(new THREE.Vector3(size, 0, 0)), dir: new THREE.Vector3(1, 0, 0) },
      { origin: probePos.clone().add(new THREE.Vector3(-size, 0, 0)), dir: new THREE.Vector3(-1, 0, 0) },
      { origin: probePos.clone().add(new THREE.Vector3(0, size, 0)), dir: new THREE.Vector3(0, 1, 0) },
      { origin: probePos.clone().add(new THREE.Vector3(0, -size, 0)), dir: new THREE.Vector3(0, -1, 0) },
      { origin: probePos.clone().add(new THREE.Vector3(0, 0, size)), dir: new THREE.Vector3(0, 0, 1) },
      { origin: probePos.clone().add(new THREE.Vector3(0, 0, -size)), dir: new THREE.Vector3(0, 0, -1) }
    ];
  }, [probePos]);

  return (
    <div className="w-full h-[360px] rounded-xl border border-white/10 bg-black/70 overflow-hidden">
      <Canvas camera={{ position: [0, 1.8, 6.4], fov: 45 }}>
        <color attach="background" args={["#05070c"]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 4]} intensity={1.2} />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color={palette.water} />
        <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.15}>
          <mesh position={[0, -0.8, 0]}>
            <boxGeometry args={[tank.x + 0.4, tank.y + 0.2, tank.z + 0.4]} />
            <meshStandardMaterial color={palette.steel} metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[tank.x, tank.y, tank.z]} />
            <meshPhysicalMaterial color={palette.water} transmission={0.7} roughness={0.1} thickness={0.6} />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[tank.x * 0.98, tank.y * 0.95, tank.z * 0.98]} />
            <meshStandardMaterial color={palette.water} transparent opacity={0.22} emissive={palette.water} emissiveIntensity={0.2} />
          </mesh>
          <Sediment bounds={tank} />
          <mesh
            position={probePos}
            onPointerDown={(e) => {
              e.stopPropagation();
              dragRef.current = true;
            }}
            onPointerUp={() => {
              dragRef.current = false;
            }}
            onPointerMove={(e) => {
              if (!dragRef.current) return;
              const x = clamp(e.point.x, -tank.x * 0.4, tank.x * 0.4);
              const y = clamp(e.point.y, -tank.y * 0.55, waterSurfaceY + 0.4);
              const z = clamp(e.point.z, -tank.z * 0.4, tank.z * 0.4);
              setProbePos(new THREE.Vector3(x, y, z));
            }}
          >
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color={palette.purple} emissive={palette.purple} emissiveIntensity={0.5} metalness={0.6} roughness={0.2} />
          </mesh>
          {arrows.map((arrow, i) => (
            <PressureArrow key={i} origin={arrow.origin} direction={arrow.dir} magnitude={pressure} color={palette.glow} />
          ))}
          <Text position={probePos.clone().add(new THREE.Vector3(0.6, 0.6, 0))} fontSize={0.22} color={palette.text} font="/fonts/Inter-Bold.woff">
            {`P = ${(pressure / 1000).toFixed(2)} kPa`}
          </Text>
          <Text position={probePos.clone().add(new THREE.Vector3(0.6, 0.4, 0))} fontSize={0.16} color={palette.text} font="/fonts/Inter-Bold.woff">
            {`ρgh, h=${Math.max(0, waterSurfaceY - probePos.y).toFixed(2)} m`}
          </Text>
          <Text position={[-2.1, 1.4, 0]} fontSize={0.18} color={palette.text} font="/fonts/Inter-Bold.woff">
            {stage}
          </Text>
        </Float>
      </Canvas>
    </div>
  );
}
