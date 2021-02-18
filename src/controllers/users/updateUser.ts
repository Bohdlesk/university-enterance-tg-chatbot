import { Request, Response } from 'express';
import { promisify } from 'util';

import { User } from '../../models';
import { client } from '../../redisClient';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.query;
    const updatedUser = await User.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!updatedUser[0]) {
      throw new Error('User does not updated');
    }

    const getAsync = promisify(client.get).bind(client);
    const usersRedis = await getAsync('users');

    if (usersRedis) {
      const usersContainer = JSON.parse(usersRedis);

      const us = updatedUser[1][0].get();

      const newList = usersContainer.map((el: any) => {
        if (el.id === us.id) {
          return us;
        }
        return el;
      });

      client.set('users', JSON.stringify(newList));
      client.expire('users', 20);
    }

    return res.status(200).json({
      status: 'success',
      user: updatedUser[1][0].get(),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
