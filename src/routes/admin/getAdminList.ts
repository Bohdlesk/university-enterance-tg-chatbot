import express from 'express';
import { Op } from 'sequelize';
import { User } from '../../models';

const adminsListRouter = express.Router();

adminsListRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        type_id: {
          [Op.or]: [2, 3],
        },
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
