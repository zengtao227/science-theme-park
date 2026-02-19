"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TissueVisualization from "@/components/chamber/sb2-01-tissues/TissueVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "TISSUES" | "ORGANS" | "SYSTEMS";

interface SB201TissuesQuest extends Quest {
    stage: Stage;
    tissueType?: string;
    organName?: string;
    systemName?: string;
}

interface TissueData {
    type: string;
    prompt: string;
    expression: string;
    answer: string;
    hint: string;
}

interface OrganData {
    name: string;
    prompt: string;
    expression: string;
    answer: string;
    hint: string;
}

interface SystemData {
    name: string;
    prompt: string;
    expression: string;
    answer: string;
    hint: string;
}

// Structured data for all 60 questions (3 stages × 4 difficulties × 5 questions)
const TISSUE_DATA: Record<Difficulty, TissueData[]> = {
    BASIC: [
        { type: "epithelial", prompt: "Epithelial tissue covers body surfaces. What is its primary function?", expression: "\\text{Location: Skin, intestines}", answer: "protection", hint: "Covers and protects surfaces" },
        { type: "connective", prompt: "Connective tissue provides structural support. Name its function:", expression: "\\text{Location: Bone, cartilage}", answer: "support", hint: "Provides framework" },
        { type: "muscle", prompt: "Muscle tissue enables body movement. What is its function?", expression: "\\text{Location: Heart, limbs}", answer: "movement", hint: "Contracts to move" },
        { type: "nervous", prompt: "Nervous tissue transmits electrical signals. What is its function?", expression: "\\text{Location: Brain, nerves}", answer: "signaling", hint: "Sends electrical signals" },
        { type: "epithelial", prompt: "Epithelial tissue in intestines absorbs nutrients. Function?", expression: "\\text{Location: Small intestine}", answer: "absorption", hint: "Takes in nutrients" }
    ],
    CORE: [
        { type: "epithelial", prompt: "Stratified squamous epithelium protects the skin. What is its structure?", expression: "\\text{Location: Epidermis}", answer: "layered", hint: "Multiple layers of flat cells" },
        { type: "connective", prompt: "Dense regular connective tissue forms tendons. What is its composition?", expression: "\\text{Location: Tendons}", answer: "collagen", hint: "Strong protein fibers" },
        { type: "muscle", prompt: "Cardiac muscle has intercalated discs. What is their function?", expression: "\\text{Location: Heart}", answer: "connection", hint: "Connects cardiac cells" },
        { type: "nervous", prompt: "Neurons conduct action potentials. What is the signal type?", expression: "\\text{Location: Nerves}", answer: "electrical", hint: "Electrochemical impulses" },
        { type: "connective", prompt: "Adipose tissue stores energy. What does it store?", expression: "\\text{Location: Subcutaneous}", answer: "fat", hint: "Lipid storage" }
    ],
    ADVANCED: [
        { type: "epithelial", prompt: "Columnar epithelium with microvilli increases surface area. By how much?", expression: "\\text{Microvilli factor}", answer: "20", hint: "Approximately 20-fold increase" },
        { type: "connective", prompt: "Hyaline cartilage cushions joints. What is its main component?", expression: "\\text{Location: Joints}", answer: "chondrocytes", hint: "Cartilage cells in matrix" },
        { type: "muscle", prompt: "Smooth muscle regulates organ function. Is it voluntary or involuntary?", expression: "\\text{Location: Digestive tract}", answer: "involuntary", hint: "Not under conscious control" },
        { type: "nervous", prompt: "Glial cells support neurons. Name one type:", expression: "\\text{Location: Brain}", answer: "astrocytes", hint: "Star-shaped support cells" },
        { type: "epithelial", prompt: "Simple squamous epithelium lines blood vessels. What is it called?", expression: "\\text{Location: Vessels}", answer: "endothelium", hint: "Inner lining of vessels" }
    ],
    ELITE: [
        { type: "connective", prompt: "Compact bone has osteons with Haversian canals. What do they contain?", expression: "\\text{Location: Long bones}", answer: "vessels", hint: "Blood vessels and nerves" },
        { type: "muscle", prompt: "Skeletal muscle has neuromuscular junctions. What neurotransmitter is used?", expression: "\\text{Location: Motor endplate}", answer: "acetylcholine", hint: "ACh at NMJ" },
        { type: "nervous", prompt: "Oligodendrocytes provide myelin in the CNS. How many axons per cell?", expression: "\\text{Location: White matter}", answer: "multiple", hint: "One cell myelinates many axons" },
        { type: "epithelial", prompt: "Parietal cells in gastric epithelium secrete HCl. What is the pH?", expression: "\\text{Location: Stomach}", answer: "2", hint: "Very acidic, pH around 2" },
        { type: "connective", prompt: "Blood is a connective tissue. What is its extracellular matrix?", expression: "\\text{Location: Vessels}", answer: "plasma", hint: "Liquid matrix" }
    ]
};

