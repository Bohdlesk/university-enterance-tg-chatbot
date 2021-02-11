import express from 'express';
import { promisify } from 'util';
import { User } from '../../models';
import { client } from '../../redisClient';

const createUserRouter = express.Router();

createUserRouter.post('/', async (req, res) => {
  try {
    if (req.body.tg_id === undefined) {
      throw new Error('Telegram id (tg_id) parameter is not found');
    }
    const user = await User.create(req.body);

    // const getAsync = promisify(client.get).bind(client);
    // const usersRedis = await getAsync('users');

    // const userContainer = user.toString();
    // if (usersRedis) {
    //   const updatedCache = usersRedis.concat(userContainer);
    //   client.set('users', JSON.stringify(updatedCache));
    //   client.expire('users', 10);
    // }

    // client.set('users', JSON.stringify(usersRedis));
    // client.expire('users', 10);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { createUserRouter };
