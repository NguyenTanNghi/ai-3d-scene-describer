import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/error-handler.js';
import { sceneRoutes } from './routes/scene.routes.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', sceneRoutes);
  app.use(errorHandler);

  return app;
};
