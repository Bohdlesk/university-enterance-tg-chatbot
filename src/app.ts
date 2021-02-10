import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDB } from './bd';

import { APIV1Router } from './routes';

const app = express();

// cors setup
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api/v1', APIV1Router);

// connect to database
connectToDB();

export { app };
