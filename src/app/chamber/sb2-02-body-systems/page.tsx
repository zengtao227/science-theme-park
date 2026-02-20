"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BodySystemVisualization from "@/components/chamber/sb2-02-body-systems/BodySystemVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

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
                        slots: [{ id: "organ", labelLatex: `\\\\text{Organ}`, placeholder: "stomach", expected: "stomach" }],
                        correctLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b1")]
                    },
                    {
                        id: "D-B2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b2"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.digestion")}}`,
                        slots: [{ id: "func", labelLatex: `\\\\text{Function}`, placeholder: "digestion", expected: "digestion" }],
                        correctLatex: `\\text{${t("sb2_02.functions.digestion")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b2")]
                    },
                    {
                        id: "D-B3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        slots: [{ id: "func", labelLatex: `\\\\text{Function}`, placeholder: "absorption", expected: "absorption" }],
                        correctLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b3")]
                    },
                    {
                        id: "D-B4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.bile_production")}}`,
                        slots: [{ id: "func", labelLatex: `\\\\text{Function}`, placeholder: "bile", expected: "bile" }],
                        correctLatex: `\\text{${t("sb2_02.functions.bile_production")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_b4")]
                    },
                    {
                        id: "D-B5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_b5"),
                        expressionLatex: `\\\\text{Organs: 7}`,
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
                        slots: [{ id: "organ", labelLatex: `\\\\text{Organ}`, placeholder: "pancreas", expected: "pancreas" }],
                        correctLatex: `\\text{${t("sb2_02.organs.pancreas")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c1")]
                    },
                    {
                        id: "D-C2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.acid_production")}}`,
                        slots: [{ id: "func", labelLatex: `\\\\text{Function}`, placeholder: "acid", expected: "acid" }],
                        correctLatex: `\\text{${t("sb2_02.functions.acid_production")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c2")]
                    },
                    {
                        id: "D-C3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        slots: [{ id: "reason", labelLatex: `\\\\text{Reason}`, placeholder: "absorption", expected: "absorption" }],
                        correctLatex: `\\text{${t("sb2_02.functions.absorption")}}`,
                        hintLatex: [t("sb2_02.hints.digestive_c3")]
                    },
                    {
                        id: "D-C4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.large_intestine")}}`,
                        targetLatex: `\\\\text{Dehydration}`,
                        slots: [{ id: "result", labelLatex: `\\\\text{Result}`, placeholder: "dehydration", expected: "dehydration" }],
                        correctLatex: `\\\\text{Dehydration}`,
                        hintLatex: [t("sb2_02.hints.digestive_c4")]
                    },
                    {
                        id: "D-C5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_c5"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\\\text{Peristalsis}`,
                        slots: [{ id: "process", labelLatex: `\\\\text{Process}`, placeholder: "peristalsis", expected: "peristalsis" }],
                        correctLatex: `\\\\text{Peristalsis}`,
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
                        targetLatex: `\\\\text{pH increase}`,
                        slots: [{ id: "ph", labelLatex: `\\\\text{pH}`, placeholder: "7", expected: 7 }],
                        correctLatex: `\\\\text{pH} \\approx 7`,
                        hintLatex: [`\\\\text{Neutralizes acid}`]
                    },
                    {
                        id: "D-A2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\\\text{Emulsification}`,
                        slots: [{ id: "reason", labelLatex: `\\\\text{Reason}`, placeholder: "surface area", expected: "surface area" }],
                        correctLatex: `\\\\text{Increases surface area}`,
                        hintLatex: [`\\\\text{Smaller droplets = more surface}`]
                    },
                    {
                        id: "D-A3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.small_intestine")}}`,
                        targetLatex: `\\\\text{Efficiency}`,
                        slots: [{ id: "effect", labelLatex: `\\\\text{Effect}`, placeholder: "more time", expected: "more time" }],
                        correctLatex: `\\\\text{More time for absorption}`,
                        hintLatex: [`\\\\text{Longer = more contact time}`]
                    },
                    {
                        id: "D-A4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.stomach")}}`,
                        targetLatex: `\\\\text{Infection risk}`,
                        slots: [{ id: "risk", labelLatex: `\\\\text{Risk}`, placeholder: "infection", expected: "infection" }],
                        correctLatex: `\\\\text{Bacterial infection}`,
                        hintLatex: [`\\\\text{Acid kills bacteria}`]
                    },
                    {
                        id: "D-A5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_a5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.liver")}}`,
                        targetLatex: `\\\\text{Metabolism}`,
                        slots: [{ id: "process", labelLatex: `\\\\text{Process}`, placeholder: "metabolism", expected: "metabolism" }],
                        correctLatex: `\\\\text{Metabolism}`,
                        hintLatex: [`\\\\text{Processing nutrients}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "D-E1", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e1"),
                        expressionLatex: `\\text{Crohn's disease}`,
                        targetLatex: `\\\\text{Intestines}`,
                        slots: [{ id: "organs", labelLatex: `\\\\text{Organs}`, placeholder: "intestines", expected: "intestines" }],
                        correctLatex: `\\text{${t("sb2_02.organs.intestines")}}`,
                        hintLatex: [`\\\\text{Inflammatory bowel disease}`]
                    },
                    {
                        id: "D-E2", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e2"),
                        expressionLatex: `\\\\text{Lactose intolerance}`,
                        targetLatex: `\\\\text{Lactase}`,
                        slots: [{ id: "enzyme", labelLatex: `\\\\text{Enzyme}`, placeholder: "lactase", expected: "lactase" }],
                        correctLatex: `\\\\text{Lactase}`,
                        hintLatex: [`\\\\text{Breaks down lactose}`]
                    },
                    {
                        id: "D-E3", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e3"),
                        expressionLatex: `\\\\text{Enteric nervous system}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "500000000", expected: 500000000 }],
                        correctLatex: `n \\approx 500 \\\\text{ million}`,
                        hintLatex: [`\\\\text{Second brain}`]
                    },
                    {
                        id: "D-E4", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e4"),
                        expressionLatex: `\\\\text{Celiac disease}`,
                        targetLatex: `\\\\text{Malabsorption}`,
                        slots: [{ id: "consequence", labelLatex: `\\\\text{Result}`, placeholder: "malabsorption", expected: "malabsorption" }],
                        correctLatex: `\\\\text{Malabsorption}`,
                        hintLatex: [`\\\\text{Damaged villi}`]
                    },
                    {
                        id: "D-E5", difficulty, stage, systemType: "digestive",
                        promptLatex: t("sb2_02.prompts.digestive_e5"),
                        expressionLatex: `\\text{${t("sb2_02.systems.digestive")}}`,
                        targetLatex: `\\\\text{Comparison}`,
                        slots: [{ id: "comparison", labelLatex: `\\\\text{Type}`, placeholder: "mechanical", expected: "mechanical" }],
                        correctLatex: `\\\\text{Mechanical + Chemical}`,
                        hintLatex: [`\\\\text{Physical vs enzymatic}`]
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
                        slots: [{ id: "func", labelLatex: `\\\\text{Function}`, placeholder: "pump", expected: "pump" }],
                        correctLatex: `\\text{${t("sb2_02.functions.pump_blood")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_b1")]
                    },
                    {
                        id: "C-B2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b2"),
                        expressionLatex: `\\\\text{Blood vessels}`,
                        targetLatex: `\\text{${t("sb2_02.functions.return_blood")}}`,
                        slots: [{ id: "func", labelLatex: `\\\\text{Function}`, placeholder: "return", expected: "return" }],
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
                        expressionLatex: `\\\\text{Gas exchange}`,
                        targetLatex: `\\\\text{CO}_2`,
                        slots: [{ id: "gas", labelLatex: `\\\\text{Gas}`, placeholder: "CO2", expected: "CO2" }],
                        correctLatex: `\\\\text{Carbon dioxide (CO}_2\\\\text{)}`,
                        hintLatex: [t("sb2_02.hints.circulatory_b4")]
                    },
                    {
                        id: "C-B5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_b5"),
                        expressionLatex: `\\\\text{2 atria + 2 ventricles}`,
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
                        targetLatex: `\\\\text{Pulmonary}`,
                        slots: [{ id: "circulation", labelLatex: `\\\\text{Type}`, placeholder: "pulmonary", expected: "pulmonary" }],
                        correctLatex: `\\\\text{Pulmonary circulation}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c1")]
                    },
                    {
                        id: "C-C2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\\\text{Reason}`,
                        slots: [{ id: "reason", labelLatex: `\\\\text{Reason}`, placeholder: "body", expected: "body" }],
                        correctLatex: `\\\\text{Pumps to entire body}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c2")]
                    },
                    {
                        id: "C-C3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.capillaries")}}`,
                        targetLatex: `\\text{${t("sb2_02.functions.gas_exchange")}}`,
                        slots: [{ id: "func", labelLatex: `\\\\text{Function}`, placeholder: "exchange", expected: "exchange" }],
                        correctLatex: `\\text{${t("sb2_02.functions.gas_exchange")}}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c3")]
                    },
                    {
                        id: "C-C4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c4"),
                        expressionLatex: `\\\\text{Blood pressure}`,
                        targetLatex: `\\\\text{120/80}`,
                        slots: [{ id: "bp", labelLatex: `\\\\text{BP}`, placeholder: "120/80", expected: "120/80" }],
                        correctLatex: `\\\\text{120/80 mmHg}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c4")]
                    },
                    {
                        id: "C-C5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_c5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\\\text{Heart rate}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "heart rate", expected: "heart rate" }],
                        correctLatex: `\\\\text{Heart rate}`,
                        hintLatex: [t("sb2_02.hints.circulatory_c5")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "C-A1", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a1"),
                        expressionLatex: `\\\\text{HR} = 70 \\\\text{ bpm, SV} = 70 \\\\text{ mL}`,
                        targetLatex: `\\\\text{CO}`,
                        slots: [{ id: "co", labelLatex: `\\\\text{CO (L/min)}`, placeholder: "5", expected: 5 }],
                        correctLatex: `\\\\text{CO} = 5 \\\\text{ L/min}`,
                        hintLatex: [`\\\\text{CO = HR × SV}`]
                    },
                    {
                        id: "C-A2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.arteries")}}`,
                        targetLatex: `\\\\text{Elasticity}`,
                        slots: [{ id: "property", labelLatex: `\\\\text{Property}`, placeholder: "elastic", expected: "elastic" }],
                        correctLatex: `\\\\text{Elastic walls absorb pressure}`,
                        hintLatex: [`\\\\text{Stretch and recoil}`]
                    },
                    {
                        id: "C-A3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.veins")}}`,
                        targetLatex: `\\\\text{Varicose veins}`,
                        slots: [{ id: "condition", labelLatex: `\\\\text{Condition}`, placeholder: "varicose", expected: "varicose" }],
                        correctLatex: `\\\\text{Varicose veins}`,
                        hintLatex: [`\\\\text{Blood pools in veins}`]
                    },
                    {
                        id: "C-A4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a4"),
                        expressionLatex: `\\\\text{Hemoglobin}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "4", expected: 4 }],
                        correctLatex: `n = 4`,
                        hintLatex: [`\\\\text{4 binding sites}`]
                    },
                    {
                        id: "C-A5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_a5"),
                        expressionLatex: `\\text{${t("sb2_02.organs.heart")}}`,
                        targetLatex: `\\\\text{SA node}`,
                        slots: [{ id: "node", labelLatex: `\\\\text{Node}`, placeholder: "SA", expected: "SA" }],
                        correctLatex: `\\\\text{SA node (sinoatrial)}`,
                        hintLatex: [`\\\\text{Natural pacemaker}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "C-E1", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e1"),
                        expressionLatex: `\\\\text{Atherosclerosis}`,
                        targetLatex: `\\\\text{Heart attack}`,
                        slots: [{ id: "consequence", labelLatex: `\\\\text{Risk}`, placeholder: "heart attack", expected: "heart attack" }],
                        correctLatex: `\\\\text{Heart attack, stroke}`,
                        hintLatex: [`\\\\text{Blocked arteries}`]
                    },
                    {
                        id: "C-E2", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e2"),
                        expressionLatex: `\\\\text{Frank-Starling}`,
                        targetLatex: `\\\\text{Stretch}`,
                        slots: [{ id: "mechanism", labelLatex: `\\\\text{Factor}`, placeholder: "stretch", expected: "stretch" }],
                        correctLatex: `\\\\text{Increased stretch → stronger contraction}`,
                        hintLatex: [`\\\\text{More blood in = more out}`]
                    },
                    {
                        id: "C-E3", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e3"),
                        expressionLatex: `\\\\text{BP regulation}`,
                        targetLatex: `\\\\text{Mechanisms}`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "3", expected: 3 }],
                        correctLatex: `\\\\text{Baroreceptors, RAAS, ANP}`,
                        hintLatex: [`\\\\text{Neural, hormonal, renal}`]
                    },
                    {
                        id: "C-E4", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e4"),
                        expressionLatex: `\\\\text{Heart failure}`,
                        targetLatex: `\\\\text{Compensation}`,
                        slots: [{ id: "mechanism", labelLatex: `\\\\text{Response}`, placeholder: "hypertrophy", expected: "hypertrophy" }],
                        correctLatex: `\\\\text{Cardiac hypertrophy}`,
                        hintLatex: [`\\\\text{Heart enlarges}`]
                    },
                    {
                        id: "C-E5", difficulty, stage, systemType: "circulatory",
                        promptLatex: t("sb2_02.prompts.circulatory_e5"),
                        expressionLatex: `\\\\text{Rest: 5 L/min, Exercise: 25 L/min}`,
                        targetLatex: `\\\\text{Increase}`,
                        slots: [{ id: "factor", labelLatex: `\\\\text{Factor}`, placeholder: "5", expected: 5 }],
                        correctLatex: `5\\times \\\\text{ increase}`,
                        hintLatex: [`\\\\text{25/5 = 5}`]
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
                        slots: [{ id: "struct", labelLatex: `\\\\text{Structure}`, placeholder: "alveoli", expected: "alveoli" }],
                        correctLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_b1")]
                    },
                    {
                        id: "R-B2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b2"),
                        expressionLatex: `\\\\text{Gas exchange}`,
                        targetLatex: `\\\\text{O}_2`,
                        slots: [{ id: "gas", labelLatex: `\\\\text{Gas}`, placeholder: "O2", expected: "O2" }],
                        correctLatex: `\\\\text{Oxygen (O}_2\\\\text{)}`,
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
                        slots: [{ id: "func", labelLatex: `\\\\text{Function}`, placeholder: "breathing", expected: "breathing" }],
                        correctLatex: `\\text{${t("sb2_02.functions.breathing")}}`,
                        hintLatex: [t("sb2_02.hints.respiratory_b4")]
                    },
                    {
                        id: "R-B5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_b5"),
                        expressionLatex: `\\\\text{Respiratory pathway}`,
                        targetLatex: `\\text{${t("sb2_02.organs.larynx")}}`,
                        slots: [{ id: "organ", labelLatex: `\\\\text{Organ}`, placeholder: "larynx", expected: "larynx" }],
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
                        targetLatex: `\\\\text{Support}`,
                        slots: [{ id: "reason", labelLatex: `\\\\text{Reason}`, placeholder: "support", expected: "support" }],
                        correctLatex: `\\\\text{Prevents collapse}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c1")]
                    },
                    {
                        id: "R-C2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c2"),
                        expressionLatex: `\\text{${t("sb2_02.organs.bronchi")}}`,
                        targetLatex: `\\\\text{Bronchial tree}`,
                        slots: [{ id: "structure", labelLatex: `\\\\text{Structure}`, placeholder: "tree", expected: "tree" }],
                        correctLatex: `\\\\text{Bronchial tree}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c2")]
                    },
                    {
                        id: "R-C3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        targetLatex: `\\\\text{Diffusion}`,
                        slots: [{ id: "reason", labelLatex: `\\\\text{Reason}`, placeholder: "diffusion", expected: "diffusion" }],
                        correctLatex: `\\\\text{Allows gas diffusion}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c3")]
                    },
                    {
                        id: "R-C4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.diaphragm")}}`,
                        targetLatex: `\\\\text{Pressure}`,
                        slots: [{ id: "mechanism", labelLatex: `\\\\text{Mechanism}`, placeholder: "pressure", expected: "pressure" }],
                        correctLatex: `\\\\text{Pressure difference}`,
                        hintLatex: [t("sb2_02.hints.respiratory_c4")]
                    },
                    {
                        id: "R-C5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_c5"),
                        expressionLatex: `\\\\text{Breathing}`,
                        targetLatex: `\\\\text{Respiratory rate}`,
                        slots: [{ id: "term", labelLatex: `\\\\text{Term}`, placeholder: "rate", expected: "rate" }],
                        correctLatex: `\\\\text{Respiratory rate}`,
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
                        targetLatex: `\\\\text{Area}`,
                        slots: [{ id: "area", labelLatex: `\\\\text{Area (m}^2\\\\text{)}`, placeholder: "70", expected: 70 }],
                        correctLatex: `\\approx 70 \\\\text{ m}^2`,
                        hintLatex: [`\\\\text{Tennis court size}`]
                    },
                    {
                        id: "R-A2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a2"),
                        expressionLatex: `\\\\text{TV} = 500 \\\\text{ mL, RR} = 15 \\\\text{ breaths/min}`,
                        targetLatex: `\\\\text{MV}`,
                        slots: [{ id: "mv", labelLatex: `\\\\text{MV (L/min)}`, placeholder: "7.5", expected: 7.5 }],
                        correctLatex: `\\\\text{MV} = 7.5 \\\\text{ L/min}`,
                        hintLatex: [`\\\\text{MV = TV × RR}`]
                    },
                    {
                        id: "R-A3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a3"),
                        expressionLatex: `\\text{${t("sb2_02.organs.alveoli")}}`,
                        targetLatex: `\\\\text{Gradient}`,
                        slots: [{ id: "mechanism", labelLatex: `\\\\text{Mechanism}`, placeholder: "gradient", expected: "gradient" }],
                        correctLatex: `\\\\text{Concentration gradient}`,
                        hintLatex: [`\\\\text{High to low concentration}`]
                    },
                    {
                        id: "R-A4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a4"),
                        expressionLatex: `\\text{${t("sb2_02.organs.larynx")}}`,
                        targetLatex: `\\\\text{Vibration}`,
                        slots: [{ id: "mechanism", labelLatex: `\\\\text{Mechanism}`, placeholder: "vibration", expected: "vibration" }],
                        correctLatex: `\\\\text{Vocal cord vibration}`,
                        hintLatex: [`\\\\text{Air vibrates cords}`]
                    },
                    {
                        id: "R-A5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_a5"),
                        expressionLatex: `\\\\text{Surfactant}`,
                        targetLatex: `\\\\text{Collapse}`,
                        slots: [{ id: "consequence", labelLatex: `\\\\text{Result}`, placeholder: "collapse", expected: "collapse" }],
                        correctLatex: `\\\\text{Alveolar collapse}`,
                        hintLatex: [`\\\\text{Surface tension too high}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "R-E1", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e1"),
                        expressionLatex: `\\\\text{Asthma}`,
                        targetLatex: `\\\\text{Reduced airflow}`,
                        slots: [{ id: "consequence", labelLatex: `\\\\text{Result}`, placeholder: "airflow", expected: "airflow" }],
                        correctLatex: `\\\\text{Reduced airflow, hypoxia}`,
                        hintLatex: [`\\\\text{Narrowed airways}`]
                    },
                    {
                        id: "R-E2", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e2"),
                        expressionLatex: `\\\\text{COPD}`,
                        targetLatex: `\\\\text{Compensation}`,
                        slots: [{ id: "mechanism", labelLatex: `\\\\text{Response}`, placeholder: "breathing", expected: "breathing" }],
                        correctLatex: `\\\\text{Increased breathing rate}`,
                        hintLatex: [`\\\\text{Breathe faster/deeper}`]
                    },
                    {
                        id: "R-E3", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e3"),
                        expressionLatex: `\\\\text{pH regulation}`,
                        targetLatex: `\\\\text{CO}_2`,
                        slots: [{ id: "mechanism", labelLatex: `\\\\text{Factor}`, placeholder: "CO2", expected: "CO2" }],
                        correctLatex: `\\\\text{CO}_2 \\leftrightarrow \\\\text{H}^+ + \\\\text{HCO}_3^-`,
                        hintLatex: [`\\\\text{CO2 forms carbonic acid}`]
                    },
                    {
                        id: "R-E4", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e4"),
                        expressionLatex: `\\\\text{High altitude}`,
                        targetLatex: `\\\\text{Adaptation}`,
                        slots: [{ id: "adaptation", labelLatex: `\\\\text{Response}`, placeholder: "RBC", expected: "RBC" }],
                        correctLatex: `\\\\text{Increased RBC production}`,
                        hintLatex: [`\\\\text{More red blood cells}`]
                    },
                    {
                        id: "R-E5", difficulty, stage, systemType: "respiratory",
                        promptLatex: t("sb2_02.prompts.respiratory_e5"),
                        expressionLatex: `\\\\text{Pneumonia}`,
                        targetLatex: `\\\\text{Reduction}`,
                        slots: [{ id: "percentage", labelLatex: `\\\\text{\\%}`, placeholder: "50", expected: 50 }],
                        correctLatex: `\\approx 50\\% \\\\text{ reduction}`,
                        hintLatex: [`\\\\text{Fluid blocks gas exchange}`]
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
                        <InlineMath math={currentQuest?.promptLatex || ""} />
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
