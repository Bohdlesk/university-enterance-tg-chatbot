import dotenv from 'dotenv';

dotenv.config();

declare let process: {
    env: {
        DATABASE_URL: string,
        REDIS_URL: string
    }
};

const conString = process.env.DATABASE_URL;
const redisUrl = process.env.REDIS_URL;

export { conString, redisUrl };
