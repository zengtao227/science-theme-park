"use client";

import { useState } from 'react';
import { clsx } from 'clsx';
import { RotateCcw, Info } from 'lucide-react';

interface Canvas3DControlsProps {
  onReset: () => void;
  showInstructions?: boolean; // 是否显示使用说明
  instructionsText?: {
    rotate?: string;
    zoom?: string;
    reset?: string;
  };
}

export default function Canvas3DControls({
  onReset,
  showInstructions = true,
  instructionsText = {
    rotate: "拖动鼠标旋转视角",
    zoom: "滚轮缩放",
    reset: "点击重置视角"
  }
}: Canvas3DControlsProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
      {/* Reset按钮 */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-3 py-2 bg-black/80 border border-white/20 rounded text-white/80 hover:text-white hover:border-neon-cyan/50 transition-all text-xs font-mono backdrop-blur-sm"
        title={instructionsText.reset}
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset</span>
      </button>

      {/* 使用说明按钮 */}
      {showInstructions && (
        <>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 px-3 py-2 bg-black/80 border border-white/20 rounded text-white/60 hover:text-white hover:border-neon-green/50 transition-all text-xs font-mono backdrop-blur-sm"
          >
            <Info className="w-4 h-4" />
            <span>使用说明</span>
          </button>

          {/* 使用说明面板 */}
          {showHelp && (
            <div className="bg-black/90 border border-white/20 rounded p-4 text-xs font-mono text-white/80 backdrop-blur-md max-w-xs">
              <div className="font-bold text-neon-green mb-3 text-sm">3D 控制说明</div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-neon-cyan">🖱️</span>
                  <div>
                    <div className="font-bold text-white">旋转视角</div>
                    <div className="text-white/60">{instructionsText.rotate}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-purple">🔍</span>
                  <div>
                    <div className="font-bold text-white">缩放</div>
                    <div className="text-white/60">{instructionsText.zoom}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-amber">🔄</span>
                  <div>
                    <div className="font-bold text-white">重置</div>
                    <div className="text-white/60">{instructionsText.reset}</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-white/50 text-[10px]">
                提示：拖动时可以从任意角度观察3D模型
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
