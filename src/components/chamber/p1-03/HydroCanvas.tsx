"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
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
  turbine: "#a855f7",
  glow: "#39ff14",
  steel: "#1d2633",
  text: "#dbe7ff",
};

const pseudo = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Turbine({ speed, powered }: { speed: number; powered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += speed;
    }
  });

  const bladeColor = powered ? palette.glow : "#536076";

  return (
    <group ref={ref} position={[0.4, -0.2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.35, 0.35, 0.18, 24]} />
        <meshStandardMaterial color={palette.turbine} emissive={palette.turbine} emissiveIntensity={powered ? 0.5 : 0.1} metalness={0.8} roughness={0.2} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI / 3) * i]}>
          <boxGeometry args={[0.08, 0.7, 0.1]} />
          <meshStandardMaterial color={bladeColor} emissive={bladeColor} emissiveIntensity={powered ? 1 : 0.2} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function FlowParticles({ intensity }: { intensity: number }) {
  const count = 48;
  const ref = useRef<THREE.InstancedMesh>(null);
  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => pseudo(i + 1)), [count]);
  const lanes = useMemo(() => Array.from({ length: count }, (_, i) => (i % 6) - 3), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const speed = Math.max(0.4, intensity * 1.6);
    mesh.visible = intensity > 0.05;
    const t = clock.elapsedTime * speed;
    for (let i = 0; i < count; i += 1) {
      const x = -3 + ((t + offsets[i]) % 1) * 6;
      const y = -0.7 + lanes[i] * 0.08;
      dummy.position.set(x, y, -0.2);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color={palette.water} emissive={palette.water} emissiveIntensity={1.6} transparent opacity={0.85} />
    </instancedMesh>
  );
}

export default function HydroCanvas({
  stage,
  mass,
  height,
  velocity,
  time,
  efficiency,
  readoutLabel,
  readoutValue,
  readoutUnit
}: HydroCanvasProps) {
  const flowIntensity = useMemo(() => {
    if (stage === "POTENTIAL") return clamp((height ?? 0) / 50, 0.15, 1);
    if (stage === "KINETIC") return clamp((velocity ?? 0) / 15, 0.15, 1);
    if (stage === "POWER") return clamp((readoutValue ?? 0) / 30000, 0.15, 1);
    return 0.4;
  }, [height, readoutValue, stage, velocity]);

  const spinSpeed = useMemo(() => 0.02 + flowIntensity * 0.06, [flowIntensity]);
  const powered = flowIntensity > 0.2;
  const efficiencyGlow = efficiency ? clamp(efficiency, 0.2, 1) : 0.6;

  const displayText = readoutValue !== undefined && readoutValue !== null
    ? `${readoutLabel ?? ""} ${readoutValue.toFixed(1)} ${readoutUnit ?? ""}`.trim()
    : `${readoutLabel ?? ""}`.trim();

  return (
    <div className="w-full h-[320px] rounded-xl border border-white/10 bg-black/70 overflow-hidden">
      <Canvas camera={{ position: [0, 1.8, 6.2], fov: 45 }}>
        <color attach="background" args={["#05070c"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 4, 3]} intensity={1.2} />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color={palette.water} />
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.15}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]}>
            <planeGeometry args={[9, 4]} />
            <meshStandardMaterial color="#08131f" metalness={0.2} roughness={0.7} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, -0.2]}>
            <planeGeometry args={[8.5, 3.2]} />
            <meshStandardMaterial color={palette.water} emissive={palette.water} emissiveIntensity={0.2 + flowIntensity * 0.6} transparent opacity={0.5} />
          </mesh>
          <mesh position={[-1.8, -0.2, -0.4]}>
            <boxGeometry args={[0.8, 2.2, 0.8]} />
            <meshStandardMaterial color={palette.steel} metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh position={[-0.8, -0.3, -0.4]}>
            <boxGeometry args={[1.4, 1.8, 0.9]} />
            <meshStandardMaterial color={palette.steel} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[2.2, -0.1, -0.1]}>
            <boxGeometry args={[1.6, 1.5, 0.7]} />
            <meshStandardMaterial color="#111820" metalness={0.4} roughness={0.4} emissive={palette.turbine} emissiveIntensity={0.2 + efficiencyGlow * 0.6} />
          </mesh>
          <Turbine speed={spinSpeed} powered={powered} />
          <FlowParticles intensity={flowIntensity} />
          <Text position={[0, 1.1, 0]} fontSize={0.2} color={palette.text} font="/fonts/Inter-Bold.woff">
            {displayText}
          </Text>
          {mass !== undefined && (
            <Text position={[-2.4, 0.75, 0]} fontSize={0.14} color="#7b8ca3" font="/fonts/Inter-Bold.woff">
              {`${mass} kg`}
            </Text>
          )}
          {height !== undefined && (
            <Text position={[-2.4, 0.52, 0]} fontSize={0.14} color="#7b8ca3" font="/fonts/Inter-Bold.woff">
              {`${height} m`}
            </Text>
          )}
          {velocity !== undefined && (
            <Text position={[-2.4, 0.29, 0]} fontSize={0.14} color="#7b8ca3" font="/fonts/Inter-Bold.woff">
              {`${velocity} m/s`}
            </Text>
          )}
          {time !== undefined && (
            <Text position={[-2.4, 0.06, 0]} fontSize={0.14} color="#7b8ca3" font="/fonts/Inter-Bold.woff">
              {`${time} s`}
            </Text>
          )}
          {efficiency !== undefined && (
            <Text position={[-2.4, -0.17, 0]} fontSize={0.14} color={palette.glow} font="/fonts/Inter-Bold.woff">
              {`η ${efficiency}`}
            </Text>
          )}
        </Float>
      </Canvas>
    </div>
  );
}
