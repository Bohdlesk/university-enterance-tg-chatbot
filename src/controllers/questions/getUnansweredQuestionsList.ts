import { FindOptions } from 'sequelize';
import { Request, Response } from 'express';
import { UnansweredQuestion } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    let where = {};
    if (req.query.id) {
      where = { id: req.query.id };
    }
    const params: FindOptions = {
      limit: parseInt(req.query.questions_amount as string, 10)
        || undefined,
      where,
    };
    const questions = await UnansweredQuestion.findAll(params);
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
