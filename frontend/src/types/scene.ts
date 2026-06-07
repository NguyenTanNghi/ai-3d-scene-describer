export interface SceneFormValues {
  projectName: string
  spaceType: string
  description: string
  targetCustomer: string
}

export interface GeneratedSceneContent {
  title: string
  marketingDescription: string
  keyHighlights: string[]
  scanningRecommendations: string[]
}

export type FieldErrors = Partial<Record<keyof SceneFormValues, string>>
