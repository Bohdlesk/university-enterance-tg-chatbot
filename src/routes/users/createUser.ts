import express from 'express';
import { promisify } from 'util';
import { User } from '../../models';
import { client } from '../../redisClient';

const createUserRouter = express.Router();

createUserRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const queryParams = { ...req.query };

    const getAsync = promisify(client.get).bind(client);
    const amount = await User.count({ where: queryParams });
    const usersRedis = await getAsync('users');

    if (usersRedis) {
      const userContainer = JSON.parse(usersRedis);
      userContainer.push(user);

      console.log(userContainer);

      client.set('users', JSON.stringify(userContainer), 'EX', 60);      
      client.set('usersAmount', `${amount}`, 'EX', 60);
    } else {
      const usersList = await User.findAll({ where: queryParams });

      client.set('users', JSON.stringify(usersList), 'EX', 60);
      client.set('usersAmount', `${amount}`, 'EX', 60);
    }

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
