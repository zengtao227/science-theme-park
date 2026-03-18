"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BodySystemVisualization from "@/components/chamber/sb2-02-body-systems/BodySystemVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";

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
                        slots: [{ id: "organ", labelLatex: `\\text{${t("sb2_02.labels.organ")}}`, placeholder: t("sb2_02.placeholders.stomach"), expected: "stomach" }],
                        correctLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b1")]
                    },
                    {
                        id: "D-B2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b2"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.digestion")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: t("sb2_02.placeholders.digestion"), expected: "digestion" }],
                        correctLatex: `\\text{${t("sb2_02.functions.digestion")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b2")]
                    },
                    {
                        id: "D-B3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: t("sb2_02.placeholders.absorption"), expected: "absorption" }],
                        correctLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b3")]
                    },
                    {
                        id: "D-B4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.bile_production")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: t("sb2_02.placeholders.bile"), expected: "bile" }],
                        correctLatex: `\\text{${t("sb2_02.functions.bile_production")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b4")]
                    },
                    {
                        id: "D-B5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.organs_7")}}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: t("sb2_02.placeholders.v_7"), expected: 7 }],
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
                        slots: [{ id: "organ", labelLatex: `\\text{${t("sb2_02.labels.organ")}}`, placeholder: t("sb2_02.placeholders.pancreas"), expected: t("sb2_02.organs.pancreas") }],
                        correctLatex: `\\text{${t("sb2_02.organs.pancreas")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c1")]
                    },
                    {
                        id: "D-C2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.acid_production")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: t("sb2_02.placeholders.acid"), expected: t("sb2_02.labels.acid_production") || "acid" }],
                        correctLatex: `\\text{${t("sb2_02.functions.acid_production")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c2")]
                    },
                    {
                        id: "D-C3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: t("sb2_02.placeholders.absorption"), expected: t("sb2_02.functions.absorption") }],
                        correctLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c3")]
                    },
                    {
                        id: "D-C4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.large_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.dehydration")}}`,
                        slots: [{ id: "result", labelLatex: `\\text{${t("sb2_02.labels.result")}}`, placeholder: t("sb2_02.placeholders.dehydration"), expected: t("sb2_02.labels.dehydration") }],
                        correctLatex: `\\text{${t("sb2_02.labels.dehydration")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c4")]
                    },
                    {
                        id: "D-C5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c5"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.peristalsis")}}`,
                        slots: [{ id: "process", labelLatex: `\\text{${t("sb2_02.labels.process")}}`, placeholder: t("sb2_02.placeholders.peristalsis"), expected: t("sb2_02.labels.peristalsis") }],
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
                        targetLatex: `\\text{${t("sb2_02.answers.ph_increase")}}`,
                        slots: [{ id: "ph", labelLatex: `\\text{pH}`, placeholder: t("sb2_02.placeholders.v_7"), expected: 7 }],
                        correctLatex: `\\text{pH} \\approx 7`,
                        hintLatex: [t("sb2_02.hints.digestive_a1")]
                    },
                    {
                        id: "D-A2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.surface_area")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: t("sb2_02.placeholders.surface_area"), expected: t("sb2_02.labels.surface_area") }],
                        correctLatex: `\\text{${t("sb2_02.labels.surface_area")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_a2")]
                    },
                    {
                        id: "D-A3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.efficiency")}}`,
                        slots: [{ id: "effect", labelLatex: `\\text{${t("sb2_02.labels.effect")}}`, placeholder: t("sb2_02.placeholders.more_time"), expected: "more time" }],
                        correctLatex: `\\text{${t("sb2_02.answers.more_time_absorption")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_a3")]
                    },
                    {
                        id: "D-A4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.infection_risk")}}`,
                        slots: [{ id: "risk", labelLatex: `\\text{${t("sb2_02.labels.risk")}}`, placeholder: t("sb2_02.placeholders.infection"), expected: "infection" }],
                        correctLatex: `\\text{${t("sb2_02.answers.bacterial_infection")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_a4")]
                    },
                    {
                        id: "D-A5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.metabolism")}}`,
                        slots: [{ id: "process", labelLatex: `\\text{${t("sb2_02.labels.process")}}`, placeholder: t("sb2_02.placeholders.metabolism"), expected: "metabolism" }],
                        correctLatex: `\\text{${t("sb2_02.answers.metabolism")}}`,
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
                        targetLatex: `\\text{${t("sb2_02.organs.intestines")}}`,
                        slots: [{ id: "organs", labelLatex: `\\text{${t("sb2_02.labels.organs")}}`, placeholder: t("sb2_02.placeholders.intestines"), expected: "intestines" }],
                        correctLatex: `\\text{${t("sb2_02.organs.intestines")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_e1")]
                    },
                    {
                        id: "D-E2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.lactose_intolerance")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.lactase")}}`,
                        slots: [{ id: "enzyme", labelLatex: `\\text{${t("sb2_02.labels.enzyme")}}`, placeholder: t("sb2_02.placeholders.lactase"), expected: "lactase" }],
                        correctLatex: `\\text{${t("sb2_02.answers.lactase")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_e2")]
                    },
                    {
                        id: "D-E3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e3"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.enteric_nervous")}}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: t("sb2_02.placeholders.v_500000000"), expected: 500000000 }],
                        correctLatex: `n \\approx 500 \\text{ million}`,
                        hintLatex: [t("sb2_02.hints.digestive_e3")]
                    },
                    {
                        id: "D-E4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.celiac")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.malabsorption")}}`,
                        slots: [{ id: "consequence", labelLatex: `\\text{${t("sb2_02.labels.result")}}`, placeholder: t("sb2_02.placeholders.malabsorption"), expected: "malabsorption" }],
                        correctLatex: `\\text{${t("sb2_02.answers.malabsorption")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_e4")]
                    },
                    {
                        id: "D-E5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e5"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.comparison")}}`,
                        slots: [{ id: "comparison", labelLatex: `\\text{${t("sb2_02.labels.type")}}`, placeholder: t("sb2_02.placeholders.mechanical"), expected: "mechanical" }],
                        correctLatex: `\\text{${t("sb2_02.answers.mechanical_chemical")}}`,
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
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: t("sb2_02.placeholders.pump"), expected: "pump" }],
                        correctLatex: `\\text{${t("sb2_02.functions.pump_blood")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_b1")]
                    },
                    {
                        id: "C-B2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.blood_vessels")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.return_blood")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: t("sb2_02.placeholders.return"), expected: "return" }],
                        correctLatex: `\\text{${t("sb2_02.functions.return_blood")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_b2")]
                    },
                    {
                        id: "C-B3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}, ${t("sb2_02.organs.arteries")}, ${t("sb2_02.organs.veins")}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: t("sb2_02.placeholders.v_3"), expected: 3 }],
                        correctLatex: `n = 3`,
                        hintLatex: [t("sb2_02.hints.circulatory_b3")]
                    },
                    {
                        id: "C-B4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.gas_exchange")}}`,
                        targetLatex: `\\text{CO}_2`,
                        slots: [{ id: "gas", labelLatex: `\\text{${t("sb2_02.labels.gas")}}`, placeholder: t("sb2_02.placeholders.co2"), expected: "CO2" }],
                        correctLatex: t("sb2_02.corrects.carbon_dioxide"),
                        hintLatex: [t("sb2_02.hints.circulatory_b4")]
                    },
                    {
                        id: "C-B5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.atria_ventricles")}}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: t("sb2_02.placeholders.v_4"), expected: 4 }],
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
                        targetLatex: `\\text{${t("sb2_02.answers.pulmonary")}}`,
                        slots: [{ id: "circulation", labelLatex: `\\text{${t("sb2_02.labels.type")}}`, placeholder: t("sb2_02.placeholders.pulmonary"), expected: "pulmonary" }],
                        correctLatex: `\\text{${t("sb2_02.answers.pulmonary_circulation")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c1")]
                    },
                    {
                        id: "C-C2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.reason")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: t("sb2_02.placeholders.body"), expected: t("sb2_02.labels.body") }],
                        correctLatex: `\\text{${t("sb2_02.labels.body")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c2")]
                    },
                    {
                        id: "C-C3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.capillaries")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.gas_exchange")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: t("sb2_02.placeholders.exchange"), expected: "exchange" }],
                        correctLatex: `\\text{${t("sb2_02.functions.gas_exchange")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c3")]
                    },
                    {
                        id: "C-C4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.blood_pressure")}}`,
                        targetLatex: `\\text{120/80}`,
                        slots: [{ id: "bp", labelLatex: `\\text{${t("sb2_02.labels.bp")}}`, placeholder: t("sb2_02.placeholders.v_120_slash_80"), expected: "120/80" }],
                        correctLatex: `\\text{120/80 mmHg}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c4")]
                    },
                    {
                        id: "C-C5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.heart_rate")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sb2_02.labels.term")}}`, placeholder: t("sb2_02.placeholders.heart_rate"), expected: "heart rate" }],
                        correctLatex: `\\text{${t("sb2_02.answers.heart_rate")}}`,
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
                        slots: [{ id: "co", labelLatex: `\\text{${t("sb2_02.labels.co_l_min")}}`, placeholder: t("sb2_02.placeholders.v_5"), expected: 5 }],
                        correctLatex: `\\text{CO} = 5 \\text{ L/min}`,
                        hintLatex: [t("sb2_02.hints.circulatory_a1")]
                    },
                    {
                        id: "C-A2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.arteries")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.elasticity")}}`,
                        slots: [{ id: "property", labelLatex: `\\text{${t("sb2_02.labels.property")}}`, placeholder: t("sb2_02.placeholders.elastic"), expected: "elastic" }],
                        correctLatex: `\\text{${t("sb2_02.answers.elastic_walls")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_a2")]
                    },
                    {
                        id: "C-A3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.veins")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.varicose_veins")}}`,
                        slots: [{ id: "condition", labelLatex: `\\text{${t("sb2_02.labels.condition")}}`, placeholder: t("sb2_02.placeholders.varicose"), expected: "varicose" }],
                        correctLatex: `\\text{${t("sb2_02.answers.varicose_veins")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_a3")]
                    },
                    {
                        id: "C-A4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.hemoglobin")}}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: t("sb2_02.placeholders.v_4"), expected: 4 }],
                        correctLatex: `n = 4`,
                        hintLatex: [t("sb2_02.hints.circulatory_a4")]
                    },
                    {
                        id: "C-A5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.sa_node")}}`,
                        slots: [{ id: "node", labelLatex: `\\text{${t("sb2_02.labels.node")}}`, placeholder: t("sb2_02.placeholders.sa"), expected: "SA" }],
                        correctLatex: `\\text{${t("sb2_02.answers.sa_node_full")}}`,
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
                        targetLatex: `\\text{${t("sb2_02.answers.heart_attack")}}`,
                        slots: [{ id: "consequence", labelLatex: `\\text{${t("sb2_02.labels.risk")}}`, placeholder: t("sb2_02.placeholders.heart_attack"), expected: "heart attack" }],
                        correctLatex: `\\text{${t("sb2_02.answers.heart_attack_stroke")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_e1")]
                    },
                    {
                        id: "C-E2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.frank_starling")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.stretch")}}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.factor")}}`, placeholder: t("sb2_02.placeholders.stretch"), expected: "stretch" }],
                        correctLatex: `\\text{${t("sb2_02.answers.increased_stretch")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_e2")]
                    },
                    {
                        id: "C-E3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e3"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.bp_regulation")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.mechanisms")}}`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: t("sb2_02.placeholders.v_3"), expected: 3 }],
                        correctLatex: t("sb2_02.corrects.baroreceptors_raas_anp"),
                        hintLatex: [t("sb2_02.hints.circulatory_e3")]
                    },
                    {
                        id: "C-E4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.heart_failure")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.compensation")}}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.response")}}`, placeholder: t("sb2_02.placeholders.hypertrophy"), expected: "hypertrophy" }],
                        correctLatex: `\\text{${t("sb2_02.answers.cardiac_hypertrophy")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_e4")]
                    },
                    {
                        id: "C-E5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.rest_exercise_co")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.increase")}}`,
                        slots: [{ id: "factor", labelLatex: `\\text{${t("sb2_02.labels.factor")}}`, placeholder: t("sb2_02.placeholders.v_5"), expected: 5 }],
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
                        slots: [{ id: "struct", labelLatex: `\\text{${t("sb2_02.labels.structure")}}`, placeholder: t("sb2_02.placeholders.alveoli"), expected: "alveoli" }],
                        correctLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_b1")]
                    },
                    {
                        id: "R-B2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.gas_exchange")}}`,
                        targetLatex: `\\text{O}_2`,
                        slots: [{ id: "gas", labelLatex: `\\text{${t("sb2_02.labels.gas")}}`, placeholder: t("sb2_02.placeholders.o2"), expected: "O2" }],
                        correctLatex: t("sb2_02.corrects.oxygen"),
                        hintLatex: [t("sb2_02.hints.respiratory_b2")]
                    },
                    {
                        id: "R-B3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.nose")}}, ${t("sb2_02.organs.pharynx")}, ${t("sb2_02.organs.larynx")}, ${t("sb2_02.organs.trachea")}, ${t("sb2_02.organs.lungs")}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: t("sb2_02.placeholders.v_5"), expected: 5 }],
                        correctLatex: `n = 5`,
                        hintLatex: [t("sb2_02.hints.respiratory_b3")]
                    },
                    {
                        id: "R-B4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.diaphragm")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.breathing")}}`,
                        slots: [{ id: "func", labelLatex: `\\text{${t("sb2_02.labels.function")}}`, placeholder: t("sb2_02.placeholders.breathing"), expected: "breathing" }],
                        correctLatex: `\\text{${t("sb2_02.functions.breathing")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_b4")]
                    },
                    {
                        id: "R-B5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.respiratory_pathway")}}`,
                        targetLatex: `\\text{${t("sb2_02.organs.larynx")}}`,
                        slots: [{ id: "organ", labelLatex: `\\text{${t("sb2_02.labels.organ")}}`, placeholder: t("sb2_02.placeholders.larynx"), expected: "larynx" }],
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
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: t("sb2_02.placeholders.support"), expected: t("sb2_02.labels.support") }],
                        correctLatex: `\\text{${t("sb2_02.labels.support")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c1")]
                    },
                    {
                        id: "R-C2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.bronchi")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.tree")}}`,
                        slots: [{ id: "structure", labelLatex: `\\text{${t("sb2_02.labels.structure")}}`, placeholder: t("sb2_02.placeholders.tree"), expected: t("sb2_02.labels.tree") }],
                        correctLatex: `\\text{${t("sb2_02.labels.tree")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c2")]
                    },
                    {
                        id: "R-C3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.diffusion")}}`,
                        slots: [{ id: "reason", labelLatex: `\\text{${t("sb2_02.labels.reason")}}`, placeholder: t("sb2_02.placeholders.diffusion"), expected: t("sb2_02.labels.diffusion") }],
                        correctLatex: `\\text{${t("sb2_02.labels.diffusion")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c3")]
                    },
                    {
                        id: "R-C4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.diaphragm")}}`,
                        targetLatex: `\\text{${t("sb2_02.labels.pressure")}}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.mechanism")}}`, placeholder: t("sb2_02.placeholders.pressure"), expected: t("sb2_02.labels.pressure") }],
                        correctLatex: `\\text{${t("sb2_02.labels.pressure")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c4")]
                    },
                    {
                        id: "R-C5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.breathing")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.respiratory_rate")}}`,
                        slots: [{ id: "term", labelLatex: `\\text{${t("sb2_02.labels.term")}}`, placeholder: t("sb2_02.placeholders.rate"), expected: "rate" }],
                        correctLatex: `\\text{${t("sb2_02.answers.respiratory_rate")}}`,
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
                        targetLatex: `\\text{${t("sb2_02.answers.area")}}`,
                        slots: [{ id: "area", labelLatex: t("sb2_02.labels.area_m2"), placeholder: t("sb2_02.placeholders.v_70"), expected: 70 }],
                        correctLatex: `\\approx 70 \\text{ m}^{2}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a1")]
                    },
                    {
                        id: "R-A2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a2"),
                        expressionLatex: `\\text{TV} = 500 \\text{ mL, RR} = 15 \\text{ breaths/min}`,
                        targetLatex: `\\text{MV}`,
                        slots: [{ id: "mv", labelLatex: `\\text{${t("sb2_02.labels.mv_l_min")}}`, placeholder: t("sb2_02.placeholders.v_7_dot_5"), expected: 7.5 }],
                        correctLatex: `\\text{MV} = 7.5 \\text{ L/min}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a2")]
                    },
                    {
                        id: "R-A3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.gradient")}}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.mechanism")}}`, placeholder: t("sb2_02.placeholders.gradient"), expected: "gradient" }],
                        correctLatex: `\\text{${t("sb2_02.answers.concentration_gradient")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a3")]
                    },
                    {
                        id: "R-A4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.larynx")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.vibration")}}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.mechanism")}}`, placeholder: t("sb2_02.placeholders.vibration"), expected: "vibration" }],
                        correctLatex: `\\text{${t("sb2_02.answers.vocal_cord_vibration")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_a4")]
                    },
                    {
                        id: "R-A5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.surfactant")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.collapse")}}`,
                        slots: [{ id: "consequence", labelLatex: `\\text{${t("sb2_02.labels.result")}}`, placeholder: t("sb2_02.placeholders.collapse"), expected: "collapse" }],
                        correctLatex: `\\text{${t("sb2_02.answers.alveolar_collapse")}}`,
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
                        targetLatex: `\\text{${t("sb2_02.answers.reduced_airflow")}}`,
                        slots: [{ id: "consequence", labelLatex: `\\text{${t("sb2_02.labels.result")}}`, placeholder: t("sb2_02.placeholders.airflow"), expected: "airflow" }],
                        correctLatex: `\\text{${t("sb2_02.answers.reduced_airflow_hypoxia")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_e1")]
                    },
                    {
                        id: "R-E2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e2"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.copd")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.compensation")}}`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.response")}}`, placeholder: t("sb2_02.placeholders.breathing"), expected: "breathing" }],
                        correctLatex: `\\text{${t("sb2_02.answers.increased_breathing_rate")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_e2")]
                    },
                    {
                        id: "R-E3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e3"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.ph_regulation")}}`,
                        targetLatex: `\\text{CO}_2`,
                        slots: [{ id: "mechanism", labelLatex: `\\text{${t("sb2_02.labels.factor")}}`, placeholder: t("sb2_02.placeholders.co2"), expected: "CO2" }],
                        correctLatex: `\\text{CO}_2 \\leftrightarrow \\text{H}^+ + \\text{HCO}_3^-`,
                        hintLatex: [t("sb2_02.hints.respiratory_e3")]
                    },
                    {
                        id: "R-E4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e4"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.high_altitude")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.adaptation")}}`,
                        slots: [{ id: "adaptation", labelLatex: `\\text{${t("sb2_02.labels.response")}}`, placeholder: t("sb2_02.placeholders.rbc"), expected: "RBC" }],
                        correctLatex: `\\text{${t("sb2_02.answers.increased_rbc")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_e4")]
                    },
                    {
                        id: "R-E5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e5"),
                        expressionLatex: `\\text{${t("sb2_02.expressions.pneumonia")}}`,
                        targetLatex: `\\text{${t("sb2_02.answers.reduction")}}`,
                        slots: [{ id: "percentage", labelLatex: `\\text{\\%}`, placeholder: t("sb2_02.placeholders.v_50"), expected: 50 }],
                        correctLatex: `\\approx 50\\% \\text{ reduction}`,
                        hintLatex: [t("sb2_02.hints.respiratory_e5")]
                    }
                );
            }
        }

        return quests;
    }, [t]);

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
                        <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
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
