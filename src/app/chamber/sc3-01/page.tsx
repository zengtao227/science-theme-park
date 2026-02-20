"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MoleculeCanvas from "@/components/chamber/sc3-01/MoleculeCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "ASPIRIN" | "CAFFEINE" | "ADRENALINE";

interface SC301Quest extends Quest {
  stage: Stage;
  moleculeName: string;
  scenario?: string;
}

export default function SC301Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildStagePool = useCallback((difficulty: Difficulty, currentStage: Stage): SC301Quest[] => {
    const quests: SC301Quest[] = [];

    const configs = {
      ASPIRIN: { name: "Aspirin", formula: "C_9H_8O_4", scenario: "roche_aspirin", c: 9, h: 8, o: 4, n: 0 },
      CAFFEINE: { name: "Caffeine", formula: "C_8H_{10}N_4O_2", scenario: "novartis_molecular_engineering", c: 8, h: 10, o: 2, n: 4 },
      ADRENALINE: { name: "Adrenaline", formula: "C_9H_{13}NO_3", scenario: "basel_biozentrum_neuro", c: 9, h: 13, o: 3, n: 1 }
    };

    const config = configs[currentStage];

    // Generate 5 questions per difficulty level (20 total per stage)
    const questionSets = {
      BASIC: [
        {
          id: `${currentStage}-C1`, promptLatex: `\\\\text{Find Carbon count in ${config.name}.}`,
          expressionLatex: `C_?H_{${config.h}}${config.n > 0 ? `N_{${config.n}}` : ""}O_{${config.o}}`,
          slots: [{ id: "c", labelLatex: "\\\\text{Carbon}", placeholder: "?", expected: config.c.toString() }],
          hintLatex: ["\\\\text{Carbon is black.}"]
        },
        {
          id: `${currentStage}-H1`, promptLatex: `\\\\text{Find Hydrogen count in ${config.name}.}`,
          expressionLatex: `C_{${config.c}}H_?${config.n > 0 ? `N_{${config.n}}` : ""}O_{${config.o}}`,
          slots: [{ id: "h", labelLatex: "\\\\text{Hydrogen}", placeholder: "?", expected: config.h.toString() }],
          hintLatex: ["\\\\text{Hydrogen is white.}"]
        },
        {
          id: `${currentStage}-O1`, promptLatex: `\\\\text{Find Oxygen count in ${config.name}.}`,
          expressionLatex: `C_{${config.c}}H_{${config.h}}${config.n > 0 ? `N_{${config.n}}` : ""}O_?`,
          slots: [{ id: "o", labelLatex: "\\\\text{Oxygen}", placeholder: "?", expected: config.o.toString() }],
          hintLatex: ["\\\\text{Oxygen is red.}"]
        },
        ...(config.n > 0 ? [{
          id: `${currentStage}-N1`, promptLatex: `\\\\text{Find Nitrogen count in ${config.name}.}`,
          expressionLatex: `C_{${config.c}}H_{${config.h}}N_?O_{${config.o}}`,
          slots: [{ id: "n", labelLatex: "\\\\text{Nitrogen}", placeholder: "?", expected: config.n.toString() }],
          hintLatex: ["\\\\text{Nitrogen is blue.}"]
        }] : []),
        {
          id: `${currentStage}-TOTAL1`, promptLatex: `\\\\text{Total atom count in ${config.name}?}`,
          expressionLatex: `C_{${config.c}}H_{${config.h}}${config.n > 0 ? `N_{${config.n}}` : ""}O_{${config.o}}`,
          slots: [{ id: "total", labelLatex: "\\\\text{Total}", placeholder: "?", expected: (config.c + config.h + config.o + config.n).toString() }],
          hintLatex: ["\\\\text{Add all atoms.}"]
        },
      ],
      CORE: [
        {
          id: `${currentStage}-C2`, promptLatex: `\\\\text{Verify Carbon atoms in ${config.name}.}`,
          expressionLatex: `C_?H_{${config.h}}${config.n > 0 ? `N_{${config.n}}` : ""}O_{${config.o}}`,
          slots: [{ id: "c", labelLatex: "\\\\text{Carbon}", placeholder: "?", expected: config.c.toString() }],
          hintLatex: ["\\\\text{Count black spheres.}"]
        },
        {
          id: `${currentStage}-H2`, promptLatex: `\\\\text{Count Hydrogen in ${config.name}.}`,
          expressionLatex: `C_{${config.c}}H_?${config.n > 0 ? `N_{${config.n}}` : ""}O_{${config.o}}`,
          slots: [{ id: "h", labelLatex: "\\\\text{Hydrogen}", placeholder: "?", expected: config.h.toString() }],
          hintLatex: ["\\\\text{Smallest white atoms.}"]
        },
        {
          id: `${currentStage}-O2`, promptLatex: `\\\\text{Oxygen atoms in ${config.name}?}`,
          expressionLatex: `C_{${config.c}}H_{${config.h}}${config.n > 0 ? `N_{${config.n}}` : ""}O_?`,
          slots: [{ id: "o", labelLatex: "\\\\text{Oxygen}", placeholder: "?", expected: config.o.toString() }],
          hintLatex: ["\\\\text{Red spheres.}"]
        },
        {
          id: `${currentStage}-RATIO1`, promptLatex: `\\\\text{C:O ratio in ${config.name}?}`,
          expressionLatex: `C_{${config.c}}:O_{${config.o}}`,
          slots: [{ id: "ratio", labelLatex: "\\\\text{Ratio}", placeholder: "x:y", expected: `${config.c}:${config.o}` }],
          hintLatex: ["\\\\text{Simplify if possible.}"]
        },
        {
          id: `${currentStage}-MASS1`, promptLatex: `\\\\text{Approximate molar mass of ${config.name}?}`,
          expressionLatex: `C_{${config.c}}H_{${config.h}}${config.n > 0 ? `N_{${config.n}}` : ""}O_{${config.o}}`,
          slots: [{ id: "mass", labelLatex: "\\\\text{Mass (g/mol)}", placeholder: "?", expected: (config.c * 12 + config.h * 1 + config.o * 16 + config.n * 14).toString() }],
          hintLatex: ["\\\\text{C=12, H=1, O=16, N=14}"]
        },
      ],
      ADVANCED: [
        {
          id: `${currentStage}-FULL1`, promptLatex: `\\\\text{Complete formula for ${config.name}?}`,
          expressionLatex: `C_xH_y${config.n > 0 ? "N_z" : ""}O_w`,
          slots: [
            { id: "c", labelLatex: "x (C)", placeholder: "0", expected: config.c.toString() },
            { id: "h", labelLatex: "y (H)", placeholder: "0", expected: config.h.toString() },
            ...(config.n > 0 ? [{ id: "n", labelLatex: "z (N)", placeholder: "0", expected: config.n.toString() } as any] : []),
            { id: "o", labelLatex: "w (O)", placeholder: "0", expected: config.o.toString() }
          ],
          hintLatex: ["\\\\text{Count all atoms.}"]
        },
        {
          id: `${currentStage}-PERCENT1`, promptLatex: `\\\\text{Carbon percentage in ${config.name}?}`,
          expressionLatex: `\\\\frac{C_{${config.c}}}{\\\\text{Total}}\\times 100`,
          slots: [{ id: "percent", labelLatex: "\\\\text{Percent}", placeholder: "%", expected: ((config.c / (config.c + config.h + config.o + config.n)) * 100).toFixed(1) }],
          hintLatex: ["\\\\text{Carbon / Total atoms}"]
        },
        {
          id: `${currentStage}-BONDS1`, promptLatex: `\\\\text{Estimate bond count in ${config.name}?}`,
          expressionLatex: `\\\\text{Approximate}`,
          slots: [{ id: "bonds", labelLatex: "\\\\text{Bonds}", placeholder: "?", expected: (config.c + config.h + config.o + config.n - 1).toString() }],
          hintLatex: ["\\\\text{Roughly atoms - 1}"]
        },
        {
          id: `${currentStage}-EMPIRICAL1`, promptLatex: `\\\\text{Simplest ratio for ${config.name}?}`,
          expressionLatex: `C_{${config.c}}H_{${config.h}}${config.n > 0 ? `N_{${config.n}}` : ""}O_{${config.o}}`,
          slots: [{ id: "empirical", labelLatex: "\\\\text{Formula}", placeholder: "CxHyOz", expected: config.formula.replace(/_/g, "").replace(/\{|\}/g, "") }],
          hintLatex: ["\\\\text{Already simplified}"]
        },
        {
          id: `${currentStage}-MASS2`, promptLatex: `\\\\text{Precise molar mass of ${config.name}?}`,
          expressionLatex: `C_{${config.c}}H_{${config.h}}${config.n > 0 ? `N_{${config.n}}` : ""}O_{${config.o}}`,
          slots: [{ id: "mass", labelLatex: "\\\\text{Mass (g/mol)}", placeholder: "?", expected: (config.c * 12.01 + config.h * 1.008 + config.o * 16.00 + config.n * 14.01).toFixed(2) }],
          hintLatex: ["\\\\text{Use precise atomic masses}"]
        },
      ],
      ELITE: [
        {
          id: `${currentStage}-FULL2`, promptLatex: `\\\\text{Identify ${config.name} formula precisely.}`,
          expressionLatex: `C_xH_y${config.n > 0 ? "N_z" : ""}O_w`,
          slots: [
            { id: "c", labelLatex: "x", placeholder: "0", expected: config.c.toString() },
            { id: "h", labelLatex: "y", placeholder: "0", expected: config.h.toString() },
            ...(config.n > 0 ? [{ id: "n", labelLatex: "z", placeholder: "0", expected: config.n.toString() } as any] : []),
            { id: "o", labelLatex: "w", placeholder: "0", expected: config.o.toString() }
          ],
          hintLatex: ["\\\\text{Exact count required}"]
        },
        {
          id: `${currentStage}-COMPOSITION1`, promptLatex: `\\\\text{Mass percent of C in ${config.name}?}`,
          expressionLatex: `\\\\frac{m_C}{M_{total}}\\times 100`,
          slots: [{ id: "percent", labelLatex: "\\\\text{Percent}", placeholder: "%", expected: ((config.c * 12.01) / (config.c * 12.01 + config.h * 1.008 + config.o * 16.00 + config.n * 14.01) * 100).toFixed(2) }],
          hintLatex: ["\\\\text{Mass of C / Total mass}"]
        },
        {
          id: `${currentStage}-FUNCTIONAL1`, promptLatex: `\\\\text{Functional groups in ${config.name}?}`,
          expressionLatex: `\\\\text{Identify}`,
          slots: [{ id: "groups", labelLatex: "\\\\text{Groups}", placeholder: "name", expected: currentStage === "ASPIRIN" ? "ester,carboxyl" : currentStage === "CAFFEINE" ? "amide,amine" : "amine,hydroxyl" }],
          hintLatex: ["\\\\text{Look for O, N patterns}"]
        },
        {
          id: `${currentStage}-STRUCTURE1`, promptLatex: `\\\\text{Ring structures in ${config.name}?}`,
          expressionLatex: `\\\\text{Count}`,
          slots: [{ id: "rings", labelLatex: "\\\\text{Rings}", placeholder: "?", expected: currentStage === "ASPIRIN" ? "1" : currentStage === "CAFFEINE" ? "2" : "1" }],
          hintLatex: ["\\\\text{Closed carbon chains}"]
        },
        {
          id: `${currentStage}-SATURATION1`, promptLatex: `\\\\text{Degree of unsaturation in ${config.name}?}`,
          expressionLatex: `\\\\frac{2C + 2 + N - H}{2}`,
          slots: [{ id: "unsat", labelLatex: "\\\\text{Degree}", placeholder: "?", expected: Math.floor((2 * config.c + 2 + config.n - config.h) / 2).toString() }],
          hintLatex: ["\\\\text{Use formula}"]
        },
      ]
    };

    // Select 5 questions based on difficulty
    const selectedQuestions = questionSets[difficulty].slice(0, 5);

    selectedQuestions.forEach((q) => {
      quests.push({
        ...q,
        difficulty,
        stage: currentStage,
        moleculeName: config.name,
        scenario: config.scenario,
        targetLatex: config.formula,
        correctLatex: config.formula,
      });
    });

    return quests;
  }, []);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

  const {
    currentQuest,
    difficulty,
    stage,
    lastCheck,
    inputs,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    getHint,
    currentStageStats,
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SC301Quest, Stage>({
    moduleCode: "sc3-01",
    buildPool,
    initialStage: "ASPIRIN",
  });

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("SC3.01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "ASPIRIN" as Stage, label: t("sc3_01.stages.aspirin") },
    { id: "CAFFEINE" as Stage, label: t("sc3_01.stages.caffeine") },
    { id: "ADRENALINE" as Stage, label: t("sc3_01.stages.adrenaline") },
  ], [t]);

  const hint = getHint();

  const activeScenario = useMemo(() => {
    if (!currentQuest?.scenario) return null;
    const scenario = t(`sc3_01.scenarios.${currentQuest?.scenario}`, { defaultValue: "" });
    return scenario || null;
  }, [currentQuest, t]);

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      moduleCode="SC3.01"
      title={t("sc3_01.title")}
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sc3_01.footer_left")}
      translations={{
        back: t("sc3_01.back"),
        check: t("sc3_01.check"),
        next: t("sc3_01.next"),
        correct: t("sc3_01.correct"),
        incorrect: t("sc3_01.incorrect"),
        difficulty: {
          BASIC: t("sc3_01.difficulty.BASIC"),
          CORE: t("sc3_01.difficulty.CORE"),
          ADVANCED: t("sc3_01.difficulty.ADVANCED"),
          ELITE: t("sc3_01.difficulty.ELITE"),
        },
      }}
      monitorContent={
        <div className="flex flex-col h-full gap-4">
          <div className="flex-1 min-h-[400px]">
            <MoleculeCanvas target={stage} />
          </div>
          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
              <span>{t("sc3_01.labels.snap", { defaultValue: "MASTERY" })}</span>
              <span>{currentStageStats?.correct || 0} PTS</span>
            </div>
            <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                    ? "bg-neon-cyan shadow-[0_0_5px_#00e5ff]"
                    : "bg-transparent"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10 max-w-4xl mx-auto w-full">
        {currentQuest && (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                {t("sc3_01.objective_title")}
              </h3>
              <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
              </div>
            </div>

            <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
              <div className="space-y-8">
                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                  <span className="w-8 h-px bg-neon-cyan/30" />
                  {t("sc3_01.labels.input")}
                </div>

                <div className="grid grid-cols-1 gap-8 justify-items-center">
                  {currentQuest?.slots.map((slot: any) => (
                    <div key={slot.id} className="w-full max-w-md space-y-3">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                        <InlineMath>{slot.labelLatex}</InlineMath>
                        <span className="text-neon-cyan/30 font-mono">MOL_BUILD_0x{slot.id.toUpperCase()}</span>
                      </div>
                      <div className="relative group">
                        <input
                          className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
                          placeholder={slot.placeholder}
                          value={inputs[slot.id] || ""}
                          onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') verify();
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/20 transition-all blur-sm" />
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {lastCheck && (
                    <motion.div
                      key={lastCheck.ok ? "correct" : "incorrect"}
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${lastCheck.ok
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                          }`}>
                          {lastCheck.ok ? "✓" : "✗"}
                        </div>
                        <div>
                          <div className="font-black text-lg tracking-widest uppercase italic">
                            {lastCheck.ok ? t("sc3_01.correct") : t("sc3_01.incorrect")}
                          </div>
                        </div>
                      </div>

                      {!lastCheck.ok && hint && (
                        <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Hint:</span>
                          <div className="text-white font-bold">
                            <InlineMath>{hint}</InlineMath>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0, 229, 255, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={lastCheck?.ok ? next : verify}
                  className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-xl ${lastCheck?.ok
                    ? "bg-neon-cyan text-black"
                    : "bg-white/10 text-white hover:bg-white/20 border-2 border-white/5"
                    }`}
                >
                  {lastCheck?.ok ? t("sc3_01.next") : t("sc3_01.check")}
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {activeScenario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neon-cyan/[0.02] border border-neon-cyan/10 rounded-3xl p-8 backdrop-blur-sm shadow-[0_0_50px_rgba(0,229,255,0.02)]"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-neon-cyan/20 rounded-lg text-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
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
