import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  FIELD_LABELS,
  INITIAL_FORM_VALUES,
  SPACE_TYPE_OPTIONS,
} from '../constants/scene'
import type { FieldErrors, SceneFormValues } from '../types/scene'
import { validateSceneForm } from '../utils/validation'
import { FormControl } from './FormControl'
import { LoadingSpinner } from './LoadingSpinner'

interface SceneFormProps {
  isLoading: boolean
  onSubmit: (values: SceneFormValues) => Promise<void>
}

export const SceneForm = ({ isLoading, onSubmit }: SceneFormProps) => {
  const [values, setValues] = useState<SceneFormValues>(INITIAL_FORM_VALUES)
  const [errors, setErrors] = useState<FieldErrors>({})

  const updateField = (field: keyof SceneFormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }))
  }

  // Client-side validation prevents incomplete prompts from reaching the AI API.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateSceneForm(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    await onSubmit(values)
  }

  return (
    <section className="panel form-panel" aria-labelledby="form-title">
      <h2 id="form-title">Thông tin dự án</h2>

      <form className="scene-form" onSubmit={handleSubmit} noValidate>
        <FormControl
          id="projectName"
          label={FIELD_LABELS.projectName}
          error={errors.projectName}
        >
          <input
            id="projectName"
            name="projectName"
            type="text"
            value={values.projectName}
            onChange={(event) => updateField('projectName', event.target.value)}
            placeholder="Căn hộ mẫu The River View"
            disabled={isLoading}
          />
        </FormControl>

        <FormControl
          id="spaceType"
          label={FIELD_LABELS.spaceType}
          error={errors.spaceType}
        >
          <select
            id="spaceType"
            name="spaceType"
            value={values.spaceType}
            onChange={(event) => updateField('spaceType', event.target.value)}
            disabled={isLoading}
          >
            <option value="">Chọn loại không gian</option>
            {SPACE_TYPE_OPTIONS.map((spaceType) => (
              <option key={spaceType} value={spaceType}>
                {spaceType}
              </option>
            ))}
          </select>
        </FormControl>

        <FormControl
          id="description"
          label={FIELD_LABELS.description}
          error={errors.description}
        >
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Không gian cao cấp với khu vực mở, ánh sáng hiện đại và nhiều chi tiết nội thất cần thể hiện rõ trong tour 3D."
            disabled={isLoading}
          />
        </FormControl>

        <FormControl
          id="targetCustomer"
          label={FIELD_LABELS.targetCustomer}
          error={errors.targetCustomer}
        >
          <input
            id="targetCustomer"
            name="targetCustomer"
            type="text"
            value={values.targetCustomer}
            onChange={(event) => updateField('targetCustomer', event.target.value)}
            placeholder="Khách mua bất động sản và đội ngũ môi giới"
            disabled={isLoading}
          />
        </FormControl>

        <button className="generate-button" type="submit" disabled={isLoading}>
          {isLoading && <LoadingSpinner label="Đang tạo nội dung AI" />}
          {isLoading ? 'Đang tạo nội dung AI...' : 'Tạo mô tả AI'}
        </button>
      </form>
    </section>
  )
}
