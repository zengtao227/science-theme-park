"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface DerivativeCanvasProps {
  functionType: "power" | "factor" | "sum" | "product" | "quotient" | "chain";
  xPosition?: number;
  derivative?: number;
  translations: {
    title: string;
    subtitle: string;
    xLabel: string;
    yLabel: string;
    slopeLabel: string;
    yourSlope: string;
    correctSlope: string;
    status_chamber: string;
    status_sim: string;
    status_mode: string;
  };
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  road: "#4a5568",
};

// Function definitions
const functions = {
  power: (x: number) => x * x, // f(x) = x^{2}
  powerDerivative: (x: number) => 2 * x, // f'(x) = 2x
  factor: (x: number) => 3 * x * x, // f(x) = 3x^{2}
  factorDerivative: (x: number) => 6 * x, // f'(x) = 6x
  sum: (x: number) => x * x + x, // f(x) = x^{2} + x
  sumDerivative: (x: number) => 2 * x + 1, // f'(x) = 2x + 1
  product: (x: number) => x * Math.sin(x), // f(x) = x·sin(x)
  productDerivative: (x: number) => Math.sin(x) + x * Math.cos(x), // f'(x) = sin(x) + x·cos(x)
  quotient: (x: number) => x / Math.sin(x), // f(x) = x/sin(x)
  quotientDerivative: (x: number) => {
    const sinX = Math.sin(x);
    const cosX = Math.cos(x);
    return (sinX - x * cosX) / (sinX * sinX); // f'(x) = [sin(x) - x·cos(x)] / sin^{2}(x)
  },
  chain: (x: number) => Math.sin(2 * x), // f(x) = sin(2x)
  chainDerivative: (x: number) => 2 * Math.cos(2 * x), // f'(x) = 2·cos(2x)
};

