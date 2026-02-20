"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface GaltonCanvasProps {
  probability: number; // p: probability of going right (0 to 1)
  ballCount: number;
  onDistributionUpdate?: (distribution: number[]) => void;
}

const palette = {
  cyan: "#00e5ff",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  purple: "#a855f7",
};

interface Ball {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  layer: number;
  binIndex: number;
  isActive: boolean;
}

const pseudo = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Galton Board Pins
function Pins({ rows }: { rows: number }) {
  const pinsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  
  const pinPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const spacing = 0.5;
    
    for (let row = 0; row < rows; row++) {
      const pinsInRow = row + 1;
      const rowWidth = pinsInRow * spacing;
      const startX = -rowWidth / 2 + spacing / 2;
      
      for (let col = 0; col < pinsInRow; col++) {
        positions.push(new THREE.Vector3(
          startX + col * spacing,
          -row * spacing,
          0
        ));
      }
    }
    
    return positions;
  }, [rows]);
  
  useEffect(() => {
    if (!pinsRef.current) return;
    
    const d = dummy.current;
    pinPositions.forEach((pos, i) => {
      d.position.copy(pos);
      d.scale.setScalar(1);
      d.updateMatrix();
      pinsRef.current!.setMatrixAt(i, d.matrix);
    });
    pinsRef.current.instanceMatrix.needsUpdate = true;
  }, [pinPositions]);
  
  return (
    <instancedMesh ref={pinsRef} args={[undefined, undefined, pinPositions.length]}>
      <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
      <meshPhysicalMaterial
        color={palette.cyan}
        emissive={palette.cyan}
        emissiveIntensity={0.6}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

// Falling balls
function Balls({ 
  balls, 
  probability,
  rows 
}: { 
  balls: Ball[]; 
  probability: number;
  rows: number;
}) {
  const ballsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const tickRef = useRef(0);
  
  useFrame(() => {
    if (!ballsRef.current) return;
    tickRef.current += 1;
    
    const d = dummy.current;
    const spacing = 0.5;
    
    balls.forEach((ball, i) => {
      if (!ball.isActive) {
        d.position.set(0, 100, 0); // Hide inactive balls
        d.scale.setScalar(0.001);
      } else {
        // Update ball physics
        ball.velocity.y -= 0.01; // Gravity
        ball.position.add(ball.velocity);
        
        // Check collision with pins
        const currentLayer = Math.floor(-ball.position.y / spacing);
        if (currentLayer > ball.layer && currentLayer < rows) {
          ball.layer = currentLayer;
          
          const roll = pseudo(ball.id * 13 + ball.layer * 17 + tickRef.current * 0.2);
          const goRight = roll < probability;
          ball.velocity.x = goRight ? 0.05 : -0.05;
          ball.velocity.y = -0.1;
          
          if (goRight) {
            ball.binIndex++;
          }
          
          ball.velocity.x += (pseudo(ball.id * 31 + ball.layer * 11 + tickRef.current * 0.4) - 0.5) * 0.02;
        }
        
        // Check if reached bottom
        if (ball.position.y < -(rows * spacing + 1)) {
          ball.isActive = false;
          ball.velocity.set(0, 0, 0);
        }
        
        d.position.copy(ball.position);
        d.scale.setScalar(1);
      }
      
      d.updateMatrix();
      ballsRef.current!.setMatrixAt(i, d.matrix);
    });
    
    ballsRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={ballsRef} args={[undefined, undefined, balls.length]} frustumCulled={true}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshPhysicalMaterial
        color={palette.green}
        emissive={palette.green}
        emissiveIntensity={0.6}
        metalness={0.3}
        roughness={0.4}
      />
    </instancedMesh>
  );
}

// Distribution bins at the bottom
function DistributionBins({ 
  distribution, 
  rows 
}: { 
  distribution: number[]; 
  rows: number;
}) {
  const maxCount = Math.max(...distribution, 1);
  const spacing = 0.5;
  const binWidth = 0.4;
  
  return (
    <group position={[0, -(rows * spacing + 2), 0]}>
      {distribution.map((count, i) => {
        const height = (count / maxCount) * 3;
        const x = (i - distribution.length / 2) * spacing;
        
        return (
          <mesh key={i} position={[x, height / 2, 0]}>
            <boxGeometry args={[binWidth, height, 0.2]} />
            <meshPhysicalMaterial
              color={palette.purple}
              emissive={palette.purple}
              emissiveIntensity={0.3}
              metalness={0.5}
              roughness={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function GaltonCanvas({ 
  probability, 
  ballCount,
  onDistributionUpdate 
}: GaltonCanvasProps) {
  const rows = 12;
  const [balls, setBalls] = useState<Ball[]>([]);
  const [distribution, setDistribution] = useState<number[]>(
    new Array(rows + 1).fill(0)
  );
  const [isRunning, setIsRunning] = useState(false);
  
  // Initialize balls
  useEffect(() => {
    const newBalls: Ball[] = [];
    for (let i = 0; i < ballCount; i++) {
      newBalls.push({
        id: i,
        position: new THREE.Vector3(0, 2, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        layer: -1,
        binIndex: Math.floor(rows / 2),
        isActive: false,
      });
    }
    setBalls(newBalls);
  }, [ballCount, rows]);
  
  // Drop balls gradually
  useEffect(() => {
    if (!isRunning) return;
    
    let currentBall = 0;
    const interval = setInterval(() => {
      if (currentBall >= balls.length) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }
      
      setBalls(prev => {
        const updated = [...prev];
        if (updated[currentBall]) {
          updated[currentBall].isActive = true;
          updated[currentBall].position.set(0, 2, 0);
          updated[currentBall].velocity.set(0, -0.1, 0);
          updated[currentBall].layer = -1;
          updated[currentBall].binIndex = Math.floor(rows / 2);
        }
        return updated;
      });
      
      currentBall++;
    }, 50);
    
    return () => clearInterval(interval);
  }, [isRunning, balls.length, rows]);
  
  // Update distribution
  useEffect(() => {
    const interval = setInterval(() => {
      const newDist = new Array(rows + 1).fill(0);
      balls.forEach(ball => {
        if (!ball.isActive && ball.position.y < -(rows * 0.5 + 1)) {
          const binIndex = Math.max(0, Math.min(rows, ball.binIndex));
          newDist[binIndex]++;
        }
      });
      setDistribution(newDist);
      if (onDistributionUpdate) {
        onDistributionUpdate(newDist);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [balls, rows, onDistributionUpdate]);
  
  const handleStart = () => {
    // Reset balls
    setBalls(prev => prev.map(ball => ({
      ...ball,
      position: new THREE.Vector3(0, 2, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      layer: -1,
      binIndex: Math.floor(rows / 2),
      isActive: false,
    })));
    setDistribution(new Array(rows + 1).fill(0));
    setIsRunning(true);
  };
  
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Galton Board */}
        <Pins rows={rows} />
        <Balls balls={balls} probability={probability} rows={rows} />
        <DistributionBins distribution={distribution} rows={rows} />
        
        {/* Title */}
        <Text position={[0, 3, 0]} fontSize={0.4} color={palette.cyan}>
          GALTON BOARD
        </Text>
        
        {/* Probability label */}
        <Text position={[0, 2.5, 0]} fontSize={0.25} color={palette.white}>
          p = {probability.toFixed(2)}
        </Text>
        
        {/* Frame */}
        <mesh position={[0, -3, -0.5]}>
          <boxGeometry args={[8, 10, 0.2]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Canvas>
      
      {/* Controls panel */}
      <div className="absolute bottom-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-3">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          Simulation Controls
        </div>
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-2 bg-green-500/20 border border-green-400 text-green-400 text-xs font-bold rounded hover:bg-green-500/30 disabled:opacity-50 w-full"
        >
          {isRunning ? "RUNNING..." : "START SIMULATION"}
        </button>
        <div className="text-[10px] text-white/60 font-mono">
          Balls: {balls.filter(b => !b.isActive && b.position.y < -7).length} / {ballCount}
        </div>
      </div>
      
      {/* Probability display */}
      <div className="absolute top-4 left-4 bg-black/70 border border-purple-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-purple-400/60 uppercase tracking-wider mb-1">
          Right Probability
        </div>
        <div className="text-2xl font-mono text-white font-black">
          p = {probability.toFixed(2)}
        </div>
        <div className="text-[9px] text-white/90 mt-1">
          Expected: μ = {(rows * probability).toFixed(1)}
        </div>
      </div>
      
      {/* Distribution info */}
      <div className="absolute top-4 right-4 bg-black/70 border border-amber-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-amber-400/60 uppercase tracking-wider mb-1">
          Distribution
        </div>
        <div className="text-[10px] font-mono text-white space-y-1">
          <div>Binomial: B(n={rows}, p={probability.toFixed(2)})</div>
          <div>σ^{2} = np(1-p) = {(rows * probability * (1 - probability)).toFixed(2)}</div>
        </div>
      </div>
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // G3.01<br />
        GALTON_SIM: {isRunning ? "ACTIVE" : "STANDBY"}<br />
        QUANTUM_MODE: PROBABILISTIC
      </div>
    </div>
  );
}
