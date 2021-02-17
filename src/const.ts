import dotenv from 'dotenv';

dotenv.config();

declare let process: {
    env: {
        DATABASE_URL: string,
        REDIS_URL: string,
        DIALOGFLOW_PROJECT_ID: string,
    }
};

const conString = process.env.DATABASE_URL;
const redisUrl = process.env.REDIS_URL;
const dialogflowProjectId = process.env.DIALOGFLOW_PROJECT_ID;

export { conString, redisUrl, dialogflowProjectId };
