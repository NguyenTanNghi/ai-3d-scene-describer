import { appConfig } from '../config/env.js';

interface OpenRouterMessage {
  role: 'system' | 'user';
  content: string;
}

interface OpenRouterChoice {
  message?: {
    content?: string;
  };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  error?: {
    message?: string;
  };
}

export const requestOpenRouterCompletion = async (
  messages: OpenRouterMessage[],
): Promise<string> => {
  const response = await fetch(`${appConfig.openRouterBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appConfig.openRouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'AI 3D Scene Describer',
    },
    body: JSON.stringify({
      model: appConfig.openRouterModel,
      messages,
      temperature: 0.7,
      max_tokens: 900,
    }),
  });

  const payload = (await response.json()) as OpenRouterResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? 'OpenRouter request failed');
  }

  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('OpenRouter returned an empty response');
  }

  return content;
};
