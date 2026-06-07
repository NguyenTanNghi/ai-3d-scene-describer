import { createApp } from './app.js';
import { appConfig } from './config/env.js';

const app = createApp();

app.listen(appConfig.port, () => {
  console.log(`Backend is running on http://localhost:${appConfig.port}`);
});
