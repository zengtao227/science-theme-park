"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface ComplexQuest {
  z1?: { re: number; im: number };
  z2?: { re: number; im: number };
  operation?: "add" | "multiply" | "power" | "polar";
  power?: number;
  expressionLatex: string;
}

interface ComplexVisualizationProps {
  quest: ComplexQuest | null;
  checkStatus: "correct" | "incorrect" | null;
}

function ComplexVector({ 
  re, 
  im, 
  color, 
  label 
}: { 
  re: number; 
  im: number; 
  color: string; 
  label: string;
}) {
  const magnitude = Math.sqrt(re * re + im * im);
  const angle = Math.atan2(im, re);

  return (
    <group>
      {/* Vector line */}
      <mesh 
        position={[re / 2, 0, im / 2]} 
        rotation={[0, 0, -angle]}
      >
        <cylinderGeometry args={[0.03, 0.03, magnitude, 8]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Arrow head */}
      <mesh 
        position={[re, 0, im]} 
        rotation={[0, angle, Math.PI / 2]}
      >
        <coneGeometry args={[0.1, 0.25, 8]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Point */}
      <mesh position={[re, 0, im]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
        <pointLight color={color} intensity={2} distance={3} />
      </mesh>

      {/* Label */}
      <Html position={[re, 0.5, im]}>
        <div className="text-white text-sm font-black pointer-events-none whitespace-nowrap">
          {label}
        </div>
      </Html>
    </group>
  );
}

function ComplexGrid() {
  const gridSize = 10;
  const step = 1;

  return (
    <group>
      {/* Grid lines */}
      {Array.from({ length: gridSize * 2 + 1 }).map((_, i) => {
        const pos = (i - gridSize) * step;
        return (
          <group key={`grid-${i}`}>
            {/* Horizontal line */}
            <mesh position={[0, 0, pos]} rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.01, 0.01, gridSize * 2 * step, 8]} />
              <meshBasicMaterial 
                color={pos === 0 ? "#ff2d7d" : "#00e5ff"} 
                transparent 
                opacity={pos === 0 ? 0.5 : 0.1} 
              />
            </mesh>
            {/* Vertical line */}
            <mesh position={[pos, 0, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.01, 0.01, gridSize * 2 * step, 8]} />
              <meshBasicMaterial 
                color={pos === 0 ? "#39ff14" : "#00e5ff"} 
                transparent 
                opacity={pos === 0 ? 0.5 : 0.1} 
              />
            </mesh>
          </group>
        );
      })}

      {/* Axis labels */}
      <Html position={[gridSize * step + 0.5, 0, 0]}>
        <div className="text-white text-xs font-black pointer-events-none">Re</div>
      </Html>
      <Html position={[0, 0, gridSize * step + 0.5]}>
        <div className="text-white text-xs font-black pointer-events-none">Im</div>
      </Html>
    </group>
  );
}

function ComplexScene({ quest }: { quest: ComplexQuest }) {
  const result = useMemo(() => {
    if (!quest.z1) return null;

    if (quest.operation === "add" && quest.z2) {
      return {
        re: quest.z1.re + quest.z2.re,
        im: quest.z1.im + quest.z2.im,
      };
    }

    if (quest.operation === "multiply" && quest.z2) {
      return {
        re: quest.z1.re * quest.z2.re - quest.z1.im * quest.z2.im,
        im: quest.z1.re * quest.z2.im + quest.z1.im * quest.z2.re,
      };
    }

    if (quest.operation === "power" && quest.power) {
      const r = Math.sqrt(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im);
      const theta = Math.atan2(quest.z1.im, quest.z1.re);
      const newR = Math.pow(r, quest.power);
      const newTheta = theta * quest.power;
      return {
        re: newR * Math.cos(newTheta),
        im: newR * Math.sin(newTheta),
      };
    }

    return null;
  }, [quest]);

  return (
    <group>
      <ComplexGrid />
      
      {quest.z1 && (
        <ComplexVector
          re={quest.z1.re}
          im={quest.z1.im}
          color="#00e5ff"
          label={quest.z2 ? "z₁" : "z"}
        />
      )}

      {quest.z2 && (
        <ComplexVector
          re={quest.z2.re}
          im={quest.z2.im}
          color="#39ff14"
          label="z₂"
        />
      )}

      {result && quest.operation !== "polar" && (
        <ComplexVector
          re={result.re}
          im={result.im}
          color="#a855f7"
          label={quest.operation === "power" ? `z^${quest.power}` : "result"}
        />
      )}
    </group>
  );
}

export default function ComplexVisualization({ quest, checkStatus }: ComplexVisualizationProps) {
  if (!quest || !quest.z1) {
    return (
      <div className="w-full h-[600px] bg-black rounded-xl border border-white/10 flex items-center justify-center">
        <div className="text-white/40 text-sm font-mono">NO DATA</div>
      </div>
    );
  }

  const r = Math.sqrt(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im);
  const theta = Math.atan2(quest.z1.im, quest.z1.re);

  return (
    <div className="space-y-4">
      <div className="w-full h-[600px] bg-black rounded-xl overflow-hidden border border-white/10">
        <Canvas>
          <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />

          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />

          <ComplexScene quest={quest} />

          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[30, 30]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.5} />
          </mesh>
        </Canvas>
      </div>

      {/* Data panel */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
          COMPLEX NUMBER DATA
        </div>
        
        {quest.z1 && (
          <div className="space-y-2">
            <div className="text-lg text-white font-black">
              <InlineMath math={`z${quest.z2 ? "_1" : ""} = ${quest.z1.re} + ${quest.z1.im}i`} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">|z|:</span>
                <span className="text-neon-cyan font-black">{r.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">arg(z):</span>
                <span className="text-neon-green font-black">{(theta * 180 / Math.PI).toFixed(1)}°</span>
              </div>
            </div>
          </div>
        )}

        {quest.z2 && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="text-lg text-white font-black">
              <InlineMath math={`z_2 = ${quest.z2.re} + ${quest.z2.im}i`} />
            </div>
          </div>
        )}

        {quest.power && (
          <div className="pt-2 border-t border-white/10">
            <div className="text-sm text-white/60 font-mono">
              Power: n = {quest.power}
            </div>
          </div>
        )}
      </div>

      {/* Status indicator */}
      {checkStatus && (
        <div className={`rounded-xl border p-4 text-center font-black text-sm ${
          checkStatus === "correct"
            ? "border-neon-green bg-neon-green/10 text-neon-green"
            : "border-red-500 bg-red-500/10 text-red-500"
        }`}>
          {checkStatus === "correct" ? "✓ VERIFIED" : "✗ MISMATCH"}
        </div>
      )}
    </div>
  );
}
