import type { Request, Response, NextFunction } from 'express';
import { generateSceneDescription } from '../services/scene-description.service.js';
import { validateSceneRequest } from '../validators/scene.validator.js';

export const createSceneDescription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = validateSceneRequest(req.body);
    const generatedContent = await generateSceneDescription(payload);

    res.json({ data: generatedContent });
  } catch (error) {
    next(error);
  }
};
