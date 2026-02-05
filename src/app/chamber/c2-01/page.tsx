"use client";

import { useEffect, useMemo, useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import dynamic from "next/dynamic";

const C201_TitrationCanvas = dynamic(() => import("@/components/chamber/c2-01/TitrationCanvas"), { ssr: false });

type Stage = "MONITOR" | "BUFFER" | "ALERT";
type C201T = typeof translations.EN.c2_01;

interface C201Quest extends Quest {
  stage: Stage;
  minPH: number;
  maxPH: number;
  equivalenceVolume: number;
  buffer: number;
  targetVolume: number;
}

const questData = {
  MONITOR: [
    { id: "M1", minPH: 6.4, maxPH: 8.4, equivalenceVolume: 28, buffer: 0.55, targetVolume: 16 },
    { id: "M2", minPH: 6.1, maxPH: 8.6, equivalenceVolume: 32, buffer: 0.5, targetVolume: 22 },
  ],
  BUFFER: [
    { id: "B1", minPH: 6.6, maxPH: 8.2, equivalenceVolume: 30, buffer: 0.8, targetVolume: 20 },
    { id: "B2", minPH: 6.8, maxPH: 8.0, equivalenceVolume: 26, buffer: 0.9, targetVolume: 18 },
  ],
  ALERT: [
    { id: "A1", minPH: 5.8, maxPH: 9.1, equivalenceVolume: 24, buffer: 0.35, targetVolume: 23 },
    { id: "A2", minPH: 5.6, maxPH: 9.2, equivalenceVolume: 30, buffer: 0.3, targetVolume: 28 },
  ],
};

function phAtVolume(quest: C201Quest, volume: number) {
  const span = quest.maxPH - quest.minPH;
  const slope = 0.18 + (1 - quest.buffer) * 0.45;
  const exponent = Math.pow(10, (quest.equivalenceVolume - volume) * slope / 10);
  return quest.minPH + span / (1 + exponent);
}

function buildCurve(quest: C201Quest, maxVolume: number) {
  const points = [];
  for (let v = 0; v <= maxVolume; v += 1) {
    points.push({ v, ph: phAtVolume(quest, v) });
  }
  return points;
}

function buildStagePool(t: C201T, difficulty: Difficulty, stage: Stage): C201Quest[] {
  const data = questData[stage];
  const all = data.map((item) => {
    const quest: C201Quest = {
      id: item.id,
      difficulty,
      stage,
      minPH: item.minPH,
      maxPH: item.maxPH,
      equivalenceVolume: item.equivalenceVolume,
      buffer: item.buffer,
      targetVolume: item.targetVolume,
      promptLatex:
        stage === "MONITOR"
          ? t.stages.monitor_prompt_latex
          : stage === "BUFFER"
            ? t.stages.buffer_prompt_latex
            : t.stages.alert_prompt_latex,
      expressionLatex: `V_{base}=${item.targetVolume}\\,\\text{mL}`,
      targetLatex: "\\mathrm{pH}",
      slots: [{ id: "ph", labelLatex: "\\mathrm{pH}", placeholder: "pH", expected: 0 }],
      correctLatex: "",
    };
    const expected = Number(phAtVolume(quest, item.targetVolume).toFixed(2));
    quest.slots = [{ id: "ph", labelLatex: "\\mathrm{pH}", placeholder: "pH", expected }];
    quest.correctLatex = `\\mathrm{pH}=${expected.toFixed(2)}`;
    return quest;
  });
  if (difficulty === "BASIC") return all.slice(0, 1);
  if (difficulty === "CORE") return all.slice(0, 2);
  return all;
}

export default function C201Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const t = translations[currentLanguage].c2_01;

  const {
    difficulty,
    stage,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
  } = useQuestManager<C201Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s),
    initialStage: "MONITOR",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("c2-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const [probeVolumeByQuest, setProbeVolumeByQuest] = useState<Record<string, number>>({});

  const maxVolume = stage === "ALERT" ? 40 : 36;
  const curve = useMemo(() => (currentQuest ? buildCurve(currentQuest, maxVolume) : []), [currentQuest, maxVolume]);
  const probeVolume = currentQuest ? (probeVolumeByQuest[currentQuest.id] ?? currentQuest.targetVolume) : 18;
  const probePh = currentQuest ? phAtVolume(currentQuest, probeVolume) : 7;

  const chartPath = useMemo(() => {
    const width = 520;
    const height = 200;
    const padding = 24;
    const xScale = (v: number) => padding + (v / maxVolume) * (width - padding * 2);
    const yScale = (ph: number) => padding + (1 - ph / 14) * (height - padding * 2);
    return curve
      .map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.v).toFixed(2)} ${yScale(p.ph).toFixed(2)}`)
      .join(" ");
  }, [curve, maxVolume]);

  const targetX = currentQuest ? 24 + (currentQuest.targetVolume / maxVolume) * (520 - 48) : 24;
  const targetY = currentQuest
    ? 24 + (1 - phAtVolume(currentQuest, currentQuest.targetVolume) / 14) * (200 - 48)
    : 24;

  if (!currentQuest) return null;

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="C2.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "MONITOR", label: t.stages.monitor },
        { id: "BUFFER", label: t.stages.buffer },
        { id: "ALERT", label: t.stages.alert },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        ready: t.ready,
        monitor_title: t.monitor_title,
        difficulty: {
          basic: t.difficulty.basic,
          core: t.difficulty.core,
          advanced: t.difficulty.advanced,
          elite: t.difficulty.elite,
        },
      }}
      monitorContent={
        <C201_TitrationCanvas
          curve={curve}
          probeVolume={probeVolume}
          maxVolume={maxVolume}
          targetVolume={currentQuest.targetVolume}
          phValue={probePh}
          status={lastCheck}
        />
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.mission.title}</h3>
          <p className="text-base text-white/70 font-mono max-w-2xl mx-auto">{t.mission.description}</p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">{t.objective_title}</h3>
              <p className="text-2xl text-white font-black italic">
                <InlineMath math={currentQuest.promptLatex} />
              </p>
              <div className="text-sm text-white/50 font-mono mt-3">
                <InlineMath math={currentQuest.expressionLatex} />
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">{t.labels.volume}</div>
                <div className="text-2xl text-white font-black">{probeVolume.toFixed(0)} mL</div>
              </div>
              <input
                type="range"
                min={0}
                max={maxVolume}
                step={1}
                value={probeVolume}
                onChange={(e) =>
                  currentQuest &&
                  setProbeVolumeByQuest((prev) => ({
                    ...prev,
                    [currentQuest.id]: Number(e.target.value),
                  }))
                }
                className="w-full mt-4 accent-neon-cyan"
              />
              <div className="text-xs text-white/60 font-mono mt-2">
                {t.labels.ph}: {probePh.toFixed(2)}
              </div>
            </div>

            <div className="p-6 bg-black/60 border border-white/10 rounded-2xl">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black mb-4">{t.labels.input}</div>
              <div className="grid gap-4">
                {currentQuest.slots.map((slot) => (
                  <div key={slot.id} className="space-y-2">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-black">
                      <InlineMath math={slot.labelLatex} />
                    </div>
                    <input
                      value={inputs[slot.id] ?? ""}
                      onChange={(e) => setInputs((v) => ({ ...v, [slot.id]: e.target.value }))}
                      className="w-full bg-black border-2 border-white/20 p-4 text-center outline-none focus:border-neon-cyan text-white font-black text-2xl"
                      placeholder={slot.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">
              <span>{t.target_title}</span>
              <span>{t.labels.hints}</span>
            </div>
            <div className="relative w-full overflow-hidden">
              <svg viewBox="0 0 520 200" className="w-full h-auto">
                <path d={chartPath} fill="none" stroke="#7ad7ff" strokeWidth="2" />
                <circle cx={targetX} cy={targetY} r={6} fill="#39ff14" />
              </svg>
              <div className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.3em] text-white/40 font-black">
                pH Curve
              </div>
            </div>
            <div className="text-xs text-white/60 font-mono">
              {t.hints}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
