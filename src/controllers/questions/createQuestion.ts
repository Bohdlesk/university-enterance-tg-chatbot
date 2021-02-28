import { Request, Response } from 'express';
import { UnansweredQuestion } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const createdQuestion = await UnansweredQuestion.create(req.body);
    res.status(200).json({
      status: 'success',
      question: createdQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
