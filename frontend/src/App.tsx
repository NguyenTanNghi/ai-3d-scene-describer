import { useState } from 'react'
import { generateSceneDescription } from './api/sceneApi'
import { ResultCard } from './components/ResultCard'
import { SceneForm } from './components/SceneForm'
import type { GeneratedSceneContent, SceneFormValues } from './types/scene'
import './App.css'

function App() {
  const [result, setResult] = useState<GeneratedSceneContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleGenerate = async (values: SceneFormValues) => {
    setIsLoading(true)
    setApiError('')

    try {
      const generatedContent = await generateSceneDescription(values)
      setResult(generatedContent)
    } catch {
      setApiError('Không thể tạo nội dung. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="page-heading" aria-labelledby="page-title">
        <p className="eyebrow">Star Global 3D intern test</p>
        <h1 id="page-title">AI 3D Scene Describer</h1>
        <p>
          Tạo mô tả marketing và khuyến nghị scan 3D bằng tiếng Việt cho các
          dự án số hóa không gian.
        </p>
      </section>

      <section className="workspace" aria-label="Trình tạo nội dung AI">
        <SceneForm onSubmit={handleGenerate} isLoading={isLoading} />
        <ResultCard result={result} isLoading={isLoading} errorMessage={apiError} />
      </section>
    </main>
  )
}

export default App
