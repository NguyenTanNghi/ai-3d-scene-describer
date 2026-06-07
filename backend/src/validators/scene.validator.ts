import type { FieldErrors, SceneDescriptionRequest } from '../types/scene.js';
import { ValidationError } from './validation-error.js';

const requiredFields: Array<keyof SceneDescriptionRequest> = [
  'projectName',
  'spaceType',
  'description',
  'targetCustomer',
];

const fieldLabels: Record<keyof SceneDescriptionRequest, string> = {
  projectName: 'Tên dự án',
  spaceType: 'Loại không gian',
  description: 'Mô tả ngắn',
  targetCustomer: 'Khách hàng mục tiêu',
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const validateSceneRequest = (body: unknown): SceneDescriptionRequest => {
  const errors: FieldErrors = {};

  if (!isRecord(body)) {
    throw new ValidationError({
      projectName: 'Tên dự án không được để trống.',
      spaceType: 'Loại không gian không được để trống.',
      description: 'Mô tả ngắn không được để trống.',
      targetCustomer: 'Khách hàng mục tiêu không được để trống.',
    });
  }

  const payload = requiredFields.reduce<Partial<SceneDescriptionRequest>>(
    (accumulator, field) => {
      const value = body[field];
      const normalizedValue = typeof value === 'string' ? value.trim() : '';

      if (!normalizedValue) {
        errors[field] = `${fieldLabels[field]} không được để trống.`;
      }

      accumulator[field] = normalizedValue;
      return accumulator;
    },
    {},
  );

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  return payload as SceneDescriptionRequest;
};
