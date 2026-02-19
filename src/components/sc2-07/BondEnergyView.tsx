/**
 * SC2.07 - Bond Energy View Component
 * 
 * Displays molecular structures with bond energy visualization:
 * - Molecular structures with visible bonds
 * - Bond breaking animation (red flash, energy absorbed)
 * - Bond forming animation (green flash, energy released)
 * - Bond energy values next to each bond
 * - Standard bond notation: single (—), double (=), triple (≡)
 * - Calculation: ΔH = Σ(bonds broken) - Σ(bonds formed)
 * 
 * Requirements: 8.1, 8.2, 8.3, 8.5, 8.7
 */

'use client';

import { useState, useEffect } from 'react';

interface Bond {
  type: string; // e.g., "C-H", "C=O", "O-H"
  count: number;
  energy: number; // kJ/mol
}

interface BondEnergyViewProps {
  bondsBroken: Bond[];
  bondsFormed: Bond[];
  animate?: boolean;
}

export function BondEnergyView({
  bondsBroken,
  bondsFormed,
  animate = false,
}: BondEnergyViewProps) {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'breaking' | 'forming'>('idle');

  useEffect(() => {
    if (animate) {
      // Animation sequence: breaking → forming
      setAnimationPhase('breaking');
      const timer1 = setTimeout(() => {
        setAnimationPhase('forming');
      }, 1500);
      const timer2 = setTimeout(() => {
        setAnimationPhase('idle');
      }, 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [animate]);

  // Calculate totals
  const totalBroken = bondsBroken.reduce((sum, bond) => sum + bond.energy * bond.count, 0);
  const totalFormed = bondsFormed.reduce((sum, bond) => sum + bond.energy * bond.count, 0);
  const deltaH = totalBroken - totalFormed;

  // Get bond symbol
  const getBondSymbol = (bondType: string) => {
    if (bondType.includes('≡') || bondType.includes('triple')) return '≡';
    if (bondType.includes('=') || bondType.includes('double')) return '=';
    return '—';
  };

  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white">Bond Energy Analysis</h3>
        <p className="text-sm text-white/60">Energy changes during bond breaking and forming</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Bonds Broken (Reactants) */}
        <div className={`p-4 rounded-lg border transition-all ${
          animationPhase === 'breaking'
            ? 'bg-red-500/20 border-red-500/50 shadow-lg shadow-red-500/30'
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          <div className="text-xs text-red-400 uppercase tracking-wider mb-3">
            Bonds Broken (Energy Absorbed)
          </div>
          <div className="space-y-2">
            {bondsBroken.map((bond, index) => (
              <div key={index} className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono">{getBondSymbol(bond.type)}</span>
                  <span className="text-sm">{bond.type}</span>
                  {bond.count > 1 && (
                    <span className="text-xs text-white/60">× {bond.count}</span>
                  )}
                </div>
                <div className="text-sm text-red-300">
                  +{bond.energy * bond.count} kJ
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-red-500/30 text-right">
            <span className="text-white/60 text-sm">Total: </span>
            <span className="text-red-300 font-semibold">+{totalBroken} kJ</span>
          </div>
        </div>

        {/* Bonds Formed (Products) */}
        <div className={`p-4 rounded-lg border transition-all ${
          animationPhase === 'forming'
            ? 'bg-green-500/20 border-green-500/50 shadow-lg shadow-green-500/30'
            : 'bg-green-500/10 border-green-500/30'
        }`}>
          <div className="text-xs text-green-400 uppercase tracking-wider mb-3">
            Bonds Formed (Energy Released)
          </div>
          <div className="space-y-2">
            {bondsFormed.map((bond, index) => (
              <div key={index} className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono">{getBondSymbol(bond.type)}</span>
                  <span className="text-sm">{bond.type}</span>
                  {bond.count > 1 && (
                    <span className="text-xs text-white/60">× {bond.count}</span>
                  )}
                </div>
                <div className="text-sm text-green-300">
                  -{bond.energy * bond.count} kJ
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-green-500/30 text-right">
            <span className="text-white/60 text-sm">Total: </span>
            <span className="text-green-300 font-semibold">-{totalFormed} kJ</span>
          </div>
        </div>
      </div>

      {/* Calculation */}
      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <div className="text-xs text-purple-400 uppercase tracking-wider mb-3">
          Net Energy Change
        </div>
        <div className="text-white space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Energy absorbed (bonds broken):</span>
            <span className="text-red-300">+{totalBroken} kJ</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Energy released (bonds formed):</span>
            <span className="text-green-300">-{totalFormed} kJ</span>
          </div>
          <div className="border-t border-purple-500/30 pt-2 mt-2">
            <div className="flex items-center justify-between font-semibold">
              <span>ΔH = Bonds Broken - Bonds Formed:</span>
              <span className={deltaH < 0 ? 'text-red-400' : 'text-blue-400'}>
                {deltaH > 0 ? '+' : ''}{deltaH} kJ
              </span>
            </div>
          </div>
          <div className="text-xs text-white/60 mt-2">
            {deltaH < 0 ? '(Exothermic - energy released)' : '(Endothermic - energy absorbed)'}
          </div>
        </div>
      </div>

      {/* Molecular Representation (Simplified) */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <div className="text-xs text-white/60 uppercase tracking-wider mb-3">
          Molecular Representation
        </div>
        <div className="flex items-center justify-around">
          {/* Reactants */}
          <div className="text-center">
            <div className="text-white/80 text-sm mb-2">Reactants</div>
            <svg width="100" height="80" viewBox="0 0 100 80">
              {bondsBroken.slice(0, 3).map((bond, index) => (
                <g key={index} transform={`translate(${index * 30 + 10}, 30)`}>
                  <circle cx="0" cy="0" r="8" fill="#60a5fa" />
                  <line
                    x1="8"
                    y1="0"
                    x2="22"
                    y2="0"
                    stroke={animationPhase === 'breaking' ? '#ef4444' : '#9ca3af'}
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <circle cx="30" cy="0" r="8" fill="#10b981" />
                </g>
              ))}
            </svg>
          </div>

          {/* Arrow */}
          <div className="text-3xl text-white/60">→</div>

          {/* Products */}
          <div className="text-center">
            <div className="text-white/80 text-sm mb-2">Products</div>
            <svg width="100" height="80" viewBox="0 0 100 80">
              {bondsFormed.slice(0, 3).map((bond, index) => (
                <g key={index} transform={`translate(${index * 30 + 10}, 30)`}>
                  <circle cx="0" cy="0" r="8" fill="#60a5fa" />
                  <line
                    x1="8"
                    y1="0"
                    x2="22"
                    y2="0"
                    stroke={animationPhase === 'forming' ? '#10b981' : '#9ca3af'}
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <circle cx="30" cy="0" r="8" fill="#10b981" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
