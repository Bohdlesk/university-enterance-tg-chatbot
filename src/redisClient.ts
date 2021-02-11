import redis from 'redis';
import * as dotenv from 'dotenv';

dotenv.config();

const { REDIS_URI } = process.env;

export const client = redis.createClient(`${REDIS_URI}`);