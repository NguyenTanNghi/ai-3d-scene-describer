import type { ReactNode } from 'react'

interface FormControlProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

export const FormControl = ({ id, label, error, children }: FormControlProps) => (
  <div className={`form-control${error ? ' has-error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    {children}
    <span className="field-error" role={error ? 'alert' : undefined}>
      {error}
    </span>
  </div>
)
