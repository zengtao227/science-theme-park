"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Float } from "@react-three/drei";
import * as THREE from "three";

interface TrigonometryCanvasProps {
  angle?: number; // in degrees
  mode?: "circle" | "triangle" | "waves";
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
};

// Unit circle with sin/cos/tan visualization
function UnitCircle({ angle }: { angle: number }) {
  const angleRad = (angle * Math.PI) / 180;
  const x = Math.cos(angleRad);
  const y = Math.sin(angleRad);
  const tan = Math.tan(angleRad);
  
  // Circle points
  const circlePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * 2, Math.sin(a) * 2, 0));
    }
    return points;
  }, []);
  
  // Angle arc
  const arcPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const steps = Math.max(2, Math.floor(Math.abs(angle) / 5));
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * angleRad;
      points.push(new THREE.Vector3(Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0));
    }
    return points;
  }, [angle, angleRad]);
  
  return (
    <group position={[0, 0, 0]}>
      {/* Circle */}
      <Line points={circlePoints} color={palette.white} lineWidth={2} />
      
      {/* Axes */}
      <Line
        points={[new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(2.5, 0, 0)]}
        color={palette.white}
        lineWidth={1}
        opacity={0.5}
      />
      <Line
        points={[new THREE.Vector3(0, -2.5, 0), new THREE.Vector3(0, 2.5, 0)]}
        color={palette.white}
        lineWidth={1}
        opacity={0.5}
      />
      
      {/* Radius line */}
      <Line
        points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(x * 2, y * 2, 0)]}
        color={palette.cyan}
        lineWidth={3}
      />
      
      {/* Angle arc */}
      <Line points={arcPoints} color={palette.amber} lineWidth={2} />
      
      {/* Point on circle */}
      <mesh position={[x * 2, y * 2, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          emissive={palette.cyan}
          emissiveIntensity={1}
        />
      </mesh>
      
      {/* Sin line (vertical) */}
      <Line
        points={[new THREE.Vector3(x * 2, 0, 0), new THREE.Vector3(x * 2, y * 2, 0)]}
        color={palette.pink}
        lineWidth={3}
      />
      
      {/* Cos line (horizontal) */}
      <Line
        points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(x * 2, 0, 0)]}
        color={palette.green}
        lineWidth={3}
      />
      
      {/* Tan line (extended to x=1) */}
      {Math.abs(Math.cos(angleRad)) > 0.01 && Math.abs(tan) < 10 && (
        <>
          <Line
            points={[new THREE.Vector3(2, 0, 0), new THREE.Vector3(2, tan * 2, 0)]}
            color={palette.purple}
            lineWidth={3}
          />
          <mesh position={[2, tan * 2, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial
              color={palette.purple}
              emissive={palette.purple}
              emissiveIntensity={1}
            />
          </mesh>
        </>
      )}
      
      {/* Labels */}
      <Text position={[x * 2 + 0.4, y * 2, 0]} fontSize={0.2} color={palette.cyan}>
        ({x.toFixed(2)}, {y.toFixed(2)})
      </Text>
      
      <Text position={[x * 2 + 0.3, y, 0]} fontSize={0.18} color={palette.pink}>
        sin = {y.toFixed(2)}
      </Text>
      
      <Text position={[x, -0.3, 0]} fontSize={0.18} color={palette.green}>
        cos = {x.toFixed(2)}
      </Text>
      
      {Math.abs(Math.cos(angleRad)) > 0.01 && Math.abs(tan) < 10 && (
        <Text position={[2.4, tan * 2, 0]} fontSize={0.18} color={palette.purple}>
          tan = {tan.toFixed(2)}
        </Text>
      )}
      
      <Text position={[0.3, 0.3, 0]} fontSize={0.15} color={palette.amber}>
        {angle.toFixed(0)}°
      </Text>
    </group>
  );
}

