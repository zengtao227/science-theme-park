"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface CoordinateCanvasProps {
  stage: "DISTANCE" | "MIDPOINT" | "SLOPE";
  point1?: [number, number];
  point2?: [number, number];
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
};

// Grid background
function CoordinateGrid() {
  const gridLines: THREE.Vector3[][] = [];
  
  // Vertical lines
  for (let x = -10; x <= 10; x++) {
    gridLines.push([
      new THREE.Vector3(x, -10, 0),
      new THREE.Vector3(x, 10, 0),
    ]);
  }
  
  // Horizontal lines
  for (let y = -10; y <= 10; y++) {
    gridLines.push([
      new THREE.Vector3(-10, y, 0),
      new THREE.Vector3(10, y, 0),
    ]);
  }
  
  return (
    <group>
      {gridLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={palette.white}
          lineWidth={1}
          transparent
          opacity={0.1}
        />
      ))}
      
      {/* Axes */}
      <Line
        points={[new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />
      <Line
        points={[new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />
      
      {/* Axis labels */}
      <Text position={[10.5, 0, 0]} fontSize={0.4} color={palette.cyan}>
        x
      </Text>
      <Text position={[0, 10.5, 0]} fontSize={0.4} color={palette.cyan}>
        y
      </Text>
    </group>
  );
}

// Point marker
function Point({ position, label, color }: { position: [number, number]; label: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2) * 0.1;
    meshRef.current.scale.setScalar(pulse);
  });
  
  return (
    <group position={[position[0], position[1], 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
        />
      </mesh>
      <Text position={[0, 0.6, 0]} fontSize={0.3} color={palette.white}>
        {label}
      </Text>
      <Text position={[0, -0.6, 0]} fontSize={0.25} color={color}>
        ({position[0]}, {position[1]})
      </Text>
    </group>
  );
}

// Distance visualization
function DistanceVisualization({ p1, p2 }: { p1: [number, number]; p2: [number, number] }) {
  const distance = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
  
  return (
    <group>
      {/* Line between points */}
      <Line
        points={[
          new THREE.Vector3(p1[0], p1[1], 0),
          new THREE.Vector3(p2[0], p2[1], 0),
        ]}
        color={palette.green}
        lineWidth={3}
      />
      
      {/* Right triangle */}
      <Line
        points={[
          new THREE.Vector3(p1[0], p1[1], 0),
          new THREE.Vector3(p2[0], p1[1], 0),
        ]}
        color={palette.amber}
        lineWidth={2}
        dashed
        dashSize={0.2}
        gapSize={0.1}
      />
      <Line
        points={[
          new THREE.Vector3(p2[0], p1[1], 0),
          new THREE.Vector3(p2[0], p2[1], 0),
        ]}
        color={palette.amber}
        lineWidth={2}
        dashed
        dashSize={0.2}
        gapSize={0.1}
      />
      
      {/* Distance label */}
      <Text
        position={[(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2 + 0.5, 0]}
        fontSize={0.35}
        color={palette.green}
      >
        d = {distance.toFixed(2)}
      </Text>
      
      {/* Δx and Δy labels */}
      <Text
        position={[(p1[0] + p2[0]) / 2, p1[1] - 0.5, 0]}
        fontSize={0.25}
        color={palette.amber}
      >
        Δx = {Math.abs(p2[0] - p1[0])}
      </Text>
      <Text
        position={[p2[0] + 0.5, (p1[1] + p2[1]) / 2, 0]}
        fontSize={0.25}
        color={palette.amber}
      >
        Δy = {Math.abs(p2[1] - p1[1])}
      </Text>
    </group>
  );
}

// Midpoint visualization
function MidpointVisualization({ p1, p2 }: { p1: [number, number]; p2: [number, number] }) {
  const midpoint: [number, number] = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  
  return (
    <group>
      {/* Line between points */}
      <Line
        points={[
          new THREE.Vector3(p1[0], p1[1], 0),
          new THREE.Vector3(p2[0], p2[1], 0),
        ]}
        color={palette.purple}
        lineWidth={3}
      />
      
      {/* Midpoint */}
      <Point position={midpoint} label="M" color={palette.pink} />
      
      {/* Dashed lines to midpoint */}
      <Line
        points={[
          new THREE.Vector3(p1[0], p1[1], 0),
          new THREE.Vector3(midpoint[0], midpoint[1], 0),
        ]}
        color={palette.pink}
        lineWidth={2}
        dashed
        dashSize={0.3}
        gapSize={0.15}
      />
      <Line
        points={[
          new THREE.Vector3(midpoint[0], midpoint[1], 0),
          new THREE.Vector3(p2[0], p2[1], 0),
        ]}
        color={palette.pink}
        lineWidth={2}
        dashed
        dashSize={0.3}
        gapSize={0.15}
      />
    </group>
  );
}

// Slope visualization
function SlopeVisualization({ p1, p2 }: { p1: [number, number]; p2: [number, number] }) {
  const slope = (p2[1] - p1[1]) / (p2[0] - p1[0]);
  const rise = p2[1] - p1[1];
  const run = p2[0] - p1[0];
  
  return (
    <group>
      {/* Line between points */}
      <Line
        points={[
          new THREE.Vector3(p1[0], p1[1], 0),
          new THREE.Vector3(p2[0], p2[1], 0),
        ]}
        color={palette.cyan}
        lineWidth={3}
      />
      
      {/* Slope triangle */}
      <Line
        points={[
          new THREE.Vector3(p1[0], p1[1], 0),
          new THREE.Vector3(p2[0], p1[1], 0),
          new THREE.Vector3(p2[0], p2[1], 0),
        ]}
        color={palette.amber}
        lineWidth={2}
      />
      
      {/* Rise and run labels */}
      <Text
        position={[(p1[0] + p2[0]) / 2, p1[1] - 0.5, 0]}
        fontSize={0.3}
        color={palette.amber}
      >
        run = {run}
      </Text>
      <Text
        position={[p2[0] + 0.5, (p1[1] + p2[1]) / 2, 0]}
        fontSize={0.3}
        color={palette.amber}
      >
        rise = {rise}
      </Text>
      
      {/* Slope label */}
      <Text
        position={[(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2 + 1, 0]}
        fontSize={0.4}
        color={palette.cyan}
      >
        m = {slope.toFixed(2)}
      </Text>
    </group>
  );
}

export default function CoordinateCanvas({
  stage = "DISTANCE",
  point1 = [2, 3],
  point2 = [6, 7],
}: CoordinateCanvasProps) {
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={true}
          minDistance={10}
          maxDistance={20}
        />
        
        {/* Grid */}
        <CoordinateGrid />
        
        {/* Points */}
        <Point position={point1} label="A" color={palette.green} />
        <Point position={point2} label="B" color={palette.purple} />
        
        {/* Stage-specific visualization */}
        {stage === "DISTANCE" && <DistanceVisualization p1={point1} p2={point2} />}
        {stage === "MIDPOINT" && <MidpointVisualization p1={point1} p2={point2} />}
        {stage === "SLOPE" && <SlopeVisualization p1={point1} p2={point2} />}
      </Canvas>
      
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {stage === "DISTANCE" && "Distance Formula"}
          {stage === "MIDPOINT" && "Midpoint Formula"}
          {stage === "SLOPE" && "Slope Formula"}
        </div>
        <div className="text-[11px] font-mono text-white">
          A({point1[0]}, {point1[1]}) → B({point2[0]}, {point2[1]})
        </div>
      </div>
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // S2.07<br />
        COORDINATE_SIM: ACTIVE<br />
        MODE: {stage}
      </div>
    </div>
  );
}
