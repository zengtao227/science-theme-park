"use client";

import React, { useState } from 'react';

type Stage = 'BASEL_ARCH' | 'CROSS_SECTIONS' | 'CURVED_SOLIDS';

interface GeometryVisualizationProps {
  stage: Stage;
}

export default function GeometryVisualization({ stage }: GeometryVisualizationProps) {
  const [rotation, setRotation] = useState({ x: 30, y: 45 });
  const [selectedShape, setSelectedShape] = useState<'cube' | 'pyramid' | 'sphere' | 'cylinder' | 'roche'>('roche');

  const renderPolyhedra = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {(['roche', 'cube', 'pyramid', 'sphere', 'cylinder'] as const).map(shape => (
          <button
            key={shape}
            onClick={() => setSelectedShape(shape)}
            className={`px-3 py-1 text-xs rounded border transition-all ${selectedShape === shape ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_10px_#00ffff]' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
          >
            {shape.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="relative w-full h-64 bg-black/30 rounded flex items-center justify-center">
          <div
            className="relative w-32 h-32"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s'
            }}
          >
            {selectedShape === 'cube' && (
              <div className="w-full h-full border-4 border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_#00ffff44]" />
            )}
            {selectedShape === 'roche' && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-8 border-2 border-cyan-400 bg-cyan-500/30" />
                <div className="w-20 h-12 border-2 border-cyan-400 bg-cyan-500/20 mt-1" />
                <div className="w-24 h-16 border-2 border-cyan-400 bg-cyan-500/10 mt-1" />
              </div>
            )}
            {selectedShape === 'pyramid' && (
              <div className="w-0 h-0 border-l-[64px] border-r-[64px] border-b-[96px] border-l-transparent border-r-transparent border-b-cyan-400/50 relative">
                <div className="absolute top-[20px] left-[-32px] w-[64px] h-[76px] border-2 border-cyan-400" />
              </div>
            )}
            {selectedShape === 'sphere' && (
              <div className="w-full h-full rounded-full border-4 border-cyan-400 bg-cyan-500/20 shadow-[0_0_30px_#00ffff66]" />
            )}
            {selectedShape === 'cylinder' && (
              <div className="w-full h-full rounded-xl border-4 border-cyan-400 bg-cyan-500/20 flex flex-col justify-between">
                <div className="border-b-2 border-cyan-400 h-4" />
                <div className="border-t-2 border-cyan-400 h-4" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">Rotation X:</span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation.x}
              onChange={(e) => setRotation(prev => ({ ...prev, x: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{rotation.x}°</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">Rotation Y:</span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation.y}
              onChange={(e) => setRotation(prev => ({ ...prev, y: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-12">{rotation.y}°</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-cyan-400 mb-2">Properties:</div>
            {selectedShape === 'roche' && (
              <>
                <div className="text-white">Roche Tower Analogy</div>
                <div>Structure: Stacked Prisms</div>
                <div>Area: 2400m²-1800m²</div>
                <div>Height: 205m</div>
              </>
            )}
            {selectedShape === 'cube' && (
              <>
                <div>Faces: 6</div>
                <div>Vertices: 8</div>
                <div>Edges: 12</div>
                <div>V = a³</div>
              </>
            )}
            {selectedShape === 'pyramid' && (
              <>
                <div>Faces: 5</div>
                <div>Vertices: 5</div>
                <div>Edges: 8</div>
                <div>V = (1/3)Bh</div>
              </>
            )}
            {selectedShape === 'sphere' && (
              <>
                <div>Curved surface</div>
                <div>No edges/vertices</div>
                <div>V = (4/3)πr³</div>
                <div>A = 4πr²</div>
              </>
            )}
            {selectedShape === 'cylinder' && (
              <>
                <div>Faces: 3</div>
                <div>V = πr²h</div>
                <div>A = 2πr² + 2πrh</div>
              </>
            )}
          </div>
          <div>
            <div className="text-cyan-400 mb-2">Euler&apos;s Formula:</div>
            <div className="text-lg">V - E + F = 2</div>
            <div className="text-xs text-gray-400 mt-2">
              (for convex polyhedra)
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCrossSections = () => (
    <div className="space-y-4">
      <div className="p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="text-center mb-4 text-cyan-400">Cross-Section Plane</div>
        <div className="relative w-full h-64 bg-black/30 rounded flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-cyan-400 bg-cyan-500/20 relative">
              <div
                className="absolute inset-0 border-2 border-yellow-400 bg-yellow-500/20"
                style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}
              />
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-400" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Cube → Square</div>
            <div className="text-xs text-gray-400">Parallel to face</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Sphere → Circle</div>
            <div className="text-xs text-gray-400">Any plane</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Cylinder → Rectangle</div>
            <div className="text-xs text-gray-400">Parallel to axis</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="text-cyan-400 mb-2">Cross-Section Types:</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Parallel to base:</span>
            <span className="text-cyan-400">Similar shape</span>
          </div>
          <div className="flex justify-between">
            <span>Perpendicular to base:</span>
            <span className="text-cyan-400">Different shape</span>
          </div>
          <div className="flex justify-between">
            <span>Diagonal cut:</span>
            <span className="text-cyan-400">Complex polygon</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpatialReasoning = () => (
    <div className="space-y-4">
      <div className="p-6 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="text-center mb-4 text-cyan-400">3D Coordinate System</div>
        <div className="relative w-full h-64 bg-black/30 rounded flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* X-axis (red) */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500" />
            <div className="absolute top-1/2 right-0 text-red-500 text-xs">X</div>

            {/* Y-axis (green) */}
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-green-500" />
            <div className="absolute left-1/2 top-0 text-green-500 text-xs">Y</div>

            {/* Z-axis (blue) - diagonal to simulate depth */}
            <div
              className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-blue-500"
              style={{ transform: 'rotate(-45deg) translateX(-50%)', transformOrigin: 'left' }}
            />
            <div className="absolute bottom-4 left-4 text-blue-500 text-xs">Z</div>

            {/* Example point */}
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-cyan-400 rounded-full" />
            <div className="absolute top-1/4 left-3/4 text-cyan-400 text-xs">(3, 4, 5)</div>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Distance Formula:</div>
            <div className="text-lg">d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Midpoint Formula:</div>
            <div className="text-lg">M = ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2)</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <div className="text-cyan-400 mb-2">Spatial Relationships:</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Parallel planes</div>
            <div className="text-xs text-gray-400">Never intersect</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Perpendicular planes</div>
            <div className="text-xs text-gray-400">90° angle</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Skew lines</div>
            <div className="text-xs text-gray-400">Non-parallel, non-intersecting</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="text-cyan-400">Dihedral angle</div>
            <div className="text-xs text-gray-400">Angle between planes</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-4">
      {stage === 'BASEL_ARCH' && renderPolyhedra()}
      {stage === 'CROSS_SECTIONS' && renderCrossSections()}
      {stage === 'CURVED_SOLIDS' && renderSpatialReasoning()}
    </div>
  );
}
