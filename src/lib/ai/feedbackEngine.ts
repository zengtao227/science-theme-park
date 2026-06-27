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
        body: JSON.stringify({ quest, inputs, language })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch AI feedback');
    }

    const data = await response.json();
    return data.result;
}
