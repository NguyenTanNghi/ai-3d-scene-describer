import dotenv from 'dotenv';

dotenv.config();

const readRequiredEnv = (keys: string[]): string => {
  for (const key of keys) {
    const value = process.env[key]?.trim();

    if (value) {
      return value;
    }
  }

  throw new Error(`Missing required environment variable: ${keys.join(' or ')}`);
};

const readNumberEnv = (key: string, fallback: number): number => {
  const rawValue = process.env[key];

  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

export const appConfig = {
  port: readNumberEnv('PORT', 5000),
  openRouterApiKey: readRequiredEnv(['AI_KEY']),
  openRouterModel: process.env.OPENROUTER_MODEL?.trim() ?? 'openai/gpt-4o-mini',
  openRouterBaseUrl: 'https://openrouter.ai/api/v1',
} as const;
