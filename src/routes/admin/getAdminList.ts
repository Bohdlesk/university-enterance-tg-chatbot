import express from 'express';
import { Op } from 'sequelize';
import { User } from '../../models';
import { UserTypes } from '../../models/UserType';

const adminsListRouter = express.Router();

adminsListRouter.get('/', async (req, res) => {
  try {
    const admins = await User.findAll({
      where: {
        type_id: {
          [Op.or]: [UserTypes.admin, UserTypes.superAdmin],
        },
      },
    });
    if (admins.length === 0) {
      throw new Error('Admin users not found');
    }
    res.status(200).json({
      status: 'success',
      users: admins,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { adminsListRouter };
