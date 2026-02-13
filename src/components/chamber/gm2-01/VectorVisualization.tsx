"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface VectorVisualizationProps {
  pointA?: [number, number, number];
  pointB?: [number, number, number];
  vectorV?: [number, number, number];
  vectorW?: [number, number, number];
  showDotProduct?: boolean;
  translations?: {
    title: string;
    pointA: string;
    pointB: string;
    vectorV: string;
    vectorW: string;
  };
}

const palette = {
  cyan: "#00e5ff",
  pink: "#ff2d7d",
  green: "#39ff14",
  yellow: "#ffd166",
  white: "#ffffff",
};

function Vector3DArrow({ 
  start, 
  end, 
  color, 
  label 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  color: string; 
  label: string;
}) {
  const direction = useMemo(() => {
    const dir = new THREE.Vector3(...end).sub(new THREE.Vector3(...start));
    return dir.normalize();
  }, [start, end]);
  
  const length = useMemo(() => {
    return new THREE.Vector3(...end).sub(new THREE.Vector3(...start)).length();
  }, [start, end]);
  
  const midpoint = useMemo(() => {
    return [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2,
    ] as [number, number, number];
  }, [start, end]);
  
  // Create arrow geometry
  const points = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector3(...start));
    pts.push(new THREE.Vector3(...end));
    return pts;
  }, [start, end]);
  
  // Arrow head with proper cone geometry
  const arrowHeadGeometry = useMemo(() => {
    const headLength = Math.min(length * 0.15, 0.4);
    const headRadius = headLength * 0.4;
    
    const dir = new THREE.Vector3(...end).sub(new THREE.Vector3(...start)).normalize();
    const arrowEnd = new THREE.Vector3(...end);
    const coneBase = arrowEnd.clone().sub(dir.clone().multiplyScalar(headLength));
    
    // Calculate rotation to align cone with direction
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(up, dir);
    
    return { position: coneBase, quaternion, headLength, headRadius };
  }, [end, start, length]);
  
  return (
    <group>
      {/* Vector line */}
      <Line points={points} color={color} lineWidth={3} />
      
      {/* Arrow head - closed cone */}
      <mesh 
        position={arrowHeadGeometry.position} 
        quaternion={arrowHeadGeometry.quaternion}
      >
        <coneGeometry args={[arrowHeadGeometry.headRadius, arrowHeadGeometry.headLength, 8]} />
        <meshPhysicalMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Label */}
      <Text
        position={midpoint}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="bottom"
      >
        {label}
      </Text>
    </group>
  );
}

function Point3D({ 
  position, 
  color, 
  label 
}: { 
  position: [number, number, number]; 
  color: string; 
  label: string;
}) {
  return (
    <group>
      <mesh position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <Text
        position={[position[0], position[1] + 0.5, position[2]]}
        fontSize={0.35}
        color={color}
        anchorX="center"
        anchorY="bottom"
      >
        {label}
      </Text>
      {/* Coordinate label */}
      <Text
        position={[position[0], position[1] - 0.5, position[2]]}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="top"
      >
        ({position[0].toFixed(1)}, {position[1].toFixed(1)}, {position[2].toFixed(1)})
      </Text>
    </group>
  );
}

