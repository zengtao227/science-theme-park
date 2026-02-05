"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface FerryCanvasProps {
  angle: number; // Rudder angle in degrees
  onCrossing?: (success: boolean) => void;
}

const palette = {
  cyan: "#00e5ff",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  water: "#1a4d6d",
};

// Ferry boat component
function Ferry({ angle, position }: { angle: number; position: THREE.Vector3 }) {
  const ferryRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!ferryRef.current) return;
    ferryRef.current.rotation.z = (angle * Math.PI) / 180;
  });
  
  return (
    <group ref={ferryRef} position={position}>
      {/* Ferry hull */}
      <mesh>
        <boxGeometry args={[1.5, 0.5, 0.3]} />
        <meshPhysicalMaterial
          color={palette.amber}
          metalness={0.6}
          roughness={0.3}
          emissive={palette.amber}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Ferry deck */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.2, 0.25]} />
        <meshPhysicalMaterial
          color={palette.white}
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>
      
      {/* Direction indicator */}
      <mesh position={[0.8, 0, 0]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshBasicMaterial color={palette.green} />
      </mesh>
    </group>
  );
}

// Cable line
function Cable({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  return (
    <Line
      points={[start, end]}
      color={palette.cyan}
      lineWidth={3}
      dashed={false}
    />
  );
}

// Water surface with flow visualization
function WaterSurface() {
  const waterRef = useRef<THREE.Mesh>(null);
  const arrowsRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!waterRef.current) return;
    const time = clock.elapsedTime;
    waterRef.current.position.x = Math.sin(time * 0.5) * 0.1;
    
    if (arrowsRef.current) {
      arrowsRef.current.children.forEach((arrow, i) => {
        arrow.position.x = -10 + ((time * 2 + i * 2) % 20);
      });
    }
  });
  
  return (
    <group>
      {/* Water plane */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshPhysicalMaterial
          color={palette.water}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Flow arrows */}
      <group ref={arrowsRef}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} position={[-10 + i * 2, -0.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.1, 0.3, 8]} />
            <meshBasicMaterial color={palette.cyan} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// River banks
function RiverBanks() {
  return (
    <group>
      {/* Left bank (Grossbasel) */}
      <mesh position={[-10, 0, 0]}>
        <boxGeometry args={[1, 2, 10]} />
        <meshPhysicalMaterial
          color="#2d5016"
          roughness={0.8}
        />
      </mesh>
      <Text position={[-10, 1.5, 0]} fontSize={0.3} color={palette.white}>
        GROSSBASEL
      </Text>
      
      {/* Right bank (Kleinbasel) */}
      <mesh position={[10, 0, 0]}>
        <boxGeometry args={[1, 2, 10]} />
        <meshPhysicalMaterial
          color="#2d5016"
          roughness={0.8}
        />
      </mesh>
      <Text position={[10, 1.5, 0]} fontSize={0.3} color={palette.white}>
        KLEINBASEL
      </Text>
    </group>
  );
}

export default function FerryCanvas({ angle, onCrossing }: FerryCanvasProps) {
  const [ferryPos, setFerryPos] = useState(new THREE.Vector3(-8, 0, 0));
  const [cableAnchor] = useState(new THREE.Vector3(0, 2, 0));
  const [isCrossing, setIsCrossing] = useState(false);
  const [crossingSuccess, setCrossingSuccess] = useState(false);
  
  // Physics simulation
  useEffect(() => {
    if (!isCrossing) return;
    
    const interval = setInterval(() => {
      setFerryPos((prev) => {
        const theta = (angle * Math.PI) / 180;
        
        // Current force (rightward)
        const currentForce = 0.05;
        
        // Cable tension force (depends on angle)
        const cableTension = Math.sin(theta) * 0.08;
        
        // Net horizontal movement
        const dx = currentForce + cableTension;
        const dy = Math.cos(theta) * 0.02; // Slight vertical drift
        
        const newPos = new THREE.Vector3(
          prev.x + dx,
          prev.y + dy,
          prev.z
        );
        
        // Check if reached right bank
        if (newPos.x >= 8) {
          setIsCrossing(false);
          const success = Math.abs(newPos.y) < 2; // Within acceptable range
          setCrossingSuccess(success);
          if (onCrossing) onCrossing(success);
          return prev;
        }
        
        // Check if drifted too far
        if (Math.abs(newPos.y) > 5) {
          setIsCrossing(false);
          setCrossingSuccess(false);
          if (onCrossing) onCrossing(false);
          return prev;
        }
        
        return newPos;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isCrossing, angle, onCrossing]);
  
  const handleStart = () => {
    setFerryPos(new THREE.Vector3(-8, 0, 0));
    setIsCrossing(true);
    setCrossingSuccess(false);
  };
  
  const handleReset = () => {
    setFerryPos(new THREE.Vector3(-8, 0, 0));
    setIsCrossing(false);
    setCrossingSuccess(false);
  };
  
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 8, 15], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000510"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={10}
          maxDistance={25}
          maxPolarAngle={Math.PI / 2.5}
        />
        
        {/* Scene elements */}
        <WaterSurface />
        <RiverBanks />
        <Cable start={cableAnchor} end={ferryPos} />
        <Ferry angle={angle} position={ferryPos} />
        
        {/* Cable anchor point */}
        <mesh position={cableAnchor}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={palette.cyan} />
        </mesh>
        
        {/* Title */}
        <Text position={[0, 5, 0]} fontSize={0.5} color={palette.cyan}>
          RHINE FERRY SIMULATOR
        </Text>
      </Canvas>
      
      {/* Controls panel */}
      <div className="absolute bottom-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-3">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          Ferry Controls
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleStart}
            disabled={isCrossing}
            className="px-4 py-2 bg-green-500/20 border border-green-400 text-green-400 text-xs font-bold rounded hover:bg-green-500/30 disabled:opacity-50"
          >
            START ENGINES
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-pink-500/20 border border-pink-400 text-pink-400 text-xs font-bold rounded hover:bg-pink-500/30"
          >
            RESET
          </button>
        </div>
        <div className="text-[10px] text-white/60 font-mono">
          Status: {isCrossing ? "CROSSING..." : crossingSuccess ? "ARRIVED SAFELY" : "STATIONARY"}
        </div>
      </div>
      
      {/* Angle display */}
      <div className="absolute top-4 left-4 bg-black/70 border border-amber-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-amber-400/60 uppercase tracking-wider mb-1">
          Rudder Angle
        </div>
        <div className="text-2xl font-mono text-white font-black">
          {angle.toFixed(1)}°
        </div>
      </div>
      
      {/* Physics info */}
      <div className="absolute top-4 right-4 bg-black/70 border border-purple-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-purple-400/60 uppercase tracking-wider mb-1">
          Force Balance
        </div>
        <div className="text-[10px] font-mono text-white space-y-1">
          <div>F_current: →</div>
          <div>F_cable: ↗ (θ={angle.toFixed(0)}°)</div>
          <div>F_net = F_J + F_T</div>
        </div>
      </div>
      
      {/* Success indicator */}
      {crossingSuccess && (
        <div className="absolute bottom-4 right-4 bg-green-500/20 border border-green-400 rounded-lg px-6 py-2">
          <div className="text-green-400 font-black text-sm animate-pulse">
            ✓ CROSSING SUCCESSFUL
          </div>
        </div>
      )}
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // P1.05<br />
        FERRY_SIM: ACTIVE<br />
        RHINE_CURRENT: 2.5 m/s
      </div>
    </div>
  );
}
