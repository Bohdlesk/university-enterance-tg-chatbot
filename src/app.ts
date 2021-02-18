import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from "fs"

import { client } from './redisClient';

import { connectToDB } from './bd';
import { APIV1Router } from './routes';
import { validatorsMiddlewares, loggerMiddlewares } from './middlewares';
import {googleCredentials} from "./const";

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

fs.writeFile("google-credentials.json", JSON.stringify(googleCredentials), function(error: any){
    if(error) throw error;
    console.log("Асинхронная запись файла завершена. Содержимое файла:");
    let data = fs.readFileSync("google-credentials.json", "utf8");
    console.log(data);  // выводим считанные данные
});

// connect to database
connectToDB();

client.on('connect', () => {
  console.log('Connected to redis');
});

export { app };
