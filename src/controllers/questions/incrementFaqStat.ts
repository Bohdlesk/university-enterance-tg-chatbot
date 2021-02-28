import { Request, Response } from 'express';
import { FAQ } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await FAQ.findOne({
      where: {
        name: req.query.name,
      },
    });
    if (!question) {
      res.status(404).json({
        status: 'error',
        message: `Question ${req.query.name} does not exist`,
      });
    } else {
      const oldStats: number = question.get('stats');
      await FAQ.update({ stats: oldStats + 1 }, {
        where: {
          name: req.query.name,
        },
        returning: true,
      });
      res.status(200).json({
        status: 'success',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
