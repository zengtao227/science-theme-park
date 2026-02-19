"use client";

import { GM103Quest, Stage } from "@/lib/gm1-03-types";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface LimitsContinuityVisualizationProps {
  quest: GM103Quest | null;
  stage: Stage;
  translations: {
    title: string;
    approaching: string;
    limit_exists: string;
    limit_dne: string;
    continuous_at: string;
    discontinuous_at: string;
    removable: string;
    jump: string;
    infinite: string;
  };
}

export default function LimitsContinuityVisualization({
  quest,
  stage,
  translations,
}: LimitsContinuityVisualizationProps) {
  if (!quest) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60">
        <div className="text-center">
          <div className="text-sm uppercase tracking-wider">Loading...</div>
        </div>
      </div>
    );
  }

  const formatValue = (val: number | string | undefined) => {
    if (val === undefined) return "?";
    if (typeof val === "string") return val;
    if (val === Infinity) return "∞";
    if (val === -Infinity) return "-∞";
    return val.toFixed(2);
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4 p-4">
      {/* Title */}
      <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
        {translations.title}
      </div>

      {/* Visualization Area */}
      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-center items-center space-y-6">
        {/* Function Expression */}
        <div className="text-center space-y-2">
          <div className="text-xs uppercase tracking-wider text-white/60">Function</div>
          <div className="text-white text-lg font-mono">
            <InlineMath math={quest.expressionLatex} />
          </div>
        </div>

        {/* Limit Point */}
        <div className="text-center space-y-2">
          <div className="text-xs uppercase tracking-wider text-white/60">
            {translations.approaching.replace("{point}", quest.limitPoint.toString())}
          </div>
          <div className="text-white text-2xl font-black">
            x → {quest.limitPoint === Infinity ? "∞" : quest.limitPoint}
          </div>
        </div>

        {/* Stage-Specific Information */}
        {stage === "LIMIT_BASICS" && (
          <div className="text-center space-y-2">
            <div className="text-xs uppercase tracking-wider text-white/60">Limit Value</div>
            <div className="text-cyan-400 text-3xl font-black">
              {formatValue(quest.limitValue)}
            </div>
            {quest.leftLimit !== undefined && quest.rightLimit !== undefined && (
              <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <div className="text-xs text-white/60">Left Limit</div>
                  <div className="text-yellow-400 text-xl font-black">
                    {formatValue(quest.leftLimit)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/60">Right Limit</div>
                  <div className="text-green-400 text-xl font-black">
                    {formatValue(quest.rightLimit)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {stage === "LIMIT_OPERATIONS" && (
          <div className="text-center space-y-2">
            <div className="text-xs uppercase tracking-wider text-white/60">Result</div>
            <div className="text-cyan-400 text-3xl font-black">
              {formatValue(quest.limitValue)}
            </div>
          </div>
        )}

        {stage === "CONTINUITY" && (
          <div className="text-center space-y-4">
            <div className="text-xs uppercase tracking-wider text-white/60">Continuity Status</div>
            <div
              className={`text-3xl font-black ${
                quest.isContinuous ? "text-green-400" : "text-red-400"
              }`}
            >
              {quest.isContinuous ? "CONTINUOUS" : "DISCONTINUOUS"}
            </div>
            {!quest.isContinuous && quest.discontinuityType && (
              <div className="mt-4">
                <div className="text-xs text-white/60">Type</div>
                <div className="text-yellow-400 text-xl font-black uppercase">
                  {quest.discontinuityType === "removable" && translations.removable}
                  {quest.discontinuityType === "jump" && translations.jump}
                  {quest.discontinuityType === "infinite" && translations.infinite}
                </div>
              </div>
            )}
            {quest.leftLimit !== undefined && quest.rightLimit !== undefined && (
              <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <div className="text-xs text-white/60">Left Limit</div>
                  <div className="text-yellow-400 text-xl font-black">
                    {formatValue(quest.leftLimit)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/60">Right Limit</div>
                  <div className="text-green-400 text-xl font-black">
                    {formatValue(quest.rightLimit)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Visual Indicator */}
        <div className="w-full max-w-md">
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-500"
              style={{ width: "75%" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span>x → {quest.limitPoint === Infinity ? "∞" : quest.limitPoint}</span>
            <span>Limit: {formatValue(quest.limitValue)}</span>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="text-[8px] uppercase tracking-[0.3em] text-white/40 text-center">
        {stage} // VISUALIZATION ACTIVE
      </div>
    </div>
  );
}
