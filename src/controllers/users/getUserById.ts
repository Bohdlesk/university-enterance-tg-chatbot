import { Request, Response } from 'express';

import { getUserFromCache, saveUserToCache } from '../../utils';
import { User } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const userKey = `userid_${id}`;
    const userFromCache = await getUserFromCache(userKey);

    if (userFromCache) {
      return res.status(200).json({
        status: 'success',
        user: userFromCache,
      });
    }

    const user = await User.findByPk(id);

    if (user === null) {
      throw new Error('Not found');
    }

    saveUserToCache(user);

    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
