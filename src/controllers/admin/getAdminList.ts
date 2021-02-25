import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../../models';
import { UserRoles } from '../../models/UserRole';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const admins = await User.findAll({
      where: {
        role_name: {
          [Op.or]: [UserRoles.Admin],
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
};
