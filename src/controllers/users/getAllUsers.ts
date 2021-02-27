import { Request, Response } from 'express';

import { User } from '../../models';
import { saveUsersToCache } from '../../utils';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const queryParams = { ...req.query };
    const users = await User.findAll({ where: queryParams });

    if (users.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Users not found',
        users: {},
      });
    }
    saveUsersToCache(users);

    return res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
