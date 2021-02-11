import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDB } from './bd';

import { client } from './redisClient';

import { APIV1Router } from './routes';
import { validatorsMiddlewares } from './middlewares';

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

app.use('/api/v1', APIV1Router);

// connect to database
connectToDB();

client.on('connect', () => {
  console.log('Connected to redis');
});

export { app };
