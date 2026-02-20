"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface WaveCanvasProps {
  functionType: "power" | "product" | "chain";
  xPosition?: number;
  derivative?: number;
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
};

// Function definitions
const functions = {
  power: (x: number) => 0.5 * x * x, // f(x) = 0.5x^{2}
  powerDerivative: (x: number) => x, // f'(x) = x
  product: (x: number) => x * Math.sin(x), // f(x) = x·sin(x)
  productDerivative: (x: number) => Math.sin(x) + x * Math.cos(x), // f'(x) = sin(x) + x·cos(x)
  chain: (x: number) => Math.sin(2 * x), // f(x) = sin(2x)
  chainDerivative: (x: number) => 2 * Math.cos(2 * x), // f'(x) = 2·cos(2x)
};

// Wave surface
function WaveSurface({ functionType }: { functionType: "power" | "product" | "chain" }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 10, 100, 50);
    const positions = geo.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      
      let z = 0;
      if (functionType === "power") {
        z = functions.power(x / 2);
      } else if (functionType === "product") {
        z = functions.product(x / 2);
      } else {
        z = functions.chain(x / 2);
      }
      
      positions.setZ(i, z);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [functionType]);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.elapsedTime;
    const geom = meshRef.current.geometry as THREE.PlaneGeometry;
    const positions = geom.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      
      let z = 0;
      if (functionType === "power") {
        z = functions.power(x / 2) + Math.sin(time + x * 0.5) * 0.1;
      } else if (functionType === "product") {
        z = functions.product(x / 2) + Math.sin(time + x * 0.5) * 0.1;
      } else {
        z = functions.chain(x / 2) + Math.sin(time + x * 0.5) * 0.1;
      }
      
      positions.setZ(i, z);
    }
    
    positions.needsUpdate = true;
    geom.computeVertexNormals();
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshPhysicalMaterial
        color={palette.cyan}
        wireframe={false}
        transparent
        opacity={0.8}
        metalness={0.5}
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Surfer (point on the curve)
function Surfer({
  functionType,
  xPosition,
  derivative,
}: {
  functionType: "power" | "product" | "chain";
  xPosition: number;
  derivative: number;
}) {
  const surferRef = useRef<THREE.Group>(null);
  
  // Calculate actual function value and derivative
  let yActual = 0;
  let slopeActual = 0;
  
  if (functionType === "power") {
    yActual = functions.power(xPosition);
    slopeActual = functions.powerDerivative(xPosition);
  } else if (functionType === "product") {
    yActual = functions.product(xPosition);
    slopeActual = functions.productDerivative(xPosition);
  } else {
    yActual = functions.chain(xPosition);
    slopeActual = functions.chainDerivative(xPosition);
  }
  
  // Calculate angle from derivative
  const angleUser = Math.atan(derivative);
  
  useFrame(({ clock }) => {
    if (!surferRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.1;
    surferRef.current.scale.setScalar(pulse);
  });
  
  // Check if user's derivative is close to actual
  const isCorrect = Math.abs(derivative - slopeActual) < 0.1;
  
  return (
    <group ref={surferRef} position={[xPosition, yActual, 0]}>
      {/* Surfer body */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial
          color={isCorrect ? palette.green : palette.pink}
          emissive={isCorrect ? palette.green : palette.pink}
          emissiveIntensity={1}
        />
      </mesh>
      
      {/* Surfboard (shows user's angle) */}
      <mesh rotation={[0, 0, angleUser]}>
        <boxGeometry args={[1, 0.1, 0.3]} />
        <meshPhysicalMaterial
          color={palette.amber}
          emissive={palette.amber}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Tangent line (actual derivative) */}
      <Line
        points={[
          new THREE.Vector3(-2, -2 * slopeActual, 0),
          new THREE.Vector3(2, 2 * slopeActual, 0),
        ]}
        color={palette.green}
        lineWidth={2}
        transparent
        opacity={0.5}
      />
      
      {/* User's line */}
      <Line
        points={[
          new THREE.Vector3(-2, -2 * derivative, 0),
          new THREE.Vector3(2, 2 * derivative, 0),
        ]}
        color={palette.pink}
        lineWidth={2}
        dashed
        dashSize={0.2}
        gapSize={0.1}
      />
    </group>
  );
}

// Grid
function CalculusGrid() {
  const gridLines: THREE.Vector3[][] = [];
  
  // X-axis lines
  for (let x = -10; x <= 10; x += 2) {
    gridLines.push([
      new THREE.Vector3(x, -5, 0),
      new THREE.Vector3(x, 5, 0),
    ]);
  }
  
  // Y-axis lines
  for (let y = -5; y <= 5; y += 1) {
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
        points={[new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 5, 0)]}
        color={palette.cyan}
        lineWidth={2}
      />
      
      {/* Axis labels */}
      <Text position={[10.5, 0, 0]} fontSize={0.3} color={palette.cyan}>
        x
      </Text>
      <Text position={[0, 5.5, 0]} fontSize={0.3} color={palette.cyan}>
        f(x)
      </Text>
    </group>
  );
}

export default function WaveCanvas({
  functionType = "power",
  xPosition = 2,
  derivative = 0,
}: WaveCanvasProps) {
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 8, 12], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, 10]} intensity={0.5} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Grid */}
        <CalculusGrid />
        
        {/* Wave surface */}
        <WaveSurface functionType={functionType} />
        
        {/* Surfer */}
        <Surfer functionType={functionType} xPosition={xPosition} derivative={derivative} />
        
        {/* HUD */}
        <Text position={[0, 6, 0]} fontSize={0.4} color={palette.white}>
          CALCULUS COAST
        </Text>
        <Text position={[0, 5.3, 0]} fontSize={0.25} color={palette.cyan}>
          {functionType === "power" && "f(x) = 0.5x^{2}"}
          {functionType === "product" && "f(x) = x·sin(x)"}
          {functionType === "chain" && "f(x) = sin(2x)"}
        </Text>
      </Canvas>
      
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {functionType === "power" && "Power Rule"}
          {functionType === "product" && "Product Rule"}
          {functionType === "chain" && "Chain Rule"}
        </div>
        <div className="text-[11px] font-mono text-white">
          x = {xPosition.toFixed(2)}
        </div>
        <div className="text-[9px] text-white/90 mt-1">
          Your slope: {derivative.toFixed(2)}
        </div>
      </div>
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // G1.01<br />
        CALCULUS_SIM: ACTIVE<br />
        MODE: {functionType.toUpperCase()}
      </div>
    </div>
  );
}
