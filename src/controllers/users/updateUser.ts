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
      return res.status(404).json({
        status: 'error',
        message: `User with id=${id} does not found`,
      });
    }
    const user = updationResult[1][0].get();
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
