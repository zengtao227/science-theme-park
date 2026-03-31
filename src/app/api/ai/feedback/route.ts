import { NextResponse } from 'next/server';

type ProviderAttempt = {
    apiKey: string;
    baseUrl: string;
    model: string;
    label: 'default' | 'custom-fallback' | 'custom';
};

async function callChatCompletions(
    attempt: ProviderAttempt,
    systemPrompt: string,
    prompt: string
) {
    const payload = {
        model: attempt.model,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        stream: false
    };

    return fetch(`${attempt.baseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${attempt.apiKey}`
        },
        body: JSON.stringify(payload)
    });
}

export async function POST(req: Request) {
    try {
        const { prompt, systemPrompt } = await req.json();

        const mode = req.headers.get('x-ai-mode') || 'DEFAULT_ONLY';
        const customApiKey = req.headers.get('x-custom-api-key');
        const customBaseUrl = req.headers.get('x-custom-base-url');
        const customModelName = req.headers.get('x-custom-model-name');
        const fallbackApiKey = req.headers.get('x-fallback-api-key');
        const fallbackBaseUrl = req.headers.get('x-fallback-base-url');
        const fallbackModelName = req.headers.get('x-fallback-model-name');

        // Default to a current NVIDIA-hosted OpenAI-compatible chat model if no custom config is provided
        const defaultApiKey = process.env.NVIDIA_API_KEY;
        const defaultBaseUrl = 'https://integrate.api.nvidia.com/v1';
        const defaultModel = 'meta/llama-3.1-8b-instruct';

        const attempts: ProviderAttempt[] = [];

        if (mode === 'CUSTOM_ONLY') {
            if (customApiKey && customBaseUrl && customModelName) {
                attempts.push({
                    apiKey: customApiKey,
                    baseUrl: customBaseUrl,
                    model: customModelName,
                    label: 'custom',
                });
            }
        } else {
            if (defaultApiKey) {
                attempts.push({
                    apiKey: defaultApiKey,
                    baseUrl: defaultBaseUrl,
                    model: defaultModel,
                    label: 'default',
                });
            }
            if (mode === 'DEFAULT_WITH_FALLBACK' && fallbackApiKey && fallbackBaseUrl && fallbackModelName) {
                attempts.push({
                    apiKey: fallbackApiKey,
                    baseUrl: fallbackBaseUrl,
                    model: fallbackModelName,
                    label: 'custom-fallback',
                });
            }
        }

        if (attempts.length === 0) {
            return NextResponse.json(
                { error: 'No usable AI provider is configured. Set a server-side default key or save your own provider credentials.' },
                { status: 401 }
            );
        }

        let lastStatus = 500;
        let lastError = 'Unknown AI provider error';

        for (const attempt of attempts) {
            try {
                const response = await callChatCompletions(attempt, systemPrompt, prompt);
                if (!response.ok) {
                    const errorText = await response.text();
                    lastStatus = response.status;
                    lastError = `API Error (${attempt.label}): ${response.statusText}`;
                    console.error(`AI API Error [${attempt.label}]:`, errorText);
                    continue;
                }

                const data = await response.json();
                const content = data.choices[0]?.message?.content || data.choices[0]?.message?.reasoning_content || "";
                return NextResponse.json({ result: content, provider: attempt.label });
            } catch (error: any) {
                lastStatus = 502;
                lastError = error?.message || `Network error while using ${attempt.label}`;
                console.error(`Feedback route provider failure [${attempt.label}]:`, error);
            }
        }

        return NextResponse.json({ error: lastError }, { status: lastStatus });
    } catch (error: any) {
        console.error("Feedback route error:", error);
        return NextResponse.json(
            { error: error?.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
