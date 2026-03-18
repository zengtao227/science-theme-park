// SP2.01 Diagram Drawer Component (Simplified MVP)

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { SP201Quest } from "@/types/sp2-01-types";

interface DiagramDrawerProps {
  quest: SP201Quest;
  onDiagramChange?: (diagram: any) => void;
}

export default function DiagramDrawer({ quest, onDiagramChange }: DiagramDrawerProps) {
  const { t } = useLanguage();
  void quest;
  void onDiagramChange;
  const diagramT = {
    title: t("sp2_01.visualization.diagram_drawer.title"),
    description: t("sp2_01.visualization.diagram_drawer.description"),
    battery: t("sp2_01.visualization.diagram_drawer.battery"),
    bulb: t("sp2_01.visualization.diagram_drawer.bulb"),
    switch: t("sp2_01.visualization.diagram_drawer.switch"),
    wire: t("sp2_01.visualization.diagram_drawer.wire"),
    resistor: t("sp2_01.visualization.diagram_drawer.resistor"),
    placeSymbols: t("sp2_01.visualization.diagram_drawer.place_symbols"),
    draw: t("sp2_01.visualization.diagram_drawer.draw"),
    clear: t("sp2_01.visualization.diagram_drawer.clear"),
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/20 rounded-xl border border-white/10 p-6">
      <div className="text-center w-full">
        <div className="text-cyan-400 text-xl mb-4">📐 {diagramT.title}</div>
        <div className="text-white/70 text-sm mb-6">
          {diagramT.description}
        </div>
        
        {/* Symbol Palette */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⏚</div>
            <div className="text-xs text-white/70">{diagramT.battery}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⊗</div>
            <div className="text-xs text-white/70">{diagramT.bulb}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⏻</div>
            <div className="text-xs text-white/70">{diagramT.switch}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">━</div>
            <div className="text-xs text-white/70">{diagramT.wire}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">▭</div>
            <div className="text-xs text-white/70">{diagramT.resistor}</div>
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
              {diagramT.placeSymbols}
            </div>
          </div>
        </div>
        
        {/* Tools */}
        <div className="mt-4 flex gap-4 justify-center">
          <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors">
            ✏️ {diagramT.draw}
          </button>
          <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 hover:bg-white/20 transition-colors">
            🗑️ {diagramT.clear}
          </button>
        </div>
      </div>
    </div>
  );
}
