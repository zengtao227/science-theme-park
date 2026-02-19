/**
 * SC2.07 - Calorimeter View Component
 * 
 * Displays interactive calorimeter visualization:
 * - Calorimeter apparatus with solution
 * - Thermometer with temperature scale
 * - Animated temperature change (rising or falling)
 * - Heat flow arrows (red for exo, blue for endo)
 * - Mass, specific heat, and ΔT values
 * - Calculation: q = mcΔT
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6
 */

'use client';

import { useState, useEffect } from 'react';

interface CalorimeterViewProps {
  mass: number; // grams
  specificHeat: number; // J/g°C
  initialTemp: number; // °C
  finalTemp: number; // °C
  heat: number; // J
  animate?: boolean;
}

export function CalorimeterView({
  mass,
  specificHeat,
  initialTemp,
  finalTemp,
  heat,
  animate = false,
}: CalorimeterViewProps) {
  const [currentTemp, setCurrentTemp] = useState(initialTemp);
  const [isAnimating, setIsAnimating] = useState(false);

  const tempChange = finalTemp - initialTemp;
  const isExothermic = tempChange > 0;

  useEffect(() => {
    if (animate && !isAnimating) {
      setIsAnimating(true);
      setCurrentTemp(initialTemp);
      
      // Animate temperature change
      const steps = 30;
      const increment = tempChange / steps;
      let step = 0;
      
      const interval = setInterval(() => {
        step++;
        setCurrentTemp(prev => prev + increment);
        
        if (step >= steps) {
          clearInterval(interval);
          setCurrentTemp(finalTemp);
          setIsAnimating(false);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [animate, initialTemp, finalTemp, tempChange, isAnimating]);

  // Calculate thermometer mercury height (0-100 scale)
  const minTemp = Math.min(initialTemp, finalTemp) - 10;
  const maxTemp = Math.max(initialTemp, finalTemp) + 10;
  const tempRange = maxTemp - minTemp;
  const mercuryHeight = ((currentTemp - minTemp) / tempRange) * 100;

  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white">Calorimeter</h3>
        <p className="text-sm text-white/60">Heat measurement apparatus</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calorimeter Visualization */}
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 300" className="w-full max-w-[250px]">
            {/* Calorimeter container */}
            <rect
              x="50"
              y="100"
              width="100"
              height="150"
              fill="#1f2937"
              stroke="#4b5563"
              strokeWidth="2"
              rx="5"
            />
            
            {/* Solution */}
            <rect
              x="55"
              y="120"
              width="90"
              height="125"
              fill={isExothermic ? '#ef4444' : '#3b82f6'}
              fillOpacity="0.3"
              className="transition-all duration-500"
            />
            
            {/* Stirrer */}
            <line
              x1="100"
              y1="80"
              x2="100"
              y2="200"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            <circle cx="100" cy="200" r="15" fill="none" stroke="#9ca3af" strokeWidth="2" />
            
            {/* Thermometer */}
            <g transform="translate(130, 100)">
              {/* Thermometer tube */}
              <rect
                x="0"
                y="0"
                width="15"
                height="120"
                fill="#e5e7eb"
                stroke="#9ca3af"
                strokeWidth="1"
                rx="7"
              />
              
              {/* Mercury */}
              <rect
                x="3"
                y={120 - mercuryHeight}
                width="9"
                height={mercuryHeight}
                fill={isExothermic ? '#ef4444' : '#3b82f6'}
                className="transition-all duration-300"
              />
              
              {/* Bulb */}
              <circle
                cx="7.5"
                cy="125"
                r="8"
                fill={isExothermic ? '#ef4444' : '#3b82f6'}
                className="transition-all duration-300"
              />
              
              {/* Temperature marks */}
              {[0, 25, 50, 75, 100].map((mark) => (
                <g key={mark}>
                  <line
                    x1="15"
                    y1={120 - mark}
                    x2="20"
                    y2={120 - mark}
                    stroke="#6b7280"
                    strokeWidth="1"
                  />
                </g>
              ))}
            </g>
            
            {/* Temperature display */}
            <text
              x="100"
              y="280"
              fill="white"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
            >
              {currentTemp.toFixed(1)}°C
            </text>
            
            {/* Heat flow arrows */}
            {isAnimating && (
              <>
                <defs>
                  <marker
                    id="heat-arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 5, 0 10"
                      fill={isExothermic ? '#ef4444' : '#3b82f6'}
                    />
                  </marker>
                </defs>
                {isExothermic ? (
                  // Heat flowing out
                  <>
                    <line
                      x1="100"
                      y1="180"
                      x2="40"
                      y2="180"
                      stroke="#ef4444"
                      strokeWidth="2"
                      markerEnd="url(#heat-arrow)"
                      className="animate-pulse"
                    />
                    <line
                      x1="100"
                      y1="180"
                      x2="160"
                      y2="180"
                      stroke="#ef4444"
                      strokeWidth="2"
                      markerEnd="url(#heat-arrow)"
                      className="animate-pulse"
                    />
                  </>
                ) : (
                  // Heat flowing in
                  <>
                    <line
                      x1="40"
                      y1="180"
                      x2="100"
                      y2="180"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      markerEnd="url(#heat-arrow)"
                      className="animate-pulse"
                    />
                    <line
                      x1="160"
                      y1="180"
                      x2="100"
                      y2="180"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      markerEnd="url(#heat-arrow)"
                      className="animate-pulse"
                    />
                  </>
                )}
              </>
            )}
          </svg>
          
          {/* Status indicator */}
          <div className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
            isExothermic
              ? 'bg-red-500/20 text-red-300'
              : 'bg-blue-500/20 text-blue-300'
          }`}>
            {isExothermic ? 'Exothermic (Heat Released)' : 'Endothermic (Heat Absorbed)'}
          </div>
        </div>

        {/* Data and Calculation */}
        <div className="space-y-4">
          {/* Measurements */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-xs text-white/60 uppercase tracking-wider mb-3">
              Measurements
            </div>
            <div className="space-y-2 text-white text-sm">
              <div className="flex justify-between">
                <span>Mass of solution:</span>
                <span className="font-mono">{mass} g</span>
              </div>
              <div className="flex justify-between">
                <span>Specific heat capacity:</span>
                <span className="font-mono">{specificHeat} J/g°C</span>
              </div>
              <div className="flex justify-between">
                <span>Initial temperature:</span>
                <span className="font-mono">{initialTemp}°C</span>
              </div>
              <div className="flex justify-between">
                <span>Final temperature:</span>
                <span className="font-mono">{finalTemp}°C</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                <span>Temperature change (ΔT):</span>
                <span className={`font-mono font-semibold ${
                  tempChange > 0 ? 'text-red-300' : 'text-blue-300'
                }`}>
                  {tempChange > 0 ? '+' : ''}{tempChange}°C
                </span>
              </div>
            </div>
          </div>

          {/* Calculation */}
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <div className="text-xs text-purple-400 uppercase tracking-wider mb-3">
              Heat Calculation
            </div>
            <div className="space-y-2 text-white text-sm">
              <div className="font-mono text-center text-lg mb-3">
                q = mcΔT
              </div>
              <div className="space-y-1">
                <div>q = ({mass} g) × ({specificHeat} J/g°C) × ({tempChange}°C)</div>
                <div className="border-t border-purple-500/30 pt-2 mt-2 font-semibold">
                  q = {heat > 0 ? '+' : ''}{heat} J
                </div>
                <div className="text-xs text-white/60 mt-2">
                  = {(heat / 1000).toFixed(2)} kJ
                </div>
              </div>
            </div>
          </div>

          {/* Interpretation */}
          <div className={`p-4 rounded-lg border ${
            isExothermic
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-blue-500/10 border-blue-500/30'
          }`}>
            <div className={`text-xs uppercase tracking-wider mb-2 ${
              isExothermic ? 'text-red-400' : 'text-blue-400'
            }`}>
              Interpretation
            </div>
            <div className="text-white/80 text-sm">
              {isExothermic ? (
                <>
                  The positive temperature change indicates an <strong>exothermic</strong> reaction.
                  Heat is released into the solution, raising its temperature.
                </>
              ) : (
                <>
                  The negative temperature change indicates an <strong>endothermic</strong> reaction.
                  Heat is absorbed from the solution, lowering its temperature.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
