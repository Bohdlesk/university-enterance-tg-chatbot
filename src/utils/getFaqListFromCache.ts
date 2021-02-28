import { promisify } from 'util';

import { client } from '../redisClient';

const getAsync = promisify(client.get).bind(client);

const EXPIRE = 60 * 60 * 6; // 6 hours

export default async (): Promise<string | null> => {
  const cacheKey = 'faq_list';
  client.expire(cacheKey, EXPIRE);
  return getAsync(cacheKey);
};