// Triangle solver visualization
function TriangleSolver({ angle }: { angle: number }) {
  const angleRad = (angle * Math.PI) / 180;
  
  // Right triangle with hypotenuse = 2
  const hypotenuse = 2;
  const opposite = Math.sin(angleRad) * hypotenuse;
  const adjacent = Math.cos(angleRad) * hypotenuse;
  
  const vertices = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(adjacent, 0, 0),
    new THREE.Vector3(adjacent, opposite, 0),
  ];
  
  return (
    <group position={[0, -1, 0]}>
      {/* Triangle edges */}
      <Line
        points={[vertices[0], vertices[1]]}
        color={palette.green}
        lineWidth={3}
      />
      <Line
        points={[vertices[1], vertices[2]]}
        color={palette.pink}
        lineWidth={3}
      />
      <Line
        points={[vertices[2], vertices[0]]}
        color={palette.cyan}
        lineWidth={3}
      />
      
      {/* Vertices */}
      {vertices.map((v, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial
            color={palette.white}
            emissive={palette.white}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      
      {/* Right angle indicator */}
      <Line
        points={[
          new THREE.Vector3(adjacent - 0.2, 0, 0),
          new THREE.Vector3(adjacent - 0.2, 0.2, 0),
          new THREE.Vector3(adjacent, 0.2, 0),
        ]}
        color={palette.white}
        lineWidth={1}
      />
      
      {/* Labels */}
      <Text
        position={[adjacent / 2, -0.3, 0]}
        fontSize={0.15}
        color={palette.green}
        anchorX="center"
      >
        adj = {adjacent.toFixed(2)}
      </Text>
      
      <Text
        position={[adjacent + 0.3, opposite / 2, 0]}
        fontSize={0.15}
        color={palette.pink}
      >
        opp = {opposite.toFixed(2)}
      </Text>
      
      <Text
        position={[adjacent / 2 - 0.3, opposite / 2 + 0.2, 0]}
        fontSize={0.15}
        color={palette.cyan}
      >
        hyp = {hypotenuse.toFixed(2)}
      </Text>
      
      <Text
        position={[0.3, 0.2, 0]}
        fontSize={0.15}
        color={palette.amber}
      >
        {angle.toFixed(0)}°
      </Text>
    </group>
  );
}

// Sin and Cos wave visualization
function WaveVisualization({ angle }: { angle: number }) {
  const waveRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!waveRef.current) return;
    waveRef.current.position.x = -clock.getElapsedTime() * 0.5;
  });
  
  // Generate wave points
  const sinPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * 10 - 5;
      const y = Math.sin(x + angle * Math.PI / 180) * 1.5;
      points.push(new THREE.Vector3(x, y + 1, 0));
    }
    return points;
  }, [angle]);
  
  const cosPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * 10 - 5;
      const y = Math.cos(x + angle * Math.PI / 180) * 1.5;
      points.push(new THREE.Vector3(x, y - 1, 0));
    }
    return points;
  }, [angle]);
  
  return (
    <group ref={waveRef}>
      {/* Sin wave */}
      <Line points={sinPoints} color={palette.pink} lineWidth={3} />
      
      {/* Cos wave */}
      <Line points={cosPoints} color={palette.green} lineWidth={3} />
      
      {/* Labels */}
      <Text position={[-4, 2.5, 0]} fontSize={0.2} color={palette.pink}>
        sin(x)
      </Text>
      
      <Text position={[-4, -2.5, 0]} fontSize={0.2} color={palette.green}>
        cos(x)
      </Text>
      
      {/* Center line */}
      <Line
        points={[new THREE.Vector3(-5, 1, 0), new THREE.Vector3(5, 1, 0)]}
        color={palette.white}
        lineWidth={1}
        opacity={0.3}
      />
      <Line
        points={[new THREE.Vector3(-5, -1, 0), new THREE.Vector3(5, -1, 0)]}
        color={palette.white}
        lineWidth={1}
        opacity={0.3}
      />
    </group>
  );
}

// Main scene
function TrigScene({ angle, mode }: { angle: number; mode: "circle" | "triangle" | "waves" }) {
  return (
    <group>
      {mode === "circle" && <UnitCircle angle={angle} />}
      {mode === "triangle" && (
        <>
          <UnitCircle angle={angle} />
          <TriangleSolver angle={angle} />
        </>
      )}
      {mode === "waves" && <WaveVisualization angle={angle} />}
      
      {/* Title */}
      <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.4}
          color={palette.white}
          anchorX="center"
        >
          TRIGONOMETRY TOWER
        </Text>
      </Float>
    </group>
  );
}

export default function TrigonometryCanvas({
  angle = 45,
  mode = "circle",
}: TrigonometryCanvasProps) {
  const [localAngle, setLocalAngle] = useState(angle);
  const [localMode, setLocalMode] = useState(mode);
  
  const angleRad = (localAngle * Math.PI) / 180;
  const sinValue = Math.sin(angleRad);
  const cosValue = Math.cos(angleRad);
  const tanValue = Math.tan(angleRad);
  
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          autoRotate={false}
        />
        
        {/* Main scene */}
        <TrigScene angle={localAngle} mode={localMode} />
      </Canvas>
      
      {/* Mode selector */}
      <div className="absolute top-4 left-4 flex gap-2">
        {(["circle", "triangle", "waves"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setLocalMode(m)}
            className={`px-3 py-1 rounded text-[9px] font-mono uppercase tracking-wider transition-colors ${
              localMode === m
                ? "bg-cyan-400 text-black"
                : "bg-black/70 text-white/50 border border-white/20 hover:text-white/80"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      
      {/* Values HUD */}
      <div className="absolute top-4 right-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          Values
        </div>
        <div className="text-[11px] font-mono text-white space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-pink-400">sin:</span>
            <span>{sinValue.toFixed(3)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-green-400">cos:</span>
            <span>{cosValue.toFixed(3)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-purple-400">tan:</span>
            <span>{Math.abs(tanValue) < 100 ? tanValue.toFixed(3) : "∞"}</span>
          </div>
        </div>
      </div>
      
      {/* Angle slider */}
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
            Angle (θ)
          </span>
          <span className="text-[10px] font-mono text-cyan-400">
            {localAngle.toFixed(0)}°
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={localAngle}
          onChange={(e) => setLocalAngle(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-cyan-400
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,229,255,0.5)]
                     [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        TRIG_TOWER<br />
        MODE: {localMode.toUpperCase()}<br />
        θ = {localAngle.toFixed(0)}°
      </div>
    </div>
  );
}
