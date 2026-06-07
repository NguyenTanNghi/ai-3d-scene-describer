import { Router } from 'express';
import { createSceneDescription } from '../controllers/scene.controller.js';

export const sceneRoutes = Router();

sceneRoutes.post('/generate-description', createSceneDescription);
