import type { ErrorRequestHandler } from 'express';
import { ValidationError } from '../validators/validation-error.js';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ValidationError) {
    res.status(400).json({
      message: 'Validation failed',
      errors: error.errors,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: 'Failed to generate content',
  });
};
