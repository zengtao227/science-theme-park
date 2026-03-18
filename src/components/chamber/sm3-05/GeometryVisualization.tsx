"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLanguage } from "@/lib/i18n";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

type Stage = "BASEL_ARCH" | "CROSS_SECTIONS" | "CURVED_SOLIDS";
type Shape = "cube" | "pyramid" | "sphere" | "cylinder" | "roche";

interface GeometryVisualizationProps {
  stage: Stage;
}

type GeometryVisualizationCopy = {
  shapeButtons: Record<Shape, string>;
  rotationX: string;
  rotationY: string;
  rotateHint: string;
  properties: string;
  rocheTitle: string;
  rocheStructure: string;
  rocheAreaLabel: string;
  rocheHeight: string;
  cubeFaces: string;
  cubeVertices: string;
  cubeEdges: string;
  pyramidFaces: string;
  pyramidVertices: string;
  pyramidEdges: string;
  sphereSurface: string;
  sphereNoEdge: string;
  cylinderFaces: string;
  eulerTitle: string;
  convexPoly: string;
  cubeSquare: string;
  sphereCircle: string;
  cylinderRect: string;
  parallelFace: string;
  anyPlane: string;
  parallelAxis: string;
  crossSectionTypes: string;
  parallelBase: string;
  perpendicularBase: string;
  diagonalCut: string;
  similarShape: string;
  differentShape: string;
  complexPolygon: string;
  distanceFormula: string;
  midpointFormula: string;
  spatialRelations: string;
  parallelPlanes: string;
  neverIntersect: string;
  perpendicularPlanes: string;
  rightAngle: string;
  skewLines: string;
  skewDesc: string;
  dihedralAngle: string;
  angleBetweenPlanes: string;
};

const degToRad = (deg: number) => (deg * Math.PI) / 180;
const FORMULAS = {
  rocheArea: "2400\\,m^{2}-1800\\,m^{2}",
  cubeVolume: "V=a^{3}",
  pyramidVolume: "V=\\frac{1}{3}Bh",
  sphereVolume: "V=\\frac{4}{3}\\pi r^{3}",
  sphereArea: "A=4\\pi r^{2}",
  cylinderVolume: "V=\\pi r^{2}h",
  cylinderArea: "A=2\\pi r^{2}+2\\pi rh",
  euler: "V-E+F=2",
  distance3D: "d=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}+(z_2-z_1)^{2}}",
  midpoint3D: "M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2},\\frac{z_1+z_2}{2}\\right)",
} as const;

function ShapeModel({ shape }: { shape: Shape }) {
  if (shape === "cube") {
    return (
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.2} roughness={0.35} />
      </mesh>
    );
  }

  if (shape === "pyramid") {
    return (
      <mesh castShadow receiveShadow rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.25, 2.0, 4]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.1} roughness={0.4} />
      </mesh>
    );
  }

  if (shape === "sphere") {
    return (
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshStandardMaterial color="#67e8f9" metalness={0.1} roughness={0.3} />
      </mesh>
    );
  }

  if (shape === "cylinder") {
    return (
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 2.0, 48]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.15} roughness={0.35} />
      </mesh>
    );
  }

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, -0.65, 0]}>
        <boxGeometry args={[2.0, 0.7, 1.2]} />
        <meshStandardMaterial color="#0891b2" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[1.6, 0.8, 1.0]} />
        <meshStandardMaterial color="#0e7490" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.85, 0]}>
        <boxGeometry args={[1.25, 0.8, 0.85]} />
        <meshStandardMaterial color="#155e75" />
      </mesh>
    </group>
  );
}

function ViewportWrapper({
  children,
  camera = [3.8, 2.6, 3.8],
}: {
  children: React.ReactNode;
  camera?: [number, number, number];
}) {
  return (
    <div className="relative w-full h-64 bg-black/30 rounded overflow-hidden border border-cyan-500/20">
      <Canvas camera={{ position: camera, fov: 46 }} shadows>
        <color attach="background" args={["#030611"]} />
        <ambientLight intensity={0.72} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <pointLight position={[-3, 4, -2]} intensity={0.4} color="#7dd3fc" />
        {children}
        <OrbitControls enablePan={false} minDistance={2.2} maxDistance={9} />
      </Canvas>
    </div>
  );
}

