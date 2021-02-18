import { Request, Response } from 'express';
import { promisify } from 'util';
import { User } from '../../models';
import { client } from '../../redisClient';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.query;
    const isDeleted = await User.destroy({ where: { id } });

    const getAsync = promisify(client.get).bind(client);
    const usersRedis = await getAsync('users');

    if (usersRedis) {
      const updatedUsersRedis = JSON.parse(usersRedis);
      const removeUser = updatedUsersRedis.filter((el: any) => el.id !== req.query.id);

      console.log(JSON.stringify(removeUser));
      client.set('users', JSON.stringify(removeUser));
      client.expire('users', 20);
    }

    if (!isDeleted) {
      throw new Error('User Does not exist');
    }
    return res.status(200).json({
      status: 'success',
      info: `User ${req.query.id} has been deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