// Road curve (the function graph)
function RoadCurve({ functionType }: { functionType: "power" | "factor" | "sum" | "product" | "quotient" | "chain" }) {
  const points: THREE.Vector3[] = [];
  const func = functionType === "power" ? functions.power :
    functionType === "factor" ? functions.factor :
      functionType === "sum" ? functions.sum :
        functionType === "product" ? functions.product :
          functionType === "quotient" ? functions.quotient :
            functions.chain;

  // Generate curve points
  for (let x = -5; x <= 5; x += 0.1) {
    // Skip points where sin(x) is too close to 0 for quotient
    if (functionType === "quotient" && Math.abs(Math.sin(x)) < 0.1) continue;

    const y = func(x);
    // Clamp y values for quotient to avoid extreme values
    if (functionType === "quotient" && Math.abs(y) > 10) continue;

    points.push(new THREE.Vector3(x, y, 0));
  }

  return (
    <group>
      {/* Main curve (road) */}
      <Line
        points={points}
        color={palette.cyan}
        lineWidth={4}
      />

      {/* Road surface (thicker visual) */}
      <Line
        points={points}
        color={palette.road}
        lineWidth={8}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

// Car on the road
function Car({
  functionType,
  xPosition,
  userDerivative,
}: {
  functionType: "power" | "factor" | "sum" | "product" | "quotient" | "chain";
  xPosition: number;
  userDerivative: number;
}) {
  const carRef = useRef<THREE.Group>(null);

  // Calculate actual function value and derivative
  const func = functionType === "power" ? functions.power :
    functionType === "factor" ? functions.factor :
      functionType === "sum" ? functions.sum :
        functionType === "product" ? functions.product :
          functionType === "quotient" ? functions.quotient :
            functions.chain;
  const derivFunc = functionType === "power" ? functions.powerDerivative :
    functionType === "factor" ? functions.factorDerivative :
      functionType === "sum" ? functions.sumDerivative :
        functionType === "product" ? functions.productDerivative :
          functionType === "quotient" ? functions.quotientDerivative :
            functions.chainDerivative;

  const yPosition = func(xPosition);
  const actualSlope = derivFunc(xPosition);

  // Calculate angles
  const actualAngle = Math.atan(actualSlope);
  const userAngle = Math.atan(userDerivative);

  // Check if user's derivative is close to actual
  const isCorrect = Math.abs(userDerivative - actualSlope) < 0.2;

  useFrame(({ clock }) => {
    if (!carRef.current) return;
    // Gentle bobbing animation
    const bob = Math.sin(clock.elapsedTime * 2) * 0.05;
    carRef.current.position.y = yPosition + bob;
  });

  return (
    <group ref={carRef} position={[xPosition, yPosition, 0]}>
      {/* Car body - rotates based on user's input */}
      <group rotation={[0, 0, userAngle]}>
        {/* Main body */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.8, 0.3, 0.4]} />
          <meshPhysicalMaterial
            color={isCorrect ? palette.green : palette.pink}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Cabin */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.5, 0.25, 0.35]} />
          <meshPhysicalMaterial
            color={palette.cyan}
            transparent
            opacity={0.7}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        {/* Wheels */}
        <mesh position={[-0.3, -0.05, 0.2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshPhysicalMaterial color={palette.white} />
        </mesh>
        <mesh position={[0.3, -0.05, 0.2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshPhysicalMaterial color={palette.white} />
        </mesh>
        <mesh position={[-0.3, -0.05, -0.2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshPhysicalMaterial color={palette.white} />
        </mesh>
        <mesh position={[0.3, -0.05, -0.2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshPhysicalMaterial color={palette.white} />
        </mesh>
      </group>

      {/* Tangent line (correct slope) - shown in green */}
      <Line
        points={[
          new THREE.Vector3(-1.5, -1.5 * actualSlope, 0),
          new THREE.Vector3(1.5, 1.5 * actualSlope, 0),
        ]}
        color={palette.green}
        lineWidth={2}
        transparent
        opacity={0.6}
      />

      {/* User's slope line - shown in pink if incorrect */}
      {!isCorrect && (
        <Line
          points={[
            new THREE.Vector3(-1.5, -1.5 * userDerivative, 0),
            new THREE.Vector3(1.5, 1.5 * userDerivative, 0),
          ]}
          color={palette.pink}
          lineWidth={2}
          dashed
          dashSize={0.2}
          gapSize={0.1}
        />
      )}

      {/* Indicator light */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhysicalMaterial
          color={isCorrect ? palette.green : palette.pink}
          emissive={isCorrect ? palette.green : palette.pink}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

// Grid and axes
function GridAndAxes({ translations }: { translations: DerivativeCanvasProps["translations"] }) {
  const gridLines: THREE.Vector3[][] = [];

  // Vertical lines
  for (let x = -5; x <= 5; x += 1) {
    gridLines.push([
      new THREE.Vector3(x, -3, 0),
      new THREE.Vector3(x, 5, 0),
    ]);
  }

  // Horizontal lines
  for (let y = -3; y <= 5; y += 1) {
    gridLines.push([
      new THREE.Vector3(-5, y, 0),
      new THREE.Vector3(5, y, 0),
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
        points={[new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />

      {/* Y-axis */}
      <Line
        points={[new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, 5, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />

      {/* Axis labels */}
      <Text position={[5.5, 0, 0]} fontSize={0.3} color={palette.cyan}>
        {translations.xLabel}
      </Text>
      <Text position={[0, 5.5, 0]} fontSize={0.3} color={palette.cyan}>
        {translations.yLabel}
      </Text>
    </group>
  );
}

export default function DerivativeCanvas({
  functionType = "power",
  xPosition = 2,
  derivative = 0,
  translations,
}: DerivativeCanvasProps) {
  // Calculate actual derivative for display
  const derivFunc = functionType === "power" ? functions.powerDerivative :
    functionType === "factor" ? functions.factorDerivative :
      functionType === "sum" ? functions.sumDerivative :
        functionType === "product" ? functions.productDerivative :
          functionType === "quotient" ? functions.quotientDerivative :
            functions.chainDerivative;
  const actualDerivative = derivFunc(xPosition);
  const isCorrect = Math.abs(derivative - actualDerivative) < 0.2;

  return (
    <div className="relative w-full h-[700px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, 10]} intensity={0.5} color={palette.cyan} />
        <spotLight position={[xPosition, 10, 5]} intensity={1} angle={0.3} penumbra={0.5} />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Grid and axes */}
        <GridAndAxes translations={translations} />

        {/* Road curve */}
        <RoadCurve functionType={functionType} />

        {/* Car */}
        <Car functionType={functionType} xPosition={xPosition} userDerivative={derivative} />

        {/* Title - moved higher to avoid overlap */}
        <Text position={[0, 7, 0]} fontSize={0.35} color={palette.white} anchorX="center" anchorY="middle">
          {translations.title}
        </Text>
        <Text position={[0, 6.3, 0]} fontSize={0.22} color={palette.cyan} anchorX="center" anchorY="middle">
          {translations.subtitle}
        </Text>
      </Canvas>

      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/80 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2 min-w-[200px]">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {translations.slopeLabel}
        </div>
        <div className="text-[11px] font-mono text-white space-y-1">
          <div>x = {xPosition.toFixed(2)}</div>
          <div className={isCorrect ? "text-green-400" : "text-pink-400"}>
            {translations.yourSlope}: {derivative.toFixed(2)}
          </div>
          <div className="text-green-400/60">
            {translations.correctSlope}: {actualDerivative.toFixed(2)}
          </div>
        </div>
        <div className={`text-[10px] font-bold ${isCorrect ? "text-green-400" : "text-pink-400"}`}>
          {isCorrect ? "✓ CORRECT ANGLE" : "✗ ADJUST SLOPE"}
        </div>
      </div>

      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        {translations.status_chamber} {/* G1.01 */}<br />
        {translations.status_sim}<br />
        {translations.status_mode}: {functionType.toUpperCase()}
      </div>
    </div>
  );
}
