import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../../models';
import { UserRoles } from '../../models/UserRole';

export default async (req: Request, res: Response): Promise<Response> => {
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
