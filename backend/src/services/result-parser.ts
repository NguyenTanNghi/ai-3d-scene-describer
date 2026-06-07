import type { SceneDescriptionResult } from '../types/scene.js';

const extractJsonObject = (content: string): string => {
  // Some AI models wrap valid JSON in markdown fences, so normalize before parsing.
  const fencedJson = content.match(/```(?:json)?\s*([\s\S]*?)```/i);

  if (fencedJson?.[1]) {
    return fencedJson[1].trim();
  }

  const firstBraceIndex = content.indexOf('{');
  const lastBraceIndex = content.lastIndexOf('}');

  if (firstBraceIndex === -1 || lastBraceIndex === -1 || lastBraceIndex <= firstBraceIndex) {
    throw new Error('AI response did not contain a JSON object');
  }

  return content.slice(firstBraceIndex, lastBraceIndex + 1);
};

const readString = (value: unknown, fieldName: string): string => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`AI response field "${fieldName}" is invalid`);
  }

  return value.trim();
};

const readStringArray = (value: unknown, fieldName: string): string[] => {
  if (!Array.isArray(value)) {
    throw new Error(`AI response field "${fieldName}" is invalid`);
  }

  const normalizedItems = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);

  if (normalizedItems.length === 0) {
    throw new Error(`AI response field "${fieldName}" is empty`);
  }

  return normalizedItems;
};

export const parseSceneDescriptionResult = (content: string): SceneDescriptionResult => {
  const json = extractJsonObject(content);
  const parsed = JSON.parse(json) as Record<string, unknown>;

  const title = readString(parsed.title, 'title');
  const marketingDescription = readString(
    parsed.marketingDescription ?? parsed.description,
    'marketingDescription',
  );
  const keyHighlights = readStringArray(parsed.keyHighlights, 'keyHighlights').slice(0, 5);
  const scanningRecommendations = readStringArray(
    parsed.scanningRecommendations ?? parsed.recommendations,
    'scanningRecommendations',
  ).slice(0, 3);

  if (keyHighlights.length < 3) {
    throw new Error('AI response must include at least 3 key highlights');
  }

  if (scanningRecommendations.length < 3) {
    throw new Error('AI response must include at least 3 scanning recommendations');
  }

  return {
    title,
    marketingDescription,
    keyHighlights,
    scanningRecommendations,
  };
};
