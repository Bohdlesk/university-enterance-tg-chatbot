import dotenv from 'dotenv';

dotenv.config();

declare let process: {
    env: {
        DATABASE_URL: string,
        REDIS_URL: string,
        DIALOGFLOW_PROJECT_ID: string,
        PASS: string,
    }
};

const conString = process.env.DATABASE_URL;
const redisUrl = process.env.REDIS_URL;
const dialogflowProjectId = process.env.DIALOGFLOW_PROJECT_ID;
const cacheTTL = 86400; // 24 hours
const pass = process.env.PASS;

export {
  conString,
  redisUrl,
  dialogflowProjectId,
  cacheTTL,
  pass,
};
