import { client } from '../redisClient';

export default async (id: number): Promise<void> => {
  const userKey = `userid_${id}`;
  client.del(userKey);
};
