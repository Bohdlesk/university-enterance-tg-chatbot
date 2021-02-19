import { client } from '../redisClient';
import { cacheTTL } from '../const';

export default async (users: any) => {
  const multi = client.multi();
  users.forEach((user: any) => {
    const userKey = `userid_${user.id}`;
    multi.setex(userKey, cacheTTL, JSON.stringify(user));
  });

  multi.exec();
};
