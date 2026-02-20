/**
 * SC2.07 - Hess Cycle View Component
 * 
 * Displays enthalpy cycle diagrams with multiple pathways:
 * - All reaction arrows with ΔH labels
 * - Highlights selected pathway on click
 * - Consistent arrow notation (down for exo, up for endo)
 * - Direct and indirect pathways
 * - Calculation display: ΔH(total) = ΔH_1 + ΔH_2 + ΔH_3
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.6
 */

'use client';

import { useState } from 'react';
import { InlineMath } from 'react-katex';

interface HessEquation {
  id: string;
  equationLatex: string;
  deltaH: number;
}

interface HessCycleViewProps {
  targetEquation: HessEquation;
  availableEquations: HessEquation[];
  selectedPathway?: string[]; // IDs of selected equations
  onPathwaySelect?: (equationId: string) => void;
}

export function HessCycleView({
  targetEquation,
  availableEquations,
  selectedPathway = [],
  onPathwaySelect,
}: HessCycleViewProps) {
  const [hoveredEquation, setHoveredEquation] = useState<string | null>(null);

  // Calculate total ΔH for selected pathway
  const totalDeltaH = availableEquations
    .filter(eq => selectedPathway.includes(eq.id))
    .reduce((sum, eq) => sum + eq.deltaH, 0);

  const isEquationSelected = (id: string) => selectedPathway.includes(id);
  const isEquationHovered = (id: string) => hoveredEquation === id;

  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white">Hess's Law Cycle</h3>
        <p className="text-sm text-white/60">Select equations to build pathway</p>
      </div>

      {/* Target Equation */}
      <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">Target Equation</div>
        <div className="text-white text-center">
          <InlineMath math={targetEquation.equationLatex} />
        </div>
        <div className="text-center text-purple-300 mt-2">
          ΔH = {targetEquation.deltaH} kJ
        </div>
      </div>

      {/* Cycle Diagram */}
      <div className="mb-6 relative">
        <svg viewBox="0 0 400 300" className="w-full" style={{ maxHeight: '300px' }}>
          {/* Central nodes */}
          <circle cx="100" cy="150" r="8" fill="#60a5fa" />
          <text x="100" y="135" fill="white" fontSize="12" textAnchor="middle">A</text>
          
          <circle cx="300" cy="150" r="8" fill="#10b981" />
          <text x="300" y="135" fill="white" fontSize="12" textAnchor="middle">B</text>
          
          <circle cx="200" cy="80" r="8" fill="#f59e0b" />
          <text x="200" y="65" fill="white" fontSize="12" textAnchor="middle">C</text>

          {/* Direct pathway (target) */}
          <defs>
            <marker
              id="arrow-direct"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <polygon points="0 0, 10 5, 0 10" fill="#a78bfa" />
            </marker>
          </defs>
          <line
            x1="110"
            y1="150"
            x2="290"
            y2="150"
            stroke="#a78bfa"
            strokeWidth="3"
            markerEnd="url(#arrow-direct)"
            strokeDasharray="5,5"
          />
          <text x="200" y="145" fill="#a78bfa" fontSize="11" textAnchor="middle">
            Direct: ΔH = {targetEquation.deltaH} kJ
          </text>

          {/* Indirect pathway arrows */}
          {availableEquations.map((eq, index) => {
            const isSelected = isEquationSelected(eq.id);
            const isHovered = isEquationHovered(eq.id);
            const color = isSelected ? '#10b981' : isHovered ? '#60a5fa' : '#6b7280';
            const strokeWidth = isSelected || isHovered ? 3 : 2;

            // Position arrows in a cycle
            let x1, y1, x2, y2, textX, textY;
            if (index === 0) {
              // A to C
              x1 = 110; y1 = 140;
              x2 = 190; y2 = 90;
              textX = 140; textY = 110;
            } else {
              // C to B
              x1 = 210; y1 = 90;
              x2 = 290; y2 = 140;
              textX = 260; textY = 110;
            }

            return (
              <g key={eq.id}>
                <defs>
                  <marker
                    id={`arrow-${eq.id}`}
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 5, 0 10" fill={color} />
                  </marker>
                </defs>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  markerEnd={`url(#arrow-${eq.id})`}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredEquation(eq.id)}
                  onMouseLeave={() => setHoveredEquation(null)}
                  onClick={() => onPathwaySelect?.(eq.id)}
                />
                <text
                  x={textX}
                  y={textY}
                  fill={color}
                  fontSize="10"
                  textAnchor="middle"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredEquation(eq.id)}
                  onMouseLeave={() => setHoveredEquation(null)}
                  onClick={() => onPathwaySelect?.(eq.id)}
                >
                  ΔH{index + 1} = {eq.deltaH} kJ
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Available Equations */}
      <div className="space-y-3 mb-6">
        <div className="text-xs text-white/60 uppercase tracking-wider">Available Equations</div>
        {availableEquations.map((eq, index) => (
          <div
            key={eq.id}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              isEquationSelected(eq.id)
                ? 'bg-green-500/20 border-green-500/50'
                : isEquationHovered(eq.id)
                ? 'bg-blue-500/20 border-blue-500/50'
                : 'bg-white/5 border-white/10 hover:border-white/30'
            }`}
            onMouseEnter={() => setHoveredEquation(eq.id)}
            onMouseLeave={() => setHoveredEquation(null)}
            onClick={() => onPathwaySelect?.(eq.id)}
          >
            <div className="flex items-center justify-between">
              <div className="text-white text-sm">
                <span className="text-white/60 mr-2">({index + 1})</span>
                <InlineMath math={eq.equationLatex} />
              </div>
              <div className="text-white/80 text-sm ml-4">
                ΔH = {eq.deltaH} kJ
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pathway Calculation */}
      {selectedPathway.length > 0 && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="text-xs text-green-400 uppercase tracking-wider mb-2">
            Selected Pathway Calculation
          </div>
          <div className="text-white text-sm space-y-1">
            {availableEquations
              .filter(eq => selectedPathway.includes(eq.id))
              .map((eq, index) => (
                <div key={eq.id}>
                  ΔH{index + 1} = {eq.deltaH} kJ
                </div>
              ))}
            <div className="border-t border-green-500/30 mt-2 pt-2 font-semibold">
              Total ΔH = {totalDeltaH} kJ
            </div>
            {Math.abs(totalDeltaH - targetEquation.deltaH) < 1 && (
              <div className="text-green-400 text-xs mt-2">
                ✓ Pathway matches target equation!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
