import express from 'express';

import { client } from './redisClient';

import { connectToDB } from './bd';
import { APIV1Router } from './routes';
import {
  validatorsMiddlewares,
  loggerMiddlewares,
  authMiddleware,
} from './middlewares';

const app = express();

app.use(express.json());
app.use(loggerMiddlewares.responseLogger);
app.use('/api/v1', authMiddleware);
app.use('/api/v1', validatorsMiddlewares);

app.use('/api/v1', APIV1Router);

app.use(loggerMiddlewares.errorLogger);

// connect to database
connectToDB();

client.on('connect', () => {
  console.log('Connected to redis');
});

export { app };
