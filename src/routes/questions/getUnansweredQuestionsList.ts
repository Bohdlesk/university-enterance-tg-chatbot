import express from 'express';
import { UnansweredQuestion } from '../../models';

const getUnansweredQuestionsListRouter = express.Router();

getUnansweredQuestionsListRouter.get('/', async (req, res) => {
  try {
    const queryParams = { ...req.query };
    const questions: object = await UnansweredQuestion.findAll({ where: queryParams });
    res.status(200).json({
      status: 'success',
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { getUnansweredQuestionsListRouter };