const ORGAN_DATA: Record<Difficulty, OrganData[]> = {
    BASIC: [
        { name: "heart", prompt: "The heart contains muscle, epithelial, connective, and nervous tissue. Count:", expression: "\\text{Organ: Heart}", answer: "4", hint: "All organs have multiple tissues" },
        { name: "stomach", prompt: "The stomach contains muscle, epithelial, connective, and nervous tissue. Count:", expression: "\\text{Organ: Stomach}", answer: "4", hint: "All organs have multiple tissues" },
        { name: "liver", prompt: "The liver contains epithelial, connective, and vascular tissue. Count:", expression: "\\text{Organ: Liver}", answer: "3", hint: "Count the tissue types" },
        { name: "kidney", prompt: "The kidney contains epithelial, connective, vascular, and nervous tissue. Count:", expression: "\\text{Organ: Kidney}", answer: "4", hint: "All organs have multiple tissues" },
        { name: "lung", prompt: "The lung contains epithelial, connective, vascular, and nervous tissue. Count:", expression: "\\text{Organ: Lung}", answer: "4", hint: "All organs have multiple tissues" }
    ],
    CORE: [
        { name: "heart", prompt: "The heart's myocardium is which tissue type?", expression: "\\text{Organ: Heart wall}", answer: "muscle", hint: "Cardiac muscle tissue" },
        { name: "stomach", prompt: "The stomach's mucosa secretes gastric juice. What tissue type?", expression: "\\text{Organ: Stomach lining}", answer: "epithelial", hint: "Secretory epithelium" },
        { name: "liver", prompt: "Hepatocytes perform metabolic functions. What tissue type?", expression: "\\text{Organ: Liver cells}", answer: "epithelial", hint: "Specialized epithelial cells" },
        { name: "kidney", prompt: "Nephron tubules filter blood. What tissue type?", expression: "\\text{Organ: Kidney tubules}", answer: "epithelial", hint: "Tubular epithelium" },
        { name: "lung", prompt: "Alveoli enable gas exchange. What tissue type?", expression: "\\text{Organ: Lung sacs}", answer: "epithelial", hint: "Simple squamous epithelium" }
    ],
    ADVANCED: [
        { name: "heart", prompt: "The heart has 4 chambers. How many valves?", expression: "\\text{Organ: Heart}", answer: "4", hint: "Tricuspid, pulmonary, mitral, aortic" },
        { name: "stomach", prompt: "The stomach has 3 muscle layers. Name the pattern:", expression: "\\text{Organ: Stomach wall}", answer: "circular", hint: "Circular and longitudinal layers" },
        { name: "liver", prompt: "The liver has how many lobes?", expression: "\\text{Organ: Liver}", answer: "4", hint: "Right, left, caudate, quadrate" },
        { name: "kidney", prompt: "Each kidney has approximately how many nephrons?", expression: "\\text{Organ: Kidney}", answer: "1000000", hint: "About 1 million per kidney" },
        { name: "lung", prompt: "Humans have how many lung lobes total?", expression: "\\text{Organ: Lungs}", answer: "5", hint: "3 right, 2 left" }
    ],
    ELITE: [
        { name: "heart", prompt: "The cardiac skeleton is made of what connective tissue?", expression: "\\text{Organ: Heart framework}", answer: "fibrous", hint: "Dense irregular connective tissue" },
        { name: "stomach", prompt: "The myenteric plexus controls peristalsis. What tissue type?", expression: "\\text{Organ: Stomach wall}", answer: "nervous", hint: "Autonomic nervous tissue" },
        { name: "liver", prompt: "Liver sinusoids are lined with what specialized cells?", expression: "\\text{Organ: Liver capillaries}", answer: "endothelial", hint: "Fenestrated endothelium" },
        { name: "kidney", prompt: "The juxtaglomerular apparatus regulates what?", expression: "\\text{Organ: Kidney}", answer: "pressure", hint: "Blood pressure regulation" },
        { name: "lung", prompt: "Type II pneumocytes secrete what substance?", expression: "\\text{Organ: Alveoli}", answer: "surfactant", hint: "Reduces surface tension" }
    ]
};

