"use client";

import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from "three";
import Canvas3DControls from "@/components/ui/Canvas3DControls";
import { normalizePlainMathNotation } from "@/lib/latex-utils";

// 单个矩形区域组件
function Rectangle({
  position,
  size,
  color,
  label,
  exploded = false,
  explosionOffset = [0, 0, 0]
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  label: string;
  exploded: boolean;
  explosionOffset: [number, number, number];
}) {
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
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* 边框 */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color={color} transparent opacity={0.8} linewidth={2} />
      </lineSegments>

      {/* 标签 */}
      <Text
        position={[0, 0, size[2] / 2 + 0.1]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {normalizePlainMathNotation(label)}
      </Text>
    </group>
  );
}

// (a+b)^2 的4个区域
function BinomialSquare({ a, b, exploded }: { a: number; b: number; exploded: boolean }) {
  const explosionFactor = exploded ? 2.5 : 0;
  const thickness = 0.2;

  // 计算位置，使正方形居中
  const offset = -(a + b) / 2;

  // 4个区域的定义
  const regions = [
    // a^2 - 左上角 (红色)
    {
      id: 'a2',
      position: [offset + a / 2, offset + a / 2, 0] as [number, number, number],
      size: [a, a, thickness] as [number, number, number],
      color: '#ff3131',
      label: 'a^{2}',
      explosionOffset: [-explosionFactor, explosionFactor, 0] as [number, number, number]
    },
    // ab - 右上角 (橙色)
    {
      id: 'ab1',
      position: [offset + a + b / 2, offset + a / 2, 0] as [number, number, number],
      size: [b, a, thickness] as [number, number, number],
      color: '#ffaa00',
      label: 'ab',
      explosionOffset: [explosionFactor, explosionFactor, 0] as [number, number, number]
    },
    // ab - 左下角 (橙色)
    {
      id: 'ab2',
      position: [offset + a / 2, offset + a + b / 2, 0] as [number, number, number],
      size: [a, b, thickness] as [number, number, number],
      color: '#ffaa00',
      label: 'ab',
      explosionOffset: [-explosionFactor, -explosionFactor, 0] as [number, number, number]
    },
    // b^2 - 右下角 (绿色)
    {
      id: 'b2',
      position: [offset + a + b / 2, offset + a + b / 2, 0] as [number, number, number],
      size: [b, b, thickness] as [number, number, number],
      color: '#39ff14',
      label: 'b^{2}',
      explosionOffset: [explosionFactor, -explosionFactor, 0] as [number, number, number]
    }
  ];

  return (
    <group>
      {regions.map((region) => (
        <Rectangle
          key={region.id}
          position={region.position}
          size={region.size}
          color={region.color}
          label={region.label}
          exploded={exploded}
          explosionOffset={region.explosionOffset}
        />
      ))}

      {/* 外框（组合状态） */}
      {!exploded && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(a + b, a + b, thickness)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.5} linewidth={3} />
        </lineSegments>
      )}
    </group>
  );
}

// 图例组件
function Legend({ a, b, translations }: { a: number; b: number; translations: any }) {
  return (
    <group position={[6, 0, 0]}>
      <Text position={[0, 3, 0]} fontSize={0.35} color="#ffffff" anchorX="left">
        {normalizePlainMathNotation((translations.decomposition_pattern_2d || "").replace(/\$/g, ""))}
      </Text>

      <Text position={[0, 2.2, 0]} fontSize={0.25} color="#ff3131" anchorX="left">
        1× a² = {a * a}
      </Text>

      <Text position={[0, 1.7, 0]} fontSize={0.25} color="#ffaa00" anchorX="left">
        2× ab = {2 * a * b}
      </Text>

      <Text position={[0, 1.2, 0]} fontSize={0.25} color="#39ff14" anchorX="left">
        1× b² = {b * b}
      </Text>

      <Text position={[0, 0.5, 0]} fontSize={0.2} color="#ffffff" anchorX="left">
        ───────────
      </Text>

      <Text position={[0, 0, 0]} fontSize={0.3} color="#ffffff" anchorX="left">
        {translations.total} = {(a + b) ** 2}
      </Text>

      <Text position={[0, -0.7, 0]} fontSize={0.18} color="#ffffff" anchorX="left" fillOpacity={0.6}>
        a = {a}, b = {b}
      </Text>
    </group>
  );
}

