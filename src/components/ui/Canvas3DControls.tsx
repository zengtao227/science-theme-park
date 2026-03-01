"use client";

import { useState } from 'react';
import { RotateCcw, Info } from 'lucide-react';

interface Canvas3DControlsProps {
  onReset: () => void;
  showInstructions?: boolean;
  instructionsText?: {
    rotate?: string;
    zoom?: string;
    reset?: string;
    help?: string;
    title?: string;
    hint?: string;
  };
}

export default function Canvas3DControls({
  onReset,
  showInstructions = true,
  instructionsText = {}
}: Canvas3DControlsProps) {
  const [showHelp, setShowHelp] = useState(false);

  const rotateLabel = instructionsText.rotate || "Rotate View";
  const zoomLabel = instructionsText.zoom || "Zoom";
  const resetLabel = instructionsText.reset || "Reset View";
  const helpLabel = instructionsText.help || "Instructions";
  const titleLabel = instructionsText.title || "3D Controls";
  const hintLabel = instructionsText.hint || "Observe from any angle.";

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-row gap-2 items-start">
      {/* Help Button */}
      {showInstructions && (
        <div className="relative">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 px-3 py-2 bg-black/80 border border-white/60 rounded text-white/60 hover:text-white hover:border-neon-green/50 transition-all text-xs font-mono backdrop-blur-sm"
          >
            <Info className="w-4 h-4" />
            <span>{helpLabel}</span>
          </button>

          {/* Help Panel */}
          {showHelp && (
            <div className="absolute top-12 right-0 bg-black/90 border border-white/60 rounded p-4 text-xs font-mono text-white/80 backdrop-blur-md w-64 shadow-2xl">
              <div className="font-bold text-neon-green mb-3 text-sm tracking-tight">{titleLabel}</div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-neon-cyan">🖱️</span>
                  <div>
                    <div className="font-bold text-white mb-0.5">{rotateLabel}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-purple">🔍</span>
                  <div>
                    <div className="font-bold text-white mb-0.5">{zoomLabel}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-amber">🔄</span>
                  <div>
                    <div className="font-bold text-white mb-0.5">{resetLabel}</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-white/60 text-[10px] leading-relaxed">
                {hintLabel}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-3 py-2 bg-black/80 border border-white/60 rounded text-white/80 hover:text-white hover:border-neon-cyan/50 transition-all text-xs font-mono backdrop-blur-sm"
        title={resetLabel}
      >
        <RotateCcw className="w-4 h-4" />
        <span>RESET</span>
      </button>
    </div>
  );
}
