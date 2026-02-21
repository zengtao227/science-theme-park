"use client";

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import Canvas3DControls from '@/components/ui/Canvas3DControls';

interface Cube3DProps {
  sideLength: number; // 边长
  showDiagonal?: boolean; // 是否显示对角线
  translations?: {
    volume?: string;
    diagonal?: string;
    side?: string;
    unit?: string;
    instructions?: {
      rotate: string;
      zoom: string;
      reset: string;
    };
  };
}

function CubeGeometry({ sideLength, showDiagonal, translations }: Cube3DProps) {
  const a = sideLength / 2;
  const sideLabel = translations?.side || "a";

  return (
    <group>
      {/* 立方体主体 */}
      <mesh>
        <boxGeometry args={[sideLength, sideLength, sideLength]} />
        <meshStandardMaterial
          color="#00e5ff"
          transparent
          opacity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* 立方体边框 */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(sideLength, sideLength, sideLength)]} />
        <lineBasicMaterial attach="material" color="#00e5ff" linewidth={2} />
      </lineSegments>

      {/* 边长标签 - 前面底边 */}
      <Text
        position={[0, -a - 0.5, a + 0.3]}
        fontSize={0.4}
        color="#39ff14"
        anchorX="center"
        anchorY="middle"
      >
        {`${sideLabel} = ${sideLength}`}
      </Text>

      {/* 边长标签 - 右侧边 */}
      <Text
        position={[a + 0.5, 0, a + 0.3]}
        fontSize={0.4}
        color="#39ff14"
        anchorX="center"
        anchorY="middle"
      >
        {sideLength}
      </Text>

      {/* 边长标签 - 左侧竖边 */}
      <Text
        position={[-a - 0.5, 0, a + 0.3]}
        fontSize={0.4}
        color="#39ff14"
        anchorX="center"
        anchorY="middle"
      >
        {sideLength}
      </Text>

      {/* 对角线（如果需要） */}
      {showDiagonal && (
        <>
          <Line
            points={[[-a, -a, -a], [a, a, a]]}
            color="#ff3131"
            lineWidth={2}
            dashed
          />
          <Text
            position={[0, 0, 0]}
            fontSize={0.35}
            color="#ff3131"
            anchorX="center"
            anchorY="middle"
          >
            d = {(sideLength * Math.sqrt(3)).toFixed(2)}
          </Text>
        </>
      )}
    </group>
  );
}

export default function Cube3D({
  sideLength,
  showDiagonal = false,
  translations = {
    volume: "Volume",
    diagonal: "Space Diagonal",
    side: "a",
    unit: "cm",
    instructions: {
      rotate: "Drag to rotate",
      zoom: "Scroll to zoom",
      reset: "Reset View"
    }
  }
}: Cube3DProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Dynamically calculate camera distance so the cube always fits nicely
  const cameraDistance = Math.max(sideLength * 2.2, 8);

  return (
    <div className="relative w-full aspect-square bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [cameraDistance, cameraDistance * 0.8, cameraDistance], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000005"]} />

        {/* 灯光 */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* 立方体 */}
        <CubeGeometry sideLength={sideLength} showDiagonal={showDiagonal} translations={translations} />

        {/* 控制器 - 不自动旋转 */}
        <OrbitControls
          ref={controlsRef}
          enableRotate={true}
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
          minDistance={sideLength}
          maxDistance={sideLength * 8}
        />
      </Canvas>

      {/* 3D控制面板 */}
      <Canvas3DControls
        onReset={handleReset}
        showInstructions={true}
        instructionsText={translations.instructions}
      />

      {/* 公式显示 - 固定位置 */}
      <div className="absolute bottom-4 left-4 bg-black/80 p-4 rounded border border-white/60 backdrop-blur-sm">
        <div className="text-white font-mono text-sm">
          <div className="text-neon-green mb-2">{translations.volume}</div>
          <div className="bg-white/5 p-2 rounded">
            <InlineMath math={`V = ${translations.side || "a"}^3 = ${sideLength}^3 = ${sideLength ** 3}\\text{ ${translations.unit || "cm"}}^3`} />
          </div>
          {showDiagonal && (
            <div className="mt-2 text-neon-cyan">
              <div className="mb-1">{translations.diagonal}</div>
              <div className="bg-white/5 p-2 rounded">
                <InlineMath math={`d = ${translations.side || "a"}\\sqrt{3} = ${sideLength}\\sqrt{3} \\approx ${(sideLength * Math.sqrt(3)).toFixed(2)}\\text{ ${translations.unit || "cm"}}`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
