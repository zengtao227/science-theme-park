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

    const systemPrompt = `You are an AI scientific assistant at the Basel Science Theme Park in Switzerland. 
Your goal is to help a student understand why their answer was incorrect and guide them towards the correct logic.
Follow these rules:
1. Explain in ${language === 'CN' ? 'Chinese' : language === 'DE' ? 'German' : 'English'}.
2. Keep it concise, friendly, and no more than 3-4 sentences.
3. Use LaTeX for math equations wrapped in double backticks or single dollar signs (e.g. $F=ma$).
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

    if (!config.useDefault) {
        if (config.apiKey) headers['x-custom-api-key'] = config.apiKey;
        if (config.baseUrl) headers['x-custom-base-url'] = config.baseUrl;
        if (config.modelName) headers['x-custom-model-name'] = config.modelName;
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
