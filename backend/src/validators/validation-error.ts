import type { FieldErrors } from '../types/scene.js';

export class ValidationError extends Error {
  constructor(public readonly errors: FieldErrors) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}
