import type { GeneratedSceneContent } from '../types/scene'
import { LoadingSpinner } from './LoadingSpinner'

interface ResultCardProps {
  result: GeneratedSceneContent | null
  isLoading: boolean
  errorMessage: string
}

export const ResultCard = ({ result, isLoading, errorMessage }: ResultCardProps) => {
  if (isLoading) {
    return (
      <section className="panel result-panel" aria-live="polite">
        <h2>Kết quả AI</h2>
        <div className="result-loading">
          <LoadingSpinner label="Đang tạo nội dung AI" />
          <span>Đang tạo nội dung AI...</span>
        </div>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className="panel result-panel" aria-live="polite">
        <h2>Kết quả AI</h2>
        <div className="api-error" role="alert">
          {errorMessage}
        </div>
      </section>
    )
  }

  if (!result) {
    return (
      <section className="panel result-panel">
        <h2>Kết quả AI</h2>
        <div className="result-empty">
          Nội dung AI sẽ hiển thị tại đây sau khi tạo thành công.
        </div>
      </section>
    )
  }

  return (
    <section className="panel result-panel" aria-live="polite">
      <h2>Kết quả AI</h2>

      <div className="result-sections">
        <article className="content-card">
          <h3>Tiêu đề dự án</h3>
          <p>{result.title}</p>
        </article>

        <article className="content-card">
          <h3>Mô tả marketing</h3>
          <p>{result.marketingDescription}</p>
        </article>

        <article className="content-card">
          <h3>Điểm nổi bật</h3>
          <ul>
            {result.keyHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>

        <article className="content-card">
          <h3>Lưu ý khi scan 3D</h3>
          <ul>
            {result.scanningRecommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
