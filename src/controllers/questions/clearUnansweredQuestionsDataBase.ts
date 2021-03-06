import { Request, Response } from 'express';
import { UnansweredQuestion } from '../../models';
import { db } from '../../bd';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    await UnansweredQuestion.destroy({
      where: {},
      truncate: true,
    });
    // change ID_SEQUENCE to 1
    await db.query('ALTER SEQUENCE "unanswered_questions_id_seq" RESTART WITH 1');
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
