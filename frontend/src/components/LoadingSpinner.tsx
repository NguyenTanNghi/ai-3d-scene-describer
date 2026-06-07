interface LoadingSpinnerProps {
  label?: string
}

export const LoadingSpinner = ({ label = 'Loading' }: LoadingSpinnerProps) => (
  <span className="spinner" aria-label={label} />
)
