/**
 * SC2.07 - Energy Diagram Component
 * 
 * Displays interactive energy level diagrams for reactions showing:
 * - Horizontal lines for reactant and product energy levels
 * - Vertical arrow for ΔH (downward for exothermic, upward for endothermic)
 * - Color coding: red for exothermic, blue for endothermic
 * - Activation energy curve (for ADVANCED/ELITE)
 * - Hover tooltips for numerical values
 * 
 * Requirements: 1.6, 2.5, 2.6, 18.4, 18.5
 */

'use client';

import { useState } from 'react';

interface EnergyDiagramProps {
  deltaH: number; // kJ or kJ/mol
  reactionType: 'exothermic' | 'endothermic';
  showActivationEnergy?: boolean;
  activationEnergy?: number; // kJ/mol
  reactantLabel?: string;
  productLabel?: string;
}

export function EnergyDiagram({
  deltaH,
  reactionType,
  showActivationEnergy = false,
  activationEnergy = 75,
  reactantLabel = 'Reactants',
  productLabel = 'Products',
}: EnergyDiagramProps) {
  const [hoveredLevel, setHoveredLevel] = useState<'reactants' | 'products' | 'activation' | null>(null);

  // Calculate energy levels (normalized to 0-100 scale for display)
  const baseEnergy = 30; // Baseline for reactants
  const productEnergy = reactionType === 'exothermic' 
    ? baseEnergy - Math.abs(deltaH) / 10 
    : baseEnergy + Math.abs(deltaH) / 10;
  
  // Ensure product energy stays in reasonable bounds
  const normalizedProductEnergy = Math.max(10, Math.min(90, productEnergy));
  const normalizedReactantEnergy = baseEnergy;
  
  // Activation energy peak
  const activationPeak = showActivationEnergy 
    ? normalizedReactantEnergy + (activationEnergy / 10)
    : normalizedReactantEnergy;

  // Color based on reaction type
  const arrowColor = reactionType === 'exothermic' ? 'text-red-400' : 'text-blue-400';
  const glowColor = reactionType === 'exothermic' ? 'shadow-red-500/50' : 'shadow-blue-500/50';

  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 relative">
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white">Energy Diagram</h3>
        <p className="text-sm text-white/60">
          {reactionType === 'exothermic' ? 'Exothermic Reaction' : 'Endothermic Reaction'}
        </p>
      </div>

      {/* SVG Container */}
      <svg 
        viewBox="0 0 400 300" 
        className="w-full h-full"
        style={{ maxHeight: '350px' }}
      >
        {/* Y-axis */}
        <line 
          x1="50" 
          y1="250" 
          x2="50" 
          y2="30" 
          stroke="white" 
          strokeOpacity="0.3" 
          strokeWidth="2"
        />
        <text x="20" y="140" fill="white" fontSize="12" transform="rotate(-90 20 140)">
          Energy
        </text>

        {/* X-axis */}
        <line 
          x1="50" 
          y1="250" 
          x2="380" 
          y2="250" 
          stroke="white" 
          strokeOpacity="0.3" 
          strokeWidth="2"
        />
        <text x="180" y="280" fill="white" fontSize="12">
          Reaction Progress
        </text>

        {/* Reactant energy level */}
        <line
          x1="70"
          y1={250 - normalizedReactantEnergy * 2}
          x2="150"
          y2={250 - normalizedReactantEnergy * 2}
          stroke={hoveredLevel === 'reactants' ? '#60a5fa' : '#3b82f6'}
          strokeWidth="3"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setHoveredLevel('reactants')}
          onMouseLeave={() => setHoveredLevel(null)}
        />
        <text
          x="110"
          y={250 - normalizedReactantEnergy * 2 - 10}
          fill="white"
          fontSize="11"
          textAnchor="middle"
        >
          {reactantLabel}
        </text>

        {/* Product energy level */}
        <line
          x1="250"
          y1={250 - normalizedProductEnergy * 2}
          x2="330"
          y2={250 - normalizedProductEnergy * 2}
          stroke={hoveredLevel === 'products' ? '#60a5fa' : '#10b981'}
          strokeWidth="3"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setHoveredLevel('products')}
          onMouseLeave={() => setHoveredLevel(null)}
        />
        <text
          x="290"
          y={250 - normalizedProductEnergy * 2 - 10}
          fill="white"
          fontSize="11"
          textAnchor="middle"
        >
          {productLabel}
        </text>

        {/* Activation energy curve (if enabled) */}
        {showActivationEnergy && (
          <>
            <path
              d={`M 150 ${250 - normalizedReactantEnergy * 2} 
                  Q 200 ${250 - activationPeak * 2}, 250 ${250 - normalizedProductEnergy * 2}`}
              stroke={hoveredLevel === 'activation' ? '#fbbf24' : '#f59e0b'}
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredLevel('activation')}
              onMouseLeave={() => setHoveredLevel(null)}
            />
            <circle
              cx="200"
              cy={250 - activationPeak * 2}
              r="4"
              fill="#f59e0b"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLevel('activation')}
              onMouseLeave={() => setHoveredLevel(null)}
            />
            <text
              x="200"
              y={250 - activationPeak * 2 - 10}
              fill="#fbbf24"
              fontSize="10"
              textAnchor="middle"
            >
              Ea = {activationEnergy} kJ/mol
            </text>
          </>
        )}

        {/* ΔH arrow */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 5, 0 10"
              fill={reactionType === 'exothermic' ? '#f87171' : '#60a5fa'}
            />
          </marker>
        </defs>
        
        <line
          x1="360"
          y1={250 - normalizedReactantEnergy * 2}
          x2="360"
          y2={250 - normalizedProductEnergy * 2}
          stroke={reactionType === 'exothermic' ? '#f87171' : '#60a5fa'}
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="370"
          y={250 - (normalizedReactantEnergy + normalizedProductEnergy)}
          fill={reactionType === 'exothermic' ? '#f87171' : '#60a5fa'}
          fontSize="12"
          fontWeight="bold"
        >
          ΔH = {deltaH > 0 ? '+' : ''}{deltaH} kJ
        </text>
      </svg>

      {/* Tooltip */}
      {hoveredLevel && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
          {hoveredLevel === 'reactants' && `Reactant Energy Level`}
          {hoveredLevel === 'products' && `Product Energy Level`}
          {hoveredLevel === 'activation' && `Activation Energy: ${activationEnergy} kJ/mol`}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-2 right-2 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${reactionType === 'exothermic' ? 'bg-red-400' : 'bg-blue-400'}`} />
          <span>{reactionType === 'exothermic' ? 'Heat Released' : 'Heat Absorbed'}</span>
        </div>
      </div>
    </div>
  );
}
