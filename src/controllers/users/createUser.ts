import { Request, Response } from 'express';

import { User } from '../../models';
import { saveUserToCache } from '../../utils';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    saveUserToCache(user);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