interface BinomialSquareCanvasProps {
  a: number;
  b: number;
  translations: {
    expand: string;
    collapse: string;
    expanded_view: string;
    assembled_view: string;
    color_coding: string;
    total: string;
    pattern_3d: string;
    decomposition_pattern_2d: string;
    volume_proof_3d: string;
    volume_conservation: string;
    unit_cubed: string;
    status_mode: string;
    status_exploded: string;
    status_assembled: string;
    instructions: {
      rotate: string;
      zoom: string;
      reset: string;
      help: string;
      title: string;
      hint: string;
    };
  };
}

export default function BinomialSquareCanvas({ a, b, translations }: BinomialSquareCanvasProps) {
  const [exploded, setExploded] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="w-full h-[800px] bg-[#020208] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
      <div className="relative flex-1 min-h-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* 灯光 */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#00ffff" />

        {/* 控制器 - 不自动旋转 */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={6}
          maxDistance={20}
          autoRotate={false}
        />

        {/* 主要内容 */}
        <BinomialSquare a={a} b={b} exploded={exploded} />

        {/* 图例 */}
        <Legend a={a} b={b} translations={translations} />

        {/* 坐标轴 */}
        <group>
          <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 3, "#ff4444"]} />
          <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 3, "#44ff44"]} />
        </group>
        </Canvas>

        {/* 3D控制 */}
        <Canvas3DControls
          onReset={handleReset}
          showInstructions={true}
          instructionsText={translations.instructions}
        />

        {/* 展开/收起按钮 */}
        <div className="absolute top-20 right-4 flex flex-col gap-2">
          <button
            onClick={() => setExploded(true)}
            disabled={exploded}
            className="px-4 py-2 bg-black/80 border border-white/60 rounded text-white/80 hover:text-white hover:border-neon-cyan/50 transition-all text-xs font-mono backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {translations.expand}
          </button>
          <button
            onClick={() => setExploded(false)}
            disabled={!exploded}
            className="px-4 py-2 bg-black/80 border border-white/60 rounded text-white/80 hover:text-white hover:border-neon-green/50 transition-all text-xs font-mono backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {translations.collapse}
          </button>
        </div>

        {/* 固定公式显示 */}
        <div className="absolute top-4 left-4 bg-black/90 p-4 rounded border border-white/60 backdrop-blur-md">
          <div className="text-white font-mono text-sm space-y-2">
            <div className="text-neon-cyan font-bold text-base">{translations.pattern_3d}</div>
            <div className="text-white/60 text-xs">
              {exploded ? translations.expanded_view : translations.assembled_view}
            </div>
          </div>
        </div>

        {/* 颜色图例 */}
        <div className="absolute bottom-4 left-4 space-y-1 font-mono text-[10px] bg-black/80 p-3 rounded border border-white/60 backdrop-blur-sm">
          <div className="text-white/60 font-bold mb-2">{translations.color_coding}</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff3131] rounded"></div>
            <span className="text-[#ff3131]">a² = {a * a}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ffaa00] rounded"></div>
            <span className="text-[#ffaa00]">2ab = {2 * a * b}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#39ff14] rounded"></div>
            <span className="text-[#39ff14]">b² = {b * b}</span>
          </div>
          <div className="text-white font-bold mt-2 pt-2 border-t border-white/60">
            {translations.total}: {(a + b) ** 2}
          </div>
        </div>
      </div>

    </div>
  );
}
