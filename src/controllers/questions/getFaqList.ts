import { Request, Response } from 'express';
import { FAQ } from '../../models';
import saveFaqListToCache from '../../utils/saveFaqListToCache';
import getFaqListFromCache from '../../utils/getFaqListFromCache';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.query.name) {
      const questions = await FAQ.findAll({ where: { name: req.query.name } });
      if (questions.length === 0) {
        res.status(200).json({
          status: 'success',
          message: `FAQ ${req.query.name} not found`,
          questions: {},
        });
      } else {
        res.status(200).json({
          status: 'success',
          questions,
        });
      }
    } else {
      const questionsFromCache = await getFaqListFromCache();
      if (questionsFromCache) {
        res.status(200).json({
          status: 'success',
          questions: JSON.parse(questionsFromCache),
        });
      } else {
        const questions = await FAQ.findAll({
          limit: parseInt(req.query.questions_amount as string, 10)
            || undefined,
          order: [['stats', 'DESC']],
        });

        if (questions.length === 0) {
          res.status(200).json({
            status: 'success',
            message: 'FAQ list is empty, synchronize the database!',
            questions: {},
          });
        } else {
          saveFaqListToCache(questions);

          res.status(200).json({
            status: 'success',
            questions,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
