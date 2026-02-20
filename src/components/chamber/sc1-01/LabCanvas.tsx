import { useState } from "react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n";

export type Substance = "soda" | "salt" | "starch";
export type Tool = "water" | "vinegar" | "fire" | "iodine";

export interface Reaction {
  substance: Substance;
  tool: Tool;
  result: string;
  visual: "bubbles" | "dissolve" | "melt" | "color" | "none";
}

const reactions: Reaction[] = [
  // Baking Soda reactions
  { substance: "soda", tool: "water", result: "Dissolves slightly", visual: "dissolve" },
  { substance: "soda", tool: "vinegar", result: "Fizzes! CO_2 bubbles!", visual: "bubbles" },
  { substance: "soda", tool: "fire", result: "No visible change", visual: "none" },
  { substance: "soda", tool: "iodine", result: "No color change", visual: "none" },

  // Salt reactions
  { substance: "salt", tool: "water", result: "Dissolves completely", visual: "dissolve" },
  { substance: "salt", tool: "vinegar", result: "Dissolves, no fizz", visual: "dissolve" },
  { substance: "salt", tool: "fire", result: "Melts at high temp", visual: "melt" },
  { substance: "salt", tool: "iodine", result: "No color change", visual: "none" },

  // Starch reactions
  { substance: "starch", tool: "water", result: "Forms cloudy mixture", visual: "dissolve" },
  { substance: "starch", tool: "vinegar", result: "No reaction", visual: "none" },
  { substance: "starch", tool: "fire", result: "Burns/chars", visual: "melt" },
  { substance: "starch", tool: "iodine", result: "Turns BLUE-BLACK!", visual: "color" },
];

interface C101LabCanvasProps {
  onTest: (substance: Substance, tool: Tool) => void;
  testedReactions: Array<{ substance: Substance; tool: Tool }>;
  showAnswer: boolean;
}

export default function C101LabCanvas({
  onTest,
  testedReactions,
  showAnswer,
}: C101LabCanvasProps) {
  const { t } = useLanguage();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [animating, setAnimating] = useState<{ substance: Substance; visual: string } | null>(null);

  const handleSubstanceClick = (substance: Substance) => {
    if (!selectedTool) return;

    onTest(substance, selectedTool);

    // Find reaction
    const reaction = reactions.find(r => r.substance === substance && r.tool === selectedTool);
    if (reaction && reaction.visual !== "none") {
      setAnimating({ substance, visual: reaction.visual });
      setTimeout(() => setAnimating(null), 2000);
    }

    setSelectedTool(null);
  };

  const getReactionResult = (substance: Substance, tool: Tool) => {
    const tested = testedReactions.find(t => t.substance === substance && t.tool === tool);
    if (!tested) return null;

    return t(`sc1_01.lab_ui.results.${substance}_${tool}`) || t('sc1_01.lab_ui.results.no_reaction');
  };

  const tools: Array<{ id: Tool; label: string; icon: string; color: string }> = [
    { id: "water", label: t('sc1_01.lab_ui.tools.water'), icon: "💧", color: "neon-cyan" },
    { id: "vinegar", label: t('sc1_01.lab_ui.tools.vinegar'), icon: "🧪", color: "neon-green" },
    { id: "fire", label: t('sc1_01.lab_ui.tools.fire'), icon: "🔥", color: "orange-500" },
    { id: "iodine", label: t('sc1_01.lab_ui.tools.iodine'), icon: "🟤", color: "yellow-600" },
  ];

  const substances: Array<{ id: Substance; label: string; realName: string }> = [
    { id: "soda", label: t('sc1_01.lab_ui.substances.powder_a'), realName: t('sc1_01.lab_ui.substances.soda') },
    { id: "salt", label: t('sc1_01.lab_ui.substances.powder_b'), realName: t('sc1_01.lab_ui.substances.salt') },
    { id: "starch", label: t('sc1_01.lab_ui.substances.powder_c'), realName: t('sc1_01.lab_ui.substances.starch') },
  ];

  return (
    <div className="space-y-6">
      {/* Lab Bench */}
      <div className="relative p-8 bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl">
        <div className="absolute top-2 right-2 text-[9px] font-mono text-white/70 uppercase tracking-wider">
          {t('sc1_01.lab_ui.mystery_lab')}
        </div>

        {/* Substances */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {substances.map((sub) => {
            const isAnimating = animating?.substance === sub.id;
            const hasTests = testedReactions.some(t => t.substance === sub.id);

            return (
              <button
                key={sub.id}
                onClick={() => handleSubstanceClick(sub.id)}
                disabled={!selectedTool}
                className={clsx(
                  "relative p-6 border-2 rounded-xl transition-all",
                  selectedTool
                    ? "border-neon-green hover:bg-neon-green/10 cursor-pointer"
                    : "border-white/60 cursor-not-allowed",
                  isAnimating && "animate-pulse"
                )}
              >
                {/* Powder pile */}
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full" />
                  </div>

                  {/* Animation effects */}
                  {isAnimating && animating.visual === "bubbles" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-neon-green rounded-full animate-ping"
                          style={{
                            left: `${50 + Math.cos(i * Math.PI / 4) * 30}%`,
                            top: `${50 + Math.sin(i * Math.PI / 4) * 30}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {isAnimating && animating.visual === "color" && (
                    <div className="absolute inset-0 bg-blue-900 rounded-full animate-pulse" />
                  )}
                </div>

                <div className="text-center">
                  <div className="text-sm font-black text-white mb-1">{sub.label}</div>
                  {showAnswer && (
                    <div className="text-xs text-neon-green font-mono">{sub.realName}</div>
                  )}
                  {hasTests && (
                    <div className="mt-2 text-[10px] text-white/90">
                      {testedReactions.filter(t => t.substance === sub.id).length} {t('sc1_01.lab_ui.tests_count')}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tool Selection */}
        <div className="border-t border-white/10 pt-6">
          <div className="text-xs text-white/60 uppercase tracking-wider mb-4 text-center">
            {t('sc1_01.lab_ui.select_tool')}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={clsx(
                  "p-4 border-2 rounded-xl transition-all",
                  selectedTool === tool.id
                    ? `border-${tool.color} bg-${tool.color}/10`
                    : "border-white/60 hover:border-white/40"
                )}
              >
                <div className="text-4xl mb-2">{tool.icon}</div>
                <div className="text-xs font-black text-white">{tool.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Test Results Log */}
      <div className="p-6 bg-black/50 border border-white/10 rounded-xl">
        <div className="text-xs text-white/60 uppercase tracking-wider mb-4">{t('sc1_01.lab_ui.lab_notes')}</div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {testedReactions.length === 0 ? (
            <div className="text-sm text-white/90 italic">{t('sc1_01.lab_ui.no_tests')}</div>
          ) : (
            testedReactions.map((test, i) => {
              const sub = substances.find(s => s.id === test.substance);
              const tool = tools.find(t => t.id === test.tool);
              const result = getReactionResult(test.substance, test.tool);

              return (
                <div key={i} className="text-sm font-mono text-white/80 flex items-start gap-2">
                  <span className="text-neon-green">{i + 1}.</span>
                  <span>{sub?.label} + {tool?.label}: {result}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
        <div className="text-xs text-neon-cyan/80 font-mono">
          <strong>{t('sc1_01.lab_ui.protocol')}</strong> {t('sc1_01.lab_ui.instruction')}
        </div>
      </div>
    </div>
  );
}
