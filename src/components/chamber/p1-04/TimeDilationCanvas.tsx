"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars, Text } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface TimeDilationCanvasProps {
  velocityFraction?: number;
  properTimeSeconds?: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function gammaFromBeta(beta: number) {
  const b = clamp(Math.abs(beta), 0, 0.999);
  return 1 / Math.sqrt(1 - b * b);
}

function ClockRing({ radius, color, progress }: { radius: number; color: string; progress: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const steps = 96;
    for (let i = 0; i <= steps; i += 1) {
      const a = (i / steps) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    }
    return pts;
  }, [radius]);

  const hand = useMemo(() => {
    const a = progress * Math.PI * 2;
    return [
      new THREE.Vector3(0, 0, 0.02),
      new THREE.Vector3(Math.cos(a) * radius * 0.9, Math.sin(a) * radius * 0.9, 0.02),
    ];
  }, [progress, radius]);

  return (
    <group>
      <Line points={points} color={color} lineWidth={3} transparent opacity={0.8} />
      <Line points={points} color={color} lineWidth={10} transparent opacity={0.14} />
      <Line points={hand} color={color} lineWidth={2} transparent opacity={0.9} />
      <mesh>
        <circleGeometry args={[radius * 0.9, 32]} />
        <meshStandardMaterial color="#070a12" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function Scene({ velocityFraction = 0.6, properTimeSeconds = 10 }: TimeDilationCanvasProps) {
  const beta = clamp(velocityFraction, 0, 0.999);
  const gamma = gammaFromBeta(beta);
  const ref = useRef({ tau: 0, t: 0 });
  const [progress, setProgress] = useState({ tau: 0, t: 0 });

  useFrame((_s, delta) => {
    ref.current.tau += delta;
    ref.current.t += delta / gamma;
    setProgress({
      tau: (ref.current.tau % properTimeSeconds) / properTimeSeconds,
      t: (ref.current.t % properTimeSeconds) / properTimeSeconds
    });
  });

  return (
    <group>
      <Stars radius={80} depth={40} count={2600} factor={3} fade speed={0.4} />
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.12}>
        <group position={[-2.2, 0, 0]}>
          <ClockRing radius={1.1} color="#00e5ff" progress={progress.tau} />
          <Text position={[0, -1.6, 0]} fontSize={0.18} color="#00e5ff" font="/fonts/Inter-Bold.woff">
            {`Proper Time τ`}
          </Text>
        </group>
        <group position={[2.2, 0, 0]}>
          <ClockRing radius={1.1} color="#a855f7" progress={progress.t} />
          <Text position={[0, -1.6, 0]} fontSize={0.18} color="#a855f7" font="/fonts/Inter-Bold.woff">
            {`Dilated Time t`}
          </Text>
        </group>
        <Text position={[-4.2, 2.2, 0]} fontSize={0.2} color="rgba(255,255,255,0.5)" font="/fonts/Inter-Bold.woff">
          {`β=${beta.toFixed(2)}  γ=${gamma.toFixed(2)}`}
        </Text>
      </Float>
    </group>
  );
}

export default function TimeDilationCanvas(props: TimeDilationCanvasProps) {
  return (
    <div className="w-full h-[360px] rounded-xl border border-white/10 bg-black/70 overflow-hidden">
      <Canvas camera={{ position: [0, 0.8, 7], fov: 45 }}>
        <color attach="background" args={["#02030a"]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[6, 6, 6]} intensity={1.2} />
        <pointLight position={[-6, -4, 4]} intensity={0.8} color="#00e5ff" />
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
