import { Request, Response } from 'express';
import { User } from '../../models';
import { UserRoles } from '../../models/UserRole';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username } = req.query;
    const adminAdded = await User.update({ role_id: UserRoles.admin }, {
      where: {
        username,
      },
      returning: true,
    });
    if (!adminAdded[0]) {
      throw new Error('User Does not exist');
    }
    return res.status(200).json({
      status: 'success',
      user: adminAdded[1][0].get(),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
