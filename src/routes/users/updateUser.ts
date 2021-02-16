import express from 'express';
import { promisify } from 'util';
import { User } from '../../models';
import { client } from '../../redisClient';

const updateUserDataRouter = express.Router();

updateUserDataRouter.put('/', async (req, res) => {
  try {
    const telegramId = req.query.tg_id;
    const updatedUser = await User.update(req.body, {
      where: {
        tg_id: telegramId,
      },
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
        if (el.tg_id === us.tg_id) {
          return us;
        }
        return el;
      });

      console.log(JSON.stringify(newList));
      client.set('users', JSON.stringify(newList));
      client.expire('users', 20);
    }

    res.status(200).json({
      status: 'success',
      user: updatedUser[1][0].get(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { updateUserDataRouter };
