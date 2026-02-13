"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface DerivativeVisualizationProps {
  functionLatex: string;
  xPosition: number;
  translations?: {
    title: string;
    xLabel: string;
    yLabel: string;
    functionLabel?: string;
    pointLabel?: string;
  };
}

const palette = {
  cyan: "#00e5ff",
  green: "#39ff14",
  pink: "#ff2d7d",
  white: "#ffffff",
};

// Parse simple function expressions for visualization
function parseFunction(latex: string): (x: number) => number {
  // Handle common patterns
  if (latex.includes("(2x^2 + 3x)") && latex.includes("sin(x)")) {
    return (x: number) => (2 * x * x + 3 * x) * Math.sin(x);
  }
  if (latex.includes("x^2 + 1") && latex.includes("sin(x)")) {
    return (x: number) => (x * x + 1) / Math.sin(x);
  }
  // Default: simple parabola
  return (x: number) => 0.5 * x * x;
}

function FunctionCurve({ func }: { func: (x: number) => number }) {
  const points: THREE.Vector3[] = [];
  
  for (let x = -4; x <= 4; x += 0.1) {
    try {
      const y = func(x);
      if (isFinite(y) && Math.abs(y) < 10) {
        points.push(new THREE.Vector3(x, y, 0));
      }
    } catch (e) {
      // Skip invalid points
    }
  }
  
  return (
    <Line
      points={points}
      color={palette.cyan}
      lineWidth={3}
    />
  );
}

function GridAndAxes({ translations }: { translations: DerivativeVisualizationProps["translations"] }) {
  const gridLines: THREE.Vector3[][] = [];
  
  // Vertical lines
  for (let x = -4; x <= 4; x += 1) {
    gridLines.push([
      new THREE.Vector3(x, -4, 0),
      new THREE.Vector3(x, 4, 0),
    ]);
  }
  
  // Horizontal lines
  for (let y = -4; y <= 4; y += 1) {
    gridLines.push([
      new THREE.Vector3(-4, y, 0),
      new THREE.Vector3(4, y, 0),
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
      
      {/* X-axis */}
      <Line
        points={[new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />
      
      {/* Y-axis */}
      <Line
        points={[new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 4, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />
      
      {/* Axis labels */}
      {translations && (
        <>
          <Text position={[4.5, 0, 0]} fontSize={0.3} color={palette.cyan}>
            {translations.xLabel}
          </Text>
          <Text position={[0, 4.5, 0]} fontSize={0.3} color={palette.cyan}>
            {translations.yLabel}
          </Text>
        </>
      )}
    </group>
  );
}

function PointMarker({ x, func }: { x: number; func: (x: number) => number }) {
  const y = useMemo(() => {
    try {
      const val = func(x);
      return isFinite(val) ? val : 0;
    } catch {
      return 0;
    }
  }, [x, func]);
  
  return (
    <mesh position={[x, y, 0]}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshPhysicalMaterial
        color={palette.green}
        emissive={palette.green}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

export default function DerivativeVisualization({
  functionLatex,
  xPosition,
  translations = {
    title: "FUNCTION VISUALIZATION",
    xLabel: "x",
    yLabel: "f(x)",
    functionLabel: "FUNCTION",
    pointLabel: "POINT"
  }
}: DerivativeVisualizationProps) {
  const func = useMemo(() => parseFunction(functionLatex), [functionLatex]);
  
  return (
    <div className="relative w-full h-[700px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, 10]} intensity={0.5} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={16}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Grid and axes */}
        <GridAndAxes translations={translations} />
        
        {/* Function curve */}
        <FunctionCurve func={func} />
        
        {/* Point marker */}
        <PointMarker x={xPosition} func={func} />
        
        {/* Title */}
        <Text position={[0, 5, 0]} fontSize={0.35} color={palette.white} anchorX="center" anchorY="middle">
          {translations.title}
        </Text>
      </Canvas>
      
      {/* Function formula display */}
      <div className="absolute top-4 left-4 bg-black/80 border border-cyan-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider mb-2">
          {translations.functionLabel || "FUNCTION"}
        </div>
        <div className="text-white font-mono text-sm">
          <InlineMath math={functionLatex} />
        </div>
      </div>
      
      {/* Point info */}
      <div className="absolute bottom-4 right-4 bg-black/80 border border-green-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-green-400/60 uppercase tracking-wider mb-1">
          {translations.pointLabel || "POINT"}
        </div>
        <div className="text-green-400 font-mono text-sm">
          x = {xPosition.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
