import { NextResponse } from 'next/server';

const DEFAULT_ALLOWED_BASE_URLS = [
    'https://integrate.api.nvidia.com/v1',
    'https://api.openai.com/v1',
    'https://api.deepseek.com/v1',
    'https://api.minimaxi.com/v1',
    'https://generativelanguage.googleapis.com/v1beta/openai',
];

const AI_PROVIDER_TIMEOUT_MS = 30_000;
const MAX_BODY_BYTES = 32_000;
const MAX_FIELD_CHARS = 4_000;
const MAX_INPUT_PARTS_CHARS = 4_000;

// In-memory rate limiter: max 20 requests per IP per minute.
// On serverless, limits blast radius per warm instance; resets on cold start.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;

function consumeRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return true;
    }
    if (entry.count >= RATE_LIMIT_MAX) return false;
    entry.count++;
    return true;
}

function normalizeBaseUrl(rawUrl: string): string | null {
    try {
        const parsed = new URL(rawUrl);
        if (parsed.protocol !== 'https:') return null;
        if (parsed.username || parsed.password || parsed.search || parsed.hash) return null;

        const pathname = parsed.pathname.replace(/\/+$/, '');
        return `${parsed.origin}${pathname}`;
    } catch {
        return null;
    }
}

const ALLOWED_BASE_URLS = new Set([
    ...DEFAULT_ALLOWED_BASE_URLS.map((url) => normalizeBaseUrl(url)).filter((url): url is string => Boolean(url)),
    ...(process.env.ALLOWED_AI_BASE_URLS || '')
        .split(',')
        .map((url) => normalizeBaseUrl(url.trim()))
        .filter((url): url is string => Boolean(url)),
]);

function getValidatedBaseUrl(rawUrl: string): string {
    const normalized = normalizeBaseUrl(rawUrl);
    if (!normalized || !ALLOWED_BASE_URLS.has(normalized)) {
        throw new Error('Invalid AI provider base URL');
    }
    return normalized;
}

type ProviderAttempt = {
    apiKey: string;
    baseUrl: string;
    model: string;
    label: 'default' | 'custom-fallback' | 'custom';
};

type FeedbackLanguage = 'EN' | 'CN' | 'DE';

