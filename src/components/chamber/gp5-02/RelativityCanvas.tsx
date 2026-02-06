"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface RelativityCanvasProps {
  velocity: number;
  showPhotonClock?: boolean;
}

const pseudo = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const calculateGamma = (v: number) => 1 / Math.sqrt(1 - v * v);

const waterVertexShader = `
varying vec2 vUv;
uniform float time;
void main() {
  vUv = uv;
  vec3 pos = position;
  float wave = sin(uv.x * 10.0 + time * 0.6) * 0.06 + sin(uv.y * 14.0 + time * 0.8) * 0.05;
  pos.z += wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const waterFragmentShader = `
varying vec2 vUv;
uniform float time;
void main() {
  float flow = sin(vUv.x * 12.0 + time * 0.5) * 0.5 + 0.5;
  vec3 deep = vec3(0.02, 0.08, 0.18);
  vec3 glow = vec3(0.0, 0.76, 1.0);
  vec3 color = mix(deep, glow, flow * 0.35 + vUv.y * 0.2);
  gl_FragColor = vec4(color, 0.9);
}
`;

function RhineWater() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
      <planeGeometry args={[26, 18, 120, 120]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        transparent
        uniforms={{
          time: { value: 0 },
        }}
      />
    </mesh>
  );
}

function Skyline({
  velocity,
  side,
}: {
  velocity: number;
  side: 1 | -1;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 70;

  const buildings = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x = side * (4.2 + pseudo(i * 3.7) * 2.4);
      const z = -10 + (i / count) * 20 + (pseudo(i * 1.3) - 0.5) * 1.2;
      const height = 1.2 + pseudo(i * 9.1) * 5.8;
      const width = 0.4 + pseudo(i * 5.7) * 0.8;
      const depth = 0.4 + pseudo(i * 8.2) * 0.9;
      return { x, z, height, width, depth };
    });
  }, [side]);

  useEffect(() => {
    if (!meshRef.current) return;
    const doppler = Math.sqrt((1 + velocity) / (1 - velocity));
    const shift = Math.min(1, Math.max(0, (doppler - 1) * 0.6));
    const blue = new THREE.Color("#00e5ff");
    const red = new THREE.Color("#ff2d7d");
    const base = new THREE.Color("#1f2937");
    const tint = side === 1 ? red : blue;

    buildings.forEach((building, i) => {
      dummy.position.set(building.x, -2.4 + building.height / 2, building.z);
      dummy.scale.set(building.width, building.height, building.depth);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      const color = base.clone().lerp(tint, shift + pseudo(i * 2.4) * 0.15);
      meshRef.current!.setColorAt(i, color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [buildings, dummy, side, velocity]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        vertexColors
        emissive="#0f172a"
        emissiveIntensity={0.8}
        metalness={0.5}
        roughness={0.4}
      />
    </instancedMesh>
  );
}

function RhineBridge() {
  return (
    <group position={[0, -1.4, 1]}>
      <mesh>
        <boxGeometry args={[7, 0.2, 0.6]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      {[ -2.4, 0, 2.4 ].map((x) => (
        <mesh key={x} position={[x, -0.6, 0]}>
          <torusGeometry args={[0.6, 0.08, 12, 32, Math.PI]} />
          <meshStandardMaterial color="#0ea5a4" emissive="#0ea5a4" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function PhotonClock({ velocity, moving }: { velocity: number; moving: boolean }) {
  const lightRef = useRef<THREE.Mesh>(null);
  const gamma = calculateGamma(velocity);
  const height = 2;
  const width = 0.3;

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    const period = moving ? 2 * gamma : 2;
    const phase = (t % period) / period;
    const y = height * (phase < 0.5 ? phase * 2 : 2 - phase * 2) - height / 2;
    const x = moving ? velocity * t * 0.5 : 0;
    lightRef.current.position.set(x, y, 0);
  });

  const xOffset = moving ? 3.6 : -3.6;

  return (
    <group position={[xOffset, 0.2, 0]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, 0.1, width]} />
        <meshPhysicalMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[width, 0.1, width]} />
        <meshPhysicalMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} metalness={1} roughness={0.1} />
      </mesh>
      <mesh ref={lightRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={2} metalness={0.9} roughness={0.1} />
      </mesh>
      <Line
        points={[
          new THREE.Vector3(-width / 2, -height / 2, 0),
          new THREE.Vector3(-width / 2, height / 2, 0),
        ]}
        color="#ffffff"
        lineWidth={1}
        transparent
        opacity={0.3}
      />
      <Line
        points={[
          new THREE.Vector3(width / 2, -height / 2, 0),
          new THREE.Vector3(width / 2, height / 2, 0),
        ]}
        color="#ffffff"
        lineWidth={1}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

function RelativityTrain({ velocity }: { velocity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const gamma = calculateGamma(velocity);
  const contracted = 3 / gamma;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = Math.sin(clock.elapsedTime * 0.4) * 3;
  });

  return (
    <group position={[0, -1.2, 0]}>
      <mesh ref={ref}>
        <boxGeometry args={[contracted, 0.5, 1]} />
        <meshPhysicalMaterial color="#ff2d7d" emissive="#ff2d7d" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[3, 0.2, 1]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.2} metalness={0.4} roughness={0.5} />
      </mesh>
      <Line points={[new THREE.Vector3(-6, -0.8, 0), new THREE.Vector3(6, -0.8, 0)]} color="#00e5ff" lineWidth={1} transparent opacity={0.2} />
    </group>
  );
}

function DopplerLegend({ velocity }: { velocity: number }) {
  const doppler = Math.sqrt((1 + velocity) / (1 - velocity));
  return (
    <group position={[0, 3.1, -2]}>
      <Text fontSize={0.22} color="#ffffff" anchorX="center" anchorY="middle">
        {`γ = ${calculateGamma(velocity).toFixed(2)}`}
      </Text>
      <Text position={[0, -0.4, 0]} fontSize={0.18} color="#ffd166" anchorX="center" anchorY="middle">
        {`Doppler = ${doppler.toFixed(2)}`}
      </Text>
    </group>
  );
}

function Scene({ velocity, showPhotonClock }: RelativityCanvasProps) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 8, 8]} intensity={0.8} />
      <pointLight position={[-8, 6, -6]} intensity={0.6} />
      <RhineWater />
      <Skyline velocity={velocity} side={1} />
      <Skyline velocity={velocity} side={-1} />
      <RhineBridge />
      {showPhotonClock && (
        <>
          <PhotonClock velocity={0} moving={false} />
          <PhotonClock velocity={velocity} moving={true} />
        </>
      )}
      <RelativityTrain velocity={velocity} />
      <DopplerLegend velocity={velocity} />
    </>
  );
}

export default function RelativityCanvas({ velocity, showPhotonClock = true }: RelativityCanvasProps) {
  return (
    <div className="w-full h-[420px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 3.2, 12]} fov={50} />
        <OrbitControls enablePan={false} minDistance={6} maxDistance={16} maxPolarAngle={Math.PI / 2.1} />
        <Scene velocity={velocity} showPhotonClock={showPhotonClock} />
        <mesh>
          <sphereGeometry args={[40, 32, 32]} />
          <meshBasicMaterial color="#050510" side={THREE.BackSide} transparent opacity={0.9} />
        </mesh>
      </Canvas>
    </div>
  );
}
