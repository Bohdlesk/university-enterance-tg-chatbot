import express from 'express';
import { promisify } from 'util';
import { User } from '../../models';
import { client } from '../../redisClient';

const deleteUserRouter = express.Router();

deleteUserRouter.delete('/', async (req, res) => {
  try {
    const isDeleted = await User.destroy({
      where: {
        tg_id: req.query.tg_id,
      },
    });

    const getAsync = promisify(client.get).bind(client);
    const amount = await User.count();
    const usersRedis = await getAsync('users');

    if (usersRedis) {
      const updatedUsersRedis = JSON.parse(usersRedis);
      const removeUser = updatedUsersRedis.filter((el: any) => {
        return el.tg_id !== req.query.tg_id;
      });

      console.log(JSON.stringify(removeUser));
      client.set('users', JSON.stringify(removeUser), 'EX', 60);
      client.set('usersAmount', `${amount}`, 'EX', 60);
    }

    if (!isDeleted) {
      throw new Error('User Does not exist');
    }
    res.status(200).json({
      status: 'success',
      info: `User ${req.query.tg_id} has been deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { deleteUserRouter };
