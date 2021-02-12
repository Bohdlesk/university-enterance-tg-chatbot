import express from 'express';
import { FAQ, UnansweredQuestion } from '../../models';

const addQuestionAnswer = express.Router();

addQuestionAnswer.post('/', async (req, res) => {
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
    res.status(200).json({
      status: 'success',
      question: answeredQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { addQuestionAnswer };