const SYSTEM_DATA: Record<Difficulty, SystemData[]> = {
    BASIC: [
        { name: "hierarchy", prompt: "Complete: Cell \\rightarrow Tissue \\rightarrow Organ \\rightarrow ?", expression: "\\text{Cell} \\rightarrow \\text{Tissue} \\rightarrow \\text{Organ} \\rightarrow ?", answer: "system", hint: "Groups of organs" },
        { name: "organism", prompt: "Complete the hierarchy: Organ System \\rightarrow ?", expression: "\\text{System} \\rightarrow ?", answer: "organism", hint: "The complete living individual" },
        { name: "cell_to_tissue", prompt: "What comes after Cell in the biological hierarchy?", expression: "\\text{Cell} \\rightarrow ?", answer: "tissue", hint: "Group of similar cells" },
        { name: "tissue_to_organ", prompt: "What comes after Tissue in the biological hierarchy?", expression: "\\text{Tissue} \\rightarrow ?", answer: "organ", hint: "Multiple tissues integrated" },
        { name: "full_hierarchy", prompt: "How many levels: Cell, Tissue, Organ, System, Organism?", expression: "\\text{Count hierarchy levels}", answer: "5", hint: "Count all the levels" }
    ],
    CORE: [
        { name: "cardiovascular", prompt: "The cardiovascular system has heart and vessels. How many major organs?", expression: "\\text{System: Cardiovascular}", answer: "1", hint: "Heart is the main organ" },
        { name: "digestive", prompt: "The digestive system includes stomach, intestines, liver. Count major organs:", expression: "\\text{System: Digestive}", answer: "6", hint: "Mouth, esophagus, stomach, intestines, liver, pancreas" },
        { name: "respiratory", prompt: "The respiratory system has lungs and airways. Main organ?", expression: "\\text{System: Respiratory}", answer: "lungs", hint: "Gas exchange organs" },
        { name: "nervous", prompt: "The nervous system has brain and spinal cord. How many divisions?", expression: "\\text{System: Nervous}", answer: "2", hint: "Central and peripheral" },
        { name: "urinary", prompt: "The urinary system filters blood. Main organs?", expression: "\\text{System: Urinary}", answer: "kidneys", hint: "Paired filtering organs" }
    ],
    ADVANCED: [
        { name: "cardiovascular", prompt: "The cardiovascular system transports oxygen. What carries it?", expression: "\\text{System: Cardiovascular}", answer: "hemoglobin", hint: "Protein in red blood cells" },
        { name: "digestive", prompt: "The digestive system breaks down food. What are the products?", expression: "\\text{System: Digestive}", answer: "nutrients", hint: "Absorbed molecules" },
        { name: "respiratory", prompt: "The respiratory system exchanges gases. What is expelled?", expression: "\\text{System: Respiratory}", answer: "co2", hint: "Carbon dioxide waste" },
        { name: "nervous", prompt: "The nervous system processes information. What are the signals?", expression: "\\text{System: Nervous}", answer: "electrical", hint: "Action potentials" },
        { name: "endocrine", prompt: "The endocrine system uses chemical messengers. What are they?", expression: "\\text{System: Endocrine}", answer: "hormones", hint: "Chemical signals in blood" }
    ],
    ELITE: [
        { name: "cardiovascular", prompt: "The cardiovascular system has systemic and pulmonary circuits. Total?", expression: "\\text{System: Cardiovascular}", answer: "2", hint: "Two circulation loops" },
        { name: "digestive", prompt: "The digestive system has enteric nervous system. How many neurons?", expression: "\\text{System: Digestive}", answer: "500000000", hint: "About 500 million neurons" },
        { name: "respiratory", prompt: "The respiratory system has approximately how many alveoli?", expression: "\\text{System: Respiratory}", answer: "300000000", hint: "About 300 million alveoli" },
        { name: "nervous", prompt: "The nervous system has somatic and autonomic divisions. Autonomic subdivisions?", expression: "\\text{System: Nervous}", answer: "2", hint: "Sympathetic and parasympathetic" },
        { name: "immune", prompt: "The immune system has innate and adaptive responses. Which is faster?", expression: "\\text{System: Immune}", answer: "innate", hint: "Immediate response" }
    ]
};

