"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Flame, FlaskConical, TestTube } from "lucide-react";
import clsx from "clsx";

type SubstanceType = "soda" | "salt" | "starch";
type ToolType = "vinegar" | "iodine" | "flame" | "water";

interface C101LabCanvasProps {
    unknowns: { id: string; type: SubstanceType; label: string }[];
    onIdentify: (id: string, guess: SubstanceType) => void;
    identified: Record<string, boolean>; // true if correctly identified
}

export default function C101LabCanvas({ unknowns, onIdentify, identified }: C101LabCanvasProps) {
    const [activeReaction, setActiveReaction] = useState<{ id: string; effect: string } | null>(null);
    const [draggedTool, setDraggedTool] = useState<ToolType | null>(null);

    const handleDrop = (tool: ToolType, targetId: string, substanceType: SubstanceType) => {
        let effect = "";

        // Chemistry Logic
        if (tool === "vinegar" && substanceType === "soda") {
            effect = "bubbles";
        } else if (tool === "iodine" && substanceType === "starch") {
            effect = "blue";
        } else if (tool === "flame" && substanceType === "starch") {
            effect = "burn"; // Starch burns/browns
        } else if (tool === "water") {
            effect = "dissolve"; // All dissolve mostly, starch maybe cloudy
        } else {
            effect = "nothing";
        }

        setActiveReaction({ id: targetId, effect });

        // Clear animation after a while
        setTimeout(() => setActiveReaction(null), 2000);
    };

    return (
        <div className="w-full h-[400px] relative bg-neutral-900/50 rounded-xl overflow-hidden border border-white/10 select-none">
            {/* Table Surface */}
            <div className="absolute inset-0 bg-[url('/table-texture.png')] opacity-10 bg-repeat" />
            <div className="absolute bottom-0 w-full h-1/2 bg-white/5 skew-x-12 opacity-20 pointer-events-none" />

            {/* Tools Rack (Top) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 p-2 bg-black/60 backdrop-blur border border-white/20 rounded-full flex gap-4 z-20">
                <DraggableTool type="vinegar" icon={<FlaskConical className="text-yellow-400" />} label="Vinegar (Acid)" onDragStart={() => setDraggedTool("vinegar")} />
                <DraggableTool type="iodine" icon={<TestTube className="text-purple-500" />} label="Iodine" onDragStart={() => setDraggedTool("iodine")} />
                <DraggableTool type="flame" icon={<Flame className="text-orange-500" />} label="Heat" onDragStart={() => setDraggedTool("flame")} />
            </div>

            {/* Petri Dishes (Center) */}
            <div className="absolute bottom-12 left-0 w-full flex justify-center gap-16 px-8 items-end">
                {unknowns.map((u) => (
                    <DropZone
                        key={u.id}
                        id={u.id}
                        label={u.label}
                        isSolved={identified[u.id]}
                        reaction={activeReaction?.id === u.id ? activeReaction.effect : null}
                        onDrop={(tool) => handleDrop(tool, u.id, u.type)}
                    />
                ))}
            </div>

            {/* Instructions Overlay */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-white/40 max-w-[150px] text-right pointer-events-none">
                DRAG TOOLS TO POWDERS TO TEST PROPERTIES
            </div>
        </div>
    );
}

function DraggableTool({ type, icon, label, onDragStart }: { type: ToolType; icon: React.ReactNode; label: string; onDragStart: () => void }) {
    return (
        <div className="relative group cursor-grab active:cursor-grabbing">
            <motion.div
                drag
                dragSnapToOrigin
                whileDrag={{ scale: 1.2, zIndex: 100 }}
                dragMomentum={false}
                onDragStart={onDragStart}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/30 hover:border-white shadow-lg"
            >
                {icon}
            </motion.div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white/70">
                {label}
            </div>
        </div>
    );
}

function DropZone({
    id,
    label,
    isSolved,
    reaction,
    onDrop,
}: {
    id: string;
    label: string;
    isSolved: boolean;
    reaction: string | null;
    onDrop: (tool: ToolType) => void;
}) {
    return (
        <div className="relative flex flex-col items-center">
            {/* Detection Zone for Drag */}
            <motion.div
                className={clsx(
                    "w-32 h-32 rounded-full border-2 flex items-center justify-center relative transition-colors bg-white/5 backdrop-blur-sm",
                    isSolved ? "border-neon-green bg-neon-green/10" : "border-white/20"
                )}
                onMouseUp={() => {
                    // Ideally we use onDragEnd from the tool to detect drop, 
                    // or use a proper Dnd library. For simple framer motion, 
                    // we can check overlap or just rely on mouse capture if we architect it carefully.
                    // Simplified here: We will assume the Tool's onDragEnd calculates position.
                    // BUT, to keep it simple without complex coordinate math:
                    // We can just rely on the user dropping it *visually*.
                    // Actually, framer-motion drag doesn't easily support "drop targets" without custom logic.
                    // Let's use a simpler "Click Tool -> Click Target" or "Drag" with position checking.
                    // Re-architecting Draggable slightly for robustness in next iteration if needed.
                    // For now, let's just make the target droppable by checking pointer events in parent?
                    // No, let's keep it visually draggable and use a unified handler if possible.
                    // Hack: we will make the tools draggable and check collision in the parent?
                    // Too complex for one file.
                    // Alternative: Click to select tool, Click to apply.
                }}
            >
                {/* Powder pile */}
                <div className={clsx("w-20 h-20 rounded-full blur-md transition-all duration-500",
                    reaction === 'blue' ? "bg-blue-900" :
                        reaction === 'burn' ? "bg-amber-900" :
                            "bg-white/80"
                )} />

                {/* Reaction Effects */}
                <AnimatePresence>
                    {reaction === 'bubbles' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="text-4xl">🫧</div>
                        </motion.div>
                    )}
                    {reaction === 'nothing' && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-10 text-xs text-white/50 font-mono bg-black/80 px-2 py-1 rounded"
                        >
                            No Reaction
                        </motion.div>
                    )}
                </AnimatePresence>

                {isSolved && <div className="absolute inset-0 flex items-center justify-center text-neon-green text-3xl">✓</div>}
            </motion.div>

            <div className="mt-4 text-xs font-mono font-bold text-white/60 tracking-widest uppercase">{label}</div>

            {/* Invisible Overlay to catch drops (simplified interaction model) */}
            {/* In a real app we'd use useDraggable/useDroppable from dnd-kit. 
          Here we will implement a "Click Tool then Click Target" fallback if drag is hard to implement in one shot.
          OR, we use framer-motion's onDragEnd on the tool and check raw coordinates.
      */}
        </div>
    );
}

// To fix the drag-drop interaction for this demo:
// We will stick to "Drag" visually, but implement "Click to activate tool, Click dish to apply" as a robust backup?
// Or just make drag work by passing the tool's final position to a checker.
// Let's rely on `onDragEnd` in DraggableTool passing the event info up.
