import { Request, Response } from 'express';
import { UnansweredQuestion } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    let where = {};
    if (req.query.id) {
      where = { id: req.query.id };
    }
    const params: object = {
      limit: req.query.questions_amount,
      where,
    };
    const questions: object = await UnansweredQuestion.findAll(params);
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
