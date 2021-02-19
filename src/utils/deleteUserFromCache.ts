import { client } from '../redisClient';

export default async (userKey: string) => {
  client.del(userKey);
};
