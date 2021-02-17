import express from 'express';
import { UnansweredQuestion } from '../../models';

const getUnansweredQuestionsListRouter = express.Router();

getUnansweredQuestionsListRouter.get('/', async (req, res) => {
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
