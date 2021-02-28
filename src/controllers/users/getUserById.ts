import { Request, Response } from 'express';

import { getUserFromCache, saveUserToCache } from '../../utils';
import { User } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id as string, 10);
    const userFromCache = await getUserFromCache(id);

    if (userFromCache) {
      res.status(200).json({
        status: 'success',
        user: userFromCache,
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: `User with id=${id} not found`,
      });
    } else {
      saveUserToCache(user);

      res.status(200).json({
        status: 'success',
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
