"use client";

import { useState, useCallback, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import Link from "next/link";
import dynamic from "next/dynamic";
import { InlineMath } from "react-katex";
import { calculateBindingEnergy, calculateBEperNucleon, isStable, getDecayMode } from "@/components/chamber/gp1-01/NuclearSim";

const NuclearSim = dynamic(() => import("@/components/chamber/gp1-01/NuclearSim"), {
    ssr: false,
});

export default function GP1_01_AtomicCore() {
    const { t } = useLanguage();
    const [protons, setProtons] = useState(26); // Iron-56
    const [neutrons, setNeutrons] = useState(30);
    const [showStabilityIsland, setShowStabilityIsland] = useState(true);
    const [quizStage, setQuizStage] = useState<"alpha" | "beta" | "gamma">("alpha");
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizInput, setQuizInput] = useState("");
    const [quizResult, setQuizResult] = useState<null | boolean>(null);
    
    const A = protons + neutrons;
    const bindingEnergy = calculateBindingEnergy(A, protons);
    const bePerNucleon = calculateBEperNucleon(A, protons);
    const stable = isStable(protons, neutrons);
    const decayMode = getDecayMode(protons, neutrons);
    
    // Simulate decay chain
    const buildDecayChain = useCallback(() => {
        const chain: Array<{Z: number, N: number, mode: string}> = [];
        let currentZ = protons;
        let currentN = neutrons;
        let iterations = 0;
        const maxIterations = 10;
        
        while (!isStable(currentZ, currentN) && iterations < maxIterations) {
            const mode = getDecayMode(currentZ, currentN);
            chain.push({ Z: currentZ, N: currentN, mode });
            
            if (mode === "alpha") {
                currentZ -= 2;
                currentN -= 2;
            } else if (mode === "beta-") {
                currentZ += 1;
                currentN -= 1;
            } else if (mode === "beta+") {
                currentZ -= 1;
                currentN += 1;
            } else {
                break;
            }
            
            iterations++;
        }
        
        if (isStable(currentZ, currentN)) {
            chain.push({ Z: currentZ, N: currentN, mode: "stable" });
        }
        
        return chain;
    }, [protons, neutrons]);

    const decayChain = useMemo(() => {
        if (stable) return [];
        return buildDecayChain();
    }, [stable, buildDecayChain]);
    
    // Preset nuclei
    const presets = [
        { name: "H-1", Z: 1, N: 0 },
        { name: "He-4", Z: 2, N: 2 },
        { name: "C-12", Z: 6, N: 6 },
        { name: "Fe-56", Z: 26, N: 30 },
        { name: "U-238", Z: 92, N: 146 },
        { name: "Pu-239", Z: 94, N: 145 },
    ];
    const gp1_01_prompts = useMemo(() => ({
        alpha_a_daughter: t("gp1_01.prompts.alpha_a_daughter"),
        alpha_z_daughter: t("gp1_01.prompts.alpha_z_daughter"),
        alpha_delta_a: t("gp1_01.prompts.alpha_delta_a"),
        beta_z_daughter: t("gp1_01.prompts.beta_z_daughter"),
        beta_a_daughter: t("gp1_01.prompts.beta_a_daughter"),
        beta_delta_z: t("gp1_01.prompts.beta_delta_z"),
        gamma_a_daughter: t("gp1_01.prompts.gamma_a_daughter"),
        gamma_z_daughter: t("gp1_01.prompts.gamma_z_daughter"),
        gamma_delta_sum: t("gp1_01.prompts.gamma_delta_sum"),
    }), [t]);

    const quizBank = useMemo(() => ({
        alpha: [
            {
                id: "A1",
                promptLatex: gp1_01_prompts.alpha_a_daughter,
                expressionLatex: "^{238}_{92}U\\rightarrow ^{4}_{2}\\alpha + ^{A}_{Z}X",
                labelLatex: "A_{daughter}",
                expected: 234,
                placeholder: t("gp1_01.placeholders.xxx"),
                correctLatex: "A_{daughter}=238-4=234",
            },
            {
                id: "A2",
                promptLatex: gp1_01_prompts.alpha_z_daughter,
                expressionLatex: "^{226}_{88}Ra\\rightarrow ^{4}_{2}\\alpha + ^{A}_{Z}X",
                labelLatex: "Z_{daughter}",
                expected: 86,
                placeholder: t("gp1_01.placeholders.xx"),
                correctLatex: "Z_{daughter}=88-2=86",
            },
            {
                id: "A3",
                promptLatex: gp1_01_prompts.alpha_delta_a,
                expressionLatex: "\\alpha\\text{ decay: }\\Delta A=?",
                labelLatex: "\\Delta A",
                expected: -4,
                placeholder: t("gp1_01.placeholders.minus_4"),
                correctLatex: "\\Delta A=-4",
            },
        ],
        beta: [
            {
                id: "B1",
                promptLatex: gp1_01_prompts.beta_z_daughter,
                expressionLatex: "^{14}_{6}C\\rightarrow ^{14}_{Z}N + e^- + \\bar\\nu",
                labelLatex: "Z_{daughter}",
                expected: 7,
                placeholder: t("gp1_01.placeholders.x"),
                correctLatex: "Z_{daughter}=6+1=7",
            },
            {
                id: "B2",
                promptLatex: gp1_01_prompts.beta_a_daughter,
                expressionLatex: "\\beta^-\\text{ decay keeps }A\\text{ unchanged. }A_{parent}=60",
                labelLatex: "A_{daughter}",
                expected: 60,
                placeholder: t("gp1_01.placeholders.xx"),
                correctLatex: "A_{daughter}=60",
            },
            {
                id: "B3",
                promptLatex: gp1_01_prompts.beta_delta_z,
                expressionLatex: "\\beta^-\\text{ decay: }\\Delta Z=?",
                labelLatex: "\\Delta Z",
                expected: 1,
                placeholder: t("gp1_01.placeholders.v_1"),
                correctLatex: "\\Delta Z=+1",
            },
        ],
        gamma: [
            {
                id: "G1",
                promptLatex: gp1_01_prompts.gamma_a_daughter,
                expressionLatex: "^{60}_{27}Co^*\\rightarrow ^{A}_{Z}Co + \\gamma",
                labelLatex: "A_{daughter}",
                expected: 60,
                placeholder: t("gp1_01.placeholders.xx"),
                correctLatex: "A_{daughter}=60",
            },
            {
                id: "G2",
                promptLatex: gp1_01_prompts.gamma_z_daughter,
                expressionLatex: "^{60}_{27}Co^*\\rightarrow ^{A}_{Z}Co + \\gamma",
                labelLatex: "Z_{daughter}",
                expected: 27,
                placeholder: t("gp1_01.placeholders.xx"),
                correctLatex: "Z_{daughter}=27",
            },
            {
                id: "G3",
                promptLatex: gp1_01_prompts.gamma_delta_sum,
                expressionLatex: "\\gamma\\text{ emission changes nuclear composition by }?",
                labelLatex: "\\Delta A+\\Delta Z",
                expected: 0,
                placeholder: t("gp1_01.placeholders.v_0"),
                correctLatex: "\\Delta A=0,\\;\\Delta Z=0",
            },
        ],
    }), [gp1_01_prompts]);

    const currentQuest = quizBank[quizStage][quizIndex % quizBank[quizStage].length];

    const verifyQuiz = () => {
        const value = Number(quizInput.trim());
        if (!Number.isFinite(value)) {
            setQuizResult(false);
            return;
        }
        setQuizResult(Math.abs(value - currentQuest.expected) <= 0.02);
    };

    const nextQuiz = () => {
        setQuizIndex((v) => v + 1);
        setQuizInput("");
        setQuizResult(null);
    };
    
    return (
        <div className="min-h-screen bg-black text-green-400 font-mono p-4 relative overflow-hidden">
            {/* Cyber grid background */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* Header */}
            <div className="relative z-10 mb-6 border-2 border-cyan-500 p-4 bg-black/80">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-bold text-cyan-400">
                        {t("gp1_01.title")}
                    </h1>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                        {t("gp1_01.back")}
                    </Link>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Canvas */}
                <div className="lg:col-span-2 border-2 border-purple-500 bg-black/80 h-[700px]">
                    <NuclearSim
                        protons={protons}
                        neutrons={neutrons}
                        showStabilityIsland={showStabilityIsland}
                    />
                </div>

                {/* Control Panel */}
                <div className="border-2 border-green-500 p-4 bg-black/80 space-y-4 overflow-y-auto max-h-[700px]">
                    <div className="border-b border-green-500 pb-2 mb-4">
                        <h2 className="text-lg font-bold text-green-400">
                            {t("gp1_01.monitor_title")}
                        </h2>
                    </div>

                    {/* Nucleus Info */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400 font-bold">{t("gp1_01.labels.nucleus_info")}</div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-purple-300">{t("gp1_01.labels.protons_z")}</span>
                                <span className="text-pink-300 font-bold">{protons}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">{t("gp1_01.labels.neutrons_n")}</span>
                                <span className="text-cyan-300 font-bold">{neutrons}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">{t("gp1_01.labels.mass_number_a")}</span>
                                <span className="text-amber-300 font-bold">{A}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">{t("gp1_01.labels.status")}</span>
                                <span className={`font-bold ${stable ? "text-green-300" : "text-red-300"}`}>
                                    {stable ? t("gp1_01.labels.stable") : t("gp1_01.labels.unstable")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Proton Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-pink-400">{t("gp1_01.labels.protons_z")}</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={protons}
                            onChange={(e) => setProtons(Number(e.target.value))}
                            aria-label={t("gp1_01.labels.protons_z")}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-pink-300">{protons}</div>
                    </div>

                    {/* Neutron Control */}
                    <div className="space-y-2">
                        <label className="text-sm text-cyan-400">{t("gp1_01.labels.neutrons_n")}</label>
                        <input
                            type="range"
                            min="0"
                            max="150"
                            value={neutrons}
                            onChange={(e) => setNeutrons(Number(e.target.value))}
                            aria-label={t("gp1_01.labels.neutrons_n")}
                            className="w-full"
                        />
                        <div className="text-center text-lg text-cyan-300">{neutrons}</div>
                    </div>

                    {/* Binding Energy */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400 font-bold">{t("gp1_01.labels.binding_energy_semf")}</div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-amber-300">{t("gp1_01.labels.total_be")}</span>
                                <span className="text-amber-200 font-bold">{bindingEnergy.toFixed(2)} MeV</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-amber-300">{t("gp1_01.labels.be_per_nucleon")}</span>
                                <span className="text-amber-200 font-bold">{bePerNucleon.toFixed(3)} MeV</span>
                            </div>
                        </div>
                    </div>

                    {/* Decay Mode */}
                    {!stable && (
                        <div className="border border-red-500 p-3 space-y-2">
                            <div className="text-sm text-red-400 font-bold">{t("gp1_01.labels.decay_mode")}</div>
                            <div className="text-lg text-red-300 font-bold">{decayMode.toUpperCase()}</div>
                            {decayMode === "alpha" && (
                                <div className="text-xs text-red-300/80">
                                    {t("gp1_01.labels.decay_alpha_desc")}
                                </div>
                            )}
                            {decayMode === "beta-" && (
                                <div className="text-xs text-red-300/80">
                                    {t("gp1_01.labels.decay_beta_minus_desc")}
                                </div>
                            )}
                            {decayMode === "beta+" && (
                                <div className="text-xs text-red-300/80">
                                    {t("gp1_01.labels.decay_beta_plus_desc")}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Decay Chain */}
                    {decayChain.length > 0 && (
                        <div className="border border-pink-500 p-3 space-y-2">
                            <div className="text-sm text-pink-400 font-bold">{t("gp1_01.labels.decay_chain")}</div>
                            <div className="space-y-1 text-xs">
                                {decayChain.map((step, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <span className="text-pink-300">
                                            {step.Z + step.N}-{step.Z}
                                        </span>
                                        {i < decayChain.length - 1 && (
                                            <>
                                                <span className="text-white">→</span>
                                                <span className="text-red-400 text-xs">{step.mode}</span>
                                            </>
                                        )}
                                        {step.mode === "stable" && (
                                            <span className="text-green-400 text-xs">✓ {t("gp1_01.labels.stable")}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Presets */}
                    <div className="border border-cyan-500 p-3 space-y-2">
                        <div className="text-sm text-cyan-400 font-bold">{t("gp1_01.labels.presets")}</div>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => {
                                        setProtons(preset.Z);
                                        setNeutrons(preset.N);
                                    }}
                                    aria-label={`${t("gp1_01.labels.presets")} ${preset.name}`}
                                    className="px-2 py-1 border border-cyan-500 hover:bg-cyan-500/20 transition-colors text-xs"
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Toggle Stability Island */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showStabilityIsland}
                            onChange={(e) => setShowStabilityIsland(e.target.checked)}
                            aria-label={t("gp1_01.labels.show_stability_island")}
                            className="w-4 h-4"
                        />
                        <span className="text-green-400">{t("gp1_01.labels.show_stability_island")}</span>
                    </label>

                    {/* Companion Quiz */}
                    <div className="border border-white/20 p-3 space-y-3">
                        <div className="text-sm text-white/80 font-bold">{t("gp1_01.labels.companion_quiz")}</div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => { setQuizStage("alpha"); setQuizIndex(0); setQuizInput(""); setQuizResult(null); }}
                                aria-label={t("gp1_01.stages.alpha")}
                                className={`px-2 py-1 border text-xs ${quizStage === "alpha" ? "border-cyan-400 text-cyan-300" : "border-white/40 text-white/70"}`}
                            >
                                {t("gp1_01.stages.alpha")}
                            </button>
                            <button
                                onClick={() => { setQuizStage("beta"); setQuizIndex(0); setQuizInput(""); setQuizResult(null); }}
                                aria-label={t("gp1_01.stages.beta")}
                                className={`px-2 py-1 border text-xs ${quizStage === "beta" ? "border-cyan-400 text-cyan-300" : "border-white/40 text-white/70"}`}
                            >
                                {t("gp1_01.stages.beta")}
                            </button>
                            <button
                                onClick={() => { setQuizStage("gamma"); setQuizIndex(0); setQuizInput(""); setQuizResult(null); }}
                                aria-label={t("gp1_01.stages.gamma")}
                                className={`px-2 py-1 border text-xs ${quizStage === "gamma" ? "border-cyan-400 text-cyan-300" : "border-white/40 text-white/70"}`}
                            >
                                {t("gp1_01.stages.gamma")}
                            </button>
                        </div>
                        <div className="text-center text-xl text-white font-black">
                            {renderMixedText(currentQuest.promptLatex)}
                        </div>
                        <div className="text-center p-2 bg-white/5 border border-white/10 rounded">
                            <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-white/70"><InlineMath math={currentQuest.labelLatex} /></label>
                            <input
                                value={quizInput}
                                onChange={(e) => setQuizInput(e.target.value)}
                                aria-label={t("gp1_01.labels.companion_quiz")}
                                className="w-full bg-black border border-cyan-500/50 px-3 py-2 text-center text-white rounded"
                                placeholder={currentQuest.placeholder}
                            />
                        </div>
                        <div className="flex gap-2 justify-center">
                            <button onClick={verifyQuiz} aria-label={t("gp1_01.check")} className="px-3 py-1 border border-cyan-500 text-cyan-300 text-xs">
                                {t("gp1_01.check")}
                            </button>
                            <button onClick={nextQuiz} aria-label={t("gp1_01.next")} className="px-3 py-1 border border-white/40 text-white/80 text-xs">
                                {t("gp1_01.next")}
                            </button>
                        </div>
                        {quizResult !== null && (
                            <div className="text-center p-2 bg-white/5 border border-white/10 rounded">
                                <div className={`font-bold text-sm ${quizResult ? "text-green-300" : "text-orange-300"}`}>
                                    {quizResult ? t("gp1_01.correct") : t("gp1_01.incorrect")}
                                </div>
                                {!quizResult && (
                                    <div className="mt-1 text-white/80 text-sm">
                                        <InlineMath math={currentQuest.correctLatex} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mission Info */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">{t("gp1_01.mission.title")}</div>
                        <div className="text-xs text-amber-300/80">
                            {t("gp1_01.mission.description")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
