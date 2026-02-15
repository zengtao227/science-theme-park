"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";

type Stage = "IONIC" | "COVALENT" | "METALLIC";

export default function SC105Page() {
    const { currentLanguage } = useAppStore();
    const t = translations[currentLanguage]?.sc1_05 || translations.EN.sc1_05;

    const [stage, setStage] = useState<Stage>("IONIC");

    const stagesProps = useMemo(() => [
        { id: "IONIC", label: t.stages?.ionic || "IONIC" },
        { id: "COVALENT", label: t.stages?.covalent || "COVALENT" },
        { id: "METALLIC", label: t.stages?.metallic || "METALLIC" },
    ], [t]);

    const activeScenario = useMemo(() => {
        if (!t?.scenarios) return null;
        if (stage === "IONIC") return t.scenarios.ionic_salts;
        if (stage === "COVALENT") return t.scenarios.molecular_oxygen;
        return t.scenarios.pharmaceutical_chains;
    }, [stage, t]);

    return (
        <ChamberLayout
            moduleCode="SC1.05"
            title={t?.title || "SC1.05 // BONDING BRIDGE"}
            difficulty="CORE"
            onDifficultyChange={() => { }}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => setStage(s as Stage)}
            onVerify={() => { }}
            onNext={() => { }}
            checkStatus={null}
            footerLeft={t?.footer_left || "SC1.05_BOND_LAB // NODE: BASEL"}
            translations={t}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 flex items-center justify-center p-8">
                        <div className="text-center space-y-4">
                            <div className="text-4xl">
                                {stage === "IONIC" && "⚡"}
                                {stage === "COVALENT" && "🤝"}
                                {stage === "METALLIC" && "🌊"}
                            </div>
                            <div className="text-xl font-black text-white px-4 py-2 border border-white/10 rounded-lg">
                                {stage === "IONIC" && <InlineMath math="\text{Na}^+ + \text{Cl}^- \rightarrow \text{NaCl}" />}
                                {stage === "COVALENT" && <InlineMath math="\text{O} = \text{O}" />}
                                {stage === "METALLIC" && <InlineMath math="\text{Electron Sea}" />}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                            {t?.labels?.na_cl || "BOND TYPE"}
                        </div>
                        <div className="text-base text-neon-cyan font-black">
                            {stage} BONDING
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full text-center">
                <div className="space-y-4">
                    <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                        {t?.title || "BONDING BRIDGE"}
                    </h3>
                    <p className="text-xl text-white/70 font-mono italic">
                        {stage === "IONIC" && "Electrostatic attraction between oppositely charged ions."}
                        {stage === "COVALENT" && "Sharing of electron pairs between atoms."}
                        {stage === "METALLIC" && "Lattice of positive ions in a sea of delocalized electrons."}
                    </p>
                </div>

                {activeScenario && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-neon-cyan/[0.02] border border-neon-cyan/10 rounded-3xl p-8 backdrop-blur-sm"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-neon-cyan/20 rounded-lg text-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-2 text-left">
                                <div className="text-[10px] uppercase tracking-widest text-neon-cyan/60 font-black">Regional Case Study // Basel Node</div>
                                <p className="text-sm text-white/50 leading-relaxed italic">{activeScenario}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </ChamberLayout>
    );
}
