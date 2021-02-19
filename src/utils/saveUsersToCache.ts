import { client } from '../redisClient';
import { cacheTTL } from '../const';
import { IUser } from '../models';

export default async (users: IUser[]): Promise<void> => {
  const multi = client.multi();
  users.forEach((user: IUser) => {
    const userKey = `userid_${user.id}`;
    multi.setex(userKey, cacheTTL, JSON.stringify(user));
  });

  multi.exec();
};
