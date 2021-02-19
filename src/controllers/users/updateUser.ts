import { Request, Response } from 'express';

import { User } from '../../models';
import { saveUserToCache } from '../../utils';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.query;
    const updationResult = await User.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!updationResult[0]) {
      throw new Error('User does not updated');
    }

    const user = updationResult[1][0].get();
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
