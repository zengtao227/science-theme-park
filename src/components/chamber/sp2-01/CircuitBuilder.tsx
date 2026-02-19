// SP2.01 Circuit Builder Component (Simplified MVP)

import React from "react";
import { SP201Quest } from "@/types/sp2-01-types";

interface CircuitBuilderProps {
  quest: SP201Quest;
  onCircuitChange?: (circuit: any) => void;
}

export default function CircuitBuilder({ quest, onCircuitChange }: CircuitBuilderProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/20 rounded-xl border border-white/10 p-6">
      <div className="text-center">
        <div className="text-cyan-400 text-xl mb-4">🔌 Circuit Builder</div>
        <div className="text-white/70 text-sm mb-6">
          Interactive circuit building coming soon
        </div>
        
        {/* Component Palette */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⏚</div>
            <div className="text-xs text-white/70">Battery</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">💡</div>
            <div className="text-xs text-white/70">Bulb</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⏻</div>
            <div className="text-xs text-white/70">Switch</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">—</div>
            <div className="text-xs text-white/70">Wire</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⧉</div>
            <div className="text-xs text-white/70">Resistor</div>
          </div>
        </div>
        
        {/* Circuit Workspace */}
        <div className="w-full h-64 bg-black/40 rounded-lg border border-white/10 flex items-center justify-center">
          <div className="text-white/50 text-sm">
            Drag components here to build your circuit
          </div>
        </div>
      </div>
    </div>
  );
}