function GridAndAxes() {
  const gridLines: THREE.Vector3[][] = [];
  
  // Grid lines
  for (let i = -5; i <= 5; i++) {
    gridLines.push([
      new THREE.Vector3(i, 0, -5),
      new THREE.Vector3(i, 0, 5),
    ]);
    gridLines.push([
      new THREE.Vector3(-5, 0, i),
      new THREE.Vector3(5, 0, i),
    ]);
  }
  
  return (
    <group>
      {/* Grid */}
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
        points={[new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />
      <Line
        points={[new THREE.Vector3(0, -6, 0), new THREE.Vector3(0, 6, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />
      <Line
        points={[new THREE.Vector3(0, 0, -6), new THREE.Vector3(0, 0, 6)]}
        color={palette.cyan}
        lineWidth={2}
      />
      
      {/* Axis labels */}
      <Text position={[6.5, 0, 0]} fontSize={0.4} color={palette.cyan}>
        x
      </Text>
      <Text position={[0, 6.5, 0]} fontSize={0.4} color={palette.cyan}>
        y
      </Text>
      <Text position={[0, 0, 6.5]} fontSize={0.4} color={palette.cyan}>
        z
      </Text>
    </group>
  );
}

export default function VectorVisualization({
  pointA,
  pointB,
  vectorV,
  vectorW,
  showDotProduct = false,
  translations = {
    title: "VECTOR VISUALIZATION",
    pointA: "Point A",
    pointB: "Point B",
    vectorV: "Vector v",
    vectorW: "Vector w",
  }
}: VectorVisualizationProps) {
  
  // Calculate vector from points if provided
  const calculatedVector = useMemo(() => {
    if (pointA && pointB) {
      return [
        pointB[0] - pointA[0],
        pointB[1] - pointA[1],
        pointB[2] - pointA[2],
      ] as [number, number, number];
    }
    return vectorV;
  }, [pointA, pointB, vectorV]);
  
  // Calculate dot product if both vectors exist
  const dotProduct = useMemo(() => {
    if (calculatedVector && vectorW) {
      return calculatedVector[0] * vectorW[0] + 
             calculatedVector[1] * vectorW[1] + 
             calculatedVector[2] * vectorW[2];
    }
    return null;
  }, [calculatedVector, vectorW]);
  
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [8, 6, 8], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, 10]} intensity={0.5} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          minDistance={5}
          maxDistance={20}
        />
        
        {/* Grid and axes */}
        <GridAndAxes />
        
        {/* Points */}
        {pointA && <Point3D position={pointA} color={palette.cyan} label="A" />}
        {pointB && <Point3D position={pointB} color={palette.pink} label="B" />}
        
        {/* Vectors */}
        {calculatedVector && (
          <Vector3DArrow
            start={pointA || [0, 0, 0]}
            end={pointA ? [
              pointA[0] + calculatedVector[0],
              pointA[1] + calculatedVector[1],
              pointA[2] + calculatedVector[2],
            ] : calculatedVector}
            color={palette.green}
            label="v"
          />
        )}
        
        {vectorW && (
          <Vector3DArrow
            start={[0, 0, 0]}
            end={vectorW}
            color={palette.yellow}
            label="w"
          />
        )}
        
        {/* Title */}
        <Text position={[0, 7, 0]} fontSize={0.4} color={palette.white} anchorX="center">
          {translations.title}
        </Text>
      </Canvas>
      
      {/* Coordinate info overlay - top left */}
      {(pointA || pointB) && (
        <div className="absolute top-4 left-4 bg-black/80 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
          <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider mb-2">
            COORDINATES
          </div>
          {pointA && (
            <div className="text-white font-mono text-sm">
              <span className="text-cyan-400">A:</span> ({pointA[0]}, {pointA[1]}, {pointA[2]})
            </div>
          )}
          {pointB && (
            <div className="text-white font-mono text-sm">
              <span className="text-pink-400">B:</span> ({pointB[0]}, {pointB[1]}, {pointB[2]})
            </div>
          )}
          {vectorW && !pointA && (
            <div className="text-white font-mono text-sm">
              <span className="text-yellow-400">w:</span> ({vectorW[0]}, {vectorW[1]}, {vectorW[2]})
            </div>
          )}
        </div>
      )}
      
      {/* Dot product info overlay - top right */}
      {showDotProduct && dotProduct !== null && (
        <div className="absolute top-4 right-4 bg-black/80 border border-green-400/30 rounded-lg px-4 py-3">
          <div className="text-[9px] text-green-400/60 uppercase tracking-wider mb-2">
            DOT PRODUCT
          </div>
          <div className="text-white font-mono text-xl">
            v · w = {dotProduct.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
