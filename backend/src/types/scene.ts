export interface SceneDescriptionRequest {
  projectName: string;
  spaceType: string;
  description: string;
  targetCustomer: string;
}

export interface SceneDescriptionResult {
  title: string;
  marketingDescription: string;
  keyHighlights: string[];
  scanningRecommendations: string[];
}

export interface FieldErrors {
  projectName?: string;
  spaceType?: string;
  description?: string;
  targetCustomer?: string;
}
