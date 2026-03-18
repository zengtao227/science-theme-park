// SP2.01 Circuit Builder Component (Simplified MVP)

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { SP201Quest } from "@/types/sp2-01-types";

interface CircuitBuilderProps {
  quest: SP201Quest;
  onCircuitChange?: (circuit: any) => void;
}

export default function CircuitBuilder({ quest, onCircuitChange }: CircuitBuilderProps) {
  const { t } = useLanguage();
  void quest;
  void onCircuitChange;
  const builderT = {
    title: t("sp2_01.visualization.circuit_builder.title"),
    description: t("sp2_01.visualization.circuit_builder.description"),
    battery: t("sp2_01.visualization.circuit_builder.battery"),
    bulb: t("sp2_01.visualization.circuit_builder.bulb"),
    switch: t("sp2_01.visualization.circuit_builder.switch"),
    wire: t("sp2_01.visualization.circuit_builder.wire"),
    resistor: t("sp2_01.visualization.circuit_builder.resistor"),
    workspace: t("sp2_01.visualization.circuit_builder.workspace"),
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/20 rounded-xl border border-white/10 p-6">
      <div className="text-center">
        <div className="text-cyan-400 text-xl mb-4">🔌 {builderT.title}</div>
        <div className="text-white/70 text-sm mb-6">
          {builderT.description}
        </div>
        
        {/* Component Palette */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⏚</div>
            <div className="text-xs text-white/70">{builderT.battery}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">💡</div>
            <div className="text-xs text-white/70">{builderT.bulb}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⏻</div>
            <div className="text-xs text-white/70">{builderT.switch}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">—</div>
            <div className="text-xs text-white/70">{builderT.wire}</div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">⧉</div>
            <div className="text-xs text-white/70">{builderT.resistor}</div>
          </div>
        </div>
        
        {/* Circuit Workspace */}
        <div className="w-full h-64 bg-black/40 rounded-lg border border-white/10 flex items-center justify-center">
          <div className="text-white/50 text-sm">
            {builderT.workspace}
          </div>
        </div>
      </div>
    </div>
  );
}
