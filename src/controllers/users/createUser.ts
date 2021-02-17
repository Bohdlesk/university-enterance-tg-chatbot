import { Request, Response } from 'express';
import { promisify } from 'util';
import { User } from '../../models';
import { client } from '../../redisClient';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.create(req.body);
    const queryParams = { ...req.query };

    const getAsync = promisify(client.get).bind(client);
    const usersRedis = await getAsync('users');

    if (usersRedis) {
      const userContainer = JSON.parse(usersRedis);
      userContainer.push(user);

      client.set('users', JSON.stringify(userContainer));
      client.expire('users', 20);
    } else {
      const usersList = await User.findAll({ where: queryParams });

      client.set('users', JSON.stringify(usersList));
      client.expire('users', 20);
    }

    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
