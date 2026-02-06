"use client";

import { useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Line } from "@react-three/drei";
import * as THREE from "three";
import {
  calculateTransmissionCoefficient,
  calculateWaveFunction,
  calculateProbabilityDensity,
} from "@/lib/physics";

interface TunnellingCanvasProps {
  particleEnergy: number; // in eV
  barrierHeight: number; // in eV
  barrierWidth: number; // in nm
}

function WaveFunction({ E, V0, a, time }: { E: number; V0: number; a: number; time: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const numPoints = 200;
    const xRange = 10;
    
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * xRange - xRange / 2;
      const psi = calculateWaveFunction(x, E, V0, a, time);
      pts.push(new THREE.Vector3(x, psi * 0.5, 0));
    }
    
    return pts;
  }, [E, V0, a, time]);

  return (
    <Line
      points={points}
      color="#00e5ff"
      lineWidth={2}
    />
  );
}

function ProbabilityDensity({ E, V0, a, time }: { E: number; V0: number; a: number; time: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const numPoints = 200;
    const xRange = 10;
    
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * xRange - xRange / 2;
      const probDensity = calculateProbabilityDensity(x, E, V0, a, time);
      pts.push(new THREE.Vector3(x, probDensity * 0.3 - 1.5, 0));
    }
    
    return pts;
  }, [E, V0, a, time]);

  return (
    <Line
      points={points}
      color="#a855f7"
      lineWidth={2}
    />
  );
}

function PotentialBarrier({ V0, a }: { V0: number; a: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const xRange = 10;
    const numPoints = 100;
    
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * xRange - xRange / 2;
      let V = 0;
      
      if (x >= -a / 2 && x <= a / 2) {
        V = V0 * 0.3; // Scale for visualization
      }
      
      pts.push(new THREE.Vector3(x, V, 0));
    }
    
    return pts;
  }, [V0, a]);

  return (
    <Line
      points={points}
      color="#ffd166"
      lineWidth={3}
    />
  );
}

function AnimatedWaves(props: TunnellingCanvasProps) {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta * 2);
  });

  return (
    <group>
      <WaveFunction
        E={props.particleEnergy}
        V0={props.barrierHeight}
        a={props.barrierWidth}
        time={time}
      />
      <ProbabilityDensity
        E={props.particleEnergy}
        V0={props.barrierHeight}
        a={props.barrierWidth}
        time={time}
      />
      <PotentialBarrier V0={props.barrierHeight} a={props.barrierWidth} />
    </group>
  );
}

function GridPlane() {
  return (
    <group position={[0, -2, 0]}>
      <gridHelper args={[20, 40, "#00e5ff", "#1a1a1a"]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

function AxisLabels() {
  return (
    <group>
      {/* X-axis label */}
      <mesh position={[5.5, -2, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Y-axis label */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export default function TunnellingCanvas(props: TunnellingCanvasProps) {
  return (
    <div className="w-full h-[800px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={55} />
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          enableRotate={false}
        />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />

        <GridPlane />
        <AnimatedWaves {...props} />
        <AxisLabels />

        {/* Background */}
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
          <meshBasicMaterial
            color="#000000"
            side={THREE.BackSide}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Canvas>
    </div>
  );
}

// Re-export for backward compatibility
export { calculateTransmissionCoefficient };
