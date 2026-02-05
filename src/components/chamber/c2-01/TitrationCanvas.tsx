"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cylinder, Float, Points, PointMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

export type TitrationPoint = { v: number; ph: number };

interface C201TitrationCanvasProps {
  curve: TitrationPoint[];
  probeVolume: number;
  maxVolume: number;
  targetVolume: number;
  phValue: number;
  status?: { ok: boolean } | null;
}

function phToColor(ph: number) {
  const clamped = Math.max(0, Math.min(14, ph));
  const hue = clamped <= 7 ? 120 * (clamped / 7) : 120 + 120 * ((clamped - 7) / 7);
  return new THREE.Color(`hsl(${hue}, 80%, 55%)`);
}

function Bubbles({ count = 120 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    const pseudo = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      const r = pseudo(i + 1) * 0.6;
      const theta = pseudo(i + 11) * Math.PI * 2;
      p[i * 3] = Math.cos(theta) * r;
      p[i * 3 + 1] = -1 + pseudo(i + 101) * 2;
      p[i * 3 + 2] = Math.sin(theta) * r;
    }
    return p;
  }, [count]);

  return (
    <Points positions={points} stride={3}>
      <PointMaterial transparent color="#7ad7ff" size={0.04} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function Droplet({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.y = 1.7 + Math.sin(t * 2) * 0.12;
      ref.current.scale.setScalar(active ? 1 + Math.sin(t * 3) * 0.05 : 0.9);
    }
  });

  return (
    <mesh ref={ref} position={[0.2, 1.7, 0]}>
      <sphereGeometry args={[0.12, 18, 18]} />
      <meshStandardMaterial color="#7ad7ff" transparent opacity={0.8} emissive="#1b9bd7" />
    </mesh>
  );
}

export default function C201_TitrationCanvas({
  curve,
  probeVolume,
  maxVolume,
  targetVolume,
  phValue,
  status,
}: C201TitrationCanvasProps) {
  const fillRatio = Math.max(0.1, Math.min(1, probeVolume / maxVolume));
  const liquidHeight = 0.6 + fillRatio * 1.4;
  const liquidY = -1.2 + liquidHeight / 2;
  const liquidColor = phToColor(phValue);
  const targetGlow = Math.abs(probeVolume - targetVolume) < maxVolume * 0.05;

  return (
    <div className="w-full h-full bg-black/80 rounded-2xl overflow-hidden border border-white/10 relative">
      <Canvas camera={{ position: [0, 0.5, 4.2], fov: 45 }}>
        <color attach="background" args={["#03070f"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={1.2} />
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.15}>
          <group>
            <Cylinder args={[1.05, 1.1, 2.8, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#0b1220" transparent opacity={0.15} wireframe />
            </Cylinder>
            <Cylinder args={[0.92, 1, liquidHeight, 32]} position={[0, liquidY, 0]}>
              <meshStandardMaterial color={liquidColor} transparent opacity={0.7} emissive={liquidColor} emissiveIntensity={0.2} />
            </Cylinder>
            <Bubbles count={140} />
            <Droplet active={status?.ok ?? false} />
            <mesh position={[0, -1.45, -0.6]}>
              <circleGeometry args={[1.3, 32]} />
              <meshBasicMaterial color={liquidColor} transparent opacity={targetGlow ? 0.25 : 0.12} />
            </mesh>
          </group>
          <Text position={[0, 1.6, 0]} fontSize={0.18} color="#c8f4ff" font="/fonts/Inter-Bold.woff">
            pH {phValue.toFixed(2)}
          </Text>
        </Float>
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] uppercase tracking-[0.3em] font-black text-white/50">
        <span>RHINE PH SENTINEL</span>
        <span>{curve.length} SAMPLES</span>
      </div>
    </div>
  );
}
