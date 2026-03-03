"use client";

import React, { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

type Stage = "BASEL_ARCH" | "CROSS_SECTIONS" | "CURVED_SOLIDS";
type Shape = "cube" | "pyramid" | "sphere" | "cylinder" | "roche";
type Lang = "EN" | "CN" | "DE";

interface GeometryVisualizationProps {
  stage: Stage;
}

const monitorCopy = {
  EN: {
    shapeButtons: { roche: "ROCHE", cube: "CUBE", pyramid: "PYRAMID", sphere: "SPHERE", cylinder: "CYLINDER" },
    rotationX: "Rotation X:",
    rotationY: "Rotation Y:",
    properties: "Properties:",
    rocheTitle: "Roche Tower Analogy",
    rocheStructure: "Structure: Stacked Prisms",
    rocheAreaLabel: "Area:",
    rocheHeight: "Height: 205m",
    cubeFaces: "Faces: 6",
    cubeVertices: "Vertices: 8",
    cubeEdges: "Edges: 12",
    pyramidFaces: "Faces: 5",
    pyramidVertices: "Vertices: 5",
    pyramidEdges: "Edges: 8",
    sphereSurface: "Curved surface",
    sphereNoEdge: "No edges/vertices",
    cylinderFaces: "Faces: 3",
    eulerTitle: "Euler's Formula:",
    convexPoly: "(for convex polyhedra)",
    crossSectionPlane: "Cross-Section Plane",
    cubeSquare: "Cube -> Square",
    sphereCircle: "Sphere -> Circle",
    cylinderRect: "Cylinder -> Rectangle",
    parallelFace: "Parallel to face",
    anyPlane: "Any plane",
    parallelAxis: "Parallel to axis",
    crossSectionTypes: "Cross-Section Types:",
    parallelBase: "Parallel to base:",
    perpendicularBase: "Perpendicular to base:",
    diagonalCut: "Diagonal cut:",
    similarShape: "Similar shape",
    differentShape: "Different shape",
    complexPolygon: "Complex polygon",
    coordinateSystem: "3D Coordinate System",
    distanceFormula: "Distance Formula:",
    midpointFormula: "Midpoint Formula:",
    spatialRelations: "Spatial Relationships:",
    parallelPlanes: "Parallel planes",
    neverIntersect: "Never intersect",
    perpendicularPlanes: "Perpendicular planes",
    rightAngle: "90 deg angle",
    skewLines: "Skew lines",
    skewDesc: "Non-parallel, non-intersecting",
    dihedralAngle: "Dihedral angle",
    angleBetweenPlanes: "Angle between planes",
  },
  CN: {
    shapeButtons: { roche: "罗氏塔", cube: "立方体", pyramid: "棱锥", sphere: "球体", cylinder: "圆柱" },
    rotationX: "X 轴旋转:",
    rotationY: "Y 轴旋转:",
    properties: "性质:",
    rocheTitle: "罗氏塔类比",
    rocheStructure: "结构：分层棱柱",
    rocheAreaLabel: "面积：",
    rocheHeight: "高度：205m",
    cubeFaces: "面数：6",
    cubeVertices: "顶点：8",
    cubeEdges: "棱数：12",
    pyramidFaces: "面数：5",
    pyramidVertices: "顶点：5",
    pyramidEdges: "棱数：8",
    sphereSurface: "曲面",
    sphereNoEdge: "无棱无顶点",
    cylinderFaces: "面数：3",
    eulerTitle: "欧拉公式:",
    convexPoly: "（适用于凸多面体）",
    crossSectionPlane: "截面平面",
    cubeSquare: "立方体 -> 正方形",
    sphereCircle: "球体 -> 圆形",
    cylinderRect: "圆柱 -> 矩形",
    parallelFace: "平行于面",
    anyPlane: "任意平面",
    parallelAxis: "平行于轴",
    crossSectionTypes: "截面类型:",
    parallelBase: "平行于底面:",
    perpendicularBase: "垂直于底面:",
    diagonalCut: "对角切割:",
    similarShape: "相似形状",
    differentShape: "不同形状",
    complexPolygon: "复杂多边形",
    coordinateSystem: "三维坐标系",
    distanceFormula: "距离公式:",
    midpointFormula: "中点公式:",
    spatialRelations: "空间关系:",
    parallelPlanes: "平行平面",
    neverIntersect: "永不相交",
    perpendicularPlanes: "垂直平面",
    rightAngle: "90 度夹角",
    skewLines: "异面直线",
    skewDesc: "不平行且不相交",
    dihedralAngle: "二面角",
    angleBetweenPlanes: "平面夹角",
  },
  DE: {
    shapeButtons: { roche: "ROCHE", cube: "WUERFEL", pyramid: "PYRAMIDE", sphere: "KUGEL", cylinder: "ZYLINDER" },
    rotationX: "Rotation X:",
    rotationY: "Rotation Y:",
    properties: "Eigenschaften:",
    rocheTitle: "Roche-Turm Analogie",
    rocheStructure: "Struktur: Gestapelte Prismen",
    rocheAreaLabel: "Flaeche:",
    rocheHeight: "Hoehe: 205m",
    cubeFaces: "Flaechen: 6",
    cubeVertices: "Ecken: 8",
    cubeEdges: "Kanten: 12",
    pyramidFaces: "Flaechen: 5",
    pyramidVertices: "Ecken: 5",
    pyramidEdges: "Kanten: 8",
    sphereSurface: "Gekruemmte Flaeche",
    sphereNoEdge: "Keine Kanten/Ecken",
    cylinderFaces: "Flaechen: 3",
    eulerTitle: "Eulersche Formel:",
    convexPoly: "(fuer konvexe Polyeder)",
    crossSectionPlane: "Schnittebene",
    cubeSquare: "Wuerfel -> Quadrat",
    sphereCircle: "Kugel -> Kreis",
    cylinderRect: "Zylinder -> Rechteck",
    parallelFace: "Parallel zur Flaeche",
    anyPlane: "Beliebige Ebene",
    parallelAxis: "Parallel zur Achse",
    crossSectionTypes: "Schnittarten:",
    parallelBase: "Parallel zur Grundflaeche:",
    perpendicularBase: "Senkrecht zur Grundflaeche:",
    diagonalCut: "Diagonalschnitt:",
    similarShape: "Aehnliche Form",
    differentShape: "Andere Form",
    complexPolygon: "Komplexes Polygon",
    coordinateSystem: "3D-Koordinatensystem",
    distanceFormula: "Distanzformel:",
    midpointFormula: "Mittelpunktformel:",
    spatialRelations: "Raeumliche Beziehungen:",
    parallelPlanes: "Parallele Ebenen",
    neverIntersect: "Schneiden sich nie",
    perpendicularPlanes: "Senkrechte Ebenen",
    rightAngle: "90-Grad-Winkel",
    skewLines: "Windschiefe Geraden",
    skewDesc: "Nicht parallel, nicht schneidend",
    dihedralAngle: "Diederwinkel",
    angleBetweenPlanes: "Winkel zwischen Ebenen",
  },
} as const;

export default function GeometryVisualization({ stage }: GeometryVisualizationProps) {
  const { currentLanguage } = useLanguage();
  const [rotation, setRotation] = useState({ x: 30, y: 45 });
  const [selectedShape, setSelectedShape] = useState<Shape>("roche");

  const copy = useMemo(() => {
    const lang = (currentLanguage as Lang) in monitorCopy ? (currentLanguage as Lang) : "EN";
    return monitorCopy[lang];
  }, [currentLanguage]);

  const renderPolyhedra = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
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

      <div className="p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="relative w-full h-64 bg-black/30 rounded flex items-center justify-center">
          <div
            className="relative w-32 h-32"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.3s",
            }}
          >
            {selectedShape === "cube" && (
              <div className="w-full h-full border-4 border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_#00ffff44]" />
            )}
            {selectedShape === "roche" && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-8 border-2 border-cyan-400 bg-cyan-500/30" />
                <div className="w-20 h-12 border-2 border-cyan-400 bg-cyan-500/20 mt-1" />
                <div className="w-24 h-16 border-2 border-cyan-400 bg-cyan-500/10 mt-1" />
              </div>
            )}
            {selectedShape === "pyramid" && (
              <div className="w-0 h-0 border-l-[64px] border-r-[64px] border-b-[96px] border-l-transparent border-r-transparent border-b-cyan-400/50 relative">
                <div className="absolute top-[20px] left-[-32px] w-[64px] h-[76px] border-2 border-cyan-400" />
              </div>
            )}
            {selectedShape === "sphere" && (
              <div className="w-full h-full rounded-full border-4 border-cyan-400 bg-cyan-500/20 shadow-[0_0_30px_#00ffff66]" />
            )}
            {selectedShape === "cylinder" && (
              <div className="w-full h-full rounded-xl border-4 border-cyan-400 bg-cyan-500/20 flex flex-col justify-between">
                <div className="border-b-2 border-cyan-400 h-4" />
                <div className="border-t-2 border-cyan-400 h-4" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
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
                  {copy.rocheAreaLabel} <InlineMath math={"2400\\,m^{2}-1800\\,m^{2}"} />
                </div>
                <div>{copy.rocheHeight}</div>
              </>
            )}
            {selectedShape === "cube" && (
              <>
                <div>{copy.cubeFaces}</div>
                <div>{copy.cubeVertices}</div>
                <div>{copy.cubeEdges}</div>
                <div><InlineMath math={"V=a^{3}"} /></div>
              </>
            )}
            {selectedShape === "pyramid" && (
              <>
                <div>{copy.pyramidFaces}</div>
                <div>{copy.pyramidVertices}</div>
                <div>{copy.pyramidEdges}</div>
                <div><InlineMath math={"V=\\frac{1}{3}Bh"} /></div>
              </>
            )}
            {selectedShape === "sphere" && (
              <>
                <div>{copy.sphereSurface}</div>
                <div>{copy.sphereNoEdge}</div>
                <div><InlineMath math={"V=\\frac{4}{3}\\pi r^{3}"} /></div>
                <div><InlineMath math={"A=4\\pi r^{2}"} /></div>
              </>
            )}
            {selectedShape === "cylinder" && (
              <>
                <div>{copy.cylinderFaces}</div>
                <div><InlineMath math={"V=\\pi r^{2}h"} /></div>
                <div><InlineMath math={"A=2\\pi r^{2}+2\\pi rh"} /></div>
              </>
            )}
          </div>
          <div>
            <div className="text-cyan-400 mb-2">{copy.eulerTitle}</div>
            <div className="text-lg">V - E + F = 2</div>
            <div className="text-xs text-gray-400 mt-2">{copy.convexPoly}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCrossSections = () => (
    <div className="space-y-4">
      <div className="p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="text-center mb-4 text-cyan-400">{copy.crossSectionPlane}</div>
        <div className="relative w-full h-64 bg-black/30 rounded flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-cyan-400 bg-cyan-500/20 relative">
              <div
                className="absolute inset-0 border-2 border-yellow-400 bg-yellow-500/20"
                style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
              />
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-400" />
          </div>
        </div>

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
      <div className="p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="text-center mb-4 text-cyan-400">{copy.coordinateSystem}</div>
        <div className="relative w-full h-64 bg-black/30 rounded flex items-center justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500" />
            <div className="absolute top-1/2 right-0 text-red-500 text-xs">X</div>

            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-green-500" />
            <div className="absolute left-1/2 top-0 text-green-500 text-xs">Y</div>

            <div
              className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-blue-500"
              style={{ transform: "rotate(-45deg) translateX(-50%)", transformOrigin: "left" }}
            />
            <div className="absolute bottom-4 left-4 text-blue-500 text-xs">Z</div>

            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-cyan-400 rounded-full" />
            <div className="absolute top-1/4 left-3/4 text-cyan-400 text-xs">(3, 4, 5)</div>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">{copy.distanceFormula}</div>
            <div className="text-lg">
              <InlineMath math={"d=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}+(z_2-z_1)^{2}}"} />
            </div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">{copy.midpointFormula}</div>
            <div className="text-lg">
              <InlineMath math={"M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2},\\frac{z_1+z_2}{2}\\right)"} />
            </div>
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
