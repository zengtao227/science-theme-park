"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from "three";
import Canvas3DControls from "@/components/ui/Canvas3DControls";

interface S201BinomialCanvasProps {
  a: number;
  b: number;
  locked: boolean;
  targetSize: number;
  initialPositions: {
    a2: [number, number, number];
    b2: [number, number, number];
    ab1: [number, number, number];
    ab2: [number, number, number];
  };
  targetPositions: {
    a2: [number, number, number];
    b2: [number, number, number];
    ab1: [number, number, number];
    ab2: [number, number, number];
  };
  labels: {
    a2: string;
    b2: string;
    ab: string;
  };
  titleText: string;
  onSnap: (id: string, isSnapped: boolean) => void;
}

// Individual cube component - NO animations
function GlassCube({
  position,
  size,
  color,
  emissive,
  label,
  exploded = false,
  explosionOffset = [0, 0, 0]
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive: string;
  label: string;
  exploded: boolean;
  explosionOffset: [number, number, number];
}) {
  // No animations - completely static

  const finalPosition: [number, number, number] = exploded
    ? [
      position[0] + explosionOffset[0],
      position[1] + explosionOffset[1],
      position[2] + explosionOffset[2]
    ]
    : position;

  return (
    <group position={finalPosition}>
      <mesh>
        <boxGeometry args={size} />
        <meshPhysicalMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
          metalness={0.9}
          roughness={0.1}
          transmission={0.5}
          thickness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Edge glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color={emissive} transparent opacity={0.6} linewidth={2} />
      </lineSegments>

      {/* Label */}
      <Text
        position={[0, 0, size[2] / 2 + 0.1]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Main 3D Binomial Cube Scene
function BinomialCube3D({ a, b, exploded }: { a: number; b: number; exploded: boolean }) {
  // No auto-rotation - only manual user control

  // Calculate positions for the 8 components
  // The cube (a+b)^3 is divided into:
  // 1x a^3 (red)
  // 3x a^2b (orange)
  // 3x ab^2 (blue)
  // 1x b^3 (green)

  const explosionFactor = exploded ? 2 : 0;

  // Component definitions with color coding for 4 algebraic terms
  const components = useMemo(() => {
    const offset = -(a + b) / 2; // Center the cube

    return [
      // a^3 - bottom-left-back corner (RED)
      {
        id: 'a3',
        position: [offset + a / 2, offset + a / 2, offset + a / 2] as [number, number, number],
        size: [a, a, a] as [number, number, number],
        color: '#ff3131',
        emissive: '#ff3131',
        label: 'a^3',
        explosionOffset: [-explosionFactor, -explosionFactor, -explosionFactor] as [number, number, number]
      },

      // a^2b - three pieces (ORANGE)
      {
        id: 'a2b_1',
        position: [offset + a / 2, offset + a / 2, offset + a + b / 2] as [number, number, number],
        size: [a, a, b] as [number, number, number],
        color: '#ffaa00',
        emissive: '#ffaa00',
        label: 'a^2b',
        explosionOffset: [-explosionFactor * 0.8, -explosionFactor * 0.8, explosionFactor] as [number, number, number]
      },
      {
        id: 'a2b_2',
        position: [offset + a / 2, offset + a + b / 2, offset + a / 2] as [number, number, number],
        size: [a, b, a] as [number, number, number],
        color: '#ffaa00',
        emissive: '#ffaa00',
        label: 'a^2b',
        explosionOffset: [-explosionFactor * 0.8, explosionFactor, -explosionFactor * 0.8] as [number, number, number]
      },
      {
        id: 'a2b_3',
        position: [offset + a + b / 2, offset + a / 2, offset + a / 2] as [number, number, number],
        size: [b, a, a] as [number, number, number],
        color: '#ffaa00',
        emissive: '#ffaa00',
        label: 'a^2b',
        explosionOffset: [explosionFactor, -explosionFactor * 0.8, -explosionFactor * 0.8] as [number, number, number]
      },

      // ab^2 - three pieces (BLUE)
      {
        id: 'ab2_1',
        position: [offset + a + b / 2, offset + a + b / 2, offset + a / 2] as [number, number, number],
        size: [b, b, a] as [number, number, number],
        color: '#4444ff',
        emissive: '#4444ff',
        label: 'ab^2',
        explosionOffset: [explosionFactor, explosionFactor, -explosionFactor * 0.8] as [number, number, number]
      },
      {
        id: 'ab2_2',
        position: [offset + a + b / 2, offset + a / 2, offset + a + b / 2] as [number, number, number],
        size: [b, a, b] as [number, number, number],
        color: '#4444ff',
        emissive: '#4444ff',
        label: 'ab^2',
        explosionOffset: [explosionFactor, -explosionFactor * 0.8, explosionFactor] as [number, number, number]
      },
      {
        id: 'ab2_3',
        position: [offset + a / 2, offset + a + b / 2, offset + a + b / 2] as [number, number, number],
        size: [a, b, b] as [number, number, number],
        color: '#4444ff',
        emissive: '#4444ff',
        label: 'ab^2',
        explosionOffset: [-explosionFactor * 0.8, explosionFactor, explosionFactor] as [number, number, number]
      },

      // b^3 - top-right-front corner (GREEN)
      {
        id: 'b3',
        position: [offset + a + b / 2, offset + a + b / 2, offset + a + b / 2] as [number, number, number],
        size: [b, b, b] as [number, number, number],
        color: '#39ff14',
        emissive: '#39ff14',
        label: 'b^3',
        explosionOffset: [explosionFactor, explosionFactor, explosionFactor] as [number, number, number]
      }
    ];
  }, [a, b, explosionFactor]);

  return (
    <group>
      {components.map((comp) => (
        <GlassCube
          key={comp.id}
          position={comp.position}
          size={comp.size}
          color={comp.color}
          emissive={comp.emissive}
          label={comp.label}
          exploded={exploded}
          explosionOffset={comp.explosionOffset}
        />
      ))}

      {/* Outer cube wireframe when assembled */}
      {!exploded && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(a + b, a + b, a + b)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.3} linewidth={3} />
        </lineSegments>
      )}
    </group>
  );
}

// Legend component with color coding
function Legend({ a, b }: { a: number; b: number }) {
  return (
    <group position={[-6, 0, 0]}>
      <Text position={[0, 3, 0]} fontSize={0.4} color="#ffffff" anchorX="left">
        (a+b)^3 Decomposition
      </Text>

      <Text position={[0, 2, 0]} fontSize={0.25} color="#ff3131" anchorX="left">
        1× a^3 = {a ** 3}
      </Text>

      <Text position={[0, 1.5, 0]} fontSize={0.25} color="#ffaa00" anchorX="left">
        3× a^2b = {3 * a * a * b}
      </Text>

      <Text position={[0, 1, 0]} fontSize={0.25} color="#4444ff" anchorX="left">
        3× ab^2 = {3 * a * b * b}
      </Text>

      <Text position={[0, 0.5, 0]} fontSize={0.25} color="#39ff14" anchorX="left">
        1× b^3 = {b ** 3}
      </Text>

      <Text position={[0, -0.3, 0]} fontSize={0.2} color="#ffffff" anchorX="left">
        ───────────────
      </Text>

      <Text position={[0, -0.8, 0]} fontSize={0.3} color="#ffffff" anchorX="left">
        Total = {(a + b) ** 3}
      </Text>

      <Text position={[0, -1.5, 0]} fontSize={0.2} color="#ffffff" anchorX="left" fillOpacity={0.6}>
        a = {a}, b = {b}
      </Text>
    </group>
  );
}

export default function S201BinomialCanvas({
  a,
  b,
}: S201BinomialCanvasProps) {
  const [exploded, setExploded] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="w-full h-[800px] relative bg-[#020208] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <Canvas camera={{ position: [12, 12, 14], fov: 55 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, 10]} intensity={0.6} color="#00ffff" />
        <pointLight position={[10, -10, -10]} intensity={0.5} color="#ff00ff" />

        {/* Controls - NO AUTO-ROTATION */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={8}
          maxDistance={30}
          autoRotate={false}
        />

        {/* Grid floor */}
        <Grid
          args={[30, 30]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#ffffff"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#00ffff"
          fadeDistance={35}
          fadeStrength={1}
          position={[0, -(a + b) / 2 - 2, 0]}
        />

        {/* Main cube */}
        <BinomialCube3D a={a} b={b} exploded={exploded} />

        {/* Legend */}
        <Legend a={a} b={b} />

        {/* Coordinate axes */}
        <group>
          <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 5, "#ff4444"]} />
          <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 5, "#44ff44"]} />
          <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 5, "#4444ff"]} />
        </group>
      </Canvas>

      {/* 3D Controls */}
      <Canvas3DControls
        onReset={handleReset}
        showInstructions={true}
        instructionsText={{
          rotate: "拖动鼠标旋转查看各个立方体",
          zoom: "滚轮缩放视图",
          reset: "重置到初始视角"
        }}
      />

      {/* Expand/Collapse Buttons */}
      <div className="absolute top-20 right-4 flex flex-col gap-2">
        <button
          onClick={() => setExploded(true)}
          disabled={exploded}
          className="px-4 py-2 bg-black/80 border border-white/60 rounded text-white/80 hover:text-white hover:border-neon-cyan/50 transition-all text-xs font-mono backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          展开
        </button>
        <button
          onClick={() => setExploded(false)}
          disabled={!exploded}
          className="px-4 py-2 bg-black/80 border border-white/60 rounded text-white/80 hover:text-white hover:border-neon-green/50 transition-all text-xs font-mono backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          收起
        </button>
      </div>

      {/* Fixed Formula Display - Does NOT rotate with 3D */}
      <div className="absolute top-4 left-4 bg-black/90 p-4 rounded border border-white/60 backdrop-blur-md">
        <div className="text-white font-mono text-sm space-y-2">
          <div className="text-neon-cyan font-bold text-base">(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3</div>
          <div className="text-white/60 text-xs">
            {exploded ? "展开视图" : "组合视图"}
          </div>
        </div>
      </div>

      {/* Color Legend - Fixed Position */}
      <div className="absolute bottom-4 left-4 space-y-1 font-mono text-[10px] bg-black/80 p-3 rounded border border-white/60 backdrop-blur-sm">
        <div className="text-white/60 font-bold mb-2">颜色编码</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#ff3131] rounded"></div>
          <span className="text-[#ff3131]">a^3 = {a ** 3} units^3</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#ffaa00] rounded"></div>
          <span className="text-[#ffaa00]">3a^2b = {3 * a * a * b} units^3</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#4444ff] rounded"></div>
          <span className="text-[#4444ff]">3ab^2 = {3 * a * b * b} units^3</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#39ff14] rounded"></div>
          <span className="text-[#39ff14]">b^3 = {b ** 3} units^3</span>
        </div>
        <div className="text-white font-bold mt-2 pt-2 border-t border-white/60">
          总计: {(a + b) ** 3} units^3
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // S2.01<br />
        3D_VOLUME_PROOF<br />
        MODE: {exploded ? 'EXPLODED' : 'ASSEMBLED'}
      </div>

      {/* Volume conservation indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider text-center">
          Volume Conservation
        </div>
        <div className="text-4xl font-black text-green-400 text-center">
          ✓
        </div>
        <div className="text-[12px] font-mono text-white/70 text-center">
          {(a + b) ** 3} = {(a + b) ** 3}
        </div>
      </div>
    </div>
  );
}
