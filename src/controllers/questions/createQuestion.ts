import { Request, Response } from 'express';
import { UnansweredQuestion } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const createdQuestion = await UnansweredQuestion.create(req.body);
    return res.status(200).json({
      status: 'success',
      question: createdQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
