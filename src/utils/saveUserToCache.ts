import { client } from '../redisClient';
import { cacheTTL } from '../const';

export default async (user: any) => {
  const userKey = `userid_${user.id}`;
  client.setex(userKey, cacheTTL, JSON.stringify(user));
};