type FeedbackBody = {
    language?: unknown;
    quest?: unknown;
    inputs?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function clipString(value: unknown, maxChars = MAX_FIELD_CHARS): string {
    if (typeof value !== 'string') return '';
    return value.trim().slice(0, maxChars);
}

function getClientIp(req: Request): string {
    const trustedHeader =
        req.headers.get('x-real-ip') ||
        req.headers.get('x-vercel-forwarded-for') ||
        req.headers.get('cf-connecting-ip');

    if (trustedHeader) {
        return trustedHeader.split(',')[0]?.trim() || 'unknown';
    }

    const xff = req.headers.get('x-forwarded-for');
    if (!xff) return 'unknown';

    const parts = xff.split(',').map((part) => part.trim()).filter(Boolean);
    return parts.at(-1) || 'unknown';
}

function originAllowed(req: Request): boolean {
    const allowlist = (process.env.AI_ALLOWED_ORIGINS || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    if (allowlist.length === 0) return true;

    const origin = req.headers.get('origin');
    return Boolean(origin && allowlist.includes(origin));
}

async function readJsonBody(req: Request): Promise<FeedbackBody | null> {
    const contentLength = Number(req.headers.get('content-length') || '0');
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
        throw new Error('Request body too large');
    }

    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
        throw new Error('Request body too large');
    }

    try {
        const parsed = JSON.parse(rawBody) as unknown;
        return isRecord(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function buildFeedbackPrompts(body: FeedbackBody): { systemPrompt: string; prompt: string } | null {
    const quest = isRecord(body.quest) ? body.quest : null;
    const inputs = isRecord(body.inputs) ? body.inputs : null;
    if (!quest || !inputs) return null;

    const language: FeedbackLanguage = body.language === 'CN' || body.language === 'DE' ? body.language : 'EN';
    const languageName = language === 'CN' ? 'Chinese' : language === 'DE' ? 'German' : 'English';

    const promptLatex = clipString(quest.promptLatex);
    const expressionLatex = clipString(quest.expressionLatex);
    const correctLatex = clipString(quest.correctLatex);
    const targetLatex = clipString(quest.targetLatex);

    if (!promptLatex && !expressionLatex && !correctLatex) return null;

    const inputParts = Object.entries(inputs)
        .map(([key, value]) => `${key.slice(0, 80)}: ${clipString(value, 500)}`)
        .join(', ')
        .slice(0, MAX_INPUT_PARTS_CHARS);

    const systemPrompt = `You are an AI scientific assistant at the Basel Science Theme Park in Switzerland.
Your goal is to help a student understand why their answer was incorrect and guide them towards the correct logic.
Follow these rules:
1. Explain in ${languageName}.
2. Be as thorough as needed. Give a complete explanation and always finish every sentence fully — never stop in the middle of a sentence or a math expression.
3. You may use inline LaTeX for math by wrapping expressions in single dollar signs, e.g. $Q_3 - Q_1$. Make sure every opening $ has a matching closing $ before you end your response.
4. Do NOT just give the final answer, point out where their logic might have deviated based on their input.
5. Emphasize first-principles thinking.`;

    const prompt = `Task Prompt: ${promptLatex}
Target Expression: ${expressionLatex}
Target Concept: ${targetLatex}
Target Value (Solution): ${correctLatex}

User Input: ${inputParts}

The user's input was evaluated as incorrect. Why might they have made this mistake, and what hint can you give them?`;

    return { systemPrompt, prompt };
}

function sanitizeProviderError(errorText: string): string {
    return errorText
        .replace(/Bearer\s+[A-Za-z0-9._~+\/-]+/g, 'Bearer [redacted]')
        .slice(0, 500);
}

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

    const baseUrl = getValidatedBaseUrl(attempt.baseUrl);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), AI_PROVIDER_TIMEOUT_MS);

    try {
        return await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${attempt.apiKey}`
            },
            body: JSON.stringify(payload),
            redirect: 'manual',
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timeout);
    }
}

export async function POST(req: Request) {
    if (!originAllowed(req)) {
        return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
    }

    const clientIp = getClientIp(req);
    if (!consumeRateLimit(clientIp)) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    try {
        const body = await readJsonBody(req);
        if (!body) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const prompts = buildFeedbackPrompts(body);
        if (!prompts) {
            return NextResponse.json({ error: 'Invalid feedback request' }, { status: 400 });
        }

        const mode = req.headers.get('x-ai-mode') || 'DEFAULT_ONLY';
        const customApiKey = req.headers.get('x-custom-api-key');
        const customBaseUrl = req.headers.get('x-custom-base-url');
        const customModelName = req.headers.get('x-custom-model-name');
        const fallbackApiKey = req.headers.get('x-fallback-api-key');
        const fallbackBaseUrl = req.headers.get('x-fallback-base-url');
        const fallbackModelName = req.headers.get('x-fallback-model-name');

        if (customBaseUrl) {
            try {
                getValidatedBaseUrl(customBaseUrl);
            } catch {
                return NextResponse.json({ error: 'Invalid custom base URL' }, { status: 400 });
            }
        }
        if (fallbackBaseUrl) {
            try {
                getValidatedBaseUrl(fallbackBaseUrl);
            } catch {
                return NextResponse.json({ error: 'Invalid fallback base URL' }, { status: 400 });
            }
        }

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
                const response = await callChatCompletions(attempt, prompts.systemPrompt, prompts.prompt);
                if (!response.ok) {
                    const errorText = await response.text();
                    lastStatus = Math.max(400, response.status || 502);
                    lastError = response.status >= 300 && response.status < 400
                        ? `API Error (${attempt.label}): provider redirect blocked`
                        : `API Error (${attempt.label}): ${response.statusText || 'Unknown provider error'}`;
                    console.error(`AI API Error [${attempt.label}] status=${response.status}:`, sanitizeProviderError(errorText));
                    continue;
                }

                const data = await response.json();
                const content = data.choices?.[0]?.message?.content || data.choices?.[0]?.message?.reasoning_content || '';
                return NextResponse.json({ result: content, provider: attempt.label });
            } catch (error: unknown) {
                lastStatus = 502;
                const err = error as { name?: string; message?: string };
                lastError = err?.name === 'AbortError'
                    ? `AI provider timed out while using ${attempt.label}`
                    : err?.message || `Network error while using ${attempt.label}`;
                console.error(`Feedback route provider failure [${attempt.label}]:`, err?.message || error);
            }
        }

        return NextResponse.json({ error: lastError }, { status: Math.max(400, lastStatus || 502) });
    } catch (error: unknown) {
        const err = error as { message?: string };
        const message = err?.message || 'Internal server error';
        console.error('Feedback route error:', message);
        return NextResponse.json(
            { error: message === 'Request body too large' ? message : 'Internal server error' },
            { status: message === 'Request body too large' ? 413 : 500 }
        );
    }
}
