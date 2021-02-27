import { Request, Response } from 'express';

import { User } from '../../models';
import { saveUserToCache } from '../../utils';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.create(req.body);
    saveUserToCache(user);

    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    const statusCode: number = error.errors && error.errors
      .find(({ type }: { type: string }) => (
        type === 'unique violation'
      )) ? 409 : 500;

    return res.status(statusCode).json({
      message: error.message,
      error,
    });
  }
};
