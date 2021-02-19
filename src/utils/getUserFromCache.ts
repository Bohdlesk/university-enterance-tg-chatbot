import { promisify } from 'util';

import { client } from '../redisClient';
import { cacheTTL } from '../const';
import { IUser } from '../models';

const getAsync = promisify(client.get).bind(client);
const expireAsync = promisify(client.expire).bind(client);

export default async (id: number): Promise<IUser | null> => {
  const userKey = `userid_${id}`;
  const user = await getAsync(userKey);
  if (user) {
    expireAsync(userKey, cacheTTL);
    return JSON.parse(user);
  }

  return null;
};