function BaselArchitectureViewport({
  shape,
  rotation,
}: {
  shape: Shape;
  rotation: { x: number; y: number };
}) {
  return (
    <ViewportWrapper>
      <gridHelper args={[8, 16, "#0e7490", "#164e63"]} position={[0, -1.5, 0]} />
      <group rotation={[degToRad(rotation.x), degToRad(rotation.y), 0]}>
        <ShapeModel shape={shape} />
      </group>
    </ViewportWrapper>
  );
}

function CrossSectionsViewport() {
  return (
    <ViewportWrapper camera={[4.2, 2.2, 3.8]}>
      <gridHelper args={[8, 16, "#0e7490", "#164e63"]} position={[0, -1.5, 0]} />

      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.3, 2.3, 2.3]} />
        <meshStandardMaterial color="#0ea5e9" opacity={0.25} transparent />
      </mesh>

      <mesh rotation={[Math.PI / 5, 0, Math.PI / 12]}>
        <boxGeometry args={[3.1, 0.08, 2.2]} />
        <meshStandardMaterial color="#facc15" opacity={0.9} transparent />
      </mesh>
    </ViewportWrapper>
  );
}

function CurvedSolidsViewport() {
  return (
    <ViewportWrapper camera={[4.6, 2.8, 4.4]}>
      <gridHelper args={[10, 20, "#0e7490", "#164e63"]} position={[0, -1.5, 0]} />
      <axesHelper args={[2.5]} />

      <mesh position={[-1.25, 0.65, -0.15]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#22d3ee" />
      </mesh>

      <mesh position={[1.0, 0.8, -0.6]}>
        <cylinderGeometry args={[0.45, 0.45, 1.4, 28]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>

      <mesh position={[0.2, 0.6, 1.2]} rotation={[0, Math.PI / 8, 0]}>
        <coneGeometry args={[0.5, 1.2, 28]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>

      <mesh position={[1.2, 1.5, 1.8]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.6} />
      </mesh>
    </ViewportWrapper>
  );
}

export default function GeometryVisualization({ stage }: GeometryVisualizationProps) {
  const { t } = useLanguage();
  const [rotation, setRotation] = useState({ x: 30, y: 45 });
  const [selectedShape, setSelectedShape] = useState<Shape>("roche");
  const copy = t("sm3_05.visualization") as GeometryVisualizationCopy;

  const renderPolyhedra = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {(["roche", "cube", "pyramid", "sphere", "cylinder"] as const).map((shape) => (
          <button
            key={shape}
            onClick={() => setSelectedShape(shape)}
            className={`px-3 py-1 text-xs rounded border transition-all ${selectedShape === shape ? "bg-cyan-500 border-cyan-400 text-white shadow-[0_0_10px_#00ffff]" : "bg-gray-800 border-gray-700 text-gray-400"}`}
          >
            {copy.shapeButtons[shape]}
          </button>
        ))}
      </div>

      <div className="text-[11px] text-cyan-300/70 font-mono">{copy.rotateHint}</div>
      <BaselArchitectureViewport shape={selectedShape} rotation={rotation} />

      <div className="mt-1 space-y-2">
        <div className="flex items-center gap-4">
          <span className="text-cyan-400">{copy.rotationX}</span>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation.x}
            onChange={(e) => setRotation((prev) => ({ ...prev, x: parseInt(e.target.value, 10) }))}
            className="flex-1"
          />
          <span className="text-white w-12">{rotation.x}°</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyan-400">{copy.rotationY}</span>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation.y}
            onChange={(e) => setRotation((prev) => ({ ...prev, y: parseInt(e.target.value, 10) }))}
            className="flex-1"
          />
          <span className="text-white w-12">{rotation.y}°</span>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-cyan-400 mb-2">{copy.properties}</div>
            {selectedShape === "roche" && (
              <>
                <div className="text-white">{copy.rocheTitle}</div>
                <div>{copy.rocheStructure}</div>
                <div>
                  {copy.rocheAreaLabel} <InlineMath math={FORMULAS.rocheArea} />
                </div>
                <div>{copy.rocheHeight}</div>
              </>
            )}
            {selectedShape === "cube" && (
              <>
                <div>{copy.cubeFaces}</div>
                <div>{copy.cubeVertices}</div>
                <div>{copy.cubeEdges}</div>
                <div><InlineMath math={FORMULAS.cubeVolume} /></div>
              </>
            )}
            {selectedShape === "pyramid" && (
              <>
                <div>{copy.pyramidFaces}</div>
                <div>{copy.pyramidVertices}</div>
                <div>{copy.pyramidEdges}</div>
                <div><InlineMath math={FORMULAS.pyramidVolume} /></div>
              </>
            )}
            {selectedShape === "sphere" && (
              <>
                <div>{copy.sphereSurface}</div>
                <div>{copy.sphereNoEdge}</div>
                <div><InlineMath math={FORMULAS.sphereVolume} /></div>
                <div><InlineMath math={FORMULAS.sphereArea} /></div>
              </>
            )}
            {selectedShape === "cylinder" && (
              <>
                <div>{copy.cylinderFaces}</div>
                <div><InlineMath math={FORMULAS.cylinderVolume} /></div>
                <div><InlineMath math={FORMULAS.cylinderArea} /></div>
              </>
            )}
          </div>
          <div>
            <div className="text-cyan-400 mb-2">{copy.eulerTitle}</div>
            <div className="text-lg"><InlineMath math={FORMULAS.euler} /></div>
            <div className="text-xs text-gray-400 mt-2">{copy.convexPoly}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCrossSections = () => (
    <div className="space-y-4">
      <div className="text-[11px] text-cyan-300/70 font-mono">{copy.rotateHint}</div>
      <CrossSectionsViewport />

      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="p-2 bg-gray-800 rounded">
          <div className="text-cyan-400">{copy.cubeSquare}</div>
          <div className="text-xs text-gray-400">{copy.parallelFace}</div>
        </div>
        <div className="p-2 bg-gray-800 rounded">
          <div className="text-cyan-400">{copy.sphereCircle}</div>
          <div className="text-xs text-gray-400">{copy.anyPlane}</div>
        </div>
        <div className="p-2 bg-gray-800 rounded">
          <div className="text-cyan-400">{copy.cylinderRect}</div>
          <div className="text-xs text-gray-400">{copy.parallelAxis}</div>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="text-cyan-400 mb-2">{copy.crossSectionTypes}</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{copy.parallelBase}</span>
            <span className="text-cyan-400">{copy.similarShape}</span>
          </div>
          <div className="flex justify-between">
            <span>{copy.perpendicularBase}</span>
            <span className="text-cyan-400">{copy.differentShape}</span>
          </div>
          <div className="flex justify-between">
            <span>{copy.diagonalCut}</span>
            <span className="text-cyan-400">{copy.complexPolygon}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpatialReasoning = () => (
    <div className="space-y-4">
      <div className="text-[11px] text-cyan-300/70 font-mono">{copy.rotateHint}</div>
      <CurvedSolidsViewport />

      <div className="mt-4 space-y-2 text-sm">
        <div className="p-2 bg-gray-800 rounded">
          <div className="text-cyan-400">{copy.distanceFormula}</div>
          <div className="text-lg">
            <InlineMath math={FORMULAS.distance3D} />
          </div>
        </div>
        <div className="p-2 bg-gray-800 rounded">
          <div className="text-cyan-400">{copy.midpointFormula}</div>
          <div className="text-lg">
            <InlineMath math={FORMULAS.midpoint3D} />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="text-cyan-400 mb-2">{copy.spatialRelations}</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">{copy.parallelPlanes}</div>
            <div className="text-xs text-gray-400">{copy.neverIntersect}</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">{copy.perpendicularPlanes}</div>
            <div className="text-xs text-gray-400">{copy.rightAngle}</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">{copy.skewLines}</div>
            <div className="text-xs text-gray-400">{copy.skewDesc}</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">{copy.dihedralAngle}</div>
            <div className="text-xs text-gray-400">{copy.angleBetweenPlanes}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-4">
      {stage === "BASEL_ARCH" && renderPolyhedra()}
      {stage === "CROSS_SECTIONS" && renderCrossSections()}
      {stage === "CURVED_SOLIDS" && renderSpatialReasoning()}
    </div>
  );
}
