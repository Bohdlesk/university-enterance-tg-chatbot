import express from 'express';
import { promisify } from 'util';
import { client } from '../../redisClient';
import { User } from '../../models';

const getAllUsersRouter = express.Router();

getAllUsersRouter.get('/', async (req, res) => {
  try {
    const queryParams = { ...req.query };

    const getAsync = promisify(client.get).bind(client);

    const usersRedis = await getAsync('users');
    
    if (usersRedis) {
      console.log(JSON.parse(usersRedis));
      
      return res.status(200).json({
        status: 'success',
        msg: 'cache',
        users: JSON.parse(usersRedis),
      });
    }

    const usersList = await User.findAll({ where: queryParams });

    client.set('users', JSON.stringify(usersList), 'EX', 60);

    if (usersList.length === 0) {
      throw new Error('Not found');
    }

    res.status(200).json({
      status: 'success',
      users: usersList,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { getAllUsersRouter };
