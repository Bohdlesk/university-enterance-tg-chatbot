import { Request, Response } from 'express';

import { User } from '../../models';
import { deleteUserFromCache } from '../../utils';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.query.id as string, 10);
    const isDeleted = await User.destroy({ where: { id } });

    if (!isDeleted) {
      res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    } else {
      deleteUserFromCache(id);

      res.status(200).json({
        status: 'success',
        info: `User with id=${id} has been deleted`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
