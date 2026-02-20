import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { prompt, systemPrompt } = await req.json();

        const customApiKey = req.headers.get('x-custom-api-key');
        const customBaseUrl = req.headers.get('x-custom-base-url');
        const customModelName = req.headers.get('x-custom-model-name');

        // Default to NVIDIA deepseek if no custom config provided
        const apiKey = customApiKey || process.env.NVIDIA_API_KEY;
        const baseUrl = customBaseUrl || 'https://integrate.api.nvidia.com/v1';
        const model = customModelName || 'deepseek-ai/deepseek-r1';

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key is missing. Ensure default key is set on server or BYOK is provided.' },
                { status: 401 }
            );
        }

        const payload = {
            model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1024,
            stream: false
        };

        const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("AI API Error:", errorText);
            return NextResponse.json({ error: `API Error: ${response.statusText}` }, { status: response.status });
        }

        const data = await response.json();
        // Some models like DeepSeek-R1 return the thinking blocks in reasoning_content
        const content = data.choices[0]?.message?.content || data.choices[0]?.message?.reasoning_content || "";

        return NextResponse.json({ result: content });
    } catch (error: any) {
        console.error("Feedback route error:", error);
        return NextResponse.json(
            { error: error?.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
