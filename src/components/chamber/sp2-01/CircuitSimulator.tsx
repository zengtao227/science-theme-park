// SP2.01 Circuit Simulator Component (Simplified MVP)

import React from "react";
import { SP201Quest } from "@/types/sp2-01-types";

interface CircuitSimulatorProps {
  quest: SP201Quest;
  circuit?: any;
}

export default function CircuitSimulator({ quest, circuit }: CircuitSimulatorProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-cyan-400 text-2xl mb-4">⚡ CIRCUIT SIMULATOR</div>
        <div className="text-white/70 mb-6">
          Real-time circuit simulation
        </div>
        
        {/* Simulation Display */}
        <div className="w-full max-w-md p-6 bg-black/30 rounded-xl border border-cyan-400/30">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Voltage:</span>
              <span className="text-cyan-400 font-mono">9.0 V</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Current:</span>
              <span className="text-cyan-400 font-mono">0.0 A</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Resistance:</span>
              <span className="text-cyan-400 font-mono">∞ Ω</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Status:</span>
              <span className="text-red-400">Open Circuit</span>
            </div>
          </div>
        </div>
        
        {/* Animation Controls */}
        <div className="mt-6 flex gap-4 justify-center">
          <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors">
            ▶ Start
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 hover:bg-white/20 transition-colors">
            ⏸ Pause
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 hover:bg-white/20 transition-colors">
            ⏹ Reset
          </button>
        </div>
      </div>
    </div>
  );
}
