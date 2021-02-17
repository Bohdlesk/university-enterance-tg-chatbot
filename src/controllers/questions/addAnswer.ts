import { Request, Response } from 'express';
import { FAQ, UnansweredQuestion } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const unansweredQuestion = await UnansweredQuestion.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (unansweredQuestion?.get() === undefined) {
      throw new Error(`Question number ${req.body.id} does not exist`);
    }
    await UnansweredQuestion.destroy({
      where: {
        id: req.body.id,
      },
    });

    const answeredQuestion = await FAQ.create({
      question: unansweredQuestion.get('question'),
      answer: req.body.answer,
    });
    return res.status(200).json({
      status: 'success',
      question: answeredQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
