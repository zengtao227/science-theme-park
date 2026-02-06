"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";

interface MotorLabCanvasProps {
  currentOn: boolean;
  polarity: "NS" | "SN";
}

function MotorCore({ currentOn, polarity }: MotorLabCanvasProps) {
  const rotorRef = useRef<THREE.Mesh>(null);
  const direction = polarity === "NS" ? 1 : -1;
  const speed = currentOn ? 1.2 : 0;

  useFrame((state) => {
    if (!rotorRef.current) return;
    rotorRef.current.rotation.z = state.clock.elapsedTime * speed * direction;
  });

  return (
    <group>
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[0.8, 2.2, 0.8]} />
        <meshPhysicalMaterial color={polarity === "NS" ? "#00e5ff" : "#ff2d7d"} emissive={polarity === "NS" ? "#00e5ff" : "#ff2d7d"} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[2.5, 0, 0]}>
        <boxGeometry args={[0.8, 2.2, 0.8]} />
        <meshPhysicalMaterial color={polarity === "NS" ? "#ff2d7d" : "#00e5ff"} emissive={polarity === "NS" ? "#ff2d7d" : "#00e5ff"} emissiveIntensity={0.4} />
      </mesh>
      <Text position={[-2.5, 1.5, 0]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        {polarity === "NS" ? "N" : "S"}
      </Text>
      <Text position={[2.5, 1.5, 0]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        {polarity === "NS" ? "S" : "N"}
      </Text>
      <mesh ref={rotorRef}>
        <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
        <meshPhysicalMaterial color={currentOn ? "#39ff14" : "#1d2633"} emissive={currentOn ? "#39ff14" : "#000000"} emissiveIntensity={currentOn ? 0.6 : 0} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshPhysicalMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={currentOn ? 0.7 : 0.2} />
      </mesh>
    </group>
  );
}

export default function MotorLabCanvas({ currentOn, polarity }: MotorLabCanvasProps) {
  return (
    <div className="w-full h-[360px] bg-black rounded-xl border border-white/10 overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2.5, 8]} fov={50} />
        <OrbitControls enablePan={false} minDistance={5} maxDistance={15} maxPolarAngle={Math.PI / 2} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, 5, 5]} intensity={0.6} />
        <MotorCore currentOn={currentOn} polarity={polarity} />
        <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} position={[0, -2.2, 0]} />
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} transparent opacity={0.9} />
        </mesh>
      </Canvas>
    </div>
  );
}
