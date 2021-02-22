import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { client } from './redisClient';

import { connectToDB } from './bd';
import { APIV1Router } from './routes';
import { validatorsMiddlewares, loggerMiddlewares } from './middlewares';

const app = express();

// cors setup
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/api/v1', validatorsMiddlewares);
app.use(loggerMiddlewares.responseLogger);

app.use('/api/v1', APIV1Router);

app.use(loggerMiddlewares.errorLogger);

// connect to database
connectToDB();

client.on('connect', () => {
  console.log('Connected to redis');
});

export { app };
