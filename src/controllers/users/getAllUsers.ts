import { Request, Response } from 'express';

import { User } from '../../models';
import { saveUsersToCache } from '../../utils';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParams = { ...req.query };
    const users = await User.findAll({ where: queryParams });

    if (users.length === 0) {
      res.status(200).json({
        status: 'success',
        message: 'Users not found',
        users: {},
      });
    } else {
      saveUsersToCache(users);

      res.status(200).json({
        status: 'success',
        users,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
