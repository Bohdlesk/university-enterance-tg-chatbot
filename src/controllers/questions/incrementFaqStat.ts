import { Request, Response } from 'express';
import { FAQ } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const question = await FAQ.findOne({
      where: {
        name: req.query.name,
      },
    });
    if (!question) {
      return res.status(404).json({
        status: 'error',
        message: `Question ${req.query.name} does not exist`,
      });
    }
    const oldStats: number = question.get('stats');
    await FAQ.update({ stats: oldStats + 1 }, {
      where: {
        name: req.query.name,
      },
      returning: true,
    });
    return res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
