import redis from 'redis';
import { redisUrl } from './const';

export const client = redis.createClient(`${redisUrl}`);
