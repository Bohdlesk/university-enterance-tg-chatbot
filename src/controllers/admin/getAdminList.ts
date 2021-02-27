import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../../models';
import { UserRoles } from '../../models/UserRole';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const admins = await User.findAll({
      where: {
        role_name: {
          [Op.or]: [UserRoles.Admin],
        },
      },
    });
    if (admins.length === 0) {
      return res.status(200).json({
        status: 'success',
        users: {},
        message: 'Admin users not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      users: admins,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
