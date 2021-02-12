import express from 'express';
import { promisify } from 'util';
import { User } from '../../models';
import { client } from '../../redisClient';

const getUsersAmountRouter = express.Router();

getUsersAmountRouter.get('/', async (req, res) => {
  try {
    const queryParams = { ...req.query };

    const getAsync = promisify(client.get).bind(client);

    const usersAmount = await getAsync('usersAmount');
    console.log(usersAmount);

    if (usersAmount) {
      return res.status(200).json({
        status: 'success',
        msg: 'cache',
        users: usersAmount,
      });
    }

    const amount = await User.count({ where: queryParams });

    client.set('usersAmount', `${amount}`);
    client.expire('usersAmount', 20);

    res.status(200).json({
      status: 'success',
      usersAmount: amount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { getUsersAmountRouter };
