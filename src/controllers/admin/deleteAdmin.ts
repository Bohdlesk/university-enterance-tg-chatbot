import { Request, Response } from 'express';
import { User } from '../../models';
import { UserRoles } from '../../models/UserRole';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;
    const adminDeleted = await User.update({ role_name: UserRoles.RegularUser }, {
      where: { id },
      returning: true,
    });
    if (!adminDeleted[0]) {
      throw new Error('User Does not exist');
    }
    res.status(200).json({
      status: 'success',
      user: adminDeleted[1][0].get(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
