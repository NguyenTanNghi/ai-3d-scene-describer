import { FIELD_LABELS } from '../constants/scene'
import type { FieldErrors, SceneFormValues } from '../types/scene'

export const validateSceneForm = (values: SceneFormValues): FieldErrors => {
  const errors: FieldErrors = {}

  ;(Object.keys(FIELD_LABELS) as Array<keyof SceneFormValues>).forEach((field) => {
    if (!values[field].trim()) {
      errors[field] = `${FIELD_LABELS[field]} không được để trống.`
    }
  })

  return errors
}
