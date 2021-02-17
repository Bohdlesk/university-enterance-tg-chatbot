import { Request, Response } from 'express';
import { FAQ } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    let where = {};
    if (req.query.name) {
      where = { name: req.query.name };
    }
    const params: object = {
      limit: req.query.questions_amount,
      order: [['stats', 'DESC']],
      where,
    };
    const questions: object = await FAQ.findAll(params);
    return res.status(200).json({
      status: 'success',
      questions,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
