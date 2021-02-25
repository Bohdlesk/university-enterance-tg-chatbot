import { FindOptions } from 'sequelize';
import { Request, Response } from 'express';
import { FAQ } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    let where = {};

    if (req.query.name) {
      where = { name: req.query.name };
    }
    const params: FindOptions = {
      limit: parseInt(req.query.questions_amount as string, 10)
        || undefined,
      order: [['stats', 'DESC']],
      where,
    };
    const questions = await FAQ.findAll(params);
    if (questions.length === 0) {
      res.status(200).json({
        status: 'success',
        message: 'FAQ list is empty, synchronize the database!',
        questions: {},
      });
    } else {
      res.status(200).json({
        status: 'success',
        questions,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
