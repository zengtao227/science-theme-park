"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface ProbabilityVisualizationProps {
  stage: string;
  n?: number;
  k?: number;
  p?: number;
  translations?: {
    title: string;
  };
}

const palette = {
  cyan: "#00e5ff",
  pink: "#ff2d7d",
  green: "#39ff14",
  yellow: "#ffd166",
  white: "#ffffff",
  purple: "#a855f7",
};

// Binomial coefficient
const binomial = (n: number, k: number): number => {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = result * (n - i + 1) / i;
  }
  return result;
};

function BinomialDistribution({ n, p }: { n: number; p: number }) {
  const distribution = useMemo(() => {
    const dist = [];
    for (let k = 0; k <= n; k++) {
      const prob = binomial(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
      dist.push({ k, prob });
    }
    return dist;
  }, [n, p]);
  
  const maxProb = Math.max(...distribution.map(d => d.prob));
  
  return (
    <group>
      {distribution.map((d, i) => {
        const x = (d.k - n / 2) * 0.8;
        const height = (d.prob / maxProb) * 5;
        
        return (
          <group key={i}>
            {/* Bar */}
            <mesh position={[x, height / 2, 0]}>
              <boxGeometry args={[0.6, height, 0.3]} />
              <meshPhysicalMaterial
                color={palette.green}
                emissive={palette.green}
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
            
            {/* Label */}
            <Text
              position={[x, -0.5, 0]}
              fontSize={0.3}
              color={palette.white}
              anchorX="center"
              anchorY="top"
            >
              {d.k}
            </Text>
            
            {/* Probability value */}
            <Text
              position={[x, height + 0.3, 0]}
              fontSize={0.2}
              color={palette.cyan}
              anchorX="center"
              anchorY="bottom"
            >
              {d.prob.toFixed(3)}
            </Text>
          </group>
        );
      })}
      
      {/* Axes */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-(n/2 + 1) * 0.8, 0, 0, (n/2 + 1) * 0.8, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={palette.cyan} linewidth={2} />
      </line>
      
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-(n/2 + 1) * 0.8, 0, 0, -(n/2 + 1) * 0.8, 6, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={palette.cyan} linewidth={2} />
      </line>
      
      {/* Labels */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.4}
        color={palette.white}
        anchorX="center"
      >
        k (successes)
      </Text>
      
      <Text
        position={[-(n/2 + 2) * 0.8, 3, 0]}
        fontSize={0.4}
        color={palette.white}
        anchorX="center"
        rotation={[0, 0, Math.PI / 2]}
      >
        P(X=k)
      </Text>
    </group>
  );
}

function CoinFlips({ n, p }: { n: number; p: number }) {
  const coins = useMemo(() => {
    const coinArray = [];
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    
    for (let i = 0; i < n; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = (col - cols / 2) * 1.2;
      const y = (rows / 2 - row) * 1.2;
      
      // Simulate coin flip based on probability
      const isHeads = (i / n) < p;
      
      coinArray.push({ x, y, isHeads });
    }
    
    return coinArray;
  }, [n, p]);
  
  return (
    <group>
      {coins.map((coin, i) => (
        <group key={i} position={[coin.x, coin.y, 0]}>
          {/* Coin */}
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
            <meshPhysicalMaterial
              color={coin.isHeads ? palette.yellow : palette.purple}
              emissive={coin.isHeads ? palette.yellow : palette.purple}
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Label */}
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.3}
            color={palette.white}
            anchorX="center"
            anchorY="middle"
          >
            {coin.isHeads ? "H" : "T"}
          </Text>
        </group>
      ))}
      
      {/* Info */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.4}
        color={palette.cyan}
        anchorX="center"
      >
        n = {n}, p = {p}
      </Text>
    </group>
  );
}

function ProbabilityScene({ stage, n = 5, k = 3, p = 0.5, translations }: ProbabilityVisualizationProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 10, 10]} intensity={0.5} color={palette.cyan} />
      
      {stage === "BINOMIAL" && n && p ? (
        <BinomialDistribution n={n} p={p} />
      ) : (
        <CoinFlips n={n || 5} p={p || 0.5} />
      )}
      
      {/* Title */}
      <Text position={[0, 7, 0]} fontSize={0.5} color={palette.white} anchorX="center">
        {translations?.title || "PROBABILITY"}
      </Text>
      
      {/* Grid */}
      <gridHelper args={[20, 20, palette.cyan, "#003344"]} position={[0, -5, 0]} />
    </>
  );
}

export default function ProbabilityVisualization(props: ProbabilityVisualizationProps) {
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 5, 12], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        <ProbabilityScene {...props} />
        <OrbitControls
          enablePan={true}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
      
      {/* Info overlay */}
      {props.stage === "BINOMIAL" && props.n && props.k && props.p && (
        <div className="absolute top-4 left-4 bg-black/80 border border-green-400/30 rounded-lg px-4 py-3 space-y-2">
          <div className="text-[9px] text-green-400/60 uppercase tracking-wider mb-2">
            BINOMIAL PARAMETERS
          </div>
          <div className="text-white font-mono text-sm">
            <div>n = {props.n} (trials)</div>
            <div>k = {props.k} (successes)</div>
            <div>p = {props.p} (probability)</div>
          </div>
        </div>
      )}
    </div>
  );
}
