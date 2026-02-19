import { ReactNode } from "react";
import { motion } from "framer-motion";

export interface ExperimentDesignProps {
    scenarioTitle: string;
    scenarioContext: string;
    purpose: string;
    materials: string[];
    procedure: string[];
    expectedResults: string;
    safetyWarning: string;
}

export default function ExperimentDesignCard({
    scenarioTitle,
    scenarioContext,
    purpose,
    materials,
    procedure,
    expectedResults,
    safetyWarning
}: ExperimentDesignProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/40 border border-neon-cyan/20 rounded-2xl p-6 text-left space-y-6 w-full max-w-4xl mx-auto shadow-2xl backdrop-blur-md"
        >
            {/* Header / Scenario */}
            <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                <div className="p-3 bg-neon-cyan/10 rounded-xl text-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                <div className="space-y-1">
                    <div className="text-xs uppercase tracking-[0.2em] text-neon-cyan font-black">{scenarioTitle}</div>
                    <p className="text-sm text-white/70 leading-relaxed italic">{scenarioContext}</p>
                </div>
            </div>

            {/* Grid for Properties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Purpose & Materials */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-black">Purpose // 实验目的</h4>
                        <p className="text-sm text-white/90 font-mono bg-black/30 p-3 rounded-lg border border-white/5">
                            {purpose}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-black">Materials // 实验材料</h4>
                        <ul className="text-sm text-white/80 space-y-2 bg-black/30 p-4 rounded-lg border border-white/5">
                            {materials.map((m, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-neon-cyan mt-0.5">▹</span>
                                    <span>{m}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Procedure & Expected Results */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-black">Procedure // 实验步骤</h4>
                        <ol className="text-sm text-white/80 space-y-3 bg-black/30 p-4 rounded-lg border border-white/5 list-decimal list-inside">
                            {procedure.map((step, i) => (
                                <li key={i} className="text-white/80">
                                    <span className="font-mono text-white/90">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-black">Expected Results // 预期结果</h4>
                        <div className="text-sm text-neon-green/90 font-mono bg-neon-green/5 p-4 rounded-lg border border-neon-green/10">
                            {expectedResults}
                        </div>
                    </div>
                </div>
            </div>

            {/* Safety Warning */}
            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-4">
                <div className="text-red-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-red-400 font-black mb-1">Safety First // 安全警告</h4>
                    <p className="text-xs text-red-200/80">{safetyWarning}</p>
                </div>
            </div>
        </motion.div>
    );
}
