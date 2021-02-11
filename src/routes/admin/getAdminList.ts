import express from 'express';
import { Op } from 'sequelize';
import { User } from '../../models';

const adminsListRouter = express.Router();

adminsListRouter.get('/', async (req, res) => {
  try {
    const adminTgId = req.headers.tg_id;
    const isAdmin = await User.findOne({
      where: {
        type_id: {
          [Op.or]: [2, 3],
        },
        tg_id: adminTgId,
      },
    });
    if (isAdmin?.get() === undefined) {
      throw new Error('You are not admin');
    }
    const users = await User.findAll({
      where: {
        type_id: 2,
      },
    });
    res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { adminsListRouter };
