"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ComplexPlaneCanvas from "@/components/chamber/gm4-01/ComplexPlaneCanvas";

type Stage = "BASICS" | "POWERS" | "EULER";

export default function G401Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].gm4_01 || translations.EN.gm4_01;

  const [stage, setStage] = useState<Stage>("BASICS");
  const [real, setReal] = useState(2);
  const [imaginary, setImaginary] = useState(1);
  const [power, setPower] = useState(1);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
    if (newStage === "BASICS") {
      setPower(1);
    } else if (newStage === "POWERS") {
      setPower(2);
    } else if (newStage === "EULER") {
      setReal(Math.cos(Math.PI / 4));
      setImaginary(Math.sin(Math.PI / 4));
      setPower(1);
    }
  };

  // Calculate z^n
  const r = Math.sqrt(real * real + imaginary * imaginary);
  const theta = Math.atan2(imaginary, real);
  const newR = Math.pow(r, power);
  const newTheta = theta * power;
  const resultReal = newR * Math.cos(newTheta);
  const resultImaginary = newR * Math.sin(newTheta);

  return (
    <ChamberLayout
      title={t?.title || "G4.01 // COMPLEX HORIZON"}
      moduleCode="GM4.01"
      difficulty="ADVANCED"
      onDifficultyChange={() => {}}
      stages={[
        { id: "BASICS", label: t?.stages?.basics || "BASICS" },
        { id: "POWERS", label: t?.stages?.powers || "POWERS" },
        { id: "EULER", label: t?.stages?.euler || "EULER" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "G4.01_COMPLEX_HORIZON // NODE: ZURICH"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "G4.01_COMPLEX_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <ComplexPlaneCanvas real={real} imaginary={imaginary} power={power} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "COMPLEX NUMBER"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.original || "ORIGINAL (z)"}
            </div>
            <div className="text-2xl text-white font-black text-center">
              <InlineMath math={`z = ${real.toFixed(2)} + ${imaginary.toFixed(2)}i`} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.magnitude || "Magnitude"}:</span>
                <span className="text-neon-cyan font-black">{r.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.angle || "Angle"}:</span>
                <span className="text-neon-green font-black">{(theta * 180 / Math.PI).toFixed(1)}°</span>
              </div>
            </div>
          </div>

          {power > 1 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
                {t?.labels?.result || "RESULT (z^n)"}
              </div>
              <div className="text-2xl text-white font-black text-center">
                <InlineMath math={`z^{${power}} = ${resultReal.toFixed(2)} + ${resultImaginary.toFixed(2)}i`} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-white/60 font-mono">{t?.labels?.magnitude || "Magnitude"}:</span>
                  <span className="text-neon-purple font-black">{newR.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 font-mono">{t?.labels?.angle || "Angle"}:</span>
                  <span className="text-neon-amber font-black">{(newTheta * 180 / Math.PI).toFixed(1)}°</span>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="z = a + bi = r e^{i\theta}" /></div>
              <div><InlineMath math="r = \sqrt{a^2 + b^2}" /></div>
              <div><InlineMath math="\theta = \arctan(b/a)" /></div>
              {power > 1 && <div><InlineMath math={`z^n = r^n e^{in\\theta}`} /></div>}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: COMPLEX SPACE"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Explore the complex plane in 3D. Master Euler's formula and complex powers."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "BASICS" && (t?.stages?.basics_desc || "Understand complex numbers as 2D vectors")}
            {stage === "POWERS" && (t?.stages?.powers_desc || "Visualize z^n as rotation and scaling")}
            {stage === "EULER" && (t?.stages?.euler_desc || "Master Euler's formula: e^(iθ) = cos(θ) + i·sin(θ)")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.real_part || "REAL PART (a)"}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-mono">a =</span>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={real}
                onChange={(e) => setReal(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xl font-black text-white min-w-[60px]">
                {real.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
              {t?.labels?.imaginary_part || "IMAGINARY PART (b)"}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-mono">b =</span>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={imaginary}
                onChange={(e) => setImaginary(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xl font-black text-white min-w-[60px]">
                {imaginary.toFixed(1)}
              </span>
            </div>
          </div>

          {stage !== "BASICS" && (
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                {t?.labels?.power || "POWER (n)"}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/60 font-mono">n =</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={power}
                  onChange={(e) => setPower(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xl font-black text-white min-w-[60px]">
                  {power}
                </span>
              </div>
            </div>
          )}

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "BASICS" && (t?.stages?.basics_hint || "Complex numbers as 2D vectors in the plane")}
              {stage === "POWERS" && (t?.stages?.powers_hint || "z^n rotates by n·θ and scales by r^n")}
              {stage === "EULER" && (t?.stages?.euler_hint || "e^(iθ) traces the unit circle")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
