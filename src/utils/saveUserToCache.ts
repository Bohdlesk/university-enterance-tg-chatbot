import { client } from '../redisClient';
import { cacheTTL } from '../const';
import { IUser } from '../models';

export default async (user: IUser): Promise<void> => {
  const userKey = `userid_${user.id}`;
  client.setex(userKey, cacheTTL, JSON.stringify(user));
};
