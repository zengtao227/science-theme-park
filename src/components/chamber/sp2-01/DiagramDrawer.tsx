// SP2.01 Diagram Drawer Component (Simplified MVP)

import React from "react";
import { SP201Quest } from "@/types/sp2-01-types";

interface DiagramDrawerProps {
  quest: SP201Quest;
  onDiagramChange?: (diagram: any) => void;
}

export default function DiagramDrawer({ quest, onDiagramChange }: DiagramDrawerProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/20 rounded-xl border border-white/10 p-6">
      <div className="text-center w-full">
        <div className="text-cyan-400 text-xl mb-4">📐 Circuit Diagram Drawer</div>
        <div className="text-white/70 text-sm mb-6">
          Draw circuit diagrams using IEC standard symbols
        </div>
        
        {/* Symbol Palette */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⏚</div>
            <div className="text-xs text-white/70">Battery</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⊗</div>
            <div className="text-xs text-white/70">Bulb</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⏻</div>
            <div className="text-xs text-white/70">Switch</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">━</div>
            <div className="text-xs text-white/70">Wire</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">▭</div>
            <div className="text-xs text-white/70">Resistor</div>
          </div>
        </div>
        
        {/* Grid Canvas */}
        <div className="w-full h-96 bg-black/40 rounded-lg border border-white/10 relative overflow-hidden">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Drawing area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/50 text-sm">
              Click to place symbols on the grid
            </div>
          </div>
        </div>
        
        {/* Tools */}
        <div className="mt-4 flex gap-4 justify-center">
          <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors">
            ✏️ Draw
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 hover:bg-white/20 transition-colors">
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  );
}
