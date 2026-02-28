"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BodySystemVisualization from "@/components/chamber/sb2-02-body-systems/BodySystemVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { renderMixedText } from "@/lib/latex-utils";

type Stage = "DIGESTIVE" | "CIRCULATORY" | "RESPIRATORY";

interface SB202BodySystemsQuest extends Quest {
    stage: Stage;
    systemType?: string;
    organPath?: string[];
}

export default function SB202BodySystemsPage() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB202BodySystemsQuest[] => {
        const quests: SB202BodySystemsQuest[] = [];

        if (stage === "DIGESTIVE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "D-B1", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b1"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        slots: [{ id: "organ", labelLatex: `\\text{${t("sb2_02.labels.organ")}}`, placeholder: "stomach", expected: "stomach" }],
                        correctLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b1")]
                    },
                    {
                        id: "D-B2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b2"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.digestion")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: "digestion", expected: "digestion" }],
                        correctLatex: `\\text{${t("sb2_02.functions.digestion")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b2")]
                    },
                    {
                        id: "D-B3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: "absorption", expected: "absorption" }],
                        correctLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b3")]
                    },
                    {
                        id: "D-B4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.bile_production")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: "bile", expected: "bile" }],
                        correctLatex: `\\text{${t("sb2_02.functions.bile_production")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b4")]
                    },
                    {
                        id: "D-B5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.organs_7")}}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "7", expected: 7 }],
                        correctLatex: `n = 7`,
                        hintLatex: [t("sb2_02.hints.digestive_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "D-C1", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c1"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{${t("sb2_02.organs.pancreas")}}`,
                        slots: [{ id: "organ", labelLatex: `\\text{${t("sb2_02.labels.organ")}}`, placeholder: "pancreas", expected: t("sb2_02.organs.pancreas") }],
                        correctLatex: `\\text{${t("sb2_02.organs.pancreas")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c1")]
                    },
                    {
                        id: "D-C2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.acid_production")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: "acid", expected: t("sb2_02.labels.acid_production") || "acid" }],
                        correctLatex: `\\text{${t("sb2_02.functions.acid_production")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c2")]
                    },
                    {
                        id: "D-C3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: "absorption", expected: t("sb2_02.functions.absorption") }],
                        correctLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c3")]
                    },
                    {
                        id: "D-C4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.large_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.dehydration")}}`,
                        slots: [{ id: "result", labelLatex: `\\text{${t("sb2_02.labels.result")}}`, placeholder: "dehydration", expected: t("sb2_02.labels.dehydration") }],
                        correctLatex: `\\text{${t("sb2_02.labels.dehydration")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c4")]
                    },
                    {
                        id: "D-C5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c5"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.peristalsis")}}`,
                        slots: [{ id: "process", labelLatex: `\\text{${t("sb2_02.labels.process")}}`, placeholder: "peristalsis", expected: t("sb2_02.labels.peristalsis") }],
                        correctLatex: `\\text{${t("sb2_02.labels.peristalsis")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c5")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "D-A1", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a1"),
                        expressionLatex: `\\text{${t("sb2_02.organs.pancreas")}}`,
                        targetLatex: `\\text{pH increase}`,
                        slots: [{ id: "ph", labelLatex: `\text{pH}`, placeholder: "7", expected: 7 }],
                        correctLatex: `\\text{pH} \\approx 7`,
                        hintLatex: [t("sb2_02.hints.digestive_a1")]
                    },
                    {
                        id: "D-A2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.surface_area")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: "surface area", expected: t("sb2_02.labels.surface_area") }],
                        correctLatex: `\\text{${t("sb2_02.labels.surface_area")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_a2")]
                    },
                    {
                        id: "D-A3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\text{Efficiency}`,
                        slots: [{ id: "effect", labelLatex: `\\text{${t("sb2_02.labels.effect")}}`, placeholder: "more time", expected: "more time" }],
                        correctLatex: `\\text{More time for absorption}`,
                        hintLatex: [t("sb2_02.hints.digestive_a3")]
                    },
                    {
                        id: "D-A4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        targetLatex: `\\text{Infection risk}`,
                        slots: [{ id: "risk", labelLatex: `\\text{${t("sb2_02.labels.risk")}}`, placeholder: "infection", expected: "infection" }],
                        correctLatex: `\\text{Bacterial infection}`,
                        hintLatex: [t("sb2_02.hints.digestive_a4")]
                    },
                    {
                        id: "D-A5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\text{Metabolism}`,
                        slots: [{ id: "process", labelLatex: `\\text{${t("sb2_02.labels.process")}}`, placeholder: "metabolism", expected: "metabolism" }],
                        correctLatex: `\\text{Metabolism}`,
                        hintLatex: [t("sb2_02.hints.digestive_a5")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "D-E1", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e1"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.crohns")}}`,
                        targetLatex: `\\text{Intestines}`,
                        slots: [{ id: "organs", labelLatex: `\\text{${t("sb2_02.labels.organs")}}`, placeholder: "intestines", expected: "intestines" }],
                        correctLatex: `\\text{${t("sb2_02.organs.intestines")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_e1")]
                    },
                    {
                        id: "D-E2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.lactose_intolerance")}}`,
                        targetLatex: `\\text{Lactase}`,
                        slots: [{ id: "enzyme", labelLatex: `\\text{${t("sb2_02.labels.enzyme")}}`, placeholder: "lactase", expected: "lactase" }],
                        correctLatex: `\\text{Lactase}`,
                        hintLatex: [t("sb2_02.hints.digestive_e2")]
                    },
                    {
                        id: "D-E3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e3"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.enteric_nervous")}}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "500000000", expected: 500000000 }],
                        correctLatex: `n \\approx 500 \\text{ million}`,
                        hintLatex: [t("sb2_02.hints.digestive_e3")]
                    },
                    {
                        id: "D-E4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.celiac")}}`,
                        targetLatex: `\\text{Malabsorption}`,
                        slots: [{ id: "consequence", labelLatex: `\\text{${t("sb2_02.labels.result")}}`, placeholder: "malabsorption", expected: "malabsorption" }],
                        correctLatex: `\\text{Malabsorption}`,
                        hintLatex: [t("sb2_02.hints.digestive_e4")]
                    },
                    {
                        id: "D-E5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e5"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{Comparison}`,
                        slots: [{ id: "comparison", labelLatex: `\\text{${t("sb2_02.labels.type")}}`, placeholder: "mechanical", expected: "mechanical" }],
                        correctLatex: `\\text{Mechanical + Chemical}`,
                        hintLatex: [t("sb2_02.hints.digestive_e5")]
                    }
                );
            }
        }

        if (stage === "CIRCULATORY") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "C-B1", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b1"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.pump_blood")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: "pump", expected: "pump" }],
                        correctLatex: `\\text{${t("sb2_02.functions.pump_blood")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_b1")]
                    },
                    {
                        id: "C-B2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.blood_vessels")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.return_blood")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: "return", expected: "return" }],
                        correctLatex: `\\text{${t("sb2_02.functions.return_blood")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_b2")]
                    },
                    {
                        id: "C-B3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}, ${t("sb2_02.organs.arteries")}, ${t("sb2_02.organs.veins")}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "3", expected: 3 }],
                        correctLatex: `n = 3`,
                        hintLatex: [t("sb2_02.hints.circulatory_b3")]
                    },
                    {
                        id: "C-B4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.gas_exchange")}}`,
                        targetLatex: `\\text{CO}_2`,
                        slots: [{ id: "gas", labelLatex: `\\text{${t("sb2_02.labels.gas")}}`, placeholder: "CO2", expected: "CO2" }],
                        correctLatex: `\\text{Carbon dioxide (CO}_2\\text{)}`,
                        hintLatex: [t("sb2_02.hints.circulatory_b4")]
                    },
                    {
                        id: "C-B5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.atria_ventricles")}}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "4", expected: 4 }],
                        correctLatex: `n = 4`,
                        hintLatex: [t("sb2_02.hints.circulatory_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "C-C1", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c1"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\text{Pulmonary}`,
                        slots: [{ id: "circulation", labelLatex: `\\text{${t("sb2_02.labels.type")}}`, placeholder: "pulmonary", expected: "pulmonary" }],
                        correctLatex: `\\text{Pulmonary circulation}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c1")]
                    },
                    {
                        id: "C-C2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.reason")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: "body", expected: t("sb2_02.labels.body") }],
                        correctLatex: `\\text{${t("sb2_02.labels.body")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c2")]
                    },
                    {
                        id: "C-C3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.capillaries")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.gas_exchange")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: "exchange", expected: "exchange" }],
                        correctLatex: `\\text{${t("sb2_02.functions.gas_exchange")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c3")]
                    },
                    {
                        id: "C-C4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.blood_pressure")}}`,
                        targetLatex: `\\text{120/80}`,
                        slots: [{ id: "bp", labelLatex: `\\text{${t("sb2_02.labels.bp")}}`, placeholder: "120/80", expected: "120/80" }],
                        correctLatex: `\\text{120/80 mmHg}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c4")]
                    },
                    {
                        id: "C-C5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\text{Heart rate}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sb2_02.labels.term")}}`, placeholder: "heart rate", expected: "heart rate" }],
                        correctLatex: `\\text{Heart rate}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c5")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "C-A1", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a1"),
                        expressionLatex: `\\text{HR} = 70 \\text{ bpm, SV} = 70 \\text{ mL}`,
                        targetLatex: `\\text{CO}`,
                        slots: [{ id: "co", labelLatex: `\\text{${t("sb2_02.labels.co_l_min")}}`, placeholder: "5", expected: 5 }],
                        correctLatex: `\\text{CO} = 5 \\text{ L/min}`,
                        hintLatex: [t("sb2_02.hints.circulatory_a1")]
                    },
                    {
                        id: "C-A2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.arteries")}}`,
                        targetLatex: `\\text{Elasticity}`,
                        slots: [{ id: "property", labelLatex: `\\text{${t("sb2_02.labels.property")}}`, placeholder: "elastic", expected: "elastic" }],
                        correctLatex: `\\text{Elastic walls absorb pressure}`,
                        hintLatex: [t("sb2_02.hints.circulatory_a2")]
                    },
                    {
                        id: "C-A3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.veins")}}`,
                        targetLatex: `\\text{Varicose veins}`,
                        slots: [{ id: "condition", labelLatex: `\\text{${t("sb2_02.labels.condition")}}`, placeholder: "varicose", expected: "varicose" }],
                        correctLatex: `\\text{Varicose veins}`,
                        hintLatex: [t("sb2_02.hints.circulatory_a3")]
                    },
                    {
                        id: "C-A4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.hemoglobin")}}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "4", expected: 4 }],
                        correctLatex: `n = 4`,
                        hintLatex: [t("sb2_02.hints.circulatory_a4")]
                    },
                    {
                        id: "C-A5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\text{SA node}`,
                        slots: [{ id: "node", labelLatex: `\\text{${t("sb2_02.labels.node")}}`, placeholder: "SA", expected: "SA" }],
                        correctLatex: `\\text{SA node (sinoatrial)}`,
                        hintLatex: [t("sb2_02.hints.circulatory_a5")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "C-E1", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e1"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.atherosclerosis")}}`,
                        targetLatex: `\\text{Heart attack}`,
                        slots: [{ id: "consequence", labelLatex: `\\text{${t("sb2_02.labels.risk")}}`, placeholder: "heart attack", expected: "heart attack" }],
                        correctLatex: `\\text{Heart attack, stroke}`,
                        hintLatex: [t("sb2_02.hints.circulatory_e1")]
                    },
                    {
                        id: "C-E2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.frank_starling")}}`,
                        targetLatex: `\\text{Stretch}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.factor")}}`, placeholder: "stretch", expected: "stretch" }],
                        correctLatex: `\\text{Increased stretch -> stronger contraction}`,
                        hintLatex: [t("sb2_02.hints.circulatory_e2")]
                    },
                    {
                        id: "C-E3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e3"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.bp_regulation")}}`,
                        targetLatex: `\\text{Mechanisms}`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "3", expected: 3 }],
                        correctLatex: `\\text{Baroreceptors, RAAS, ANP}`,
                        hintLatex: [t("sb2_02.hints.circulatory_e3")]
                    },
                    {
                        id: "C-E4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.heart_failure")}}`,
                        targetLatex: `\\text{Compensation}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.response")}}`, placeholder: "hypertrophy", expected: "hypertrophy" }],
                        correctLatex: `\\text{Cardiac hypertrophy}`,
                        hintLatex: [t("sb2_02.hints.circulatory_e4")]
                    },
                    {
                        id: "C-E5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.rest_exercise_co")}}`,
                        targetLatex: `\\text{Increase}`,
                        slots: [{ id: "factor", labelLatex: `\\text{${t("sb2_02.labels.factor")}}`, placeholder: "5", expected: 5 }],
                        correctLatex: `5\\times \\text{ increase}`,
                        hintLatex: [t("sb2_02.hints.circulatory_e5")]
                    }
                );
            }
        }

        if (stage === "RESPIRATORY") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "R-B1", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b1"),
                        expressionLatex: `\\text{${t("sb2_02.organs.lungs")}}`,
                        targetLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        slots: [{ id: "struct", labelLatex: `\\text{${t("sb2_02.labels.structure")}}`, placeholder: "alveoli", expected: "alveoli" }],
                        correctLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_b1")]
                    },
                    {
                        id: "R-B2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.gas_exchange")}}`,
                        targetLatex: `\\text{O}_2`,
                        slots: [{ id: "gas", labelLatex: `\\text{${t("sb2_02.labels.gas")}}`, placeholder: "O2", expected: "O2" }],
                        correctLatex: `\\text{Oxygen (O}_2\\text{)}`,
                        hintLatex: [t("sb2_02.hints.respiratory_b2")]
                    },
                    {
                        id: "R-B3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.nose")}}, ${t("sb2_02.organs.pharynx")}, ${t("sb2_02.organs.larynx")}, ${t("sb2_02.organs.trachea")}, ${t("sb2_02.organs.lungs")}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "5", expected: 5 }],
                        correctLatex: `n = 5`,
                        hintLatex: [t("sb2_02.hints.respiratory_b3")]
                    },
                    {
                        id: "R-B4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.diaphragm")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.breathing")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: "breathing", expected: "breathing" }],
                        correctLatex: `\\text{${t("sb2_02.functions.breathing")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_b4")]
                    },
                    {
                        id: "R-B5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.respiratory_pathway")}}`,
                        targetLatex: `\\text{${t("sb2_02.organs.larynx")}}`,
                        slots: [{ id: "organ", labelLatex: `\\text{${t("sb2_02.labels.organ")}}`, placeholder: "larynx", expected: "larynx" }],
                        correctLatex: `\\text{${t("sb2_02.organs.larynx")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "R-C1", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c1"),
                        expressionLatex: `\\text{${t("sb2_02.organs.trachea")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.support")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: "support", expected: t("sb2_02.labels.support") }],
                        correctLatex: `\\text{${t("sb2_02.labels.support")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c1")]
                    },
                    {
                        id: "R-C2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.bronchi")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.tree")}}`,
                        slots: [{ id: "structure", labelLatex: `\\text{${t("sb2_02.labels.structure")}}`, placeholder: "tree", expected: t("sb2_02.labels.tree") }],
                        correctLatex: `\\text{${t("sb2_02.labels.tree")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c2")]
                    },
                    {
                        id: "R-C3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.diffusion")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: "diffusion", expected: t("sb2_02.labels.diffusion") }],
                        correctLatex: `\\text{${t("sb2_02.labels.diffusion")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c3")]
                    },
                    {
                        id: "R-C4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.diaphragm")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.pressure")}}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.mechanism")}}`, placeholder: "pressure", expected: t("sb2_02.labels.pressure") }],
                        correctLatex: `\\text{${t("sb2_02.labels.pressure")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c4")]
                    },
                    {
                        id: "R-C5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.breathing")}}`,
                        targetLatex: `\\text{Respiratory rate}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sb2_02.labels.term")}}`, placeholder: "rate", expected: "rate" }],
                        correctLatex: `\\text{Respiratory rate}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c5")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "R-A1", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a1"),
                        expressionLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        targetLatex: `\\text{Area}`,
                        slots: [{ id: "area", labelLatex: `\\text{Area (m}^{2}\\\text{)}`, placeholder: "70", expected: 70 }],
                        correctLatex: `\\approx 70 \\text{ m}^{2}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a1")]
                    },
                    {
                        id: "R-A2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a2"),
                        expressionLatex: `\\text{TV} = 500 \\text{ mL, RR} = 15 \\text{ breaths/min}`,
                        targetLatex: `\\text{MV}`,
                        slots: [{ id: "mv", labelLatex: `\\text{${t("sb2_02.labels.mv_l_min")}}`, placeholder: "7.5", expected: 7.5 }],
                        correctLatex: `\\text{MV} = 7.5 \\text{ L/min}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a2")]
                    },
                    {
                        id: "R-A3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        targetLatex: `\\text{Gradient}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.mechanism")}}`, placeholder: "gradient", expected: "gradient" }],
                        correctLatex: `\\text{Concentration gradient}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a3")]
                    },
                    {
                        id: "R-A4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.larynx")}}`,
                        targetLatex: `\\text{Vibration}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.mechanism")}}`, placeholder: "vibration", expected: "vibration" }],
                        correctLatex: `\\text{Vocal cord vibration}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a4")]
                    },
                    {
                        id: "R-A5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.surfactant")}}`,
                        targetLatex: `\\text{Collapse}`,
                        slots: [{ id: "consequence", labelLatex: `\\text{${t("sb2_02.labels.result")}}`, placeholder: "collapse", expected: "collapse" }],
                        correctLatex: `\\text{Alveolar collapse}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a5")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "R-E1", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e1"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.asthma")}}`,
                        targetLatex: `\\text{Reduced airflow}`,
                        slots: [{ id: "consequence", labelLatex: `\\text{${t("sb2_02.labels.result")}}`, placeholder: "airflow", expected: "airflow" }],
                        correctLatex: `\\text{Reduced airflow, hypoxia}`,
                        hintLatex: [t("sb2_02.hints.respiratory_e1")]
                    },
                    {
                        id: "R-E2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.copd")}}`,
                        targetLatex: `\\text{Compensation}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.response")}}`, placeholder: "breathing", expected: "breathing" }],
                        correctLatex: `\\text{Increased breathing rate}`,
                        hintLatex: [t("sb2_02.hints.respiratory_e2")]
                    },
                    {
                        id: "R-E3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e3"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.ph_regulation")}}`,
                        targetLatex: `\\text{CO}_2`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.factor")}}`, placeholder: "CO2", expected: "CO2" }],
                        correctLatex: `\\text{CO}_2 \\leftrightarrow \\text{H}^+ + \\text{HCO}_3^-`,
                        hintLatex: [t("sb2_02.hints.respiratory_e3")]
                    },
                    {
                        id: "R-E4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.high_altitude")}}`,
                        targetLatex: `\\text{Adaptation}`,
                        slots: [{ id: "adaptation", labelLatex: `\\text{${t("sb2_02.labels.response")}}`, placeholder: "RBC", expected: "RBC" }],
                        correctLatex: `\\text{Increased RBC production}`,
                        hintLatex: [t("sb2_02.hints.respiratory_e4")]
                    },
                    {
                        id: "R-E5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.pneumonia")}}`,
                        targetLatex: `\\text{Reduction}`,
                        slots: [{ id: "percentage", labelLatex: `\\text{\\%}`, placeholder: "50", expected: 50 }],
                        correctLatex: `\\approx 50\\% \\text{ reduction}`,
                        hintLatex: [t("sb2_02.hints.respiratory_e5")]
                    }
                );
            }
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
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback
    } = useQuestManager<SB202BodySystemsQuest, Stage>({
        moduleCode: "sb2-02-body-systems",
        buildPool,
        initialStage: "DIGESTIVE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb2-02-body-systems", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "DIGESTIVE" as Stage, label: t("sb2_02.stages.digestive") },
        { id: "CIRCULATORY" as Stage, label: t("sb2_02.stages.circulatory") },
        { id: "RESPIRATORY" as Stage, label: t("sb2_02.stages.respiratory") },
    ], [t]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                adaptiveRecommendation={adaptiveRecommendation}
                aiFeedback={aiFeedback}
                isRequestingAi={isRequestingAi}
                onAiDiagnosisRequested={requestAiFeedback}
                title={t("sb2_02.title")}
                moduleCode="SB2.02"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t("sb2_02.footer_left")}
                translations={{
                    back: t("sb2_02.back"),
                    check: t("sb2_02.check"),
                    next: t("sb2_02.next"),
                    correct: t("sb2_02.correct"),
                    incorrect: t("sb2_02.incorrect"),
                    ready: t("sb2_02.ready"),
                    monitor_title: t("sb2_02.monitor_title"),
                    difficulty: {
                        basic: t("sb2_02.difficulty.basic"),
                        core: t("sb2_02.difficulty.core"),
                        advanced: t("sb2_02.difficulty.advanced"),
                        elite: t("sb2_02.difficulty.elite"),
                    },
                }}
                monitorContent={<BodySystemVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            title={t("sb2_02.title")}
            moduleCode="SB2.02"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb2_02.footer_left")}
            translations={{
                back: t("sb2_02.back"),
                check: t("sb2_02.check"),
                next: t("sb2_02.next"),
                correct: t("sb2_02.correct"),
                incorrect: t("sb2_02.incorrect"),
                ready: t("sb2_02.ready"),
                monitor_title: t("sb2_02.monitor_title"),
                difficulty: {
                    basic: t("sb2_02.difficulty.basic"),
                    core: t("sb2_02.difficulty.core"),
                    advanced: t("sb2_02.difficulty.advanced"),
                    elite: t("sb2_02.difficulty.elite"),
                },
            }}
            monitorContent={<BodySystemVisualization quest={currentQuest} stage={stage} />}
        >
            {/* Left side: Quest content */}
            <div className="space-y-6">
                {/* Scenario Description */}
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
                    <h3 className="text-cyan-400 font-bold mb-2">{t("sb2_02.objective_title")}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t(`sb2_02.scenarios.${stage.toLowerCase()}`)}
                    </p>
                </div>

                {/* Quest Display */}
                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        {renderMixedText(currentQuest?.promptLatex || "")}
                    </div>

                    <div className="text-cyan-300">
                        <InlineMath math={currentQuest?.expressionLatex || ""} />
                    </div>

                    {/* Input Slots */}
                    <div className="space-y-3">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3">
                                <InlineMath math={slot.labelLatex} />
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                    disabled={lastCheck?.ok}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
