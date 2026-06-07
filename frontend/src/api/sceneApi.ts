import axios from 'axios'
import type { GeneratedSceneContent, SceneFormValues } from '../types/scene'

interface GenerateSceneResponse {
  data: GeneratedSceneContent
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  timeout: 45000,
})

export const generateSceneDescription = async (
  payload: SceneFormValues,
): Promise<GeneratedSceneContent> => {
  const response = await apiClient.post<GenerateSceneResponse>(
    '/generate-description',
    payload,
  )

  return response.data.data
}
