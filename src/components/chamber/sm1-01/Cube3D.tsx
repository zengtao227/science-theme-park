"use client";

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import Canvas3DControls from '@/components/ui/Canvas3DControls';

interface Cube3DProps {
  sideLength: number; // 边长
  showDiagonal?: boolean; // 是否显示对角线
}

function CubeGeometry({ sideLength, showDiagonal }: Cube3DProps) {
  const a = sideLength / 2;

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
        {sideLength}
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

export default function Cube3D({ sideLength, showDiagonal = false }: Cube3DProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [6, 5, 6], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000005"]} />
        
        {/* 灯光 */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* 立方体 */}
        <CubeGeometry sideLength={sideLength} showDiagonal={showDiagonal} />

        {/* 控制器 - 不自动旋转 */}
        <OrbitControls
          ref={controlsRef}
          enableRotate={true}
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>

      {/* 3D控制面板 */}
      <Canvas3DControls
        onReset={handleReset}
        showInstructions={true}
        instructionsText={{
          rotate: "拖动鼠标旋转立方体，查看所有边长",
          zoom: "滚轮缩放视图",
          reset: "重置到初始视角"
        }}
      />

      {/* 公式显示 - 固定位置 */}
      <div className="absolute bottom-4 left-4 bg-black/80 p-4 rounded border border-white/20 backdrop-blur-sm">
        <div className="text-white font-mono text-sm">
          <div className="text-neon-green mb-2">立方体体积</div>
          <div>V = a³ = {sideLength}³ = {sideLength ** 3} cm³</div>
          {showDiagonal && (
            <div className="mt-2 text-neon-cyan">
              <div>空间对角线</div>
              <div>d = a√3 = {sideLength}√3 ≈ {(sideLength * Math.sqrt(3)).toFixed(2)} cm</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
