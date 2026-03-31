import { useAppStore } from '@/lib/store';
import { Quest } from '@/hooks/useQuestManager';

interface FeedbackParams {
    quest: Quest;
    inputs: Record<string, string>;
    language: string;
}

export async function requestPersonalizedFeedback({ quest, inputs, language }: FeedbackParams): Promise<string> {
    const store = useAppStore.getState();
    const config = store.aiProviderConfig || { useDefault: true };
    const hasCustomProvider = Boolean(config.apiKey && config.baseUrl && config.modelName);

    const systemPrompt = `You are an AI scientific assistant at the Basel Science Theme Park in Switzerland. 
Your goal is to help a student understand why their answer was incorrect and guide them towards the correct logic.
Follow these rules:
1. Explain in ${language === 'CN' ? 'Chinese' : language === 'DE' ? 'German' : 'English'}.
2. Be as thorough as needed. Give a complete explanation and always finish every sentence fully — never stop in the middle of a sentence or a math expression.
3. You may use inline LaTeX for math by wrapping expressions in single dollar signs, e.g. $Q_3 - Q_1$. Make sure every opening $ has a matching closing $ before you end your response.
4. Do NOT just give the final answer, point out where their logic might have deviated based on their input.
5. Emphasize first-principles thinking.`;

    const inputParts = Object.entries(inputs).map(([key, val]) => `${key}: ${val}`).join(', ');

    const userPrompt = `
Task Prompt: ${quest.promptLatex}
Target Expression: ${quest.expressionLatex}
Target Value (Solution): ${quest.correctLatex}

User Input: ${inputParts}

The user's input was evaluated as incorrect. Why might they have made this mistake, and what hint can you give them?`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    headers['x-ai-mode'] = config.useDefault
        ? (hasCustomProvider ? 'DEFAULT_WITH_FALLBACK' : 'DEFAULT_ONLY')
        : 'CUSTOM_ONLY';

    if (!config.useDefault) {
        if (config.apiKey) headers['x-custom-api-key'] = config.apiKey;
        if (config.baseUrl) headers['x-custom-base-url'] = config.baseUrl;
        if (config.modelName) headers['x-custom-model-name'] = config.modelName;
    } else if (hasCustomProvider) {
        headers['x-fallback-api-key'] = config.apiKey!;
        headers['x-fallback-base-url'] = config.baseUrl!;
        headers['x-fallback-model-name'] = config.modelName!;
    }

    const response = await fetch('/api/ai/feedback', {
        method: 'POST',
        headers,
        body: JSON.stringify({ systemPrompt, prompt: userPrompt })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch AI feedback');
    }

    const data = await response.json();
    return data.result;
}