export default function SB201TissuesPage() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB201TissuesQuest[] => {
        const quests: SB201TissuesQuest[] = [];

        if (stage === "TISSUES") {
            const dataList = TISSUE_DATA[difficulty] || [];
            dataList.forEach((data, idx) => {
                quests.push({
                    id: `T_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    tissueType: data.type,
                    promptLatex: data.prompt,
                    expressionLatex: data.expression,
                    targetLatex: "\\\\text{Function}",
                    slots: [{ id: "func", labelLatex: "\\\\text{Function}", placeholder: data.answer, expected: data.answer }],
                    correctLatex: data.answer,
                    hintLatex: [data.hint]
                });
            });
        }

        if (stage === "ORGANS") {
            const dataList = ORGAN_DATA[difficulty] || [];
            dataList.forEach((data, idx) => {
                quests.push({
                    id: `O_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    organName: data.name,
                    promptLatex: data.prompt,
                    expressionLatex: data.expression,
                    targetLatex: "\\\\text{Answer}",
                    slots: [{ id: "ans", labelLatex: "\\\\text{Answer}", placeholder: data.answer, expected: data.answer }],
                    correctLatex: data.answer,
                    hintLatex: [data.hint]
                });
            });
        }

        if (stage === "SYSTEMS") {
            const dataList = SYSTEM_DATA[difficulty] || [];
            dataList.forEach((data, idx) => {
                quests.push({
                    id: `S_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    systemName: data.name,
                    promptLatex: data.prompt,
                    expressionLatex: data.expression,
                    targetLatex: "\\\\text{Answer}",
                    slots: [{ id: "ans", labelLatex: "\\\\text{Answer}", placeholder: data.answer, expected: data.answer }],
                    correctLatex: data.answer,
                    hintLatex: [data.hint]
                });
            });
        }

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
        getCurrentErrorCount,
        currentStageStats,
    } = useQuestManager<SB201TissuesQuest, Stage>({
        buildPool,
        initialStage: "TISSUES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb2-01-tissues", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "TISSUES" as Stage, label: t("sb2_01_tissues.stages.tissues") },
        { id: "ORGANS" as Stage, label: t("sb2_01_tissues.stages.organs") },
        { id: "SYSTEMS" as Stage, label: t("sb2_01_tissues.stages.systems") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB2.01"
            title={t("sb2_01_tissues.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb2_01_tissues.footer_left")}
            translations={{
                back: t("sb2_01_tissues.back"),
                check: t("sb2_01_tissues.check"),
                next: t("sb2_01_tissues.next"),
                correct: t("sb2_01_tissues.correct"),
                incorrect: t("sb2_01_tissues.incorrect"),
                ready: t("sb1_01.ready"), // Fallback to common or sibling
                monitor_title: t("sb2_01_tissues.monitor_title"),
                difficulty: {
                    basic: t("sb2_01_tissues.difficulty.basic"),
                    core: t("sb2_01_tissues.difficulty.core"),
                    advanced: t("sb2_01_tissues.difficulty.advanced"),
                    elite: t("sb2_01_tissues.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <TissueVisualization quest={currentQuest} stage={stage} />
                    
                    {/* Stage Progress Indicator */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 flex justify-between items-center font-black">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                                {stage.replace('_', ' ')} STAGE
                            </span>
                            <span className="text-neon-green">{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        
                        {/* Visual progress bar */}
                        <div className="flex gap-1 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 bg-neon-green shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? 1 : 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                />
                            ))}
                        </div>
                        
                        {/* Stage info */}
                        <div className="mt-3 text-[9px] text-white/30 font-mono text-center">
                            {stage === "TISSUES" && "Analyzing tissue morphology..."}
                            {stage === "ORGANS" && "Mapping organ composition..."}
                            {stage === "SYSTEMS" && "Tracing biological hierarchy..."}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {/* Scenario Description with enhanced animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`scenario-${stage}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden group"
                    >
                        {/* Animated border accent */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />
                        <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                            {t("sb2_01_tissues.objective_title")}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed font-medium">
                            {t(`sb2_01_tissues.scenarios.${stage.toLowerCase()}` as any)}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {currentQuest && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`quest-${currentQuest.id}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12"
                        >
                        <motion.div
                            className="text-center space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic flex items-center justify-center gap-2">
                                <span className="w-8 h-px bg-neon-green/30" />
                                {t("sb2_01_tissues.labels.analysis")}
                                <span className="w-8 h-px bg-neon-green/30" />
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-green/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,0,0.05)] group hover:shadow-[0_0_50px_rgba(0,255,0,0.1)] transition-all duration-500">
                                <motion.div
                                    className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-green/40"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {stage === "TISSUES" ? "TISSUE SAMPLE" : stage === "ORGANS" ? "ORGAN STRUCTURE" : "HIERARCHY LEVEL"}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <motion.div
                                className="absolute top-0 left-0 w-1 h-full bg-neon-green/50"
                                initial={{ height: "100%" }}
                                whileHover={{ height: "0%" }}
                                transition={{ duration: 0.7 }}
                            />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-green/30" />
                                    {t("sb2_01_tissues.labels.terminal")}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot, index) => (
                                        <motion.div
                                            key={slot.id}
                                            className="w-full max-w-md space-y-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                                        >
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-green/30 font-mono">TISSUE_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <motion.div 
                                                className="relative group"
                                                animate={lastCheck && !lastCheck.ok ? {
                                                    x: [0, -10, 10, -10, 10, 0],
                                                } : {}}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <input
                                                    className={`w-full bg-white/5 border-2 transition-all p-6 text-center outline-none font-mono text-3xl text-white rounded-2xl shadow-inner uppercase ${
                                                        lastCheck && !lastCheck.ok && !inputs[slot.id]?.trim()
                                                            ? 'border-red-500/50 animate-pulse'
                                                            : 'border-white/10 group-focus-within:border-neon-green/50'
                                                    }`}
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <motion.div
                                                    className="absolute inset-x-0 bottom-0 h-1 bg-neon-green/20 blur-sm"
                                                    initial={{ scaleX: 0 }}
                                                    whileFocus={{ scaleX: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                                {/* Empty field indicator */}
                                                {lastCheck && !lastCheck.ok && !inputs[slot.id]?.trim() && (
                                                    <motion.div
                                                        className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-black"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                    >
                                                        <span className="text-[8px] text-white font-black flex items-center justify-center h-full">!</span>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {lastCheck && (
                                        <motion.div
                                            key={lastCheck.ok ? "correct" : "incorrect"}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors relative overflow-hidden ${lastCheck.ok
                                                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                }`}
                                        >
                                            {/* Enhanced visual effect for feedback */}
                                            <motion.div
                                                className={`absolute inset-0 ${lastCheck.ok ? 'bg-green-500/5' : 'bg-red-500/5'}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 0.5, 0] }}
                                                transition={{ duration: 1.5, repeat: lastCheck.ok ? 0 : 2 }}
                                            />
                                            
                                            <div className="flex items-center gap-5 relative z-10">
                                                <motion.div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                                                        }`}
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                                >
                                                    {lastCheck.ok ? "✓" : "✗"}
                                                </motion.div>
                                                <div>
                                                    <div className="font-black text-lg tracking-widest uppercase italic">
                                                        {lastCheck.ok ? t("sb2_01_tissues.results.valid") : t("sb2_01_tissues.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb2_01_tissues.results.valid_desc") : t("sb2_01_tissues.results.invalid_desc")}
                                                    </div>
                                                    {/* Error count indicator */}
                                                    {!lastCheck.ok && getCurrentErrorCount() > 0 && (
                                                        <motion.div
                                                            className="mt-2 text-xs font-mono text-white/40"
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                        >
                                                            Attempt {getCurrentErrorCount()} • {getCurrentErrorCount() >= 3 ? "Showing detailed hint" : "Keep trying"}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <motion.div
                                                    className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3 relative z-10"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <motion.span 
                                                        className="text-[10px] font-black uppercase tracking-widest text-white/40"
                                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        {t("sb2_01_tissues.labels.hint")}:
                                                    </motion.span>
                                                    <div className="text-white font-bold">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {lastCheck.ok && (
                                                <motion.button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 relative z-10"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                    whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                                                >
                                                    {t("sb2_01_tissues.results.next")}
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </ChamberLayout>
    );
}
