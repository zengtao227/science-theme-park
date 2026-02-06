"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface RedoxCanvasProps {
  znConcentration: number;
  cuConcentration: number;
  temperature: number;
  showElectrons: boolean;
  showIons: boolean;
}

const palette = {
  zinc: new THREE.Color("#8b9dc3"),
  copper: new THREE.Color("#ff6b35"),
  cuSolution: new THREE.Color("#2563eb"),
  znSolution: new THREE.Color("#0ea5a4"),
  glass: "#ffffff",
  electron: "#ffd166",
  cation: "#ff2d7d",
  anion: "#00e5ff",
};

function Electrode({ position, color, label }: { position: [number, number, number]; color: THREE.Color; label: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 3.2, 24]} />
        <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      <Text position={[0, 2.4, 0]} fontSize={0.28} color={color} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

function Solution({ position, color, concentration }: { position: [number, number, number]; color: THREE.Color; concentration: number }) {
  const mix = Math.max(0, Math.min(1, (concentration - 0.01) / 1.99));
  const solutionColor = color.clone().lerp(new THREE.Color("#f8fafc"), 1 - mix * 0.9);
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[1, 1, 2, 32, 1, true]} />
        <meshPhysicalMaterial color={palette.glass} transparent opacity={0.15} metalness={0.1} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 1, 32]} />
        <meshPhysicalMaterial color={solutionColor} transparent opacity={0.35} metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  );
}

function FlowParticles({
  path,
  color,
  count,
  speed,
  visible,
}: {
  path: THREE.CatmullRomCurve3;
  color: string;
  count: number;
  speed: number;
  visible: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => i / count), [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.visible = visible;
    const t = clock.elapsedTime * speed;
    offsets.forEach((offset, i) => {
      const p = (t + offset) % 1;
      const point = path.getPointAt(p);
      dummy.position.copy(point);
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={1} metalness={0.7} roughness={0.2} transparent opacity={0.9} />
    </instancedMesh>
  );
}

function RedoxScene({
  znConcentration,
  cuConcentration,
  temperature,
  showElectrons,
  showIons,
}: RedoxCanvasProps) {
  const electronPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2, 2.6, 0),
    new THREE.Vector3(-2, 3.2, 0),
    new THREE.Vector3(2, 3.2, 0),
    new THREE.Vector3(2, 2.6, 0),
  ]), []);

  const cationPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1, 0.2, 0.4),
    new THREE.Vector3(-0.2, 0.2, 0.4),
    new THREE.Vector3(0.6, 0.2, -0.4),
    new THREE.Vector3(1.2, 0.2, -0.4),
  ]), []);

  const anionPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.2, 0.1, 0.4),
    new THREE.Vector3(0.4, 0.1, 0.4),
    new THREE.Vector3(-0.4, 0.1, -0.4),
    new THREE.Vector3(-1.1, 0.1, -0.4),
  ]), []);

  const electronSpeed = 0.6 + Math.abs(cuConcentration - znConcentration) * 0.4;
  const ionSpeed = 0.4 + Math.abs(cuConcentration - znConcentration) * 0.3;

  return (
    <>
      <Solution position={[-2, -1, 0]} color={palette.znSolution} concentration={znConcentration} />
      <Electrode position={[-2, -1, 0]} color={palette.zinc} label="Zn (−)" />

      <Solution position={[2, -1, 0]} color={palette.cuSolution} concentration={cuConcentration} />
      <Electrode position={[2, -1, 0]} color={palette.copper} label="Cu (+)" />

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 4.5, 16]} />
        <meshPhysicalMaterial color={palette.glass} transparent opacity={0.2} metalness={0.1} roughness={0.9} />
      </mesh>

      <Line points={electronPath.getPoints(3)} color={palette.electron} lineWidth={3} />

      <FlowParticles path={electronPath} color={palette.electron} count={8} speed={electronSpeed} visible={showElectrons} />
      <FlowParticles path={cationPath} color={palette.cation} count={10} speed={ionSpeed} visible={showIons} />
      <FlowParticles path={anionPath} color={palette.anion} count={10} speed={ionSpeed} visible={showIons} />

      <Text position={[0, 0.9, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        {`T = ${temperature} K`}
      </Text>
    </>
  );
}

export default function RedoxCanvas(props: RedoxCanvasProps) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2.2, 9]} fov={50} />
        <OrbitControls enablePan={false} minDistance={6} maxDistance={16} maxPolarAngle={Math.PI / 2} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.8} />
        <RedoxScene {...props} />
        <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} position={[0, -2.5, 0]} />
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} transparent opacity={0.9} />
        </mesh>
      </Canvas>
    </div>
  );
}
