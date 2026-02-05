"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GaltonCanvas from "@/components/chamber/g3-01/GaltonCanvas";

type Stage = "UNIFORM" | "BIASED" | "EXTREME";

export default function G301Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].g3_01 || translations.EN.g3_01;

  const [stage, setStage] = useState<Stage>("UNIFORM");
  const [probability, setProbability] = useState(0.5);
  const [ballCount, setBallCount] = useState(500);
  const [distribution, setDistribution] = useState<number[]>([]);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
    if (newStage === "UNIFORM") {
      setProbability(0.5);
    } else if (newStage === "BIASED") {
      setProbability(0.7);
    } else if (newStage === "EXTREME") {
      setProbability(0.9);
    }
  };

  return (
    <ChamberLayout
      title={t?.title || "G3.01 // PROBABILITY VAULT"}
      moduleCode="G3.01"
      difficulty="CORE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "UNIFORM", label: t?.stages?.uniform || "UNIFORM" },
        { id: "BIASED", label: t?.stages?.biased || "BIASED" },
        { id: "EXTREME", label: t?.stages?.extreme || "EXTREME" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "G3.01_PROBABILITY // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "G3.01_GALTON_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <GaltonCanvas
            probability={probability}
            ballCount={ballCount}
            onDistributionUpdate={setDistribution}
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "PROBABILITY DISTRIBUTION"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.hints || "THEORY"}
            </div>
            <div className="text-white font-black text-lg">
              <InlineMath math="B(n, p) \approx \mathcal{N}(\mu, \sigma^2)" />
            </div>
            <div className="text-white/70 text-sm font-mono space-y-1">
              <div><InlineMath math="\mu = np" /></div>
              <div><InlineMath math="\sigma^2 = np(1-p)" /></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description || "Observe how random processes converge to predictable distributions. The Galton Board demonstrates the Central Limit Theorem."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            <InlineMath math={`P(\\text{right}) = ${probability.toFixed(2)}`} />
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              Probability Control
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-mono">p =</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={probability}
                onChange={(e) => setProbability(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xl font-black text-white min-w-[60px]">
                {probability.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              Ball Count
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-mono">n =</span>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={ballCount}
                onChange={(e) => setBallCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-xl font-black text-white min-w-[60px]">
                {ballCount}
              </span>
            </div>
          </div>
          
          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "UNIFORM" && "Symmetric distribution (p = 0.5)"}
              {stage === "BIASED" && "Right-skewed distribution (p = 0.7)"}
              {stage === "EXTREME" && "Extreme bias (p = 0.9)"}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
