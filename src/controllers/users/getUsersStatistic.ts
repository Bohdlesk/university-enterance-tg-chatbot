import { Request, Response } from 'express';

import { User } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParams = { ...req.query };
    const amount = await User.count({ where: queryParams });

    res.status(200).json({
      status: 'success',
      usersAmount: amount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
