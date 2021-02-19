import { Request, Response } from 'express';

import { User } from '../../models';
import { deleteUserFromCache } from '../../utils';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const id: number = parseInt(req.query.id as string, 10);
    const isDeleted = await User.destroy({ where: { id } });

    if (!isDeleted) {
      throw new Error('User Does not exist');
    }

    deleteUserFromCache(id);

    return res.status(200).json({
      status: 'success',
      info: `User with id ${id} has been deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
