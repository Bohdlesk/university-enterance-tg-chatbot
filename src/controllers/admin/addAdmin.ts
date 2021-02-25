import { Request, Response } from 'express';
import { User } from '../../models';
import { UserRoles } from '../../models/UserRole';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.query;

    const adminAdded = await User.update({ role_name: UserRoles.Admin }, {
      where: { username },
      returning: true,
    });
    if (!adminAdded[0]) {
      res.status(404).json({
        status: 'error',
        message: `User '${username}' does not exist`,
      });
    } else {
      res.status(200).json({
        status: 'success',
        user: adminAdded[1][0].get(),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
