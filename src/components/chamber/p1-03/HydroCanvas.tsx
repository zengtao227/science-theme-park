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

function ParticleField({
  bounds,
  waterSurfaceY
}: {
  bounds: { x: number; y: number; z: number };
  waterSurfaceY: number;
}) {
  const count = 500;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const positions = useRef(
    Array.from({ length: count }, (_, i) => {
      const x = (pseudo(i + 3) - 0.5) * bounds.x * 1.4;
      const y = -bounds.y * 0.5 + pseudo(i + 17) * bounds.y;
      const z = (pseudo(i + 47) - 0.5) * bounds.z * 1.2;
      return new THREE.Vector3(x, y, z);
    })
  );
  const velocities = useRef(
    Array.from({ length: count }, (_, i) => {
      const vx = (pseudo(i + 71) - 0.5) * 0.06;
      const vy = (pseudo(i + 91) - 0.5) * 0.04;
      const vz = (pseudo(i + 121) - 0.5) * 0.06;
      return new THREE.Vector3(vx, vy, vz);
    })
  );

  useFrame((_state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const d = dummy.current;
    
    for (let i = 0; i < count; i += 1) {
      const pos = positions.current[i];
      const vel = velocities.current[i];
      const depth = clamp(waterSurfaceY - pos.y, 0, bounds.y);
      const buoyancy = depth > 0 ? 0.6 : -0.2;
      vel.y += buoyancy * delta * 0.2;
      vel.multiplyScalar(0.99);
      pos.add(vel);
      if (pos.x < -bounds.x * 0.48 || pos.x > bounds.x * 0.48) vel.x *= -1;
      if (pos.z < -bounds.z * 0.48 || pos.z > bounds.z * 0.48) vel.z *= -1;
      if (pos.y < -bounds.y * 0.55) {
        pos.y = -bounds.y * 0.55;
        vel.y = Math.abs(vel.y) * 0.6;
      }
      if (pos.y > waterSurfaceY + 0.25) {
        pos.y = waterSurfaceY + 0.25;
        vel.y = -Math.abs(vel.y) * 0.6;
      }
      d.position.copy(pos);
      d.scale.setScalar(0.8 + pseudo(i) * 0.4);
      d.updateMatrix();
      mesh.setMatrixAt(i, d.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshStandardMaterial color="#9fb3c8" emissive="#567089" emissiveIntensity={0.25} transparent opacity={0.55} />
    </instancedMesh>
  );
}

function PressureTank() {
  const tank = { x: 4.6, y: 3.2, z: 2.4 };
  const waterSurfaceY = 0.6;
  const rho = 1000;
  const g = 9.81;
  const [probeY, setProbeY] = useState(0.2);
  const dragRef = useRef(false);
  const probePos = useMemo(() => new THREE.Vector3(0.2, probeY, 0), [probeY]);

  const pressure = useMemo(() => {
    const depth = Math.max(0, waterSurfaceY - probeY);
    return rho * g * depth;
  }, [probeY, rho, g, waterSurfaceY]);

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
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.15}>
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[tank.x + 0.4, tank.y + 0.2, tank.z + 0.4]} />
        <meshStandardMaterial color={palette.steel} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[tank.x, tank.y, tank.z]} />
        <meshPhysicalMaterial color={palette.water} transmission={0.8} roughness={0.1} thickness={0.7} />
      </mesh>
      <mesh position={[0, -0.7, tank.z * 0.52]}>
        <planeGeometry args={[tank.x, tank.y]} />
        <meshPhysicalMaterial color={palette.water} transmission={0.9} roughness={0.05} thickness={0.4} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[tank.x * 0.98, tank.y * 0.95, tank.z * 0.98]} />
        <meshStandardMaterial color={palette.water} transparent opacity={0.2} emissive={palette.water} emissiveIntensity={0.2} />
      </mesh>
      <ParticleField bounds={tank} waterSurfaceY={waterSurfaceY} />
      <mesh
        position={probePos}
        onPointerDown={(e) => {
          e.stopPropagation();
          dragRef.current = true;
        }}
        onPointerUp={() => {
          dragRef.current = false;
        }}
        onPointerLeave={() => {
          dragRef.current = false;
        }}
        onPointerMove={(e) => {
          if (!dragRef.current) return;
          const y = clamp(e.point.y, -tank.y * 0.55, waterSurfaceY + 0.4);
          setProbeY(y);
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
        {`ρgh, h=${Math.max(0, waterSurfaceY - probeY).toFixed(2)} m`}
      </Text>
      <Text position={[-2.1, 1.4, 0]} fontSize={0.18} color={palette.text} font="/fonts/Inter-Bold.woff">
        PRESSURE LAB
      </Text>
    </Float>
  );
}

function HydraulicPress() {
  const smallRadius = 0.35;
  const largeRadius = 0.8;
  const areaRatio = (largeRadius * largeRadius) / (smallRadius * smallRadius);
  const smallRef = useRef<THREE.Mesh>(null);
  const largeRef = useRef<THREE.Mesh>(null);
  const massRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const smallOffset = Math.sin(t * 1.2) * 0.2;
    const largeOffset = -smallOffset / areaRatio;
    if (smallRef.current) smallRef.current.position.y = smallOffset;
    if (largeRef.current) largeRef.current.position.y = largeOffset;
    if (massRef.current) massRef.current.position.y = largeOffset + 0.5;
  });

  return (
    <Float speed={0.4} rotationIntensity={0.06} floatIntensity={0.1}>
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[5.4, 2.2, 2]} />
        <meshStandardMaterial color={palette.steel} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[5, 1.9, 1.6]} />
        <meshStandardMaterial color={palette.water} transparent opacity={0.25} emissive={palette.water} emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={smallRef} position={[-1.6, -0.1, 0]}>
        <cylinderGeometry args={[smallRadius, smallRadius, 0.3, 32]} />
        <meshStandardMaterial color={palette.purple} emissive={palette.purple} emissiveIntensity={0.6} metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh ref={largeRef} position={[1.6, -0.2, 0]}>
        <cylinderGeometry args={[largeRadius, largeRadius, 0.3, 32]} />
        <meshStandardMaterial color={palette.glow} emissive={palette.glow} emissiveIntensity={0.5} metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh ref={massRef} position={[1.6, 0.3, 0]}>
        <boxGeometry args={[1.1, 0.6, 1.1]} />
        <meshStandardMaterial color="#111820" metalness={0.7} roughness={0.2} emissive={palette.glow} emissiveIntensity={0.2} />
      </mesh>
      <Text position={[-2.3, 1.2, 0]} fontSize={0.18} color={palette.text} font="/fonts/Inter-Bold.woff">
        PASCAL PRESS
      </Text>
      <Text position={[-2.3, 0.9, 0]} fontSize={0.14} color={palette.text} font="/fonts/Inter-Bold.woff">
        {`Area Ratio ≈ ${areaRatio.toFixed(1)}`}
      </Text>
    </Float>
  );
}

export default function HydroCanvas({ stage }: HydroCanvasProps) {
  return (
    <div className="w-full h-[360px] rounded-xl border border-white/10 bg-black/70 overflow-hidden">
      <Canvas camera={{ position: [0, 1.8, 6.4], fov: 45 }}>
        <color attach="background" args={["#05070c"]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 4]} intensity={1.2} />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color={palette.water} />
        {stage === "POWER" ? <HydraulicPress /> : <PressureTank />}
      </Canvas>
    </div>
  );
}
