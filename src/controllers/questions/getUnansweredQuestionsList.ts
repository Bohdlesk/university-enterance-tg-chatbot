import { FindOptions } from 'sequelize';
import { Request, Response } from 'express';
import { UnansweredQuestion } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
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
    if (questions.length === 0) {
      res.status(200).json({
        status: 'success',
        message: 'Unanswered questions list is empty',
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
