import { Request, Response } from 'express';
import { promisify } from 'util';

import { client } from '../../redisClient';
import { User } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const queryParams = { ...req.query };
    console.log('Keys length', Object.keys(req.query).length);
    if (Object.keys(req.query).length === 0) {
      const getAsync = promisify(client.get).bind(client);

      const usersRedis = await getAsync('users');

      if (usersRedis) {
        return res.status(200).json({
          status: 'success',
          msg: 'cache',
          users: JSON.parse(usersRedis),
        });
      }

      const allUsersList = await User.findAll();

      client.set('users', JSON.stringify(allUsersList));
      client.expire('users', 20);

      if (allUsersList.length === 0) {
        throw new Error('Not found');
      }

      return res.status(200).json({
        status: 'success',
        users: allUsersList,
      });
    }

    const filteredUsersList = await User.findAll({ where: queryParams });
    if (filteredUsersList.length === 0) {
      throw new Error('Not found');
    }

    return res.status(200).json({
      status: 'success',
      users: filteredUsersList,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
