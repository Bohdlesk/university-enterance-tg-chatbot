import express from 'express';
import { Op } from 'sequelize';
import { User } from '../../models';
import { UserRoles } from '../../models/UserRole';

const adminsListRouter = express.Router();

adminsListRouter.get('/', async (req, res) => {
  try {
    const admins = await User.findAll({
      where: {
        role_id: {
          [Op.or]: [UserRoles.admin, UserRoles.superAdmin],
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
