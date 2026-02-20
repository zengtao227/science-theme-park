import { Quest, Difficulty, Stage } from "./sp1-01/domain/types";
import { getAllQuests } from "./sp1-01/data/questLoader";

/**
 * SP1.01 Integrity Adapter
 * This adapter ensures 100% of data from the original JSONs is preserved
 * while shifting all text content to the i18n system.
 */
export function buildSP101Pool(difficulty: Difficulty, stage: Stage, t: any): any[] {
    const allRaw = getAllQuests();
    const filtered = allRaw.filter(q => q.difficulty === difficulty && q.stage === stage);

    return filtered.map(q => {
        const baseKey = `sp1_01.${q.id}`;

        // Preservation check for Options
        const options = q.type === 'MULTIPLE_CHOICE' ? (q.options || []).map((opt, idx) => ({
            id: opt.id,
            text: t(`${baseKey}.options.${idx}.text`) || opt.text.en
        })) : [];

        // Formatting Correct Answer for CheckStatus display
        const unit = t(`${baseKey}.unit`) || q.validation?.correctAnswer?.units || "";
        const correctValue = q.validation?.correctAnswer?.value;
        const correctLatex = `\\\\text{${correctValue}${unit ? ' ' + unit : ''}}`;

        return {
            ...q,
            promptLatex: `\\\\text{${t(`${baseKey}.prompt`) || q.content.en}}`,
            scenarioTitle: t(`${baseKey}.scenario`),
            scenarioDesc: t(`${baseKey}.scenario_desc`),
            feedback: {
                correct: `\\\\text{${t(`${baseKey}.feedback.correct`) || q.feedback.correct.en}}`,
                incorrect: `\\\\text{${t(`${baseKey}.feedback.incorrect`) || q.feedback.incorrect.en}}`
            },
            targetLatex: `\\\\text{${t("sp1_01.labels.answer") || "Answer"}}`,
            correctLatex,
            options,
            slots: q.type === 'MULTIPLE_CHOICE' ? [{
                id: "answer",
                labelLatex: `\\\\text{${t("sp1_01.labels.select") || "Select"}}`,
                placeholder: "...",
                expected: correctValue,
                options: options.map(o => o.text)
            }] : [{
                id: "answer",
                labelLatex: `\\\\text{${t("sp1_01.labels.value") || "Value"}}`,
                placeholder: "0.0",
                expected: correctValue,
                unit: unit
            }]
        };
    });
}
